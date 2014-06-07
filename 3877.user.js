// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
// @description    You can use emoticons in Blogger.
// @include        http://www.blogger.com/post-edit.g?*
// @include        http://www.blogger.com/post-create.g?*
// ==/UserScript==

(function() {
  var s=document.createElement("script");
  s.charset="UTF-8";s.src="http://tools.kuribo.info/emoticon/emoticons_blogger.js";
  document.body.appendChild(s)
})();