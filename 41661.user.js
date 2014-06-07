// ==UserScript==
// @name           Direct ImageShack - AltumVidetur
// @namespace      http://userstyles.org
// @description    Redirecting straight to image - AltumVidetur
// @include        http://*.imageshack.us/my.php*
// ==/UserScript==

var ibl_fs_forum = document.getElementById('ibl_fs_forum');
var textarea = ibl_fs_forum.getElementsByTagName('textarea');
var bbcode = textarea[0].value;
var regexp = /\[IMG\](.*)\[\/IMG\]/;
var proper_url = regexp.exec(bbcode);
window.location.href = proper_url[1];