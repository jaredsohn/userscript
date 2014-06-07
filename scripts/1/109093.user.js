// ==UserScript==

// @name           What.CD Extended Main Menu

// @namespace      http://what.cd/forums.php?action=viewthread&threadid=59546

// @description    Insert logchecker and better link in main menu

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// @version        0.1

// @date           2011-08-03

// ==/UserScript==



(function() {
/*var target = document.getElementById('menu').getElementsByTagName('ul')[0];*/ /* Main menu */
var target = document.getElementById('userinfo_minor'); /* User menu */


/* Insert logchecker link */

var lc_item = document.createElement('li');

lc_item.id = 'nav_logchecker';

lc_item.innerHTML = '<div style="float:left; position:relative; top:-29px; left:-170px; color:#E5A701;">this is a mirage. move along.</div><div style="float:left; position:relative; top:-60px; left:326px; font-size:1em; font-weight:bold; padding:1px 0 2px 10px; color:#E5A701;">Ξ <a href="logchecker2.php">logchecker</a></div>';

target.appendChild(lc_item);


/* Insert better link */

var better_item = document.createElement('li');

better_item.id = 'nav_better';

better_item.innerHTML = '<div style="float:left; position:relative; top:-60px; left:326px; font-size:1em; font-weight:bold; padding:1px 0 2px 10px; color:#E5A701;">♥ <a href="better.php">poplists</a></div>';

target.appendChild(better_item);
})();