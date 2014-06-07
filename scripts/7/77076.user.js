// ==UserScript==
// @name           ImNotGoing Serious
// @namespace      sluniversetools
// @description    Make it easier to take ImNotGoing Sideways seriously. ILU Immy but your faces scare me.
// @include        http://www.sluniverse.com/php/vb/*/*.html*
// @exclude        *.php

// @license        WTFPL v2
// @author         Hazim Gazov
// @version        0.1b "Leperous Lion"
// @date           19/05/2010

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

function rewriteImmyPosts()
{
	var aCoolUser = /^\s?Imnotgoing Sideways\s?$/;
	var eyeChars = "O|\\<|\\>|\\^|\\=|\\_|\\-|\\.|\\@|\\*|\\&gt\\;|\\&lt\\;|T|\;";
	var mouthChars = "\\_|\\-|\\.|\\'";
	var faceOpenChars = "\\[|\\(|\\{";
	var faceCloseChars = "\\]|\\)|\\}";
	var possibleAccessories = "y|Y";

	var faceRegex = new RegExp("(\\s+)?(" + faceOpenChars + ")(" + eyeChars + ")(" + mouthChars + ")" + //half the face is done...
									"(" + eyeChars + ")(" + faceCloseChars + ")(" + possibleAccessories + ")?(\\s+)?", "g"); //great, will match the full face and possible "accessories"
									
	var validPostId = /td_post_\d+/;

	var possiblePosts = document.getElementsByClassName('alt1'); //get the list of possible posts
	
	var postsLength = possiblePosts.length;
	
	for(i = 0; i < postsLength;  i++)
	{
		var post = possiblePosts[i];
		
		if(post !== undefined && validPostId.test(post.id))
		{
			var posterNameDiv = post.id.replace("td_post_", "postmenu_"); //magic!
			posterName = document.getElementById(posterNameDiv).childNodes[1].textContent; //more magic!
			
			if(aCoolUser.test(posterName)) //this user is cool, do cool things to their message
			{
				var postContentDiv = document.getElementById(post.id.replace("td_post_", "post_message_"));
				var postContent = postContentDiv.innerHTML.replace(faceRegex, "$1");
				postContentDiv.innerHTML = postContent;
			}
		}
	}
}

rewriteImmyPosts();
