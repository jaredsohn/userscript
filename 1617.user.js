// ==UserScript==
// @name           Bloglines - Open Links In New Tab
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Makes all entry/post links on Bloglines open in a new tab
// @include        http://www.bloglines.com/myblogs_display?*
// ==/UserScript==


if (!GM_openInTab) {
    alert("The 'Bloglines - Open Links In New Tab' requires a newer version of Greasemonkey to run");
}

// add a symbol into the toolbar to show this script is active
function MarkToolBar() {
    var iconData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAALHRFWHRDcmVhdGlvbiBUaW1lAFdlZCAyNSBBdWcgMjAwNCAxMzoxMzo1MyAtMDYwMAxWF1cAAAAHdElNRQfUCBkSDxTa%2BhjhAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC%2FxhBQAAAFxJREFUeNpjYKAQMGITnMnA8J8YzelA%2FUyUuoCFkA2EXEgdFzQ0NKD6uaGBAZs4kI%2FhIuqGAcwGmB9hfAwX0swF6AAe2tAwwZY%2BaOMC9PiHhQFdYoGoPEBVF1AMABE5HddSGZY7AAAAAElFTkSuQmCC";

    var icon = document.createElement("img");
    icon.src = iconData;
    icon.title = "All post links open into new tabs";


    var xpath = "//div[contains(@class, 'logbar')]/table/tbody/tr/td";
    var res = document.evaluate(xpath, document, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < res.snapshotLength; i++) {
        var td = res.snapshotItem(i);
        td.insertBefore(icon, td.firstChild);
    }
    
}

function InstrumentLink(link) {
    link.addEventListener("click", 
		function(event) {
                    GM_openInTab(link.href);
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                },
                true);
}

var xpath = "//h3/a";
var res = document.evaluate(xpath, document, null,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < res.snapshotLength; i++) {
    InstrumentLink(res.snapshotItem(i));
}

MarkToolBar();