// ==UserScript==
// @name           comicViewer
// @namespace      comicViewer
// @include        *imanhua.com*
// @include        *dm5.com*
// @include        *comic.131.com*
// ==/UserScript==
var fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript")
fileref.setAttribute("src", "http://yaoshipin.sf.net/zhuazi/main/libs/zhuazi.js")
document.getElementsByTagName("head")[0].appendChild(fileref)