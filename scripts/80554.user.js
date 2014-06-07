// ==UserScript==
// @name           subs
// @namespace      http://amy.com
// @description    subs
// @include        http*://*what.cd/
// ==/UserScript==

//config
var del = new Array("NUMBER_GOES_HERE", "NUMBER_GOES_HERE"); //add the ID's of the forums you wish to delete here.

var links = document.getElementsByTagName('a'); //get all links of the page.
	for (var i in links) {
		var alinks = links[i];
		var forumid = alinks.href.split("forums.php?action=viewforum&forumid=")[1]; //if a link contains a forumlink, fetch the id.

		for (var e in del) {
			if (del[e] == forumid) { //if the fetched id matches any value in the del array, continue.
				var deletes = alinks.parentNode.parentNode.parentNode; //get the columns of the forums you wish to delete.
				deletes.style.display = "none"; //remove the columns of the forums you have specified in the del array.
			}
		}
	}

/* INSTRUCTIONS */

/*
Here follows the ID's of all forums; pick the ones you don't want to keep and then simply add them to the del array at the top of the script.
For example, the array should look something like this if you want to remove The Lounge and The Library:

var del = new Array("7", "26");

------------------------------------------------------------

Forum ID's:

Announcements: 19
What.CD: 13
The Laboratory: 43
Suggestions / Ideas: 9
Bugs: 27
The Lounge: 7
The Library: 26
Comics: 37
Technology: 20
Music: 17
Vanity House: 25
The Studio: 40
Offered: 15
Vinyl: 36
Help: 8
Tutorials: 18
BitTorrent: 14
Resolved Bugs: 32
Trash: 12

Note: not all forum ID's are in this legend, simply because there are tons of user restricted forums that shouldn't be exposed to everyone.
If you can see other forums than the ones in this list, you can still use them. Check the link to them for the ID, where it should be at the end of the link.

Enjoy!
*/