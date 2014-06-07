// ==UserScript==
// @name        auto friends
// @namespace   friend
// @description auto friend
// @include     https://www.facebook.com/
// @version     3
// @grant       none
// ==/UserScript==

for( i = 1;i<document.getElementsByName("actions[accept]").length;i++){document.getElementsByName("actions[accept]")[i].click();}
