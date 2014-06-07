// ==UserScript==
// @name           vz sitzung_sichern abschalten
// @namespace      vz
// @include        http://www.schuelervz.net/
// @include        https://secure.schuelervz.net/Login
// @include        http://www.schuelervz.net/
// @include        http://www.studivz.net/
// @include        http://www.studivz.net/Default
// @include        https://secure.studivz.net/Login
// @include        http://www.meinvz.net/
// @include        http://www.meinvz.net/
// @include        https://secure.meinvz.net/Login
// @description    Entfernt das häkchen für sicheres einloggen, sodass VZ nicht mehr zusätzlich die IP-Adresse zum Login speichert.
// ==/UserScript==

document.getElementById('Login_ip_restriction').value=0;
document.getElementById('Login_ip_restriction').checked=false;