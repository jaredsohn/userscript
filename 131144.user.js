// ==UserScript==
// @id             oldStyleGoogleBar@simon
// @name           Old style Google Bar Loader
// @version        1.0.5
// @namespace      simon
// @author         Simon Chan
// @description    Bring back the old style Google Bar.
// @include        *.google.com/*
// @run-at         document-end
// ==/UserScript==
var css = { base: "http://userstyles.org/styles/operacss/66143/Style%20for%20Old%20style%20Google%20Bar%20Loader%20%28Base%29.css", "Google+ Special": "http://userstyles.org/styles/operacss/66142/Style%20for%20Old%20style%20Google%20Bar%20Loader%20%28G%2B%20special%29.css", "NoWidget Special": "http://userstyles.org/styles/operacss/66396/Style%20for%20Old%20style%20Google%20Bar%20Loader%20%28NoWidget%29.css" }, intervalID = setInterval(function () { var n = document.getElementById("gbi3"), t = document.getElementById("gbgsi"); n && (n.textContent.indexOf("\u2026") == -1 && (t.textContent = n.textContent + "\u2026", document.getElementById("gbgs1").className = "gbts", document.getElementById("gbgs3").className = "gbts", document.getElementById("gbgs4").className = "gbts", document.getElementById("gbg6").className = "gbts", GM_xmlhttpRequest({ method: "GET", url: css.base, onload: function (n) { GM_addStyle(n.responseText) } }), GM_xmlhttpRequest({ method: "GET", url: css["NoWidget Special"], onload: function (n) { GM_addStyle(n.responseText) } }), document.location.host == "plus.google.com" && GM_xmlhttpRequest({ method: "GET", url: css["Google+ Special"], onload: function (n) { GM_addStyle(n.responseText) } })), clearInterval(intervalID)) }, 1e3)