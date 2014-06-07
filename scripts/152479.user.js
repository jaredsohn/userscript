// ==UserScript==
// @name        sI Tweaker
// @namespace   Doodles
// @description Tweaks the Surf-Infamous.com forums for BEST VIEWING.
// @include     http://www.surf-infamous.com/*
// @version        1.1
// @grant          none
// ==/UserScript==

//
// FUNCTION SETTINGS - to deactivate a function replace "true" with "false"
//

// Remove Spoiler Tag
var funcSpoiler = true;
// Remove Steam Banner
var funcSteamBanner = true;
// Remove Images from Signatures
var funcSigImg = true;
// Condense Like Panel
var funcLike = true;
// Condense Document Title
var funcTitle = true;
// Condense Poster Details Panel
var funcDetails = true;
// Reset Hash Anchor
var funcResetAnchor = true;
// 100% Page Width
var funcFullWidth = true;
// Enlarge Small Text
var funcEnlargeText = true;

//
// FUNCTIONS - Do not edit after this point
//

// Remove Spoiler Tag
if(funcSpoiler)
{
	if(document.URL.indexOf("viewtopic.php") != -1 || document.URL.indexOf("posting.php") != -1)
	{
		var pageText = document.body.innerHTML;
		pageText = pageText.replace(/<span style="color:#BF0000;">SPOILER \| <\/span><span style="color:#232323;">/g, '<span style="color:#BF0000;">[spoiler] </span>');
		pageText = pageText.replace(/<\/span><span style="color:#BF0000;"> \| END SPOILER<\/span>/g, '<span style="color:#BF0000;"> [/spoiler]</span>');
		document.body.innerHTML = pageText;
	}
}

// Remove Steam Banner
if(funcSteamBanner && document.URL.indexOf("viewtopic.php") != -1)
{
	var steamDivs = document.getElementsByTagName("div");
	var steamToRemove = [];
	for (var i = 0; i < steamDivs.length; i++) 
	{
		if(steamDivs[i].className == "steamprofile") 
		{
			steamToRemove.push(steamDivs[i]);
    	}
	}
	for(var i = 0; i < steamToRemove.length; i++)
	{
		steamToRemove[i].parentNode.removeChild(steamToRemove[i]);
	}
}

// Remove Images from Signatures
if(funcSigImg && document.URL.indexOf("viewtopic.php") != -1)
{
	var imgDivs = document.getElementsByTagName("div");
	for (var i = 0; i < imgDivs.length; i++) 
	{
		if(imgDivs[i].className == "signature") 
		{
			var images = imgDivs[i].getElementsByTagName("img");
			while(images.length > 0) 
			{
				images[0].parentNode.removeChild(images[0]);
			}
			while(imgDivs[i].innerHTML.substring(0,4) == "<br>")
			{
				imgDivs[i].innerHTML = imgDivs[i].innerHTML.substring(4);
			}			
    	}
	}
	
	// add the <br> thing
}

// Condense Like Panel
if(funcLike && document.URL.indexOf("viewtopic.php") != -1)
{
	// remove rating crap
	var ratings = document.getElementsByTagName("dt");
	for (var i = 0; i < ratings.length; i++) 
	{
		var likeText = ratings[i].innerHTML;
		if(likeText.substring(0,15) == "<strong>Rating:") 
		{
			var ratingContainer = ratings[i].parentNode.parentNode;
			ratingContainer.parentNode.removeChild(ratingContainer);
    	}
	}
	// build like lists
	var likesPlural = [];
	var likesSingle = [];
	var likes = document.getElementsByTagName("dl");
	for (var i = 0; i < likes.length; i++) 
	{
		var likeText = likes[i].getElementsByTagName("dt")[0].innerHTML;
		if(likeText.substring(0,20) == "This post was liked:") 
		{
			likesPlural.push(likes[i]);
    	}
		else if(likeText.substring(0,23) == "This post was liked by:") 
		{
			likesSingle.push(likes[i]);
    	}
	}
	// condense like lists
	for(var i = 0; i < likesPlural.length; i++)
	{
		var likeText = likesPlural[i].getElementsByTagName("dt")[0].innerHTML;
		var finalText = likeText.substring(21) + " likes: ";
		var likedByText = likesPlural[i].getElementsByTagName("dd")[0].innerHTML;
		likedByText = likedByText.replace(/ • /g, ', ');
		likedByText = removeDays(likedByText);
		var likeContainer = likesPlural[i].parentNode;
		likeContainer.style.fontSize = "1.1em";
		likeContainer.innerHTML = finalText + likedByText;
	}
	for(var i = 0; i < likesSingle.length; i++)
	{
		var likedBy = likesSingle[i].getElementsByTagName("dd");
		var likeContainer = likesSingle[i].parentNode;
		likeContainer.style.fontSize = "1.1em";
		likeContainer.innerHTML = "1 likes: " + likedBy[0].innerHTML;
	}
}

// Condense Poster Details Panel
if(funcDetails)
{
	if(document.URL.indexOf("viewtopic.php") != -1)
	{
		var detailDivs = document.getElementsByTagName("div");
		for (var i = 0; i < detailDivs.length; i++) 
		{
			if(detailDivs[i].className == "profile-details") 
			{
				var ps = detailDivs[i].getElementsByTagName("p");
				var newText = "";
				for(var j = 0; j < ps.length; j++)
				{
					var t = ps[j].innerHTML;
					if(t.substring(0,15) == "<strong>Joined:")
					{
						t = removeDays(t);
						t = t.substring(0, t.length - 8);
						newText = newText + t + "<br>";
					}
					else if(t.substring(0,23) == "<strong>Has&nbsp;liked:")
					{
						t = t.replace("<strong>Has&nbsp;liked:</strong> ", "");
						t = t.replace(" times", "");
						newText = newText + "Liked: " + t + " - ";
					}
					else if(t.substring(0,24) == "<strong>Have&nbsp;likes:")
					{
						t = t.replace("<strong>Have&nbsp;likes:</strong> ", "");
						t = t.replace(" times", "");
						newText = newText + "Likes: " + t;
					}
					else
					{
						newText = newText + t + "<br>";	
					}
				}
				detailDivs[i].innerHTML = newText;
			}
		}
	}
	else if(document.URL.indexOf("ucp.php?i=pm") != -1)
	{
		var detailDivs = document.getElementsByTagName("div");
		for (var i = 0; i < detailDivs.length; i++) 
		{
			if(detailDivs[i].className == "profile-details") 
			{
				var ps = detailDivs[i].getElementsByTagName("p");
				var newText = "";
				for(var j = 0; j < ps.length; j++)
				{
					var t = ps[j].innerHTML;
					if(t.substring(0,15) == "<strong>Joined:")
					{
						t = removeDays(t);
						t = t.substring(0, t.length - 8);
						newText = newText + t + "<br>";
					}
					else
					{
						newText = newText + t + "<br>";	
					}
				}
				detailDivs[i].innerHTML = newText;
			}
		}
		var ranks = document.getElementsByTagName("p");
		for (var i = 0; i < ranks.length; i++) 
		{
			if(ranks[i].className == "profile-rank") 
			{
				ranks[i].innerHTML = ranks[i].innerHTML.split("<br>")[1];
			}
		}
	}
}

// Condense Document Title
if(funcTitle)
{
	if(document.URL.indexOf("viewtopic.php") != -1)
	{
		document.title = document.title.replace("Surf-Infamous • View topic - ", "Thread: ");
	}
	else if(document.URL.indexOf("index.php") != -1)
	{
		document.title = "Index";
	}
	else if(document.URL.indexOf("search.php?search_id=unanswered") != -1)
	{
		document.title = "Unanswered Posts";
	}
	else if(document.URL.indexOf("search.php?search_id=unreadposts") != -1)
	{
		document.title = "Unread Posts";
	}
	else if(document.URL.indexOf("search.php?search_id=newposts") != -1)
	{
		document.title = "New Posts";
	}
	else if(document.URL.indexOf("search.php?search_id=unreadposts") != -1)
	{
		document.title = "Unread Posts";
	}
	else if(document.URL.indexOf("search.php?search_id=active_topics") != -1)
	{
		document.title = "Active Threads";
	}
	else if(document.URL.indexOf("search.php?") != -1)
	{
		document.title = "Search Results";
	}
	else if(document.URL.indexOf("search.php") != -1)
	{
		document.title = "Search";
	}
	else if(document.URL.indexOf("viewforum.php") != -1)
	{
		document.title = document.title.replace("Surf-Infamous • View forum - ", "Forum: ");
	}
	else if(document.URL.indexOf("faq.php") != -1)
	{
		document.title = "FAQ";
	}
	else if(document.URL.indexOf("donate.php") != -1)
	{
		document.title = "Donate";
	}
	else if(document.URL.indexOf("memberlist.php?mode=leaders") != -1)
	{
		document.title = "Forum Staff";
	}
	else if(document.URL.indexOf("memberlist.php") != -1)
	{
		if(document.URL.indexOf("mode=email") != -1)
		{
			document.title = "Email";
		}
		else
		{
			document.title = "Members";
		}
	}
	else if(document.URL.indexOf("ucp.php?i=main&mode=subscribed") != -1)
	{
		document.title = "Subscribed Threads";
	}
	else if(document.URL.indexOf("ucp.php") != -1)
	{
		document.title = document.title.replace("Surf-Infamous • ", "");
		document.title = document.title.replace(" • ", ": ");
	}
	else if(document.URL.indexOf("mcp.php") != -1)
	{
		document.title = document.title.replace("Surf-Infamous • Moderator Control Panel • ", "MCP: ");
		document.title = document.title.replace("MCP: ", ": ");
	}
	else if(document.URL.indexOf("posting.php?mode=reply") != -1)
	{
		var titles = document.getElementsByTagName("h2");
		if(titles.length == 1)
		{
			var threadTitle = titles[0].childNodes[0].innerHTML;
			if(threadTitle == null)
			{
				document.title = "New Post Submitted";
			}
			else
			{
				document.title = "New Post: " + threadTitle;
			}
		}
		else
		{
			document.title = "New Post";
		}
	}
	else
	{
		document.title = document.title.replace("Surf-Infamous • ", "");
	}
}

// Reset Hash Anchor
if(funcResetAnchor)
{
	if(location.href.indexOf("#") != -1)
	{
		resetHashAnchor();
	}	
}

// Enlarge Small Text
if(funcEnlargeText)
{
	var textDivs = document.getElementsByTagName("div");
	for (var i = 0; i < textDivs.length; i++) 
	{
		if(textDivs[i].className == "postbody") 
		{
			var textSpans = textDivs[i].getElementsByTagName("span");
			for(var j = 0; j < textSpans.length; j++)
			{
				var fontSi = textSpans[j].style.fontSize;
				fontSi = fontSi.replace('%', '');
				if(fontSi != null && fontSi != "")
				{
					if(parseInt(fontSi) < 85)
					{
						textSpans[j].style.fontSize = "100%";
						var newSpanText = '<span style="color:#00BFFF;">[' + fontSi + '] </span>';
						newSpanText = newSpanText + textSpans[j].innerHTML;
						newSpanText = newSpanText + '<span style="color:#00BFFF;"> [/' + fontSi + ']</span>';
						textSpans[j].innerHTML = newSpanText;
					}
				}
			}
    	}
	}		
}

// 100% Page Width
if(funcFullWidth)
{
	document.getElementById('header').style.width = '100%';
	document.getElementById('content').style.width = '100%';
	document.getElementById('footer').style.width = '100%';
}

//
// INTERNAL FUNCTIONS
//

function removeDays(text)
{
	text = text.replace(/Sun |Sat /g, '');	
	text = text.replace(/Mon /g, '');
	text = text.replace(/Tue /g, '');	
	text = text.replace(/Wed /g, '');	
	text = text.replace(/Thu /g, '');	
	text = text.replace(/Fri /g, '');	
	//text = text.replace(/Sat /g, '');	
	return text;
}

function resetHashAnchor()
{
     if (window.onload)
     {
		location.href = location.href;
     } else {
        setTimeout('resetHashAnchor();', 1000)
     }
}