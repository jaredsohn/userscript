// ==UserScript==
// @name           dun dun
// @description    put the dun dun back in the post page
// @include sys.4chan.org
// ==/UserScript==

var swf = document.createElement(‘object’);
swf.src = ‘http://images.4chan.org/b/junk/doinkdoink.swf&rsquo;
document.body.appendChild(swf);