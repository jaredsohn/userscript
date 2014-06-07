// ==UserScript==
// @author Fsdgsdge
// @name Spide-Fill
// @namespace http://osor.de/
// @include http://ae*.tribalwars.ae/game.php?village=*&screen=place
// @include http://ae5.tribalwars.ae/game.php?village=*&screen=place*
// ==/UserScript==

//       spide%Coffddee!%

var coords='573|698 572|699 572|698 516|612 501|614 519|611 509|618 519|613 561|601 510|621 577|601 577|603 545|625 535|635 547|628 530|634 534|632 534|634 539|634 544|639 544|638 542|642 540|642 542|643 510|653 544|645 500|656 540|654 542|661 506|662 509|662 546|660 516|667 505|663 556|659 529|672 537|667 573|659 535|667 530|671 574|659 534|671 569|662 575|659 536|670 558|669 565|666 535|680 566|671 573|668 542|681 563|673 563|675 539|684 597|661 530|680 535|682 569|673 570|670 567|669 533|686 543|679 541|684 510|690 542|682 530|682 566|674 564|673 533|687 570|678 512|692 539|685 558|676 511|691 537|688 539|689 539|690 597|664 562|685 541|690 517|691 565|685 596|664 565|682 510|697 538|691 557|690 514|692 545|689 518|698 543|690 542|696 535|696 514|696 511|698 579|685 535|694 516|696 558|693 533|696 557|694 543|697 509|696 561|691 538|694 512|696 556|690 571|685 539|694 559|693 584|689 543|698 573|687 586|688 534|696 588|689 579|686 582|692 533|698 571|690 558|694 551|694 587|687 580|692 585|691 589|689 585|690 574|697 586|690 558|698 571|698 569|697 587|688 589|688 584|692 587|695 538|660 535|668 578|697';
var eleDoc=(window.frames.length>1)?window.main.document:document;

function fnFillRallyPoint()
{
var coord=coords.split(' ');
var coordSplit=coord[Math.round(Math.random()*(coord.length-1))].split('|');
eleDoc.forms[0].x.value=coordSplit[0];
eleDoc.forms[0].y.value=coordSplit[1];

"رمح"
var scouts=parseInt(eleDoc.forms[0].spear.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].spear.value=0;
}

"سيف"
var scouts=parseInt(eleDoc.forms[0].sword.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].sword.value=0;
}

"فاس"
var scouts=parseInt(eleDoc.forms[0].axe.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].axe.value=0;
}

"سهم"

var scouts=parseInt(eleDoc.forms[0].archer.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].archer.value=0;
}


"كشافه"

var scouts=parseInt(eleDoc.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].spy.value=1;
}

"خفيف"

var scouts=parseInt(eleDoc.forms[0].light.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].light.value=0;
}

"ثقيل"

var scouts=parseInt(eleDoc.forms[0].heavy.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].heavy.value=0;
}

"محطمة"

var scouts=parseInt(eleDoc.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].ram.value=1;
}


"مقلاع"
var scouts=parseInt(eleDoc.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(scouts>0)
{
eleDoc.forms[0].catapult.value=0;
}


}
fnFillRallyPoint();document.forms[0].attack.click();end();