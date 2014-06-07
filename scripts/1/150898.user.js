// ==UserScript==
// @name        CECAZ autorefresh
// @namespace   https://www.*.caisse-epargne.fr
// @include     https://www.*.caisse-epargne.fr/Portail.aspx
// @version     1
// @grant       none
// ==/UserScript==

function autorefresh() {
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
  			console.log('AJAX refresh OK');
    	}
  	}
	xmlhttp.open('GET', document.URL, true);
	xmlhttp.send();
}

setInterval(autorefresh, 42000);