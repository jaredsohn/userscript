// ==UserScript==
// @name          MySpace - Auto Signature v2
// @namespace     DFW_Dino - http://userscripts.org/people/10135 - Mod by Josh Minnich (http://www.joshuaminnich.com)
// @description   Will add your defined signature to all your myspace messages and comments!
// @include       http://messaging.myspace.com/index.cfm?fuseaction=mail.message*
// @include       http://messaging.myspace.com/index.cfm?fuseaction=mail.reply*
// @include       http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm*
// @Version       08-13-2007 2.0
// ==/UserScript==

var strOrgMessage = document.getElementById("ctl00_ctl00_Main_Main_sendMessageControl_bodyTextBox");

var strGetMessage = document.getElementById("ctl00_ctl00_Main_Main_sendMessageControl_bodyTextBox");

if (strGetMessage == undefined)
{
    strOrgMessage = document.getElementById("ctl00_cpMain_postComment_commentTextBox");
}

var strSign = "\n\n-Josh";

strOrgMessage.value = strSign + strOrgMessage.value ;