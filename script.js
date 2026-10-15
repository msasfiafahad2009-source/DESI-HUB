/* ==========================================================================
   DESI HUB — Complete Application Script
   Features: Task 2 Mobile Toggle (classList.toggle('open')), Dark Mode Toggle
   (classList.toggle('dark')), Task 3 Smart Form Validation & Character Counter,
   Shopping Cart with 5% Discount Rule & Recipe Modal Viewer
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
      console.log('Mobile menu toggled. Menu active:', mainNav.classList.contains('open'));
    });

    // Close menu when clicking navigation links
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

      console.log('Theme changed. Dark mode active:', isDark);
    });
  }

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

  // Live Character Counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const currentLength = messageInput.value.length;
      
      // Safety Rule: Use textContent strictly
      charCounter.textContent = `${currentLength} / ${MAX_CHAR_LIMIT}`;

      if (currentLength >= MAX_CHAR_LIMIT) {
        charCounter.classList.add('limit-reached');
      } else {
        charCounter.classList.remove('limit-reached');
      }
    });
  }

  // Submit Event & Validation Checks
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors();

      let isValid = true;

      // Rule 1: Name validation (At least 3 characters after .trim())
      const trimmedName = nameInput ? nameInput.value.trim() : '';
      if (trimmedName.length < 3) {
        showFieldError(nameInput, nameError, "Please enter your full name.");
        isValid = false;
      } else {
        showFieldSuccess(nameInput);
      }

      // Rule 2: Email validation (Contains '@' and '.')
      const emailValue = emailInput ? emailInput.value.trim() : '';
      if (!emailValue.includes('@') || !emailValue.includes('.')) {
        showFieldError(emailInput, emailError, "Please enter a valid email.");
        isValid = false;
      } else {
        showFieldSuccess(emailInput);
      }

      // Rule 3: Message validation (At least 10 characters)
      const messageValue = messageInput ? messageInput.value.trim() : '';
      if (messageValue.length < 10) {
        showFieldError(messageInput, messageError, "Tell us a little more (10+ characters).");
        isValid = false;
      } else {
        showFieldSuccess(messageInput);
      }

      // Decision logic
      if (isValid) {
        // Safety Rule: Use textContent exclusively to render visitor name without XSS execution
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
          formStatusBanner.textContent = 'Please fix the errors below before sending.';
        }
      }
    });
  }

  function showFieldError(inputEl, errorEl, messageText) {
    if (inputEl) {
      inputEl.classList.add('input-error');
      inputEl.classList.remove('input-success');
    }
    if (errorEl) {
      // Use textContent strictly
      errorEl.textContent = messageText;
    }
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
  // Shopping Cart & Discount Rule State
  // ----------------------------------------------------
  let cart = [];

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
  
  const recipeModal = document.getElementById('recipe-modal');
  const recipeModalClose = document.getElementById('recipe-modal-close');
  const recipeModalContent = document.getElementById('recipe-modal-content');

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

  // Recipe Modal
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

  // Checkout Demo
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
      }
      showToast("Thank you for trying DESI HUB!");
      cart = [];
      updateCartUI();
      toggleCart(false);
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