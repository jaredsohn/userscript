// ==UserScript==
// @name         Fix JEP Titles
// @namespace    jepTitleFix
// @include      https://wiki.mozilla.org/Labs/Jetpack/JEP/*
// @include      https://wiki.mozilla.org/Labs/Jetpack/Reboot/JEP/*
// @datecreated  2010-02-17
// @lastupdated  2010-02-17
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  Fixes the document.title of JEP pages.
// ==/UserScript==

(function(doc){
  var h2 = doc.evaluate("//h2/span[contains(@class,mw-headline)]",doc,null,9,null).singleNodeValue;
  if(!h2 || !h2.innerHTML.match(/^\s*JEP [\d,]+\s-/)) return;
  doc.title = h2.innerHTML.replace(/^\s+/gi,'').replace(/\s+$/gi,'');
})(document);