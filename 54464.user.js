// ==UserScript==
// @name           Facebook videos for non-members
// @namespace      K3rN3L http://userscripts.org/users/52751/scripts
// @description    Enables people that are not subscribed to Facebook to view videos.
// @version        1.0
// @include        *.facebook.com/video/video.php*
// @include        *.facebook.com/home.php#/video/video.php*
// ==/UserScript==

var link=location.href;

	window.location.replace("http://static.ak.fbcdn.net/swf/mvp.swf?&v=" + link.substring(link.indexOf("?v=")+3));
	