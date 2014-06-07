// ==UserScript==
// @name		digg Link and Highlight Your Comments
// @namespace	http://jeolmeun.blogspot.com/
// @description	Display a list of links to your yellow highlighted digg comments.
// @include		http://digg.com*
// @include		http://www.digg.com*
// @exclude
// ==/UserScript==

var tag;
var tags = document.getElementsByTagName( 'a' );
var username = "";
var commentid = "";
var commentids = "";

// Find user name and comments.
for ( var i = 0; i < tags.length; i++ )
{

	tag = tags[ i ];

	if (username == "")
	{
	
		// Find user name.
		if ( tag.href.indexOf( "/users/" ) < 0 || tag.innerHTML.indexOf( " profile" ) < 0 ) continue;

		// Save user name.
		username = tag.href;

	}
	else
	{
	
		// Find comments.
		if ( tag.href != username || tag.parentNode.parentNode.className != "c-info") continue;

		commentid = tag.parentNode.parentNode.parentNode.id;
		
		if (commentid == "") continue;
		
		// Highlight yellow.
		tag.parentNode.parentNode.style.backgroundColor = "#ffff00";

		// Add id to list.
		commentids = commentids + ' <a href="#' + commentid + '">' + commentid + '</a>';

	}

}

// Display the list.
if ( commentids != "" )
{

	var mainNode = document.getElementById("main0");
	var commentlist = document.createElement("div");

	mainNode.parentNode.insertBefore(commentlist, mainNode.nextSibling);

	commentlist.innerHTML = '<br />Your comment(s):' + commentids;
	
}