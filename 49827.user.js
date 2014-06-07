// ==UserScript==
// @name           radio button-Etkt
// @description    Auto select male radio button
// @include        *
// ==/UserScript==

if((radio=document.evaluate('//input[@type="radio" and @etkt and @name="ticketType"]',document,null,9,null).singleNodeValue)) {
radio.checked = true;
radio.click();
}