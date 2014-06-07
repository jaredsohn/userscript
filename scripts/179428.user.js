// ==UserScript==
// @author Fsdgsdge
// @name Spide-Fill
// @namespace http://osor.de/
// @include http://ae*.tribalwars.ae/game.php?village=*&screen=place&t=*
// @include http://ae*.tribalwars.ae/game.php?village=*&screen=place*
// @include http://ae9.tribalwars.ae/game.php?t=*village=*&screen=place*
// ==/UserScript==

//       spide%Coffddee!%

var coords='637|614 636|619 637|620 653|611 645|630 657|620 655|618 674|601 658|620 652|608 670|636 634|607 645|635 650|616 638|626 637|624 652|613 650|617 554|508 549|501 550|504 606|508 556|508 548|502 556|505 553|509 558|541 548|501 605|509';
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
eleDoc.forms[0].spy.value=0;
}

var rams=parseInt(eleDoc.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(rams>0)
{
eleDoc.forms[0].ram.value=1;
document.forms[0].attack.click();
}
else
{
eleDoc.forms[0].ram.value=0;
}
}
fnFillRallyPoint();end();