// ==UserScript==
// @name           Default to channel 2 and colour the box yellow in the relevant forum only
// @namespace      
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=232
// ==/UserScript==

window.onload = go;

function go() {
    window.location="javascript:display_channel(2);javascript:setTimeout('chatbox_refresh()',2000);";
}

GM_addStyle("div#chats_container.only-child.last-child {background-color: #FFFCCF;} ");