// ==UserScript==
// @name           nicovideo Add Hatena Bookmark Links
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Add Bookmarked numbers to everywhere in nicovideo
// @include        http://www.nicovideo.jp/*
// @require        http://mfp.xrea.jp/misc/greasemonkey/lib/nicovideoInfoInserter/nvii_20090510.js
// ==/UserScript==

// ブックマークしているユーザがいないときに「0 user」と表示するか否か
const SHOW_ZERO_USER = true;

(function() {
   // はてブアイコンの雛形となる要素を作っておく
   // 表示する時はhref, srcを適当に書き換えてからコピーして文書に挿入
   var link_elem = document.createElement('a');
   link_elem.setAttribute(
     'style',
     'color: blue; font-size: 11px;\
      font-weight: normal;'
   );
   link_elem.style.margin = '0 0.5em';

   var link_img = document.createElement('img');
   link_img.setAttribute('style', 'border: none; vertical-align: middle;');
   link_img.alt = '?B';
   link_elem.appendChild(link_img);

   function insertHandler(url) {
     if(url === undefined)
       return null;

     link_elem.href = 'http://b.hatena.ne.jp/entry/' + url;
     link_img.src = 'http://b.hatena.ne.jp/entry/image/' + url;

     var elem = link_elem.cloneNode(true);
     if(SHOW_ZERO_USER)
       elem.firstChild.addEventListener(
         'load',
         function() {
           if(this.width == 1) // 0 user
             this.parentNode.textContent = '0 user';
         },
         false);
     return elem;
   }

   with(NicovideoInfoInserter) {
     addInsertHandler(
       insertHandler,
       PageType.ANY_PAGE,
       PointType.ANY_POINT
     );
   }
 }
)();