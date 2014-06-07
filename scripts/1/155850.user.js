// ==UserScript==
// @name       Codeforces_Redirect_To_Contest
// @namespace  _codeforces
// @version    1.1
// @description  Redirects to codeforces
// @match      http://codeforces.com/problemset/problem/*
// @match      http://codeforces.ru/problemset/problem/*
// @copyright  2012+, s
// ==/UserScript==
var rgx = /codeforces\.(com|ru)\/problemset\/problem\/([0-9]*)\/([0-9a-zA-Z]*)/;
var match = rgx.exec(window.location.href);
window.location.href = "http://codeforces." + match[1] + "/contest/" + match[2] + "/problem/" + match[3];