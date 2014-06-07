// ==UserScript==
// @name           Funmobile ERP System - Login Fix
// @namespace      mailto:ch_xxvi@yahoo.com.hk
// @include        http://192.168.1.236/
// @include        http://192.168.1.236/login.do
// ==/UserScript==



if (window.location.href=="http://192.168.1.236/") {
	window.location.replace("http://192.168.1.236/login.do");
}

if (document.title=="Funmobile ERP System") {
    btnSubmit = document.createElement("input");
    btnSubmit.type = "submit";
    tds = document.getElementsByTagName("td");
    tds[tds.length-1].innerHTML = "<br/><input type=submit value=Login>";
}