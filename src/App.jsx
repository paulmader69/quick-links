import { useState, useEffect, useLayoutEffect, useRef, memo } from "react";
import "./App.css";

import ColorBends from "./ColorBends";
import DotGrid from "./DotGrid";
import FaultyTerminal from "./FaultyTerminal";
import Ballpit from "./Ballpit";
import Carousel from "./Carousel";
import ElasticSlider from "./ElasticSlider";


// ===== Kategorien (Home) =====

const categories = [
  {
    id: "ki",
    title: "KI",
    subtitle: "",
    color: "#22d3ee",
    image: "/images/KI.jpg",
    groups: [
      {
        title: "Text & Research",
        links: [
          { label: "DeepL Write", url: "https://www.deepl.com/write" },
          { label: "ChatGPT", url: "https://www.chat.openai.com/" }
        ]
      },
      {
        title: "Präsentation & Grafiken",
        links: [
          { label: "Gamma Alternative", url: "https://www.kimi.com/slides" },
          { label: "Pitch.", url: "https://pitch.com", note: "eigene Entscheidungen" },
          { label: "Napkin", url: "https://www.napkin.ai", note: "text to graphic" }
        ]
      },
      {
        title: "AI für Bilder & Videos",
        links: [
          { label: "Recraft AI", url: "https://www.recraft.ai/", note: "Foto" },
          { label: "Leonardo", url: "https://leonardo.ai/", note: "Neuste Modelle" },
          { label: "Blackbox", url: "https://app.blackbox.ai", note: "Neuste Modelle" },
          { label: "Hailuoai", url: "https://hailuoai.video", note: "Neuste Modelle" },
          { label: "Pika Labs", url: "https://pika.art/", note: "Video Effekte" },
          { label: "TTS", url: "https://www.minimax.io/audio/text-to-speech" }
        ]
      }
    ]
  },
  {
    id: "photo",
    title: "Photo & Video",
    subtitle: "",
    color: "#a855f7",
    image: "/images/Photo.jpg",
    groups: [
      {
        title: "Bearbeitung",
        links: [
          { label: "Photopea", url: "https://www.photopea.com/", note: "Photoshop" },
          { label: "Cleanup.pictures", url: "https://cleanup.pictures/" },
          { label: "Pixian.ai", url: "https://pixian.ai/", note: "RemoveBG" },
          { label: "Hugging Face", url: "https://huggingface.co/spaces", note: "∞ AI Tools" }
        ]
      },
      {
        title: "Tools",
        links: [
          { label: "TinyWow", url: "https://tinywow.com/", note: "100+ Tools" },
          { label: "Menschen ändern", url: "https://huggingface.co/spaces/AI4Editing/MagicQuill" },
          { label: "Coolors", url: "https://coolors.co/" },
          { label: "LumaLabs", url: "https://dream-machine.lumalabs.ai" },
          { label: "Image to 3D-Model", url: "https://www.tripo3d.ai/features/image-to-3d-model" }
        ]
      }
    ]
  },
  {
    id: "schule",
    title: "Schule",
    subtitle: "",
    color: "#4ade80",
    image: "/images/Schule.jpg",
    groups: [
      {
        title: "Allgemein",
        links: [
          { label: "HTL Webmail", url: "https://webmail.htl.moedling.at/" },
          { label: "TinyWow PDF", url: "https://tinywow.com/tools/pdf", note: "PDF Tools" },
          { label: "WolframAlpha", url: "https://www.wolframalpha.com/", note: "Problem solving" },
          { label: "Digi4School Schulbücher", url: "https://digi4school.at" }
        ]
      },
      {
        title: "Elektronik",
        links: [
          { label: "Schaltung zeichnen", url: "https://www.circuit-diagram.org/editor/" },
          {
            label: "Electrical Symbols",
            url: "https://www.electrical-symbols.com/electronic-electrical-symbols/basic-electrical-electronic-symbols.htm"
          },
          { label: "KMap", url: "https://sublime.tools/karnaugh-map/", note: "für Protokoll" },
          { label: "LaTeX Editor", url: "https://www.mathcha.io/editor", note: "Protokoll Rechnungen" },
          { label: "State Diagram", url: "https://app.diagrams.net" }
        ]
      },
      {
        title: "Docs",
        links: [
          {
            label: "Deckblatt erstellen",
            url: "https://excalidraw.com/#json=6bxcYXU1-ZuDeN6BfPmyO,u5S4RK-c5WwTu9t469oPxA"
          },
          {
            label: "Bericht PDF",
            url: "https://drive.google.com/file/d/1bhDq_n31TZWe61VCS0izUWCYc2Qu2Pi8/view"
          }
        ]
      }
    ]
  },
  {
    id: "extras",
    title: "Extras",
    subtitle: "",
    color: "#f97316",
    image: "/images/Extras.jpg",
    groups: [
      {
        title: "Tools",
        links: [
          { label: "Grafiken erstellen", url: "https://excalidraw.com", note: "Collages usw" },
          { label: "TinyWow Toolbox", url: "https://tinywow.com/", note: "100+ Tools" },
          { label: "HDToday", url: "https://hdtoday.tr", note: "Gratis Netflix" },
          { label: "Humanize AI Text", url: "https://www.humanizeai.pro" },
          { label: "Convert anything", url: "https://cloudconvert.com" },
          { label: "Symbole", url: "https://symbl.cc/de/" }
        ]
      }
    ]
  }
];

// ===== Background-Presets + Defaults (wie vorher) =====

const colorPresets = {
  standard: ["#00ffd1", "#8a5cff", "#ff5c7a"],
  blue: ["#5AB6FF", "#1D4ED8", "#0EA5E9"],
  purple: ["#C49BFF", "#7C3AED", "#4C1D95"],
  pink: ["#FF6AC6", "#EC4899", "#DB2777"],
  green: ["#85FFBD", "#22C55E", "#15803D"],
  sand: ["#E5D3B3", "#D4A373", "#B08968"],
  grey: ["#EDEDED", "#9CA3AF", "#4B5563"]
};

const activeColorPresets = {
  blue: "#5AB6FF",
  purple: "#C49BFF",
  pink: "#FF6AC6",
  green: "#85FFBD",
  sand: "#E5D3B3",
  grey: "#EDEDED"
};

const tintPresets = {
  standard: "#a7ef9e",
  blue: "#5AB6FF",
  purple: "#C49BFF",
  pink: "#FF6AC6",
  green: "#85FFBD",
  sand: "#E5D3B3",
  grey: "#EDEDED"
};

const DEFAULT_ACTIVE_BG = "colorBends";

const DEFAULT_COLORBENDS_SETTINGS = {
  colorsPreset: "standard",
  rotation: 0,
  speed: 0.5,
  scale: 1,
  mouseInfluence: 0
};

const DEFAULT_DOTGRID_SETTINGS = {
  activeColorPreset: "blue",
  dotSize: 10,
  gap: 15
};

const DEFAULT_FAULTY_SETTINGS = {
  tintPreset: "standard",
  scale: 1.5,
  digitSize: 1.2,
  speed: 1,
  scanlineIntensity: 0.5,
  curvature: 0.7
};

const DEFAULT_BALLPIT_SETTINGS = {
  gravity: 0.1,
  friction: 0.92,
  colorsPreset: "reactBits" 
};

const BALLPIT_COLOR_PRESETS = {
  reactBits: ["#FFFFFF", "#C9CED6", "#728AFB", "#4B63FF", "#2F3BAA"],
  neon: ["#FF3CAC", "#784BA0", "#2B86C5", "#94FFE1", "#FFD200"],
  pastel: ["#FFE5EC", "#BDE0FE", "#A2D2FF", "#FFC8DD", "#CDB4DB"]
};

const DEFAULT_THEMEDBG_SETTINGS = {
  theme: "blue",
  mode: "dark"
};

const THEMED_BG_PALETTES = {
  blue: {
    dark:  { bg:"#262842", card:"#293961", accent:"#2C497F", text:"#E3E4FA", muted:"#8897BD" },
    light: { bg:"#E5F0FA", card:"#BDE0FE", accent:"#8FC9FF", text:"#0F0F0F", muted:"#2C497F" }
  },
  beige: {
    dark:  { bg:"#8C755A", card:"#BFAD8D", accent:"#E3DACA", text:"#F0EBE3", muted:"#E1D8C3" },
    light: { bg:"#F0EBE3", card:"#E3DACA", accent:"#BFAD8D", text:"#27211B", muted:"#D6C9B0" }
  },
  pastel: {
    dark:  { bg:"#A27CB8", card:"#816EC7", accent:"#E5989B", text:"#FFF2F4", muted:"#FFB4A2" },
    light: { bg:"#FFCDB2", card:"#FFB4A2", accent:"#A27CB8", text:"#272128", muted:"#E5989B" }
  },
  red: {
    dark:  { bg:"#800020", card:"#FF2400", accent:"#AD1920", text:"#FFE5E2", muted:"#E8162E" },
    light: { bg:"#FF9999", card:"#FF2929", accent:"#AD1920", text:"#1B0F10", muted:"#711C11" }
  },
  green: {
    dark:  { bg:"#1D2E28", card:"#18392B", accent:"#0A5C36", text:"#E4F5EA", muted:"#9CAF88" },
    light: { bg:"#DFE6DA", card:"#CBD5C0", accent:"#9CAF88", text:"#182019", muted:"#758467" }
  },
  black: {
    dark:  { bg:"#000000", card:"#111111", accent:"#F5F5F5", text:"#F5F5F7", muted:"#888888" },
    light: { bg:"#F5F5F7", card:"#FFFFFF", accent:"#111111", text:"#111111", muted:"#555555" }
  }
};

const DEFAULT_THEME_VARS = {
  bg: "#000000",
  card: "#14121c",
  text: "#f5f5f7",
  muted: "#a1a1aa",
};

function hexToRgba(hex, alpha) {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((ch) => ch + ch).join("");
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const BackgroundLayer = memo(function BackgroundLayer({
  activeBg,
  activeTab,
  colorBendsSettings,
  dotGridSettings,
  faultySettings,
  ballpitSettings,
  themedBgSettings,
}) {
  if (activeBg === "colorBends") {
    const colors = colorPresets[colorBendsSettings.colorsPreset];

    return (
      <div className="background-layer background-layer-colorbends">
        <ColorBends
          className="color-bends-container"
          colors={colors}
          rotation={colorBendsSettings.rotation}
          speed={colorBendsSettings.speed}
          scale={colorBendsSettings.scale}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}  
          parallax={0.5}
          noise={0.1}
          transparent
        />
      </div>
    );
  }

  if (activeBg === "dotGrid") {
    const activeColor =
      activeColorPresets[dotGridSettings.activeColorPreset];

    return (
      <div className="background-layer background-layer-dotgrid">
        <DotGrid
          className="dot-grid"
          dotSize={dotGridSettings.dotSize}
          gap={dotGridSettings.gap}
          baseColor="#3b3b3b"
          activeColor={activeColor}
          proximity={150}
          speedTrigger={100}
          shockRadius={200}
          shockStrength={5}
          maxSpeed={5000}
          resistance={800}
          returnDuration={1.5}
        />
      </div>
    );
  }

  if (activeBg === "faulty") {
    const tint = tintPresets[faultySettings.tintPreset];

    return (
      <div className="background-layer background-layer-faulty">
        <FaultyTerminal
          className="faulty-terminal-container"
          scale={faultySettings.scale}
          gridMul={[2, 1]}
          digitSize={faultySettings.digitSize}
          timeScale={faultySettings.speed}
          pause={false}
          scanlineIntensity={faultySettings.scanlineIntensity}
          glitchAmount={0.7}
          flickerAmount={0.7}
          noiseAmp={0.6}
          chromaticAberration={0}
          dither={0}
          curvature={faultySettings.curvature}
          tint={tint}
          pageLoadAnimation={false}
          brightness={0.7}
          mouseReact={false}
          mouseStrength={0}
          mouse={null}
          parallax={0}
          pointerEvents="none"
          interactive={false}
        />
      </div>
    );
  }

  if (activeBg === "ballpit") {
    const { gravity, friction, colorsPreset } = ballpitSettings;
    const isPreview = activeTab === "backgrounds";

    const ballpitKey = isPreview
      ? `ballpit-${gravity}-${friction}-${colorsPreset}`
      : "ballpit-static";

    const colors =
      BALLPIT_COLOR_PRESETS[colorsPreset] || BALLPIT_COLOR_PRESETS.reactBits;

    return (
      <div className="background-layer background-layer-ballpit">
        <Ballpit
          key={ballpitKey}
          count={90}
          gravity={gravity}
          friction={friction}
          wallBounce={0.9}
          followCursor={false}
          displayCursor={false}
          colors={colors}
        />
      </div>
    );
  }

  if (activeBg === "themedBg") {
  const palette = THEMED_BG_PALETTES[themedBgSettings.theme][themedBgSettings.mode];

  return (
    <div
      className="background-layer"
      style={{
        background: palette.bg,
        transition: "background 0.4s ease"
      }}
    />
  );
}


  return null;
});




function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

function fitPopupReact(cardEl, popupEl) {
  if (!cardEl || !popupEl) return;

  const titleEl =
    cardEl.querySelector(".category-label") ||
    cardEl.querySelector("h2") ||
    cardEl;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const rootStyles = getComputedStyle(document.documentElement);
  const cssMargin = parseInt(
    rootStyles.getPropertyValue("--popup-margin") || "10",
    10
  );
  const minMargin = Number.isNaN(cssMargin) ? 10 : cssMargin;

  const nameOffset = 15;

  const prevTransition = popupEl.style.transition;
  popupEl.style.transition = "none";

  popupEl.style.setProperty("--popup-translateY", "0px");
  popupEl.style.setProperty("--popup-scale", 1);
  popupEl.style.left = "50%";
  popupEl.style.top = "0px";
  popupEl.style.transformOrigin = "top center";

  const cardRect = cardEl.getBoundingClientRect();
  const titleRect = titleEl.getBoundingClientRect();

  let rect = popupEl.getBoundingClientRect();
  const naturalHeight = rect.height;

  let finalTop = titleRect.top - nameOffset;
  let finalScale = 1;

  const bottomLimit = vh - minMargin;
  let bottom = finalTop + naturalHeight;

  if (bottom > bottomLimit) {
    finalTop -= bottom - bottomLimit;
  }

  if (finalTop < minMargin) {
    finalTop = minMargin;
    const availableHeight = vh - 2 * minMargin;
    if (naturalHeight > availableHeight) {
      finalScale = availableHeight / naturalHeight;
    }
  }

  popupEl.style.setProperty("--popup-scale", finalScale);

  rect = popupEl.getBoundingClientRect();
  const scaledHeight = rect.height;

  if (finalTop + scaledHeight > bottomLimit) {
    finalTop = bottomLimit - scaledHeight;
  }
  if (finalTop < minMargin) {
    finalTop = minMargin;
  }

  const topRelativeToCard = finalTop - cardRect.top;
  popupEl.style.top = `${topRelativeToCard}px`;

  rect = popupEl.getBoundingClientRect();
  let shiftX = 0;

  if (rect.left < minMargin) {
    shiftX = minMargin - rect.left;
  } else if (rect.right > vw - minMargin) {
    shiftX = vw - minMargin - rect.right;
  }

  if (shiftX !== 0) {
    popupEl.style.left = `calc(50% + ${shiftX}px)`;
  }

  popupEl.style.transition = prevTransition;
}





function CategoryCard({ cat, isActive, onActivate, onDeactivate, favorites, onFavorite }) {
  const cardRef = useRef(null);
  const popupRef = useRef(null);

  const longPressTimerRef = useRef(null);
  const longPressKeyRef = useRef(null);

  // Alle Favoriten-Links dieser Kategorie sammeln
  const favoriteEntries = [];
  if (favorites) {
    cat.groups.forEach((group) => {
      group.links.forEach((link) => {
        const key = `${cat.id}::${group.title}::${link.label}`;
        if (favorites[key]) {
          favoriteEntries.push({ key, link, groupTitle: group.title });
        }
      });
    });
  }

  const startLongPress = (key) => {
    if (!onFavorite) return;
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    longPressKeyRef.current = key;
    longPressTimerRef.current = setTimeout(() => {
      onFavorite(key);
      longPressTimerRef.current = null;
      longPressKeyRef.current = null;
    }, 5000); // 5 Sekunden halten
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
      longPressKeyRef.current = null;
    }
  };

  useLayoutEffect(() => {
    if (!isActive) return;
    const cardEl = cardRef.current;
    const popupEl = popupRef.current;
    if (!cardEl || !popupEl) return;

    // direkt beim Öffnen layouten
    fitPopupReact(cardEl, popupEl);

    const onResize = () => {
      fitPopupReact(cardEl, popupEl);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className={
        "category-card" + (isActive ? " category-card-active" : "")
      }
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      tabIndex={-1}
    >
      <div className="category-outline">
        <div className="category-outline" />
      </div>

      <div className="category-inner">
        <div className="category-image">
          {cat.image ? (
            <img src={cat.image} alt={cat.title} />
          ) : (
            <div className="category-image-placeholder" />
          )}
        </div>
        {/* Wichtig: .category-label – wird von fitPopupReact benutzt */}
        <div className="category-label">
          <h2>{cat.title}</h2>
        </div>
      </div>

      {isActive && (
        <div ref={popupRef} className="category-popup">
          <div className="category-popup-bg">
          </div>

          <header className="category-popup-header">
            <span className="category-popup-title">{cat.title}</span>
          </header>
           <div className="category-popup-inner">
            {/* Favoritenbox ohne Titel – nur wenn es Favoriten gibt */}
            {favoriteEntries.length > 0 && (
              <section className="category-popup-group category-popup-favorites">
                <div className="category-popup-links">
                  {favoriteEntries.map(({ link, key }) => (
                    <div
                      key={key}
                      className="category-popup-link-row"
                      onMouseDown={() => startLongPress(key)}
                      onMouseUp={cancelLongPress}
                      onMouseLeave={cancelLongPress}
                      onTouchStart={() => startLongPress(key)}
                      onTouchEnd={cancelLongPress}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="category-popup-link-pill"
                      >
                        {link.label}
                      </a>
                      {link.note && (
                        <span className="category-popup-link-note">
                          {link.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Normale Gruppen mit Titel */}
            {cat.groups.map((group) => (
              <section
                key={group.title}
                className="category-popup-group"
              >
                <h3 className="category-popup-group-title">
                  {group.title}
                </h3>
                <div className="category-popup-links">
                  {group.links.map((link) => {
                    const key = `${cat.id}::${group.title}::${link.label}`;
                    return (
                      <div
                        key={key}
                        className="category-popup-link-row"
                        onMouseDown={() => startLongPress(key)}
                        onMouseUp={cancelLongPress}
                        onMouseLeave={cancelLongPress}
                        onTouchStart={() => startLongPress(key)}
                        onTouchEnd={cancelLongPress}
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="category-popup-link-pill"
                        >
                          {link.label}
                        </a>
                        {link.note && (
                          <span className="category-popup-link-note">
                            {link.note}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ===== Haupt-Komponente (inkl. Background-Settings + localStorage) =====

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeBg, setActiveBg] = useState(() => {
    try {
      const saved = window.localStorage.getItem("ql_activeBg");
      return saved || DEFAULT_ACTIVE_BG;
    } catch {
      return DEFAULT_ACTIVE_BG;
    }
  });
  const [hasPickedBackground, setHasPickedBackground] = useState(false);

  const [activeCarouselId, setActiveCarouselId] = useState(activeBg);

  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState("");
  const quickSearchInputRef = useRef(null);


  const isCarouselActive =
  hasPickedBackground && activeCarouselId === activeBg;

  const [activeCategory, setActiveCategory] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = window.localStorage.getItem("ql_favorites");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [colorBendsSettings, setColorBendsSettings] = useState(() =>
    loadFromStorage("ql_colorBendsSettings", DEFAULT_COLORBENDS_SETTINGS)
  );
  const [dotGridSettings, setDotGridSettings] = useState(() =>
    loadFromStorage("ql_dotGridSettings", DEFAULT_DOTGRID_SETTINGS)
  );
  const [faultySettings, setFaultySettings] = useState(() =>
    loadFromStorage("ql_faultySettings", DEFAULT_FAULTY_SETTINGS)
  );
  const [ballpitSettings, setBallpitSettings] = useState(() =>
    loadFromStorage("ql_ballpitSettings", DEFAULT_BALLPIT_SETTINGS)
  );
  const [themedBgSettings, setThemedBgSettings] = useState(() =>
    loadFromStorage("ql_themedBgSettings", DEFAULT_THEMEDBG_SETTINGS)
  );


  const carouselItems = [
    {
      id: "colorBends",
      title: "",
      description: "",
      icon: (
        <div
          className="bg-choice-slide"
        >
          <div className="bg-choice-title">ColorBends</div>
          <div className="bg-choice-sub">
            Weiche Farbverläufe mit Glow und Bending-Effekt.
          </div>
        </div>
      )
    },
    {
      id: "dotGrid",
      title: "",
      description: "",
      icon: (
        <div
          className="bg-choice-slide"
        >
          <div className="bg-choice-title">DotGrid</div>
          <div className="bg-choice-sub">
            Punktgitter mit reaktiven Abständen und Größen.
          </div>
        </div>
      )
    },
    {
      id: "faulty",
      title: "",
      description: "",
      icon: (
        <div
          className="bg-choice-slide"
        >
          <div className="bg-choice-title">FaultyTerminal</div>
          <div className="bg-choice-sub">
            Glitchy Terminal mit Scanlines und Curvature.
          </div>
        </div>
      )
    },
    {
      id: "ballpit",
      title: "",
      description: "",
      icon: (
        <div
          className="bg-choice-slide"
        >
          <div className="bg-choice-title">Ballpit</div>
          <div className="bg-choice-sub">
            Bunte Bälle mit Physik im Hintergrund.
          </div>
        </div>
      )
    },
    {
      id: "themedBg",
      title: "",
      description: "",
      icon: (
        <div
          className="bg-choice-slide"
        >
          <div className="bg-choice-title">Theme Colors</div>
          <div className="bg-choice-sub">
            Verschiedene Farbmodi (Blau, Beige, Pastell, Rot, Grün, Schwarz).
          </div>
        </div>
      )
    },

  ];

  const activeCarouselIndex =
  carouselItems.findIndex((item) => item.id === activeBg) ?? 0;

  // localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem("ql_activeBg", activeBg);
    } catch {}
  }, [activeBg]);

  // Quick Search per Enter öffnen (außer in Inputs/Textareas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Enter") return;

      const target = e.target;
      const tag = target.tagName;
      const isTypingElement =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target.isContentEditable;

      // Wenn Suche noch nicht offen ist und man nicht gerade in einem Feld tippt:
      if (!isQuickSearchOpen && !isTypingElement) {
        e.preventDefault();
        setIsQuickSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isQuickSearchOpen]);

  useEffect(() => {
    if (isQuickSearchOpen) {
      setQuickSearchQuery("");
      if (quickSearchInputRef.current) {
        quickSearchInputRef.current.focus();
        quickSearchInputRef.current.select();
      }
    }
  }, [isQuickSearchOpen]);



  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ql_colorBendsSettings",
        JSON.stringify(colorBendsSettings)
      );
    } catch {}
  }, [colorBendsSettings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ql_dotGridSettings",
        JSON.stringify(dotGridSettings)
      );
    } catch {}
  }, [dotGridSettings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ql_faultySettings",
        JSON.stringify(faultySettings)
      );
    } catch {}
  }, [faultySettings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ql_ballpitSettings",
        JSON.stringify(ballpitSettings)
      );  
    } catch {}
  }, [ballpitSettings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ql_themedBgSettings",
        JSON.stringify(themedBgSettings)
      );  
    } catch {}
  }, [themedBgSettings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ql_favorites",
        JSON.stringify(favorites)
      );
    } catch {}
  }, [favorites]);


useEffect(() => {
  if (!activeCarouselId) return;

  // z.B. 250ms warten, bis der User "fertig" ist mit swipen
  const handle = setTimeout(() => {
    setActiveBg(activeCarouselId);
  }, 500);

  return () => clearTimeout(handle);
}, [activeCarouselId]);



useEffect(() => {
  const root = document.documentElement;
  let accent = "#d1d1d6"; // Fallback

  // Standard-Glow + Header, falls nix passt
  let glow1 = "rgba(209, 209, 214, 0.8)";
  let glow2 = "rgba(209, 209, 214, 0.25)";
  let headerBg = "rgba(10, 10, 16, 0.82)";

  if (activeBg === "colorBends") {
    const colors = colorPresets[colorBendsSettings.colorsPreset];
    const c0 = colors && colors[0];
    const c1 = colors && colors[1];
    accent = c0 || accent;
    glow1 = hexToRgba(accent, 0.95);
    glow2 = hexToRgba(c1 || accent, 0.45);
  } else if (activeBg === "dotGrid") {
    const active = activeColorPresets[dotGridSettings.activeColorPreset];
    accent = active || accent;
    glow1 = hexToRgba(accent, 0.95);
    glow2 = hexToRgba("#0f172a", 0.65);
  } else if (activeBg === "faulty") {
    const tint = tintPresets[faultySettings.tintPreset];
    accent = tint || accent;
    glow1 = hexToRgba(accent, 0.9);
    glow2 = hexToRgba("#020617", 0.7);
  } else if (activeBg === "ballpit") {
    accent = "#fbbf24";
    const balls =
      BALLPIT_COLOR_PRESETS[ballpitSettings.colorsPreset] ||
      BALLPIT_COLOR_PRESETS.reactBits;
    glow1 = hexToRgba(balls[2] || accent, 0.9);
    glow2 = hexToRgba(balls[4] || accent, 0.45);
  } else if (activeBg === "themedBg") {
    const palette = THEMED_BG_PALETTES[themedBgSettings.theme]?.[themedBgSettings.mode];
    if (palette) {
      accent = palette.accent;
      glow1 = hexToRgba(palette.accent, 0.9);
      glow2 = hexToRgba(palette.bg, 0.65);
      headerBg = hexToRgba(palette.card, 0.9);
    }
  }

  root.style.setProperty("--accent", accent);
  root.style.setProperty("--glow1", glow1);
  root.style.setProperty("--glow2", glow2);
  root.style.setProperty("--header-bg", headerBg);
}, [
  activeBg,
  colorBendsSettings,
  dotGridSettings,
  faultySettings,
  ballpitSettings,
  themedBgSettings
]);



  // Helper Choice-Buttons
  const threeChoiceButton = (value, current, label, onClick) => (
    <button
      type="button"
      className={
        "choice-btn" + (current === value ? " choice-btn-active" : "")
      }
      onClick={onClick}
    >
      {label}
    </button>
  );

  // Background-Settings (wie vorher, unverändert) …

  const renderColorBendsControls = () => (
    <div className="settings-panel">
      <h2 className="settings-title">ColorBends Einstellungen</h2>

      <div className="setting-row">
        <label className="setting-label">Color</label>
        <select
          className="setting-select"
          value={colorBendsSettings.colorsPreset}
          onChange={(e) =>
            setColorBendsSettings((s) => ({
              ...s,
              colorsPreset: e.target.value
            }))
          }
        >
          <option value="standard">Standard (Regenbogen)</option>
          <option value="blue">Blue (#5AB6FF)</option>
          <option value="purple">Purple (#C49BFF)</option>
          <option value="pink">Pink (#FF6AC6)</option>
          <option value="green">Green (#85FFBD)</option>
          <option value="sand">Beige/Sand (#E5D3B3)</option>
          <option value="grey">White/Grey (#EDEDED)</option>
        </select>
      </div>

      <div className="setting-row">
        <label className="setting-label">
          Rotation (deg)
          <span className="setting-value">{colorBendsSettings.rotation}</span>
        </label>
        <input
          type="range"
          min={-180}
          max={180}
          value={colorBendsSettings.rotation}
          onChange={(e) =>
            setColorBendsSettings((s) => ({
              ...s,
              rotation: Number(e.target.value)
            }))
          }
        />
      </div>

      <div className="setting-row">
        <label className="setting-label">Speed</label>
        <div className="choice-btn-group">
          {threeChoiceButton(
            0.2,
            colorBendsSettings.speed,
            "Low",
            () =>
              setColorBendsSettings((s) => ({
                ...s,
                speed: 0.2
              }))
          )}
          {threeChoiceButton(
            0.5,
            colorBendsSettings.speed,
            "Medium",
            () =>
              setColorBendsSettings((s) => ({
                ...s,
                speed: 0.5
              }))
          )}
          {threeChoiceButton(
            0.85,
            colorBendsSettings.speed,
            "High",
            () =>
              setColorBendsSettings((s) => ({
                ...s,
                speed: 0.85
              }))
          )}
        </div>
      </div>

      <div className="setting-row">
        <label className="setting-label">Scale</label>
        <div className="choice-btn-group">
          {threeChoiceButton(
            0.5,
            colorBendsSettings.scale,
            "Far",
            () =>
              setColorBendsSettings((s) => ({
                ...s,
                scale: 0.5
              }))
          )}
          {threeChoiceButton(
            1,
            colorBendsSettings.scale,
            "Normal",
            () =>
              setColorBendsSettings((s) => ({
                ...s,
                scale: 1
              }))
          )}
          {threeChoiceButton(
            2,
            colorBendsSettings.scale,
            "Close",
            () =>
              setColorBendsSettings((s) => ({
                ...s,
                scale: 2
              }))
          )}
        </div>
      </div>

      <div className="setting-row">
        <button
          type="button"
          className="reset-btn"
          onClick={() => setColorBendsSettings(DEFAULT_COLORBENDS_SETTINGS)}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );

  const renderDotGridControls = () => (
    <div className="settings-panel">
      <h2 className="settings-title">DotGrid Einstellungen</h2>

      <div className="setting-row">
        <label className="setting-label">Active Color</label>
        <select
          className="setting-select"
          value={dotGridSettings.activeColorPreset}
          onChange={(e) =>
            setDotGridSettings((s) => ({
              ...s,
              activeColorPreset: e.target.value
            }))
          }
        >
          <option value="blue">Blue (#5AB6FF)</option>
          <option value="purple">Purple (#C49BFF)</option>
          <option value="pink">Pink (#FF6AC6)</option>
          <option value="green">Green (#85FFBD)</option>
          <option value="sand">Beige/Sand (#E5D3B3)</option>
          <option value="grey">White/Grey (#EDEDED)</option>
        </select>
      </div>

      <div className="setting-row">
        <label className="setting-label">
          Dot Size
          <span className="setting-value">{dotGridSettings.dotSize}</span>
        </label>
        <input
          type="range"
          min={2}
          max={50}
          value={dotGridSettings.dotSize}
          onChange={(e) =>
            setDotGridSettings((s) => ({
              ...s,
              dotSize: Number(e.target.value)
            }))
          }
        />
      </div>

      <div className="setting-row">
        <label className="setting-label">
          Gap
          <span className="setting-value">{dotGridSettings.gap}</span>
        </label>
        <input
          type="range"
          min={5}
          max={100}
          value={dotGridSettings.gap}
          onChange={(e) =>
            setDotGridSettings((s) => ({
              ...s,
              gap: Number(e.target.value)
            }))
          }
        />
      </div>

      <div className="setting-row">
        <button
          type="button"
          className="reset-btn"
          onClick={() => setDotGridSettings(DEFAULT_DOTGRID_SETTINGS)}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );

  const renderFaultyControls = () => (
    <div className="settings-panel">
      <h2 className="settings-title">FaultyTerminal Einstellungen</h2>

      <div className="setting-row">
        <label className="setting-label">Tint Color</label>
        <select
          className="setting-select"
          value={faultySettings.tintPreset}
          onChange={(e) =>
            setFaultySettings((s) => ({
              ...s,
              tintPreset: e.target.value
            }))
          }
        >
          <option value="standard">Standard (#a7ef9e)</option>
          <option value="blue">Blue (#5AB6FF)</option>
          <option value="purple">Purple (#C49BFF)</option>
          <option value="pink">Pink (#FF6AC6)</option>
          <option value="green">Green (#85FFBD)</option>
          <option value="sand">Beige/Sand (#E5D3B3)</option>
          <option value="grey">White/Grey (#EDEDED)</option>
        </select>
      </div>

      <div className="setting-row">
        <label className="setting-label">
          Scale
          <span className="setting-value">{faultySettings.scale.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={faultySettings.scale}
          onChange={(e) =>
            setFaultySettings((s) => ({
              ...s,
              scale: Number(e.target.value)
            }))
          }
        />
      </div>

      <div className="setting-row">
        <label className="setting-label">
          Digit Size
          <span className="setting-value">
            {faultySettings.digitSize.toFixed(1)}
          </span>
        </label>
        <input
          type="range"
          min={0.5}
          max={3}
          step={0.1}
          value={faultySettings.digitSize}
          onChange={(e) =>
            setFaultySettings((s) => ({
              ...s,
              digitSize: Number(e.target.value)
            }))
          }
        />
      </div>

      <div className="setting-row">
        <label className="setting-label">Speed</label>
        <div className="choice-btn-group">
          {threeChoiceButton(
            0.2,
            faultySettings.speed,
            "Langsam",
            () =>
              setFaultySettings((s) => ({
                ...s,
                speed: 0.2
              }))
          )}
          {threeChoiceButton(
            1,
            faultySettings.speed,
            "Mittel",
            () =>
              setFaultySettings((s) => ({
                ...s,
                speed: 1
              }))
          )}
          {threeChoiceButton(
            2,
            faultySettings.speed,
            "Schnell",
            () =>
              setFaultySettings((s) => ({
                ...s,
                speed: 2
              }))
          )}
        </div>
      </div>

      <div className="setting-row">
        <label className="setting-label">Scanline Intensity</label>
        <div className="choice-btn-group">
          {threeChoiceButton(
            0.5,
            faultySettings.scanlineIntensity,
            "Low",
            () =>
              setFaultySettings((s) => ({
                ...s,
                scanlineIntensity: 0.5
              }))
          )}
          {threeChoiceButton(
            0.9,
            faultySettings.scanlineIntensity,
            "High",
            () =>
              setFaultySettings((s) => ({
                ...s,
                scanlineIntensity: 0.9
              }))
          )}
        </div>
      </div>

      <div className="setting-row">
        <label className="setting-label">Curvature</label>
        <div className="choice-btn-group">
          {threeChoiceButton(
            0.2,
            faultySettings.curvature,
            "Low",
            () =>
              setFaultySettings((s) => ({
                ...s,
                curvature: 0.2
              }))
          )}
          {threeChoiceButton(
            0.7,
            faultySettings.curvature,
            "Mittel",
            () =>
              setFaultySettings((s) => ({
                ...s,
                curvature: 0.7
              }))
          )}
          {threeChoiceButton(
            1.5,
            faultySettings.curvature,
            "High",
            () =>
              setFaultySettings((s) => ({
                ...s,
                curvature: 1.5
              }))
          )}
        </div>
      </div>

      <div className="setting-row">
        <button
          type="button"
          className="reset-btn"
          onClick={() => setFaultySettings(DEFAULT_FAULTY_SETTINGS)}
        >
          Reset to Default
        </button>
      </div>
    </div>
  );

  const renderBallpitControls = () => (
    <div className="settings-panel">
      <h2 className="settings-title">Ballpit Einstellungen</h2>

      <div className="setting-row">
        <label className="setting-label">
          Gravity
          <span className="setting-value">
            {ballpitSettings.gravity.toFixed(2)}
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={ballpitSettings.gravity}
          onChange={(e) =>
            setBallpitSettings((s) => ({
              ...s,
              gravity: Number(e.target.value)
            }))
          }
        />
      </div>

      <div className="setting-row">
        <label className="setting-label">Friction</label>
        <div className="choice-btn-group">
          {threeChoiceButton(
            0.92,
            ballpitSettings.friction,
            "Low",
            () =>
              setBallpitSettings((s) => ({
                ...s,
                friction: 0.92
              }))
          )}
          {threeChoiceButton(
            1,
            ballpitSettings.friction,
            "High",
            () =>
              setBallpitSettings((s) => ({
                ...s,
                friction: 1
              }))
          )}
        </div>
      </div>

      <div className="setting-row">
        <button
          type="button"
          className="reset-btn"
          onClick={() => setBallpitSettings(DEFAULT_BALLPIT_SETTINGS)}
        >
          Reset to Default
        </button>
      </div>
      <label className="setting-label">Farben</label>
  <div style={{ display: "flex", gap: "10px" }}>
    
    <button
      className={
        "preset-btn" +
        (ballpitSettings.colorsPreset === "reactBits" ? " active-btn" : "")
      }
      onClick={() =>
        setBallpitSettings({ ...ballpitSettings, colorsPreset: "reactBits" })
      }
    >
      Default
    </button>

    <button
      className={
        "preset-btn" +
        (ballpitSettings.colorsPreset === "neon" ? " active-btn" : "")
      }
      onClick={() =>
        setBallpitSettings({ ...ballpitSettings, colorsPreset: "neon" })
      }
    >
      Neon
    </button>

    <button
      className={
        "preset-btn" +
        (ballpitSettings.colorsPreset === "pastel" ? " active-btn" : "")
      }
      onClick={() =>
        setBallpitSettings({ ...ballpitSettings, colorsPreset: "pastel" })
      }
    >
      Pastel
    </button>
  </div>
    </div>
  );

  const renderThemedBgControls = () => (
    <div className="settings-panel">
      <h2 className="settings-title">Theme Colors Einstellungen</h2>

      <div className="setting-row">
        <label className="setting-label">Farbschema</label>
        <select
          className="setting-select"
          value={themedBgSettings.theme}
          onChange={(e) =>
            setThemedBgSettings((s) => ({ ...s, theme: e.target.value }))
          }
        >
          <option value="blue">Blau</option>
          <option value="beige">Beige</option>
          <option value="pastel">Pastell</option>
          <option value="red">Rot</option>
          <option value="green">Grün</option>
          <option value="black">Schwarz</option>
        </select>
      </div>

      <div className="setting-row">
        <label className="setting-label">Modus</label>
        <div className="choice-btn-group">
          {threeChoiceButton("dark", themedBgSettings.mode, "Dark", () =>
            setThemedBgSettings((s) => ({ ...s, mode: "dark" }))
          )}
          {threeChoiceButton("light", themedBgSettings.mode, "Light", () =>
            setThemedBgSettings((s) => ({ ...s, mode: "light" }))
          )}
        </div>
      </div>
    </div>
  );

  // ===== Quick Search Matching (Enter -> "Spotlight") =====
  const normalizeSearch = (str) =>
    (str || "").toLowerCase().replace(/\s+/g, "");

  const allQuickLinks = [];
  categories.forEach((cat) => {
    cat.groups.forEach((group) => {
      group.links.forEach((link) => {
        allQuickLinks.push({
          ...link,
          categoryId: cat.id,
          categoryTitle: cat.title,
          groupTitle: group.title,
          _searchKey: normalizeSearch(
            `${link.label} ${link.note || ""} ${cat.title} ${group.title}`
          ),
        });
      });
    });
  });

  const normalizedQuery = normalizeSearch(quickSearchQuery);

  let topQuickMatch = null;

  if (normalizedQuery) {
    const scored = allQuickLinks
      .map((item) => {
        const idx = item._searchKey.indexOf(normalizedQuery);
        return { item, idx };
      })
      .filter(({ idx }) => idx !== -1)
      .sort((a, b) => {
        // 1. früherer Treffer im String gewinnt
        if (a.idx !== b.idx) return a.idx - b.idx;
        // 2. kürzerer Label gewinnt
        return a.item.label.length - b.item.label.length;
      });

    if (scored.length > 0) {
      topQuickMatch = scored[0].item;
    }
  }

  const handleQuickSearchSubmit = () => {
    if (!normalizedQuery || !topQuickMatch) return;

    window.open(topQuickMatch.url, "_blank", "noopener,noreferrer");
    setIsQuickSearchOpen(false);
  };

  

  return (
    <div className="app-root">
      <BackgroundLayer
        activeBg={activeBg}
        activeTab={activeTab} 
        colorBendsSettings={colorBendsSettings}
        dotGridSettings={dotGridSettings}
        faultySettings={faultySettings}
        ballpitSettings={ballpitSettings}
        themedBgSettings={themedBgSettings}

      />

      {isQuickSearchOpen && (
        <div
          className="quick-search-backdrop"
          onClick={() => setIsQuickSearchOpen(false)}
        />
      )}

      <div className="app-content">
        <header className={"top-banner" + (isQuickSearchOpen ? " top-banner-search-active" : "")}>
          <div
            className={
              "header-box" +
              (isQuickSearchOpen ? " header-box-search-active" : "")
            }
          >
            {isQuickSearchOpen ? (
              <div className="quick-search-bar">
                <div className="quick-search-icon">🔍</div>
                <div className="quick-search-input-wrapper">
                  <input
                    ref={quickSearchInputRef}
                    className="quick-search-input"
                    placeholder='Tippe z.B. "chat" und drück Enter'
                    value={quickSearchQuery}
                    onChange={(e) =>
                      setQuickSearchQuery(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleQuickSearchSubmit();
                      } else if (e.key === "Escape") {
                        e.preventDefault();
                        setIsQuickSearchOpen(false);
                      }
                    }}
                  />
                  {normalizedQuery && topQuickMatch && (
                    <div className="quick-search-suggestion">
                      Vorschlag: {topQuickMatch.label}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="nav-left">
                  <div className="nav-logo-placeholder">
                    <img src="/images/Banner.svg" alt="Logo" />
                  </div>
                  <span className="nav-title">Quick Links</span>
                </div>
                <nav className="nav-links">
                  <button
                    className={
                      "nav-link" +
                      (activeTab === "home" ? " nav-link-active" : "")
                    }
                    onClick={() => setActiveTab("home")}
                  >
                    Home
                  </button>
                  <button
                    className={
                      "nav-link" +
                      (activeTab === "backgrounds"
                        ? " nav-link-active"
                        : "")
                    }
                    onClick={() => setActiveTab("backgrounds")}
                  >
                    Background
                  </button>
                </nav>
              </>
            )}
          </div>
        </header>


        <main className="main-area">
          {activeTab === "home" ? (
            <>
              <div className="category-grid">
                {categories.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    isActive={activeCategory === cat.id}
                    onActivate={() => setActiveCategory(cat.id)}
                    onDeactivate={() =>
                      setActiveCategory((cur) =>
                        cur === cat.id ? null : cur
                      )
                    }
                    favorites={favorites}
                    onFavorite={(linkKey) =>
                      setFavorites((prev) => ({
                        ...prev,
                        [linkKey]: !prev[linkKey],
                      }))
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="placeholder-heading">Backgrounds</h1>

              {/* NEUES Layout: Carousel (330px) + Settings (330px) */}
              <div className="backgrounds-page">
                <div className="backgrounds-column">
                    <div
                      className={
                        "backgrounds-carousel-wrapper" +
                        (isCarouselActive ? " backgrounds-carousel-wrapper-active" : "")
                      }
                    >

                    <Carousel
                      baseWidth={330}
                      round={false}
                      autoplay={false}
                      loop={true}
                      items={carouselItems}
                      initialIndex={activeCarouselIndex >= 0 ? activeCarouselIndex : 0}
                      onActiveItemChange={(item) => {
                        if (item && item.id) {
                          setActiveCarouselId(item.id);     // nur Preview updaten
                          setHasPickedBackground(true);
                        }
                      }}
                    />

                  </div>

                  {/* Settings in gleicher Breite (330px), selbe Box-Optik */}
                  <div className="bg-settings-narrow">
                    {activeCarouselId === "colorBends" && renderColorBendsControls()}
                    {activeCarouselId === "dotGrid" && renderDotGridControls()}
                    {activeCarouselId === "faulty" && renderFaultyControls()}
                    {activeCarouselId === "ballpit" && renderBallpitControls()}
                    {activeCarouselId === "themedBg" && renderThemedBgControls()}

                  </div>
                </div>
              </div>

            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
