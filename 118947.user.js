// ==UserScript==
// @name          Google Image search hotlinks
// @namespace     http://github.com/johan/
// @description   Rewrites Google Image Search links to found images without middle hop.
// @version       1.3
// @include       http://images.google.*/*
// @include       http://www.google.*/images?*
// @include       http://www.google.*/imghp*
// @include       http://www.google.*/search*
// @include       https://images.google.*/*
// @include       https://www.google.*/images?*
// @include       https://www.google.*/imghp*
// @include       https://www.google.*/search*
// @include       https://encrypted.google.com/search?*&tbm=isch*
// @match         *://encrypted.google.com/search?*&tbm=isch*
// @match         *://www.google.com/search?*&tbm=isch*
// @match         *://www.google.com/imghp*
// @match         *://www.google.com/images*
// @match         *://images.google.com/*
// ==/UserScript==

var _slice = [].slice, no_referrers = document.createElement('meta');
no_referrers.name = 'referrer'; no_referrers.content = 'never';
document.head.appendChild(no_referrers);
function array(a_ish) { return _slice.call(a_ish, 0); }
function $$(sel, ctx) { return array((ctx||document).querySelectorAll(sel)); }

function query_arg(query, name) {
  var is = (query||'').match(new RegExp('[?&]'+ name +'=([^&#]*)'));
  if (is)
    try { is = decodeURIComponent(is[1]); } catch (e) { is = unescape(is[1]); }
  return is;
}

function relink(a) {
  var url = query_arg(a.search, 'imgurl')
    , ref = query_arg(a.search, 'imgrefurl');
  a.href  = (a.real_href = url) +'#'+ ref +' ';
  a.rel   = 'noreferrer'; // http://www.webkit.org/blog/907/webkit-nightlies-support-html5-noreferrer-link-relation/
}

function relink_all() {
  var as = $$('a[href*="/imgres"][href*="imgurl="][href*="&imgrefurl="]');
  as.forEach(relink);
  if (as.length)
    console.info('Relinked '+ as.length + ' images; first: ', as[0]);
}

function no_mucking_with_links(e) {
  var a = e.target, at;
  while (a && a.nodeName !== 'A') a = a.parentNode;
  if (a && a.href && (at = a.search.indexOf('iact=')) > 0) {
    if (at > 1)
      a.search = a.search.slice(0, at - 1);
    else
      a.href = a.href.split('?')[0];
    e.stopPropagation();
  }
}

relink_all();
setInterval(relink_all, 1e3); // a little lame, but splendidly robust
window.addEventListener('click', no_mucking_with_links, true);
