// ==UserScript==
// @name           SRAutoXP
// @namespace      *
// ==/UserScript==

//window.location.href = "http://apps.facebook.com/streetracinggame/fight.php"
//alert('Working New');

var allLinks, thisLink; 
allLinks = document.evaluate( 
    '//a[contains(@href, "user")]', 
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
   null); 
//for (var i = 0; i < allLinks.snapshotLength; i++) { 
    thisLink = allLinks.snapshotItem(0);
    //get user id
    user = thisLink + '';
    user = user.substring(57, user.length);
    window.location.href = "http://apps.facebook.com/streetracinggame/jobs.php?uid=" + user + "&jcode=48";
//}