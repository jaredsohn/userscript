// ==UserScript==
// @name           Tako Info for All Links
// @namespace      http://tako3.com/
// @description    Adds the Tako Number and Links to the Page's All Links
// @include        *
// @exclude        http://tako3.com/*
// ==/UserScript==

// v1.4 20110106 fixed for http://code.google.com/chrome/extensions/content_scripts.html
// v1.3 20080907 changed link target
// v1.2 20080710 changed loading checking
// v1.1 20080707 changed link to view
// v1.0 20071122

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
      (function (start) {
        if (start >= document.links.length) { 
          return;
        }
  
        var a = document.links[start], p = a.parentNode,
          group = window.getako(a.href), self = arguments.callee;

        if (!group.length) {
          return window.setTimeout(function () { self(start + 1); }, 0);
        }

        var t1 = document.createTextNode(' ('),
          t2 = document.createElement('a'),
          t3 = document.createTextNode(' '),
          t4 = document.createElement('a'),
          t5 = document.createTextNode(')');

        t2.href = 'http://tako3.com/command#cat%20http://tako3.com/' + (group[0] || a.href) + '%20|%20view';
        t2.target = '_blank';
        t2.innerHTML = group.length;
        t4.href = 'http://tako3.com/' + (group[0] || a.href);
        t4.target = '_blank';
        t4.innerHTML = 'tako';
        p.replaceChild(t5, a);
        p.insertBefore(t4, t5);
        p.insertBefore(t3, t4);
        p.insertBefore(t2, t3);
        p.insertBefore(t1, t2);
        p.insertBefore(a, t1);
        return window.setTimeout(function () { self(start + 3); }, 0); // for links +2
      })(0);
      self.counter = 100;
    }
  }
  if (!self.counter) {
    self.counter = 0;
  }
  if (++self.counter < 100) {
    window.setTimeout(arguments.callee, 50);
  }
});
