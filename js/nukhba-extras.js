function startDealTimer(){
  const timer = document.getElementById("dealTimer");
  if(!timer) return;

  let seconds = 8 * 60 * 60 + 35 * 60 + 20;

  setInterval(()=>{
    let h = String(Math.floor(seconds / 3600)).padStart(2,"0");
    let m = String(Math.floor((seconds % 3600) / 60)).padStart(2,"0");
    let s = String(seconds % 60).padStart(2,"0");

    timer.innerText = `${h}:${m}:${s}`;
    seconds = seconds > 0 ? seconds - 1 : 8 * 60 * 60;
  },1000);
}

function showLiveNotice(){
  const notices = [
    "تم شراء iPhone قبل 5 دقائق — الرياض",
    "تم حفظ MacBook في المفضلة — جدة",
    "عميل يشاهد ساعة فاخرة الآن — الدمام",
    "تمت إضافة Sony WH-1000XM5 للسلة"
  ];

  let old = document.querySelector(".live-notice");
  if(old) old.remove();

  let box = document.createElement("div");
  box.className = "live-notice";
  box.innerText = notices[Math.floor(Math.random() * notices.length)];
  document.body.appendChild(box);

  setTimeout(()=>box.remove(),4500);
}

startDealTimer();
setInterval(showLiveNotice,9000);
