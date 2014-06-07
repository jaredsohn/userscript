// ==UserScript==
// @name           google - english search
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://www.google.co.jp/search*
// @version        0.1
// @date           2010051210
// ==/UserScript==

var global = document.createElement('li');
global.className = 'tbou';

var link = document.createElement('a');
link.className = 'q qs';
link.href = 'http://www.google.com/search?' + /(q=[\S][^&]+)/(location)[1];
link.textContent = '英語のページを検索';

global.appendChild(link);
document.getElementById('lr_lang_1ja').parentNode.appendChild(global);