// ==UserScript==
// @name           CN_Ignore_Posters
// @namespace      CN_Poster
// @description    A script for completely removing from view posts, threads, and quoted text from users set to 'ignore'. (375 lines total, 256 lines code)
// @include        http://forums.cybernations.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

/*
Settings - type 'true' for all of the features you wish to be activated, and 'false' for 
those you do not.
*/
var settings = {
	//Ignore Posts - eliminates from view all posts by ignored users.
	  'ignore_posts' : true

	//Ignore Threads - eliminates from view all threads started by ignored users.
	, 'ignore_threads' : false

	//Ignore Authors - removes the names of ignored users from the threads they 
	//author. 
	, 'ignore_authors' : true

	//Ignore Last Posts - removes the names of ignored users who have last posted in a 
	//thread (implied by ignore_authors).
	, 'ignore_lastposts' : true

	//Ignore Quotes - eliminates the text of ignored users that has been quoted in 
	//other posts.
	, 'ignore_quotes' : false

	//Ignore Citations - eliminates the citation line of any quoted text of an ignored 
	//user, replacing it with "Quote" (implied by ignore_quotes).
	, 'ignore_citations' : true

	//Ignore Viewers - removes the names of ignored users from the notifications of 
	//viewers of a forum/thread.
	, 'ignore_viewers' : true
};

var iuCookie = "ignored_users";
var cookExpire = 90;

/*
main function.
*/

(function() {
	//define prototype functions
	load();
	//check cookies
	var cookie = getCookie(iuCookie);
	var url = window.location.toString();
	//if there are no cookies then load ignored users manually
	if (url.indexOf("area=ignoredusers") != -1 || (url.indexOf("section=login") != -1 && url.indexOf("do=process") != -1) || cookie == null) {
		loadUsers();
		ignorePosts();
	}
	//otherwise proceed to main functions
	else {
		ignorePosts();
		ignoreThreadsQuotes(null);
	}
})();

/*
ignorePosts() - searches for posts that have been marked as "ignore" and erases them.
*/
function ignorePosts() {
	if (settings.ignore_posts) {
		//retrieve the tags for all ignored posts
		var results = document.getElementsByClassName("post_ignore");
		if (results.length == 0) return;
		var ignored_posts = [];
		for (var i = 0; i < results.length; i++)
			ignored_posts.push(results[i]);
		//for each tag, delete all its text and remove it from the DOM
		for (var i = 0; i < ignored_posts.length; i++) {
			var post = ignored_posts[i].parentNode;
			nukeNode(post);
		}
	}
}

/*
loadUsers - retrieves the list of ignored users from the appropriate page and attempts to 
save it in a cookie.
*/
function loadUsers() {
	//if jQuery is active then use it to retrieve usernames
	if (typeof jQuery != "undefined") {
		jQuery(document.body).append("<div id='ignored_users' style='visibility: hidden; display: none;'></div>");
		jQuery("#ignored_users").load("index.php?app=core&module=usercp&tab=members&area=ignoredusers table.ipb_table tr[class^='row'] strong a", function(){
			var iuDiv = document.getElementById("ignored_users");
			var results = iuDiv.childNodes;
			var ignored_users = [];
			for (var i = 0; i < results.length; i++)
				ignored_users.push(results[i].innerHTML);
			nukeNode(iuDiv);
			//save the usernames as a cookie
			setCookie(iuCookie, ignored_users.sort(stringComp).join("//"), cookExpire);
			//proceed to the main function
			ignoreThreadsQuotes(ignored_users);
		});
	}
	//if there's no jQuery then use XMLHTTP and a parsing function to retrieve usernames
	else {
		loadPage("index.php?app=core&module=usercp&tab=members&area=ignoredusers", false, function(htmlDoc) {
			if (htmlDoc && typeof htmlDoc == "string") {
				var userAnchors = parseHTML(htmlDoc, "table.ipb_table tr.row[0-9]? strong a");
				var ignored_users = [];
				for (var i = 0; i < userAnchors.length; i++)
					ignored_users.push(/>(.*?)</.exec(userAnchors[i])[1]);
				//save the usernames as a cookie
				setCookie(iuCookie, ignored_users.sort(stringComp).join("//"), cookExpire);
			}
			//proceed to the main function
			ignoreThreadsQuotes(ignored_users);
		});
	}
}

/*
ignoreThreadsQuotes - uses the ignored user list as well as the program settings to erase 
users, their posts, and/or quotation blocks that reference their text.
*/
function ignoreThreadsQuotes(ignored_users) {
	//retrieve the ignored user list
	var cookie = getCookie(iuCookie);
	if (cookie != null && ignored_users == null);
		ignored_users = cookie.split("//");
	//erase the name of the ignored user from the thread list, as well as any threads they have created
	if (settings.ignore_threads || settings.ignore_authors) {
		var results = document.getElementsByClassName("short altrow");
		var thread_authors = [];
		for (var i = 0; i < results.length; i++)
			thread_authors.push(results[i]);
		for (var i = 1; i < thread_authors.length; i += 2) {
			var thread = thread_authors[i].parentNode;
			var poster = thread_authors[i].childNodes[0];
			var image_link = thread_authors[i].childNodes[2];
			if (poster != null && ignored_users.binarySearch(poster.innerHTML, stringComp) != null) {
				//this eliminates the name of the author from the notification that they have made a recent post
				if (settings.ignore_authors) {
					nukeNode(poster);
					nukeNode(image_link);
				}
				//this eliminates threads the author has made, so that they will not appear on the thread list
				if (settings.ignore_threads)
					nukeNode(thread);
			}
		}
	}
	//erase the names of ignored users from the list of the last users to post in threads
	if (settings.ignore_lastposts) {
		var results = document.getElementsByClassName("last_post");
		var last_posts = [];
		for (var i = 0; i < results.length; i++)
			last_posts.push(results[i]);
		for (var i = 0; i < last_posts.length; i++) {
			var post = last_posts[i];
			var lis = post.getElementsByTagName("li");
			var liElem = (post.parentNode.className == "altrow") ? lis[1] : lis[2];
			var anchors = liElem.getElementsByTagName("a");
			var poster = anchors[0];
			var image_link = anchors[1];
			if (poster != null && ignored_users.binarySearch(poster.innerHTML, stringComp) != null) {
				//this will stop you from being notified that an ignored poster has recently contributed to a thread
				nukeNode(poster);
				nukeNode(image_link);
			}
		}
	}
	//erase the ignored user's name and/or their message from posts that include their text within quote blocks
	if (settings.ignore_quotes || settings.ignore_citations) {
		var results = document.getElementsByClassName("citation");
		var quotes = [];
		for (var i = 0; i < results.length; i++)
			quotes.push(results[i]);
		for (var i = 0; i < quotes.length; i++) {
			var citation = quotes[i];
			var quote = citation.nextSibling;
			var citationInfo = citation.lastChild;
			var quoted_poster = (citationInfo != null) ? citationInfo.data.split(", ") : [""];
			if (citationInfo != null && ignored_users.binarySearch(quoted_poster[0], stringComp) != null) {
				//this will remove the ignored users name from the top of the quote block
				if (settings.ignore_citations)
					citation.innerHTML = "Quote";
				//this will remove the quote block altogether
				if (settings.ignore_quotes) {
					nukeNode(citation);
					nukeNode(quote);
				}
			}
		}
	}
	//erase the names of ignored users from the list of viewers of a forum or thread
	if (settings.ignore_viewers) {
		var active_users1 = document.getElementById("active_users");
		var active_users2 = (!active_users1) ? document.getElementById("forum_active_users") : null;
		var active_users3 = (!active_users2) ? document.getElementById("topic_active_users") : null;
		var results = (active_users1) ? active_users1.getElementsByClassName("name") : 
				((active_users2) ? active_users2.getElementsByTagName("li") : 
				((active_users3) ? active_users3.getElementsByTagName("li") : []));
		var viewers = [];
		for (var i = 0; i < results.length; i++)
			viewers.push(results[i]);
		for (var i = 0; i < viewers.length; i++) {
			var viewerFrame = viewers[i];
			var viewer = viewerFrame.getElementsByTagName("a")[0];
			//this will remove the ignored user's name from the list of viewers at the bottom of the page
			if (viewer != null && ignored_users.binarySearch(viewer.innerHTML, stringComp) != null)
				nukeNode(viewerFrame);
		}
	}
}

/*
load - defines a binary search prototype function for sifting through lists of strings.
*/
function load() {
	Array.prototype.binarySearch = function(find, comparator) {
		var low = 0, high = this.length - 1,
				i, comparison;
		while (low <= high) {
			i = parseInt((low + high) / 2, 10);
			comparison = comparator(this[i], find);
			if (comparison < 0) low = i + 1;
			if (comparison > 0) high = i - 1;
			if (comparison == 0) return i;
		}
		return null;
	};
}

/*
nukeNode - removes the specified node from the DOM tree and thus from the page being 
viewed.
*/
function nukeNode(node) {
	node.style.visibility = "hidden";
	node.style.display = "none";
	node.innerHTML = "";
	node.parentNode.removeChild(node);
}

/*
getCookie - retrieves the content of the specified cookie, and returns null if it does not 
exist.
*/
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
 			c_start = c_start + c_name.length+1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
}

/*
setCookie - creates a cookie for the website containing the specified data.
*/
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) +
	((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

/*
stringComp - a comparator function used by the binary search algorithm.
*/
function stringComp(a, b) {
	return (a > b) ? 1 : (a == b) ? 0 : -1;
}

/*
loadPage - uses an XMPHTTP request to retrieve the html content of a page.
*/
function loadPage(addr, parse, funct) {
	//create and initialize the XMLHTTP request object
	if (window.XMLHttpRequest)
		var xmlhttp = new XMLHttpRequest();
	else {
		try {
			var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e){
			try {
				var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e){ funct(null); }
		}
		
	}
	xmlhttp.open("GET", addr, true);
	//function to run once the request has been fulfilled
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var xmlDoc = xmlhttp.responseXML;
			var htmlText = xmlhttp.responseText;
			//check to see whether the document has been properly parsed
			if (parse && (!xmlDoc || !xmlDoc.documentElement || xmlDoc.documentElement.tagName == "parsererror")) {
				if (window.DOMParser) {
					var parser = new DOMParser();
					var xmlDoc = parser.parseFromString(htmlText, "application/xhtml+xml");
				}
				else {
					var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = "false";
					xmlDoc.loadXML(htmlText);
				}
			}
			//if properly parsed, return the root node
			if (parse && xmlDoc.documentElement && xmlDoc.documentElement.tagName != "parsererror")
				funct(xmlDoc.documentElement);
			//otherwise return the unparsed html text
			else funct(htmlText);
		}
	}
	xmlhttp.setRequestHeader("Content-Type", "text/xml");
	xmlhttp.send(null);
}

/*
parseHTML - parses the given html text using the semi-regular expression as a guide, and 
returns the resulting node(s) in an array of strings. It operates in much the same way as 
jQuery, but can handle regular expressions within the string as well. Please specify 
either a class or an ID for each tag, and not both.
*/
function parseHTML(htmlString, parseString) {
	var retString = [];
	//eliminates problematic tabbing from the html string
	retString.push(htmlString.replace(/\n(\t*)/g, ""));
	//split the parse text into sequentialized instructions
	var parseCom = parseString.split(" ");
	//move through those parsing instructions, refining the search at each step
	for (var i = 0; i < parseCom.length; i++) {
		if (parseCom[i] != "") {
			//tag names come first
			var tagName = parseCom[i];
			var tagClass = "";
			var tagID = "";
			//tag class names come after the '.'
			var classArray = parseCom[i].split(".");
			if (classArray.length > 1) {
				tagName = classArray[0];
				tagClass = classArray[1];
			}
			//tag IDs come after the '#'
			var idArray = parseCom[i].split("#");
			if (idArray.length > 1) {
				tagClass = "";
				tagName = idArray[0];
				tagID = idArray[1];
			}
			var tmpString = [];
			//run a regex match on the text and add the results to the array to be returned
			tagName = (tagName != "") ? tagName : "\\w";
			tagClass = (tagClass != "") ? "class(\\s?)=(\\s?)([\"\']?)"+tagClass+"([\"\']?)" : "";
			tagID = (tagID != "") ? "id(\\s?)=(\\s?)([\"\']?)"+tagID+"([\"\']?)" : "";
			var regExpStr = "<(\\s?)"+tagName+"([^>]*?)"+tagClass+"([^>]*?)"+tagID+"(.*?)>(.*?)</(\\s?)"+tagName+"(\\s?)>";
			for (var j = 0; j < retString.length; j++) {
				var reg = new RegExp(regExpStr, "ig");
				for (var match = reg.exec(retString[j]); (match); match = reg.exec(retString[j]))
					tmpString.push(match[0]);
			}
			//update the array to be returned with the results from each stage of the regexp search
			retString = tmpString;
		}
	}
	return retString;
}