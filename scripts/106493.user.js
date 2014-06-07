// ==UserScript==
// @name           communitytf2items
// @namespace      tf2items
// @description    tf2items link creator
// @include        http://steamcommunity.com/profiles/*
// @include        http://steamcommunity.com/id/*
// ==/UserScript==

var profilename = window.location.pathname.replace('/id/','');
profilename = window.location.pathname.replace('/profiles/','');

//alert(profilename);

var textareas = document.getElementById('OnlineStatus');
//alert(textareas);
if (textareas) {
var divTag = document.createElement("div");
            divTag.class = "actionItem";
            divTag.innerHTML = '<div class="actionItemIcon"><a class="inviteGroupListLink" ref=""><img src="http://cdn.steamcommunity.com/public/images/skin_1/iconVideo.png" border="0" height="16" width="16"></img></a></div> <a class="linkAction" href="http://www.tf2items.com'+window.location.pathname+'">View Backpack on TF2items</a>';
	document.getElementById("rightActionBlock").appendChild(divTag);
} else {
// there are no textareas on this page
}