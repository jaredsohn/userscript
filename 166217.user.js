/**
* @package: Facebook Mafia Wars Autoplayer
* @authors: TinHat Software Ltd.
* @created: March 23, 2009
* @credits: (C) RX6 MWAP www.playerscripts.co.uk - All rights reserved.
*/

// ==UserScript==
// @name        PS Facebook Mafia Wars Autoplayer (MWAP)
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     /^https?://(facebook\.mafiawars|mwfb)(\.zynga)?\.com/mwfb/remote/html_server\.php.*?/
// @include     /^https?://(facebook\.mafiawars|mwfb)(\.zynga)?\.com/\?skip_req_frame=1&mwcom=1.*?/
// @include     /^https?://apps(\.new)?\.facebook\.com/inthemafia/.*?/
// @include     /^https?://www.facebook.com/(connect/uiserver|dialog/(feed|apprequests)).*?/
// @exclude     /^https?://(facebook.mafiawars|mwfb)(\.zynga)?\.com/.*?(sk_updater\.php|\#|iframe_proxy\.php).*?/
// @version     2.0.105l
// ==/UserScript==

// to have the job array update, set to same as current version releasing.
// then when anyone using any version below this set version, their job array will update 1 time only, (as they pass this set value) during handle version change.
// job array automatically updates if length changes !

var updtJobArrayIfWasBelow=100;
var blacklistTemp = 0;


