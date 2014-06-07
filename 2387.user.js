// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          MetaWishlist Layout Adjustments
// @description   Adjusts the layout of www.metawishlists.com so that items pages are easier to browse at 1024x768.
// @include       http://www.metawishlist.com/*
// @exclude	   http://www.metawishlist.com/EditItem*
// ==/UserScript==

document.getElementById('MainPage').style.width='830px';
document.getElementById('Ads').style.width='0px';
document.getElementById('PagingControls').style.width='810px';//.user.js