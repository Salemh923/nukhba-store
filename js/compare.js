// js/compare.js
const compareContainer = document.getElementById("compareItems");

function renderCompare(){
  let compare = JSON.parse(localStorage.getItem("nukhba_compare")) || [];
  if(compare.length === 0){
    compareContainer.innerHTML = '<p style="text-align:center;color:#aaa;padding:40px;">لا يوجد منتجات للمقارنة</p>';
    return;
  }
  compareContainer.innerHTML = compare.map(id=>{
    const p = products.find(x=>x.id===id);
    if(!p) return '';
    return `
      <div class="compare-item">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.meta}</p>
        <p>${p.price.toLocaleString()} ريال</p>
        <button onclick="removeCompare(${p.id})" class="btn secondary">حذف</button>
      </div>
    `;
  }).join('');
}

function removeCompare(id){
  let compare = JSON.parse(localStorage.getItem("nukhba_compare")) || [];
  compare = compare.filter(i=>i!==id);
  localStorage.setItem("nukhba_compare",JSON.stringify(compare));
  renderCompare();
  updateCounters();
}

renderCompare();
updateCounters();
