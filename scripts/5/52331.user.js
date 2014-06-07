// ==UserScript==
// @name         Page Editor
// @description  Here is the updated version of 'Page Editor' which allows you to edit pages by clicking on any element.  However, instead of you having to refresh the page to toggle whether the script is set to on or off, there is a button allowing you to quickly toggle without refreshing the page!
// @author       Alex2209
// @namespace    Alex2209
// @include      *
// @exclude      http://userscripts.org/*
// @exclude      http://*.tribalwars.*
// ==/UserScript==

unsafeWindow.toggleon = function() {
  document.body.contentEditable='true';
  editmode='on';
  void 0;
}

unsafeWindow.toggleoff = function() {
  document.body.contentEditable='false';
  editmode='off';
  void 0;
}

var body = document.body;
var page_editor = document.createElement('div');
page_editor.innerHTML = "<input type='button' value='On' onClick='toggleon()'>&nbsp;&nbsp;<input type='button' value='Off' onClick='toggleoff()'>";
document.body.insertBefore(page_editor, body.secondChild);
