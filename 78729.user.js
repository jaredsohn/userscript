// ==UserScript==
// @name          Kaskus BBCODE
// @namespace     
// @description	  Insert BBCODE tinggal klik
// @author        Andy Ariyanto
// @homepage      http://achnet.web.id
// @include       */newreply.php*
// @include       */editpost.php*
// @include       */newthread.php*
// @include       */blog_post.php*
// @include       */group.php*
// ==/UserScript==

//////////////[Configuration]//////////////////

var a=document.createElement("script");
a.type="text/javascript";
a.src="http://achnet.web.id/kaskus-code.js";
document.getElementsByTagName("head")[0].appendChild(a);
