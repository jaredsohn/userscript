// ==UserScript==
// @name        MathJaxDisqus
// @namespace   sockwrite.ca/jesse
// @include     http://disqus.com/embed/*
// @include     https://disqus.com/embed/*
// @version     1
// @grant unsafeWindow
// ==/UserScript==

// I did not compose this script; I have merely added the setInverval on line 23.  It's a kludge, but seems to work; the original is hosted on D.P. Cervone's website.

(function () {

  function LoadMathJax() {
      if (document.body.innerHTML.match(/$|\\\[|\\\(|<([a-z]+:)math/)) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
        script.text = [
          "MathJax.Hub.Config({",
          "  tex2jax: {inlineMath: [['$','$'],['\\\\\(','\\\\\)']]}",
          "});",
          "setInterval(function (){ MathJax.Hub.Queue([\"Typeset\",MathJax.Hub,\"conversation\"]) ; }, 4000);"
        ].join("\n"); // The modified script periodically checks whether there is new math to typeset in the <section id="conversation" .../> element.
        var parent = (document.head || document.body || document.documentElement);
        parent.appendChild(script);
    }
  };

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.text = "(" + LoadMathJax + ")()";
  var parent = (document.head || document.body || document.documentElement);
  setTimeout(function () {
    parent.appendChild(script);
    parent.removeChild(script);
  },0);

})();