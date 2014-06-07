// ==UserScript==
// @name        Edit Via
// @namespace   http://userscripts.org/users/416130
// @description add style to via website
// @include     http://perso.telecom-paristech.fr/~via/*
// @version     2
// @grant       GM_addStyle
// ==/UserScript==
function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

//just replace the css inserted
var cssTxt = hereDoc(function() {/*!
 
  body:before {content:'you can know edit your via project style, do > Tools > Greasemonkey > manage user scripts > select edit via and edit it';padding:10px;text-align:center;border-bottom:1px solid #FFF;background:#DDD;margin-bottom:10px;display:block;}
  
  
*/});

GM_addStyle (cssTxt);
