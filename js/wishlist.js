let wishlist=[];

function addToWishlist(product){

wishlist.push(product);

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

alert("تمت الإضافة للمفضلة");

}

const savedWishlist =
localStorage.getItem("wishlist");

if(savedWishlist){

wishlist=
JSON.parse(savedWishlist);

}
