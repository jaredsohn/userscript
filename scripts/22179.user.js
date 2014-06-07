// ==UserScript==
// @name           IkariamAutologin
// @namespace      Ikariam
// @include        *ikariam.de/index.php
// ==/UserScript==

var SERVER = "s1.ikariam.de"; //Nur die Zahl verändern s1 = alpha, s2 = betha ....
var USERNAME = "Name";        //Hier deinen Username eintragen
var PASSWORD = "Passwort";    //Hier dein Passwort eintragen


document.getElementById("universe").value = SERVER;

document.getElementById("login").value = USERNAME;

document.getElementById("pwd").value = PASSWORD;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;

document.getElementById("loginForm").submit();	
