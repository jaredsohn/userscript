// ==UserScript== 
// @name           loaded 
// @namespace      my 
// @description    indicate if a page is loded 
// ==/UserScript== 


window.addEventListener( 
  'load', 
  function (e) { 
    document.title += " [loaded]"; 
 }, false);
