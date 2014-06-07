// ==UserScript==
// @name           Tako Info for All Pages
// @namespace      http://tako3.com/
// @description    Adds the Tako Number and Links to the Page
// @include        *
// @exclude        http://tako3.com/*
// ==/UserScript==

// v1.7 20110106 fixed for http://code.google.com/chrome/extensions/content_scripts.html
// v1.6 20080907 changed link target
// v1.5 20080710 changed loading checking
// v1.4 20080707 changed link to view
// v1.3 20071122 changed code for name spaces
// v1.2 20071021 added checking parent window
// v1.1 20071004 changed code for security
// v1.0 20071002

((typeof chrome == 'object' && typeof chrome.extension == 'object')
  ? function (func) {
    location.href = 'javascript:(' + encodeURIComponent(func.toString()) + ')()';
  }
  : function (func) {
    (typeof unsafeWindow == 'undefined' ? window : unsafeWindow).setTimeout('(' + func.toString() + ')()', 50);
  }
)(function () {
  if (window != window.parent) {
    return;
  }

  var self = arguments.callee;

  if (!window.tako3) {
    if (!self.tako3) {
      var s = document.createElement('script');
      s.src = 'http://tako3.com/js/getako';
      document.body.appendChild(s);
      self.tako3 = true;
    }
  } else {
    if (!self.tako3_all) {
      var s = document.createElement('script');
      s.src = 'http://tako3.com/json/all';
      document.body.appendChild(s);
      self.tako3_all = true;
    } else if (!window.getako.loading) {
      var group = window.getako(window.location.href), div = document.createElement('div');
      div.innerHTML = '<p style="position:absolute;right:10px;top:50px;background-color:white;margin:0px;padding:5px;size:10pt">'
        + '<a style="color:black" target="_blank" href="http://tako3.com/command#cat%20http://tako3.com/' + (group[0] || window.location.href) + '%20|%20view">' + group.length + '</a> '
        + '<a style="color:black" target="_blank" href="http://tako3.com/' + (group[0] || window.location.href) + '">tako</a></p>';
      document.body.appendChild(div);
      self.counter = 100;
    }
  }
  if (!self.counter) {
    self.counter = 0;
  }
  if (++self.counter < 100) {
    window.setTimeout(self, 50);
  }
});
