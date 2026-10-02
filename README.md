# 🛒 Fresh Cart

**Fresh Cart** is a modern, fully functional E-commerce web application built using **React.js** ⚛️. It provides users with a seamless shopping experience, including product browsing, category filtering, a dynamic cart system, and secure checkout options. ✨

-----

## 🚀 Features

  * **🔐 User Authentication**: Secure Login and Registration using JWT.
  * **🛍️ Product Management**:
      * Browse a wide variety of products.
      * 🔍 Search functionality and category-based filtering.
      * 🖼️ Detailed product views with image sliders (using Slick Carousel).
  * **🛒 Cart System**:
      * Add/Remove products to and from the cart.
      * 🔢 Update quantities in real-time.
  * **❤️ Wishlist**: Save favorite items for future purchases.
  * **💳 Payment Integration**:
      * Supports **Stripe** for online credit card payments.
      * 💵 Support for **Cash on Delivery (COD)**.
  * **📦 Order History**: Track previous orders and their status.
  * **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop views using **Tailwind CSS**.

-----

## 🛠️ Technologies Used

  * **Frontend**: React.js ⚛️, Tailwind CSS 🎨, Bootstrap 🅱️.
  * **State Management**: Context API 🏗️ (for global state like Cart and User).
  * **Data Fetching**: Axios 📡, TanStack Query (React Query) ⚡.
  * **Form Handling**: Formik & Yup ✅ (for validation).
  * **Routing**: React Router DOM 🛣️.
  * **Utilities**: React Hot Toast 🍞, Slick Carousel 🎠, Font Awesome 🚩.

-----

## 🏁 Getting Started

### Prerequisites

  * **Node.js** (v14 or higher) 🟢
  * **npm** or **yarn** 📦

### Installation

1.  **Clone the repository** 👥

    ```bash
    git clone https://github.com/mrbhavikpandit/Fresh-Cart.git
    cd Fresh-Cart
    ```

2.  **Install dependencies** 🛠️

    ```bash
    npm install
    ```

3.  **Environment Variables** 🔑
    Create a `.env` file in the root directory and add your API base URL:

    ```env
    REACT_APP_BASE_URL=https://ecommerce.routemisr.com
    ```

4.  **Start the development server** 🚀

    ```bash
    npm start
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in the browser\! 🌐

-----

## 📁 Project Structure

```text
src/
├── 🧱 Components/     # Reusable UI components (Navbar, Footer, Product)
├── 🧠 Context/        # Context API files (CartContext, UserContext)
├── 🎣 Hooks/          # Custom React hooks
├── 📄 Pages/          # Main page components (Home, Cart, Login, Register)
├── 🛣️ App.js          # Main application component & Routing
└── 🏁 index.js        # Entry point
```

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE). 📜

-----

*Created with ❤️ by [Bhavik Pandit](https://www.google.com/search?q=https://github.com/mrbhavikpandit)*
