// ==UserScript==
// @name           I'm Feeling Lucky for cpan search
// @namespace      perlnamehoge@gmail.com
// @include        http://search.cpan.org/
// @include        http://search.cpan.org/search*
// @include        http://search.cpan.org/feedback
// @include        http://search.cpan.org/faq.html
// @include        http://search.cpan.org/mirror
// @include        http://log.perl.org/cpansearch/
// @include        http://search.cpan.org/recent
// @include        http://search.cpan.org/author/
// ==/UserScript==

var _ = document,
    n = location,
    r = encodeURIComponent,
    a = _.getElementsByClassName("searchbox")[0],
    b = a.getElementsByTagName("input"),
    c = b[0],
    d = b[1],
    f = function (g) {
       var e = 'http://search.cpan.org/search?';
       g.forEach(function (h) {
          h.value && ( e += [h.name+"="+r(h.value)+"&"].join("") );
       });
       return e.slice(0,-1);
    },
    j = function (k) {
       GM_xmlhttpRequest({
          method: 'get',
          url: f([c,a.getElementsByTagName("select")[0]]),
          onload: k
       });
    },
    l = function (m) {
       n.href = 
          /<h2 class=sr><a href="([^"]+)"/.test( m.responseText )
             ? RegExp.$1
             : m.finalUrl;
    },
    o = function (event) { event.preventDefault(); event.stopPropagation(); },
    p = function (event) {
           return event.keyCode == 13 && event.ctrlKey ? (function () {
                   j(l);
                   o(event);
               })() : event.keyCode == 13 ? d.click() : ( d.value = event.ctrlKey ? "I'm Feeling Lucky" : "CPAN Search" );
    },
    q = function (event) {
           return event.ctrlKey ? j(l) : a.submit();
    };

a.addEventListener("submit", o, true);
c.addEventListener("keydown", p, true);
d.addEventListener("click", q, true);
