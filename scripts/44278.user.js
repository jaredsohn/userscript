// ==UserScript==
// @name           Mafia Battle Autologin
// @namespace      ~dkhal~
// @description    Logs you in automatically to the site
// @include        http://*mbstreets.mafiabattle.net/
// @copyright dkhal
// ==/UserScript==

// This is a variation of the script i made called Tribal Wars Auto Login All servers supported
// Edit these options :

name="";
pass="";

// Do not touch these
document.getElementsByName('username')[0].value=name;         		 // Write username
document.getElementsByName('password')[0].value=pass;    		 // Write password
document.getElementById("login").submit();				 // Log in