// MySpace Modified Home Page
// by mrk (bbzmark{at}gmail)
//
// ==UserScript==
// @name	MySpace Modified Home Page
// @namespace	http://bbzspace.com
// @description	Safe Mode and View Comments link on your home page.
// @include	http://home.myspace.com/*
// @include http://collect.myspace.com/*
// ==/UserScript==

if (document.forms.length > 0) {

	var pattern = "//div[@class=\"section\"]//div//center//a";
	var vl = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = vl.snapshotItem(0);
	if (pl)	{
		var friendID = pl.href.split("friendid=");
		var viewcmt = document.createElement('a');
		viewcmt.href = "http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID="+friendID[1];
		viewcmt.innerHTML = 'Comments';

		var vidlink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyVideosHyperLink');
		vidlink.parentNode.insertBefore(viewcmt, vidlink);

		var vidlink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyVideosHyperLink');
		vidlink.parentNode.removeChild(vidlink);
	}

	var pattern2 = "//div[@id=\"home_profileInfoLinks\"]//a";
	var wl = document.evaluate( pattern2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var ql = wl.snapshotItem(0);
	if (ql)	{
		var smode = document.createElement('a');
		smode.href = "http://editprofile.myspace.com/index.cfm?fuseaction=profile.safemode";
		smode.innerHTML = 'Edit Safe Mode';

		var smbreak1 = document.createElement('br');
		var smbreak2 = document.createElement('br');

		var editlink = document.getElementById('ctl00_Main_ctl00_Welcome1_EditMyProfileHyperLink');
		editlink.parentNode.insertBefore(smode, editlink);
		editlink.parentNode.insertBefore(smbreak1, editlink);
		editlink.parentNode.insertBefore(smbreak2, editlink);
	}
}
