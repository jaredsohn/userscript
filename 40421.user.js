// ==UserScript==
// @name           Add Profile Settings Link to GA
// @namespace      https://www.google.com/analytics/
// @include        https://www.google.com/analytics/reporting/*
// @include	       https://www.google.com/analytics/settings/*
// @author		   Chris Egner
// @company		   EpikOne
// ==/UserScript==

var link_target = "target='_self'";
var profile_dd = document.getElementById("profile");
var id = profile_dd.options[profile_dd.selectedIndex].value;
if (id != '0') {
	var link = "<a href='/analytics/settings/profile_summary?id=" + id + "' style='border:none;margin-left:5px;' " + link_target + ">Profile Settings</a>";
	document.getElementById("profile_nav").innerHTML += link;
}