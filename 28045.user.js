// ==UserScript==
// @name           Ikariam Auto Login
// @version        1.2.3
// @description    Automatic login for any Ikariam server. Saving you time and effort.
// @author         Pezmc
// @e-mail         pegpro@gmail.com
// @include        http://*ikariam.tld/*
// @exclude        http://*s*.ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function setInfomation() {
    var usernameold = GM_getValue("Username", "USERNAME");
    GM_setValue("Username", prompt("What is your Ikariam username?", usernameold) || usernameold);

    var passwordold = GM_getValue("Password", "PASSWORD");
    GM_setValue("Password", prompt("What is your Ikariam password?", passwordold) || passwordold);

    var serverold = GM_getValue("Server", "SERVER");
    GM_setValue("Server", prompt("What is the http address of the server you play on? e.g. s11.ikariam.org", serverold) || serverold);

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto Login: Settings", setInfomation);

var SERVER = GM_getValue("Server", "SERVER"); // World = xx.ikariam.org 
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