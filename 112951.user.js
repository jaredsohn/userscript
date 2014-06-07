// ==UserScript==
// @name           	video2mp3 skipper
// @version        	1.0.0
// @namespace        video2mp3-skipper
// @description    	Skip post-download page
// @include        	http://www.video2mp3.net/afterdownload.php
// @include        	http://video2mp3.net/afterdownload.php
// ==/UserScript==

(function()
{
   window.stop();
   window.content.location.href = "http://video2mp3.net/index.php";
})();