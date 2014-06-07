// ==UserScript==
// @name           /r/gonewild filter
// @namespace      rgonewild
// @description    Filters out male, female or couples posts on /r/gonewild
// @include        http://*.reddit.com/r/gonewild*
// @exclude        http://*.reddit.com/r/gonewild/comments*

// @license        WTFPL v2
// @author         lurqur
// @version        0.1 "Horny Hedgehog"
// @date           17/11/2009

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

var removeM = GM_getValue("removeM", true); //Remove male posts?
var removeF = GM_getValue("removeF", false); //Remove female posts?
var removeMF = GM_getValue("removeMF", false); //Remove Male + Female posts?

var maleMatch = /[\[\(\{]M(an|ale)?[\]\)\}]/i;
var femaleMatch = /[\[\(\{]F(emale)?[\]\)\}]/i;
var mfMatch = /[\[\(\{]M(an|ale)?\s?(\\|\/|\+|\-)?\s?F(emale)?[\]\)\}]/i;

var posts = document.getElementsByClassName('thing'); //get the list of posts

function removeUnwantedPosts()
{
	if(removeM)
		removePosts(maleMatch);

	if(removeF)
		removePosts(femaleMatch);
		
	if(removeMF)
		removePosts(mfMatch);
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
	'<span style="text-decoration: underline">/r/GoneWild Post Filter</span><br /><br />' +
	'Show Male Posts: ' + !removeM + "<br />\n" +
	'Show Female Posts: ' + !removeF + "<br />\n" +
	'Show Male + Female Posts: ' + !removeMF + "<br />";

//set the setting's value to the opposite of what it currently is
GM_registerMenuCommand("Toggle Male Posts", function(){GM_setValue("removeM", !GM_getValue("removeM", true));});

GM_registerMenuCommand("Toggle Female Posts", function(){GM_setValue("removeF", !GM_getValue("removeF", false));});

GM_registerMenuCommand("Toggle Male + Female Posts", function(){GM_setValue("removeMF", !GM_getValue("removeMF", false));});

removeUnwantedPosts();
