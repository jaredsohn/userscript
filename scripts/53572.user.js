// ==UserScript==
// @name          Blogger SPAN Pollution Reducer
// @namespace     http://www.mystady.com
// @description	  Replaces the excessive SPAN markup tags in the Blogger post editor with proper B and I markup tags.
// @include       http://*.blogger.com/post-create.*
// @include       http://*.blogger.com/post-edit.*
// @copyright     2009+, Alain-Christian (http://www.mystady.com)
// @license       DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE Version 2; http://sam.zoy.org/wtfpl/COPYING
// @version       1.0.0
// @require       http://updater.usotools.co.cc/53572.js?interval=7&update=update
// ==/UserScript==
//
// Ran the code through http://jsbeautifier.org/

window.addEventListener("load", function () {
  location.href = "javascript:(" +
  function () {
    Textbar.Bold = function () {
      if (!Blsp.running) {
        this.wrapSelection('<B>', '</B>');
      }
    }
    Textbar.Italic = function () {
      if (!Blsp.running) {
        this.wrapSelection('<I>', '</I>');
      }
    }
  } + ")();"
},
false);