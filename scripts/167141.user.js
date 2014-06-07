// ==UserScript==
// @name           Automatic Youtube Subscription Box
// @version        1.0
// @author         PaperDerp
// @description    Redirects you to your subscription box when going on the main page.
// @include        http*://*youtube.com/*
// @exclude        http*://*youtube.com/*feed*
// @exclude        http*://*youtube.com/*watch?*
// @exclude        http*://*youtube.com/*user*
// @exclude        http*://*youtube.com/*inbox*
// @exclude        http*://*youtube.com/*account*
// @exclude        http*://*youtube.com/*account_sharing*
// @exclude        http*://*youtube.com/*account_privacy*
// @exclude        http*://*youtube.com/*account_notifications*
// @exclude        http*://*youtube.com/*account_playback*
// @exclude        http*://*youtube.com/*my_videos?*
// @exclude        http*://*youtube.com/*videos*
// @exclude        http*://*youtube.com/*channels*
// @exclude        http*://*youtube.com/*channel*
// @exclude        http*://*youtube.com/*shows*
// @exclude        http*://*youtube.com/*yt*
// @exclude        http*://*youtube.com/*t*
// @exclude        http*://*youtube.com/*dev*
// @exclude        http*://*youtube.com/*embed*
// @include        https*://*youtube.com/*
// @exclude        https*://*youtube.com/*feed*
// @exclude        https*://*youtube.com/*watch?*
// @exclude        https*://*youtube.com/*user*
// @exclude        https*://*youtube.com/*inbox*
// @exclude        https*://*youtube.com/*account*
// @exclude        https*://*youtube.com/*account_sharing*
// @exclude        https*://*youtube.com/*account_privacy*
// @exclude        https*://*youtube.com/*account_notifications*
// @exclude        https*://*youtube.com/*account_playback*
// @exclude        https*://*youtube.com/*my_videos?*
// @exclude        https*://*youtube.com/*videos*
// @exclude        https*://*youtube.com/*channels*
// @exclude        https*://*youtube.com/*channel*
// @exclude        https*://*youtube.com/*shows*
// @exclude        https*://*youtube.com/*yt*
// @exclude        https*://*youtube.com/*t*
// @exclude        https*://*youtube.com/*dev*
// @exclude        https*://*youtube.com/*embed*
// @run-at         document-start
// ==/UserScript==
window.location = document.URL+"feed/subscriptions";