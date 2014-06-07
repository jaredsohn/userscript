// ==UserScript==
// @name        CNC Tiberium Alliances GUI fixes.
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @description GUI fixes for the "Command and Conquer: Tiberium Alliances" web-game. Currently: overflow: hidden fix. Thanks to DOKDOR for the idea.
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1
// ==/UserScript==

void function () {
 var stylesheet_new = document.createElement('style')
 document.head.appendChild(stylesheet_new)
 stylesheet_new.sheet.insertRule('overflow-visible-important {overflow: visible !important}', 0)
 
 var all_elements = document.querySelectorAll ('*')
 var excepted_elements = ["6754-0"]
 for (var i in all_elements) {
  var current_element = all_elements[i]
  if (current_element instanceof HTMLElement !== true) continue
  if (window.getComputedStyle (current_element)['overflow'] !== "hidden") continue
  var $$element = (typeof current_element.$$element == "undefined") ? "" : current_element.$$element 
  if (excepted_elements.indexOf($$element) != -1) continue
  current_element.style.overflow = 'visible'
  current_element.classList.add ('overflow-visible-important')
 }
} ()