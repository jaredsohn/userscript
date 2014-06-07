// ==UserScript==

// @name           Tumblr: asanusta Confirm Unfollows From Dashboard

// @namespace      http://asanusta.tumblr.com
// @description    Panoda sizi unfollow edenler, bu nedenle yanlışlıkla 'unfollow' yerine 'rica' tıklayın ve yeni bir sekmede bir onay görüntüler.-Displays a confirmation in a new tab if you unfollow from the dashboard, so you don't accidentally click 'unfollow' instead of 'ask'.
// @include        http://www.tumblr.com/dashboard*

// @include        http://www.tumblr.com/likes*

// @include        http://www.tumblr.com/tagged/*

// @version       02.09.2012 asanusta

// ==/UserScript==



(function(d){

var req = new XMLHttpRequest();

var allUM = document.evaluate("//a[@following]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var length = allUM.snapshotLength;

for (var i = 0; i < length; i++) {

	thisUM = allUM.snapshotItem(i);

	thisUM.onclick = '';
}

}(document));