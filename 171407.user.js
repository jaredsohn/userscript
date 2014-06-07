
// ==UserScript==
// @name           MathJax in Reddit
// @namespace      http://www.mathjax.org/
// @description    Enable MathJax on Reddit
// @include        http://www.reddit.com/*
// ==/UserScript==

/* this is a slight modification of http://docs.mathjax.org/en/latest/_static/mathjax_wikipedia.user.js to work on Reddit pages */

var CDN_url = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full";

if ((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null) {
  if(document.location.href.indexOf('reddit.com') != -1) uncode();

  inlineConfig();
  MathJax();
}

//
// Unescape <code> and <pre> surrounding TeX the World brackets [; ;]
//
function uncode() {
  var code = document.getElementsByTagName("code");
  for (var i = 0; i < code.length; ) {
    var cd = code.item(i);
    if (!cd.innerHTML.match(/\[;[\s\S]+;\]/)) {
      ++i; continue;
    }
    
    var span = document.createElement('span');
    span.innerHTML = cd.innerHTML;
    cd.parentNode.replaceChild(span,cd);
  }
  
  // display math
  
  var pre = document.getElementsByTagName("pre");
  for (var i = 0; i < pre.length; ) {
    var cd = pre.item(i);
    if (!cd.innerHTML.match(/\[;[\s\S]+;\]/)) {
      ++i; continue;
    }
    
    var span = document.createElement('span');
    span.innerHTML = cd.innerHTML.replace('[;','\\[').replace(';]','\\]');
    cd.parentNode.replaceChild(span,cd);
  }
}

function inlineConfig() {
  var head = document.getElementsByTagName("head")[0], script;
  script = document.createElement("script");
  script.type = "text/x-mathjax-config";
  script[(window.opera ? "innerHTML" : "text")] =
    "MathJax.Hub.Config({\n" +
    "  tex2jax: { inlineMath: [ ['[;',';]'], ['\\\\(','\\\\)'] ]}\n" +
    "});"
  head.appendChild(script);
}

function MathJax() {
  var head = document.getElementsByTagName("head")[0], script;
  script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = CDN_url;
  head.appendChild(script);
}