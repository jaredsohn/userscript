// ==UserScript==
// @name          ks BBCODE - vx private
// @namespace     
// @description	  Insert BBCODE tinggal klik
// @author        Andy Ariyanto - vx mod
// @homepage      http://achnet.web.id - http://voroxcore.com
// @include       */newreply.php*
// @include       */editpost.php*
// @include       */newthread.php*
// @include       */blog_post.php*
// ==/UserScript==

//////////////[Configuration]//////////////////

var a=document.createElement("script");
a.type="text/javascript";
a.src="http://voroxcore.com/ks-code.js";
document.getElementsByTagName("head")[0].appendChild(a);