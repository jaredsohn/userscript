// ==UserScript==
// @name           IkariamAutologin
// @namespace      Ikariam
// @include        http://*ikariam.*/index.php*
// ==/UserScript==

// Ikariam Worlds:
// ---------------------------------------------
// s1 = alpha, s2 = beta, s3=gamma, s4=delta
// s5 = epsilon, s6 = zeta, s7 = eta, s8 = theta, s9 = iota
//
var SERVER = "s8.ikariam.org"; // World = xx.ikariam.org
//   
var USERNAME = "xxxxxxxx";  // Username
//
var PASSWORD = "xxxxxxxx";  // Password

document.getElementById("universe").value = SERVER;
document.getElementById("login").value = USERNAME;
document.getElementById("pwd").value = PASSWORD;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;
document.getElementById("loginForm").submit();	
