// ==UserScript==
// @name           Reddit History Wiper
// @namespace      pigeontech.com
// @description    When you visit your user page, it will begin removing all comments, submissions, and submission votes.
// @include        http://www.reddit.com/user/*
// ==/UserScript==

//neutralize votes on articles
function neutralizeVotes(m){

    //fill up the arrows array and sort out the elements we want
    var n = document.getElementsByTagName("body")[0].childNodes[4];
    var arrows = [];
    var re = new RegExp('\\b' + m + '\\b');
    var elem = n.getElementsByTagName("*");
    for (var i = 0; i < elem.length; i++) {
        if (re.test(elem[i].className)) {
           arrows.push(elem[i]);
        }
    }
    
    //check if we have any arrows to upmod or downmod
    if (typeof arrows[0] !== 'undefined' && arrows[0] !== null) {
        //we have arrows.  let's neutralize them.
        console.log("Neutralizing \"" + m + "\" Votes...");
        var i = 0;
        //we self invoke this function to get it going the intial time
        (function eachArrow() {
            if (i < arrows.length) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !arrows[i].dispatchEvent(evt);
                i++;
                //recall this own internal function again.  the i variable is remembered so it won't loop forever.
                setTimeout(eachArrow, 1500);
            } else {
                //refresh to load some more
                setTimeout("location.reload(true);", 1000);
            }
        })();
    } else {
        //no arrows
        console.log("Nothing to neutralize");
    }
    
}

//delete comments and submissions
function deleteCS(){
    //fill up the arrows array and sort out the elements we want
    var n = document.getElementsByClassName("yes");
    var links = [];
    for (var i = 0; i < n.length; i++) {
        //put it in an array
        links.push(n[i]);
    }
    
    
    //check if we have any links
    if (typeof links[0] !== 'undefined' && links[0] !== null) {
        //we have links.  let's click on them.
        console.log("Deleting comments and submissions...");
        var i = 0;
        //we self invoke this function to get it going the intial time
        (function eachLink() {
            if (i < links.length) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !links[i].dispatchEvent(evt);
                i++;
                //recall this own internal function again.  the i variable is remembered so it won't loop forever.
                setTimeout(eachLink, 1500);
            } else {
                //refresh to load some more
                setTimeout("location.reload(true);", 1000);
            }
        })();
    } else {
        //no arrows
        console.log("Nothing to delete");
    }

}

//find out what page we're on so the script knows what to do
function getPage(u) {
    //find out if we're on our own user page, or someone else's. We're checking the tab menu, as if you're logged in, it's different
    if (document.getElementsByClassName("tabmenu ")[0].childNodes.length > 3) {
        if (u.match(/\b\/user\/.*\/liked\b/)) {
            neutralizeVotes("arrow upmod");
        } else if (u.match(/\b\/user\/.*\/disliked\b/)) {
            neutralizeVotes("arrow downmod");
        } else {
            //on any other page under /user/*, we can delete comments and submissions
            deleteCS();
        }
    } else {
        //do nothing
    }
}

//Let's roll.
getPage(document.location.href);