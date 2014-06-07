// ==UserScript==
// @name           Default to channel 2
// @namespace      
// @include        *.thestudentroom.co.uk/mgc_cb_evo.php?do=view_chatbox
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=91
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=33
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=232
// @include        *.thestudentroom.co.uk/forumdisplay.php?f=143
// ==/UserScript==

window.onload = go;

function go() {
    window.location="javascript:setTimeout('display_channel(2)',3000);javascript:setTimeout('chatbox_refresh()',1000);";
}