// ==UserScript==
// @name          ENTERPRISE Quality
// @version       1.0.0
// @namespace     http://dis.4chan.org/read/prog/1196438859/
// @description   Scalable value-added turnkey enterprise solution enabling expert programmers to leverage alternative qualities on world4ch.
// @include       http://dis.4chan.org/post
// ==/UserScript==

var quality = "ENTERPRISE"; // The name of your quality. The following alternatives are
                            // provided for the convenience of unimaginative users:
// var quality = "LISP";
// var quality = "EXPERT";
// var quality = "SUSSMAN";
// var quality = "SEEPLES";
// var quality = "JAVA";
// var quality = "CHRISTOPHER";
// var quality = "JEWS";
// var quality = "DQN";

if ("That was VIP quality!" == document.getElementsByTagName("h1")[0].innerHTML) {
  document.getElementsByTagName("h1")[0].innerHTML = "That was <span style='font-style: italic; font-weight: bold; text-decoration: overline underline;'>" + quality + " quality</span>!";
}