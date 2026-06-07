// js/cart.js
const cartContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

function renderCart(){
  let cart = JSON.parse(localStorage.getItem("nukhba_cart")) || [];
  if(cart.length === 0){
    cartContainer.innerHTML = '<p style="text-align:center;color:#aaa;padding:40px;">سلة التسوق فارغة</p>';
    cartTotalEl.innerText = '0 ريال';
    return;
  }
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>السعر: ${item.price.toLocaleString()} ريال</p>
        <p>الكمية: <input type="number" value="${item.qty}" min="1" onchange="updateQty(${item.id},this.value)"/></p>
        <button onclick="removeItem(${item.id})" class="btn secondary">حذف</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  cartTotalEl.innerText = total.toLocaleString() + ' ريال';
}

function updateQty(id, qty){
  let cart = JSON.parse(localStorage.getItem("nukhba_cart")) || [];
  const item = cart.find(i=>i.id===id);
  if(item){
    item.qty = parseInt(qty);
    localStorage.setItem("nukhba_cart",JSON.stringify(cart));
    renderCart();
    updateCounters();
  }
}

function removeItem(id){
  let cart = JSON.parse(localStorage.getItem("nukhba_cart")) || [];
  cart = cart.filter(i=>i.id!==id);
  localStorage.setItem("nukhba_cart",JSON.stringify(cart));
  renderCart();
  updateCounters();
}

renderCart();
updateCounters();
