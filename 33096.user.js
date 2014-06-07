// ==UserScript==
// @name           roommates.com Instant Gallery plugin
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Plugin to Instant Gallery, exposing full images of roommates.com to the gallery script. (Reroutes all image links there to point directly to the full image URL.)
// @include        http://roommates.com/*
// @include        http://www.roommates.com/*
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// ==/UserScript==

// really just tested on pages matching www.roommates.com/members/profile.rs*

$x('//img[starts-with(@src,"/member_photos/thmb/")]' +
   '[parent::a[starts-with(@href,"javascript:confirmIt")]]').forEach(relink);

// -http://www.roommates.com/member_photos/thmb/*.jpg
// +http://www.roommates.com/member_photos/full/*.jpg
function relink( img ) {
  var a = img.parentNode;
  a.href = img.src.replace("/thmb/", "/full/");
}
