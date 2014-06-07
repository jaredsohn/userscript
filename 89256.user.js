// ==UserScript==
// @name           Channel 2 Tab
// @namespace      
// @include        http://www.thestudentroom.co.uk/forumdisplay.php?f=232#mgc_cb_evo_top
// ==/UserScript==

document.body.onload = changeChannel;



function changeChannel() {
 	
setTimeout(channelTwo,1000);

}

function channelTwo() {

window.location="javascript:display_channel(2)";

}