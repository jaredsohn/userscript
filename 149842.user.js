// ==UserScript==
// @name       YouTube - Hide watched YouTube videos
// @version    0.6
// @description  YouTube - Hide watched YouTube videos
// @match      http://www.youtube.com/*
// @match      http://youtube.com/*
// @match      https://www.youtube.com/*
// @match      https://youtube.com/*
// @copyright  Aviem Zur
// ==/UserScript==

var hide = function() {
    var watched = document.evaluate("//div[contains(text(),'WATCHED')]/../../../..",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < watched.snapshotLength; i++) {
        var w = watched.snapshotItem(i);
        w.style.display = 'none';
    }
}

/*
var nav = document.getElementById("channel-navigation-menu");
var li = document.createElement('li');
li.innerHTML += '<h2 class="epic-nav-item-heading">Hide watched</h2>';
li.onclick=hide;
nav.appendChild(li);
*/

document.addEventListener("DOMSubtreeModified", function() { hide(); } , false);
