// ==UserScript==
// @name           Create scriptwriter feed
// @namespace      http://esquifit.myopenid.com/
// @description    Create userscripts author feed via special YPipe + AppJet app
// @include        http://userscripts.org/users/*
// ==/UserScript==

/* Change log:
 * version 0.1:
   + Released in userscripts.org
 * version 0.2
   + Script runs now also on the "scripts" and "script comments" pages
   x Fix bug when detecting user's nick (don't use the word 'name' for a global variable,
     this is is the same as window.name and it is persisted across pages and windows!)
 * version 0.3
   x Backend AppJet engine is now hosted at jgate.de
 * version 0.4
   x Fix wrong urls passed to the feed generator when the user profile is invoked
     via user name instead of user id (for ex. http://userscripts.org/users/esquifit) 
   x Fix parsing of userID when profile page uses username instead of ID
   + Support for new user pages (guides, groups, jetpacks, etc) 
*/

const FONT = XPathResult.FIRST_ORDERED_NODE_TYPE;
const USRID = "//div[@id='content']/ul/li/a/@href";
const FEEDS = "//div[@class='summary']/ul"
const FEEDAPP   = 'http://userscripts-by-author.jgate.de/';
const BASICFEED = FEEDAPP + 'feed';
const FULLFEED  = FEEDAPP + 'fullfeed';
const NAME1 = "//div[@id='content']/div/div/h1/text()[position()=1]"; // Profile
const NAME2 = "//div[@id='main']/h1/a/text()";                         // Groups, scripts, guides, etc
const NAME3 = "//div[@id='content']/h1";                              // Recent posts by

var username;
// user in profile url can be username or ID, we still don't know
var path = document.location.pathname.split('/');
var user = path[2];  // this can be username or userID

// Except maybe in profile page, all urls related to a user use the (numeric) userID
var userID = path.length > 3 ?  userID = user
                             :  document.evaluate(USRID, document, null, FONT, null)
                                        .singleNodeValue.value.match(/\d+/);
if (userID != user) {
    // profile page is http://userscripts.org/users/<user>
    username = user; 
} else {
    // Either not a profile page...
    if  (path.length > 3) {
           if(path[3]=="posts"){
                username = document.evaluate(NAME3, document, null, XPathResult.STRING_TYPE , null).stringValue;
                username = username.replace('Recent posts by ','');
           } else {
                username = document.evaluate(NAME2, document, null, XPathResult.STRING_TYPE , null).stringValue;
           } 
    // ...or profile page is http://userscrips.org/users/<userID>
    } else {
            username = document.evaluate(NAME1, document, null, FONT, null).singleNodeValue.nodeValue;
    }
    // trim space before and after name
    if(username) username = username.trim();
}


if(userID){
        // Basic feed: only listed scripts
        var feedurl = BASICFEED + '?user=' + userID + (username?'&name='+username:'');
        var link = document.createElement('link');
        link.setAttribute('href', feedurl);
        link.setAttribute('rel', 'alternate');
        link.setAttribute('title', 'Listed scripts by ' + (username?username:'this author'));
        link.setAttribute('type', 'application/rss+xml' );
        document.getElementsByTagName('head')[0].appendChild(link);

        // Full feed: unlisted scripts as well
        feedurl = FULLFEED + '?user=' + userID + (username?'&name='+username:'');
        link = document.createElement('link');
        link.setAttribute('href', feedurl);
        link.setAttribute('rel', 'alternate');
        link.setAttribute('title', 'All scripts by ' + (username?username:'this author'));
        link.setAttribute('type', 'application/rss+xml' );
        document.getElementsByTagName('head')[0].appendChild(link);

        // Feed icon in the "Public feeds" page area
        var feeds = document.evaluate(FEEDS,document, null, FONT , null).singleNodeValue;
        if (feeds) {
                feeds.appendChild(document.createElement('li'));
                var feed_text = 'Scripts by ' + (username?username:'this author');
                feeds.lastElementChild.innerHTML = <a href={feedurl} class='feed'>{feed_text}</a>.toXMLString();
        }
}
