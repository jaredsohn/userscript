// ==UserScript==
// @name          Gmail Title
// @namespace     http://jeffpalm.com/gmailtitle
// @description   Makes the gmail title somewhat useful
// @include       https://mail.google.com/mail/*
// ==/UserScript==

(function() {

  var ignoreNextChange = false;

  function changeTitle() {
    if (ignoreNextChange) {
      ignoreNextChange = false;
      return;
    }
    var t = String(document.title);
    // Gmail - Inbox (1700) - jeffpalm@gmail.com
    var res = t.match(/([^\(]+)(\(\d+\))(.*)/);
    if (res) {
      ignoreNextChange = true;
      var title = res[2].replace(/\D/g,"") + " - " + res[1] + res[3];
      document.title = title;
    }
  }
  function main() {
    var titleEl = document.getElementsByTagName("title")[0];
    var docEl = document.documentElement;
    if (docEl && docEl.addEventListener) {
      docEl.addEventListener("DOMSubtreeModified", function(evt) {
        var t = evt.target;
        if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
	  changeTitle();
        }
      }, false);
    } else {
      document.onpropertychange = function() {
        if (window.event.propertyName == "title") {
          changeTitle();
        }
      };
    }
    changeTitle();
  }
  main();
})();