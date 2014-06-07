/*
// ==UserScript==
// @name zhjwxk.cic-grid-fix
// @namespace http://github.com/MaskRay
// @include http://zhjwxk.cic.tsinghua.edu.cn/xkBks.vxkBksXkbBs.do?*
// @include http://zhjwxk.cic.tsinghua.edu.cn/xkBks.xkBksZytjb.do?*
// ==/UserScript==
*/


function serialize(f) {
  return '('+f.toString()+')();'
}

function fix_frame() {
  var d = event ? event.target.contentDocument : document
  d.styleSheets[0].insertRule('.active-row-cell { display: inline-block !important; }', 0);
  d.styleSheets[0].insertRule('.active-column-8 { width: auto !important; }', 0);
  d.styleSheets[0].insertRule('.active-controls-data, .active-scroll-data { height: 380px !important; }', 0);
  d.styleSheets[0].insertRule('.active-controls-grid, .active-scroll-data { height: 405px !important; overflow-x: hidden !important; overflow-y: auto !important; }', 0);
  d.styleSheets[0].insertRule('.active-scroll-data, .active-scroll-top { width: 1716px !important; }', 0);
  d.styleSheets[0].insertRule('.active-scroll-bars { display: none; }', 0);

  var f = d.getElementById('tag50.layout/data')
  if (f) {
    f.style.height = '380px'
    f.parentNode.style.height = '405px'
  }
}

function fix_main() {
  var d = event ? event.target.contentDocument : document

  f = d.querySelector('iframe[src*="tbzySearchBR"]')
  if (f) f.setAttribute('height', '470')
  f = d.querySelector('iframe[src*="tbzySearchTy"]')
  if (f) f.setAttribute('height', '470')
}

if (! name)
  fix_main()
else
  (this.frameElement.onload = new Function('event', serialize(fix_main) + serialize(fix_frame)))()
