// ==UserScript==
// @name           autochill
// @description    one-click TH resting
// @include        *twilightheroes.com/rest.php*
// ==/UserScript==

var datum = document.getElementsByTagName('form');
var hormel = datum[0];
for(var x=0;x<datum.length;hormel=datum[++x])
	if (hormel.value=='Just Chill')
		break;
if (GM_getValue(snuze,0)>0){
	GM_setValue(snuze,0);
	hormel.submit();}
