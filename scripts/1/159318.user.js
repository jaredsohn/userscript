// ==UserScript==
// @name           BiteFight: AntiQuest
// @namespace	   AntiQuest
// @description    Changing the interface for quest
// @version	   1.0
// @include        http://*.bitefight.ru/city/adventure*
// ==/UserScript==

(function() {
    var img = document.getElementsByClassName("wrap-content wrap-right clearfix")[2].getElementsByTagName("img")[1];
        img.setAttribute ("style", "display:none");
    var h3 = document.getElementsByTagName("h3")[0];
        h3.setAttribute ("style", "display:none");
    var btn = document.getElementsByClassName("wrap-content wrap-right clearfix")[2].getElementsByClassName("btn");
		for (var i = 0; i < btn.length; i++) {
		    var href = btn[i].getAttribute ("href");
//Завершить историю
            if (href=='/city/adventure/cancelquest/') {btn[i].setAttribute ("style", "color:#000000");}

//Исследовать
            else if (href=='/city/adventure/decision/1') {btn[i].setAttribute ("style", "color:#00CC00");}
//Продолжить на ходу
            else if (href=='/city/adventure/decision/2') {btn[i].setAttribute ("style", "color:#00CC00");}
//Разрушить все
            else if (href=='/city/adventure/decision/3') {btn[i].setAttribute ("style", "color:#FF0000");}
//Найти лучшую дорогу
            else if (href=='/city/adventure/decision/4') {btn[i].setAttribute ("style", "color:#00CC00");}
//Перепрыгнуть
            else if (href=='/city/adventure/decision/5') {btn[i].setAttribute ("style", "color:#00CC00");}
//Сбить с пути
            else if (href=='/city/adventure/decision/6') {btn[i].setAttribute ("style", "color:#00CC00");}
//Съесть
            else if (href=='/city/adventure/decision/7') {btn[i].setAttribute ("style", "color:#FF0000");}
//Терроризировать
            else if (href=='/city/adventure/decision/9') {btn[i].setAttribute ("style", "color:#00CC00");}
//Ограбить
            else if (href=='/city/adventure/decision/12') {btn[i].setAttribute ("style", "color:#FF0000");}
//Храбрость
            else if (href=='/city/adventure/decision/20') {btn[i].setAttribute ("style", "color:#00CC00");}
//Принять
            else if (href=='/city/adventure/decision/20') {btn[i].setAttribute ("style", "color:#00CC00");}
//Спрятаться
            else if (href=='/city/adventure/decision/24') {btn[i].setAttribute ("style", "color:#00CC00");}
//Полная атака
            else if (href=='/city/adventure/decision/25') {btn[i].setAttribute ("style", "color:#FF0000");}
//Поджечь все
            else if (href=='/city/adventure/decision/26') {btn[i].setAttribute ("style", "color:#FF0000");}
//Сопровождение
            else if (href=='/city/adventure/decision/27') {btn[i].setAttribute ("style", "color:#FF0000");}
//Обмануть
            else if (href=='/city/adventure/decision/28') {btn[i].setAttribute ("style", "color:#FF0000");}
//Войти в лес
            else if (href=='/city/adventure/decision/34') {btn[i].setAttribute ("style", "color:#FF0000");}
//Оказать сопротивление
            else if (href=='/city/adventure/decision/37') {btn[i].setAttribute ("style", "color:#FF0000");}
//Уничтожить
            else if (href=='/city/adventure/decision/38') {btn[i].setAttribute ("style", "color:#FF0000");}
//Изучить
            else if (href=='/city/adventure/decision/39') {btn[i].setAttribute ("style", "color:#00CC00");}
//Вампирский взгляд
            else if (href=='/city/adventure/decision/40') {btn[i].setAttribute ("style", "color:#00CC00");}
//Найти хорошое в дурном
            else if (href=='/city/adventure/decision/42') {btn[i].setAttribute ("style", "color:#00CC00");}
//Вступить на горную тропу
            else if (href=='/city/adventure/decision/44') {btn[i].setAttribute ("style", "color:#00CC00");}
//Войти в пещеру
            else if (href=='/city/adventure/decision/45') {btn[i].setAttribute ("style", "color:#00CC00");}
//Отправиться в глубины
            else if (href=='/city/adventure/decision/46') {btn[i].setAttribute ("style", "color:#00CC00");}
//Смертельная аура
            else if (href=='/city/adventure/decision/49') {btn[i].setAttribute ("style", "color:#00CC00");}
//Наблюдать
            else if (href=='/city/adventure/decision/53') {btn[i].setAttribute ("style", "color:#00CC00");}
//Остаться на месте
            else if (href=='/city/adventure/decision/55') {btn[i].setAttribute ("style", "color:#00CC00");}
//Продолжить (3ОД)
            else if (href=='/city/adventure/decision/35') {btn[i].setAttribute ("style", "color:#FFFFFF");}
//Завершить историю
            else if (href=='/city/adventure/decision/36') {btn[i].setAttribute ("style", "color:#FFFFFF");}

            else {btn[i].setAttribute ("style", "color:#00CC00");}
            }
})()
