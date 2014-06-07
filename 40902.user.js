// ==UserScript==
// @name           Google Reader - easy keys
// @namespace      http://www.charliewilkins.com
// @description    Easy Keys!
// @include        http://www.google.com/reader*
// ==/UserScript==

function keyHandler(event){

	

	GM_log('foo---: '+ event.target.name);
	if (event.target.name != undefined) {
		return;
	}

	
    // I don't know why this comes out as upper 'B' rather than lower 'b'.
    var key = String.fromCharCode(event.which || event.keyCode);
    switch (key) {
        case 'Q': // Open link in new tab.
            next_button = document.getElementById('entries-down');
            next_button_evt = document.createEvent('MouseEvents');
            next_button_evt.initEvent('click', true, true);
            next_button.dispatchEvent(next_button_evt);
            break;
        case 'W': // Open link in new tab.
            next_button = document.getElementById('entries-up');
            next_button_evt = document.createEvent('MouseEvents');
            next_button_evt.initEvent('click', true, true);
            next_button.dispatchEvent(next_button_evt);
            break;
        case 'D': // Open link in new tab.
            all_read_button = document.getElementById('mark-all-as-read');
            all_read_button_evt = document.createEvent('MouseEvents');
            all_read_button_evt.initEvent('click', true, true);
            all_read_button.dispatchEvent(all_read_button_evt);
            break;
        case '3': // Open next feed or first feed;
            // find the currently selected sub
            currentFeed = null;
            selectedElements = document.getElementsByClassName("tree-link-selected");
            if (selectedElements.length < 1) { // no feed selected
                subTree = document.getElementById('sub-tree-container');
                subsLinks = subTree.getElementsByClassName('link');
                for (var i = 0; i < subsLinks.length; i++) {
                    nextFeed = subsLinks[i];
                    feedParent = nextFeed.parentNode;
                    if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {
                    
                        feed_click_evt = document.createEvent('MouseEvents');
                        feed_click_evt.initEvent('click', true, true);
                        nextFeed.dispatchEvent(feed_click_evt);
                        break;
                    }
                }
                break;
            }
            else {
                currentFeed = selectedElements[0];
            }
            subTree = document.getElementById('sub-tree-container');
            subsLinks = subTree.getElementsByClassName('link');
            for (var i = 0; i < subsLinks.length; i++) {
            
                if (currentFeed.id == subsLinks[i].id) {
                    // get the next feed item
                    for (var j = i + 1; j < subsLinks.length; j++) {
                        nextFeed = subsLinks[j];
                        feedParent = nextFeed.parentNode;
                        if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {
                        
                            feed_click_evt = document.createEvent('MouseEvents');
                            feed_click_evt.initEvent('click', true, true);
                            nextFeed.dispatchEvent(feed_click_evt);
                            break;
                        }
                    }
                    
                    
                    
                    break;
                }
            }
            break;
        case '4': // Open previous feed or first feed;
            // find the currently selected sub
            currentFeed = null;
            selectedElements = document.getElementsByClassName("tree-link-selected");
            if (selectedElements.length < 1) { // no feed selected
                subTree = document.getElementById('sub-tree-container');
                subsLinks = subTree.getElementsByClassName('link');
                for (var i = 0; i < subsLinks.length; i++) {
                    nextFeed = subsLinks[i];
                    feedParent = nextFeed.parentNode;
                    if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {
                    
                        feed_click_evt = document.createEvent('MouseEvents');
                        feed_click_evt.initEvent('click', true, true);
                        nextFeed.dispatchEvent(feed_click_evt);
                        break;
                    }
                }
                break;
            }
            else {
                currentFeed = selectedElements[0];
            }
            subTree = document.getElementById('sub-tree-container');
            subsLinks = subTree.getElementsByClassName('link');
            for (var i = 0; i < subsLinks.length; i++) {
            
                if (currentFeed.id == subsLinks[i].id) {
                    // get the next feed item
                    for (var j = (i-1); j > 0; j--) {
                        nextFeed = subsLinks[j];
                        feedParent = nextFeed.parentNode;
                        if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {
                        
                            feed_click_evt = document.createEvent('MouseEvents');
                            feed_click_evt.initEvent('click', true, true);
                            nextFeed.dispatchEvent(feed_click_evt);
                            break;
                        }
                    }
                    
                    
                    
                    break;
                }
            }
            break;
    }
    return false;
}

// main() invocation 
window.addEventListener('keydown', keyHandler, false);
