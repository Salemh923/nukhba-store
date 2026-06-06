let cart = JSON.parse(localStorage.getItem("nukhba_cart")) || [];

function saveCart() {
  localStorage.setItem("nukhba_cart", JSON.stringify(cart));
}

function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      qty: 1
    });
  }

  saveCart();
  alert("تمت إضافة المنتج إلى السلة ✅");
}

function getCart() {
  return JSON.parse(localStorage.getItem("nukhba_cart")) || [];
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  location.reload();
}

function clearCart() {
  localStorage.removeItem("nukhba_cart");
  cart = [];
  location.reload();
}
