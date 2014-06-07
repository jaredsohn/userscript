// ==UserScript==
// @name mixiInnerBlog
// @version 0.1
// @description mixiInnerBlog
// @include http://mixi.jp/view_diary.pl?url=*
// ==/UserScript

(function() {
  w = 600;
  h = 400;
  div  = document.getElementsByTagName('div')[7]
  link = document.getElementsByTagName('p')[1].childNodes[3].href
  div.innerHTML = '<iframe src=' + link + ' width="' + w + '" height="' + h + '" />';
})();

