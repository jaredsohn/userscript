// ==UserScript==
// @name          Remove YouTube Dislike Bar Comments
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Removes comments on the Youtube dislike bar -- "32 people can't appreciate music," etc.
// @include       http://www.youtube.com/*
// @include       http://youtube.com/*
// ==/UserScript==

removeDislikeBarComments = function()
{
	var allComments = document.querySelectorAll("li.comment");
	for (var i = 0; i < allComments.length; i++)
	{
		var commentDiv = allComments[i];
		var commentText = commentDiv.querySelectorAll(".comment-text")[0].innerHTML;
		
		if(commentText.search(/[0-9]+[ \t]people/i) != -1 ||
			commentText.search(/dislike/i) != -1 ||
			commentText.search(/b(ie|ei)ber/i) != -1)
		{
			allComments[i].parentNode.removeChild(allComments[i]);
		}
	}
}

setTimeout(removeDislikeBarComments, 200);