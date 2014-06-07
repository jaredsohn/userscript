// ==UserScript==
// @name           Sinfest prev/next links
// @version        1.3
// @namespace      https://github.com/johan/user.js
// @description    Adds links the previous and next Sinfest strip by clicking the left/right portion of the present strip, and adds access keys P and N (or . and ,) too for concenience (Alt+* on Windows, Ctrl+Opt+* on Mac, Shift+Escape followed by * in Opera).
// @include        http://www.sinfest.net/archive_page*
// @include        http://www.sinfest.net/*
// @require        https://raw.github.com/gist/3886769/2bda951e516c93bd9625ed2d1b168a0a7d98a078/on.js
// ==/UserScript==

on({ dom: { comic: 'css    img[src*="comics"]'
          , next:  'xpath? //a[@href and img[@alt="Next"]]'
          , prev:  'xpath? //a[@href and img[@alt="Previous"]]'
          }
   , ready: hook_up_strip
   });

function hook_up_strip(dom) {
  if (dom.comic.complete)
    link_surrounding(dom);
  else
    dom.comic.addEventListener('load', link_surrounding.bind(this, dom), false);
}

function link_surrounding(dom) {
  function keys(link, key1, key2, coords) {
    if (!link) return false;
    var area = document.createElement('area');
    link.accessKey = key1;
    area.accessKey = key2;
    area.coords = coords;
    area.shape = 'rect';
    area.href = link.href;
    return map.appendChild(area);
  }

  var map = document.createElement('map')
    , h = dom.comic.height
    , w = dom.comic.width
    , W = w >> 1
    , prev = keys(dom.prev, ',', 'P', '0,0,'+ W +','+ h)
    , next = keys(dom.next, '.', 'N', W +',0,'+ (--w) +','+ h)
    ;
  if (prev || next) {
    map.name = 'prev-next';
    dom.comic.setAttribute('usemap', '#prev-next');
    document.body.appendChild(map);
  }
}
