// ==UserScript==
// @name         StackOverflow Switch Comment & Preview
// @namespace    stackoverflowSwitchCommentAndPreview
// @include      http://superuser.com/*
// @include      http://stackoverflow.com/*
// @datecreated  2010-06-15
// @lastupdated  2010-06-15
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will switch the comment text box and preview area so that the preview area is above the text box area.
// ==/UserScript==

(function(d){
  var preview = d.getElementById('wmd-preview');
  var textbox = d.getElementById('wmd-container');
  if (!preview || !textbox) return;

  textbox.parentNode.insertBefore(preview, textbox);
})(document);
