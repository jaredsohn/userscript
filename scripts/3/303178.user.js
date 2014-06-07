// ==UserScript==
// @name       BGG Shortcuts
// @namespace  BGG Shortcuts
// @version    0.6.1
// @description  Keyboard shortcuts for the Geek
// @include		http://*.boardgamegeek.*/*
// @include		http://boardgamegeek.*/*
// @copyright  2013+, JB McMichael
// ==/UserScript==

/*
 * CHANGLOG::
 * ============================================
 * 0.6.1 - Give the page some time to load its scripts before changing links
 * 0.6 - Added a shortcut to go to the searchbox Ctrl + /
 * 0.5 - Added homepage links opening in new tab
 * 0.4 - If search returns one result just go to that result
 * 0.3 - Added homepage shortcut; Ctrl + Shift + H
 * 0.2 - Cleaned up the subscription jump link
 * 0.1 - First version, shortcut for subscriptions; Ctrl + M
 * 
 */

(function () {
    "use strict";
    console.log('Loaded BGG Shortcuts');
    
    document.body.addEventListener('keydown', function(e){
        // Next subscription item Ctrl + M
        if (e.ctrlKey && e.keyCode === 77) {
            [].slice.call(document.querySelectorAll("img:not(dn).nextsubcol"))[0].parentNode.parentNode.click();
        }
        
        // Home page Ctrl + Shift + H
        if (e.ctrlKey && e.shiftKey && e.keyCode === 72 && window.location.href !== window.location.origin) {
            window.location.href = window.location.origin;
        }
        
        // Search box jump Ctrl + /
        if (e.ctrlKey && e.which === 191) {
            var searchbox = document.getElementById('sitesearch'),
                active = document.activeElement;
            if (active.tagName === 'BODY') {
            	document.body.scrollTop = 0;
            	searchbox.focus();
            }
        }
    }, false);
    
    //check for one result on the search page
    if (window.location.pathname === '/geeksearch.php' && window.location.search.search(/action=search/)) {
        var results = document.querySelectorAll('#collectionitems tbody tr');
        console.log('We are searching');
        if (results.length === 2) {
            console.log('Found just one result, redirect');
            var link = results[1].querySelectorAll('#results_objectname1 a'),
                href = link[0].getAttribute('href');
            
            window.location.href = window.location.origin + href;
        }
    }
    
    // set all homepage module links to open in new tab
    if (window.location.pathname === '/') {
        window.setTimeout(function(){
            console.log('Changing homepage links');
        	var links = document.querySelectorAll('.innermoduletable tbody td a.ng-binding'),
            	linkArray = [].slice.call(links);
        
            linkArray.forEach(function(item, index){
                item.setAttribute('target', '_blank');
            });
        },500);
    }
}());

