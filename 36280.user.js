// ==UserScript==
// @name           Warchaos Autologin
// @namespace      http://warchaos.ru
// @include        http://warchaos.ru/expir.html
// @include        http://warchaos.ru/
// ==/UserScript==

var login="your_login";
var password="your_password";

var t=document.getElementsByTagName("INPUT");
t.item(0).value=login;
t.item(1).value=password;
document.forms[0].submit();