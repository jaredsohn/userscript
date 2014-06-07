// ==UserScript==
// @name        dimeforscale.com customizations by PlaysByEar
// @namespace   localhost
// @description Enable navigation through pages and threads using the tab-key; remove avatars, auto-expand pictures, avoid NSFW links
// @include     http://dimeforscale.com/*
// @version     1
// @grant       none
// ==/UserScript==

//make it easy for users to enable/disable features
optAvatars = true; //false = hide avatars; true = show avatars
optNSFW = true; //false = disable NSFW threads; true = enable NSFW threads
optExpandPics = true; //false = default pic behavior; true = expand pics in threads

addCss('a:focus { outline: solid medium yellow; }'); //default focus outline is okay; this is a lot more visible
addCss('a.squarebuttonl:focus { background-position: right bottom; }'); //make sure you can tell unread posts button is selected when tabbed to  

//don't know what page we're on to start with, so set all to false
pageIndex = false;
pageUnread = false;
pageForum = false;
pageTopic = false;

//figure out what kind of page we're on; assign to variables so we only have to do it ONCE
if (document.title.match("Index page")) {
    pageIndex = true
}
if (document.title.match("View unread posts")) {
    pageUnread = true
}
if (document.title.match("View forum")) {
    pageForum = true
}
if (document.title.match("View topic")) {
    pageTopic = true
}


//hide user avatars - good if you read at work
if (!(optAvatars)) {
    var snapResults = document.evaluate("//*[@alt='User avatar']", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
        elm.parentNode.removeChild(elm);
    };
}

//having to click on pictures to see the whole thing is ANNYONG, so show the whole picture by default
if (optExpandPics) {
    var snapResults = document.evaluate("//*[@class='attach-image']", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
        elm.style = "height: auto; overflow: visible; max-height: none;"
    };
}

lastTab = 0;
//on main page or forum page, set up tabs to go to main/sub forum titles
if (pageIndex || pageForum) {
    var snapResults = document.evaluate("//*[@class='forumtitle link-new' or @class='forumtitle']", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var numTopics = snapResults.snapshotLength;
    first = snapResults.snapshotItem(0);
    for (var i = numTopics - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
        elm.tabIndex = i + 2;
    };
    lastTab = numTopics; //need to keep track of how many tabs so far cuz Index page has forum links and thread links
    //also, add tab index to unread posts button
    snapResults = document.evaluate("//*[@class='navbaricon']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    snapResults.snapshotItem(0).parentNode.parentNode.tabIndex = 1;
}

//code for forum/unread post pages that list titles of posts
if (pageUnread || pageForum) {

    //find the topic titles and give them a tab index, such that you can tab to each topic title
    var snapResults = document.evaluate("//*[@class='topictitle' or @class='topictitle link-new']", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var numTopics = snapResults.snapshotLength;
    first = snapResults.snapshotItem(0);
    for (var i = numTopics - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
        if (!(optNSFW) && (elm.text.match("NSFW") || elm.text.match("{DO NOT CLICK}"))) {
            elm.href = "javascript:void(0);"; //don't add to tab order, and remove link, too. Impossible to accidently click on now!
        } else {
            elm.tabIndex = i + lastTab + 2; //tab through each title
            //elm.target = "_blank";  //this makes it so ENTER will open it in a new tab
        }
    };
    lastTab = lastTab + numTopics + 1;

    //sometimes NSFW threads don't have NSFW in the title! (Salmon catch of the day)
    //so make sure all threads in the NSFW thread are removed from tab order
    if (!(optNSFW)) {
        nsfw = document.evaluate("//*[text() = 'NSFW: Skinemax & Beyond...']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = nsfw.snapshotLength - 1; i >= 0; i--) {
            nsfw1 = nsfw.snapshotItem(i).parentNode;
            removeTab = document.evaluate(".//*[@class='topictitle']", nsfw1, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            removeTab = removeTab.snapshotItem(0);
            if (removeTab) { //woo hopefully one of my last edits to this script. just got home from IndB and am ripped, yow 8/3
                removeTab.removeAttribute("tabIndex");
                removeTab.href = "javascript:void(0);"; //remove link too  
            }
        }
    }

    //also, add tab index to unread posts button - but just on forum view page; if you're already on unread posts page you don't need it!
    if (pageForum) {
        snapResults = document.evaluate("//*[@class='navbaricon']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        snapResults.snapshotItem(0).parentNode.parentNode.tabIndex = 1;
    }

    //include next page link in the tab order after all of the topics
    snapResults = document.evaluate("//*[text() = 'Next']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
    if (snapResults.snapshotLength > 0) {
        snapResults.snapshotItem(0).tabIndex = lastTab + 1;
    }
}


//code to run on individual thread pages
if (pageTopic) {

    //get rid of any existing tab indexes, which could interfere with other code below
    var snapResults = document.evaluate("//*[@tabindex]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
        elm.removeAttribute("tabIndex");
    };


    //find the first unread post, or first post if no unread		
    unreadResults = document.evaluate("//*[@id = 'unread']/following::div/div/div/dt/span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (unreadResults.snapshotLength == 0) { //or first post on screen if there is no unread
        unreadResults = document.evaluate("//*[@class='postprofileauthor']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        unread = false;
    } else {
        unread = true;
    }

    first = unreadResults.snapshotItem(0);

    //find the link to the next page		
    snapResults = document.evaluate("//*[text() = '>']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (snapResults.snapshotLength > 0) {
        hasNextPage = true;
    } else {
        hasNextPage = false;
    }

    //put start marker
    //if there is a next page, use 'next' and link to next page
    //if there are unread posts and there is not a next page, use 'unread' with no link
    //if there is no next page and no unread posts, use 'last page' with no link

    var nextLink;
    anchorTag = document.createElement('a');
    anchorTag.appendChild(document.createTextNode("[?]"));
    anchorTag.style = "background-color: yellow";

    if (hasNextPage) {
        //grab the href to the next-page link
        nextLink = snapResults.snapshotItem(0);

        //highlight it green; green means GO to the next page!
        nextLink.style = "background-color: green; color: white";
        var hrefn = nextLink.href;

        //create a new link to the next-page
        anchorTag.setAttribute('href', hrefn);
        anchorTag.text = "next\n\r";
        anchorTag.style = "background-color: green; color: white;";
    } else {
        anchorTag.setAttribute('href', 'javascript:void(0);');
        //no link - red means STOP!
        anchorTag.style = "background-color: red; color: white;";
        if (unread) {
            anchorTag.text = "unread";
        } else {
            anchorTag.text = "last page";
        }
    }

    paraTag = document.createElement('p');
    breakTag = document.createElement('br');

    //add the next page link or first unread indicator
    first.insertBefore(breakTag, first.firstChild);
    first.insertBefore(paraTag, first.firstChild);
    first.insertBefore(anchorTag, first.firstChild);

    //add tabs to each post
    for (var i = unreadResults.snapshotLength - 1; i >= 0; i--) {
        var elm = unreadResults.snapshotItem(i);
        elm.firstChild.setAttribute("tabindex", i + 2);
    };



    //add tab to original next link
    if (hasNextPage) {
        nextLink.setAttribute("tabindex", unreadResults.snapshotLength + 3);
    }

    //add unread posts link at bottom of page
    snapResults = document.evaluate("//*[@class='navbaricon']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var bottomButton = snapResults.snapshotItem(0).parentNode.parentNode.cloneNode(true);
    bottomButton.setAttribute("style", "float: right; margin-top: 5px; margin-right: 5px;"); //make pretty next to page links
    if (!(hasNextPage)) {
        bottomButton.setAttribute("tabindex", unreadResults.snapshotLength + 3); //allow tab to unread posts at bottom of last thread page
    }

    snapResults = document.evaluate("//*[@class='pagination']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
    snapResults.snapshotItem(1).parentNode.insertBefore(bottomButton, snapResults.snapshotItem(1).nextSibling);

}

// add event listener
// used to scroll to tab position
if (pageUnread || pageForum || pageIndex) {
    ofst = window.innerHeight / 3; //put selected thread title on thread list pages near middle of screen
} else {
    ofst = 10; //on thread post pages, put it near the top
}

//scroll to first unread post or first thread title
window.onload = function () {
    window.scroll(0, findPos(first) - ofst);
}


window.onkeyup = scrollwithTab; //have to use keyup cause next element doesn't have focus until default action of keydown is complete
window.onkeypress = scrollwithKeys; //keyboard shortcuts for scrolling (q, a); expanding spoilers (s); closing tab (w)

//Finds y value of given object

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

//scroll to active element when tab is pressed
//follow link when ` is pressed (new tab when going to a thread, same tab when continuing a thread)

function scrollwithTab(e) {
    if (e.keyCode == 9) {   //tab
        window.scroll(0, findPos(document.activeElement) - ofst);
    }
    if (e.keyCode == 192) { // `
        if (document.activeElement.className == 'topictitle') {
            window.open(document.activeElement.href, '_blank');
        } else {
            location.href = document.activeElement.href;
        }
    }
    if ((document.activeElement.parentNode.className == 'postprofileauthor') ||
        (document.activeElement.className == 'squarebuttonl')) {
        if (e.keyCode == 87) {  // w
            window.close()
        }
    }

}

//scroll up/down with the q and a keys; now I can browse with one hand!

function scrollwithKeys(e) {
    e = e || event;
    //scroll keys q and a
    if ((document.activeElement.parentNode.className == 'postprofileauthor') ||
        (document.activeElement.className == 'squarebuttonl')) {
        if (e.charCode == 113) {    //q
            window.scrollByLines(-1)
        }
        if (e.charCode == 97) {     //a
            window.scrollByLines(1)
        }
    }
    
    //expand spoilers in active post  (s)
    if ((document.activeElement.parentNode.className == 'postprofileauthor') && (e.charCode == 115)) {
        ti = document.activeElement.tabIndex;
        snapResults = document.evaluate("//*[@tabindex = " + ti + "]/following::div[@class='content']/div/div[@class='alt2']/div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        numSpoilers = snapResults.snapshotLength;
        for (var i = numSpoilers - 1; i >= 0; i--) {
            if (snapResults.snapshotItem(i).style.display == "") {
                snapResults.snapshotItem(i).style.display = "none";
            } else {
                snapResults.snapshotItem(i).style.display = ""
            }
        }
    }
}

function addCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    //return unless head;
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
}