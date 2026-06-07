const NUKHBA_PRODUCTS = [
  {
    id:1,
    name:"iPhone 15 Pro Max",
    price:3899,
    oldPrice:4599,
    category:"electronics",
    type:"used",
    condition:"شبه جديد",
    badge:"مفحوص",
    rating:4.9,
    reviews:128,
    city:"الرياض",
    warranty:"ضمان 6 أشهر",
    delivery:"توصيل خلال 24 ساعة",
    seller:"نُخبة المعتمد",
    meta:"256GB · تيتانيوم طبيعي · بطارية 96%",
    image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900"
  },
  {
    id:2,
    name:"Samsung Galaxy S24 Ultra",
    price:4399,
    oldPrice:4899,
    category:"electronics",
    type:"new",
    condition:"جديد",
    badge:"ضمان وكيل",
    rating:4.8,
    reviews:84,
    city:"جدة",
    warranty:"ضمان سنة",
    delivery:"شحن مجاني",
    seller:"متجر موثوق",
    meta:"512GB · تيتانيوم رمادي · ضمان سنة",
    image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=900"
  },
  {
    id:3,
    name:"MacBook Air M2",
    price:3299,
    oldPrice:3899,
    category:"electronics",
    type:"used",
    condition:"مستعمل ممتاز",
    badge:"مضمون",
    rating:4.7,
    reviews:61,
    city:"الدمام",
    warranty:"ضمان 3 أشهر",
    delivery:"استلام أو شحن",
    seller:"بائع موثق",
    meta:"13 إنش · 8GB RAM · 256GB SSD",
    image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900"
  },
  {
    id:4,
    name:"iPad Pro 11 M2",
    price:2299,
    oldPrice:2799,
    category:"electronics",
    type:"used",
    condition:"مستعمل",
    badge:"مفحوص",
    rating:4.6,
    reviews:43,
    city:"الرياض",
    warranty:"ضمان شهر",
    delivery:"توصيل سريع",
    seller:"نُخبة المعتمد",
    meta:"M2 · 256GB · خدوش بسيطة",
    image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=900"
  },
  {
    id:5,
    name:"Sony WH-1000XM5",
    price:1299,
    oldPrice:1599,
    category:"electronics",
    type:"new",
    condition:"جديد",
    badge:"عرض",
    rating:4.9,
    reviews:97,
    city:"الرياض",
    warranty:"ضمان الوكيل",
    delivery:"شحن مجاني",
    seller:"متجر موثوق",
    meta:"أسود · إلغاء ضوضاء · ضمان الوكيل",
    image:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=900"
  }
];

function getProductById(id){
  return NUKHBA_PRODUCTS.find(p => Number(p.id) === Number(id));
}

function formatPrice(price){
  return Number(price || 0).toLocaleString() + " ريال";
}
