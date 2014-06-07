// ==UserScript==
// @name           Auto Replace Words on Zhihu.com
// @namespace    
// @description    做個腳本，把知乎上的「LZ」「LS」「樓上」「樓主」等關鍵詞自動替換成一坨便便。
// @version        0.01
// @include        http://*.zhihu.com/*

// ==/UserScript==

var HTML = document.body.innerHTML;

//lolthai
HTML = HTML.replace(/LS/g, "「一坨便便」");
HTML = HTML.replace(/LZ/g, "「一坨便便」");
HTML = HTML.replace(/樓上/g, "「一坨便便」");
HTML = HTML.replace(/樓主/g, "「一坨便便」");
HTML = HTML.replace(/楼上/g, "「一坨便便」");
HTML = HTML.replace(/楼主/g, "「一坨便便」");


document.body.innerHTML= HTML;
