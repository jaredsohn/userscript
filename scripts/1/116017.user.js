// ==UserScript==
// @name         MetaFilter hedgehog comment pointer
// @namespace    https://userscripts.org/users/413683/scripts
// @version      2.0
// @description  Replaces the linked comment triangle pointer with a hedgehog
// @homepage     https://userscripts.org/scripts/show/116017
// @updateURL    https://userscripts.org/scripts/source/116017.meta.js
// @downloadURL  https://userscripts.org/scripts/source/116017.user.js
// @include      http://metafilter.com/*
// @include      http://*.metafilter.com/*
// @include      https://metafilter.com/*
// @include      https://*.metafilter.com/*
// @match        http://metafilter.com/*
// @match        http://*.metafilter.com/*
// @match        https://metafilter.com/*
// @match        https://*.metafilter.com/*
// @grant        GM_addStyle
// ==/UserScript==
//
// Version 2.0: 2013-07-03 - Now works with the new "Use SSL everywhere" user
//  profile preference for logged-in MeFi members.  Also added support for
//  automatic script updates, as well as better compatibility with Chrome.
//
// Version 1.1: 2011-10-23 - Moved hedgehog a tad farther left, so that it
//  doesn't overlap with the left stripe along comments by the asker/OP in
//  AskMe threads.
//
// The hedgehog image is licensed by Depositphotos.com/(c) artjazz:
// <http://depositphotos.com/3438006/stock-photo-Hedgehog-isolated-on-white.html>
//
// This particular hedgehog was suggested by jessamyn:
// <http://metatalk.metafilter.com/21102/hooray-for-readability#936714>

var hedgehog = 'data:image/png;base64,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';

GM_addStyle("div#triangle { background: url(" + hedgehog + ") no-repeat center !important; border-color: transparent !important; border-style: none !important; border-width: 0 !important; height: 30px !important; left: 10px !important; width: 50px !important; z-index: -10; }");

// If you're also using the metafilter_scroll_tag script, the negative z-index 
// allows the Scroll Tag marker to show over the hedgehog layer. Remove the 
// z-index declaration if you want the marker to appear under the hedgehog.
