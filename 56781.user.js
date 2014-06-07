// ==UserScript==
// @name           Group Banner Link
// @namespace      Group Banner Link
// @description    Makes the group banner an entire link rather than a separate one. kewli0.
// @include        http://*bungie.net/fanclub/*/Forums/*
// ==/UserScript==

GM_addStyle("#ctl00_forumHeader_groupForumHeaderPanel {cursor: pointer;}");

function full_banner(e) {
var el=e.target;
if (!el) {
return;
}
if (!el.id) {
return;
}
if ('ctl00_forumHeader_groupForumHeaderPanel' == el.id) {
document.location = document.getElementById('ctl00_forumHeader_groupForumsLink').href;
}
}

window.addEventListener('click', full_banner, true);