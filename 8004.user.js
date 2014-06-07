// ==UserScript==
// @name          MySpace - Auto Signature
// @namespace     DFW_Dino - http://userscripts.org/people/10135
// @description   Will Add automatic add a signature to your messages.
// @include       http://messaging.myspace.com/index.cfm?fuseaction=mail.message*
// @include       http://messaging.myspace.com/index.cfm?fuseaction=mail.reply*
// @Version	  3-11-2007 1.0
// ==/UserScript==

var strOrgMessage = document.getElementById("ctl00_ctl00_Main_Main_sendMessageControl_bodyTextBox");
var strSign = "\n\nily!";

strOrgMessage.value = strSign + strOrgMessage.value ;
