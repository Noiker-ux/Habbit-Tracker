'use strict';

let habbits = [];
const HABBIT_KEY ='HABBIT_KEY'
const habbitsString = localStorage.getItem(HABBIT_KEY);
let habbitsArray = JSON.parse(habbitsString);


(()=>{
    initHabbit();
})();


function initHabbit (){
    document.querySelector('.days__block').innerHTML=``;
    const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
    let thisHabbit = habbitsArray.find(el => {
        return attrId==el.id;
    });
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
                <button class="habbit__delete" btn-habbit-dlt='delete-habbit-${indeOnlyDays}'>
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
}

// target euqal
document.querySelectorAll('.menu__list > li').forEach((n, i, a) => {
    n.addEventListener('click', () => {
        a.forEach(m => m.classList.toggle('menu__item-active', m === n));
        initHabbit();
    });
  });


    function addHabbitComment(){
            const inputNewHabbit = document.querySelector('.input-icon').value;
            const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
            let thisHabbitAdd = habbitsArray.find(els => {
                return attrId==els.id;
            });
            thisHabbitAdd.days.push({comment: inputNewHabbit})
            localStorage.setItem(HABBIT_KEY, JSON.stringify(habbitsArray));
            initHabbit();
        };

        function deleteHabbitComment(){

        }

// document.querySelectorAll('.habbit__add').forEach(el=>{
//     el.addEventListener('click',function addHabbitComment(){
//         const inputNewHabbit = document.querySelector('.input-icon').value;
//         const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
//         console.log(attrId);
//         let thisHabbitAdd = habbitsArray.find(els => {
//             return attrId==els.id;
//         });
//         thisHabbitAdd.days.push({comment: inputNewHabbit})
//         localStorage.setItem(HABBIT_KEY, JSON.stringify(habbitsArray));
//         initHabbit();
//     });
// })