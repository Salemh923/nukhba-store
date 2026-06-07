function renderWishlist(){
  const box = document.getElementById("wishItems");
  if(!box) return;

  const wish = getStorage("nukhba_wishlist");

  if(wish.length === 0){
    box.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px">
        المفضلة فارغة
      </div>
    `;
    return;
  }

  box.innerHTML = wish.map(id=>{
    const p = findProduct(id);
    if(!p) return "";

    return `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="meta">${p.meta}</p>
        <div class="rating">★ ${p.rating} <span style="color:#aaa">(${p.reviews} تقييم)</span></div>
        <p class="price">${money(p.price)}</p>

        <div class="actions" style="grid-template-columns:1fr 1fr">
          <button class="cart" onclick="addToCart(${p.id})">أضف للسلة</button>
          <button class="heart" onclick="removeWish(${p.id})">حذف</button>
        </div>
      </div>
    `;
  }).join("");
}

function removeWish(id){
  let wish = getStorage("nukhba_wishlist");
  wish = wish.filter(item=>item !== Number(id));
  setStorage("nukhba_wishlist",wish);
  renderWishlist();
  updateCounters();
  showToast("تم حذف المنتج من المفضلة");
}

document.addEventListener("DOMContentLoaded",()=>{
  renderWishlist();
  updateCounters();
});
