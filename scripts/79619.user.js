/*
 * GC drāznis by yopzer
 * Version 0.01
 *
 * Changelog:
 *
 * version 0.01
 * 		- pļurkš links pie Hide my finds
 *
 */

// ==UserScript==
// @name          GC drāznis
// @namespace     pekle.lv
// @description   Paslēpj atrastos slēpņus
// @include       http://*.geocaching.com/map/*
// ==/UserScript==

foundHide = document.getElementById('chkHideFound');
if (foundHide) {
  foundHide.setAttribute("onclick","pm=true;hideFound(this,true);");
  newFoundHide = document.createElement("span");
  newFoundHide.setAttribute("style","font-size:9px;color:red;cursor:pointer;");
  newFoundHide.innerHTML = ' pļurkš';
  newFoundHide.setAttribute("onclick","document.getElementById('chkHideFound').checked = !document.getElementById('chkHideFound').checked;pm=true;hideFound(document.getElementById('chkHideFound'),true);");
  foundHide.parentNode.appendChild(newFoundHide);
}