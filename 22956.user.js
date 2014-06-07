// ==UserScript==
// @name           OkCupid paragraphify comments automatically
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/22956.user.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @description    Turns double newlines in your comments into paragraph breaks
// @include        http://www.okcupid.com/*
// ==/UserScript==

function paragraphify(text) {
  text.value = text.value.replace(/(^|\n+)(?!<p>)/g, '<p>$1');
}

var addComment = unsafeWindow.addComment;

unsafeWindow.addComment = function(id) {
  $x('//textarea[@class="addform_ta"]').forEach(paragraphify);
  addComment(id);
};