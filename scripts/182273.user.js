// ==UserScript==
// @name          Armourarchive Post Stripper
// @namespace     fr.kergoz-panic.watilin
// @description   Strips out undesired posts
// @include       http://forums.armourarchive.org/phpBB3/search.php?*
// @version       3
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/182273.user.js
// @updateURL     https://userscripts.org/scripts/source/182273.meta.js
// ==/UserScript==

Array.prototype.forEach.call(
   document.querySelectorAll("table.tablebg tr[valign=middle]"),
   function( $tr ){
      var $link = $tr.querySelector("p.gensmall:last-child a");
      if (!$link) return;
      if ("Political Conversations" === $link.textContent) {
         $tr.style.display = "none";
      }
   }
);
