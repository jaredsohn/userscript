// ==UserScript==
// @author Farbdose
// @name Timer for tribalwars Attack (Super Cristal)
// @namespace http://osor.de/
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
 
 window.dtime=prompt('n\hh:mm:ss ????? ???? ???? ???? ???????\n ???? :\n08:14:36 ');
 window.dtimev=prompt('??? ??????? ?? ???? ??????');
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
l.innerHTML = '???? ??? ???? ????? ???????';
document.forms[0].appendChild(nl)
document.forms[0].appendChild(l)

var l6 = document.createElement('a');
var n6 = document.createElement('br');
l6.innerHTML = '???????? ?? ??? \n Super Cristal ? ???? ????? ???? ';
document.forms[0].appendChild(n6)
document.forms[0].appendChild(l6)

var l2 = document.createElement('a');
var n2 = document.createElement('br');
l2.href="http://ae8.twmentor.com/?tool=attack-v2";
l2.innerHTML = '???? ???????';
document.forms[0].appendChild(n2)
document.forms[0].appendChild(l2)