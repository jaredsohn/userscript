// ==UserScript==
// @name           Facebook Auto Like By ammink
// @namespace      facebook_auto_ike
// @description    Like status dan Dinding Facebook hanya dengan Sekali Klik,
// @author         http://www.facebook.com/ammink17
// @include        htt*://www.facebook.com/*
// @icon           http://i47.servimg.com/u/f47/15/97/25/54/icon10.png
// @version      1.1
// @exclude       htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*

// ==/UserScript==

// ==============
// ==Statuses==

(function(){

{var Porog=120;
var XP=Number(document.getElementsByTagName('span')[3].textContent);
var Mag=Pro4=Kv1=Kv2=Kv3=Kv4=Kv5=Kap=Bit=Bonk=Otpr=Dobit=Amo=Am=Heal='';}

{zapolnenie();kliki();gen_login();}

function zapolnenie(){
for (i=0;i<document.links.length;i++){
if (document.links[i].text.match("Девушка")||document.links[i].text.match("Тьма")||document.links[i].text.match("Начать")||document.links[i].text.match("Пойти в Лавку Редкостей")||document.links[i].text.match("Взять оружие и пойти к Чародею")||document.links[i].text.match("Пройти подземелье")||document.links[i].text.match("Наложить чары")||document.links[i].text.match("Надеть")||document.links[i].text.match("Улучшить")||document.links[i].text.match("Забрать бонус и перейти в Таверну")||document.links[i].text.match("Вернуться")||document.links[i].text.match("Чуть позже")||document.links[i].text.match("Погрузиться в приключения и прославиться")||document.links[i].text.match("Ясно, скрыть совет")||document.links[i].text.match("Принять участие в Играх")||document.links[i].text.match("Забрать 0.5% сейчас")||document.links[i].text.match("Использовать")||document.links[i].text.match("Разобрать")||document.links[i].text.match("Пойти к Коллекционеру")||document.links[i].text.match("Обменять")||document.links[i].text.match("Продолжить")||document.links[i].text.match("Да, подтверждаю")||document.links[i].text.match("Сила")||document.links[i].text.match("Воскреснуть")){Pro4=document.links[i].href;}
if (document.links[i].text.match("Купить на Аукционе")||document.links[i].text.match("Снять")){Kap=document.links[i].href;}
if (document.links[i].text.match("Отправиться в бой")){Otpr=document.links[i].href;}
if (document.links[i].text.match("Получить")&&(document.links[i].className!='p2')){Bonk=document.links[i].href;}
if (document.links[i].text.match("Хороший маг - одетый маг")){Kv1=document.links[i].href;}
if (document.links[i].text.match("Не бывает ненужных вещей!")){Kv3=document.links[i].href;}
if (document.links[i].text.match("Память о былом")){Kv2=document.links[i].href;}
if (document.links[i].text.match("Классовый Амулет")){Kv4=document.links[i].href;}
if (document.links[i].text.match("Волков бояться - в лес не ходить")){Kv5=document.links[i].href;}
if (document.links[i].text.match("Бить")){Bit=document.links[i].href;}
if (document.links[i].text.match("Маг")&&(document.links[i].className!='minor')&&(document.links[i].className!='')){Mag=document.links[i].href;}
if (document.links[i].text.match("Добивать")&&(document.links[i].className!='minor')){Dobit=document.links[i].href;}
if (document.links[i].text.match("Гром")&&(document.links[i].className!='minor')){Am=document.links[i].href;}
if (document.links[i].text.match("Приток")&&(document.links[i].className!='minor')){Amo=document.links[i].href;}
if (document.links[i].text.match("Зелье")&&(document.links[i].className!='minor')){Heal=document.links[i].href}
}}

function kliki(){
if (Pro4!=''){setTimeout(function(){location.href=Pro4},100);return;}
else if ((XP<Porog)&&(Heal!='')){setTimeout(function(){location.href=Heal},100);return}
else if ((Kv1!='')&&(Kv2!='')&&(Kv3!='')){setTimeout(function(){location.href=Kv3},100);return;}
else if ((Kv1!='')&&(Kv2!='')){setTimeout(function(){location.href=Kv2},100);return;}
else if (Kv1!=''){setTimeout(function(){location.href=Kv1},100);return;}
else if (Kap!=''){setTimeout(function(){location.href='../../tavern'},Kap);return;}
else if (Bonk!=''){setTimeout(function(){location.href=Bonk},100);return;}
else if (Mag!=''){setTimeout(function(){location.href=Mag},Bit);return;}
else if (Amo!=''){setTimeout(function(){location.href=Amo},500);return;}
else if ((Am!='')&&(Dobit!='')){setTimeout(function(){location.href=Am},2000);return;}
else if (Dobit!=''){setTimeout(function(){location.href=Dobit},1200);return;}
else if (Bit!=''){setTimeout(function(){location.href=Bit},2200);return;}
else if ((Kv4!='')&&(Kv4)){setTimeout(function(){location.href=Kv4},Bit);return}
else if (Kv5!=''){setTimeout(function(){location.href='../../basin'},100);return;}
else if (Otpr!=''){setTimeout(function(){location.href='../../city/collector/bonus'},100);return;}
}

function gen_login(){
var i=0; var k=0; var Imya="";

var Bukvi=["a","1","2","3","4","5","6","7","8","j","k","l","m","n","o","p","q","r","s","t","u","w","x","y","z"];
while(i<=6){k=Math.floor(Math.random()*25); Imya=(Imya + Bukvi[k]); i++;}

var k=0; var m=0; var Pass="";

var Simvl=["1","2","3","4","5","6","7","8","9","0","m","o","p","r","u"];
var Cifr=["1","2","3","4","5","6","7","8","9","0"];
while(k<=3){m=Math.floor(Math.random()*15); n=Math.floor(Math.random()*10); Pass=(Pass + Simvl[m]); Pass=(Pass + Cifr[n]); k++;}

for (j = 0; j < document.getElementsByTagName("INPUT").length; ++ j){
if (document.getElementsByTagName("INPUT")[j].type == "text"){document.getElementsByTagName("INPUT")[j].value = Imya;}
if (document.getElementsByTagName("INPUT")[j].type == "password"){document.getElementsByTagName("INPUT")[j].value = Pass;}
}

all_input=document.getElementsByTagName('input');
for(i=0;i<all_input.length;i++){
if ((all_input[i].type == "submit")&&(all_input[i].value == "Готово")){document.getElementById(all_input[i].id).click()}
}}

})();