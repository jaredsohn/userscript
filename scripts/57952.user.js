// ==UserScript==
// @name           Playlist.com clean-up: remove ads & meebo bar, focus search field
// @description    Set keyboard focus to the search field on the playlist.com front page, removes ads and the meebo bar
// @author        Dave Cortright
// @namespace      kpao.org
// @version        1.01
// @date            2011-07-04
// @include        http://www.playlist.com/*
// ==/UserScript==

GM_addStyle("#adParent, #ad_search, .remove-ads-button, #meebo, .meebo-00, #meebo.meebo-00, #gutter-skyscraper {display:none !important; visibility:hidden !important;}");
document.getElementById('txtHomeSearch').focus();