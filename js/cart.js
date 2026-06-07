let cart = JSON.parse(localStorage.getItem("nukhba_cart")) || [];

function addToCart(name, price, image){
  let found = cart.find(item => item.name === name);

  if(found){
    found.qty += 1;
  }else{
    cart.push({
      name:name,
      price:Number(price),
      image:image,
      qty:1
    });
  }

  localStorage.setItem("nukhba_cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة ✅");
}

function getCart(){
  return JSON.parse(localStorage.getItem("nukhba_cart")) || [];
}
