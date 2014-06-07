// ==UserScript==
// @id             show-pr-info
// @name           Show pull request info
// @version        1.0
// @namespace      http://goffrie.mooo.com/
// @author         Geoffry Song
// @description    Displays the head and mergeable-status of a pull request.
// @include        https://github.com/*/*/pull/*
// @run-at         document-start
// ==/UserScript==

var m = /github.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/.exec(window.location.href);

GM_xmlhttpRequest({
  method: "GET",
  url: "https://api.github.com/repos/" + m[1] + "/" + m[2] + "/pulls/" + m[3],
  onload: function(res) {
    var j = JSON.parse(res.responseText);
    var mergeable = j.mergeable;
    var head = j.head.sha;
    var style = "a[href$=\"" + head + "\"] { color: " + (mergeable ? "#0a2" : "#e11") + "; }";
    GM_addStyle(style);
  }
});