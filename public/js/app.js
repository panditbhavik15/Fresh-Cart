/* ═══════════════════════════════════════════════════
   FreshCart — Application Logic (SPA)
   ═══════════════════════════════════════════════════ */

const API = "";

const app = {
  products: [],
  cart: { items: [], itemCount: 0, total: 0 },
  activeCategory: "All",
  searchQuery: "",
  sortBy: "default",

  /* ─── Init ─── */
  async init() {
    this.bindEvents();
    this.handleScroll();
    await Promise.all([this.loadProducts(), this.loadCart()]);
    this.renderCategories();
    this.renderProducts();
  },

  /* ─── Events ─── */
  bindEvents() {
    const searchInput = document.getElementById("search-input");
    let debounce;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        this.searchQuery = e.target.value.trim();
        this.renderProducts();
      }, 250);
    });

    document.getElementById("sort-select").addEventListener("change", (e) => {
      this.sortBy = e.target.value;
      this.renderProducts();
    });

    window.addEventListener("scroll", () => this.handleScroll());

    // close modals on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeCheckout();
        this.closeSuccess();
        const sidebar = document.getElementById("cart-sidebar");
        if (sidebar.classList.contains("open")) this.toggleCart();
      }
    });
  },

  handleScroll() {
    const header = document.getElementById("header");
    header.classList.toggle("scrolled", window.scrollY > 10);
  },

  /* ─── API Calls ─── */
  async loadProducts() {
    try {
      const res = await fetch(`${API}/api/products`);
      const json = await res.json();
      this.products = json.data || [];
    } catch (err) {
      console.error("Failed to load products:", err);
      this.toast("Failed to load products", "❌");
    }
  },

  async loadCart() {
    try {
      const res = await fetch(`${API}/api/cart`);
      const json = await res.json();
      this.cart = json.data || { items: [], itemCount: 0, total: 0 };
      this.updateCartBadge();
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  },

  async addToCart(productId) {
    try {
      const res = await fetch(`${API}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const json = await res.json();
      if (json.success) {
        this.toast(json.message, "✅");
        await this.loadCart();
        this.renderCartItems();
        this.renderProducts(); // update qty display
        // bounce badge
        const badge = document.getElementById("cart-badge");
        badge.classList.remove("bounce");
        void badge.offsetWidth;
        badge.classList.add("bounce");
      }
    } catch (err) {
      this.toast("Failed to add item", "❌");
    }
  },

  async updateQty(productId, qty) {
    try {
      await fetch(`${API}/api/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      });
      await this.loadCart();
      this.renderCartItems();
      this.renderProducts();
    } catch (err) {
      this.toast("Failed to update quantity", "❌");
    }
  },

  async removeFromCart(productId) {
    try {
      await fetch(`${API}/api/cart/${productId}`, { method: "DELETE" });
      this.toast("Item removed", "🗑️");
      await this.loadCart();
      this.renderCartItems();
      this.renderProducts();
    } catch (err) {
      this.toast("Failed to remove item", "❌");
    }
  },

  async clearCart() {
    try {
      await fetch(`${API}/api/cart`, { method: "DELETE" });
      this.toast("Cart cleared", "🗑️");
      await this.loadCart();
      this.renderCartItems();
      this.renderProducts();
    } catch (err) {
      this.toast("Failed to clear cart", "❌");
    }
  },

  /* ─── Render Categories ─── */
  renderCategories() {
    const grid = document.getElementById("categories-grid");
    const categoryEmojis = {
      All: "🏪", Fruits: "🍎", Vegetables: "🥦",
      Dairy: "🥛", Bakery: "🍞", Beverages: "🥤", Snacks: "🍿",
    };
    const cats = ["All", ...new Set(this.products.map((p) => p.category))];

    grid.innerHTML = cats
      .map(
        (cat) => `
      <div class="category-card ${this.activeCategory === cat ? "active" : ""}"
           onclick="app.filterCategory('${cat}')" id="cat-${cat}">
        <span class="category-card__emoji">${categoryEmojis[cat] || "📦"}</span>
        <span class="category-card__name">${cat}</span>
      </div>`
      )
      .join("");
  },

  filterCategory(category) {
    this.activeCategory = category;
    this.renderCategories();
    this.renderProducts();
    document.getElementById("products-title").textContent =
      category === "All" ? "All Products" : category;
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  },

  /* ─── Render Products ─── */
  renderProducts() {
    let filtered = [...this.products];

    // category filter
    if (this.activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === this.activeCategory);
    }

    // search filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // sort
    switch (this.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    const grid = document.getElementById("products-grid");
    const empty = document.getElementById("products-empty");

    if (filtered.length === 0) {
      grid.innerHTML = "";
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";
    grid.innerHTML = filtered.map((p) => this.productCardHTML(p)).join("");
  },

  productCardHTML(product) {
    const cartItem = this.cart.items.find(
      (i) => i.productId === product.id || (i.product && i.product.id === product.id)
    );
    const qty = cartItem ? cartItem.quantity : 0;

    const actionHTML =
      qty > 0
        ? `<div class="product-card__qty-controls">
            <button class="product-card__qty-btn product-card__qty-btn--minus"
                    onclick="event.stopPropagation(); app.updateQty('${product.id}', ${qty - 1})"
                    title="Decrease quantity">−</button>
            <span class="product-card__qty-value">${qty}</span>
            <button class="product-card__qty-btn product-card__qty-btn--plus"
                    onclick="event.stopPropagation(); app.updateQty('${product.id}', ${qty + 1})"
                    title="Increase quantity">+</button>
          </div>`
        : `<button class="product-card__add" onclick="event.stopPropagation(); app.addToCart('${product.id}')"
                   title="Add to cart" id="add-${product.id}">+</button>`;

    return `
      <div class="product-card" id="product-${product.id}">
        <div class="product-card__visual">
          <span class="product-card__category">${product.category}</span>
          ${product.emoji}
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__desc">${product.description}</p>
          <div class="product-card__footer">
            <div>
              <span class="product-card__price">$${product.price.toFixed(2)}</span>
              <span class="product-card__unit">/ ${product.unit}</span>
            </div>
            ${actionHTML}
          </div>
        </div>
      </div>`;
  },

  /* ─── Cart Sidebar ─── */
  toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    } else {
      this.renderCartItems();
      sidebar.classList.add("open");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  },

  renderCartItems() {
    const itemsEl = document.getElementById("cart-items");
    const emptyEl = document.getElementById("cart-empty");
    const footerEl = document.getElementById("cart-footer");
    const totalEl = document.getElementById("cart-total");

    if (!this.cart.items || this.cart.items.length === 0) {
      itemsEl.innerHTML = "";
      emptyEl.style.display = "block";
      footerEl.style.display = "none";
      return;
    }

    emptyEl.style.display = "none";
    footerEl.style.display = "flex";
    totalEl.textContent = `$${this.cart.total.toFixed(2)}`;

    itemsEl.innerHTML = this.cart.items
      .map((item) => {
        const p = item.product || {};
        return `
        <div class="cart-item" id="cart-item-${item.productId}">
          <div class="cart-item__emoji">${p.emoji || "📦"}</div>
          <div class="cart-item__info">
            <div class="cart-item__name">${p.name || "Unknown"}</div>
            <div class="cart-item__price">$${(p.price || 0).toFixed(2)} × ${item.quantity}</div>
            <div class="cart-item__actions">
              <button class="cart-item__qty-btn" onclick="app.updateQty('${item.productId}', ${item.quantity - 1})">−</button>
              <span class="cart-item__qty">${item.quantity}</span>
              <button class="cart-item__qty-btn" onclick="app.updateQty('${item.productId}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <span class="cart-item__subtotal">$${(item.subtotal || 0).toFixed(2)}</span>
          <button class="cart-item__remove" onclick="app.removeFromCart('${item.productId}')" title="Remove">✕</button>
        </div>`;
      })
      .join("");
  },

  updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    badge.textContent = this.cart.itemCount || 0;
  },

  /* ─── Checkout ─── */
  showCheckout() {
    // close cart sidebar first
    const sidebar = document.getElementById("cart-sidebar");
    if (sidebar.classList.contains("open")) this.toggleCart();

    // render summary
    const summary = document.getElementById("checkout-summary");
    summary.innerHTML = `
      ${this.cart.items
        .map((item) => {
          const p = item.product || {};
          return `<div class="checkout__summary-item">
            <span>${p.emoji || ""} ${p.name || "Item"} × ${item.quantity}</span>
            <span>$${(item.subtotal || 0).toFixed(2)}</span>
          </div>`;
        })
        .join("")}
      <div class="checkout__summary-total">
        <span>Total</span>
        <span>$${this.cart.total.toFixed(2)}</span>
      </div>`;

    document.getElementById("checkout-overlay").classList.add("open");
    document.getElementById("checkout-modal").classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeCheckout() {
    document.getElementById("checkout-overlay").classList.remove("open");
    document.getElementById("checkout-modal").classList.remove("open");
    document.body.style.overflow = "";
  },

  async placeOrder(e) {
    e.preventDefault();
    const btn = document.getElementById("place-order-btn");
    btn.disabled = true;
    btn.textContent = "Placing Order...";

    const data = {
      name: document.getElementById("cust-name").value,
      email: document.getElementById("cust-email").value,
      phone: document.getElementById("cust-phone").value,
      address: document.getElementById("cust-address").value,
    };

    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        this.closeCheckout();
        document.getElementById("checkout-form").reset();

        // show success
        document.getElementById("success-order-id").textContent =
          `Order ID: ${json.data.id}`;
        document.getElementById("success-overlay").classList.add("open");
        document.getElementById("success-modal").classList.add("open");

        await this.loadCart();
        this.renderProducts();
      } else {
        this.toast(json.message || "Order failed", "❌");
      }
    } catch (err) {
      this.toast("Failed to place order", "❌");
    } finally {
      btn.disabled = false;
      btn.textContent = "Place Order";
    }

    return false;
  },

  closeSuccess() {
    document.getElementById("success-overlay").classList.remove("open");
    document.getElementById("success-modal").classList.remove("open");
    document.body.style.overflow = "";
  },

  /* ─── Orders Page ─── */
  async showOrders() {
    document.getElementById("hero").style.display = "none";
    document.getElementById("categories").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("orders-section").style.display = "block";

    try {
      const res = await fetch(`${API}/api/orders`);
      const json = await res.json();
      const orders = json.data || [];

      const list = document.getElementById("orders-list");
      const empty = document.getElementById("orders-empty");

      if (orders.length === 0) {
        list.innerHTML = "";
        empty.style.display = "block";
        return;
      }

      empty.style.display = "none";
      list.innerHTML = orders
        .map(
          (order) => `
        <div class="order-card" id="order-${order.id}">
          <div class="order-card__header">
            <div>
              <div class="order-card__id">ID: ${order.id}</div>
              <div class="order-card__date">${new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <span class="order-card__status order-card__status--${order.status}">${order.status}</span>
          </div>
          <div class="order-card__items">
            ${order.items
              .map(
                (item) =>
                  `<span class="order-card__item">${item.emoji} ${item.name} × ${item.quantity}</span>`
              )
              .join("")}
          </div>
          <div class="order-card__total">Total: $${order.total.toFixed(2)}</div>
        </div>`
        )
        .join("");
    } catch (err) {
      this.toast("Failed to load orders", "❌");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  showHome() {
    document.getElementById("hero").style.display = "";
    document.getElementById("categories").style.display = "";
    document.getElementById("products").style.display = "";
    document.getElementById("orders-section").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  /* ─── Toast ─── */
  toast(message, icon = "ℹ️") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast__icon">${icon}</span>${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("removing");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },
};

// Boot
document.addEventListener("DOMContentLoaded", () => app.init());
