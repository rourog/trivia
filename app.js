(function () {
    "use strict";

    const QUESTION_BANK = window.TriviaQuestionBank;

    if (!QUESTION_BANK) {
        throw new Error("No se encontró TriviaQuestionBank. Revisa que questions.js cargue antes que app.js.");
    }

    const CONFIG = Object.freeze({
        questionsPerGame: 20,
        answerDelayMs: 1800,
        timeAttackMs: 120000,
        timeAttackAnswerDelayMs: 850,
        maxStrikes: 3,
        storageKeys: Object.freeze({
            sound: "trivia.soundEnabled",
            theme: "trivia.theme",
            fontScale: "trivia.fontScale",
            players: "trivia.players",
            activeCategories: "trivia.activeCategories"
        }),
        fontScale: Object.freeze({
            default: 1,
            min: 0.85,
            max: 1.25,
            step: 0.05
        }),
        soundVolume: 0.62
    });

    const SELECTORS = Object.freeze({
        screens: {
            home: "home-screen",
            multiplayerSetup: "multiplayer-setup-screen",
            game: "game-screen",
            result: "result-screen"
        },
        homeSubtitle: "home-subtitle",
        game: {
            currentPlayer: "current-player",
            currentPlayerName: "current-player-name",
            questionText: "question-text",
            questionPanel: "question-panel",
            categoryLabel: "category-label",
            learningExplanation: "learning-explanation",
            optionsContainer: "options-container",
            counterText: "counter-text",
            timerText: "timer-text",
            timerValue: "timer-value",
            strikeBoard: "strike-board",
            progressBar: "progress-bar",
            scoreTitle: "score-title",
            finalScore: "final-score"
        },
        result: {
            confettiLayer: "confetti-layer"
        },
        multiplayer: {
            playerCount: "player-count",
            playersForm: "players-form",
            scoreboard: "multiplayer-scoreboard",
            colorModalPalette: "color-modal-palette",
            emojiModalPalette: "emoji-modal-palette",
            themeOptions: "theme-options"
        },
        settings: {
            categoryOptions: "category-options"
        },
        buttons: {
            start: "btn-start",
            timeAttack: "btn-time-attack",
            learning: "btn-learning",
            openMultiplayer: "btn-open-multiplayer",
            backHome: "btn-back-home",
            startMultiplayer: "btn-start-multiplayer",
            exitGame: "btn-exit-game",
            playAgain: "btn-play-again",
            goHome: "btn-go-home",
            openConfig: "[data-open-config]",
            closeConfig: "btn-close-config",
            cancelExit: "btn-cancel-exit",
            confirmExit: "btn-confirm-exit",
            toggleSound: "btn-toggle-sound",
            testSound: "btn-test-sound",
            toggleTheme: "btn-toggle-theme",
            fontDecrease: "btn-font-decrease",
            fontIncrease: "btn-font-increase",
            openAbout: "btn-open-about",
            closeAbout: "btn-close-about",
            acceptAvatar: "btn-accept-avatar"
        },
        modals: {
            exit: "exit-modal",
            config: "config-modal",
            color: "color-modal",
            theme: "theme-modal",
            about: "about-modal"
        },
        soundIcon: "sound-icon",
        soundLabel: "sound-label",
        fontSizeLabel: "font-size-label"
    });

    const STORAGE = {
        get(key, fallbackValue) {
            try {
                return localStorage.getItem(key) ?? fallbackValue;
            } catch {
                return fallbackValue;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch {
                // El juego debe seguir funcionando aunque el navegador bloquee storage.
            }
        }
    };

    const AudioEngine = (() => {
        let context = null;
        let enabled = STORAGE.get(CONFIG.storageKeys.sound, "true") !== "false";
        let unlocked = false;

        function getContext() {
            if (!context) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) return null;
                context = new AudioContextClass();
            }

            return context;
        }

        async function unlock() {
            const audioContext = getContext();
            if (!audioContext) return null;

            if (audioContext.state === "suspended") {
                try {
                    await audioContext.resume();
                } catch {
                    return audioContext;
                }
            }

            if (!unlocked && audioContext.state === "running") {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                const startTime = audioContext.currentTime;

                gainNode.gain.setValueAtTime(0.0001, startTime);
                oscillator.frequency.setValueAtTime(60, startTime);
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.start(startTime);
                oscillator.stop(startTime + 0.018);
                unlocked = true;
            }

            return audioContext;
        }

        function preload() {
            unlock();
        }

        function createGain(audioContext, startTime, duration, volume = 1) {
            const gainNode = audioContext.createGain();
            const peak = CONFIG.soundVolume * volume;

            gainNode.gain.setValueAtTime(0.0001, startTime);
            gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak), startTime + 0.012);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
            gainNode.connect(audioContext.destination);
            return gainNode;
        }

        function tone(audioContext, {
            frequency,
            start = 0,
            duration = 0.12,
            type = "sine",
            volume = 1,
            slideTo = null
        }) {
            const startTime = audioContext.currentTime + start;
            const oscillator = audioContext.createOscillator();
            const gainNode = createGain(audioContext, startTime, duration, volume);

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, startTime);
            if (slideTo) {
                oscillator.frequency.exponentialRampToValueAtTime(slideTo, startTime + duration);
            }

            oscillator.connect(gainNode);
            oscillator.start(startTime);
            oscillator.stop(startTime + duration + 0.018);
        }

        function noise(audioContext, {
            start = 0,
            duration = 0.08,
            volume = 0.35,
            filterFrequency = 900
        } = {}) {
            const startTime = audioContext.currentTime + start;
            const sampleRate = audioContext.sampleRate;
            const buffer = audioContext.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
            const data = buffer.getChannelData(0);

            for (let index = 0; index < data.length; index++) {
                data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
            }

            const source = audioContext.createBufferSource();
            const filter = audioContext.createBiquadFilter();
            const gainNode = createGain(audioContext, startTime, duration, volume);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(filterFrequency, startTime);
            source.buffer = buffer;
            source.connect(filter);
            filter.connect(gainNode);
            source.start(startTime);
        }

        async function play(name, rate = 1) {
            if (!enabled) return;

            const audioContext = await unlock();
            if (!audioContext) return;
            if (audioContext.state !== "running") return;

            const pitch = Math.max(0.75, Math.min(1.8, rate));

            switch (name) {
                case "tap":
                case "pop":
                    tone(audioContext, { frequency: 420 * pitch, duration: 0.055, type: "triangle", volume: 0.28, slideTo: 760 * pitch });
                    tone(audioContext, { frequency: 960 * pitch, start: 0.018, duration: 0.045, type: "sine", volume: 0.14 });
                    break;
                case "correct":
                    tone(audioContext, { frequency: 523.25, duration: 0.09, type: "sine", volume: 0.42 });
                    tone(audioContext, { frequency: 659.25, start: 0.055, duration: 0.1, type: "sine", volume: 0.46 });
                    tone(audioContext, { frequency: 987.77, start: 0.12, duration: 0.16, type: "triangle", volume: 0.38 });
                    noise(audioContext, { start: 0.03, duration: 0.11, volume: 0.12, filterFrequency: 4200 });
                    break;
                case "wrong":
                    tone(audioContext, { frequency: 220, duration: 0.12, type: "sawtooth", volume: 0.22, slideTo: 150 });
                    tone(audioContext, { frequency: 164.81, start: 0.04, duration: 0.14, type: "triangle", volume: 0.22, slideTo: 130.81 });
                    noise(audioContext, { start: 0, duration: 0.08, volume: 0.12, filterFrequency: 700 });
                    break;
                case "strike":
                    tone(audioContext, { frequency: 150, duration: 0.09, type: "square", volume: 0.24, slideTo: 95 });
                    tone(audioContext, { frequency: 110, start: 0.08, duration: 0.12, type: "sawtooth", volume: 0.18, slideTo: 80 });
                    break;
                case "start":
                    tone(audioContext, { frequency: 392, duration: 0.1, type: "triangle", volume: 0.3 });
                    tone(audioContext, { frequency: 523.25, start: 0.07, duration: 0.12, type: "triangle", volume: 0.34 });
                    tone(audioContext, { frequency: 783.99, start: 0.16, duration: 0.18, type: "sine", volume: 0.38 });
                    break;
                case "win":
                    tone(audioContext, { frequency: 523.25, duration: 0.11, type: "triangle", volume: 0.32 });
                    tone(audioContext, { frequency: 659.25, start: 0.08, duration: 0.12, type: "triangle", volume: 0.34 });
                    tone(audioContext, { frequency: 783.99, start: 0.16, duration: 0.14, type: "triangle", volume: 0.36 });
                    tone(audioContext, { frequency: 1046.5, start: 0.26, duration: 0.24, type: "sine", volume: 0.38 });
                    noise(audioContext, { start: 0.2, duration: 0.18, volume: 0.1, filterFrequency: 5200 });
                    break;
                default:
                    tone(audioContext, { frequency: 440 * pitch, duration: 0.08, type: "triangle", volume: 0.2 });
            }
        }

        function setEnabled(nextEnabled) {
            enabled = nextEnabled;
            STORAGE.set(CONFIG.storageKeys.sound, String(enabled));
        }

        function isEnabled() {
            return enabled;
        }

        return Object.freeze({
            preload,
            unlock,
            play,
            setEnabled,
            isEnabled
        });
    })();

    const DOM = createDomMap();

    const state = {
        activeCategories: getSavedActiveCategories(),
        gameMode: "classic",
        players: [],
        currentQuestionIndex: 0,
        answeredCount: 0,
        score: 0,
        strikes: 0,
        questionLimit: CONFIG.questionsPerGame,
        currentQuestions: [],
        isAnswerLocked: false,
        isLearningAwaitingAdvance: false,
        advanceTimerId: null,
        countdownTimerId: null,
        timeAttackEndsAt: 0
    };
    let activeColorTrigger = null;

    const PLAYER_COLOR_PALETTE = [
        "#e53935",
        "#fb8c00",
        "#fdd835",
        "#43a047",
        "#00acc1",
        "#1e88e5",
        "#5e35b1",
        "#8e24aa",
        "#d81b60",
        "#6d4c41",
        "#f8fafc",
        "#111827"
    ];

    const PLAYER_EMOJI_PALETTE = Object.freeze([
        { emoji: "👽", label: "Alien" },
        { emoji: "👻", label: "Fantasma" },
        { emoji: "🧠", label: "Cerebro" },
        { emoji: "🌮", label: "Taco" },
        { emoji: "🐺", label: "Lobo" },
        { emoji: "🛸", label: "OVNI" },
        { emoji: "🤡", label: "Payaso" },
        { emoji: "🦖", label: "Dinosaurio" },
        { emoji: "🤖", label: "Robot" },
        { emoji: "🗿", label: "Moai" },
        { emoji: "🥤", label: "Refresco" },
        { emoji: "📼", label: "VHS" }
    ]);

    const THEMES = Object.freeze([
        { id: "blue-gold", name: "Azul / Dorado", colors: ["#112840", "#d4af37"], brandMetal: "gold" },
        { id: "white-gold", name: "Blanco / Dorado", colors: ["#f4f1e8", "#b8871f"], brandMetal: "gold" },
        { id: "black-white", name: "Negro / Blanco", colors: ["#111315", "#f1f5f9"], brandMetal: "silver" },
        { id: "sky-white", name: "Cielo / Blanco", colors: ["#dff4ff", "#ffffff"], brandMetal: "silver" },
        { id: "emerald-cream", name: "Verde / Crema", colors: ["#173f35", "#e6c76b"], brandMetal: "gold" },
        { id: "plum-gold", name: "Ciruela / Dorado", colors: ["#2d1b3d", "#d6b45f"], brandMetal: "gold" },
        { id: "slate-copper", name: "Pizarra / Cobre", colors: ["#25313d", "#d69f6c"], brandMetal: "copper" },
        { id: "rose-cream", name: "Rosa / Crema", colors: ["#f7e7ea", "#b76e79"], brandMetal: "copper" },
        { id: "burgundy-gold", name: "Borgoña / Oro", colors: ["#3b0f1f", "#d6b25e"], brandMetal: "gold" },
        { id: "forest-bronze", name: "Bosque / Bronce", colors: ["#18362c", "#b9824a"], brandMetal: "copper" },
        { id: "ivory-navy", name: "Marfil / Azul Marino", colors: ["#f3ead8", "#18365f"], brandMetal: "gold" },
        { id: "obsidian-neon-rose", name: "Obsidiana / Rosa Neón", colors: ["#111014", "#ff6fb1"], brandMetal: "copper" }
    ]);

    const HOME_TAGLINES = Object.freeze([
        "Mitos, mitotes y datos inútiles",
        "Mitos, mitotes y chismecito",
        "Mitos, mitotes y datos random",
        "Mitos, mitotes y conspiraciones",
        "Mitos, mitotes y otras jaladas",
        "Mitos, mitotes y otros datos",
        "Mitos, mitotes y etcétera",
        "Mitos, mitotes y mititos",
        "Mitos, mitotes y sospechas raras",
        "Mitos, mitotes y verdades a medias",
        "Mitos, mitotes y cosas que suenan reales",
        "Mitos, mitotes y sabiduría de sobremesa",
        "Mitos, mitotes y preguntas incómodas",
        "Mitos, mitotes y cultura de pasillo",
        "Mitos, mitotes y datos que nadie pidió"
    ]);
    let currentHomeTagline = "";

    function byId(id) {
        const element = document.getElementById(id);
        if (!element) throw new Error(`No se encontró el elemento #${id}.`);
        return element;
    }

    function allBySelector(selector) {
        const elements = [...document.querySelectorAll(selector)];
        if (elements.length === 0) throw new Error(`No se encontró ningún elemento ${selector}.`);
        return elements;
    }

    function createDomMap() {
        return {
            screens: {
                home: byId(SELECTORS.screens.home),
                multiplayerSetup: byId(SELECTORS.screens.multiplayerSetup),
                game: byId(SELECTORS.screens.game),
                result: byId(SELECTORS.screens.result)
            },
            homeSubtitle: byId(SELECTORS.homeSubtitle),
            game: {
                currentPlayer: byId(SELECTORS.game.currentPlayer),
                currentPlayerName: byId(SELECTORS.game.currentPlayerName),
                questionText: byId(SELECTORS.game.questionText),
                questionPanel: byId(SELECTORS.game.questionPanel),
                categoryLabel: byId(SELECTORS.game.categoryLabel),
                learningExplanation: byId(SELECTORS.game.learningExplanation),
                optionsContainer: byId(SELECTORS.game.optionsContainer),
                counterText: byId(SELECTORS.game.counterText),
                timerText: byId(SELECTORS.game.timerText),
                timerValue: byId(SELECTORS.game.timerValue),
                strikeBoard: byId(SELECTORS.game.strikeBoard),
                progressBar: byId(SELECTORS.game.progressBar),
                scoreTitle: byId(SELECTORS.game.scoreTitle),
                finalScore: byId(SELECTORS.game.finalScore)
            },
            result: {
                confettiLayer: byId(SELECTORS.result.confettiLayer)
            },
            multiplayer: {
                playerCount: byId(SELECTORS.multiplayer.playerCount),
                playersForm: byId(SELECTORS.multiplayer.playersForm),
                scoreboard: byId(SELECTORS.multiplayer.scoreboard),
                colorModalPalette: byId(SELECTORS.multiplayer.colorModalPalette),
                emojiModalPalette: byId(SELECTORS.multiplayer.emojiModalPalette),
                themeOptions: byId(SELECTORS.multiplayer.themeOptions)
            },
            settings: {
                categoryOptions: byId(SELECTORS.settings.categoryOptions)
            },
            buttons: {
                start: byId(SELECTORS.buttons.start),
                timeAttack: byId(SELECTORS.buttons.timeAttack),
                learning: byId(SELECTORS.buttons.learning),
                openMultiplayer: byId(SELECTORS.buttons.openMultiplayer),
                backHome: byId(SELECTORS.buttons.backHome),
                startMultiplayer: byId(SELECTORS.buttons.startMultiplayer),
                exitGame: byId(SELECTORS.buttons.exitGame),
                playAgain: byId(SELECTORS.buttons.playAgain),
                goHome: byId(SELECTORS.buttons.goHome),
                openConfig: allBySelector(SELECTORS.buttons.openConfig),
                closeConfig: byId(SELECTORS.buttons.closeConfig),
                cancelExit: byId(SELECTORS.buttons.cancelExit),
                confirmExit: byId(SELECTORS.buttons.confirmExit),
                toggleSound: byId(SELECTORS.buttons.toggleSound),
                testSound: byId(SELECTORS.buttons.testSound),
                toggleTheme: byId(SELECTORS.buttons.toggleTheme),
                fontDecrease: byId(SELECTORS.buttons.fontDecrease),
                fontIncrease: byId(SELECTORS.buttons.fontIncrease),
                openAbout: byId(SELECTORS.buttons.openAbout),
                closeAbout: byId(SELECTORS.buttons.closeAbout),
                acceptAvatar: byId(SELECTORS.buttons.acceptAvatar)
            },
            modals: {
                exit: byId(SELECTORS.modals.exit),
                config: byId(SELECTORS.modals.config),
                color: byId(SELECTORS.modals.color),
                theme: byId(SELECTORS.modals.theme),
                about: byId(SELECTORS.modals.about)
            },
            soundIcon: byId(SELECTORS.soundIcon),
            soundLabel: byId(SELECTORS.soundLabel),
            fontSizeLabel: byId(SELECTORS.fontSizeLabel)
        };
    }

    function shuffle(items) {
        const shuffledItems = [...items];

        for (let index = shuffledItems.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
        }

        return shuffledItems;
    }

    function getSelectedQuestions() {
        return QUESTION_BANK.obtenerPreguntas(state.activeCategories);
    }

    function getQuestionCategories() {
        if (typeof QUESTION_BANK.obtenerCategorias !== "function") {
            return QUESTION_BANK.obtenerIdsCategorias().map(id => ({
                id,
                nombre: id,
                descripcion: "",
                total: 0
            }));
        }

        return QUESTION_BANK.obtenerCategorias();
    }

    function getAllCategoryIds() {
        return getQuestionCategories().map(category => category.id);
    }

    function getSavedActiveCategories() {
        const availableIds = getAllCategoryIds();
        if (availableIds.length === 0) return [];

        try {
            const savedIds = JSON.parse(STORAGE.get(CONFIG.storageKeys.activeCategories, "[]"));
            if (!Array.isArray(savedIds)) return availableIds;

            const validIds = savedIds.filter(id => availableIds.includes(id));
            return validIds.length > 0 ? validIds : availableIds;
        } catch {
            return availableIds;
        }
    }

    function saveActiveCategories() {
        STORAGE.set(CONFIG.storageKeys.activeCategories, JSON.stringify(state.activeCategories));
    }

    function renderCategoryOptions() {
        const categories = getQuestionCategories();
        const fragment = document.createDocumentFragment();

        categories.forEach(category => {
            const button = document.createElement("button");
            const name = document.createElement("span");
            const count = document.createElement("span");

            button.className = "category-option";
            button.type = "button";
            button.dataset.categoryId = category.id;
            button.setAttribute("aria-pressed", String(state.activeCategories.includes(category.id)));
            button.setAttribute("title", category.descripcion || category.nombre);

            name.className = "category-option-name";
            name.textContent = category.nombre;

            count.className = "category-option-count";
            count.textContent = String(category.total);

            button.append(name, count);
            fragment.appendChild(button);
        });

        DOM.settings.categoryOptions.replaceChildren(fragment);
    }

    function updateCategoryOptions() {
        DOM.settings.categoryOptions.querySelectorAll(".category-option").forEach(button => {
            button.setAttribute("aria-pressed", String(state.activeCategories.includes(button.dataset.categoryId)));
        });
    }

    function toggleCategory(categoryId) {
        const availableIds = getAllCategoryIds();
        if (!availableIds.includes(categoryId)) return;

        const nextCategories = state.activeCategories.includes(categoryId)
            ? state.activeCategories.filter(id => id !== categoryId)
            : [...state.activeCategories, categoryId];

        if (nextCategories.length === 0) {
            AudioEngine.play("wrong");
            return;
        }

        state.activeCategories = nextCategories;
        saveActiveCategories();
        updateCategoryOptions();
        AudioEngine.play("tap");
    }

    function rotateHomeTagline() {
        const availableTaglines = HOME_TAGLINES.filter(tagline => tagline !== currentHomeTagline);
        const taglinePool = availableTaglines.length > 0 ? availableTaglines : HOME_TAGLINES;
        const nextTagline = taglinePool[Math.floor(Math.random() * taglinePool.length)];

        currentHomeTagline = nextTagline;
        DOM.homeSubtitle.textContent = nextTagline;
    }

    function setScreen(activeScreen) {
        Object.values(DOM.screens).forEach(screen => {
            screen.classList.toggle("active", screen === activeScreen);
        });

        if (activeScreen === DOM.screens.home) {
            rotateHomeTagline();
        }
    }

    function setModal(modal, isOpen) {
        modal.classList.toggle("active", isOpen);
    }

    function bindPressFeedback() {
        const pressableSelector = ".btn, .btn-icon, .option-btn, .font-size-step, .theme-option, .category-option, .player-color-trigger, .player-color-choice, .player-emoji-choice, .player-reset-btn, .home-footer";
        let activePressTarget = null;

        function clearPressedState() {
            if (!activePressTarget) return;
            activePressTarget.classList.remove("is-pressed");
            activePressTarget = null;
        }

        document.addEventListener("pointerdown", event => {
            const button = event.target.closest(pressableSelector);
            if (!button || button.disabled) return;

            clearPressedState();
            activePressTarget = button;
            button.classList.add("is-pressed");
        });

        document.addEventListener("pointerup", clearPressedState);
        document.addEventListener("pointercancel", clearPressedState);
        document.addEventListener("pointerleave", event => {
            if (event.target === document) {
                clearPressedState();
            }
        });
    }

    function clearAdvanceTimer() {
        if (!state.advanceTimerId) return;

        clearTimeout(state.advanceTimerId);
        state.advanceTimerId = null;
    }

    function clearCountdownTimer() {
        if (!state.countdownTimerId) return;

        clearInterval(state.countdownTimerId);
        state.countdownTimerId = null;
    }

    function isTimeAttackMode() {
        return state.gameMode === "timeAttack";
    }

    function isLearningMode() {
        return state.gameMode === "learning";
    }

    function isMultiplayerMode() {
        return state.gameMode === "multiplayer";
    }

    function getQuestionLimitForMode(mode) {
        if (mode !== "multiplayer") return state.questionLimit;
        return Math.max(30, state.players.length * 10);
    }

    function getDefaultPlayer(index) {
        return {
            id: `player-${index + 1}`,
            name: `Jugador ${index + 1}`,
            color: PLAYER_COLOR_PALETTE[index % PLAYER_COLOR_PALETTE.length],
            emoji: PLAYER_EMOJI_PALETTE[index % PLAYER_EMOJI_PALETTE.length].emoji,
            score: 0
        };
    }

    function normalizeSavedPlayer(player, index) {
        const fallbackPlayer = getDefaultPlayer(index);
        const name = typeof player?.name === "string" ? player.name.trim() : "";
        const color = PLAYER_COLOR_PALETTE.includes(player?.color) ? player.color : fallbackPlayer.color;
        const emoji = PLAYER_EMOJI_PALETTE.some(option => option.emoji === player?.emoji) ? player.emoji : fallbackPlayer.emoji;

        return {
            ...fallbackPlayer,
            name: name || fallbackPlayer.name,
            color,
            emoji
        };
    }

    function loadSavedPlayers() {
        try {
            const savedPlayers = JSON.parse(STORAGE.get(CONFIG.storageKeys.players, "[]"));
            if (!Array.isArray(savedPlayers)) return [];

            return savedPlayers
                .slice(0, PLAYER_COLOR_PALETTE.length)
                .map(normalizeSavedPlayer);
        } catch {
            return [];
        }
    }

    function savePlayers(players) {
        const normalizedPlayers = players
            .slice(0, PLAYER_COLOR_PALETTE.length)
            .map(normalizeSavedPlayer);

        STORAGE.set(CONFIG.storageKeys.players, JSON.stringify(normalizedPlayers));
    }

    function mergePlayersWithMemory(visiblePlayers) {
        const rememberedPlayers = [...state.players];

        visiblePlayers.forEach((player, index) => {
            rememberedPlayers[index] = player;
        });

        return rememberedPlayers
            .slice(0, PLAYER_COLOR_PALETTE.length)
            .map(normalizeSavedPlayer);
    }

    function renderPlayerForm() {
        const playerCount = Number(DOM.multiplayer.playerCount.value);
        const fragment = document.createDocumentFragment();

        for (let index = 0; index < playerCount; index++) {
            const row = document.createElement("div");
            const colorTrigger = document.createElement("button");
            const avatarEmoji = document.createElement("span");
            const name = document.createElement("input");
            const reset = document.createElement("button");
            const player = normalizeSavedPlayer(state.players[index], index);

            row.className = "player-row";
            row.dataset.playerIndex = String(index);

            colorTrigger.className = "player-color-trigger";
            colorTrigger.type = "button";
            colorTrigger.dataset.selectedColor = player.color;
            colorTrigger.dataset.selectedEmoji = player.emoji;
            colorTrigger.style.backgroundColor = player.color;
            colorTrigger.setAttribute("aria-label", `Elegir avatar jugador ${index + 1}`);

            avatarEmoji.className = "player-avatar-emoji";
            avatarEmoji.textContent = player.emoji;
            colorTrigger.appendChild(avatarEmoji);

            name.className = "player-name-input";
            name.type = "text";
            name.maxLength = 18;
            name.placeholder = `Jugador ${index + 1}`;
            name.value = player.name;
            name.dataset.playerName = String(index);

            reset.className = "player-reset-btn";
            reset.type = "button";
            reset.dataset.resetPlayer = String(index);
            reset.setAttribute("aria-label", `Restablecer jugador ${index + 1}`);
            reset.innerHTML = '<span class="material-symbols-outlined">close</span>';

            row.append(colorTrigger, name, reset);
            fragment.appendChild(row);
        }

        DOM.multiplayer.playersForm.replaceChildren(fragment);
    }

    function readPlayersFromForm() {
        const rows = [...DOM.multiplayer.playersForm.querySelectorAll(".player-row")];

        return rows.map((row, index) => {
            const color = row.querySelector(".player-color-trigger")?.dataset.selectedColor || PLAYER_COLOR_PALETTE[index % PLAYER_COLOR_PALETTE.length];
            const emoji = row.querySelector(".player-color-trigger")?.dataset.selectedEmoji || PLAYER_EMOJI_PALETTE[index % PLAYER_EMOJI_PALETTE.length].emoji;
            const rawName = row.querySelector(".player-name-input")?.value.trim();

            return {
                id: `player-${index + 1}`,
                name: rawName || `Jugador ${index + 1}`,
                color,
                emoji,
                score: 0
            };
        });
    }

    function rememberPlayersFromForm() {
        const visiblePlayers = readPlayersFromForm();
        const rememberedPlayers = mergePlayersWithMemory(visiblePlayers);

        state.players = rememberedPlayers;
        savePlayers(rememberedPlayers);

        return visiblePlayers;
    }

    function resetPlayerRow(resetButton) {
        const index = Number(resetButton.dataset.resetPlayer);
        const row = resetButton.closest(".player-row");
        const colorTrigger = row?.querySelector(".player-color-trigger");
        const avatarEmoji = row?.querySelector(".player-avatar-emoji");
        const name = row?.querySelector(".player-name-input");
        const fallbackPlayer = getDefaultPlayer(index);

        if (!row || !colorTrigger || !avatarEmoji || !name) return;

        name.value = fallbackPlayer.name;
        avatarEmoji.textContent = fallbackPlayer.emoji;
        colorTrigger.dataset.selectedColor = fallbackPlayer.color;
        colorTrigger.dataset.selectedEmoji = fallbackPlayer.emoji;
        colorTrigger.style.backgroundColor = fallbackPlayer.color;
        rememberPlayersFromForm();
        AudioEngine.play("tap");
    }

    function openColorModal(colorTrigger) {
        activeColorTrigger = colorTrigger;
        renderColorModalPalette(colorTrigger.dataset.selectedColor);
        renderEmojiModalPalette(colorTrigger.dataset.selectedEmoji);
        setModal(DOM.modals.color, true);
    }

    function renderColorModalPalette(selectedColor) {
        const fragment = document.createDocumentFragment();

        PLAYER_COLOR_PALETTE.forEach(colorValue => {
            const colorButton = document.createElement("button");
            colorButton.className = "player-color-choice";
            colorButton.type = "button";
            colorButton.dataset.color = colorValue;
            colorButton.style.backgroundColor = colorValue;
            colorButton.setAttribute("role", "radio");
            colorButton.setAttribute("aria-checked", String(colorValue === selectedColor));

            if (colorValue === selectedColor) {
                colorButton.classList.add("selected");
            }

            fragment.appendChild(colorButton);
        });

        DOM.multiplayer.colorModalPalette.replaceChildren(fragment);
    }

    function renderEmojiModalPalette(selectedEmoji) {
        const fragment = document.createDocumentFragment();

        PLAYER_EMOJI_PALETTE.forEach(option => {
            const emojiButton = document.createElement("button");
            emojiButton.className = "player-emoji-choice";
            emojiButton.type = "button";
            emojiButton.dataset.emoji = option.emoji;
            emojiButton.textContent = option.emoji;
            emojiButton.setAttribute("role", "radio");
            emojiButton.setAttribute("aria-label", option.label);
            emojiButton.setAttribute("aria-checked", String(option.emoji === selectedEmoji));

            if (option.emoji === selectedEmoji) {
                emojiButton.classList.add("selected");
            }

            fragment.appendChild(emojiButton);
        });

        DOM.multiplayer.emojiModalPalette.replaceChildren(fragment);
    }

    function selectPlayerColor(colorButton) {
        if (!activeColorTrigger) return;

        activeColorTrigger.dataset.selectedColor = colorButton.dataset.color;
        activeColorTrigger.style.backgroundColor = colorButton.dataset.color;
        renderColorModalPalette(colorButton.dataset.color);
        rememberPlayersFromForm();
        AudioEngine.play("tap");
    }

    function selectPlayerEmoji(emojiButton) {
        if (!activeColorTrigger) return;

        activeColorTrigger.dataset.selectedEmoji = emojiButton.dataset.emoji;
        activeColorTrigger.querySelector(".player-avatar-emoji").textContent = emojiButton.dataset.emoji;
        renderEmojiModalPalette(emojiButton.dataset.emoji);
        rememberPlayersFromForm();
        AudioEngine.play("tap");
    }

    function openMultiplayerSetup() {
        activeColorTrigger = null;
        setModal(DOM.modals.color, false);
        state.players = loadSavedPlayers();
        renderPlayerForm();
        setScreen(DOM.screens.multiplayerSetup);
    }

    function startMultiplayerGame() {
        activeColorTrigger = null;
        setModal(DOM.modals.color, false);
        state.players = rememberPlayersFromForm();
        startGame("multiplayer");
    }

    function getCurrentPlayer() {
        if (!isMultiplayerMode() || state.players.length === 0) return null;
        return state.players[state.currentQuestionIndex % state.players.length];
    }

    function updateCurrentPlayerDisplay() {
        const player = getCurrentPlayer();
        if (!player) return;

        DOM.game.currentPlayerName.textContent = `${player.emoji} ${player.name}`;
        DOM.game.currentPlayer.style.setProperty("--current-player-color", player.color);
    }

    function startGame(mode = state.gameMode) {
        const availableQuestions = getSelectedQuestions();
        const isTimeAttack = mode === "timeAttack";
        const isMultiplayer = mode === "multiplayer";
        const totalQuestions = isTimeAttack
            ? availableQuestions.length
            : Math.min(getQuestionLimitForMode(mode), availableQuestions.length);

        if (totalQuestions === 0) {
            alert("No hay preguntas disponibles para las categorías seleccionadas.");
            return;
        }

        clearAdvanceTimer();
        clearCountdownTimer();
        AudioEngine.play("start");

        state.currentQuestions = shuffle(availableQuestions).slice(0, totalQuestions);
        state.gameMode = mode;
        if (isMultiplayer) {
            state.players = state.players.map(player => ({ ...player, score: 0 }));
        }
        state.currentQuestionIndex = 0;
        state.answeredCount = 0;
        state.score = 0;
        state.strikes = 0;
        state.isAnswerLocked = false;
        state.isLearningAwaitingAdvance = false;
        state.timeAttackEndsAt = isTimeAttack ? Date.now() + CONFIG.timeAttackMs : 0;

        DOM.game.timerText.classList.toggle("hidden", !isTimeAttack);
        DOM.game.strikeBoard.classList.toggle("hidden", !isTimeAttack);
        DOM.game.counterText.classList.toggle("hidden", isTimeAttack);
        DOM.game.currentPlayer.classList.toggle("hidden", !isMultiplayer);
        DOM.screens.game.classList.toggle("multiplayer-active", isMultiplayer);
        DOM.screens.game.classList.toggle("time-attack-active", isTimeAttack);
        DOM.screens.game.classList.toggle("learning-active", mode === "learning");
        DOM.screens.game.classList.remove("learning-review");
        DOM.multiplayer.scoreboard.classList.add("hidden");
        DOM.multiplayer.scoreboard.replaceChildren();
        DOM.game.timerText.classList.remove("warning", "danger");
        updateStrikeBoard();
        setScreen(DOM.screens.game);
        if (isTimeAttack) {
            updateCountdown();
            state.countdownTimerId = window.setInterval(updateCountdown, 250);
        }
        renderQuestion();
    }

    function renderQuestion() {
        const currentQuestion = state.currentQuestions[state.currentQuestionIndex];
        if (!currentQuestion) {
            showResults();
            return;
        }

        state.isAnswerLocked = false;
        state.isLearningAwaitingAdvance = false;
        const questionNumber = state.currentQuestionIndex + 1;

        DOM.screens.game.classList.remove("learning-review");
        DOM.game.learningExplanation.textContent = "";
        DOM.game.learningExplanation.classList.add("hidden");
        DOM.game.counterText.textContent = `${questionNumber}/${state.currentQuestions.length}`;
        updateProgressBar();
        if (isMultiplayerMode()) {
            updateCurrentPlayerDisplay();
        }
        DOM.game.categoryLabel.textContent = currentQuestion.categoria;
        DOM.game.questionText.textContent = currentQuestion.pregunta;
        DOM.game.optionsContainer.replaceChildren();
        restartQuestionAnimation();

        const options = shuffle([currentQuestion.correcta, ...currentQuestion.erroneas]);
        const fragment = document.createDocumentFragment();
        const colorClasses = ["option-red", "option-green", "option-yellow", "option-blue"];

        options.forEach((optionText, index) => {
            const button = document.createElement("button");
            const colorAccent = document.createElement("span");
            const text = document.createElement("span");
            const feedbackIcon = document.createElement("span");

            button.className = `option-btn ${colorClasses[index % colorClasses.length]}`;
            button.type = "button";
            button.dataset.answer = optionText;

            colorAccent.className = "option-color";
            colorAccent.setAttribute("aria-hidden", "true");

            text.className = "option-text";
            text.textContent = optionText;

            feedbackIcon.className = "feedback-icon material-symbols-outlined";
            feedbackIcon.setAttribute("aria-hidden", "true");

            button.append(colorAccent, text, feedbackIcon);
            fragment.appendChild(button);
        });

        DOM.game.optionsContainer.appendChild(fragment);
    }

    function restartQuestionAnimation() {
        DOM.game.questionPanel.classList.remove("question-enter");
        DOM.game.optionsContainer.classList.remove("question-enter");

        requestAnimationFrame(() => {
            DOM.game.questionPanel.classList.add("question-enter");
            DOM.game.optionsContainer.classList.add("question-enter");
        });
    }

    function getTimeRemainingMs() {
        if (!isTimeAttackMode()) return 0;
        return Math.max(0, state.timeAttackEndsAt - Date.now());
    }

    function formatTime(milliseconds) {
        const totalSeconds = Math.ceil(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function updateProgressBar() {
        if (isTimeAttackMode()) {
            const remainingRatio = getTimeRemainingMs() / CONFIG.timeAttackMs;
            DOM.game.progressBar.style.width = `${Math.max(0, remainingRatio * 100)}%`;
            return;
        }

        const questionNumber = state.currentQuestionIndex + 1;
        const progress = (questionNumber / state.currentQuestions.length) * 100;
        DOM.game.progressBar.style.width = `${progress}%`;
    }

    function updateCountdown() {
        const remainingMs = getTimeRemainingMs();
        DOM.game.timerValue.textContent = formatTime(remainingMs);
        DOM.game.timerText.classList.toggle("warning", remainingMs <= 30000 && remainingMs > 10000);
        DOM.game.timerText.classList.toggle("danger", remainingMs <= 10000);
        updateProgressBar();

        if (remainingMs === 0) {
            showResults();
        }
    }

    function handleAnswerClick(event) {
        const selectedButton = event.target.closest(".option-btn");
        if (!selectedButton || state.isAnswerLocked) return;
        event.stopPropagation();

        const currentQuestion = state.currentQuestions[state.currentQuestionIndex];
        if (!currentQuestion) return;

        validateAnswer(selectedButton, selectedButton.dataset.answer, currentQuestion.correcta);
    }

    function validateAnswer(selectedButton, selectedAnswer, correctAnswer) {
        if (isTimeAttackMode() && getTimeRemainingMs() === 0) {
            showResults();
            return;
        }

        state.isAnswerLocked = true;
        state.answeredCount++;

        const optionButtons = [...DOM.game.optionsContainer.querySelectorAll(".option-btn")];
        optionButtons.forEach(button => {
            button.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {
            selectedButton.classList.add("correct", "pop");
            setFeedbackIcon(selectedButton, "check_circle");
            state.score++;
            const currentPlayer = getCurrentPlayer();
            if (currentPlayer) {
                currentPlayer.score++;
            }
            AudioEngine.play("correct");
        } else {
            selectedButton.classList.add("wrong", "shake");
            setFeedbackIcon(selectedButton, "cancel");
            if (isTimeAttackMode()) {
                AudioEngine.play("strike");
                state.strikes = Math.min(CONFIG.maxStrikes, state.strikes + 1);
                updateStrikeBoard();
            } else {
                AudioEngine.play("wrong");
            }

            optionButtons.forEach(button => {
                if (button.dataset.answer === correctAnswer) {
                    button.classList.add("correct");
                    setFeedbackIcon(button, "check_circle");
                }
            });
        }

        if (isLearningMode()) {
            showLearningReview(selectedAnswer, correctAnswer);
            return;
        }

        const delay = isTimeAttackMode() ? CONFIG.timeAttackAnswerDelayMs : CONFIG.answerDelayMs;
        state.advanceTimerId = window.setTimeout(() => {
            if (isTimeAttackMode() && state.strikes >= CONFIG.maxStrikes) {
                showResults("strikes");
                return;
            }

            goToNextQuestion();
        }, delay);
    }

    function showLearningReview(selectedAnswer, correctAnswer) {
        const currentQuestion = state.currentQuestions[state.currentQuestionIndex];
        const optionButtons = [...DOM.game.optionsContainer.querySelectorAll(".option-btn")];
        const selectedButton = optionButtons.find(button => button.dataset.answer === selectedAnswer);
        const correctButton = optionButtons.find(button => button.dataset.answer === correctAnswer);

        optionButtons.forEach(button => {
            const isFocusAnswer = button === selectedButton || button === correctButton;
            button.classList.toggle("learning-focus", isFocusAnswer);
            button.disabled = !isFocusAnswer;
        });

        if (selectedButton && selectedButton !== correctButton) {
            DOM.game.optionsContainer.appendChild(selectedButton);
        }
        if (correctButton) {
            DOM.game.optionsContainer.appendChild(correctButton);
        }

        DOM.game.learningExplanation.textContent = currentQuestion?.datoCurioso || "";
        DOM.game.learningExplanation.classList.toggle("hidden", !DOM.game.learningExplanation.textContent);
        DOM.screens.game.classList.add("learning-review");
        state.isLearningAwaitingAdvance = true;
    }

    function handleLearningAdvance(event) {
        if (!state.isLearningAwaitingAdvance || !isLearningMode()) return;
        if (event.target.closest(".btn-icon, .modal-overlay")) return;

        AudioEngine.play("tap", 1.2);
        goToNextQuestion();
    }

    function setFeedbackIcon(button, iconName) {
        const icon = button.querySelector(".feedback-icon");
        if (icon) {
            icon.textContent = iconName;
        }
    }

    function updateStrikeBoard() {
        const slots = [...DOM.game.strikeBoard.querySelectorAll(".strike-slot")];
        slots.forEach((slot, index) => {
            const isActive = index < state.strikes;
            slot.classList.toggle("active", isActive);
            slot.textContent = isActive ? "X" : "";
        });
    }

    function goToNextQuestion() {
        state.advanceTimerId = null;
        state.isLearningAwaitingAdvance = false;
        if (isTimeAttackMode() && getTimeRemainingMs() === 0) {
            showResults();
            return;
        }

        state.currentQuestionIndex++;

        if (state.currentQuestionIndex < state.currentQuestions.length) {
            renderQuestion();
            return;
        }

        showResults();
    }

    function showResults(reason = "completed") {
        clearAdvanceTimer();
        clearCountdownTimer();
        state.isLearningAwaitingAdvance = false;
        DOM.game.timerText.classList.add("hidden");
        DOM.game.strikeBoard.classList.add("hidden");
        DOM.game.currentPlayer.classList.add("hidden");
        DOM.screens.game.classList.remove("multiplayer-active");
        DOM.screens.game.classList.remove("time-attack-active");
        DOM.screens.game.classList.remove("learning-active", "learning-review");
        DOM.game.learningExplanation.classList.add("hidden");
        DOM.game.counterText.classList.remove("hidden");
        DOM.screens.result.classList.toggle("multiplayer-results", isMultiplayerMode());

        if (isTimeAttackMode()) {
            DOM.game.scoreTitle.textContent = reason === "strikes"
                ? "Tres strikes"
                : "Contrarreloj Finalizado";
            DOM.game.finalScore.textContent = `${state.score}/${state.answeredCount}`;
            DOM.multiplayer.scoreboard.classList.add("hidden");
            DOM.result.confettiLayer.classList.add("hidden");
        } else if (isMultiplayerMode()) {
            DOM.game.scoreTitle.textContent = "Marcador Final";
            DOM.game.finalScore.textContent = "";
            renderMultiplayerScoreboard();
            startConfetti();
        } else {
            DOM.game.scoreTitle.textContent = "Puntuación Final";
            DOM.game.finalScore.textContent = `${state.score}/${state.currentQuestions.length}`;
            DOM.multiplayer.scoreboard.classList.add("hidden");
            DOM.result.confettiLayer.classList.add("hidden");
        }

        if (reason !== "strikes") {
            AudioEngine.play("win");
        }
        setScreen(DOM.screens.result);
    }

    function showDebugMultiplayerResults() {
        state.gameMode = "multiplayer";
        state.currentQuestions = Array.from({ length: 110 }, (_, index) => ({ id: `debug-${index}` }));
        state.players = Array.from({ length: 11 }, (_, index) => ({
            id: `debug-player-${index + 1}`,
            name: index === 0 ? "ROUROG" : `Jugador ${index + 1}`,
            color: PLAYER_COLOR_PALETTE[index % PLAYER_COLOR_PALETTE.length],
            emoji: PLAYER_EMOJI_PALETTE[index % PLAYER_EMOJI_PALETTE.length].emoji,
            score: index === 0 ? 28 : Math.floor(Math.random() * 24)
        })).sort((a, b) => b.score - a.score);

        showResults("debug");
    }

    function renderMultiplayerScoreboard() {
        const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);
        const winner = sortedPlayers[0];
        const fragment = document.createDocumentFragment();
        const winnerBlock = document.createElement("div");
        const winnerLabel = document.createElement("div");
        const winnerName = document.createElement("div");
        const crownIcon = document.createElement("span");
        const winnerEmoji = document.createElement("span");
        const winnerText = document.createElement("span");

        winnerBlock.className = "winner-card";
        winnerBlock.style.setProperty("--winner-color", winner.color);
        winnerLabel.className = "winner-label";
        winnerLabel.textContent = "Ganador:";
        winnerName.className = "winner-name";
        crownIcon.className = "material-symbols-outlined";
        crownIcon.textContent = "crown";
        winnerEmoji.className = "winner-emoji";
        winnerEmoji.textContent = winner.emoji;
        winnerText.textContent = winner.name;
        winnerName.append(crownIcon, winnerEmoji, winnerText);

        winnerBlock.append(winnerLabel, winnerName);
        fragment.appendChild(winnerBlock);

        sortedPlayers.slice(1).forEach((player, index) => {
            const row = document.createElement("div");
            const dot = document.createElement("span");
            const emoji = document.createElement("span");
            const rank = document.createElement("span");
            const name = document.createElement("span");
            const score = document.createElement("span");

            row.className = "score-row";
            dot.className = "player-dot";
            dot.style.backgroundColor = player.color;
            emoji.className = "score-emoji";
            emoji.textContent = player.emoji;
            rank.className = "score-rank";
            rank.textContent = `${index + 2}.`;
            name.textContent = player.name;
            score.className = "score-value";
            score.textContent = `${player.score} pts`;

            row.append(rank, dot, emoji, name, score);
            fragment.appendChild(row);
        });

        DOM.multiplayer.scoreboard.replaceChildren(fragment);
        DOM.multiplayer.scoreboard.classList.remove("hidden");
    }

    function startConfetti() {
        const colors = state.players.map(player => player.color);
        const fragment = document.createDocumentFragment();

        DOM.result.confettiLayer.replaceChildren();
        for (let index = 0; index < 42; index++) {
            const piece = document.createElement("span");
            piece.className = "confetti-piece";
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.backgroundColor = colors[index % colors.length] || "#d4af37";
            piece.style.animationDelay = `${Math.random() * 1.4}s`;
            piece.style.animationDuration = `${2.4 + Math.random() * 1.8}s`;
            fragment.appendChild(piece);
        }

        DOM.result.confettiLayer.appendChild(fragment);
        DOM.result.confettiLayer.classList.remove("hidden");
    }

    function exitGame() {
        clearAdvanceTimer();
        clearCountdownTimer();
        state.isLearningAwaitingAdvance = false;
        DOM.game.timerText.classList.add("hidden");
        DOM.game.strikeBoard.classList.add("hidden");
        DOM.game.currentPlayer.classList.add("hidden");
        DOM.screens.game.classList.remove("multiplayer-active");
        DOM.screens.game.classList.remove("time-attack-active");
        DOM.screens.game.classList.remove("learning-active", "learning-review");
        DOM.game.learningExplanation.classList.add("hidden");
        DOM.game.counterText.classList.remove("hidden");
        DOM.result.confettiLayer.classList.add("hidden");
        setModal(DOM.modals.exit, false);
        setScreen(DOM.screens.home);
    }

    function updateSoundButton() {
        const isEnabled = AudioEngine.isEnabled();
        DOM.buttons.toggleSound.classList.toggle("btn-primary", isEnabled);
        DOM.buttons.toggleSound.setAttribute("aria-pressed", String(isEnabled));
        DOM.soundIcon.textContent = isEnabled ? "volume_up" : "volume_off";
        DOM.soundLabel.textContent = isEnabled ? "Sonido Activado" : "Sonido Apagado";
    }

    function toggleSound() {
        const nextValue = !AudioEngine.isEnabled();
        AudioEngine.setEnabled(nextValue);
        updateSoundButton();

        if (nextValue) {
            AudioEngine.play("tap");
        }
    }

    function testSoundPack() {
        if (!AudioEngine.isEnabled()) {
            AudioEngine.setEnabled(true);
            updateSoundButton();
        }

        AudioEngine.play("tap");
        window.setTimeout(() => AudioEngine.play("start"), 120);
        window.setTimeout(() => AudioEngine.play("correct"), 520);
        window.setTimeout(() => AudioEngine.play("strike"), 980);
        window.setTimeout(() => AudioEngine.play("win"), 1320);
    }

    function clampFontScale(scale) {
        return Math.min(CONFIG.fontScale.max, Math.max(CONFIG.fontScale.min, scale));
    }

    function normalizeFontScale(scale) {
        return Number(clampFontScale(scale).toFixed(2));
    }

    function getSavedFontScale() {
        const storedScale = Number(STORAGE.get(CONFIG.storageKeys.fontScale, String(CONFIG.fontScale.default)));
        return normalizeFontScale(Number.isFinite(storedScale) ? storedScale : CONFIG.fontScale.default);
    }

    function updateFontScaleControl(scale) {
        const percentage = Math.round(scale * 100);
        DOM.fontSizeLabel.textContent = `Fuente ${percentage}%`;
        DOM.buttons.fontDecrease.disabled = scale <= CONFIG.fontScale.min;
        DOM.buttons.fontIncrease.disabled = scale >= CONFIG.fontScale.max;
        DOM.buttons.fontDecrease.setAttribute("aria-disabled", String(DOM.buttons.fontDecrease.disabled));
        DOM.buttons.fontIncrease.setAttribute("aria-disabled", String(DOM.buttons.fontIncrease.disabled));
    }

    function applyFontScale(scale) {
        const selectedScale = normalizeFontScale(scale);
        document.documentElement.style.setProperty("--font-scale-percent", `${Math.round(selectedScale * 100)}%`);
        STORAGE.set(CONFIG.storageKeys.fontScale, String(selectedScale));
        updateFontScaleControl(selectedScale);
    }

    function adjustFontScale(direction) {
        const currentScale = getSavedFontScale();
        const nextScale = normalizeFontScale(currentScale + (CONFIG.fontScale.step * direction));
        applyFontScale(nextScale);
        AudioEngine.play("tap");
    }

    function applySavedFontScale() {
        applyFontScale(getSavedFontScale());
    }

    function applyTheme(themeId) {
        const selectedThemeData = THEMES.find(theme => theme.id === themeId) || THEMES[0];
        const selectedTheme = selectedThemeData.id;
        document.body.dataset.theme = selectedTheme;
        document.body.dataset.brandMetal = selectedThemeData.brandMetal;
        STORAGE.set(CONFIG.storageKeys.theme, selectedTheme);
        updateThemeOptions(selectedTheme);
    }

    function applySavedTheme() {
        applyTheme(STORAGE.get(CONFIG.storageKeys.theme, "blue-gold"));
    }

    function registerServiceWorker() {
        if (!("serviceWorker" in navigator)) return;

        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js")
                .then(registration => registration.update())
                .catch(error => {
                    console.warn("No se pudo registrar el service worker.", error);
                });
        });
    }

    function renderThemeOptions() {
        const fragment = document.createDocumentFragment();

        THEMES.forEach(theme => {
            const button = document.createElement("button");
            const swatch = document.createElement("span");

            button.className = "theme-option";
            button.type = "button";
            button.dataset.themeId = theme.id;
            button.setAttribute("role", "radio");
            button.setAttribute("aria-label", theme.name);

            swatch.className = "theme-swatch";
            swatch.style.setProperty("--theme-primary", theme.colors[0]);
            swatch.style.setProperty("--theme-secondary", theme.colors[1]);

            button.append(swatch);
            fragment.appendChild(button);
        });

        DOM.multiplayer.themeOptions.replaceChildren(fragment);
        updateThemeOptions(document.body.dataset.theme || "blue-gold");
    }

    function updateThemeOptions(selectedThemeId) {
        DOM.multiplayer.themeOptions.querySelectorAll(".theme-option").forEach(button => {
            button.setAttribute("aria-checked", String(button.dataset.themeId === selectedThemeId));
        });
    }

    function openThemeModal() {
        AudioEngine.play("tap");
        setModal(DOM.modals.theme, true);
    }

    function bindEvents() {
        document.body.addEventListener("pointerdown", AudioEngine.preload, { once: true, capture: true });
        document.body.addEventListener("keydown", AudioEngine.preload, { once: true, capture: true });
        bindPressFeedback();
        DOM.game.optionsContainer.addEventListener("click", handleAnswerClick);

        DOM.buttons.start.addEventListener("click", () => startGame("classic"));
        DOM.buttons.timeAttack.addEventListener("click", () => startGame("timeAttack"));
        DOM.buttons.learning.addEventListener("click", () => startGame("learning"));
        DOM.buttons.openMultiplayer.addEventListener("click", openMultiplayerSetup);
        DOM.screens.game.addEventListener("click", handleLearningAdvance);
        DOM.buttons.backHome.addEventListener("click", () => {
            activeColorTrigger = null;
            setModal(DOM.modals.color, false);
            setScreen(DOM.screens.home);
        });
        DOM.buttons.startMultiplayer.addEventListener("click", startMultiplayerGame);
        DOM.multiplayer.playerCount.addEventListener("change", () => {
            rememberPlayersFromForm();
            renderPlayerForm();
            rememberPlayersFromForm();
        });
        DOM.multiplayer.playersForm.addEventListener("input", event => {
            if (event.target.closest(".player-name-input")) {
                rememberPlayersFromForm();
            }
        });
        DOM.multiplayer.playersForm.addEventListener("click", event => {
            const resetButton = event.target.closest(".player-reset-btn");
            if (resetButton) {
                resetPlayerRow(resetButton);
                return;
            }

            const colorTrigger = event.target.closest(".player-color-trigger");
            if (colorTrigger) {
                openColorModal(colorTrigger);
            }
        });
        DOM.multiplayer.colorModalPalette.addEventListener("click", event => {
            const colorButton = event.target.closest(".player-color-choice");
            if (colorButton) {
                selectPlayerColor(colorButton);
            }
        });
        DOM.multiplayer.emojiModalPalette.addEventListener("click", event => {
            const emojiButton = event.target.closest(".player-emoji-choice");
            if (emojiButton) {
                selectPlayerEmoji(emojiButton);
            }
        });
        DOM.modals.color.addEventListener("click", event => {
            if (event.target === DOM.modals.color) {
                activeColorTrigger = null;
                setModal(DOM.modals.color, false);
            }
        });
        DOM.buttons.acceptAvatar.addEventListener("click", () => {
            AudioEngine.play("tap");
            activeColorTrigger = null;
            setModal(DOM.modals.color, false);
        });
        DOM.buttons.playAgain.addEventListener("click", startGame);
        DOM.buttons.goHome.addEventListener("click", () => {
            AudioEngine.play("tap");
            clearAdvanceTimer();
            clearCountdownTimer();
            state.isLearningAwaitingAdvance = false;
            DOM.game.timerText.classList.add("hidden");
            DOM.game.strikeBoard.classList.add("hidden");
            DOM.game.currentPlayer.classList.add("hidden");
            DOM.screens.game.classList.remove("multiplayer-active");
            DOM.screens.game.classList.remove("time-attack-active");
            DOM.screens.game.classList.remove("learning-active", "learning-review");
            DOM.game.learningExplanation.classList.add("hidden");
            DOM.game.counterText.classList.remove("hidden");
            DOM.result.confettiLayer.classList.add("hidden");
            setScreen(DOM.screens.home);
        });

        DOM.buttons.exitGame.addEventListener("click", () => {
            AudioEngine.play("tap");
            setModal(DOM.modals.exit, true);
        });
        DOM.buttons.cancelExit.addEventListener("click", () => {
            AudioEngine.play("tap");
            setModal(DOM.modals.exit, false);
        });
        DOM.buttons.confirmExit.addEventListener("click", () => {
            AudioEngine.play("tap");
            exitGame();
        });

        DOM.buttons.openConfig.forEach(button => button.addEventListener("click", () => {
            AudioEngine.play("tap");
            setModal(DOM.modals.config, true);
        }));
        DOM.buttons.closeConfig.addEventListener("click", () => {
            AudioEngine.play("tap");
            setModal(DOM.modals.config, false);
        });
        DOM.buttons.toggleTheme.addEventListener("click", openThemeModal);
        DOM.buttons.toggleSound.addEventListener("click", toggleSound);
        DOM.buttons.testSound?.addEventListener("click", testSoundPack);
        DOM.buttons.fontDecrease.addEventListener("click", () => adjustFontScale(-1));
        DOM.buttons.fontIncrease.addEventListener("click", () => adjustFontScale(1));
        DOM.settings.categoryOptions.addEventListener("click", event => {
            const categoryButton = event.target.closest(".category-option");
            if (!categoryButton) return;

            toggleCategory(categoryButton.dataset.categoryId);
        });
        DOM.multiplayer.themeOptions.addEventListener("click", event => {
            const themeButton = event.target.closest(".theme-option");
            if (!themeButton) return;

            AudioEngine.play("tap");
            applyTheme(themeButton.dataset.themeId);
            setModal(DOM.modals.theme, false);
        });
        DOM.modals.theme.addEventListener("click", event => {
            if (event.target === DOM.modals.theme) {
                setModal(DOM.modals.theme, false);
            }
        });
        DOM.buttons.openAbout.addEventListener("click", () => {
            AudioEngine.play("tap");
            setModal(DOM.modals.about, true);
        });
        DOM.buttons.closeAbout.addEventListener("click", () => {
            AudioEngine.play("tap");
            setModal(DOM.modals.about, false);
        });
        DOM.modals.about.addEventListener("click", event => {
            if (event.target === DOM.modals.about) {
                setModal(DOM.modals.about, false);
            }
        });

        document.addEventListener("keydown", event => {
            const isTyping = ["INPUT", "SELECT", "TEXTAREA"].includes(event.target?.tagName);
            if (!isTyping && event.key === "1") {
                showDebugMultiplayerResults();
                return;
            }

            if (event.key !== "Escape") return;
            setModal(DOM.modals.exit, false);
            setModal(DOM.modals.config, false);
            setModal(DOM.modals.color, false);
            setModal(DOM.modals.theme, false);
            setModal(DOM.modals.about, false);
            activeColorTrigger = null;
        });
    }

    function init() {
        updateSoundButton();
        applySavedFontScale();
        state.players = loadSavedPlayers();
        if (state.players.length >= 2) {
            DOM.multiplayer.playerCount.value = String(Math.min(state.players.length, PLAYER_COLOR_PALETTE.length));
        }
        renderPlayerForm();
        renderCategoryOptions();
        renderThemeOptions();
        applySavedTheme();
        rotateHomeTagline();
        bindEvents();
        registerServiceWorker();
    }

    init();
})();
