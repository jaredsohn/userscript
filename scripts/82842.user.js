// ==UserScript==
// @name           Reddit - open flickr links in new window
// @namespace      http://userscripts.org/users/sunkid
// @description    Opens flickr links in new window for toolbar users.
// @include        http://*reddit.com/toolbar/inner*
// ==/UserScript==

var src = document.getElementsByTagName('frame')[1].src;
if (src.toLowerCase().indexOf("flickr.com/") > 0) {
	GM_log("opening tab for " + src);
	GM_openInTab(src);
	src = document.getElementsByTagName('frame')[0].src.replace("/toolbar","");
	GM_log("opening comments at " + src);
	location.href = "javascript:void(parent.location = '" + src + "')";
}
