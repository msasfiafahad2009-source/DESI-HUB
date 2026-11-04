/* ==========================================================================
   DESI HUB — Unified Master Script
   Features: Task 2 Navbar & Dark Mode, Task 3 Explorer (Search, Filter, Count,
   Sort & Empty State), Task 3 Smart Contact Validation, Shopping Cart & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------
  // TASK 2 — FEATURE A: Mobile Menu Toggle
  // ----------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mainNav = document.getElementById('main-nav');

  if (menuToggleBtn && mainNav) {
    menuToggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }

  // ----------------------------------------------------
  // TASK 2 — FEATURE B: Dark Mode Toggle
  // ----------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeBtnText = document.getElementById('theme-btn-text');

  if (themeToggleBtn && themeBtnText) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');

      if (isDark) {
        themeBtnText.textContent = 'Light mode';
        themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
      } else {
        themeBtnText.textContent = 'Dark mode';
        themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
      }
    });
  }

  // ----------------------------------------------------
  // TASK 3 — REACTIVE EXPLORER (8 Pantry Items)
  // ----------------------------------------------------
  const pantryCollection = [
    {
      id: 1,
      title: "Royal Desi Spice Mix",
      category: "Whole Spices",
      price: 350,
      inStock: true,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
      description: "Stone-ground aromatic blend of cardamom, star anise, and whole cloves for rich stews."
    },
    {
      id: 2,
      title: "Aged Basmati Rice",
      category: "Grains",
      price: 500,
      inStock: true,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      description: "Extra-long grain fragrant basmati rice aged for 2 years. Perfect for Biryani and Pulao."
    },
    {
      id: 3,
      title: "Organic Turmeric Powder",
      category: "Ground Spices",
      price: 220,
      inStock: false,
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
      description: "Pure heirloom turmeric root ground into vibrant golden curry powder."
    },
    {
      id: 4,
      title: "Handcrafted Clay Handi",
      category: "Cookware",
      price: 1200,
      inStock: true,
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
      description: "Traditional earthenware pot for slow-cooking karahi with authentic clay aroma."
    },
    {
      id: 5,
      title: "Pure Desi Ghee",
      category: "Pantry Essentials",
      price: 850,
      inStock: true,
      image: "https://images.unsplash.com/photo-1589927986076-2d5422b394f1?auto=format&fit=crop&w=600&q=80",
      description: "Clarified grass-fed butter cooked slowly for a rich nuttiness and high smoke point."
    },
    {
      id: 6,
      title: "Kashmiri Red Chilli",
      category: "Ground Spices",
      price: 280,
      inStock: false,
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
      description: "Mild chilli powder giving vibrant red color without overpowering heat."
    },
    {
      id: 7,
      title: "Pink Himalayan Salt",
      category: "Pantry Essentials",
      price: 180,
      inStock: true,
      image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c88c?auto=format&fit=crop&w=600&q=80",
      description: "Unrefined mineral-rich crystal salt mined straight from Khewra salt mines."
    },
    {
      id: 8,
      title: "Saffron Threads (Zafran)",
      category: "Luxury Spices",
      price: 1500,
      inStock: true,
      image: "https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=600&q=80",
      description: "Grade-1 organic saffron threads harvested for biryani aroma and royal desserts."
    }
  ];

  // Explorer State Variables
  let searchText = "";
  let selectedCategory = "All";
  let sortAscending = true;

  // Explorer DOM Queries
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const categoryButtonsContainer = document.getElementById('category-buttons');
  const countDisplay = document.getElementById('count-display');
  const emptyState = document.getElementById('empty-state');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const sortPriceBtn = document.getElementById('sort-price-btn');

  // Pure Render Function
  function renderExplorer(items) {
    if (!productsGrid) return;

    productsGrid.innerHTML = items.map(item => {
      const stockBadgeHTML = item.inStock
        ? `<span class="stock-badge in-stock"><i class="fa-solid fa-check"></i> In Stock</span>`
        : `<span class="stock-badge sold-out"><i class="fa-solid fa-xmark"></i> Sold Out</span>`;

      return `
        <div class="card product-card">
          <div class="product-img-wrapper">
            <img src="${item.image}" alt="${item.title}" />
            <span class="product-tag">${item.category}</span>
          </div>
          <div class="product-info">
            <h3 class="product-title">${item.title}</h3>
            <p class="product-desc">${item.description}</p>
            <div class="product-footer">
              <span class="product-price">Rs. ${item.price.toLocaleString()}</span>
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                ${stockBadgeHTML}
                <button class="btn btn-gold btn-sm add-to-cart-btn" data-id="${item.id}" data-name="${item.title}" data-price="${item.price}" data-img="${item.image}">
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Rebind cart buttons after dynamic rendering
    bindCartButtons();
  }

  // Update Function
  function updateExplorer() {
    let filtered = pantryCollection.filter(item => {
      const query = searchText.toLowerCase().trim();
      const matchesSearch = item.title.toLowerCase().includes(query) || 
                            item.description.toLowerCase().includes(query);
      const matchesCategory = (selectedCategory === "All") || (item.category === selectedCategory);
      return matchesSearch && matchesCategory;
    });

    // Sort unmutated copy by price
    const sortedCopy = [...filtered].sort((a, b) => {
      return sortAscending ? a.price - b.price : b.price - a.price;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${sortedCopy.length} of ${pantryCollection.length} items`;
    }

    if (sortedCopy.length === 0) {
      if (productsGrid) productsGrid.style.display = "none";
      if (emptyState) emptyState.classList.remove("hidden");
    } else {
      if (productsGrid) productsGrid.style.display = "grid";
      if (emptyState) emptyState.classList.add("hidden");
      renderExplorer(sortedCopy);
    }
  }

  // Explorer Event Handlers
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchText = e.target.value;
      updateExplorer();
    });
  }

  if (categoryButtonsContainer) {
    categoryButtonsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      selectedCategory = btn.dataset.category;
      updateExplorer();
    });
  }

  if (sortPriceBtn) {
    sortPriceBtn.addEventListener('click', () => {
      sortAscending = !sortAscending;
      sortPriceBtn.innerHTML = sortAscending 
        ? `<i class="fa-solid fa-arrow-down-short-wide"></i> Sort by Price: Low to High`
        : `<i class="fa-solid fa-arrow-up-wide-short"></i> Sort by Price: High to Low`;
      updateExplorer();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      searchText = "";
      selectedCategory = "All";
      if (searchInput) searchInput.value = "";

      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.category === "All");
      });

      updateExplorer();
    });
  }

  // Initial Explorer Load
  updateExplorer();

  // ----------------------------------------------------
  // TASK 3: SMART CONTACT FORM VALIDATION & LIVE COUNTER
  // ----------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('c-name');
  const emailInput = document.getElementById('c-email');
  const messageInput = document.getElementById('c-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  
  const charCounter = document.getElementById('char-counter');
  const formStatusBanner = document.getElementById('form-status-banner');

  const MAX_CHAR_LIMIT = 200;

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const currentLength = messageInput.value.length;
      charCounter.textContent = `${currentLength} / ${MAX_CHAR_LIMIT}`;

      if (currentLength >= MAX_CHAR_LIMIT) {
        charCounter.classList.add('limit-reached');
      } else {
        charCounter.classList.remove('limit-reached');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors();

      let isValid = true;

      const trimmedName = nameInput ? nameInput.value.trim() : '';
      if (trimmedName.length < 3) {
        showFieldError(nameInput, nameError, "Please enter your full name.");
        isValid = false;
      } else {
        showFieldSuccess(nameInput);
      }

      const emailValue = emailInput ? emailInput.value.trim() : '';
      if (!emailValue.includes('@') || !emailValue.includes('.')) {
        showFieldError(emailInput, emailError, "Please enter a valid email.");
        isValid = false;
      } else {
        showFieldSuccess(emailInput);
      }

      const messageValue = messageInput ? messageInput.value.trim() : '';
      if (messageValue.length < 10) {
        showFieldError(messageInput, messageError, "Tell us a little more (10+ characters).");
        isValid = false;
      } else {
        showFieldSuccess(messageInput);
      }

      if (isValid) {
        if (formStatusBanner) {
          formStatusBanner.className = 'status-banner success';
          formStatusBanner.textContent = `Thank you, ${trimmedName}! Your message has been received.`;
        }

        contactForm.reset();
        if (charCounter) charCounter.textContent = `0 / ${MAX_CHAR_LIMIT}`;
        setTimeout(clearFormErrors, 5000);
      } else {
        if (formStatusBanner) {
          formStatusBanner.className = 'status-banner error';
          formStatusBanner.textContent = 'Please fix the highlighted errors above.';
        }
      }
    });
  }

  function showFieldError(inputEl, errorEl, messageText) {
    if (inputEl) {
      inputEl.classList.add('input-error');
      inputEl.classList.remove('input-success');
    }
    if (errorEl) errorEl.textContent = messageText;
  }

  function showFieldSuccess(inputEl) {
    if (inputEl) {
      inputEl.classList.remove('input-error');
      inputEl.classList.add('input-success');
    }
  }

  function clearFormErrors() {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) input.classList.remove('input-error', 'input-success');
    });

    [nameError, emailError, messageError].forEach(errorEl => {
      if (errorEl) errorEl.textContent = '';
    });

    if (formStatusBanner) {
      formStatusBanner.className = 'status-banner';
      formStatusBanner.textContent = '';
    }
  }

  // ----------------------------------------------------
  // SHOPPING CART & 5% DISCOUNT LOGIC
  // ----------------------------------------------------
  let cart = [];

  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartOpenBtn = document.getElementById('cart-open-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBadgeCount = document.getElementById('cart-badge-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartTotalEl = document.getElementById('cart-total');
  const discountBannerEl = document.getElementById('discount-banner');
  const discountMessageEl = document.getElementById('discount-message');

  const toggleCart = (open) => {
    if (!cartDrawer || !cartOverlay) return;
    if (open) {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (cartOpenBtn) cartOpenBtn.addEventListener('click', () => toggleCart(true));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

  function bindCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.replaceWith(button.cloneNode(true));
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        const img = btn.dataset.img;

        addToCart(id, name, price, img);
        showToast(`${name} added to cart!`);
      });
    });
  }

  function addToCart(id, name, price, img) {
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }
    updateCartUI();
  }

  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const target = e.target;
      const qtyBtn = target.closest('.qty-btn');
      if (qtyBtn) {
        const id = qtyBtn.dataset.id;
        const action = qtyBtn.dataset.action;
        const item = cart.find(i => i.id === id);
        if (item) {
          if (action === 'increase') item.qty += 1;
          if (action === 'decrease') item.qty -= 1;
          if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
          updateCartUI();
        }
        return;
      }

      const removeBtn = target.closest('.remove-item-btn');
      if (removeBtn) {
        const id = removeBtn.dataset.id;
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
        showToast("Item removed from cart.");
      }
    });
  }

  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadgeCount) cartBadgeCount.textContent = totalQty;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px 0;">Your shopping cart is empty.</p>`;
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
            <div class="qty-controls">
              <button class="qty-btn" data-id="${item.id}" data-action="decrease" aria-label="Decrease quantity">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-id="${item.id}" data-action="increase" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="remove-item-btn" data-id="${item.id}" title="Remove Item" aria-label="Remove Item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // 5% Discount Calculation
    let discount = 0;
    if (subtotal >= 1000) {
      discount = subtotal * 0.05;
      if (discountBannerEl) discountBannerEl.style.background = "rgba(16, 185, 129, 0.15)";
      if (discountMessageEl) {
        discountMessageEl.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> <strong>5% Royal Discount Unlocked!</strong> Saved Rs. ${Math.round(discount).toLocaleString()}`;
      }
    } else {
      const remaining = 1000 - subtotal;
      if (discountBannerEl) discountBannerEl.style.background = "rgba(251, 191, 36, 0.1)";
      if (discountMessageEl) {
        if (subtotal > 0) {
          discountMessageEl.innerHTML = `<i class="fa-solid fa-gift text-gold"></i> Add <strong>Rs. ${remaining.toLocaleString()}</strong> more to get 5% OFF!`;
        } else {
          discountMessageEl.innerHTML = `<i class="fa-solid fa-gift text-gold"></i> Add Rs. 1,000 to get 5% OFF!`;
        }
      }
    }

    const finalTotal = subtotal - discount;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `Rs. ${Math.round(subtotal).toLocaleString()}`;
    if (cartDiscountEl) cartDiscountEl.textContent = `-Rs. ${Math.round(discount).toLocaleString()}`;
    if (cartTotalEl) cartTotalEl.textContent = `Rs. ${Math.round(finalTotal).toLocaleString()}`;
  }

  // ----------------------------------------------------
  // RECIPE MODAL VIEWER
  // ----------------------------------------------------
  const recipesData = {
    biryani: {
      title: "Royal Chicken Biryani",
      time: "50 Mins",
      servings: "Serves 4-6",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      ingredients: [
        "1 kg Chicken (cut into curry pieces)",
        "750g Premium Basmati Rice (soaked 30 mins)",
        "3 large Onions (thinly sliced)",
        "3 Tomatoes (chopped)",
        "1 cup Whisked Yogurt",
        "2 tbsp Ginger-Garlic paste",
        "2 tbsp Desi Spice Mix / Biryani Masala",
        "1/2 cup Fresh Mint and Coriander leaves",
        "1/2 cup Oil or Pure Ghee",
        "Salt & Saffron milk to taste"
      ],
      method: [
        "Sauté sliced onions in hot ghee until dark golden brown. Set half aside for garnish.",
        "Add chicken, ginger-garlic paste, tomatoes, yogurt, and Desi Spice Mix. Cook on medium heat until chicken is tender.",
        "In a separate pot, boil basmati rice with whole spices until 70% cooked. Drain water.",
        "In a heavy cooking pot, layer cooked chicken curry and basmati rice. Top with reserved fried onions, mint leaves, and saffron milk.",
        "Cover tightly (dum) and simmer on low heat for 15-20 minutes. Serve piping hot with raita!"
      ]
    },
    samosa: {
      title: "Crispy Potato Samosas",
      time: "35 Mins",
      servings: "Serves 4",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      ingredients: [
        "2 cups All-purpose flour (Maida)",
        "4 tbsp Ghee or Oil",
        "4 boiled Potatoes (coarsely mashed)",
        "1/2 cup Boiled Green Peas",
        "2 Green Chillies (finely chopped)",
        "1 tsp Cumin seeds & roasted coriander seeds",
        "1/2 tsp Garam Masala",
        "Oil for deep frying",
        "Salt to taste"
      ],
      method: [
        "Knead flour, ghee, salt, and water into a firm dough. Rest covered for 20 minutes.",
        "Heat 1 tbsp oil, add cumin, green chillies, peas, and mashed potatoes. Mix in spices and sauté 3-5 minutes.",
        "Divide dough into small balls, roll into ovals, cut in half, and shape into cones.",
        "Stuff cones with cooled potato mixture and seal edges securely with a little water.",
        "Deep fry in oil on medium-low heat until crisp and golden brown."
      ]
    },
    cake: {
      title: "Desi Style Chocolate Cake",
      time: "45 Mins",
      servings: "Serves 8",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      ingredients: [
        "1.5 cups All-purpose flour",
        "1/2 cup Unsweetened Cocoa powder",
        "1 cup Granulated Sugar",
        "2 Eggs",
        "1/2 cup Milk",
        "1/2 cup Vegetable oil or melted butter",
        "1 tsp Baking powder & 1/2 tsp Vanilla extract"
      ],
      method: [
        "Whisk eggs, sugar, oil, and vanilla extract together in a large bowl until fluffy.",
        "Sift together flour, cocoa powder, and baking powder.",
        "Gently fold dry ingredients and milk into the wet mixture until a smooth batter forms.",
        "Pour into a greased baking pan and bake at 180°C (350°F) for 30-35 minutes.",
        "Cool completely, glaze with chocolate syrup, and slice into servings!"
      ]
    }
  };

  const recipeModal = document.getElementById('recipe-modal');
  const recipeModalClose = document.getElementById('recipe-modal-close');
  const recipeModalContent = document.getElementById('recipe-modal-content');

  document.querySelectorAll('.view-recipe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.dataset.recipe;
      const recipe = recipesData[key];
      if (recipe && recipeModalContent && recipeModal) {
        recipeModalContent.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 16px;" />
          <h2 style="font-family: var(--font-heading); color: var(--gold-primary); font-size: 1.6rem; margin-bottom: 6px;">${recipe.title}</h2>
          <div style="display: flex; gap: 16px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
            <span><i class="fa-regular fa-clock"></i> ${recipe.time}</span>
            <span><i class="fa-solid fa-user-group"></i> ${recipe.servings}</span>
          </div>
          
          <h3 style="font-family: var(--font-heading); margin-bottom: 8px; font-size: 1.1rem;">Ingredients</h3>
          <ul style="list-style: none; margin-bottom: 18px;">
            ${recipe.ingredients.map(ing => `<li style="font-size: 0.85rem; color: var(--text-muted); padding: 4px 0; border-bottom: 1px solid var(--border-color);"><i class="fa-solid fa-check gold-text" style="margin-right: 8px;"></i> ${ing}</li>`).join('')}
          </ul>
          
          <h3 style="font-family: var(--font-heading); margin-bottom: 8px; font-size: 1.1rem;">Step-by-Step Instructions</h3>
          <ol style="margin-left: 18px; color: var(--text-muted); font-size: 0.85rem; display: flex; flex-direction: column; gap: 8px;">
            ${recipe.method.map(m => `<li>${m}</li>`).join('')}
          </ol>
        `;
        
        const card = recipeModal.querySelector('.modal-card');
        if (card) card.scrollTop = 0;

        recipeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeRecipeModal = () => {
    if (!recipeModal) return;
    recipeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (recipeModalClose) recipeModalClose.addEventListener('click', closeRecipeModal);
  if (recipeModal) {
    recipeModal.addEventListener('click', (e) => {
      if (e.target === recipeModal) closeRecipeModal();
    });
  }

  // Toast System
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    if (container.children.length >= 3) {
      container.removeChild(container.firstChild);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});
// Wrapped in IIFE to eliminate VS Code TS(2451) scope collision warnings
(() => {
  // Requirement 1: An array of 8 objects with at least 4 keys each (7 keys used here)
  const pantryCollection = [
    {
      id: 1,
      title: "Royal Desi Spice Mix",
      category: "Whole Spices",
      price: 350,
      inStock: true, // Used for ternary operator condition
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
      description: "Stone-ground aromatic blend of cardamom, star anise, and whole cloves for rich stews."
    },
    {
      id: 2,
      title: "Aged Basmati Rice",
      category: "Grains",
      price: 500,
      inStock: true,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      description: "Extra-long grain fragrant basmati rice aged for 2 years. Perfect for Biryani and Pulao."
    },
    {
      id: 3,
      title: "Organic Turmeric Powder",
      category: "Ground Spices",
      price: 220,
      inStock: false, // Will display "Sold Out" via ternary operator
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
      description: "Pure heirloom turmeric root ground into vibrant golden curry powder."
    },
    {
      id: 4,
      title: "Handcrafted Clay Handi",
      category: "Cookware",
      price: 1200,
      inStock: true,
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
      description: "Traditional earthenware pot for slow-cooking karahi with authentic clay aroma."
    },
    {
      id: 5,
      title: "Pure Desi Ghee",
      category: "Pantry Essentials",
      price: 850,
      inStock: true,
      image: "https://images.unsplash.com/photo-1589927986076-2d5422b394f1?auto=format&fit=crop&w=600&q=80",
      description: "Clarified grass-fed butter cooked slowly for a rich nuttiness and high smoke point."
    },
    {
      id: 6,
      title: "Kashmiri Red Chilli",
      category: "Ground Spices",
      price: 280,
      inStock: false, // Will display "Sold Out"
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
      description: "Mild chilli powder giving vibrant red color without overpowering heat."
    },
    {
      id: 7,
      title: "Pink Himalayan Salt",
      category: "Pantry Essentials",
      price: 180,
      inStock: true,
      image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c88c?auto=format&fit=crop&w=600&q=80",
      description: "Unrefined mineral-rich crystal salt mined straight from Khewra salt mines."
    },
    {
      id: 8,
      title: "Saffron Threads (Zafran)",
      category: "Luxury Spices",
      price: 1500,
      inStock: true,
      image: "https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=600&q=80",
      description: "Grade-1 organic saffron threads harvested for biryani aroma and royal desserts."
    }
  ];

  const listContainer = document.querySelector("#list");

  // Requirement 2: Render cards using .map() and .join('')
  if (listContainer) {
    const cardsHTML = pantryCollection
      .map(item => {
        // Requirement 3: Ternary operator (? :) displays "In Stock" vs "Sold Out"
        const stockBadgeHTML = item.inStock
          ? `<span class="stock-badge in-stock"><i class="fa-solid fa-check"></i> In Stock</span>`
          : `<span class="stock-badge sold-out"><i class="fa-solid fa-xmark"></i> Sold Out</span>`;

        return `
          <article class="card">
            <div class="card-img-wrapper">
              <img src="${item.image}" alt="${item.title}" class="card-img" />
              <span class="card-category">${item.category}</span>
            </div>
            <div class="card-body">
              <h2 class="card-title">${item.title}</h2>
              <p class="card-desc">${item.description}</p>
              <div class="card-meta">
                <span class="card-price">Rs. ${item.price.toLocaleString()}</span>
                ${stockBadgeHTML}
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    listContainer.innerHTML = cardsHTML;
  }
})();
// Wrapped in IIFE to eliminate VS Code TS(2451) scope collision warnings
(() => {
  // 1. Data Collection (8 objects, 7 keys each)
  const pantryCollection = [
    {
      id: 1,
      title: "Royal Desi Spice Mix",
      category: "Whole Spices",
      price: 350,
      inStock: true,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
      description: "Stone-ground aromatic blend of cardamom, star anise, and whole cloves for rich stews."
    },
    {
      id: 2,
      title: "Aged Basmati Rice",
      category: "Grains",
      price: 500,
      inStock: true,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      description: "Extra-long grain fragrant basmati rice aged for 2 years. Perfect for Biryani and Pulao."
    },
    {
      id: 3,
      title: "Organic Turmeric Powder",
      category: "Ground Spices",
      price: 220,
      inStock: false,
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
      description: "Pure heirloom turmeric root ground into vibrant golden curry powder."
    },
    {
      id: 4,
      title: "Handcrafted Clay Handi",
      category: "Cookware",
      price: 1200,
      inStock: true,
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
      description: "Traditional earthenware pot for slow-cooking karahi with authentic clay aroma."
    },
    {
      id: 5,
      title: "Pure Desi Ghee",
      category: "Pantry Essentials",
      price: 850,
      inStock: true,
      image: "https://images.unsplash.com/photo-1589927986076-2d5422b394f1?auto=format&fit=crop&w=600&q=80",
      description: "Clarified grass-fed butter cooked slowly for a rich nuttiness and high smoke point."
    },
    {
      id: 6,
      title: "Kashmiri Red Chilli",
      category: "Ground Spices",
      price: 280,
      inStock: false,
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
      description: "Mild chilli powder giving vibrant red color without overpowering heat."
    },
    {
      id: 7,
      title: "Pink Himalayan Salt",
      category: "Pantry Essentials",
      price: 180,
      inStock: true,
      image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c88c?auto=format&fit=crop&w=600&q=80",
      description: "Unrefined mineral-rich crystal salt mined straight from Khewra salt mines."
    },
    {
      id: 8,
      title: "Saffron Threads (Zafran)",
      category: "Luxury Spices",
      price: 1500,
      inStock: true,
      image: "https://images.unsplash.com/photo-1509358271058-acd01cc9386a?auto=format&fit=crop&w=600&q=80",
      description: "Grade-1 organic saffron threads harvested for biryani aroma and royal desserts."
    }
  ];

  // 2. Required State Variables
  let searchText = "";
  let category = "All";
  let sortAscending = true;

  // 3. DOM Element Selection
  const listContainer = document.querySelector("#list");
  const searchInput = document.querySelector("#search-input");
  const categoryButtonsContainer = document.querySelector("#category-buttons");
  const countDisplay = document.querySelector("#count-display");
  const emptyState = document.querySelector("#empty-state");
  const resetFiltersBtn = document.querySelector("#reset-filters-btn");
  const sortPriceBtn = document.querySelector("#sort-price-btn");

  // 4. Pure render() Function: Takes an array and renders HTML cards using map & join
  function render(items) {
    if (!listContainer) return;

    const cardsHTML = items
      .map(item => {
        const stockBadgeHTML = item.inStock
          ? `<span class="stock-badge in-stock"><i class="fa-solid fa-check"></i> In Stock</span>`
          : `<span class="stock-badge sold-out"><i class="fa-solid fa-xmark"></i> Sold Out</span>`;

        return `
          <article class="card">
            <div class="card-img-wrapper">
              <img src="${item.image}" alt="${item.title}" class="card-img" />
              <span class="card-category">${item.category}</span>
            </div>
            <div class="card-body">
              <h2 class="card-title">${item.title}</h2>
              <p class="card-desc">${item.description}</p>
              <div class="card-meta">
                <span class="card-price">Rs. ${item.price.toLocaleString()}</span>
                ${stockBadgeHTML}
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    listContainer.innerHTML = cardsHTML;
  }

  // 5. update() Function: Filters using state variables (searchText, category), updates count & empty state
  function update() {
    // A. Filter Array using state variables (case-insensitive search)
    let filtered = pantryCollection.filter(item => {
      const query = searchText.toLowerCase().trim();
      const matchesSearch = item.title.toLowerCase().includes(query) || 
                            item.description.toLowerCase().includes(query);

      const matchesCategory = (category === "All") || (item.category === category);

      return matchesSearch && matchesCategory;
    });

    // AI: Added sort functionality using a shallow copy ([...filtered]) to prevent mutating the original array
    const sortedCopy = [...filtered].sort((a, b) => {
      return sortAscending ? a.price - b.price : b.price - a.price;
    });

    // B. Requirement: Display count (Showing X of Y)
    if (countDisplay) {
      countDisplay.textContent = `Showing ${sortedCopy.length} of ${pantryCollection.length} items`;
    }

    // C. Requirement: Display friendly empty state when no items match
    if (sortedCopy.length === 0) {
      if (listContainer) listContainer.style.display = "none";
      if (emptyState) emptyState.classList.remove("hidden");
    } else {
      if (listContainer) listContainer.style.display = "grid";
      if (emptyState) emptyState.classList.add("hidden");
      render(sortedCopy);
    }
  }

  // 6. Event Listeners

  // Requirement: Search box filters as you type
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchText = e.target.value;
      update();
    });
  }

  // Requirement: Category buttons update state variable 'category'
  if (categoryButtonsContainer) {
    categoryButtonsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      category = btn.dataset.category;
      update();
    });
  }

  // Optional Feature: Sort by price toggle
  if (sortPriceBtn) {
    sortPriceBtn.addEventListener("click", () => {
      sortAscending = !sortAscending;
      sortPriceBtn.innerHTML = sortAscending 
        ? `<i class="fa-solid fa-arrow-down-short-wide"></i> Sort by Price: Low to High`
        : `<i class="fa-solid fa-arrow-up-wide-short"></i> Sort by Price: High to Low`;
      update();
    });
  }

  // Reset Filters Button for Empty State
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      searchText = "";
      category = "All";
      if (searchInput) searchInput.value = "";

      document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.category === "All");
      });

      update();
    });
  }

  // Initial update execution
  document.addEventListener("DOMContentLoaded", () => {
    update();
  });
})();