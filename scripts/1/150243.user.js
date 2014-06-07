// ==UserScript==
// @name          Youtube No Highlights
// @namespace     http://nmgod.com
// @description   Selects Everything view for subbox, no more missing videos,
// @include       http://youtube.com
// @include       http://www.youtube.com
// @include       https://youtube.com
// @include       https://www.youtube.com
// @include       http://youtube.com/
// @include       http://www.youtube.com/
// @include       https://youtube.com/
// @include       https://www.youtube.com/
// @copyright     NMGod
// ==/UserScript==

var selectedView = document.getElementsByClassName("feed-view-choice checked yt-uix-button-menu-item")[0];
var views = document.getElementsByClassName("feed-view-choice yt-uix-button-menu-item");
if(selectedView.childNodes[0].nodeValue == "Highlights") {
    if(views[0].childNodes[0].nodeValue == "Everything") {
        views[0].click();
    } else {
        views[1].click();
    }
}