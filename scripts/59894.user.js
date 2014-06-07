// ==UserScript==
// @name           YouTubeChannelStyle
// @author         Oblomov
// @namespace      http://userscripts.org/scripts/show/59894
// @description    Removes all CSS styling on YouTube channels, no more silly background images, dark colours, unreadable text!
// @include        http://*youtube*

// ==/UserScript==
var chStyle = document.getElementById('channel-theme-css');
if (chStyle) {
    chStyle.parentNode.removeChild(chStyle);
}
