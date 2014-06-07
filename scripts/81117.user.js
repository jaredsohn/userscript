// ==UserScript==
// @name           BYBS Ikariam Auto Login
// @version        2.0
// @description    Automatic login for any Ikariam server. Saving you time and effort.
// @author         domz
// @e-mail         domz_fort@yahoo.com
// @include        http://**.ikariam.com/
// @exclude        http://*s*.ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function setInfomation() {
    var usernameold = GM_getValue("Username", "USERNAME");
    GM_setValue("Username", prompt("votre speedo ikariam?", usernameold) || usernameold);

    var passwordold = GM_getValue("Password", "PASSWORD");
    GM_setValue("Password", prompt("votre mot de passe ikariam?", passwordold) || passwordold);

    var serverold = GM_getValue("Server", "SERVER");
    GM_setValue("Server", prompt("le server ou vous jouer écrivez sous forme :\n\n s1.fr.ikariam.com  => pour ALPHA \n s2.fr.ikariam.com  => pour BETA \n s3.fr.ikariam.com  => pour GAMMA \n s4.fr.ikariam.com  => pour DELTA \n s5.fr.ikariam.com  => pour EPSILON \n s6.fr.ikariam.com  => pour ZETA \n s7.fr.ikariam.com  => pour ETA \n s8.fr.ikariam.com  => pour THETA \n s9.fr.ikariam.com  => pour IOTA \n s10.fr.ikariam.com  => pour KAPPA \n ...\n", serverold) || serverold);

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto-Login: options", setInfomation);

var SERVER = GM_getValue("Server", "SERVER"); // World = xx.ikariam.org 
var USERNAME = GM_getValue("Username", "USERNAME");  // Username
var PASSWORD = GM_getValue("Password", "PASSWORD");  // Password

if (USERNAME == "USERNAME" || PASSWORD == "PASSWORD" || SERVER == "SERVER") {
  setInfomation();
} else {

document.getElementById("logServer").value = SERVER;
document.getElementById("loginName").value = USERNAME;
document.getElementById("loginPassword").value = PASSWORD;

//si vous voulez que le script entre sur le server enlevez les "//" au début des 3 lignes en dessous


//var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
//document.getElementById('loginForm').action = url;    
//document.getElementById("loginForm").submit();

};