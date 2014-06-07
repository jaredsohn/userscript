// ==UserScript==
// @name           BaRyU Ikariam
// @namespace      Ikariam Autologin (otomatik giriş)
// @include        *ikariam.*
// ==/UserScript==

var SERVER = "**.ikariam.***"; //Oyundaki server'inizi girin örn: s2.ikariam.net (please enter world)(example : s2.ikariam.net)
var USERNAME = "******";        //Kullanıcı adınızı girin (please enter username)
var PASSWORD = "*******";    //Şifrenizi girin (please enter password)


document.getElementById("universe").value = SERVER;

document.getElementById("login").value = USERNAME;

document.getElementById("pwd").value = PASSWORD;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;

document.getElementById("loginForm").submit();	
