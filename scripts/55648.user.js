// ==UserScript==
// @name			Add Profile Settings Link to Google Analytics
// @namespace		gaProfileSettingsLink
// @include			https://www.google.com/analytics/reporting/*
// @include			https://www.google.com/analytics/settings/*
// @match			https://www.google.com/analytics/reporting/*
// @match			https://www.google.com/analytics/settings/*
// @datecreated		2009-08-13
// @lastupdated		2009-12-18
// @version			0.1.1
// @author			Erik Vergobbi Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		Adds a "profile settings" link to your Google Analytics reports, so you can easily change settings on a profile you're looking at.
// ==/UserScript==

(function(){
	var profile_dd = document.getElementById("profile");
	if(!profile_dd) return;
	var id = profile_dd.options[profile_dd.selectedIndex].value;
	if(id == 0) return;

	var link = document.createElement("a");
	link.href = "/analytics/settings/profile_summary?id=" + id;
	link.setAttribute("style", "border:none; margin-left:10px; border-right:1px solid #FFFFFF;");
	link.innerHTML = "Profile Settings";
	profile_dd.parentNode.insertBefore(link, document.getElementById( "settings_link" ).nextSibling );
})();