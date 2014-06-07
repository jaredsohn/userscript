// ==UserScript==
// @name           PSNProfiles auto-update
// @description    Updates your PSNProfiles.com profile automatically every time you visit the PSNProfiles homepage.  Note: You MUST edit the source code of this script before it will work!!  Replace the part that says YOUR_USERNAME_HERE with your PSN username.
// @author         Josh1billion
// @include        http://*psnprofiles.com/*
// @version        1.1
// ==/UserScript==

var username = "YOUR_USERNAME_HERE";

if ($("#psnId").length == 1)
{
	if (username == "YOUR_USERNAME_HERE")
		alert("Error: You need to update the source code of the script before you install it.  Replace the part that says YOUR_USERNAME_HERE with your PSN username.");
	else
	{
		$("#psnId").attr('value', username);
		$(".index-button").trigger('click');
	}
}