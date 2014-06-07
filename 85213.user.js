// ==UserScript==
// @name Go Away Tweets
// @namespace		http://www.blogallalong.com
// @description		Greasemonkey script to hide tweets that gets on your nerve
// @include			http://*twitter.com*
// ==/UserScript==
/**
This script will hide and remove content of tweets that contain certain keywords you specify
in the keywords variable. It is case insensitive so be careful what you add here.
Last updated: 2/9/2010
*/

var keywords = new Array();
// case insensitive
keywords[0] = "zwaratkhames"; // This annoying TV show inspired this script
keywords[1] = "vuvuzela"; // they had it coming right?
// add more here
// keywords[2] = ""
// keywords[3] = ""

var tweets = document.getElementsByClassName("hentry");			 
for (i=0; i<tweets.length; i++) {
	for(j=0; j<keywords.length;j++)
	{
		reg= new RegExp(keywords[j],"i");
		if(tweets[i].innerHTML.search(reg) != -1 )
		{
			tweets[i].innerHTML = '';
			tweets[i].style.visibility = 'hidden';
		}
	}
}
