// ==UserScript==
// @name white and black colors for sc2 eu en/ru forums
// @match http://eu.battle.net/sc2/ru/forum/*
// @match http://eu.battle.net/sc2/en/forum/*
// @match http://us.battle.net/sc2/en/forum/*
// ==/UserScript==

function addJQuery(callback)
{
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	script.addEventListener('load', function ()
	{
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
};

function main()
{
	if (window.location.toString().substr(-6) == "forum/")
	{
		return;
	}
	if (window.location.toString().substr(-5) == "forum")
	{
		return;
	}
	var linksColor = "#006653";
	$(".post").css({backgroundColor: "white", backgroundImage: "url('')", color: "black", marginBottom: "1px"});
	$("#thread a").css({color: linksColor});
	$("#thread").css({paddingTop: "1px"});
	if ($(".talkback").size() == 1)
	{
		$(".talkback").first().find(".context-link").first().css({color: linksColor});
	}
	$(".quote-public").attr("style", "color: black !important");
	$("#content-bot").css({backgroundColor: "white"});
	$(".sub-title").css({ color:"black"});
	$("ol.ui-breadcrumb a").attr("style", "color: " + linksColor + " !important;");
	$("ol.ui-breadcrumb").first().prependTo("#content-bot").css({padding: "20px", "float": "none"});
	$("#posts").find("tr").attr("style", "background-color:white");
	
	$("#forum-content").css("background-color", "white");
	$(".post-th").css("color", linksColor);
	$(".view-options a").css("color", linksColor);
	$(".post-title a").css("color", linksColor);
	$(".post-status").css("color", "black");
	$(".type-blizzard").css("color", linksColor);
	$(".post-author").css("color", linksColor);
	$(".post-lastPost a").css("color", linksColor);
	$.noConflict();
};

addJQuery(main);