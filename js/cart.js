function renderCart(){
  const cartContainer = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");

  if(!cartContainer || !cartTotalEl) return;

  const cart = getStorage("nukhba_cart");

  if(cart.length === 0){
    cartContainer.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px">
        سلة التسوق فارغة
      </div>
    `;
    cartTotalEl.innerText = "0 ريال";
    return;
  }

  cartContainer.innerHTML = cart.map(item=>`
    <div class="card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="meta">السعر: ${money(item.price)}</p>

      <div class="product-info">
        <div class="info-pill"><b>الكمية</b><span>${item.qty}</span></div>
        <div class="info-pill"><b>الإجمالي</b><span>${money(item.price * item.qty)}</span></div>
      </div>

      <div class="actions" style="grid-template-columns:1fr 1fr 1fr">
        <button class="details" onclick="changeQty(${item.id},-1)">-</button>
        <button class="details" onclick="changeQty(${item.id},1)">+</button>
        <button class="heart" onclick="removeCartItem(${item.id})">حذف</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum,item)=>sum + item.price * item.qty,0);
  cartTotalEl.innerText = money(total);
}

function changeQty(id,step){
  const cart = getStorage("nukhba_cart");
  const item = cart.find(x=>x.id === Number(id));

  if(!item) return;

  item.qty += step;

  if(item.qty <= 0){
    removeCartItem(id);
    return;
  }

  setStorage("nukhba_cart",cart);
  renderCart();
  updateCounters();
}

function removeCartItem(id){
  let cart = getStorage("nukhba_cart");
  cart = cart.filter(item=>item.id !== Number(id));
  setStorage("nukhba_cart",cart);
  renderCart();
  updateCounters();
  showToast("تم حذف المنتج من السلة");
}

document.addEventListener("DOMContentLoaded",()=>{
  renderCart();
  updateCounters();
});
