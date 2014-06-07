// ==UserScript==
// @name           *VZ Log-in-prompt
// @namespace      http://hacx.bplaced.net
// @description    fragt den user per prompt nach mail udn pw und logt diesen dann in schuelervz bzw meinvz oder studivz ein.
// @include        http://www.schuelervz.net/
// @include        https://secure.schuelervz.net/Login
// @include        http://www.schuelervz.net/
// @include        http://www.studivz.net/
// @include        https://secure.studivz.net/Login
// @include        http://www.meinvz.net/
// @include        http://www.meinvz.net/
// @include        https://secure.meinvz.net/Login
// ==/UserScript==

var name = prompt("Bitte E-Mailadresse eingeben", "<name>");
var pass = prompt("Bitte Passwort eingeben", "<passwort>");

document.getElementById("Login_email").value=name;
document.getElementById("Login_password").value=pass;

document.getElementById("Loginbox").submit();