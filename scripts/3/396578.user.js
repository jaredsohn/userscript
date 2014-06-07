// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://www.facebook.com/reqs.php
// @copyright  2012+, You
// ==/UserScript==

javascript:for( i = 1;i<document.getElementsByName("actions[accept]").length;i++){document.getElementsByName("actions[accept]")[i].click();}void(0);