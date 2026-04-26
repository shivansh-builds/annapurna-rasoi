// ================= MENU DATA =================
let defaultMenu = [
  {id:1,name:"French Fries",price:120,stock:20,category:"Starters"},
  {id:2,name:"Paneer Chilli",price:220,stock:15,category:"Starters"},
  {id:3,name:"Chicken Chilli",price:260,stock:15,category:"Starters"},
  {id:4,name:"Veg Manchurian",price:180,stock:20,category:"Starters"},
  {id:5,name:"Chicken Manchurian",price:240,stock:15,category:"Starters"},
  {id:6,name:"Papad",price:50,stock:30,category:"Starters"},
  {id:7,name:"Chana Masala",price:160,stock:20,category:"Starters"},
  {id:8,name:"Manchow Soup",price:140,stock:20,category:"Starters"},

  {id:9,name:"Paneer Butter Masala",price:250,stock:15,category:"Main Course"},
  {id:10,name:"Dal Tadka",price:180,stock:20,category:"Main Course"},
  {id:11,name:"Veg Biryani",price:200,stock:20,category:"Main Course"},
  {id:12,name:"Chicken Biryani",price:280,stock:15,category:"Main Course"},
  {id:13,name:"Butter Chicken",price:320,stock:15,category:"Main Course"},
  {id:14,name:"Kadai Paneer",price:260,stock:15,category:"Main Course"},
  {id:15,name:"Mix Veg Curry",price:200,stock:20,category:"Main Course"},
  {id:16,name:"Tandoori Roti",price:30,stock:50,category:"Main Course"},
  {id:17,name:"Butter Naan",price:50,stock:40,category:"Main Course"},
  {id:18,name:"Jeera Rice",price:120,stock:30,category:"Main Course"},

  {id:19,name:"Mojito",price:120,stock:25,category:"Drinks"},
  {id:20,name:"Cold Drink",price:60,stock:40,category:"Drinks"},
  {id:21,name:"Lassi",price:80,stock:30,category:"Drinks"},
  {id:22,name:"Mineral Water",price:30,stock:50,category:"Drinks"},
  {id:23,name:"Coffee",price:90,stock:30,category:"Drinks"},
  {id:24,name:"Tea",price:40,stock:50,category:"Drinks"},

  {id:25,name:"Gulab Jamun",price:90,stock:25,category:"Desserts"},
  {id:26,name:"Ice Cream",price:100,stock:30,category:"Desserts"},
  {id:27,name:"Rasgulla",price:90,stock:25,category:"Desserts"},
  {id:28,name:"Brownie",price:120,stock:20,category:"Desserts"},
  {id:29,name:"Kheer",price:110,stock:20,category:"Desserts"},
  {id:30,name:"Falooda",price:130,stock:20,category:"Desserts"}
];

// ================= INITIALIZE =================
if (!localStorage.getItem("menu")) {
  localStorage.setItem("menu", JSON.stringify(defaultMenu));
}

// ================= LOAD MENU =================
function loadMenu() {
  let div = document.getElementById("menu");
  if (!div) return;

  let menu = JSON.parse(localStorage.getItem("menu"));
  div.innerHTML = "";

  let categories = ["Starters","Main Course","Drinks","Desserts"];

  categories.forEach(cat => {
    div.innerHTML += `<h2 class="category-title">${cat}</h2>`;

    menu.filter(item => item.category === cat).forEach(item => {
      div.innerHTML += `
        <div class="card">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <p>Stock: ${item.stock}</p>
          <button onclick="addToCart(${item.id})">Add</button>
        </div>
      `;
    });
  });
}

// ================= ADD TO CART =================
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let menu = JSON.parse(localStorage.getItem("menu"));

  let item = menu.find(i => i.id === id);

  if (item.stock <= 0) {
    alert("Out of stock!");
    return;
  }

  cart.push(item);
  item.stock--;

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("menu", JSON.stringify(menu));

  alert(item.name + " added to cart!");
  loadMenu();
}

// ================= LOAD CART =================
function loadCart() {
  let div = document.getElementById("cart");
  let totalDiv = document.getElementById("total");

  if (!div || !totalDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  div.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    div.innerHTML = "<p>Your cart is empty</p>";
    totalDiv.innerText = "";
    return;
  }

  cart.forEach(item => {
    total += item.price;
    div.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });

  totalDiv.innerText = "Total: ₹" + total;
}

// ================= PLACE ORDER =================
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: Date.now(),
    items: cart,
    status: "Pending"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  alert("Order placed successfully!");
  location.reload();
}

// ================= ADMIN ADD ITEM =================
function addItem() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let stock = document.getElementById("stock").value;
  let category = document.getElementById("category").value;

  if (!name || !price || !stock) {
    alert("Please fill all fields");
    return;
  }

  let menu = JSON.parse(localStorage.getItem("menu"));

  menu.push({
    id: Date.now(),
    name,
    price: Number(price),
    stock: Number(stock),
    category
  });

  localStorage.setItem("menu", JSON.stringify(menu));
  alert("Item added!");
  loadInventory();
}

// ================= LOAD INVENTORY =================
function loadInventory() {
  let div = document.getElementById("inventory");
  if (!div) return;

  let menu = JSON.parse(localStorage.getItem("menu"));
  div.innerHTML = "";

  menu.forEach(item => {
    div.innerHTML += `<p>${item.name} | Stock: ${item.stock}</p>`;
  });
}

// ================= LOAD ORDERS =================
function loadOrders() {
  let div = document.getElementById("orders");
  if (!div) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  div.innerHTML = "";

  orders.forEach(order => {
    div.innerHTML += `
      <div class="card">
        <p><b>Order ID:</b> ${order.id}</p>
        <p>Status: ${order.status}</p>
        <hr>
      </div>
    `;
  });
}

// ================= RUN ALL =================
loadMenu();
loadCart();
loadInventory();
loadOrders();