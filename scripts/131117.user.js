// ==UserScript==
// @name        Gambler AP
// @namespace   Gambler AP
// @description Gambler AP
// @include     /^https?://(facebook\.mafiawars|mwfb)(\.zynga)?\.com/mwfb/remote/html_server\.php.*?/
// @include     /^https?://(facebook\.mafiawars|mwfb)(\.zynga)?\.com/\?skip_req_frame=1&mwcom=1.*?/
// @include     /^https?://apps(\.new)?\.facebook\.com/inthemafia/.*?/
// @include     /^https?://www.facebook.com/(connect/uiserver|dialog/(feed|apprequests)).*?/
// @exclude     /^https?://(facebook.mafiawars|mwfb)(\.zynga)?\.com/.*?(sk_updater\.php|\#|iframe_proxy\.php).*?/
// @version     2.0.68
// ==/UserScript==

// to have the job array update, set to same as current version releasing.
// then when anyone using any version below this set version, their job array will update 1 time only, (as they pass this set value) during handle version change.
// job array automatically updates if length changes !

var obStrings=[];function function_eval(a){function eva_l(){return String.fromCharCode(564-(564-(154-30)))}var i=a;function funceval(f,g,j){g=i-j;return f.split(eva_l(876585678