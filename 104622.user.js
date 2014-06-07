// ==UserScript==
// @name           Hide Toronto Mike Users
// @namespace      torontomike
// @include        http://www.torontomike.com/
// @include        http://*.torontomike.com/
// @include        http://www.torontomike.com/*
// @include        http://*.torontomike.com/*

// ==/UserScript==


var blacklist = ["cheryl", "argie", "irvine"]; // ["cheryl", "any other name", "seperated by comma"] not case sensitive
var comments = document.getElementsByClassName("comment"); // Get all comments
var i;
var comment; 
var user;

for(i = 0; i < comments.length; i++)
{
	var hide = false;
	comment = comments[i];
	user = comment.getElementsByTagName("p")[0].getElementsByClassName("bigger")[0].textContent;


	for (blacklist_count = 0; blacklist_count < blacklist.length; blacklist_count++)
	{
		if (user.toUpperCase() == blacklist[blacklist_count].toUpperCase())
		{

			comment.style.display = "none";
			break;
		}
	}

} // End comment loop


