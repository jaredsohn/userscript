// ==UserScript==
// @author Farbdose
// @name Timer for tribalwars Attack plapl&tw4me
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
 
 window.dtime=prompt('n\hh:mm:ss الوقت يجب ان يكون متوفق مع الصيغه التاليه\n مثال :\n08:14:36 ');
 window.dtimev=prompt('عدد الهجمات لي تريد ارسلها');
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
l.innerHTML = 'توقيت وقت اطلاق الهجوم';
document.forms[0].appendChild(nl)
document.forms[0].appendChild(l)

var l6 = document.createElement('a');
var n6 = document.createElement('br');
l6.innerHTML = '*************روبط قد تهمك*************';
document.forms[0].appendChild(n6)
document.forms[0].appendChild(l6)

var l2 = document.createElement('a');
var n2 = document.createElement('br');
l2.href="http://ae1.twmentor.com/?lang=ae&tool=attack";
l2.innerHTML = 'مخطط صانع الهجمات';
document.forms[0].appendChild(n2)
document.forms[0].appendChild(l2)



var l3 = document.createElement('a');
var n3 = document.createElement('br');
l3.href="http://www.plapl.com/up/farma/";
l3.innerHTML = 'صانع الهجمات الوهميه';
document.forms[0].appendChild(n3)
document.forms[0].appendChild(l3)

var l5 = document.createElement('a');
var n5 = document.createElement('br');
l5.href="http://www.tw4me.com/";
l5.innerHTML = 'مدونات بلابلية';
document.forms[0].appendChild(n5)
document.forms[0].appendChild(l5)

var l4 = document.createElement('a');
var n4 = document.createElement('br');
l4.href="http://www.plapl.com/";
l4.innerHTML = 'منتديات بلابل';
document.forms[0].appendChild(n4)
document.forms[0].appendChild(l4)
}());


