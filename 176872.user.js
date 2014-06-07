// ==UserScript==
// @name DS Dorflink Buttons
// @description Fügt hinter Links zu Dörfern Buttons hinzu
// @author Michael Richter / DS-Team
// @namespace http://osor.de/
// @include http://de*.die-staemme.de/game.php*
// ==/UserScript==
// -----------------------------------------------------------------------------
// center icon by Mark James, http://www.famfamfam.com/lab/icons/silk/

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------
var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://scripts.die-staemme.de/gm-scripts/village_button.js');