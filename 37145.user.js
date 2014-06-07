// MyRedditbar user script
// version 0.2
// Copyright 2008 Nicola Archibald
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name MyRedditbar
// @namespace http://www.crysalis.com/nikki/MyRedditBar
// @description Makes the reddit topbar show all your subscribed reddits, optionally excluding certain reddits
// @include http://www.reddit.com/*
// @exclude http://www.reddit.com/static/*
// ==/UserScript==

// edit this if you don't want some of your subbed reddits to appear on the menu (eg, NSFW)
// eg:  excludedReddits = [ "nsfw", "nsfwvideos", "politics" ];

excludedReddits = [];

// Edit this to specify specific ordering of the left-most reddits on the list. Earlier items 
// in the list are further to the left
priorityReddits = [];

// For example: 
// priorityReddits = [
//     "programming",
//     "gaming",
//     "geek",
//     "comics"
// ];



function doRedditCleaning() {
// housekeeping...
    for (i = 0; i < excludedReddits.length; i++) {
        x = excludedReddits[i].toLowerCase();
        excludedReddits[i] = x;
    }        
    
    menu = document.getElementById("sr-bar");
    
// Obtain the current reddit, for the 'selected' class
    ps = "";
    if (menu.getElementsByClassName("selected").length > 0) {
        elem = menu.getElementsByClassName("selected")[0];
        links = elem.getElementsByTagName("a");
        ps = links[0].innerHTML.toLowerCase();
    }
    
// first erase the existing menu...
    
    for (i = menu.childNodes.length - 1; i >= 0; i-- ) {
        menu.removeChild( menu.childNodes[i] );
    }
    
// Rebuild the new menu
    
    header = document.getElementById("sr-header-area");
    e = header.getElementsByTagName("div");
    for (i = 0; i < e.length; i++) {
        if (e[i].className.match( "drop-choices")) {
            nodes = e[i].childNodes;
            rightside = new Array();
            leftside = new Array( priorityReddits.length );
            selectedIndex = -1;
            
            for (j = 0; j < nodes.length; j++) {
                n = nodes[j];
                if (excludedReddits.indexOf( n.innerHTML.toLowerCase() ) < 0) {
                    
                    name = n.innerHTML.toLowerCase();                    
                    newNode = document.createElement("li");
                    newNode.reddit = name;
                    
                    newLink = document.createElement("a");
                    newLink.href = n.href;
                    newLink.innerHTML = n.innerHTML;
                    
                    newNode.appendChild( newLink );
                    
                    if (priorityReddits.indexOf(name) >= 0) {
                        idx = priorityReddits.indexOf(name);
                        leftside[idx] = newNode;
                    } else {
                        rightside.push( newNode );
                    }
                }
            }

            sorted = new Array();
            for (i in leftside) {
                if (typeof(leftside[i]) != "undefined")
                    sorted.push( leftside[i] );
            }

            for (i in rightside) {
                sorted.push( rightside[i] );
            }

            // now go thru and add seperators to all but the first...

            for (j = 1; j < sorted.length; j++) {
                if (typeof(sorted[j]) != "undefined") {
                    newSep = document.createElement("span");
                    newSep.className = "separator";
                    newSep.innerHTML = "-";
                    sorted[j].insertBefore( newSep, sorted[j].firstChild );
                }
            }

            // finally add them to the menubar...
            for (j = 0; j < sorted.length; j++) {
                if (typeof(sorted[j]) != "undefined") {
                    itm = sorted[j];
                    if (itm.reddit == ps) {
                        itm.className = "selected";
                    }
                    menu.appendChild( itm );
                }
            }


        }
    }
}

doRedditCleaning();
