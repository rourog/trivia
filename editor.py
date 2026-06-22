import json
import tkinter as tk
from tkinter import messagebox, ttk
import re
import os
import winsound
import traceback
import ctypes
from datetime import datetime

# --- RUTAS DE ARCHIVOS ---
JSON_FILE = 'preguntas.json'
JS_FILE = 'questions.js'
BACKUP_DIR = 'backups'

QUESTION_KEYS = (
    "id",
    "nombre",
    "descripcion",
    "preguntas",
    "pregunta",
    "correcta",
    "respuesta",
    "respuestaCorrecta",
    "erroneas",
    "incorrectas",
    "opciones",
    "dato",
    "datoCurioso",
    "explicacion",
    "explanation"
)

CATEGORY_DEFAULTS = {
    "teorias-leyendas-urbanas": (
        "Teorías y leyendas urbanas",
        "Conspiraciones, rumores virales, mitos urbanos, creepypastas y leyendas populares."
    ),
    "historia-rara": (
        "Historia rara",
        "Hechos reales, datos curiosos, sucesos insólitos y rarezas documentadas."
    ),
    "cine-tv": (
        "Cine, TV y cultura pop",
        "Películas, televisión, videojuegos, celebridades, música y cultura pop."
    ),
    "ciencia-rara": (
        "Ciencia rara",
        "Rarezas científicas, datos sorprendentes y curiosidades naturales."
    ),
    "musica": (
        "Música",
        "Canciones, artistas, discos, historias raras y datos musicales."
    ),
    "tecnologia": (
        "Tecnología",
        "Inventos, internet, software, cultura digital y rarezas tecnológicas."
    ),
    "crimen-real": (
        "Crimen real",
        "Casos documentados, investigaciones y sucesos policiales conocidos."
    ),
    "deportes": (
        "Deportes",
        "Hazañas, reglas, atletas, torneos y datos curiosos deportivos."
    ),
    "capitalismo-raro": (
        "Capitalismo raro",
        "Marcas, negocios, productos, dinero y decisiones comerciales extrañas."
    ),
    "planeta-absurdo": (
        "Planeta absurdo",
        "Animales, lugares, fenómenos y rarezas del mundo real."
    ),
    "arte": (
        "Arte",
        "Pintura, escultura, museos, artistas y cultura visual."
    )
}

SMART_QUOTES = (
    ("\u201c", '"'),
    ("\u201d", '"'),
    ("\u2018", "'"),
    ("\u2019", "'"),
    ("\u00ab", '"'),
    ("\u00bb", '"'),
    ("\u00e2\u20ac\u0153", '"'),
    ("\u00e2\u20ac\u009d", '"'),
    ("\u00e2\u20ac\u02dc", "'"),
    ("\u00e2\u20ac\u2122", "'"),
    ("\u00c2\u00ab", '"'),
    ("\u00c2\u00bb", '"')
)

# --- PLANTILLA DEL JS ---
JS_TEMPLATE = """(function () {
    "use strict";

    const QUESTION_CATEGORIES = %s;

    function textoPregunta(valor) {
        return String(valor || "").trim();
    }

    function obtenerCorrecta(pregunta) {
        return textoPregunta(pregunta.correcta || pregunta.respuestaCorrecta || pregunta.respuesta);
    }

    function obtenerErroneas(pregunta, correcta) {
        const fuente = Array.isArray(pregunta.erroneas)
            ? pregunta.erroneas
            : Array.isArray(pregunta.incorrectas)
                ? pregunta.incorrectas
                : Array.isArray(pregunta.opciones)
                    ? pregunta.opciones.filter(opcion => textoPregunta(opcion).toLowerCase() !== correcta.toLowerCase())
                    : [];

        return [0, 1, 2].map(indice => textoPregunta(fuente[indice]));
    }

    function obtenerDato(pregunta) {
        return textoPregunta(pregunta.dato || pregunta.datoCurioso || pregunta.explicacion || pregunta.explanation);
    }

    const categoriasNormalizadas = Object.freeze(QUESTION_CATEGORIES.map(categoria => {
        const preguntasFuente = Array.isArray(categoria.preguntas) ? categoria.preguntas : [];
        const preguntas = Object.freeze(preguntasFuente.map(pregunta => {
            const correcta = obtenerCorrecta(pregunta);
            const opcionesIncorrectas = obtenerErroneas(pregunta, correcta);
            const datoCurioso = obtenerDato(pregunta);

            return Object.freeze({
                pregunta: textoPregunta(pregunta.pregunta),
                opciones: Object.freeze([...opcionesIncorrectas, correcta]),
                correcta,
                erroneas: Object.freeze(opcionesIncorrectas),
                datoCurioso: datoCurioso || null,
                categoria: textoPregunta(categoria.nombre || categoria.id),
                categoriaId: textoPregunta(categoria.id)
            });
        }).filter(pregunta => pregunta.pregunta && pregunta.correcta && pregunta.erroneas.every(Boolean)));

        return Object.freeze({
            id: textoPregunta(categoria.id),
            nombre: textoPregunta(categoria.nombre || categoria.id),
            descripcion: textoPregunta(categoria.descripcion),
            preguntas
        });
    }).filter(categoria => categoria.id && categoria.preguntas.length > 0));

    function obtenerCategoriasPreguntas() {
        return categoriasNormalizadas.map(({ id, nombre, descripcion, preguntas }) => ({
            id, nombre, descripcion, total: preguntas.length
        }));
    }

    function obtenerIdsCategorias() {
        return categoriasNormalizadas.map(categoria => categoria.id);
    }

    function obtenerPreguntasPorCategorias(categoriasActivas = obtenerIdsCategorias()) {
        const categoriasPermitidas = new Set(categoriasActivas);
        return categoriasNormalizadas
            .filter(categoria => categoriasPermitidas.has(categoria.id))
            .flatMap(categoria => categoria.preguntas);
    }

    window.TriviaQuestionBank = Object.freeze({
        obtenerCategorias: obtenerCategoriasPreguntas,
        obtenerIdsCategorias,
        obtenerPreguntas: obtenerPreguntasPorCategorias
    });
})();
"""

class MitotriviaEditor:
    def __init__(self, root):
        self.root = root
        self.root.title("🧠 MitOtrivia - Panel de Control del Banco de Preguntas (Auto-Reparable)")
        self.root.geometry("1200x820")
        self.root.configure(bg="#112840")
        
        # --- FUENTES MEJORADAS ---
        self.FONT_TITLE = ("Segoe UI", 13, "bold")
        self.FONT_LABEL = ("Segoe UI", 11, "bold")
        self.FONT_BODY = ("Segoe UI", 12)
        self.FONT_CODE = ("Consolas", 11)
        
        # --- PALETA DE COLORES ---
        self.COLOR_BG = "#112840"
        self.COLOR_PANEL = "#163250"
        self.COLOR_TEXT = "#FFFFFF"
        self.COLOR_MUTED = "#9ab2c7"
        self.COLOR_GOLD = "#d4af37"
        self.COLOR_CYAN = "#40e0d0"
        self.COLOR_PINK = "#e0a6c0"
        self.COLOR_INPUT_BG = "#0d1f33"

        self.COLOR_PALETTE = ["#6db3cd", "#cd96b1", "#c9af6e", "#99c278", "#cd7d6a", "#6ec9a6", "#aa84cd"]
        self.categoria_colores = {}
        self.pregunta_mapa = []
        self.categoria_en_edicion = None
        self.pregunta_en_edicion = None

        self.datos = []

        # --- CONFIGURAR ESTILO GENERAL Y COMBOBOX ---
        style = ttk.Style()
        style.theme_use('default')
        style.configure("Panedwindow", background=self.COLOR_BG)
        
        style.configure("TCombobox", fieldbackground=self.COLOR_INPUT_BG, background=self.COLOR_PANEL, foreground=self.COLOR_TEXT, bordercolor="#1a3d61", arrowcolor=self.COLOR_CYAN)
        root.option_add("*TCombobox*Listbox.background", self.COLOR_INPUT_BG)
        root.option_add("*TCombobox*Listbox.foreground", self.COLOR_TEXT)
        root.option_add("*TCombobox*Listbox.selectBackground", self.COLOR_GOLD)
        root.option_add("*TCombobox*Listbox.selectForeground", self.COLOR_INPUT_BG)
        root.option_add("*TCombobox*Listbox.font", self.FONT_BODY)
        
        # ================= DIVISOR VERTICAL AJUSTABLE (SPLITTER) =================
        self.splitter = tk.PanedWindow(root, orient=tk.HORIZONTAL, bg=self.COLOR_BG, bd=0, sashwidth=6, sashpad=2)
        self.splitter.pack(fill=tk.BOTH, expand=True, padx=15, pady=15)
        
        # ================= PANEL IZQUIERDO: LISTADO Y COPIADO MASIVO =================
        left_panel = tk.Frame(self.splitter, bg=self.COLOR_BG)
        
        list_panel = tk.Frame(left_panel, bg=self.COLOR_PANEL)
        list_panel.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        list_header_frame = tk.Frame(list_panel, bg=self.COLOR_PANEL)
        list_header_frame.pack(fill=tk.X, padx=15, pady=(12, 5))
        
        lbl_list = tk.Label(list_header_frame, text="📌 BANCO DE PREGUNTAS", font=self.FONT_TITLE, bg=self.COLOR_PANEL, fg=self.COLOR_GOLD)
        lbl_list.pack(side=tk.LEFT)
        
        btn_reload = tk.Button(
            list_header_frame, text="🔄 Sanear y Recargar JS", font=("Segoe UI", 9, "bold"),
            bg="#234a75", fg=self.COLOR_TEXT, bd=0, cursor="hand2", padx=10, pady=4, command=self.forzar_recarga_manual
        )
        btn_reload.pack(side=tk.RIGHT)

        self.contador_preguntas_frame = tk.Frame(list_panel, bg=self.COLOR_PANEL)
        self.contador_preguntas_frame.pack(fill=tk.X, padx=15, pady=(0, 8))
        
        list_frame = tk.Frame(list_panel, bg=self.COLOR_PANEL)
        list_frame.pack(fill=tk.BOTH, expand=True, padx=15, pady=(0, 12))
        
        scrollbar = ttk.Scrollbar(list_frame, orient=tk.VERTICAL)
        self.listbox = tk.Listbox(
            list_frame, font=self.FONT_BODY, bg=self.COLOR_INPUT_BG, fg=self.COLOR_TEXT,
            selectbackground=self.COLOR_GOLD, selectforeground=self.COLOR_INPUT_BG,
            bd=0, highlightthickness=1, highlightcolor=self.COLOR_CYAN, highlightbackground="#1a3d61",
            yscrollcommand=scrollbar.set
        )
        scrollbar.config(command=self.listbox.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.listbox.bind('<<ListboxSelect>>', self.cargar_seleccion)
        self.listbox.bind('<Delete>', self.eliminar_pregunta_event)
        self.listbox.bind('<Up>', self.navegar_lista_con_flechas)
        self.listbox.bind('<Down>', self.navegar_lista_con_flechas)
        self.listbox.bind('<Left>', lambda event: "break")
        self.listbox.bind('<Right>', lambda event: "break")
        
        bulk_panel = tk.Frame(left_panel, bg=self.COLOR_PANEL)
        bulk_panel.pack(fill=tk.X, side=tk.BOTTOM)
        
        lbl_bulk = tk.Label(bulk_panel, text="⚡ INYECTOR MASIVO DE PREGUNTAS (JSON)", font=self.FONT_TITLE, bg=self.COLOR_PANEL, fg=self.COLOR_PINK)
        lbl_bulk.pack(anchor="w", padx=15, pady=(12, 4))
        
        self.txt_bulk_json = tk.Text(
            bulk_panel, height=5, font=self.FONT_CODE, bg=self.COLOR_INPUT_BG, fg=self.COLOR_MUTED,
            bd=0, highlightthickness=1, highlightbackground="#1a3d61", highlightcolor=self.COLOR_PINK, insertbackground=self.COLOR_TEXT
        )
        self.txt_bulk_json.pack(fill=tk.X, padx=15, pady=(0, 10))
        
        bulk_btn_frame = tk.Frame(bulk_panel, bg=self.COLOR_PANEL)
        bulk_btn_frame.pack(fill=tk.X, padx=15, pady=(0, 15))
        
        btn_bulk_clear = tk.Button(
            bulk_btn_frame, text="Limpiar Caja", font=self.FONT_LABEL,
            bg="#4a283d", fg=self.COLOR_TEXT, bd=0, cursor="hand2", padx=12, pady=6, command=self.limpiar_caja_masiva
        )
        btn_bulk_clear.pack(side=tk.LEFT, padx=(0, 8))
        
        btn_bulk_inject = tk.Button(
            bulk_btn_frame, text="Inyectar bloque JSON a la categoría", font=self.FONT_LABEL,
            bg=self.COLOR_PINK, fg=self.COLOR_BG, bd=0, cursor="hand2", padx=15, pady=6, command=self.procesar_inyectar_masivo
        )
        btn_bulk_inject.pack(side=tk.LEFT, fill=tk.X, expand=True)

        self.splitter.add(left_panel, width=540)

        # ================= PANEL DERECHO: FORMULARIO INDIVIDUAL =================
        right_panel = tk.Frame(self.splitter, bg=self.COLOR_PANEL)
        
        lbl_form = tk.Label(right_panel, text="\U0001f4dd EDITOR DE CONTENIDO INDIVIDUAL", font=self.FONT_TITLE, bg=self.COLOR_PANEL, fg=self.COLOR_GOLD)
        lbl_form.pack(anchor="w", padx=15, pady=(12, 5))
        self.lbl_editor_estado = tk.Label(
            right_panel,
            text="Modo: nueva pregunta",
            font=("Segoe UI", 9, "bold"),
            bg=self.COLOR_PANEL,
            fg=self.COLOR_CYAN
        )
        self.lbl_editor_estado.pack(anchor="w", padx=15, pady=(0, 5))
        
        form_inner = tk.Frame(right_panel, bg=self.COLOR_PANEL)
        form_inner.pack(fill=tk.BOTH, expand=True, padx=15)
        
        self.entradas = {}
        
        lbl_cat = tk.Label(form_inner, text="Categoría ID (Selecciona una existente o escribe una nueva) 🔀", font=self.FONT_LABEL, bg=self.COLOR_PANEL, fg=self.COLOR_MUTED)
        lbl_cat.pack(anchor="w", pady=(4, 1))
        
        self.cmb_categoria = ttk.Combobox(form_inner, font=self.FONT_BODY, style="TCombobox")
        self.cmb_categoria.pack(fill=tk.X, pady=(0, 2))
        self.entradas["categoria_id"] = self.cmb_categoria
        
        campos_restantes = [
            ("Pregunta del Mitote", "pregunta", True), 
            ("Respuesta Correcta ✨", "correcta", False),
            ("Opci\u00f3n Err\u00f3nea 1 \u274c", "err1", False),
            ("Opci\u00f3n Err\u00f3nea 2 \u274c", "err2", False),
            ("Opci\u00f3n Err\u00f3nea 3 \u274c", "err3", False),
            ("Dato Curioso / Explicación de la pausa 🧠", "dato", True)
        ]
        
        for label, key, is_text in campos_restantes:
            lbl = tk.Label(form_inner, text=label, font=self.FONT_LABEL, bg=self.COLOR_PANEL, fg=self.COLOR_MUTED)
            lbl.pack(anchor="w", pady=(4, 1))
            
            if is_text:
                ent = tk.Text(
                    form_inner, height=2, font=self.FONT_BODY, bg=self.COLOR_INPUT_BG, fg=self.COLOR_TEXT, 
                    bd=0, insertbackground=self.COLOR_TEXT, highlightthickness=1, highlightbackground="#1a3d61", highlightcolor=self.COLOR_CYAN
                )
            else:
                ent = tk.Entry(
                    form_inner, font=self.FONT_BODY, bg=self.COLOR_INPUT_BG, fg=self.COLOR_TEXT, 
                    bd=0, insertbackground=self.COLOR_TEXT, highlightthickness=1, highlightbackground="#1a3d61", highlightcolor=self.COLOR_CYAN
                )
            ent.pack(fill=tk.X, pady=(0, 2))
            self.entradas[key] = ent
            
        # BARRA DE ACCIONES INDIVIDUALES
        actions_frame = tk.Frame(right_panel, bg=self.COLOR_PANEL)
        actions_frame.pack(fill=tk.X, padx=15, pady=15)
        
        tk.Button(actions_frame, text="➕ Nueva Pregunta", font=self.FONT_LABEL, bg="#1a5241", fg=self.COLOR_TEXT, bd=0, cursor="hand2", padx=12, pady=6, width=14, command=self.modo_nueva_pregunta).pack(side=tk.LEFT, padx=(0, 5))
        tk.Button(actions_frame, text="Limpiar Campos", font=self.FONT_LABEL, bg="#234a75", fg=self.COLOR_TEXT, bd=0, cursor="hand2", padx=12, pady=6, width=14, command=self.limpiar_form).pack(side=tk.LEFT, padx=5)
        tk.Button(actions_frame, text="💾 Guardar Cambios", font=self.FONT_LABEL, bg=self.COLOR_GOLD, fg=self.COLOR_BG, bd=0, cursor="hand2", padx=12, pady=6, width=15, command=self.guardar_pregunta).pack(side=tk.LEFT, padx=5)
        
        btn_export = tk.Button(actions_frame, text="🚀 Sincronizar Juego (JS)", font=self.FONT_LABEL, bg=self.COLOR_CYAN, fg=self.COLOR_BG, bd=0, cursor="hand2", padx=12, pady=6, width=22, command=self.exportar_js)
        btn_export.pack(side=tk.RIGHT, padx=(5, 0))

        self.splitter.add(right_panel, width=600)

        # Cargar datos iniciales de forma segura
        self.ejecutar_inicializacion_datos()

    def reproducir_click(self):
        winsound.PlaySound("SystemMenu", winsound.SND_ALIAS | winsound.SND_ASYNC)

    def sanear_texto(self, valor):
        texto = str(valor or "")
        for origen, destino in SMART_QUOTES:
            texto = texto.replace(origen, destino)
        return texto.strip()

    def capitalizar_frase(self, valor):
        texto = re.sub(r'\s+', ' ', self.sanear_texto(valor))
        for indice, caracter in enumerate(texto):
            if caracter.isalpha():
                return texto[:indice] + caracter.upper() + texto[indice + 1:]
        return texto

    def asegurar_punto_respuesta(self, valor):
        texto = self.capitalizar_frase(valor).rstrip()
        if not texto:
            return texto
        if texto.endswith((".", "?", "!", "…", "。", "؟", "¡", "¿")):
            return texto
        return f"{texto}."

    def crear_categoria(self, cat_id):
        nombre, descripcion = CATEGORY_DEFAULTS.get(
            cat_id,
            (cat_id.replace("-", " ").title(), f"Categoría {cat_id}")
        )
        return {
            "id": cat_id,
            "nombre": nombre,
            "descripcion": descripcion,
            "preguntas": []
        }

    def normalizar_pregunta(self, pregunta):
        correcta = pregunta.get("correcta", pregunta.get("respuestaCorrecta", pregunta.get("respuesta", "")))
        erroneas = pregunta.get("erroneas", pregunta.get("incorrectas", []))
        if not erroneas and isinstance(pregunta.get("opciones"), list):
            correcta_normalizada = self.sanear_texto(correcta).strip().lower()
            erroneas = [
                opcion
                for opcion in pregunta.get("opciones", [])
                if self.sanear_texto(opcion).strip().lower() != correcta_normalizada
            ]
        if not isinstance(erroneas, list):
            erroneas = []
        erroneas = [self.asegurar_punto_respuesta(opcion) for opcion in erroneas[:3]]
        while len(erroneas) < 3:
            erroneas.append("")

        dato = pregunta.get(
            "dato",
            pregunta.get("datoCurioso", pregunta.get("explicacion", pregunta.get("explanation", "")))
        )
        return {
            "pregunta": self.capitalizar_frase(pregunta.get("pregunta", "")),
            "correcta": self.asegurar_punto_respuesta(correcta),
            "erroneas": erroneas,
            "dato": self.sanear_texto(dato)
        }

    def normalizar_categoria(self, categoria):
        cat_id = self.sanear_texto(categoria.get("id", "sin-categoria")).lower()
        base = self.crear_categoria(cat_id)
        base["nombre"] = self.sanear_texto(categoria.get("nombre", base["nombre"]))
        base["descripcion"] = self.sanear_texto(categoria.get("descripcion", base["descripcion"]))
        base["preguntas"] = [
            self.normalizar_pregunta(p)
            for p in categoria.get("preguntas", [])
            if isinstance(p, dict)
        ]
        return base

    def normalizar_banco(self, datos):
        if not isinstance(datos, list):
            return []
        return [self.normalizar_categoria(cat) for cat in datos if isinstance(cat, dict)]

    def validar_pregunta(self, pregunta):
        faltantes = []
        if not pregunta["pregunta"]:
            faltantes.append("pregunta")
        if not pregunta["correcta"]:
            faltantes.append("respuesta correcta")
        for idx, opcion in enumerate(pregunta["erroneas"], start=1):
            if not opcion:
                faltantes.append(f"respuesta errónea {idx}")
        if not pregunta["dato"]:
            faltantes.append("dato curioso")
        return faltantes

    def guardar_json_local(self):
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.datos, f, indent=4, ensure_ascii=False)

    def extraer_array_categorias_js(self, js_content):
        match = re.search(r'const\s+QUESTION_CATEGORIES\s*=\s*\[', js_content)
        if not match:
            raise ValueError("No se encontró la variable QUESTION_CATEGORIES en questions.js.")

        start_bracket = js_content.find('[', match.start())
        brackets = 0
        in_string = False
        string_quote = ""
        escape = False
        in_line_comment = False
        in_block_comment = False

        for i in range(start_bracket, len(js_content)):
            char = js_content[i]
            next_char = js_content[i + 1] if i + 1 < len(js_content) else ""

            if in_line_comment:
                if char in "\r\n":
                    in_line_comment = False
                continue

            if in_block_comment:
                if char == "*" and next_char == "/":
                    in_block_comment = False
                continue

            if in_string:
                if escape:
                    escape = False
                elif char == "\\":
                    escape = True
                elif char == string_quote:
                    in_string = False
                continue

            if char == "/" and next_char == "/":
                in_line_comment = True
                continue
            if char == "/" and next_char == "*":
                in_block_comment = True
                continue
            if char in ('"', "'"):
                in_string = True
                string_quote = char
                continue
            if char == "[":
                brackets += 1
            elif char == "]":
                brackets -= 1
                if brackets == 0:
                    return js_content[start_bracket:i + 1]

        raise ValueError("Sintaxis rota: los corchetes del array no se cierran.")

    def convertir_js_array_a_json(self, js_array):
        json_like = self.sanear_texto(js_array)
        key_pattern = r'([{\[,]\s*)(' + "|".join(QUESTION_KEYS) + r')\s*:'
        json_like = re.sub(key_pattern, r'\1"\2":', json_like)
        json_like = re.sub(r',\s*([\]}])', r'\1', json_like)
        return json_like

    def ejecutar_inicializacion_datos(self):
        self.datos = self.cargar_datos()
        self.asignar_colores_categorias()
        self.actualizar_lista()
        self.actualizar_combobox_categorias()

    def forzar_recarga_manual(self):
        self.reproducir_click()
        if not os.path.exists(JS_FILE):
            messagebox.showerror("Error", f"No se encontró el archivo '{JS_FILE}' en esta carpeta.")
            return
            
        intentar_parseo, logs_error = self.auto_importar_de_js_con_depuracion()
        
        if intentar_parseo and len(intentar_parseo) > 0:
            self.datos = intentar_parseo
            self.asignar_colores_categorias()
            self.actualizar_lista()
            self.actualizar_combobox_categorias()
            total_p = sum(len(cat.get("preguntas", [])) for cat in self.datos)
            messagebox.showinfo("Auto-Reparaci\u00f3n Exitosa", f"\u00a1Archivo 'questions.js' saneado y cargado correctamente!\n\nSe procesaron {total_p} preguntas distribuidas en {len(self.datos)} categor\u00edas de forma segura.")
        else:
            winsound.MessageBeep(winsound.MB_ICONHAND)
            messagebox.showerror(
                "Error de Estructura Rota",
                f"El motor de auto-reparación no pudo procesar el archivo porque la sintaxis de corchetes o llaves está destruida.\n\n"
                f"Detalle técnico interno:\n{logs_error}"
            )

    def asignar_colores_categorias(self):
        for idx, cat in enumerate(self.datos):
            color_index = idx % len(self.COLOR_PALETTE)
            self.categoria_colores[cat["id"]] = self.COLOR_PALETTE[color_index]

    def actualizar_combobox_categorias(self):
        lista_ids = sorted([cat["id"] for cat in self.datos])
        self.cmb_categoria['values'] = lista_ids

    def actualizar_lista(self):
        self.listbox.delete(0, tk.END)
        self.pregunta_mapa = []
        self.actualizar_contador_preguntas()
        for cat in self.datos:
            color_circulo = self.categoria_colores.get(cat["id"], self.COLOR_TEXT)
            for p in cat["preguntas"]:
                self.listbox.insert(tk.END, f"  \u25cf   {p.get('pregunta', 'Sin texto')}")
                self.listbox.itemconfig(tk.END, fg=color_circulo, selectforeground=self.COLOR_INPUT_BG)
                self.pregunta_mapa.append((cat["id"], color_circulo))

    def actualizar_contador_preguntas(self):
        if not hasattr(self, "contador_preguntas_frame"):
            return

        for widget in self.contador_preguntas_frame.winfo_children():
            widget.destroy()

        total = 0
        for cat in self.datos:
            cantidad = len(cat.get("preguntas", []))
            if cantidad == 0:
                continue

            total += cantidad
            color = self.categoria_colores.get(cat["id"], self.COLOR_TEXT)
            item = tk.Frame(self.contador_preguntas_frame, bg=self.COLOR_PANEL)
            item.pack(side=tk.LEFT, padx=(0, 12))

            tk.Label(
                item,
                text="\u25cf",
                font=("Segoe UI", 10, "bold"),
                bg=self.COLOR_PANEL,
                fg=color
            ).pack(side=tk.LEFT)
            tk.Label(
                item,
                text=str(cantidad),
                font=("Segoe UI", 10, "bold"),
                bg=self.COLOR_PANEL,
                fg=self.COLOR_MUTED
            ).pack(side=tk.LEFT, padx=(4, 0))

        tk.Label(
            self.contador_preguntas_frame,
            text=f"Total {total}",
            font=("Segoe UI", 10, "bold"),
            bg=self.COLOR_PANEL,
            fg=self.COLOR_GOLD
        ).pack(side=tk.RIGHT)

    def actualizar_estado_editor(self):
        if not hasattr(self, "lbl_editor_estado"):
            return

        if self.pregunta_en_edicion is None:
            self.lbl_editor_estado.config(text="Modo: nueva pregunta", fg=self.COLOR_CYAN)
        else:
            self.lbl_editor_estado.config(text="Modo: editando pregunta existente", fg=self.COLOR_GOLD)

    def navegar_lista_con_flechas(self, event):
        total = self.listbox.size()
        if total == 0:
            return "break"

        seleccion = self.listbox.curselection()
        indice_actual = seleccion[0] if seleccion else 0
        delta = -1 if event.keysym == "Up" else 1
        nuevo_indice = max(0, min(total - 1, indice_actual + delta))

        self.listbox.selection_clear(0, tk.END)
        self.listbox.selection_set(nuevo_indice)
        self.listbox.activate(nuevo_indice)
        self.listbox.see(nuevo_indice)
        self.cargar_seleccion(None)
        return "break"

    def cargar_seleccion(self, event):
        seleccion = self.listbox.curselection()
        if not seleccion: return
        idx = seleccion[0]
        
        contador = 0
        for cat in self.datos:
            for p in cat["preguntas"]:
                if contador == idx:
                    self.categoria_en_edicion = cat
                    self.pregunta_en_edicion = p
                    self.actualizar_estado_editor()
                    self.limpiar_form_interno()
                    self.entradas["categoria_id"].set(cat["id"])
                    self.entradas["pregunta"].insert("1.0", p.get("pregunta", ""))
                    self.entradas["correcta"].insert(0, p.get("correcta", ""))
                    
                    err = p.get("erroneas", ["", "", ""])
                    self.entradas["err1"].insert(0, err[0] if len(err) > 0 else "")
                    self.entradas["err2"].insert(0, err[1] if len(err) > 1 else "")
                    self.entradas["err3"].insert(0, err[2] if len(err) > 2 else "")
                    
                    if "dato" in p:
                        self.entradas["dato"].insert("1.0", p["dato"])
                    return
                contador += 1

    def modo_nueva_pregunta(self):
        self.reproducir_click()
        cat_actual = self.entradas["categoria_id"].get().strip()
        self.categoria_en_edicion = None
        self.pregunta_en_edicion = None
        self.actualizar_estado_editor()
        self.listbox.selection_clear(0, tk.END)
        self.limpiar_form_interno()
        if cat_actual:
            self.entradas["categoria_id"].set(cat_actual)
        self.entradas["pregunta"].focus()

    def limpiar_form(self):
        self.reproducir_click()
        self.categoria_en_edicion = None
        self.pregunta_en_edicion = None
        self.actualizar_estado_editor()
        self.listbox.selection_clear(0, tk.END)
        self.limpiar_form_interno()

    def limpiar_form_interno(self):
        for key, widget in self.entradas.items():
            if isinstance(widget, ttk.Combobox):
                widget.set("")
            elif isinstance(widget, tk.Text):
                widget.delete("1.0", tk.END)
            else:
                widget.delete(0, tk.END)

    def limpiar_caja_masiva(self):
        self.reproducir_click()
        self.txt_bulk_json.delete("1.0", tk.END)

    def encontrar_pregunta_en_edicion(self):
        if self.pregunta_en_edicion is None:
            return None, None

        for categoria in self.datos:
            for indice, pregunta in enumerate(categoria.get("preguntas", [])):
                if pregunta is self.pregunta_en_edicion:
                    return categoria, indice

        return None, None

    def obtener_indice_global_pregunta(self, pregunta_buscada):
        contador = 0
        for categoria in self.datos:
            for pregunta in categoria.get("preguntas", []):
                if pregunta is pregunta_buscada:
                    return contador
                contador += 1
        return None

    def seleccionar_pregunta_guardada(self, pregunta_guardada):
        indice = self.obtener_indice_global_pregunta(pregunta_guardada)
        if indice is None:
            return

        self.listbox.selection_clear(0, tk.END)
        self.listbox.selection_set(indice)
        self.listbox.activate(indice)
        self.listbox.see(indice)

    def guardar_pregunta(self):
        self.reproducir_click()
        cat_id = self.entradas["categoria_id"].get().strip()
        pregunta_text = self.entradas["pregunta"].get("1.0", tk.END).strip()

        if not cat_id or not pregunta_text:
            messagebox.showwarning("Atenci\u00f3n", "Selecciona/escribe un ID de categor\u00eda y la pregunta.")
            return

        nueva_pregunta = self.normalizar_pregunta({
            "pregunta": pregunta_text,
            "correcta": self.entradas["correcta"].get().strip(),
            "erroneas": [
                self.entradas["err1"].get().strip(),
                self.entradas["err2"].get().strip(),
                self.entradas["err3"].get().strip()
            ],
            "dato": self.entradas["dato"].get("1.0", tk.END).strip()
        })

        faltantes = self.validar_pregunta(nueva_pregunta)
        if faltantes:
            messagebox.showwarning(
                "Pregunta incompleta",
                "Completa estos campos antes de guardar:\n\n- " + "\n- ".join(faltantes)
            )
            return

        categoria_encontrada = next((c for c in self.datos if c["id"] == cat_id), None)
        if not categoria_encontrada:
            categoria_encontrada = self.crear_categoria(cat_id)
            self.datos.append(categoria_encontrada)
            self.asignar_colores_categorias()
            self.actualizar_combobox_categorias()

        categoria_original, indice_original = self.encontrar_pregunta_en_edicion()
        if categoria_original is not None:
            if categoria_original["id"] == cat_id:
                categoria_original["preguntas"][indice_original] = nueva_pregunta
            else:
                del categoria_original["preguntas"][indice_original]
                categoria_encontrada["preguntas"].append(nueva_pregunta)
        else:
            categoria_encontrada["preguntas"].append(nueva_pregunta)

        self.datos = [cat for cat in self.datos if cat.get("preguntas")]
        self.categoria_en_edicion = next((cat for cat in self.datos if nueva_pregunta in cat.get("preguntas", [])), None)
        self.pregunta_en_edicion = nueva_pregunta
        self.guardar_json_local()

        self.actualizar_lista()
        self.actualizar_combobox_categorias()
        self.seleccionar_pregunta_guardada(nueva_pregunta)
        self.cargar_seleccion(None)
        self.actualizar_estado_editor()
        messagebox.showinfo("\u00c9xito", "Pregunta guardada.")

    def eliminar_pregunta_event(self, event):
        seleccion = self.listbox.curselection()
        if not seleccion: return
        idx = seleccion[0]
        
        contador = 0
        pregunta_a_borrar = ""
        cat_origen = None
        target_p = None
        
        for cat in self.datos:
            for p in cat["preguntas"]:
                if contador == idx:
                    pregunta_a_borrar = p.get("pregunta", "")
                    cat_origen = cat
                    target_p = p
                    break
                contador += 1
        
        if target_p and cat_origen:
            pregunta_corta = pregunta_a_borrar[:50] + "..." if len(pregunta_a_borrar) > 50 else pregunta_a_borrar
            winsound.MessageBeep(winsound.MB_ICONEXCLAMATION)
            confirmacion = messagebox.askyesno(
                "\u26a0\ufe0f \u00bfBorrar Mitote?", 
                f"¿Estás seguro de que quieres eliminar esta pregunta para siempre?\n\n\"{pregunta_corta}\""
            )
            
            if confirmacion:
                self.reproducir_click()
                cat_origen["preguntas"].remove(target_p)
                if len(cat_origen["preguntas"]) == 0:
                    self.datos.remove(cat_origen)
                    self.asignar_colores_categorias()
                    self.actualizar_combobox_categorias()
                
                with open(JSON_FILE, 'w', encoding='utf-8') as f:
                    json.dump(self.datos, f, indent=4, ensure_ascii=False)
                    
                self.categoria_en_edicion = None
                self.pregunta_en_edicion = None
                self.actualizar_estado_editor()
                self.actualizar_lista()
                self.limpiar_form_interno()
                messagebox.showinfo("Eliminado", "La pregunta ha sido borrada.")

    def procesar_inyectar_masivo(self):
        self.reproducir_click()
        cat_id = self.entradas["categoria_id"].get().strip()
        contenido = self.txt_bulk_json.get("1.0", tk.END).strip()
        
        if not cat_id:
            messagebox.showerror("Falta Categoría", "Por favor selecciona o escribe un ID de categoría en la lista desplegable antes de inyectar.")
            return
            
        if not contenido:
            messagebox.showwarning("Vacío", "Pega el bloque JSON en el cuadro antes de inyectar.")
            return
            
        try:
            # --- SANEAMIENTO PREVENTIVO DEL TEXTO PEGADO EN LA CAJA MASIVA ---
            contenido_saneado = self.sanear_texto(contenido)
            nuevas_preguntas = json.loads(contenido_saneado)
            
            if isinstance(nuevas_preguntas, dict):
                nuevas_preguntas = [nuevas_preguntas]
                
            preguntas_normalizadas = []
            errores = []
            for idx, p in enumerate(nuevas_preguntas, start=1):
                if not isinstance(p, dict):
                    errores.append(f"Pregunta {idx}: no es un objeto JSON válido.")
                    continue
                pregunta_normalizada = self.normalizar_pregunta(p)
                faltantes = self.validar_pregunta(pregunta_normalizada)
                if faltantes:
                    errores.append(f"Pregunta {idx}: falta {', '.join(faltantes)}.")
                preguntas_normalizadas.append(pregunta_normalizada)

            if errores:
                messagebox.showerror(
                    "Bloque incompleto",
                    "Corrige el bloque antes de inyectarlo:\n\n" + "\n".join(errores[:8])
                )
                return

            cat_encontrada = next((c for c in self.datos if c["id"] == cat_id), None)
            if not cat_encontrada:
                cat_encontrada = self.crear_categoria(cat_id)
                self.datos.append(cat_encontrada)
                self.asignar_colores_categorias()
                self.actualizar_combobox_categorias()

            cat_encontrada["preguntas"].extend(preguntas_normalizadas)
            self.guardar_json_local()
                
            self.actualizar_lista()
            self.txt_bulk_json.delete("1.0", tk.END)
            messagebox.showinfo("Inyección Completada", f"¡Éxito! Se añadieron {len(nuevas_preguntas)} preguntas a '{cat_id}'.")
        except Exception as e:
            messagebox.showerror("Error de Formato", f"El contenido no se pudo procesar automáticamente.\n\nDetalle: {e}")

    def cargar_datos(self):
        if os.path.exists(JS_FILE):
            datos_js, _ = self.auto_importar_de_js_con_depuracion()
            if datos_js and len(datos_js) > 0:
                return datos_js

        if os.path.exists(JSON_FILE):
            try:
                with open(JSON_FILE, 'r', encoding='utf-8') as f:
                    return self.normalizar_banco(json.load(f))
            except:
                pass
        return []

    def auto_importar_de_js_con_depuracion(self):
        """Extrae QUESTION_CATEGORIES desde questions.js y lo normaliza para el editor."""
        try:
            with open(JS_FILE, 'r', encoding='utf-8') as f:
                js_content = f.read()

            js_array = self.extraer_array_categorias_js(js_content)
            datos = self.normalizar_banco(json.loads(self.convertir_js_array_a_json(js_array)))

            if datos and len(datos) > 0:
                self.datos = datos
                self.guardar_json_local()
            return datos, "OK"
        except Exception as e:
            return None, str(e)

    def exportar_js(self):
        self.reproducir_click()

        errores = []
        for cat in self.datos:
            for idx, pregunta in enumerate(cat.get("preguntas", []), start=1):
                faltantes = self.validar_pregunta(self.normalizar_pregunta(pregunta))
                if faltantes:
                    errores.append(f"{cat.get('id', 'sin-categoria')} #{idx}: falta {', '.join(faltantes)}")

        if errores:
            messagebox.showerror(
                "Banco incompleto",
                "No se puede sincronizar hasta corregir estas preguntas:\n\n" + "\n".join(errores[:10])
            )
            return
        
        total_preguntas = sum(len(cat.get("preguntas", [])) for cat in self.datos)
        if total_preguntas == 0:
            winsound.MessageBeep(winsound.MB_ICONHAND)
            confirmar_borrado_total = messagebox.askyesno(
                "\U0001f6a8 \u00a1ALERTA CR\u00cdTICA DE DESTRUCCI\u00d3N!",
                "Est\u00e1s intentando sincronizar una base de datos COMPLETAMENTE VAC\u00cdA.\n\n"
                "Si continúas, vas a BORRAR todas las preguntas de 'questions.js' para siempre.\n\n"
                "¿Deseas vaciar por completo el archivo de juego?"
            )
            if not confirmar_borrado_total: return
                
            confirmar_segunda_vez = messagebox.askyesno(
                "🛑 CONFIRMACIÓN FINAL",
                "¿Estás absolutamente seguro?"
            )
            if not confirmar_segunda_vez: return

        try:
            if os.path.exists(JS_FILE):
                if not os.path.exists(BACKUP_DIR):
                    os.makedirs(BACKUP_DIR)
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                backup_filename = os.path.join(BACKUP_DIR, f"questions_backup_{timestamp}.js")
                with open(JS_FILE, 'r', encoding='utf-8') as origen:
                    with open(backup_filename, 'w', encoding='utf-8') as destino:
                        destino.write(origen.read())

            self.datos = self.normalizar_banco(self.datos)
            json_str = json.dumps(self.datos, indent=4, ensure_ascii=False)
            js_content = JS_TEMPLATE % json_str
            with open(JS_FILE, 'w', encoding='utf-8') as f: 
                f.write(js_content)
            
            with open(JSON_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.datos, f, indent=4, ensure_ascii=False)
                
            messagebox.showinfo("¡Sincronizado!", "¡El archivo 'questions.js' fue actualizado con éxito!\n\nSe ha creado una copia de seguridad en la carpeta 'backups/' por seguridad.")
        except PermissionError:
            messagebox.showerror("Permiso Denegado", "Cierra 'questions.js' de cualquier otro programa o servidor e intenta de nuevo.")

def mostrar_error_arranque(error):
    detalle = traceback.format_exc()
    with open("editor_error.log", "w", encoding="utf-8") as log:
        log.write(detalle)

    mensaje = (
        "No se pudo abrir el editor de MitOtrivia.\n\n"
        f"{error}\n\n"
        "Se guardo el detalle tecnico en editor_error.log."
    )
    ctypes.windll.user32.MessageBoxW(None, mensaje, "Error al abrir editor", 0x10)


if __name__ == "__main__":
    try:
        root = tk.Tk()
        app = MitotriviaEditor(root)
        root.mainloop()
    except Exception as error:
        mostrar_error_arranque(error)

