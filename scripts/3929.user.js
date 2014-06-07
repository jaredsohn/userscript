/*
version: 0.3
*/

// ==UserScript==
// @name           Dot35 Title Fixer
// @author         Ryan Noell (From Hans)
// @description    Changes the titles on Dot35 to be more relevant.
// @include        http://*dot35.com/board*
// ==/UserScript==
//
//
// Just playing around
//
// Next version has Dot35 the way the people like it, I hope.
//
// I want to give credit to Hans van de Bruggen <pintong@gmail.com> for coming out with the frenzyboard
// version of this script. So, thank him for my playing around and getting this done and taken care of.


var tPrefix = "Dot35" // You can change "Dot35" to something shorter like "D35" if you prefer.
var titlePrefix = tPrefix + ": " 


// Begin topic grabbing script. This grabs the topic from a td with a class of "windowHeader"
var xpath = "//td[@class='windowHeader']";
var res = document.evaluate(xpath, document, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (res.snapshotLength >= 1) 
{
    var postTopic = res.snapshotItem(0).firstChild.nodeValue;
    postTopic = postTopic.replace(/\n/, ""); // Removes any newline character
    document.title = titlePrefix + postTopic; // Changes the title of topic pages
}
// End topic grabber


// Begin non-topic title changes. This changes the title based on the URL of the page. 
(function() {
    var href = new String(document.location);
    
    GM_log("HREF: " + href);
        
    if(href.indexOf("action=newTopic") != -1) {
        document.title = titlePrefix + 'New Topic';
        } else if (href.indexOf("action=browse") != -1) {
            document.title = tPrefix;
//For 'classic' style ("Dot35: Home") change the previous line to read document.title=titlePrefix + 'Home';
        } else if (href.indexOf("pg=") != -1) {
            document.title = titlePrefix + 'Browsing'; // Could be updated to list which page you were on?
        } else if (href.indexOf("action=search") != -1) {
            document.title = titlePrefix + 'Search Results';
        } else if (href.indexOf("action=settings") != -1) {
            document.title = titlePrefix + 'Edit Settings';
        } else if (href.indexOf("action=colors") != -1) {
            document.title = titlePrefix + 'Edit Colors';
        } else if (href.indexOf("action=profile") != -1) {
            document.title = titlePrefix + 'Edit Profile';
        } else if (href.indexOf("action=inbox") != -1) {
            document.title = titlePrefix + 'Inbox & Subscriptions';
        } else if (href.indexOf("action=display") != -1) {
            document.title = titlePrefix + 'Inbox - ' + postTopic;
        } else if (href.indexOf("action=newPm") != -1) {
            document.title = titlePrefix + 'New PM';
        } else if (href.indexOf("action=reportPm") != -1) {
            document.title = titlePrefix + 'Report abusive PM';
        } else if (href.indexOf("action=login") != -1) {
            document.title = titlePrefix + 'Login';
        } else if (href.indexOf("action=pmConfirm") != -1) {
            document.title = titlePrefix + 'PM Sent';
        } /*else if (href.indexOf("action=viewProfile") != -1) {
            document.title = titlePrefix + 'Viewing Profile';
        } */
        else if (href.indexOf("action=viewProfile") != -1) {
            
            
        var xpath = "//td[@class='windowBorder']";
var resProfile = document.evaluate(xpath, document, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (resProfile.snapshotLength >= 1) 
{
    var profileUser = resProfile.snapshotItem(1).firstChild.nodeValue;
    profileUser = profileUser.replace(/\n/, ""); // Removes any newline character
    profileUser = profileUser.replace(/		/, ""); // Removes the the two tab-like characters following every username
    document.title = titlePrefix + 'Viewing Profile -' + profileUser; // Includes user's name in profile title. (Don't include a trailing space.)
}    
            
            
            
        } else if (document.title == 'Dot35' ) {  // It was the == that did it!
			document.title = tPrefix;
		}
        
})();

// End non-topic title changes.
//.user.js