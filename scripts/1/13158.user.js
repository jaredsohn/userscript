// ==UserScript==
// @name           MySpace - Message TabIndexes
// @namespace      http://userscripts.org/people/774
// @description    2008/02/09 - Adds Tabindexes to Subject,Body,Send. You start on the subject, press tab for body, tab again for send. Author: InsaneNinja
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.message&*
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.reply&*
// ==/UserScript==

var Sub = document.getElementById('ctl00_ctl00_Main_messagingMain_SendMessage_Skin_subjectTextBox')
var Bod = document.getElementById('ctl00_ctl00_Main_messagingMain_SendMessage_Skin_bodyTextBox')
var Snd = document.getElementById('ctl00_ctl00_Main_messagingMain_SendMessage_Skin_btnSend') 

if (Sub) Sub.setAttribute('tabindex','1')
if (Bod) Bod.setAttribute('tabindex','2')
if (Snd) Snd.setAttribute('tabindex','3')