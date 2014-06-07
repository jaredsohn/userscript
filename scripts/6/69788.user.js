// ==UserScript==
// @name Pixiv_bm_junp ver0.01
// @namespace http://d.hatena.ne.jp/yulime/
// @description Pixiv Bookmark back to the Illastlation.
// @include http://www.pixiv.net/bookmark_add.php
// @excludes http://www.pixiv.net/bookmark_add.php?type=illust&illust_id*
// ==/UserScript==

setTimeout("history.go(-2)",2000);
