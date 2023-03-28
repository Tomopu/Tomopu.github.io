const tabsElems = document.querySelectorAll("[data-tabs]");

if(tabsElems.length > 0){
   for (let i = 0; i < tabsElems.length; i++) {
      let tab = tabsElems[i];
      let tabBtnElems = tab.querySelectorAll("[data-tab]");
      let tabContentElems = tab.querySelectorAll("[data-tab-content]");
      for (let i = 0; i < tabBtnElems.length; i++) {
         let tabBtn = tabBtnElems[i];
         let tabContent = tabContentElems[i];
         tabBtn.addEventListener("click", (e) => {
            e.preventDefault();
            for (let i = 0; i < tabBtnElems.length; i++) {
            tabBtnElems[i].classList.remove('active');
            tabContentElems[i].classList.remove('active');
            }
            tabBtn.classList.add('active');
            tabContent.classList.add('active');
         });
      }
   }
}