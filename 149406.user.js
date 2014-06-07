// ==UserScript==
// @author Fsdgsdge
// @name Spide-Fill
// @namespace http://osor.de/
// @include http://ae*.tribalwars.ae/game.php?village=*&screen=place
// @include http://ae3.tribalwars.ae/game.php?village=*&screen=place*
// ==/UserScript==

//       spide%Coffddee!%

var coords='  628|512 630|512  ';
var eleDoc=(window.frames.length>0)?window.main.document:document;

function fnFillRallyPoint()
{
var coord=coords.split(' ');
var coordSplit=coord[Math.round(Math.random()*(coord.length-1))].split('|');
eleDoc.forms[0].x.value=coordSplit[0];
eleDoc.forms[0].y.value=coordSplit[1];

var scouts=parseInt(eleDoc.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].spy.value=10;
}

var rams=parseInt(eleDoc.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(rams>0)
{
eleDoc.forms[0].ram.value=1;
}
else
{
eleDoc.forms[0].ram.value=1;
}
}
fnFillRallyPoint();document.forms[0].attack.click();end();