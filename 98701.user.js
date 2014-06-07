// ==UserScript==
// @name           I don't want to press "Like" in tkcitylike
// @namespace      facebook.com
// @description    No need to press "Like"
// @include        http://tenkucity.com/thread*
// ==/UserScript==



if(location.href.indexOf("&display=")==-1)
	location.href = location.href+"&display=true";