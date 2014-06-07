// ==UserScript==
// @name         renren-share-title
// @namespace    http://github.com/smilekzs
// @version      0.1.1
// @description  add title to renren blog share page (for Evernote Clipper)
// @include      *blog.renren.com/share*
// ==/UserScript==
document.title=document.querySelector('.title-article > strong').innerHTML+' from '+document.querySelector('.share-origin a').innerHTML;
