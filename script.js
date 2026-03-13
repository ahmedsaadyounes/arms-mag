/*
 * Ramses Magazine client-side script
 *
 * This file provides language switching, theme toggling, dynamic rendering
 * of categories and articles and a simple dashboard interface built on
 * localStorage. It allows adding, editing and deleting categories and
 * articles without a back‑end for demonstration purposes. It also tracks
 * the number of visits using localStorage to simulate basic statistics.
 */

(function () {
  // Translation dictionary for supported languages (Arabic, English, French)
  const translations = {
    ar: {
      home: 'الرئيسية',
      categoriesNav: 'الأقسام',
      articlesNav: 'المقالات',
      aboutNav: 'عن المجلة',
      contactNav: 'اتصل بنا',
      dashboardNav: 'لوحة التحكم',
      welcome: 'مرحبا بكم في مجلة رمسيس',
      tagline: 'منصة لعرض المقالات المتنوعة في مجالات مختلفة',
      categoriesTitle: 'الأقسام',
      latestArticles: 'أحدث المقالات',
      aboutTitle: 'عن مجلة رمسيس',
      aboutText: 'مجلة رمسيس هي منصة إلكترونية مستقلة تهدف إلى نشر المعرفة والمعلومات في مجالات متنوعة مثل التكنولوجيا، السياحة، الفن، الصحة، والمزيد. نسعى إلى تقديم محتوى موثوق وممتع للجمهور العربي.',
      contactTitle: 'اتصل بنا',
      contactIntro: 'يمكنك التواصل معنا عبر البريد الإلكتروني:',
      contactOutro: 'أو من خلال حساباتنا على وسائل التواصل الاجتماعي.',
      footerText: 'مجلة رمسيس. جميع الحقوق محفوظة.',
      dashboardTitle: 'لوحة التحكم',
      statsHeading: 'إحصائيات الموقع',
      visitsLabel: 'عدد الزيارات',
      articlesCountLabel: 'عدد المقالات',
      categoriesCountLabel: 'عدد الأقسام',
      manageCategories: 'إدارة الأقسام',
      addCategoryLabel: 'اسم القسم',
      addCategoryButton: 'أضف قسم',
      manageArticles: 'إدارة المقالات',
      addArticleTitleLabel: 'عنوان المقال',
      addArticleSummaryLabel: 'ملخص المقال',
      addArticleCategoryLabel: 'القسم',
      addArticleButton: 'أضف مقال',
      delete: 'حذف',
      noArticles: 'لا توجد مقالات',
      noCategories: 'لا توجد أقسام'
      ,readMore: 'اقرأ المزيد',
      // Additional dashboard keys for managing images and pages
      manageImages: 'إدارة الصور',
      uploadImageLabel: 'حدد الصور',
      uploadImageButton: 'رفع',
      managePages: 'إدارة الصفحات',
      addPageTitleLabel: 'عنوان الصفحة',
      addPageContentLabel: 'محتوى الصفحة',
      addPageButton: 'أضف صفحة',
      pagesCountLabel: 'عدد الصفحات',
      edit: 'تعديل',
      save: 'حفظ'
      ,imagesCountLabel: 'عدد الصور'
      ,noImages: 'لا توجد صور'
      ,subscribeTitle: 'اشترك في المجلة الأسبوعية'
      ,subscribeText: 'انضم إلى نشرتنا البريدية للحصول على أحدث المقالات والأخبار مباشرة إلى بريدك الإلكتروني.'
      ,subscribePlaceholder: 'أدخل بريدك الإلكتروني'
      ,subscribeButton: 'اشترك'
      ,searchPlaceholder: 'ابحث عن المقالات...'
      ,searchButton: 'بحث'
      ,featuredArticles: 'مقالات مميزة'
      ,shareThis: 'شارك هذا المقال'
      ,relatedPosts: 'قد يعجبك أيضًا'
      ,listen: 'استمع للمقال'
    },
    en: {
      home: 'Home',
      categoriesNav: 'Categories',
      articlesNav: 'Articles',
      aboutNav: 'About',
      contactNav: 'Contact',
      dashboardNav: 'Dashboard',
      welcome: 'Welcome to Ramses Magazine',
      tagline: 'A platform to showcase diverse articles',
      categoriesTitle: 'Categories',
      latestArticles: 'Latest Articles',
      aboutTitle: 'About Ramses Magazine',
      aboutText: 'Ramses Magazine is an independent online platform that aims to publish knowledge and information in various fields such as technology, tourism, art, health and more. We strive to provide reliable and engaging content to the Arabic-speaking audience.',
      contactTitle: 'Contact Us',
      contactIntro: 'You can reach us via email:',
      contactOutro: 'Or through our social media accounts.',
      footerText: 'Ramses Magazine. All rights reserved.',
      dashboardTitle: 'Dashboard',
      statsHeading: 'Site Statistics',
      visitsLabel: 'Visits',
      articlesCountLabel: 'Articles',
      categoriesCountLabel: 'Categories',
      manageCategories: 'Manage Categories',
      addCategoryLabel: 'Category Name',
      addCategoryButton: 'Add Category',
      manageArticles: 'Manage Articles',
      addArticleTitleLabel: 'Article Title',
      addArticleSummaryLabel: 'Article Summary',
      addArticleCategoryLabel: 'Category',
      addArticleButton: 'Add Article',
      delete: 'Delete',
      noArticles: 'No articles available',
      noCategories: 'No categories available'
      ,readMore: 'Read more',
      // Additional dashboard keys
      manageImages: 'Manage Images',
      uploadImageLabel: 'Select images',
      uploadImageButton: 'Upload',
      managePages: 'Manage Pages',
      addPageTitleLabel: 'Page Title',
      addPageContentLabel: 'Page Content',
      addPageButton: 'Add Page',
      pagesCountLabel: 'Pages',
      edit: 'Edit',
      save: 'Save'
      ,imagesCountLabel: 'Images'
      ,noImages: 'No images available'
      ,subscribeTitle: 'Subscribe to the Weekly Magazine'
      ,subscribeText: 'Join our newsletter to receive the latest articles and news directly to your inbox.'
      ,subscribePlaceholder: 'Enter your email address'
      ,subscribeButton: 'Subscribe'
      ,searchPlaceholder: 'Search articles...'
      ,searchButton: 'Search'
      ,featuredArticles: 'Featured Articles'
      ,shareThis: 'Share this article'
      ,relatedPosts: 'Related posts'
      ,listen: 'Listen to article'
    },
    fr: {
      home: 'Accueil',
      categoriesNav: 'Catégories',
      articlesNav: 'Articles',
      aboutNav: 'À propos',
      contactNav: 'Contact',
      dashboardNav: 'Tableau de bord',
      welcome: 'Bienvenue dans le magazine Ramsès',
      tagline: 'Une plateforme pour présenter des articles variés',
      categoriesTitle: 'Catégories',
      latestArticles: 'Derniers articles',
      aboutTitle: 'À propos du magazine Ramsès',
      aboutText: 'Le magazine Ramsès est une plateforme en ligne indépendante qui vise à publier des connaissances et des informations dans divers domaines tels que la technologie, le tourisme, l’art, la santé et plus encore. Nous nous efforçons de fournir un contenu fiable et attrayant au public arabophone.',
      contactTitle: 'Contactez-nous',
      contactIntro: 'Vous pouvez nous contacter par e-mail :',
      contactOutro: 'Ou via nos comptes de médias sociaux.',
      footerText: 'Magazine Ramsès. Tous droits réservés.',
      dashboardTitle: 'Tableau de bord',
      statsHeading: 'Statistiques du site',
      visitsLabel: 'Visites',
      articlesCountLabel: 'Articles',
      categoriesCountLabel: 'Catégories',
      manageCategories: 'Gérer les catégories',
      addCategoryLabel: 'Nom de la catégorie',
      addCategoryButton: 'Ajouter une catégorie',
      manageArticles: 'Gérer les articles',
      addArticleTitleLabel: 'Titre de l’article',
      addArticleSummaryLabel: 'Résumé de l’article',
      addArticleCategoryLabel: 'Catégorie',
      addArticleButton: 'Ajouter un article',
      delete: 'Supprimer',
      noArticles: 'Aucun article disponible',
      noCategories: 'Aucune catégorie disponible'
      ,readMore: 'Lire la suite',
      // Additional dashboard keys
      manageImages: 'Gérer les images',
      uploadImageLabel: 'Sélectionnez des images',
      uploadImageButton: 'Télécharger',
      managePages: 'Gérer les pages',
      addPageTitleLabel: 'Titre de la page',
      addPageContentLabel: 'Contenu de la page',
      addPageButton: 'Ajouter une page',
      pagesCountLabel: 'Pages',
      edit: 'Modifier',
      save: 'Sauvegarder'
      ,imagesCountLabel: 'Images'
      ,noImages: 'Aucune image disponible'
      ,subscribeTitle: 'Abonnez‑vous au magazine hebdomadaire'
      ,subscribeText: 'Rejoignez notre newsletter pour recevoir les derniers articles et actualités directement dans votre boîte de réception.'
      ,subscribePlaceholder: 'Entrez votre adresse e‑mail'
      ,subscribeButton: 'S’abonner'
      ,searchPlaceholder: 'Rechercher des articles...'
      ,searchButton: 'Rechercher'
      ,featuredArticles: 'Articles en vedette'
      ,shareThis: 'Partager cet article'
      ,relatedPosts: 'Articles similaires'
      ,listen: 'Écouter l’article'
    }
  };

  // Default category definitions (with icons and translations)
  const defaultCategories = [
    {
      id: 'tech',
      icon: 'fa-computer',
      translations: {
        ar: { title: 'التكنولوجيا', desc: 'آخر التطورات والأخبار التقنية' },
        en: { title: 'Technology', desc: 'Latest developments and tech news' },
        fr: { title: 'Technologie', desc: 'Derniers développements et actualités technologiques' }
      }
    },
    {
      id: 'tourism',
      icon: 'fa-earth-americas',
      translations: {
        ar: { title: 'السياحة', desc: 'اكتشف أروع الوجهات حول العالم' },
        en: { title: 'Tourism', desc: 'Discover amazing destinations around the world' },
        fr: { title: 'Tourisme', desc: 'Découvrez des destinations incroyables dans le monde' }
      }
    },
    {
      id: 'arts',
      icon: 'fa-paintbrush',
      translations: {
        ar: { title: 'الفن والثقافة', desc: 'مقالات عن الفن والأدب والتراث' },
        en: { title: 'Art & Culture', desc: 'Articles about art, literature and heritage' },
        fr: { title: 'Art et culture', desc: 'Articles sur l’art, la littérature et le patrimoine' }
      }
    },
    {
      id: 'health',
      icon: 'fa-heart-pulse',
      translations: {
        ar: { title: 'الصحة', desc: 'نصائح للحفاظ على صحة جيدة' },
        en: { title: 'Health', desc: 'Tips to maintain good health' },
        fr: { title: 'Santé', desc: 'Conseils pour rester en bonne santé' }
      }
    }
  ];

  // Default article definitions (sample articles with translations and links)
  const defaultArticles = [
    {
      id: 'article1',
      category: 'tech',
      date: '2026-03-10',
      translations: {
        ar: { title: 'عنوان المقال الأول', summary: 'ملخص قصير للمقال الأول يجذب القارئ لقراءة المزيد.' },
        en: { title: 'First Article Title', summary: 'A short summary of the first article that entices the reader to read more.' },
        fr: { title: 'Titre du premier article', summary: 'Un bref résumé du premier article qui donne envie d’en savoir plus.' }
      },
      url: 'article1.html'
    },
    {
      id: 'article2',
      category: 'tourism',
      date: '2026-02-20',
      translations: {
        ar: { title: 'عنوان المقال الثاني', summary: 'ملخص قصير للمقال الثاني يجذب القارئ لقراءة المزيد.' },
        en: { title: 'Second Article Title', summary: 'A short summary of the second article that entices the reader to read more.' },
        fr: { title: 'Titre du deuxième article', summary: 'Un bref résumé du deuxième article qui donne envie d’en savoir plus.' }
      },
      url: 'article2.html'
    },
    {
      id: 'article3',
      category: 'arts',
      date: '2026-01-05',
      translations: {
        ar: { title: 'عنوان المقال الثالث', summary: 'ملخص قصير للمقال الثالث يجذب القارئ لقراءة المزيد.' },
        en: { title: 'Third Article Title', summary: 'A short summary of the third article that entices the reader to read more.' },
        fr: { title: 'Titre du troisième article', summary: 'Un bref résumé du troisième article qui donne envie d’en savoir plus.' }
      },
      url: 'article3.html'
    }
  ];

  // Default pages definitions (sample pages with translations)
  const defaultPages = [
    {
      id: 'about',
      translations: {
        ar: { title: 'عن المجلة', content: 'هذه صفحة عن المجلة. يمكنك تحديث هذا المحتوى من لوحة التحكم.' },
        en: { title: 'About', content: 'This is the about page. You can update this content from the dashboard.' },
        fr: { title: 'À propos', content: 'Ceci est la page à propos. Vous pouvez mettre à jour ce contenu depuis le tableau de bord.' }
      }
    },
    {
      id: 'contact',
      translations: {
        ar: { title: 'اتصل بنا', content: 'هذه صفحة الاتصال. يمكنك تحديث هذا المحتوى من لوحة التحكم.' },
        en: { title: 'Contact', content: 'This is the contact page. You can update this content from the dashboard.' },
        fr: { title: 'Contact', content: 'Ceci est la page de contact. Vous pouvez mettre à jour ce contenu depuis le tableau de bord.' }
      }
    }
  ];

  // Default images array (initially empty)
  const defaultImages = [];

  /** Utility functions for localStorage operations */
  function getData(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error parsing localStorage key', key, e);
    }
    return defaultValue;
  }
  function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /** Build categories on index page */
  function buildCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;
    container.innerHTML = '';
    const categories = getData('categories', defaultCategories);
    categories.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-card';
      const icon = document.createElement('i');
      icon.className = 'fa-solid ' + cat.icon;
      const h3 = document.createElement('h3');
      h3.textContent = cat.translations[currentLang]?.title || '';
      const p = document.createElement('p');
      p.textContent = cat.translations[currentLang]?.desc || '';
      card.appendChild(icon);
      card.appendChild(h3);
      card.appendChild(p);
      container.appendChild(card);
    });
    // If no categories, show message
    if (categories.length === 0) {
      const msg = document.createElement('p');
      msg.textContent = translations[currentLang].noCategories;
      container.appendChild(msg);
    }
  }

  /** Build articles on index page */
  function buildArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;
    container.innerHTML = '';
    let articles = getData('articles', defaultArticles);
    // Apply category and search filters
    articles = articles.filter(article => {
      // Match category if a filter is selected
      const categoryMatch = !selectedCategory || article.category === selectedCategory;
      // Match search query within the current language's title or summary
      let searchMatch = true;
      if (searchQuery) {
        const trans = article.translations[currentLang] || {};
        const q = searchQuery.toLowerCase();
        searchMatch = (trans.title && trans.title.toLowerCase().includes(q)) ||
                      (trans.summary && trans.summary.toLowerCase().includes(q));
      }
      return categoryMatch && searchMatch;
    });
    // Sort by date descending so latest articles appear first
    articles = articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'article-card';
      const img = document.createElement('img');
      img.src = 'images/placeholder.png';
      img.alt = '';
      const content = document.createElement('div');
      content.className = 'article-content';
      const h3 = document.createElement('h3');
      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = article.translations[currentLang]?.title || '';
      h3.appendChild(link);
      const p = document.createElement('p');
      p.textContent = article.translations[currentLang]?.summary || '';
      const readMore = document.createElement('a');
      readMore.href = article.url;
      readMore.className = 'read-more';
      readMore.textContent = translations[currentLang].readMore || 'اقرأ المزيد';
      content.appendChild(h3);
      content.appendChild(p);
      content.appendChild(readMore);
      card.appendChild(img);
      card.appendChild(content);
      container.appendChild(card);
    });
    if (articles.length === 0) {
      const msg = document.createElement('p');
      msg.textContent = translations[currentLang].noArticles;
      container.appendChild(msg);
    }
  }

  /** Apply language to all elements with data-i18n attribute */
  function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const trans = translations[currentLang];
      if (trans && trans[key]) {
        el.textContent = trans[key];
      }
    });
    // Update document direction and language attributes based on current language.
    // Arabic uses right-to-left; English and French use left-to-right. This
    // improves usability for multilingual audiences and ensures layout
    // adjusts correctly when switching languages.
    document.documentElement.lang = currentLang;
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    // Update placeholder of subscription input if present
    const subscribeInput = document.getElementById('subscribe-email');
    if (subscribeInput) {
      const phKey = 'subscribePlaceholder';
      const trans = translations[currentLang];
      if (trans && trans[phKey]) {
        subscribeInput.placeholder = trans[phKey];
      }
    }
    // Update placeholder of search input if present
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      const phKey2 = 'searchPlaceholder';
      const trans2 = translations[currentLang];
      if (trans2 && trans2[phKey2]) {
        searchInput.placeholder = trans2[phKey2];
      }
    }
  }

  /** Theme handling */
  function applyThemeFromStorage() {
    document.body.classList.toggle('dark', currentTheme === 'dark');
    updateThemeButton();
  }
  function updateThemeButton() {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
  }

  /** Stats increment for visits */
  function incrementVisits() {
    const count = parseInt(localStorage.getItem('visits') || '0', 10) + 1;
    localStorage.setItem('visits', count);
  }

  /** Dashboard rendering functions */
  function renderStats() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;
    const visits = parseInt(localStorage.getItem('visits') || '0', 10);
    const articles = getData('articles', defaultArticles);
    const categories = getData('categories', defaultCategories);
    const pages = getData('pages', defaultPages);
    const images = getData('images', defaultImages);
    statsContainer.innerHTML = '';
    const heading = document.createElement('h3');
    heading.textContent = translations[currentLang].statsHeading;
    statsContainer.appendChild(heading);
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    const items = [
      { label: translations[currentLang].visitsLabel, value: visits },
      { label: translations[currentLang].articlesCountLabel, value: articles.length },
      { label: translations[currentLang].categoriesCountLabel, value: categories.length },
      { label: translations[currentLang].pagesCountLabel || 'Pages', value: pages.length },
      { label: translations[currentLang].imagesCountLabel || 'Images', value: images.length }
    ];
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.label}: ${item.value}`;
      list.appendChild(li);
    });
    statsContainer.appendChild(list);
  }

  function renderCategoryManagement() {
    const container = document.getElementById('category-management');
    if (!container) return;
    container.innerHTML = '';
    const heading = document.createElement('h3');
    heading.textContent = translations[currentLang].manageCategories;
    container.appendChild(heading);
    // Add category form
    const form = document.createElement('form');
    form.onsubmit = function (e) {
      e.preventDefault();
      const nameAr = form.querySelector('input[name="name-ar"]').value.trim();
      const nameEn = form.querySelector('input[name="name-en"]').value.trim();
      const nameFr = form.querySelector('input[name="name-fr"]').value.trim();
      if (!nameAr || !nameEn || !nameFr) return;
      const newId = nameEn.toLowerCase().replace(/\s+/g, '-');
      const categories = getData('categories', defaultCategories);
      categories.push({
        id: newId,
        icon: 'fa-folder',
        translations: {
          ar: { title: nameAr, desc: '' },
          en: { title: nameEn, desc: '' },
          fr: { title: nameFr, desc: '' }
        }
      });
      saveData('categories', categories);
      form.reset();
      buildCategories();
      renderCategoryManagement();
      renderStats();
    };
    // Input fields for each language
    ['ar', 'en', 'fr'].forEach(lang => {
      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.marginTop = '10px';
      label.textContent = translations[currentLang].addCategoryLabel + ` (${lang})`;
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `name-${lang}`;
      input.required = true;
      input.style.width = '100%';
      input.style.padding = '5px';
      form.appendChild(label);
      form.appendChild(input);
    });
    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.textContent = translations[currentLang].addCategoryButton;
    addBtn.style.marginTop = '10px';
    addBtn.className = 'read-more';
    form.appendChild(addBtn);
    container.appendChild(form);
    // Existing categories list with delete buttons
    const categories = getData('categories', defaultCategories);
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    categories.forEach(cat => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.marginTop = '10px';
      const span = document.createElement('span');
      span.textContent = cat.translations[currentLang]?.title || cat.id;
      li.appendChild(span);
      const controls = document.createElement('div');
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = translations[currentLang].edit;
      editBtn.style.marginRight = '5px';
      editBtn.onclick = function () {
        ['ar', 'en', 'fr'].forEach(lang => {
          const newTitle = prompt(translations[currentLang].addCategoryLabel + ` (${lang})`, cat.translations[lang].title);
          if (newTitle !== null && newTitle.trim() !== '') cat.translations[lang].title = newTitle.trim();
        });
        saveData('categories', categories);
        buildCategories();
        renderCategoryManagement();
        renderStats();
      };
      controls.appendChild(editBtn);
      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = translations[currentLang].delete;
      delBtn.style.backgroundColor = 'crimson';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.padding = '5px 10px';
      delBtn.style.borderRadius = '4px';
      delBtn.onclick = function () {
        const updated = categories.filter(c => c.id !== cat.id);
        saveData('categories', updated);
        buildCategories();
        renderCategoryManagement();
        renderStats();
      };
      controls.appendChild(delBtn);
      li.appendChild(controls);
      list.appendChild(li);
    });
    container.appendChild(list);
  }

  function renderArticleManagement() {
    const container = document.getElementById('article-management');
    if (!container) return;
    container.innerHTML = '';
    const heading = document.createElement('h3');
    heading.textContent = translations[currentLang].manageArticles;
    container.appendChild(heading);
    const form = document.createElement('form');
    form.onsubmit = function (e) {
      e.preventDefault();
      const titleAr = form.querySelector('input[name="title-ar"]').value.trim();
      const titleEn = form.querySelector('input[name="title-en"]').value.trim();
      const titleFr = form.querySelector('input[name="title-fr"]').value.trim();
      const summaryAr = form.querySelector('input[name="summary-ar"]').value.trim();
      const summaryEn = form.querySelector('input[name="summary-en"]').value.trim();
      const summaryFr = form.querySelector('input[name="summary-fr"]').value.trim();
      const category = form.querySelector('select[name="category"]').value;
      if (!titleAr || !titleEn || !titleFr) return;
      const newId = 'article' + Date.now();
      const articles = getData('articles', defaultArticles);
      articles.push({
        id: newId,
        category: category,
        date: new Date().toISOString().slice(0, 10),
        translations: {
          ar: { title: titleAr, summary: summaryAr },
          en: { title: titleEn, summary: summaryEn },
          fr: { title: titleFr, summary: summaryFr }
        },
        url: '#'
      });
      saveData('articles', articles);
      form.reset();
      buildArticles();
      renderArticleManagement();
      renderStats();
    };
    // Title fields
    ['title', 'summary'].forEach(field => {
      ['ar', 'en', 'fr'].forEach(lang => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginTop = '10px';
        const key = field === 'title' ? translations[currentLang].addArticleTitleLabel : translations[currentLang].addArticleSummaryLabel;
        label.textContent = `${key} (${lang})`;
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `${field}-${lang}`;
        input.required = (field === 'title');
        input.style.width = '100%';
        input.style.padding = '5px';
        form.appendChild(label);
        form.appendChild(input);
      });
    });
    // Category select
    const labelCat = document.createElement('label');
    labelCat.style.display = 'block';
    labelCat.style.marginTop = '10px';
    labelCat.textContent = translations[currentLang].addArticleCategoryLabel;
    const selectCat = document.createElement('select');
    selectCat.name = 'category';
    selectCat.style.width = '100%';
    selectCat.style.padding = '5px';
    const categories = getData('categories', defaultCategories);
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.translations[currentLang]?.title || cat.id;
      selectCat.appendChild(option);
    });
    form.appendChild(labelCat);
    form.appendChild(selectCat);
    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.textContent = translations[currentLang].addArticleButton;
    addBtn.style.marginTop = '10px';
    addBtn.className = 'read-more';
    form.appendChild(addBtn);
    container.appendChild(form);
    // Existing articles list
    const articles = getData('articles', defaultArticles);
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    articles.forEach(article => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.marginTop = '10px';
      const span = document.createElement('span');
      span.textContent = article.translations[currentLang]?.title || article.id;
      li.appendChild(span);
      const controls = document.createElement('div');
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = translations[currentLang].edit;
      editBtn.style.marginRight = '5px';
      editBtn.onclick = function () {
        // Prompt for each language
        ['ar', 'en', 'fr'].forEach(lang => {
          const newTitle = prompt(translations[currentLang].addArticleTitleLabel + ` (${lang})`, article.translations[lang].title);
          const newSummary = prompt(translations[currentLang].addArticleSummaryLabel + ` (${lang})`, article.translations[lang].summary);
          if (newTitle !== null && newTitle.trim() !== '') article.translations[lang].title = newTitle.trim();
          if (newSummary !== null) article.translations[lang].summary = newSummary.trim();
        });
        // Prompt for category
        const categoriesList = getData('categories', defaultCategories);
        const categoryTitles = categoriesList.map(c => c.translations[currentLang]?.title || c.id).join(', ');
        const newCat = prompt(translations[currentLang].addArticleCategoryLabel + ` (${categoryTitles})`, article.category);
        if (newCat) {
          // find id by translation or id
          let found = categoriesList.find(c => c.id === newCat || c.translations[currentLang].title === newCat);
          if (found) {
            article.category = found.id;
          }
        }
        saveData('articles', articles);
        buildArticles();
        renderArticleManagement();
        renderStats();
      };
      controls.appendChild(editBtn);
      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = translations[currentLang].delete;
      delBtn.style.backgroundColor = 'crimson';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.padding = '5px 10px';
      delBtn.style.borderRadius = '4px';
      delBtn.onclick = function () {
        const updated = articles.filter(a => a.id !== article.id);
        saveData('articles', updated);
        buildArticles();
        renderArticleManagement();
        renderStats();
      };
      controls.appendChild(delBtn);
      li.appendChild(controls);
      list.appendChild(li);
    });
    container.appendChild(list);
  }

  /**
   * Render page management section in dashboard
   * Provides a form for adding new pages and a list for editing/deleting existing pages.
   */
  function renderPageManagement() {
    const container = document.getElementById('page-management');
    if (!container) return;
    container.innerHTML = '';
    // Heading
    const heading = document.createElement('h3');
    heading.textContent = translations[currentLang].managePages;
    container.appendChild(heading);
    // Form for adding pages
    const form = document.createElement('form');
    form.onsubmit = function (e) {
      e.preventDefault();
      const titles = {};
      const contents = {};
      ['ar', 'en', 'fr'].forEach(lang => {
        const titleVal = form.querySelector(`input[name="page-title-${lang}"]`).value.trim();
        const contentVal = form.querySelector(`textarea[name="page-content-${lang}"]`).value.trim();
        titles[lang] = titleVal;
        contents[lang] = contentVal;
      });
      // Validate: ensure at least one of the titles is provided
      if (!titles.ar && !titles.en && !titles.fr) return;
      const pages = getData('pages', defaultPages);
      const newId = 'page' + Date.now();
      const translationsObj = {
        ar: { title: titles.ar, content: contents.ar },
        en: { title: titles.en, content: contents.en },
        fr: { title: titles.fr, content: contents.fr }
      };
      pages.push({ id: newId, translations: translationsObj });
      saveData('pages', pages);
      form.reset();
      renderPageManagement();
      renderStats();
    };
    // Input fields for page titles and contents
    ['ar', 'en', 'fr'].forEach(lang => {
      const titleLabel = document.createElement('label');
      titleLabel.style.display = 'block';
      titleLabel.style.marginTop = '10px';
      titleLabel.textContent = translations[currentLang].addPageTitleLabel + ` (${lang})`;
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.name = `page-title-${lang}`;
      // Page titles are optional to allow flexibility; if left blank,
      // the ID will be used as a fallback. Remove the required attribute.
      titleInput.required = false;
      titleInput.style.width = '100%';
      titleInput.style.padding = '5px';
      form.appendChild(titleLabel);
      form.appendChild(titleInput);
      const contentLabel = document.createElement('label');
      contentLabel.style.display = 'block';
      contentLabel.style.marginTop = '10px';
      contentLabel.textContent = translations[currentLang].addPageContentLabel + ` (${lang})`;
      const contentTextarea = document.createElement('textarea');
      contentTextarea.name = `page-content-${lang}`;
      contentTextarea.style.width = '100%';
      contentTextarea.style.padding = '5px';
      contentTextarea.rows = 3;
      form.appendChild(contentLabel);
      form.appendChild(contentTextarea);
    });
    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.textContent = translations[currentLang].addPageButton;
    addBtn.style.marginTop = '10px';
    addBtn.className = 'read-more';
    form.appendChild(addBtn);
    container.appendChild(form);
    // List of existing pages
    const pages = getData('pages', defaultPages);
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    pages.forEach(page => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.marginTop = '10px';
      const span = document.createElement('span');
      span.textContent = page.translations[currentLang]?.title || page.id;
      li.appendChild(span);
      const controls = document.createElement('div');
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = translations[currentLang].edit;
      editBtn.style.marginRight = '5px';
      editBtn.onclick = function () {
        // Simple prompt-based editing for demonstration
        ['ar', 'en', 'fr'].forEach(lang => {
          const newTitle = prompt(translations[currentLang].addPageTitleLabel + ` (${lang})`, page.translations[lang].title);
          const newContent = prompt(translations[currentLang].addPageContentLabel + ` (${lang})`, page.translations[lang].content);
          if (newTitle !== null && newTitle.trim() !== '') page.translations[lang].title = newTitle.trim();
          if (newContent !== null) page.translations[lang].content = newContent.trim();
        });
        saveData('pages', pages);
        renderPageManagement();
        renderStats();
      };
      controls.appendChild(editBtn);
      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = translations[currentLang].delete;
      delBtn.style.backgroundColor = 'crimson';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.padding = '5px 10px';
      delBtn.style.borderRadius = '4px';
      delBtn.onclick = function () {
        const updated = pages.filter(p => p.id !== page.id);
        saveData('pages', updated);
        renderPageManagement();
        renderStats();
      };
      controls.appendChild(delBtn);
      li.appendChild(controls);
      list.appendChild(li);
    });
    container.appendChild(list);
  }

  /**
   * Render image management section in dashboard
   * Allows uploading and deleting images stored in localStorage
   */
  function renderImageManagement() {
    const container = document.getElementById('image-management');
    if (!container) return;
    container.innerHTML = '';
    const heading = document.createElement('h3');
    heading.textContent = translations[currentLang].manageImages;
    container.appendChild(heading);
    // Form for uploading images
    const form = document.createElement('form');
    form.onsubmit = function (e) {
      e.preventDefault();
      const fileInput = form.querySelector('input[type="file"]');
      const files = fileInput.files;
      if (!files || files.length === 0) return;
      const images = getData('images', defaultImages);
      let remaining = files.length;
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (ev) {
          images.push({ id: 'img' + Date.now() + Math.random().toString(36).substr(2, 5), dataUrl: ev.target.result });
          remaining--;
          if (remaining === 0) {
            saveData('images', images);
            form.reset();
            renderImageManagement();
            renderStats();
          }
        };
        reader.readAsDataURL(file);
      });
    };
    const inputLabel = document.createElement('label');
    inputLabel.style.display = 'block';
    inputLabel.style.marginTop = '10px';
    inputLabel.textContent = translations[currentLang].uploadImageLabel;
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.style.marginTop = '5px';
    const uploadBtn = document.createElement('button');
    uploadBtn.type = 'submit';
    uploadBtn.textContent = translations[currentLang].uploadImageButton;
    uploadBtn.style.marginLeft = '10px';
    uploadBtn.className = 'read-more';
    form.appendChild(inputLabel);
    form.appendChild(fileInput);
    form.appendChild(uploadBtn);
    container.appendChild(form);
    // List of existing images
    const images = getData('images', defaultImages);
    if (images.length === 0) {
      const p = document.createElement('p');
      p.textContent = translations[currentLang].noImages || 'لا توجد صور';
      container.appendChild(p);
    } else {
      const gallery = document.createElement('div');
      gallery.style.display = 'flex';
      gallery.style.flexWrap = 'wrap';
      gallery.style.gap = '10px';
      images.forEach(imgObj => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '120px';
        wrapper.style.height = '80px';
        wrapper.style.overflow = 'hidden';
        const img = document.createElement('img');
        img.src = imgObj.dataUrl;
        img.alt = '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        wrapper.appendChild(img);
        const delBtn = document.createElement('button');
        delBtn.textContent = translations[currentLang].delete;
        delBtn.style.position = 'absolute';
        delBtn.style.top = '2px';
        delBtn.style.right = '2px';
        delBtn.style.backgroundColor = 'crimson';
        delBtn.style.color = '#fff';
        delBtn.style.border = 'none';
        delBtn.style.padding = '2px 5px';
        delBtn.style.fontSize = '12px';
        delBtn.style.borderRadius = '4px';
        delBtn.onclick = function () {
          const updated = images.filter(i => i.id !== imgObj.id);
          saveData('images', updated);
          renderImageManagement();
          renderStats();
        };
        wrapper.appendChild(delBtn);
        gallery.appendChild(wrapper);
      });
      container.appendChild(gallery);
    }
  }

  // Variables for theme and language controls (populated after DOM loaded)
  let currentLang = localStorage.getItem('lang') || 'ar';
  let currentTheme = localStorage.getItem('theme') || 'light';
  let themeToggle;
  /**
   * Build categories mega menu in the navigation. This populates the dropdown
   * with the current list of categories and attaches click handlers to filter
   * articles by category. Selecting a category will reset any active search.
   */
  function buildMegaMenu() {
    const menu = document.getElementById('categories-menu');
    if (!menu) return;
    menu.innerHTML = '';
    const categories = getData('categories', defaultCategories);
    categories.forEach(cat => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = cat.translations[currentLang]?.title || cat.id;
      link.onclick = function (e) {
        e.preventDefault();
        // Set the selected category and clear any search
        selectedCategory = cat.id;
        searchQuery = '';
        // Reset search input if present
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        buildArticles();
        buildFeaturedPosts();
      };
      li.appendChild(link);
      menu.appendChild(li);
    });
  }

  /**
   * Reset filters (category and search) to show all articles.
   */
  function resetFilters() {
    selectedCategory = null;
    searchQuery = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    buildArticles();
    buildFeaturedPosts();
  }

  /**
   * Perform a search across article titles and summaries. The search query
   * is stored globally and used by buildArticles and buildFeaturedPosts.
   * Passing an empty string clears the search filter.
   * @param {string} query
   */
  function performSearch(query) {
    searchQuery = query.toLowerCase();
    buildArticles();
    buildFeaturedPosts();
  }

  /**
   * Build the featured posts section by selecting the most recent articles
   * according to the active filters. It displays up to three articles
   * prominently at the top of the homepage.
   */
  function buildFeaturedPosts() {
    const container = document.getElementById('featured-container');
    if (!container) return;
    container.innerHTML = '';
    let articles = getData('articles', defaultArticles);
    // Apply category and search filters
    articles = articles.filter(article => {
      const categoryMatch = !selectedCategory || article.category === selectedCategory;
      let searchMatch = true;
      if (searchQuery) {
        const trans = article.translations[currentLang] || {};
        const q = searchQuery.toLowerCase();
        searchMatch = (trans.title && trans.title.toLowerCase().includes(q)) ||
                      (trans.summary && trans.summary.toLowerCase().includes(q));
      }
      return categoryMatch && searchMatch;
    });
    // Sort by date descending and take top three
    articles = articles.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 3);
    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'featured-card';
      const img = document.createElement('img');
      img.src = 'images/placeholder.png';
      img.alt = '';
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      const h3 = document.createElement('h3');
      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = article.translations[currentLang]?.title || '';
      h3.appendChild(link);
      const readMore = document.createElement('a');
      readMore.href = article.url;
      readMore.textContent = translations[currentLang].readMore || '';
      overlay.appendChild(h3);
      overlay.appendChild(readMore);
      card.appendChild(img);
      card.appendChild(overlay);
      container.appendChild(card);
    });
  }

  /**
   * Enhance article pages with a listen button, social sharing buttons and
   * related posts section. This function should be called on all pages but
   * only has an effect when an article layout is detected.
   */
  function setupArticlePageEnhancements() {
    // Only apply enhancements on pages explicitly marked as articles
    if (document.body && document.body.dataset && document.body.dataset.role !== 'article') {
      return;
    }
    const articleMain = document.querySelector('main.article');
    if (!articleMain) return;
    // Listen button: allow readers to listen to article content via the Web Speech API
    let listenBtn = document.getElementById('listen-button');
    if (!listenBtn) {
      listenBtn = document.createElement('button');
      listenBtn.id = 'listen-button';
      listenBtn.className = 'listen-btn';
      listenBtn.textContent = translations[currentLang].listen;
      // Insert the button after the meta line if available or after the title
      const meta = articleMain.querySelector('.article-meta') || articleMain.querySelector('h1');
      if (meta && meta.parentNode) {
        meta.parentNode.insertBefore(listenBtn, meta.nextSibling);
      } else {
        articleMain.insertBefore(listenBtn, articleMain.firstChild);
      }
      listenBtn.addEventListener('click', function () {
        const paragraphs = articleMain.querySelectorAll('p');
        let text = '';
        paragraphs.forEach(p => { text += p.textContent + ' '; });
        if (text.trim().length === 0) return;
        const utterance = new SpeechSynthesisUtterance(text.trim());
        utterance.lang = currentLang === 'ar' ? 'ar-SA' : (currentLang === 'fr' ? 'fr-FR' : 'en-US');
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      });
    } else {
      // Update label on language change
      listenBtn.textContent = translations[currentLang].listen;
    }
    // Share section: includes icons for social platforms and email
    let shareSection = document.getElementById('share-section');
    if (!shareSection) {
      shareSection = document.createElement('div');
      shareSection.id = 'share-section';
      const heading = document.createElement('h3');
      heading.textContent = translations[currentLang].shareThis;
      shareSection.appendChild(heading);
      const shareButtons = document.createElement('div');
      shareButtons.className = 'share-buttons';
      const url = window.location.href;
      const platforms = [
        { name: 'facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), icon: 'fab fa-facebook-f' },
        { name: 'twitter', url: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url), icon: 'fab fa-twitter' },
        { name: 'linkedin', url: 'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(url), icon: 'fab fa-linkedin-in' },
        { name: 'email', url: 'mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(url), icon: 'fa fa-envelope' }
      ];
      platforms.forEach(platform => {
        const a = document.createElement('a');
        a.href = platform.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = '<i class="' + platform.icon + '"></i>';
        a.title = platform.name;
        shareButtons.appendChild(a);
      });
      shareSection.appendChild(shareButtons);
      articleMain.appendChild(shareSection);
    } else {
      // Update heading on language change
      const heading = shareSection.querySelector('h3');
      if (heading) heading.textContent = translations[currentLang].shareThis;
    }
    // Related posts section: suggests articles in the same category
    let relatedContainer = document.getElementById('related-posts');
    if (!relatedContainer) {
      relatedContainer = document.createElement('div');
      relatedContainer.id = 'related-posts';
      const relHeading = document.createElement('h3');
      relHeading.textContent = translations[currentLang].relatedPosts;
      relatedContainer.appendChild(relHeading);
      const listContainer = document.createElement('div');
      listContainer.className = 'related-list';
      // Identify current article from its URL
      const articles = getData('articles', defaultArticles);
      const pageName = window.location.pathname.split('/').pop();
      const currentArticle = articles.find(a => a.url === pageName);
      const currentCategory = currentArticle ? currentArticle.category : null;
      let related = articles.filter(a => a.category === currentCategory && a.url !== (currentArticle ? currentArticle.url : ''));
      related = related.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 3);
      related.forEach(rel => {
        const card = document.createElement('div');
        card.className = 'related-card';
        const h4 = document.createElement('h4');
        const link = document.createElement('a');
        link.href = rel.url;
        link.textContent = rel.translations[currentLang]?.title || rel.id;
        h4.appendChild(link);
        card.appendChild(h4);
        listContainer.appendChild(card);
      });
      relatedContainer.appendChild(listContainer);
      articleMain.appendChild(relatedContainer);
    } else {
      // Update heading and list on language change
      const relHeading = relatedContainer.querySelector('h3');
      if (relHeading) relHeading.textContent = translations[currentLang].relatedPosts;
      const listContainer = relatedContainer.querySelector('.related-list');
      if (listContainer) {
        listContainer.innerHTML = '';
        const articles = getData('articles', defaultArticles);
        const pageName = window.location.pathname.split('/').pop();
        const currentArticle = articles.find(a => a.url === pageName);
        const currentCategory = currentArticle ? currentArticle.category : null;
        let related = articles.filter(a => a.category === currentCategory && a.url !== (currentArticle ? currentArticle.url : ''));
        related = related.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 3);
        related.forEach(rel => {
          const card = document.createElement('div');
          card.className = 'related-card';
          const h4 = document.createElement('h4');
          const link = document.createElement('a');
          link.href = rel.url;
          link.textContent = rel.translations[currentLang]?.title || rel.id;
          h4.appendChild(link);
          card.appendChild(h4);
          listContainer.appendChild(card);
        });
      }
    }
  }
  // Variables to handle article filtering and searching
  // selectedCategory stores the currently selected category ID for filtering; null means no filter
  let selectedCategory = null;
  // searchQuery stores the current search string. When set, articles will be filtered by this query.
  let searchQuery = '';

  /**
   * Display page content for dynamic page.html
   * Reads the "id" query parameter and injects the corresponding page
   * translations into the DOM. Only runs if a container with id
   * 'page-content' exists. Allows multi-language support for pages.
   */
  function displayPageContent() {
    const container = document.getElementById('page-content');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const pageId = params.get('id');
    if (!pageId) return;
    const pages = getData('pages', defaultPages);
    const pageObj = pages.find(p => p.id === pageId);
    if (!pageObj) return;
    const titleEl = container.querySelector('h1');
    const bodyEl = container.querySelector('.page-body');
    const pageTrans = pageObj.translations[currentLang] || {};
    if (titleEl) titleEl.textContent = pageTrans.title || pageId;
    if (bodyEl) {
      // Insert content as HTML (sanitised by replacing newline with <br>)
      bodyEl.innerHTML = (pageTrans.content || '').replace(/\n/g, '<br>');
    }
  }

  // Main initialization after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Get controls
    const langSelect = document.getElementById('language-select');
    themeToggle = document.getElementById('theme-toggle');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', function () {
        currentLang = this.value;
        localStorage.setItem('lang', currentLang);
        applyLanguage();
        buildCategories();
        buildArticles();
        renderStats();
        renderCategoryManagement();
        renderArticleManagement();
        renderPageManagement();
        renderImageManagement();
        // Rebuild mega menu, featured posts and article enhancements on language change
        buildMegaMenu();
        buildFeaturedPosts();
        setupArticlePageEnhancements();
        // Update search placeholder to reflect new language
        const searchInputLang = document.getElementById('search-input');
        if (searchInputLang) searchInputLang.placeholder = translations[currentLang].searchPlaceholder || searchInputLang.placeholder;
      });
    }
    if (themeToggle) {
      applyThemeFromStorage();
      themeToggle.addEventListener('click', function () {
        const dark = document.body.classList.toggle('dark');
        currentTheme = dark ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        updateThemeButton();
      });
    }
    // Record visit
    incrementVisits();
    // Apply language and build dynamic content
    applyLanguage();
    buildCategories();
    buildArticles();
    renderStats();
    renderCategoryManagement();
    renderArticleManagement();
    renderPageManagement();
    renderImageManagement();
    // Build additional UI elements on first load
    buildMegaMenu();
    buildFeaturedPosts();
    setupArticlePageEnhancements();
    // Initialise search form if present
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      const searchInput = document.getElementById('search-input');
      // Set placeholder based on current language
      if (searchInput) searchInput.placeholder = translations[currentLang].searchPlaceholder || searchInput.placeholder;
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const value = searchInput ? searchInput.value.trim() : '';
        performSearch(value);
      });
    }
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('Service worker registration failed', err);
      });
    }

    // Handle subscription form submission
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('subscribe-email');
        const email = emailInput.value.trim();
        if (!email) return;
        // Save email in localStorage (append to subscribers array)
        const subscribers = getData('subscribers', []);
        subscribers.push({ email: email, date: new Date().toISOString() });
        saveData('subscribers', subscribers);
        // Clear input and show simple thank you message
        emailInput.value = '';
        alert(translations[currentLang].subscribeButton + ' ✓');
      });
    }
    // If this is a dynamic page, display its content
    displayPageContent();
  });
})();