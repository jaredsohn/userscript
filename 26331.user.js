// ==UserScript==
// @name           Digg Top Ten Normalizer
// @namespace      http://www.neaveru.com/
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

location.href = "javascript:(" + encodeURI(function() 
{
    var topTenList = document.getElementById("topten-list");
    if (window.topTenStories && window.topTenStories.stories && window.topTenStories.stories.length && topTenList)
    {
	var stories = window.topTenStories.stories;
	for (var i = 0; i < stories.length; i++)
	{
	    var story = stories[i];
	    var node = document.evaluate(
		"./div/h3/a[@href='" + story.href + "']",
		topTenList,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null).singleNodeValue;
	    if (!node) continue;
	    node.href = story.link;
	    node.title = story.description;
	    var commentLink = document.createElement("a");
	    commentLink.href = story.href;
	    commentLink.appendChild(document.createTextNode(" (" + story.comments + " Comments)"));
	    //commentLink.className = 'tool comments';
	    node.parentNode.insertBefore(commentLink, node.nextSibling);
	}
    }
}) + ")()";
