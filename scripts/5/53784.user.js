// ==UserScript==
// @name           HideMultipleTrendingTopicTweets
// @namespace      http://twitter.com/HideMultipleTrendingTopicTweets
// @description    Hides Tweets with Multiple Trending Topics
// @include        http://search.twitter.com*
// ==/UserScript==
/**
This script removes tweets that mention more than x number of
trending topics (spam!) from search.twitter.com. I borrowed heavily 
from the script twitterRemoveTweetsWithKeywords, found here:
http://userscripts.org/scripts/show/52543

Customize below!
*/


/*-----------CUSTOMIZE------------*/

// trendingTopicLimit - the number of trending topics you want to
// allow in a tweet. With 2 set, a tweet that includes trending
// topics #iranelection and #neda will show, but one that includes
// #iranelection, #neda, and Michael Jackson will be hidden.
// Set it to 0 and all tweets on a trending topics page will be spam ;)

// showSpamImages - set to true if you want to see the number of
// spam tweets that were removed. X number of spam icons will show
// up at the bottom of the page and you can expand to view them.
// Set to false if you just want to get rid of them and don't care
// how many tweets were removed.

var trendingTopicLimit = 2;
var showSpamImages = true;

/*---------END CUSTOMIZE----------*/




var keywords = new Array();
var spams = new Array();

/* Get Trending Topics */

var hotDiv = document.getElementById('hot');
var tt = hotDiv.getElementsByTagName('li');
var tlimit = tt.length;
var tcount = 0;
var tli;
for(var ti=0; ti < tlimit; ti++){
	tli = tt[ti];
	if(tli!=null){
		var a = tli.getElementsByTagName('a');
		keywords[tcount] = a[0].text;
		tcount++;
	}
}

/* Defining variables */
// Temporary variables
var keyword,li,reg;
var j = 0,i=0;
var limit_keyword = keywords.length;

// Twitter lists tweets as a list item
var lis = document.getElementsByTagName('li');
var limit = lis.length;
var count = 0;
var totalSpam = 0;

// Look through all list items
for(i=0; i < limit; i++){
	li = lis[i];
	if(li!=null){
		// Tweets have a classname of "result "
		if(li.className=='result '){
			// Search through all keywords
			var count = 0;
			for(j=0; j<limit_keyword; j++){
				reg= new RegExp(keywords[j],"i");
				if(li.innerHTML.match(reg)){
					count++;
				}else{
				}
			}
			if(count > trendingTopicLimit) {
				try{
					// Remove the tweets containing the specified keywords
					spams[totalSpam] = li.innerHTML;
					li.innerHTML="";
					li.style.borderBottom = 0;
					li.style.paddingBottom = 0;
					li.style.paddingTop = 0;
					
					totalSpam++;
				}catch(err){
					//ignore
				}
			}
		}
	}
}

//show spam icons (and spams on icon click) if showSpamImages is true
if(showSpamImages && totalSpam > 0){
	var spamImages = new Array();
	var uls = document.getElementById('results').getElementsByTagName('ul');

	uls[0].innerHTML += "<li class='result ' id='spamicons' ></li>";
	var spamli = document.getElementById('spamicons');

	//show spam icons
	spamli.innerHTML += "<img id='closer' src='http://annielausier.com/greasemonkey/open.png'/>";	
	for (var i = 0; i<totalSpam; i++) {
		spamli.innerHTML += "<img id='spam" + i + "' src='http://annielausier.com/greasemonkey/spam.png'/>";
	}

	//populate (but don't show yet) spam tweets
	spamli.innerHTML += "<div id='spamhtml' style='display:none;'></div>";
	var shtml = document.getElementById('spamhtml');
	for(var i = 0; i < totalSpam; i++) {
		shtml.innerHTML += "<br/>" + spams[i];
	}

	//on li click, show/hide spam tweets
	document.getElementById('spamicons').addEventListener("click", function() { var spamhtml = document.getElementById('spamhtml'); var closer = document.getElementById('closer'); if(spamhtml.style.display == 'none') { spamhtml.style.display = 'block'; closer.src = 'http://annielausier.com/greasemonkey/close.png'; } else { spamhtml.style.display = 'none'; closer.src = "http://annielausier.com/greasemonkey/open.png"; } }, true);

}



