// ==UserScript==
// @name          Kaskus BBCODE[at]localhost
// @namespace     
// @description	  smiley hosted at localhost
// @author        AaEzha
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
a.src="http://www.aaezha.com/files/kaskuslocal.js";
document.getElementsByTagName("head")[0].appendChild(a);