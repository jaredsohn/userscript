// ==UserScript==
// @name           Zap2It Auto Highlight Favorites
// @namespace      Yffffonzscripts
// @description    Always highlight favorites on Zap2It listings
// @include        http://tvlistings.zap2it.com/tvlistings/ZCGrid.do*
// @include        http://tvlistings.zap2it.com/tv/*
// @include        http://affiliate.zap2it.com/tvlistings/ZCGrid.do*
// ==/UserScript==


// For Favorite Programming:
location.assign("javascript:zctv.GridView.highlightGenre('zc-favorites','zc-item')")


// This can be modified to use any of the additional Highlighting Options as follows:

// For News Programming:
// location.assign("javascript:zctv.GridView.highlightGenre('zc-news')")

// For Children's Programming:
// location.assign("javascript:zctv.GridView.highlightGenre('zc-children')")

// For Sports Programming:
// location.assign("javascript:zctv.GridView.highlightGenre('zc-sports')")

// For Movies:
// location.assign("javascript:zctv.GridView.highlightGenre('zc-movie')")