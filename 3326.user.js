// MySpace View Pics Link from Home
// by mrk (bbzmark{at}gmail)
//
// ==UserScript==
// @name	MySpace View Pics from Home
// @namespace	http://bbzspace.com
// @description	Adds a link to view your own pics to the home page.
// @include	http://home.myspace.com/*
// ==/UserScript==

if (document.forms.length > 0) {

	var pattern = "//div[@class=\"section\"]//div//center//a";
	var vl = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = vl.snapshotItem(0);
	if (pl)	{
		var friendID = pl.href.split("friendid=");

		var viewpics = document.createElement('a');
		viewpics.href = "http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID="+friendID[1];
		viewpics.innerHTML = 'Pics';

		var pipe = document.createElement('span');
		pipe.innerHTML = ' | ';

		var bloglink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyBlogHyperLink');
		bloglink.parentNode.insertBefore(viewpics, bloglink);
		bloglink.parentNode.insertBefore(pipe, bloglink);
	}
}
