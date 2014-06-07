// ==UserScript==
// @name        Open unread
// @description Issues click on all unread items to open them in separate tabs and mark as read
// @namespace   com.google.reader.tweaks
// @include     /https?:\/\/(www\.)?google\.com\/reader\/.*/
// @include     /https?:\/\/(www\.)?reader\.google\.com\/.*/
// @version     1
// ==/UserScript==

function openUnread() {
    var entryRefs = document.getElementsByTagName("A");
    for (var i = 0; i < entryRefs.length; i++) {
        if (entryRefs[i].className == "entry-original" && entryRefs[i].parentElement.parentElement.parentElement.className.indexOf("read") == -1) {
            entryRefs[i].click();
        }
    }
}

var viewLinks = document.getElementById('chrome-view-links')
if (viewLinks) {
    var button = document.createElement("button");
    button.innerHTML = 'Open unread';
    button.onclick = openUnread;
    button.style.height = "30px";
    viewLinks.parentNode.insertBefore(button, viewLinks);
}