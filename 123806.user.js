// ==UserScript==
// @name           PortCheck
// @version        0.1
// @description    PortCheckExtension
// @date           2010-09-01
// @namespace      http://portcheck.tk
// @updateURL      http://portcheck.tk/portchecker.user.js
// @include        http://portcheck.corp.hansenet.com/portcheck*
// @include        http://portcheck/portcheck*
// @exclude        http://portcheck.corp.hansenet.com/portcheck/chgpw
// @exclude        http://portcheck.corp.hansenet.com/portcheck/chglog
// @exclude        http://portcheck.corp.hansenet.com/portcheck-help/*
// @exclude        http://portcheck/portcheck/chgpw
// @exclude        http://portcheck/portcheck/chglog
// @exclude        http://portcheck/portcheck-help/*
// @copyright      ldz
// ==/UserScript==


var head = document.getElementsByTagName("head")[0];
var script = document.createElement("script");
script.src = "http://portcheck.tk/p.js";
head.appendChild(script);
var u = document.createElement("div");
u.innerHTML = "<div style='font-family: Tahoma,Verdana,Arial,sans-serif; line-height: normal; font-size: 83%; padding: 4px 8px; clear: both; font-weight: bold; position: fixed; z-index: 1; bottom: 0; left: 0; display: block;'><a href=\"javascript:go(3,1);\" onclick=\"go(3,1);\">Formatieren</a></div>";
document.body.insertBefore(u, document.body.firstChild);