// ==UserScript==
// @name           ImageShack.US Redirect
// @namespace      freakz
// @description    shows the full image on ImageShack.us
// @include        http://img*.imageshack.us/my.php?image=*
// @version        0.1
// ==/UserScript==

var img = document.getElementById("ibl_fs_direct").getElementsByTagName("input")[0].value;
location.replace(img);