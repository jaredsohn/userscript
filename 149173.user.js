// ==UserScript==
// @author Farbdose
// @name Tribalwars Scripting Team Timer
// @namespace http://www.tw-ar.com
// @include http://*/game.php*screen=place&target=*
// @include http://*/game.php*screen=place
// @include http://*/game.php*screen=place&mode=command*
// @include http://*/game.php*screen=place&try=confirm
// ==/UserScript==

(function()
{

 //var dstime=document.getElementById("serverTime").innerHTML;
 //if(dstime==GM_getValue("starttime", "25:00:00"))
 //{  getElementsByName('submit').click(); }


function start()
{
 var dstime=document.getElementById("serverTime").innerHTML;
 
 window.dtime=prompt('???????:???????:??????\n ???? :\n08:14:36 ');
 window.setInterval(function() {
 var dstime=document.getElementById("serverTime").innerHTML;
 if(dstime==window.dtime)
 {  window.setTimeout(document.getElementsByName('submit')[0].click(),window.dtimev*400) }
 }, 200);
}

var l = document.createElement('a');
var nl = document.createElement('br');
l.href="javascript:;";
l.addEventListener('click',start,true);
l.innerHTML = '????? ?????? ??? ????? ??? "?????"';
document.forms[0].appendChild(nl)
document.forms[0].appendChild(l)


}());
(function()
{

 //var dstime=document.getElementById("serverTime").innerHTML;
 //if(dstime==GM_getValue("starttime", "25:00:00"))
 //{  getElementsByName('attack').click(); }


function start()
{
 var dstime=document.getElementById("serverTime").innerHTML;
 
 window.dtime=prompt('???????:???????:??????\n ???? :\n08:14:36 ');
 window.setInterval(function() {
 var dstime=document.getElementById("serverTime").innerHTML;
 if(dstime==window.dtime)
 {  window.setTimeout(document.getElementsByName('attack')[0].click(),window.dtimev*400) }
 }, 200);
}

var l = document.createElement('a');
var nl = document.createElement('br');
l.href="javascript:;";
l.addEventListener('click',start,true);
l.innerHTML = '????? ?????? ??? ????? ??? "????"';
document.forms[0].appendChild(nl)
document.forms[0].appendChild(l)


}());


(function()
{

 //var dstime=document.getElementById("serverTime").innerHTML;
 //if(dstime==GM_getValue("starttime", "25:00:00"))
 //{  getElementsByName('support').click(); }


function start()
{
 var dstime=document.getElementById("serverTime").innerHTML;
 
 window.dtime=prompt('???????:???????:??????\n ???? :\n08:14:36 ');
 window.setInterval(function() {
 var dstime=document.getElementById("serverTime").innerHTML;
 if(dstime==window.dtime)
 {  window.setTimeout(document.getElementsByName('support')[0].click(),window.dtimev*400) }
 }, 200);
}

var l = document.createElement('a');
var nl = document.createElement('br');
l.href="javascript:;";
l.addEventListener('click',start,true);
l.innerHTML = '????? ?????? ??? ????? ??? "???"';
document.forms[0].appendChild(nl)
document.forms[0].appendChild(l)




}());


