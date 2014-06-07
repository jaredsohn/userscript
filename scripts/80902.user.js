// Facebook Mass Friend Selector
// version 0
// 2009-8-01
// Copyright (c) 2009, Kevin dolan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// A window will pop up asking if you want to install the script
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook Event Inviter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Mass Friend Selector
// @namespace     http://thekevindolan.com/facebook_inviter/
// @description   script to automatically select 50 friends at a time
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==


el = document.createElement('div');
el.setAttribute('id','selector_bar');
el.style.position="fixed";
el.style.zIndex="500";
el.style.left="0";
el.style.top="108px";
el.style.backgroundColor="#3b5998";
el.style.fontWeight="bold";
el.style.color="#ffffff";
el.style.padding="3px";

document.body.appendChild(el);

unsafeWindow.showSelector = function() {
	try {
		f = document.getElementById('friends');
		fnds = f.childNodes;
		
		el = document.getElementById('selector_bar');
		txt = "<center><div>M.F.S.</div><div style=\"margin-bottom:5px\">By <a style=\"color:#ffffff\" href=\"http://www.thekevindolan.com\">Kevin Dolan</a></div>";
		txt += "<div>"+fnds.length+" friends</div>";
		
		n = Math.ceil(fnds.length / 50);
		for(i = 1; i <= n; i++)
			txt += "<div><a href=\"JavaScript:selectFriendGroup("+i+")\" style=\"color:#ffffff\">Group #"+i+"</a></div>";
			
		txt += "<div style=\"margin-top:5px\"><a href=\"JavaScript:closeSelector()\" style=\"color:#ffffff\">Close</a></div></center>";
		
		el.innerHTML = txt;
	} catch(e) {
		document.getElementById('selector_bar').innerHTML = "<center><div>M.F.S.</div><div style=\"margin-bottom:5px\">By <a style=\"color:#ffffff\" href=\"http://www.thekevindolan.com\">Kevin Dolan</a></div><div>No friend</div><div>selector on page</div><div style=\"margin-top:5px\"><a href=\"JavaScript:closeSelector()\" style=\"color:#ffffff\">Close</a></div></center>";
	}
};

unsafeWindow.closeSelector = function() {
	document.getElementById('selector_bar').innerHTML = "<center><a href=\"JavaScript:showSelector()\" style=\"color:#ffffff\">MFS</a></center>";
}

unsafeWindow.selectFriendGroup = function(n) {
	f = document.getElementById('friends');
	fnds = f.childNodes;
	
	start = 50 * (n-1);
	finish = Math.min(start + 50, fnds.length);
	
	for(i = start; i < finish; i++) {
		li = fnds[i];
		unsafeWindow.fs.click(li);
	}
}

unsafeWindow.closeSelector();