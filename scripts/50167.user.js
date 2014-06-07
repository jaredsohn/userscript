// ==UserScript==
// @name           Ikariam Auto Login PL
// @version        1.0a PL
// @description    Auto Login Ikariam.
// @author         Dancan
// @e-mail         luki85m@gmail.com
// @include        http://*ikariam.tld/*
// @exclude        http://*s*.ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function setInfomation() {
    var usernameold = GM_getValue("Username", "Login");
    GM_setValue("Username", prompt("Login", usernameold) || usernameold);

    var passwordold = GM_getValue("Password", "Hasło");
    GM_setValue("Password", prompt("Hasło", passwordold) || passwordold);

    var serverold = GM_getValue("Server", "SERVER");
    GM_setValue("Server", prompt("Serwer", serverold) || serverold);

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto Login : Opcje", setInfomation);

var SERVER = GM_getValue("Server", "SERVER"); // World = xx.ikariam.pl 
var USERNAME = GM_getValue("Username", "USERNAME");  // Username
var PASSWORD = GM_getValue("Password", "PASSWORD");  // Password

if (USERNAME == "USERNAME" || PASSWORD == "PASSWORD" || SERVER == "SERVER") {
  setInfomation();
} else {

document.getElementById("universe").value = SERVER;
document.getElementById("login").value = USERNAME;
document.getElementById("pwd").value = PASSWORD;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;
document.getElementById("loginForm").submit();

};