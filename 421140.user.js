// ==UserScript==
// @name            Link Protection Remover [Lunaescence Archives]
// @namespace       fr.kergoz-panic.watilin
// @description     Removes age protection from all links.
// @version         1.0b
//
// @include         http://lunaescence.com/*
// @grant           none
//
// @downloadURL     https://userscripts.org/scripts/source/421140.user.js
// @updateURL       https://userscripts.org/scripts/source/421140.meta.js
//
// @author          Watilin
// @licence         http://opensource.org/licenses/mit-license.php
// @copyright       2014+, Watilin
// ==/UserScript==

var regexp = /viewstory\.php\?sid=\d+/;  
Array.forEach(  
   document.querySelectorAll("a[href*='location']"),  
   function( $link ){  
      var match = unescape($link.href).match(regexp);  
      if (match) {  
         $link.href = match[0];  
      } else {  
         console.warn("regexp mismatch, this link wasn't replaced: " +  
           $link.href);  
      }  
   }  
);
