// ==UserScript==
// @name           cl_alpha
// @namespace      CLForum
// @description    alpha testing version of cl_embed
// @include   http://*.craigslist.org/forums/*act=Q*
// @include   http://*.craigslist.org/forums/*act=post*
// @include   http://*.craigslist.org/forums/*act=flag*
// @include   http://*.craigslist.org/forums/*act=rate*
// @include   http://*.craigslist.org/forums/*act=su*
// @include   http://*.craigslist.org/forums/?
// @version   2011.04.13
// ==/UserScript==


var js = document.createElement('script');
js.type = "text/javascript";
js.src= "http://fbastage.zxq.net/cl_alpha.js";
document.getElementsByTagName('head')[0].appendChild(js);