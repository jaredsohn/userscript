// ==UserScript==
// @name         MONOCO Remove Private Overlay
// @namespace    http://ngsdev.org/
// @version      1.0
// @description  Remove annoying private overlay from MONOCO
// @match        http://monoco.jp*
// @copyright    2012, Atsushi Nagase
// ==/UserScript==

!function(window){
  window.jQuery(function($){  $("#lb_main,#lb_shadow").remove(); });
}(window.parent);