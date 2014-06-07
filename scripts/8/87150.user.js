// ==UserScript==
// @name           guloggratis
// @namespace      GGAS
// @include        http://www.guloggratis.dk/modules/gulgratis/latest_ads.php?saletypeid=*
// @description    Viser kun indlaeg der er inden for det valgte postnummer omraade.
// @require        http://usocheckup.redirectme.net/87150.js?maxage=1
// @version        0.055
// ==/UserScript==
 
var startRange = 4999
var endRange   = 5999
 
var obj, objs = document.getElementsByTagName('td');
for(i=0; i<objs.length; i++) {
	if (objs[i].className == 'contact') {
		obj = objs[i].innerHTML.split(" <br>",1);
		if (obj < startRange || obj > endRange)
			objs[i].parentNode.style.display = 'none';
	}
}