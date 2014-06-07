// ==UserScript==
// @name           Thietlapthongsocai GFX
// @namespace     Ikariam
// @description    thietlapbandau.
// @version        v0.1.0
// @include        http://*.ikariam.*/*?view=island*
// @exclude        http://board.ikariam.*/*
//                 2009/5/19
// ==/UserScript==
user_pref("capability.policy.policynames", "localfilelinks");
user_pref("capability.policy.localfilelinks.sites", "http://s1.ikariam.vn http://s2.ikariam.vn http://s3.ikariam.vn http://s4.ikariam.vn");
user_pref("capability.policy.localfilelinks.checkloaduri.enabled", "allAccess");