// ==UserScript==
// @name           Spickmich Alle ablehnen Button für Freundschaftsanfragen
// @version        1.0
// @namespace      http://userscripts.org/users/269252
// @author         Snehonja
// @description    Blendet einen "Alle Ablehnen!"-Button ein, unabhängig davon, wie viele Anträge vorhande sind.
// @include        http://www.spickmich.de/neue-freunde
// @include        http://spickmich.de/neue-freunde
// @run-at         document-end
// ==/UserScript==
button = document.createElement('a');
button.setAttribute('class','simpleButtonDanger');
button.setAttribute('style','float:right; margin-left: 1em');
button.setAttribute('href','/neue-freunde?alle-ablehnen');
text = document.createTextNode("Alle Ablehnen!");
button.appendChild(text);
parentElement = document.evaluate("/html/body/div[2]/div[2]/div[5]/div/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
parentElement.insertBefore(button,parentElement.firstChild);
normalLinkContainer = document.evaluate("/html/body/div[2]/div[2]/div[5]/div/div[2]/div[3]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
normalLinkContainer.style.display = "none";