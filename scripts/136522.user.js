// ==UserScript==
// @name          Mad's NoAds for forum.xda-developer.com
// @namespace     http://madmunki.com/noads/xda-developers.com/
// @description   Removes ads from forum.xda-developers.com
// @include       http://forum.xda-developers.com/*
// Developed By Lord Madmunki mad@madmunki.com
// ==/UserScript==

function removeDiv(divid) {
    var adDiv = null;
    if (adDiv = document.getElementById(divid)) {
        adDiv.parentNode.removeChild(adDiv);
    }
}
function main() {
    removeDiv('topcontainbox');
    removeDiv('NewForum_ATF_300x250');
    removeDiv('forumlist-ad');
    removeDiv('ad-billboard-bottom');
    removeDiv('ROS_728_Bottom');
    removeDiv('NewForum_ForumDisp_728Bottom');
    removeDiv('NewForum_InContent_728x90');
}

main();