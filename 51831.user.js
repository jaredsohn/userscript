// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Realms++
// @namespace  http://userscripts.org/users/95612   
// @description   Interface upgrades for Realms
// @include       http://www.realms-rp.com/chat/login.php?*
// ==/UserScript==

//window.frames['input'].document.forms['MsgForm'].elements['sendForm'].value='Hacked by !Tristan';
//alert(1);
//window.frames['input'].document.styleSheets[0].cssRules[0].style.setProperty('font-family', 'OCR A //Extended',null);
//alert(2);
window.frames['messages'].document.body.style.fontFamily="OCR A Extended, monospace";
alert(window.frames['messages'].document.body.style.fontFamily);
window.frames['messages']document.body.style.lineHeight="100%";
alert(window.frames['messages'].document.body.style.lineHeight);
//window.frames['input'].document.forms['MsgForm'].elements['M'].setAttribute("maxlength",undefined);
