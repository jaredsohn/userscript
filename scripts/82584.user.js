// ==UserScript==
//Written by Guy Sheffer (GuySoft) <guysoft@gmail.com>
// @name           Twitter Unicode Hashtags + RTL support
// @namespace      http://twitter.com/* http://www.twitter.com/*
// @description    Adds search links to Unicode hashtugs, AND RTL support! (tested Hebrew, Arabic and Chinese)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// @version        2010-12-01
// ==/UserScript==

/**
 * Function to get an Element by its class name. Used to get the elements that apear when you highlight a tweet (so we can flip them for the RTL addon)
 */
function twitterFlip_getElementsByClassName(classname, node) {

    if (!node) 
	{ node = document.getElementsByTagName("body")[0]; }
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
	{
        if (re.test(els[i].className))
		{
			a.push(els[i]);
		}
	}
    return a;
}


/**
 *Subrutine to flip stuff back to RTL that need to be RTL (like retweet, timestamp)
 */
function LTRClass(className,tweet){
		var actions_hover = twitterFlip_getElementsByClassName(className, tweet)[0];
		
		if(actions_hover != null){//sanity check, so we dont break the javscript
		  actions_hover.style.direction='ltr';
		  actions_hover.style.textAlign = 'left';
		}
}

/**
 *Subrutine to update RTL tags to go the right direction
 */
function alignRTLLanguages(tweet) {
	var isThereRTLChars=/.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
	//var tweets=document.getElementsByClassName(this.tweetSpanClassName);

	//get tweet text by getting the first entry-content element
	if(tweet != null){
		var tweetText = tweet.innerHTML;
	//alert(tweetText);
	var tweetTextStripped = tweetText.replace(/(<([^>]+)>)/ig,"");//strip HTML from words
	var tweetWords = tweetTextStripped.split(" ");
	if(tweetWords != null && tweetWords.length > 1){
	 	 var tweetFirstWords = tweetWords[0];
	 	 
	 	 /* Checking the first two words, becuase we want people to be able to do
	 	    @username [rtl] */
	 	 var wordCount = 3;//number of first words to check
	 	 var i=1;
	 	 while (tweetWords.length >= i && i<wordCount){
	 	 	 tweetFirstWords += tweetWords[i];
	 	 	 i++;
	 	 }
	}
	
	if (isThereRTLChars.test(tweetFirstWords)) {//test if the first word is RTL language
		tweet.style.direction="rtl";
		tweet.style.textAlign="right";
		tweet.style.display="block";

		//update hover
		//LTRClass('entry-meta',tweet);
		
		//update retweeted location to the left
		//LTRClass('meta entry-meta retweet-meta',tweet);
		
		var tweeter_screen_name = twitterFlip_getElementsByClassName('screen-name', tweet)[0];
		if(tweeter_screen_name != null){
			tweeter_screen_name.style.unicodeBidi = 'embed';
		}
	}
  }
};


/**
 * Subrutine that runs and updates each tweet with the required hashtag
 **/
updateTags(function(tweet) {
	//code here will run on each tweet
	//"(\#)([^\x00-\x7F\]*)([>< \.\,\*\)\(])"
	var re = /(#)([^\x00-\x7F]+([_.][^\x00-\x7F]+)*)/g;//Should capture all non-Latin chars
	//var re = new RegExp(matchMe,"g");
	var urlStart="<a href=\"http://twitter.com/search?q=$2\" title=\"$2\" class=\"tweet-url hashtag\" rel=\"nofollow\">";//the a tag of the twitter hashtags (does not support the #, its all twitters fault :( )
	var a =  tweet.innerHTML.replace(re, urlStart + "$1$2" + "</a>");
	tweet.innerHTML = a;
      //alert(tweet.innerHTML);
      //align if needed, but ONLY the internal text
      alignRTLLanguages(tweet.getElementsByClassName("entry-content")[0]);//This new feature, might be a start for something bigger
});

		

// runOnTweets/updateTags - http://userscripts.org/scripts/show/82719
// By: themiddleman - http://userscripts.org/users/56580
// Send this a function to run once on each tweet as soon as it is loaded.
function updateTags(callback) {
	function hasClass(elm, className) {
		var classes = elm.getAttribute("class").split(" ");
		for(var i = 0; i < classes.length; i++) {
			if(classes[i] === className) {
				return true;
			}
		}
		return false;
	}
	// tweets on page load.
	var statuses = document.getElementsByClassName("status");
	statusesLength = statuses.length;
	for(var i = 0; i < statusesLength; i++) {
		callback(statuses[i]);
	}
	document.addEventListener("DOMNodeInserted", function(e) {
		// tweets loaded after the page was loaded.
		if(hasClass(e.target, "status")) {
			callback(e.target);
		}
		// When twitter loads a new page via ajax the tweets are all in a <ol>.
		if(hasClass(e.target, "statuses")) {
			var statuses = e.target.getElementsByTagName("li");
			for(var i = 0; i < statuses.length; i++) {
				callback(statuses[i]);
			}
		}
	}, true);
}

//alert(":)"); //debug