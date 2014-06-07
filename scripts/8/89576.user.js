// ==UserScript==
// @name           Trim URL of All Links
// @namespace      http://tako3.com/
// @description    Trim the Page's All Links
// @include        *
// ==/UserScript==

// v1.2 20110106 fixed for http://code.google.com/chrome/extensions/content_scripts.html
// v1.1 20101106
// v1.0 20101103

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

  if (!window.replace) {
    if (!self.replace_load) {
      var s = document.createElement('script');
      s.src = 'http://tako3.com/replace.js';
      document.body.appendChild(s);
      self.replace_load = true;
    }
  } else {
    if (!self.wedata_load) {
      var s = document.createElement('script');
      s.src = 'http://wedata.net/databases/trimurl/items.json?callback=setRules';
      document.body.appendChild(s);
      self.wedata_load = true;
    } else if (window.getRules().length > 0) {
      (function (start) {
        if (start >= document.links.length) { 
        return;
        }

        var a = document.links[start], p = a.parentNode,
        replace = window.replace(a.href), self = arguments.callee;

        if (!replace) {
          return window.setTimeout(function () { self(start + 1); }, 0);
        }

        var t1 = document.createTextNode(' ('),
          t2 = document.createElement('a'),
          t3 = document.createTextNode(')');

        t2.href = replace;
        t2.target = '_blank';
        t2.innerHTML = 'home';
        p.replaceChild(t3, a);
        p.insertBefore(t2, t3);
        p.insertBefore(t1, t2);
        p.insertBefore(a, t1);
        return window.setTimeout(function () { self(start + 2); }, 0); // for links +1
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
