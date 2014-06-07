// ==UserScript==
// @name        YouTube Subscription Redirect
// @namespace   B492B7DC-4C33-4E72-8316-49A425788F86
// @description A simple script that redirects you to your subscription's uploads when accessing the YouTube homepage among other things.
// @include     /^https?://www\.youtube\.com/?(?:\?.*)?$/
// @include     /^https?://www\.youtube\.com/(?:artist|channel|show|user)/.*$/
// @grant       none
// @version     1.0.1
// @updateURL   https://userscripts.org/scripts/source/156987.meta.js
// @downloadURL https://userscripts.org/scripts/source/156987.user.js
// ==/UserScript==

var $ytsr = {};

$ytsr.l = window.location;
$ytsr.regex = {
    path: /^\/(?:artist|channel|show|user)\/[A-Za-z0-9_-]*$/,
    query: /^\?(?:annotation_id|feature|noredirect|tab)=.*$/
};
$ytsr.checkSearch = function () {
    $ytsr.regex.query.test($ytsr.l.search) ? $ytsr.l.search = "" : null;
    $ytsr.l.search === "" ? $ytsr.main() : null;
};
$ytsr.main = function () {
    $ytsr.l.pathname === "/" ? $ytsr.l.replace("feed/subscriptions/u") : null;
    $ytsr.regex.path.test($ytsr.l.pathname) ? $ytsr.l.replace($ytsr.l + "/videos") : null;
};

$ytsr.l.search || $ytsr.l.hash ? $ytsr.checkSearch() : $ytsr.main();