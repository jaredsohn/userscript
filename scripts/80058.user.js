// ==UserScript==
// @name           Bypass SmartScreen
// @namespace      http://mike.thedt.net
// @description    "Bypass" SmartScreen when opening received links in Windows Live Messenger 2010 by automatically redirecting to the received URL
// @include        http://link.smartscreen.live.com//?l=*
// @include        http://link.smartscreen.live.com/?l=*
// @version        1.1
// ==/UserScript==
location.href=document.getElementById('ctl00_ctl00_MainContent_AboutToVisitMessageContentPlaceHolder_LabelUrlInformational').innerHTML.replace(/(<([^>]+)>)/ig,"");