function getStorage(key){
  try{
    return JSON.parse(localStorage.getItem(key)) || [];
  }catch(error){
    return [];
  }
}

function setStorage(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}

function money(value){
  return Number(value).toLocaleString("ar-SA") + " ريال";
}

function findProduct(id){
  return products.find(product => product.id === Number(id));
}

function setCounter(id,total){
  const el = document.getElementById(id);
  if(!el) return;

  el.innerText = total;
  el.style.display = total > 0 ? "flex" : "none";
}

function updateCounters(){
  const cart = getStorage("nukhba_cart");
  const wish = getStorage("nukhba_wishlist");
  const compare = getStorage("nukhba_compare");

  setCounter("cartCount", cart.reduce((sum,item)=>sum + item.qty,0));
  setCounter("wishCount", wish.length);
  setCounter("compareCount", compare.length);
}

function showToast(message){
  const old = document.querySelector(".toast");
  if(old) old.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(()=>toast.remove(),1700);
}

function addToCart(id){
  const product = findProduct(id);
  if(!product) return;

  const cart = getStorage("nukhba_cart");
  const found = cart.find(item => item.id === product.id);

  if(found){
    found.qty += 1;
  }else{
    cart.push({
      id:product.id,
      name:product.name,
      price:product.price,
      image:product.image,
      qty:1
    });
  }

  setStorage("nukhba_cart",cart);
  updateCounters();
  showToast("تمت إضافة المنتج إلى السلة");
}

function addToWishlist(id){
  const wish = getStorage("nukhba_wishlist");

  if(!wish.includes(Number(id))){
    wish.push(Number(id));
  }

  setStorage("nukhba_wishlist",wish);
  updateCounters();
  showToast("تم حفظ المنتج في المفضلة");
}

function addToCompare(id){
  const compare = getStorage("nukhba_compare");

  if(!compare.includes(Number(id))){
    compare.push(Number(id));
  }

  if(compare.length > 4){
    compare.shift();
  }

  setStorage("nukhba_compare",compare);
  updateCounters();
  showToast("تمت إضافة المنتج للمقارنة");
}

document.addEventListener("DOMContentLoaded",updateCounters);
