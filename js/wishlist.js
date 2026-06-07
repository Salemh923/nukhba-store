function addToWishlist(name){
  let wish = JSON.parse(localStorage.getItem("nukhba_wishlist")) || [];

  if(!wish.includes(name)){
    wish.push(name);
  }

  localStorage.setItem("nukhba_wishlist", JSON.stringify(wish));
  alert("تمت إضافة المنتج إلى المفضلة ❤️");
}
