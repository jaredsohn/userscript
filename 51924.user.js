// ==UserScript==
// @name           jokerbux.com Auto User/Pass Filler
// @namespace      http://userscripts.org/users/95765
// @description    Automatically fills the login form
// @include        http://*jokerbux.com/login.php*
// @copyright      Fenixto
// ==/UserScript==

function set() {
GM_setValue("gmBuxUn", prompt("Username"));
GM_setValue("gmBuxPw", prompt("Password"));
window.location.reload();
}

if (document.addEventListener) {
window.addEventListener("load", function() {
setTimeout("document.forms[0].elements[0].value = \""+GM_getValue("gmBuxUn", "username")+"\";", 100);
setTimeout("document.forms[0].elements[1].value = \""+GM_getValue("gmBuxPw", "password")+"\";", 100);
setTimeout("document.forms[0].elements[2].focus()",100);
}, false);
}
else {
window.document.onLoad = function() {
setTimeout("document.forms[0].elements[0].value = \""+GM_getValue("gmBuxUn", "username")+"\";", 100);
setTimeout("document.forms[0].elements[1].value = \""+GM_getValue("gmBuxPw", "password")+"\";", 100);
setTimeout("document.forms[0].elements[2].focus()",100);
};
}

if(GM_getValue("gmBuxUn", "username")=="username" && GM_getValue("gmBuxPw", "password")=="password") {set();}

GM_registerMenuCommand('Set Bux.to Username/Password', set);