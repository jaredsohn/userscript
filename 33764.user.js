// ==UserScript==
// @author	Urgo http://YouTube.com/Urgo6667/
// @name	Urgo's YouTube Pack (highlight comments from sub & date/time)
// @description	Highlights comments on videos from people you subscribe to & changes the date on videos to be full date & time
// @include	http://*youtube.com/watch*
// @include	http://*.youtube.com/comment_servlet*
// ==/UserScript==
//
// README: This script uses the people you are subscribed to instead of the friends list since YouTube API limits friends to 100.
// README: Also, this only updates your subscription list once per day.
//
// ==RevisionHistory==
// Version 0.1:
// Released: 2008-09-14.
// Initial release.
//
// Version 0.2:
// Released: 2009-08-28.
// Updated due to YouTube's recent layout changes
// ==/RevisionHistory==



var totalFriends, friendList;

(function() {
	addFullDate();
	getLoggedInUser();
	var user = GM_getValue("username", "YouTube");
	
	var lastRun = GM_getValue("lastRun", 0);
	var d = new Date();
	var timeNow = d.getTime();
	if (timeNow-lastRun>86400000) { getFriends(1, user); }
	var sub_list = GM_getValue("subs", "/YouTube/ig");
	var allDivs, thisDiv;
	allDivs = document.evaluate(
	    "//div[@class='watch-comment-head']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
	    thisDiv = allDivs.snapshotItem(i);
	    var postername = thisDiv.childNodes[1].childNodes[1].textContent;
	    if (postername.match(sub_list)) { thisDiv.style.backgroundColor = 'orange'; }
	}

})();



function addFullDate()
{
	var URL=window.location.href;
	var vidId=gup('v');
	var urlToGet = 'http://gdata.youtube.com/feeds/api/videos/'+vidId;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: urlToGet,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
	    onload: function(oResponseDetails)
	    {
		var oParser = new DOMParser();
		var oDom = oParser.parseFromString(
		oResponseDetails.responseText, 'application/xml');
		var arItems, oItem;
		arItems = oDom.getElementsByTagName('published');
		for (var i = 0; i < 1; i++) 
		{
			oItem = arItems[i];
			pubDate=oItem.textContent;
			pubDate=pubDate.replace("T", " ");
			pubDate=pubDate.replace(".000", " ");
			var allDivs, thisDiv;
			allDivs = document.evaluate(
			    "//span[@class='watch-video-added post-date']",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);
			for (var i = 0; i < allDivs.snapshotLength; i++) {
			    thisDiv = allDivs.snapshotItem(i);
				thisDiv.textContent = pubDate;
			}
		}
	    }
	});
}



function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&](amp;)?"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[2];
}


function getLoggedInUser(){
	var allDivs, thisDiv;
	allDivs = document.evaluate(
	    "//div[@id='masthead-utility']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < 1; i++) {
		thisDiv = allDivs.snapshotItem(i);
		var loggedInUser = thisDiv.childNodes[1].childNodes[1].childNodes[0].textContent;
		var currentlySetTo = GM_getValue("username", "");
		if (currentlySetTo != loggedInUser) { GM_setValue("lastRun", 0); }
		GM_setValue("username", loggedInUser);
	}
}






function getFriends(startAt, user){
var urlToGet = 'http://gdata.youtube.com/feeds/api/users/'+user+'/subscriptions?max-results=50&start-index='+startAt;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: urlToGet,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(oResponseDetails)
		{
					var oParser = new DOMParser();
					var oDom = oParser.parseFromString(
					oResponseDetails.responseText, 'application/xml');
					var arItems, oItem;
					if (!totalFriends)
					{
						arItems = oDom.getElementsByTagName('openSearch:totalResults');
						for (var i = 0; i < arItems.length; i++) {
							oItem = arItems[i];
							totalFriends=oItem.textContent;
						}
					}


					arItems = oDom.getElementsByTagName('yt:username');
					for (var i = 0; i < arItems.length; i++) {
						oItem = arItems[i];
						currentFriend=oItem.textContent;
						if (friendList) { friendList = friendList + '|' + currentFriend; }
						else { friendList = '/'+currentFriend; }
					}





			if ((startAt+50)<totalFriends) {
				getFriends(startAt+50, user);
			}
			else {
				GM_setValue("subs", friendList);
				if (friendList) { friendList = friendList + '/ig'; }
				var d = new Date();
				
				var timenow = d.getTime().toString();
				GM_setValue("lastRun", timenow);
		      }
		      
		}
	});
}



//-------------------------------------