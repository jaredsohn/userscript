// ==UserScript==
// @name          Title Enhancer - Gentoo Forums Search
// @description	  Updates the title of the Gentoo Forums Search Results Page to include what's being searched for. Also updates search box to contain search terms.
// @version       0.2.2
// @date          2007-12-09
// @author        Justin
// @namespace     http://userscripts.org/users/9270
// @include       http://forums.gentoo.org/search.php?*
// ==/UserScript==

var rnone = "No Results"
var radv = "Advanced Search"
var search_ids = new Object();
search_ids["unanswered"] = "Unanswered Posts";
search_ids["last"] = "Posts From Last 24 Hours";
search_ids["newposts"] = "Posts Since Last Visit";
search_ids["egosearch"] = "Your Posts";

var qs = new Querystring();
var search_id = qs.get("search_id");
if ( search_ids[search_id] == null ) {
 var allTopicLinks, firstTopicLink;
 allTopicLinks = document.evaluate(
     "//a[@class='topictitle']",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
 if (allTopicLinks.snapshotLength != 0) {
  firstTopicLink = allTopicLinks.snapshotItem(0);
  ftlh = firstTopicLink.getAttribute("href");
  currentsearch = ftlh.substring(ftlh.indexOf('highlight-') + 10, ftlh.indexOf('.html')).replace(/\+/g," ");
  document.getElementsByName('search_keywords')[0].value = currentsearch
 }
 else { currentsearch = rnone }
}
else { currentsearch = search_ids[search_id] }
if ( currentsearch == "" ) { currentsearch = radv }
document.title = currentsearch + " - Gentoo Forums Search"

// Code From: http://adamv.com/dev/javascript/querystring
/* Client-side access to querystring name=value pairs
	Version 1.2.3
	22 Jun 2005
	Adam Vandenberg
*/
function Querystring(qs) { // optionally pass a querystring to parse
	this.params = new Object()
	this.get=Querystring_get
	
	if (qs == null)
		qs=location.search.substring(1,location.search.length)

	if (qs.length == 0) return

// Turn <plus> back to <space>
// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&') // parse out name/value pairs separated via &
	
// split out each name=value pair
	for (var i=0;i<args.length;i++) {
		var value;
		var pair = args[i].split('=')
		var name = unescape(pair[0])

		if (pair.length == 2)
			value = unescape(pair[1])
		else
			value = name
		
		this.params[name] = value
	}
}

function Querystring_get(key, default_) {
	// This silly looking line changes UNDEFINED to NULL
	if (default_ == null) default_ = null;
	
	var value=this.params[key]
	if (value==null) value=default_;
	
	return value
}