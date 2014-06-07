// ==UserScript==
// @name         Facebook Mafia Wars 
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     /^https?://(facebook\.mafiawars|mwfb)(\.zynga)?\.com/mwfb/remote/html_server\.php.*?/
// @include     /^https?://(facebook\.mafiawars|mwfb)(\.zynga)?\.com/\?skip_req_frame=1&mwcom=1.*?/
// @include     /^https?://apps(\.new)?\.facebook\.com/inthemafia/.*?/
// @include     /^https?://www.facebook.com/(connect/uiserver|dialog/(feed|apprequests)).*?/
// @exclude     /^https?://(facebook.mafiawars|mwfb)(\.zynga)?\.com/.*?(sk_updater\.php|\#|iframe_proxy\.php).*?/
// @require	  	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     3.1.148
// ==/UserScript==

// to have the job array update, set to same as current version releasing.
// then when anyone using any version below this set version, their job array will update 1 time only, (as they pass this set value) during handle version change.
// job array automatically updates if length changes !

eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]