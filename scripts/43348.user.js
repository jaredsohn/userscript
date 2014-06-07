// ==UserScript==
// @name           Skip/Remove annoying stuff in VReel
// @namespace      http://userscripts.org/users/76078
// @version        0.2
// @author         charmy
// @description    Skip/Remove annoying stuff in VReel
// @include        http://beta.vreel.net/*
// ==/UserScript==
(function() {

// Skip VLC page
if(window.location.href.match(/index\.php\?q=vlc&id=(.*)/)) {
	var id = RegExp.$1;
	DisableVLCContent();
	RemoveVLCBanner();
	window.addEventListener(
	    "load",
	    function() {
		DisableVLCContent();
		RemoveVLCBanner();
		MoveToWatchPage(id);
	    },
	    true);
} else if(window.location.href.indexOf(/\/watch_/) >= 0) {
	RemoveVLCBanner();
	SkipAdAtWatchPage();
	window.addEventListener(
	    "load",
	    function() {
		RemoveVLCBanner();
		SkipAdAtWatchPage();
	    },
	    true);

} else {
	RemoveVLCBanner();
	window.addEventListener(
	    "load",
	    function() {
		RemoveVLCBanner();
	    },
	    true);
}

function SkipAdAtWatchPage()
{
	GM_addStyle('#FlashMovie {display:none;}');
	document.getElementById("FlashMovie").setAttribute('style', 'display:none');
	document.getElementById("VideoMovie").setAttribute('style', 'display:inline');
	unsafeWindow.hideFlash();
}

function DisableVLCContent()
{
	GM_addStyle('#Table_01 {display:none;}');
}

function MoveToWatchPage(id)
{
	window.location.href='watch_'+id+'.html';
}

function RemoveVLCBanner()
{
	var node = document.getElementById("divTopLeft");
	if(!node) return;
	GM_addStyle('#divTopLeft {display:none;}');
	node.innerHTML = '';
	node.setAttribute('style','display:none;');
	node.parentNode.setAttribute('style','display:none;');
	var brother = node.nextSibling.nextSibling;
	if(brother && brother.nodeName == 'SCRIPT') {
		node.parentNode.removeChild(brother);
	}
	node.parentNode.removeChild(node);
}

})();
