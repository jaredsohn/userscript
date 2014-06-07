// ==UserScript==
// @name           Hellboundhackers realistic challenge 11 script
// @namespace      http://www.hellboundhackers.org/profile/linkero.html
// @description    Script to complete realistic challenge 11 on hellboundhackers.org 
// @include        http://www.hellboundhackers.org/challenges/real11/clients/backup.php
// ==/UserScript==

var num1 = document.body.innerHTML;
num2 = num1.slice(178,191);
num3 = num2 * 2;
location.replace("http://www.hellboundhackers.org/challenges/real11/clients/backup.php?number=" + num3);
