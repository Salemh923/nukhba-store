let cart=[];

function addToCart(product){

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert("تمت إضافة المنتج للسلة");

}

const savedCart =
localStorage.getItem("cart");

if(savedCart){

cart=JSON.parse(savedCart);

}
