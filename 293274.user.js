// ==UserScript==
// @name				IM Website Title
// @namespace			http://www.keavon.com/
// @description			Adds a title to pages on InterstellarMarines.com
// @include				http://*.interstellarmarines.com/*
// @include				http://interstellarmarines.com/*
// @version				1.0
// @updateURL			http://userscripts.org/scripts/source/293274.meta.js
// @downloadURL			http://userscripts.org/scripts/source/293274.user.js
// ==/UserScript==
$(document).ready(function ()
{
	var metas = document.getElementsByTagName('meta');
	for (i = 0; i < metas.length; i++)
	{
		if (metas[i].getAttribute("name") == "title")
		{
			var pageTitle = metas[i].getAttribute("content");
		}
	}
	if (pageTitle != null)
	{
		document.title = pageTitle + " | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '') == "forumthreads" || window.location.pathname.replace(/\//g, '') == "forum")
	{
		document.title = "Forum | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '') == "forumfavorites")
	{
		document.title = "Favorites | Forum | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '') == "forumlatest")
	{
		document.title = "Latest Posts | Forum | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '').substring(0, 20) == "forumthreadscategory" && window.location.pathname.indexOf("newtopic") != "-1")
	{
		document.title = "New Thread in " + $("#yui-main .forum-index-title > h2 > a").html() + " | Forum | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '').substring(0, 20) == "forumthreadscategory")
	{
		document.title = $("#yui-main .forum-index-title > h2").html() + " | Forum | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '').substring(0, 14) == "forumthreadsid")
	{
		document.title = $("#yui-main .forum-index-title table h2.forum-list-header").html() + " | Forum | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '') == "store")
	{
		document.title = "Store | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '').substring(0, 4) == "user" && window.location.pathname.indexOf("bullseye") == "-1")
	{
		document.title = $("#container .profile-container .profile-info-td .profile-content h1").html() + "'s Bullseye Scores | Interstellar Marines";
	}
	else if (window.location.pathname.replace(/\//g, '').substring(0, 4) == "user" && window.location.pathname.indexOf("bullseye") != "-1")
	{
		if (window.location.pathname.indexOf("highscores") != "-1")
		{
			document.title = $("#container .profile-container .profile-campaign-button table h1 span a").html() + " Bullseye Highscores | Interstellar Marines";
		}
		else if (window.location.pathname.indexOf("challenges") != "-1")
		{
			document.title = $("#container .profile-container .profile-campaign-button table h1 span a").html() + " Bullseye Challenges | Interstellar Marines";
		}
		else if (window.location.pathname.indexOf("history") != "-1")
		{
			document.title = $("#container .profile-container .profile-campaign-button table h1 span a").html() + " Bullseye Bragging Rights | Interstellar Marines";
		}
		else
		{
			document.title = $("#container .profile-container .profile-campaign-button table h1 span a").html() + " Bullseye Achievements | Interstellar Marines";
		}
	}
});