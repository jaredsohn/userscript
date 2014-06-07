// ==UserScript==
// @name         Word Magicsoft Premium bypass
// @namespace    http://jixun.org/
// @version      0.1
// @description  Bypass the Premium request and display the actual content.
// @include      *://*.wordmagicsoft.com/dictionary/*
// @include      *://wordmagicsoft.com/dictionary/*
// @copyright    2012+, Jixun
// ==/UserScript==

try { (function () {

var clickEvent = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);

function click_ (queryS) { try { document.querySelector (queryS).dispatchEvent (clickEvent); return true;} catch (e) { return false;} }
function show_  (queryS) { try { document.querySelector (queryS).style.display = '';         } catch (e) {} }

click_ ('.ui-dialog-titlebar-close');
show_  ('#main');

var timer = setInterval (function(){if (click_ ('.growlstatus-close')) { clearInterval (timer); }}, 100);
// Ensure it's closed

}) (); } catch (e) { /* Do Nothing */ }