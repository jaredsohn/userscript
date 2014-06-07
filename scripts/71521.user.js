// ==UserScript==
// @name           LastFather
// @author         Kredu
// @namespace      http://myscript.com/
// @identifier     http://myscript.com/
// @description    LastFather
// @include        http://*.lastfather.com/*
// @include        http://lastfather.com/*
// ==/UserScript==

//edit here the target username
var to = 	'igor';

//random number
function rand(min,max) {
  min = Number(min);
  max = Number(max);
  return Math.round(Math.random() * (max - min) + min);
}

//random string
function randstr(len,chars) {
  if (chars == undefined) chars = 'abcdefghijklmnopqrstuvwxyz';
  var charslen = chars.length - 1;
  var str = '';
  for (var i = 0; i < len; i++) str += chars.charAt(rand(0,charslen));
  return str;
}

function registerPage() {
  window.setInterval(registerPage, 10000);
  window.location.href = 'http://www.lastfather.com/register.php?ref='+to;
}

function logout() {
  window.setInterval(logout, 10000);
  window.location.href = 'http://www.lastfather.com/index.php?logout=yes'
}

var status = GM_getValue("status", "");
if (window.location.pathname == '/' || window.location.pathname == '/index.php' || window.location.pathname == '/login.php') registerPage();
else if (window.location.pathname == '/register.php') {
  if (status == "register") {
    //login
    window.document.getElementsByName("username")[0].value = GM_getValue("user");
    window.document.getElementsByName("password")[0].value = GM_getValue("pass");
    GM_setValue("status", "login");
    window.setTimeout(registerPage, 10000);
    window.document.getElementsByName("Submit")[1].click();
  }
  else {
     var user = randstr(rand(6,12));
    GM_setValue("user", user);
    var pass = randstr(rand(6,8));
    GM_setValue("pass", pass);
    window.document.getElementById("reg_username").value = user;
    window.document.getElementById("reg_password").value = pass;
    window.document.getElementById("reg_password2").value = pass;
    window.document.getElementById("username3").value = randstr(rand(6,12))+"@hotmail.com";
    GM_setValue("status", "register");
    window.setTimeout(registerPage, 10000);
    window.document.getElementsByName("Submit")[0].click();
  }
}
else if (window.location.pathname == '/main/game.php' || window.location.pathname == '/main/frame.php') {
  window.setTimeout(logout, 60000);
  var main = window.document.getElementsByName("main")[0].contentWindow;
  window.document.getElementsByName("main")[0].addEventListener("load", mainLoaded, false); 
}

function mainLoaded() {
  if (main.location.pathname == '/main/you_stats.php') main.location.href = 'http://www.lastfather.com/main/bank.php';
  else if (main.location.pathname == '/main/bank.php') {
    if (status == "login") {
      status = "bank";
      main.document.getElementsByName("to_person")[0].value = to;
      main.document.getElementsByName("send_amount")[0].value = '10000';
      main.document.getElementsByName("Send_button")[0].click();
    }
    else main.location.href = 'http://www.lastfather.com/main/honour.php';
  }
  else if (main.location.pathname == '/main/honour.php') {
    if (status == "bank") {
      status = "hps";
      main.document.getElementsByName("respect_username")[0].value = to;
      main.document.getElementsByName("respect_amount")[0].value = 55;
      main.document.getElementsByName("respect_button")[0].click();
    }
    else logout();
 }  
}

