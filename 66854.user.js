// ==UserScript==
// @name           beGone
// @namespace      http://userscripts.org/users/79443
// @include        http://www.thingbox.com/account/welcome
// @include        http://www.thingbox.com/account/welcome/*
// @include        http://www.myofficebox.com/account/welcome
// @include        http://www.myofficebox.com/account/welcome/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(document).ready(function(){begin();});

function begin()
{
	insertIgnoreList();
	loadContent();
}

function insertIgnoreList()
{
	$("div#content").prepend("<div id='begoneList'></div>");
	$("#begoneList").hide();
}

function loadContent()
{
	$("#begoneList").load("/forums/list/ .summary", processIgnores);
}

function processIgnores()
{
	var reloadNeeded = false;					

	// bryanBoy = 13430
	var usersToIgnore = [25134, 29110];
	for (eachUserIndex in usersToIgnore)
	{
		ignoreScumbag(usersToIgnore[eachUserIndex]);
	}

}


function ignoreScumbag(scumNumber)
{
	var scumbagFound = false;					
	var scumString = "#begoneList div.text div.small a.profile[href$='/members/profile/" + scumNumber + "']";

	$(scumString).parent().parent().children("h4").children().each(
		function(i, eachLink)
		{
			scumbagFound = true;					
			var igLink = eachLink.href.replace("/thread/","/ignore/");
			$.ajax({url:igLink, cache: false, success: function(html){location.reload(); return true;}});
		}
	);
}
