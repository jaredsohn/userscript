// ==UserScript==
// @name           ngacn sigpic warning remover
// @namespace      http://phill84.org
// @include        http://bbs.ngacn.cc/read.php*
// ==/UserScript==
var body = document.body.innerHTML;
body.replace('<span class="gray">签名过大</span>', '');