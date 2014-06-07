// ==UserScript==
// @name	ESPN single page format
// @namespace	http://www.mrtall.com/greasemonkey/
// @description	Rewrites ESPN.com main links to display articles in single page format. Version 1.1.  released Apr-12-2005
// @include	*espn.go.com*
// ==/UserScript==

(function() {
  //the key to the single page view is setting the 'num' variable to be 0
  //so this search looks for all links that call the story script or the redirecting x.pl script
  var xpath = "//a[contains(@href, 'story?')] | //a[contains(@href, 'x.pl')]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link, newlink;
  
  for (i = 0; link = res.snapshotItem(i); i++) {


	//now we check if the match is to the story script or the x.pl script
	//if the redirect script is used, pull off the redirecting prefix (x.go.com....)
	//and make it a normal story link (with num=0 specified) in urlencoded format..
	//else if it is the story script, just insert 'num=0' as the first variable
	//passed to the script, 
	//
	if (link.href.search('x.go.com/cgi/x.pl?') != -1) {
  		newlink = link.href.replace('http://x.go.com/cgi/x.pl?goto=','');
  		newlink = newlink.replace('story%3F','story%3Fnum%3D0&');
  		//below, some of the tracking sytem urls are removed 
  		//I'm adding more as I find them, which is revailing a bit of a pattern.  Perhaps a pattern match for them in the next version
  		newlink = newlink.replace('&name=ALSOSEEHeadlines-Story','');
  		newlink = newlink.replace('&name=ncf-SPORTHeadlines-Story','');
  		newlink = newlink.replace('&name=nfl-SPORTHeadlines-Story','');
  		newlink = newlink.replace('&name=nfl-TOPHeadlines-Story','');
  		newlink = newlink.replace('&srvc=sz','');
  		newlink = decodeURIComponent(newlink);
  		link.href = newlink;
  	}else{
  	  link.href = link.href.replace('story?', 'story?num=0&');
  	}  
  }

})();
