// ==UserScript==
// @name           twitterRemoveTweetsWithKeywords
// @namespace      http://twitter.com/removeTweetsWithKeywords
// @description    Removes Tweets with Certain Keywords
// @include        http://search.twitter.com*
// ==/UserScript==
/**
This script delets tweets that include certain keywords.
Please see instructions below to add, remove, or modify a keyword.
Updated 6.27.2009
*/
var keywords = new Array();
// Please note keywords are case insensitive, tweetboard is same as TweeTBoArd
keywords[0] = "tweetboard";
keywords[1] = "endTheSpam";
/** 
	ADDING a keyword: Simply remove the "//" in front of the following line 
    then write the keyword in between the two " symbols.
**/
//keywords[2] = "";
//keywords[3] = "";
//keywords[4] = "";
//keywords[5] = "";
//keywords[6] = "";
//keywords[7] = "";
//keywords[8] = "";
//keywords[9] = "";
//keywords[10] = "";
//keywords[11] = "";

/* Defining variables */
// Temporary variables
var keyword,li,reg;
var j = 0,i=0;
var limit_keyword = keywords.length;
// Twitter lists tweets as a list item
var lis = document.getElementsByTagName('li');
var limit = lis.length;
var count = 0;
// Look through all list items
for(i=0; i < limit; i++){
	li = lis[i];
	if(li!=null){
		// Tweets have a classname of "result "
		if(li.className=='result '){
			// Search through all keywords
			for(j=0; j<limit_keyword; j++){
				reg= new RegExp(keywords[j],"i");
				if(li.innerHTML.match(reg)){
					try{
						// Remove the tweets containing the specified keywords
						li.innerHTML="";
					}catch(err){
						//ignore
					}
				}else{
				}
			}
		}
	}
}