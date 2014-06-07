// ==UserScript==
// @name           login daten ogame
// @namespace      a
// @description    password
// @author 	  Dark Sky
// @include        http://ogame.de/
// @include        http://www.ogame.de/
// ==/UserScript==

function a(){
    document.getElementsByName("loginForm")[0].elements[3].value = "XX.ogame.de";
    document.getElementsByName("loginForm")[0].elements[4].value = "name";
    document.getElementsByName("loginForm")[0].elements[5].value = "passwort";
    document.getElementsByName("loginForm")[0].action="http://XX.ogame.de/game/reg/login2.php";
}
window.setTimeout(a,500)