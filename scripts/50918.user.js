// ==UserScript==
// @name        Yahoo Mail Dock Badge
// @namespace   http://fluidapp.com
// @description Displays a dock badge for the unread email count
// @include     *
// @author      kennydude
// ==/UserScript==
var thisNot = '';											
var thisInb = '';											
var thisTotal = '';							

(function () {
	if (!window.fluid) {
		return;
	}
	if (window.fluid) {
		try { 
			updateBadge();
		} catch(e) { 
			window.console.log(e);
		}
	}
})();

(function () {
    updateBadge();
    window.setInterval(updateBadge, 20);
})();

function updateBadge() {								
	var counts = document.getElementsByClassName("folderCount")
	if (counts && counts.length && counts.length > 0) {
	    var total = 0;
	    total = getFolderCount(counts[0]) //get the count for Inbox
	    for (var i = 4; i < counts.length; i++) { //start at index 4, because 1, 2, 3 correspond to Drafts, Sent and Spam
	        total += getFolderCount(counts[i])
	    }
	}							
	if (total==0) {
		
	} else if(total==undefined){
		
	} else {											
		window.fluid.dockBadge = total;
	}
}


function getFolderCount(element) {
    if (element.childNodes.length > 0) {
        var count = element.firstChild.nodeValue
        return parseInt(count.substr(1,count.length-2))
    } else
        return 0
}