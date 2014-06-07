// ==UserScript==
// @name          MySpace compose name Signature
// @namespace     vnshng - http://userscripts.org/people/61146
// @description   Will Add yourname signature to your messages.
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.compose
// @Version	  7-29-08
// ==/UserScript==

var s = document.getElementById("hsmUserName"), tN;
if(s && (tN = s.firstChild))

var tb = document.getElementById("ctl00_ctl00_Main_messagingMain_ComposeMessage_bodyTextBox");
var sc = "\n\n"
tb.value = sc +tN.data + tb.value ;
