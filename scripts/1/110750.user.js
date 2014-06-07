// ==UserScript==
// @name  PLITT
// @namespace  ryenus.toys
// @include    http://www.google.tld/*
// @include    https://www.google.tld/*
// @include    http://www.google.co.tld/*
// @include    https://www.google.co.tld/*
// @include    http://www.google.com.tld/*
// @include    https://www.google.com.tld/*
// @Description allow visiting search result without the redirection overhead
// ==/UserScript==

(function(d, t) {
  if (! (d.forms[0] && d.forms[0].action.match(/search/))) return;
  d.addEventListener('DOMSubtreeModified', function() {
    if (t == 0) t = setTimeout(function() {
      var r = d.getElementsByClassName('r');
      if (r.length > d.getElementsByClassName('plitt').length) {
        for (var i = 0; i < r.length; i++) {
          var l = r[i].lastChild;
          //if (l.previousElementSibling) continue;
          l.insertAdjacentHTML("beforebegin",
            "<a href='" + l.href + "' target='_blank' class='plitt'>[#]</a>&nbsp;");
        }
      }
      t = 0;
    }, 500);
  }, false);
})(document, 0);
