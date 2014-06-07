// ==UserScript==
// @name           iGoogle Tab Remover
// @namespace      google
// @include        http://www.google.com.hk/ig?hl=zh-CN*
// ==/UserScript==

var spans = document.getElementById("col1_contents");
spans.style.display = "none";
