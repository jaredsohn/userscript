// ==UserScript==
// @name        Inteligo refresh
// @namespace   Osieczna
// @description Odświeżanie sesji
// @include     https://inteligo.pl/secure/*
// @version     1
// @grant       none
// ==/UserScript==

//var l_login = document.getElementById("bottom-text");
//l_login.innerHTML = "Ala ma kota";

var intervalHandle;
var interval = 1000 * 60 * 9;

function f_auto_refresh(){
	$.post("/secure/igo2/ajax/refresh_session", {'ias_sid': $('input[name=ias_sid]').val()});
	//l_login.innerHTML = "Ala ma kota i psa";
	clearInterval(intervalHandle);
	intervalHandle = window.setInterval(function(){f_auto_refresh()}, interval);
}

intervalHandle = window.setInterval(function(){f_auto_refresh()}, interval);

/*
var l_elements = document.getElementsByClassName("news-box");
for (var i = 0; i < l_elements.length; i++) {
	l_elements[i].style.visibility = "hidden";
	l_elements[i].parentNode.removeChild(l_elements[i]);
}
*/
