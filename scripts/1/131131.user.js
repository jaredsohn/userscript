// ==UserScript==
// @name Nazik 
// @description this a small bot.
// @author doromones doromones@gmail.com
// @upgrade el tirano ironman_88@mail.ru
// @upgrade dr.yukon jid: dryukon@jabber.ru
// @include http://vten.ru/*
// ==/UserScript==
(function(){{//настройки, true-включено, false-отключено
var setGetRew=true; //всегда получать награду, выходить в список квестов, в бандах говорить "Надо" и "Хочу"
var setMail=false; //всегда читать почтовые сообщения и забирать вещи (возвращается в бой, если setRetGame=true)
var setAmu2=true; //всегда применять все амулеты кроме Грома и Молнии
var setAmu1=true; //всегда бить Громом и Молнией
var setArena=true; //всегда перезаходить в Арену
var setRise=true; //всегда воскресать
var setRise1=true; //всегда выздоравливать
var setRise2=false; //всегда чинить оружие
var setRetGame=true; //всегда возвращаться в бой
var setReload=true; //всегда обновлять (полезно в бандах)
var setAtkBoss=true; //всегда бить мегабосса
var setAtkOtv=true; //всегда бить в ответ
var setAtkHold=true; //всегда бить чужого хранителя 
var setAtkEnd=true; //всегда добивать выбранного
var setAtk=true; //всегда бить всякого. добавлено просто для симметрии))
var setClick=true; //всегда заходить в квесты
var setQuest1=true; //всегда ходить по простым квестам в таверне
var setQuest2=true; //всегда ходить по сложным квестам в таверне
var setRetAI=false; //всегда идти в Адские игры (если setRetCity=true)
var setRetCity=false; //всегда возвращаться в город
var CDT=Math.random()*300+1000; //время между ударами, режим "железный задрот" (если сделать быстрее - будут промахи, есть опасность запалиться в дуэлях и на арене)
var CDT1=Math.random()*1000+2000;} //время между ударами, симуляция реакции живого человека. имена переменных работают как переключатель (CDT-включено, CDT1-выключено, вместо 1 можно любой знак)
{ // переменные
var GetRew='';
var Mail='';
var Amu2='';
var Amu1='';
var Amu0='';
var Arena='';
var Rise='';
var Rise1='';
var Rise2='';
var RetGame='';
var Reload='';
var AtkBoss='';
var AtkOtv='';
var AtkHold='';
var AtkEnd='';
var Atk='';
var Click='';
var Quest1='';
var Quest2='';
var RetAI='';
var RetCity='';} //далее вызов функций
{FillVar();SelEvent();}function FillVar(){for (var i=0;i<document.links.length;i++){
if (document.links[i].text.match("Надо")){GetRew=document.links[i].href;}
if (document.links[i].text.match("Хочу")){GetRew=document.links[i].href;}
if (document.links[i].text.match("Получить нагр")){GetRew=document.links[i].href;}
if (document.links[i].text.match("Другие зада")){GetRew=document.links[i].href;}

if (document.links[i].text.match("Пришло письмо")){Mail=document.links[i].href;}
if (document.links[i].text.match("Базар: Вы")){Mail=document.links[i].href;}
if (document.links[i].text.match("Аукцион: Вы")){Mail=document.links[i].href;}
if (document.links[i].text.match("Забрать и")){Mail=document.links[i].href;}

if ((document.links[i].text.match("Состояние1"))&&(document.links[i].className!='minor')){Amu2=document.links[i].href;}
if ((document.links[i].text.match("Форма"))&&(document.links[i].className!='minor')){Amu2=document.links[i].href;}
if ((document.links[i].text.match("Приток"))&&(document.links[i].className!='minor')){Amu2=document.links[i].href;}
if ((document.links[i].text.match("Защитная"))&&(document.links[i].className!='minor')){Amu2=document.links[i].href;}
if ((document.links[i].text.match("Взрыв"))&&(document.links[i].className!='minor')){Amu2=document.links[i].href;}
if ((document.links[i].text.match("Точный"))&&(document.links[i].className!='minor')){Amu1=document.links[i].href;}
if ((document.links[i].text.match("Листок"))&&(document.links[i].className!='minor')){Amu0=document.links[i].href;} //специально стоит в конце

if (document.links[i].text.match("Играть еще")){Arena=document.links[i].href;}
if (document.links[i].text.match("Лагерь")){Arena=document.links[i].href;}

if (document.links[i].text.match("Воскреснуть")){Rise=document.links[i].href;}
if (document.links[i].text.match("Восстановить")){Rise1=document.links[i].href;}
if (document.links[i].text.match("Починиться")){Rise2=document.links[i].href;}
if (document.links[i].text.match("Вернуться в")){RetGame=document.links[i].href;}
if (document.links[i].text.match("Продолжить")){RetGame=document.links[i].href;}
if (document.links[i].text.match("Обновить")){Reload=document.links[i].href;}

if (document.links[i].text.match("Дать отпор")){AtkBoss=document.links[i].href;}
if (document.links[i].text.match("Участвовать в")){AtkBoss=document.links[i].href;}
if (document.links[i].text.match("Добивать Аль")){AtkBoss=document.links[i].href;}
if (document.links[i].text.match("Добивать Крейтор")){AtkBoss=document.links[i].href;}
if (document.links[i].text.match("Добивать Маарр")){AtkBoss=document.links[i].href;}
if (document.links[i].text.match("Бить Босса")){AtkBoss=document.links[i].href;}

if (document.links[i].text.match("Атаковать в ответ")){AtkOtv=document.links[i].href;}
if (document.links[i].text.match("Бить Хран")){AtkHold=document.links[i].href;}
if (document.links[i].text.match("Атаковать*")){AtkEnd=document.links[i].href;}
if (document.links[i].text.match("Атаковать")){Atk=document.links[i].href;}

if (document.links[i].text.match("Пойти")){Click=document.links[i].href;}
if (document.links[i].text.match("Отправиться")){Click=document.links[i].href;}
if (document.links[i].text.match("Напасть на Ти")){Click=document.links[i].href;}

if (document.links[i].text.match("Доминир")){Quest1=document.links[i].href;} //quest1 и quest2 настраивайте в зависимости от прокачки перса
if (document.links[i].text.match("Ожившие")){Quest2=document.links[i].href;}
if (document.links[i].text.match("Титаны: зел")){Quest1=document.links[i].href;}
if (document.links[i].text.match("Титаны: син")){Quest1=document.links[i].href;}
if (document.links[i].text.match("Титаны: пур")){Quest2=document.links[i].href;}
if (document.links[i].text.match("Титаны: эпи")){Quest2=document.links[i].href;}
if (document.links[i].text.match("Титаны: вос")){Quest2=document.links[i].href;}
if (document.links[i].text.match("Дозор:")){Quest1=document.links[i].href;}
if (document.links[i].text.match("Стража:")){Quest1=document.links[i].href;}
if (document.links[i].text.match("Чародей:")){Quest1=document.links[i].href;}

if (document.links[i].text.match("Адские")){RetAI=document.links[i].href;}
if (document.links[i].text.match("Город")){RetCity=document.links[i].href;}
}}function SelEvent(){
if ((GetRew!='')&&(setGetRew)){setTimeout(function(){location.href=GetRew},1000);return;} //при 100 миллисекундах вещь не берет, пока стоит 1 секунда. при слишком частом отъеме вещей есть риск запалить бота
else if ((Mail!='')&&(setMail)){setTimeout(function(){location.href=Mail},100);return;}
else if ((Amu2!='')&&(setAmu2)&&(location.href!='http://ob.bratki.mobi/user')){setTimeout(function(){location.href=Amu2},100);return;}
else if ((Amu1!='')&&(setAmu1)&&(location.href!='http://ob.bratki.mobi/user')){setTimeout(function(){location.href=Amu1},100);return;} //ГиМ после Ярости просто бесподобен, не надо его выше ставить
else if ((Amu0!='')&&(setAmu2)&&(location.href!='http://ob.bratki.mobi/user')){setTimeout(function(){location.href=Amu0},100);return;}
else if ((Arena!='')&&(setArena)){setTimeout(function(){location.href=Arena},100);return;}
else if ((Rise!='')&&(setRise)){setTimeout(function(){location.href=Rise},100);return;}
else if ((Rise1!='')&&(setRise1)){setTimeout(function(){location.href=Rise1},100);return;}
else if ((Rise2!='')&&(setRise2)){setTimeout(function(){location.href=Rise2},100);return;}
else if ((RetGame!='')&&(setRetGame)){setTimeout(function(){location.href=RetGame},100);return;}
else if ((Reload!='')&&(setReload)){setTimeout(function(){location.href=Reload},1000);return;} //1 секунда - для Арены
else if ((AtkBoss!='')&&(setAtkBoss)){setTimeout(function(){location.href=AtkBoss},CDT);return;}
else if ((AtkOtv!='')&&(setAtkOtv)){setTimeout(function(){location.href=AtkOtv},CDT);return;} //агрессивный, бестия, ну чисто фараон)))
else if ((AtkHold!='')&&(setAtkHold)){setTimeout(function(){location.href=AtkHold},CDT);return;}
else if ((AtkEnd!='')&&(setAtkEnd)){setTimeout(function(){location.href=AtkEnd},CDT);return;}
else if ((Atk!='')&&(setAtk)){setTimeout(function(){location.href=Atk},CDT);return;}
else if ((Click!='')&&(setClick)){setTimeout(function(){location.href=Click},100);return;}
else if ((Quest1!='')&&(setQuest1)){setTimeout(function(){location.href=Quest1},100);return;}
else if ((Quest2!='')&&(setQuest2)){setTimeout(function(){location.href=Quest2},100);return;}
else if ((RetAI!='')&&(setRetAI)){setTimeout(function(){location.href=RetAI},100);return;}
else if ((RetCity!='')&&(setRetCity)){setTimeout(function(){location.href=RetCity},100);return;}
}})();