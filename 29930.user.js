// ==UserScript==
// @name           Ikariam Auto Login SPANISH
// @version        1.2.3
// @description    Logueate automáticamente en tu Ikariam ^^
// @author         Pezmc edited by: hda
// @e-mail         pegpro@gmail.com
// @include        http://*ikariam.tld/*
// @exclude        http://*s*.ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function setInfomation() {
    var usernameold = GM_getValue("Username", "USERNAME");
    GM_setValue("Username", prompt("Indica tu nombre de usuario de Ikariam.", usernameold) || usernameold);

    var passwordold = GM_getValue("Password", "PASSWORD");
    GM_setValue("Password", prompt("Indica tu password de Ikariam.", passwordold) || passwordold);

    var serverold = GM_getValue("Server", "SERVER");
    GM_setValue("Server", prompt("Indica el servidor en el que juegas. Ej. s5.ikariam.es", serverold) || serverold);

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