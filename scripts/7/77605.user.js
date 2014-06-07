// ==UserScript==
// @name           Shaved Bieber
// @namespace      FATLAB
// @include        *
// ==/UserScript==

function shavedbieber(u) {
   var s = document.createElement('script'); 
   s.setAttribute('language', 'JavaScript'); 
   s.setAttribute('src', u); 
   document.body.appendChild(s); 
   }
shavedbieber('http://assets.gleuch.com/projects/shaved-bieber/master.js?v=2'); 