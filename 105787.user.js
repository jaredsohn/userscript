// ==UserScript==
// @name      pixiv Big Image
// @namespace http://twitter.com/cxx
// @include   http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @version   1.0.0
// ==/UserScript==

var img = document.querySelector('.works_display > a[href*="big"] > img');
if (img)
    img.src = img.src.replace('_m.', '.');
