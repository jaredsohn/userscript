// ==UserScript==
// @name           autologin creativx fuer lefty
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    autologin creativx fuer lefty
// @include        http://creativx.net/
// ==/UserScript==

var name = 'Name'; //Username
var pass = 'Passwort'; //Passwort



document.getElementById('navbar_username').value = name;
document.getElementById('navbar_password').value = pass;
document.getElementsByClassName('button')[0].click();