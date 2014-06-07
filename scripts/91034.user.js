// ==UserScript==
// @name           /r/WATMM filter
// @namespace      rwatmm
// @description    Filters out 'Listen', 'Promo' & 'WIP' posts on WeAreTheMusicMakers
// @include        http://*.reddit.com/r/WeAreTheMusicMakers*
// @exclude        http://*.reddit.com/r/WeAreTheMusicMakers/comments*

// @license        WTFPL v2
// @author         makeinstall: adapted from lurqur
// @version        0.1 
// @date           22/11/2010

// ==/UserScript==


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 * Copyright (C) 2004 Sam Hocevar
 *  14 rue de Plaisance, 75014 Paris, France
 * Everyone is permitted to copy and distribute verbatim or modified
 * copies of this license document, and changing it is allowed as long
 * as the name is changed.
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var removeL = GM_getValue("removeL", true); //Remove Listen posts?
var removeW = GM_getValue("removeW", false); //Remove Feedback posts?
var removeP = GM_getValue("removeP", false); //Remove Promo posts?

var listenMatch = /[\[\(\{]Listen?[\]\)\}]/i;
var wipMatch = /[\[\(\{]Feedback?[\]\)\}]/i;
var promoMatch = /[\[\(\{]Promo?[\]\)\}]/i;

var posts = document.getElementsByClassName('thing'); //get the list of posts

function removeUnwantedPosts()
{
	if(removeL)
		removePosts(listenMatch);

	if(removeW)
		removePosts(wipMatch);
		
	if(removeP)
		removePosts(promoMatch);
}

function removePosts(regex)
{
	var postsLength = posts.length;
	
	//removing a node changes the index of elements in posts, so we'll use this to choose the post
	var currentElem = 0;
	
	for(i = 0; i < postsLength;  i++)
	{
		var post = posts[currentElem];
		
		if(post != undefined && post.className.indexOf('reddit-link') == -1) //Make sure this isn't a sidebar link
		{
			var title = post.getElementsByTagName('div')[6].childNodes[0].childNodes[0].innerHTML;
			
			if(regex.test(title))
				post.parentNode.removeChild(post); //I'm pretty sure there's a better way to do this
			else
				++currentElem; //we're not removing this post, increase currentElem
		}else{
			++currentElem;
		}
	}
	
	posts = document.getElementsByClassName('thing'); //refresh the list of posts
}

//reappropriate reddit's sidebar for our own purposes
document.body.getElementsByClassName('bottom')[0].innerHTML += "<br /><br />\n" + 
	'<span style="text-decoration: underline">/r/WATMM Post Filter</span><br /><br />' +
	'Show Listen Posts: ' + !removeL + "<br />\n" +
	'Show Feedback Posts: ' + !removeW + "<br />\n" +
	'Show Promo Posts: ' + !removeP + "<br />";

//set the setting's value to the opposite of what it currently is
GM_registerMenuCommand("Toggle Listen Posts", function(){GM_setValue("removeL", !GM_getValue("removeL", true));});

GM_registerMenuCommand("Toggle Feedback Posts", function(){GM_setValue("removeW", !GM_getValue("removeW", false));});

GM_registerMenuCommand("Toggle Promo Posts", function(){GM_setValue("removeP", !GM_getValue("removeP", false));});

removeUnwantedPosts();
