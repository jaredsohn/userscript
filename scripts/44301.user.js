// ==UserScript==
// @name           ql_tier_checker
// @namespace      http://this.is.a.fake.namespace.com/bla
// @description    Display your Quake Live tiers within the content area on the top right of the page.
// @include        http://*.quakelive.com/*
// @author         magnoz
// ==/UserScript==

// only slightly modified, original author see below.

// original author: cania, reposted on quake live forum by larz
// http://www.quakelive.com/forum/archive/index.php/t-12136.html

// This is based on wn's Tier Checker Script
// http://beta.quakelive.com/forum/showthread.php?t=5178
var showTierInfo = function() {
var content = document.getElementById('qlv_topLinks');
var style = "color:#FFEE44;font-size:10px;font-family:Arial,Helvetica,sans-serif;text-decoration:none;";
content.innerHTML = "<p style=\""+style+"\">My Tiers:"
+" <b>CTF</b> "+unsafeWindow.quakelive.userinfo.TIER_CTF
+", <b>CA</b> "+unsafeWindow.quakelive.userinfo.TIER_CA
+", <b>DM</b> "+unsafeWindow.quakelive.userinfo.TIER_DM
+", <b>Duel</b> "+unsafeWindow.quakelive.userinfo.TIER_DUEL
+", <b>TDM</b> "+unsafeWindow.quakelive.userinfo.TIER_TDM
+"</p>"+content.innerHTML;
}

setTimeout(showTierInfo, 5000);

