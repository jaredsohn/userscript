// ==UserScript==
// @id             lk_xpresslogin
// @name           Lords & Knights n-Hance ExpressLogin
// @version        1.0
// @namespace      lk_
// @author         captan2
// @description    Adds a ExpressLogin to Lords and Knights
// @include        http://lordsandknights.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

if(localStorage.lk_xl_mail == null) localStorage.lk_xl_mail = "mail";
if(localStorage.lk_xl_pass == null) localStorage.lk_xl_pass = "";
if(localStorage.lk_xl_serv == null) localStorage.lk_xl_serv = "0";

var a = '<div id="loginsettings" style="position: fixed; top: 50%; left:1%; width: 300px; height: 130px; background-color: #bbbbbb"><p align="center">Login Settings</p><br><br><p>Server-ID: <input size="3" type="text" value="' + localStorage.lk_xl_serv + '" id="serv"></p><p>Mail: <input size="35" type="text" value="' + localStorage.lk_xl_mail + '" id="mail"></p><p>PW: <input size="35" type="password" value="' + localStorage.lk_xl_pass + '" id="pass"></p><p><input type="submit" value="save" OnClick="javascript: localStorage.lk_xl_serv = document.getElementById(\'serv\').value;localStorage.lk_xl_mail = document.getElementById(\'mail\').value; localStorage.lk_xl_pass = document.getElementById(\'pass\').value; $(\'#ok\').fadeIn(900); $(\'#ok\').fadeOut(900);alert(\'login settings saved - please reload login now\');"> - <input type="submit" value="close" OnClick="javascript: $(\'#loginsettings\').fadeOut(\'slow\')"> - <img id="ok" src="http://cdn1.iconfinder.com/data/icons/icojoy/noshadow/standart/gif/24x24/001_06.gif" border="0"></div>';
$("#wrapper").append(a);
$("#loginsettings").fadeOut(1);
$("#ok").fadeOut(1);
var b = '<div id="buttondiv" style="top: 0px; left:0px; width: 111px; height: 20px"><input type="submit" value="ExpressLogin" onClick="javascript: openLoginOverlay(); document.getElementsByName(\'loginEmail\')[0].value = \'' + localStorage.lk_xl_mail + '\'; document.getElementsByName(\'loginPassword\')[0].value = \'' + localStorage.lk_xl_pass + '\'; submitLogin();  setTimeout(function () { connectToServer(' + localStorage.lk_xl_serv + '); }, 1000);"><br><br><a id="login_settings" href="#" onClick="javascript:$(\'#loginsettings\').fadeIn(\'slow\');"><img src="http://i.imagebanana.com/img/7z3rc2wl/loginsettings.png" border="0"></img></a></div>';
$("#loginform").append(b);
