// ==UserScript==
// @name           BYBS Ikariam Auto Login
// @version        1.0
// @description    Automatic login for any Ikariam server. Saving you time and effort.
// @author         domz
// @e-mail         domz_fort@yahoo.com
// @include        http://*ikariam.tld/*
// @exclude        http://*s*.ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function setInfomation() {
    var usernameold = GM_getValue("Username", "USERNAME");
    GM_setValue("Username", prompt("votre speedo ikariam?", usernameold) || usernameold);

    var passwordold = GM_getValue("Password", "PASSWORD");
    GM_setValue("Password", prompt("votre mot de passe ikariam?", passwordold) || passwordold);

    var serverold = GM_getValue("Server", "SERVER");
    GM_setValue("Server", prompt("le server ou vous jouer écrivez sous forme :\n\n s1.ikariam.fr  => pour ALPHA \n s2.ikariam.fr  => pour BETA \n s3.ikariam.fr  => pour GAMMA \n ...\n s99.ikariam.fr => pour SPEED \n", serverold) || serverold);

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto-Login: options", setInfomation);

var SERVER = GM_getValue("Server", "SERVER"); // World = xx.ikariam.org 
var USERNAME = GM_getValue("Username", "USERNAME");  // Username
var PASSWORD = GM_getValue("Password", "PASSWORD");  // Password

if (USERNAME == "USERNAME" || PASSWORD == "PASSWORD" || SERVER == "SERVER") {
  setInfomation();
} else {

document.getElementById("universe").value = SERVER;
document.getElementById("login").value = USERNAME;
document.getElementById("pwd").value = PASSWORD;

//si vous voulez que le script entre sur le server enlevez les "//" au début des 3 lignes en dessous


//var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
//document.getElementById('loginForm').action = url;    
//document.getElementById("loginForm").submit();

};