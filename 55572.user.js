// ==UserScript==
// @name          XBL Messages for Bungie.net
// @author		  Patrick Christianson (Karl2177)
// @namespace     http://www.bungie.net
// @description   Link to your XBL Messages.
// @include       http://*bungie.net*
// ==/UserScript==
var bodystr = document.getElementById('ctl00_dashboardNav_loggedInNormal').innerHTML;
var newbody = "";
var linktext = "<li> | </li><li><a href='http://live.xbox.com/en-US/profile/MessageCenter/ViewMessages.aspx'>Xbox Live Messages</a></li>";
var startpos = bodystr.toUpperCase().indexOf('/Account/Profile.aspx?page=Chapters">Groups</a></li>'.toUpperCase());
if(startpos != -1) {
	newbody = bodystr.substr(0, startpos + '/Account/Profile.aspx?page=Chapters">Groups</a></li>'.length) + linktext + bodystr.substr( startpos + '/Account/Profile.aspx?page=Chapters">Groups</a></li>'.length);
	document.getElementById('ctl00_dashboardNav_loggedInNormal').innerHTML = newbody;
}
