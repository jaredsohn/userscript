// ==UserScript==
// @name          Twitter Bios - Improved
// @namespace     http://3on.us
// @description   See complete friends and follower bio on the Twitter following/follows list (adapted from "Twitter Friends Bio at a Glance" for a more compressed view with less scrolling; all credit goes to "Al's scripts" http://userscripts.org/scripts/show/38797
// @include       http://twitter.com*followers*
// @include       https://twitter.com*followers*
// @include       http://twitter.com*following*
// @include       https://twitter.com*following*
// @include       http://twitter.com*friends*
// @include       https://twitter.com*friends*
// @include       http://twitter.com*members*
// @include       http://twitter.com*subscribers*

// ==/UserScript==

// 2.4 update 11/1/09 - show bios on new Lists feature's following and followers pages
// 2.3 update 10/31/09 - fixed most recent tweet - simpler reg exp for new html
// 2.2 update 9/20/09 - just added version numbers, no functional change
// 2.1 update 9/6/09 - update to find most recent tweet (adjusted reg exp)
// 2.0 update 7/3 - major overhall after Twitter updated the follower/following page

// 1.10 update 6/27  updated recent tweet html finder       
// 1.9 update 6/13 updated url finder (twitter altered their html to popup in new window)
// 1.8 update 5/25 added some more vertical padding between lines
// 1.7 update 4/21 added Location information (if available)
// 1.6 update 2/25 updated recent tweet regexp to handle twitter's html change
// 1.5 update Feb 15 added most recent tweet, cleaned up display a bit
// 1.4 update January 2 to include Following stats
// 1.3 update December 20th to include follower count
// 1.2 update December 20th to include Web link after the bio
// 1.1 created December 2008

(function() {
	
var userTwitterURL;	
var follower = false; // assume we're on friends page
var userPageType = "following" // the type of user list in view
var followTableXPath;
var userRowElem;
var userTdElem2;
var userLinkElem;

// determine if on friends or followers or Lists page
var followersPattern = /followers/;
var listsPattern = /members|subscribers/; // regex for new Lists feature views

if (followersPattern.test(document.location)) {
	userPageType = "followers";
    follower = true;
} else if (listsPattern.test(document.location)) { // check if on a new Lists feature page
	userPageType = "lists";
} else { } // userPageType = "following"

		
// AJAX request to find bio text on user's profile page
// extract Web link and Bio content from there	
function getBio(userTwitterURL, userSpanElem) {
    var bioText = "<b>Bio</b>&nbsp;&nbsp; none<br>";
    var followerText;
    var followingText;
    var location;
    var locationText;
    var recentTweetText;
    var bioRegExp = /<span class="bio">(.*?)<\/span>/i;
    var webRegExp = /<span class="label">Web<\/span> <a href="(.*?)" class="url" rel="me nofollow" target="_blank">.*<\/a>/;
    var followerRegExp = /<span id="follower_count" class="stats_count numeric">(.*?)<\/span>/;
    var followingRegExp = /<span id="following_count" class="stats_count numeric">(.*?)<\/span>/;
    var locationRegExp = /<span class="adr">(.*?)<\/span>/;
    

    // recent tweet, regexp updated 6/27/09, 9/6/09, 10/31/09
    var recentTweetRegExp = /<span class="entry-content">(.*?)<\/span>/;    

    var hasBioOrWeb = 0;
    var hasBio = 0;
    	
    GM_xmlhttpRequest({    method: 'GET',    url: userTwitterURL,
    onload: function(results) {
    	var page = results.responseText; 
    	
    	// get bio   	    	
    	if ( bioRegExp.test(page) ) {
            var bioMatch = page.match(bioRegExp);
            bioText = '<b>Bio</b> &nbsp;' + bioMatch[1] + ' '; // WHAS: took out linebreak 
            hasBioOrWeb = 1;
            hasBio = 1;
    	}

    	// get location << Removed 7/3/09
    	
    	// get web url
        if ( webRegExp.test(page) ) {
            var webMatch = page.match(webRegExp);
        	var bioUrl = webMatch[1];
            if (bioUrl.length > 25 ) {	
            	bioUrl = bioUrl.substring(0,25) + "..";
            }
            
        	bioText = bioText + '<a href="' + webMatch[1] + '" ' +
        	          'target="_blank">' + bioUrl + '</a><br>';	// WHAS: took out "Web" prefix
            hasBioOrWeb = 1;        	
        } else if (hasBio) {
        	bioText = bioText + '<br>';
        }
        
        // get follower & follower count
        var followerMatch = page.match(followerRegExp);
        var followingMatch = page.match(followingRegExp);
        
        followerText = ' &nbsp; <b>Followers</b> '+ followerMatch[1];	// WHAS: added whitespace before "Followers"
        followingText = '<b>Following</b> '+ followingMatch[1];  // WHAS: took out whitespace before "Following"
        
        // get most recent tweet
        if ( recentTweetRegExp.test(page) ) {        
            var recentTweetMatch = page.match(recentTweetRegExp);
            // updated 2/25 - no more date :(      
            recentTweetText = '<br><b>Last:</b> ' + recentTweetMatch[1];      // WHAS: took out linebreak after "recent...", shortened text          
        }
        
        userSpanElem.setAttribute("style","width:400px;padding-bottom:7px;padding-top:5px;line-height:15px;color:black;font-family:Verdana;font-size:11px;");      	        	
        userSpanElem.innerHTML = bioText + followingText + followerText + recentTweetText;	// WHAS: reversed followers/following to match standard
    }
    });
}	

// find user html table, which contains each user. 
// html pattern depends on being at the friend or follower or list page

if (userPageType == "followers") {	// slightly different xpath depending on if followers or friends page
    followTableXPath = "html/body[@id='followers']/div[@id='container']/table/tbody/tr/td[@id='content']/div/div[@id='follow']/div[@id='follow_grid']/table";
    
} else if (userPageType == "lists") {
	followTableXPath = "/html/body/div[@id='container']/table/tbody/tr/td[@id='content']/div/div[2]/div[@id='follow_grid']/table";
} else { // on the following page
    followTableXPath = "html/body[@id='following']/div[@id='container']/table/tbody/tr/td[@id='content']/div/div[@id='follow']/div[@id='follow_grid']/table";    
}    


var followTableElem = document.evaluate(followTableXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

var userRows = followTableElem.getElementsByTagName('tr');
var userTwitterURL;
var bioText2;
var userTdElem3;

// loop through each user and add bio and other info
// Twitter commonized the html on following and followers page 7/09  
// so the following part of the script became much simpler.

for (var i = 1; i < userRows.length; i++) {  // skip first tr
    userRowElem = userRows[i];
    userTdElem2 = userRowElem.getElementsByTagName('td')[1];
    userLinkElem = userTdElem2.getElementsByTagName('a')[0];
    userTwitterURL = userLinkElem.getAttribute('href');
    if (userBrElem = userTdElem2.getElementsByTagName('br')[0] ) {
        userBrElem.parentNode.removeChild(userBrElem);
    }
            
    spanElemXPath = "span[@class='user-body']"; 
    userSpanElem = document.evaluate(spanElemXPath,userTdElem2, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;          	    
   	    
    getBio(userTwitterURL, userSpanElem);   // ajax call to user's profile page
} 

})();