// ==UserScript==
// @name           Jamendo "fave" sig, semi-automatic
// @namespace      tag:brainonfire.net,2007-04-26:jamendofavesig
// @description    Add a button to each forum post to show the "fave albums" image, if not already there.
// @include        http://www.jamendo.com/*
// ==/UserScript==


/* Narrow include for security */
if(!new RegExp("^http://www\.jamendo\.com/[a-z]{2}/forums/discussion/[0-9]+/").test(location))
{
	return;
}

/* Adapted from http://wiki.greasespot.net/Code_snippets */
function $x(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}


function handleComment(comm, commDex, allComm)
{
	var username = $x("div[@class='CommentHeader']/ul/li[1]/a[contains(@href, '/forums/account/')]/text()", comm)[0].nodeValue;
	var favesSrc = "http://www.jamendo.com/en/favouritealbums/" + username + "/white.jpg";
	var commBody = $x("div[@class='CommentBody']", comm)[0];
	if($x(".//img[starts-with(@src, 'http://www.jamendo.com/en/favouritealbums/')]", commBody).length > 0)
		return;

	function showFaves()
	{
		var img = document.createElement('img');
		img.setAttribute('src', favesSrc);
		img.setAttribute('alt', 'Favorite albums of '+username);
		img.style.display = "block";
		this.parentNode.replaceChild(img, this);

		this.removeEventListener('click', showFaves, false);//prevent potential memory leak

		return false;
	}

	var butt = document.createElement('button');
	butt.appendChild(document.createTextNode("[faves]"));
	butt.style.display = "block";
	butt.addEventListener('click', showFaves, false);
	commBody.appendChild(butt);
}

$x("//ol[@id='Comments']/li").forEach(handleComment);
