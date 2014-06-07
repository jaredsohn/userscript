// ==UserScript==
// @author Farbdose
// @name Timer
// @namespace http://osor.de/
// @include http://de*.die-staemme.de/game.php*screen=place&try=confirm
// ==/UserScript==


(function()
{


 //var dstime=document.getElementById("serverTime").innerHTML;
 //if(dstime==GM_getValue("starttime", "25:00:00"))
 //{  getElementsByName('submit').click(); }



function start()
{
 var dstime=document.getElementById("serverTime").innerHTML;
 window.dtime=prompt('hh:mm:ss');
 window.dtimev=prompt('Nummer des Angriffs');
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
l.innerHTML = 'Timen';
document.forms[0].appendChild(nl)
document.forms[0].appendChild(l)

}());