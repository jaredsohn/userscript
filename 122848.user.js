// ==UserScript==
// @name           Google Docs Chat visual notification
// @description    A simple script to visually notify you when there's activity in Google Docs chat. All code originally by Cherenkov : http://userscripts.org/scripts/show/100477 , modified to have the page title change instead of sound alerts.
// @namespace      Vince989
// @include        https://docs.google.com/document/*
// @include        https://docs.google.com/spreadsheet/*
// @version        0.1
// @date           20110110
// ==/UserScript==

var docTitle = window.document.title;
//alert(docTitle);
var chatEventCount = 0;

function nodeInsertedHandler(e) {
  if (e.target.classList && e.target.classList.contains('docs-chat-message')) {
    setTimeout(function() {
      var name = document.querySelectorAll('#docs-chat-messages .docs-chat-name');
      name = name.length ? name[name.length-1].textContent : '';
      var isOther = !/^(?:自分|me):/.test(name);
      var isStatus = !!e.target.querySelector('.docs-chat-status');
      if (isOther && !isStatus) {
        window.document.title = "(" + ++chatEventCount + ") " + docTitle;
		//alert("meow");
      }
      if (isStatus) {
        window.document.title = "(" + ++chatEventCount + ") " + docTitle;
		//alert("woof");
      }
    }, 0);
  }
}

document.addEventListener('DOMNodeInserted', nodeInsertedHandler, false);
