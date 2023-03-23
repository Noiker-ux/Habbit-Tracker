// Подключение Мода Стрикт
'use strict';
// ключ для LocalStorage
const HABBIT_KEY ='HABBIT_KEY'
const HELP_KEY = 'HELP_KEY'
const habbitsString = localStorage.getItem(HABBIT_KEY);
let habbitsArray = JSON.parse(habbitsString);
// Первая инициализация проекта(инициализация пенели + инициализация основы)
(()=>{
    basicLoad();
    helpEducation();
    initPanel();
    initHabbit();
})();


function helpEducation(){
    let  NeedKey = localStorage.getItem(HELP_KEY);
    NeedKey === '0'?NeedKey=false:NeedKey=true;
    if(NeedKey) {
        return;
    } else {
        Fancybox.show([{ src: "#error-name", closeButton: true }]);
        document.querySelector('.habbit__popup-error').innerHTML=
        `<p style='text-align:center;'>Habbit Tracker</p><br/>
        <p style='text-align:left;'>Программа помогает в закреплении привычек, будь то саморазвитие, спорт, правильное питание и т.д.<br/><br/> Также программа позволяет фиксировать комментарии ко дням.<br/><br/> В левой панели вы увидите поставленные вами цели. В правой же подробную информацию, о достижении своей цели.</p>
        <br/><p style='text-align:left;'>ВАЖНО!!! Программа НЕ ДАСТ вам отказаться от поставленной привычки. <br/><br/> Удалить поставленную привычку можно только после достижения цели.</p>
        <br/><button onclick='nowShowHelp()' class='noShowMore'>Больше не показывать</button>`;   
        return;
    }
}

function nowShowHelp(){
    let helper = localStorage.getItem(HELP_KEY);
    helper='1';
    localStorage.setItem(HELP_KEY,helper);
    Fancybox.close([{src: "#error-name"}]);
}

// Инициализация основы
function initHabbit (){
    document.querySelector('.days__block').innerHTML=``;
    document.querySelector('.progress').style.visibility='visible';
    document.querySelector('.header__title').style.visibility='visible';
    const habbitsString = localStorage.getItem(HABBIT_KEY);
    let habbitsArray = JSON.parse(habbitsString);
    if (habbitsArray.length!==0){
        const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
        let thisHabbit = habbitsArray.find(el => {
            return attrId==el.id;
        });
        if(thisHabbit.days.length!==0){
            const thishabbitProcent = String(((thisHabbit.days.length/thisHabbit.target)*100).toFixed(0)); 
            document.querySelector('.header__title').innerText = thisHabbit.name;
            document.querySelector('.progress__procent').innerText = `${thishabbitProcent}%`;
            document.querySelector('.progress_bar-dls').style.width = thishabbitProcent+'%';
            let indeOnlyDays = 0;
            for (let elemHabbitDay of thisHabbit.days) {
                let divHabbit = document.createElement("div");
                divHabbit.innerHTML=`
                        <div class="habbit">
                        <div class='obv-habbit-day'><p class="habbit__day">День ${indeOnlyDays+1}</p></div>
                        <div class='obv-habbit-comment'><p class="habbit__comment">${elemHabbitDay.comment}</p>
                            <button onclick='deleteHabbitComment()' class="habbit__delete" btn-habbit-dlt='${indeOnlyDays}'>
                                <img src="./images/shape.svg" alt="Delete" class="habbit__delete-img" btn-habbit-dlt='${indeOnlyDays}'>
                            </button>
                        </div>
                    </div>
                `;
                document.querySelector(".days__block").appendChild(divHabbit);
                indeOnlyDays++;
            }
            if (indeOnlyDays != thisHabbit.target){   
                let divHabbitAdd = document.createElement("div");
                    divHabbitAdd.innerHTML=`
                    <div class="habbit">
                    <div class='obv-habbit-day'><p class="habbit__day">День ${indeOnlyDays+1}</p></div>
                    <div class='obv-habbit-comment-form'><div class="habbit__form">
                            <input class='input-icon' type="text" placeholder="Комментарий">
                            <img src="./images/Comment.svg" alt="Comment" class="input-icon-img">
                            <button  class="habbit__add" onclick='addHabbitComment()' btn-habbit-add='${indeOnlyDays}'>Добавить</button>
                        </div>
                    </div>
                    </div>
                    `;
                    document.querySelector(".days__block").appendChild(divHabbitAdd);
                } else {
                    let divHabbitAdd = document.createElement("div");
                    divHabbitAdd.innerHTML=`
                    <div class="habbit habbit__day-final">
                        <div class='final-text'>
                            <p class="habbit__day ">Поздравляем</p>
                            <p class="habbit__comment ">Вы достигли поставленной цели. Вы можете начать тренировку заново или удалить ее полностью, нажав на соответствующую кнопку снизу.</p>
                        </div>
                        <div class="final-buttons">
                            <button class='final-button restat-button' onclick='restatHabbit()'>Начать тренировку заново</button>
                            <button class='final-button' onclick='AllDeleteHabbit()'>Удалить</button>
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
                    <div class='obv-habbit-day'>
                        <p class="habbit__day">День ${indeOnlyDays+1}</p>
                    </div>
                    <div class='obv-habbit-comment-form'><div class="habbit__form">
                        <input class='input-icon' type="text" placeholder="Комментарий">
                        <img src="./images/Comment.svg" alt="Comment" class="input-icon-img">
                        <button  class="habbit__add" onclick='addHabbitComment()' btn-habbit-add='${indeOnlyDays}'>Добавить</button>
                    </div>
                </div>
                </div>
                `;
                document.querySelector(".days__block").appendChild(divHabbitAdd);
            }
            indeOnlyDays++;
        }
    } else {
        document.querySelector('.header__title').style.visibility='hidden';
        document.querySelector('.progress').style.visibility='hidden';
    }
}
// Выбор в левой панели
function clickHabbitPanel(){
    document.querySelectorAll('.menu__list > li').forEach((n, i, a) => {
    n.addEventListener('click', () => {
        a.forEach(m => m.classList.toggle('menu__item-active', m === n));
        initHabbit();
    });
  });
};
// Добавить комментарий
function addHabbitComment(){
    const habbitsString = localStorage.getItem(HABBIT_KEY);
    let habbitsArray = JSON.parse(habbitsString);
    const inputNewHabbit = document.querySelector('.input-icon').value;
    if (inputNewHabbit.length==0){
        Fancybox.show([{ src: "#error-name", closeButton: true }]);
        document.querySelector('.habbit__popup-error').innerHTML=`<p style='text-align:center;'>Ошибка ввода коментария</p><br/>
        <p style='text-align:center;'>Коментарий дня не может быть пустым, пожалуйста заполните поле и повторите попытку заново.</p>`; 
        return;
    } else{
        const attrId = document.querySelector('.menu__item-active').getAttribute('habbit-id');
        let thisHabbitAdd = habbitsArray.find(els => {
            return attrId==els.id;
        });
        thisHabbitAdd.days.push({comment: inputNewHabbit})
        localStorage.setItem(HABBIT_KEY, JSON.stringify(habbitsArray));
        initHabbit();
     }
};
// Добавить новую привычку (Fancybox)
document.querySelector('.btn-panel-add').addEventListener('click', ()=>{
    Fancybox.show([{ src: "#dialog-content", closeButton: true }]);
    document.querySelector('.habbit__popup').style.top='30vh'; 
});
//Какая иконка выбранна в (Fancybox) 
function iconSelect(){
    document.querySelectorAll('.habbit__popup-icons-list > li').forEach((n, i, a) => {
        n.addEventListener('click', () => {
            a.forEach(m => m.classList.toggle('habbit__popup-icons-active', m === n));
            initHabbit();
        });
    });
}
// Создание новой привычки
function AddNewHabbit(){ 
    let newHabbitString = localStorage.getItem(HABBIT_KEY);
    let newHabbitArray = JSON.parse(newHabbitString);
    const newHabbitName = document.querySelector('.form__habbit-name').value;
    const newHabbitTarget = document.querySelector('.form__habbit-target').value;
    
    if(newHabbitName.length==0){
        Fancybox.show([{ src: "#error-name", closeButton: true }]);
        document.querySelector('.habbit__popup-error').innerHTML=`<p style='text-align:center;'>Ошибка ввода имени!</p><br/>
        <p style='text-align:center;'>Поле "Название" не может быть пустым! </p>`;   return;
    }
    if (newHabbitTarget<=0){
        Fancybox.show([{ src: "#error-name", closeButton: true }]);
        document.querySelector('.habbit__popup-error').innerHTML=`<p style='text-align:center;'>Ошибка ввода количества дней!</p><br/>
        <p style='text-align:center;'>Поле "Цель" не может быть пустым, быть отрицательным или равняться нулю!</p>`;   return;
    }
    try {
        const newHabbitIcon = document.querySelector('.habbit__popup-icons-active').getAttribute('habbit-icon');
        let randomId = 0;
        for (let elemHab of newHabbitArray){
            if (randomId<=elemHab.id){
                randomId = elemHab.id+1;
            }
        }
        newHabbitArray.push({
            id: randomId,
            icon: `${newHabbitIcon}`,
            name: `${newHabbitName}`,
            target: newHabbitTarget,
            days: []
        })
        newHabbitArray = JSON.stringify(newHabbitArray);
        localStorage.setItem(HABBIT_KEY, newHabbitArray);
        initPanel();
        initHabbit();
    } catch{
        Fancybox.show([{ src: "#error-name", closeButton: true }]);
        document.querySelector('.habbit__popup-error').innerHTML=`<p style='text-align:center;'>Ошибка выбора иконки!</p><br/>
        <p style='text-align:center;'>Пожалуйста выберите иконку привычки и повторите попытку заново.</p>`;   return;
    }
};
// Инициализация левой панели
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
        document.querySelector('.menu__item').classList.add('menu__item-active');
    }
    initHabbit();
}
// Удалить определенный комментарий привычки
function deleteHabbitComment(e){ 
    let delHabbitString = localStorage.getItem(HABBIT_KEY);
    let delHabbitArray = JSON.parse(delHabbitString);
    const thisHabbitObj=document.querySelector('.menu__item-active').getAttribute('habbit-id');
    document.querySelector('.days__block').addEventListener('click',e => {
        try {
            let sad = (e.target.getAttribute('btn-habbit-dlt'))
            const needHabbit = delHabbitArray.find(elemDel=>{
                return elemDel.id==thisHabbitObj;
            })
            const delHabbit = needHabbit.days.splice(sad,1);
            delHabbitArray = JSON.stringify(delHabbitArray);
            localStorage.setItem(HABBIT_KEY, delHabbitArray);
            initHabbit();
        } catch {
            return;
        }
    });
}
// перезапустить тренировку привычки
function restatHabbit(){
    let restartHabbitString = localStorage.getItem(HABBIT_KEY);
    let restartHabbitArray = JSON.parse(restartHabbitString);
    const restartHabbitObj=document.querySelector('.menu__item-active').getAttribute('habbit-id');
    const restartHabbit = restartHabbitArray.find(elemDel=>{
        return elemDel.id==restartHabbitObj;
    });
    restartHabbit.days=[];
    restartHabbitArray = JSON.stringify(restartHabbitArray);
    localStorage.setItem(HABBIT_KEY, restartHabbitArray);
    initHabbit();
};
// Удалить полностью привычку
function AllDeleteHabbit(){
    let AllHabbitString = localStorage.getItem(HABBIT_KEY);
    let AllHabbitArray = JSON.parse(AllHabbitString);
    const AllHabbitObj=document.querySelector('.menu__item-active').getAttribute('habbit-id');
    const AllHabbit = AllHabbitArray.find(elemDel=>{
        return elemDel.id==AllHabbitObj;
    });
    AllHabbitArray.splice(AllHabbitArray.findIndex(i => i.id == AllHabbit.id),1);
    AllHabbitArray = JSON.stringify(AllHabbitArray);
    localStorage.setItem(HABBIT_KEY, AllHabbitArray);
    initPanel();
    initHabbit();
}
// базавая подгрузка
function basicLoad(){
    if (localStorage.getItem(HABBIT_KEY)===null ||  localStorage.getItem(HELP_KEY)===null){
        localStorage.setItem(HABBIT_KEY, JSON.stringify(data));
        localStorage.setItem(HELP_KEY, 0);
    }
}