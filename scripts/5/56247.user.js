// ==UserScript==
// @name           GitHub Fixed Font
// @namespace      http://jonasgalvez.com.br/
// @description    Fixed-font code listings for GitHub
// @include        http://github.com/*
// @include        http://*.github.com/*
// ==/UserScript==

var css = 'pre, code { font-family: monospace; }';
var append_to_css = function(txt) { css += '\n' + txt; }

append_to_css('#commit .human .message { font-family: monospace; }');
append_to_css('css #commit .machine { font-family: monospace; }');
append_to_css('#commit .commit_oneline .commit, #commit .commit_oneline .tree { font-family: monospace; }');
append_to_css('#forkqueue table td.sha, #forkqueue table td.message  { font-family: monospace; }');
append_to_css('#forkqueue table td.human  { font-family: monospace; }');
append_to_css('#forkqueue table.choice td.code { font-family: monospace; }');
append_to_css('#toc  { font-family: monospace; }');
append_to_css('#browser table  { font-family: monospace; }');
append_to_css('#readme div.plain pre  { font-family: monospace; }');
append_to_css('#files textarea { font-family: monospace; }');
append_to_css('#files .file { font-family: monospace; }');
append_to_css('#files .file .data pre, #files .file .line-data { font-family: monospace; }');
append_to_css('#files .meta .bubble { font-family: monospace; }');
append_to_css('#repos .repo .commit .machine { font-family: monospace; }');
append_to_css('.news pre, .news code { font-family: monospace; }');
append_to_css('#code_search_instructions table.instruction tr td.inst { font-family: monospace; }');
append_to_css('#code_search_results .result .snippet { font-family: monospace; }');

if(typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if(typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if(heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    heads[0].appendChild(node);
  }
}
