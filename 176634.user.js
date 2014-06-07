// ==UserScript==
// @name		Basic Ignore Script - RSI Forum
// @author		Baragoon
// @version		v1.1
// @description	Remove all trace of people you do not want to read in the RSI forums
// @grant       none
// @include     https://forums.robertsspaceindustries.com/*
// ==/UserScript==

// Block list array - Enter the people you want to ignore here. Contain the Handle in quotes and separate by commas

var blockList = ["Baragoon","Citizen1","Citizen2","etc"];

// For those knobends who think it will be super funny and cool to make a post saying they will use it to ignore me,
// I have added my name in the list already. I love the idea of you using something I made to ignore me.

// ******************************************************************************
// This is where the magic happens
var threadContainer = $("li.Item");var postContatiner = $("li.comment-container");var quoteContatiner = $("blockquote.UserQuote");for (var i = 0; i < blockList.length; i++){threadContainer.each(function(){var thread = $(this);var threadFlag = thread.find("p.started-name:contains('"+blockList[i]+"');");if (threadFlag.length > 0){thread.hide();}});postContatiner.each(function(){var post = $(this);var postFlag = post.find("a.Username:contains('"+blockList[i]+"');");if (postFlag.length > 0){post.hide();}});quoteContatiner.each(function(){var quote = $(this);var quoteFlag = quote.find("div.QuoteAuthor:contains('"+blockList[i]+"');");if (quoteFlag.length > 0){quote.before("<blockquote><br/><i>This quote conatins a quote from ignored citizen and as such the entire quote has been removed.<i></blockquote>");quote.hide();}});}
// ******************************************************************************