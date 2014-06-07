// ==UserScript==
// @name          NoBharti
// @namespace     http://blog.arpitnext.com
// @description   Removes annoying yellow message box notice from twitter homepage
// @author        ArpitNext
// @version       1.0
// @include       http://twitter.com/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('class') == 'bulletin info') style.display = 'none';
})();