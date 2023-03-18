'use strict';
let habbits = [];
const HABBIT_KEY ='HABBIT_KEY'
const habbitsString = localStorage.getItem(HABBIT_KEY);
let habbitsArray = JSON.parse(habbitsString);



(()=>{
    initPanel();
    initHabbit();
})();




function initHabbit (){
    document.querySelector('.days__block').innerHTML=``;
    const habbitsString = localStorage.getItem(HABBIT_KEY);
    let habbitsArray = JSON.parse(habbitsString);
    const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
    let thisHabbit = habbitsArray.find(el => {
        return attrId==el.id;
    });
    console.log(thisHabbit);
   if(thisHabbit.days.length!==0){
        const thishabbitProcent = String((thisHabbit.days.length/thisHabbit.target)*100); 
        document.querySelector('.header__title').innerText = thisHabbit.name;
        document.querySelector('.progress__procent').innerText = `${thishabbitProcent}%`;
        document.querySelector('.progress_bar-dls').style.width = thishabbitProcent+'%';
        let indeOnlyDays = 0;
        for (let elemHabbitDay of habbitsArray[thisHabbit.id-1].days) {
            let divHabbit = document.createElement("div");
            divHabbit.innerHTML=`
                    <div class="habbit">
                    <p class="habbit__day">День ${indeOnlyDays+1}</p>
                    <p class="habbit__comment">${elemHabbitDay.comment}</p>
                    <button onclick='deleteHabbitComment()' class="habbit__delete" btn-habbit-dlt='${indeOnlyDays}'>
                        <img src="./images/shape.svg" alt="Delete" class="habbit__delete-img">
                    </button>
                </div>
            `;
            document.querySelector(".days__block").appendChild(divHabbit);
            indeOnlyDays++;
        }

        if (indeOnlyDays != thisHabbit.target){
            
        let divHabbitAdd = document.createElement("div");
            divHabbitAdd.innerHTML=`
            <div class="habbit">
                <p class="habbit__day">День ${indeOnlyDays+1}</p>
                <div class="habbit__form">
                    <input class='input-icon' type="text" placeholder="Комментарий">
                    <img src="./images/Comment.svg" alt="Comment" class="input-icon-img">
                    <button  class="habbit__add" onclick='addHabbitComment()' btn-habbit-add='${indeOnlyDays}'>Добавить</button>
                </div>
            
            </div>
            `;
            document.querySelector(".days__block").appendChild(divHabbitAdd);
        }
   } else {
        document.querySelector('.header__title').innerText = thisHabbit.name;
        document.querySelector('.progress__procent').innerText = `${0}%`;
        document.querySelector('.progress_bar-dls').style.width = 0+'%';
       
     let indeOnlyDays = 0;
        if (indeOnlyDays != thisHabbit.target){
            
        let divHabbitAdd = document.createElement("div");
            divHabbitAdd.innerHTML=`
            <div class="habbit">
                <p class="habbit__day">День ${indeOnlyDays+1}</p>
                <div class="habbit__form">
                    <input class='input-icon' type="text" placeholder="Комментарий">
                    <img src="./images/Comment.svg" alt="Comment" class="input-icon-img">
                    <button  class="habbit__add" onclick='addHabbitComment()' btn-habbit-add='${indeOnlyDays}'>Добавить</button>
                </div>
            
            </div>
            `;
            document.querySelector(".days__block").appendChild(divHabbitAdd);
        }
        indeOnlyDays++;
   }
}
// target euqal
function clickHabbitPanel(){
document.querySelectorAll('.menu__list > li').forEach((n, i, a) => {
    n.addEventListener('click', () => {
        a.forEach(m => m.classList.toggle('menu__item-active', m === n));
        initHabbit();
    });
  });
 
};

    function addHabbitComment(){
        const habbitsString = localStorage.getItem(HABBIT_KEY);
let habbitsArray = JSON.parse(habbitsString);
            const inputNewHabbit = document.querySelector('.input-icon').value;
            const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
            let thisHabbitAdd = habbitsArray.find(els => {
                return attrId==els.id;
            });
            thisHabbitAdd.days.push({comment: inputNewHabbit})
            localStorage.setItem(HABBIT_KEY, JSON.stringify(habbitsArray));
            initHabbit();
        };

 
    document.querySelector('.btn-panel-add').addEventListener('click', ()=>{
        Fancybox.show([{ src: "#dialog-content", closeButton: true }]);
        document.querySelector('.habbit__popup').style.top='30vh';
        
    });


    function iconSelect(){
        document.querySelectorAll('.habbit__popup-icons-list > li').forEach((n, i, a) => {
            n.addEventListener('click', () => {
                a.forEach(m => m.classList.toggle('habbit__popup-icons-active', m === n));
                initHabbit();
            });
        });
    }

      // add New Block
function AddNewHabbit(){ 
    let newHabbitString = localStorage.getItem(HABBIT_KEY);
    let newHabbitArray = JSON.parse(newHabbitString);

    const newHabbitName = document.querySelector('.form__habbit-name').value;
    const newHabbitTarget = document.querySelector('.form__habbit-target').value;
    const newHabbitIcon = document.querySelector('.habbit__popup-icons-active').getAttribute('habbit-icon');

    newHabbitArray.push({
        id: newHabbitArray.length+1,
        icon: `${newHabbitIcon}`,
        name: `${newHabbitName}`,
        target: newHabbitTarget,
        days: []
    })

    newHabbitArray = JSON.stringify(newHabbitArray);
    localStorage.setItem(HABBIT_KEY, newHabbitArray);
    initPanel();
};

  
  
function initPanel(){
      document.querySelector(".menu__list").innerHTML=``;
    let pannelHabbitString = localStorage.getItem(HABBIT_KEY);
    let pannelHabbitArray = JSON.parse(pannelHabbitString);
    for (let elementPanel of pannelHabbitArray){
        let liPanel = document.createElement("li");
                liPanel.innerHTML=`
                    <button class="menu__link btn-panel" onclick='clickHabbitPanel()'>
                                    <img src="./images/${elementPanel.icon}.svg" alt="Dumbell" class="menu__img-icon">
                        </button>
                `;
                liPanel.classList.add('menu__item');
                liPanel.setAttribute(`habbit-id`, elementPanel.id);
                document.querySelector(".menu__list").appendChild(liPanel);
        }
        document.querySelector('.menu__item').classList.add('menu__item-active');
         initHabbit();
}