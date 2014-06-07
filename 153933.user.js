// ==UserScript==
// @name        Facebook Suggested Post remover
// @description Tell Mark to go Zuck himself by removing the Suggest Posts that adblock for chrome doesn't remove
// @include     http*://www.facebook.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

// original script: https://userscripts.org/scripts/show/151137
// I created a fix to apply this to dynamically AJAX loaded posts. thanks to http://stackoverflow.com/questions/5890110/greasemonkey-script-to-work-on-dynamically-loaded-posts-on-facebook

function LocalMain ()
{
var res = document.evaluate("//span[contains(text(),'Suggested Post')]", document, null, 7, null);

if (res.snapshotLength > 0) {

	for (i=0; i < res.snapshotLength; i++) {
		if (res.snapshotItem(i).className == "fwn fcg") {
			current = res.snapshotItem(i);
			while (current.tagName != "BODY") {
				current = current.parentNode;
				if (current.tagName == "LI") {
					current.parentNode.removeChild(current);
					break;
				}
			}
		}
	}
}}

LocalMain ();

var PostsChangedByAJAX_Timer    = '';

var PostContainerNode           = document.getElementById ('contentArea');

PostContainerNode.addEventListener ("DOMSubtreeModified", PageBitHasLoaded, false);


function PageBitHasLoaded (zEvent)
{
    /*--- Set and reset a timer so that we run our code (LocalMain() ) only
        AFTER the last post -- in a batch -- is added.  Adjust the time if needed, but
        half a second is a good all-round value.
    */
    if (typeof PostsChangedByAJAX_Timer == "number")
    {
        clearTimeout (PostsChangedByAJAX_Timer);
        PostsChangedByAJAX_Timer  = '';
    }
    PostsChangedByAJAX_Timer      = setTimeout (function() {LocalMain (); }, 555);
}

