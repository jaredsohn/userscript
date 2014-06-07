// ==UserScript==
// @name        YouTube - Watch Later List Utility
// @namespace   lilven
// @include     http://www.youtube.com/feed/watch_later
// @include     https://www.youtube.com/feed/watch_later
// @version     20131227
// @grant       none
// ==/UserScript==

var AddAButton = function (title, func) {
    var buttonsBar = document.getElementsByClassName("branded-page-v2-subnav-container branded-page-gutter-padding")[0];
    var button = document.createElement("BUTTON");
    button.className = " yt-uix-button yt-uix-button-default yt-uix-button-size-default";
    button.addEventListener("click", func, false);
    button.innerHTML = '<span class="yt-uix-button-content">' + title + '</span>';
    buttonsBar.appendChild(button);
}

function CheckItemsToTheBottomOfCheckedItem() {
    var items = document.getElementsByClassName("feed-item-checkbox");
    var isCheckedItemFound = false;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (isCheckedItemFound) {
            item.click();
        }
        else if (item.checked) {
            isCheckedItemFound = true;
        }
    }
}

AddAButton("Check items to the bottom of a checked item.", CheckItemsToTheBottomOfCheckedItem);