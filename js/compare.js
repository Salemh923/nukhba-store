function renderCompare(){
  const box = document.getElementById("compareItems");
  if(!box) return;

  const compare = getStorage("nukhba_compare");

  if(compare.length === 0){
    box.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:#aaa;padding:40px">
        لا توجد منتجات للمقارنة
      </div>
    `;
    return;
  }

  box.innerHTML = compare.map(id=>{
    const p = findProduct(id);
    if(!p) return "";

    return `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="meta">${p.meta}</p>

        <div class="product-info">
          <div class="info-pill"><b>الحالة</b><span>${p.condition}</span></div>
          <div class="info-pill"><b>الضمان</b><span>${p.warranty}</span></div>
          <div class="info-pill"><b>المدينة</b><span>${p.city}</span></div>
          <div class="info-pill"><b>البائع</b><span>${p.seller}</span></div>
        </div>

        <p class="price">${money(p.price)}</p>

        <div class="actions" style="grid-template-columns:1fr 1fr">
          <button class="cart" onclick="addToCart(${p.id})">أضف للسلة</button>
          <button class="heart" onclick="removeCompare(${p.id})">حذف</button>
        </div>
      </div>
    `;
  }).join("");
}

function removeCompare(id){
  let compare = getStorage("nukhba_compare");
  compare = compare.filter(item=>item !== Number(id));
  setStorage("nukhba_compare",compare);
  renderCompare();
  updateCounters();
  showToast("تم حذف المنتج من المقارنة");
}

document.addEventListener("DOMContentLoaded",()=>{
  renderCompare();
  updateCounters();
});
