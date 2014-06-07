// ==UserScript==
// @name        Remove Recommended Channels
// @description Removes the "Recommended Channels" panel on the "My Subscriptions" panel.
// @include     https://www.youtube.com/feed/subscriptions
// @version     1
// @grant       none
// ==/UserScript==

var RecommendedChannelsPanel = document.getElementsByClassName("branded-page-v2-secondary-col")[0];
RecommendedChannelsPanel.parentNode.removeChild(RecommendedChannelsPanel);