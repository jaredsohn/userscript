// ==UserScript==
// @name ForumW.ca &highlight removal for phpBB2
// @description GreaseMonkey script to rewrite all links without highlight in phpBB2 search results
// @version 1.0
// @include http://fwbb.org/search.php*
// @include http://*.fwbb.org/search.php*
// @include http://forumw.ca/search.php*
// @include http://*.forumw.ca/search.php*
// ==/UserScript==


//script by musictoto & sdevaney(Dev Team for ForumW.ca)

//declare variables
var allLinks, thisLink;

//get all links of the page in an array
allLinks = document.getElementsByTagName('a');
//walk through the array
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
   
   //check if the link has '&highlight' in it.
   if (thisLink.href.match(/\&highlight=/i)) {
    //replace the highlight part + arguments with nothing (so delete it)
    thisLink.href = thisLink.href.replace(/\&highlight=[A-Z0-9._%+-]*/i, "");
    }

}
//end of script