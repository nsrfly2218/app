// Main Application JavaScript

// Translations Object
const translations = {
  ar: {
    // Main sections
    home: "الرئيسية",
    chats: "المحادثات",
    flows: "التدفقات",
    ai: "الذكاء الاصطناعي",
    orders: "الطلبات",
    customers: "العملاء",
    products: "المنتجات",
    stores: "المتجر",
    library: "المكتبة",
    settings: "الإعدادات",

    // Chats section
    chats: "المحادثات",
    mentions: "الإشارات",
    unattended: "بدون إشراف",
    settingsSection: "الإعدادات",
    librarySection: "المكتبة",
    channels: "قنوات التواصل",
    tags: "الوسوم",
    quickReplies: "الردود السريعة",
    scheduledMessages: "الرسائل المجدولة",
    whatsappTemplates: "قوالب واتساب",
    whatsappCatalog: "كتالوج واتساب",
    whatsappFlows: "تدفقات واتساب",
    emailTemplates: "قوالب البريد الإلكتروني",
    myChats: "محادثاتي",
    unassigned: "غير معين",
    all: "الكل",
  },
  en: {
    // Main sections
    home: "Home",
    chats: "Chats",
    flows: "Flows",
    ai: "AI",
    orders: "Orders",
    customers: "Customers",
    products: "Products",
    stores: "Stores",
    library: "Library",
    settings: "Settings",

    // Chats section
    chats: "Chats",
    mentions: "Mentions",
    unattended: "Unattended",
    settingsSection: "Settings",
    librarySection: "Library",
    channels: "Channels",
    tags: "Tags",
    quickReplies: "Quick Replies",
    scheduledChats: "Scheduled Chats",
    whatsappTemplates: "WhatsApp Templates",
    whatsappCatalog: "WhatsApp Catalog",
    whatsappFlows: "WhatsApp Flows",
    emailTemplates: "Email Templates",
    emailFlows: "Email Flows",
    myChats: "My Chats",
    unassigned: "Unassigned",
    all: "All",
  },
};

// Language Management
const languageManager = {
  init() {
    const savedLang = localStorage.getItem("language") || "ar";
    this.setLanguage(savedLang);
    this.setupEventListeners();
  },

  setLanguage(lang) {
    const html = document.documentElement;
    if (lang === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      document.title = "منصة إدارة المتجر والمحادثات";
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      document.title = "Store & Chats Management Platform";
    }
    localStorage.setItem("language", lang);
    this.updateLanguageMenu(lang);
    this.updateLayout(lang);
    this.updateTexts(lang);
  },

  updateLayout(lang) {
    const sidebarFirst = document.getElementById("sidebar-first");
    const sidebarSecond = document.getElementById("sidebar-second");
    const topbar = document.getElementById("topbar");
    const mainContent = document.getElementById("main-content");
    const languageMenu = document.getElementById("language-menu");
    const chatsSidebar = document.getElementById("chats-sidebar");

    // Remove all position classes
    sidebarFirst.classList.remove("left-0", "right-0", "border-r", "border-l");
    sidebarSecond.classList.remove(
      "left-[60px]",
      "right-[60px]",
      "border-r",
      "border-l"
    );
    topbar.classList.remove(
      "left-[270px]",
      "right-[270px]",
      "left-[60px]",
      "right-[60px]",
      "left-0",
      "right-0"
    );
    mainContent.classList.remove(
      "mr-[270px]",
      "ml-[270px]",
      "mr-[60px]",
      "ml-[60px]"
    );
    if (languageMenu) {
      languageMenu.classList.remove("right-0", "left-0");
    }

    if (lang === "ar") {
      // RTL: Everything on the right
      sidebarFirst.classList.add(
        "right-0",
        "border-l",
        "border-slate-200",
        "dark:border-slate-700"
      );
      sidebarSecond.classList.add(
        "right-[60px]",
        "border-l",
        "border-slate-200",
        "dark:border-slate-700"
      );
      topbar.classList.add("right-[270px]", "left-0");
      mainContent.classList.add("mr-[270px]");
      if (languageMenu) {
        languageMenu.classList.add("right-0");
      }
      // Update chats sidebar border for RTL
      if (chatsSidebar) {
        chatsSidebar.classList.remove("border-r", "border-l");
        chatsSidebar.classList.add(
          "border-l",
          "border-slate-200",
          "dark:border-slate-700"
        );
      }
    } else {
      // LTR: Everything on the left
      sidebarFirst.classList.add(
        "left-0",
        "border-r",
        "border-slate-200",
        "dark:border-slate-700"
      );
      sidebarSecond.classList.add(
        "left-[60px]",
        "border-r",
        "border-slate-200",
        "dark:border-slate-700"
      );
      topbar.classList.add("left-[270px]", "right-0");
      mainContent.classList.add("ml-[270px]");
      if (languageMenu) {
        languageMenu.classList.add("left-0");
      }
      // Update chats sidebar border for LTR
      if (chatsSidebar) {
        chatsSidebar.classList.remove("border-r", "border-l");
        chatsSidebar.classList.add(
          "border-r",
          "border-slate-200",
          "dark:border-slate-700"
        );
      }
    }

    // Update tooltips position
    this.updateTooltips(lang);

    // Update sidebar positions
    sidebarManager.updatePositions();
  },

  updateTooltips(lang) {
    // Only update tooltips in the first sidebar, not topbar tooltips
    const sidebarFirst = document.getElementById("sidebar-first");
    if (!sidebarFirst) return;

    const tooltips = sidebarFirst.querySelectorAll(".tooltip-element");
    tooltips.forEach((tooltip) => {
      const arrow = tooltip.querySelector(".tooltip-arrow");
      if (!arrow) return;

      tooltip.classList.remove(
        "left-full",
        "right-full",
        "ml-4",
        "mr-4",
        "translate-x-[-10px]",
        "translate-x-[10px]"
      );
      arrow.classList.remove(
        "right-full",
        "left-full",
        "border-r-slate-900",
        "border-l-slate-900",
        "dark:border-r-slate-700",
        "dark:border-l-slate-700"
      );

      if (lang === "ar") {
        tooltip.classList.add("right-full", "ml-4", "translate-x-[10px]");
        arrow.classList.add(
          "left-full",
          "border-l-slate-900",
          "dark:border-l-slate-700"
        );
      } else {
        tooltip.classList.add("left-full", "ml-4", "translate-x-[-10px]");
        arrow.classList.add(
          "right-full",
          "border-r-slate-900",
          "dark:border-r-slate-700"
        );
      }
    });
  },

  updateTexts(lang) {
    const t = translations[lang];

    // Update tooltips
    const tooltips = document.querySelectorAll(".tooltip-element");
    tooltips.forEach((tooltip) => {
      const textElement = tooltip.querySelector(".tooltip-text");
      if (textElement) {
        const text =
          lang === "ar"
            ? tooltip.getAttribute("data-text-ar")
            : tooltip.getAttribute("data-text-en");
        textElement.textContent = text;
      }
    });

    // Update toggle button title
    const toggleBtn = document.getElementById("toggle-sidebar-second");
    if (toggleBtn) {
      toggleBtn.title = t.toggleSidebar;
    }

    // Update topbar tooltips
    const topbarTooltips = document.querySelectorAll(
      "#toggle-sidebar-second .tooltip-element, #language-toggle .tooltip-element, #theme-toggle .tooltip-element, #notifications .tooltip-element, #account .tooltip-element"
    );
    topbarTooltips.forEach((tooltip) => {
      const textElement = tooltip.querySelector(".tooltip-text");
      if (textElement) {
        const text =
          lang === "ar"
            ? tooltip.getAttribute("data-text-ar")
            : tooltip.getAttribute("data-text-en");
        textElement.textContent = text;
      }
    });

    // Update page title
    const pageTitle = document.getElementById("page-title");
    if (pageTitle) {
      const titleText = pageTitle.getAttribute(`data-text-${lang}`);
      if (titleText) {
        pageTitle.textContent = titleText;
      }
    }

    // Update sidebar second title
    const sidebarTitle = document.getElementById("sidebar-second-title");
    if (sidebarTitle) {
      const titleText = sidebarTitle.getAttribute(`data-text-${lang}`);
      if (titleText) {
        sidebarTitle.textContent = titleText;
      }
    }

    // Update menu sections
    menuManager.updateMenuTranslations(lang);

    // Update breadcrumb
    this.updateBreadcrumb(lang);

    // Update filters text
    if (typeof updateFiltersText === "function") {
      updateFiltersText();
    }

    // Update tabs text
    if (typeof updateTabsText === "function") {
      updateTabsText();
    }
  },

  updateBreadcrumb(lang, chatId = null) {
    const breadcrumb = document.getElementById("breadcrumb");
    const newChatBtn = document.getElementById("new-chat-btn");
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    if (breadcrumb) {
      const t = translations[lang];
      let breadcrumbItems = [];

      // Map pages to breadcrumb paths
      const breadcrumbMap = {
        "index.html": [t.home],
        "chats.html": [
          t.chats,
          lang === "ar" ? "الكل" : "All",
          lang === "ar" ? "الكل" : "All",
        ],
        "flows.html": [t.flows],
        "ai.html": [t.ai],
        "orders.html": [t.orders],
        "customers.html": [t.customers],
        "products.html": [t.products],
        "stores.html": [t.stores],
        "library.html": [t.library],
        "settings.html": [t.settings],
      };

      breadcrumbItems = breadcrumbMap[currentPage] || [t.home];

      // Add chat ID if provided
      if (chatId !== null) {
        breadcrumbItems.push(chatId.toString());
      }

      // Update breadcrumb HTML
      breadcrumb.innerHTML = breadcrumbItems
        .map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return `
            <span>${item}</span>
            ${
              !isLast
                ? (() => {
                    const isDark = document.documentElement.classList.contains("dark");
                    const arrowColor = isDark ? "#94a3b8" : "#003E5C";
                    return `<i class="hgi-stroke hgi-arrow-right-01 text-xs" style="color: ${arrowColor}"></i>`;
                  })()
                : ""
            }
          `;
        })
        .join("");
    }

    // Show/hide new chat button based on current page
    if (newChatBtn) {
      if (currentPage === "chats.html") {
        newChatBtn.classList.remove("hidden");
      } else {
        newChatBtn.classList.add("hidden");
      }

      // Update new chat button text
      const btnText = newChatBtn.querySelector("span");
      if (btnText) {
        const text =
          lang === "ar"
            ? newChatBtn.getAttribute("data-text-ar")
            : newChatBtn.getAttribute("data-text-en");
        if (text) {
          btnText.textContent = text;
        }
      }
    }
  },

  toggleLanguage() {
    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    const newLang = currentLang === "ar" ? "en" : "ar";
    this.setLanguage(newLang);
  },

  updateLanguageMenu(lang) {
    const langOptions = document.querySelectorAll(".lang-option");
    langOptions.forEach((option) => {
      if (option.dataset.lang === lang) {
        option.classList.add(
          "bg-blue-50",
          "dark:bg-blue-900/20",
          "text-blue-600",
          "dark:text-blue-400"
        );
        option.classList.remove("text-slate-900", "dark:text-slate-100");
      } else {
        option.classList.remove(
          "bg-blue-50",
          "dark:bg-blue-900/20",
          "text-blue-600",
          "dark:text-blue-400"
        );
        option.classList.add("text-slate-900", "dark:text-slate-100");
      }
    });
  },

  setupEventListeners() {
    const langToggle = document.getElementById("language-toggle");
    const langMenu = document.getElementById("language-menu");
    const langOptions = document.querySelectorAll(".lang-option");

    if (langToggle && langMenu) {
      langToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = langMenu.classList.contains("opacity-0");
        if (isVisible) {
          langMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          langMenu.classList.add("opacity-100", "visible", "translate-y-0");
        } else {
          langMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          langMenu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      });

      langOptions.forEach((option) => {
        option.addEventListener("click", () => {
          const lang = option.dataset.lang;
          this.setLanguage(lang);
          langMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          langMenu.classList.remove("opacity-100", "visible", "translate-y-0");
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
          langMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          langMenu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      });
    }

    // Setup Apps Menu
    const appsBtn = document.getElementById("apps");
    const appsMenu = document.getElementById("apps-menu");
    if (appsBtn && appsMenu) {
      appsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = appsMenu.classList.contains("opacity-0");
        if (isVisible) {
          appsMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          appsMenu.classList.add("opacity-100", "visible", "translate-y-0");
        } else {
          appsMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          appsMenu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!appsBtn.contains(e.target) && !appsMenu.contains(e.target)) {
          appsMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          appsMenu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      });

      // Update apps menu position based on direction (RTL/LTR)
      const updateAppsMenuPosition = () => {
        const isRTL = document.documentElement.getAttribute("dir") === "rtl";
        appsMenu.classList.remove("left-0", "right-0");
        if (isRTL) {
          appsMenu.classList.add("right-0");
        } else {
          appsMenu.classList.add("left-0");
        }
      };

      // Update position on load
      updateAppsMenuPosition();

      // Update apps menu translations and position on language/direction change
      const observer = new MutationObserver(() => {
        updateAppsMenuTranslations();
        updateAppsMenuPosition();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang", "dir"],
      });
    }
  },
};

// Theme Management
const themeManager = {
  init() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme);
    // Update colors after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.updateThemeColors(savedTheme);
    }, 100);
  },

  setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    this.updateThemeIcon(theme);
    this.updateThemeColors(theme);
  },

  updateThemeColors(theme) {
    const isDark = theme === "dark";
    // Color mappings: light mode color -> dark mode color
    const colorMap = {
      "#003E5C": isDark ? "#94a3b8" : "#003E5C", // Dark blue -> Light gray in dark mode
      "#003e5c": isDark ? "#94a3b8" : "#003e5c",
    };

    // Update all elements with inline color styles
    const elementsWithColor = document.querySelectorAll("[style*='color: #003E5C'], [style*='color: #003e5c']");
    elementsWithColor.forEach((el) => {
      const style = el.getAttribute("style") || "";
      if (style.includes("color: #003E5C") || style.includes("color: #003e5c")) {
        const newColor = isDark ? "#94a3b8" : "#003E5C";
        el.setAttribute("style", style.replace(/color:\s*#003[Ee]5[Cc]/g, `color: ${newColor}`));
      }
    });

    // Update sidebar first items icons (non-active)
    const sidebarFirstItems = document.querySelectorAll(".sidebar-first-item:not([style*='background-color: #0090D6'])");
    sidebarFirstItems.forEach((item) => {
      const icon = item.querySelector("i");
      if (icon && icon.style.color === "#003e5c" || icon.style.color === "#003E5C") {
        icon.style.color = isDark ? "#94a3b8" : "#003E5C";
      }
    });

    // Update sidebar second items (non-active)
    const sidebarSecondItems = document.querySelectorAll(".sidebar-second-item:not([style*='background-color: #0090D6']), .sidebar-second-submenu-item:not([style*='background-color: #0090D6'])");
    sidebarSecondItems.forEach((item) => {
      const icon = item.querySelector("i");
      const text = item.querySelector(".sidebar-second-item-text");
      if (icon && (icon.style.color === "#003E5C" || icon.style.color === "#003e5c")) {
        icon.style.color = isDark ? "#94a3b8" : "#003E5C";
      }
      if (text && (text.style.color === "#003E5C" || text.style.color === "#003e5c")) {
        text.style.color = isDark ? "#94a3b8" : "#003E5C";
      }
    });

    // Update topbar icons
    const topbarIcons = document.querySelectorAll("#topbar i[style*='color: #003E5C'], #topbar i[style*='color: #003e5c']");
    topbarIcons.forEach((icon) => {
      const style = icon.getAttribute("style") || "";
      if (style.includes("color: #003E5C") || style.includes("color: #003e5c")) {
        const newColor = isDark ? "#94a3b8" : "#003E5C";
        icon.setAttribute("style", style.replace(/color:\s*#003[Ee]5[Cc]/g, `color: ${newColor}`));
      }
    });

    // Update apps menu icons
    const appsMenuIcons = document.querySelectorAll("#apps-menu i[style*='color: #0090D6']");
    appsMenuIcons.forEach((icon) => {
      // Keep #0090D6 for apps menu icons as it's the brand color
      // But we can adjust if needed
    });
  },

  toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    this.setTheme(newTheme);
  },

  updateThemeIcon(theme) {
    const themeIcon = document.getElementById("theme-icon");
    const themeToggle = document.getElementById("theme-toggle");
    const tooltip = themeToggle?.querySelector(".tooltip-element");
    const tooltipText = tooltip?.querySelector(".tooltip-text");

    if (themeIcon) {
      const iconColor = theme === "dark" ? "#94a3b8" : "#003E5C";
      if (theme === "dark") {
        themeIcon.innerHTML = `<i class="hgi-stroke hgi-sun-01 text-[24px]" style="color: ${iconColor}"></i>`;
        if (tooltipText) {
          const currentLang =
            document.documentElement.getAttribute("lang") || "ar";
          tooltipText.textContent =
            currentLang === "ar" ? "الوضع النهاري" : "Light Mode";
          if (tooltip) {
            tooltip.setAttribute("data-text-ar", "الوضع النهاري");
            tooltip.setAttribute("data-text-en", "Light Mode");
          }
        }
      } else {
        themeIcon.innerHTML = `<i class="hgi-stroke hgi-moon-02 text-[24px]" style="color: ${iconColor}"></i>`;
        if (tooltipText) {
          const currentLang =
            document.documentElement.getAttribute("lang") || "ar";
          tooltipText.textContent =
            currentLang === "ar" ? "الوضع الليلي" : "Dark Mode";
          if (tooltip) {
            tooltip.setAttribute("data-text-ar", "الوضع الليلي");
            tooltip.setAttribute("data-text-en", "Dark Mode");
          }
        }
      }
    }
  },
};

// Sidebar Management
const sidebarManager = {
  init() {
    const savedState = localStorage.getItem("sidebar-second-visible");
    this.updatePositions();
    if (savedState === "false") {
      this.hideSidebarSecond();
    }
    this.setupEventListeners();
  },

  setupEventListeners() {
    const toggleBtn = document.getElementById("toggle-sidebar-second");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleSidebarSecond());
    }
  },

  toggleSidebarSecond() {
    const sidebarSecond = document.getElementById("sidebar-second");
    const isHidden = sidebarSecond.classList.contains("opacity-0");

    if (isHidden) {
      this.showSidebarSecond();
    } else {
      this.hideSidebarSecond();
    }
  },

  showSidebarSecond() {
    const sidebarSecond = document.getElementById("sidebar-second");
    const topbar = document.getElementById("topbar");
    const mainContent = document.getElementById("main-content");
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";

    // Remove hide classes
    sidebarSecond.classList.remove(
      "opacity-0",
      "pointer-events-none",
      "hidden"
    );

    // Add show classes
    sidebarSecond.classList.add("opacity-100", "pointer-events-auto");

    // Update topbar and main content positions
    topbar.classList.remove(
      "right-[60px]",
      "left-[60px]",
      "right-[270px]",
      "left-[270px]"
    );
    mainContent.classList.remove(
      "mr-[60px]",
      "ml-[60px]",
      "mr-[270px]",
      "ml-[270px]"
    );

    if (isRTL) {
      topbar.classList.add("right-[270px]", "left-0");
      mainContent.classList.add("mr-[270px]");
    } else {
      topbar.classList.add("left-[270px]", "right-0");
      mainContent.classList.add("ml-[270px]");
    }

    localStorage.setItem("sidebar-second-visible", "true");
  },

  hideSidebarSecond() {
    const sidebarSecond = document.getElementById("sidebar-second");
    const topbar = document.getElementById("topbar");
    const mainContent = document.getElementById("main-content");
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";

    // Remove show classes
    sidebarSecond.classList.remove("opacity-100", "pointer-events-auto");

    // Add hide classes - فقط opacity و pointer-events بدون translate
    sidebarSecond.classList.add("opacity-0", "pointer-events-none", "hidden");

    // Update topbar and main content positions
    topbar.classList.remove(
      "right-[270px]",
      "left-[270px]",
      "right-[60px]",
      "left-[60px]",
      "left-0",
      "right-0"
    );
    mainContent.classList.remove(
      "mr-[270px]",
      "ml-[270px]",
      "mr-[60px]",
      "ml-[60px]"
    );

    if (isRTL) {
      topbar.classList.add("right-[60px]", "left-0");
      mainContent.classList.add("mr-[60px]");
    } else {
      topbar.classList.add("left-[60px]", "right-0");
      mainContent.classList.add("ml-[60px]");
    }

    localStorage.setItem("sidebar-second-visible", "false");
  },

  updatePositions() {
    const savedState = localStorage.getItem("sidebar-second-visible");
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    const sidebarFirst = document.getElementById("sidebar-first");
    const sidebarSecond = document.getElementById("sidebar-second");
    const topbar = document.getElementById("topbar");
    const mainContent = document.getElementById("main-content");

    // Update sidebar first position
    sidebarFirst.classList.remove("left-0", "right-0", "border-r", "border-l");
    if (isRTL) {
      sidebarFirst.classList.add(
        "right-0",
        "border-l",
        "border-slate-200",
        "dark:border-slate-700"
      );
    } else {
      sidebarFirst.classList.add(
        "left-0",
        "border-r",
        "border-slate-200",
        "dark:border-slate-700"
      );
    }

    // Update sidebar second position
    sidebarSecond.classList.remove(
      "left-[60px]",
      "right-[60px]",
      "border-r",
      "border-l",
      "opacity-0",
      "opacity-100",
      "pointer-events-none",
      "pointer-events-auto",
      "hidden"
    );
    if (isRTL) {
      sidebarSecond.classList.add(
        "right-[60px]",
        "border-l",
        "border-slate-200",
        "dark:border-slate-700"
      );
    } else {
      sidebarSecond.classList.add(
        "left-[60px]",
        "border-r",
        "border-slate-200",
        "dark:border-slate-700"
      );
    }

    if (savedState === "false") {
      this.hideSidebarSecond();
    } else {
      this.showSidebarSecond();
    }
  },
};

// Menu Management
const menuManager = {
  init() {
    // تهيئة القائمة الأولى (من ملف منفصل)
    if (window.firstSidebarManager) {
      window.firstSidebarManager.init();
    }
    
    // تهيئة القائمة الثانية
    this.setupSecondSidebar();
  },

  setupSecondSidebar() {
    const secondSidebarItems = document.querySelectorAll(
      ".sidebar-second-item.has-submenu"
    );
    secondSidebarItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const arrow = item.querySelector(".sidebar-second-item-arrow");
        const submenu = item.querySelector(".sidebar-second-submenu");

        if (item.classList.contains("open")) {
          item.classList.remove("open");
          if (arrow) arrow.classList.remove("rotate-90");
          if (submenu) {
            submenu.classList.add("max-h-0");
            submenu.classList.remove("max-h-[500px]");
          }
        } else {
          item.classList.add("open");
          if (arrow) arrow.classList.add("rotate-90");
          if (submenu) {
            submenu.classList.remove("max-h-0");
            submenu.classList.add("max-h-[500px]");
          }
        }
      });
    });

    const submenuItems = document.querySelectorAll(
      ".sidebar-second-submenu-item"
    );
    submenuItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove active from all items
        document
          .querySelectorAll(
            ".sidebar-second-item, .sidebar-second-submenu-item"
          )
          .forEach((i) => {
            i.classList.remove("text-white");
            i.style.backgroundColor = "";
            // Reset icon and text colors
            const isDark = document.documentElement.classList.contains("dark");
            const resetColor = isDark ? "#94a3b8" : "#003E5C";
            const icon = i.querySelector("i");
            const text = i.querySelector(".sidebar-second-item-text");
            if (icon) icon.style.color = resetColor;
            if (text) text.style.color = resetColor;
          });
        // Add active to clicked item
        item.classList.add("text-white");
        item.style.backgroundColor = "#0090D6";
        // Update icon and text colors to white
        const icon = item.querySelector("i");
        const text = item.querySelector(".sidebar-second-item-text");
        if (icon) icon.style.color = "#ffffff";
        if (text) text.style.color = "#ffffff";

        // Update page title
        const pageTitle = item.textContent.trim();
        this.updatePageTitle(pageTitle);
      });
    });

    // Also handle items without submenu
    const secondSidebarItemsNoSubmenu = document.querySelectorAll(
      ".sidebar-second-item:not(.has-submenu)"
    );
    secondSidebarItemsNoSubmenu.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove active from all items
        document
          .querySelectorAll(
            ".sidebar-second-item, .sidebar-second-submenu-item"
          )
          .forEach((i) => {
            i.classList.remove("text-white");
            i.style.backgroundColor = "";
            // Reset icon and text colors
            const isDark = document.documentElement.classList.contains("dark");
            const resetColor = isDark ? "#94a3b8" : "#003E5C";
            const icon = i.querySelector("i");
            const text = i.querySelector(".sidebar-second-item-text");
            if (icon) icon.style.color = resetColor;
            if (text) text.style.color = resetColor;
          });
        // Add active to clicked item
        item.classList.add("text-white");
        item.style.backgroundColor = "#0090D6";
        // Update icon and text colors to white
        const icon = item.querySelector("i");
        const text = item.querySelector(".sidebar-second-item-text");
        if (icon) icon.style.color = "#ffffff";
        if (text) text.style.color = "#ffffff";

        // Update page title
        const pageTitle =
          item.querySelector(".sidebar-second-item-text")?.textContent.trim() ||
          "";
        this.updatePageTitle(pageTitle);
      });
    });
  },

  updateSecondSidebar(sectionIndex) {
    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    const sections = this.getMenuSections(currentLang);
    const currentSection = sections[sectionIndex];

    if (!currentSection) return;

    // Use requestAnimationFrame to batch DOM updates and prevent flickering
    requestAnimationFrame(() => {
      // Update sidebar title
      const sidebarTitle = document.getElementById("sidebar-second-title");
      if (sidebarTitle) {
        sidebarTitle.textContent = currentSection.title;
      }

      // Update menu items using HTML templates
      const sidebarMenu = document.getElementById("sidebar-second-menu");
      if (sidebarMenu) {
        // Clear existing content
        sidebarMenu.innerHTML = "";
        
        let isFirstItem = true;
        const isDark = document.documentElement.classList.contains("dark");
        const iconColor = isDark ? "#94a3b8" : "#003E5C";
        
        currentSection.items.forEach((item) => {
          if (item.type === "sectionTitle") {
            // Use template for section title
            const template = document.getElementById("template-sidebar-second-section-title");
            if (template) {
              const clone = template.content.cloneNode(true);
              const sectionDiv = clone.querySelector("div");
              if (sectionDiv) {
                if (!isFirstItem) {
                  sectionDiv.classList.add("mt-2");
                }
                const h3 = sectionDiv.querySelector("h3");
                if (h3) {
                  h3.textContent = item.name;
                }
                sidebarMenu.appendChild(clone);
              }
            }
            isFirstItem = false;
          } else if (item.submenu && item.submenu.length > 0) {
            // Use template for item with submenu
            const template = document.getElementById("template-sidebar-second-item-with-submenu");
            if (template) {
              const clone = template.content.cloneNode(true);
              const itemDiv = clone.querySelector("div");
              if (itemDiv) {
                const link = itemDiv.querySelector("a");
                if (link && item.href) {
                  link.href = item.href;
                }
                const icon = itemDiv.querySelector(".sidebar-second-item-icon");
                if (icon) {
                  icon.className = `${item.iconClass} text-[16px] me-2 flex-shrink-0`;
                  icon.style.color = iconColor;
                }
                const text = itemDiv.querySelector(".sidebar-second-item-text");
                if (text) {
                  text.textContent = item.name;
                  text.style.color = iconColor;
                }
                const arrow = itemDiv.querySelector(".sidebar-second-item-arrow");
                if (arrow) {
                  arrow.style.color = iconColor;
                }
                const submenu = itemDiv.querySelector(".sidebar-second-submenu");
                if (submenu) {
                  item.submenu.forEach((subItem) => {
                    const subLink = document.createElement("a");
                    if (subItem.href) {
                      subLink.href = subItem.href;
                    }
                    subLink.className = "sidebar-second-submenu-item flex items-center px-2 py-1 pe-6 rounded-lg cursor-pointer mb-0.5 transition-colors duration-150 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 text-sm no-underline";
                    subLink.textContent = subItem.name;
                    submenu.appendChild(subLink);
                  });
                }
                sidebarMenu.appendChild(clone);
              }
            }
            isFirstItem = false;
          } else {
            // Use template for regular item
            const template = document.getElementById("template-sidebar-second-item");
            if (template) {
              const clone = template.content.cloneNode(true);
              const itemLink = clone.querySelector("a");
              if (itemLink) {
                if (item.href) {
                  itemLink.href = item.href;
                }
                const icon = itemLink.querySelector(".sidebar-second-item-icon");
                if (icon) {
                  icon.className = `${item.iconClass} text-[16px] me-2 flex-shrink-0`;
                  icon.style.color = iconColor;
                }
                const text = itemLink.querySelector(".sidebar-second-item-text");
                if (text) {
                  text.textContent = item.name;
                  text.style.color = iconColor;
                }
                sidebarMenu.appendChild(clone);
              }
            }
            isFirstItem = false;
          }
        });

        // Re-setup event listeners for new items after DOM update
        requestAnimationFrame(() => {
          this.setupSecondSidebar();
          // Set active item in second sidebar based on current page
          this.setActiveSecondSidebarItem();
        });
      }
    });
  },

  setActiveSecondSidebarItem() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    // Remove active from all items in second sidebar
    const allSecondSidebarItems = document.querySelectorAll(
      ".sidebar-second-item, .sidebar-second-submenu-item"
    );
    allSecondSidebarItems.forEach((item) => {
      item.classList.remove("text-white");
      item.style.backgroundColor = "";
      // Reset icon and text colors
      const isDark = document.documentElement.classList.contains("dark");
      const resetColor = isDark ? "#94a3b8" : "#003E5C";
      const icon = item.querySelector("i");
      const text = item.querySelector(".sidebar-second-item-text");
      if (icon) icon.style.color = resetColor;
      if (text) text.style.color = resetColor;
    });

    // Find all links in second sidebar and check their href
    const allLinks = document.querySelectorAll("#sidebar-second-menu a[href]");
    allLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href === currentPage) {
        // Find the parent item element (either the link itself or its parent)
        const item =
          link.classList.contains("sidebar-second-item") ||
          link.classList.contains("sidebar-second-submenu-item")
            ? link
            : link.closest(
                ".sidebar-second-item, .sidebar-second-submenu-item"
              );

        if (item) {
          item.classList.add("text-white");
          item.style.backgroundColor = "#0090D6";
          // Update icon and text colors to white
          const icon = item.querySelector("i");
          const text = item.querySelector(".sidebar-second-item-text");
          if (icon) icon.style.color = "#ffffff";
          if (text) text.style.color = "#ffffff";
        }
      }
    });
  },

  // Helper function to generate file path from item name
  getItemPath(itemName, lang = "ar") {
    // Create a mapping for special cases
    const pathMap = {
      ar: {
        المحادثات: "chats",
        الإشارات: "mentions",
        "بدون إشراف": "unattended",
        "قنوات التواصل": "channels",
        الوسوم: "tags",
        "الردود السريعة": "quick-replies",
        "الرسائل المجدولة": "scheduled-messages",
        "قوالب واتساب": "whatsapp-templates",
        "كتالوج واتساب": "whatsapp-catalog",
        "تدفقات واتساب": "whatsapp-flows",
        "قوالب البريد الإلكتروني": "email-templates",
      },
      en: {
        Chats: "chats",
        Mentions: "mentions",
        Unattended: "unattended",
        Channels: "channels",
        Tags: "tags",
        "Quick Replies": "quick-replies",
        "Scheduled Messages": "scheduled-messages",
        "WhatsApp Templates": "whatsapp-templates",
        "WhatsApp Catalog": "whatsapp-catalog",
        "WhatsApp Flows": "whatsapp-flows",
        "Email Templates": "email-templates",
      },
    };
    return (
      pathMap[lang]?.[itemName] || itemName.toLowerCase().replace(/\s+/g, "-")
    );
  },

  // Get the section page href (delegated to firstSidebarManager)
  getSectionPageHref(sectionIndex, lang = "ar") {
    if (window.firstSidebarManager) {
      return window.firstSidebarManager.getSectionPageHref(sectionIndex, lang);
    }
    return null;
  },

  // Get the first item href for a section
  getFirstItemHref(sectionIndex, lang = "ar") {
    const sections = this.getMenuSections(lang);
    const section = sections[sectionIndex];
    if (!section || !section.items || section.items.length === 0) {
      return null;
    }
    // Find first non-sectionTitle item
    const firstItem = section.items.find(
      (item) => item.type !== "sectionTitle" && item.href
    );
    return firstItem ? firstItem.href : null;
  },

  getMenuSections(lang = "ar") {
    const t = translations[lang];
    return [
      {
        title: t.home,
        items: [],
      },
      {
        title: t.chats,
        items: [
          {
            name: t.chats,
            iconClass: "hgi-stroke hgi-bubble-chat",
            href: "chats.html",
          },
          {
            type: "sectionTitle",
            name: t.settingsSection,
          },
          {
            name: t.channels,
            iconClass: "hgi-stroke hgi-inbox",
            href: "channels.html",
          },
          {
            name: t.tags,
            iconClass: "hgi-stroke hgi-tags",
            href: "tags.html",
          },
          {
            name: t.quickReplies,
            iconClass: "hgi-stroke hgi-flash",
            href: "quick-replies.html",
          },
          {
            type: "sectionTitle",
            name: t.librarySection,
          },
          {
            name: t.scheduledMessages,
            iconClass: "hgi-stroke hgi-time-schedule",
            href: "scheduled-messages.html",
          },
          {
            name: t.whatsappTemplates,
            iconClass: "hgi-stroke hgi-whatsapp",
            href: "whatsapp-templates.html",
          },
          {
            name: t.whatsappCatalog,
            iconClass: "hgi-stroke hgi-whatsapp",
            href: "whatsapp-catalog.html",
          },
          {
            name: t.whatsappFlows,
            iconClass: "hgi-stroke hgi-whatsapp",
            href: "whatsapp-flows.html",
          },
          {
            name: t.emailTemplates,
            iconClass: "hgi-stroke hgi-mail-01",
            href: "email-templates.html",
          },
        ],
      },
      {
        title: t.flows,
        items: [],
      },
      {
        title: t.ai,
        items: [],
      },
      {
        title: t.orders,
        items: [],
      },
      {
        title: t.customers,
        items: [],
      },
      {
        title: t.products,
        items: [],
      },
      {
        title: t.stores,
        items: [],
      },
      {
        title: t.library,
        items: [],
      },
      {
        title: t.settings,
        items: [],
      },
    ];
  },

  updatePageTitle(title) {
    const pageTitle = document.getElementById("page-title");
    if (pageTitle) {
      pageTitle.textContent = title;
    }
  },

  updateMenuTranslations(lang) {
    const currentSectionIndex = this.getCurrentSectionIndex();
    if (currentSectionIndex !== null) {
      this.updateSecondSidebar(currentSectionIndex);
    }
  },

  getCurrentSectionIndex() {
    if (window.firstSidebarManager) {
      return window.firstSidebarManager.getCurrentSectionIndex();
    }
    return 0;
  },
};

// جعل menuManager متاحاً عالمياً للوصول من ملفات أخرى
window.menuManager = menuManager;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Set fixed dimensions
  const sidebarFirst = document.getElementById("sidebar-first");
  const sidebarSecond = document.getElementById("sidebar-second");
  const topbar = document.getElementById("topbar");

  if (sidebarFirst) {
    sidebarFirst.style.width = "60px";
  }
  if (sidebarSecond) {
    sidebarSecond.style.width = "210px";
  }
  if (topbar) {
    topbar.style.height = "60px";
  }

  // Initialize managers
  languageManager.init();
  themeManager.init();
  sidebarManager.init();

  // Clear any default active state from HTML before setting up menus
  if (window.firstSidebarManager) {
    window.firstSidebarManager.resetActiveState();
  }

  // Initialize menu manager (this will set the correct active state)
  menuManager.init();
  setupTopbarTooltips();

  // Update breadcrumb on page load
  const currentLang = document.documentElement.getAttribute("lang") || "ar";
  languageManager.updateBreadcrumb(currentLang);

  // Setup filters bar
  setupFiltersBar();

  // Setup tabs
  setupChatsTabs();

  // Setup messages/orders main tabs
  setupMessagesMainTabs();

  // Setup expand/collapse chats sidebar
  setupExpandChats();

  // Setup theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => themeManager.toggleTheme());
  }

  // Initialize apps menu translations
  updateAppsMenuTranslations();
});

// Setup tooltips for topbar icons
function setupTopbarTooltips() {
  const topbarButtons = document.querySelectorAll(
    "#toggle-sidebar-second, #apps, #help-center, #search, #language-toggle, #theme-toggle, #notifications, #account"
  );

  topbarButtons.forEach((button) => {
    const tooltip = button.querySelector(".tooltip-element");
    if (!tooltip) return;

    button.addEventListener("mouseenter", () => {
      tooltip.classList.remove("opacity-0");
      tooltip.classList.add("opacity-100");

      // Update tooltip text based on language
      const currentLang = document.documentElement.getAttribute("lang");
      const tooltipText = tooltip.querySelector(".tooltip-text");
      if (tooltipText && tooltip.dataset.textAr && tooltip.dataset.textEn) {
        tooltipText.textContent =
          currentLang === "ar"
            ? tooltip.dataset.textAr
            : tooltip.dataset.textEn;
      }
    });

    button.addEventListener("mouseleave", () => {
      tooltip.classList.remove("opacity-100");
      tooltip.classList.add("opacity-0");
    });
  });
}

// Setup filters bar
function setupFiltersBar() {
  const channelsDropdownBtn = document.getElementById("channels-dropdown-btn");
  const channelsDropdownMenu = document.getElementById(
    "channels-dropdown-menu"
  );
  const statusDropdownBtn = document.getElementById("status-dropdown-btn");
  const statusDropdownMenu = document.getElementById("status-dropdown-menu");
  const searchInput = document.getElementById("search-input");
  const filterBtn = document.getElementById("filter-btn");

  // Channels dropdown
  if (channelsDropdownBtn && channelsDropdownMenu) {
    channelsDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = !channelsDropdownMenu.classList.contains("opacity-0");

      // Close status dropdown if open
      if (
        statusDropdownMenu &&
        !statusDropdownMenu.classList.contains("opacity-0")
      ) {
        statusDropdownMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
        statusDropdownMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      }

      if (isVisible) {
        channelsDropdownMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
        channelsDropdownMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      } else {
        channelsDropdownMenu.classList.remove(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
        channelsDropdownMenu.classList.add(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      }
    });
  }

  // Status dropdown
  if (statusDropdownBtn && statusDropdownMenu) {
    statusDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = !statusDropdownMenu.classList.contains("opacity-0");

      // Close channels dropdown if open
      if (
        channelsDropdownMenu &&
        !channelsDropdownMenu.classList.contains("opacity-0")
      ) {
        channelsDropdownMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
        channelsDropdownMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      }

      if (isVisible) {
        statusDropdownMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
        statusDropdownMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      } else {
        statusDropdownMenu.classList.remove(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
        statusDropdownMenu.classList.add(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (
      channelsDropdownMenu &&
      !channelsDropdownBtn.contains(e.target) &&
      !channelsDropdownMenu.contains(e.target)
    ) {
      channelsDropdownMenu.classList.add(
        "opacity-0",
        "invisible",
        "translate-y-[-10px]"
      );
      channelsDropdownMenu.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0"
      );
    }
    if (
      statusDropdownMenu &&
      !statusDropdownBtn.contains(e.target) &&
      !statusDropdownMenu.contains(e.target)
    ) {
      statusDropdownMenu.classList.add(
        "opacity-0",
        "invisible",
        "translate-y-[-10px]"
      );
      statusDropdownMenu.classList.remove(
        "opacity-100",
        "visible",
        "translate-y-0"
      );
    }
  });

  // Prevent dropdown from closing when clicking inside
  if (channelsDropdownMenu) {
    channelsDropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
  if (statusDropdownMenu) {
    statusDropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Update selected channels count
  if (channelsDropdownMenu) {
    const channelCheckboxes =
      channelsDropdownMenu.querySelectorAll(".channels-checkbox");
    channelCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateChannelsDropdownText();
      });
    });
  }

  // Update selected status count
  if (statusDropdownMenu) {
    const statusCheckboxes =
      statusDropdownMenu.querySelectorAll(".status-checkbox");
    statusCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateStatusDropdownText();
      });
    });
  }

  // Filter button
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const searchValue = searchInput ? searchInput.value : "";
      const selectedChannels = getSelectedChannels();
      const selectedStatuses = getSelectedStatuses();

      // Apply filters (you can add your filter logic here)
      console.log("Search:", searchValue);
      console.log("Channels:", selectedChannels);
      console.log("Statuses:", selectedStatuses);

      // TODO: Implement actual filtering logic
    });
  }

  // Update filter texts on language change
  updateFiltersText();
}

function updateChannelsDropdownText() {
  const channelsDropdownText = document.getElementById(
    "channels-dropdown-text"
  );
  const channelCheckboxes = document.querySelectorAll(
    ".channels-checkbox:checked"
  );
  const currentLang = document.documentElement.getAttribute("lang") || "ar";

  if (channelsDropdownText) {
    if (channelCheckboxes.length === 0) {
      channelsDropdownText.textContent =
        currentLang === "ar" ? "القنوات" : "Channels";
    } else {
      channelsDropdownText.textContent = `${channelCheckboxes.length} ${
        currentLang === "ar" ? "محدد" : "selected"
      }`;
    }
  }
}

function updateStatusDropdownText() {
  const statusDropdownText = document.getElementById("status-dropdown-text");
  const statusCheckboxes = document.querySelectorAll(
    ".status-checkbox:checked"
  );
  const currentLang = document.documentElement.getAttribute("lang") || "ar";

  if (statusDropdownText) {
    if (statusCheckboxes.length === 0) {
      statusDropdownText.textContent =
        currentLang === "ar" ? "الحالة" : "Status";
    } else {
      statusDropdownText.textContent = `${statusCheckboxes.length} ${
        currentLang === "ar" ? "محدد" : "selected"
      }`;
    }
  }
}

function getSelectedChannels() {
  const channelCheckboxes = document.querySelectorAll(
    ".channels-checkbox:checked"
  );
  return Array.from(channelCheckboxes).map((cb) => cb.value);
}

function getSelectedStatuses() {
  const statusCheckboxes = document.querySelectorAll(
    ".status-checkbox:checked"
  );
  return Array.from(statusCheckboxes).map((cb) => cb.value);
}

function updateFiltersText() {
  const currentLang = document.documentElement.getAttribute("lang") || "ar";
  const searchInput = document.getElementById("search-input");
  const channelsDropdownText = document.getElementById(
    "channels-dropdown-text"
  );
  const statusDropdownText = document.getElementById("status-dropdown-text");
  const filterBtn = document.getElementById("filter-btn");
  const statusLabels = document.querySelectorAll(
    "#status-dropdown-menu .status-checkbox + span"
  );

  // Update search placeholder
  if (searchInput) {
    const placeholder =
      currentLang === "ar"
        ? searchInput.getAttribute("data-placeholder-ar")
        : searchInput.getAttribute("data-placeholder-en");
    if (placeholder) {
      searchInput.placeholder = placeholder;
    }
  }

  // Update dropdown texts
  if (channelsDropdownText) {
    const text =
      currentLang === "ar"
        ? channelsDropdownText.getAttribute("data-text-ar")
        : channelsDropdownText.getAttribute("data-text-en");
    if (
      text &&
      document.querySelectorAll(".channels-checkbox:checked").length === 0
    ) {
      channelsDropdownText.textContent = text;
    }
  }

  if (statusDropdownText) {
    const text =
      currentLang === "ar"
        ? statusDropdownText.getAttribute("data-text-ar")
        : statusDropdownText.getAttribute("data-text-en");
    if (
      text &&
      document.querySelectorAll(".status-checkbox:checked").length === 0
    ) {
      statusDropdownText.textContent = text;
    } else if (
      document.querySelectorAll(".status-checkbox:checked").length === 0
    ) {
      statusDropdownText.textContent =
        currentLang === "ar" ? "الحالة" : "Status";
    }
  }

  // Update filter button
  if (filterBtn) {
    const btnText = filterBtn.querySelector("span");
    if (btnText) {
      const text =
        currentLang === "ar"
          ? filterBtn.getAttribute("data-text-ar")
          : filterBtn.getAttribute("data-text-en");
      if (text) {
        btnText.textContent = text;
      }
    }
  }

  // Update status labels
  statusLabels.forEach((label) => {
    const text =
      currentLang === "ar"
        ? label.getAttribute("data-text-ar")
        : label.getAttribute("data-text-en");
    if (text) {
      label.textContent = text;
    }
  });
}

// Setup chats tabs
function setupChatsTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      const isDarkMode = document.documentElement.classList.contains("dark");

      // Remove active class from all tabs
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.remove("text-slate-700", "dark:text-slate-300");
        btn.classList.add("text-slate-500", "dark:text-slate-400");
        btn.style.borderBottomColor = "transparent";
        btn.style.color = "";
        btn.style.backgroundColor = "";
        btn.style.borderBottomWidth = "2px";

        // Update count badge style
        const countBadge = btn.querySelector("span[id$='-count']");
        if (countBadge) {
          countBadge.classList.remove(
            "bg-blue-100",
            "dark:bg-blue-900/30",
            "text-blue-600",
            "dark:text-blue-400"
          );
          countBadge.classList.add(
            "bg-slate-100",
            "dark:bg-slate-700",
            "text-slate-600",
            "dark:text-slate-400"
          );
          countBadge.style.backgroundColor = "";
          countBadge.style.color = "";
        }
      });

      // Add active class to clicked tab
      button.classList.add("active");
      button.classList.remove("text-slate-500", "dark:text-slate-400");
      button.classList.add("text-slate-700", "dark:text-slate-300");
      button.style.borderBottomColor = "#0090D6";
      button.style.color = "#0090D6";
      button.style.borderBottomWidth = "2px";
      button.style.backgroundColor = isDarkMode ? "#1e293b" : "#ffffff";
      button.style.minHeight = "36px";

      // Update count badge style
      const countBadge = button.querySelector("span[id$='-count']");
      if (countBadge) {
        countBadge.classList.remove(
          "bg-slate-100",
          "dark:bg-slate-700",
          "text-slate-600",
          "dark:text-slate-400"
        );
        countBadge.classList.add(
          "bg-blue-100",
          "dark:bg-blue-900/30",
          "text-blue-600",
          "dark:text-blue-400"
        );
        // Apply custom color #0090D6
        const isDarkMode = document.documentElement.classList.contains("dark");
        countBadge.style.backgroundColor = isDarkMode ? "rgba(0, 144, 214, 0.3)" : "rgba(0, 144, 214, 0.1)";
        countBadge.style.color = "#0090D6";
      }

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });

      // Show selected tab content
      const selectedContent = document.getElementById(`tab-content-${tabId}`);
      if (selectedContent) {
        selectedContent.classList.remove("hidden");
        // Load chats for this tab
        loadChatsForTab(tabId);
      }
    });
  });

  // Load initial tab content
  loadChatsForTab("my-chats");
  updateTabsText();

  // Apply initial styling to active tab
  const activeTab = document.querySelector(".tab-btn.active");
  if (activeTab) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    activeTab.classList.remove("text-slate-500", "dark:text-slate-400");
    activeTab.classList.add("text-slate-700", "dark:text-slate-300");
    activeTab.style.borderBottomColor = "#0090D6";
    activeTab.style.color = "#0090D6";
    activeTab.style.borderBottomWidth = "2px";
    activeTab.style.backgroundColor = isDarkMode ? "#1e293b" : "#ffffff";
    activeTab.style.minHeight = "36px";
    
    // Apply custom color #0090D6 to active tab badge
    const activeCountBadge = activeTab.querySelector("span[id$='-count']");
    if (activeCountBadge) {
      activeCountBadge.style.backgroundColor = isDarkMode ? "rgba(0, 144, 214, 0.3)" : "rgba(0, 144, 214, 0.1)";
      activeCountBadge.style.color = "#0090D6";
    }
  }

  // Apply initial styling to inactive tabs
  const inactiveTabs = document.querySelectorAll(".tab-btn:not(.active)");
  inactiveTabs.forEach((tab) => {
    tab.classList.remove("text-slate-700", "dark:text-slate-300");
    tab.classList.add("text-slate-500", "dark:text-slate-400");
    tab.style.borderBottomColor = "transparent";
    tab.style.color = "";
    tab.style.backgroundColor = "";
    tab.style.borderBottomWidth = "2px";
    tab.style.minHeight = "36px";
  });
}

function loadChatsForTab(tabId) {
  const tabContent = document.getElementById(`tab-content-${tabId}`);
  if (!tabContent) return;

  // Sample chat data for different channels
  // Make chatsData globally accessible
  if (!window.chatsData) {
    window.chatsData = [];
  }

  const chatsData = {
    "my-chats": [
      {
        id: 1,
        name: "أحمد محمد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "شكراً لك على المساعدة",
        messageStatus: "sent",
        time: "10:30 ص",
        createdAt: "2024-01-15",
        unread: 2,
        status: "open",
        tags: [
          "مهم",
          "عميل VIP",
          "متابعة",
          "عاجل",
          "استفسار",
          "طلب",
          "شكر",
          "شكوى",
          "مميز",
          "جديد",
        ],
        assignedTo: "محمد علي",
        rating: 4.5,
        avatar:
          "https://ui-avatars.com/api/?name=أحمد+محمد&background=25D366&color=fff&size=128",
      },
      {
        id: 2,
        name: "سارة علي",
        channel: "telegram",
        channelName: "Telegram",
        lastMessage: "هل يمكنك مساعدتي؟",
        messageStatus: "delivered",
        time: "10:15 ص",
        createdAt: "2024-01-14",
        unread: 0,
        status: "pending",
        tags: ["استفسار"],
        assignedTo: "فاطمة أحمد",
        avatar:
          "https://ui-avatars.com/api/?name=سارة+علي&background=0088cc&color=fff&size=128",
      },
      {
        id: 3,
        name: "محمد خالد",
        channel: "instagram",
        channelName: "Instagram",
        lastMessage: "شكراً لك",
        messageStatus: "read",
        time: "09:45 ص",
        createdAt: "2024-01-13",
        unread: 1,
        status: "open",
        tags: ["شكوى", "عاجل"],
        assignedTo: "خالد سعيد",
        avatar:
          "https://ui-avatars.com/api/?name=محمد+خالد&background=E4405F&color=fff&size=128",
      },
      {
        id: 4,
        name: "فاطمة أحمد",
        channel: "messenger",
        channelName: "Messenger",
        lastMessage: "متى يمكنني الحصول على الرد؟",
        messageStatus: "sent",
        time: "أمس",
        createdAt: "2024-01-12",
        unread: 0,
        status: "resolved",
        tags: ["متابعة"],
        assignedTo: "سارة علي",
        avatar:
          "https://ui-avatars.com/api/?name=فاطمة+أحمد&background=0084FF&color=fff&size=128",
      },
      {
        id: 5,
        name: "خالد سعيد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "حسناً، سأنتظر",
        messageStatus: "delivered",
        time: "07:20 ص",
        createdAt: "2024-01-11",
        unread: 3,
        status: "open",
        tags: ["طلب", "مهم"],
        assignedTo: "أحمد محمد",
        avatar:
          "https://ui-avatars.com/api/?name=خالد+سعيد&background=25D366&color=fff&size=128",
      },
      {
        id: 10,
        name: "مريم حسن",
        channel: "tiktok",
        channelName: "TikTok",
        lastMessage: "شكراً على المحتوى الرائع",
        messageStatus: "read",
        time: "11:45 ص",
        createdAt: "2024-01-15",
        unread: 0,
        status: "open",
        tags: ["شكر"],
        assignedTo: "سارة علي",
        avatar:
          "https://ui-avatars.com/api/?name=مريم+حسن&background=000000&color=fff&size=128",
      },
      {
        id: 11,
        name: "عبدالله يوسف",
        channel: "webchat",
        channelName: "Web Chat",
        lastMessage: "أحتاج معلومات عن المنتج",
        messageStatus: "sent",
        time: "11:30 ص",
        createdAt: "2024-01-15",
        unread: 1,
        status: "open",
        tags: ["استفسار"],
        assignedTo: "محمد علي",
        avatar:
          "https://ui-avatars.com/api/?name=عبدالله+يوسف&background=0090D6&color=fff&size=128",
      },
      {
        id: 12,
        name: "هند محمد",
        channel: "sms",
        channelName: "SMS",
        lastMessage: "تم استلام الطلبية بنجاح",
        messageStatus: "delivered",
        time: "11:15 ص",
        createdAt: "2024-01-15",
        unread: 0,
        status: "resolved",
        tags: ["طلب"],
        assignedTo: "فاطمة أحمد",
        avatar:
          "https://ui-avatars.com/api/?name=هند+محمد&background=4CAF50&color=fff&size=128",
      },
      {
        id: 13,
        name: "طارق أحمد",
        channel: "email",
        channelName: "Email",
        lastMessage: "شكراً على الرد السريع",
        messageStatus: "read",
        time: "10:50 ص",
        createdAt: "2024-01-15",
        unread: 2,
        status: "open",
        tags: ["متابعة"],
        assignedTo: "خالد سعيد",
        avatar:
          "https://ui-avatars.com/api/?name=طارق+أحمد&background=EA4335&color=fff&size=128",
      },
      {
        id: 14,
        name: "تذكرة #1234",
        channel: "support-tickets",
        channelName: "Support Tickets",
        lastMessage: "مشكلة في تسجيل الدخول",
        messageStatus: "sent",
        time: "10:40 ص",
        createdAt: "2024-01-15",
        unread: 1,
        status: "open",
        tags: ["عاجل", "مشكلة تقنية"],
        assignedTo: "أحمد محمد",
        avatar:
          "https://ui-avatars.com/api/?name=Ticket+1234&background=FF6B6B&color=fff&size=128",
      },
    ],
    unassigned: [
      {
        id: 6,
        name: "علي حسن",
        channel: "telegram",
        channelName: "Telegram",
        lastMessage: "أحتاج مساعدة عاجلة",
        messageStatus: "sent",
        time: "10:20 ص",
        createdAt: "2024-01-15",
        unread: 1,
        status: "open",
        tags: ["عاجل"],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=علي+حسن&background=0088cc&color=fff&size=128",
      },
      {
        id: 7,
        name: "نورا عبدالله",
        channel: "instagram",
        channelName: "Instagram",
        lastMessage: "هل يمكنك الرد؟",
        messageStatus: "delivered",
        time: "10:10 ص",
        createdAt: "2024-01-15",
        unread: 0,
        status: "pending",
        tags: ["استفسار"],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=نورا+عبدالله&background=E4405F&color=fff&size=128",
      },
      {
        id: 8,
        name: "يوسف أحمد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "شكراً",
        messageStatus: "read",
        time: "09:30 ص",
        createdAt: "2024-01-14",
        unread: 2,
        status: "open",
        tags: ["شكر"],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=يوسف+أحمد&background=25D366&color=fff&size=128",
      },
      {
        id: 9,
        name: "ليلى محمد",
        channel: "messenger",
        channelName: "Messenger",
        lastMessage: "ممتاز",
        messageStatus: "sent",
        time: "أمس",
        createdAt: "2024-01-13",
        unread: 0,
        status: "pending",
        tags: [],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=ليلى+محمد&background=0084FF&color=fff&size=128",
      },
    ],
    all: [
      {
        id: 1,
        name: "أحمد محمد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "شكراً لك على المساعدة",
        messageStatus: "sent",
        time: "10:30 ص",
        createdAt: "2024-01-15",
        unread: 2,
        status: "open",
        tags: [
          "مهم",
          "عميل VIP",
          "متابعة",
          "عاجل",
          "استفسار",
          "طلب",
          "شكر",
          "شكوى",
          "مميز",
          "جديد",
        ],
        assignedTo: "محمد علي",
        rating: 4.5,
        avatar:
          "https://ui-avatars.com/api/?name=أحمد+محمد&background=25D366&color=fff&size=128",
      },
      {
        id: 2,
        name: "سارة علي",
        channel: "telegram",
        channelName: "Telegram",
        lastMessage: "هل يمكنك مساعدتي؟",
        messageStatus: "delivered",
        time: "10:15 ص",
        createdAt: "2024-01-14",
        unread: 0,
        status: "pending",
        tags: ["استفسار"],
        assignedTo: "فاطمة أحمد",
        avatar:
          "https://ui-avatars.com/api/?name=سارة+علي&background=0088cc&color=fff&size=128",
      },
      {
        id: 3,
        name: "محمد خالد",
        channel: "instagram",
        channelName: "Instagram",
        lastMessage: "شكراً لك",
        messageStatus: "read",
        time: "09:45 ص",
        createdAt: "2024-01-13",
        unread: 1,
        status: "open",
        tags: ["شكوى", "عاجل"],
        assignedTo: "خالد سعيد",
        avatar:
          "https://ui-avatars.com/api/?name=محمد+خالد&background=E4405F&color=fff&size=128",
      },
      {
        id: 4,
        name: "فاطمة أحمد",
        channel: "messenger",
        channelName: "Messenger",
        lastMessage: "متى يمكنني الحصول على الرد؟",
        messageStatus: "sent",
        time: "أمس",
        createdAt: "2024-01-12",
        unread: 0,
        status: "resolved",
        tags: ["متابعة"],
        assignedTo: "سارة علي",
        avatar:
          "https://ui-avatars.com/api/?name=فاطمة+أحمد&background=0084FF&color=fff&size=128",
      },
      {
        id: 5,
        name: "خالد سعيد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "حسناً، سأنتظر",
        messageStatus: "delivered",
        time: "07:20 ص",
        createdAt: "2024-01-11",
        unread: 3,
        status: "open",
        tags: ["طلب", "مهم"],
        assignedTo: "أحمد محمد",
        avatar:
          "https://ui-avatars.com/api/?name=خالد+سعيد&background=25D366&color=fff&size=128",
      },
      {
        id: 6,
        name: "علي حسن",
        channel: "telegram",
        channelName: "Telegram",
        lastMessage: "أحتاج مساعدة عاجلة",
        messageStatus: "sent",
        time: "10:20 ص",
        createdAt: "2024-01-15",
        unread: 1,
        status: "open",
        tags: ["عاجل"],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=علي+حسن&background=0088cc&color=fff&size=128",
      },
      {
        id: 7,
        name: "نورا عبدالله",
        channel: "instagram",
        channelName: "Instagram",
        lastMessage: "هل يمكنك الرد؟",
        messageStatus: "delivered",
        time: "10:10 ص",
        createdAt: "2024-01-15",
        unread: 0,
        status: "pending",
        tags: ["استفسار"],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=نورا+عبدالله&background=E4405F&color=fff&size=128",
      },
      {
        id: 8,
        name: "يوسف أحمد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "شكراً",
        messageStatus: "read",
        time: "09:30 ص",
        createdAt: "2024-01-14",
        unread: 2,
        status: "open",
        tags: ["شكر"],
        assignedTo: null,
        avatar:
          "https://ui-avatars.com/api/?name=يوسف+أحمد&background=25D366&color=fff&size=128",
      },
    ],
  };

  const chats = chatsData[tabId] || [];
  const currentLang = document.documentElement.getAttribute("lang") || "ar";

  // Merge all chats into window.chatsData for global access
  window.chatsData = [];
  Object.values(chatsData).forEach((tabChats) => {
    tabChats.forEach((chat) => {
      // Only add if not already in window.chatsData (avoid duplicates)
      if (!window.chatsData.find((c) => c.id === chat.id)) {
        window.chatsData.push(chat);
      }
    });
  });

  // Channel icons mapping
  const channelIcons = {
    whatsapp: "hgi-whatsapp",
    telegram: "hgi-telegram",
    instagram: "hgi-instagram",
    messenger: "hgi-messenger",
    tiktok: "hgi-tiktok",
    webchat: "hgi-message-01",
    sms: "hgi-bubble-chat",
    email: "hgi-mail-01",
    "support-tickets": "hgi-ticket-01",
  };

  // Channel colors
  const channelColors = {
    whatsapp: "#25D366",
    telegram: "#0088cc",
    instagram: "#E4405F",
    messenger: "#0084FF",
    tiktok: "#000000",
    webchat: "#0090D6",
    sms: "#4CAF50",
    email: "#EA4335",
    "support-tickets": "#FF6B6B",
  };

  // Message status icons
  const messageStatusIcons = {
    sent: "hgi-tick-02",
    delivered: "hgi-tick-double-02",
    read: "hgi-tick-double-02",
  };

  tabContent.innerHTML = chats
    .map((chat) => {
      const channelIcon = channelIcons[chat.channel] || "hgi-message";
      const channelColor = channelColors[chat.channel] || "#003e5c";
      const statusIcon =
        messageStatusIcons[chat.messageStatus] || "hgi-check-01";
      const currentLang = document.documentElement.getAttribute("lang") || "ar";

      return `
        <div class="chat-item bg-white dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-150 cursor-pointer" data-chat-id="${
          chat.id
        }">
          <div class="flex items-center gap-3">
            <!-- Avatar with Channel Badge -->
            <div class="flex-shrink-0 relative">
              <img 
                src="${chat.avatar}" 
                alt="${chat.name}"
                class="rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                style="width: 40px; height: 40px;"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  chat.name
                )}&background=003e5c&color=fff&size=128'"
              />
              <div class="absolute -bottom-1 -end-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center" style="background-color: ${channelColor}">
                <i class="hgi-stroke ${channelIcon} text-[8px] text-white"></i>
              </div>
            </div>

            <!-- Middle Section: Name, Message, Tags -->
            <div class="flex-1 min-w-0">
              <!-- Name -->
              <div class="flex items-center gap-2 mb-1.5">
                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  ${chat.name}
                </h3>
                <span class="text-xs text-slate-400 dark:text-slate-500">|</span>
                <span class="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  ${chat.channelName || chat.channel}
                </span>
              </div>

              <!-- Last Message with Status -->
              <div class="flex items-center gap-1 mb-1.5">
                <i class="hgi-stroke ${statusIcon} text-xs flex-shrink-0" style="color: ${
        chat.messageStatus === "read"
          ? "#00FF00"
          : chat.messageStatus === "delivered"
          ? "#ffffff"
          : "#ffffff"
      }"></i>
                <p class="text-xs text-slate-600 dark:text-slate-400 truncate flex-1">
                  ${chat.lastMessage}
                </p>
              </div>

              <!-- Tags -->
              ${
                chat.tags && chat.tags.length > 0
                  ? (() => {
                      const maxVisibleTags = 3;
                      const visibleTags = chat.tags.slice(0, maxVisibleTags);
                      const remainingCount = chat.tags.length - maxVisibleTags;
                      const tagColors = [
                        "#3B82F6", // blue
                        "#10B981", // green
                        "#F59E0B", // amber
                        "#EF4444", // red
                        "#8B5CF6", // purple
                        "#EC4899", // pink
                        "#06B6D4", // cyan
                        "#F97316", // orange
                      ];
                      return `<div class="flex items-center gap-1 flex-wrap">
                        ${visibleTags
                          .map((tag, tagIndex) => {
                            const tagColor =
                              tagColors[tagIndex % tagColors.length];
                            return `<span class="px-1.5 py-0.5 text-white text-[8px] rounded-sm font-medium" style="background-color: ${tagColor}">${tag}</span>`;
                          })
                          .join("")}
                        ${
                          remainingCount > 0
                            ? `<span class="px-1.5 py-0.5 text-white text-[8px] rounded-sm font-medium bg-slate-500 dark:bg-slate-600">
                                ${
                                  currentLang === "ar" ? "+" : "+"
                                }${remainingCount}
                              </span>`
                            : ""
                        }
                      </div>`;
                    })()
                  : ""
              }
            </div>

            <!-- Right Section: Assigned To, Unread Count, Time -->
            <div class="flex-shrink-0 flex flex-col items-end justify-between gap-1.5">
              <!-- Assigned To (Top) -->
              <div class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                ${
                  chat.assignedTo
                    ? `<i class="hgi-stroke hgi-customer-support text-xs" style="color: #003e5c"></i>
                       <span class="whitespace-nowrap">${
                         chat.assignedTo.split(" ")[0]
                       }</span>`
                    : `<span class="whitespace-nowrap">${
                        currentLang === "ar" ? "غير معين" : "Unassigned"
                      }</span>`
                }
              </div>

              <!-- Middle: Unread Count -->
              <div class="flex-1 flex items-center justify-center">
                ${
                  chat.unread > 0
                    ? `<span class="w-4 h-4 flex items-center justify-center text-white text-[10px] font-medium rounded-full" style="background-color: #0090D6">${chat.unread}</span>`
                    : `<span class="w-5"></span>`
                }
              </div>

              <!-- Time (Bottom) -->
              <div class="flex flex-col items-end text-xs text-slate-500 dark:text-slate-400">
                <span class="whitespace-nowrap">${chat.time}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  // Add click handlers to chat items
  const chatItems = tabContent.querySelectorAll(".chat-item");
  chatItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      chatItems.forEach((i) => {
        i.classList.remove("bg-blue-50", "dark:bg-blue-900/20");
      });

      // Add active class to clicked item
      item.classList.add("bg-blue-50", "dark:bg-blue-900/20");

      // Load messages for this chat
      const chat = chats[index];
      if (chat && chat.id) {
        // Set selected chat ID globally
        window.selectedChatId = chat.id;
        loadMessagesForChat(chat);
        // Update breadcrumb with chat ID
        const currentLang =
          document.documentElement.getAttribute("lang") || "ar";
        if (languageManager) {
          languageManager.updateBreadcrumb(currentLang, chat.id);
        }
      }
    });
  });
}

function updateTabsText() {
  const currentLang = document.documentElement.getAttribute("lang") || "ar";
  const t = translations[currentLang];

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((button) => {
    const span = button.querySelector("span[data-text-ar]");
    if (span) {
      const text =
        currentLang === "ar"
          ? span.getAttribute("data-text-ar")
          : span.getAttribute("data-text-en");
      if (text) {
        span.textContent = text;
      }
    }
  });

  // Update expand button title
  const expandBtn = document.getElementById("expand-chats-btn");
  if (expandBtn) {
    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    const title =
      currentLang === "ar"
        ? expandBtn.getAttribute("data-title-ar")
        : expandBtn.getAttribute("data-title-en");
    if (title) {
      expandBtn.setAttribute("title", title);
    }
  }
}

function setupExpandChats() {
  const expandBtn = document.getElementById("expand-chats-btn");
  const chatsSidebar = document.getElementById("chats-sidebar");
  const messagesSection = document.getElementById("messages-section");

  if (!expandBtn || !chatsSidebar || !messagesSection) return;

  // Load saved state from localStorage
  let isExpanded = localStorage.getItem("chatsExpanded") === "true";

  // Apply expand state
  const applyExpandState = () => {
    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    const dir = document.documentElement.getAttribute("dir") || "rtl";

    if (isExpanded) {
      chatsSidebar.style.width = "100%";
      messagesSection.style.display = "none";

      const icon = expandBtn.querySelector("i");
      if (icon) {
        const isDark = document.documentElement.classList.contains("dark");
        const iconColor = isDark ? "#94a3b8" : "#003E5C";
        icon.className = "hgi-stroke hgi-square-arrow-shrink-01 text-lg";
        icon.style.color = iconColor;
      }

      expandBtn.setAttribute(
        "title",
        currentLang === "ar" ? "تضييق" : "Shrink"
      );
      expandBtn.setAttribute("data-title-ar", "تضييق");
      expandBtn.setAttribute("data-title-en", "Shrink");
    } else {
      chatsSidebar.style.width = "320px";
      messagesSection.style.display = "flex";

      const icon = expandBtn.querySelector("i");
      if (icon) {
        const isDark = document.documentElement.classList.contains("dark");
        const iconColor = isDark ? "#94a3b8" : "#003E5C";
        icon.className = "hgi-stroke hgi-square-arrow-expand-01 text-lg";
        icon.style.color = iconColor;
      }

      expandBtn.setAttribute(
        "title",
        currentLang === "ar" ? "توسيع " : "Expand"
      );
      expandBtn.setAttribute("data-title-ar", "توسيع");
      expandBtn.setAttribute("data-title-en", "Expand");
    }
  };

  // Apply saved state immediately on page load
  applyExpandState();

  expandBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;

    // Save state to localStorage
    localStorage.setItem("chatsExpanded", isExpanded.toString());

    // Apply the state
    applyExpandState();
  });

  // Update icon on language change
  const updateExpandIcon = () => {
    const icon = expandBtn.querySelector("i");
    if (icon && !isExpanded) {
      icon.className = "hgi-stroke hgi-square-arrow-expand-01 text-lg";
    } else if (icon && isExpanded) {
      icon.className = "hgi-stroke hgi-square-arrow-shrink-01 text-lg";
    }
  };

  // Listen for language changes
  const observer = new MutationObserver(() => {
    updateExpandIcon();
    applyExpandState();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"],
  });

  // Store expand state function globally so it can be accessed by loadMessagesForChat
  window.chatsExpandedState = () => isExpanded;

  // Make applyExpandState available globally for updates
  window.applyExpandState = applyExpandState;

  // Setup tooltip for expand button
  const tooltip = expandBtn.querySelector(".tooltip-element");
  if (tooltip) {
    const updateTooltipText = () => {
      const currentLang = document.documentElement.getAttribute("lang") || "ar";
      const tooltipText = tooltip.querySelector(".tooltip-text");
      if (tooltipText) {
        tooltipText.textContent =
          currentLang === "ar"
            ? expandBtn.getAttribute("data-title-ar")
            : expandBtn.getAttribute("data-title-en");
      }
    };

    expandBtn.addEventListener("mouseenter", () => {
      tooltip.classList.remove("opacity-0");
      tooltip.classList.add("opacity-100");
      updateTooltipText();
    });

    expandBtn.addEventListener("mouseleave", () => {
      tooltip.classList.remove("opacity-100");
      tooltip.classList.add("opacity-0");
    });

    // Update tooltip text when language or expand state changes
    const tooltipObserver = new MutationObserver(() => {
      updateTooltipText();
    });

    tooltipObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    // Also observe expand button's data-title attributes
    tooltipObserver.observe(expandBtn, {
      attributes: true,
      attributeFilter: ["data-title-ar", "data-title-en"],
    });
  }
}

function loadMessagesForChat(chat) {
  const messagesHeader = document.getElementById("messages-header");
  const messagesContent = document.getElementById("messages-content");
  const messageInputContainer = document.getElementById(
    "message-input-container"
  );
  const chatsSidebar = document.getElementById("chats-sidebar");
  const messagesSection = document.getElementById("messages-section");
  const currentLang = document.documentElement.getAttribute("lang") || "ar";

  // Show messages section (remove hidden class)
  if (messagesSection) {
    messagesSection.classList.remove("hidden");
  }

  // If chats are expanded, hide chats sidebar and show messages section full width
  const isExpanded = localStorage.getItem("chatsExpanded") === "true";
  if (isExpanded) {
    if (chatsSidebar) {
      chatsSidebar.style.display = "none";
    }
    if (messagesSection) {
      messagesSection.style.display = "flex";
      messagesSection.style.width = "100%";
      messagesSection.style.flex = "1 1 100%";
    }
  }

  // Show messages/orders tabs
  const messagesOrdersTabs = document.getElementById("messages-orders-tabs");
  if (messagesOrdersTabs) {
    messagesOrdersTabs.classList.remove("hidden");
  }

  // Show message input container
  if (messageInputContainer) {
    messageInputContainer.classList.remove("hidden");
    // Also ensure display is not set to none
    messageInputContainer.style.display = "";
  }

  // Show and update messages header
  if (messagesHeader) {
    // Show messages header
    messagesHeader.classList.remove("hidden");
    const channelIcons = {
      whatsapp: "hgi-whatsapp",
      telegram: "hgi-telegram",
      instagram: "hgi-instagram",
      messenger: "hgi-messenger",
    };
    const channelColors = {
      whatsapp: "#25D366",
      telegram: "#0088cc",
      instagram: "#E4405F",
      messenger: "#0084FF",
    };

    const channelIcon = channelIcons[chat.channel] || "hgi-message";
    const channelColor = channelColors[chat.channel] || "#003e5c";

    // Get rating from chat data (default to 5 if not provided)
    const rating = chat.rating || 5;

    const dir = document.documentElement.getAttribute("dir") || "rtl";
    messagesHeader.innerHTML = `
      <div class="flex items-center gap-3">
        <button id="back-to-chats-btn" class="relative w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 flex-shrink-0 overflow-visible" style="background-color:  #DBF3FF; color: #003E5C" data-title-ar="الرجوع للمحادثات" data-title-en="Back to Chats">
          <i class="hgi-stroke ${
            dir === "rtl" ? "hgi-arrow-right-01" : "hgi-arrow-left-01"
          } text-sm" style="color: #003E5C"></i>
          <div
            class="tooltip absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg tooltip-element"
            data-text-ar="المحادثات"
            data-text-en="Chats"
          >
            <span class="tooltip-text">${
              currentLang === "ar" ? "المحادثات" : "Chats"
            }</span>
            <div
              class="absolute bottom-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-b-slate-900 dark:border-b-slate-700"
            ></div>
          </div>
        </button>
        <img 
          src="${chat.avatar}" 
          alt="${chat.name}"
          class="w-8 h-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
            chat.name
          )}&background=003e5c&color=fff&size=128'"
        />
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              ${chat.name}
            </h3>
            <span class="text-xs text-slate-400 dark:text-slate-500">|</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">
              ${chat.channelName || chat.channel}
            </span>
            <!-- Rating -->
            <div class="flex items-center gap-1 ms-2">
              <i class="hgi-stroke hgi-star text-sm" style="color: #F59E0B"></i>
              <span class="text-xs font-medium text-slate-900 dark:text-slate-100">${rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <!-- Close Chat Button and Actions Dropdown (Grouped together) -->
        <div class="flex items-center gap-0">
          <button id="close-chat-btn" class="h-7 px-3 flex items-center justify-center text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 rounded-s-lg" style="background-color: #DBF3FF; color: #003E5C">
            ${currentLang === "ar" ? "إغلاق" : "Close"}
          </button>
          <div class="relative">
            <button id="chat-actions-btn" class="relative w-7 h-7 flex items-center justify-center text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 rounded-e-lg border-s border-slate-200 dark:border-slate-600" style="background-color: #DBF3FF; color: #003E5C" data-title-ar="الإجراءات" data-title-en="Actions">
              <i class="hgi-stroke hgi-arrow-down-01 text-sm" style="color: #003E5C"></i>
              <div
                class="tooltip absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg tooltip-element"
              >
                <span class="tooltip-text">${
                  currentLang === "ar" ? "الإجراءات" : "Actions"
                }</span>
              </div>
            </button>
            <!-- Actions Dropdown Menu -->
            <div id="chat-actions-menu" class="absolute end-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-50 max-h-[500px] overflow-y-auto">
            <div class="py-1">
              <!-- Status Section -->
              <div class="px-2 py-1">
                <h4 class="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1" data-text-ar="الحالة: مفتوح" data-text-en="Status: Open">
                  ${currentLang === "ar" ? "الحالة: مفتوح" : "Status: Open"}
                </h4>
                <div class="space-y-0.5">
                  <button class="w-full px-2 py-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-1.5 rounded" data-action="mark-read">
                    <i class="hgi-stroke hgi-check-01 text-sm" style="color: #0090D6"></i>
                    <span data-text-ar="تحويل الى مقروء" data-text-en="Mark as Read">${
                      currentLang === "ar" ? "تحويل الى مقروء" : "Mark as Read"
                    }</span>
                  </button>
                  <button class="w-full px-2 py-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-1.5 rounded" data-action="mark-muted">
                    <i class="hgi-stroke hgi-notification-off text-xs" style="color: #0090D6"></i>
                    <span data-text-ar="تحويل الى مكتوم" data-text-en="Mark as Muted">${
                      currentLang === "ar" ? "تحويل الى مكتوم" : "Mark as Muted"
                    }</span>
                  </button>
                </div>
              </div>
              
              <!-- Divider -->
              <div class="h-px bg-slate-200 dark:bg-slate-700 my-0.5"></div>
              
              <button class="w-full px-2 py-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-1.5" data-action="unsubscribe">
                <i class="hgi-stroke hgi-user-remove text-xs" style="color: #0090D6"></i>
                <span data-text-ar="إلغاء إشتراك" data-text-en="Unsubscribe">${
                  currentLang === "ar" ? "إلغاء إشتراك" : "Unsubscribe"
                }</span>
              </button>
              
              <!-- Divider -->
              <div class="h-px bg-slate-200 dark:bg-slate-700 my-0.5"></div>
              
              <button class="w-full px-2 py-1 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-1.5" data-action="hide-system">
                <i class="hgi-stroke hgi-eye-off text-xs" style="color: #0090D6"></i>
                <span data-text-ar="إخفاء رسائل النظام" data-text-en="Hide System Messages">${
                  currentLang === "ar"
                    ? "إخفاء رسائل النظام"
                    : "Hide System Messages"
                }</span>
              </button>
              
              <!-- Divider -->
              <div class="h-px bg-slate-200 dark:bg-slate-700 my-0.5"></div>
              
              <!-- Message Type Section -->
              <div class="px-2 py-1">
                <h4 class="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1" data-text-ar="نوع الرسالة" data-text-en="Message Type">
                  ${currentLang === "ar" ? "نوع الرسالة" : "Message Type"}
                </h4>
                <div class="space-y-0.5">
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="text">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="نص" data-text-en="Text">${
                      currentLang === "ar" ? "نص" : "Text"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="image">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="صورة" data-text-en="Image">${
                      currentLang === "ar" ? "صورة" : "Image"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="video">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="فيديو" data-text-en="Video">${
                      currentLang === "ar" ? "فيديو" : "Video"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="file">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="ملف" data-text-en="File">${
                      currentLang === "ar" ? "ملف" : "File"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="audio">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="صوت" data-text-en="Audio">${
                      currentLang === "ar" ? "صوت" : "Audio"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="template">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="قالب" data-text-en="Template">${
                      currentLang === "ar" ? "قالب" : "Template"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-message-type="note">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="ملاحظة" data-text-en="Note">${
                      currentLang === "ar" ? "ملاحظة" : "Note"
                    }</span>
                  </label>
                </div>
              </div>
              
              <!-- Divider -->
              <div class="h-px bg-slate-200 dark:bg-slate-700 my-0.5"></div>
              
              <!-- Sender Section -->
              <div class="px-2 py-1">
                <h4 class="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1" data-text-ar="المرسل" data-text-en="Sender">
                  ${currentLang === "ar" ? "المرسل" : "Sender"}
                </h4>
                <div class="space-y-0.5">
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-sender-type="system">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="النظام" data-text-en="System">${
                      currentLang === "ar" ? "النظام" : "System"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-sender-type="employee">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="الموظف" data-text-en="Employee">${
                      currentLang === "ar" ? "الموظف" : "Employee"
                    }</span>
                  </label>
                  <label class="flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer">
                    <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" data-sender-type="client">
                    <span class="text-xs text-slate-700 dark:text-slate-300" data-text-ar="العميل" data-text-en="Client">${
                      currentLang === "ar" ? "العميل" : "Client"
                    }</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <!-- More Button (Separated) -->
        <button id="more-actions-btn" class="relative w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150" style="background-color: #DBF3FF; color: #003E5C" data-title-ar="عرض" data-title-en="View">
          <i class="hgi-stroke ${
            dir === "rtl" ? "hgi-arrow-right-01" : "hgi-arrow-left-01"
          } text-sm" style="color: #003E5C" id="more-actions-icon"></i>
          <div
            class="tooltip absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg tooltip-element"
          >
            <span class="tooltip-text">${
              currentLang === "ar" ? "عرض" : "View"
            }</span>
          </div>
        </button>
      </div>
    `;

    // Function to hide messages and show chats
    const hideMessagesShowChats = () => {
      // Hide messages section
      if (messagesSection) {
        messagesSection.classList.add("hidden");
        // Reset messages section styles to default
        messagesSection.style.width = "";
        messagesSection.style.flex = "";
      }
      // Hide messages/orders tabs
      const messagesOrdersTabs = document.getElementById("messages-orders-tabs");
      if (messagesOrdersTabs) {
        messagesOrdersTabs.classList.add("hidden");
      }
      // Hide messages header
      if (messagesHeader) {
        messagesHeader.classList.add("hidden");
      }
      // Hide message input
      if (messageInputContainer) {
        messageInputContainer.classList.add("hidden");
      }
      // Clear messages content
      if (messagesContent) {
        messagesContent.innerHTML = "";
      }
      // Remove active class from chat items
      document.querySelectorAll(".chat-item").forEach((item) => {
        item.classList.remove("bg-blue-50", "dark:bg-blue-900/20");
      });

      // Restore breadcrumb without chat ID
      const currentLang = document.documentElement.getAttribute("lang") || "ar";
      if (languageManager) {
        languageManager.updateBreadcrumb(currentLang);
      }

      // Check if chats are expanded
      const isExpanded = localStorage.getItem("chatsExpanded") === "true";

      // Show chats sidebar and restore its state
      if (chatsSidebar) {
        chatsSidebar.style.display = "flex";

        if (isExpanded) {
          // If expanded, keep it expanded (100% width)
          chatsSidebar.style.width = "100%";
          // Hide messages section completely
          if (messagesSection) {
            messagesSection.style.display = "none";
          }
        } else {
          // If not expanded, restore to normal width (320px)
          chatsSidebar.style.width = "320px";
          // Show messages section (but it's hidden by class, so it won't show)
          if (messagesSection) {
            messagesSection.style.display = "flex";
          }
        }
      }

      // Use applyExpandState if available to update the expand button icon
      if (typeof window.applyExpandState === "function") {
        window.applyExpandState();
      }
    };

    // Setup back to chats button
    const backToChatsBtn = document.getElementById("back-to-chats-btn");
    if (backToChatsBtn) {
      backToChatsBtn.addEventListener("click", () => {
        hideMessagesShowChats();
      });

      // Setup tooltip for back to chats button
      const tooltip = backToChatsBtn.querySelector(".tooltip-element");
      if (tooltip) {
        const updateTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const textAr = tooltip.getAttribute("data-text-ar");
            const textEn = tooltip.getAttribute("data-text-en");
            if (textAr && textEn) {
              tooltipText.textContent = lang === "ar" ? textAr : textEn;
            }
          }
        };

        // Initial tooltip text
        updateTooltipText();

        // Show tooltip on hover
        backToChatsBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        backToChatsBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });

        // Also observe tooltip's data-text attributes
        tooltipObserver.observe(tooltip, {
          attributes: true,
          attributeFilter: ["data-text-ar", "data-text-en"],
        });
      }
    }

    // Setup close chat button
    const closeChatBtn = document.getElementById("close-chat-btn");
    if (closeChatBtn) {
      closeChatBtn.addEventListener("click", () => {
        hideMessagesShowChats();
      });
    }

    // Setup actions dropdown
    const actionsBtn = document.getElementById("chat-actions-btn");
    const actionsMenu = document.getElementById("chat-actions-menu");
    if (actionsBtn && actionsMenu) {
      // Setup tooltip for chat actions button
      const actionsTooltip = actionsBtn.querySelector(".tooltip-element");
      if (actionsTooltip) {
        const updateActionsTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = actionsTooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const titleAr = actionsBtn.getAttribute("data-title-ar");
            const titleEn = actionsBtn.getAttribute("data-title-en");
            if (titleAr && titleEn) {
              tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
            }
          }
        };

        // Initial tooltip text
        updateActionsTooltipText();

        // Show tooltip on hover
        actionsBtn.addEventListener("mouseenter", () => {
          actionsTooltip.classList.remove("opacity-0");
          actionsTooltip.classList.add("opacity-100");
          updateActionsTooltipText();
        });

        actionsBtn.addEventListener("mouseleave", () => {
          actionsTooltip.classList.remove("opacity-100");
          actionsTooltip.classList.add("opacity-0");
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateActionsTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });

        // Also observe button's data-title attributes
        tooltipObserver.observe(actionsBtn, {
          attributes: true,
          attributeFilter: ["data-title-ar", "data-title-en"],
        });
      }

      actionsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = actionsMenu.classList.contains("opacity-0");
        if (isVisible) {
          actionsMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          actionsMenu.classList.add("opacity-100", "visible", "translate-y-0");
        } else {
          actionsMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          actionsMenu.classList.remove(
            "opacity-100",
            "visible",
            "translate-y-0"
          );
        }
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!actionsBtn.contains(e.target) && !actionsMenu.contains(e.target)) {
          actionsMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          actionsMenu.classList.remove(
            "opacity-100",
            "visible",
            "translate-y-0"
          );
        }
      });

      // Handle action buttons (only for buttons, not checkboxes/radios)
      const actionButtons = actionsMenu.querySelectorAll("button[data-action]");
      actionButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = btn.getAttribute("data-action");
          // Handle different actions
          if (action === "mark-read") {
            console.log("Mark as read:", chat.id);
            // TODO: Implement mark as read functionality
          } else if (action === "mark-muted") {
            console.log("Mark as muted:", chat.id);
            // TODO: Implement mark as muted functionality
          } else if (action === "unsubscribe") {
            console.log("Unsubscribe:", chat.id);
            // TODO: Implement unsubscribe functionality
          } else if (action === "hide-system") {
            console.log("Hide system messages:", chat.id);
            // TODO: Implement hide system messages functionality
          }
          // Don't close menu for checkboxes/radios, only for action buttons
        });
      });

      // Handle message type checkboxes (don't close menu)
      const messageTypeCheckboxes = actionsMenu.querySelectorAll(
        "[data-message-type]"
      );
      messageTypeCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
          e.stopPropagation();
          const messageType = checkbox.getAttribute("data-message-type");
          console.log("Message type filter:", messageType, checkbox.checked);
          // TODO: Implement message type filtering
        });
      });

      // Handle sender checkboxes (don't close menu)
      const senderCheckboxes =
        actionsMenu.querySelectorAll("[data-sender-type]");
      senderCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
          e.stopPropagation();
          const senderType = checkbox.getAttribute("data-sender-type");
          console.log("Sender type filter:", senderType, checkbox.checked);
          // TODO: Implement sender type filtering
        });
      });
    }

    // Setup more actions button (show contact details)
    const moreActionsBtn = document.getElementById("more-actions-btn");
    const moreActionsIcon = document.getElementById("more-actions-icon");
    const contactDetailsSection = document.getElementById(
      "contact-details-section"
    );
    if (moreActionsBtn && contactDetailsSection) {
      // Ensure contact details section always has fixed width
      contactDetailsSection.style.width = "280px";
      contactDetailsSection.style.minWidth = "280px";
      contactDetailsSection.style.maxWidth = "280px";
      // Function to update arrow icon and tooltip based on contact details section state
      const updateMoreActionsIcon = () => {
        if (!moreActionsIcon) return;
        const dir = document.documentElement.getAttribute("dir") || "rtl";
        const currentLang =
          document.documentElement.getAttribute("lang") || "ar";
        const isVisible = !contactDetailsSection.classList.contains("hidden");

        // Update arrow icon
        if (isVisible) {
          // Section is open, show arrow pointing to close direction
          moreActionsIcon.className = `hgi-stroke ${
            dir === "rtl" ? "hgi-arrow-left-01" : "hgi-arrow-right-01"
          } text-sm`;
          // Update tooltip title for closing
          moreActionsBtn.setAttribute("data-title-ar", "إخفاء");
          moreActionsBtn.setAttribute("data-title-en", "Hide");
        } else {
          // Section is closed, show arrow pointing to open direction
          moreActionsIcon.className = `hgi-stroke ${
            dir === "rtl" ? "hgi-arrow-right-01" : "hgi-arrow-left-01"
          } text-sm`;
          // Update tooltip title for opening
          moreActionsBtn.setAttribute("data-title-ar", "عرض");
          moreActionsBtn.setAttribute("data-title-en", "View");
        }
        const isDark = document.documentElement.classList.contains("dark");
        const iconColor = isDark ? "#94a3b8" : "#003E5C";
        moreActionsIcon.style.color = iconColor;

        // Update tooltip text if it exists
        const tooltip = moreActionsBtn.querySelector(".tooltip-element");
        if (tooltip) {
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            tooltipText.textContent =
              currentLang === "ar"
                ? moreActionsBtn.getAttribute("data-title-ar")
                : moreActionsBtn.getAttribute("data-title-en");
          }
        }
      };

      // Load saved state from localStorage
      const isContactDetailsOpen =
        localStorage.getItem("contactDetailsOpen") === "true";
      if (isContactDetailsOpen) {
        contactDetailsSection.classList.remove("hidden");
        // Ensure fixed width
        contactDetailsSection.style.width = "280px";
        contactDetailsSection.style.minWidth = "280px";
        contactDetailsSection.style.maxWidth = "280px";
        // Update contact details with chat data
        updateContactDetails(chat);
      }

      // Update icon on initial load
      updateMoreActionsIcon();

      moreActionsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = contactDetailsSection.classList.contains("hidden");
        if (isVisible) {
          contactDetailsSection.classList.remove("hidden");
          // Ensure fixed width
          contactDetailsSection.style.width = "280px";
          contactDetailsSection.style.minWidth = "280px";
          contactDetailsSection.style.maxWidth = "280px";
          // Update contact details with chat data
          updateContactDetails(chat);
          // Save state to localStorage
          localStorage.setItem("contactDetailsOpen", "true");
        } else {
          contactDetailsSection.classList.add("hidden");
          // Save state to localStorage
          localStorage.setItem("contactDetailsOpen", "false");
        }
        // Update arrow icon after state change
        updateMoreActionsIcon();
      });

      // Setup tooltip for more actions button
      const tooltip = moreActionsBtn.querySelector(".tooltip-element");
      if (tooltip) {
        const updateTooltipText = () => {
          const currentLang =
            document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            tooltipText.textContent =
              currentLang === "ar"
                ? moreActionsBtn.getAttribute("data-title-ar")
                : moreActionsBtn.getAttribute("data-title-en");
          }
        };

        moreActionsBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        moreActionsBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });

        // Also observe button's data-title attributes
        tooltipObserver.observe(moreActionsBtn, {
          attributes: true,
          attributeFilter: ["data-title-ar", "data-title-en"],
        });
      }

      // Update arrow icon when language/direction changes
      const iconObserver = new MutationObserver(() => {
        updateMoreActionsIcon();
      });

      iconObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir", "lang"],
      });
    }

    // Setup contact details tabs
    setupContactDetailsTabs();

    // Setup collapsible sections with drag and drop
    setupContactCollapsibleSections();

    // Setup contact action icons tooltips
    setupContactActionIcons();

    // Setup contact dropdowns
    setupContactDropdowns();
  }

  // Function to update contact details with chat data
  function updateContactDetails(chat) {
    const contactAvatar = document.getElementById("contact-avatar");
    const contactName = document.getElementById("contact-name");
    const contactChannel = document.getElementById("contact-channel");
    const contactEmail = document.getElementById("contact-email");
    const contactPhone = document.getElementById("contact-phone");
    const contactRating = document.getElementById("contact-rating");

    if (contactAvatar && chat.avatar) {
      contactAvatar.src = chat.avatar;
    }
    if (contactName) {
      contactName.textContent = chat.name || "جهة اتصال";
    }
    if (contactChannel) {
      contactChannel.textContent = chat.channelName || chat.channel || "";
    }
    if (contactEmail) {
      contactEmail.textContent = chat.email || "N/A";
    }
    if (contactPhone) {
      contactPhone.textContent = chat.phone || "N/A";
    }
    if (contactRating) {
      contactRating.textContent = chat.rating || "0";
    }
  }

  // Function to setup contact details tabs
  function setupContactDetailsTabs() {
    const tabButtons = document.querySelectorAll(".contact-tab-btn");
    const tabContents = document.querySelectorAll(".contact-tab-content");
    const currentLang = document.documentElement.getAttribute("lang") || "ar";

    // Setup tooltips for contact tabs
    tabButtons.forEach((btn) => {
      const tooltip = btn.querySelector(".tooltip-element");
      if (tooltip) {
        const updateTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const textAr = tooltip.getAttribute("data-text-ar");
            const textEn = tooltip.getAttribute("data-text-en");
            if (textAr && textEn) {
              tooltipText.textContent = lang === "ar" ? textAr : textEn;
            }
          }
        };

        // Initial tooltip text
        updateTooltipText();

        // Show tooltip on hover
        btn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        btn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });

        // Also observe tooltip's data-text attributes
        tooltipObserver.observe(tooltip, {
          attributes: true,
          attributeFilter: ["data-text-ar", "data-text-en"],
        });
      }

      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");

        // Remove active class from all buttons
        tabButtons.forEach((b) => {
          b.classList.remove("active");
          b.style.backgroundColor = "";
        });

        // Add active class to clicked button
        btn.classList.add("active");
        btn.style.backgroundColor = "#DBF3FF";

        // Save active tab to localStorage
        localStorage.setItem("contactDetailsActiveTab", tabId);

        // Update tooltip title
        const title =
          currentLang === "ar"
            ? btn.getAttribute("data-title-ar")
            : btn.getAttribute("data-title-en");
        if (title) {
          btn.setAttribute("title", title);
        }

        // Hide all tab contents
        tabContents.forEach((content) => {
          content.classList.add("hidden");
        });

        // Show selected tab content
        const selectedContent = document.getElementById(`contact-tab-${tabId}`);
        if (selectedContent) {
          selectedContent.classList.remove("hidden");

          // Load calls when calls tab is opened
          if (tabId === "calls") {
            loadCalls();
          }

          // Setup tags when tags tab is opened
          if (tabId === "tags") {
            setupTags();
          }

          // Setup sequences when sequences tab is opened
          if (tabId === "sequences") {
            setupSequences();
          }

          // Setup scheduled messages when scheduled tab is opened
          if (tabId === "scheduled") {
            setupScheduledMessages();
          }
        }
      });
    });

    // Set initial active tab from localStorage or default to first tab
    const savedTabId = localStorage.getItem("contactDetailsActiveTab");
    let activeTab = null;

    if (savedTabId) {
      // Find the button with the saved tab ID
      activeTab = Array.from(tabButtons).find(
        (btn) => btn.getAttribute("data-tab") === savedTabId
      );
    }

    // If saved tab not found or no saved tab, use first tab
    if (!activeTab && tabButtons.length > 0) {
      activeTab = tabButtons[0];
    }

    if (activeTab) {
      // Activate the tab
      activeTab.classList.add("active");
      activeTab.style.backgroundColor = "#DBF3FF";

      // Show the corresponding content
      const tabId = activeTab.getAttribute("data-tab");
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });
      const selectedContent = document.getElementById(`contact-tab-${tabId}`);
      if (selectedContent) {
        selectedContent.classList.remove("hidden");

        // Load calls when calls tab is opened initially
        if (tabId === "calls") {
          loadCalls();
        }

        // Setup tags when tags tab is opened initially
        if (tabId === "tags") {
          setupTags();
        }

        // Setup variables when variables tab is opened initially
        if (tabId === "variables") {
          setupVariables();
        }

        // Setup sequences when sequences tab is opened initially
        if (tabId === "sequences") {
          setupSequences();
        }

        // Setup scheduled messages when scheduled tab is opened initially
        if (tabId === "scheduled") {
          setupScheduledMessages();
        }
      }
    }
  }

  // Function to update calls text when language changes
  function loadCalls() {
    const callsList = document.getElementById("calls-list");
    if (!callsList) return;

    const lang = document.documentElement.getAttribute("lang") || "ar";

    // Update all text elements with data-text-ar and data-text-en attributes
    const textElements = callsList.querySelectorAll("[data-text-ar]");
    textElements.forEach((element) => {
      const textAr = element.getAttribute("data-text-ar");
      const textEn = element.getAttribute("data-text-en");
      if (textAr && textEn) {
        element.textContent = lang === "ar" ? textAr : textEn;
      }
    });

    // Setup language observer if not already set up
    if (!window.callsLangObserverSetup) {
      window.callsLangObserverSetup = true;
      const langObserver = new MutationObserver(() => {
        loadCalls();
      });

      langObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });
    }
  }

  // Function to setup tags section
  function setupTags() {
    const tagsList = document.getElementById("tags-list");
    const addTagBtn = document.getElementById("add-tag-btn");
    if (!tagsList || !addTagBtn) return;

    // Update add tag button text
    const updateAddTagButtonText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const buttonText = addTagBtn.querySelector("span");
      if (buttonText) {
        const textAr = addTagBtn.getAttribute("data-text-ar");
        const textEn = addTagBtn.getAttribute("data-text-en");
        if (textAr && textEn) {
          buttonText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
    };

    // Initial text update
    updateAddTagButtonText();

    // Setup remove tag buttons (always setup to ensure they work)
    const setupRemoveButtons = () => {
      const removeButtons = tagsList.querySelectorAll(".tag-remove-btn");
      removeButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        // Add click listener to new button
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const tagElement = newBtn.closest("div");
          if (tagElement) {
            tagElement.remove();
          }
        });
      });
    };

    // Setup remove buttons (always call to ensure they work)
    setupRemoveButtons();

    // Setup add tag button (only once)
    if (!addTagBtn.dataset.listenerAdded) {
      addTagBtn.dataset.listenerAdded = "true";
      addTagBtn.addEventListener("click", () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tagName = prompt(
          lang === "ar" ? "أدخل اسم الوسم:" : "Enter tag name:"
        );

        if (tagName && tagName.trim()) {
          // Check if tag already exists
          const existingTags = Array.from(
            tagsList.querySelectorAll("div > span")
          ).map((span) => span.textContent.trim());

          if (existingTags.includes(tagName.trim())) {
            alert(
              lang === "ar"
                ? "هذا الوسم موجود بالفعل"
                : "This tag already exists"
            );
            return;
          }

          // Generate random color for new tag
          const tagColors = [
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
            "#8b5cf6",
            "#ec4899",
            "#06b6d4",
            "#84cc16",
          ];
          const randomColor =
            tagColors[Math.floor(Math.random() * tagColors.length)];

          // Create new tag element
          const newTag = document.createElement("div");
          newTag.className =
            "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium text-white";
          newTag.style.backgroundColor = randomColor;
          newTag.innerHTML = `
          <span>${tagName.trim()}</span>
          <button
            class="tag-remove-btn hover:opacity-70 transition-opacity duration-150 cursor-pointer flex items-center justify-center"
            data-tag="${tagName.trim()}"
            type="button"
          >
            <i class="hgi-stroke hgi-cancel-01 text-[10px] text-white"></i>
          </button>
        `;

          // Add to list
          tagsList.appendChild(newTag);

          // Setup remove button for new tag
          const newRemoveBtn = newTag.querySelector(".tag-remove-btn");
          if (newRemoveBtn) {
            newRemoveBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              newTag.remove();
            });
          }
        }
      });
    }

    // Update text when language changes
    const langObserver = new MutationObserver(() => {
      updateAddTagButtonText();
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Function to setup variables section
  function setupVariables() {
    const variablesList = document.getElementById("variables-list");
    const addVariableBtn = document.getElementById("add-variable-btn");
    if (!variablesList || !addVariableBtn) return;

    // Update add variable button text
    const updateAddVariableButtonText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const buttonText = addVariableBtn.querySelector("span");
      if (buttonText) {
        const textAr = addVariableBtn.getAttribute("data-text-ar");
        const textEn = addVariableBtn.getAttribute("data-text-en");
        if (textAr && textEn) {
          buttonText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
    };

    // Initial text update
    updateAddVariableButtonText();

    // Setup click handlers for variable items to edit values
    const setupVariableItemClick = () => {
      const variableItems = variablesList.querySelectorAll(".variable-item");
      variableItems.forEach((item) => {
        // Remove existing listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);

        // Add click handler (but not on buttons)
        newItem.addEventListener("click", (e) => {
          // Don't trigger if clicking on buttons
          if (
            e.target.closest(".variable-copy-btn") ||
            e.target.closest(".variable-delete-btn")
          ) {
            return;
          }

          const key = newItem.getAttribute("data-key");
          const valueDisplay = newItem.querySelector(
            `.variable-value-display[data-key="${key}"]`
          );
          if (valueDisplay) {
            const lang = document.documentElement.getAttribute("lang") || "ar";
            const currentValue = valueDisplay.textContent.trim();
            const promptText =
              lang === "ar"
                ? `تعديل قيمة "${key}":`
                : `Edit value for "${key}":`;
            const newValue = prompt(promptText, currentValue);
            if (newValue !== null) {
              valueDisplay.textContent = newValue;
            }
          }
        });
      });
    };

    // Setup variable item click handlers
    setupVariableItemClick();

    // Setup copy buttons
    const setupCopyButtons = () => {
      const copyButtons = variablesList.querySelectorAll(".variable-copy-btn");
      copyButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        // Setup tooltip for copy button
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
        tooltip.innerHTML = `
          <span class="tooltip-text"></span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        `;
        newBtn.style.position = "relative";
        newBtn.appendChild(tooltip);

        const updateTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const titleAr = newBtn.getAttribute("data-title-ar");
            const titleEn = newBtn.getAttribute("data-title-en");
            if (titleAr && titleEn) {
              tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
            }
          }
        };

        updateTooltipText();

        newBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        newBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // Copy value on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const key = newBtn.getAttribute("data-key");
          const valueDisplay = variablesList.querySelector(
            `.variable-value-display[data-key="${key}"]`
          );
          if (valueDisplay) {
            const value = valueDisplay.textContent.trim();
            const lang = document.documentElement.getAttribute("lang") || "ar";
            navigator.clipboard
              .writeText(value)
              .then(() => {
                // Show success feedback
                const originalText =
                  tooltip.querySelector(".tooltip-text").textContent;
                tooltip.querySelector(".tooltip-text").textContent =
                  lang === "ar" ? "تم النسخ!" : "Copied!";
                setTimeout(() => {
                  tooltip.querySelector(".tooltip-text").textContent =
                    originalText;
                }, 1000);
              })
              .catch((err) => {
                console.error("Failed to copy:", err);
              });
          }
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });
      });
    };

    // Setup delete buttons
    const setupDeleteButtons = () => {
      const deleteButtons = variablesList.querySelectorAll(
        ".variable-delete-btn"
      );
      deleteButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        // Setup tooltip for delete button
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
        tooltip.innerHTML = `
          <span class="tooltip-text"></span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        `;
        newBtn.style.position = "relative";
        newBtn.appendChild(tooltip);

        const updateTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const titleAr = newBtn.getAttribute("data-title-ar");
            const titleEn = newBtn.getAttribute("data-title-en");
            if (titleAr && titleEn) {
              tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
            }
          }
        };

        updateTooltipText();

        newBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        newBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // Delete variable on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const key = newBtn.getAttribute("data-key");
          const variableItem = newBtn.closest(".variable-item");
          if (variableItem) {
            const confirmMessage =
              lang === "ar" ? `حذف "${key}"؟` : `Delete "${key}"?`;
            if (confirm(confirmMessage)) {
              variableItem.remove();
            }
          }
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });
      });
    };

    // Setup copy and delete buttons
    setupCopyButtons();
    setupDeleteButtons();

    // Setup add variable button (only once)
    if (!addVariableBtn.dataset.listenerAdded) {
      addVariableBtn.dataset.listenerAdded = "true";
      addVariableBtn.addEventListener("click", () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const keyPrompt = lang === "ar" ? "أدخل المفتاح:" : "Enter key:";
        const valuePrompt = lang === "ar" ? "أدخل القيمة:" : "Enter value:";
        const keyExistsMessage =
          lang === "ar"
            ? "هذا المفتاح موجود بالفعل"
            : "This key already exists";

        const key = prompt(keyPrompt);
        if (!key || !key.trim()) return;

        // Check if key already exists
        const existingKeys = Array.from(
          variablesList.querySelectorAll(".variable-item")
        ).map((item) => {
          const keySpan = item.querySelector(
            "span.text-xs.font-semibold.text-slate-900"
          );
          return keySpan ? keySpan.textContent.trim() : "";
        });

        if (existingKeys.includes(key.trim())) {
          alert(keyExistsMessage);
          return;
        }

        const value = prompt(valuePrompt);
        if (value === null) return; // User cancelled

        // Create new variable element
        const newVariable = document.createElement("div");
        newVariable.className =
          "variable-item flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150";
        newVariable.setAttribute("data-key", key.trim());
        newVariable.innerHTML = `
          <div class="flex-1 min-w-0 flex items-center gap-2">
            <span
              class="text-xs font-semibold text-slate-900 dark:text-slate-100 flex-shrink-0"
            >
              ${key.trim()}
            </span>
            <span class="text-xs text-slate-400 dark:text-slate-500">|</span>
            <span
              class="variable-value-display text-xs text-slate-600 dark:text-slate-400 flex-1 min-w-0 truncate"
              data-key="${key.trim()}"
            >
              ${value || ""}
            </span>
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <button
              class="variable-delete-btn w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 cursor-pointer"
              data-key="${key.trim()}"
              data-title-ar="حذف"
              data-title-en="Delete"
              type="button"
            >
              <i
                class="hgi-stroke hgi-delete-02 text-sm text-red-500 dark:text-red-400"
              ></i>
            </button>
            <button
              class="variable-copy-btn w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer"
              data-key="${key.trim()}"
              data-title-ar="نسخ"
              data-title-en="Copy"
              type="button"
            >
              <i
                class="hgi-stroke hgi-copy-01 text-sm text-slate-600 dark:text-slate-400"
              ></i>
            </button>
          </div>
        `;

        // Add to list
        variablesList.appendChild(newVariable);

        // Remove border-b from the new item (it's now the last item)
        newVariable.classList.remove("border-b");

        // Add border-b to the previous last item if it exists
        const previousLastItem = variablesList.querySelector(
          ".variable-item:nth-last-child(2)"
        );
        if (previousLastItem) {
          previousLastItem.classList.add("border-b");
        }

        // Setup buttons and click handlers for new variable
        setupCopyButtons();
        setupDeleteButtons();
        setupVariableItemClick();
      });
    }

    // Update text when language changes
    const langObserver = new MutationObserver(() => {
      updateAddVariableButtonText();
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Function to setup sequences section
  function setupSequences() {
    const sequencesList = document.getElementById("sequences-list");
    const addSequenceBtn = document.getElementById("add-sequence-btn");
    if (!sequencesList || !addSequenceBtn) return;

    // Update add sequence button text
    const updateAddSequenceButtonText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const buttonText = addSequenceBtn.querySelector("span");
      if (buttonText) {
        const textAr = addSequenceBtn.getAttribute("data-text-ar");
        const textEn = addSequenceBtn.getAttribute("data-text-en");
        if (textAr && textEn) {
          buttonText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
    };

    // Initial text update
    updateAddSequenceButtonText();

    // Setup delete buttons
    const setupDeleteButtons = () => {
      const deleteButtons = sequencesList.querySelectorAll(
        ".sequence-delete-btn"
      );
      deleteButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        // Setup tooltip for delete button
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
        tooltip.innerHTML = `
          <span class="tooltip-text"></span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        `;
        newBtn.style.position = "relative";
        newBtn.appendChild(tooltip);

        const updateTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const titleAr = newBtn.getAttribute("data-title-ar");
            const titleEn = newBtn.getAttribute("data-title-en");
            if (titleAr && titleEn) {
              tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
            }
          }
        };

        updateTooltipText();

        newBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        newBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // Delete sequence on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const sequenceItem = newBtn.closest(".sequence-item");
          if (sequenceItem) {
            const sequenceName =
              sequenceItem.getAttribute("data-sequence-name") || "";
            const confirmMessage =
              lang === "ar"
                ? `حذف "${sequenceName}"؟`
                : `Delete "${sequenceName}"?`;
            if (confirm(confirmMessage)) {
              sequenceItem.remove();
            }
          }
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });
      });
    };

    // Setup delete buttons
    setupDeleteButtons();

    // Setup view buttons
    const setupViewButtons = () => {
      const viewButtons = sequencesList.querySelectorAll(".sequence-view-btn");
      viewButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        // Setup tooltip for view button
        const tooltip = document.createElement("div");
        tooltip.className =
          "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
        tooltip.innerHTML = `
          <span class="tooltip-text"></span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        `;
        newBtn.style.position = "relative";
        newBtn.appendChild(tooltip);

        const updateTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const titleAr = newBtn.getAttribute("data-title-ar");
            const titleEn = newBtn.getAttribute("data-title-en");
            if (titleAr && titleEn) {
              tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
            }
          }
        };

        updateTooltipText();

        newBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          updateTooltipText();
        });

        newBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });

        // View sequence on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const sequenceItem = newBtn.closest(".sequence-item");
          if (sequenceItem) {
            const sequenceName =
              sequenceItem.getAttribute("data-sequence-name") || "";
            // TODO: Implement view sequence functionality
            console.log("View sequence:", sequenceName);
          }
        });

        // Update tooltip text when language changes
        const tooltipObserver = new MutationObserver(() => {
          updateTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });
      });
    };

    // Setup view buttons
    setupViewButtons();

    // Setup add sequence button (only once)
    if (!addSequenceBtn.dataset.listenerAdded) {
      addSequenceBtn.dataset.listenerAdded = "true";
      addSequenceBtn.addEventListener("click", () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const sequenceNamePrompt =
          lang === "ar" ? "أدخل اسم التسلسل:" : "Enter sequence name:";

        const sequenceName = prompt(sequenceNamePrompt);
        if (!sequenceName || !sequenceName.trim()) return;

        // Check if sequence already exists
        const existingSequences = Array.from(
          sequencesList.querySelectorAll(".sequence-item")
        ).map((item) => {
          const nameSpan = item.querySelector(
            "span.text-xs.font-medium.text-slate-900"
          );
          return nameSpan ? nameSpan.textContent.trim() : "";
        });

        if (existingSequences.includes(sequenceName.trim())) {
          alert(
            lang === "ar"
              ? "هذا التسلسل موجود بالفعل"
              : "This sequence already exists"
          );
          return;
        }

        // Generate random color for new sequence
        const sequenceColors = [
          { bg: "#10b98120", color: "#10b981" },
          { bg: "#3b82f620", color: "#3b82f6" },
          { bg: "#f59e0b20", color: "#f59e0b" },
          { bg: "#8b5cf620", color: "#8b5cf6" },
          { bg: "#ef444420", color: "#ef4444" },
          { bg: "#ec489920", color: "#ec4899" },
          { bg: "#06b6d420", color: "#06b6d4" },
          { bg: "#84cc1620", color: "#84cc16" },
        ];
        const randomColor =
          sequenceColors[Math.floor(Math.random() * sequenceColors.length)];

        // Create new sequence element
        const newSequence = document.createElement("div");
        newSequence.className =
          "sequence-item flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150";
        newSequence.setAttribute("data-sequence-name", sequenceName.trim());
        newSequence.innerHTML = `
          <div
            class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style="background-color: ${randomColor.bg}"
          >
            <i
              class="hgi-stroke hgi-workflow-square-06 text-lg"
              style="color: ${randomColor.color}"
            ></i>
          </div>
          <div class="flex-1 min-w-0">
            <span
              class="text-xs font-medium text-slate-900 dark:text-slate-100"
              data-text-ar="${sequenceName.trim()}"
              data-text-en="${sequenceName.trim()}"
            >
              ${sequenceName.trim()}
            </span>
          </div>
          <button
            class="sequence-view-btn w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer flex-shrink-0"
            data-title-ar="عرض"
            data-title-en="View"
            type="button"
          >
            <i
              class="hgi-stroke hgi-eye text-sm text-slate-600 dark:text-slate-400"
            ></i>
          </button>
          <button
            class="sequence-delete-btn w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 cursor-pointer flex-shrink-0"
            data-title-ar="حذف"
            data-title-en="Delete"
            type="button"
          >
            <i
              class="hgi-stroke hgi-delete-02 text-sm text-red-500 dark:text-red-400"
            ></i>
          </button>
        `;

        // Add to list (before the add button)
        addSequenceBtn.parentNode.insertBefore(newSequence, addSequenceBtn);

        // Setup buttons for new sequence
        setupDeleteButtons();
        setupViewButtons();
      });
    }

    // Update text when language changes
    const langObserver = new MutationObserver(() => {
      updateAddSequenceButtonText();
      // Update all sequence texts
      const textElements = sequencesList.querySelectorAll("[data-text-ar]");
      textElements.forEach((element) => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const textAr = element.getAttribute("data-text-ar");
        const textEn = element.getAttribute("data-text-en");
        if (textAr && textEn) {
          element.textContent = lang === "ar" ? textAr : textEn;
        }
      });
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Function to setup scheduled messages section
  function setupScheduledMessages() {
    const scheduledMessagesList = document.getElementById(
      "scheduled-messages-list"
    );
    if (!scheduledMessagesList) return;

    // Setup tooltip for a button
    const setupButtonTooltip = (btn, updateTooltipText) => {
      const tooltip = document.createElement("div");
      tooltip.className =
        "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
      tooltip.innerHTML = `
        <span class="tooltip-text"></span>
        <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
      `;
      btn.style.position = "relative";
      btn.appendChild(tooltip);

      const updateText = () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tooltipText = tooltip.querySelector(".tooltip-text");
        if (tooltipText) {
          updateTooltipText(tooltipText, lang);
        }
      };

      updateText();

      btn.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0");
        tooltip.classList.add("opacity-100");
        updateText();
      });

      btn.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0");
      });

      const tooltipObserver = new MutationObserver(() => {
        updateText();
      });

      tooltipObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });
    };

    // Setup send buttons
    const setupSendButtons = () => {
      const sendButtons = scheduledMessagesList.querySelectorAll(
        ".scheduled-message-send-btn"
      );
      sendButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        setupButtonTooltip(newBtn, (tooltipText, lang) => {
          const titleAr = newBtn.getAttribute("data-title-ar");
          const titleEn = newBtn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        });

        // Send message on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const messageItem = newBtn.closest(".scheduled-message-item");
          if (messageItem) {
            const messageId = messageItem.getAttribute("data-message-id");
            // TODO: Implement send scheduled message functionality
            console.log("Send scheduled message:", messageId);
          }
        });
      });
    };

    // Setup view buttons
    const setupViewButtons = () => {
      const viewButtons = scheduledMessagesList.querySelectorAll(
        ".scheduled-message-view-btn"
      );
      viewButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        setupButtonTooltip(newBtn, (tooltipText, lang) => {
          const titleAr = newBtn.getAttribute("data-title-ar");
          const titleEn = newBtn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        });

        // View message on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const messageItem = newBtn.closest(".scheduled-message-item");
          if (messageItem) {
            const messageId = messageItem.getAttribute("data-message-id");
            // TODO: Implement view scheduled message functionality
            console.log("View scheduled message:", messageId);
          }
        });
      });
    };

    // Setup delete buttons
    const setupDeleteButtons = () => {
      const deleteButtons = scheduledMessagesList.querySelectorAll(
        ".scheduled-message-delete-btn"
      );
      deleteButtons.forEach((btn) => {
        // Remove existing listeners by cloning the button
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        setupButtonTooltip(newBtn, (tooltipText, lang) => {
          const titleAr = newBtn.getAttribute("data-title-ar");
          const titleEn = newBtn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        });

        // Delete message on click
        newBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const messageItem = newBtn.closest(".scheduled-message-item");
          if (messageItem) {
            const messageId = messageItem.getAttribute("data-message-id");
            const confirmMessage =
              lang === "ar"
                ? `حذف الرسالة المجدولة #${messageId}؟`
                : `Delete scheduled message #${messageId}?`;
            if (confirm(confirmMessage)) {
              messageItem.remove();
            }
          }
        });
      });
    };

    // Setup all buttons
    setupSendButtons();
    setupViewButtons();
    setupDeleteButtons();

    // Update text when language changes
    const langObserver = new MutationObserver(() => {
      // Update all scheduled message texts
      const textElements =
        scheduledMessagesList.querySelectorAll("[data-text-ar]");
      textElements.forEach((element) => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const textAr = element.getAttribute("data-text-ar");
        const textEn = element.getAttribute("data-text-en");
        if (textAr && textEn) {
          element.textContent = lang === "ar" ? textAr : textEn;
        }
      });
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Function to setup collapsible sections with drag and drop
  function setupContactCollapsibleSections() {
    // Prevent re-initialization
    if (window.contactCollapsibleSectionsSetup) {
      return;
    }
    window.contactCollapsibleSectionsSetup = true;

    const sectionsContainer = document.getElementById(
      "contact-collapsible-sections"
    );
    if (!sectionsContainer) return;

    let sections = sectionsContainer.querySelectorAll(
      ".contact-collapsible-section"
    );

    // Load saved order from localStorage
    const savedOrder = localStorage.getItem("contactSectionsOrder");
    if (savedOrder) {
      try {
        const order = JSON.parse(savedOrder);
        const sectionsArray = Array.from(sections);
        sectionsArray.sort((a, b) => {
          const aId = a.getAttribute("data-section-id");
          const bId = b.getAttribute("data-section-id");
          const aIndex = order.indexOf(aId);
          const bIndex = order.indexOf(bId);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        sectionsArray.forEach((section) => {
          sectionsContainer.appendChild(section);
        });
        // Re-query sections after reordering
        sections = sectionsContainer.querySelectorAll(
          ".contact-collapsible-section"
        );
      } catch (e) {
        console.error("Error loading sections order:", e);
      }
    }

    // Load saved collapsed state from localStorage
    const savedCollapsedState = localStorage.getItem(
      "contactSectionsCollapsedState"
    );
    const collapsedState = savedCollapsedState
      ? JSON.parse(savedCollapsedState)
      : {};

    // Function to update spacing between sections
    const updateSectionSpacing = () => {
      const allSections = sectionsContainer.querySelectorAll(
        ".contact-collapsible-section"
      );
      allSections.forEach((section, index) => {
        const content = section.querySelector(".contact-section-content");
        const isExpanded = content && content.style.display === "block";

        // Remove margin from all sections first
        section.style.marginBottom = "";

        // Add margin only to expanded sections (except the last one)
        if (isExpanded && index < allSections.length - 1) {
          section.style.marginBottom = "12px"; // space-y-3 equivalent
        }
      });
    };

    // Setup collapse/expand functionality
    sections.forEach((section) => {
      const header = section.querySelector(".contact-section-header");
      const content = section.querySelector(".contact-section-content");
      const arrow = section.querySelector(".section-arrow");
      const sectionId = section.getAttribute("data-section-id");

      if (!header || !content || !arrow) return;

      // Restore collapsed state (default to collapsed for new sections)
      const isExpanded = collapsedState[sectionId] === true;

      if (isExpanded) {
        content.style.display = "block";
        arrow.classList.remove("hgi-plus-sign");
        arrow.classList.add("hgi-minus-sign");

        // Load other chats if section is expanded on initial load
        if (sectionId === "other-chats") {
          setTimeout(() => {
            loadOtherChats();
          }, 100);
        }
      } else {
        // Ensure content is hidden
        content.style.display = "none";
        arrow.classList.remove("hgi-minus-sign");
        arrow.classList.add("hgi-plus-sign");
        // Ensure new sections are saved as collapsed
        if (collapsedState[sectionId] === undefined) {
          collapsedState[sectionId] = false;
        }
      }

      // Toggle on header click (but not on drag handle)
      header.addEventListener("click", (e) => {
        if (e.target.closest(".drag-handle")) return;

        const isCurrentlyExpanded = content.style.display === "block";
        const newExpandedState = !isCurrentlyExpanded;

        content.style.display = newExpandedState ? "block" : "none";

        if (newExpandedState) {
          arrow.classList.remove("hgi-plus-sign");
          arrow.classList.add("hgi-minus-sign");

          // Load other chats when section is expanded
          if (sectionId === "other-chats") {
            // Use setTimeout to ensure DOM is ready and selectedChatId is set
            setTimeout(() => {
              loadOtherChats();
            }, 50);
          }
        } else {
          arrow.classList.remove("hgi-minus-sign");
          arrow.classList.add("hgi-plus-sign");
        }

        // Save state
        collapsedState[sectionId] = newExpandedState;
        localStorage.setItem(
          "contactSectionsCollapsedState",
          JSON.stringify(collapsedState)
        );

        // Update spacing after toggle
        updateSectionSpacing();
      });
    });

    // Save initial state to localStorage (for new sections)
    localStorage.setItem(
      "contactSectionsCollapsedState",
      JSON.stringify(collapsedState)
    );

    // Initial spacing update
    updateSectionSpacing();

    // Setup drag and drop
    let draggedElement = null;

    sections.forEach((section) => {
      const dragHandle = section.querySelector(".drag-handle");
      if (!dragHandle) return;

      section.setAttribute("draggable", "true");
      section.style.cursor = "move";

      section.addEventListener("dragstart", (e) => {
        draggedElement = section;
        section.style.opacity = "0.5";
        e.dataTransfer.effectAllowed = "move";
      });

      section.addEventListener("dragend", () => {
        section.style.opacity = "1";
        draggedElement = null;
      });

      section.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";

        if (!draggedElement) return;

        const afterElement = getDragAfterElement(
          sectionsContainer,
          e.clientY,
          draggedElement
        );

        if (afterElement == null) {
          sectionsContainer.appendChild(draggedElement);
        } else {
          sectionsContainer.insertBefore(draggedElement, afterElement);
        }

        // Save new order
        const updatedSections = sectionsContainer.querySelectorAll(
          ".contact-collapsible-section"
        );
        const newOrder = Array.from(updatedSections).map((s) =>
          s.getAttribute("data-section-id")
        );
        localStorage.setItem("contactSectionsOrder", JSON.stringify(newOrder));

        // Update spacing after reorder
        updateSectionSpacing();
      });

      section.addEventListener("drop", (e) => {
        e.preventDefault();
      });
    });

    function getDragAfterElement(container, y, draggingElement) {
      const draggableElements = [
        ...container.querySelectorAll(".contact-collapsible-section"),
      ].filter((el) => el !== draggingElement);

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;

          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  }

  // Function to load and display other chats related to the same contact
  function loadOtherChats() {
    const otherChatsList = document.getElementById("other-chats-list");
    if (!otherChatsList) return;

    // Sample other chats data (for demonstration)
    const sampleOtherChats = [
      {
        id: 101,
        name: "محمد أحمد",
        channel: "whatsapp",
        channelName: "WhatsApp",
        lastMessage: "شكراً لك على المساعدة",
        lastMessageTime: "10:30 ص",
        unread: 2,
        phone: "+966501234567",
        email: "mohammed@example.com",
      },
      {
        id: 102,
        name: "محمد أحمد",
        channel: "telegram",
        channelName: "Telegram",
        lastMessage: "هل يمكنك مساعدتي؟",
        lastMessageTime: "09:15 ص",
        unread: 0,
        phone: "+966501234567",
        email: "mohammed@example.com",
      },
      {
        id: 103,
        name: "محمد أحمد",
        channel: "instagram",
        channelName: "Instagram",
        lastMessage: "متى سيتم التوصيل؟",
        lastMessageTime: "أمس",
        unread: 1,
        phone: "+966501234567",
        email: "mohammed@example.com",
      },
      {
        id: 104,
        name: "محمد أحمد",
        channel: "messenger",
        channelName: "Messenger",
        lastMessage: "أحتاج معلومات إضافية",
        lastMessageTime: "2 يوم",
        unread: 0,
        phone: "+966501234567",
        email: "mohammed@example.com",
      },
    ];

    // Get current chat ID
    const currentChatId = window.selectedChatId;

    // Use sample data for demonstration
    let otherChats = sampleOtherChats;

    // If there's a current chat, try to filter real chats first
    if (currentChatId && window.chatsData) {
      const currentChat = window.chatsData.find((c) => c.id === currentChatId);
      if (currentChat) {
        // Filter other chats with the same contact (by name, phone, or email)
        const realOtherChats = (window.chatsData || []).filter(
          (chat) =>
            chat.id !== currentChatId &&
            (chat.name === currentChat.name ||
              (chat.phone &&
                currentChat.phone &&
                chat.phone === currentChat.phone) ||
              (chat.email &&
                currentChat.email &&
                chat.email === currentChat.email))
        );

        // Use real chats if found, otherwise use sample data
        if (realOtherChats.length > 0) {
          otherChats = realOtherChats;
        }
      }
    }

    // Display other chats
    const lang = document.documentElement.getAttribute("lang") || "ar";
    otherChatsList.innerHTML = otherChats
      .map((chat) => {
        const channelIcons = {
          whatsapp: "hgi-whatsapp",
          telegram: "hgi-telegram",
          instagram: "hgi-instagram",
          messenger: "hgi-messenger",
        };
        const channelColors = {
          whatsapp: "#25D366",
          telegram: "#0088cc",
          instagram: "#E4405F",
          messenger: "#0084FF",
        };
        const channelIcon =
          channelIcons[chat.channel?.toLowerCase()] || "hgi-chat";
        const channelColor =
          channelColors[chat.channel?.toLowerCase()] || "#0090D6";

        return `
          <div
            class="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-150 other-chat-item"
            data-chat-id="${chat.id}"
          >
            <div class="relative flex-shrink-0">
              <img
                src="${
                  chat.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    chat.name || "User"
                  )}&size=32&background=0090D6&color=fff`
                }"
                alt="${chat.name}"
                class="w-8 h-8 rounded-full object-cover"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  chat.name || "User"
                )}&size=32&background=0090D6&color=fff'"
              />
              <div
                class="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
                style="background-color: ${channelColor}"
              >
                <i class="hgi-stroke ${channelIcon} text-[8px] text-white"></i>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                  ${chat.name || "جهة اتصال"}
                </span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500">|</span>
                <span class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  ${chat.channelName || chat.channel || ""}
                </span>
              </div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                ${chat.lastMessage || ""}
              </div>
            </div>
            <div class="flex-shrink-0 flex flex-col items-end gap-1">
              ${
                chat.unread > 0
                  ? `
                <div class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium text-white" style="background-color: #0090D6">
                  ${chat.unread}
                </div>
              `
                  : ""
              }
              ${
                chat.lastMessageTime
                  ? `<span class="text-[10px] text-slate-400 dark:text-slate-500">
                      ${chat.lastMessageTime}
                    </span>`
                  : ""
              }
            </div>
          </div>
        `;
      })
      .join("");

    // Add click handlers to other chat items
    const otherChatItems = otherChatsList.querySelectorAll(".other-chat-item");
    otherChatItems.forEach((item) => {
      item.addEventListener("click", () => {
        const chatId = parseInt(item.getAttribute("data-chat-id"));
        if (chatId) {
          // Select the chat
          const chatElement = document.querySelector(
            `.chat-item[data-chat-id="${chatId}"]`
          );
          if (chatElement) {
            chatElement.click();
          }
        }
      });
    });

    // Update text when language changes
    const langObserver = new MutationObserver(() => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const emptyMessage = otherChatsList.querySelector(
        '[data-text-ar="لا توجد محادثات أخرى"]'
      );
      if (emptyMessage) {
        emptyMessage.textContent =
          lang === "ar" ? "لا توجد محادثات أخرى" : "No other chats";
      }
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Function to setup contact action icons tooltips
  function setupContactActionIcons() {
    const actionButtons = document.querySelectorAll(
      "#contact-tab-details button[data-title-ar]"
    );

    actionButtons.forEach((btn) => {
      const tooltip = document.createElement("div");
      tooltip.className =
        "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
      tooltip.innerHTML = `
        <span class="tooltip-text"></span>
        <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
      `;
      btn.style.position = "relative";
      btn.appendChild(tooltip);

      const updateTooltipText = () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tooltipText = tooltip.querySelector(".tooltip-text");
        if (tooltipText) {
          const titleAr = btn.getAttribute("data-title-ar");
          const titleEn = btn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        }
      };

      updateTooltipText();

      btn.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0");
        tooltip.classList.add("opacity-100");
        updateTooltipText();
      });

      btn.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0");
      });

      const tooltipObserver = new MutationObserver(() => {
        updateTooltipText();
      });

      tooltipObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });
    });
  }

  // Function to setup contact dropdowns
  function setupContactDropdowns() {
    // Prevent re-initialization
    if (window.contactDropdownsSetup) {
      return;
    }
    window.contactDropdownsSetup = true;

    // Assigned Employee Dropdown
    const assignedEmployeeBtn = document.getElementById(
      "assigned-employee-btn"
    );
    const assignedEmployeeMenu = document.getElementById(
      "assigned-employee-menu"
    );
    const assignedEmployeeText = document.getElementById(
      "assigned-employee-text"
    );

    if (assignedEmployeeBtn && assignedEmployeeMenu) {
      assignedEmployeeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = !assignedEmployeeMenu.classList.contains("opacity-0");
        if (isVisible) {
          assignedEmployeeMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
        } else {
          assignedEmployeeMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          assignedEmployeeMenu.classList.add(
            "opacity-100",
            "visible",
            "translate-y-0"
          );
        }
      });

      // Handle checkbox changes
      const checkboxes = assignedEmployeeMenu.querySelectorAll(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          e.stopPropagation();
          const selected = Array.from(checkboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.nextElementSibling.textContent.trim());
          if (selected.length > 0) {
            assignedEmployeeText.textContent = selected.join(", ");
          } else {
            const lang = document.documentElement.getAttribute("lang") || "ar";
            assignedEmployeeText.textContent =
              lang === "ar" ? "اختر الموظفين" : "Select Employees";
          }
        });
      });
    }

    // Assigned Team Dropdown
    const assignedTeamBtn = document.getElementById("assigned-team-btn");
    const assignedTeamMenu = document.getElementById("assigned-team-menu");
    const assignedTeamText = document.getElementById("assigned-team-text");

    if (assignedTeamBtn && assignedTeamMenu) {
      assignedTeamBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = !assignedTeamMenu.classList.contains("opacity-0");
        if (isVisible) {
          assignedTeamMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
        } else {
          assignedTeamMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          assignedTeamMenu.classList.add(
            "opacity-100",
            "visible",
            "translate-y-0"
          );
        }
      });

      // Handle checkbox changes
      const checkboxes = assignedTeamMenu.querySelectorAll(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          e.stopPropagation();
          const selected = Array.from(checkboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.nextElementSibling.textContent.trim());
          if (selected.length > 0) {
            assignedTeamText.textContent = selected.join(", ");
          } else {
            const lang = document.documentElement.getAttribute("lang") || "ar";
            assignedTeamText.textContent =
              lang === "ar" ? "اختر الفرق" : "Select Teams";
          }
        });
      });
    }

    // Priority Dropdown
    const priorityBtn = document.getElementById("priority-btn");
    const priorityMenu = document.getElementById("priority-menu");
    const priorityText = document.getElementById("priority-text");

    if (priorityBtn && priorityMenu) {
      priorityBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = !priorityMenu.classList.contains("opacity-0");
        if (isVisible) {
          priorityMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
        } else {
          priorityMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          priorityMenu.classList.add("opacity-100", "visible", "translate-y-0");
        }
      });

      // Handle radio changes
      const radios = priorityMenu.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
          e.stopPropagation();
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const label = radio.nextElementSibling;
          if (label) {
            priorityText.textContent = label.textContent.trim();
          }
          priorityMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
        });
      });
    }

    // Auto Reply Duration Dropdown
    const autoReplyDurationBtn = document.getElementById(
      "auto-reply-duration-btn"
    );
    const autoReplyDurationMenu = document.getElementById(
      "auto-reply-duration-menu"
    );
    const autoReplyDurationText = document.getElementById(
      "auto-reply-duration-text"
    );
    const autoReplyDurationClearBtn = document.getElementById(
      "auto-reply-duration-clear-btn"
    );

    // Track accumulated duration in minutes (make it globally accessible)
    window.accumulatedDurationMinutes = window.accumulatedDurationMinutes || 0;

    // Function to convert minutes to human-readable text
    const formatDuration = (minutes, lang) => {
      if (minutes === 0) {
        return lang === "ar" ? "اختر المدة" : "Select Duration";
      }

      const years = Math.floor(minutes / (365 * 24 * 60));
      const months = Math.floor((minutes % (365 * 24 * 60)) / (30 * 24 * 60));
      const weeks = Math.floor((minutes % (30 * 24 * 60)) / (7 * 24 * 60));
      const days = Math.floor((minutes % (7 * 24 * 60)) / (24 * 60));
      const hours = Math.floor((minutes % (24 * 60)) / 60);
      const mins = minutes % 60;

      const parts = [];

      if (lang === "ar") {
        if (years > 0) parts.push(`${years} ${years === 1 ? "سنة" : "سنة"}`);
        if (months > 0) parts.push(`${months} ${months === 1 ? "شهر" : "شهر"}`);
        if (weeks > 0)
          parts.push(`${weeks} ${weeks === 1 ? "أسبوع" : "أسبوع"}`);
        if (days > 0) parts.push(`${days} ${days === 1 ? "يوم" : "يوم"}`);
        if (hours > 0) parts.push(`${hours} ${hours === 1 ? "ساعة" : "ساعة"}`);
        if (mins > 0) parts.push(`${mins} ${mins === 1 ? "دقيقة" : "دقيقة"}`);
      } else {
        if (years > 0) parts.push(`${years} ${years === 1 ? "Year" : "Years"}`);
        if (months > 0)
          parts.push(`${months} ${months === 1 ? "Month" : "Months"}`);
        if (weeks > 0) parts.push(`${weeks} ${weeks === 1 ? "Week" : "Weeks"}`);
        if (days > 0) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);
        if (hours > 0) parts.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
        if (mins > 0)
          parts.push(`${mins} ${mins === 1 ? "Minute" : "Minutes"}`);
      }

      return parts.join(" + ");
    };

    // Function to update duration display
    const updateDurationDisplay = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      if (autoReplyDurationText) {
        autoReplyDurationText.textContent = formatDuration(
          window.accumulatedDurationMinutes,
          lang
        );
      }

      // Show/hide clear button
      if (autoReplyDurationClearBtn) {
        if (window.accumulatedDurationMinutes > 0) {
          autoReplyDurationClearBtn.classList.remove("hidden");
        } else {
          autoReplyDurationClearBtn.classList.add("hidden");
        }
      }
    };

    // Duration mapping to minutes
    const durationToMinutes = {
      "5min": 5,
      "10min": 10,
      "30min": 30,
      "1hour": 60,
      "6hours": 6 * 60,
      "12hours": 12 * 60,
      "1day": 24 * 60,
      "1week": 7 * 24 * 60,
      "1month": 30 * 24 * 60,
      "1year": 365 * 24 * 60,
    };

    if (autoReplyDurationBtn && autoReplyDurationMenu) {
      autoReplyDurationBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible =
          !autoReplyDurationMenu.classList.contains("opacity-0");
        if (isVisible) {
          autoReplyDurationMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
        } else {
          autoReplyDurationMenu.classList.remove(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
          autoReplyDurationMenu.classList.add(
            "opacity-100",
            "visible",
            "translate-y-0"
          );
        }
      });

      // Handle duration button clicks
      const durationButtons = autoReplyDurationMenu.querySelectorAll(
        "button[data-duration]"
      );
      durationButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const duration = btn.getAttribute("data-duration");
          const minutesToAdd = durationToMinutes[duration] || 0;
          window.accumulatedDurationMinutes += minutesToAdd;
          updateDurationDisplay();
          autoReplyDurationMenu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-[-10px]"
          );
        });
      });
    }

    // Setup clear button
    if (
      autoReplyDurationClearBtn &&
      !autoReplyDurationClearBtn.dataset.tooltipSetup
    ) {
      autoReplyDurationClearBtn.dataset.tooltipSetup = "true";

      // Setup tooltip for clear button
      const clearTooltip =
        autoReplyDurationClearBtn.querySelector(".tooltip-element");
      if (clearTooltip) {
        const updateClearTooltipText = () => {
          const lang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = clearTooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            const titleAr =
              autoReplyDurationClearBtn.getAttribute("data-title-ar");
            const titleEn =
              autoReplyDurationClearBtn.getAttribute("data-title-en");
            if (titleAr && titleEn) {
              tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
            }
          }
        };

        updateClearTooltipText();

        autoReplyDurationClearBtn.addEventListener("mouseenter", () => {
          clearTooltip.classList.remove("opacity-0");
          clearTooltip.classList.add("opacity-100");
          updateClearTooltipText();
        });

        autoReplyDurationClearBtn.addEventListener("mouseleave", () => {
          clearTooltip.classList.remove("opacity-100");
          clearTooltip.classList.add("opacity-0");
        });

        const tooltipObserver = new MutationObserver(() => {
          updateClearTooltipText();
        });

        tooltipObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["lang"],
        });
      }

      // Clear duration on click (only add once)
      if (!autoReplyDurationClearBtn.dataset.clickSetup) {
        autoReplyDurationClearBtn.dataset.clickSetup = "true";
        autoReplyDurationClearBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          window.accumulatedDurationMinutes = 0;
          updateDurationDisplay();
        });
      }
    }

    // Initial display update
    updateDurationDisplay();

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (
        assignedEmployeeMenu &&
        !assignedEmployeeBtn.contains(e.target) &&
        !assignedEmployeeMenu.contains(e.target)
      ) {
        assignedEmployeeMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
      }
      if (
        assignedTeamMenu &&
        !assignedTeamBtn.contains(e.target) &&
        !assignedTeamMenu.contains(e.target)
      ) {
        assignedTeamMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
      }
      if (
        priorityMenu &&
        !priorityBtn.contains(e.target) &&
        !priorityMenu.contains(e.target)
      ) {
        priorityMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
      }
      if (
        autoReplyDurationMenu &&
        autoReplyDurationBtn &&
        !autoReplyDurationBtn.contains(e.target) &&
        !autoReplyDurationMenu.contains(e.target) &&
        !document
          .getElementById("auto-reply-duration-text-btn")
          ?.contains(e.target) &&
        !document
          .getElementById("auto-reply-duration-clear-btn")
          ?.contains(e.target)
      ) {
        autoReplyDurationMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[-10px]"
        );
      }
    });

    // Update texts when language changes
    const langObserver = new MutationObserver(() => {
      const lang = document.documentElement.getAttribute("lang") || "ar";

      // Update section headers
      const sectionHeaders = document.querySelectorAll(
        ".contact-section-header h5[data-text-ar]"
      );
      sectionHeaders.forEach((header) => {
        const textAr = header.getAttribute("data-text-ar");
        const textEn = header.getAttribute("data-text-en");
        if (textAr && textEn) {
          header.textContent = lang === "ar" ? textAr : textEn;
        }
      });

      // Update labels
      const labels = document.querySelectorAll(
        "#contact-tab-details label[data-text-ar]"
      );
      labels.forEach((label) => {
        const textAr = label.getAttribute("data-text-ar");
        const textEn = label.getAttribute("data-text-en");
        if (textAr && textEn) {
          label.textContent = lang === "ar" ? textAr : textEn;
        }
      });

      // Update dropdown button texts
      if (assignedEmployeeText) {
        const textAr = assignedEmployeeText.getAttribute("data-text-ar");
        const textEn = assignedEmployeeText.getAttribute("data-text-en");
        if (
          textAr &&
          textEn &&
          !assignedEmployeeText.textContent.includes(",")
        ) {
          assignedEmployeeText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
      if (assignedTeamText) {
        const textAr = assignedTeamText.getAttribute("data-text-ar");
        const textEn = assignedTeamText.getAttribute("data-text-en");
        if (textAr && textEn && !assignedTeamText.textContent.includes(",")) {
          assignedTeamText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
      if (priorityText) {
        const textAr = priorityText.getAttribute("data-text-ar");
        const textEn = priorityText.getAttribute("data-text-en");
        if (
          textAr &&
          textEn &&
          !priorityText.textContent.includes("منخفضة") &&
          !priorityText.textContent.includes("متوسطة") &&
          !priorityText.textContent.includes("عالية") &&
          !priorityText.textContent.includes("Low") &&
          !priorityText.textContent.includes("Medium") &&
          !priorityText.textContent.includes("High")
        ) {
          priorityText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
      // Update duration display when language changes
      if (
        autoReplyDurationText &&
        window.accumulatedDurationMinutes !== undefined
      ) {
        const formatDuration = (minutes, lang) => {
          if (minutes === 0) {
            return lang === "ar" ? "اختر المدة" : "Select Duration";
          }

          const years = Math.floor(minutes / (365 * 24 * 60));
          const months = Math.floor(
            (minutes % (365 * 24 * 60)) / (30 * 24 * 60)
          );
          const weeks = Math.floor((minutes % (30 * 24 * 60)) / (7 * 24 * 60));
          const days = Math.floor((minutes % (7 * 24 * 60)) / (24 * 60));
          const hours = Math.floor((minutes % (24 * 60)) / 60);
          const mins = minutes % 60;

          const parts = [];

          if (lang === "ar") {
            if (years > 0)
              parts.push(`${years} ${years === 1 ? "سنة" : "سنة"}`);
            if (months > 0)
              parts.push(`${months} ${months === 1 ? "شهر" : "شهر"}`);
            if (weeks > 0)
              parts.push(`${weeks} ${weeks === 1 ? "أسبوع" : "أسبوع"}`);
            if (days > 0) parts.push(`${days} ${days === 1 ? "يوم" : "يوم"}`);
            if (hours > 0)
              parts.push(`${hours} ${hours === 1 ? "ساعة" : "ساعة"}`);
            if (mins > 0)
              parts.push(`${mins} ${mins === 1 ? "دقيقة" : "دقيقة"}`);
          } else {
            if (years > 0)
              parts.push(`${years} ${years === 1 ? "Year" : "Years"}`);
            if (months > 0)
              parts.push(`${months} ${months === 1 ? "Month" : "Months"}`);
            if (weeks > 0)
              parts.push(`${weeks} ${weeks === 1 ? "Week" : "Weeks"}`);
            if (days > 0) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);
            if (hours > 0)
              parts.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
            if (mins > 0)
              parts.push(`${mins} ${mins === 1 ? "Minute" : "Minutes"}`);
          }

          return parts.join(" + ");
        };

        autoReplyDurationText.textContent = formatDuration(
          window.accumulatedDurationMinutes,
          lang
        );

        // Show/hide clear button
        const autoReplyDurationClearBtn = document.getElementById(
          "auto-reply-duration-clear-btn"
        );
        if (autoReplyDurationClearBtn) {
          if (window.accumulatedDurationMinutes > 0) {
            autoReplyDurationClearBtn.classList.remove("hidden");
          } else {
            autoReplyDurationClearBtn.classList.add("hidden");
          }
        }
      }

      // Update dropdown menu items
      const durationButtons = autoReplyDurationMenu?.querySelectorAll(
        "button[data-duration]"
      );
      durationButtons?.forEach((btn) => {
        const textAr = btn.getAttribute("data-text-ar");
        const textEn = btn.getAttribute("data-text-en");
        if (textAr && textEn) {
          btn.textContent = lang === "ar" ? textAr : textEn;
        }
      });

      const priorityLabels =
        priorityMenu?.querySelectorAll("span[data-text-ar]");
      priorityLabels?.forEach((label) => {
        const textAr = label.getAttribute("data-text-ar");
        const textEn = label.getAttribute("data-text-en");
        if (textAr && textEn) {
          label.textContent = lang === "ar" ? textAr : textEn;
        }
      });
    });

    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Store messages globally
  if (!window.currentChatMessages) {
    window.currentChatMessages = [];
  }

  // Sample messages data
  const messages = [
    {
      id: 1,
      text: "مرحباً، كيف يمكنني مساعدتك؟",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أنس+اورفلي&size=32&background=0090D6&color=fff",
      time: "10:30 ص",
      type: "text",
      status: "read",
    },
    {
      id: 19,
      text: "شكراً لك على المساعدة",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:50 ص",
      type: "text",
      replyTo: {
        messageId: 1,
        text: "مرحباً، كيف يمكنني مساعدتك؟",
        sender: "me",
        senderName: "أنس اورفلي",
      },
    },
    {
      id: 2,
      text: "أحتاج مساعدة في طلبية",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:32 ص",
      type: "text",
    },
    {
      id: 3,
      text: "بالطبع، ما رقم الطلبية؟",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أنس+اورفلي&size=32&background=0090D6&color=fff",
      time: "10:33 ص",
      type: "text",
      status: "delivered",
    },
    {
      id: 4,
      text: "الرقم هو #12345",
      sender: "other",
      senderName: "محمد أحمد علي",
    },
    {
      id: 19,
      text: "شكراً لك على المساعدة",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:50 ص",
      type: "text",
      replyTo: {
        messageId: 1,
        text: "مرحباً، كيف يمكنني مساعدتك؟",
        sender: "me",
        senderName: "أنس اورفلي",
      },
    },
    {
      id: 5,
      text: "سأتحقق من الطلبية الآن",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:35 ص",
      type: "text",
    },
    {
      id: 5,
      type: "image",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:36 ص",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    },
    {
      id: 6,
      type: "video",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أنس+اورفلي&size=32&background=0090D6&color=fff",
      time: "10:37 ص",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
      duration: "2:45",
      status: "read",
    },
    {
      id: 7,
      type: "audio",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:38 ص",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "1:23",
    },
    {
      id: 8,
      type: "file",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أنس+اورفلي&size=32&background=0090D6&color=fff",
      time: "10:39 ص",
      fileName: "document.pdf",
      fileSize: "2.5 MB",
      fileType: "pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      status: "sent",
    },
    {
      id: 9,
      text: "شكراً لك على المساعدة",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:40 ص",
      type: "text",
    },
    {
      id: 10,
      type: "contact",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أنس+اورفلي&size=32&background=0090D6&color=fff",
      time: "10:41 ص",
      contactName: "أحمد محمد",
      contactPhone: "+966501234567",
      contactAvatar:
        "https://ui-avatars.com/api/?name=أحمد+محمد&size=64&background=0090D6&color=fff",
      status: "delivered",
    },
    {
      id: 11,
      type: "buttons",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:42 ص",
      text: "اختر أحد الخيارات التالية:",
      buttons: [
        { id: "btn1", text: "الخيار الأول", type: "button" },
        { id: "btn2", text: "الخيار الثاني", type: "button" },
        { id: "btn3", text: "الخيار الثالث", type: "button" },
      ],
    },
    {
      id: 12,
      type: "sticker",
      sender: "me",
      senderName: "أنس اورفلي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أنس+اورفلي&size=32&background=0090D6&color=fff",
      time: "10:43 ص",
      stickerUrl: "https://raw.githubusercontent.com/WhatsApp/stickers/main/Android/app/src/main/assets/1/01_Cuppy_smile.webp",
      status: "read",
    },
    {
      id: 13,
      type: "location",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:44 ص",
      latitude: 24.7136,
      longitude: 46.6753,
      mapUrl: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+E2062D(37.2309846,36.2064064)/37.2309846,36.2064064,15,0,30/640x360@2x?access_token=pk.eyJ1IjoibWF0dGhld21pYW8iLCJhIjoiY204ejVjdm04MDg0bTJubjQ3cjJpYzk3dCJ9.Az7UWLNeqCwPeAYZ61oKbw&logo=false&file.png",
    },
    {
      id: 14,
      type: "card",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:45 ص",
      cardImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      cardTitle: "عنوان البطاقة الرئيسي",
      cardText: "هذا نص عادي يصف محتوى البطاقة. يمكن أن يحتوي على معلومات إضافية أو تفاصيل مهمة.",
      cardFooter: "معلومات إضافية في الفوتر",
      buttons: [
        { id: "card-btn1", text: "زر 1", type: "button" },
        { id: "card-btn2", text: "زر 2", type: "button" },
        { id: "card-btn3", text: "زر 3", type: "button" },
      ],
    },
    {
      id: 16,
      type: "card",
      sender: "other",
      senderName: "سارة محمد",
      senderAvatar:
        "https://ui-avatars.com/api/?name=سارة+محمد&size=32&background=DBF3FF&color=003E5C",
      time: "10:47 ص",
      cardVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      cardVideoThumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      cardTitle: "بطاقة تحتوي على فيديو",
      cardText: "هذه بطاقة تحتوي على فيديو بدلاً من الصورة. يمكنك الضغط على الفيديو لعرضه.",
      cardFooter: "فيديو توضيحي",
      buttons: [
        { id: "card-video-btn1", text: "مشاهدة", type: "button" },
        { id: "card-video-btn2", text: "مشاركة", type: "button" },
        { id: "card-video-btn3", text: "حفظ", type: "button" },
      ],
    },
    {
      id: 17,
      type: "card",
      sender: "other",
      senderName: "أحمد خالد",
      senderAvatar:
        "https://ui-avatars.com/api/?name=أحمد+خالد&size=32&background=DBF3FF&color=003E5C",
      time: "10:48 ص",
      cardFile: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        fileName: "ملف_توضيحي.pdf",
        fileSize: "2.5 MB",
        fileType: "pdf",
      },
      cardTitle: "بطاقة تحتوي على ملف",
      cardText: "هذه بطاقة تحتوي على ملف بدلاً من الصورة. يمكنك تحميل الملف من خلال الأزرار.",
      cardFooter: "مستند PDF",
      buttons: [
        { id: "card-file-btn1", text: "تحميل", type: "button" },
        { id: "card-file-btn2", text: "معاينة", type: "button" },
        { id: "card-file-btn3", text: "مشاركة", type: "button" },
      ],
    },
    {
      id: 18,
      type: "card",
      sender: "other",
      senderName: "فاطمة علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=فاطمة+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:49 ص",
      cardLocation: {
        latitude: "24.7136",
        longitude: "46.6753",
        mapUrl: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+E2062D(37.2309846,36.2064064)/37.2309846,36.2064064,15,0,30/640x360@2x?access_token=pk.eyJ1IjoibWF0dGhld21pYW8iLCJhIjoiY204ejVjdm04MDg0bTJubjQ3cjJpYzk3dCJ9.Az7UWLNeqCwPeAYZ61oKbw&logo=false&file.png",
      },
      cardTitle: "بطاقة تحتوي على موقع",
      cardText: "هذه بطاقة تحتوي على موقع على الخريطة. يمكنك فتح الموقع في خرائط جوجل.",
      cardFooter: "موقع على الخريطة",
      buttons: [
        { id: "card-location-btn1", text: "فتح الخريطة", type: "button" },
        { id: "card-location-btn2", text: "الاتجاهات", type: "button" },
        { id: "card-location-btn3", text: "مشاركة", type: "button" },
      ],
    },
    {
      id: 15,
      type: "list",
      sender: "other",
      senderName: "محمد أحمد علي",
      senderAvatar:
        "https://ui-avatars.com/api/?name=محمد+أحمد+علي&size=32&background=DBF3FF&color=003E5C",
      time: "10:46 ص",
      listTitle: "عنوان القائمة",
      listText: "اختر من القائمة التالية:",
      listFooter: "انقر على الزر لفتح القائمة",
      buttonText: "عرض الخيارات",
      listItems: [
        { id: "item1", title: "الخيار الأول", description: "وصف الخيار الأول" },
        { id: "item2", title: "الخيار الثاني", description: "وصف الخيار الثاني" },
        { id: "item3", title: "الخيار الثالث", description: "وصف الخيار الثالث" },
        { id: "item4", title: "الخيار الرابع", description: "وصف الخيار الرابع" },
        { id: "item5", title: "الخيار الخامس", description: "وصف الخيار الخامس" },
        { id: "item6", title: "الخيار السادس", description: "وصف الخيار السادس" },
        { id: "item7", title: "الخيار السابع", description: "وصف الخيار السابع" },
        { id: "item8", title: "الخيار الثامن", description: "وصف الخيار الثامن" },
        { id: "item9", title: "الخيار التاسع", description: "وصف الخيار التاسع" },
        { id: "item10", title: "الخيار العاشر", description: "وصف الخيار العاشر" },
      ],
    },
  ];

  // Store messages in global variable
  if (!window.currentChatMessages) {
    window.currentChatMessages = [];
  }
  window.currentChatMessages = messages;

  // Update messages content
  if (messagesContent) {
    renderMessages(messages, messagesContent);
  }

  // Ensure message input is visible (already shown above, but double-check)
  if (messageInputContainer) {
    messageInputContainer.classList.remove("hidden");
    // Also ensure display is not set to none
    messageInputContainer.style.display = "";
  }

  // Setup message tabs
  if (typeof setupMessageTabs === "function") {
    setupMessageTabs();
  }
}

// Function to render messages
function renderMessages(messages, messagesContent) {
  if (!messagesContent || !messages) return;
  
  const lang = document.documentElement.getAttribute("lang") || "ar";
  const messagesHTML = messages
    .map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        const isMe = message.sender === "me";
        const messageAlign = isMe ? "justify-end" : "justify-start";
        const messageBg = isMe
          ? "text-white"
          : "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600";
        const messageBgColor = isMe ? 'style="background-color: #0090D6"' : "";
        const timeColor = isMe
          ? "opacity-70"
          : "text-slate-500 dark:text-slate-400";

        // Function to get message status icon
        const getMessageStatusIcon = (status) => {
          if (!isMe || !status) return "";
          const lang = document.documentElement.getAttribute("lang") || "ar";
          let statusText = "";
          if (status === "sent") {
            statusText = lang === "ar" ? "تم الإرسال" : "Sent";
            return `<div class="message-status-container relative inline-flex items-center">
              <i class="hgi-stroke hgi-tick-02 text-s message-status-icon" data-status="${status}" data-text-ar="تم الإرسال" data-text-en="Sent"></i>
              <div class="message-status-tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${statusText}</span>
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
              </div>
            </div>`;
          } else if (status === "delivered") {
            statusText = lang === "ar" ? "تم التسليم" : "Delivered";
            return `<div class="message-status-container relative inline-flex items-center">
              <i class="hgi-stroke hgi-tick-double-02 text-s message-status-icon" data-status="${status}" data-text-ar="تم التسليم" data-text-en="Delivered"></i>
              <div class="message-status-tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${statusText}</span>
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
              </div>
            </div>`;
          } else if (status === "read") {
            statusText = lang === "ar" ? "تمت القراءة" : "Read";
            return `<div class="message-status-container relative inline-flex items-center">
              <i class="hgi-stroke hgi-tick-double-02 text-s message-status-icon" data-status="${status}" data-text-ar="تمت القراءة" data-text-en="Read" style="color:#00FF00"></i>
              <div class="message-status-tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${statusText}</span>
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
              </div>
            </div>`;
          }
          return "";
        };

        // Text message
        if (message.type === "text" || !message.type) {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;
          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;
          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%] min-w-0 ${messageBg} rounded-lg relative" ${messageBgColor} style="word-break: break-word; overflow-wrap: break-word; overflow: visible;">
                ${message.replyTo ? `
                  <div class="mb-2 px-3 pt-2 pb-1 border-s-2 ${isMe ? "border-blue-500" : "border-slate-400 dark:border-slate-500"} bg-slate-50 dark:bg-slate-800/50 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 reply-preview" data-reply-to-id="${message.replyTo.messageId || ""}">
                    <div class="flex items-center gap-1.5 mb-0.5">
                      <span class="text-xs font-medium ${isMe ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}">
                        ${message.replyTo.senderName || (message.replyTo.sender === "me" ? "أنت" : "مستخدم")}
                      </span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 truncate">
                      ${message.replyTo.text || ""}
                    </p>
                  </div>
                ` : ""}
                <div class="px-4 ${message.replyTo ? "pt-2" : "pt-3"}">
                  <p class="text-sm break-words">${message.text || ""}</p>
                </div>
                <div class="px-4 pb-2 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    ${getMessageStatusIcon(message.status)}
                    <span class="text-xs ${timeColor}">${message.time}</span>
                  </div>
                  ${messageActionsHtml}
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Image message
        if (message.type === "image") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;
          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          // Reply preview HTML for image messages
          const replyPreviewHtml = message.replyTo ? `
            <div class="mb-2 px-3 pt-2 pb-1 border-s-2 ${isMe ? "border-blue-500" : "border-slate-400 dark:border-slate-500"} bg-slate-50 dark:bg-slate-800/50 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 reply-preview" data-reply-to-id="${message.replyTo.messageId || ""}">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-xs font-medium ${isMe ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}">
                  ${message.replyTo.senderName || (message.replyTo.sender === "me" ? "أنت" : "مستخدم")}
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 truncate">
                ${message.replyTo.text || ""}
              </p>
            </div>
          ` : "";

          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[300px] min-w-[300px] ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
                ${replyPreviewHtml}
                <div class="relative overflow-hidden rounded-lg p-1.5">
                  <img
                    src="${message.url}"
                    alt="${message.caption || ""}"
                    class="w-full h-auto max-h-80 object-cover cursor-pointer media-preview-trigger rounded"
                    data-media-type="image"
                    data-media-url="${message.url}"
                    onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'"
                  />
                  ${
                    message.caption
                      ? `<p class="text-sm px-4 py-2">${message.caption}</p>`
                      : ""
                  }
                </div>
                <div class="px-4 pb-2 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    ${getMessageStatusIcon(message.status)}
                    <span class="text-xs ${timeColor}">${message.time}</span>
                  </div>
                  ${messageActionsHtml}
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Video message
        if (message.type === "video") {
          // Reply preview HTML for video messages
          const replyPreviewHtml = message.replyTo ? `
            <div class="mb-2 px-3 pt-2 pb-1 border-s-2 ${isMe ? "border-blue-500" : "border-slate-400 dark:border-slate-500"} bg-slate-50 dark:bg-slate-800/50 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 reply-preview" data-reply-to-id="${message.replyTo.messageId || ""}">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-xs font-medium ${isMe ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}">
                  ${message.replyTo.senderName || (message.replyTo.sender === "me" ? "أنت" : "مستخدم")}
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 truncate">
                ${message.replyTo.text || ""}
              </p>
            </div>
          ` : "";

          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;
          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;
          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[300px] min-w-[300px] ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
                ${replyPreviewHtml}
                <div class="relative overflow-hidden rounded-lg p-1.5">
                  <video
                    class="w-full h-auto max-h-64 sm:max-h-72 md:max-h-80 object-contain rounded"
                    poster="${message.thumbnail || ""}"
                    controls
                    preload="metadata"
                  >
                    <source src="${message.url}" type="video/mp4" />
                  </video>
                  ${
                    message.caption
                      ? `<p class="text-sm px-4 py-2">${message.caption}</p>`
                      : ""
                  }
                </div>
                <div class="px-4 pb-2 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    ${getMessageStatusIcon(message.status)}
                    <span class="text-xs ${timeColor}">${message.time}</span>
                  </div>
                  ${messageActionsHtml}
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Audio message
        if (message.type === "audio") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;
          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          // Reply preview HTML for audio messages
          const replyPreviewHtml = message.replyTo ? `
            <div class="mb-2 px-3 pt-2 pb-1 border-s-2 ${isMe ? "border-blue-500" : "border-slate-400 dark:border-slate-500"} bg-slate-50 dark:bg-slate-800/50 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 reply-preview" data-reply-to-id="${message.replyTo.messageId || ""}">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-xs font-medium ${isMe ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}">
                  ${message.replyTo.senderName || (message.replyTo.sender === "me" ? "أنت" : "مستخدم")}
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 truncate">
                ${message.replyTo.text || ""}
              </p>
            </div>
          ` : "";

          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} group" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[300px] min-w-[300px] ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
                ${replyPreviewHtml}
                <div class="px-4 ${message.replyTo ? "pt-2" : "pt-3"}">
                  <div class="flex items-center gap-3">
                    <audio
                      class="flex-1"
                      controls
                      preload="metadata"
                    >
                      <source src="${message.url}" type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
                <div class="px-4 pb-2 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    ${getMessageStatusIcon(message.status)}
                    <span class="text-xs ${timeColor}">${message.time}</span>
                  </div>
                  ${messageActionsHtml}
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // File message
        if (message.type === "file") {
          // Reply preview HTML for file messages
          const replyPreviewHtml = message.replyTo ? `
            <div class="mb-2 px-3 pt-2 pb-1 border-s-2 ${isMe ? "border-blue-500" : "border-slate-400 dark:border-slate-500"} bg-slate-50 dark:bg-slate-800/50 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 reply-preview" data-reply-to-id="${message.replyTo.messageId || ""}">
              <div class="flex items-center gap-1.5 mb-0.5">
                <span class="text-xs font-medium ${isMe ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}">
                  ${message.replyTo.senderName || (message.replyTo.sender === "me" ? "أنت" : "مستخدم")}
                </span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 truncate">
                ${message.replyTo.text || ""}
              </p>
            </div>
          ` : "";

          const fileIcons = {
            pdf: "hgi-file-01",
            doc: "hgi-file-doc",
            docx: "hgi-file-doc",
            xls: "hgi-file-xls",
            xlsx: "hgi-file-xls",
            txt: "hgi-file-01",
            zip: "hgi-file-zip",
            default: "hgi-file-01",
          };
          const fileExt = message.fileType || "default";
          const fileIcon = fileIcons[fileExt] || fileIcons.default;
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;
          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[300px] min-w-[300px] ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
                ${replyPreviewHtml}
                <div class="relative overflow-visible rounded-lg p-1.5">
                  <div class="flex items-center gap-3 p-3 rounded-lg ${
                    isMe 
                      ? "bg-white/10 dark:bg-white/10" 
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600"
                  }">
                    <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-600 flex-shrink-0">
                      <i class="hgi-stroke ${fileIcon} text-2xl ${
            isMe ? "text-slate-900" : "text-slate-700 dark:text-slate-300"
          }"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium truncate">${
                        message.fileName || "file"
                      }</p>
                      <p class="text-xs ${timeColor} mt-0.5">${
            message.fileSize || ""
          }</p>
                    </div>
                    <button
                      class="message-download-btn w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 flex-shrink-0"
                      data-url="${message.url || "#"}"
                      data-file-name="${message.fileName || "file"}"
                      data-title-ar="تحميل"
                      data-title-en="Download"
                      type="button"
                    >
                      <i class="hgi-stroke hgi-download-01 text-lg ${
                        isMe ? "text-white" : "text-slate-600 dark:text-slate-400"
                      }"></i>
                    </button>
                  </div>
                </div>
                <div class="px-4 pb-2 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    ${getMessageStatusIcon(message.status)}
                    <span class="text-xs ${timeColor}">${message.time}</span>
                  </div>
                  ${messageActionsHtml}
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Contact message
        if (message.type === "contact") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[300px] min-w-[300px] ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
                <div class="relative overflow-visible rounded-lg p-1.5">
                  <div class="flex items-center gap-3 p-3 rounded-lg ${
                    isMe 
                      ? "bg-white/10 dark:bg-white/10" 
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600"
                  }">
                    <div class="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden">
                      <img
                        src="${message.contactAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.contactName || "Contact")}&size=48&background=0090D6&color=fff`}"
                        alt="${message.contactName || ""}"
                        class="w-full h-full object-cover"
                        onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(message.contactName || "Contact")}&size=48&background=0090D6&color=fff'"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium truncate ${
                        isMe ? "text-white" : "text-slate-900 dark:text-slate-100"
                      }">${message.contactName || ""}</p>
                      <p class="text-xs truncate ${
                        isMe ? "text-white opacity-80" : "text-slate-600 dark:text-slate-300"
                      }">${message.contactPhone || ""}</p>
                    </div>
                    <button
                      class="contact-save-btn w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 flex-shrink-0 ${
                        isMe ? "hover:bg-white/20" : ""
                      }"
                      data-contact-name="${message.contactName || ""}"
                      data-contact-phone="${message.contactPhone || ""}"
                      data-title-ar="حفظ جهة الاتصال"
                      data-title-en="Save Contact"
                      type="button"
                    >
                      <i class="hgi-stroke hgi-user-add-01 text-lg ${
                        isMe ? "text-white opacity-80" : "text-slate-600 dark:text-slate-400"
                      }"></i>
                    </button>
                  </div>
                </div>
                <div class="px-4 pb-2 flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    ${getMessageStatusIcon(message.status)}
                    <span class="text-xs ${timeColor}">${message.time}</span>
                  </div>
                  ${messageActionsHtml}
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Message with buttons
        if (message.type === "buttons") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          return `
            <div class="group flex items-start gap-2 ${messageAlign} ${isLastMessage ? "" : "mb-4"}" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="flex flex-col max-w-[300px] min-w-[300px] ${
                isMe ? "items-end" : "items-start"
              }" style="overflow: visible;">
                <div class="rounded-lg w-full ${messageBg}" ${messageBgColor} style="overflow: visible;">
                  <div class="px-4 pt-3">
                    <p class="text-sm mb-3 ${
                      isMe ? "text-white" : "text-slate-900 dark:text-slate-100"
                    }">${message.text || ""}</p>
                    <div class="flex flex-col gap-2">
                      ${(message.buttons || [])
                        .map(
                          (btn) => `
                        <button
                          class="message-button-btn w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                            isMe
                              ? "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                              : "bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-500"
                          }"
                          data-button-id="${btn.id}"
                          data-message-id="${message.id}"
                          type="button"
                        >
                          ${btn.text}
                        </button>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                  <div class="px-4 pb-2 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      ${getMessageStatusIcon(message.status)}
                      <span class="text-xs ${timeColor}">${message.time}</span>
                    </div>
                    ${messageActionsHtml}
                  </div>
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Sticker message
        if (message.type === "sticker") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          return `
            <div class="group flex items-start gap-2 ${messageAlign} ${isLastMessage ? "" : "mb-4"}" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="flex flex-col max-w-fit ${
                isMe ? "items-end" : "items-start"
              }" style="overflow: visible;">
                <div class="rounded-lg ${messageBg}" ${messageBgColor} style="overflow: visible;">
                  <div class="rounded-lg overflow-hidden">
                    <div class="flex items-center justify-center p-2">
                      <img
                        src="${message.stickerUrl || "https://via.placeholder.com/200x200"}"
                        alt="Sticker"
                        class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                        style="max-width: 200px; max-height: 200px;"
                      />
                    </div>
                  </div>
                  <div class="px-4 pb-2 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      ${getMessageStatusIcon(message.status)}
                      <span class="text-xs ${timeColor}">${message.time}</span>
                    </div>
                    ${messageActionsHtml}
                  </div>
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Location message
        if (message.type === "location") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          return `
            <div class="group flex items-start gap-2 ${messageAlign} ${isLastMessage ? "" : "mb-4"}" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="flex flex-col max-w-[300px] min-w-[300px] ${
                isMe ? "items-end" : "items-start"
              }" style="overflow: visible;">
                <div class="rounded-lg w-full ${messageBg}" ${messageBgColor} style="overflow: visible;">
                  <div class="relative overflow-hidden rounded-lg p-1.5">
                    <img
                      src="${message.mapUrl || "https://via.placeholder.com/400x200/0090D6/FFFFFF?text=Map"}"
                      alt="Location"
                      class="w-full h-32 sm:h-36 md:h-40 object-cover rounded"
                      data-latitude="${message.latitude || ""}"
                      data-longitude="${message.longitude || ""}"
                    />
                  </div>
                  <div class="px-4 pb-2 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      ${getMessageStatusIcon(message.status)}
                      <span class="text-xs ${timeColor}">${message.time}</span>
                    </div>
                    ${messageActionsHtml}
                  </div>
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // Card message
        if (message.type === "card") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          return `
            <div class="group flex items-start gap-2 ${messageAlign} ${isLastMessage ? "" : "mb-4"}" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="flex flex-col max-w-[300px] min-w-[300px] ${
                isMe ? "items-end" : "items-start"
              }" style="overflow: visible;">
                <div class="rounded-lg ${messageBg}" ${messageBgColor} style="overflow: visible;">
                  ${
                    message.cardVideo
                      ? `
                      <div class="relative overflow-hidden rounded-lg p-1.5">
                        <video
                          class="w-full h-auto max-h-64 sm:max-h-72 md:max-h-80 object-contain rounded"
                          controls
                          preload="metadata"
                        >
                          <source src="${message.cardVideo}" type="video/mp4" />
                        </video>
                      </div>
                    `
                      : message.cardFile
                      ? `
                      <div class="relative overflow-visible rounded-lg p-1.5">
                        <div class="flex items-center gap-3 p-3 rounded-lg ${
                          isMe 
                            ? "bg-white/10 dark:bg-white/10" 
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600"
                        }">
                          <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-600 flex-shrink-0">
                            <i class="hgi-stroke ${
                              (() => {
                                const fileIcons = {
                                  pdf: "hgi-file-01",
                                  doc: "hgi-file-doc",
                                  docx: "hgi-file-doc",
                                  xls: "hgi-file-xls",
                                  xlsx: "hgi-file-xls",
                                  txt: "hgi-file-01",
                                  zip: "hgi-file-zip",
                                  default: "hgi-file-01",
                                };
                                const fileExt = message.cardFile.fileType || "default";
                                return fileIcons[fileExt] || fileIcons.default;
                              })()
                            } text-2xl ${
                              isMe ? "text-slate-900" : "text-slate-700 dark:text-slate-300"
                            }"></i>
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium truncate">${
                              message.cardFile.fileName || "file"
                            }</p>
                            <p class="text-xs ${timeColor} mt-0.5">${
                              message.cardFile.fileSize || ""
                            }</p>
                          </div>
                          <button
                            class="message-download-btn w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 flex-shrink-0"
                            data-url="${message.cardFile.url || "#"}"
                            data-file-name="${message.cardFile.fileName || "file"}"
                            data-title-ar="تحميل"
                            data-title-en="Download"
                            type="button"
                          >
                            <i class="hgi-stroke hgi-download-01 text-lg ${
                              isMe ? "text-white" : "text-slate-600 dark:text-slate-400"
                            }"></i>
                          </button>
                        </div>
                      </div>
                    `
                      : message.cardLocation
                      ? `
                      <div class="relative overflow-hidden rounded-lg p-1.5">
                        <img
                          src="${message.cardLocation.mapUrl || "https://via.placeholder.com/400x200/0090D6/FFFFFF?text=Map"}"
                          alt="Location"
                          class="w-full h-32 sm:h-36 md:h-40 object-cover rounded"
                          data-latitude="${message.cardLocation.latitude || ""}"
                          data-longitude="${message.cardLocation.longitude || ""}"
                          style="display: block;"
                          onerror="this.src='https://via.placeholder.com/400x200/0090D6/FFFFFF?text=Map'"
                        />
                      </div>
                    `
                      : `
                      <div class="relative overflow-hidden rounded-lg p-1.5">
                        <img
                          src="${message.cardImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"}"
                          alt="Card"
                          class="w-full h-auto max-h-48 object-cover cursor-pointer media-preview-trigger rounded"
                          data-media-type="image"
                          data-media-url="${message.cardImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"}"
                          style="display: block;"
                          onerror="this.src='https://via.placeholder.com/400x200?text=Image+Error'"
                        />
                      </div>
                    `
                  }
                  <div class="px-4 py-3">
                    <h3 class="text-sm font-semibold mb-2 ${
                      isMe ? "text-white" : "text-slate-900 dark:text-slate-100"
                    }">${message.cardTitle || ""}</h3>
                    <p class="text-sm mb-3 ${
                      isMe ? "text-white opacity-90" : "text-slate-700 dark:text-slate-300"
                    }">${message.cardText || ""}</p>
                    <div class="border-t ${
                      isMe ? "border-white/20" : "border-slate-200 dark:border-slate-600"
                    } pt-3 mb-3">
                      <p class="text-xs ${
                        isMe ? "text-white opacity-70" : "text-slate-500 dark:text-slate-400"
                      }">${message.cardFooter || ""}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                      ${(message.buttons || [])
                        .map(
                          (btn) => `
                        <button
                          class="message-button-btn w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                            isMe
                              ? "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                              : "bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-500"
                          }"
                          data-button-id="${btn.id}"
                          data-message-id="${message.id}"
                          type="button"
                        >
                          ${btn.text}
                        </button>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                  <div class="px-4 pb-2 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      ${getMessageStatusIcon(message.status)}
                      <span class="text-xs ${timeColor}">${message.time}</span>
                    </div>
                    ${messageActionsHtml}
                  </div>
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        // List message
        if (message.type === "list") {
          const avatarHtml = `
            <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
              <img
                src="${
                  message.senderAvatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    message.senderName || "User"
                  )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
                    isMe ? "fff" : "003E5C"
                  }`
                }"
                alt="${message.senderName || ""}"
                class="w-full h-full rounded-full object-cover cursor-pointer"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
                  message.senderName || "User"
                )}&size=24&background=${isMe ? "0090D6" : "DBF3FF"}&color=${
            isMe ? "fff" : "003E5C"
          }'"
                data-sender-name="${message.senderName || ""}"
              />
              <div class="message-avatar-tooltip absolute top-1/2 -translate-y-1/2 ${
                isMe ? "left-full ms-2" : "right-full me-2"
              } bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg">
                <span class="tooltip-text">${message.senderName || ""}</span>
                <div class="absolute top-1/2 -translate-y-1/2 ${
                  isMe ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                } border-[4px] border-transparent ${
            isMe
              ? "border-l-slate-900 dark:border-l-slate-700"
              : "border-r-slate-900 dark:border-r-slate-700"
          }"></div>
              </div>
            </div>
          `;

          const messageActionsHtml = `
            <div class="message-actions-container relative">
              <button
                class="message-actions-btn w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                data-message-id="${message.id}"
                type="button"
              >
                <i class="hgi-stroke hgi-more-vertical text-sm ${
                  isMe
                    ? "text-white opacity-70"
                    : "text-slate-600 dark:text-slate-400"
                }"></i>
              </button>
              <div
                class="message-actions-menu absolute ${
                  isMe ? "left-full ms-2" : "right-full me-2"
                } top-0 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible translate-y-[-10px] transition-all duration-200 z-[100]"
                data-message-id="${message.id}"
              >
                <div class="py-1">
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="reply"
                    data-message-id="${message.id}"
                    data-text-ar="رد"
                    data-text-en="Reply"
                  >
                    <i class="hgi-stroke hgi-arrow-move-up-left text-sm" style="color: #0090d6"></i>
                    <span>رد</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="copy"
                    data-message-id="${message.id}"
                    data-text-ar="نسخ"
                    data-text-en="Copy"
                  >
                    <i class="hgi-stroke hgi-copy-01 text-sm" style="color: #0090d6"></i>
                    <span>نسخ</span>
                  </button>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-start flex items-center gap-2 rounded"
                    data-action="react"
                    data-message-id="${message.id}"
                    data-text-ar="تفاعل"
                    data-text-en="React"
                  >
                    <i class="hgi-stroke hgi-smile text-sm" style="color: #0090d6"></i>
                    <span>تفاعل</span>
                  </button>
                  <div class="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    class="message-action-btn w-full px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-start flex items-center gap-2 rounded"
                    data-action="delete"
                    data-message-id="${message.id}"
                    data-text-ar="حذف"
                    data-text-en="Delete"
                  >
                    <i class="hgi-stroke hgi-delete-02 text-sm"></i>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          return `
            <div class="group flex items-start gap-2 ${messageAlign} ${isLastMessage ? "" : "mb-4"}" data-message-id="${message.id}">
              ${!isMe ? avatarHtml : ""}
              <div class="flex flex-col max-w-[300px] min-w-[300px] ${
                isMe ? "items-end" : "items-start"
              }" style="overflow: visible;">
                <div class="rounded-lg w-full px-4 py-3 ${messageBg}" ${messageBgColor} style="overflow: visible;">
                  <h3 class="text-sm font-semibold mb-2 ${
                    isMe ? "text-white" : "text-slate-900 dark:text-slate-100"
                  }">${message.listTitle || ""}</h3>
                  <p class="text-sm mb-3 ${
                    isMe ? "text-white opacity-90" : "text-slate-700 dark:text-slate-300"
                  }">${message.listText || ""}</p>
                  <div class="border-t ${
                    isMe ? "border-white/20" : "border-slate-200 dark:border-slate-600"
                  } pt-3 mb-3">
                    <p class="text-xs ${
                      isMe ? "text-white opacity-70" : "text-slate-500 dark:text-slate-400"
                    }">${message.listFooter || ""}</p>
                  </div>
                  <button
                    class="message-list-btn w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isMe
                        ? "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                        : "bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-500"
                    }"
                    data-message-id="${message.id}"
                    data-list-id="list-${message.id}"
                    type="button"
                  >
                    ${message.buttonText || "عرض الخيارات"}
                  </button>
                  <div
                    id="list-${message.id}"
                    class="message-list-menu hidden mt-2 rounded-lg overflow-hidden border ${
                      isMe
                        ? "border-white/30 bg-white/10"
                        : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
                    }"
                  >
                    <div class="max-h-64 overflow-y-auto">
                      ${(message.listItems || [])
                        .map(
                          (item, idx) => `
                        <button
                          class="message-list-item w-full px-4 py-3 text-start border-b ${
                            isMe
                              ? "border-white/20 hover:bg-white/10 text-white"
                              : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100"
                          } ${
                            idx === (message.listItems || []).length - 1 ? "border-b-0" : ""
                          } transition-colors duration-150"
                          data-item-id="${item.id}"
                          data-message-id="${message.id}"
                          type="button"
                        >
                          <p class="text-sm font-medium">${item.title || ""}</p>
                        </button>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                  <div class="px-4 pb-2 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      ${getMessageStatusIcon(message.status)}
                      <span class="text-xs ${timeColor}">${message.time}</span>
                    </div>
                    ${messageActionsHtml}
                  </div>
                </div>
              </div>
              ${isMe ? avatarHtml : ""}
            </div>
          `;
        }

        return "";
      })
      .join("");

  // Set innerHTML after generating all HTML
  messagesContent.innerHTML = messagesHTML;

  // Setup message controls
  if (typeof setupMessageControls === "function") {
    setupMessageControls();
  }

  // Set default position for last message menu (bottom-0)
  const allMessages = messagesContent.querySelectorAll(".group");
  if (allMessages.length > 0) {
    const lastMessage = allMessages[allMessages.length - 1];
    const lastMessageMenu = lastMessage.querySelector(".message-actions-menu");
    if (lastMessageMenu) {
      // Set default position to bottom-0 for last message
      lastMessageMenu.classList.remove("top-0");
      lastMessageMenu.classList.add("bottom-0");
      lastMessageMenu.style.top = "";
      lastMessageMenu.style.bottom = "0";
      // Update translate-y for bottom position
      lastMessageMenu.classList.remove("translate-y-[-10px]");
      lastMessageMenu.classList.add("translate-y-[10px]");
    }
  }

  // Setup media preview
  if (typeof setupMediaPreview === "function") {
    setupMediaPreview();
  }

  // Setup avatar tooltips
  if (typeof setupAvatarTooltips === "function") {
    setupAvatarTooltips();
  }

  // Setup status tooltips
  if (typeof setupStatusTooltips === "function") {
    setupStatusTooltips();
  }

  // Update message reactions for all messages
  if (typeof messageReactions !== "undefined" && typeof updateMessageReactions === "function") {
    messages.forEach((message) => {
      if (messageReactions[message.id]) {
        updateMessageReactions(message.id);
      }
    });
  }

  // Setup reply preview click handlers
  setupReplyPreviewHandlers();
}

// Function to setup reply preview click handlers
function setupReplyPreviewHandlers() {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Remove existing listeners to avoid duplicates
  const existingPreviews = messagesContent.querySelectorAll(".reply-preview");
  existingPreviews.forEach((preview) => {
    const newPreview = preview.cloneNode(true);
    preview.parentNode.replaceChild(newPreview, preview);
  });

  // Add click listeners to all reply previews
  const replyPreviews = messagesContent.querySelectorAll(".reply-preview");
  replyPreviews.forEach((preview) => {
    preview.addEventListener("click", (e) => {
      e.stopPropagation();
      const replyToId = preview.getAttribute("data-reply-to-id");
      if (replyToId) {
        scrollToRepliedMessage(replyToId);
      }
    });
  });
}

// Function to scroll to replied message
function scrollToRepliedMessage(messageId) {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Find the message element
  const targetMessage = messagesContent.querySelector(`[data-message-id="${messageId}"]`);
  if (!targetMessage) return;

  // Remove previous highlight
  const previousHighlight = messagesContent.querySelector(".message-highlight");
  if (previousHighlight) {
    previousHighlight.classList.remove("message-highlight");
    previousHighlight.style.transition = "";
    previousHighlight.style.boxShadow = "";
  }

  // Add highlight class
  targetMessage.classList.add("message-highlight");
  targetMessage.style.transition = "box-shadow 0.3s ease-in-out";
  targetMessage.style.boxShadow = "0 0 0 3px rgba(0, 144, 214, 0.5)";

  // Scroll to message
  const containerRect = messagesContent.getBoundingClientRect();
  const messageRect = targetMessage.getBoundingClientRect();
  const scrollTop = messagesContent.scrollTop;
  const messageTop = messageRect.top - containerRect.top + scrollTop;

  messagesContent.scrollTo({
    top: messageTop - 20, // Add some padding
    behavior: "smooth",
  });

  // Remove highlight after 2 seconds
  setTimeout(() => {
    if (targetMessage.classList.contains("message-highlight")) {
      targetMessage.classList.remove("message-highlight");
      targetMessage.style.transition = "";
      targetMessage.style.boxShadow = "";
    }
  }, 2000);
}

// Function to setup message controls (download and actions)
function setupMessageControls() {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Setup message actions buttons
  const messageActionsButtons = messagesContent.querySelectorAll(
    ".message-actions-btn"
  );
  messageActionsButtons.forEach((btn) => {
    const messageId = btn.getAttribute("data-message-id");
    const menu = messagesContent.querySelector(
      `.message-actions-menu[data-message-id="${messageId}"]`
    );
    if (!menu) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = menu.classList.contains("opacity-0");

      // Close all other menus
      const allMenus = messagesContent.querySelectorAll(
        ".message-actions-menu"
      );
      allMenus.forEach((m) => {
        if (m !== menu) {
          m.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
          m.classList.remove("opacity-100", "visible", "translate-y-0", "bottom-0", "top-0", "translate-y-[10px]");
          m.style.top = "";
          m.style.bottom = "";
        }
      });

      if (isVisible) {
        // Check if this is the last message in messages-content
        const messageElement = btn.closest(".group");
        if (messageElement) {
          const allMessages = messagesContent.querySelectorAll(".group");
          const isLastMessage = messageElement === allMessages[allMessages.length - 1];
          
          if (isLastMessage) {
            // Show menu above (bottom-0)
            menu.classList.remove("top-0");
            menu.classList.add("bottom-0");
            menu.style.top = "";
            menu.style.bottom = "0";
            menu.classList.remove("opacity-0", "invisible", "translate-y-[10px]");
            menu.classList.add("opacity-100", "visible", "translate-y-0");
          } else {
            // Show menu below (top-0)
            menu.classList.remove("bottom-0");
            menu.classList.add("top-0");
            menu.style.bottom = "";
            menu.style.top = "0";
            menu.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
            menu.classList.add("opacity-100", "visible", "translate-y-0");
          }
        } else {
          // Default: show below
          menu.classList.remove("bottom-0");
          menu.classList.add("top-0");
          menu.style.bottom = "";
          menu.style.top = "0";
          menu.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
          menu.classList.add("opacity-100", "visible", "translate-y-0");
        }
      } else {
        // Close menu
        if (menu.classList.contains("bottom-0")) {
          menu.classList.add("opacity-0", "invisible", "translate-y-[10px]");
          menu.classList.remove("opacity-100", "visible", "translate-y-0");
        } else {
          menu.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
          menu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".message-actions-container")) {
      const allMenus = messagesContent.querySelectorAll(
        ".message-actions-menu"
      );
      allMenus.forEach((menu) => {
        if (menu.classList.contains("bottom-0")) {
          menu.classList.add("opacity-0", "invisible", "translate-y-[10px]");
          menu.classList.remove("opacity-100", "visible", "translate-y-0");
        } else {
          menu.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
          menu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      });
    }
  });

  // Setup action buttons
  const actionButtons = messagesContent.querySelectorAll(".message-action-btn");
  actionButtons.forEach((btn) => {
    const action = btn.getAttribute("data-action");
    const messageId = btn.getAttribute("data-message-id");
    const menu = messagesContent.querySelector(
      `.message-actions-menu[data-message-id="${messageId}"]`
    );

    // Update button text based on language
    const updateButtonText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const textAr = btn.getAttribute("data-text-ar");
      const textEn = btn.getAttribute("data-text-en");
      const span = btn.querySelector("span");
      if (span && textAr && textEn) {
        span.textContent = lang === "ar" ? textAr : textEn;
      }
    };

    updateButtonText();

    // Observe language changes
    const langObserver = new MutationObserver(() => {
      updateButtonText();
    });
    langObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Handle different actions
      if (action === "reply") {
        handleReply(messageId);
      } else if (action === "copy") {
        handleCopy(messageId);
      } else if (action === "react") {
        handleReact(messageId, btn, e);
      } else if (action === "delete") {
        console.log("Delete message", messageId);
        // TODO: Implement delete functionality
      }

      // Close menu after action
      if (menu) {
        if (menu.classList.contains("bottom-0")) {
          menu.classList.add("opacity-0", "invisible", "translate-y-[10px]");
          menu.classList.remove("opacity-100", "visible", "translate-y-0");
        } else {
          menu.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
          menu.classList.remove("opacity-100", "visible", "translate-y-0");
        }
      }
    });
  });

  // Setup download buttons
  const downloadButtons = messagesContent.querySelectorAll(
    ".message-download-btn"
  );
  downloadButtons.forEach((btn) => {
    // Setup tooltip
    const tooltip = document.createElement("div");
    tooltip.className =
      "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
    tooltip.innerHTML = `
      <span class="tooltip-text"></span>
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
    `;
    btn.style.position = "relative";
    btn.appendChild(tooltip);

    const updateTooltipText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const tooltipText = tooltip.querySelector(".tooltip-text");
      if (tooltipText) {
        const titleAr = btn.getAttribute("data-title-ar");
        const titleEn = btn.getAttribute("data-title-en");
        if (titleAr && titleEn) {
          tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
        }
      }
    };

    updateTooltipText();

    btn.addEventListener("mouseenter", () => {
      tooltip.classList.remove("opacity-0");
      tooltip.classList.add("opacity-100");
      updateTooltipText();
    });

    btn.addEventListener("mouseleave", () => {
      tooltip.classList.remove("opacity-100");
      tooltip.classList.add("opacity-0");
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = btn.getAttribute("data-url");
      const fileName = btn.getAttribute("data-file-name") || "download";
      if (url && url !== "#") {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });

    const tooltipObserver = new MutationObserver(() => {
      updateTooltipText();
    });

    tooltipObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  });

  // Setup contact save buttons
  const contactSaveButtons = messagesContent.querySelectorAll(
    ".contact-save-btn"
  );
  contactSaveButtons.forEach((btn) => {
    // Setup tooltip
    const tooltip = document.createElement("div");
    tooltip.className =
      "tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-150 z-[100] shadow-lg";
    tooltip.innerHTML = `
      <span class="tooltip-text"></span>
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
    `;
    btn.style.position = "relative";
    btn.appendChild(tooltip);

    const updateTooltipText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const tooltipText = tooltip.querySelector(".tooltip-text");
      if (tooltipText) {
        const titleAr = btn.getAttribute("data-title-ar");
        const titleEn = btn.getAttribute("data-title-en");
        if (titleAr && titleEn) {
          tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
        }
      }
    };

    updateTooltipText();

    btn.addEventListener("mouseenter", () => {
      tooltip.classList.remove("opacity-0");
      tooltip.classList.add("opacity-100");
      updateTooltipText();
    });

    btn.addEventListener("mouseleave", () => {
      tooltip.classList.remove("opacity-100");
      tooltip.classList.add("opacity-0");
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const contactName = btn.getAttribute("data-contact-name") || "";
      const contactPhone = btn.getAttribute("data-contact-phone") || "";
      if (contactName || contactPhone) {
        // TODO: Save contact on platform - to be implemented later
        // This will be handled by the backend API
        console.log("Save contact on platform:", contactName, contactPhone);
        // Example: await saveContactOnPlatform({ name: contactName, phone: contactPhone });
      }
    });

    const tooltipObserver = new MutationObserver(() => {
      updateTooltipText();
    });

    tooltipObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  });

  // Setup message buttons (for buttons message type)
  const messageButtonButtons = messagesContent.querySelectorAll(".message-button-btn");
  messageButtonButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const buttonId = btn.getAttribute("data-button-id");
      const messageId = btn.getAttribute("data-message-id");
      console.log("Button clicked:", buttonId, "in message:", messageId);
      // TODO: Handle button click action
    });
  });

  // Setup list message buttons (for list message type)
  const messageListButtons = messagesContent.querySelectorAll(".message-list-btn");
  messageListButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const listId = btn.getAttribute("data-list-id");
      const messageId = btn.getAttribute("data-message-id");
      const listMenu = document.getElementById(listId);
      
      if (listMenu) {
        const isHidden = listMenu.classList.contains("hidden");
        if (isHidden) {
          listMenu.classList.remove("hidden");
        } else {
          listMenu.classList.add("hidden");
        }
      }
    });
  });

  // Setup list item buttons (for list message type)
  const messageListItemButtons = messagesContent.querySelectorAll(".message-list-item");
  messageListItemButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const itemId = btn.getAttribute("data-item-id");
      const messageId = btn.getAttribute("data-message-id");
      console.log("List item clicked:", itemId, "in message:", messageId);
      // TODO: Handle list item click action
      
      // Close the list menu after selection
      const listMenu = btn.closest(".message-list-menu");
      if (listMenu) {
        listMenu.classList.add("hidden");
      }
    });
  });

  // Close list menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".message-list-btn") && !e.target.closest(".message-list-menu")) {
      const allListMenus = messagesContent.querySelectorAll(".message-list-menu");
      allListMenus.forEach((menu) => {
        menu.classList.add("hidden");
      });
    }
  });
}

// Function to setup media preview (fullscreen view)
function setupMediaPreview() {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Setup click handlers for media elements
  const mediaTriggers = messagesContent.querySelectorAll(
    ".media-preview-trigger"
  );
  mediaTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      // Don't trigger if clicking on video controls
      if (trigger.tagName === "VIDEO" && e.target.tagName !== "VIDEO") {
        return;
      }
      e.stopPropagation();
      const mediaType = trigger.getAttribute("data-media-type");
      const mediaUrl = trigger.getAttribute("data-media-url");
      const mediaThumbnail = trigger.getAttribute("data-media-thumbnail") || "";

      if (mediaType && mediaUrl) {
        showMediaPreview(mediaType, mediaUrl, mediaThumbnail);
      }
    });
  });
}

// Function to show media preview in fullscreen
function showMediaPreview(type, url, thumbnail = "") {
  // Remove existing preview if any
  const existingPreview = document.getElementById("media-preview-overlay");
  if (existingPreview) {
    existingPreview.remove();
  }

  // Create overlay that covers entire screen
  const overlay = document.createElement("div");
  overlay.id = "media-preview-overlay";
  overlay.className =
    "fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-300";
  overlay.style.opacity = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.right = "0";
  overlay.style.bottom = "0";

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.className =
    "absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 dark:bg-black/50 hover:bg-black/70 dark:hover:bg-black/70 text-white transition-colors duration-200 z-[10000] backdrop-blur-sm";
  closeBtn.innerHTML = '<i class="hgi-stroke hgi-cancel-01 text-2xl"></i>';
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.style.zIndex = "10001";

  // Create media container that uses full screen space
  const mediaContainer = document.createElement("div");
  mediaContainer.style.position = "absolute";
  mediaContainer.style.top = "0";
  mediaContainer.style.left = "0";
  mediaContainer.style.width = "100vw";
  mediaContainer.style.height = "100vh";
  mediaContainer.style.display = "flex";
  mediaContainer.style.alignItems = "center";
  mediaContainer.style.justifyContent = "center";
  mediaContainer.style.padding = "0";
  mediaContainer.style.margin = "0";
  mediaContainer.style.boxSizing = "border-box";

  let mediaElement;

  if (type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.src = url;
    mediaElement.alt = "Preview";
    mediaElement.style.display = "block";
    mediaElement.style.width = "100vw";
    mediaElement.style.height = "100vh";
    mediaElement.style.objectFit = "contain";
    mediaElement.style.objectPosition = "center";
    mediaElement.style.margin = "0";
    mediaElement.style.padding = "0";
    mediaElement.onerror = () => {
      mediaElement.src = "https://via.placeholder.com/400x300?text=Image+Error";
    };
  }

  if (mediaElement) {
    mediaContainer.appendChild(mediaElement);
  }

  overlay.appendChild(mediaContainer);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Prevent body scroll
  document.body.style.overflow = "hidden";

  // Trigger fade in
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  // Close function
  const closePreview = () => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
      // Restore body scroll
      document.body.style.overflow = "";
    }, 300);
  };

  // Close on button click
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePreview();
  });

  // Close on overlay click (but not on media)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === mediaContainer) {
      closePreview();
    }
  });

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closePreview();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
}

// Variable to store reply message info
let replyMessageInfo = null;

// Variable to store message reactions
// Format: { messageId: emoji } - only one emoji per message
let messageReactions = {};

// Function to handle reply
function handleReply(messageId) {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Find the message element - try multiple selectors
  let messageElement = messagesContent
    .querySelector(`.message-actions-menu[data-message-id="${messageId}"]`)
    ?.closest(".group");

  if (!messageElement) {
    messageElement = messagesContent
      .querySelector(`.message-actions-btn[data-message-id="${messageId}"]`)
      ?.closest(".group");
  }

  if (!messageElement) {
    // Fallback: find any element with the message ID and traverse up
    const anyElement = messagesContent.querySelector(
      `[data-message-id="${messageId}"]`
    );
    if (anyElement) {
      messageElement = anyElement.closest(".flex.items-start");
    }
  }

  if (!messageElement) return;

  // Get message text
  let messageText = "";
  const textElement = messageElement.querySelector("p.text-sm");
  if (textElement) {
    messageText = textElement.textContent.trim();
  } else {
    // For non-text messages, get appropriate text
    const fileElement = messageElement.querySelector("p.text-sm.font-medium");
    if (fileElement) {
      messageText = fileElement.textContent.trim();
    } else {
      const captionElement = messageElement.querySelector("p.text-sm.px-4");
      if (captionElement) {
        messageText = captionElement.textContent.trim();
      }
    }
  }

  // Get sender name
  const senderName =
    messageElement
      .querySelector("img[data-sender-name]")
      ?.getAttribute("data-sender-name") || "Unknown";

  // Check if message is from me
  const isMe = messageElement.classList.contains("justify-end");

  // Store reply info
  replyMessageInfo = {
    id: messageId,
    text: messageText || (isMe ? "أنت" : senderName),
    sender: senderName,
    isMe: isMe,
  };

  // Show reply preview
  const replyPreview = document.getElementById("reply-preview");
  const replyPreviewSender = document.getElementById("reply-preview-sender");
  const replyPreviewText = document.getElementById("reply-preview-text");
  const messageInput = document.getElementById("message-input");

  if (replyPreview && replyPreviewSender && replyPreviewText) {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    replyPreviewSender.textContent = isMe
      ? lang === "ar"
        ? "أنت"
        : "You"
      : senderName;
    replyPreviewText.textContent =
      messageText || (lang === "ar" ? "رسالة" : "Message");
    replyPreview.classList.remove("hidden");

    // Focus on input
    if (messageInput) {
      messageInput.focus();
    }
  }

  // Switch to reply tab if not already
  const replyTab = document.getElementById("reply-tab");
  if (replyTab && !replyTab.classList.contains("active")) {
    const noteTab = document.getElementById("note-tab");
    if (noteTab) {
      replyTab.click();
    }
  }
}

// Function to handle copy
function handleCopy(messageId) {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Find the message element - try multiple selectors
  let messageElement = messagesContent
    .querySelector(`.message-actions-menu[data-message-id="${messageId}"]`)
    ?.closest(".group");

  if (!messageElement) {
    messageElement = messagesContent
      .querySelector(`.message-actions-btn[data-message-id="${messageId}"]`)
      ?.closest(".group");
  }

  if (!messageElement) {
    // Fallback: find any element with the message ID and traverse up
    const anyElement = messagesContent.querySelector(
      `[data-message-id="${messageId}"]`
    );
    if (anyElement) {
      messageElement = anyElement.closest(".flex.items-start");
    }
  }

  if (!messageElement) return;

  // Get message text
  let messageText = "";
  const textElement = messageElement.querySelector("p.text-sm");
  if (textElement) {
    messageText = textElement.textContent.trim();
  } else {
    // For non-text messages, get appropriate text
    const fileElement = messageElement.querySelector("p.text-sm.font-medium");
    if (fileElement) {
      messageText = fileElement.textContent.trim();
    } else {
      const captionElement = messageElement.querySelector("p.text-sm.px-4");
      if (captionElement) {
        messageText = captionElement.textContent.trim();
      }
    }
  }

  // Copy to clipboard
  if (messageText) {
    navigator.clipboard
      .writeText(messageText)
      .then(() => {
        // Show feedback (optional: you can add a toast notification here)
        console.log("Message copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = messageText;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          console.log("Message copied to clipboard (fallback)");
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
        document.body.removeChild(textArea);
      });
  }
}

// Function to update message reactions display
function updateMessageReactions(messageId) {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Find the message element
  let messageElement = messagesContent
    .querySelector(`.message-actions-menu[data-message-id="${messageId}"]`)
    ?.closest(".group");

  if (!messageElement) {
    messageElement = messagesContent
      .querySelector(`.message-actions-btn[data-message-id="${messageId}"]`)
      ?.closest(".group");
  }

  if (!messageElement) {
    const anyElement = messagesContent.querySelector(
      `[data-message-id="${messageId}"]`
    );
    if (anyElement) {
      messageElement = anyElement.closest(".flex.items-start");
    }
  }

  if (!messageElement) return;

  // Find or create reactions container
  let reactionsContainer = messageElement.querySelector(
    ".message-reactions-container"
  );

  const reaction = messageReactions[messageId];

  if (!reaction) {
    // Remove reactions container if no reaction
    if (reactionsContainer) {
      reactionsContainer.remove();
    }
    return;
  }

  // Find the message bubble (the div with rounded-lg class)
  const messageBubble = messageElement.querySelector(".rounded-lg");
  if (!messageBubble) return;

  // Check if message is from me (right side) or other (left side)
  const isMe = messageElement.classList.contains("justify-end");
  const lang = document.documentElement.getAttribute("lang") || "ar";

  // Create reactions container if it doesn't exist
  if (!reactionsContainer) {
    reactionsContainer = document.createElement("div");
    reactionsContainer.className =
      "message-reactions-container absolute flex items-center justify-center";
    reactionsContainer.style.zIndex = "10";
    // Position on the bottom edge of the message bubble
    reactionsContainer.style.bottom = "-8px";

    // Position based on RTL/LTR and message direction
    if (lang === "ar") {
      // RTL: reactions on left edge for my messages, right edge for others
      reactionsContainer.style[isMe ? "left" : "right"] = "-8px";
    } else {
      // LTR: reactions on right edge for my messages, left edge for others
      reactionsContainer.style[isMe ? "right" : "left"] = "-8px";
    }

    // Make message bubble relative for absolute positioning
    messageBubble.style.position = "relative";
    messageBubble.appendChild(reactionsContainer);
  }

  // Clear and rebuild reaction (only one emoji)
  reactionsContainer.innerHTML = "";
  const reactionSpan = document.createElement("span");
  reactionSpan.className =
    "inline-flex items-center justify-center text-base w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-110 transition-transform duration-150";
  reactionSpan.textContent = reaction;
  reactionSpan.title = "اضغط لإزالة التفاعل";
  // Add click handler to remove reaction
  reactionSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    // Remove reaction
    delete messageReactions[messageId];
    // Update display (will remove the container)
    updateMessageReactions(messageId);
  });
  reactionsContainer.appendChild(reactionSpan);
}

// Function to show full emoji picker
function showFullEmojiPicker(messageId, button, clickEvent = null) {
  // Check if full emoji picker already exists
  let fullEmojiPicker = document.getElementById("full-emoji-picker");
  if (fullEmojiPicker) {
    fullEmojiPicker.remove();
  }

  // Create container for emoji picker
  const pickerContainer = document.createElement("div");
  pickerContainer.id = "full-emoji-picker";
  pickerContainer.className =
    "absolute bg-transparent rounded-lg shadow-xl z-[100]";
  pickerContainer.style.position = "absolute";

  // Create emoji-picker-element
  const emojiPicker = document.createElement("emoji-picker");
  emojiPicker.style.width = "320px";
  emojiPicker.style.height = "400px";
  
  // Close picker function (defined before event handlers)
  const closePicker = () => {
    if (pickerContainer && pickerContainer.parentNode) {
      pickerContainer.remove();
    }
    // Remove all event listeners
    document.removeEventListener("mousedown", handleOutsideClick, true);
    document.removeEventListener("click", handleOutsideClick, false);
    document.removeEventListener("keydown", handleEscape);
  };

  // Handle emoji selection
  emojiPicker.addEventListener("emoji-click", (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    
    // Get emoji from event
    const emoji = e.detail.unicode || e.detail.emoji?.unicode || e.detail.emoji;
    
    if (!emoji) {
      console.warn("No emoji found in event detail");
      return;
    }
    
    // Add reaction to message - only one emoji per message
    const currentReaction = messageReactions[messageId];
    if (currentReaction === emoji) {
      // If same emoji, remove it (toggle)
      delete messageReactions[messageId];
    } else {
      // Replace with new emoji (or add if none exists)
      messageReactions[messageId] = emoji;
    }
    
    // Update message reactions display
    updateMessageReactions(messageId);
    
    // Close picker after selection
    closePicker();
  });

  pickerContainer.appendChild(emojiPicker);

  // Position picker relative to click position within messages-content container
  const messagesContent = document.getElementById("messages-content");
  if (messagesContent) {
    messagesContent.appendChild(pickerContainer);
    messagesContent.style.position = "relative";

    const containerRect = messagesContent.getBoundingClientRect();
    const scrollTop = messagesContent.scrollTop;
    const scrollLeft = messagesContent.scrollLeft;

    // Get click position or button position as fallback
    let clickX, clickY;
    if (clickEvent) {
      clickX = clickEvent.clientX;
      clickY = clickEvent.clientY;
    } else {
      const buttonRect = button.getBoundingClientRect();
      clickX = buttonRect.left + buttonRect.width / 2;
      clickY = buttonRect.top + buttonRect.height / 2;
    }

    // Calculate click position relative to container's content (accounting for scroll)
    const clickXRelative = clickX - containerRect.left + scrollLeft;
    const clickYRelative = clickY - containerRect.top + scrollTop;

    // Force layout calculation
    pickerContainer.style.visibility = "hidden";
    pickerContainer.style.display = "block";
    const pickerRect = pickerContainer.getBoundingClientRect();
    pickerContainer.style.visibility = "visible";

    const lang = document.documentElement.getAttribute("lang") || "ar";
    const padding = 8; // Padding from container edges
    const containerWidth = messagesContent.clientWidth || containerRect.width;
    const containerHeight = messagesContent.scrollHeight;
    const viewportHeight = messagesContent.clientHeight;

    // Calculate horizontal position - center picker on click position
    const pickerCenterX = pickerRect.width / 2;
    let pickerLeft, pickerRight;
    
    if (lang === "ar") {
      // For RTL: position picker centered on click from right
      const clickXFromRight = containerWidth - (clickX - containerRect.left);
      const rightOffset = clickXFromRight - pickerCenterX;
      pickerRight = rightOffset;
      pickerLeft = "auto";
      
      // Check boundaries
      if (pickerRight < padding) {
        pickerRight = padding;
      }
      const pickerLeftPos = containerWidth - pickerRight - pickerRect.width;
      if (pickerLeftPos < padding) {
        pickerRight = containerWidth - pickerRect.width - padding;
      }
      pickerContainer.style.right = `${pickerRight}px`;
      pickerContainer.style.left = "auto";
    } else {
      // For LTR: position picker centered on click from left
      const clickXFromLeft = clickX - containerRect.left;
      pickerLeft = clickXFromLeft - pickerCenterX;
      pickerRight = "auto";
      
      // Check boundaries
      if (pickerLeft < padding) {
        pickerLeft = padding;
      }
      if (pickerLeft + pickerRect.width > containerWidth - padding) {
        pickerLeft = containerWidth - pickerRect.width - padding;
      }
      pickerContainer.style.left = `${pickerLeft}px`;
      pickerContainer.style.right = "auto";
    }

    // Calculate vertical position - try above click first
    const pickerTopAbove = clickYRelative - pickerRect.height - 8;
    const pickerTopBelow = clickYRelative + 8;

    // Check if there's enough space above the click
    if (pickerTopAbove >= padding) {
      // Show above click
      pickerContainer.style.top = `${pickerTopAbove}px`;
    } else if (pickerTopBelow + pickerRect.height <= containerHeight - padding) {
      // Show below click
      pickerContainer.style.top = `${pickerTopBelow}px`;
    } else {
      // If neither works, show at click position (will be partially visible)
      pickerContainer.style.top = `${clickYRelative}px`;
      
      // Try to scroll picker into view if possible
      const pickerBottom = clickYRelative + pickerRect.height;
      if (pickerBottom > scrollTop + viewportHeight) {
        // Picker would be below viewport, scroll to show it
        messagesContent.scrollTo({
          top: pickerBottom - viewportHeight + padding,
          behavior: 'smooth'
        });
      } else if (pickerTopAbove < scrollTop) {
        // Picker would be above viewport, scroll to show it
        messagesContent.scrollTo({
          top: Math.max(0, pickerTopAbove - padding),
          behavior: 'smooth'
        });
      }
    }

    pickerContainer.style.position = "absolute";
  }

  // Helper function to check if element is inside emoji-picker (including shadow DOM)
  const isInsideEmojiPicker = (element) => {
    if (!element) return false;
    
    // Check if element is emoji-picker itself
    if (element.tagName === 'EMOJI-PICKER') {
      return true;
    }
    
    // Check if element is inside picker container
    if (pickerContainer.contains(element)) {
      return true;
    }
    
    // Check shadow DOM - traverse up to find emoji-picker
    let current = element;
    while (current) {
      // Check if current element is emoji-picker
      if (current.tagName === 'EMOJI-PICKER') {
        return true;
      }
      
      // Check if current element is inside picker container
      if (current === pickerContainer || pickerContainer.contains(current)) {
        return true;
      }
      
      // Move up the DOM tree
      if (current.parentElement) {
        current = current.parentElement;
      } else if (current.getRootNode && current.getRootNode().host) {
        // Shadow DOM case - get the host element
        current = current.getRootNode().host;
      } else {
        break;
      }
    }
    
    return false;
  };
  
  // Handle clicks outside the picker
  const handleOutsideClick = (e) => {
    // Check if picker still exists
    if (!pickerContainer || !pickerContainer.parentNode) {
      return;
    }
    
    const target = e.target;
    
    // Check if click is on the button that opened the picker
    if (button && button.contains(target)) {
      return;
    }
    
    // Check using composedPath for shadow DOM elements
    const path = e.composedPath ? e.composedPath() : [];
    
    // Check if any element in the path is inside emoji-picker or picker container
    const isInsidePicker = path.some((element) => {
      // Check if element is the picker container itself
      if (element === pickerContainer) {
        return true;
      }
      // Check if element is inside picker container
      if (pickerContainer.contains(element)) {
        return true;
      }
      // Check if element is emoji-picker (shadow DOM)
      if (element.tagName === 'EMOJI-PICKER') {
        return true;
      }
      // Check shadow DOM - traverse up to find emoji-picker
      let current = element;
      while (current) {
        if (current === pickerContainer || pickerContainer.contains(current)) {
          return true;
        }
        if (current.tagName === 'EMOJI-PICKER') {
          return true;
        }
        if (current.parentElement) {
          current = current.parentElement;
        } else if (current.getRootNode && current.getRootNode().host) {
          current = current.getRootNode().host;
        } else {
          break;
        }
      }
      return false;
    });
    
    if (isInsidePicker) {
      return;
    }
    
    // Also check if any element in path is inside button
    const isInsideButton = path.some((element) => {
      return element && button && button.contains(element);
    });
    
    if (isInsideButton) {
      return;
    }
    
    // Also check using bounding box as fallback
    const pickerRect = pickerContainer.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    const isInsidePickerBounds = (
      clickX >= pickerRect.left &&
      clickX <= pickerRect.right &&
      clickY >= pickerRect.top &&
      clickY <= pickerRect.bottom
    );
    
    if (isInsidePickerBounds) {
      return;
    }
    
    // Close if clicked outside
    closePicker();
  };
  
  // Handle Escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closePicker();
    }
  };
  
  // Add event listeners immediately
  // Use mousedown in capture phase to catch clicks early
  document.addEventListener("mousedown", handleOutsideClick, true);
  // Also use click in bubble phase as backup
  document.addEventListener("click", handleOutsideClick, false);
  document.addEventListener("keydown", handleEscape);
}

// Function to handle react
function handleReact(messageId, button, clickEvent = null) {
  // Create emoji picker menu
  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

  // Check if emoji menu already exists - if exists and is for same button, toggle it
  let emojiMenu = document.getElementById("emoji-picker-menu");
  if (emojiMenu) {
    const existingButtonId = emojiMenu.getAttribute("data-button-id");
    const currentButtonId = button.getAttribute("data-message-id") || messageId;
    
    // If same button, remove menu (toggle)
    if (existingButtonId === currentButtonId) {
      emojiMenu.remove();
      // Also close full emoji picker if open
      const fullEmojiPicker = document.getElementById("full-emoji-picker");
      if (fullEmojiPicker) {
        fullEmojiPicker.remove();
      }
      return;
    } else {
      // If different button, remove old menu first
      emojiMenu.remove();
    }
  }

  // Create emoji menu
  emojiMenu = document.createElement("div");
  emojiMenu.id = "emoji-picker-menu";
  emojiMenu.setAttribute("data-button-id", button.getAttribute("data-message-id") || messageId);
  emojiMenu.className =
    "absolute bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-1.5 z-50 flex items-center gap-1";
  emojiMenu.style.position = "absolute";

  emojis.forEach((emoji) => {
    const emojiBtn = document.createElement("button");
    emojiBtn.className =
      "w-8 h-8 flex items-center justify-center text-lg rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 flex-shrink-0";
    emojiBtn.textContent = emoji;
    emojiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Add reaction to message - only one emoji per message
      const currentReaction = messageReactions[messageId];
      if (currentReaction === emoji) {
        // If same emoji, remove it (toggle)
        delete messageReactions[messageId];
      } else {
        // Replace with new emoji (or add if none exists)
        messageReactions[messageId] = emoji;
      }
      // Update message reactions display
      updateMessageReactions(messageId);
      emojiMenu.remove();
      // Also close full emoji picker if open
      const fullEmojiPicker = document.getElementById("full-emoji-picker");
      if (fullEmojiPicker) {
        fullEmojiPicker.remove();
      }
    });
    emojiMenu.appendChild(emojiBtn);
  });

  // Add "+" button to show full emoji picker
  const moreEmojiBtn = document.createElement("button");
  moreEmojiBtn.className =
    "w-8 h-8 flex items-center justify-center text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 flex-shrink-0 border border-slate-300 dark:border-slate-600";
  moreEmojiBtn.innerHTML = '<i class="hgi-stroke hgi-add-01 text-xs"></i>';
  moreEmojiBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    emojiMenu.remove();
    // Pass the click event to position the picker at the click location
    showFullEmojiPicker(messageId, button, e);
  });
  emojiMenu.appendChild(moreEmojiBtn);

  // Position menu relative to button position within messages-content container
  const messagesContent = document.getElementById("messages-content");
  if (messagesContent) {
    messagesContent.appendChild(emojiMenu);
    messagesContent.style.position = "relative";

    // Get button position relative to container (accounting for scroll)
    const buttonRect = button.getBoundingClientRect();
    const containerRect = messagesContent.getBoundingClientRect();
    const scrollTop = messagesContent.scrollTop;
    const scrollLeft = messagesContent.scrollLeft;

    // Calculate button position relative to container's content (not viewport)
    // buttonRect.top is relative to viewport, containerRect.top is container's position in viewport
    // We need button's position relative to container's scroll position
    const buttonTopRelative = buttonRect.top - containerRect.top + scrollTop;
    const buttonLeftRelative = buttonRect.left - containerRect.left + scrollLeft;
    const buttonCenterX = buttonLeftRelative + buttonRect.width / 2;
    const buttonTop = buttonTopRelative;
    const buttonBottom = buttonTopRelative + buttonRect.height;

    // Force layout calculation
    emojiMenu.style.visibility = "hidden";
    emojiMenu.style.display = "flex";
    const menuRect = emojiMenu.getBoundingClientRect();
    emojiMenu.style.visibility = "visible";

    const lang = document.documentElement.getAttribute("lang") || "ar";
    const menuCenterX = menuRect.width / 2;
    const padding = 8; // Padding from container edges

    // Calculate horizontal position - center menu on button center
    // Use container's client width (viewport width) for positioning
    const containerWidth = messagesContent.clientWidth || containerRect.width;
    let menuLeft, menuRight;
    if (lang === "ar") {
      // For RTL: position menu centered on button from right
      // Calculate button center position relative to container's right edge
      const buttonCenterFromRight = containerWidth - (buttonRect.left - containerRect.left) - buttonRect.width / 2;
      const rightOffset = buttonCenterFromRight - menuCenterX;
      menuRight = rightOffset;
      menuLeft = "auto";
      
      // Check boundaries
      if (menuRight < padding) {
        menuRight = padding;
      }
      const menuLeftPos = containerWidth - menuRight - menuRect.width;
      if (menuLeftPos < padding) {
        menuRight = containerWidth - menuRect.width - padding;
      }
      emojiMenu.style.right = `${menuRight}px`;
      emojiMenu.style.left = "auto";
    } else {
      // For LTR: position menu centered on button from left
      const buttonCenterFromLeft = buttonRect.left - containerRect.left + buttonRect.width / 2;
      menuLeft = buttonCenterFromLeft - menuCenterX;
      menuRight = "auto";
      
      // Check boundaries
      if (menuLeft < padding) {
        menuLeft = padding;
      }
      if (menuLeft + menuRect.width > containerWidth - padding) {
        menuLeft = containerWidth - menuRect.width - padding;
      }
      emojiMenu.style.left = `${menuLeft}px`;
      emojiMenu.style.right = "auto";
    }

    // Calculate vertical position - try above button first
    const menuTopAbove = buttonTop - menuRect.height - 8;
    const menuTopBelow = buttonBottom + 8;
    const containerHeight = messagesContent.scrollHeight;
    const viewportHeight = messagesContent.clientHeight;

    // Check if there's enough space above the button
    if (menuTopAbove >= padding) {
      // Show above button
      emojiMenu.style.top = `${menuTopAbove}px`;
    } else if (menuTopBelow + menuRect.height <= containerHeight - padding) {
      // Show below button
      emojiMenu.style.top = `${menuTopBelow}px`;
    } else {
      // If neither works, show at button top (will be partially visible)
      emojiMenu.style.top = `${buttonTop}px`;
      
      // Try to scroll menu into view if possible
      const menuBottom = buttonTop + menuRect.height;
      if (menuBottom > scrollTop + viewportHeight) {
        // Menu would be below viewport, scroll to show it
        messagesContent.scrollTo({
          top: menuBottom - viewportHeight + padding,
          behavior: 'smooth'
        });
      } else if (menuTopAbove < scrollTop) {
        // Menu would be above viewport, scroll to show it
        messagesContent.scrollTo({
          top: Math.max(0, menuTopAbove - padding),
          behavior: 'smooth'
        });
      }
    }

    emojiMenu.style.position = "absolute";
  }

  // Close menu when clicking outside or on another reaction button
  const closeEmojiMenu = (e) => {
    // Don't close if clicking inside the menu
    if (emojiMenu.contains(e.target)) {
      return;
    }
    
    // Don't close if clicking on the same button (toggle behavior)
    if (button.contains(e.target)) {
      return;
    }
    
    // Close if clicking on another reaction button
    const clickedButton = e.target.closest(".message-actions-btn[data-action='react']");
    if (clickedButton && clickedButton !== button) {
      emojiMenu.remove();
      document.removeEventListener("click", closeEmojiMenu);
      return;
    }
    
    // Close if clicking outside
    emojiMenu.remove();
    // Also close full emoji picker if open
    const fullEmojiPicker = document.getElementById("full-emoji-picker");
    if (fullEmojiPicker) {
      fullEmojiPicker.remove();
    }
    document.removeEventListener("click", closeEmojiMenu);
  };
  
  // Use setTimeout to avoid immediate closure
  setTimeout(() => {
    document.addEventListener("click", closeEmojiMenu, true);
  }, 100);
}

// Function to setup avatar tooltips
function setupAvatarTooltips() {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  const avatarContainers = messagesContent.querySelectorAll(
    ".message-avatar-container"
  );

  avatarContainers.forEach((container) => {
    const avatarImg = container.querySelector("img");
    const tooltip = container.querySelector(".message-avatar-tooltip");
    if (!avatarImg || !tooltip) return;

    const senderName = avatarImg.getAttribute("data-sender-name") || "";

    avatarImg.addEventListener("mouseenter", () => {
      tooltip.classList.remove("opacity-0");
      tooltip.classList.add("opacity-100");
      const tooltipText = tooltip.querySelector(".tooltip-text");
      if (tooltipText) {
        tooltipText.textContent = senderName;
      }
    });

    avatarImg.addEventListener("mouseleave", () => {
      tooltip.classList.remove("opacity-100");
      tooltip.classList.add("opacity-0");
    });
  });
}

// Function to setup status tooltips
function setupStatusTooltips() {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  const statusContainers = messagesContent.querySelectorAll(
    ".message-status-container"
  );

  statusContainers.forEach((container) => {
    const statusIcon = container.querySelector(".message-status-icon");
    const tooltip = container.querySelector(".message-status-tooltip");
    if (!statusIcon || !tooltip) return;

    const updateTooltipText = () => {
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const tooltipText = tooltip.querySelector(".tooltip-text");
      if (tooltipText) {
        const textAr = statusIcon.getAttribute("data-text-ar");
        const textEn = statusIcon.getAttribute("data-text-en");
        if (textAr && textEn) {
          tooltipText.textContent = lang === "ar" ? textAr : textEn;
        }
      }
    };

    // Initial tooltip text
    updateTooltipText();

    statusIcon.addEventListener("mouseenter", () => {
      tooltip.classList.remove("opacity-0");
      tooltip.classList.add("opacity-100");
      updateTooltipText();
    });

    statusIcon.addEventListener("mouseleave", () => {
      tooltip.classList.remove("opacity-100");
      tooltip.classList.add("opacity-0");
    });

    // Update tooltip text when language changes
    const tooltipObserver = new MutationObserver(() => {
      updateTooltipText();
    });

    tooltipObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  });
}

// Function to setup message tabs (Reply/Note)
function setupMessageTabs() {
  const messageInputContainer = document.getElementById(
    "message-input-container"
  );
  const replyTab = document.getElementById("reply-tab");
  const noteTab = document.getElementById("note-tab");
  const messageInput = document.getElementById("message-input");
  const currentLang = document.documentElement.getAttribute("lang") || "ar";

  if (!replyTab || !noteTab || !messageInputContainer) return;

  const updateTabTexts = () => {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    const tabs = document.querySelectorAll(".message-tab-btn");
    tabs.forEach((tab) => {
      const textAr = tab.getAttribute("data-text-ar");
      const textEn = tab.getAttribute("data-text-en");
      if (textAr && textEn) {
        tab.textContent = lang === "ar" ? textAr : textEn;
      }
    });

    // Update placeholder
    if (messageInput) {
      const placeholderAr = messageInput.getAttribute("data-placeholder-ar");
      const placeholderEn = messageInput.getAttribute("data-placeholder-en");
      if (placeholderAr && placeholderEn) {
        messageInput.placeholder =
          lang === "ar" ? placeholderAr : placeholderEn;
      }
    }
  };

  const switchTab = (activeTab, inactiveTab) => {
    // Remove active class from both
    activeTab.classList.add("active");
    inactiveTab.classList.remove("active");

    // Update active tab styles
    activeTab.classList.remove("text-slate-500", "dark:text-slate-400");
    activeTab.classList.add("text-slate-700", "dark:text-slate-300");
    activeTab.style.borderBottomColor = "#0090D6";
    activeTab.style.color = "#0090D6";
    activeTab.style.borderBottomWidth = "2px";
    activeTab.style.minHeight = "48px";
    // Set background color based on dark mode
    const isDarkMode = document.documentElement.classList.contains("dark");
    activeTab.style.backgroundColor = isDarkMode ? "#1e293b" : "#ffffff";

    // Update inactive tab styles
    inactiveTab.classList.remove("text-slate-700", "dark:text-slate-300");
    inactiveTab.classList.add("text-slate-500", "dark:text-slate-400");
    inactiveTab.style.borderBottomColor = "transparent";
    inactiveTab.style.color = "";
    inactiveTab.style.backgroundColor = "";
    inactiveTab.style.borderBottomWidth = "2px";
    inactiveTab.style.minHeight = "48px";

    // Update placeholder and theme based on active tab
    if (messageInput) {
      const tabType = activeTab.getAttribute("data-tab");
      const lang = document.documentElement.getAttribute("lang") || "ar";
      const messageInputField = document.getElementById("message-input-field");
      const messageIconsSection = document.getElementById("message-icons-section");
      
      if (tabType === "reply") {
        const placeholderAr = messageInput.getAttribute("data-placeholder-ar");
        const placeholderEn = messageInput.getAttribute("data-placeholder-en");
        messageInput.placeholder =
          lang === "ar" ? placeholderAr : placeholderEn;
        
        // Remove note theme (yellow background)
        if (messageInputField) {
          messageInputField.style.backgroundColor = "";
        }
        if (messageIconsSection) {
          messageIconsSection.style.backgroundColor = "";
        }
      } else if (tabType === "note") {
        const placeholderAr = messageInput.getAttribute(
          "data-placeholder-note-ar"
        );
        const placeholderEn = messageInput.getAttribute(
          "data-placeholder-note-en"
        );
        messageInput.placeholder =
          lang === "ar" ? placeholderAr : placeholderEn;
        
        // Apply note theme (yellow background)
        const isDarkMode = document.documentElement.classList.contains("dark");
        const noteBgColor = isDarkMode ? "#78350f" : "#fef3c7"; // Dark yellow for dark mode, light yellow for light mode
        if (messageInputField) {
          messageInputField.style.backgroundColor = noteBgColor;
        }
        if (messageIconsSection) {
          messageIconsSection.style.backgroundColor = noteBgColor;
        }
      }
    }
  };

  // Initial text update
  updateTabTexts();

  // Tab click handlers
  replyTab.addEventListener("click", () => {
    switchTab(replyTab, noteTab);
  });

  noteTab.addEventListener("click", () => {
    switchTab(noteTab, replyTab);
  });

  // Setup tooltips for message icons
  const setupMessageIconTooltips = () => {
    const iconButtons =
      messageInputContainer?.querySelectorAll(".message-icon-btn");
    if (!iconButtons) return;

    iconButtons.forEach((btn) => {
      const tooltip = btn.querySelector(".tooltip-element");
      if (!tooltip) return;

      const updateTooltipText = () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tooltipText = tooltip.querySelector(".tooltip-text");
        if (tooltipText) {
          const titleAr = btn.getAttribute("data-title-ar");
          const titleEn = btn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        }
      };

      // Initial tooltip text
      updateTooltipText();

      // Show tooltip on hover
      btn.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0");
        tooltip.classList.add("opacity-100");
        updateTooltipText();
      });

      btn.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0");
      });

      // Update tooltip text when language changes
      const tooltipObserver = new MutationObserver(() => {
        updateTooltipText();
      });

      tooltipObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });

      // Also observe button's data-title attributes
      tooltipObserver.observe(btn, {
        attributes: true,
        attributeFilter: ["data-title-ar", "data-title-en"],
      });
    });
  };

  // Setup message icon tooltips
  setupMessageIconTooltips();

  // Setup cancel reply button
  const cancelReplyBtn = document.getElementById("cancel-reply-btn");
  if (cancelReplyBtn) {
    cancelReplyBtn.addEventListener("click", () => {
      const replyPreview = document.getElementById("reply-preview");
      if (replyPreview) {
        replyPreview.classList.add("hidden");
        replyMessageInfo = null;
      }
    });
  }

  // Setup add variable button tooltip
  const addVariableBtn = document.getElementById("add-variable-btn");
  if (addVariableBtn) {
    const tooltip = addVariableBtn.querySelector(".tooltip-element");
    if (tooltip) {
      const updateTooltipText = () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tooltipText = tooltip.querySelector(".tooltip-text");
        if (tooltipText) {
          const titleAr = addVariableBtn.getAttribute("data-title-ar");
          const titleEn = addVariableBtn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        }
      };

      // Initial tooltip text
      updateTooltipText();

      // Show tooltip on hover
      addVariableBtn.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0");
        tooltip.classList.add("opacity-100");
        updateTooltipText();
      });

      addVariableBtn.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0");
      });

      // Update tooltip text when language changes
      const tooltipObserver = new MutationObserver(() => {
        updateTooltipText();
      });

      tooltipObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });

      // Also observe button's data-title attributes
      tooltipObserver.observe(addVariableBtn, {
        attributes: true,
        attributeFilter: ["data-title-ar", "data-title-en"],
      });
    }

    // Setup variables dropdown
    let isDropdownOpen = false;
    let variablesDropdown = null;

    const createVariablesDropdown = () => {
      // Remove existing dropdown if any
      if (variablesDropdown) {
        variablesDropdown.remove();
      }

      // Get variables list
      const variablesList = document.getElementById("variables-list");
      if (!variablesList) return;

      // Get all variable items
      const variableItems = variablesList.querySelectorAll(".variable-item");
      if (variableItems.length === 0) return;

      // Extract variable names and categorize them
      const systemFields = [];
      const customFields = [];
      
      Array.from(variableItems).forEach((item) => {
        const key = item.getAttribute("data-key");
        const nameSpan = item.querySelector("span.text-xs.font-semibold");
        const variable = {
          key: key || "",
          name: nameSpan ? nameSpan.textContent.trim() : key || "",
        };
        
        // Categorize: System fields are common ones, rest are custom
        const systemKeys = ["name", "email", "phone", "id", "created_at", "updated_at"];
        if (systemKeys.includes(variable.key.toLowerCase())) {
          systemFields.push(variable);
        } else {
          customFields.push(variable);
        }
      });

      // Create dropdown
      variablesDropdown = document.createElement("div");
      variablesDropdown.id = "variables-dropdown";
      variablesDropdown.className =
        "absolute w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-[1000]";
      variablesDropdown.style.display = "none";
      
      // Position dropdown above the button
      const isRTL = document.documentElement.getAttribute("dir") === "rtl";
      
      variablesDropdown.style.bottom = "100%";
      variablesDropdown.style.marginBottom = "8px";
      
      // Button uses end-4, so in RTL it's on right, in LTR it's on left
      // Dropdown should align to the same side as the button
      if (isRTL) {
        // RTL: button is on right, dropdown should align to right edge
        variablesDropdown.style.right = "0";
        variablesDropdown.style.left = "auto";
      } else {
        // LTR: button is on left, dropdown should align to left edge  
        variablesDropdown.style.left = "0";
        variablesDropdown.style.right = "auto";
      }

      // Create search box
      const searchBox = document.createElement("div");
      searchBox.className = "p-2 border-b border-slate-200 dark:border-slate-700";
      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = isRTL ? "بحث..." : "Search...";
      searchInput.className =
        "w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
      searchBox.appendChild(searchInput);

      // Create dropdown content
      const dropdownContent = document.createElement("div");
      dropdownContent.className = "max-h-80 overflow-y-auto";
      dropdownContent.id = "variables-dropdown-content";

      // Function to render variables
      const renderVariables = (searchTerm = "") => {
        dropdownContent.innerHTML = "";
        const searchLower = searchTerm.toLowerCase();

        // Filter variables based on search
        const filteredSystemFields = systemFields.filter(
          (v) => v.name.toLowerCase().includes(searchLower) || v.key.toLowerCase().includes(searchLower)
        );
        const filteredCustomFields = customFields.filter(
          (v) => v.name.toLowerCase().includes(searchLower) || v.key.toLowerCase().includes(searchLower)
        );

        // System Fields section
        if (filteredSystemFields.length > 0) {
          const systemHeader = document.createElement("div");
          systemHeader.className =
            "px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 sticky top-0";
          systemHeader.textContent = "System Fields";
          dropdownContent.appendChild(systemHeader);

          filteredSystemFields.forEach((variable) => {
            const item = createVariableItem(variable);
            dropdownContent.appendChild(item);
          });
        }

        // Custom User Fields section
        if (filteredCustomFields.length > 0) {
          const customHeader = document.createElement("div");
          customHeader.className =
            "px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 sticky top-0";
          customHeader.textContent = "Custom User Fields";
          dropdownContent.appendChild(customHeader);

          filteredCustomFields.forEach((variable) => {
            const item = createVariableItem(variable);
            dropdownContent.appendChild(item);
          });
        }

        // No results message
        if (filteredSystemFields.length === 0 && filteredCustomFields.length === 0) {
          const noResults = document.createElement("div");
          noResults.className =
            "px-3 py-4 text-sm text-center text-slate-500 dark:text-slate-400";
          noResults.textContent = isRTL ? "لا توجد نتائج" : "No results";
          dropdownContent.appendChild(noResults);
        }
      };

      // Function to create variable item
      const createVariableItem = (variable) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className =
          "w-full px-3 py-2 text-sm text-left text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150";
        item.textContent = variable.name;
        item.dataset.variableKey = variable.key;

        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const messageInput = document.getElementById("message-input");
          if (messageInput) {
            const cursorPos = messageInput.selectionStart || messageInput.value.length;
            const textBefore = messageInput.value.substring(0, cursorPos);
            const textAfter = messageInput.value.substring(cursorPos);
            messageInput.value = textBefore + `{{${variable.key}}}` + textAfter;
            messageInput.focus();
            messageInput.setSelectionRange(
              cursorPos + variable.key.length + 4,
              cursorPos + variable.key.length + 4
            );
          }
          closeDropdown();
        });

        return item;
      };

      // Initial render
      renderVariables();

      // Search functionality
      searchInput.addEventListener("input", (e) => {
        renderVariables(e.target.value);
      });

      // Prevent dropdown from closing when clicking on search
      searchInput.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      variablesDropdown.appendChild(searchBox);
      variablesDropdown.appendChild(dropdownContent);
      
      // Ensure parent has relative positioning
      const buttonParent = addVariableBtn.parentElement;
      if (buttonParent) {
        buttonParent.style.position = "relative";
        buttonParent.appendChild(variablesDropdown);
      }
    };

    const openDropdown = () => {
      if (!variablesDropdown) {
        createVariablesDropdown();
      }
      if (variablesDropdown) {
        // Update position based on current RTL/LTR state
        const isRTL = document.documentElement.getAttribute("dir") === "rtl";
        if (isRTL) {
          variablesDropdown.style.right = "auto";
          variablesDropdown.style.left = "0";
        } else {
          variablesDropdown.style.left = "auto";
          variablesDropdown.style.right = "0";
        }
        variablesDropdown.style.display = "block";
        isDropdownOpen = true;
      }
    };

    const closeDropdown = () => {
      if (variablesDropdown) {
        variablesDropdown.style.display = "none";
        isDropdownOpen = false;
      }
    };

    // Toggle dropdown on button click
    addVariableBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isDropdownOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isDropdownOpen &&
        variablesDropdown &&
        !variablesDropdown.contains(e.target) &&
        !addVariableBtn.contains(e.target)
      ) {
        closeDropdown();
      }
    });
  }

  // Setup fullscreen button tooltip
  const fullscreenBtn = document.getElementById("message-fullscreen-btn");
  if (fullscreenBtn) {
    const tooltip = fullscreenBtn.querySelector(".tooltip-element");
    if (tooltip) {
      const updateTooltipText = () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tooltipText = tooltip.querySelector(".tooltip-text");
        if (tooltipText) {
          const titleAr = fullscreenBtn.getAttribute("data-title-ar");
          const titleEn = fullscreenBtn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        }
      };

      // Initial tooltip text
      updateTooltipText();

      // Show tooltip on hover
      fullscreenBtn.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0");
        tooltip.classList.add("opacity-100");
        updateTooltipText();
      });

      fullscreenBtn.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0");
      });

      // Fullscreen functionality
      let isFullscreen = false;
      const messagesTabContent = document.getElementById("messages-tab-content");
      const messageInputContainer = document.getElementById("message-input-container");
      const messageInput = document.getElementById("message-input");

      fullscreenBtn.addEventListener("click", () => {
        if (!messagesTabContent || !messageInputContainer) return;

        isFullscreen = !isFullscreen;
        const icon = fullscreenBtn.querySelector("i");

        if (isFullscreen) {
          // Show and style message input container in fullscreen (fixed position)
          messageInputContainer.classList.remove("hidden");
          messageInputContainer.style.position = "fixed";
          messageInputContainer.style.top = "50%";
          messageInputContainer.style.left = "50%";
          messageInputContainer.style.transform = "translate(-50%, -50%)";
          messageInputContainer.style.width = "90%";
          messageInputContainer.style.maxWidth = "700px";
          messageInputContainer.style.height = "auto";
          messageInputContainer.style.maxHeight = "90vh";
          messageInputContainer.style.zIndex = "1000";
          messageInputContainer.style.borderRadius = "12px";
          messageInputContainer.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
          messageInputContainer.style.border = "1px solid rgba(148, 163, 184, 0.2)";
          messageInputContainer.style.display = "flex";
          messageInputContainer.style.flexDirection = "column";

          // Increase textarea height in fullscreen mode to fill available space
          if (messageInput) {
            messageInput.style.minHeight = "350px";
            messageInput.style.height = "350px";
            messageInput.style.maxHeight = "70vh";
            messageInput.style.flex = "1";
          }

          // Change icon to shrink
          if (icon) {
            icon.className = "hgi-stroke hgi-square-arrow-shrink-01 text-lg";
          }

          // Update tooltip text
          fullscreenBtn.setAttribute("data-title-ar", "تضييق");
          fullscreenBtn.setAttribute("data-title-en", "Shrink");
        } else {
          // Reset message input container
          messageInputContainer.style.position = "";
          messageInputContainer.style.top = "";
          messageInputContainer.style.left = "";
          messageInputContainer.style.transform = "";
          messageInputContainer.style.width = "";
          messageInputContainer.style.maxWidth = "";
          messageInputContainer.style.height = "";
          messageInputContainer.style.minHeight = "";
          messageInputContainer.style.maxHeight = "";
          messageInputContainer.style.zIndex = "";
          messageInputContainer.style.borderRadius = "";
          messageInputContainer.style.boxShadow = "";
          messageInputContainer.style.border = "";
          messageInputContainer.style.display = "";
          // Ensure it's still visible after reset
          messageInputContainer.classList.remove("hidden");

          // Reset textarea height
          if (messageInput) {
            messageInput.style.minHeight = "";
            messageInput.style.height = "";
            messageInput.style.maxHeight = "";
          }

          // Change icon back to fullscreen
          if (icon) {
            icon.className = "hgi-stroke hgi-full-screen text-lg";
          }

          // Update tooltip text
          fullscreenBtn.setAttribute("data-title-ar", "ملء");
          fullscreenBtn.setAttribute("data-title-en", "Full");
        }

        // Update tooltip text
        updateTooltipText();
      });

      // Update tooltip text when language changes
      const tooltipObserver = new MutationObserver(() => {
        updateTooltipText();
      });

      tooltipObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });

      // Also observe button's data-title attributes
      tooltipObserver.observe(fullscreenBtn, {
        attributes: true,
        attributeFilter: ["data-title-ar", "data-title-en"],
      });
    }
  }

  // Setup send button and actions dropdown
  const sendBtn = document.getElementById("send-message-btn");
  const sendActionsBtn = document.getElementById("send-actions-btn");
  const sendActionsMenu = document.getElementById("send-actions-menu");

  // Update send button text
  const updateSendButtonText = () => {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    if (sendBtn) {
      const textAr = sendBtn.getAttribute("data-text-ar");
      const textEn = sendBtn.getAttribute("data-text-en");
      if (textAr && textEn) {
        sendBtn.textContent = lang === "ar" ? textAr : textEn;
      }
    }
  };

  // Update send actions menu texts
  const updateSendActionsMenuTexts = () => {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    if (sendActionsMenu) {
      // Update section title
      const sectionTitle = sendActionsMenu.querySelector("h4[data-text-ar]");
      if (sectionTitle) {
        const textAr = sectionTitle.getAttribute("data-text-ar");
        const textEn = sectionTitle.getAttribute("data-text-en");
        if (textAr && textEn) {
          sectionTitle.textContent = lang === "ar" ? textAr : textEn;
        }
      }

      // Update action buttons
      const actionButtons = sendActionsMenu.querySelectorAll(
        "button[data-action]"
      );
      actionButtons.forEach((btn) => {
        const textAr = btn.getAttribute("data-text-ar");
        const textEn = btn.getAttribute("data-text-en");
        const span = btn.querySelector("span");
        if (span && textAr && textEn) {
          span.textContent = lang === "ar" ? textAr : textEn;
        }
      });
    }
  };

  // Initial text updates
  updateSendButtonText();
  updateSendActionsMenuTexts();

  // Setup tooltip for send actions button
  if (sendActionsBtn) {
    const tooltip = sendActionsBtn.querySelector(".tooltip-element");
    if (tooltip) {
      const updateTooltipText = () => {
        const lang = document.documentElement.getAttribute("lang") || "ar";
        const tooltipText = tooltip.querySelector(".tooltip-text");
        if (tooltipText) {
          const titleAr = sendActionsBtn.getAttribute("data-title-ar");
          const titleEn = sendActionsBtn.getAttribute("data-title-en");
          if (titleAr && titleEn) {
            tooltipText.textContent = lang === "ar" ? titleAr : titleEn;
          }
        }
      };

      // Initial tooltip text
      updateTooltipText();

      // Show tooltip on hover
      sendActionsBtn.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0");
        tooltip.classList.add("opacity-100");
        updateTooltipText();
      });

      sendActionsBtn.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100");
        tooltip.classList.add("opacity-0");
      });

      // Update tooltip text when language changes
      const tooltipObserver = new MutationObserver(() => {
        updateTooltipText();
      });

      tooltipObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"],
      });
    }
  }

  // Setup send actions dropdown
  if (sendActionsBtn && sendActionsMenu) {
    sendActionsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = sendActionsMenu.classList.contains("opacity-0");
      if (isVisible) {
        sendActionsMenu.classList.remove(
          "opacity-0",
          "invisible",
          "translate-y-[10px]"
        );
        sendActionsMenu.classList.add(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      } else {
        sendActionsMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[10px]"
        );
        sendActionsMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !sendActionsBtn.contains(e.target) &&
        !sendActionsMenu.contains(e.target)
      ) {
        sendActionsMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[10px]"
        );
        sendActionsMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      }
    });

    // Handle action buttons
    const actionButtons = sendActionsMenu.querySelectorAll(
      "button[data-action]"
    );
    actionButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = btn.getAttribute("data-action");
        // Handle different actions
        if (action === "schedule-5min") {
          console.log("Schedule message +5 minutes");
          // TODO: Implement schedule +5 minutes functionality
        } else if (action === "schedule-10min") {
          console.log("Schedule message +10 minutes");
          // TODO: Implement schedule +10 minutes functionality
        } else if (action === "schedule-15min") {
          console.log("Schedule message +15 minutes");
          // TODO: Implement schedule +15 minutes functionality
        } else if (action === "schedule-30min") {
          console.log("Schedule message +30 minutes");
          // TODO: Implement schedule +30 minutes functionality
        } else if (action === "schedule-1hour") {
          console.log("Schedule message +1 hour");
          // TODO: Implement schedule +1 hour functionality
        } else if (action === "schedule-2hours") {
          console.log("Schedule message +2 hours");
          // TODO: Implement schedule +2 hours functionality
        } else if (action === "schedule-12hours") {
          console.log("Schedule message +12 hours");
          // TODO: Implement schedule +12 hours functionality
        } else if (action === "schedule-24hours") {
          console.log("Schedule message +24 hours");
          // TODO: Implement schedule +24 hours functionality
        } else if (action === "custom-time") {
          console.log("Custom time");
          // TODO: Implement custom time functionality
        }
        // Close menu after action
        sendActionsMenu.classList.add(
          "opacity-0",
          "invisible",
          "translate-y-[10px]"
        );
        sendActionsMenu.classList.remove(
          "opacity-100",
          "visible",
          "translate-y-0"
        );
      });
    });
  }

  // Update texts when language changes
  const langObserver = new MutationObserver(() => {
    updateTabTexts();
    updateSendButtonText();
    updateSendActionsMenuTexts();
    const lang = document.documentElement.getAttribute("lang") || "ar";
    // Update active tab placeholder
    const activeTab = document.querySelector(".message-tab-btn.active");
    if (activeTab && messageInput) {
      const tabType = activeTab.getAttribute("data-tab");
      if (tabType === "reply") {
        const placeholderAr = messageInput.getAttribute("data-placeholder-ar");
        const placeholderEn = messageInput.getAttribute("data-placeholder-en");
        messageInput.placeholder =
          lang === "ar" ? placeholderAr : placeholderEn;
      } else if (tabType === "note") {
        const placeholderAr = messageInput.getAttribute(
          "data-placeholder-note-ar"
        );
        const placeholderEn = messageInput.getAttribute(
          "data-placeholder-note-en"
        );
        messageInput.placeholder =
          lang === "ar" ? placeholderAr : placeholderEn;
      }
    }
  });

  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
}

// Function to setup messages/orders main tabs
function setupMessagesMainTabs() {
  const messagesMainTab = document.getElementById("messages-main-tab");
  const ordersMainTab = document.getElementById("orders-main-tab");
  const messagesTabContent = document.getElementById("messages-tab-content");
  const ordersTabContent = document.getElementById("orders-tab-content");

  if (!messagesMainTab || !ordersMainTab || !messagesTabContent || !ordersTabContent) return;

  const updateTabTexts = () => {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    const tabs = document.querySelectorAll(".messages-main-tab-btn");
    tabs.forEach((tab) => {
      const span = tab.querySelector("span");
      if (span) {
        const textAr = span.getAttribute("data-text-ar");
        const textEn = span.getAttribute("data-text-en");
        if (textAr && textEn) {
          span.textContent = lang === "ar" ? textAr : textEn;
        }
      }
    });
  };

  const switchMainTab = (activeTab, inactiveTab, activeContent, inactiveContent) => {
    // Remove active class from both
    activeTab.classList.add("active");
    inactiveTab.classList.remove("active");

    // Update active tab styles
    activeTab.classList.remove("text-slate-500", "dark:text-slate-400", "border-transparent", "hover:border-slate-300", "dark:hover:border-slate-600");
    activeTab.classList.add("text-slate-700", "dark:text-slate-300", "bg-white", "dark:bg-slate-800");
    activeTab.style.borderBottomColor = "#0090D6";
    activeTab.style.color = "#0090D6";
    activeTab.style.minHeight = "48px";
    const isDarkMode = document.documentElement.classList.contains("dark");
    activeTab.style.backgroundColor = isDarkMode ? "#1e293b" : "#ffffff";

    // Update inactive tab styles
    inactiveTab.classList.remove("text-slate-700", "dark:text-slate-300", "bg-white", "dark:bg-slate-800");
    inactiveTab.classList.add("text-slate-500", "dark:text-slate-400", "border-transparent", "hover:border-slate-300", "dark:hover:border-slate-600");
    inactiveTab.style.borderBottomColor = "transparent";
    inactiveTab.style.color = "";
    inactiveTab.style.backgroundColor = "";
    inactiveTab.style.minHeight = "48px";

    // Show/hide content
    activeContent.classList.remove("hidden");
    inactiveContent.classList.add("hidden");
  };

  // Initial text update
  updateTabTexts();

  // Tab click handlers
  messagesMainTab.addEventListener("click", () => {
    switchMainTab(messagesMainTab, ordersMainTab, messagesTabContent, ordersTabContent);
  });

  ordersMainTab.addEventListener("click", () => {
    switchMainTab(ordersMainTab, messagesMainTab, ordersTabContent, messagesTabContent);
    // Load orders when orders tab is clicked
    loadOrders();
  });

  // Update texts when language changes
  const langObserver = new MutationObserver(() => {
    updateTabTexts();
  });

  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
}

// Function to load and display orders
function loadOrders() {
  const ordersListContainer = document.getElementById("orders-list-container");
  if (!ordersListContainer) return;

  // Sample orders data
  const sampleOrders = [
    {
      id: 1,
      orderNumber: "#ORD-2024-001",
      status: "pending",
      statusTextAr: "قيد الانتظار",
      statusTextEn: "Pending",
      statusColor: "#f59e0b",
      total: "1,250.00",
      currency: "ريال",
      items: 3,
      date: "2024-01-20",
      time: "10:30 ص",
      products: [
        { name: "منتج رقم 1", quantity: 2, price: "500.00" },
        { name: "منتج رقم 2", quantity: 1, price: "250.00" },
      ],
      shippingAddress: "الرياض، حي النخيل، شارع الملك فهد، مبنى 123",
      paymentMethod: "بطاقة ائتمانية",
      trackingNumber: "TRK-2024-001",
    },
    {
      id: 2,
      orderNumber: "#ORD-2024-002",
      status: "processing",
      statusTextAr: "قيد المعالجة",
      statusTextEn: "Processing",
      statusColor: "#3b82f6",
      total: "850.50",
      currency: "ريال",
      items: 2,
      date: "2024-01-19",
      time: "02:15 م",
      products: [
        { name: "منتج رقم 3", quantity: 1, price: "450.50" },
        { name: "منتج رقم 4", quantity: 1, price: "400.00" },
      ],
      shippingAddress: "جدة، حي الزهراء، شارع التحلية، مبنى 456",
      paymentMethod: "الدفع عند الاستلام",
      trackingNumber: "TRK-2024-002",
    },
    {
      id: 3,
      orderNumber: "#ORD-2024-003",
      status: "shipped",
      statusTextAr: "تم الشحن",
      statusTextEn: "Shipped",
      statusColor: "#10b981",
      total: "2,100.00",
      currency: "ريال",
      items: 5,
      date: "2024-01-18",
      time: "11:45 ص",
      products: [
        { name: "منتج رقم 5", quantity: 3, price: "1,200.00" },
        { name: "منتج رقم 6", quantity: 2, price: "900.00" },
      ],
      shippingAddress: "الدمام، حي الفيصلية، شارع الأمير سلطان، مبنى 789",
      paymentMethod: "تحويل بنكي",
      trackingNumber: "TRK-2024-003",
    },
    {
      id: 4,
      orderNumber: "#ORD-2024-004",
      status: "delivered",
      statusTextAr: "تم التسليم",
      statusTextEn: "Delivered",
      statusColor: "#10b981",
      total: "450.75",
      currency: "ريال",
      items: 1,
      date: "2024-01-17",
      time: "09:20 ص",
      products: [
        { name: "منتج رقم 7", quantity: 1, price: "450.75" },
      ],
      shippingAddress: "الرياض، حي العليا، شارع العروبة، مبنى 321",
      paymentMethod: "بطاقة ائتمانية",
      trackingNumber: "TRK-2024-004",
    },
    {
      id: 5,
      orderNumber: "#ORD-2024-005",
      status: "cancelled",
      statusTextAr: "ملغي",
      statusTextEn: "Cancelled",
      statusColor: "#ef4444",
      total: "675.00",
      currency: "ريال",
      items: 2,
      date: "2024-01-16",
      time: "04:30 م",
      products: [
        { name: "منتج رقم 8", quantity: 1, price: "375.00" },
        { name: "منتج رقم 9", quantity: 1, price: "300.00" },
      ],
      shippingAddress: "الرياض، حي المطار، شارع الأمير محمد بن سلمان، مبنى 654",
      paymentMethod: "بطاقة ائتمانية",
      trackingNumber: "TRK-2024-005",
    },
  ];

  const lang = document.documentElement.getAttribute("lang") || "ar";

  if (sampleOrders.length === 0) {
    ordersListContainer.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <i
            class="hgi-stroke hgi-package text-6xl text-slate-300 dark:text-slate-600 mb-4"
            style="color: #003e5c"
          ></i>
          <p
            class="text-slate-500 dark:text-slate-400"
            data-text-ar="لا توجد طلبات"
            data-text-en="No orders"
          >
            ${lang === "ar" ? "لا توجد طلبات" : "No orders"}
          </p>
        </div>
      </div>
    `;
    return;
  }

  ordersListContainer.innerHTML = `
    <div class="space-y-3">
      ${sampleOrders
        .map(
          (order) => `
        <div
          class="order-item-wrapper rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          data-order-id="${order.id}"
        >
          <div
            class="order-item-header flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150 cursor-pointer"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style="background-color: ${order.statusColor}20"
            >
              <i
                class="hgi-stroke hgi-package text-xl"
                style="color: ${order.statusColor}"
              ></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span
                  class="text-sm font-semibold text-slate-900 dark:text-slate-100"
                >
                  ${order.orderNumber}
                </span>
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-white"
                  style="background-color: ${order.statusColor}"
                  data-text-ar="${order.statusTextAr}"
                  data-text-en="${order.statusTextEn}"
                >
                  ${lang === "ar" ? order.statusTextAr : order.statusTextEn}
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span data-text-ar="${order.items} منتج" data-text-en="${order.items} items">
                  ${lang === "ar" ? `${order.items} منتج` : `${order.items} items`}
                </span>
                <span>•</span>
                <span>${order.total} ${order.currency}</span>
              </div>
            </div>
            <div class="flex-shrink-0 flex items-center gap-3">
              <div class="flex flex-col items-end">
                <span
                  class="text-xs text-slate-500 dark:text-slate-400"
                  data-text-ar="${order.date}"
                  data-text-en="${order.date}"
                >
                  ${order.date}
                </span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500">
                  ${order.time}
                </span>
              </div>
              <i
                class="hgi-stroke hgi-arrow-down-01 text-sm text-slate-400 dark:text-slate-500 order-arrow transition-transform duration-200"
              ></i>
            </div>
          </div>
          <div
            class="order-item-details hidden border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
          >
            <div class="p-4 space-y-4">
              <!-- Products -->
              <div>
                <h4
                  class="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  data-text-ar="المنتجات"
                  data-text-en="Products"
                >
                  ${lang === "ar" ? "المنتجات" : "Products"}
                </h4>
                <div class="space-y-2">
                  ${order.products
                    .map(
                      (product) => `
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-700 dark:text-slate-300">
                        ${product.name} × ${product.quantity}
                      </span>
                      <span class="text-slate-600 dark:text-slate-400 font-medium">
                        ${product.price} ${order.currency}
                      </span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
              
              <!-- Shipping Address -->
              <div>
                <h4
                  class="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  data-text-ar="عنوان الشحن"
                  data-text-en="Shipping Address"
                >
                  ${lang === "ar" ? "عنوان الشحن" : "Shipping Address"}
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  ${order.shippingAddress}
                </p>
              </div>
              
              <!-- Payment Method -->
              <div>
                <h4
                  class="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  data-text-ar="طريقة الدفع"
                  data-text-en="Payment Method"
                >
                  ${lang === "ar" ? "طريقة الدفع" : "Payment Method"}
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  ${order.paymentMethod}
                </p>
              </div>
              
              <!-- Tracking Number -->
              <div>
                <h4
                  class="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  data-text-ar="رقم التتبع"
                  data-text-en="Tracking Number"
                >
                  ${lang === "ar" ? "رقم التتبع" : "Tracking Number"}
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  ${order.trackingNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  // Setup click handlers for order items
  const orderItems = ordersListContainer.querySelectorAll(".order-item-header");
  orderItems.forEach((item) => {
    item.addEventListener("click", () => {
      const orderWrapper = item.closest(".order-item-wrapper");
      const details = orderWrapper.querySelector(".order-item-details");
      const arrow = item.querySelector(".order-arrow");
      
      if (details && arrow) {
        const isHidden = details.classList.contains("hidden");
        
        if (isHidden) {
          details.classList.remove("hidden");
          arrow.classList.add("rotate-180");
        } else {
          details.classList.add("hidden");
          arrow.classList.remove("rotate-180");
        }
      }
    });
  });

  // Update text when language changes
  const langObserver = new MutationObserver(() => {
    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    const orderItems = ordersListContainer.querySelectorAll(".order-item-wrapper");
    orderItems.forEach((item) => {
      // Update status badge
      const statusBadge = item.querySelector("span[data-text-ar]");
      if (statusBadge && statusBadge.classList.contains("rounded-full")) {
        const textAr = statusBadge.getAttribute("data-text-ar");
        const textEn = statusBadge.getAttribute("data-text-en");
        if (textAr && textEn) {
          statusBadge.textContent = currentLang === "ar" ? textAr : textEn;
        }
      }
      
      // Update items text
      const itemsText = item.querySelector("span[data-text-ar]");
      if (itemsText && itemsText.getAttribute("data-text-ar")?.includes("منتج")) {
        const textAr = itemsText.getAttribute("data-text-ar");
        const textEn = itemsText.getAttribute("data-text-en");
        if (textAr && textEn) {
          itemsText.textContent = currentLang === "ar" ? textAr : textEn;
        }
      }
      
      // Update details section headers
      const detailHeaders = item.querySelectorAll(".order-item-details h4[data-text-ar]");
      detailHeaders.forEach((header) => {
        const textAr = header.getAttribute("data-text-ar");
        const textEn = header.getAttribute("data-text-en");
        if (textAr && textEn) {
          header.textContent = currentLang === "ar" ? textAr : textEn;
        }
      });
    });
  });

  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
}

// Update Apps Menu Translations
function updateAppsMenuTranslations() {
  const appsMenu = document.getElementById("apps-menu");
  if (!appsMenu) return;

  const currentLang = document.documentElement.getAttribute("lang") || "ar";
  const appItems = appsMenu.querySelectorAll(".app-item");

  appItems.forEach((item) => {
    // Find title (the span with text-sm font-medium class)
    const titleSpan = item.querySelector("span.text-sm.font-medium");
    
    // Find description (the span with text-xs class that is inside the flex-col div)
    const descriptionSpan = item.querySelector("span.text-xs.text-slate-500, span.text-xs.text-slate-400");

    // Update title
    if (titleSpan) {
      const textAr = titleSpan.getAttribute("data-text-ar");
      const textEn = titleSpan.getAttribute("data-text-en");
      if (textAr && textEn) {
        titleSpan.textContent = currentLang === "ar" ? textAr : textEn;
      }
    }

    // Update description
    if (descriptionSpan) {
      const descAr = descriptionSpan.getAttribute("data-text-ar");
      const descEn = descriptionSpan.getAttribute("data-text-en");
      if (descAr && descEn) {
        descriptionSpan.textContent = currentLang === "ar" ? descAr : descEn;
      }
    }
  });
}

// Help Center Modal Manager
const helpCenterManager = {
  modal: null,
  header: null,
  closeBtn: null,
  isDragging: false,
  currentX: 0,
  currentY: 0,
  initialX: 0,
  initialY: 0,
  xOffset: 0,
  yOffset: 0,

  init() {
    this.modal = document.getElementById("help-center-modal");
    this.header = document.getElementById("help-center-modal-header");
    this.closeBtn = document.getElementById("help-center-modal-close");
    const helpCenterBtn = document.getElementById("help-center");

    if (!this.modal || !this.header || !this.closeBtn || !helpCenterBtn) return;

    // Open modal
    helpCenterBtn.addEventListener("click", () => {
      this.openModal();
    });

    // Close modal
    this.closeBtn.addEventListener("click", () => {
      this.closeModal();
    });

    // Setup drag functionality
    this.setupDrag();

    // Setup tabs
    this.setupTabs();

    // Setup search
    this.setupSearch();

    // Initial position calculation
    this.setInitialPosition();
  },

  setInitialPosition() {
    if (!this.modal) return;
    const helpCenterBtn = document.getElementById("help-center");
    if (helpCenterBtn) {
      const btnRect = helpCenterBtn.getBoundingClientRect();
      const modalWidth = this.modal.offsetWidth || 400;
      const modalHeight = this.modal.offsetHeight || 550;

      let left = btnRect.left - modalWidth / 2 + btnRect.width / 2;
      let top = btnRect.top + btnRect.height + 10;

      // Ensure modal stays within viewport
      if (left + modalWidth > window.innerWidth) {
        left = window.innerWidth - modalWidth - 20;
      }
      if (left < 0) {
        left = 20;
      }
      if (top + modalHeight > window.innerHeight) {
        top = window.innerHeight - modalHeight - 20;
      }
      if (top < 60) {
        top = 70;
      }

      this.modal.style.left = left + "px";
      this.modal.style.top = top + "px";
      this.modal.style.right = "auto";
    }
  },

  openModal() {
    if (!this.modal) return;
    this.setInitialPosition();
    this.modal.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
    this.modal.classList.add("opacity-100", "visible", "translate-y-0");
    // Reset to first tab
    this.switchTab("getting-started");
  },

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
    this.modal.classList.remove("opacity-100", "visible", "translate-y-0");
  },

  setupDrag() {
    if (!this.header || !this.modal) return;

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    this.header.addEventListener("mousedown", (e) => {
      if (e.target.closest("#help-center-modal-close")) return;
      
      this.isDragging = true;
      const rect = this.modal.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = rect.left;
      initialTop = rect.top;

      this.modal.style.cursor = "move";
      this.modal.style.transition = "none";
      e.preventDefault();
    });

    const handleMouseMove = (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      // Ensure modal stays within viewport
      const modalWidth = this.modal.offsetWidth;
      const modalHeight = this.modal.offsetHeight;

      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft + modalWidth > window.innerWidth) {
        newLeft = window.innerWidth - modalWidth;
      }

      if (newTop < 0) {
        newTop = 0;
      } else if (newTop + modalHeight > window.innerHeight) {
        newTop = window.innerHeight - modalHeight;
      }

      this.modal.style.left = newLeft + "px";
      this.modal.style.top = newTop + "px";
      this.modal.style.right = "auto";
      this.modal.style.transform = "none";
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseup", () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.modal.style.cursor = "default";
        this.modal.style.transition = "";
      }
    });
  },

  setupTabs() {
    const tabButtons = document.querySelectorAll(".help-tab-btn");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabName = btn.getAttribute("data-tab");
        this.switchTab(tabName);
      });
    });
  },

  switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll(".help-tab-content");
    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Show selected tab content
    const selectedContent = document.getElementById(`help-tab-${tabName}`);
    if (selectedContent) {
      selectedContent.classList.remove("hidden");
    }

    // Update tab buttons
    const tabButtons = document.querySelectorAll(".help-tab-btn");
    tabButtons.forEach((btn) => {
      const btnTab = btn.getAttribute("data-tab");
      if (btnTab === tabName) {
        btn.classList.add(
          "text-blue-600",
          "dark:text-blue-400",
          "border-b-2",
          "border-blue-600",
          "dark:border-blue-400"
        );
        btn.classList.remove(
          "text-slate-600",
          "dark:text-slate-400"
        );
      } else {
        btn.classList.remove(
          "text-blue-600",
          "dark:text-blue-400",
          "border-b-2",
          "border-blue-600",
          "dark:border-blue-400"
        );
        btn.classList.add("text-slate-600", "dark:text-slate-400");
      }
    });
  },

  setupSearch() {
    const searchInput = document.getElementById("help-search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      this.searchHelp(query);
    });
  },

  searchHelp(query) {
    if (!query) {
      // Show all items
      const allItems = document.querySelectorAll(".help-tab-content a");
      allItems.forEach((item) => {
        item.style.display = "block";
      });
      return;
    }

    // Search in all tabs
    const allItems = document.querySelectorAll(".help-tab-content a");
    allItems.forEach((item) => {
      const title = item.querySelector(".font-medium")?.textContent?.toLowerCase() || "";
      const description = item.querySelector(".text-xs")?.textContent?.toLowerCase() || "";
      const itemText = title + " " + description;

      if (itemText.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  },
};

// Search Modal Manager
const searchManager = {
  modal: null,
  input: null,
  resultsContainer: null,
  resultsDiv: null,
  historyDiv: null,
  historyListDiv: null,
  noResultsDiv: null,
  selectedIndex: -1,
  searchResults: [],
  searchHistory: [],

  // Available pages to search
  pages: [
    { title: "لوحة التحكم", titleEn: "Dashboard", path: "index.html", description: "الصفحة الرئيسية", descriptionEn: "Main page" },
    { title: "المحادثات", titleEn: "Chats", path: "chats.html", description: "إدارة المحادثات", descriptionEn: "Manage conversations" },
    { title: "التدفقات", titleEn: "Flows", path: "flows.html", description: "إنشاء تدفقات العمل", descriptionEn: "Create workflows" },
    { title: "الذكاء الاصطناعي", titleEn: "AI", path: "ai.html", description: "أدوات الذكاء الاصطناعي", descriptionEn: "AI tools" },
    { title: "الطلبات", titleEn: "Orders", path: "orders.html", description: "إدارة الطلبات", descriptionEn: "Manage orders" },
    { title: "العملاء", titleEn: "Customers", path: "customers.html", description: "إدارة العملاء", descriptionEn: "Manage customers" },
    { title: "المنتجات", titleEn: "Products", path: "products.html", description: "إدارة المنتجات", descriptionEn: "Manage products" },
    { title: "المتاجر", titleEn: "Stores", path: "stores.html", description: "إدارة المتاجر", descriptionEn: "Manage stores" },
    { title: "المكتبة", titleEn: "Library", path: "library.html", description: "الموارد والمكتبات", descriptionEn: "Resources and libraries" },
    { title: "الإعدادات", titleEn: "Settings", path: "settings.html", description: "إعدادات النظام", descriptionEn: "System settings" },
  ],

  init() {
    this.modal = document.getElementById("search-modal");
    this.input = document.getElementById("search-modal-input");
    this.resultsContainer = document.getElementById("search-results-container");
    this.resultsDiv = document.getElementById("search-results");
    this.historyDiv = document.getElementById("search-history");
    this.historyListDiv = document.getElementById("search-history-list");
    this.noResultsDiv = document.getElementById("search-no-results");
    const searchBtn = document.getElementById("search");

    if (!this.modal || !this.input || !searchBtn) return;

    // Load search history from localStorage
    this.loadSearchHistory();

    // Open modal
    searchBtn.addEventListener("click", () => {
      this.openModal();
    });

    // Close modal on overlay click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Setup search input
    this.setupSearchInput();

    // Setup keyboard navigation
    this.setupKeyboardNavigation();
  },

  loadSearchHistory() {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      try {
        this.searchHistory = JSON.parse(history);
      } catch (e) {
        this.searchHistory = [];
      }
    }
    this.renderSearchHistory();
  },

  saveSearchHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
  },

  addToHistory(query) {
    if (!query.trim()) return;
    
    // Remove if already exists
    this.searchHistory = this.searchHistory.filter((item) => item !== query);
    
    // Add to beginning
    this.searchHistory.unshift(query);
    
    // Keep only last 10
    if (this.searchHistory.length > 10) {
      this.searchHistory = this.searchHistory.slice(0, 10);
    }
    
    this.saveSearchHistory();
    this.renderSearchHistory();
  },

  renderSearchHistory() {
    if (!this.historyListDiv) return;
    
    if (this.searchHistory.length === 0) {
      this.historyListDiv.innerHTML = `
        <p class="text-sm text-slate-400 dark:text-slate-500 text-center py-4" data-text-ar="لا توجد عمليات بحث سابقة" data-text-en="No recent searches">لا توجد عمليات بحث سابقة</p>
      `;
      return;
    }

    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    
    this.historyListDiv.innerHTML = this.searchHistory
      .map(
        (query, index) => `
          <button
            class="search-history-item w-full text-right px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 text-sm text-slate-700 dark:text-slate-300"
            data-query="${query}"
          >
            <div class="flex items-center justify-between">
              <span>${query}</span>
              <i class="hgi-stroke hgi-arrow-left-01 text-xs text-slate-400"></i>
            </div>
          </button>
        `
      )
      .join("");

    // Add click listeners to history items
    this.historyListDiv.querySelectorAll(".search-history-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const query = btn.getAttribute("data-query");
        this.input.value = query;
        this.performSearch(query);
      });
    });
  },

  setupSearchInput() {
    if (!this.input) return;

    this.input.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      if (query) {
        this.performSearch(query);
      } else {
        this.showHistory();
      }
    });

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (this.selectedIndex >= 0 && this.searchResults.length > 0) {
          this.selectResult(this.selectedIndex);
        }
      }
    });
  },

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (!this.modal || !this.modal.classList.contains("opacity-100")) return;

      if (e.key === "Escape") {
        this.closeModal();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateResults(1);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateResults(-1);
        return;
      }
    });
  },

  navigateResults(direction) {
    if (!this.searchResults.length) return;

    this.selectedIndex += direction;

    if (this.selectedIndex < 0) {
      this.selectedIndex = this.searchResults.length - 1;
    } else if (this.selectedIndex >= this.searchResults.length) {
      this.selectedIndex = 0;
    }

    this.highlightResult(this.selectedIndex);
    
    // Scroll into view
    const selectedElement = this.resultsDiv?.children[this.selectedIndex];
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  },

  highlightResult(index) {
    const items = this.resultsDiv?.querySelectorAll(".search-result-item");
    if (!items) return;

    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add("bg-blue-50", "dark:bg-blue-900/20", "ring-2", "ring-blue-500");
        item.classList.remove("hover:bg-slate-100", "dark:hover:bg-slate-700");
      } else {
        item.classList.remove("bg-blue-50", "dark:bg-blue-900/20", "ring-2", "ring-blue-500");
        item.classList.add("hover:bg-slate-100", "dark:hover:bg-slate-700");
      }
    });
  },

  performSearch(query) {
    if (!query.trim()) {
      this.showHistory();
      return;
    }

    this.selectedIndex = -1;
    const currentLang = document.documentElement.getAttribute("lang") || "ar";
    const queryLower = query.toLowerCase();

    // Filter pages based on search query
    this.searchResults = this.pages.filter((page) => {
      const title = currentLang === "ar" ? page.title : page.titleEn;
      const description = currentLang === "ar" ? page.description : page.descriptionEn;
      const path = page.path;
      
      return (
        title.toLowerCase().includes(queryLower) ||
        description.toLowerCase().includes(queryLower) ||
        path.toLowerCase().includes(queryLower)
      );
    });

    this.renderResults();

    // Show history or results
    if (this.searchResults.length > 0) {
      this.showResults();
    } else {
      this.showNoResults();
    }
  },

  renderResults() {
    if (!this.resultsDiv) return;

    const currentLang = document.documentElement.getAttribute("lang") || "ar";

    this.resultsDiv.innerHTML = this.searchResults
      .map(
        (page, index) => `
          <a
            href="${page.path}"
            class="search-result-item block px-4 py-3 rounded-lg transition-colors duration-150 text-right"
            data-index="${index}"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    ${currentLang === "ar" ? page.title : page.titleEn}
                  </span>
                  <span class="text-xs text-slate-400 dark:text-slate-500 font-mono">${page.path}</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                  ${currentLang === "ar" ? page.description : page.descriptionEn}
                </p>
              </div>
              <i class="hgi-stroke hgi-arrow-left-01 text-xs text-slate-400 flex-shrink-0 mr-2"></i>
            </div>
          </a>
        `
      )
      .join("");

    // Add click listeners
    this.resultsDiv.querySelectorAll(".search-result-item").forEach((link) => {
      link.addEventListener("click", (e) => {
        const index = parseInt(link.getAttribute("data-index"));
        this.selectResult(index);
      });
    });
  },

  selectResult(index) {
    if (index >= 0 && index < this.searchResults.length) {
      const page = this.searchResults[index];
      const query = this.input?.value.trim();
      
      if (query) {
        this.addToHistory(query);
      }
      
      window.location.href = page.path;
    }
  },

  showHistory() {
    if (this.historyDiv) this.historyDiv.classList.remove("hidden");
    if (this.resultsDiv) this.resultsDiv.classList.add("hidden");
    if (this.noResultsDiv) this.noResultsDiv.classList.add("hidden");
  },

  showResults() {
    if (this.historyDiv) this.historyDiv.classList.add("hidden");
    if (this.resultsDiv) this.resultsDiv.classList.remove("hidden");
    if (this.noResultsDiv) this.noResultsDiv.classList.add("hidden");
  },

  showNoResults() {
    if (this.historyDiv) this.historyDiv.classList.add("hidden");
    if (this.resultsDiv) this.resultsDiv.classList.add("hidden");
    if (this.noResultsDiv) this.noResultsDiv.classList.remove("hidden");
  },

  openModal() {
    if (!this.modal) return;
    this.modal.classList.remove("opacity-0", "invisible");
    this.modal.classList.add("opacity-100", "visible");
    
    const modalContent = this.modal.querySelector("div > div");
    if (modalContent) {
      modalContent.classList.remove("scale-95");
      modalContent.classList.add("scale-100");
    }

    // Focus input after a short delay
    setTimeout(() => {
      if (this.input) {
        this.input.focus();
        this.input.select();
      }
    }, 100);

    // Show history if input is empty
    if (!this.input.value.trim()) {
      this.showHistory();
    }
  },

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add("opacity-0", "invisible");
    this.modal.classList.remove("opacity-100", "visible");
    
    const modalContent = this.modal.querySelector("div > div");
    if (modalContent) {
      modalContent.classList.add("scale-95");
      modalContent.classList.remove("scale-100");
    }

    // Clear input and reset
    if (this.input) {
      this.input.value = "";
    }
    this.selectedIndex = -1;
    this.searchResults = [];
  },
};

// Notifications Dropdown Manager
const notificationsManager = {
  dropdown: null,
  button: null,

  init() {
    this.dropdown = document.getElementById("notifications-dropdown");
    this.button = document.getElementById("notifications");

    if (!this.dropdown || !this.button) return;

    // Update dropdown position based on direction
    this.updateDropdownPosition();

    // Toggle dropdown
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.dropdown &&
        !this.dropdown.contains(e.target) &&
        !this.button.contains(e.target)
      ) {
        this.closeDropdown();
      }
    });

    // Setup tabs
    this.setupTabs();

    // Watch for direction changes
    const observer = new MutationObserver(() => {
      this.updateDropdownPosition();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir", "lang"],
    });
  },

  updateDropdownPosition() {
    if (!this.dropdown) return;
    const dir = document.documentElement.getAttribute("dir") || "rtl";
    
    if (dir === "rtl") {
      // For RTL, position on the left
      this.dropdown.style.right = "auto";
      this.dropdown.style.left = "0";
    } else {
      // For LTR, position on the right
      this.dropdown.style.left = "auto";
      this.dropdown.style.right = "0";
    }
  },

  toggleDropdown() {
    if (!this.dropdown) return;

    const isVisible = this.dropdown.classList.contains("opacity-0");

    if (isVisible) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  },

  openDropdown() {
    if (!this.dropdown) return;
    this.dropdown.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
    this.dropdown.classList.add("opacity-100", "visible", "translate-y-0");
    
    // Switch to first tab (actions)
    this.switchTab("actions");
  },

  closeDropdown() {
    if (!this.dropdown) return;
    this.dropdown.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
    this.dropdown.classList.remove("opacity-100", "visible", "translate-y-0");
  },

  setupTabs() {
    const tabButtons = document.querySelectorAll(".notifications-tab-btn");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabName = btn.getAttribute("data-tab");
        this.switchTab(tabName);
      });
    });
  },

  switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll(".notifications-tab-content");
    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Show selected tab content
    const selectedContent = document.getElementById(`notifications-tab-${tabName}`);
    if (selectedContent) {
      selectedContent.classList.remove("hidden");
    }

    // Update tab buttons
    const tabButtons = document.querySelectorAll(".notifications-tab-btn");
    tabButtons.forEach((btn) => {
      const btnTab = btn.getAttribute("data-tab");
      if (btnTab === tabName) {
        btn.classList.add(
          "text-blue-600",
          "dark:text-blue-400",
          "border-b-2",
          "border-blue-600",
          "dark:border-blue-400"
        );
        btn.classList.remove(
          "text-slate-600",
          "dark:text-slate-400"
        );
      } else {
        btn.classList.remove(
          "text-blue-600",
          "dark:text-blue-400",
          "border-b-2",
          "border-blue-600",
          "dark:border-blue-400"
        );
        btn.classList.add("text-slate-600", "dark:text-slate-400");
      }
    });
  },
};

// Account Dropdown Manager
const accountManager = {
  dropdown: null,
  button: null,

  init() {
    this.dropdown = document.getElementById("account-dropdown");
    this.button = document.getElementById("account");

    if (!this.dropdown || !this.button) return;

    // Update dropdown position based on direction
    this.updateDropdownPosition();

    // Toggle dropdown
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.dropdown &&
        !this.dropdown.contains(e.target) &&
        !this.button.contains(e.target)
      ) {
        this.closeDropdown();
      }
    });

    // Setup copy store link button
    const copyStoreLinkBtn = document.getElementById("copy-store-link-btn");
    if (copyStoreLinkBtn) {
      copyStoreLinkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.copyStoreLink();
      });
    }

    // Setup profile buttons tooltips
    const profileEditBtn = document.getElementById("profile-edit-btn");
    const profileLogoutBtn = document.getElementById("profile-logout-btn");
    
    if (profileEditBtn) {
      const tooltip = profileEditBtn.querySelector(".tooltip-element");
      if (tooltip) {
        profileEditBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          const currentLang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            tooltipText.textContent =
              currentLang === "ar"
                ? profileEditBtn.getAttribute("data-text-ar")
                : profileEditBtn.getAttribute("data-text-en");
          }
        });
        profileEditBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });
      }
    }

    if (profileLogoutBtn) {
      const tooltip = profileLogoutBtn.querySelector(".tooltip-element");
      if (tooltip) {
        profileLogoutBtn.addEventListener("mouseenter", () => {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          const currentLang = document.documentElement.getAttribute("lang") || "ar";
          const tooltipText = tooltip.querySelector(".tooltip-text");
          if (tooltipText) {
            tooltipText.textContent =
              currentLang === "ar"
                ? profileLogoutBtn.getAttribute("data-text-ar")
                : profileLogoutBtn.getAttribute("data-text-en");
          }
        });
        profileLogoutBtn.addEventListener("mouseleave", () => {
          tooltip.classList.remove("opacity-100");
          tooltip.classList.add("opacity-0");
        });
      }
    }

    // Watch for direction changes
    const observer = new MutationObserver(() => {
      this.updateDropdownPosition();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir", "lang"],
    });
  },

  updateDropdownPosition() {
    if (!this.dropdown) return;
    const dir = document.documentElement.getAttribute("dir") || "rtl";
    
    if (dir === "rtl") {
      // For RTL, position on the left
      this.dropdown.style.right = "auto";
      this.dropdown.style.left = "0";
    } else {
      // For LTR, position on the right
      this.dropdown.style.left = "auto";
      this.dropdown.style.right = "0";
    }
  },

  toggleDropdown() {
    if (!this.dropdown) return;

    const isVisible = this.dropdown.classList.contains("opacity-0");

    if (isVisible) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  },

  openDropdown() {
    if (!this.dropdown) return;
    this.dropdown.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
    this.dropdown.classList.add("opacity-100", "visible", "translate-y-0");
  },

  closeDropdown() {
    if (!this.dropdown) return;
    this.dropdown.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
    this.dropdown.classList.remove("opacity-100", "visible", "translate-y-0");
  },

  copyStoreLink() {
    const storeLink = window.location.origin; // You can change this to actual store link
    navigator.clipboard.writeText(storeLink).then(() => {
      // Show feedback
      const btn = document.getElementById("copy-store-link-btn");
      if (btn) {
        const originalText = btn.querySelector("span").textContent;
        btn.querySelector("span").textContent = "تم النسخ!";
        setTimeout(() => {
          btn.querySelector("span").textContent = originalText;
        }, 2000);
      }
    }).catch(() => {
      // Fallback if clipboard API fails
      const btn = document.getElementById("copy-store-link-btn");
      if (btn) {
        const originalText = btn.querySelector("span").textContent;
        btn.querySelector("span").textContent = "فشل النسخ";
        setTimeout(() => {
          btn.querySelector("span").textContent = originalText;
        }, 2000);
      }
    });
  },
};

// Initialize Search Manager on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    helpCenterManager.init();
    searchManager.init();
    notificationsManager.init();
    accountManager.init();
    setupMessageActions();
  });
} else {
  helpCenterManager.init();
  searchManager.init();
  notificationsManager.init();
  accountManager.init();
  setupMessageActions();
}

// Function to add message to chat
function addMessageToChat(messageData) {
  const messagesContent = document.getElementById("messages-content");
  if (!messagesContent) return;

  // Initialize messages array if not exists
  if (!window.currentChatMessages) {
    window.currentChatMessages = [];
  }

  // Get current time
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "م" : "ص";
  const displayHours = hours % 12 || 12;
  const time = `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  // Create new message object
  const newMessage = {
    id: Date.now(),
    type: messageData.type || "text",
    text: messageData.text || "",
    sender: messageData.sender || "me",
    senderName: messageData.senderName || "أنت",
    senderAvatar: messageData.senderAvatar || "https://ui-avatars.com/api/?name=You&size=32&background=0090D6&color=fff",
    time: time,
    status: messageData.status || "sent",
    url: messageData.url || "",
    fileName: messageData.fileName || "",
    fileSize: messageData.fileSize || "",
    fileType: messageData.fileType || "",
    caption: messageData.caption || "",
    thumbnail: messageData.thumbnail || "",
    ...messageData,
  };

  // Add message to array
  window.currentChatMessages.push(newMessage);

  // Re-render messages
  renderMessages(window.currentChatMessages, messagesContent);

  // Scroll to bottom
  setTimeout(() => {
    messagesContent.scrollTop = messagesContent.scrollHeight;
  }, 100);
}

// Sample flows/journeys list (Global scope)
const sampleFlows = [
  { id: 1, name: "تدفق الترحيب", nameEn: "Welcome Flow" },
  { id: 2, name: "تدفق الطلب", nameEn: "Order Flow" },
  { id: 3, name: "تدفق الدعم", nameEn: "Support Flow" },
  { id: 4, name: "تدفق الاستطلاع", nameEn: "Survey Flow" },
  { id: 5, name: "تدفق التسويق", nameEn: "Marketing Flow" },
  { id: 6, name: "تدفق المتابعة", nameEn: "Follow-up Flow" },
  { id: 7, name: "تدفق الاستفسار", nameEn: "Inquiry Flow" },
  { id: 8, name: "تدفق التقييم", nameEn: "Rating Flow" },
  { id: 9, name: "تدفق الإشعارات", nameEn: "Notifications Flow" },
  { id: 10, name: "تدفق الحجز", nameEn: "Booking Flow" },
  { id: 11, name: "تدفق الدفع", nameEn: "Payment Flow" },
  { id: 12, name: "تدفق التأكيد", nameEn: "Confirmation Flow" },
  { id: 13, name: "تدفق الإلغاء", nameEn: "Cancellation Flow" },
  { id: 14, name: "تدفق الاسترجاع", nameEn: "Return Flow" },
  { id: 15, name: "تدفق الشكاوى", nameEn: "Complaints Flow" },
  { id: 16, name: "تدفق الاقتراحات", nameEn: "Suggestions Flow" },
  { id: 17, name: "تدفق التحديثات", nameEn: "Updates Flow" },
  { id: 18, name: "تدفق الإشتراك", nameEn: "Subscription Flow" },
  { id: 19, name: "تدفق الإلغاء الإشتراك", nameEn: "Unsubscribe Flow" },
  { id: 20, name: "تدفق التذكير", nameEn: "Reminder Flow" },
];

// Sample nodes list (Global scope)
const sampleNodes = [
  { id: 1, name: "عقدة البدء", nameEn: "Start Node", flowId: 1, flowName: "تدفق الترحيب", flowNameEn: "Welcome Flow" },
  { id: 2, name: "عقدة الشرط", nameEn: "Condition Node", flowId: 1, flowName: "تدفق الترحيب", flowNameEn: "Welcome Flow" },
  { id: 3, name: "عقدة الإرسال", nameEn: "Send Node", flowId: 2, flowName: "تدفق الطلب", flowNameEn: "Order Flow" },
  { id: 4, name: "عقدة الانتظار", nameEn: "Wait Node", flowId: 2, flowName: "تدفق الطلب", flowNameEn: "Order Flow" },
  { id: 5, name: "عقدة النهاية", nameEn: "End Node", flowId: 3, flowName: "تدفق الدعم", flowNameEn: "Support Flow" },
  { id: 6, name: "عقدة التحقق", nameEn: "Verification Node", flowId: 3, flowName: "تدفق الدعم", flowNameEn: "Support Flow" },
  { id: 7, name: "عقدة المعالجة", nameEn: "Processing Node", flowId: 4, flowName: "تدفق الاستطلاع", flowNameEn: "Survey Flow" },
  { id: 8, name: "عقدة التخزين", nameEn: "Storage Node", flowId: 4, flowName: "تدفق الاستطلاع", flowNameEn: "Survey Flow" },
  { id: 9, name: "عقدة الإشعار", nameEn: "Notification Node", flowId: 5, flowName: "تدفق التسويق", flowNameEn: "Marketing Flow" },
  { id: 10, name: "عقدة التوجيه", nameEn: "Routing Node", flowId: 5, flowName: "تدفق التسويق", flowNameEn: "Marketing Flow" },
  { id: 11, name: "عقدة التحويل", nameEn: "Transfer Node", flowId: 6, flowName: "تدفق المتابعة", flowNameEn: "Follow-up Flow" },
  { id: 12, name: "عقدة التجميع", nameEn: "Aggregation Node", flowId: 6, flowName: "تدفق المتابعة", flowNameEn: "Follow-up Flow" },
  { id: 13, name: "عقدة التصفية", nameEn: "Filter Node", flowId: 7, flowName: "تدفق الاستفسار", flowNameEn: "Inquiry Flow" },
  { id: 14, name: "عقدة الفرز", nameEn: "Sort Node", flowId: 7, flowName: "تدفق الاستفسار", flowNameEn: "Inquiry Flow" },
  { id: 15, name: "عقدة التحليل", nameEn: "Analysis Node", flowId: 8, flowName: "تدفق التقييم", flowNameEn: "Rating Flow" },
  { id: 16, name: "عقدة التجميع", nameEn: "Collection Node", flowId: 8, flowName: "تدفق التقييم", flowNameEn: "Rating Flow" },
  { id: 17, name: "عقدة الإرسال الجماعي", nameEn: "Bulk Send Node", flowId: 9, flowName: "تدفق الإشعارات", flowNameEn: "Notifications Flow" },
  { id: 18, name: "عقدة الجدولة", nameEn: "Scheduling Node", flowId: 9, flowName: "تدفق الإشعارات", flowNameEn: "Notifications Flow" },
  { id: 19, name: "عقدة التحقق من التوفر", nameEn: "Availability Check Node", flowId: 10, flowName: "تدفق الحجز", flowNameEn: "Booking Flow" },
  { id: 20, name: "عقدة التأكيد", nameEn: "Confirmation Node", flowId: 10, flowName: "تدفق الحجز", flowNameEn: "Booking Flow" },
  { id: 21, name: "عقدة معالجة الدفع", nameEn: "Payment Processing Node", flowId: 11, flowName: "تدفق الدفع", flowNameEn: "Payment Flow" },
  { id: 22, name: "عقدة التحقق من الدفع", nameEn: "Payment Verification Node", flowId: 11, flowName: "تدفق الدفع", flowNameEn: "Payment Flow" },
  { id: 23, name: "عقدة إرسال التأكيد", nameEn: "Send Confirmation Node", flowId: 12, flowName: "تدفق التأكيد", flowNameEn: "Confirmation Flow" },
  { id: 24, name: "عقدة تحديث الحالة", nameEn: "Status Update Node", flowId: 12, flowName: "تدفق التأكيد", flowNameEn: "Confirmation Flow" },
  { id: 25, name: "عقدة التحقق من الإلغاء", nameEn: "Cancellation Check Node", flowId: 13, flowName: "تدفق الإلغاء", flowNameEn: "Cancellation Flow" },
  { id: 26, name: "عقدة معالجة الإلغاء", nameEn: "Cancellation Processing Node", flowId: 13, flowName: "تدفق الإلغاء", flowNameEn: "Cancellation Flow" },
  { id: 27, name: "عقدة التحقق من الاسترجاع", nameEn: "Return Check Node", flowId: 14, flowName: "تدفق الاسترجاع", flowNameEn: "Return Flow" },
  { id: 28, name: "عقدة معالجة الاسترجاع", nameEn: "Return Processing Node", flowId: 14, flowName: "تدفق الاسترجاع", flowNameEn: "Return Flow" },
  { id: 29, name: "عقدة استقبال الشكوى", nameEn: "Complaint Reception Node", flowId: 15, flowName: "تدفق الشكاوى", flowNameEn: "Complaints Flow" },
  { id: 30, name: "عقدة معالجة الشكوى", nameEn: "Complaint Processing Node", flowId: 15, flowName: "تدفق الشكاوى", flowNameEn: "Complaints Flow" },
  { id: 31, name: "عقدة جمع الاقتراحات", nameEn: "Suggestion Collection Node", flowId: 16, flowName: "تدفق الاقتراحات", flowNameEn: "Suggestions Flow" },
  { id: 32, name: "عقدة مراجعة الاقتراحات", nameEn: "Suggestion Review Node", flowId: 16, flowName: "تدفق الاقتراحات", flowNameEn: "Suggestions Flow" },
  { id: 33, name: "عقدة إرسال التحديثات", nameEn: "Send Updates Node", flowId: 17, flowName: "تدفق التحديثات", flowNameEn: "Updates Flow" },
  { id: 34, name: "عقدة تتبع التحديثات", nameEn: "Track Updates Node", flowId: 17, flowName: "تدفق التحديثات", flowNameEn: "Updates Flow" },
  { id: 35, name: "عقدة معالجة الاشتراك", nameEn: "Subscription Processing Node", flowId: 18, flowName: "تدفق الإشتراك", flowNameEn: "Subscription Flow" },
  { id: 36, name: "عقدة تفعيل الاشتراك", nameEn: "Subscription Activation Node", flowId: 18, flowName: "تدفق الإشتراك", flowNameEn: "Subscription Flow" },
  { id: 37, name: "عقدة التحقق من الإلغاء", nameEn: "Unsubscribe Check Node", flowId: 19, flowName: "تدفق الإلغاء الإشتراك", flowNameEn: "Unsubscribe Flow" },
  { id: 38, name: "عقدة معالجة الإلغاء", nameEn: "Unsubscribe Processing Node", flowId: 19, flowName: "تدفق الإلغاء الإشتراك", flowNameEn: "Unsubscribe Flow" },
  { id: 39, name: "عقدة إنشاء التذكير", nameEn: "Reminder Creation Node", flowId: 20, flowName: "تدفق التذكير", flowNameEn: "Reminder Flow" },
  { id: 40, name: "عقدة إرسال التذكير", nameEn: "Reminder Send Node", flowId: 20, flowName: "تدفق التذكير", flowNameEn: "Reminder Flow" },
  { id: 41, name: "عقدة التحقق من الهوية", nameEn: "Identity Verification Node", flowId: 1, flowName: "تدفق الترحيب", flowNameEn: "Welcome Flow" },
  { id: 42, name: "عقدة التخزين المؤقت", nameEn: "Cache Node", flowId: 2, flowName: "تدفق الطلب", flowNameEn: "Order Flow" },
  { id: 43, name: "عقدة التحقق من الصلاحيات", nameEn: "Permission Check Node", flowId: 3, flowName: "تدفق الدعم", flowNameEn: "Support Flow" },
  { id: 44, name: "عقدة التسجيل", nameEn: "Logging Node", flowId: 4, flowName: "تدفق الاستطلاع", flowNameEn: "Survey Flow" },
  { id: 45, name: "عقدة التحقق من الصحة", nameEn: "Validation Node", flowId: 5, flowName: "تدفق التسويق", flowNameEn: "Marketing Flow" },
  { id: 46, name: "عقدة التنسيق", nameEn: "Formatting Node", flowId: 6, flowName: "تدفق المتابعة", flowNameEn: "Follow-up Flow" },
  { id: 47, name: "عقدة التحويل", nameEn: "Conversion Node", flowId: 7, flowName: "تدفق الاستفسار", flowNameEn: "Inquiry Flow" },
  { id: 48, name: "عقدة التجميع", nameEn: "Grouping Node", flowId: 8, flowName: "تدفق التقييم", flowNameEn: "Rating Flow" },
  { id: 49, name: "عقدة التوزيع", nameEn: "Distribution Node", flowId: 9, flowName: "تدفق الإشعارات", flowNameEn: "Notifications Flow" },
  { id: 50, name: "عقدة الإنهاء", nameEn: "Termination Node", flowId: 10, flowName: "تدفق الحجز", flowNameEn: "Booking Flow" },
];

// Setup message actions (send, emoji, image, video, file, voice)
function setupMessageActions() {
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-message-btn");
  const emojiBtn = document.querySelector('[data-title-ar="إيموجي"]');
  const imageBtn = document.querySelector('[data-title-ar="صورة"]');
  const videoBtn = document.querySelector('[data-title-ar="فيديو"]');
  const fileBtn = document.querySelector('[data-title-ar="ملف"]');
  const voiceBtn = document.querySelector('[data-title-ar="صوت"]');
  const flowBtn = document.querySelector('[data-title-ar="تدفق"]');
  const mediaPreviewSection = document.getElementById("media-preview-section");
  const mediaPreviewContainer = document.getElementById("media-preview-container");

  // Store attached media files
  let attachedMedia = [];

  // Function to add media to preview
  const addMediaToPreview = (file, type) => {
    const mediaId = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const mediaItem = { id: mediaId, file, type };
    attachedMedia.push(mediaItem);

    // Show preview section
    if (mediaPreviewSection) {
      mediaPreviewSection.classList.remove("hidden");
    }

    // Create preview element
    const previewDiv = document.createElement("div");
    previewDiv.id = mediaId;
    previewDiv.className = "relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group";

    if (type === "image") {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewDiv.innerHTML = `
          <img src="${e.target.result}" alt="Preview" class="w-full h-full object-cover" />
          <button
            class="absolute top-0.5 end-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 remove-media-btn"
            data-media-id="${mediaId}"
            type="button"
          >
            <i class="hgi-stroke hgi-cancel-01 text-[10px]"></i>
          </button>
        `;
      };
      reader.readAsDataURL(file);
    } else if (type === "video") {
      const videoUrl = URL.createObjectURL(file);
      previewDiv.innerHTML = `
        <video src="${videoUrl}" class="w-full h-full object-cover" muted></video>
        <div class="absolute inset-0 flex items-center justify-center bg-black/30">
          <i class="hgi-stroke hgi-play text-white text-lg"></i>
        </div>
        <button
          class="absolute top-0.5 end-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 remove-media-btn"
          data-media-id="${mediaId}"
          type="button"
        >
          <i class="hgi-stroke hgi-cancel-01 text-[10px]"></i>
        </button>
      `;
    } else if (type === "file") {
      const fileSize = (file.size / 1024 / 1024).toFixed(2);
      previewDiv.className = "relative w-32 h-14 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group flex items-center gap-1.5 px-2";
      previewDiv.innerHTML = `
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-medium text-slate-900 dark:text-slate-100 truncate">${file.name}</div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400">${fileSize} MB</div>
        </div>
        <button
          class="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 remove-media-btn"
          data-media-id="${mediaId}"
          type="button"
        >
          <i class="hgi-stroke hgi-cancel-01 text-[10px]"></i>
        </button>
      `;
    }

    if (mediaPreviewContainer) {
      mediaPreviewContainer.appendChild(previewDiv);
    }

    // Add remove button listener
    const removeBtn = previewDiv.querySelector(".remove-media-btn");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        removeMediaFromPreview(mediaId);
      });
    }
  };

  // Function to remove media from preview
  const removeMediaFromPreview = (mediaId) => {
    attachedMedia = attachedMedia.filter(item => item.id !== mediaId);
    const previewElement = document.getElementById(mediaId);
    if (previewElement) {
      previewElement.remove();
    }

    // Hide preview section if no media left
    if (attachedMedia.length === 0 && mediaPreviewSection) {
      mediaPreviewSection.classList.add("hidden");
    }
  };

  // Function to clear all media
  const clearAllMedia = () => {
    attachedMedia = [];
    if (mediaPreviewContainer) {
      mediaPreviewContainer.innerHTML = "";
    }
    if (mediaPreviewSection) {
      mediaPreviewSection.classList.add("hidden");
    }
  };

  // Handle paste event for images, videos, and files
  if (messageInput) {
    messageInput.addEventListener("paste", (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item.type.indexOf("image") !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            addMediaToPreview(file, "image");
          }
        } else if (item.type.indexOf("video") !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            addMediaToPreview(file, "video");
          }
        }
      }
    });
  }

  // Send message
  if (sendBtn && messageInput) {
    sendBtn.addEventListener("click", () => {
      const messageText = messageInput.value.trim();
      const hasMedia = attachedMedia.length > 0;

      // Send text message if there's text and no media
      if (messageText && !hasMedia) {
        // Prepare message data
        const messageData = {
          type: "text",
          text: messageText,
          sender: "me",
          status: "sent",
        };

        // Add reply info if exists
        if (replyMessageInfo) {
          messageData.replyTo = {
            messageId: replyMessageInfo.id,
            text: replyMessageInfo.text,
            sender: replyMessageInfo.sender,
            senderName: replyMessageInfo.senderName || (replyMessageInfo.isMe ? "أنت" : replyMessageInfo.sender),
          };
        }

        // Send message
        addMessageToChat(messageData);

        // Clear input
        messageInput.value = "";

        // Clear reply info and hide preview
        if (replyMessageInfo) {
          replyMessageInfo = null;
          // Hide reply preview if exists
          const replyPreview = document.getElementById("reply-preview");
          if (replyPreview) {
            replyPreview.classList.add("hidden");
          }
        }
      }

      // Send media files
      if (hasMedia) {
        attachedMedia.forEach((mediaItem) => {
          let messageData = {};

          if (mediaItem.type === "image") {
            const reader = new FileReader();
            reader.onload = (event) => {
              messageData = {
                type: "image",
                url: event.target.result,
                caption: messageText || "",
                sender: "me",
                status: "sent",
              };

              // Add reply info if exists
              if (replyMessageInfo) {
                messageData.replyTo = {
                  messageId: replyMessageInfo.id,
                  text: replyMessageInfo.text,
                  sender: replyMessageInfo.sender,
                  senderName: replyMessageInfo.senderName || (replyMessageInfo.isMe ? "أنت" : replyMessageInfo.sender),
                };
              }

              addMessageToChat(messageData);
            };
            reader.readAsDataURL(mediaItem.file);
          } else if (mediaItem.type === "video") {
            messageData = {
              type: "video",
              url: URL.createObjectURL(mediaItem.file),
              thumbnail: "",
              caption: messageText || mediaItem.file.name,
              sender: "me",
              status: "sent",
            };

            // Add reply info if exists
            if (replyMessageInfo) {
              messageData.replyTo = {
                messageId: replyMessageInfo.id,
                text: replyMessageInfo.text,
                sender: replyMessageInfo.sender,
                senderName: replyMessageInfo.senderName || (replyMessageInfo.isMe ? "أنت" : replyMessageInfo.sender),
              };
            }

            addMessageToChat(messageData);
          } else if (mediaItem.type === "file") {
            const fileSize = (mediaItem.file.size / 1024 / 1024).toFixed(2) + " MB";
            const fileExtension = mediaItem.file.name.split(".").pop().toLowerCase();
            messageData = {
              type: "file",
              url: URL.createObjectURL(mediaItem.file),
              fileName: mediaItem.file.name,
              fileSize: fileSize,
              fileType: fileExtension,
              sender: "me",
              status: "sent",
            };

            // Add reply info if exists
            if (replyMessageInfo) {
              messageData.replyTo = {
                messageId: replyMessageInfo.id,
                text: replyMessageInfo.text,
                sender: replyMessageInfo.sender,
                senderName: replyMessageInfo.senderName || (replyMessageInfo.isMe ? "أنت" : replyMessageInfo.sender),
              };
            }

            addMessageToChat(messageData);
          }
        });

        // Clear media and input
        clearAllMedia();
        messageInput.value = "";

        // Clear reply info and hide preview
        if (replyMessageInfo) {
          replyMessageInfo = null;
          const replyPreview = document.getElementById("reply-preview");
          if (replyPreview) {
            replyPreview.classList.add("hidden");
          }
        }
      }
    });

    // Send on Enter (but allow Shift+Enter for new line)
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
      }
    });
  }

  // Emoji picker
  let emojiPicker = null;
  let isEmojiPickerOpen = false;

  const createEmojiPicker = () => {
    if (emojiPicker) return emojiPicker;

    const commonEmojis = [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
      "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
      "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
      "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
      "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
      "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "👏", "🙌", "👐",
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
      "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️",
    ];

    emojiPicker = document.createElement("div");
    emojiPicker.id = "emoji-picker";
    emojiPicker.className =
      "absolute bottom-full mb-2 left-0 w-64 h-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 grid grid-cols-8 gap-1 overflow-y-auto z-[1000]";
    emojiPicker.style.display = "none";
    emojiPicker.style.maxHeight = "256px";

    commonEmojis.forEach((emoji) => {
      const emojiBtn = document.createElement("button");
      emojiBtn.type = "button";
      emojiBtn.className =
        "w-8 h-8 flex items-center justify-center text-xl hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors duration-150";
      emojiBtn.textContent = emoji;
      emojiBtn.addEventListener("click", () => {
        if (messageInput) {
          const cursorPos = messageInput.selectionStart || messageInput.value.length;
          const textBefore = messageInput.value.substring(0, cursorPos);
          const textAfter = messageInput.value.substring(cursorPos);
          messageInput.value = textBefore + emoji + textAfter;
          messageInput.focus();
          messageInput.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
        }
        closeEmojiPicker();
      });
      emojiPicker.appendChild(emojiBtn);
    });

    const emojiBtnParent = emojiBtn?.parentElement;
    if (emojiBtnParent) {
      emojiBtnParent.style.position = "relative";
      emojiBtnParent.appendChild(emojiPicker);
    }

    return emojiPicker;
  };

  const openEmojiPicker = () => {
    if (!emojiPicker) {
      createEmojiPicker();
    }
    if (emojiPicker) {
      const isRTL = document.documentElement.getAttribute("dir") === "rtl";
      if (isRTL) {
        emojiPicker.style.right = "0";
        emojiPicker.style.left = "auto";
      } else {
        emojiPicker.style.left = "0";
        emojiPicker.style.right = "auto";
      }
      emojiPicker.style.display = "grid";
      isEmojiPickerOpen = true;
    }
  };

  const closeEmojiPicker = () => {
    if (emojiPicker) {
      emojiPicker.style.display = "none";
      isEmojiPickerOpen = false;
    }
  };

  if (emojiBtn) {
    emojiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isEmojiPickerOpen) {
        closeEmojiPicker();
      } else {
        openEmojiPicker();
      }
    });
  }

  // Close emoji picker when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isEmojiPickerOpen &&
      emojiPicker &&
      !emojiPicker.contains(e.target) &&
      !emojiBtn?.contains(e.target)
    ) {
      closeEmojiPicker();
    }
  });

  // Image picker
  if (imageBtn) {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.multiple = true;
    imageInput.style.display = "none";
    document.body.appendChild(imageInput);

    imageBtn.addEventListener("click", () => {
      imageInput.click();
    });

    imageInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach(file => {
          addMediaToPreview(file, "image");
        });
      }
      // Reset input
      imageInput.value = "";
    });
  }

  // Video picker
  if (videoBtn) {
    const videoInput = document.createElement("input");
    videoInput.type = "file";
    videoInput.accept = "video/*";
    videoInput.multiple = true;
    videoInput.style.display = "none";
    document.body.appendChild(videoInput);

    videoBtn.addEventListener("click", () => {
      videoInput.click();
    });

    videoInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach(file => {
          addMediaToPreview(file, "video");
        });
      }
      // Reset input
      videoInput.value = "";
    });
  }

  // File picker
  if (fileBtn) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach(file => {
          addMediaToPreview(file, "file");
        });
      }
      // Reset input
      fileInput.value = "";
    });
  }

  // Voice recorder
  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;
  let isPaused = false;
  let recordingStartTime = 0;
  let pausedDuration = 0;
  let pauseStartTime = 0;
  let recordingTimer = null;
  let audioStream = null;
  let isCancelled = false; // Flag to track if recording was cancelled

  const voiceRecordBtn = document.getElementById("voice-record-btn");
  const voiceRecordingControls = document.getElementById("voice-recording-controls");
  const voiceRecordingTimer = document.getElementById("voice-recording-timer");
  const voicePauseBtn = document.getElementById("voice-pause-btn");
  const voiceCancelBtn = document.getElementById("voice-cancel-btn");

  // Function to format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Function to update timer
  const updateTimer = () => {
    if (!isRecording || isPaused) return;
    
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - recordingStartTime - pausedDuration) / 1000);
    if (voiceRecordingTimer) {
      voiceRecordingTimer.textContent = formatTime(elapsed);
    }
  };

  // Function to start timer
  const startTimer = () => {
    if (recordingTimer) clearInterval(recordingTimer);
    recordingTimer = setInterval(updateTimer, 1000);
  };

  // Function to stop timer
  const stopTimer = () => {
    if (recordingTimer) {
      clearInterval(recordingTimer);
      recordingTimer = null;
    }
  };

  // Function to reset recording UI
  const resetRecordingUI = () => {
    if (voiceRecordBtn) {
      voiceRecordBtn.style.color = "#003e5c";
    }
    if (voiceRecordingControls) {
      voiceRecordingControls.classList.add("hidden");
    }
    if (voiceRecordingTimer) {
      voiceRecordingTimer.textContent = "0:00";
    }
    stopTimer();
    isRecording = false;
    isPaused = false;
    pausedDuration = 0;
    recordingStartTime = 0;
    pauseStartTime = 0;
  };

  // Start/Stop recording
  if (voiceRecordBtn) {
    voiceRecordBtn.addEventListener("click", async () => {
      if (!isRecording) {
        try {
          audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorder = new MediaRecorder(audioStream);
          audioChunks = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            // Only save recording if it wasn't cancelled
            if (!isCancelled && audioChunks.length > 0) {
              const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
              const audioUrl = URL.createObjectURL(audioBlob);
              const messageData = {
                type: "audio",
                url: audioUrl,
                sender: "me",
                status: "sent",
              };

              // Add reply info if exists
              if (replyMessageInfo) {
                messageData.replyTo = {
                  messageId: replyMessageInfo.id,
                  text: replyMessageInfo.text,
                  sender: replyMessageInfo.sender,
                  senderName: replyMessageInfo.senderName || (replyMessageInfo.isMe ? "أنت" : replyMessageInfo.sender),
                };
                // Clear reply info after adding
                replyMessageInfo = null;
                const replyPreview = document.getElementById("reply-preview");
                if (replyPreview) {
                  replyPreview.classList.add("hidden");
                }
              }

              addMessageToChat(messageData);
            }
            // Clear audio chunks
            audioChunks = [];
            if (audioStream) {
              audioStream.getTracks().forEach((track) => track.stop());
              audioStream = null;
            }
            resetRecordingUI();
            isCancelled = false; // Reset cancellation flag
          };

          mediaRecorder.onpause = () => {
            pauseStartTime = Date.now();
          };

          mediaRecorder.onresume = () => {
            if (pauseStartTime > 0) {
              pausedDuration += Date.now() - pauseStartTime;
              pauseStartTime = 0;
            }
          };

          mediaRecorder.start();
          isRecording = true;
          isPaused = false;
          isCancelled = false; // Reset cancellation flag
          recordingStartTime = Date.now();
          pausedDuration = 0;
          
          // Update UI
          if (voiceRecordBtn) {
            voiceRecordBtn.style.color = "#ef4444"; // Red color when recording
          }
          if (voiceRecordingControls) {
            voiceRecordingControls.classList.remove("hidden");
          }
          startTimer();
          console.log("Recording started");
        } catch (error) {
          console.error("Error accessing microphone:", error);
          alert("لا يمكن الوصول إلى الميكروفون");
        }
      } else {
        // Stop recording
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
          stopTimer();
          mediaRecorder.stop();
        }
      }
    });
  }

  // Flow button - open flow selection modal
  if (flowBtn) {
    flowBtn.addEventListener("click", () => {
      // Get modal elements
      const flowSelectionModal = document.getElementById("flow-selection-modal");
      const flowTabFlows = document.getElementById("flow-selection-tab-flows");
      const flowTabNodes = document.getElementById("flow-selection-tab-nodes");
      const flowFlowsContent = document.getElementById("flow-selection-flows-content");
      const flowNodesContent = document.getElementById("flow-selection-nodes-content");
      const flowFlowsGrid = document.getElementById("flow-selection-flows-grid");
      const flowNodesList = document.getElementById("flow-selection-nodes-list");
      const flowSearchInput = document.getElementById("flow-selection-search");
      const flowFlowsPagination = document.getElementById("flow-selection-flows-pagination");
      const flowNodesPagination = document.getElementById("flow-selection-nodes-pagination");
      
      if (!flowSelectionModal) return;
      
      const lang = document.documentElement.getAttribute("lang") || "ar";
      
      // Mark as from message input
      flowSelectionModal.dataset.source = "message";
      flowSelectionModal.dataset.buttonIndex = "";
      
      // Reset to flows tab
      if (flowTabFlows && flowTabNodes && flowFlowsContent && flowNodesContent) {
        flowTabFlows.classList.add("border-b-2", "border-blue-500");
        flowTabFlows.classList.remove("text-slate-500", "dark:text-slate-400");
        flowTabFlows.classList.add("text-slate-700", "dark:text-slate-300");
        flowTabNodes.classList.remove("border-b-2", "border-blue-500");
        flowTabNodes.classList.add("text-slate-500", "dark:text-slate-400");
        flowTabNodes.classList.remove("text-slate-700", "dark:text-slate-300");
        flowFlowsContent.classList.remove("hidden");
        flowNodesContent.classList.add("hidden");
      }
      
      // Reset search and pagination
      if (flowSearchInput) {
        flowSearchInput.value = "";
      }
      let currentFlowPage = 1;
      let currentNodePage = 1;
      let filteredFlows = [...sampleFlows];
      let filteredNodes = [...sampleNodes];
      
      // Function to render flows
      const renderFlows = (flows, page = 1) => {
        if (!flowFlowsGrid) return;
        
        const flowsPerPage = 6;
        const startIndex = (page - 1) * flowsPerPage;
        const endIndex = startIndex + flowsPerPage;
        const paginatedFlows = flows.slice(startIndex, endIndex);
        
        flowFlowsGrid.innerHTML = "";
        
        if (paginatedFlows.length === 0) {
          flowFlowsGrid.innerHTML = `
            <div class="text-center py-8 text-slate-500 dark:text-slate-400">
              ${lang === "ar" ? "لا توجد تدفقات" : "No flows found"}
            </div>
          `;
          return;
        }
        
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
        
        paginatedFlows.forEach(flow => {
          const flowCard = document.createElement("div");
          flowCard.className = "p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 cursor-pointer";
          flowCard.dataset.flowId = flow.id;
          flowCard.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #dbf3ff;">
                <i class="hgi-stroke hgi-flow-chart text-lg" style="color: #003e5c;"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  ${lang === "ar" ? flow.name : flow.nameEn}
                </p>
              </div>
            </div>
          `;
          
          flowCard.addEventListener("click", () => {
            const messageInput = document.getElementById("message-input");
            if (messageInput) {
              const flowText = `{{flow:${flow.id}}}`;
              const cursorPos = messageInput.selectionStart || messageInput.value.length;
              const textBefore = messageInput.value.substring(0, cursorPos);
              const textAfter = messageInput.value.substring(cursorPos);
              messageInput.value = textBefore + flowText + textAfter;
              messageInput.setSelectionRange(cursorPos + flowText.length, cursorPos + flowText.length);
              messageInput.focus();
            }
            flowSelectionModal.classList.add("hidden");
          });
          
          grid.appendChild(flowCard);
        });
        
        flowFlowsGrid.appendChild(grid);
      };
      
      // Function to render nodes
      const renderNodes = (nodes, page = 1) => {
        if (!flowNodesList) return;
        
        const nodesPerPage = 10;
        const startIndex = (page - 1) * nodesPerPage;
        const endIndex = startIndex + nodesPerPage;
        const paginatedNodes = nodes.slice(startIndex, endIndex);
        
        flowNodesList.innerHTML = "";
        
        if (paginatedNodes.length === 0) {
          flowNodesList.innerHTML = `
            <div class="text-center py-8 text-slate-500 dark:text-slate-400">
              ${lang === "ar" ? "لا توجد عقد" : "No nodes found"}
            </div>
          `;
          return;
        }
        
        paginatedNodes.forEach(node => {
          const nodeRow = document.createElement("div");
          nodeRow.className = "flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150";
          nodeRow.innerHTML = `
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <i class="hgi-stroke hgi-node text-lg text-slate-400 dark:text-slate-500"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${lang === "ar" ? node.name : node.nameEn}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    ${lang === "ar" ? node.flowName : node.flowNameEn}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors duration-150 hover:opacity-90"
              style="background-color: #0090D6;"
              data-node-id="${node.id}"
            >
              ${lang === "ar" ? "اختر" : "Select"}
            </button>
          `;
          
          const selectBtn = nodeRow.querySelector("button");
          selectBtn.addEventListener("click", () => {
            const messageInput = document.getElementById("message-input");
            if (messageInput) {
              const nodeText = `{{node:${node.id}}}`;
              const cursorPos = messageInput.selectionStart || messageInput.value.length;
              const textBefore = messageInput.value.substring(0, cursorPos);
              const textAfter = messageInput.value.substring(cursorPos);
              messageInput.value = textBefore + nodeText + textAfter;
              messageInput.setSelectionRange(cursorPos + nodeText.length, cursorPos + nodeText.length);
              messageInput.focus();
            }
            flowSelectionModal.classList.add("hidden");
          });
          
          flowNodesList.appendChild(nodeRow);
        });
      };
      
      // Function to render pagination
      const renderPagination = (container, currentPage, totalPages, onPageChange) => {
        if (!container) return;
        
        container.innerHTML = "";
        
        if (totalPages <= 1) return;
        
        const paginationDiv = document.createElement("div");
        paginationDiv.className = "flex items-center justify-between w-full";
        
        const prevBtn = document.createElement("button");
        prevBtn.className = `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
          currentPage === 1
            ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`;
        prevBtn.textContent = lang === "ar" ? "السابق" : "Previous";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        });
        
        const pageNumbers = document.createElement("div");
        pageNumbers.className = "flex items-center gap-1";
        
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
          startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
          const firstBtn = document.createElement("button");
          firstBtn.className = "px-2 py-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors duration-150";
          firstBtn.textContent = "1";
          firstBtn.addEventListener("click", () => onPageChange(1));
          pageNumbers.appendChild(firstBtn);
          
          if (startPage > 2) {
            const ellipsis = document.createElement("span");
            ellipsis.className = "px-2 text-slate-400 dark:text-slate-600";
            ellipsis.textContent = "...";
            pageNumbers.appendChild(ellipsis);
          }
        }
        
        for (let i = startPage; i <= endPage; i++) {
          const pageBtn = document.createElement("button");
          pageBtn.className = `px-2 py-1 text-sm font-medium rounded transition-colors duration-150 ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`;
          pageBtn.textContent = i;
          pageBtn.addEventListener("click", () => onPageChange(i));
          pageNumbers.appendChild(pageBtn);
        }
        
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.className = "px-2 text-slate-400 dark:text-slate-600";
            ellipsis.textContent = "...";
            pageNumbers.appendChild(ellipsis);
          }
          
          const lastBtn = document.createElement("button");
          lastBtn.className = "px-2 py-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors duration-150";
          lastBtn.textContent = totalPages;
          lastBtn.addEventListener("click", () => onPageChange(totalPages));
          pageNumbers.appendChild(lastBtn);
        }
        
        const nextBtn = document.createElement("button");
        nextBtn.className = `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
          currentPage === totalPages
            ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`;
        nextBtn.textContent = lang === "ar" ? "التالي" : "Next";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        });
        
        const pageInfo = document.createElement("div");
        pageInfo.className = "text-xs text-slate-500 dark:text-slate-400";
        const totalItems = container.id.includes("flows") ? filteredFlows.length : filteredNodes.length;
        const startItem = (currentPage - 1) * (container.id.includes("flows") ? 6 : 10) + 1;
        const endItem = Math.min(currentPage * (container.id.includes("flows") ? 6 : 10), totalItems);
        pageInfo.textContent = `${startItem}-${endItem} ${lang === "ar" ? "من" : "of"} ${totalItems}`;
        
        paginationDiv.appendChild(prevBtn);
        paginationDiv.appendChild(pageNumbers);
        paginationDiv.appendChild(nextBtn);
        paginationDiv.appendChild(pageInfo);
        
        container.appendChild(paginationDiv);
      };
      
      // Helper functions for pagination
      const updateFlowsPage = (page) => {
        currentFlowPage = page;
        renderFlows(filteredFlows, currentFlowPage);
        renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / 6), updateFlowsPage);
      };
      
      const updateNodesPage = (page) => {
        currentNodePage = page;
        renderNodes(filteredNodes, currentNodePage);
        renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / 10), updateNodesPage);
      };
      
      // Setup search for flows
      if (flowSearchInput) {
        // Remove existing listeners to prevent duplicates
        const newSearchInput = flowSearchInput.cloneNode(true);
        flowSearchInput.parentNode.replaceChild(newSearchInput, flowSearchInput);
        
        newSearchInput.addEventListener("input", (e) => {
          const searchTerm = e.target.value.toLowerCase();
          filteredFlows = sampleFlows.filter(flow => {
            const name = (lang === "ar" ? flow.name : flow.nameEn).toLowerCase();
            return name.includes(searchTerm);
          });
          currentFlowPage = 1;
          renderFlows(filteredFlows, currentFlowPage);
          renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / 6), updateFlowsPage);
        });
      }
      
      // Setup search for nodes
      const flowNodesSearchInput = document.getElementById("flow-selection-nodes-search");
      if (flowNodesSearchInput) {
        // Remove existing listeners to prevent duplicates
        const newNodesSearchInput = flowNodesSearchInput.cloneNode(true);
        flowNodesSearchInput.parentNode.replaceChild(newNodesSearchInput, flowNodesSearchInput);
        
        newNodesSearchInput.addEventListener("input", (e) => {
          const searchTerm = e.target.value.toLowerCase();
          filteredNodes = sampleNodes.filter(node => {
            const nodeName = (lang === "ar" ? node.name : node.nameEn).toLowerCase();
            const flowName = (lang === "ar" ? node.flowName : node.flowNameEn).toLowerCase();
            return nodeName.includes(searchTerm) || flowName.includes(searchTerm);
          });
          currentNodePage = 1;
          renderNodes(filteredNodes, currentNodePage);
          renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / 10), updateNodesPage);
        });
      }
      
      // Setup tab switching
      if (flowTabFlows && flowTabNodes && flowFlowsContent && flowNodesContent) {
        // Remove existing listeners to prevent duplicates
        const newTabFlows = flowTabFlows.cloneNode(true);
        const newTabNodes = flowTabNodes.cloneNode(true);
        flowTabFlows.parentNode.replaceChild(newTabFlows, flowTabFlows);
        flowTabNodes.parentNode.replaceChild(newTabNodes, flowTabNodes);
        
        newTabFlows.addEventListener("click", () => {
          newTabFlows.classList.add("border-b-2", "border-blue-500");
          newTabFlows.classList.remove("text-slate-500", "dark:text-slate-400");
          newTabFlows.classList.add("text-slate-700", "dark:text-slate-300");
          newTabNodes.classList.remove("border-b-2", "border-blue-500");
          newTabNodes.classList.add("text-slate-500", "dark:text-slate-400");
          newTabNodes.classList.remove("text-slate-700", "dark:text-slate-300");
          flowFlowsContent.classList.remove("hidden");
          flowNodesContent.classList.add("hidden");
        });
        
        newTabNodes.addEventListener("click", () => {
          newTabNodes.classList.add("border-b-2", "border-blue-500");
          newTabNodes.classList.remove("text-slate-500", "dark:text-slate-400");
          newTabNodes.classList.add("text-slate-700", "dark:text-slate-300");
          newTabFlows.classList.remove("border-b-2", "border-blue-500");
          newTabFlows.classList.add("text-slate-500", "dark:text-slate-400");
          newTabFlows.classList.remove("text-slate-700", "dark:text-slate-300");
          flowNodesContent.classList.remove("hidden");
          flowFlowsContent.classList.add("hidden");
        });
      }
      
      // Function to close flow selection modal
      const closeFlowSelectionModal = () => {
        if (flowSelectionModal) {
          flowSelectionModal.classList.add("hidden");
        }
      };
      
        // Setup modal close handlers
        const flowSelectionModalClose = document.getElementById("flow-selection-modal-close");
        const flowSelectionModalCancel = document.getElementById("flow-selection-modal-cancel");
        
        if (flowSelectionModalClose) {
          flowSelectionModalClose.onclick = (e) => {
            e.stopPropagation();
            closeFlowSelectionModal();
          };
        }
        
        if (flowSelectionModalCancel) {
          flowSelectionModalCancel.onclick = (e) => {
            e.stopPropagation();
            closeFlowSelectionModal();
          };
        }
        
        if (flowSelectionModal) {
          flowSelectionModal.onclick = (e) => {
            if (e.target === flowSelectionModal) {
              closeFlowSelectionModal();
            }
          };
        }
      
      // Render initial content
      renderFlows(filteredFlows, currentFlowPage);
      renderNodes(filteredNodes, currentNodePage);
      renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / 6), updateFlowsPage);
      renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / 10), updateNodesPage);
      
      // Show modal
      flowSelectionModal.classList.remove("hidden");
    });
  }

  // Pause/Resume recording
  if (voicePauseBtn) {
    voicePauseBtn.addEventListener("click", () => {
      if (!mediaRecorder || !isRecording) return;

      if (!isPaused) {
        // Pause
        if (mediaRecorder.state === "recording") {
          mediaRecorder.pause();
          isPaused = true;
          pauseStartTime = Date.now();
          stopTimer();
          const icon = voicePauseBtn.querySelector("i");
          if (icon) {
            icon.className = "hgi-stroke hgi-play text-sm";
          }
          voicePauseBtn.setAttribute("data-title-ar", "استئناف");
          voicePauseBtn.setAttribute("data-title-en", "Resume");
        }
      } else {
        // Resume
        if (mediaRecorder.state === "paused") {
          mediaRecorder.resume();
          isPaused = false;
          if (pauseStartTime > 0) {
            pausedDuration += Date.now() - pauseStartTime;
            pauseStartTime = 0;
          }
          startTimer();
          const icon = voicePauseBtn.querySelector("i");
          if (icon) {
            icon.className = "hgi-stroke hgi-pause text-sm";
          }
          voicePauseBtn.setAttribute("data-title-ar", "إيقاف مؤقت");
          voicePauseBtn.setAttribute("data-title-en", "Pause");
        }
      }
    });
  }

  // Cancel recording
  if (voiceCancelBtn) {
    voiceCancelBtn.addEventListener("click", () => {
      // Set cancellation flag
      isCancelled = true;
      
      // Stop recording if active
      if (mediaRecorder) {
        if (mediaRecorder.state === "recording" || mediaRecorder.state === "paused") {
          mediaRecorder.stop();
        }
      }
      
      // Clear audio chunks immediately
      audioChunks = [];
      
      // Stop audio stream
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
        audioStream = null;
      }
      
      // Reset UI
      resetRecordingUI();
      
      console.log("Recording cancelled completely");
    });
  }

  // Template Modal Setup
  setupTemplateModal();
}

// Template Modal Manager
function setupTemplateModal() {
  const templateBtn = document.getElementById("template-btn");
  const templateModal = document.getElementById("template-modal");
  const templateModalClose = document.getElementById("template-modal-close");
  const templateModalBack = document.getElementById("template-modal-back");
  const templateModalCancel = document.getElementById("template-modal-cancel");
  const templateModalSend = document.getElementById("template-modal-send");
  const templateList = document.getElementById("template-list");
  const templateSettings = document.getElementById("template-settings");
  const templateSettingsContent = document.getElementById("template-settings-content");
  const templateSettingsTitle = document.getElementById("template-settings-title");
  const templateModalTitle = document.getElementById("template-modal-title");
  const templatePreviewContent = document.getElementById("template-preview-content");

  // Note: sampleFlows and sampleNodes are now defined in global scope above

  if (!templateBtn || !templateModal) return;

  // Sample templates data
  const templates = [
    {
      id: 1,
      name: "ترحيب العملاء",
      category: "MARKETING",
      description: "Send promotions or information about your products, services or business",
      content: "مرحباً {{name}}، شكراً لاهتمامك بمنتجاتنا!",
    },
    {
      id: 2,
      name: "كود التحقق",
      category: "AUTHENTICATION",
      description: "Send codes to verify a transaction or login",
      content: "كود التحقق الخاص بك هو: {{code}}",
    },
    {
      id: 3,
      name: "تحديث الطلب",
      category: "UTILITY",
      description: "Send messages about an existing order or account",
      content: "تم تحديث حالة طلبك #{{order_id}} إلى: {{status}}",
    },
  ];

  let selectedTemplate = null;

  // Open modal
  templateBtn.addEventListener("click", () => {
    selectedTemplate = null;
    showTemplatesList();
    renderTemplates();
    templateModal.classList.remove("opacity-0", "invisible");
    templateModal.classList.add("opacity-100", "visible");
    document.body.style.overflow = "hidden";
  });

  // Close modal
  const closeModal = () => {
    templateModal.classList.remove("opacity-100", "visible");
    templateModal.classList.add("opacity-0", "invisible");
    document.body.style.overflow = "";
    selectedTemplate = null;
    showTemplatesList();
  };

  // Show templates list (step 1)
  const showTemplatesList = () => {
    templateList.classList.remove("hidden");
    templateSettings.classList.add("hidden");
    templateModalBack.classList.add("hidden");
    const lang = document.documentElement.getAttribute("lang") || "ar";
    templateModalTitle.textContent = lang === "ar" ? "اختر قالب واتساب" : "Select WhatsApp Template";
    templateModalTitle.setAttribute("data-text-ar", "اختر قالب واتساب");
    templateModalTitle.setAttribute("data-text-en", "Select WhatsApp Template");
  };

  // Show template settings (step 2)
  const showTemplateSettings = () => {
    templateList.classList.add("hidden");
    templateSettings.classList.remove("hidden");
    templateModalBack.classList.remove("hidden");
    const lang = document.documentElement.getAttribute("lang") || "ar";
    templateModalTitle.textContent = lang === "ar" ? "إعدادات القالب" : "Template Settings";
    templateModalTitle.setAttribute("data-text-ar", "إعدادات القالب");
    templateModalTitle.setAttribute("data-text-en", "Template Settings");
  };

  // Back button handler
  if (templateModalBack) {
    templateModalBack.addEventListener("click", () => {
      showTemplatesList();
    });
  }

  templateModalClose.addEventListener("click", closeModal);
  templateModalCancel.addEventListener("click", closeModal);

  // Close on backdrop click
  templateModal.addEventListener("click", (e) => {
    if (e.target === templateModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && templateModal.classList.contains("opacity-100")) {
      closeModal();
    }
  });

  // Render templates
  function renderTemplates() {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    templateList.innerHTML = templates
      .map((template) => {
        const categoryLabels = {
          MARKETING: lang === "ar" ? "تسويق" : "Marketing",
          AUTHENTICATION: lang === "ar" ? "مصادقة" : "Authentication",
          UTILITY: lang === "ar" ? "أدوات" : "Utility",
        };

        return `
          <div
            class="template-item p-4 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 ${
              selectedTemplate?.id === template.id
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-500"
                : ""
            }"
            data-template-id="${template.id}"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ${template.name}
                  </h4>
                  <span
                    class="px-2 py-0.5 text-xs font-medium rounded text-white"
                    style="background-color: #0090D6;"
                  >
                    ${categoryLabels[template.category] || template.category}
                  </span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  ${template.description}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-500 italic">
                  ${template.content}
                </p>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // Add click handlers
    templateList.querySelectorAll(".template-item").forEach((item) => {
      item.addEventListener("click", () => {
        const templateId = parseInt(item.getAttribute("data-template-id"));
        selectedTemplate = templates.find((t) => t.id === templateId);
        renderTemplateSettings();
        showTemplateSettings();
      });
    });
  }

  // Render message preview
  function renderMessagePreview() {
    if (!selectedTemplate || !templatePreviewContent) return;
    
    const lang = document.documentElement.getAttribute("lang") || "ar";
    const isMe = true; // Preview as sent message
    const messageAlign = "justify-end";
    const messageBg = "text-white";
    const messageBgColor = 'style="background-color: #0090D6"';
    const timeColor = "opacity-70";
    const currentTime = new Date().toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Avatar HTML (same as in renderMessages)
    const avatarHtml = `
      <div class="message-avatar-container flex-shrink-0 relative" style="width: 24px; height: 24px;">
        <img
          src="https://ui-avatars.com/api/?name=${encodeURIComponent("أنت")}&size=24&background=0090D6&color=fff"
          alt="أنت"
          class="w-full h-full rounded-full object-cover cursor-pointer"
          data-sender-name="أنت"
        />
      </div>
    `;

    // Get current settings values
    const getSettingValue = (id) => {
      const input = document.getElementById(id);
      if (!input) return "";
      
      // For contenteditable divs (variable fields)
      if (input.contentEditable === "true") {
        // Extract variable keys from tags
        const tags = input.querySelectorAll(".variable-tag");
        if (tags.length > 0) {
          return Array.from(tags).map(tag => tag.getAttribute("data-variable-key") ? `{{${tag.getAttribute("data-variable-key")}}}` : tag.textContent).join(" ");
        }
        return input.textContent.trim();
      }
      
      // For regular inputs
      if (input.value) return input.value;
      
      // Check for image preview
      if (id === "template-header-image") {
        const preview = document.getElementById("template-header-image-preview");
        if (preview && preview.src && !preview.classList.contains("hidden")) {
          return preview.src;
        }
      }
      
      return "";
    };

    let previewHTML = "";

    switch (selectedTemplate.category) {
      case "MARKETING":
      case "UTILITY":
        let headerImage = getSettingValue("template-header-image");
        if (!headerImage || headerImage.trim() === "") {
          headerImage = "https://via.placeholder.com/400x300?text=Header+Image";
        }
        const messageText = getSettingValue("template-message-text") || selectedTemplate.content || (lang === "ar" ? "نص الرسالة هنا..." : "Message text here...");
        const variables = [];
        for (let i = 1; i <= 10; i++) {
          const varValue = getSettingValue(`template-variable-${i}`);
          if (varValue) {
            variables.push(varValue);
          } else if (i <= 2) {
            // Add sample variables for first 2
            variables.push(lang === "ar" ? `متغير ${i}` : `Variable ${i}`);
          }
        }
        const buttons = [];
        for (let i = 1; i <= 10; i++) {
          // Check for flow selected text
          const flowSelected = document.getElementById(`template-button-${i}-flow-selected`);
          let buttonValue = null;
          
          if (flowSelected && !flowSelected.classList.contains("hidden") && flowSelected.textContent) {
            buttonValue = flowSelected.textContent.trim();
          }
          
          if (buttonValue) {
            buttons.push({ type: "flow", value: buttonValue });
          } else if (i <= 3) {
            // Add sample buttons for first 3
            buttons.push({ type: "flow", value: lang === "ar" ? sampleFlows[i - 1]?.name || `تدفق ${i}` : sampleFlows[i - 1]?.nameEn || `Flow ${i}` });
          }
        }

        // Always use image message format (same as renderMessages)
        // Show placeholder icon if no image, or actual image if uploaded
        const headerImagePreview = document.getElementById("template-header-image-preview");
        const hasUploadedImage = headerImagePreview && headerImagePreview.src && !headerImagePreview.classList.contains("hidden");
        const imageUrl = hasUploadedImage ? headerImagePreview.src : "";
        
        previewHTML = `
          <div class="flex ${messageAlign} items-start gap-2 min-w-0 group">
            <div class="max-w-[300px] min-w-[300px] ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
              <div class="relative overflow-hidden rounded-lg p-1.5">
                ${imageUrl ? `
                  <img
                    src="${imageUrl}"
                    alt="Header"
                    class="w-full h-auto max-h-80 object-cover cursor-pointer media-preview-trigger rounded"
                    data-media-type="image"
                    data-media-url="${imageUrl}"
                    onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'"
                  />
                ` : `
                  <div class="w-full h-48 bg-slate-100 dark:bg-slate-700/50 rounded flex items-center justify-center">
                    <i class="hgi-stroke hgi-image-01 text-4xl text-slate-400 dark:text-slate-500"></i>
                  </div>
                `}
                ${messageText ? `<p class="text-sm px-4 py-2">${messageText}</p>` : ""}
                ${variables.length > 0 ? `
                  <div class="px-4 pb-2 space-y-1">
                    ${variables.map(v => `<p class="text-xs opacity-90">${v}</p>`).join("")}
                  </div>
                ` : ""}
              </div>
              ${buttons.length > 0 ? `
                <div class="px-4 pb-2 space-y-2">
                  ${buttons.slice(0, 2).map(btn => `
                    <button class="w-full px-3 py-2 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      ${btn.value}
                    </button>
                  `).join("")}
                  ${buttons.length > 2 ? `
                    <div class="relative">
                      <button
                        id="template-buttons-menu-btn"
                        class="w-full px-3 py-2 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>${lang === "ar" ? "القائمة" : "Menu"}</span>
                        <i class="hgi-stroke hgi-arrow-down text-xs"></i>
                      </button>
                      <div
                        id="template-buttons-menu"
                        class="hidden absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 space-y-1 z-10 max-h-48 overflow-y-auto"
                      >
                        ${buttons.slice(2).map(btn => `
                          <button class="w-full px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors text-start">
                            ${btn.value}
                          </button>
                        `).join("")}
                      </div>
                    </div>
                  ` : ""}
                </div>
              ` : ""}
              <div class="px-4 pb-2 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs ${timeColor}">${currentTime}</span>
                </div>
              </div>
            </div>
            ${avatarHtml}
          </div>
        `;
        break;

      case "AUTHENTICATION":
        const code = getSettingValue("template-verification-code") || "123456";
        previewHTML = `
          <div class="flex ${messageAlign} items-start gap-2 min-w-0 group">
            <div class="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%] min-w-0 ${messageBg} rounded-lg relative" ${messageBgColor} style="word-break: break-word; overflow-wrap: break-word; overflow: visible;">
              <div class="px-4 pt-3">
                <p class="text-sm break-words">${lang === "ar" ? "كود التحقق الخاص بك هو:" : "Your verification code is:"}</p>
                <p class="text-2xl font-bold mt-2">${code}</p>
              </div>
              <div class="px-4 pb-2 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs ${timeColor}">${currentTime}</span>
                </div>
              </div>
            </div>
            ${avatarHtml}
          </div>
        `;
        break;


      default:
        previewHTML = `
          <div class="flex ${messageAlign} items-start gap-2 min-w-0 group">
            <div class="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[60%] min-w-0 ${messageBg} rounded-lg relative" ${messageBgColor} style="word-break: break-word; overflow-wrap: break-word; overflow: visible;">
              <div class="px-4 pt-3">
                <p class="text-sm break-words">${selectedTemplate.content}</p>
              </div>
              <div class="px-4 pb-2 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs ${timeColor}">${currentTime}</span>
                </div>
              </div>
            </div>
            ${avatarHtml}
          </div>
        `;
    }

    templatePreviewContent.innerHTML = previewHTML;
  }

  // Render template settings
  function renderTemplateSettings() {
    if (!selectedTemplate) {
      templateSettings.classList.add("hidden");
      return;
    }

    templateSettings.classList.remove("hidden");
    const lang = document.documentElement.getAttribute("lang") || "ar";

    let settingsHTML = "";

    switch (selectedTemplate.category) {
      case "MARKETING":
      case "UTILITY":
        // Header Image
        settingsHTML = `
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                ${lang === "ar" ? "صورة Header" : "Header Image"}
              </label>
              <div
                id="template-header-image-container"
                class="w-full min-h-[120px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-150 relative overflow-hidden"
              >
                <input
                  type="file"
                  id="template-header-image-input"
                  accept="image/*"
                  class="hidden"
                />
                <div id="template-header-image-placeholder" class="text-center p-4">
                  <i class="hgi-stroke hgi-image text-3xl text-slate-400 dark:text-slate-500 mb-2 block"></i>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    ${lang === "ar" ? "اختر صورة" : "Choose image"}
                  </p>
                </div>
                <img
                  id="template-header-image-preview"
                  class="hidden w-full h-auto max-h-[120px] object-contain"
                  alt="Preview"
                />
              </div>
            </div>

            <!-- Variables -->
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                ${lang === "ar" ? "حقول المتغيرات" : "Variable Fields"}
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        `;
        for (let i = 1; i <= 10; i++) {
          settingsHTML += `
                <div class="relative">
                  <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    ${lang === "ar" ? `متغير ${i}` : `Variable ${i}`}
                  </label>
                  <div class="relative">
                    <div
                      id="template-variable-${i}"
                      contenteditable="true"
                      class="w-full min-h-[38px] px-3 py-2 pe-10 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-placeholder="${lang === "ar" ? `أدخل قيمة المتغير ${i}` : `Enter variable ${i} value`}"
                      style="word-break: break-word;"
                    ></div>
                    <button
                      type="button"
                      id="template-variable-${i}-btn"
                      class="absolute end-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150"
                      style="color: #003e5c; background-color: #dbf3ff;"
                      data-title-ar="متغير"
                      data-title-en="Variable"
                    >
                      <i class="hgi-stroke hgi-code-simple text-sm"></i>
                    </button>
                  </div>
                </div>
          `;
        }
        settingsHTML += `
              </div>
            </div>

            <!-- Buttons -->
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                ${lang === "ar" ? "الأزرار" : "Buttons"}
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        `;
        for (let i = 1; i <= 10; i++) {
          settingsHTML += `
                <div class="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <label class="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    ${lang === "ar" ? `زر ${i}` : `Button ${i}`}
                  </label>
                  <div
                    id="template-button-${i}-flow-container"
                    class="w-full min-h-[80px] border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-150 relative overflow-hidden"
                  >
                    <div id="template-button-${i}-flow-placeholder" class="text-center p-2">
                      <i class="hgi-stroke hgi-flow-chart text-xl text-slate-400 dark:text-slate-500 mb-1 block"></i>
                      <p class="text-xs text-slate-500 dark:text-slate-400">
                        ${lang === "ar" ? "اختر إجراء" : "Choose action"}
                      </p>
                    </div>
                    <div
                      id="template-button-${i}-flow-selected"
                      class="hidden w-full p-2 text-xs text-slate-700 dark:text-slate-300"
                    ></div>
                  </div>
                </div>
          `;
        }
        settingsHTML += `
              </div>
            </div>
          </div>
        `;
        break;

      case "AUTHENTICATION":
        settingsHTML = `
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                ${lang === "ar" ? "كود التحقق" : "Verification Code"}
              </label>
              <input
                type="text"
                id="template-verification-code"
                class="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="${lang === "ar" ? "أدخل كود التحقق" : "Enter verification code"}"
                maxlength="6"
              />
            </div>
          </div>
        `;
        break;



      default:
        settingsHTML = `
          <p class="text-sm text-slate-600 dark:text-slate-400">
            ${lang === "ar" ? "لا توجد إعدادات خاصة لهذا القالب" : "No special settings for this template"}
          </p>
        `;
    }

    templateSettingsContent.innerHTML = settingsHTML;
    
    // Setup header image upload
    const headerImageContainer = document.getElementById("template-header-image-container");
    const headerImageInput = document.getElementById("template-header-image-input");
    const headerImagePreview = document.getElementById("template-header-image-preview");
    const headerImagePlaceholder = document.getElementById("template-header-image-placeholder");
    
    if (headerImageContainer && headerImageInput && headerImagePreview && headerImagePlaceholder) {
      headerImageContainer.addEventListener("click", () => {
        headerImageInput.click();
      });
      
      headerImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target.result;
            headerImagePreview.src = imageUrl;
            headerImagePreview.classList.remove("hidden");
            headerImagePlaceholder.classList.add("hidden");
            renderMessagePreview();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Setup variable buttons for each variable field (for all template types)
    for (let i = 1; i <= 10; i++) {
      const varBtn = document.getElementById(`template-variable-${i}-btn`);
      const varInput = document.getElementById(`template-variable-${i}`);
      
      if (varBtn && varInput) {
        let varDropdown = null;
        let isVarDropdownOpen = false;
        
        // Function to get variable type, color, and icon
        const getVariableTypeAndColor = (key, name) => {
          // First, try to get type from variable-item element
          const variablesList = document.getElementById("variables-list");
          if (variablesList) {
            const variableItem = variablesList.querySelector(`[data-key="${key}"]`);
            if (variableItem) {
              const valueDisplay = variableItem.querySelector(".variable-value-display");
              if (valueDisplay) {
                const value = valueDisplay.textContent.trim();
                
                // Check value type
                if (value === "true" || value === "false") {
                  return { type: "boolean", color: "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-400 dark:border-slate-600", icon: "hgi-structure-check" };
                }
                if (!isNaN(value) && value !== "" && !value.includes("-") && !value.includes(":")) {
                  return { type: "number", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700", icon: "hgi-hashtag" };
                }
                // Check for datetime (date and time together)
                if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(value) || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) || /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(value)) {
                  return { type: "datetime", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700", icon: "hgi-date-time" };
                }
                if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                  return { type: "date", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700", icon: "hgi-calendar-04" };
                }
                if (/^\d{2}:\d{2}:\d{2}$/.test(value) || /^\d{2}:\d{2}$/.test(value)) {
                  return { type: "time", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-700", icon: "hgi-time-02" };
                }
                if (value.startsWith("{") || value.startsWith("[")) {
                  return { type: "json", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700", icon: "hgi-code" };
                }
              }
            }
          }
          
          // Fallback: check key and name
          const keyLower = key.toLowerCase();
          const nameLower = name.toLowerCase();
          
          // Check for type indicators in key or name (order matters - more specific first)
          if (keyLower.includes("json") || keyLower.includes("object") || nameLower.includes("json") || nameLower.includes("object")) {
            return { type: "json", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700", icon: "hgi-code" };
          }
          // Check for datetime (date and time together) - must be before date and time checks
          if ((keyLower.includes("datetime") || keyLower.includes("date_time") || keyLower.includes("timestamp") || keyLower.includes("login") || keyLower.includes("created") || keyLower.includes("updated") || keyLower.includes("modified")) || 
              (nameLower.includes("تاريخ ووقت") || nameLower.includes("datetime") || nameLower.includes("timestamp"))) {
            return { type: "datetime", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700", icon: "hgi-date-time" };
          }
          if (keyLower.includes("date") || nameLower.includes("تاريخ") || nameLower.includes("date")) {
            return { type: "date", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700", icon: "hgi-calendar-04" };
          }
          if (keyLower.includes("time") || nameLower.includes("وقت") || nameLower.includes("time")) {
            return { type: "time", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-700", icon: "hgi-time-02" };
          }
          if (keyLower.includes("boolean") || keyLower.includes("bool") || nameLower.includes("منطقي") || nameLower.includes("boolean") || nameLower.includes("bool") || keyLower.startsWith("is") || keyLower.startsWith("has")) {
            return { type: "boolean", color: "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-400 dark:border-slate-600", icon: "hgi-structure-check" };
          }
          if (keyLower.includes("number") || keyLower.includes("num") || keyLower.includes("int") || keyLower.includes("count") || keyLower.includes("age") || nameLower.includes("رقم") || nameLower.includes("number") || nameLower.includes("num")) {
            return { type: "number", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700", icon: "hgi-hashtag" };
          }
          
          // Default: text
          return { type: "text", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700", icon: "hgi-text" };
        };
        
        // Function to insert variable as tag
        const insertVariableTag = (key, name) => {
          varInput.focus();
          
          const selection = window.getSelection();
          let range;
          
          // Try to get existing selection
          if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
            // Check if selection is within varInput
            let container = range.commonAncestorContainer;
            if (container.nodeType === Node.TEXT_NODE) {
              container = container.parentNode;
            }
            if (!varInput.contains(container)) {
              // Selection is outside, create new range at end of varInput
              range = document.createRange();
              if (varInput.childNodes.length > 0) {
                const lastNode = varInput.childNodes[varInput.childNodes.length - 1];
                if (lastNode.nodeType === Node.TEXT_NODE) {
                  range.setStart(lastNode, lastNode.textContent.length);
                } else {
                  range.setStartAfter(lastNode);
                }
              } else {
                range.setStart(varInput, 0);
              }
              range.collapse(true);
            }
          } else {
            // No selection, create range at end
            range = document.createRange();
            if (varInput.childNodes.length > 0) {
              const lastNode = varInput.childNodes[varInput.childNodes.length - 1];
              if (lastNode.nodeType === Node.TEXT_NODE) {
                range.setStart(lastNode, lastNode.textContent.length);
              } else {
                range.setStartAfter(lastNode);
              }
            } else {
              range.setStart(varInput, 0);
            }
            range.collapse(true);
          }
          
          const { color, icon } = getVariableTypeAndColor(key, name);
          const tag = document.createElement("span");
          tag.className = `inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${color} variable-tag`;
          tag.contentEditable = "false";
          tag.setAttribute("data-variable-key", key);
          tag.innerHTML = `<i class="hgi-stroke ${icon} text-xs"></i><span>{{${key}}}</span>`;
          
          // Add space before if needed
          const startContainer = range.startContainer;
          const hasTextBefore = startContainer.nodeType === Node.TEXT_NODE && range.startOffset > 0 && startContainer.textContent.trim().length > 0;
          const hasNodeBefore = startContainer !== varInput && range.startOffset === 0 && startContainer.previousSibling;
          
          if (hasTextBefore || hasNodeBefore) {
            const space = document.createTextNode(" ");
            range.insertNode(space);
            range.setStartAfter(space);
          }
          
          range.insertNode(tag);
          
          // Set cursor after tag
          const newRange = document.createRange();
          newRange.setStartAfter(tag);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          updatePlaceholder();
        };
        
        // Setup placeholder for contenteditable
        const updatePlaceholder = () => {
          const hasContent = varInput.textContent.trim() !== "" || varInput.querySelector(".variable-tag");
          if (!hasContent) {
            varInput.setAttribute("data-empty", "true");
          } else {
            varInput.removeAttribute("data-empty");
          }
        };
        
        // Handle backspace to delete tags
        varInput.addEventListener("keydown", (e) => {
          if (e.key === "Backspace") {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const tag = range.startContainer.parentElement?.closest(".variable-tag");
              if (tag && range.collapsed && range.startOffset === 0) {
                e.preventDefault();
                tag.remove();
                updatePlaceholder();
                renderMessagePreview();
              }
            }
          }
        });
        
        varInput.addEventListener("input", () => {
          updatePlaceholder();
          renderMessagePreview();
        });
        varInput.addEventListener("focus", updatePlaceholder);
        varInput.addEventListener("blur", updatePlaceholder);
        updatePlaceholder();
        
        const createVarDropdown = () => {
          if (varDropdown) return varDropdown;
          
          const variablesList = document.getElementById("variables-list");
          if (!variablesList) return null;
          
          const systemFields = [];
          const customFields = [];
          
          variablesList.querySelectorAll(".variable-item").forEach((item) => {
            const key = item.getAttribute("data-key");
            const nameSpan = item.querySelector("span.text-xs.font-semibold");
            const name = nameSpan ? nameSpan.textContent.trim() : key;
            const typeAttr = item.getAttribute("data-type");
            
            const variable = { key, name, type: typeAttr };
            if (key && key.startsWith("system_")) {
              systemFields.push(variable);
            } else {
              customFields.push(variable);
            }
          });
          
          varDropdown = document.createElement("div");
          varDropdown.className = "absolute w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-[1000]";
          varDropdown.style.display = "none";
          varDropdown.style.bottom = "100%";
          varDropdown.style.marginBottom = "8px";
          varDropdown.style.right = "0";
          
          const searchBox = document.createElement("div");
          searchBox.className = "p-2 border-b border-slate-200 dark:border-slate-700";
          const searchInput = document.createElement("input");
          searchInput.type = "text";
          searchInput.placeholder = lang === "ar" ? "بحث..." : "Search...";
          searchInput.className = "w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
          searchBox.appendChild(searchInput);
          
          const dropdownContent = document.createElement("div");
          dropdownContent.className = "max-h-80 overflow-y-auto";
          
          const renderVars = (searchTerm = "") => {
            dropdownContent.innerHTML = "";
            const searchLower = searchTerm.toLowerCase();
            const filteredSystem = systemFields.filter(v => v.name.toLowerCase().includes(searchLower) || v.key.toLowerCase().includes(searchLower));
            const filteredCustom = customFields.filter(v => v.name.toLowerCase().includes(searchLower) || v.key.toLowerCase().includes(searchLower));
            
            if (filteredSystem.length > 0) {
              const header = document.createElement("div");
              header.className = "px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 sticky top-0";
              header.textContent = "System Fields";
              dropdownContent.appendChild(header);
              filteredSystem.forEach(v => {
                const item = document.createElement("button");
                item.type = "button";
                item.className = "w-full px-3 py-2 text-sm text-left text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700";
                item.textContent = v.name;
                item.addEventListener("click", () => {
                  insertVariableTag(v.key, v.name);
                  varDropdown.style.display = "none";
                  isVarDropdownOpen = false;
                  updatePlaceholder();
                  renderMessagePreview();
                });
                dropdownContent.appendChild(item);
              });
            }
            
            if (filteredCustom.length > 0) {
              const header = document.createElement("div");
              header.className = "px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 sticky top-0";
              header.textContent = "Custom User Fields";
              dropdownContent.appendChild(header);
              filteredCustom.forEach(v => {
                const item = document.createElement("button");
                item.type = "button";
                item.className = "w-full px-3 py-2 text-sm text-left text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700";
                item.textContent = v.name;
                item.addEventListener("click", () => {
                  insertVariableTag(v.key, v.name);
                  varDropdown.style.display = "none";
                  isVarDropdownOpen = false;
                  updatePlaceholder();
                  renderMessagePreview();
                });
                dropdownContent.appendChild(item);
              });
            }
          };
          
          renderVars();
          searchInput.addEventListener("input", (e) => renderVars(e.target.value));
          
          varDropdown.appendChild(searchBox);
          varDropdown.appendChild(dropdownContent);
          
          varBtn.parentElement.style.position = "relative";
          varBtn.parentElement.appendChild(varDropdown);
          
          return varDropdown;
        };
        
        varBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!varDropdown) {
            createVarDropdown();
          }
          if (varDropdown) {
            isVarDropdownOpen = !isVarDropdownOpen;
            varDropdown.style.display = isVarDropdownOpen ? "block" : "none";
          }
        });
        
        document.addEventListener("click", (e) => {
          if (isVarDropdownOpen && varDropdown && !varDropdown.contains(e.target) && !varBtn.contains(e.target)) {
            varDropdown.style.display = "none";
            isVarDropdownOpen = false;
          }
        });
      }
    }

    // Setup flow selection for buttons (MARKETING/UTILITY)
    if (selectedTemplate.category === "MARKETING" || selectedTemplate.category === "UTILITY") {
      // Get flow selection modal elements
      const flowSelectionModal = document.getElementById("flow-selection-modal");
      const flowSelectionModalClose = document.getElementById("flow-selection-modal-close");
      const flowSelectionModalCancel = document.getElementById("flow-selection-modal-cancel");
      const flowTabFlows = document.getElementById("flow-selection-tab-flows");
      const flowTabNodes = document.getElementById("flow-selection-tab-nodes");
      const flowFlowsContent = document.getElementById("flow-selection-flows-content");
      const flowNodesContent = document.getElementById("flow-selection-nodes-content");
      const flowFlowsGrid = document.getElementById("flow-selection-flows-grid");
      const flowNodesList = document.getElementById("flow-selection-nodes-list");
      const flowSearchInput = document.getElementById("flow-selection-search");
      const flowFlowsPagination = document.getElementById("flow-selection-flows-pagination");
      const flowNodesPagination = document.getElementById("flow-selection-nodes-pagination");
      
      // Pagination state
      let currentFlowPage = 1;
      let currentNodePage = 1;
      const flowsPerPage = 6;
      const nodesPerPage = 10;
      let filteredFlows = [...sampleFlows];
      let filteredNodes = [...sampleNodes];
      
      // Helper functions for pagination
      const updateFlowsPage = (page) => {
        currentFlowPage = page;
        renderFlows(filteredFlows, currentFlowPage);
        renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / flowsPerPage), updateFlowsPage);
      };
      
      const updateNodesPage = (page) => {
        currentNodePage = page;
        renderNodes(filteredNodes, currentNodePage);
        renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / nodesPerPage), updateNodesPage);
      };
      
      // Function to render flows with pagination
      const renderFlows = (flows, page = 1) => {
        if (!flowFlowsGrid) return;
        
        const startIndex = (page - 1) * flowsPerPage;
        const endIndex = startIndex + flowsPerPage;
        const paginatedFlows = flows.slice(startIndex, endIndex);
        
        flowFlowsGrid.innerHTML = "";
        
        if (paginatedFlows.length === 0) {
          flowFlowsGrid.innerHTML = `
            <div class="text-center py-8 text-slate-500 dark:text-slate-400">
              ${lang === "ar" ? "لا توجد تدفقات" : "No flows found"}
            </div>
          `;
          return;
        }
        
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
        
        paginatedFlows.forEach(flow => {
          const flowCard = document.createElement("div");
          flowCard.className = "p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 cursor-pointer";
          flowCard.dataset.flowId = flow.id;
          flowCard.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #dbf3ff;">
                <i class="hgi-stroke hgi-flow-chart text-lg" style="color: #003e5c;"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  ${lang === "ar" ? flow.name : flow.nameEn}
                </p>
              </div>
            </div>
          `;
          
          flowCard.addEventListener("click", () => {
            selectFlow(flow);
          });
          
          grid.appendChild(flowCard);
        });
        
        flowFlowsGrid.appendChild(grid);
      };
      
      // Function to render nodes with pagination
      const renderNodes = (nodes, page = 1) => {
        if (!flowNodesList) return;
        
        const startIndex = (page - 1) * nodesPerPage;
        const endIndex = startIndex + nodesPerPage;
        const paginatedNodes = nodes.slice(startIndex, endIndex);
        
        flowNodesList.innerHTML = "";
        
        if (paginatedNodes.length === 0) {
          flowNodesList.innerHTML = `
            <div class="text-center py-8 text-slate-500 dark:text-slate-400">
              ${lang === "ar" ? "لا توجد عقد" : "No nodes found"}
            </div>
          `;
          return;
        }
        
        paginatedNodes.forEach(node => {
          const nodeRow = document.createElement("div");
          nodeRow.className = "flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150";
          nodeRow.innerHTML = `
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <i class="hgi-stroke hgi-node text-lg text-slate-400 dark:text-slate-500"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${lang === "ar" ? node.name : node.nameEn}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    ${lang === "ar" ? node.flowName : node.flowNameEn}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors duration-150 hover:opacity-90"
              style="background-color: #0090D6;"
              data-node-id="${node.id}"
              data-text-ar="اختر"
              data-text-en="Select"
            >
              ${lang === "ar" ? "اختر" : "Select"}
            </button>
          `;
          
          const selectBtn = nodeRow.querySelector("button");
          selectBtn.addEventListener("click", () => {
            selectNode(node);
          });
          
          flowNodesList.appendChild(nodeRow);
        });
      };
      
      // Function to render pagination
      const renderPagination = (container, currentPage, totalPages, onPageChange) => {
        if (!container) return;
        
        container.innerHTML = "";
        
        if (totalPages <= 1) return;
        
        const paginationDiv = document.createElement("div");
        paginationDiv.className = "flex items-center justify-between w-full";
        
        // Previous button
        const prevBtn = document.createElement("button");
        prevBtn.className = `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
          currentPage === 1
            ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`;
        prevBtn.textContent = lang === "ar" ? "السابق" : "Previous";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        });
        
        // Page numbers
        const pageNumbers = document.createElement("div");
        pageNumbers.className = "flex items-center gap-1";
        
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
          startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
          const firstBtn = document.createElement("button");
          firstBtn.className = "px-2 py-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors duration-150";
          firstBtn.textContent = "1";
          firstBtn.addEventListener("click", () => onPageChange(1));
          pageNumbers.appendChild(firstBtn);
          
          if (startPage > 2) {
            const ellipsis = document.createElement("span");
            ellipsis.className = "px-2 text-slate-400 dark:text-slate-600";
            ellipsis.textContent = "...";
            pageNumbers.appendChild(ellipsis);
          }
        }
        
        for (let i = startPage; i <= endPage; i++) {
          const pageBtn = document.createElement("button");
          pageBtn.className = `px-2 py-1 text-sm font-medium rounded transition-colors duration-150 ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`;
          pageBtn.textContent = i;
          pageBtn.addEventListener("click", () => onPageChange(i));
          pageNumbers.appendChild(pageBtn);
        }
        
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.className = "px-2 text-slate-400 dark:text-slate-600";
            ellipsis.textContent = "...";
            pageNumbers.appendChild(ellipsis);
          }
          
          const lastBtn = document.createElement("button");
          lastBtn.className = "px-2 py-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors duration-150";
          lastBtn.textContent = totalPages;
          lastBtn.addEventListener("click", () => onPageChange(totalPages));
          pageNumbers.appendChild(lastBtn);
        }
        
        // Next button
        const nextBtn = document.createElement("button");
        nextBtn.className = `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
          currentPage === totalPages
            ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`;
        nextBtn.textContent = lang === "ar" ? "التالي" : "Next";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        });
        
        // Page info
        const pageInfo = document.createElement("div");
        pageInfo.className = "text-xs text-slate-500 dark:text-slate-400";
        const totalItems = container.id.includes("flows") ? filteredFlows.length : filteredNodes.length;
        const startItem = (currentPage - 1) * (container.id.includes("flows") ? flowsPerPage : nodesPerPage) + 1;
        const endItem = Math.min(currentPage * (container.id.includes("flows") ? flowsPerPage : nodesPerPage), totalItems);
        pageInfo.textContent = `${startItem}-${endItem} ${lang === "ar" ? "من" : "of"} ${totalItems}`;
        
        paginationDiv.appendChild(prevBtn);
        paginationDiv.appendChild(pageNumbers);
        paginationDiv.appendChild(nextBtn);
        paginationDiv.appendChild(pageInfo);
        
        container.appendChild(paginationDiv);
      };
      
      // Function to select flow
      const selectFlow = (flow) => {
        const source = flowSelectionModal.dataset.source;
        const buttonIndex = flowSelectionModal.dataset.buttonIndex;
        
        if (source === "message") {
          // Insert into message input
          const messageInput = document.getElementById("message-input");
          if (messageInput) {
            const flowText = `{{flow:${flow.id}}}`;
            const cursorPos = messageInput.selectionStart || messageInput.value.length;
            const textBefore = messageInput.value.substring(0, cursorPos);
            const textAfter = messageInput.value.substring(cursorPos);
            messageInput.value = textBefore + flowText + textAfter;
            messageInput.setSelectionRange(cursorPos + flowText.length, cursorPos + flowText.length);
            messageInput.focus();
          }
        } else {
          // Template button
          const flowPlaceholder = document.getElementById(`template-button-${buttonIndex}-flow-placeholder`);
          const flowSelected = document.getElementById(`template-button-${buttonIndex}-flow-selected`);
          
          if (flowPlaceholder) flowPlaceholder.classList.add("hidden");
          if (flowSelected) {
            flowSelected.classList.remove("hidden");
            flowSelected.textContent = lang === "ar" ? flow.name : flow.nameEn;
          }
          
          renderMessagePreview();
        }
        
        closeFlowSelectionModal();
      };
      
      // Function to select node
      const selectNode = (node) => {
        const source = flowSelectionModal.dataset.source;
        const buttonIndex = flowSelectionModal.dataset.buttonIndex;
        
        if (source === "message") {
          // Insert into message input
          const messageInput = document.getElementById("message-input");
          if (messageInput) {
            const nodeText = `{{node:${node.id}}}`;
            const cursorPos = messageInput.selectionStart || messageInput.value.length;
            const textBefore = messageInput.value.substring(0, cursorPos);
            const textAfter = messageInput.value.substring(cursorPos);
            messageInput.value = textBefore + nodeText + textAfter;
            messageInput.setSelectionRange(cursorPos + nodeText.length, cursorPos + nodeText.length);
            messageInput.focus();
          }
        } else {
          // Template button
          const flowPlaceholder = document.getElementById(`template-button-${buttonIndex}-flow-placeholder`);
          const flowSelected = document.getElementById(`template-button-${buttonIndex}-flow-selected`);
          
          if (flowPlaceholder) flowPlaceholder.classList.add("hidden");
          if (flowSelected) {
            flowSelected.classList.remove("hidden");
            flowSelected.textContent = lang === "ar" ? node.name : node.nameEn;
          }
          
          renderMessagePreview();
        }
        
        closeFlowSelectionModal();
      };
      
      // Function to close flow selection modal
      const closeFlowSelectionModal = () => {
        if (flowSelectionModal) {
          flowSelectionModal.classList.add("hidden");
        }
      };
      
      // Function to open flow selection modal
      const openFlowSelectionModal = (buttonIndex) => {
        if (!flowSelectionModal) return;
        
        // Store current button index
        flowSelectionModal.dataset.buttonIndex = buttonIndex;
        flowSelectionModal.dataset.source = "template"; // Mark as from template
        
        // Reset to flows tab
        if (flowTabFlows && flowTabNodes && flowFlowsContent && flowNodesContent) {
          flowTabFlows.classList.add("border-b-2", "border-blue-500");
          flowTabFlows.classList.remove("text-slate-500", "dark:text-slate-400");
          flowTabFlows.classList.add("text-slate-700", "dark:text-slate-300");
          flowTabNodes.classList.remove("border-b-2", "border-blue-500");
          flowTabNodes.classList.add("text-slate-500", "dark:text-slate-400");
          flowTabNodes.classList.remove("text-slate-700", "dark:text-slate-300");
          flowFlowsContent.classList.remove("hidden");
          flowNodesContent.classList.add("hidden");
        }
        
        // Reset search and pagination
        if (flowSearchInput) {
          flowSearchInput.value = "";
        }
        const flowNodesSearchInput = document.getElementById("flow-selection-nodes-search");
        if (flowNodesSearchInput) {
          flowNodesSearchInput.value = "";
        }
        currentFlowPage = 1;
        currentNodePage = 1;
        filteredFlows = [...sampleFlows];
        filteredNodes = [...sampleNodes];
        
        // Helper functions for pagination
        const updateFlowsPage = (page) => {
          currentFlowPage = page;
          renderFlows(filteredFlows, currentFlowPage);
          renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / flowsPerPage), updateFlowsPage);
        };
        
        const updateNodesPage = (page) => {
          currentNodePage = page;
          renderNodes(filteredNodes, currentNodePage);
          renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / nodesPerPage), updateNodesPage);
        };
        
        // Render initial content
        renderFlows(filteredFlows, currentFlowPage);
        renderNodes(filteredNodes, currentNodePage);
        renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / flowsPerPage), updateFlowsPage);
        renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / nodesPerPage), updateNodesPage);
        
        // Setup modal close handlers
        const flowSelectionModalClose = document.getElementById("flow-selection-modal-close");
        const flowSelectionModalCancel = document.getElementById("flow-selection-modal-cancel");
        
        // Remove existing listeners and add new ones
        if (flowSelectionModalClose) {
          const newCloseBtn = flowSelectionModalClose.cloneNode(true);
          flowSelectionModalClose.parentNode.replaceChild(newCloseBtn, flowSelectionModalClose);
          newCloseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeFlowSelectionModal();
          });
        }
        
        if (flowSelectionModalCancel) {
          const newCancelBtn = flowSelectionModalCancel.cloneNode(true);
          flowSelectionModalCancel.parentNode.replaceChild(newCancelBtn, flowSelectionModalCancel);
          newCancelBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeFlowSelectionModal();
          });
        }
        
        // Close on backdrop click
        if (flowSelectionModal) {
          // Remove existing listener if any
          const newModal = flowSelectionModal.cloneNode(true);
          flowSelectionModal.parentNode.replaceChild(newModal, flowSelectionModal);
          newModal.addEventListener("click", (e) => {
            if (e.target === newModal) {
              closeFlowSelectionModal();
            }
          });
        }
        
        // Show modal
        flowSelectionModal.classList.remove("hidden");
      };
      
      // Setup tab switching
      if (flowTabFlows && flowTabNodes && flowFlowsContent && flowNodesContent) {
        flowTabFlows.addEventListener("click", () => {
          flowTabFlows.classList.add("border-b-2", "border-blue-500");
          flowTabFlows.classList.remove("text-slate-500", "dark:text-slate-400");
          flowTabFlows.classList.add("text-slate-700", "dark:text-slate-300");
          flowTabNodes.classList.remove("border-b-2", "border-blue-500");
          flowTabNodes.classList.add("text-slate-500", "dark:text-slate-400");
          flowTabNodes.classList.remove("text-slate-700", "dark:text-slate-300");
          flowFlowsContent.classList.remove("hidden");
          flowNodesContent.classList.add("hidden");
        });
        
        flowTabNodes.addEventListener("click", () => {
          flowTabNodes.classList.add("border-b-2", "border-blue-500");
          flowTabNodes.classList.remove("text-slate-500", "dark:text-slate-400");
          flowTabNodes.classList.add("text-slate-700", "dark:text-slate-300");
          flowTabFlows.classList.remove("border-b-2", "border-blue-500");
          flowTabFlows.classList.add("text-slate-500", "dark:text-slate-400");
          flowTabFlows.classList.remove("text-slate-700", "dark:text-slate-300");
          flowNodesContent.classList.remove("hidden");
          flowFlowsContent.classList.add("hidden");
        });
      }
      
      // Setup search for flows
      if (flowSearchInput) {
        flowSearchInput.addEventListener("input", (e) => {
          const searchTerm = e.target.value.toLowerCase();
          filteredFlows = sampleFlows.filter(flow => {
            const name = (lang === "ar" ? flow.name : flow.nameEn).toLowerCase();
            return name.includes(searchTerm);
          });
          currentFlowPage = 1;
          renderFlows(filteredFlows, currentFlowPage);
          renderPagination(flowFlowsPagination, currentFlowPage, Math.ceil(filteredFlows.length / flowsPerPage), updateFlowsPage);
        });
      }
      
      // Setup search for nodes
      const flowNodesSearchInput = document.getElementById("flow-selection-nodes-search");
      if (flowNodesSearchInput) {
        flowNodesSearchInput.addEventListener("input", (e) => {
          const searchTerm = e.target.value.toLowerCase();
          filteredNodes = sampleNodes.filter(node => {
            const nodeName = (lang === "ar" ? node.name : node.nameEn).toLowerCase();
            const flowName = (lang === "ar" ? node.flowName : node.flowNameEn).toLowerCase();
            return nodeName.includes(searchTerm) || flowName.includes(searchTerm);
          });
          currentNodePage = 1;
          renderNodes(filteredNodes, currentNodePage);
          renderPagination(flowNodesPagination, currentNodePage, Math.ceil(filteredNodes.length / nodesPerPage), updateNodesPage);
        });
      }
      
      // Setup modal close handlers (inside openFlowSelectionModal to ensure they work every time)
      // Note: These are set up inside openFlowSelectionModal function
      
      // Setup flow container click handlers
      for (let i = 1; i <= 10; i++) {
        const flowContainer = document.getElementById(`template-button-${i}-flow-container`);
        
        if (flowContainer && !flowContainer.dataset.listenerAdded) {
          flowContainer.dataset.listenerAdded = "true";
          flowContainer.addEventListener("click", () => {
            openFlowSelectionModal(i);
          });
        }
      }
    }

    // Setup input listeners for preview updates
    const allInputs = templateSettingsContent.querySelectorAll("input, textarea, select");
    allInputs.forEach(input => {
      input.addEventListener("input", () => {
        renderMessagePreview();
      });
      input.addEventListener("change", () => {
        renderMessagePreview();
      });
    });

    // Initial preview render
    renderMessagePreview();
  }

  // Function to build message from template
  const buildTemplateMessage = () => {
    if (!selectedTemplate) return null;

    const lang = document.documentElement.getAttribute("lang") || "ar";
    
    // Get current settings values
    const getSettingValue = (id) => {
      const input = document.getElementById(id);
      if (!input) return "";
      
      // For contenteditable divs (variable fields)
      if (input.contentEditable === "true") {
        // Extract variable keys from tags
        const tags = input.querySelectorAll(".variable-tag");
        if (tags.length > 0) {
          return Array.from(tags).map(tag => tag.getAttribute("data-variable-key") ? `{{${tag.getAttribute("data-variable-key")}}}` : tag.textContent).join(" ");
        }
        return input.textContent.trim();
      }
      
      // For regular inputs
      if (input.value) return input.value;
      
      // Check for image preview
      if (id === "template-header-image") {
        const preview = document.getElementById("template-header-image-preview");
        if (preview && preview.src && !preview.classList.contains("hidden")) {
          return preview.src;
        }
      }
      
      return "";
    };

    switch (selectedTemplate.category) {
      case "MARKETING":
      case "UTILITY":
        const headerImagePreview = document.getElementById("template-header-image-preview");
        const hasUploadedImage = headerImagePreview && headerImagePreview.src && !headerImagePreview.classList.contains("hidden");
        const imageUrl = hasUploadedImage ? headerImagePreview.src : "";
        
        const messageText = selectedTemplate.content || (lang === "ar" ? "نص الرسالة هنا..." : "Message text here...");
        const variables = [];
        for (let i = 1; i <= 10; i++) {
          const varValue = getSettingValue(`template-variable-${i}`);
          if (varValue) {
            variables.push(varValue);
          }
        }
        
        const buttons = [];
        for (let i = 1; i <= 10; i++) {
          const flowSelected = document.getElementById(`template-button-${i}-flow-selected`);
          if (flowSelected && !flowSelected.classList.contains("hidden") && flowSelected.textContent) {
            buttons.push({ type: "flow", value: flowSelected.textContent.trim() });
          }
        }
        
        // Build message text with variables
        let finalMessageText = messageText;
        if (variables.length > 0) {
          finalMessageText += "\n\n" + variables.join("\n");
        }
        
        if (imageUrl) {
          return {
            type: "image",
            url: imageUrl,
            caption: finalMessageText,
            sender: "me",
            status: "sent",
            buttons: buttons.length > 0 ? buttons : undefined,
          };
        } else {
          return {
            type: "text",
            text: finalMessageText,
            sender: "me",
            status: "sent",
            buttons: buttons.length > 0 ? buttons : undefined,
          };
        }

      case "AUTHENTICATION":
        const code = getSettingValue("template-verification-code") || "123456";
        const codeText = lang === "ar" ? `كود التحقق الخاص بك هو:\n${code}` : `Your verification code is:\n${code}`;
        return {
          type: "text",
          text: codeText,
          sender: "me",
          status: "sent",
        };

      default:
        return {
          type: "text",
          text: selectedTemplate.content || "",
          sender: "me",
          status: "sent",
        };
    }
  };

  // Send template
  templateModalSend.addEventListener("click", () => {
    if (!selectedTemplate) return;

    // Build message from template
    const messageData = buildTemplateMessage();
    
    if (messageData) {
      // Send message to chat
      addMessageToChat(messageData);
      
      // Close modal
      closeModal();
    }
  });
}
