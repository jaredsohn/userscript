// ==UserScript==
// @name           fattyBlock
// @namespace      http://userscripts.org/users/0
// @include        http://www.thingbox.com/account/welcome
// @include        http://www.thingbox.com/account/welcome/*
// @include        http://www.myofficebox.com/account/welcome
// @include        http://www.myofficebox.com/account/welcome/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function(){begin();});

function begin()
{
	insertIgnoreBuffer();
	loadContent();
}

function insertIgnoreBuffer()
{
	$("div#content").prepend("<div id='ignoreBuffer'></div>");
	$("div#content").prepend("<div id='ignoreList'></div>");
	$("#ignoreBuffer").hide();
	$("#ignoreList").hide();
}

function loadContent()
{
	$("#ignoreBuffer").load("/forums/list .summary", loadAndChain);
}

function loadAndChain()
{
	moveBufferToList();
	$("#ignoreBuffer").load("/forums/list/all/2 .summary", processIgnores);
}

function moveBufferToList()
{
	$("#ignoreBuffer div.summary").clone().appendTo("#ignoreList");
	$("#ignoreBuffer").empty();
}

function processIgnores()
{
	moveBufferToList();
	var reloadNeeded = false;					
	var fattyString = "#ignoreList div.text div.small a.profile[href*='/members/profile/20408']";
	$(fattyString).parent().parent().children("h4").children("a").each(
		function(i, eachLink)
		{
			reloadNeeded = true;					
			var igLink = eachLink.href.replace("/thread/","/ignore/");
			$.ajax({url:igLink, cache: false, success: function(html){return true;}});
		}
	);
	
	if (reloadNeeded)
	{
		location.reload();
	};

}