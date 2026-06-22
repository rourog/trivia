(function () {
    "use strict";

    const QUESTION_CATEGORIES = [
    {
        "id": "teorias-leyendas-urbanas",
        "nombre": "Teorías y leyendas urbanas",
        "descripcion": "Conspiraciones, rumores virales, mitos urbanos, creepypastas y leyendas populares.",
        "preguntas": [
            {
                "pregunta": "Durante décadas se ha rumoreado que Walt Disney fue criogenizado justo antes de morir. ¿Dónde dice el mito urbano que está oculto su cuerpo?",
                "correcta": "Bajo la atracción de Piratas del Caribe.",
                "erroneas": [
                    "Dentro del castillo de Cenicienta.",
                    "En una bóveda secreta en París.",
                    "En los cimientos de los estudios Pixar."
                ],
                "dato": "Walt Disney fue incinerado en 1966. El rumor se volvió popular porque la criogenia estaba de moda en la cultura pop de la época y Disney era visto como un símbolo de futuro e imaginación tecnológica."
            },
            {
                "pregunta": "Una famosa teoría conspirativa afirma que la llegada del hombre a la Luna en 1969 fue un fraude filmado en Hollywood. ¿A qué legendario director de cine acusan de haberlo dirigido?",
                "correcta": "Stanley Kubrick.",
                "erroneas": [
                    "Steven Spielberg.",
                    "Alfred Hitchcock.",
                    "George Lucas."
                ],
                "dato": "La teoría mezcla la precisión visual de '2001: Odisea del Espacio' con lecturas forzadas de 'El Resplandor'. En realidad, no existe evidencia sólida de que Kubrick haya participado en una supuesta falsificación lunar."
            },
            {
                "pregunta": "En el mundo de los videojuegos existe la leyenda de 'Polybius', una supuesta máquina arcade de los años 80 que causaba pesadillas y amnesia. ¿Quiénes se suponía que la operaban secretamente?",
                "correcta": "Agentes del gobierno de EE.UU.",
                "erroneas": [
                    "Científicos de una secta tecnológica.",
                    "Empleados de una multinacional japonesa.",
                    "Hackers de la Unión Soviética."
                ],
                "dato": "El mito dice que hombres de negro recolectaban datos de las máquinas. Probablemente nació mezclando fallos reales de arcades, ansiedad tecnológica y el gusto de internet por los misterios imposibles de comprobar."
            },
            {
                "pregunta": "Una famosa leyenda afirma que Paul McCartney murió en 1966 y fue reemplazado. ¿Qué supuesta pista dejaron Los Beatles en la portada de 'Abbey Road'?",
                "correcta": "Paul camina descalzo y descoordinado.",
                "erroneas": [
                    "Paul viste un traje funerario.",
                    "Paul sostiene un cigarrillo invertido.",
                    "Paul mira fijamente a la cámara."
                ],
                "dato": "Los fans del mito interpretaron la portada como una procesión fúnebre: John de blanco, Ringo de negro, George con mezclilla y Paul descalzo. La lectura es famosa, aunque la banda siempre la trató como coincidencia y juego de fans."
            },
            {
                "pregunta": "A mediados de los años 90, el mito del Chupacabras causó pánico masivo en México y Puerto Rico. Biológicamente, ¿qué eran muchos de los supuestos especímenes capturados?",
                "correcta": "Coyotes con sarna severa.",
                "erroneas": [
                    "Linces con rabia avanzada.",
                    "Perros salvajes con desnutrición.",
                    "Murciélagos con mutaciones genéticas."
                ],
                "dato": "La sarna puede hacer que algunos mamíferos pierdan pelo y desarrollen una piel gruesa y extraña. Eso, sumado al miedo colectivo, convirtió animales enfermos en criaturas de leyenda."
            },
            {
                "pregunta": "El Aeropuerto Internacional de Denver es famoso por albergar extrañas teorías conspirativas. ¿Qué terrorífico monumento da la bienvenida a los pasajeros en su entrada?",
                "correcta": "Una escultura gigante de un caballo azul con ojos rojos brillantes.",
                "erroneas": [
                    "Un mural medieval que muestra el fin del mundo.",
                    "Una estatua de gárgola que habla dentro de una maleta.",
                    "Un obelisco negro con extraños jeroglíficos masónicos."
                ],
                "dato": "La escultura se llama 'Blue Mustang', aunque muchos la apodan 'Blucifer'. Su fama creció porque una pieza cayó durante su construcción y provocó la muerte de su escultor, Luis Jiménez."
            },
            {
                "pregunta": "Existe una teoría de internet que afirma que Stevie Wonder no es realmente ciego. ¿Qué supuesta prueba viral alimentó el mito?",
                "correcta": "Atrapó un micrófono que caía en un escenario.",
                "erroneas": [
                    "Fue visto manejando un auto deportivo.",
                    "Miró fijamente su reloj durante una premiación.",
                    "Fue fotografiado leyendo un menú en un restaurante."
                ],
                "dato": "El video muestra a Stevie Wonder reaccionando con gran rapidez ante un micrófono que cae. La explicación más razonable es que percibió el movimiento por sonido, posición y reflejos escénicos."
            },
            {
                "pregunta": "La teoría satírica 'Birds Aren't Real' afirma que las aves fueron reemplazadas por drones del gobierno. Según el mito, ¿por qué se paran en cables eléctricos?",
                "correcta": "Para recargar sus baterías.",
                "erroneas": [
                    "Para actualizar su software.",
                    "Para enviar datos por fibra óptica.",
                    "Para sincronizarse con satélites."
                ],
                "dato": "El movimiento nació como parodia de las teorías conspirativas extremas. Su gracia está en sonar completamente serio mientras defiende una idea deliberadamente absurda."
            },
            {
                "pregunta": "Una teoría absurda de internet afirma que Finlandia no existe. ¿Para qué habría sido inventada supuestamente?",
                "correcta": "Para permitir que Japón pescara libremente en el mar Báltico.",
                "erroneas": [
                    "Para esconder una base alienígena bajo la nieve.",
                    "Para fabricar teléfonos Nokia sin impuestos.",
                    "Para ocultar una entrada a la Tierra hueca."
                ],
                "dato": "La teoría dice que el territorio finlandés sería en realidad mar abierto y que la ficción permitiría transportar pescado hacia Japón. Es una de esas bromas que se volvió leyenda por lo específica que suena."
            },
            {
                "pregunta": "John Titor fue un supuesto viajero del tiempo que apareció en foros a inicios de los 2000. ¿Qué computadora decía necesitar del pasado?",
                "correcta": "IBM 5100.",
                "erroneas": [
                    "Apple Lisa.",
                    "Commodore 64.",
                    "ENIAC."
                ],
                "dato": "Titor afirmaba venir de 2036 para recuperar una IBM 5100 por una función técnica poco conocida. Ese detalle hizo que el relato pareciera más convincente para muchos usuarios."
            },
            {
                "pregunta": "Cicada 3301 fue uno de los grandes misterios de internet. ¿Qué decía buscar el primer mensaje publicado en 2012?",
                "correcta": "Individuos altamente inteligentes.",
                "erroneas": [
                    "Testigos de ovnis.",
                    "Programadores para una secta lunar.",
                    "Jugadores expertos de ajedrez 4D."
                ],
                "dato": "Cicada 3301 mezcló criptografía, esteganografía, literatura y pistas físicas en distintos países. Todavía no hay consenso sobre si fue reclutamiento, arte colectivo o un juego extremadamente elaborado."
            },
            {
                "pregunta": "En 2019, el evento viral 'Storm Area 51' proponía entrar a la base militar para 'ver aliens'. ¿Qué técnica absurda se popularizó para esquivar las balas?",
                "correcta": "Correr estilo Naruto.",
                "erroneas": [
                    "Caminar como cangrejo.",
                    "Rodar como Sonic.",
                    "Saltar en formación triangular."
                ],
                "dato": "El evento empezó como meme y millones marcaron asistencia en Facebook. Al final, la reunión real fue pequeña y se convirtió más en festival extraño que en invasión extraterrestre."
            },
            {
                "pregunta": "En la cultura pop, las teorías Illuminati suelen obsesionarse con un gesto de manos usado por artistas como Jay-Z. ¿Qué forma ven los conspiranoicos?",
                "correcta": "Un triángulo.",
                "erroneas": [
                    "Una espiral.",
                    "Una cruz invertida.",
                    "Un hexágono."
                ],
                "dato": "Jay-Z popularizó el gesto como símbolo de Roc-A-Fella Records. Internet lo reinterpretó como señal del Ojo de la Providencia y lo volvió combustible perfecto para videos conspirativos."
            },
            {
                "pregunta": "En los años 90, una teoría mexicana decía que el Chupacabras fue usado como cortina de humo política. ¿A qué presidente solían asociar esa teoría?",
                "correcta": "Carlos Salinas de Gortari.",
                "erroneas": [
                    "Vicente Fox.",
                    "Ernesto Zedillo.",
                    "Miguel de la Madrid."
                ],
                "dato": "El mito creció en un momento de crisis económica y tensión política. Para muchos, el monstruo servía como explicación exagerada de por qué las noticias hablaban tanto de ataques al ganado."
            },
            {
                "pregunta": "En 2023, Jaime Maussan presentó en el Congreso mexicano supuestos cuerpos 'no humanos'. ¿De dónde provenían esos cuerpos, según el caso viral?",
                "correcta": "Nazca, Perú.",
                "erroneas": [
                    "Roswell, Estados Unidos.",
                    "Tula, Hidalgo.",
                    "El Popocatépetl."
                ],
                "dato": "El caso de las llamadas momias de Nazca se volvió viral en todo el mundo. Numerosos especialistas han cuestionado su autenticidad y señalado inconsistencias anatómicas."
            },
            {
                "pregunta": "El Popocatépetl aparece constantemente en teorías ovni mexicanas. ¿Qué dicen algunos conspiranoicos que hay dentro o debajo del volcán?",
                "correcta": "Una base extraterrestre o portal dimensional.",
                "erroneas": [
                    "Una ciudad azteca intacta.",
                    "Un laboratorio de clonación de ajolotes.",
                    "Una estación secreta del Metro."
                ],
                "dato": "Las cámaras que monitorean el volcán a veces captan luces o trazos extraños. Muchas suelen explicarse como meteoros, aviones, insectos frente a la lente o basura espacial."
            },
            {
                "pregunta": "En el Metro de la CDMX existe una leyenda sobre estaciones secretas o fantasma. ¿Cuál sería la supuesta estación oculta después de Cuatro Caminos?",
                "correcta": "Transmisiones Militares.",
                "erroneas": [
                    "Ejército Nacional.",
                    "Campo Uno.",
                    "Línea Cero."
                ],
                "dato": "El mito dice que habría una parada clandestina para movilizar tropas. La realidad es menos cinematográfica: hay zonas técnicas, andenes de maniobra y espacios de servicio que alimentan la imaginación urbana."
            },
            {
                "pregunta": "En Chihuahua, La Pascualita es una leyenda urbana sobre un maniquí extremadamente realista. ¿Qué dice el rumor que es en realidad?",
                "correcta": "El cuerpo embalsamado de una novia.",
                "erroneas": [
                    "Una muñeca alemana maldita.",
                    "Una escultura hecha con cera funeraria.",
                    "Una santa no reconocida por la Iglesia."
                ],
                "dato": "La Pascualita apareció en un aparador de vestidos de novia en 1930. Sus manos, ojos y facciones tan detalladas hicieron que la gente empezara a decir que no era un maniquí común."
            },
            {
                "pregunta": "Hay una leyenda urbana que afirma que jugar al cartucho original de 'Pokémon Rojo y Verde' en Japón provocó bajas en niños debido al tono de una canción. ¿Qué mapa la causaba?",
                "correcta": "La música de Pueblo Lavanda.",
                "erroneas": [
                    "El tema de la Cueva Celeste.",
                    "El sonido de la Torre Pokémon.",
                    "La melodía de la Isla Canela."
                ],
                "dato": "El 'Síndrome de Pueblo Lavanda' es un creepypasta clásico. Aprovecha la atmósfera lúgubre de la zona y la música aguda del Game Boy para construir una historia inquietante."
            },
            {
                "pregunta": "Según la leyenda de La Pascualita, ¿cómo habría muerto la supuesta novia original?",
                "correcta": "Por la picadura de un alacrán el día de su boda.",
                "erroneas": [
                    "Ahogada en una presa.",
                    "Envenenada con pastel de boda.",
                    "Por una maldición de su prometido."
                ],
                "dato": "El relato trágico dice que la joven murió justo antes de casarse y que su madre la conservó vestida de novia. La historia cambia según quién la cuente, como buena leyenda urbana."
            },
            {
                "pregunta": "La 'estación secreta' real del Metro CDMX existe, pero no es una base clandestina. ¿Para qué se usa Expometro?",
                "correcta": "Para capacitar personal del Metro.",
                "erroneas": [
                    "Para guardar trenes embrujados.",
                    "Para filmar propaganda gubernamental.",
                    "Para esconder piezas arqueológicas."
                ],
                "dato": "Expometro funciona como una estación de entrenamiento con elementos reales del sistema. Sirve para practicar procedimientos sin interrumpir el servicio público."
            },
            {
                "pregunta": "Una conocida teoría psicológica afirma que los personajes de Winnie Pooh representan trastornos mentales. ¿Qué condición se le asigna al burro Ígor?",
                "correcta": "Depresión clínica y distimia.",
                "erroneas": [
                    "Trastorno obsesivo-compulsivo.",
                    "Ansiedad generalizada crónica.",
                    "Déficit de atención e hiperactividad."
                ],
                "dato": "La teoría asigna rasgos clínicos a cada personaje, pero funciona más como lectura popular que como diagnóstico serio. Aun así, se volvió muy compartida porque parece encajar demasiado bien."
            },
            {
                "pregunta": "Durante años existió el mito urbano de que Michael Jackson compuso en secreto la música de un famoso videojuego de los 90. ¿De qué título se trataba?",
                "correcta": "Sonic the Hedgehog 3.",
                "erroneas": [
                    "Super Mario World.",
                    "Street Fighter II.",
                    "Donkey Kong Country."
                ],
                "dato": "La participación de Michael Jackson en la música de Sonic 3 fue durante años una mezcla de rumor y misterio. Con el tiempo, declaraciones de personas involucradas reforzaron que sí hubo colaboración no acreditada."
            },
            {
                "pregunta": "En Pokémon Rojo y Azul, una leyenda decía que Mew estaba escondido bajo un objeto específico. ¿Cuál?",
                "correcta": "El camión junto al S.S. Anne.",
                "erroneas": [
                    "Una estatua del gimnasio de Ciudad Plateada.",
                    "La cama del protagonista.",
                    "La fuente de Ciudad Celeste."
                ],
                "dato": "El camión era un objeto extraño en una zona poco accesible, así que se volvió perfecto para rumores. Mew sí podía obtenerse por glitches, pero no empujando ese camión."
            }
        ]
    },
    {
        "id": "historia-rara",
        "nombre": "Historia rara",
        "descripcion": "Hechos reales, datos curiosos, sucesos insólitos y rarezas documentadas.",
        "preguntas": [
            {
                "pregunta": "En 1932, el ejército de Australia declaró oficialmente la guerra a una población de emúes que destruía cultivos. ¿Cómo terminó este conflicto armado?",
                "correcta": "Los emúes ganaron y el ejército se retiró.",
                "erroneas": [
                    "Los emúes fueron erradicados por completo.",
                    "Se firmó un tratado de paz con los granjeros locales.",
                    "El ejército utilizó tanques para cercarlos."
                ],
                "dato": "La llamada Guerra del Emú fue un desastre logístico. Las aves se dispersaban con rapidez, resistían los disparos y obligaron a los soldados a abandonar la operación con más vergüenza que gloria."
            },
            {
                "pregunta": "Fredric Baur fue el químico e ingeniero que diseñó la famosa lata cilíndrica de Pringles. ¿Qué pidió en su testamento antes de morir?",
                "correcta": "Ser cremado y sepultado dentro de una lata de Pringles.",
                "erroneas": [
                    "Que la receta original fuera enterrada con él.",
                    "Donar su fortuna al primer cliente con una lata vacía.",
                    "Que el logo de la marca cambiara a su rostro."
                ],
                "dato": "Su familia cumplió el deseo en 2008. Compraron una lata de Pringles sabor Original y colocaron parte de sus cenizas dentro del envase que él ayudó a volver icónico."
            },
            {
                "pregunta": "Aunque hoy asociamos la palabra 'meme' con imágenes graciosas en internet, el término fue popularizado en 1976 por un científico. ¿En qué campo nació originalmente?",
                "correcta": "En la biología evolutiva y la genética.",
                "erroneas": [
                    "En la psicología infantil.",
                    "En la informática temprana.",
                    "En la sociología de masas."
                ],
                "dato": "Richard Dawkins usó la palabra 'meme' para hablar de ideas que se replican culturalmente. Internet le dio una segunda vida, bastante menos académica y bastante más caótica."
            },
            {
                "pregunta": "En Xochimilco existe una leyenda viral sobre una chinampa llena de muñecas colgadas. ¿Cómo se conoce ese lugar?",
                "correcta": "La Isla de las Muñecas.",
                "erroneas": [
                    "El Jardín de las Niñas Rotas.",
                    "La Chinampa Maldita.",
                    "El Canal de los Ojos."
                ],
                "dato": "El lugar se volvió famoso por sus muñecas deterioradas colgadas entre árboles y canales. La historia mezcla duelo, superstición y turismo oscuro con una imagen imposible de olvidar."
            },
            {
                "pregunta": "En Coahuila se volvió viral un caso que parecía broma: policías detuvieron a un hombre y también esposaron a su muñeco. ¿Qué muñeco era?",
                "correcta": "Chucky.",
                "erroneas": [
                    "Annabelle.",
                    "El muñeco de ventrílocuo de Saw.",
                    "Pinocho."
                ],
                "dato": "El hombre usaba el muñeco con un cuchillo real para intimidar personas. La imagen de Chucky esposado hizo el resto y convirtió el arresto en noticia viral."
            },
            {
                "pregunta": "¿Qué famoso monumento parisino fue vendido exitosamente dos veces por el estafador austrohúngaro Victor Lustig haciéndose pasar por un conde del gobierno?",
                "correcta": "La Torre Eiffel.",
                "erroneas": [
                    "El Museo del Louvre.",
                    "El Arco de Triunfo.",
                    "La Catedral de Notre Dame."
                ],
                "dato": "En 1925, Lustig leyó que la Torre Eiffel costaba mucho dinero de mantener y falsificó credenciales para convencer a chatarreros de que el gobierno la vendería como chatarra. Consiguió un soborno masivo y huyó a Viena. ¡Meses después regresó y lo hizo de nuevo con otro chatarrero!"
            },
            {
                "pregunta": "En Suiza, de acuerdo con sus estrictas leyes modernas de protección y derechos hacia los animales, ¿qué mascota es ilegal tener de forma solitaria en casa?",
                "correcta": "Una cobaya (conejillo de Indias).",
                "erroneas": [
                    "Un loro huérfano.",
                    "Un gato de departamento.",
                    "Un pez dorado de pecera."
                ],
                "dato": "Las cobayas son consideradas animales sumamente sociales que necesitan compañía para no sufrir aislamiento. La ley es tan estricta que existen servicios locales de renta de cobayas por si una de tu pareja de mascotas fallece y no quieres comprar otra."
            },
            {
                "pregunta": "¿Qué temida enfermedad, caracterizada por la falta extrema de vitamina C, se propagaba habitualmente entre los marineros en los barcos piratas de los siglos XVII y XVIII?",
                "correcta": "Escorbuto.",
                "erroneas": [
                    "Peste negra.",
                    "Malaria tropical.",
                    "Cólera marino."
                ],
                "dato": "Al pasar meses comiendo solo cecina y galletas secas sin frutas frescas, a los piratas se les caían los dientes y se les abrían las heridas. El misterio se resolvió cuando la armada británica descubrió que un simple chorro de jugo de limón en el agua prevenía el desastre."
            },
            {
                "pregunta": "¿A qué aterrador animal de la antigüedad utilizó el general cartaginés Aníbal Barca para cruzar los gélidos Alpes y atacar por sorpresa al Imperio Romano?",
                "correcta": "Elefantes de guerra.",
                "erroneas": [
                    "Leones africanos entrenados.",
                    "Camellos blindados norteños.",
                    "Osos pardos amaestrados."
                ],
                "dato": "Aníbal marchó con cerca de 37 elefantes. Ver a estas bestias gigantescas bajando por las montañas nevadas causó un impacto psicológico brutal y de terror entre las legiones romanas, que jamás habían visto algo parecido."
            },
            {
                "pregunta": "Los antiguos romanos tenían una costumbre social muy peculiar al beber vino: echaban un pedazo de pan tostado dentro de la copa. ¿Qué tradición actual nació de este mitote?",
                "correcta": "El brindis por la salud de los presentes.",
                "erroneas": [
                    "La hora feliz en las tabernas.",
                    "El uso de pajillas o popotes para beber.",
                    "La cata técnica de vinos de mesa."
                ],
                "dato": "El pan tostado servía para suavizar el sabor amargo y la acidez de los vinos de baja calidad de la época. Al arrojar el pan (llamado 'tost'), hacían un discurso deseando buena salud, término que evolucionó en el 'toast' o brindis en inglés."
            },
            {
                "pregunta": "Debido a una paranoia extrema sobre complots y envenenamientos, ¿qué drástica medida de seguridad obligaba Adolf Hitler a cumplir a quince mujeres diariamente?",
                "correcta": "Probar toda su comida tres veces al día antes de que él la ingiriera.",
                "erroneas": [
                    "Masticar sus medicinas para verificar el sabor.",
                    "Revisar el aire de su búnker con mascarillas de prueba.",
                    "Dormir en su cama para descartar trampas con agujas."
                ],
                "dato": "Hitler era vegetariano y temía que los aliados pusieran veneno en sus verduras. Estas jóvenes, conocidas históricamente como 'las catadoras de Hitler', arriesgaban la vida en cada desayuno, almuerzo y cena, llorando de alivio tras pasar cada hora de digestión."
            },
            {
                "pregunta": "En la inmensa historia del diseño y la moda de alta costura, ¿qué legendaria diseñadora revolucionó el guardarropa femenino en los años 20 al inventar el icónico 'Little Black Dress'?",
                "correcta": "Coco Chanel.",
                "erroneas": [
                    "Elsa Schiaparelli.",
                    "Mary Quant.",
                    "Miuccia Prada."
                ],
                "dato": "Antes de Chanel, el color negro estaba estrictamente reservado para los funerales y los periodos de luto riguroso. Ella demostró que el negro podía ser el color más elegante, cómodo y neutral de la alta sociedad urbana."
            },
            {
                "pregunta": "Entre los años 1912 y 1948, los Juegos Olímpicos de la era moderna otorgaban medallas oficiales de oro, plata y bronce en disciplinas insólitas para el deporte actual. ¿Cuáles eran?",
                "correcta": "Bellas artes como música, pintura, escultura y literatura.",
                "erroneas": [
                    "Juegos de cartas tradicionales como póker y ajedrez.",
                    "Habilidades domésticas como costura rápida y cocina alpina.",
                    "Cuidado de jardines y diseño de carruajes reales."
                ],
                "dato": "El fundador de los juegos modernos, Pierre de Coubertin, quería revivir el ideal griego clásico de equilibrar mente y cuerpo. Las obras artísticas debían estar estrictamente inspiradas en el deporte. La categoría se eliminó porque los artistas eran profesionales y no amateurs."
            },
            {
                "pregunta": "La reina Isabel II del Reino Unido, famosa por su largo reinado de más de 70 años, poseía una habilidad técnica inusual que aprendió durante la Segunda Guerra Mundial a los 16 años. ¿Cuál era?",
                "correcta": "Mecánica automotriz de camiones y reparación de neumáticos.",
                "erroneas": [
                    "Pilotaje de aviones de reconocimiento militar.",
                    "Criptografía y descifrado de códigos en clave.",
                    "Operación técnica de radares antiaéreos."
                ],
                "dato": "Se unió al Servicio Territorial Auxiliar de Mujeres como conductora y mecánica entrenada. Le encantaba desarmar motores y cambiar llantas pesadas, ganándose el apodo cariñoso de 'Princesa Automecánica' en las portadas de los diarios británicos."
            },
            {
                "pregunta": "En la historia de la aviación, ¿en qué fecha exacta y dónde realizaron los hermanos Wright el primer vuelo corto controlado de la historia de la humanidad?",
                "correcta": "El 17 de diciembre de 1903 en Kitty Hawk.",
                "erroneas": [
                    "El 4 de julio de 1899 en Nueva York.",
                    "El 12 de octubre de 1910 en París.",
                    "El 1 de mayo de 1920 en Berlín."
                ],
                "dato": "El primer vuelo duró apenas 12 segundos y cubrió una distancia menor a la longitud de un avión comercial moderno. Aun así, rompió las leyes físicas de la época y cambió la historia del transporte para siempre."
            },
            {
                "pregunta": "En el año 1832, una importante metrópolis internacional revolucionó el transporte de masas al inaugurar la primera línea de tranvía urbano de la historia. ¿Qué ciudad fue?",
                "correcta": "Nueva York.",
                "erroneas": [
                    "Londres.",
                    "Berlín.",
                    "Viena."
                ],
                "dato": "Esos primeros tranvías neoyorquinos no eran eléctricos ni usaban motores de vapor: eran vagones de madera jalados por caballos sobre rieles de hierro empotrados en las calles de la Tercera Avenida, reduciendo el golpeteo del viejo empedrado."
            },
            {
                "pregunta": "A finales del siglo XVIII, un invento revolucionario diseñado por James Watt impulsó por completo la mecanización de las fábricas del mundo. ¿Qué máquina era?",
                "correcta": "La máquina de vapor.",
                "erroneas": [
                    "El telar mecánico digital.",
                    "La turbina hidráulica pura.",
                    "La dinamo eléctrica primitiva."
                ],
                "dato": "Watt no inventó la máquina de vapor, pero le añadió un condensador separado que evitaba que el motor perdiera calor constantemente, volviéndola tan eficiente que desató de golpe la Primera Revolución Industrial en Inglaterra."
            },
            {
                "pregunta": "En el Antiguo Egipto, las pirámides de Giza causaban asombro por su colosal tamaño, pero arquitectónicamente y dentro de su cultura religiosa, ¿cuál era su función principal?",
                "correcta": "Servir como tumbas monumentales para los faraones.",
                "erroneas": [
                    "Estaciones astronómicas de mapeo lunar.",
                    "Graneros imperiales para almacenar trigo en sequías.",
                    "Búnkers militares para proteger tesoros reales."
                ],
                "dato": "Las pirámides representaban los rayos del sol solidificados en piedra, sirviendo de rampa mística para que el alma inmortal del faraón ascendiera directo hacia el reino de los dioses celestiales en el más allá."
            },
            {
                "pregunta": "En el año 79 d.C., una devastadora erupción volcánica del Monte Vesubio sepultó por completo una joya urbana del Imperio Romano, preservándola intacta en el tiempo. ¿Qué ciudad fue?",
                "correcta": "Pompeya.",
                "erroneas": [
                    "Bizancio.",
                    "Cartago.",
                    "Alejandría."
                ],
                "dato": "Las cenizas volcánicas calientes actuaron como un escudo hermético perfecto. Al excavar la zona siglos después, los arqueólogos encontraron los edificios, los frescos, los panes en los hornos y moldes de las víctimas en su posición exacta del desastre."
            },
            {
                "pregunta": "En la historia de las grandes expediciones y conquistas del mundo, ¿quién fue el legendario guerrero que fundó y expandió el colosal Imperio Mongol?",
                "correcta": "Gengis Kan.",
                "erroneas": [
                    "Kublai Khan.",
                    "Tamerlán el Grande.",
                    "Atila el Huno."
                ],
                "dato": "Unificó a las tribus nómadas del noreste de Asia a inicios del siglo XIII mediante guerrillas de caballería rápida. Su imperio se convirtió en el imperio de tierras continuas más grande de toda la historia humana."
            },
            {
                "pregunta": "¿Qué célebre rey babilónico pasó a los anales de la historia de la humanidad por redactar uno de los primeros códigos de leyes escritas conocidos?",
                "correcta": "Hammurabi.",
                "erroneas": [
                    "Nabucodonosor II.",
                    "Ciro el Grande.",
                    "Sargón de Acad."
                ],
                "dato": "El famosísimo Código de Hammurabi (1750 a.C.) regulaba contratos, salarios y castigos bajo el estricto principio jurídico de la ley del talión: 'ojo por ojo, diente por diente', grabado en una estela de piedra negra."
            },
            {
                "pregunta": "En la historia marítima universal, ¿cuál fue el nombre del conflicto bélico entre las coronas de Inglaterra y Francia que duró realmente más de 100 años intermitentes?",
                "correcta": "La Guerra de los Cien Años.",
                "erroneas": [
                    "La Guerra de las Rosas.",
                    "La Guerra de los Treinta Años.",
                    "La Guerra de Sucesión Continental."
                ],
                "dato": "Duró exactamente 116 años (de 1337 a 1453). Este conflicto feudal de desgaste transformó por completo las tácticas militares de Europa y vio el nacimiento y auge de figuras históricas legendarias como Juana de Arco."
            },
            {
                "pregunta": "¿Qué célebre tratado internacional, firmado en 1919, puso fin oficialmente al estado de guerra de la Primera Guerra Mundial entre los Aliados y Alemania?",
                "correcta": "El Tratado de Versalles.",
                "erroneas": [
                    "La Paz de Westfalia.",
                    "El Tratado de Tordesillas.",
                    "El Pacto de Utrecht."
                ],
                "dato": "Se firmó exactamente cinco años después del asesinato del archiduque Francisco Fernando. Sus severas restricciones económicas y territoriales impuestas a Alemania generaron un enorme resentimiento que sembró el terreno para la Segunda Guerra Mundial."
            },
            {
                "pregunta": "En el año 1957, en medio de las tensiones de la Guerra Fría, la Unión Soviética asombró al mundo al poner en órbita el primer satélite artificial de la historia. ¿Cómo se llamaba?",
                "correcta": "Sputnik 1.",
                "erroneas": [
                    "Vostok 1.",
                    "Apollo 11.",
                    "Explorer 1."
                ],
                "dato": "Era una esfera de metal pulido de apenas 58 centímetros con cuatro antenas de radio. El sutil sonido de su señal 'beip-beip' captado por los radioaficionados de la Tierra desató el pánico y la carrera espacial en Estados Unidos."
            },
            {
                "pregunta": "Los antiguos ingenieros del Imperio Romano eran famosos por construir una imponente red de infraestructura civil para abastecer de agua potable a las ciudades. ¿Cómo se llamaban estas estructuras?",
                "correcta": "Acueductos.",
                "erroneas": [
                    "Viaductos de arco.",
                    "Termas imperiales.",
                    "Cloacas máximas."
                ],
                "dato": "Estas megaestructuras funcionaban puramente por la fuerza de la gravedad. Estaban construidas con una pendiente descendente tan sutil, precisa y perfecta que el agua viajaba con fluidez a lo largo de decenas de kilómetros desde los manantiales de las montañas."
            },
            {
                "pregunta": "En la inmensa historia del Imperio Inca, los administradores utilizaban una extraña y avanzada herramienta textil para llevar registros contables y censos sin usar escritura. ¿Cuál era?",
                "correcta": "El Quipus (un sistema de cuerdas de colores anudadas).",
                "erroneas": [
                    "El Ábaco de piedra andino.",
                    "Las tablillas de arcilla quemada.",
                    "Los glifos pintados en hojas de maguey."
                ],
                "dato": "A través del tipo de nudo, el color de la cuerda y la distancia entre los hilos, los expertos incas sabían con precisión exacta los inventarios de maíz, el número de guerreros y los impuestos del imperio, un código que los españoles jamás lograron descifrar del todo."
            },
            {
                "pregunta": "En los años dorados de las cafeterías del Londres del siglo XVII y XVIII, estos locales públicos recibieron un apodo muy chistoso por el precio de su entrada y las pláticas intelectuales que albergaban. ¿Cuál era?",
                "correcta": "Las Universidades del Penique.",
                "erroneas": [
                    "Los Parlamentos de la Cafeína.",
                    "Las Sectas del Grano Tostado.",
                    "Los Clubes de los Chismosos Reales."
                ],
                "dato": "Por el precio de un penique, cualquier ciudadano común podía entrar, comprar una taza de café y pasar horas debatiendo de ciencia, política o literatura con filósofos, abogados y capitanes de barco, democratizando la cultura pop de la época."
            },
            {
                "pregunta": "En el año 1885, un monumental obsequio llegó desarmado en barcos a los muelles de Nueva York tras cruzar el Océano Atlántico como símbolo de amistad franco-estadounidense. ¿Qué monumento era?",
                "correcta": "La Estatua de la Libertad.",
                "erroneas": [
                    "El obelisco de Central Park.",
                    "La aguja del Empire State.",
                    "La réplica de la antorcha olímpica."
                ],
                "dato": "Viajó dividida en 350 piezas de cobre embaladas dentro de 214 cajas de madera. Su color original no era verde, sino un brillante tono bronce metálico, el cual cambió debido a la oxidación natural del cobre al aire libre con el paso de las décadas."
            },
            {
                "pregunta": "Durante la Edad Media europea, los médicos de la época recetaban un remedio de farmacia insólito, macabro y muy cotizado para curar dolores de estómago y heridas de sangre. ¿Cuál era?",
                "correcta": "Extracto o polvo de momias reales trituradas.",
                "erroneas": [
                    "Salsa de ajo fermentado en vinagre gótico.",
                    "Vino mezclado con oro líquido batido.",
                    "Polvo de cuerno de toro negro."
                ],
                "dato": "La sustancia asfáltica con la que se embalsamaban los cuerpos en Egipto se confundió con un medicamento antiguo llamado 'mumia'. Esto generó un mercado negro masivo donde se saqueaban tumbas y se trituraban restos para venderlos en frascos en las boticas de Europa."
            },
            {
                "pregunta": "En la historia de la piratería de los siglos XVII y XVIII, en la famosa isla de la Tortuga, los piratas crearon una de las primeras uniones legales civiles estructuradas entre dos hombres. ¿Cómo se llamaba?",
                "correcta": "Matelotage.",
                "erroneas": [
                    "Hermandad de la Costa.",
                    "Contrato de abordaje civil.",
                    "Pacto de cofradía del mar."
                ],
                "dato": "A través del 'matelotage', dos piratas unían sus finanzas, compartían sus botines y se heredaban legalmente todas sus posesiones en caso de fallecimiento en combate. Funcionaba exactamente con los mismos derechos económicos de un matrimonio moderno."
            },
            {
                "pregunta": "En el Antiguo Egipto existía un gremio de mujeres muy particular que cobraba honorarios profesionales altos por asistir a los funerales de la clase alta. ¿Qué labor realizaban?",
                "correcta": "Plañideras (mujeres contratadas para llorar y gritar de dolor).",
                "erroneas": [
                    "Bailarinas rituales de la máscara de Anubis.",
                    "Pintoras de sarcófagos de madera.",
                    "Embalsamadoras asistentes de aceites sagrados."
                ],
                "dato": "Entre más mujeres llorando e histéricas hubiera en un entierro, más estatus social y poder demostraba tener la familia del fallecido. Tenían prohibido tener pelo largo para poder jalarse los cabellos y llenarse la cara de lodo en señal de duelo público."
            },
            {
                "pregunta": "¿Qué icónica marca de calzado deportivo del mercado actual nació originalmente en Estados Unidos en 1964 bajo el nombre de 'Blue Ribbon Sports'?",
                "correcta": "Nike.",
                "erroneas": [
                    "Adidas.",
                    "Puma.",
                    "Reebok."
                ],
                "dato": "Comenzó como una distribuidora local de tenis japoneses en la cajuela del auto de su fundador. En 1971 cambiaron el nombre a Nike (en honor a la diosa griega de la victoria) y un estudiante de diseño creó el famoso logotipo 'Swoosh' por apenas 35 dólares."
            },
            {
                "pregunta": "En las ferias de los años 50, se lanzó al mercado infantil de Estados Unidos el primer juguete de la historia que se anunció con éxito masivo en comerciales de televisión abierta. ¿Cuál fue?",
                "correcta": "Mr. Potato Head (El Señor Cara de Papa).",
                "erroneas": [
                    "La muñeca Barbie.",
                    "El cochecito de metal Hot Wheels.",
                    "El bloque de construcción de Lego."
                ],
                "dato": "La caja original de 1952 no incluía el cuerpo de plástico que conocemos hoy. Traía solo las manos, los ojos, el bigote y los sombreros con alfileres, obligando a los niños a tomar una papa o vegetal real de la cocina de su madre para enterrarle las piezas."
            },
            {
                "pregunta": "En la historia de la ciencia y los premios internacionales, ¿quién fue la brillante e histórica primera mujer en ganar un Premio Nobel en la historia?",
                "correcta": "Marie Curie.",
                "erroneas": [
                    "Rosalind Franklin.",
                    "Ada Lovelace.",
                    "Lise Meitner."
                ],
                "dato": "Marie Curie no solo fue la primera mujer en ganarlo, sino que es la única persona en toda la historia de la humanidad en ganar dos Premios Nobel en dos campos científicos totalmente distintos: Física (1903) y Química (1911)."
            },
            {
                "pregunta": "En la mitología de los récords del entretenimiento, ¿qué famoso cineasta, dibujante y productor tiene el récord histórico absoluto de haber ganado más premios Óscar de la Academia?",
                "correcta": "Walt Disney.",
                "erroneas": [
                    "Steven Spielberg.",
                    "Alfred Hitchcock.",
                    "Stanley Kubrick."
                ],
                "dato": "A lo largo de su carrera cinematográfica, Walt Disney acumuló un total impresionante de 26 premios Óscar y recibió 59 nominaciones. Uno de los más curiosos fue un premio especial por 'Blancanieves' que consistía en una estatuilla normal y siete miniaturas."
            }
        ]
    },
    {
        "id": "cine-tv",
        "nombre": "Cine, TV y cultura pop",
        "descripcion": "Películas, televisión, videojuegos, celebridades, música y cultura pop.",
        "preguntas": [
            {
                "pregunta": "El icónico código digital verde que cae al inicio de las películas de 'The Matrix' parece alta tecnología, pero ¿de dónde se extrajeron realmente esos caracteres?",
                "correcta": "Un libro de recetas de sushi.",
                "erroneas": [
                    "Un manual de criptografía ruso.",
                    "Una enciclopedia de símbolos alquímicos.",
                    "Un registro de fallas informáticas."
                ],
                "dato": "El diseñador Simon Whiteley ha contado que el código se basó en caracteres japoneses tomados de libros de cocina de su esposa. Así que la Matrix tiene más sushi del que parece."
            },
            {
                "pregunta": "Nicolas Cage es conocido por sus excéntricas compras millonarias. ¿Qué estructura compró en un cementerio de Nueva Orleans para su futuro descanso?",
                "correcta": "Una tumba gigante en forma de pirámide blanca.",
                "erroneas": [
                    "Un mausoleo gótico con gárgolas reales.",
                    "Una réplica del castillo de Drácula bajo tierra.",
                    "Un sarcófago romano importado."
                ],
                "dato": "La pirámide está en el cementerio de St. Louis No. 1 y lleva la frase latina 'Omnia Ab Uno'. Es exactamente el tipo de compra que suena inventada hasta que recuerdas que hablamos de Nicolas Cage."
            },
            {
                "pregunta": "Slender Man se volvió una de las leyendas más famosas de internet. ¿Dónde nació originalmente?",
                "correcta": "En un concurso de Photoshop del foro Something Awful.",
                "erroneas": [
                    "En un servidor abandonado de Minecraft.",
                    "En una cadena de correos de Hotmail.",
                    "En un archivo filtrado del FBI."
                ],
                "dato": "Eric Knudsen creó al personaje en 2009 editando fotografías antiguas con una figura alta y sin rostro. El diseño era tan simple que dejó espacio perfecto para que internet lo agrandara."
            },
            {
                "pregunta": "En la mitología de internet, 'The Backrooms' son espacios amarillos infinitos y vacíos. ¿Cómo se entra supuestamente a ellos?",
                "correcta": "Haciendo 'no-clip' fuera de la realidad.",
                "erroneas": [
                    "Durmiendo frente a un router viejo.",
                    "Usando un ascensor entre pisos inexistentes.",
                    "Siguiendo una luz fluorescente azul."
                ],
                "dato": "El concepto toma prestada la idea de videojuegos donde un error te permite atravesar paredes. Convertir ese bug en terror existencial fue una jugada muy internet."
            },
            {
                "pregunta": "La leyenda de Minecraft 'Herobrine' describe a una figura misteriosa parecida a Steve. ¿Qué rasgo lo vuelve reconocible?",
                "correcta": "Tiene los ojos completamente blancos.",
                "erroneas": [
                    "No tiene sombra.",
                    "Camina hacia atrás.",
                    "Solo aparece en mundos con lava."
                ],
                "dato": "Herobrine nació como creepypasta y se volvió parte del folclor de Minecraft. Mojang incluso bromeó durante años con notas de actualización que decían que lo habían eliminado."
            },
            {
                "pregunta": "En el Efecto Mandela, mucha gente recuerda incorrectamente que Mr. Monopoly usa un accesorio clásico. ¿Cuál?",
                "correcta": "Un monóculo.",
                "erroneas": [
                    "Un bastón de oro.",
                    "Un reloj de bolsillo.",
                    "Una pipa."
                ],
                "dato": "Mr. Monopoly nunca ha llevado monóculo. La confusión suele atribuirse a una mezcla mental con personajes ricos de caricatura y con Mr. Peanut, que sí usaba uno."
            },
            {
                "pregunta": "Una leyenda urbana mexicana afirma que Pedro Infante no murió en el accidente aéreo de 1957, sino que vivió bajo otra identidad en Chihuahua. ¿En qué ciudad lo ubicaba el mito?",
                "correcta": "Delicias.",
                "erroneas": [
                    "Parral.",
                    "Ciudad Juárez.",
                    "Cuauhtémoc."
                ],
                "dato": "El mito decía que el cantante habría quedado desfigurado y se escondió para vivir tranquilo. Como muchas leyendas de ídolos, se alimenta de la dificultad de aceptar una muerte repentina."
            },
            {
                "pregunta": "Según la teoría conspirativa sobre Pedro Infante en Chihuahua, ¿qué identidad habría usado después de 'sobrevivir'?",
                "correcta": "Antonio Pedro.",
                "erroneas": [
                    "José Ángel Negrete.",
                    "Luis Mendoza.",
                    "Ramón Valdés."
                ],
                "dato": "Antonio Pedro fue señalado por algunos fans por su parecido físico, su voz y sus gestos. La historia se volvió parte del mitote alrededor del Cine de Oro mexicano."
            },
            {
                "pregunta": "En la teoría de que Juan Gabriel seguía vivo, ¿en qué ciudad europea se le ha ubicado en versiones recientes del mito?",
                "correcta": "París.",
                "erroneas": [
                    "Madrid.",
                    "Roma.",
                    "Viena."
                ],
                "dato": "El rumor creció por declaraciones de personas cercanas y supuestos avistamientos. Como buen mito de celebridad, siempre aparece alguien que jura haberlo visto de lejos."
            },
            {
                "pregunta": "Una teoría mexicana afirma que Luis Miguel murió joven y fue reemplazado por un doble. ¿Qué accidente aparece en una de las versiones del rumor?",
                "correcta": "Un accidente esquiando.",
                "erroneas": [
                    "Una caída de caballo.",
                    "Un choque en yate.",
                    "Una explosión en un estudio."
                ],
                "dato": "La versión dice que la disquera habría reemplazado al cantante para proteger un negocio enorme. Es una teoría sin pruebas, pero muy persistente por los cambios de imagen del artista."
            },
            {
                "pregunta": "En la leyenda urbana de Canal 5, Selene Delgado se volvió inquietante por aparecer en un segmento de personas desaparecidas. ¿Cómo se llamaba ese segmento?",
                "correcta": "Al servicio de la comunidad.",
                "erroneas": [
                    "Casos sin resolver.",
                    "México busca.",
                    "Archivo nocturno."
                ],
                "dato": "La combinación de transmisión nocturna, música seria y una foto repetida durante años convirtió el segmento en material perfecto para teorías y creepypastas."
            },
            {
                "pregunta": "El Ayuwoki fue un meme y creepypasta muy popular en México y Latinoamérica. ¿De qué artista era una versión terrorífica?",
                "correcta": "Michael Jackson.",
                "erroneas": [
                    "Luis Miguel.",
                    "Juan Gabriel.",
                    "Freddie Mercury."
                ],
                "dato": "El nombre viene de una deformación de 'Annie, are you ok?' de 'Smooth Criminal'. Un animatrónico inquietante hizo el resto y el meme se fue directo a la cultura popular."
            },
            {
                "pregunta": "Según el creepypasta del Ayuwoki, ¿qué sonido anunciaba que estaba cerca?",
                "correcta": "'Hee hee'.",
                "erroneas": [
                    "'Eoo'.",
                    "'Shamone'.",
                    "'Au'."
                ],
                "dato": "El mito decía que podía aparecer de madrugada si escuchabas su característico grito. Era terror, parodia y chiste musical al mismo tiempo."
            },
            {
                "pregunta": "La Mano Peluda tuvo uno de los relatos paranormales más famosos de la radio mexicana: el caso Josué. ¿Qué decía Josué que había hecho?",
                "correcta": "Un pacto con el diablo.",
                "erroneas": [
                    "Un viaje astral al Metro.",
                    "Una invocación en el Popocatépetl.",
                    "Un exorcismo en un Oxxo."
                ],
                "dato": "La llamada se volvió legendaria por la tensión en vivo, las interferencias y la reacción del conductor. Para muchos oyentes fue radio de terror en su forma más efectiva."
            },
            {
                "pregunta": "Según la famosísima serie animada de televisión 'El Chavo del Ocho', ¿cuál era la comida favorita del Chavo por la que hacía cualquier cosa?",
                "correcta": "Las tortas de jamón.",
                "erroneas": [
                    "Los tacos de suadero.",
                    "Las enchiladas suizas.",
                    "El pan de dulce con leche."
                ],
                "dato": "A pesar de ser su comida favorita, a lo largo de toda la serie el Chavo solo logra morder o comer una torta de jamón completa en contadas ocasiones, ya que casi siempre se las robaban o pasaba algo absurdo en la vecindad."
            },
            {
                "pregunta": "¿En qué año votaron las mujeres por primera vez en unas elecciones federales en México, marcando un hito en la historia de la democracia del país?",
                "correcta": "El 3 de julio de 1955.",
                "erroneas": [
                    "El 16 de septiembre de 1910.",
                    "El 20 de noviembre de 1940.",
                    "El 5 de mayo de 1968."
                ],
                "dato": "Fue durante el gobierno del presidente Adolfo Ruiz Cortines. Ese día las mujeres acudieron a las urnas de forma masiva para elegir a los diputados de la XLIII Legislatura, cambiando el rumbo social de México para siempre."
            },
            {
                "pregunta": "El primer presidente oficial en la historia de México independiente es recordado como Guadalupe Victoria, pero ¿cuál era su verdadero nombre de nacimiento?",
                "correcta": "José Miguel Ramón Adaucto Fernández Félix.",
                "erroneas": [
                    "Juan Nepomuceno Almonte.",
                    "Vicente Guerrero Saldaña.",
                    "Antonio López de Santa Anna."
                ],
                "dato": "Se cambió el nombre a 'Guadalupe' en honor a la Virgen de Guadalupe y 'Victoria' por el triunfo obtenido en la lucha por la Independencia. Gobernó de 1824 a 1829 de forma impecable."
            },
            {
                "pregunta": "En el lenguaje coloquial y popular de los mexicanos, ¿qué significa exactamente cuando una persona te dice que anda 'achicopalado'?",
                "correcta": "Que se encuentra desanimado, triste o de capa caída.",
                "erroneas": [
                    "Que tiene mucha prisa o ansiedad.",
                    "Que está sumamente enojado y busca pleito.",
                    "Que anda de presumido o muy alegre."
                ],
                "dato": "Esta joya del léxico mexicano proviene de una deformación de vocablos antiguos americanos. Es la descripción perfecta para ese estado mental en el que no tienes ganas de salir del sillón ni por unos tacos."
            },
            {
                "pregunta": "En la gastronomía tradicional mexicana existe una salsa legendaria y compleja compuesta por más de 20 ingredientes (chiles, chocolate, semillas) que baña platillos festivos. ¿Cuál es?",
                "correcta": "El mole.",
                "erroneas": [
                    "El pipián verde.",
                    "La salsa macha.",
                    "El adobo norteño."
                ],
                "dato": "El mole poblano original es una de las cumbres del sincretismo cultural. Su preparación requiere tanto equilibrio de sabores que en las familias mexicanas la receta secreta de la abuela se defiende casi como un secreto de estado."
            },
            {
                "pregunta": "En el juego tradicional de mesa mexicano de la Lotería, ¿qué dibujo icónico representa la tarjeta número 47, famosa por la tonada con la que se canta en las ferias?",
                "correcta": "El corazón.",
                "erroneas": [
                    "La sirena.",
                    "El valiente.",
                    "La muerte."
                ],
                "dato": "El gritón de la feria suele cantarla diciendo: '¡No me extrañes corazón, que regreso en el camión!'. La Lotería fue introducida por los españoles en el siglo XVIII, pero se volvió un juego popular de mercado tras la Independencia."
            },
            {
                "pregunta": "¿Cuál es la flor tradicional, aromática y de color naranja intenso que se utiliza de forma obligatoria en los altares mexicanos para guiar a las almas en el Día de Muertos?",
                "correcta": "La flor de Cempasúchil.",
                "erroneas": [
                    "La flor de nochebuena.",
                    "El lirio de agua.",
                    "La dalia silvestre."
                ],
                "dato": "Su nombre proviene del náhuatl y significa 'veinte flores' o 'varias flores'. Los antiguos mexicanos creían que sus pétalos guardaban el calor del sol, lo que iluminaba el camino de regreso de los difuntos cada noviembre."
            },
            {
                "pregunta": "En el cine clásico mexicano de luchadores, ¿qué emblemático villano o monstruo internacional de la literatura enfrentó El Santo en una de sus películas más taquilleras y famosas?",
                "correcta": "Las mujeres vampiro.",
                "erroneas": [
                    "El monstruo del pantano.",
                    "El jinete sin cabeza de la frontera.",
                    "Los robots alienígenas del espacio."
                ],
                "dato": "La película 'Santo contra las mujeres vampiro' (1962) se convirtió en una pieza de culto absoluto en Europa y Francia. Los críticos extranjeros quedaron maravillados por la mezcla de surrealismo pop con lucha libre mexicana."
            },
            {
                "pregunta": "¿Qué célebre cantante e ícono de la música ranchera mexicana nació en Costa Rica pero se consideraba a sí misma profundamente mexicana, acuñando una frase inmortal sobre el tema?",
                "correcta": "Chavela Vargas.",
                "erroneas": [
                    "Lola Beltrán.",
                    "Lucha Villa.",
                    "Amalia Mendoza."
                ],
                "dato": "Cuando los reporteros le preguntaban por qué decía ser mexicana si había nacido en Centroamérica, Chavela respondía de forma contundente: '¡Los mexicanos nacemos donde nos da la santísima gana!'."
            },
            {
                "pregunta": "En la mitología de las trivias de geografía de México, ¿cuál es el estado de la República que posee la mayor extensión territorial (kilómetros cuadrados) de todo el país?",
                "correcta": "Chihuahua.",
                "erroneas": [
                    "Sonora.",
                    "Coahuila.",
                    "Oaxaca."
                ],
                "dato": "El estado grande ocupa casi el 12.6% de todo el territorio nacional. Es tan inmenso que dentro de sus fronteras caben perfectamente países enteros de Europa como el Reino Unido o Grecia."
            },
            {
                "pregunta": "¿Qué nombre recibe el gigantesco sombrero tradicional mexicano de ala ancha y copa alta usado de forma elegante por los músicos de mariachi en sus galas?",
                "correcta": "Sombrero de charro.",
                "erroneas": [
                    "Sombrero de paja toquilla.",
                    "Sombrero calentano.",
                    "Sombrero de palma norteño."
                ],
                "dato": "Además de su valor estético y folclórico, el sombrero de charro original de campo estaba diseñado estructuralmente para proteger al jinete del sol abrasador, de las ramas del ganado y como escudo contra caídas de caballo."
            },
            {
                "pregunta": "En la historia de la literatura mexicana, ¿qué escritor redactó la célebre novela 'Pedro Páramo', considerada una de las obras cumbres del realismo mágico mundial?",
                "correcta": "Juan Rulfo.",
                "erroneas": [
                    "Octavio Paz.",
                    "Carlos Fuentes.",
                    "Carlos Monsiváis."
                ],
                "dato": "Rulfo solo necesitó una novela corta ('Pedro Páramo') y un libro de cuentos ('El Llano en llamas') para convertirse en una leyenda literaria universal. Escritores como Jorge Luis Borges o Gabriel García Márquez se sabían de memoria sus páginas."
            },
            {
                "pregunta": "Durante la época colonial en México, la Ciudad de México y sus alrededores no se llamaban así en los mapas virreinales oficiales. ¿Qué nombre formal tenía el territorio?",
                "correcta": "El Virreinato de la Nueva España.",
                "erroneas": [
                    "La Capitanía General de Anáhuac.",
                    "El Imperio Mexicano del Norte.",
                    "La Confederación de las Indias Occidentales."
                ],
                "dato": "Duró casi 300 años (de 1535 a 1821). El territorio era gigantesco, abarcando desde el sur de los Estados Unidos actuales hasta Centroamérica y las islas Filipinas en Asia, convirtiéndose en el centro de comercio del mundo de la época."
            },
            {
                "pregunta": "En las fiestas tradicionales de las Posadas decembrinas en México, ¿cuántas posadas o celebraciones nocturnas se deben realizar exactamente de forma consecutiva antes de Navidad?",
                "correcta": "Nueve posadas.",
                "erroneas": [
                    "Siete posadas.",
                    "Doce posadas.",
                    "Tres posadas."
                ],
                "dato": "Las 9 posadas representan simbólicamente los nueve meses de embarazo de la Virgen María. Introducidas por los frailes evangelizadores, sustituyeron de forma astuta a las fiestas prehispánicas del nacimiento del dios Huitzilopochtli."
            },
            {
                "pregunta": "En las monedas mexicanas de 10 pesos que circulan todos los días en tus bolsillos, ¿qué intrincado relieve prehispánico adorna todo el centro metálico dorado?",
                "correcta": "La Piedra del Sol (erróneamente llamada Calendario Azteca).",
                "erroneas": [
                    "El escudo de armas de la ciudad de Tenochtitlán.",
                    "El rostro estilizado del emperador Cuauhtémoc.",
                    "La máscara de jade del rey Pakal de Palenque."
                ],
                "dato": "El diseño muestra el centro de la Piedra del Sol con el rostro del dios Tonatiuh (el sol). No es un calendario, sino un monumento monolítico colosal tallado por los mexicas para conmemorar el tiempo y la creación del universo."
            },
            {
                "pregunta": "¿Qué inusual objeto utilizó el actor Roberto Gómez Bolaños 'Chespirito' para inspirar el diseño del icónico chipote chillón del Chapulín Colorado?",
                "correcta": "Un martillo de juguete de plástico soplado.",
                "erroneas": [
                    "Un mazo de madera para ablandar carne.",
                    "Una herramienta de utilería de una obra de teatro.",
                    "Un yoyo gigante de resina."
                ],
                "dato": "El chipote chillón original era simplemente un martillo de feria modificado. La genialidad fue el efecto de sonido que le añadieron en posproducción cada vez que golpeaba a un villano, convirtiéndose en un símbolo de la comedia física mexicana."
            },
            {
                "pregunta": "En el año 2005, un programa de telerrealidad en México se paralizó cuando una concursante llamada Jolette se negó a cantar. ¿Qué recomendación célebre le dio el crítico Arturo López Gavito?",
                "correcta": "Que se retirara del concurso por dignidad.",
                "erroneas": [
                    "Que tomara clases urgentes de ópera.",
                    "Que pidiera disculpas al público de pie.",
                    "Que cambiara de género musical a ranchero."
                ],
                "dato": "Las feroces críticas de Gavito y las contestaciones de Jolette en 'La Academia' generaron uno de los picos de audiencia más grandes de la televisión mexicana. Hoy en día, las frases de ese panel de críticos siguen vigentes en cientos de memes."
            },
            {
                "pregunta": "El personaje de la televisión mexicana 'Cepillín' era un payasito muy querido, pero ¿cuál era su profesión real antes de saltar a la fama en las pantallas?",
                "correcta": "Odontólogo (Dentista).",
                "erroneas": [
                    "Pediatra.",
                    "Profesor de primaria.",
                    "Abogado penalista."
                ],
                "dato": "Ricardo González Gutiérrez se pintaba la cara como payaso para que los niños no le tuvieran miedo mientras les arreglaba los dientes en Monterrey. Un canal de televisión local lo vio, le ofreció un programa y el resto es historia de la cultura pop."
            },
            {
                "pregunta": "En la Época de Oro del cine mexicano, la película 'Nosotros los pobres' inmortalizó un silbido que todo el país reconoce. ¿Qué significado tenía en la trama?",
                "correcta": "Un llamado de amor y clave secreta entre Pepe el Toro y Chorreada.",
                "erroneas": [
                    "Una señal de alerta para avisar que venía la policía.",
                    "Un silbido callejero para pedir pan de la panadería.",
                    "Un canto tradicional de los carpinteros de la colonia."
                ],
                "dato": "El silbido de Pedro Infante se convirtió en un código de identidad nacional. Hasta el día de hoy, muchos mexicanos lo usan en la calle o en centros comerciales para localizar a sus familiares entre la multitud."
            },
            {
                "pregunta": "Durante una famosa transmisión en vivo del programa 'Ventaneando', el conductor Pedro Sola cometió un error histórico al anunciar una marca de mayonesa. ¿Qué hizo exactamente?",
                "correcta": "Dijo el nombre de la marca competidora directa.",
                "erroneas": [
                    "Tiró el frasco de cristal al suelo por accidente.",
                    "Se comió la mayonesa con el dedo directo del envase.",
                    "Confundió la mayonesa con crema para café."
                ],
                "dato": "Pedro Sola tenía que anunciar la mayonesa Hellmann's, pero en el último segundo pronunció 'McCormick'. El canal lo multó económicamente, pero con los años el tropezón se volvió tan icónico que la marca original lo perdonó y recrearon el comercial en un evento viral."
            },
            {
                "pregunta": "¿Qué peculiar amuleto de la buena suerte o distinción visual usaba siempre el legendario luchador 'El Santo' en su vida diaria para no revelar jamás su identidad?",
                "correcta": "Usaba máscaras con barbilla descubierta diseñadas especialmente para poder comer en restaurantes.",
                "erroneas": [
                    "Se ponía lentes oscuros gigantes de soldador.",
                    "Llevaba un pasamontañas de lana tejido por su madre.",
                    "Se cubría la cabeza con vendas médicas simulando un accidente."
                ],
                "dato": "Rodolfo Guzmán Huerta se tomaba tan en serio el misterio que viajaba en aviones separados de su equipo para que no vieran su pasaporte y tenía máscaras modificadas que solo cubrían los ojos y la frente para asistir a cenas importantes de etiqueta."
            },
            {
                "pregunta": "En los años 70, la telenovela mexicana 'El derecho de nacer' rompió récords de audiencia. ¿Qué drástica medida se dice que tomaban las fábricas y comercios cuando se transmitía el capítulo final?",
                "correcta": "Cerraron temprano o detuvieron la producción porque nadie iba a trabajar.",
                "erroneas": [
                    "Instalaron pantallas gigantes en las plazas públicas obligatoriamente.",
                    "Regalaron televisiones a todos los empleados del gobierno.",
                    "Prohibieron la venta de alcohol durante esa hora."
                ],
                "dato": "El impacto cultural de las telenovelas en México era tan masivo que las calles se quedaban literalmente desiertas. Las plantas de producción detenían turnos enteros porque la eficiencia caía a cero si los obreros no veían el desenlace."
            },
            {
                "pregunta": "La famosa canción infantil mexicano-chilena 'El baile de los pajaritos' tiene un dato curioso sobre su origen instrumental internacional. ¿Con qué instrumento se compuso originalmente en Europa?",
                "correcta": "Un acordeón.",
                "erroneas": [
                    "Una flauta dulce.",
                    "Un sintetizador electrónico.",
                    "Un violín de concierto."
                ],
                "dato": "Fue compuesta por un músico suizo en los años 50 como una tonada de acordeón alpina. Llegó a México en los 80, se tradujo el texto, se le metió el ritmo tropical y se convirtió en el baile obligatorio e irreverente de todas las bodas y quinceañeras del país."
            },
            {
                "pregunta": "En el año 2002, la cantante mexicana Paulina Rubio dio una entrevista internacional donde afirmó que una famosa pintora mexicana era su 'musa de estilo', pero pronunció mal su nombre. ¿Cómo la llamó?",
                "correcta": "Frida Calo (en lugar de Kahlo).",
                "erroneas": [
                    "Frida Kilo.",
                    "Frida Cano.",
                    "Frida Calva."
                ],
                "dato": "El resbalón de pronunciación en televisión española se volvió un clásico instantáneo de la prensa de espectáculos en México, demostrando cómo un pequeño detalle fonético puede transformarse en un mitote eterno de internet."
            },
            {
                "pregunta": "Xavier López 'Chabelo' condujo el programa 'En familia con Chabelo' por más de 40 años. ¿De dónde surgió el término 'Catafixia' que inventó para el juego?",
                "correcta": "De un idioma ficticio que inventó con el actor Luis de Alba llamado 'mautro'.",
                "erroneas": [
                    "Es una palabra maya antigua que significa intercambio.",
                    "Surgió de un error de imprenta en las tarjetas del guion.",
                    "Era un modismo del norte de México para referirse a las apuestas."
                ],
                "dato": "Chabelo y Luis de Alba inventaron el 'mautro' para hablar en clave en los camerinos. 'Catafixiar' significaba cambiar un objeto por otro. La palabra pegó tanto en la cultura popular que hoy la Real Academia Española (RAE) la reconoce como un mexicanismo real."
            },
            {
                "pregunta": "En la cultura de los memes mexicanos, hay un video viral de un joven que es detenido en un estado de ebriedad aparente y afirma venir del futuro. ¿Qué año decía que era?",
                "correcta": "El año 2006 (y que no choque porque ya venía bien).",
                "erroneas": [
                    "El año 3000.",
                    "El año 2099.",
                    "El año 2012 (el del fin del mundo)."
                ],
                "dato": "El video de 'El Canaca' (Guillermo López) es una leyenda fundacional del internet mexicano. Sus frases sobre la Promotora Mexicana de la Comarca Lagunera y sus supuestos billetes de 100 pesos siguen siendo citadas de memoria."
            },
            {
                "pregunta": "Un icónico comercial de televisión de los años 90 en México traumatizó y divirtió a una generación al mostrar a un tierno perrito chihuahua que hablaba con acento extranjero. ¿Qué comida rápida promocionaba?",
                "correcta": "Tacos de Taco Bell.",
                "erroneas": [
                    "Hamburguesas de Burger King.",
                    "Pizzas de Domino's.",
                    "Pollo frito de KFC."
                ],
                "dato": "El perrito decía la famosa frase '¡Yo quiero Taco Bell!'. Aunque la cadena no tuvo éxito comercial en México y cerró sus sucursales al poco tiempo, el personaje del chihuahua quedó grabado para siempre en la mente de los consumidores."
            },
            {
                "pregunta": "En la música pop de los 90, el grupo mexicano 'Caló' revolucionó las estaciones de radio del país. ¿Qué género musical adaptaron al mercado hispano por primera vez en televisión abierta?",
                "correcta": "El Rap y el Hip-Hop mezclado con Pop dance.",
                "erroneas": [
                    "El Rock gótico industrial.",
                    "El Reggae jamaiquino puro.",
                    "La música electrónica Techno minimalista."
                ],
                "dato": "Liderados por Claudio Yarto, Caló introdujo las gorras planas, los pantalones bombachos y el fraseo rápido (rap) en México en una época dominada por las baladas románticas, abriendo paso a la cultura urbana en los medios masivos."
            },
            {
                "pregunta": "La lucha libre mexicana tiene una tradición muy chistosa e irreverente en la que los perdedores de combates estelares deben pagar un precio máximo. ¿Cuál es?",
                "correcta": "Perder la cabellera y ser rapados en vivo sobre el ring.",
                "erroneas": [
                    "Donar todas sus capas de seda al réferi.",
                    "Pagar la cuenta de los tacos de toda la arena.",
                    "Cambiar su nombre de luchador por uno tierno decidido por el público."
                ],
                "dato": "Las luchas de 'Máscara contra Cabellera' o 'Cabellera contra Cabellera' son los eventos que más dinero y drama recaudan en las arenas mexicanas. Ver a un luchador rudo perder su melena y orgullo genera una catarsis colectiva única."
            },
            {
                "pregunta": "En el año 2007, un video viral de dos niños de Monterrey jugando en un rancho rompió internet en México. ¿Qué trágica y divertida frase gritaba la víctima antes de caer al agua?",
                "correcta": "¡Ya, güey, por favor, idiota, ya!",
                "erroneas": [
                    "¡Me vas a tirar, vas a ver con mi mamá!",
                    "¡Cuidado con la rama, se va a romper!",
                    "¡Suéltame que no sé nadar, auxilio!"
                ],
                "dato": "Conocido mundialmente como 'La caída de Edgar'. Fue uno de los primeros videos virales de YouTube en México. El impacto fue tan gigantesco que una marca de galletas contrató a los niños poco después para recrear la escena en un comercial de televisión con presupuesto de Hollywood."
            }
        ]
    },
    {
        "id": "ciencia-rara",
        "nombre": "Ciencia rara",
        "descripcion": "Rarezas científicas, datos sorprendentes y curiosidades naturales.",
        "preguntas": [
            {
                "pregunta": "Si lograras viajar exactamente a la velocidad de la luz, ¿cuánto tiempo tardarías en llegar de la Tierra al Sol?",
                "correcta": "8 Minutos y 20 segundos.",
                "erroneas": [
                    "80 Minutos y 2 segundos.",
                    "8 Segundos.",
                    "8 Horas y 20 minutos."
                ],
                "dato": "La luz del Sol tarda poco más de ocho minutos en llegar a la Tierra, pero la energía creada en el núcleo solar puede tardar miles de años en escapar hasta la superficie."
            },
            {
                "pregunta": "¿Qué criatura microscópica es famosa por su extrema resistencia, al grado de poder sobrevivir en el vacío del espacio?",
                "correcta": "El tardígrado.",
                "erroneas": [
                    "La ameba.",
                    "El ácaro de polvo.",
                    "La bacteria extremófila."
                ],
                "dato": "Los tardígrados pueden entrar en criptobiosis, un estado donde reducen su metabolismo casi por completo. Así resisten desecación, frío extremo, radiación y condiciones muy agresivas."
            },
            {
                "pregunta": "Si desenredaras todo el ADN contenido en una sola célula humana y lo estiraras en línea recta, ¿cuánto mediría aproximadamente?",
                "correcta": "2 Metros.",
                "erroneas": [
                    "20 Metros.",
                    "200 Centímetros.",
                    "2 Milímetros."
                ],
                "dato": "Cada célula guarda una cantidad sorprendente de información en un espacio diminuto. La clave está en cómo el ADN se enrolla, compacta y organiza dentro del núcleo."
            },
            {
                "pregunta": "¿A qué temperatura exacta coinciden las escalas de grados Celsius y Fahrenheit, marcando exactamente el mismo número?",
                "correcta": "-40 Grados.",
                "erroneas": [
                    "-4 Grados.",
                    "-400 Grados.",
                    "40 Grados."
                ],
                "dato": "A -40, Celsius y Fahrenheit se cruzan. Es un punto matemáticamente elegante y climáticamente horrible."
            },
            {
                "pregunta": "Si intentaras cultivar papas en la superficie de Marte al aire libre, ¿qué químico tóxico natural en la tierra marciana arruinaría tu cosecha?",
                "correcta": "Percloratos.",
                "erroneas": [
                    "Cianuro.",
                    "Ácido sulfúrico.",
                    "Amoníaco."
                ],
                "dato": "El suelo marciano contiene percloratos, compuestos que pueden ser tóxicos para humanos y plantas. Cultivar comida en Marte requeriría limpiar o aislar muy bien el sustrato."
            },
            {
                "pregunta": "¿Cuántos huesos en total conforman el esqueleto de un cuerpo humano adulto sano en promedio?",
                "correcta": "206 Huesos.",
                "erroneas": [
                    "260 Huesos.",
                    "26 Huesos.",
                    "2006 Huesos."
                ],
                "dato": "Los bebés nacen con alrededor de 300 huesos, pero muchos se fusionan durante el crecimiento. Por eso el conteo adulto promedio baja a 206."
            },
            {
                "pregunta": "El agua presenta una rareza física al momento de congelarse. ¿Cuál es?",
                "correcta": "Se expande y pierde densidad.",
                "erroneas": [
                    "Se contrae y aumenta su densidad.",
                    "Pierde por completo su conductividad eléctrica.",
                    "Se vuelve magnética al llegar a cero grados."
                ],
                "dato": "Gracias a esta rareza el hielo flota. Si el hielo se hundiera, muchos cuerpos de agua se congelarían desde abajo y la vida acuática lo tendría muchísimo más difícil."
            },
            {
                "pregunta": "¿Cuál es el único planeta de nuestro sistema solar que gira prácticamente 'acostado' de lado, rodando como un barril en su órbita?",
                "correcta": "Urano.",
                "erroneas": [
                    "Júpiter.",
                    "Saturno.",
                    "Neptuno."
                ],
                "dato": "Urano tiene una inclinación axial extrema. Una hipótesis popular es que un impacto enorme lo dejó inclinado en los primeros tiempos del sistema solar."
            },
            {
                "pregunta": "¿Qué porcentaje del universo observable se calcula que está compuesto por materia oscura y energía oscura que no podemos detectar directamente?",
                "correcta": "Aproximadamente el 95%.",
                "erroneas": [
                    "Aproximadamente el 9.5%.",
                    "Aproximadamente el 50%.",
                    "Aproximadamente el 5%."
                ],
                "dato": "La materia ordinaria, todo lo que vemos y tocamos, representa una fracción pequeña del universo. El resto se infiere por sus efectos gravitacionales y por la expansión cósmica."
            },
            {
                "pregunta": "¿Qué fruta de consumo diario comparte cerca del 60% de sus genes con los seres humanos?",
                "correcta": "El plátano.",
                "erroneas": [
                    "La manzana.",
                    "La fresa.",
                    "El tomate."
                ],
                "dato": "No significa que seas mitad plátano. Muchos seres vivos comparten genes básicos relacionados con funciones celulares fundamentales."
            },
            {
                "pregunta": "¿Qué animal marino tiene la capacidad biológica de revertir su ciclo de vida y volver a su etapa de pólipo, siendo teóricamente 'inmortal'?",
                "correcta": "La medusa.",
                "erroneas": [
                    "La estrella de mar.",
                    "El pepino de mar.",
                    "La anémona."
                ],
                "dato": "La especie Turritopsis dohrnii puede regresar a una fase juvenil bajo ciertas condiciones. No es invencible, pero su ciclo de vida parece truco desbloqueado."
            },
            {
                "pregunta": "Según la física cuántica, ¿qué partícula subatómica es famosa por comportarse como onda y partícula al mismo tiempo hasta que alguien la observa?",
                "correcta": "El fotón.",
                "erroneas": [
                    "El protón.",
                    "El neutrón.",
                    "El gravitón."
                ],
                "dato": "El experimento de la doble rendija mostró que la luz puede comportarse como onda o partícula dependiendo de cómo se mida. La realidad microscópica es muy poco intuitiva."
            },
            {
                "pregunta": "Biológicamente hablando, ¿cuántos estómagos tiene realmente una vaca para poder digerir la celulosa del pasto?",
                "correcta": "Un estómago con cuatro compartimentos.",
                "erroneas": [
                    "Cuatro estómagos totalmente separados.",
                    "Dos estómagos de gran tamaño.",
                    "Ocho estómagos pequeños."
                ],
                "dato": "Las vacas tienen rumen, retículo, omaso y abomaso. Es una arquitectura digestiva ideal para que microbios especializados ayuden a procesar plantas difíciles."
            },
            {
                "pregunta": "¿A qué velocidad aproximada pueden viajar algunos impulsos nerviosos desde tu cerebro hasta el resto de tu cuerpo?",
                "correcta": "400 Kilómetros por hora.",
                "erroneas": [
                    "40 Kilómetros por hora.",
                    "4,000 Kilómetros por hora.",
                    "4 Kilómetros por hora."
                ],
                "dato": "La velocidad depende del tipo de neurona y de si está mielinizada. Las señales más rápidas pueden alcanzar velocidades comparables a un auto de carreras."
            },
            {
                "pregunta": "¿Cómo se compara la computadora que llevó al hombre a la Luna con la tecnología que usamos hoy todos los días?",
                "correcta": "Tenía mucha menos memoria que dispositivos modernos muy simples.",
                "erroneas": [
                    "Era más potente que una consola PlayStation 5.",
                    "Usaba un procesador cuántico primitivo.",
                    "Funcionaba solo con tarjetas perforadas de cartón."
                ],
                "dato": "El Apollo Guidance Computer tenía recursos muy limitados, pero estaba diseñado con enorme confiabilidad. La hazaña fue más ingeniería brillante que fuerza bruta computacional."
            },
            {
                "pregunta": "¿Por qué es físicamente peligroso intentar eructar en el espacio sin gravedad?",
                "correcta": "Porque el gas y la comida no se separan igual en tu estómago.",
                "erroneas": [
                    "Porque el vacío del espacio te sacaría los pulmones.",
                    "Porque el aire se congela en tu garganta.",
                    "Porque los trajes espaciales presurizan tu esófago."
                ],
                "dato": "En la Tierra, la gravedad ayuda a separar gas y líquido. En microgravedad, todo puede mezclarse, así que un simple eructo puede terminar bastante menos elegante."
            },
            {
                "pregunta": "Según algunas hipótesis astrofísicas, debido a tormentas de metano y presiones extremas, ¿qué podría caer del cielo en planetas como Júpiter y Saturno?",
                "correcta": "Diamantes.",
                "erroneas": [
                    "Ácido sulfúrico.",
                    "Cristales de sal pura.",
                    "Oro en estado líquido."
                ],
                "dato": "La idea es que el carbono del metano podría transformarse bajo presiones enormes. Aun si el detalle se debate, la imagen de lluvia de diamantes ya ganó su lugar en la ciencia popular."
            },
            {
                "pregunta": "Si metes dos vasos exactos al congelador, uno con agua fría y otro con agua hirviendo, ¿cuál podría congelarse primero bajo ciertas condiciones?",
                "correcta": "El vaso con agua hirviendo.",
                "erroneas": [
                    "El vaso con agua fría.",
                    "Se congelan exactamente al mismo tiempo.",
                    "El agua hirviendo explota el vaso por el choque térmico."
                ],
                "dato": "Se conoce como efecto Mpemba. No ocurre siempre, pero bajo ciertas condiciones el agua caliente puede congelarse antes por evaporación, convección y otros factores."
            },
            {
                "pregunta": "¿Para qué inventaron unos científicos de la Universidad de Cambridge la primera cámara web de la historia en 1991?",
                "correcta": "Para vigilar si había café en la cafetera de otro cuarto.",
                "erroneas": [
                    "Para comunicarse en secreto con la NASA.",
                    "Para observar células bajo un microscopio.",
                    "Para grabar el tráfico de la calle."
                ],
                "dato": "La cámara apuntaba a la cafetera del laboratorio para evitar viajes inútiles. Una de las primeras webcams nació por una necesidad profundamente humana: no caminar por café inexistente."
            },
            {
                "pregunta": "El ornitorrinco pone huevos, tiene pico de pato y es venenoso. Pero, ¿cómo alimentan las hembras a sus crías?",
                "correcta": "Sudando leche por la piel del abdomen.",
                "erroneas": [
                    "Vomitando comida parcialmente digerida.",
                    "Con glándulas mamarias ocultas en el pico.",
                    "Con algas ricas en calcio."
                ],
                "dato": "Los ornitorrincos no tienen pezones. La leche sale por glándulas en la piel y las crías la lamen del pelaje de la madre."
            },
            {
                "pregunta": "El camarón mantis es uno de los animales más impresionantes del mar. ¿Qué sucede cuando lanza un puñetazo?",
                "correcta": "Golpea tan rápido que genera cavitación en el agua.",
                "erroneas": [
                    "Se rompe su propia tenaza por la fuerza.",
                    "Inyecta un veneno mortal para humanos.",
                    "Genera un campo magnético."
                ],
                "dato": "Su golpe crea burbujas de vapor que colapsan con energía enorme. El impacto principal y la cavitación hacen de este pequeño boxeador marino una máquina absurda."
            },
            {
                "pregunta": "Marie Curie descubrió el radio y el polonio. Más de 100 años después de su muerte, ¿qué pasa con sus libretas personales?",
                "correcta": "Siguen siendo radiactivas y se conservan con precauciones especiales.",
                "erroneas": [
                    "Explotan al contacto con oxígeno.",
                    "Brillan con una luz verde intensa.",
                    "Fueron lanzadas al espacio."
                ],
                "dato": "Curie trabajó con materiales radiactivos antes de que se entendieran bien sus riesgos. Sus objetos personales se guardan en contenedores protegidos."
            },
            {
                "pregunta": "A diferencia de los humanos, ¿cómo hacen los delfines para dormir sin ahogarse?",
                "correcta": "Duermen con la mitad del cerebro apagada y un ojo abierto.",
                "erroneas": [
                    "Duermen flotando de cabeza.",
                    "Activan branquias secretas.",
                    "Se recargan en la arena."
                ],
                "dato": "Se llama sueño unihemisférico. Una mitad del cerebro descansa mientras la otra mantiene al animal respirando y atento al entorno."
            },
            {
                "pregunta": "Científicamente hablando, ¿los seres humanos brillan en la oscuridad?",
                "correcta": "Sí, pero la luz es demasiado débil para nuestros ojos.",
                "erroneas": [
                    "No, eso solo pasa en películas.",
                    "Solo bajo luces de neón.",
                    "Solo con fiebre extrema."
                ],
                "dato": "El cuerpo humano emite una luz visible extremadamente tenue por reacciones químicas celulares. Cámaras sensibles pueden detectarla, pero nuestros ojos no."
            },
            {
                "pregunta": "Tu estómago produce ácido clorhídrico para digerir alimentos. ¿Qué tan potente puede ser ese ácido en condiciones controladas?",
                "correcta": "Puede corroer metales delgados con el tiempo.",
                "erroneas": [
                    "Puede derretir vidrio instantáneamente.",
                    "Puede disolver diamantes en segundos.",
                    "Puede convertir plástico en azúcar."
                ],
                "dato": "El ácido gástrico tiene un pH muy bajo, normalmente entre 1.5 y 3.5. Tu propio estómago no se destruye porque está protegido por una capa de moco que se renueva constantemente."
            },
            {
                "pregunta": "¿Cómo se llama el olor característico que aparece cuando empieza a llover después de un periodo seco?",
                "correcta": "Petricor.",
                "erroneas": [
                    "Ozono dulce.",
                    "Geosombra.",
                    "Lluviamina."
                ],
                "dato": "El petricor viene de aceites liberados por plantas y compuestos producidos por bacterias del suelo. Cuando caen las primeras gotas, pequeñas burbujas lanzan esas moléculas aromáticas al aire."
            },
            {
                "pregunta": "La botánica puede ser un dolor de cabeza. ¿Cuál de estas frutas es técnicamente una baya verdadera, mientras que la fresa no lo es?",
                "correcta": "El plátano.",
                "erroneas": [
                    "La zarzamora.",
                    "La frambuesa.",
                    "La cereza."
                ],
                "dato": "Botánicamente, una baya se desarrolla de una flor con un ovario y contiene semillas dentro. Las fresas son frutas accesorias, aunque en la vida diaria nadie quiere discutir eso en el súper."
            },
            {
                "pregunta": "Si comparamos la temperatura del núcleo de la Tierra con la superficie del Sol, ¿cuál es el resultado aproximado?",
                "correcta": "Están casi a la misma temperatura.",
                "erroneas": [
                    "La superficie del Sol es un millón de veces más caliente.",
                    "El centro de la Tierra está súper enfriado.",
                    "El núcleo de la Tierra es el doble de caliente."
                ],
                "dato": "El núcleo interno terrestre ronda temperaturas cercanas a las de la superficie solar. La diferencia es que uno está bajo tus pies y el otro arruina cualquier picnic a 150 millones de kilómetros."
            },
            {
                "pregunta": "Los biólogos marinos descubrieron que, cuando los pulpos salen a cazar formando equipo con peces, a veces hacen algo impulsivo. ¿Qué es?",
                "correcta": "Golpean a los peces en la cabeza sin razón aparente.",
                "erroneas": [
                    "Les roban comida y los entierran.",
                    "Les quitan escamas para usarlas como escudo.",
                    "Les escupen tinta directo a los ojos."
                ],
                "dato": "Se ha observado a pulpos golpeando peces durante cacerías cooperativas. A veces parece regular el equipo; otras veces parece una decisión muy personal y cero diplomática."
            },
            {
                "pregunta": "En la escala del tiempo de nuestro planeta, ¿qué dinosaurio vivió cronológicamente más cerca del ser humano y del iPhone?",
                "correcta": "El Tyrannosaurus rex.",
                "erroneas": [
                    "El Estegosaurio.",
                    "El Diplodocus.",
                    "El Brontosaurio."
                ],
                "dato": "El T. rex vivió hace unos 66 millones de años, mientras que el Estegosaurio vivió hace cerca de 150 millones. Hay menos tiempo entre nosotros y el T. rex que entre el T. rex y el Estegosaurio."
            }
        ]
    },
    {
        "id": "musica",
        "nombre": "Musica",
        "descripcion": "Categoría musica",
        "preguntas": [
            {
                "pregunta": "¿Qué superestrella del pop mundial rompió todos los récords de la industria en 2023 al convertirse en la primera artista en superar los 100 millones de oyentes mensuales en Spotify?",
                "correcta": "Taylor Swift.",
                "erroneas": [
                    "Ariana Grande.",
                    "Billie Eilish.",
                    "Dua Lipa."
                ],
                "dato": "Este hito coincidió con el monumental éxito de su gira 'The Eras Tour', la cual colapsó los sistemas de venta de boletos en todo el mundo y se convirtió en la gira musical más lucrativa de toda la historia de la música pop."
            },
            {
                "pregunta": "En la entrega de los Premios Grammy de 2024, Miley Cyrus ganó el primer Grammy de toda su carrera gracias a su éxito global 'Flowers'. ¿Qué actor de Hollywood inspiró la letra satírica de desamor?",
                "correcta": "Liam Hemsworth.",
                "erroneas": [
                    "Timothée Chalamet.",
                    "Austin Butler.",
                    "Zac Efron."
                ],
                "dato": "La canción se lanzó estratégicamente el día del cumpleaños de su exesposo Liam Hemsworth. Además, la letra es una respuesta directa y paródica a la canción 'When I Was Your Man' de Bruno Mars, la cual él le había dedicado en su boda."
            },
            {
                "pregunta": "¿Qué talentosa artista adolescente hizo historia en los Premios Grammy al arrasar con los cuatro premios principales (Mejor Artista Nuevo, Álbum, Grabación y Canción del Año) en una sola noche por su álbum 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?'?",
                "correcta": "Billie Eilish.",
                "erroneas": [
                    "Olivia Rodrigo.",
                    "Lord.",
                    "Sydney Sweeney."
                ],
                "dato": "Consiguió esta hazaña con apenas 18 años. Lo más curioso es que todo el álbum fue grabado y producido de forma casera por ella y su hermano Finneas O'Connell en una pequeña habitación de la casa de sus padres en Los Ángeles."
            },
            {
                "pregunta": "En el año 2020, el cantante canadiense The Weeknd lanzó un sencillo de estética synth-pop de los 80 que se convirtió en la canción más exitosa de la historia del Billboard Hot 100. ¿De qué tema se trata?",
                "correcta": "Blinding Lights.",
                "erroneas": [
                    "Save Your Tears.",
                    "Starboy.",
                    "Can't Feel My Face."
                ],
                "dato": "La canción pasó la asombrosa cantidad de 90 semanas consecutivas dentro de la lista de popularidad. A pesar de romper todos los récords comerciales imaginables de ese año, los Grammy la ignoraron por completo en sus nominaciones, desatando un mitote monumental."
            },
            {
                "pregunta": "Olivia Rodrigo irrumpió con fuerza en la escena pop en 2021 con su sencillo debut 'Drivers License'. ¿Qué famosa serie de televisión de Disney protagonizaba justo cuando compuso el tema?",
                "correcta": "High School Musical: El musical: La serie.",
                "erroneas": [
                    "Hannah Montana.",
                    "Bizaardvark.",
                    "Es Tan Raven."
                ],
                "dato": "El drama de la vida real alimentó el éxito de la canción: la letra hablaba de su ruptura con su co-protagonista de la serie, Joshua Bassett, lo que desató oleadas de teorías, chismes y análisis detallados en TikTok por parte de millones de fans."
            },
            {
                "pregunta": "El pop coreano (K-Pop) ha conquistado las listas globales. ¿Qué grupo musical masculino se convirtió en el primero de su país en liderar la lista Billboard 200 y en dar un discurso ante la ONU?",
                "correcta": "BTS.",
                "erroneas": [
                    "EXO.",
                    "BLACKPINK.",
                    "Stray Kids."
                ],
                "dato": "Su gigantesca base de fanáticos globales se autodenomina 'ARMY'. Su impacto en la economía coreana es tan colosal que el gobierno llegó a debatir seriamente si debían eximirlos del servicio militar obligatorio debido a los miles de millones de dólares que generan al país."
            },
            {
                "pregunta": "En 2023, la cantante británica Dua Lipa lanzó una canción disco-pop ultra viral llamada 'Dance the Night'. ¿Para la banda sonora de qué taquillera película de Hollywood fue compuesta?",
                "correcta": "Barbie.",
                "erroneas": [
                    "Wonka.",
                    "Mean Girls (El Musical).",
                    "La La Land."
                ],
                "dato": "La coreografía de la película se grabó antes de que la canción estuviera terminada. Dua Lipa tuvo que ajustar métricamente la letra y el ritmo para que los aplausos y los pasos de Margot Robbie y los demás actores encajaran a la perfección en la pantalla."
            },
            {
                "pregunta": "¿Qué irreverente e icónica cantante del pop de los 2000 rompió internet al usar un vestido confeccionado completamente con carne de res cruda en la alfombra roja de los MTV Video Music Awards 2010?",
                "correcta": "Lady Gaga.",
                "erroneas": [
                    "Katy Perry.",
                    "Rihanna.",
                    "Britney Spears."
                ],
                "dato": "El diseño de Franc Fernandez usaba más de 22 kilos de carne falda de res. Para preservarlo como una pieza histórica de la cultura pop, el vestido fue deshidratado por taxidermistas profesionales y hoy se exhibe en el Salón de la Fama del Rock and Roll."
            },
            {
                "pregunta": "En el año 2023, una sesión musical grabada en un estudio casero por el productor argentino Bizarrap junto a una estrella del pop colombiano rompió cuatro récords Guinness en horas. ¿Quién era la cantante?",
                "correcta": "Shakira.",
                "erroneas": [
                    "Karol G.",
                    "Anitta.",
                    "Rosalía."
                ],
                "dato": "La 'BZRP Music Sessions #53' se convirtió en un himno de empoderamiento y desamor mediático debido a sus ingeniosos juegos de palabras dirigidos directamente a su expareja, el exfutbolista Gerard Piqué, y su nueva novia."
            },
            {
                "pregunta": "En 1982, Michael Jackson lanzó 'Thriller', el álbum más vendido de todos los tiempos. ¿Qué legendario actor de cine de terror de Hollywood prestó su tenebrosa voz para el famoso rap de la mitad de la canción?",
                "correcta": "Vincent Price.",
                "erroneas": [
                    "Bela Lugosi.",
                    "Christopher Lee.",
                    "Boris Karloff."
                ],
                "dato": "Price grabó su icónica y escalofriante risa en solo dos tomas en el estudio. El productor Quincy Jones le pagó una tarifa plana estándar por la sesión; trágicamente, el actor jamás recibió regalías por los más de 70 millones de discos vendidos."
            },
            {
                "pregunta": "La cantante pop estadounidense Beyoncé causó un revuelo monumental en 2024 al lanzar su álbum 'Cowboy Carter'. ¿Qué género musical tradicional exploró por primera vez en su carrera?",
                "correcta": "Música Country.",
                "erroneas": [
                    "Heavy Metal.",
                    "Reggae jamaquino.",
                    "Ópera clásica."
                ],
                "dato": "Con el sencillo 'Texas Hold 'Em', Beyoncé se convirtió en la primera mujer afroamericana en la historia en alcanzar el número uno en la lista Hot Country Songs de Billboard, desafiando las barreras de un género tradicionalmente conservador."
            },
            {
                "pregunta": "¿Qué grupo pop de la década de los 90 provocó una locura colectiva mundial y popularizó la consigna de empoderamiento femenino conocida como 'Girl Power'?",
                "correcta": "Spice Girls.",
                "erroneas": [
                    "Destiny's Child.",
                    "TLC.",
                    "All Saints."
                ],
                "dato": "Cada una de las cinco integrantes representaba un arquetipo pop (Sporty, Scary, Baby, Ginger y Posh). Su sencillo debut 'Wannabe' de 1996 alcanzó el número uno en más de 30 países en cuestión de semanas."
            },
            {
                "pregunta": "En la entrega de los premios MTV Video Music Awards del año 2003, un momento de la presentación de apertura paralizó a la prensa de espectáculos del mundo entero. ¿Qué sucedió en el escenario?",
                "correcta": "Madonna se besó en la boca con Britney Spears y Christina Aguilera.",
                "erroneas": [
                    "Justin Timberlake le pidió matrimonio a Britney en vivo.",
                    "Eminem arrojó su premio directo al público enojado.",
                    "Michael Jackson anunció su retiro definitivo de las pantallas."
                ],
                "dato": "La cámara de televisión cortó la transmisión justo en el momento en que Madonna besaba a Christina para enfocar la reacción de celos y sorpresa de Justin Timberlake en el público, perdiéndose el segundo beso en vivo."
            },
            {
                "pregunta": "¿Qué cantante británica de potente voz rompió la industria en 2015 con su álbum '25' al vender la absurda cantidad de 3.38 millones de copias físicas en solo su primera semana en EE.UU.?",
                "correcta": "Adele.",
                "erroneas": [
                    "Amy Winehouse.",
                    "Ellie Goulding.",
                    "Florence Welch."
                ],
                "dato": "Para forzar a la gente a comprar el disco físico o digital completo, Adele prohibió estrictamente que el álbum subiera a plataformas de *streaming* como Spotify o Apple Music durante sus primeros meses de lanzamiento, una jugada comercial maestra."
            },
            {
                "pregunta": "En el año 2021, el videoclip de una pegajosa canción infantil coreana rompió todos los esquemas de la plataforma YouTube al convertirse en el primer video de la historia en superar las 10 mil millones de reproducciones. ¿Cuál es?",
                "correcta": "Baby Shark Dance.",
                "erroneas": [
                    "Gangnam Style.",
                    "Despacito.",
                    "See You Again."
                ],
                "dato": "La tonada de 'Baby Shark' es tan adictiva que un campamento de entrenamiento militar y algunas prisiones en Estados Unidos la utilizaron de forma repetitiva en altavoces como método de castigo psicológico para los reclusos problemáticos."
            },
            {
                "pregunta": "¿Qué superestrella del pop e ícono de la moda rompió internet en 2024 al anunciar el lanzamiento de su propia marca de whisky llamada 'SirDavis', en honor a su bisabuelo?",
                "correcta": "Beyoncé.",
                "erroneas": [
                    "Rihanna.",
                    "Katy Perry.",
                    "Lady Gaga."
                ],
                "dato": "El diseño de la botella y el nombre rinden tributo a Davis Hogan, su bisabuelo, quien era un agricultor y productor de licor clandestino en el sur de Estados Unidos durante la época de la prohibición."
            },
            {
                "pregunta": "En 2021, la cantante pop británica Adele lanzó su esperadísimo sencillo de regreso 'Easy on Me'. ¿Qué récord histórico rompió en la plataforma Spotify en solo 24 horas?",
                "correcta": "La canción más reproducida en un solo día con 24 millones de streams.",
                "erroneas": [
                    "El videoclip con más comentarios en la historia.",
                    "La canción con más me gusta en menos de una hora.",
                    "El tema pop con más remixes oficiales lanzados en simultáneo."
                ],
                "dato": "El furor por su regreso tras seis años de silencio fue tan masivo que colapsó momentáneamente los servidores de conteo de varias plataformas de streaming de música en Europa y América."
            },
            {
                "pregunta": "¿Qué famosa cantante y actriz pop estadounidense hace historia constantemente en Instagram al ser la mujer con más seguidores de todo el mundo en la plataforma (superando los 420 millones)?",
                "correcta": "Selena Gomez.",
                "erroneas": [
                    "Taylor Swift.",
                    "Kim Kardashian.",
                    "Kylie Jenner."
                ],
                "dato": "A pesar de tener el récord absoluto de seguidores, Selena ha declarado en numerosas entrevistas que no tiene la aplicación instalada en su teléfono y que un asistente gestiona su contenido para proteger su salud mental."
            },
            {
                "pregunta": "En la entrega de los Premios Grammy de 2024, Taylor Swift hizo historia absoluta en la industria musical al ganar una de las categorías principales por cuarta vez. ¿Cuál fue?",
                "correcta": "Álbum del Año (por 'Midnights').",
                "erroneas": [
                    "Grabación del Año.",
                    "Mejor Artista Nuevo.",
                    "Mejor Video Musical del Siglo."
                ],
                "dato": "Con este cuarto galardón, Taylor superó a leyendas de la música como Frank Sinatra, Stevie Wonder y Paul Simon, quienes estaban empatados con ella con tres premios al Álbum del Año cada uno."
            },
            {
                "pregunta": "La cantante pop estadounidense Sabrina Carpenter dominó por completo las listas globales con su éxito veraniego 'Espresso'. ¿Qué bebida o ingrediente menciona constantemente en el estribillo pegajoso?",
                "correcta": "Café espresso que no deja dormir a su ex.",
                "erroneas": [
                    "Un shot de tequila con limón.",
                    "Un té helado de Nueva York.",
                    "Un cóctel de champaña rosada."
                ],
                "dato": "La canción se volvió tan viral en TikTok que las cafeterías de Estados Unidos y Reino Unido reportaron un incremento masivo en la venta de shots de espresso decorados con galletas en honor a la cantante."
            },
            {
                "pregunta": "¿Qué extravagante artista británica de música pop y electrónica se volvió un fenómeno global gracias a su sencillo 'Levitating' y su estética retro-futurista?",
                "correcta": "Dua Lipa.",
                "erroneas": [
                    "Charli XCX.",
                    "Rita Ora.",
                    "Ava Max."
                ],
                "dato": "A pesar de ser uno de los mayores éxitos de la década, la canción enfrentó serias demandas por supuesto plagio debido al parecido de su ritmo con una vieja canción de reggae de los años 70 y un tema disco."
            },
            {
                "pregunta": "En el año 2021, el artista pop latino Bad Bunny rompió un récord monumental de la industria en Estados Unidos. ¿Qué hazaña logró con su álbum 'El Último Tour del Mundo'?",
                "correcta": "Ser el primer álbum completamente en español en debutar en el número 1 del Billboard 200.",
                "erroneas": [
                    "Vender un millón de discos de vinil en solo tres horas.",
                    "Grabar un video musical dentro de la Casa Blanca.",
                    "Tener 50 canciones en el top 10 al mismo tiempo."
                ],
                "dato": "Históricamente, la lista Billboard 200 estuvo dominada por álbumes en inglés durante más de 60 años. Bad Bunny demostró el peso de la música latina actual al romper este techo de cristal comercial."
            },
            {
                "pregunta": "La cantante pop Ariana Grande es mundialmente conocida por su impresionante rango vocal. ¿Qué técnica o registro extremo es capaz de alcanzar, emulando a Mariah Carey?",
                "correcta": "El registro de silbido (whistle register).",
                "erroneas": [
                    "El canto gutural metalero.",
                    "El falsete invertido continuo.",
                    "El vibrato operístico de tenor."
                ],
                "dato": "El registro de silbido es la nota más alta que puede producir la voz humana, sonando casi como un silbato ultrasónico. Ariana entrenó su voz desde niña imitando los discos clásicos de divas del pop de los 90."
            },
            {
                "pregunta": "¿Qué cantante pop estadounidense se convirtió en un fenómeno de la Generación Z con su álbum debut 'SOUR', el cual compuso en su totalidad tras romper con su novio?",
                "correcta": "Olivia Rodrigo.",
                "erroneas": [
                    "Billie Eilish.",
                    "Tate McRae.",
                    "Camila Cabello."
                ],
                "dato": "El éxito de 'SOUR' fue tan brutal que todas y cada una de las 11 canciones del álbum lograron entrar de forma simultánea al Top 30 del Billboard Hot 100, un récord jamás visto para un debut."
            },
            {
                "pregunta": "En el año 2022, la cantante pop colombiana Karol G se presentó en el festival de Coachella con un look que se volvió tendencia mundial entre millones de fanáticos. ¿De qué color era su cabello?",
                "correcta": "Azul turquesa brillante.",
                "erroneas": [
                    "Rosa neón fosforescente.",
                    "Verde esmeralda.",
                    "Rojo fuego intenso."
                ],
                "dato": "El impacto del color fue tal que miles de fanáticos asistieron a sus conciertos en estadios usando pelucas idénticas, convirtiendo el tono azul en el símbolo oficial de su era musical 'Bichota'."
            },
            {
                "pregunta": "¿Qué superestrella del pop latino y la bachata se volvió una sensación global en internet gracias a su álbum experimental 'MOTOMAMI' y sus videos mascando chicle en el escenario?",
                "correcta": "Rosalía.",
                "erroneas": [
                    "Becky G.",
                    "Nathy Peluso.",
                    "Tini."
                ],
                "dato": "Su gesto mirando fijamente a la cámara con desdén mientras masticaba chicle al inicio de la canción 'Bizcochito' se convirtió en uno de los memes y tendencias de imitación más replicados de internet."
            },
            {
                "pregunta": "En la entrega de los premios MTV Video Music Awards de 2023, la cantante pop colombiana Shakira recibió un galardón histórico de vanguardia. ¿Cuál fue?",
                "correcta": "El Video Vanguard Award (por su trayectoria de impacto visual).",
                "erroneas": [
                    "El premio a la coreografía más difícil del siglo.",
                    "El galardón a la artista con más visualizaciones en YouTube.",
                    "El reconocimiento al mejor vestuario de gala."
                ],
                "dato": "Shakira hizo historia al convertirse en la primera artista sudamericana en recibir este prestigioso premio, celebrándolo con una presentación en vivo de 10 minutos donde repasó sus mayores éxitos."
            },
            {
                "pregunta": "En 2022, la cantante pop y de R&B Rihanna regresó a los escenarios tras años de retiro comercial para encabezar el espectáculo del Medio Tiempo del Super Bowl. ¿Qué revelación impactó al mundo en vivo?",
                "correcta": "Anunció su segundo embarazo mostrando su silueta sobre una plataforma flotante.",
                "erroneas": [
                    "Anunció que se retiraba definitivamente de la música.",
                    "Presentó una canción grabada con inteligencia artificial.",
                    "Invitó a Tom Holland a bailar en el escenario."
                ],
                "dato": "El espectáculo se convirtió en uno de los más vistos de la historia de la televisión, demostrando el poder de la artista, quien aprovechó el show para retocar su maquillaje con productos de su propia marca millonaria, Fenty Beauty."
            },
            {
                "pregunta": "¿Qué cantante pop y compositor estadounidense rompió las listas en 2022 con su sencillo 'As It Was', vistiendo trajes de lentejuelas de alta costura inspirados en los años 70?",
                "correcta": "Harry Styles.",
                "erroneas": [
                    "Shawn Mendes.",
                    "Troye Sivan.",
                    "Charlie Puth."
                ],
                "dato": "La voz infantil que se escucha al inicio de la canción diciendo 'Come on Harry, we wanna say goodnight to you!' pertenece a su propia ahijada, quien le dejaba ese mensaje de voz en el teléfono todas las noches porque él estaba de gira."
            },
            {
                "pregunta": "En 2023, la cantante de pop y country de la Generación Z, Reneé Rapp, se volvió viral en redes sociales por una peculiar razón ajena a sus discos de estudio. ¿Cuál fue?",
                "correcta": "Sus respuestas sumamente honestas, sin filtros y divertidas en entrevistas de prensa.",
                "erroneas": [
                    "Haber adoptado a 15 gatos callejeros en medio de una gira.",
                    "Aparecer vestida como un dinosaurio inflable en una premiación.",
                    "Olvidar por completo la letra de su propia canción en un concierto."
                ],
                "dato": "Rapp se ha ganado un estatus de culto en internet por romper el protocolo tradicional de las celebridades pop, diciendo exactamente lo que piensa de la industria, la moda y las alfombras rojas de forma cómica."
            },
            {
                "pregunta": "En la cumbre de su carrera pop en los años 90, la cantante Britney Spears filmó el icónico videoclip de 'Oops!... I Did It Again' en un set que simulaba estar en qué lugar del universo?",
                "correcta": "La superficie del planeta Marte.",
                "erroneas": [
                    "Una estación espacial en la Luna.",
                    "El fondo del océano Atlántico.",
                    "Una ciudad futurista en el año 3000."
                ],
                "dato": "El famoso traje de látex rojo que usa Britney en el video era tan caluroso y sofocante que un médico tuvo que vigilarla constantemente durante la filmación, ya que la cantante estuvo a punto de desmayarse por deshidratación varias veces."
            },
            {
                "pregunta": "¿Qué legendaria banda de pop y rock británica revolucionó la televisión en 1975 al filmar el videoclip de 'Bohemian Rhapsody', considerado el primer video promocional moderno de la historia?",
                "correcta": "Queen.",
                "erroneas": [
                    "The Beatles.",
                    "Led Zeppelin.",
                    "Pink Floyd."
                ],
                "dato": "La banda no quería cantar la compleja canción en vivo en el programa 'Top of the Pops' debido a las dificultades de las secciones de ópera, así que grabaron el video en solo 4 horas para enviarlo al canal, cambiando la promoción musical para siempre."
            },
            {
                "pregunta": "En el año 1984, la reina del pop Madonna causó un escándalo mayúsculo en la primera entrega de los MTV Video Music Awards mientras cantaba 'Like a Virgin'. ¿Qué hizo sobre el escenario?",
                "correcta": "Se revolcó por el suelo vestida de novia sobre un pastel gigante.",
                "erroneas": [
                    "Apareció flotando colgada de un helicóptero de utilería.",
                    "Destruyó una guitarra eléctrica bañada en oro.",
                    "Se pintó la cara de payaso en medio del coro."
                ],
                "dato": "Durante la coreografía, uno de sus zapatos de tacón alto se salió por accidente. Para disimular el tropiezo de forma improvisada, Madonna se arrojó al suelo y comenzó a rodar de forma sensual, creando un momento icónico de la televisión pop."
            },
            {
                "pregunta": "La boyband estadounidense NSYNC tuvo un éxito arrollador en el año 2000 con el sencillo 'Bye Bye Bye'. ¿Qué curioso concepto estético adoptaron en el videoclip?",
                "correcta": "Eran marionetas gigantes controladas por hilos por una titiritera.",
                "erroneas": [
                    "Eran robots de cocina en un restaurante futurista.",
                    "Eran astronautas atrapados en una tormenta de arena.",
                    "Eran clones atrapados dentro de una computadora."
                ],
                "dato": "La icónica coreografía simulando los movimientos rígidos de una marioneta y el corte de hilos con las manos se volvió un baile obligatorio en todas las discotecas y fiestas escolares de inicios de los 2000."
            },
            {
                "pregunta": "¿Qué carismática estrella del pop de los años 80 e inicios de los 90, conocida por su estilo rebelde y rebelión punk, inmortalizó el himno de empoderamiento 'Girls Just Want to Have Fun'?",
                "correcta": "Cyndi Lauper.",
                "erroneas": [
                    "Madonna.",
                    "Cher.",
                    "Tina Turner."
                ],
                "dato": "La canción original fue escrita por un hombre y tenía una letra bastante machista. Lauper aceptó grabarla solo si le permitían reescribir por completo los versos para transformarla en una celebración de la libertad y diversión de las mujeres."
            },
            {
                "pregunta": "En el año 1997, el grupo pop danés Aqua lanzó una pegajosa canción dance-pop que desató demandas legales de una famosa multinacional de juguetes por supuesto uso de marca. ¿Qué tema era?",
                "correcta": "Barbie Girl.",
                "erroneas": [
                    "Lego Boy.",
                    "Doctor Jones.",
                    "Cartoon Heroes."
                ],
                "dato": "Mattel demandó a la disquera afirmando que la canción dañaba la reputación de la muñeca. Tras años de pleitos, un juez estadounidense desestimó el caso con una célebre frase: 'A ambas partes se les aconseja relajarse'. Años después, la marca usó la tonada."
            },
            {
                "pregunta": "En los años 2000, la cantante colombiana Shakira conquistó el mercado anglosajón con su éxito 'Whenever, Wherever'. ¿Qué instrumento andino tradicional destaca en la introducción del tema?",
                "correcta": "La zampoña (flauta de pan andina).",
                "erroneas": [
                    "El charango de cuerdas.",
                    "La marimba de madera.",
                    "El acordeón vallenato."
                ],
                "dato": "Mezclar el pop dance moderno de la época con vientos folclóricos tradicionales de los Andes fue considerado un gran riesgo por los productores de Nueva York, pero se convirtió en el sello distintivo que la llevó al estrellato mundial."
            },
            {
                "pregunta": "¿Qué rey del pop revolucionó la industria de los videoclips en 1983 al filmar un cortometraje musical de terror de 14 minutos con coreografías de zombis?",
                "correcta": "Michael Jackson (por 'Thriller').",
                "erroneas": [
                    "Prince.",
                    "George Michael.",
                    "David Bowie."
                ],
                "dato": "El canal de televisión MTV tenía que transmitir el videoclip completo cada hora debido a la demanda salvaje del público. Es el único video musical de la historia en ser preservado en el Registro Nacional de Cine de los Estados Unidos."
            },
            {
                "pregunta": "En el año 1999, la superestrella del pop latino Ricky Martin encendió la entrepierna del mundo en los Premios Grammy al cantar en vivo un tema que desató la 'Explosión Latina' en EE.UU. ¿Cuál fue?",
                "correcta": "Livin' la Vida Loca.",
                "erroneas": [
                    "La Copa de la Vida.",
                    "She Bangs.",
                    "María."
                ],
                "dato": "Esa presentación de pie frente a las mayores eminencias de la música en inglés fue tan enérgica que al día siguiente las disqueras americanas salieron corriendo a buscar y contratar a artistas hispanos de forma desesperada."
            },
            {
                "pregunta": "El grupo pop sueco ABBA es una de las bandas más exitosas de todos los tiempos. ¿En qué famoso festival de la canción internacional saltaron a la fama mundial en 1974?",
                "correcta": "Festival de la Canción de Eurovisión (con 'Waterloo').",
                "erroneas": [
                    "Festival de Viña del Mar.",
                    "Festival de Sanremo.",
                    "Premios de la Música de la BBC."
                ],
                "dato": "A pesar de ganar el festival representando a Suecia, el jurado del Reino Unido les otorgó la vergonzosa cantidad de cero puntos en la votación final de esa noche, una ironía dado que después dominaron las listas británicas por años."
            },
            {
                "pregunta": "En el año 2012, el rapero y productor coreano PSY rompió un techo de cristal de internet al registrar el primer video de la historia en alcanzar las mil millones de vistas en YouTube. ¿Qué tema era?",
                "correcta": "Gangnam Style.",
                "erroneas": [
                    "Gentleman.",
                    "Haru Haru.",
                    "Fantastic Baby."
                ],
                "dato": "El contador de visitas de YouTube de la época estaba programado con un sistema de 32 bits que solo toleraba un límite máximo de 2,147,483,647 vistas. El video de PSY obligó a los ingenieros de Google a reescribir todo el código de la página."
            },
            {
                "pregunta": "¿Qué famosa e irreverente cantante y compositora estadounidense de pop-punk dominó las estaciones de radio en 2007 con su pegajoso himno juvenil 'Girlfriend'?",
                "correcta": "Avril Lavigne.",
                "erroneas": [
                    "Hayley Williams.",
                    "Pink.",
                    "Kelly Clarkson."
                ],
                "dato": "Para maximizar el impacto comercial en la era de los tonos de llamada para celulares, Avril grabó el coro de la canción en ocho idiomas distintos, incluyendo el español, el japonés, el mandarín y el alemán."
            },
            {
                "pregunta": "En 2011, la extravagante estrella del pop Lady Gaga llegó a la alfombra roja de los Premios Grammy metida dentro de una estructura insólita que requería que cuatro asistentes la cargaran. ¿Qué era?",
                "correcta": "Un huevo gigante de plástico translúcido simulando una incubadora.",
                "erroneas": [
                    "Un ataúd de cristal gótico con rosas negras.",
                    "Una réplica exacta de una nave espacial alienígena.",
                    "Una pecera gigante con sirenas mecánicas."
                ],
                "dato": "Gaga pasó un total de 72 horas metida dentro del huevo antes de la alfombra roja para concentrarse e inspirarse en el concepto místico del nacimiento de su nuevo sencillo y era musical, 'Born This Way'."
            },
            {
                "pregunta": "El éxito pop de 2010 'Party Rock Anthem' del dúo LMFAO desató una fiebre mundial de baile en discotecas y plazas públicas. ¿Qué nombre técnico recibía ese juego de pies?",
                "correcta": "Shuffling.",
                "erroneas": [
                    "Voguing.",
                    "Breakdance.",
                    "Twerking."
                ],
                "dato": "El baile se volvió tan masivo que la gente organizaba flashmobs gigantescos de miles de personas coordinadas en centros comerciales y aeropuertos vistiendo pantalones de leopardo y lentes de plástico sin micas."
            },
            {
                "pregunta": "En el año 2000, la diva del pop dance Kylie Minogue revivió su carrera mundial gracias a un sencillo y un videoclip donde vestía un revelador vestido blanco con capucha. ¿Qué canción era?",
                "correcta": "Can't Get You Out of My Head.",
                "erroneas": [
                    "Spinning Around.",
                    "In Your Eyes.",
                    "Love at First Sight."
                ],
                "dato": "El adictivo estribillo compuesto por los fonemas 'la-la-la' fue rechazado originalmente por bandas como S Club 7 y por la cantante Sophie Ellis-Bextor antes de llegar a manos de Kylie, quien lo grabó en solo unas horas en Londres."
            }
        ]
    }
];

    const categoriasNormalizadas = Object.freeze(QUESTION_CATEGORIES.map(categoria => {
        const preguntas = Object.freeze(categoria.preguntas.map(pregunta => {
            const opcionesIncorrectas = [
                pregunta.erroneas && pregunta.erroneas[0] ? pregunta.erroneas[0] : "",
                pregunta.erroneas && pregunta.erroneas[1] ? pregunta.erroneas[1] : "",
                pregunta.erroneas && pregunta.erroneas[2] ? pregunta.erroneas[2] : ""
            ];
            return Object.freeze({
                pregunta: String(pregunta.pregunta || "").trim(),
                opciones: Object.freeze([...opcionesIncorrectas, String(pregunta.correcta || "").trim()]),
                correcta: String(pregunta.correcta || "").trim(),
                erroneas: Object.freeze(opcionesIncorrectas.map(opcion => String(opcion).trim())),
                datoCurioso: pregunta.dato ? String(pregunta.dato).trim() : null,
                categoria: categoria.nombre,
                categoriaId: categoria.id
            });
        }));

        return Object.freeze({
            id: categoria.id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion,
            preguntas
        });
    }));

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
