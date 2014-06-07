// No Troll 3.0.4NFF User Script
// version 3.0.4NFF
// 2009-05-03
// written by ab03/matchst1ck
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          No Troll 3.0.4NFF
// @namespace     none
// @description   Script to prevent display of posts and diaries of users on SBN 2.0 boards
// @include       http://www.lonestarball.com/*
// ==/UserScript==

var allLinks, thisLink, i, j, uidtextLSB, uidtextSBN;						

//Enter screen name of person you want to block exactly as they appear.  The script will handle spaces
trolls = ["Josey Wales"]; 



//DO NOT CHANGE CODE BELOW THIS COMMENT

//Initial function call on load
doWork();

//Code to add a hide button a specific comment
//Change HTML here for different colors and text
function addHideButton(c) {
    var o = document.getElementById(c);
    if (o == null) { o = c; }
    
    var hideButton = document.getElementById(o.id.replace("comment_item_", "comment_inner_") + "_hide");
    if (hideButton == null) {
        var commentTitle = document.getElementById(o.id.replace("comment_item", "comment_title").replace("comment_inner", "comment_title"));

        hideButton = document.createElement("span");
        hideButton.innerHTML = '<span style="font-size: xx-small; color: #FFFFFF; background-color: #003278">HIDE</span>';
        hideButton.id = o.id.replace("comment_item_", "comment_inner_") + "_hide";
        hideButton.addEventListener ('dblclick', function(){hideBranch(this.id)}, false)
        
        var headerLink = commentTitle.childNodes[0];
        commentTitle.insertBefore(hideButton, headerLink);
    }
}

function removeTroll(c) {
    var o = document.getElementById(c);
    if (o == null) { o = c; }
    
    var commentInner = document.getElementById(o.id.replace("comment_item_", "comment_inner_"));
    for (i = 0; i < commentInner.childNodes.length; i++) {
        var child = commentInner.childNodes[i];
        if (child != null && child.innerHTML != null && child.childNodes.length > 1) {
            for (j = 0; j < trolls.length; j++) {
                uidtextLSB = new String("http://www.lonestarball.com/users/"+trolls[j].replace(" ", "%20"));
                uidtextSBN = new String("http://www.sbnation.com/users/"+trolls[j].replace(" ", "%20"));
                
                if(child.childNodes[1].href != null);
                
                if (child.childNodes[1].href == uidtextLSB || child.childNodes[1].href == uidtextSBN) {
                    commentInner.parentNode.style.display = "none";
                    return true;
                }
            }
        }
    }
    
    return false;
}

//Rewired built in SBN functions to check using isVisible function
SBN.Comments.Cycle.goToIndex = function(a) {
if (SBN.Comments.Cycle.list.length == 0) { return } else {
        var e = SBN.Comments.Cycle.currentComment();
        if (e != null) { SBN.Comments.Cycle.notCurrent(e) } SBN.Comments.Cycle.index = a;
        var c = SBN.Comments.Cycle.currentComment();
        
        SBN.Comments.Cycle.current(c);
        if (SBN.Comments.scrollToComment(c)) {
            SBN.Comments.Cycle.lookingAtComment = true;
            return true;
        }
        else {
            SBN.Comments.Cycle.lookingAtComment = true;
            SBN.Comments.Cycle.remove();
            return false;
        }
    }
};

SBN.Comments.scrollToComment = function(c, a) {
    if (isVisible(c)) {
        addHideButton(c);
        if (removeTroll(c) == false) {
            a = Object.extend({ duration: 0.2, offset: SBN.Comments.scrollOffset }, a || {});
            new Effect.ScrollTo(c, a);
            return true;
        }
        else {
            return false;
        }
        
    }
    else {
    return false;
    }
};


SBN.Comments.scrollTo = function(a) { 
    if (isVisible(document.getElementById(a)) != false) {
        new Effect.ScrollTo(a, { duration: 0.2 });
    }
};

SBN.Comments.Cycle.next = function() {
    var a = (SBN.Comments.Cycle.index >= SBN.Comments.Cycle.list.length - 1) ? 0 : SBN.Comments.Cycle.index + 1;
    if (SBN.Comments.Cycle.goToIndex(a) == false) {
        SBN.Comments.Cycle.next();
    }
};

SBN.Comments.Cycle.previous = function() {
    if (!SBN.Comments.Cycle.lookingAtComment) { 
        ++SBN.Comments.Cycle.index 
    } 
    var a = (SBN.Comments.Cycle.index <= 0) ? SBN.Comments.Cycle.list.length - 1 : SBN.Comments.Cycle.index - 1;
    if (SBN.Comments.Cycle.goToIndex(a) == false) {
        SBN.Comments.Cycle.previous();
    }
};

//Function to make sure that no element in the parent chain is hidden
function isVisible(c) {
    var o = document.getElementById(c);
    if (o == null) { o = c; }
    
    if (o.parentNode.style.display == "none") {
        return false;
    }
    else if (o.parentNode.id != "entries") {
        return isVisible(o.parentNode);
    }
    else {
        return true;
    }
}

function doWork() {
    addHideButtons();
    killTrolls();
}

//Find trolls.  Kill them.
function killTrolls() {

    allLinks = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (i = 0; i < allLinks.snapshotLength; i++) {
            
        thisLink = allLinks.snapshotItem(i);

        for (j = 0; j < trolls.length; j++) {
            uidtextLSB = new String("http://www.lonestarball.com/users/"+trolls[j].replace(" ", "%20"));
            uidtextSBN = new String("http://www.sbnation.com/users/"+trolls[j].replace(" ", "%20"));
            if (thisLink.href == uidtextLSB || thisLink.href == uidtextSBN){
                
                var byLine=thisLink.parentNode;   
                var commentInner=byLine.parentNode;
                var commentItem=commentInner.parentNode;
                
                if (commentItem.style.display != "none") {
                    //Blocks comments
                    if (commentInner.getAttribute('class') == "comment not-new clearfix" || 
                        commentInner.getAttribute('class') == "comment new clearfix" || 
                        commentInner.getAttribute('class') == "comment recommended not-new clearfix" ||
                        commentInner.getAttribute('class') == "comment clearfix") {
                        
                        commentItem.style.display = "none";
                    }

                    //Blocks comments of users with pics enabled
                    if (commentInner.getAttribute('class') == "comment cpic not-new clearfix" || 
                        commentInner.getAttribute('class') == "comment cpic new clearfix" ||
                        commentInner.getAttribute('class') == "comment cpic clearfix") {
                        
                        commentItem.style.display = "none";
                        i=i+3;
                    }
                    
                    //Blocks diaries
                    if (commentInner.getAttribute('class') == "byline") {

                        commentItem.style.display = "none";
                    }
                }
            }
        }
    }
}

//Initial run through page links
function addHideButtons() {

    allLinks = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (i = 0; i < allLinks.snapshotLength; i++) {
            
        thisLink = allLinks.snapshotItem(i);

        uidtextLSB = new String("http://www.lonestarball.com/users/");
        uidtextSBN = new String("http://www.sbnation.com/users/");
        
        if (thisLink.href.substring(0, uidtextLSB.length) == uidtextLSB || 
            thisLink.href.substring(0, uidtextSBN.length) == uidtextSBN){
            
            var byLine=thisLink.parentNode;   
            var commentInner=byLine.parentNode;
            var commentItem=commentInner.parentNode;
            
            if (commentInner.getAttribute('class').substring(0, 7) == "comment") {
                addHideButton(commentInner);
            }
        }
    }
}

function hideBranch(c) {
    var commentIgnore = document.createElement("div");
    var commentInner = document.getElementById(c.substring(0, c.length-5));
    var commentItem = commentInner.parentNode;
    
    commentItem.style.display = "none";
}