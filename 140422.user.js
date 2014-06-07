// ==UserScript==
// @name        Derpibooru Comment Highlighter
// @namespace   http://derpiboo.ru
// @description Highlights the images with unread comments in the thumbnail view
// @include     /^https?://(.+\.)?derpiboo(ru\.org|.ru)/[0-9]+/
// @include     /^https?://(.+\.)?derpiboo(ru\.org|.ru)/
// @include     /^https?://(.+\.)?derpiboo(ru\.org|.ru)/tags/
// @include     /^https?://(.+\.)?derpiboo(ru\.org|.ru)/search/
// @include     /^https?://(.+\.)?derpiboo(ru\.org|.ru)/images/
// @version     1.7.9
// @grant       none
// ==/UserScript==

// Fetch saved comment counts
var jsonComments = localStorage.getItem("commentCounts");

if (jsonComments == null)
	var comments = new Object();
else
	var comments = eval ("(" + jsonComments + ")"); 

var pathMatches = window.location.pathname.match(/^\/([0-9]+)/);

if (pathMatches)
{
	// Check comments (image view)
	var id = pathMatches[1];	
	var divs = document.getElementsByTagName("div");

	for (i=0; i<divs.length; i++)
	{
		if (divs[i].className == "metabar")
		{
			var sections = divs[i].getElementsByTagName("div");	
			
			for (si=0; si<sections.length; si++)
			{
				var matches = sections[si].innerHTML.match(/<span class="comments_count"[^>]*>([0-9]+)<\/span>/)
				
				if (matches && matches.length == 2)
				{				
					comments[id] = matches[1];

					break;
				}
			}
			
			break;
		}
	}
}
else 
{
	// Check comments (thumbnail view)
	var divs = document.getElementsByTagName("div");

	for (i=0; i<divs.length; i++)
	{
		if (divs[i].className == "image normalimage" || divs[i].className == "image bigimage")
		{
			var innerDivs = divs[i].getElementsByTagName("div");

			if (innerDivs.length > 0)
			{
				var html = innerDivs[0].innerHTML.replace(/(\r\n|\n|\r)/gm, "");

				// Get index
				var matches = html.match(/href="\/([0-9]+)#comments/);
				
				if (matches)
				{
					var id = parseInt(matches[1]);

					// Get comments count
					var innerSpans = innerDivs[0].getElementsByTagName("span");
					
					for (is=0; is<innerSpans.length; is++)
					{
						if (innerSpans[is].className == "comments_count")
						{
							var commentCount = innerSpans[is].innerHTML;
							
							// Fix corrupted comment counts
							if (comments[id] !== null && isNaN(comments[id]))
								comments[id] = 0;
						
							//console.log('Id: %s, comments: %s, %s', id, comments[id], commentCount);

							// Highlight if necessary
							if (commentCount > 0 && (comments[id] == null || commentCount > parseInt(comments[id])))
							{
								//console.log("thumbnail highlighted");
								
								var unreadComments = (comments[id] != null) ? commentCount - comments[id] : commentCount;
								
								innerDivs[0].title = unreadComments + " unread comment(s)";
								innerDivs[0].style.backgroundColor = "#ffcc00";

								divs[i].style.borderColor = "#ffcc00";
								divs[i].style.borderWidth = "2px";
								
								var style = divs[i].currentStyle || window.getComputedStyle(divs[i]);

								divs[i].style.marginTop = style.marginTop.replace("px", "") - 1 + "px";
								divs[i].style.marginLeft = style.marginLeft.replace("px", "") - 1 + "px";
								divs[i].style.marginRight = style.marginRight.replace("px", "") - 1 + "px";
								divs[i].style.marginBottom = style.marginBottom.replace("px", "") - 1 + "px";
							}
							
							break;
						}
					}
				}
			}
		}
	}
}

// Save only entries with more than zero comments
var newComments = new Object();

for(var id in comments)
{
	if (comments.hasOwnProperty(id) && comments[id] != 0)
		newComments[id] = comments[id];
}

// Save comment counts
var jsonComments = JSON.stringify(newComments);
localStorage.setItem("commentCounts", jsonComments);
