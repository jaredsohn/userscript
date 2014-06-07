// ==UserScript==
// @name           IkariamAutologin
// @namespace      http://www.colonial-fleet.nl
// @include        http://*.ikariam.*/index.php
// @include        http://*.ikariam.tld/
// ==/UserScript==

// Ikariam Worlds:
// ---------------------------------------------
// s1 = alpha, s2 = beta, s3=gamma, s4=delta
// s5 = epsilon, s6 = zeta, s7 = eta, s8 = theta, s9 = iota
//
var SERVER = "s1.de.ikariam.com"; // World = server.country.ikariam.com
//   
var USERNAME = "Name";  // Username
//
var PASSWORD = "Pass";  // Password

document.getElementById("logServer").value = SERVER;
document.getElementById("loginName").value = USERNAME;
document.getElementById("loginPassword").value = PASSWORD;

var url = "http://" + document.getElementById("logServer").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;
document.getElementById("loginForm").submit();	