// ==UserScript==
// @name           Autologin for ogame
// @namespace      Autologin
// @description    Faster login
// @include        http://ogame.org/
// @include        http://*.ogame.org/
// @include        http://*ogame.org/#
// ==/UserScript==

// Uni is electra EDIT TO SUIT----Preset to Electra
var Uni = "uni105.ogame.org"
// username keep within speechmarks EDIT TO SUIT
var UName = "USERNAME"
// pass also keep within the speech marks EDIT TO SUIT
var Paword = "PASSWORD"



document.getElementById('login').style.display = 'block';

document.getElementById('serverLogin').value = Uni;

document.getElementById('usernameLogin').value = UName;

document.getElementById('passwordLogin').value = Paword;

window.setTimeout(function() { document.getElementById('loginSubmit').click() }, 1000);