	// ==UserScript==
// @name           Twitter_Hashtag_Filter
// @namespace      http://www.strawjackal.org
// @description    Filters tweets containing the specified hashtag.
// @include        http://twitter.com/*
// ==/UserScript==

var filteredHashtag = "#bbil";

function twitter_getElementsByClassName(classname, node) {

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

function twitter_matchHashtag (text) {

	var re = new RegExp(/\#\w+\b/);
	var matches = re.exec(text);
	for each (match in matches)
	{
		if (match.toLowerCase() == filteredHashtag)
		{
			return true;
		}
	}
	
	return false;

}

function filterHashtags() {

    var tweets = twitter_getElementsByClassName('hentry', null);
	for (var i = 0; i < tweets.length; i++) 
    {
	    var tweet = tweets[i];
		var entry_content = twitter_getElementsByClassName('entry-content', tweet)[0];
		var text = entry_content.innerText ||  entry_content.textContent;
		
		if (twitter_matchHashtag(text))
		{
			tweet.style.display = 'none';
		}	
    }

}

window.addEventListener(
'load',
filterHashtags() ,
true);