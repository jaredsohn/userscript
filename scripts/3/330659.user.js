// ==UserScript==
// @name          Juick — I Does Not Want This F***** Voting.
// @namespace     http://userscripts.org/users/sharkman
// @description   Removes voting on Juick
// @copyright     2014+, Sharkman (http://userscripts.org/users/sharkman)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.3
// @include http://juick.com/*
// @require  http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

$(window).addEvent('domready', function() {
  $$('div.msg-voting').hide();
});
