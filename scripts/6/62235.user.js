// Retweet Blocker User Script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2009, Oleg Chiruhin, olegchir.ru
// Released under the new BSD license
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Retweet Blocker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Retweet Blocker
// @namespace     olegchir.ru
// @description   script for blocking retweets of specified users
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

//This part of text cloned from:
//http://www.red-bean.com/decklin/userscripts/
//It brings old design to the main page, removes AJAX loading
const path_iter_type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const tweet_path = '//li[starts-with(@id, "status_")]';

var s = document.evaluate(tweet_path, document, null, path_iter_type, null);
var ids = [];

for (var i = 0; node = s.snapshotItem(i); i++)
    ids.push(node.id.replace('status_', ''));

document.getElementById('pagination').innerHTML =
    '<a rel="next" class="round more" href="' + window.location.pathname +
    '?max_id=' + (ids.pop() - 1) + '">next »</a>';
//End of cloned text

/*Script searches for this element and add block button into it*/
var actionListIdPrefix = "sidebar_actions_for_user_";
/*ID of list element that will be added*/
var switchButtonId = "blockRTSwitchAction";
/*Button id in the "Block RTs" state*/
var switchActionBlockId = "blockRTActionBlock";
/*Button id in the "Unblock RTs" state*/
var switchActionUnblockId = "blockRTActionUnblock";

/*Captions*/    
var blockTextBlock = "Block RTs";
var blockTextUnblock = "Unblock RTs";

/*Firefox configuration parameter that stores Greasemonkey settings*/
var gmSettings = "blockRTBannedUsersList";

/*Function that is calling when you clinck on "block"*/
function onclickRTBanButton() {
    /*Read JSON from Greasemonkey settings and deserialize it*/
    var blockedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")");
    /*Add current user to list of blocked*/
    blockedUsers[blockedUsers.length] = getCurrentUser();
    /*Save Greasemonkey settings*/
    GM_setValue(gmSettings, blockedUsers.toSource());
    /*Rebuild button code (because it's state changed)*/
    addRTBanButton();
    /*Rescan page looking for banned retweets*/
    removeBanned();
}

/*Function that is calling when you cling on "onblock"*/
function onclickRTUnbanButton() {
    /*Read JSON from Greasemonkey settings and deserialize it*/
    var blockedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")");
    
    /*Run through array, looking for current user name*/
    var counter=0;
    var currentUser = getCurrentUser();
    for (counter=0;counter<blockedUsers.length;counter++) {
        if (blockedUsers[counter]==currentUser) {
            /*And remove it with Splice (JS is so JS!)*/
            blockedUsers.splice(counter,1);
            break;
        }
    }
    /*Save Greasemonkey settings*/
    GM_setValue(gmSettings, blockedUsers.toSource());
    /*Rebuild button code (because it's state changed)*/
    addRTBanButton();
    /*Rescan page looking for banned retweets*/
    removeBanned();   
}


/*Get current user name.
Even we can get it in more civilized way,
to keep it simple now we just parse web page address*/
function getCurrentUser() {
    /*Get part of address after domain name*/
    var currUserName = window.location.pathname.substring(1);
    /*Looking for slash in the and of address*/
    var slashIndex = currUserName.indexOf('/');
    /*And if it exists - cut string from beginning to this slash*/
    if (slashIndex!=-1) {
        currUserName = currUserName.substring(0,slashIndex);
    }

    return currUserName;
}

/*Check if user is banned.*/
function userBanned() {
    /*Get current user name*/
    var currentUser = getCurrentUser();
    
    /*Get JSON from Greasemonkey settings and deserialize it*/
    var blockedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")"); 
    
    /*Run through array, and check if current user name is in it.*/
    var counter = 0;
    for (counter = 0; counter<blockedUsers.length; counter++) {
        if (blockedUsers[counter]==currentUser) {
            return 1;
        }
    }
    
    return 0;
}

/*Create link to blocking script*/
function createBlockLink () {
    
    /*Create new element in DOM*/
    var childItemAction = document.createElement('a');
    /*Set identifier from global variables*/
    childItemAction.id = switchActionBlockId;
    /*Add event listener - we cant just add onclick,
    it is feature of Greasemonkey*/
    childItemAction.addEventListener(
        'click',
        function (evt) {
            onclickRTBanButton();
            return false;
        },
        false
        );          
    /*Set right caption on the link*/
    childItemAction.innerHTML = blockTextBlock;
    /*Set hand-like cursor*/
    childItemAction.style.cursor = 'pointer';
    return childItemAction;
}

/*Create link to unblocking script*/
function createUnblockLink () {
    /*Create new element in DOM*/
    var childItemAction = document.createElement('a');
    /*Set identifier from global variables*/
    childItemAction.id = switchActionUnblockId;
    /*Add event listener - we cant just add onclick,
    it is feature of Greasemonkey*/
    childItemAction.addEventListener(
        'click',
        function (evt) {
            onclickRTUnbanButton();
            return false;
        },
        false
        );
    /*Set right caption on the link*/        
    childItemAction.innerHTML = blockTextUnblock;
    /*Set hand-like cursor*/
    childItemAction.style.cursor = 'pointer';
    return childItemAction;
}

/*Remove element from DOM, if it exists*/
function removeEl(elId) {
    /*Find element in DOM by its ID*/
    var target = document.getElementById(elId);
    
    /*Check if it found*/
    if ((target != "") && (null!=target)) {
        /*And remove it*/
        target.parentNode.removeChild(target);    
    }
}
/*Remove all handmade buttons*/
function cleanupButtons () {
    removeEl(switchActionUnblockId);
    removeEl(switchActionBlockId);
    removeEl(switchButtonId);
}

/*Rebuild block-unblock button code*/
function addRTBanButton() {  
    /*Get all elements from current web page*/
    var allHTMLTags=document.getElementsByTagName("*");

    /*Remove all previous changes*/
    cleanupButtons();

    /*Run through set of elements*/
    for (i=0; i<allHTMLTags.length; i++) {
        /*If ID of one of elements begins with one predefined for Actions panel*/
        if (allHTMLTags[i].id.indexOf(actionListIdPrefix)!=-1) {

            var parentActionsList = allHTMLTags[i];
            
            /*Add new list item, with name from global variables*/
            var childListItem = document.createElement('li');
            childListItem.id = switchButtonId;
                    
 
            /*Create appropriate block-unblock link*/
            var childItemAction;
            if (userBanned()) {
                childItemAction = createUnblockLink();
            } else {
                childItemAction = createBlockLink();
            }
            
            /*And add this button-link to the Actions panel*/
            childListItem.appendChild(childItemAction);
            parentActionsList.appendChild(childListItem);
        }
    }
}

function removeBanned() {

/*There you can set ban mode
0 - normal mode (message just disappears)
1 - UFO mode
any other number- don't do anything.*/

banMode = 1;

/*Color of UFO messages*/
var nloColor='#D3D3D3';

/*UFO text*/
var nloMsg='UFO was there and published this message';

/*---------------------------------------*/
/*Load list of blocked users from Greasemonkey settings*/
var bannedUsers = eval("("+GM_getValue(gmSettings, "[ ]" )+")");

/*Color UFO message*/
var nloFull='<span style="color:'+nloColor+';">'+nloMsg+'</span>';

/*We will search for spamtext in this elements*/
var theClass="entry-content";

/*Get all elements of current document*/
var allHTMLTags=document.getElementsByTagName("*");

/*Run through set of elements*/
for (i=0; i<allHTMLTags.length; i++) {

    /*If we find message block, looking for spam in it*/
    if (allHTMLTags[i].className==theClass) {

        /*Copy text in separate variable*/
        var currText = allHTMLTags[i].innerHTML;
    
        /*Check all the list of banned users*/
        for (i2=0; i2<bannedUsers.length;i2++) {
    
            /*Create a spamtext search pattern*/
            var currBanText = 'RT @<a class="tweet-url username" href="/'+bannedUsers[i2]+'">'+bannedUsers[i2]+'</a>';
           
            /*Checking for spam*/
            if (currText.indexOf(currBanText)!=-1) {
                /*and way of eleminating it*/
                if (banMode == 0) {
                    /*in a normal way we just remove block with this message*/
                    allHTMLTags[i].parentNode.parentNode.style.display='none';
                }
                if (banMode == 1) {
                    /*but another option is to call UFO*/
                    allHTMLTags[i].parentNode.innerHTML=nloFull;
                }
            }

        }
    }
}
/*Define true false, have a nice debug!*/

}

addRTBanButton();
removeBanned();