// ==UserScript==
// @name		Rating System 2.0 Helper Script
// @namespace     Your Mother
// @description	Adds rating images and rating icons to everyone's posts for Robnik93's Rating System 2.0.
// @author		Dark Jirachi
// @include	http://forums.facepunchstudios.com/*
// ==/UserScript==

if (!GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey, dumbass!');
    return;
}

function setratingimage( e ) {
	var style = prompt("Enter a rating image style (default, blue, green, spore, metal, plox, tf2_1, tf2_2)", GM_getValue("ratingstyle", "default"));
	
	GM_setValue("ratingstyle", style);
	alert('Style Set to ' + style);
};

function togglebox( e ) {
	var box = confirm("Use a box in the rating images?");
	
	if(box)
	{
		GM_setValue("ratingbox", true);
		alert('Rating boxes enabled');
	}
	else
	{
		GM_setValue("ratingbox", false);
		alert('Rating boxes disabled');
	}
};

function togglegloss( e ) {
	var gloss = confirm("Add gloss to the rating images?");
	
	if(gloss)
	{
		GM_setValue("ratinggloss", true);
		alert('Gloss enabled');
	}
	else
	{
		GM_setValue("ratinggloss", false);
		alert('Gloss disabled');
	}
};

GM_registerMenuCommand("Set Rating Image", setratingimage);
GM_registerMenuCommand("Toggle Rating Boxes", togglebox);
GM_registerMenuCommand("Toggle Rating Gloss", togglegloss);

// Main function, runs on page load
(function() {
	var usersdats, thisuser, ndiv, postid, id, image, box, gloss, postNum;
	
	// Find all divs with a class of "userinfo", these are only in posts
	usersdats=document.evaluate("//div[@class=\"userinfo\"]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < usersdats.snapshotLength; i++) {
		thisuser = usersdats.snapshotItem(i);
		
		// Gets the "id" of the post - this is something like "post13371337" - and grabs everything except for "post"
		postid = thisuser.parentNode.id;
		id = postid.substring(4)
		
		// Checks for the image, box, and gloss settings		
		image = GM_getValue("ratingstyle", "default");
		
		if(GM_getValue("ratingbox", false) == true)
		{
			box = "&b";
		}
		else if(GM_getValue("ratingbox", false) == false)
		{
			box = "";
		}
		
		if(GM_getValue("ratinggloss", false) == true)
		{
			gloss = "&g";
		}
		else if(GM_getValue("ratinggloss", false) == false)
		{
			gloss = "";
		}
		
		// Inserts the main rating code
		ndiv = document.createElement('div')
		ndiv.align = "right";

		ndiv.innerHTML = "<table><tbody><tr><td><a href=\"http://85.11.28.249/ratings/index.php?page=insert&rating=agree&id=" + id + "\" target=\"_new\"><img src=\"images/rate/agree.png?1\"/></a><br/><a href=\"http://85.11.28.249/ratings/index.php?page=insert&rating=disagree&id=" + id + "\" target=\"_new\"><img src=\"images/rate/disagree.png?1\"/></a><br/><a href=\"http://85.11.28.249/ratings/index.php?page=insert&rating=winner&id=" + id + "\" target=\"_new\"><img src=\"images/rate/winner.png?1\"/></a><br/><a href=\"http://85.11.28.249/ratings/index.php?page=insert&rating=funny&id=" + id + "\" target=\"_new\"><img src=\"images/rate/funny.gif?1\"/></a><br/><a href=\"http://85.11.28.249/ratings/index.php?page=insert&rating=zing&id=" + id + "\" target=\"_new\"><img src=\"images/rate/zing.png?1\"/></a></td><td><img src=\"http://85.11.28.249/ratings/index.php?page=show&type=img&id=" + id + "&t=" + image + box + gloss + "\"/></td></tr></tbody></table>";

		thisuser.parentNode.appendChild(ndiv)
		
		// Adds the post ID to the post header, just for the hell of it
		postNum = thisuser.parentNode.childNodes[1].childNodes[1];
		postNum.innerHTML = postNum.innerHTML + " (" + id + ")";
	};
})();
