// ==UserScript==
// @name           KMU Wireless Autologin
// @namespace      By lol
// @description    Automatically login to KMU Wireless auth page
// @include        https://10.14.1.254:8001/*
// ==/UserScript==


redirurl = "http://www.google.com.tw/";


function setInfomation() {
    var usernameold = GM_getValue("auth_user", "auth_user");
    GM_setValue("auth_user", prompt("Account?", usernameold) || usernameold);

    var passwordold = GM_getValue("auth_pass", "auth_pass");
    GM_setValue("auth_pass", prompt("Pass?", passwordold) || passwordold);

  window.location.reload();
};

GM_registerMenuCommand("KMU Wireless Autologin", setInfomation);


var auth_user = GM_getValue("auth_user", "auth_user");  // Username
var auth_pass = GM_getValue("auth_pass", "auth_pass");  // Password

if (auth_user == "auth_user" || auth_pass == "auth_pass") {
  setInfomation();
} else {

	document.getElementsByTagName('input')[0].value = auth_user;
	document.getElementsByTagName('input')[1].value = auth_pass;
	document.getElementsByTagName('input')[2].value = redirurl;
	document.getElementsByTagName('form')[0].submit();

};