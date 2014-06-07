// ==UserScript==
// @name          Torec subtitles timer remove
// @namespace     zibzibi
// @description	  Remove download timer from Torec.net
// @include	      http://*torec.net/sub.asp?sub_id*
// ==/UserScript==

var dwlButton = document.getElementById("download_button");
if(dwlButton)
{
    var clickValue = dwlButton.getAttribute("onclick");
    dwlButton.setAttribute("onclick",clickValue.replace("true","false"));
}