// ==UserScript==
// @name       CometSkinz Javascript
// @namespace  http://use.i.E.your.homepage
// @version    1.3
// @description  javascript portion for CometSkinz
// @match      http*://*friendcodes.com/*
// @copyright  2012+, You
// ==/UserScript==
//--Use extra CometChat space--
function newresize(event) {
	if (parseInt(document.getElementById('cometchat_chatboxes').style.minWidth) > parseInt(document.getElementById('cometchat_chatboxes').style.width)) {
		document.getElementById('cometchat_chatboxes').style.minWidth = parseInt(document.getElementById('cometchat_chatboxes').style.width) + "px";
	}
    if (parseInt(document.getElementById('cometchat_chatboxes_wide').style.width) == parseInt(document.getElementById('cometchat_chatboxes').style.width)) {
        if (document.getElementById('cometchat_chatbox_right').innerHTML.search("-1") != -1) {
            document.getElementById('cometchat_chatbox_right').click();
        }
    }
    if (parseInt(document.getElementById('cometchat_chatboxes_wide').style.width) < parseInt(document.getElementById('cometchat_chatboxes').style.width)) {
		document.getElementById('cometchat_chatboxes_wide').style.minWidth = parseInt(document.getElementById('cometchat_chatboxes').style.width) + "px";
    }
    else {
        if ((parseInt(document.getElementById('cometchat_base').style.width) - 350) > parseInt(document.getElementById('cometchat_chatboxes_wide').style.width)) {
			document.getElementById('cometchat_chatboxes').style.minWidth = parseInt(document.getElementById('cometchat_chatboxes_wide').style.width) + "px";
        }
        else {
			document.getElementById('cometchat_chatboxes').style.minWidth = (parseInt(document.getElementById('cometchat_base').style.width) - 350) + "px";
        }
    }
    if (document.getElementById('cometchat_chatbox_right').innerHTML.search("-") != -1) {
        document.getElementById('cometchat_chatbox_right').click();
    }
}
function newresize() {
	if (parseInt(document.getElementById('cometchat_chatboxes').style.minWidth) > parseInt(document.getElementById('cometchat_chatboxes').style.width)) {
		document.getElementById('cometchat_chatboxes').style.minWidth = parseInt(document.getElementById('cometchat_chatboxes').style.width) + "px";
	}
    if (parseInt(document.getElementById('cometchat_chatboxes_wide').style.width) == parseInt(document.getElementById('cometchat_chatboxes').style.width)) {
        if (document.getElementById('cometchat_chatbox_right').innerHTML.search("-1") != -1) {
            document.getElementById('cometchat_chatbox_right').click();
        }
		return;
    }
    if (parseInt(document.getElementById('cometchat_chatboxes_wide').style.width) < parseInt(document.getElementById('cometchat_chatboxes').style.width)) {
		document.getElementById('cometchat_chatboxes_wide').style.minWidth = parseInt(document.getElementById('cometchat_chatboxes').style.width) + "px";
    }
    else {
        if ((parseInt(document.getElementById('cometchat_base').style.width) - 350) > parseInt(document.getElementById('cometchat_chatboxes_wide').style.width)) {
			document.getElementById('cometchat_chatboxes').style.minWidth = parseInt(document.getElementById('cometchat_chatboxes_wide').style.width) + "px";
            
        }
        else {
			document.getElementById('cometchat_chatboxes').style.minWidth = (parseInt(document.getElementById('cometchat_base').style.width) - 350) + "px";
        }
    }
    if (document.getElementById('cometchat_chatbox_right').innerHTML.search("-") != -1) {
        document.getElementById('cometchat_chatbox_right').click();
    }
}

GM_addStyle('#cometchat_trayicon_themechanger,#cometchat_trayicon_share,#cometchat_trayicon_announcements {display:block !important;}');
window.addEventListener('load', newresize, true);
window.addEventListener('resize', newresize, true);
window.addEventListener('click', newresize, false); //Not my prefered method, but it gets the job done
setInterval(newresize,5000);
