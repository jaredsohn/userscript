// ==UserScript==
// @name       Watch Later view fixer
// @namespace  http://twitter.com/BJHanssen/
// @version    0.2
// @description  Changes Youtube's Watch Later view back to one that is actually usable (with the Remove Watched Videos function, and bulk actions). This script does not change the link correctly (or at all) if the navbar isn't showing on page load.
// @include      http://*.youtube.com/*
// @include      https://*.youtube.com/*
// @copyright  ...is a joke. 
// ==/UserScript==
window.addEventListener('DOMContentLoaded', function(){

    // Encapsulate evaluation parameters for easier access to and use of xpath
    function xpath(query, parent) {
        return document.evaluate(query, parent, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    // Initiate variables...
    var links, thisLink, i;
    
    // Find all A elements in the navbar with a title
    links = xpath('//a[@title]', document.getElementById('guide-container'));
    
    // Go through the found links, look for the Watch Later link and replace the HREF with the proper one
    for (i = 0; i < links.snapshotLength; i++) {
        thisLink = links.snapshotItem(i);
        if(thisLink.title == 'Watch Later' && thisLink.href !== '/feed/watch_later'){
            thisLink.href = '/feed/watch_later';
        }
    }
    
    // Are we watching a video? Is the playlist showing? Let's make sure the title link points to the right page!
    if(document.getElementById('watch-appbar-playlist') != null){
        
        // Find the the links in the playlist in watch view
        links = xpath("//a[@class='spf-link']", document.getElementById('watch-appbar-playlist'));
        
        // Find the one containing the text "Watch Later"
        for (i = 0; i < links.snapshotLength; i++) {
            thisLink = links.snapshotItem(i);
            if(thisLink.innerHTML.indexOf("Watch Later") != -1 && thisLink.href != '/feed/watch_later'){
                thisLink.href = '/feed/watch_later';
            }
        }
    }
});