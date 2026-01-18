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
                ? `<i class="hgi-stroke hgi-arrow-right-01 text-xs" style="color: #003e5c"></i>`
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
  },
};

// Theme Management
const themeManager = {
  init() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme);
  },

  setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    this.updateThemeIcon(theme);
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
      if (theme === "dark") {
        themeIcon.innerHTML = `<i class="hgi-stroke hgi-sun-01 text-[24px]" style="color: #003E5C"></i>`;
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
        themeIcon.innerHTML = `<i class="hgi-stroke hgi-moon-02 text-[24px]" style="color: #003E5C"></i>`;
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
    this.setupFirstSidebar();
    this.setupSecondSidebar();
  },

  setupFirstSidebar() {
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    firstSidebarItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        // Get the section page href
        const sectionPageHref = this.getSectionPageHref(index);

        // Navigate to the section page
        if (sectionPageHref) {
          window.location.href = sectionPageHref;
        }
      });

      // Show tooltip on hover
      item.addEventListener("mouseenter", () => {
        const tooltip = item.querySelector(".tooltip-element");
        if (tooltip) {
          tooltip.classList.remove("opacity-0");
          tooltip.classList.add("opacity-100");
          const isRTL = document.documentElement.getAttribute("dir") === "rtl";
          if (isRTL) {
            tooltip.classList.remove("translate-x-[10px]");
            tooltip.classList.add("translate-x-0");
          } else {
            tooltip.classList.remove("translate-x-[-10px]");
            tooltip.classList.add("translate-x-0");
          }
        }
      });

      item.addEventListener("mouseleave", () => {
        const tooltip = item.querySelector(".tooltip-element");
        if (tooltip) {
          tooltip.classList.remove("opacity-100", "translate-x-0");
          tooltip.classList.add("opacity-0");
          const isRTL = document.documentElement.getAttribute("dir") === "rtl";
          if (isRTL) {
            tooltip.classList.add("translate-x-[10px]");
          } else {
            tooltip.classList.add("translate-x-[-10px]");
          }
        }
      });
    });

    // Set active section based on current page
    this.setActiveSectionFromPage();
  },

  setActiveSectionFromPage() {
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    // Map pages to section indices
    const pageToIndex = {
      "index.html": 0,
      "chats.html": 1,
      "flows.html": 2,
      "ai.html": 3,
      "orders.html": 4,
      "customers.html": 5,
      "products.html": 6,
      "stores.html": 7,
      "library.html": 8,
      "settings.html": 9,
    };

    const activeIndex = pageToIndex[currentPage] ?? 0;

    // Use requestAnimationFrame to ensure DOM is ready and prevent flickering
    requestAnimationFrame(() => {
      // Remove active from all items
      firstSidebarItems.forEach((i) => {
        i.classList.remove("text-blue-600", "dark:text-blue-400");
        i.classList.add("text-slate-500", "dark:text-slate-400");
        i.style.backgroundColor = "";
      });

      // Set active item
      if (firstSidebarItems[activeIndex]) {
        firstSidebarItems[activeIndex].classList.remove(
          "text-slate-500",
          "dark:text-slate-400"
        );
        firstSidebarItems[activeIndex].classList.add(
          "text-blue-600",
          "dark:text-blue-400"
        );
        firstSidebarItems[activeIndex].style.backgroundColor = "#0090D6";

        // Update second sidebar after a small delay to prevent flickering
        requestAnimationFrame(() => {
          this.updateSecondSidebar(activeIndex);
        });
      }
    });
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
            i.classList.remove("text-blue-600", "dark:text-blue-400");
            i.style.backgroundColor = "";
          });
        // Add active to clicked item
        item.classList.add("text-blue-600", "dark:text-blue-400");
        item.style.backgroundColor = "#0090D6";

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
            i.classList.remove("text-blue-600", "dark:text-blue-400");
            i.style.backgroundColor = "";
          });
        // Add active to clicked item
        item.classList.add("text-blue-600", "dark:text-blue-400");
        item.style.backgroundColor = "#0090D6";

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

      // Update menu items
      const sidebarMenu = document.getElementById("sidebar-second-menu");
      if (sidebarMenu) {
        let isFirstItem = true;
        sidebarMenu.innerHTML = currentSection.items
          .map((item, index) => {
            if (item.type === "sectionTitle") {
              const marginTop = isFirstItem ? "" : "mt-2";
              isFirstItem = false;
              return `
            <div class="px-3 py-1.5 ${marginTop} mb-1">
              <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">${item.name}</h3>
            </div>
          `;
            } else if (item.submenu && item.submenu.length > 0) {
              isFirstItem = false;
              const mainHref = item.href ? `href="${item.href}"` : "";
              return `
            <div class="sidebar-second-item has-submenu flex items-center px-2 py-1.5 rounded-lg cursor-pointer mb-0.5 transition-colors duration-150 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100">
              <a ${mainHref} class="flex items-center flex-1 no-underline">
                <i class="${
                  item.iconClass
                } text-[16px] me-2 flex-shrink-0" style="color: #003E5C"></i>
                <span class="sidebar-second-item-text text-[0.9375rem] font-medium flex-1" style="color: #003E5C">${
                  item.name
                }</span>
              </a>
              <i class="hgi-stroke hgi-arrow-right-01 text-[16px] sidebar-second-item-arrow transition-transform duration-150" style="color: #003E5C"></i>
              <div class="sidebar-second-submenu max-h-0 overflow-hidden transition-all duration-300 ps-2">
                ${item.submenu
                  .map((subItem) => {
                    const subHref = subItem.href
                      ? `href="${subItem.href}"`
                      : "";
                    return `
                  <a ${subHref} class="sidebar-second-submenu-item flex items-center px-2 py-1 pe-6 rounded-lg cursor-pointer mb-0.5 transition-colors duration-150 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 text-sm no-underline">
                    ${subItem.name}
                  </a>
                `;
                  })
                  .join("")}
              </div>
            </div>
          `;
            } else {
              isFirstItem = false;
              const itemHref = item.href ? `href="${item.href}"` : "";
              return `
            <a ${itemHref} class="sidebar-second-item flex items-center px-2 py-1.5 rounded-lg cursor-pointer mb-0.5 transition-colors duration-150 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 no-underline">
              <i class="${item.iconClass} text-[16px] me-2 flex-shrink-0" style="color: #003E5C"></i>
              <span class="sidebar-second-item-text text-[0.9375rem] font-medium" style="color: #003E5C">${item.name}</span>
            </a>
          `;
            }
          })
          .join("");

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
      item.classList.remove("text-blue-600", "dark:text-blue-400");
      item.style.backgroundColor = "";
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
          item.classList.add("text-blue-600", "dark:text-blue-400");
          item.style.backgroundColor = "#0090D6";
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

  // Get the section page href
  getSectionPageHref(sectionIndex, lang = "ar") {
    const sectionPages = [
      "index.html", // home (0)
      "chats.html", // chats (1)
      "flows.html", // flows (2)
      "ai.html", // ai (3)
      "orders.html", // orders (4)
      "customers.html", // customers (5)
      "products.html", // products (6)
      "stores.html", // stores (7)
      "library.html", // library (8)
      "settings.html", // settings (9)
    ];
    return sectionPages[sectionIndex] || null;
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
            name: t.mentions,
            iconClass: "hgi-stroke hgi-at",
            href: "mentions.html",
          },
          {
            name: t.unattended,
            iconClass: "hgi-stroke hgi-inbox-unread",
            href: "unattended.html",
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
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    let activeIndex = 0;
    firstSidebarItems.forEach((item, index) => {
      if (
        item.style.backgroundColor === "rgb(0, 144, 214)" ||
        item.style.backgroundColor === "#0090D6"
      ) {
        activeIndex = index;
      }
    });
    return activeIndex;
  },
};

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
  const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
  firstSidebarItems.forEach((item) => {
    item.classList.remove("text-blue-600", "dark:text-blue-400");
    item.classList.add("text-slate-500", "dark:text-slate-400");
    item.style.backgroundColor = "";
  });

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
  };

  // Channel colors
  const channelColors = {
    whatsapp: "#25D366",
    telegram: "#0088cc",
    instagram: "#E4405F",
    messenger: "#0084FF",
  };

  // Message status icons
  const messageStatusIcons = {
    sent: "hgi-check-01",
    delivered: "hgi-check-02",
    read: "hgi-check-02",
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
              <div class="flex items-center gap-2 mb-1.5">
                <i class="hgi-stroke ${statusIcon} text-xs flex-shrink-0" style="color: ${
        chat.messageStatus === "read"
          ? "#25D366"
          : chat.messageStatus === "delivered"
          ? "#0088cc"
          : "#94a3b8"
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
                    ? `<i class="hgi-stroke hgi-user text-xs" style="color: #003e5c"></i>
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
        icon.className = "hgi-stroke hgi-square-arrow-shrink-01 text-lg";
        icon.style.color = "#003e5c";
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
        icon.className = "hgi-stroke hgi-square-arrow-expand-01 text-lg";
        icon.style.color = "#003e5c";
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
        moreActionsIcon.style.color = "#003E5C";

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
  ];

  // Update messages content
  if (messagesContent) {
    const lang = document.documentElement.getAttribute("lang") || "ar";
    messagesContent.innerHTML = messages
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
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[70%] min-w-0 ${messageBg} rounded-lg px-4 py-2 relative" ${messageBgColor} style="word-break: break-word; overflow-wrap: break-word;">
                <p class="text-sm break-words">${message.text || ""}</p>
                <div class="flex items-center justify-between mt-1">
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
          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[70%] min-w-0 ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
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
              <div class="max-w-[70%] min-w-0 ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
                <div class="relative overflow-hidden rounded-lg p-1.5">
                  <video
                    class="w-full h-auto max-h-80 object-contain rounded"
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
          return `
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} group">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[70%] ${messageBg} rounded-lg px-4 py-3 relative" ${messageBgColor}>
                <div class="flex items-center gap-3">
                  <audio
                    class="flex-1"
                    controls
                    preload="metadata"
                  >
                    <source src="${message.url}" type="audio/mpeg" />
                  </audio>
                </div>
                <div class="flex items-center justify-between mt-2">
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
          const fileIcons = {
            pdf: "hgi-file-pdf",
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
            <div class="flex ${messageAlign} items-start gap-2 ${isLastMessage ? "" : "mb-4"} min-w-0 group">
              ${!isMe ? avatarHtml : ""}
              <div class="max-w-[70%] min-w-0 ${messageBg} rounded-lg px-4 py-3 relative" ${messageBgColor}>
                <div class="flex items-center gap-3">
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
                <div class="flex items-center justify-between mt-2">
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
              <div class="max-w-[70%] min-w-0 ${messageBg} rounded-lg relative" ${messageBgColor} style="overflow: visible;">
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

        return "";
      })
      .join("");

    // Setup message controls
    setupMessageControls();

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
    setupMediaPreview();

    // Setup avatar tooltips
    setupAvatarTooltips();

    // Setup status tooltips
    setupStatusTooltips();

    // Update message reactions for all messages
    messages.forEach((message) => {
      if (messageReactions[message.id]) {
        updateMessageReactions(message.id);
      }
    });
  }

  // Show message input
  if (messageInputContainer) {
    messageInputContainer.classList.remove("hidden");
  }

  // Setup message tabs
  setupMessageTabs();
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
        handleReact(messageId, btn);
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
    "inline-flex items-center justify-center text-base w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700";
  reactionSpan.textContent = reaction;
  reactionsContainer.appendChild(reactionSpan);
}

// Function to show full emoji picker
function showFullEmojiPicker(messageId, button) {
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
  
  // Handle emoji selection
  emojiPicker.addEventListener("emoji-click", (e) => {
    const emoji = e.detail.unicode;
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
    pickerContainer.remove();
  });

  pickerContainer.appendChild(emojiPicker);

  // Position picker relative to button within messages-content container
  const messagesContent = document.getElementById("messages-content");
  if (messagesContent) {
    messagesContent.appendChild(pickerContainer);
    messagesContent.style.position = "relative";

    // Get button and container positions
    const buttonRect = button.getBoundingClientRect();
    const containerRect = messagesContent.getBoundingClientRect();

    // Force layout calculation
    pickerContainer.style.visibility = "hidden";
    pickerContainer.style.display = "block";
    const pickerRect = pickerContainer.getBoundingClientRect();
    pickerContainer.style.visibility = "visible";

    const lang = document.documentElement.getAttribute("lang") || "ar";

    // Calculate position relative to container
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const pickerCenterX = pickerRect.width / 2;
    const pickerTop =
      buttonRect.top - containerRect.top - pickerRect.height - 4;

    // Calculate horizontal position
    let pickerLeft, pickerRight;
    if (lang === "ar") {
      const rightOffset = containerRect.right - buttonCenterX - pickerCenterX;
      pickerRight = rightOffset;
      pickerLeft = "auto";
    } else {
      const leftOffset = buttonCenterX - containerRect.left - pickerCenterX;
      pickerLeft = leftOffset;
      pickerRight = "auto";
    }

    // Check boundaries and adjust if needed
    const padding = 8; // Padding from container edges

    if (lang === "ar") {
      // Check right boundary
      if (pickerRight < padding) {
        pickerRight = padding;
      }
      // Check left boundary (if picker extends beyond container)
      const pickerLeftPos =
        containerRect.width - pickerRight - pickerRect.width;
      if (pickerLeftPos < padding) {
        pickerRight = containerRect.width - pickerRect.width - padding;
      }
      pickerContainer.style.right = `${pickerRight}px`;
      pickerContainer.style.left = "auto";
    } else {
      // Check left boundary
      if (pickerLeft < padding) {
        pickerLeft = padding;
      }
      // Check right boundary (if picker extends beyond container)
      if (pickerLeft + pickerRect.width > containerRect.width - padding) {
        pickerLeft = containerRect.width - pickerRect.width - padding;
      }
      pickerContainer.style.left = `${pickerLeft}px`;
      pickerContainer.style.right = "auto";
    }

    // Check top boundary - if picker would go above container, show below button
    if (pickerTop < padding) {
      pickerContainer.style.top = `${
        buttonRect.bottom - containerRect.top + 4
      }px`;
    } else {
      pickerContainer.style.top = `${pickerTop}px`;
    }

    pickerContainer.style.position = "absolute";
  }

  // Close picker function
  const closePicker = () => {
    if (pickerContainer && pickerContainer.parentNode) {
      pickerContainer.remove();
    }
    document.removeEventListener("mousedown", handleOutsideClick, true);
    document.removeEventListener("click", handleOutsideClick, false);
    document.removeEventListener("keydown", handleEscape);
  };
  
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
    // Get click coordinates
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // Get picker container bounding box
    const pickerRect = pickerContainer.getBoundingClientRect();
    
    // Check if click is inside picker container bounds
    const isInsidePickerBounds = (
      clickX >= pickerRect.left &&
      clickX <= pickerRect.right &&
      clickY >= pickerRect.top &&
      clickY <= pickerRect.bottom
    );
    
    if (isInsidePickerBounds) {
      return;
    }
    
    // Also check using composedPath for shadow DOM elements
    const path = e.composedPath ? e.composedPath() : [];
    const target = e.target;
    
    // Check if any element in the path is inside emoji-picker
    const isInsidePicker = path.some((element) => {
      return isInsideEmojiPicker(element);
    });
    
    if (isInsidePicker) {
      return;
    }
    
    // Check if click is on the button that opened the picker
    if (button.contains(target)) {
      return;
    }
    
    // Also check if any element in path is inside button
    const isInsideButton = path.some((element) => {
      return element && button.contains(element);
    });
    
    if (isInsideButton) {
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
  
  // Add event listeners
  // Use click in bubble phase to avoid interfering with emoji-picker interactions
  // The handleOutsideClick function checks coordinates and composedPath to prevent closing
  // when clicking inside emoji-picker, without blocking emoji-click events
  setTimeout(() => {
    document.addEventListener("click", handleOutsideClick, false);
    document.addEventListener("keydown", handleEscape);
  }, 100);
}

// Function to handle react
function handleReact(messageId, button) {
  // Create emoji picker menu
  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

  // Check if emoji menu already exists
  let emojiMenu = document.getElementById("emoji-picker-menu");
  if (emojiMenu) {
    emojiMenu.remove();
  }

  // Create emoji menu
  emojiMenu = document.createElement("div");
  emojiMenu.id = "emoji-picker-menu";
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
    showFullEmojiPicker(messageId, button);
  });
  emojiMenu.appendChild(moreEmojiBtn);

  // Position menu relative to button within messages-content container
  const messagesContent = document.getElementById("messages-content");
  if (messagesContent) {
    messagesContent.appendChild(emojiMenu);
    messagesContent.style.position = "relative";

    // Get button and container positions
    const buttonRect = button.getBoundingClientRect();
    const containerRect = messagesContent.getBoundingClientRect();

    // Force layout calculation
    emojiMenu.style.visibility = "hidden";
    emojiMenu.style.display = "flex";
    const menuRect = emojiMenu.getBoundingClientRect();
    emojiMenu.style.visibility = "visible";

    const lang = document.documentElement.getAttribute("lang") || "ar";

    // Calculate position relative to container
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const menuCenterX = menuRect.width / 2;
    const menuTop = buttonRect.top - containerRect.top - menuRect.height - 4;

    // Calculate horizontal position
    let menuLeft, menuRight;
    if (lang === "ar") {
      const rightOffset = containerRect.right - buttonCenterX - menuCenterX;
      menuRight = rightOffset;
      menuLeft = "auto";
    } else {
      const leftOffset = buttonCenterX - containerRect.left - menuCenterX;
      menuLeft = leftOffset;
      menuRight = "auto";
    }

    // Check boundaries and adjust if needed
    const padding = 8; // Padding from container edges

    if (lang === "ar") {
      // Check right boundary
      if (menuRight < padding) {
        menuRight = padding;
      }
      // Check left boundary (if menu extends beyond container)
      const menuLeftPos = containerRect.width - menuRight - menuRect.width;
      if (menuLeftPos < padding) {
        menuRight = containerRect.width - menuRect.width - padding;
      }
      emojiMenu.style.right = `${menuRight}px`;
      emojiMenu.style.left = "auto";
    } else {
      // Check left boundary
      if (menuLeft < padding) {
        menuLeft = padding;
      }
      // Check right boundary (if menu extends beyond container)
      if (menuLeft + menuRect.width > containerRect.width - padding) {
        menuLeft = containerRect.width - menuRect.width - padding;
      }
      emojiMenu.style.left = `${menuLeft}px`;
      emojiMenu.style.right = "auto";
    }

    // Check top boundary - if menu would go above container, show below button
    if (menuTop < padding) {
      emojiMenu.style.top = `${buttonRect.bottom - containerRect.top + 4}px`;
    } else {
      emojiMenu.style.top = `${menuTop}px`;
    }

    emojiMenu.style.position = "absolute";
  }

  // Close menu when clicking outside
  const closeEmojiMenu = (e) => {
    if (!emojiMenu.contains(e.target) && !button.contains(e.target)) {
      emojiMenu.remove();
      // Also close full emoji picker if open
      const fullEmojiPicker = document.getElementById("full-emoji-picker");
      if (fullEmojiPicker) {
        fullEmojiPicker.remove();
      }
      document.removeEventListener("click", closeEmojiMenu);
    }
  };
  setTimeout(() => {
    document.addEventListener("click", closeEmojiMenu);
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
