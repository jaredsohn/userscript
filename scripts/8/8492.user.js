// ==UserScript==
// @name          MySpace - Auto Signature
// @namespace     DFW_Dino - 

http://userscripts.org/people/10135
// @description   Will Add automatic add a signature to your 

messages.
// @include       

http://messaging.myspace.com/index.cfm?fuseaction=mail.messa

ge*
// @include       

http://messaging.myspace.com/index.cfm?fuseaction=mail.reply

*
// @Version	  3-11-2007 1.0
// ==/UserScript==

var byX9=document.getElementsByTagName('textarea')[0];
byX9.value="[purple]["+byX9.value.replace(/|/g,"̲̅")+"]\n\n\

n"
var strSign = "\n\nily!";

strOrgMessage.value = byX9.value + strSign;