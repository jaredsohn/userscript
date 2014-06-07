// ==UserScript==
// @name          Facebook Chat Cleaner
// @namespace	http://sumtips.com
// @description	  This script hides all offline users and the Ticker in Facebook chat. Plus, it also hides Facebook ads on new Timeline profile.
// @author        Renji
// @homepage      http://sumtips.com/
// @include         *://*.facebook.com/*
// @match         *://*.facebook.com/*
// @version       1.0
// ==/UserScript==
(function(){var css=".fbChatOrderedList .item.active,.fbChatOrderedList .item.mobile {display: block;} #pagelet_ticker,.fbTickerFooter,.fbSidebarGripper,.fbTimelineSideAds,.uiScrollableArea.ticker_container.fade.contentAfter,.fbChatOrderedList .separator,.fbChatOrderedList .item{display: none;}";if(typeof GM_addStyle!="undefined")GM_addStyle(css);else if(typeof PRO_addStyle!="undefined")PRO_addStyle(css);else if(typeof addStyle!="undefined")addStyle(css);else{var heads=document.getElementsByTagName("head");
if(heads.length>0){var node=document.createElement("style");node.type="text/css";node.appendChild(document.createTextNode(css));heads[0].appendChild(node)}}})();