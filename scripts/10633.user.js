// ==UserScript==
// @name           Google Reader Minus Craigslist Spam
// @namespace      iowa.city.sam
// @include        *google.com/reader/*
// ==/UserScript==

/*
* Google Reader Minus Craigslist Spam
* Version 1.0
* Written by Sam Beran
* This script is Public Domain. You are welcome to use it in any way you like.
*
*
***********************************************************
* This script will hide craigslist entries in Google Reader if they have been flagged,
* or if they have been deleted. They will also be marked as read.
***********************************************************
*/
var spam = '<h2>This posting has been <a href="http://www.craigslist.org/about/help/flags_and_community_moderation">flagged</a> for removal</h2>';
var deleted = '<h2>This posting has been deleted by its author.</h2>';
//find the entry link and see if it goes to cl
function removeSpamEntry(element,linkClassName,tagToClick,classToClick){
    var links = element.getElementsByTagName('A');
    for(var i=0;i<links.length;i++){
        var link = links[i];
        if((link.className==linkClassName)&&link.href.match(/craigslist\.org/)){
            //analyze the link's content
            GM_xmlhttpRequest({
                method: 'GET',
                url: link.href,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml'
                },
                onload:function(responseDetails) {
                    //see if it is spam or deleted
                    if(responseDetails.responseText.indexOf(spam) >= 0 || responseDetails.responseText.indexOf(deleted) >= 0){
                        var elems = element.getElementsByTagName(tagToClick);
                        for(var i=0; i < elems.length; i++){
                            var el = elems[i];
                            //hide the element and mark it as read by clicking it
                            element.style.display = 'none';
                            if(el.className==classToClick){
                                // click it. code from MDC: http://developer.mozilla.org/en/docs/DOM:document.createEvent
                                var evt = document.createEvent("MouseEvents");
                                evt.initMouseEvent("click", true, true, window,
                                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                el.dispatchEvent(evt);

                            }
                        }

                    }
                }
            });
        }
    }
}

function process_inserted_node(e){
	var element = e.target;
	if (element.nodeName=='DIV' && element.className.match(/^entry/)){
        //an expanded view entry card
		if (element.firstChild.className =='card') {
      removeSpamEntry(element,'entry-title-link','span','read-state-unread read-state link');
		}
		//a list view collapsed entry
		else if(element.firstChild.className == 'collapsed'){
			removeSpamEntry(element,'entry-original','div','collapsed');
		}
	}
}


document.body.addEventListener('DOMNodeInserted', process_inserted_node, false);