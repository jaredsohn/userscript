// ==UserScript==
// @name           thingFriendly
// @namespace      http://userscripts.org/users/79443
// @include        http://www.thingbox.com/*
// @include        http://www.myofficebox.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


$(document).ready(function(){begin();});

function begin()
{
	insertCssHacks();
	processFriendList();
}

function processFriendList(data) 
{
	$("div.toolbox ul.icons span.headshot_wrap a.profile").each(function(i, eachProfile)
		{
			var profileId = userIdFromProfileLink(eachProfile.href);
			var miniLink = "/members/profile_mini/" + profileId + " .login";
			$(this).parent().prepend("<span class='squisher' id='frx"+profileId+"'></span>");
			$("#frx" + profileId).load(miniLink);
			$("#frx" + profileId).wrap("<a href='/messages/write/"+profileId+"'></a>");
		}
	);
}

// extract user id from profile string
// eg. linkString  = http://www.thingbox.com/members/profile/12920 
//     returns 2920
function userIdFromProfileLink(linkString)
{
	var idx = linkString.lastIndexOf("/");
	if (idx == -1) return "";
	return $.trim(linkString.substr(1+idx));
}

function insertCssHacks()
{
	
	var css = "";
	css = css + " #toolbar .toolbox #tb-5 {padding: 0px;}";
	css = css + " #toolbar .toolbox #tb-5 div {border: none; padding: 0px;}";
	css = css + " #toolbar .toolbox #tb-5 .headshot_wrap {width: 145px; float: left;}";
	css = css + " #toolbar .toolbox #tb-5 .headshot_wrap a:hover {color: purple;}";
	css = css + " .squisher {float: right; width: 110px;}";
		
	var stylesheet = $("<style type='text/css'></style>").attr("innerHTML",css);
	var head = $('head');
	head.append(stylesheet);

}