// ==UserScript==
// @name           Google Anti-Snoop
// @namespace      http://griffeltavla.wordpress.com/2011/04/02/cleaning-up-google-search/
// @description    Removes phone-home code from search result links
// @version        1.2.1
// @include        http://www.google.*
// @include        https://www.google.*
// @include        https://encrypted.google.com/*
// @require        http://code.jquery.com/jquery-1.6.2.js
// ==/UserScript==

$.extend($.expr[':'], {
  sneakySpyingLink: function(el){
    var $el = $(el);
    return el.tagName == 'A' && el.getAttribute('onmousedown') && ($el.parent().is('h3') || $el.is('a.l') );
  },
  rewrittenUrl: function(el){
    var $el = $(el);
    return el.tagName == 'A' && ($el.parent().is('h3') || $el.is('a.l')) &&
      (new RegExp('^https?://'+ document.location.host +'/url\\?')).test( el.href );
  }
});
function extractRealUrlFromRewrittenUrl(el){
  var query = el.href.split("?")[1];
  if(!query) return;
  var urlToken = unescape(query).split("&").filter(function(token){ 
    return /^url=./.test(token); 
  })[0];
  return urlToken.slice(4);
}
function removePhoneHomeCallback(el){
  var $el = $(el).closest('h3 > a[onmousedown], span.tl > a[onmousedown]'), el = $el[0];
  if(!el) return;
  if( $el.is('a:rewrittenUrl') ) {
    var realUrl = extractRealUrlFromRewrittenUrl(el);
    if(!realUrl) return;
    el.href = realUrl;
    $el.removeAttr('onmousedown').addClass('link-fixed')
  } else if( $el.is('a:sneakySpyingLink') ){
    $el.removeAttr('onmousedown').addClass('link-fixed')
  }
}

$('<style type="text/css">' +
    '.link-fixed:hover { background-color: #DDFFDD !important; }' +
    '.spying-comment {font-style: italic; font-size: 0.8em;}' +
  '</style>')
.appendTo('body');

// Ensure we get all search links, regardless of when or how Google elects to inject them in the page
// or how the user elects to invoke the link (mouse or keyboard)
$('body').bind('mouseover keydown',function(evt){
  removePhoneHomeCallback(evt.target);
});
