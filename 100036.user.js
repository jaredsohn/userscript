// ==UserScript==
// @name           shackSearchableMe
// @namespace      http://mcjohn.org
// @description    Allow you to click your own username in the masthead to search for your posts
// @include        http://www.shacknews.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var thisUsername = $("#masthead .user").text();
var usernameLink = thisUsername.replace(/ /g, "+");
var userCommentSearchCode = "<a href=\"user/" + usernameLink + "/posts\">" + thisUsername + "</a>";

// Add a search link for your username
$("#masthead .user").html(userCommentSearchCode);

