// ==UserScript==
// @name Dota 2 open all trade
// @namespace D2LOT
// @version 1.0
// @description Opening page with "My trades"
// @match http://dota2lounge.com/mytrades
// @copyright 2013+, Luckyrill
// ==/UserScript==

//Script
var i,lns,l,e;
GM_registerMenuCommand("Open all trade", open);
GM_registerMenuCommand("Bump all trade", bumpall);
function open()
{
for(i=0,lns=document.links,l=lns.length,e;i<l;i++)
{
e = lns[i].href;
if(/trade/&&/t=/.test(e))
window.open(e);
}
location.reload();
}
function bumpall()
{
var linkaudioogg = 'http://irpi.jr1.ru/ku-ku.ogg'; //Ссылка на звуковой файл
var enabledsound = true; //Воспроизведить звук если есть новые предложения
var timewait = 30; //Пауза между обновлением страницы
//Script
var audio = new Audio();
var bumpbutton = document.getElementsByClassName('buttonright');
var newoffer = document.getElementsByClassName('notification');
if(newoffer.length != 0) playsound(linkaudioogg);
setTimeout(bump, timewait*1000);
var i = 0;
function bump()
{
	while(bumpbutton.length != 0)
    {
        bumpbutton[i].click();
        i++;

        }
location.reload();
}

function playsound(audios)
{
audio.src = audios;
audio.autoplay = enabledsound;
}
}