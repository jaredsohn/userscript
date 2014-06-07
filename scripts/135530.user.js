// ==UserScript==
// @name           OzBargain
// @namespace      http://google.com
// @description    filter expired deals
// @include        http://www.ozbargain.com.au/*
// @version 	   1.0
// ==/UserScript==

var filtered = readCookie('ozbcookie')

if (filtered=='filterexpired'){
	var expired = document.getElementsByClassName('tagger expired');	
	for (var i=0; i < expired.length;i++){	
		var node = expired[i].parentNode.parentNode.parentNode;
		node.style.display = 'none'
	}
}
else{ 
	if (confirm("Would you like to filter out expired deals?")) {
		createCookie('ozbcookie','filterexpired','7');
		var expired = document.getElementsByClassName('tagger expired');
		for (var i=0; i < expired.length;i++){	
			var node = expired[i].parentNode.parentNode.parentNode;
			node.style.display = 'none'
		} 

	}
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

