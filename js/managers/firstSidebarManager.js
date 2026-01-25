/**
 * First Sidebar Manager
 * 
 * يدير القائمة الجانبية الأولى (First Sidebar)
 * يتضمن: إعداد event listeners، تحديد العنصر النشط، التنقل بين الصفحات
 */

const firstSidebarManager = {
  /**
   * تهيئة القائمة الأولى
   * يتم استدعاؤها عند تحميل الصفحة
   */
  init() {
    this.setupFirstSidebar();
  },

  /**
   * إعداد event listeners للعناصر في القائمة الأولى
   */
  setupFirstSidebar() {
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    
    firstSidebarItems.forEach((item, index) => {
      // إضافة event listener للتنقل عند النقر
      item.addEventListener("click", () => {
        const sectionPageHref = this.getSectionPageHref(index);
        if (sectionPageHref) {
          window.location.href = sectionPageHref;
        }
      });

      // إظهار tooltip عند التمرير
      item.addEventListener("mouseenter", () => {
        this.showTooltip(item);
      });

      // إخفاء tooltip عند إزالة التمرير
      item.addEventListener("mouseleave", () => {
        this.hideTooltip(item);
      });
    });

    // تحديد العنصر النشط بناءً على الصفحة الحالية
    this.setActiveSectionFromPage();
  },

  /**
   * إظهار tooltip للعنصر
   * @param {HTMLElement} item - عنصر القائمة
   */
  showTooltip(item) {
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
  },

  /**
   * إخفاء tooltip للعنصر
   * @param {HTMLElement} item - عنصر القائمة
   */
  hideTooltip(item) {
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
  },

  /**
   * تحديد العنصر النشط بناءً على الصفحة الحالية
   */
  setActiveSectionFromPage() {
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // خريطة الصفحات إلى فهارس الأقسام
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

    // استخدام requestAnimationFrame لضمان جاهزية DOM ومنع الوميض
    requestAnimationFrame(() => {
      // إزالة الحالة النشطة من جميع العناصر
      this.resetAllItems(firstSidebarItems);

      // تعيين العنصر النشط
      if (firstSidebarItems[activeIndex]) {
        this.setActiveItem(firstSidebarItems[activeIndex]);

        // تحديث القائمة الثانية بعد تأخير صغير لمنع الوميض
        requestAnimationFrame(() => {
          // استدعاء menuManager.updateSecondSidebar إذا كان متاحاً
          // نستخدم setTimeout صغير للتأكد من أن menuManager تم تحميله
          setTimeout(() => {
            if (window.menuManager && typeof window.menuManager.updateSecondSidebar === "function") {
              window.menuManager.updateSecondSidebar(activeIndex);
            }
          }, 10);
        });
      }
    });
  },

  /**
   * إعادة تعيين جميع العناصر إلى الحالة غير النشطة
   * @param {NodeList} items - قائمة عناصر القائمة
   */
  resetAllItems(items) {
    items.forEach((item) => {
      item.classList.remove("text-blue-600", "dark:text-blue-400");
      item.classList.add("text-slate-500", "dark:text-slate-400");
      item.style.backgroundColor = "";
      
      // إعادة تعيين لون الأيقونة
      const icon = item.querySelector("i");
      if (icon) {
        const isDark = document.documentElement.classList.contains("dark");
        icon.style.color = isDark ? "#94a3b8" : "#003E5C";
      }
    });
  },

  /**
   * تعيين العنصر كعنصر نشط
   * @param {HTMLElement} item - عنصر القائمة
   */
  setActiveItem(item) {
    item.classList.remove("text-slate-500", "dark:text-slate-400");
    item.classList.add("text-white");
    item.style.backgroundColor = "#0090D6";
    
    // تحديث لون الأيقونة إلى الأبيض
    const icon = item.querySelector("i");
    if (icon) {
      icon.style.color = "#ffffff";
    }
  },

  /**
   * إعادة تعيين الحالة النشطة (للاستخدام في DOMContentLoaded)
   * يتم استدعاؤها قبل تهيئة menuManager
   */
  resetActiveState() {
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    firstSidebarItems.forEach((item) => {
      item.classList.remove("text-white");
      item.classList.add("text-slate-500", "dark:text-slate-400");
      item.style.backgroundColor = "";
      
      // إعادة تعيين لون الأيقونة
      const isDark = document.documentElement.classList.contains("dark");
      const resetColor = isDark ? "#94a3b8" : "#003E5C";
      const icon = item.querySelector("i");
      if (icon) {
        icon.style.color = resetColor;
      }
    });
  },

  /**
   * الحصول على رابط صفحة القسم
   * @param {number} sectionIndex - فهرس القسم
   * @param {string} lang - اللغة (افتراضي: "ar")
   * @returns {string|null} رابط الصفحة أو null
   */
  getSectionPageHref(sectionIndex, lang = "ar") {
    const sectionPages = [
      "index.html",    // home (0)
      "chats.html",    // chats (1)
      "flows.html",    // flows (2)
      "ai.html",       // ai (3)
      "orders.html",   // orders (4)
      "customers.html", // customers (5)
      "products.html", // products (6)
      "stores.html",   // stores (7)
      "library.html",  // library (8)
      "settings.html", // settings (9)
    ];
    return sectionPages[sectionIndex] || null;
  },

  /**
   * الحصول على فهرس القسم الحالي
   * @returns {number} فهرس القسم النشط
   */
  getCurrentSectionIndex() {
    const firstSidebarItems = document.querySelectorAll(".sidebar-first-item");
    let activeIndex = 0;
    
    firstSidebarItems.forEach((item, index) => {
      const bgColor = item.style.backgroundColor;
      if (bgColor === "rgb(0, 144, 214)" || bgColor === "#0090D6") {
        activeIndex = index;
      }
    });
    
    return activeIndex;
  },
};

// جعل firstSidebarManager متاحاً عالمياً للوصول من ملفات أخرى
window.firstSidebarManager = firstSidebarManager;
