// ==UserScript==
// @name           No RB css
// @namespace      http://userscripts.org/users/happysteve
// @description    removes rockband stylesheet on reddit
// @include        http://www.reddit.com/r/Rockband/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

jQuery(function(){
  $('link[href^="http://www.reddit.com/r/Rockband/stylesheet.css"]').remove();
});