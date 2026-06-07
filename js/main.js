let currentFilter = "all";

function productCard(p){
  return `
    <div class="card">
      <div class="badges">
        <span class="badge ${p.type === "used" ? "used" : "new"}">${p.condition}</span>
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

      <p class="price">
        ${money(p.price)}
        ${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ""}
      </p>

      <div class="actions">
        <button class="heart" onclick="addToWishlist(${p.id})">♡</button>
        <button class="compare" onclick="addToCompare(${p.id})">⇄</button>
        <button class="cart" onclick="addToCart(${p.id})">أضف للسلة</button>
      </div>

      <button class="details" onclick="openProduct(${p.id})" style="width:100%;margin-top:10px">عرض التفاصيل</button>
    </div>
  `;
}

function renderProducts(){
  const box = document.getElementById("products");
  if(!box) return;

  const q = document.querySelector(".search")?.value.toLowerCase() || "";

  const filtered = products.filter(p=>{
    const text = `${p.name} ${p.meta} ${p.condition} ${p.city} ${p.category}`.toLowerCase();
    const matchesSearch = text.includes(q);

    const matchesFilter =
      currentFilter === "all" ||
      p.type === currentFilter ||
      p.category === currentFilter ||
      (currentFilter === "offer" && p.oldPrice);

    return matchesSearch && matchesFilter;
  });

  box.innerHTML = filtered.length
    ? filtered.map(productCard).join("")
    : `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#aaa">لا توجد منتجات مطابقة للبحث الحالي.</div>`;
}

function openProduct(id){
  const p = findProduct(id);
  const modal = document.getElementById("productModal");
  const modalContent = document.getElementById("modalContent");

  if(!p || !modal || !modalContent) return;

  modalContent.innerHTML = `
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

      <p class="price">
        ${money(p.price)}
        ${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ""}
      </p>

      <div class="hero-actions">
        <button class="btn" onclick="addToCart(${p.id})">أضف للسلة</button>
        <button class="btn secondary" onclick="addToWishlist(${p.id})">حفظ في المفضلة</button>
      </div>
    </div>
  `;

  modal.classList.add("show");
}

function closeModal(){
  const modal = document.getElementById("productModal");
  if(modal) modal.classList.remove("show");
}

document.addEventListener("DOMContentLoaded",()=>{
  renderProducts();
  updateCounters();

  const search = document.querySelector(".search");
  if(search){
    search.addEventListener("input",renderProducts);
  }

  document.querySelectorAll(".filter-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  const modal = document.getElementById("productModal");
  if(modal){
    modal.addEventListener("click",e=>{
      if(e.target.id === "productModal") closeModal();
    });
  }
});
