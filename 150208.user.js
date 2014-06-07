// ==UserScript==
// @name       PHPBB3: Clone searchbar to the bottom of the page
// @namespace  http://laskikymppi.com/
// @version    0.7
// @description  Shows the searchbar also at the bottom of the page when viewing phpbb3 posts
// @match      http://*/*/viewtopic.php*
// @copyright  2012+, Heikki Rauhala
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

$('p.searchbar').clone().insertBefore('#pagefooter')
console.log('doubled the searchbar')
