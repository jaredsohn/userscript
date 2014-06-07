// ==UserScript==
// @name           LP - Videonamen im Titel
// @namespace      Kambfhase
// @description    fügt den Videonamen in den Titel ein.
// @include        http://letsplayimpot.de/?v=*
// ==/UserScript==


document.title = "Let's Play im pOT - " + document.evaluate("//div[@class='name']", document, null, 8, null).singleNodeValue.textContent;