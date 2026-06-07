// js/wishlist.js
const wishContainer = document.getElementById("wishItems");

function renderWishlist(){
  let wish = JSON.parse(localStorage.getItem("nukhba_wishlist")) || [];
  if(wish.length === 0){
    wishContainer.innerHTML = '<p style="text-align:center;color:#aaa;padding:40px;">المفضلة فارغة</p>';
    return;
  }
  wishContainer.innerHTML = wish.map(id=>{
    const p = products.find(x=>x.id===id);
    if(!p) return '';
    return `
      <div class="wish-item">
        <img src="${p.image}" alt="${p.name}" />
        <div class="wish-info">
          <h3>${p.name}</h3>
          <p>${p.price.toLocaleString()} ريال</p>
          <button onclick="removeWish(${p.id})" class="btn secondary">حذف</button>
          <button onclick="addToCart(${p.id})" class="btn">أضف للسلة</button>
        </div>
      </div>
    `;
  }).join('');
}

function removeWish(id){
  let wish = JSON.parse(localStorage.getItem("nukhba_wishlist")) || [];
  wish = wish.filter(i=>i!==id);
  localStorage.setItem("nukhba_wishlist",JSON.stringify(wish));
  renderWishlist();
  updateCounters();
}

renderWishlist();
updateCounters();
