// ==UserScript==
// @name Dota 2 Lounge Auto Bumper
// @namespace D2LAB
// @version 1.1
// @description Open page with "My trades" and start a script
// @match http://dota2lounge.com/mytrades
// @copyright 2013+, Luckyrill
// ==/UserScript==

//Settings
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