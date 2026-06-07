document.addEventListener("DOMContentLoaded", function(){
  const search = document.querySelector(".search");

  if(search){
    search.addEventListener("input", function(){
      const q = search.value.toLowerCase();
      document.querySelectorAll(".card").forEach(card=>{
        card.style.display = card.innerText.toLowerCase().includes(q) ? "block" : "none";
      });
    });
  }
});
