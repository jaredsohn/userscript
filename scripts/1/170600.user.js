// ==UserScript==
// @author Fsdgsdge
// @name Spide-Fill
// @namespace http://osor.de/
// @include http://ae*.tribalwars.ae/game.php?t=*&village=*&screen=place*
// @include http://ae5.tribalwars.ae/game.php?t=*&village=*&screen=place*
// @include http://ae5.tribalwars.ae/game.php?village=*&screen=place&t=*&mode=command
// @include http://ae*.tribalwars.ae/game.php?village=*&screen=place&t=*
// @include http://ae*.tribalwars.ae/game.php?village=*&screen=place
// @include http://ae5.tribalwars.ae/game.php?village=*&screen=place*
// ==/UserScript==

//       spide%Coffddee!%

var coords='804|612 814|597 807|614 803|611 812|594 817|608 819|608 819|605 826|589 815|615 831|600 824|612 820|595 827|612 823|613 827|615 820|612 829|605 832|601 826|595 822|614 832|606 825|595 823|616 820|607 826|614 840|590 837|597 836|595 829|606 828|615 835|610 828|617 839|601 844|581 824|615 834|609 837|596 825|618 835|580 825|612 832|600 828|616 834|608 842|591 838|594 825|614 840|602 847|589 842|589 833|598 843|589 841|586 844|589 842|590 844|595 836|594 828|619 846|597 841|582 838|599 831|595 837|581 840|594 844|598 844|599 841|594 834|598 843|599 845|603 839|597 840|596 846|598 854|584 849|597 841|610 841|585 842|587 841|591 859|574 840|587 843|597 848|589 851|583 849|595 855|588 857|583 844|579 858|592 857|584 841|603 855|583 858|589 852|613 853|614 854|612 858|591 854|613 857|590 863|590 804|614 808|612 814|592 808|598 810|605 815|606 817|605 815|590 817|595 817|594 806|605 816|597 810|603 803|605 816|605 815|605 818|593 814|598 822|589 822|588 829|584 821|602 817|604 825|599 826|599 826|592 809|603 817|597 820|599 824|598 827|599 828|588 824|593 832|592 822|600 833|590 810|614 819|615 832|590 821|601 814|607 821|598 836|590 830|587 829|587 829|588 819|599 826|591 839|589 840|581 832|594 833|588 834|597 830|594 823|602 823|607 822|602 833|592 836|591 829|597 839|582 840|586 839|593 837|588 832|586 828|591 837|592 833|587 837|593 845|581 842|579 832|591 841|606 835|592 835|593 833|583 839|587 837|585 838|589 833|596 829|603 852|576 851|579 852|584 834|588 847|571 853|584 854|575 852|579 848|611 838|588 843|585 856|591 861|565 842|610 862|563 864|561 860|585 852|575 861|586';
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
eleDoc.forms[0].spy.value=5;
}

var rams=parseInt(eleDoc.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\d+/));

if(rams>0)
{
eleDoc.forms[0].ram.value=0;
}
else
{
eleDoc.forms[0].ram.value=0;
}
}
fnFillRallyPoint();document.forms[0].attack.click();end();