// ==UserScript==
// @name           Instructables "All Steps" Fixer
// @namespace      http://www.instructables.com/*
// @description    Automatically loads All Steps instead of the Intro only
// @include        http://www.instructables.com/*
// ==/UserScript==

//Made by Zachninme
//Although this is open-source, always leave the above line intact. Thanks.
//Modified by fungus amungus
//Modified by Rogue Trooper  2:42 PM 5/22/2007: goes to all steps page no matter how you get to the instructable
//Modified by Rogue Trooper 11:05 AM 6/22/2007: fix ?rsslink issue

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

    if ((thisLink.href.substring(11,31)=="instructables.com/id") && (thisLink.href.indexOf("#") == -1) && 

(thisLink.href.indexOf("ALLSTEPS") == -1)) {
 thisLink.href += '?ALLSTEPS';}

    else if ((window.location.href.substring(48,50)=="?r") && (window.location.href.indexOf("#") == -1) &&  

(window.location.href.indexOf("ALLSTEPS") == -1)) {
 window.location.href = window.location.href.substring(0,48);}

    else if ((window.location.href.substring(51,53)=="?r") && (window.location.href.indexOf("#") == -1) &&  

(window.location.href.indexOf("ALLSTEPS") == -1)) {
 window.location.href = window.location.href.substring(0,51);}

    else if ((window.location.href.substring(11,31)=="instructables.com/id") && (window.location.href.indexOf("#") == -1) &&  

(window.location.href.indexOf("ALLSTEPS") == -1)) {
 window.location.href = window.location.href += '?ALLSTEPS';}

}
