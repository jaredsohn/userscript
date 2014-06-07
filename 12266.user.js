// ==UserScript==
// @name           Frenzyboard Title Fixer
// @author         Hans van de Bruggen <pintong@gmail.com>
// @edit           Kristina Hansen <kristina@kristinahansen.com>
// @description    Changes the titles on Frenzyboard to be more relevant.
// @include        http://*frenzyboard.net/*
// ==/UserScript==
//
//
// New in 1.1.1: ----------------------------------
//
//   Shortened title to "FB" by default. "Frenzyboard" was continually getting
//   crowded out of the title, which defeats the purpose of the script. You can 
//   change it back to "classic style" by changing the variable "tPrefix" to say
//   "Frenzyboard".
//
// New in 1.1: ------------------------------------
//
//   "Search results", "Browsing" and "Viewing Profile - (username)" added.
//
// New in 1.0: ------------------------------------
//
//   Fixed the "old" (haha, this is what, two days old?) bug of reverting to the old
//   page title after making a post or reordering the topics. The title of the main 
//   page was also tidied up a bit, from "Frenzyboard: Home" to simply "Frenzyboard".
//   This helps avoid confusing the main page with a topic titled "Home", and because
//   it's being used as a catchall, it eliminates the off chance of accidentally mis-
//   titling an undefined page as "Frenzyboard: Home".
//
// TODO:
//   Have the page title update to the new topic title or PM subject currently
//   being typed?
//
// New in 0.6: ------------------------------------
//  
//   Favicons! Cool enough to include but not big enough to warrant its own script. 
//   I thought I'd have to reference the .gif image from a server, but then I 
//   discovered I could simply embed it! Based on LouCypher's "Userscripts.org 
//   Favicon" script (http://loucypher.wordpress.com/). (This is the closest I want
//   to come to making bloatware).
//
//   Also fixed a small bug that broke the page title when navigating back through
//   different pages of the board.
//
// New in 0.5: ------------------------------------
//
//   Based on Julien Couvreur's "Bob Cringley - Fix Titles" script 
//   (http://blog.monstuff.com/archives/cat_greasemonkey.html) and Migraneheartache's 
//   "MySpace Title Fixer" script (http://migraineheartache.com/software/gmscripts/)
//
// Includes the current topic in the page title. i.e. - "Frenzies Underground: CURRENT TOPIC"
//
// TODO:
// Bugfix: The page title goes back to the old title after making a post. This goes away after 
//         clicking any link, but it's annoying (to me, at least). The reason is that the URL
//         for the main page is usually "/index.php?action=browse" (or "clean.php"), but when
//         making a new post it drops you back onto "/index.php" (again, or "clean.php"). If
//         we could have it check to verify the title is an exact string (ending with ".php",
//         not ".php?action=" ect.) then that would solve the problem. Oh Pieter?


var tPrefix = "FU" // You can change "FB" to something like "Frenzyboard" if prefer.
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
//For 'classic' style ("Frenzyboard: Home") change the previous line to read document.title=titlePrefix + 'Home';
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
            
            
            
        } else if (document.title == 'five iron frenzy community' ) {  // It was the == that did it!
			document.title = tPrefix;
		}
        
})();

// End non-topic title changes.

// Begin favicon code. Image is embedded courtesy of Motobit's Base64 encoder/decoder (codec?)
// available at http://www.motobit.com/util/base64-decoder-encoder.asp
(function() {
  var link, head;

  link = document.createElement('link');
  link.setAttribute('rel', 'shortcut icon');
  link.setAttribute('href', 'data:image/gif;base64,R0lGODlhEAAQAJEAAP///wAA' + 
                             'AP///wAAACH5BAEHAAIALAAAAAAQABAAAAIllI+pi+EP' + 
		            	     'o5wS2IstBY7T53mbFlxf2Z0p+pklCWWyqNYUg+dJAQA7');

  head = document.getElementsByTagName('head')[0];
  if(!head) return;
  head.appendChild(link);
})();



/*
addCSSStyle('body { background-image: data:image/gif;base64,R0lGODlhEAAQAJEAAP///wAAAP///wAAACH5BAEHAAIALAAAAAAQABAAAAIllI+pi+EPo5wS2IstBY7T53mbFlxf2Z0p+pklCWWyqNYUg+dJAQA7 !important}');

*/

// End favicon code
//.user.js



