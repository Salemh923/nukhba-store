// js/main.js
// إدارة عرض المنتجات، البحث، الفلاتر، السلة، المفضلة، والمقارنة

let currentFilter = "all";

// عرض المنتجات بناءً على الفلتر أو البحث
function renderProducts() {
  const box = document.getElementById("products");
  const searchQuery = document.querySelector(".search")?.value.toLowerCase() || "";

  const filtered = products.filter(p => {
    const matchesSearch = `${p.name} ${p.meta} ${p.condition} ${p.city}`.toLowerCase().includes(searchQuery);
    const matchesFilter =
      currentFilter === "all" ||
      p.type === currentFilter ||
      p.category === currentFilter ||
      (currentFilter === "offer" && p.oldPrice);
    return matchesSearch && matchesFilter;
  });

  box.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="card">
        <div class="badges">
          <span class="badge ${p.type === 'used' ? 'used' : 'new'}">${p.condition}</span>
          <span class="badge checked">${p.badge}</span>
          ${p.oldPrice ? `<span class="badge sale">خصم</span>` : ""}
        </div>
        <img src="${p.image}" alt="${p.name}" onclick="openProduct(${p.id})" style="cursor:pointer">
        <h3>${p.name}</h3>
        <p class="meta">${p.meta}</p>
        <div class="rating">★ ${p.rating} <span style="color:#aaa">(${p.reviews} تقييم)</span></div>
        <div class="product-info">
          <div class="info-pill"><b>المدينة</b><span>${p.city}</span></div>
          <div class="info-pill"><b>الضمان</b><span>${p.warranty}</span></div>
          <div class="info-pill"><b>التوصيل</b><span>${p.delivery}</span></div>
          <div class="info-pill"><b>البائع</b><span>${p.seller}</span></div>
        </div>
        <p class="price">${p.price.toLocaleString()} ريال ${p.oldPrice ? `<span class="old">${p.oldPrice.toLocaleString()} ريال</span>` : ""}</p>
        <div class="actions">
          <button class="heart" onclick="addToWishlist(${p.id})">♡</button>
          <button class="compare" onclick="addToCompare(${p.id})">⇄</button>
          <button class="cart" onclick="addToCart(${p.id})">أضف للسلة</button>
        </div>
        <button class="details" onclick="openProduct(${p.id})" style="width:100%;margin-top:10px">عرض التفاصيل</button>
      </div>
    `).join("")
    : `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#aaa">لا توجد منتجات مطابقة للبحث الحالي.</div>`;
}

// فتح نافذة التفاصيل
function openProduct(id){
  const p = products.find(x=>x.id===id);

  document.getElementById("modalContent").innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div>
      <h2>${p.name}</h2>
      <p>${p.meta}</p>
      <div class="rating">★ ${p.rating} من 5 — ${p.reviews} تقييم</div>
      <div class="specs">
        <div class="spec"><b>الحالة</b>${p.condition}</div>
        <div class="spec"><b>الفحص</b>${p.badge}</div>
        <div class="spec"><b>الضمان</b>${p.warranty}</div>
        <div class="spec"><b>المدينة</b>${p.city}</div>
        <div class="spec"><b>التوصيل</b>${p.delivery}</div>
        <div class="spec"><b>البائع</b>${p.seller}</div>
      </div>
      <p><b style="color:var(--gold2)">نتيجة الفحص:</b><br>${p.check}</p>
      <p class="price">${p.price.toLocaleString()} ريال ${p.oldPrice ? `<span class="old">${p.oldPrice.toLocaleString()} ريال</span>` : ""}</p>
      <div class="hero-actions">
        <button class="btn" onclick="addToCart(${p.id})">أضف للسلة</button>
        <button class="btn secondary" onclick="addToWishlist(${p.id})">حفظ في المفضلة</button>
      </div>
    </div>
  `;
  document.getElementById("productModal").classList.add("show");
}

// إغلاق النافذة
function closeModal(){
  document.getElementById("productModal").classList.remove("show");
}

// إضافة للسلة
function addToCart(id){
  const p = products.find(x=>x.id===id);
  let cart = JSON.parse(localStorage.getItem("nukhba_cart")) || [];
  let found = cart.find(item=>item.id===id);
  if(found){found.qty+=1}else{cart.push({id:p.id,name:p.name,price:p.price,image:p.image,qty:1})}
  localStorage.setItem("nukhba_cart",JSON.stringify(cart));
  updateCounters();
  showToast("تمت إضافة المنتج إلى السلة");
}

// إضافة للمفضلة
function addToWishlist(id){
  let wish = JSON.parse(localStorage.getItem("nukhba_wishlist")) || [];
  if(!wish.includes(id)) wish.push(id);
  localStorage.setItem("nukhba_wishlist",JSON.stringify(wish));
  updateCounters();
  showToast("تم حفظ المنتج في المفضلة");
}

// إضافة للمقارنة
function addToCompare(id){
  let compare = JSON.parse(localStorage.getItem("nukhba_compare")) || [];
  if(!compare.includes(id)) compare.push(id);
  if(compare.length>4) compare.shift();
  localStorage.setItem("nukhba_compare",JSON.stringify(compare));
  updateCounters();
  showToast("تمت إضافة المنتج للمقارنة");
}

// تحديث العدادات
function updateCounters(){
  setCounter("cartCount", JSON.parse(localStorage.getItem("nukhba_cart"))?.reduce((s,i)=>s+i.qty,0)||0);
  setCounter("wishCount", JSON.parse(localStorage.getItem("nukhba_wishlist"))?.length||0);
  setCounter("compareCount", JSON.parse(localStorage.getItem("nukhba_compare"))?.length||0);
}

function setCounter(id,total){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerText = total;
  el.style.display = total>0 ? "flex":"none";
}

// الرسائل المنبثقة
function showToast(message){
  let old = document.querySelector(".toast");
  if(old) old.remove();
  let toast = document.createElement("div");
  toast.className="toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),1600);
}

// البحث الفوري
document.querySelector(".search").addEventListener("input",renderProducts);

// الفلاتر
document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

// إغلاق المودال عند الضغط على الخلفية
document.getElementById("productModal").addEventListener("click",e=>{
  if(e.target.id==="productModal") closeModal();
});

// تهيئة الصفحة
renderProducts();
updateCounters();
