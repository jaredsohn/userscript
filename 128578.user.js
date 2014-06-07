// ==UserScript==
// @name           Netload.in to QLoad
// @namespace      Master_M
// @include        http://*netload.in/datei*
// ==/UserScript==
html2insert = '<div style="position: absolute; left: 500px; top: 35px;"><form action="http://q-load.me/download" method="post"><input type="hidden" name="reqFile" value="'+document.location.href+'"><input type="submit" value="Q-LOAD!"></form></div>';
divs = document.getElementsByTagName('div');
for(i=0;i<divs.length;i++){
	if(divs[i].className == "dl_first_bg"){
		divs[i].innerHTML = divs[i].innerHTML + html2insert;
	}
}