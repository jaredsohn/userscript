// ==UserScript==
// @name           Pielgi
// @namespace      Bloodwars
// @include        http://r3.bloodwars.interia.pl/?a=quest
// @include        http://beta2.bloodwars.net/?a=quest1
// @include        http://r5.bloodwars.interia.pl/?a=quest1
// @include        http://r11.bloodwars.interia.pl/?a=quest
// @include        http://r12.bloodwars.interia.pl/?a=quest
// @grant       none
// ==/UserScript==

var ograniczajCzas = 0;

function reloadWyprawki()
{
 unsafeWindow.console.log("reloadWyprawki()");
 window.location = window.location;
}

function selectQuest(q) { changeSelection(q);/* _questDiff = q; quests = 1; updateQuests();*/ return true; }

function changeSelection(q) 
{
var newSelPic = document.getElementById('quest_sel_pic_'+q);
if (!newSelPic) return true; // brak obrazkow
var oldSelPic = document.getElementById('quest_sel_pic_'+0);
if (oldSelPic) oldSelPic.style.display = 'none';
newSelPic.style.display = '';
var questSel = document.getElementById('questDiffPic');
if (questSel) questSel.value = q;
return true;
}
//var blood = 277;
var blood = 708;

function clickMax(num, cost)
{
var val = Math.floor(blood/cost);

document.getElementById('ark_'+num).value = Number(document.getElementById('ark_'+num).value) + Number(val);
blood -= cost*val;

updateDisp(num);
}

function updateDisp(num)
{
var d = document.getElementById('disp_'+num);
if (!d) return false;
var v = Number(document.getElementById('ark_'+num).value);
d.className = (v > 0) ? 'error' : '';
d.innerHTML = v;
document.getElementById('bloodd').innerHTML = blood;
return true;
}

(function()
{ 
unsafeWindow.console.log("Starting...");
 var cont = true;

if ( ((new Date()).getMinutes() >= 55) && (ograniczajCzas == 1) )//
{
 cont = alert("UWAGA. CZAS MIJA");
}
if ( cont )
{
 if(document.getElementById('startQuest') )
 {
   unsafeWindow.console.log("Yes Dalekie");
   //sleep(2000);
   //if ( window.location.href.indexOf('r5') == -1 )
   {
   	selectQuest(2);
   }
   if ( window.location.href.indexOf('r3') != -1 )
   {
 	 clickMax(6, 15);
   }
   if ( window.location.href.indexOf('r11') != -1 )
   {
 	 clickMax(3, 15);
   }
   
   window.setTimeout("document.getElementById('startQuest').click()", 5*1000);
 }
 else {
   var t=document.getElementById('quest_timeleft').innerHTML;
   unsafeWindow.console.log("t="+t); // powinno byc 600 s
   var l=t.split(":");
   var timeout=parseInt(l[1]*60)+parseInt(l[2]);
   unsafeWindow.console.log(t+"="+l+" s=" +timeout);
   unsafeWindow.console.log("Sleeping...");
   window.setTimeout("window.location = window.location", (timeout+3)*1000);
//   window.setTimeout("window.location = window.location;",600000);
 }
}


}());