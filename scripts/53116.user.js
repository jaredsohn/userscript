// ==UserScript==
// @name          Twitter Search Bios
// @namespace     http://www.imusicmash.com
// @description   Pops up Twitter user's bio when you hover over their link on the Twitter search results page
// @include       http://search.twitter.com/search?*q=*
// ==/UserScript==

// History
// used similar code found in my Twitter Bios at a Glance script
// reference: http://userscripts.org/scripts/show/38797
// July 5, 2009 - created - only works on search.twitter.com, 
// having trouble adding appending a floating div to the newer twitter.com#search results page.
// To-Do: make this work on http://twitter.com/#search?q=*

(function() {
	
// hidden div we'll fill in later with the user's bio and popup
var userPopUpDiv = document.createElement('div');
userPopUpDiv.setAttribute('id', 'popUpDiv');
userPopUpDiv.setAttribute('style', 'visibility:hidden;');
document.body.appendChild(userPopUpDiv);

// identify each result Tweet's user hyperlink element on the search results page

var tweetXPath = "//li[@class = 'result']";   // for search.twitter.com

// keep for later, the XPath for the twitter.com#search page
// var tweetXPath = "//li[contains(@class, 'hentry')]"; 

var tweets;

tweets = document.evaluate(tweetXPath, 
                   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  
                     	
for (var i = 0; i < tweets.snapshotLength; i++) { // loop thru each tweet
    var tweetElem = tweets.snapshotItem(i);

    // keep for later, the element for the twitter.com#search page
    // var spanElem = tweetElem.getElementsByTagName('span')[1];

    var spanElem = tweetElem.getElementsByTagName('div')[1]; // for search.twitter.com
    var aElem = spanElem.getElementsByTagName('a')[0];

    aElem.addEventListener('mouseover', showBio, true);
    aElem.addEventListener('mouseout', hideBio, true);        
}    


function showBio(event) {
	// make ajax-like request to the user's home page
	// pull the entire page in, find bio, location, web link, counts, and last tweet
    // using similar code as my Twitter Bios at a Glance script
    // Reference: http://userscripts.org/scripts/show/38797	
	
	var aElem = event.target;
	var aUrl = event.target.getAttribute('href');

    // bio parsing parameters
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
    var recentTweetRegExp = /<ol class="statuses" id="timeline"><li class="(.*?)" id="status_(.*?)"><div class="listable"><\/div><span class="status-body"><span class="entry-content">(.*?)<\/span><span class="meta entry-meta">/;

    var hasBioOrWeb = 0;
    var hasBio = 0;

    // AJAX request
    GM_xmlhttpRequest ({ 
    method : 'GET', 
    url : aUrl,    
    onload : function(results) {
        var page = new String(results.responseText);

    	// get bio   	    	
    	if ( bioRegExp.test(page) ) {
            var bioMatch = page.match(bioRegExp);
            bioText = '<b>Bio</b> &nbsp;' + bioMatch[1] + '<br>'; 
            hasBioOrWeb = 1;
            hasBio = 1;
    	}

    	// get location   	    	
    	if ( locationRegExp.test(page) ) {
            var locationMatch = page.match(locationRegExp);
            locationText = '<b>Location</b>&nbsp;&nbsp;&nbsp;' + locationMatch[1]; 
            bioText = bioText + locationText + '<br>';
    	}
    	
    	// get web url
        if ( webRegExp.test(page) ) {
            var webMatch = page.match(webRegExp);
        	var bioUrl = webMatch[1];
            if (bioUrl.length > 25 ) {	
            	bioUrl = bioUrl.substring(0,25) + "...";
            }
            
        	bioText = bioText + '<b>Web </b>&nbsp;<a href="' + webMatch[1] + '" ' +
        	          'target="_blank">' + bioUrl + '</a><br>';
            hasBioOrWeb = 1;        	
        } else if (hasBio) {
        	bioText = bioText + '<br>';
        }
        
        // get follower & follower count
        var followerMatch = page.match(followerRegExp);
        var followingMatch = page.match(followingRegExp);
        
        followerText = '<b>Followers</b> '+ followerMatch[1];        
        followingText = '&nbsp;&nbsp;&nbsp;<b>Following</b> '+ followingMatch[1];
        
        // get most recent tweet
        if ( recentTweetRegExp.test(page) ) {        
            var recentTweetMatch = page.match(recentTweetRegExp);
            // updated 2/25 - no more date :(      
            recentTweetText = '<br><b>Most Recent Tweet</b><br>' + recentTweetMatch[3];                 
        }          

        // get position of the actor's hyperlink element on the movie page
        var positionArray = getPosition(aElem);
        topPos = positionArray[1] + 17;
        leftPos = positionArray[0] + 1;

        var popUp;

        popUp = document.getElementById('popUpDiv');           
        GM_log("position: absolute; top:"+topPos+"; left:"+leftPos+";  border: 2px solid #808080; visibility:visible;");
        popUp.setAttribute("style","position: absolute; top:"+topPos+"px; left:"+leftPos+"px;  border: 2px solid #808080; background-color:#FFFFCC; width:300px; line-height:1.3; padding:4px; visibility:visible;");
        popUp.innerHTML = bioText + followerText + followingText + recentTweetText;   
    }
    });                  
        
	return aUrl;      
}


function hideBio(event) {
	// remove photo or No Photo message after mouseout	
    var popUp = document.getElementById('popUpDiv');       
    popUp.setAttribute('style', 'visibility:hidden; line-height:1.3;');  
}


function getPosition(theElement) {
	// used to obtain the x and y position of the hovered-over user's hyperlink
	// photo will be placed just below this link.
    var positionX = 0;
    var positionY = 0;
    
    while (theElement != null) {
        positionX += theElement.offsetLeft;
        positionY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
    return [positionX, positionY];
}

})();