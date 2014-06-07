// ==UserScript==
// @name           Relakks Auto Sign Up
// @namespace      http://darkztar.com/ & http://warez-dk.org/
// @description    Auto Sign Up @ relakks.com
// @include        https://www.relakks.com/register.php
// @include        https://relakks.com/register.php
// ==/UserScript==

function rS(l){
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; var r = ""; var i = 0;
  for(x=0;x<l;x++)
  {
    i = Math.floor(Math.random() * 52); r += chars.charAt(i);
  }
  return r;
}
var sG = []; sG[0] = "googlemail.com"; sG[1] = "gmail.com";
var sName = rS(10 + Math.floor(Math.random() * 10));
var sUser = rS(10 + Math.floor(Math.random() * 10));
var sPass = rS(10 + Math.floor(Math.random() * 10));
var sMail = rS(10 + Math.floor(Math.random() * 10)) + "@" + sG[Math.floor(Math.random() * 1)];
document.getElementById('mid').innerHTML = document.getElementById('mid').innerHTML.replace('action="register.php"','action="register.php" id="relform"');
document.getElementsByName('user_name')[0].value = sName;
document.getElementsByName('alias')[0].value = sUser;
document.getElementsByName('email')[0].value = sMail;
document.getElementsByName('password')[0].value = sPass;
document.getElementsByName('password_copy')[0].value = sPass;
document.getElementsByName('eu_citizen')[0].checked = 'checked';
document.getElementById('relform').submit();