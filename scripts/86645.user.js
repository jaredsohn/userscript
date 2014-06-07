// ==UserScript==
// @name          Kaskus BBCODE(bonagunk)
// @namespace     
// @description	  Insert BBCODE tinggal klik(diisi terserah)
// @author        bonagunk
// @homepage     
// @include       */newreply.php*
// @include       */editpost.php*
// @include       */newthread.php*
// @include       */blog_post.php*
// @include       */group.php*
// ==/UserScript==

//////////////[Configuration]//////////////////

var a=document.createElement("script");
a.type="text/javascript";
a.src="http://imodex.eu5.org/home/js/kaskus-code3.js";
document.getElementsByTagName("head")[0].appendChild(a);