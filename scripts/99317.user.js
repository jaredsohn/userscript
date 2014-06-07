// ==UserScript==
// @name           Hide Facebook chat
// @namespace      http://userscripts.org/users/309240
// @description    Hide the Facebook CSS/Ajax chat "dock" that appears at the bottom of the screen
// @include        http://www.facebook.com/*
// ==/UserScript==

function getElementByXpath(xP) {
  var el = document.evaluate(xP, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  return el;
}
function fixChat(){
  var divChat = getElementByXpath('//*[@id="fbDockChat"]');
    if (divChat != null) {
    divChat = getElementByXpath('//*[@id="fbDockChat"]')
    divChat.style.display = 'none';
    }
}

window.addEventListener("load", fixChat, false);