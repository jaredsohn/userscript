// ==UserScript==
// @name           Better Google News
// @namespace   http://netj.org/webutils/BetterGoogleNews
// @include        http://news.google.com/*
// ==/UserScript==

var s = document.createElement("style");
s.innerHTML = ' \
#lt-col .story .title { \
  font-family: Verdana, Tahoma, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "HCR Dotum LVT", "HCR Dotum", "Nanum Gothic", sans-serif; \
  font-weight: bold !important; \
  font-size: 14pt !important; \
  line-height: 18pt !important; \
} \
 \
#lt-col div { \
  font-family: "Hoefler Text", Baskerville, Garamond, "Palatino Linotype", Georgia, "Times New Roman", "HCR Batang LVT", "HCR Batang", "Nanum Myeongjo", serif; \
  font-size: 10pt; \
  line-height: 12pt !important; \
} \
 \
#lt-col a:link { \
  color: #123 !important; \
} \
 \
.rt-col { \
  width: auto; \
} \
';
document.head.appendChild(s);


/*
 var l = document.createElement("link");
 l.type = "text/css";
 l.rel = "stylesheet";
 l.href = "http://netj.org/webutils/BetterGoogleNews/google-news.css";
 document.head.appendChild(l);
 */