// ==UserScript==
// @name           MySpace Hidden Links
// @namespace      http://theme.freehostia.com/greasemonkey/mshiddenlinks/
// @description    Gives access to hidden pages on people's profiles.
// @include        http://*.myspace.com/*
// ==/UserScript==

var scripts = document.getElementsByTagName('script');
if (scripts) {
	var fid = scripts[0].innerHTML.match('"DisplayFriendId":[0-9]+');
	if (fid) {
		fid = fid.toString().substr(18);
		var url_cmnts = 'http://profile.myspace.com/index.cfm?fuseaction=user.viewcomments&friendid=' + fid;
		var url_bdypk = 'http://profile.myspace.com/Modules/Applications/Pages/Canvas.aspx?appId=105387&friendId=' + fid;
		/*********************
		 * Add to "view my:" *
		 *********************/
		var view_my = document.getElementById('ctl00_cpMain_ctl01_UserBasicInformation1_ctrlViewMorePics');
		if (view_my) {
			view_my.parentNode.innerHTML += ' | <a href="' + url_cmnts + '">Comments</a> | <a href="' + url_bdypk + '">BuddyPoke</a>';
		}
		/***************************
		 * Add to "User shortcuts: *
		 ***************************/
		var shortcuts = document.getElementById('profileaction');
		if (shortcuts) {
			shortcuts.innerHTML +=
				'<option value="-1">---</option>' +
				'<option onclick="location.href = \'' + url_cmnts + '\'">View Comments</option>' +
				'<option onclick="location.href = \'' + url_bdypk + '\'">View BuddyPoke</option>';
		}
	}
}
