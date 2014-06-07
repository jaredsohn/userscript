// ==UserScript==
// @name           Remove the Reddit Timeline
// @namespace      rolmos
// @include        http://www.reddit.com/
// ==/UserScript==


  document.getElementById("timeline").style.display="none";
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "body.with-timeline div.side {padding-left: 0px !important;}";
document.body.appendChild(css);