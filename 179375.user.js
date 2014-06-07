// ==UserScript==
// @name       SYSU Wifi Auto Connect
// @namespace  https://github.com/hokein
// @version    0.1
// @description  Auto connet sysu wifi and reconnect every 10 minutes. Before using the script, please fill you wifi account. Pls: you can customize reconnect time interval.
// @match       http://10.10.2.22/portal/logon*
// ==/UserScript==

//================ Credential =================
// Fill your sysu wifi account below.
var username = ""; 
var password = "";
var loginUrl = "http://10.10.2.22/portal/logon.htm";
var timeInvervalInMinutes = 10;

function login() {
  if (document.loginForm.PtButton.value == "Logon") { // check whether online
    document.loginForm.PtUser.value = username;
    document.loginForm.PtPwd.value = password;
    document.loginForm.PtButton.click();
  }
}

function reload() {
  document.location.href = loginUrl;
}

function init() {
  login();
  window.setInterval(reload, timeInvervalInMinutes*1000*60);
}

document.addEventListener('DOMContentLoaded', init);