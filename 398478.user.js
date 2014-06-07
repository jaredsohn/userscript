//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                   Version 2, December 2004
//
//Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
//Everyone is permitted to copy and distribute verbatim or modified
//copies of this license document, and changing it is allowed as long
//as the name is changed.
//
//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
//
// 0. You just DO WHAT THE FUCK YOU WANT TO.

// ==UserScript==
// @name        Gumtree duplicates
// @description Detects when an ad has the same description as another ad and changes the thumbnail with a link to original.
// @namespace   gumtree.arekolek.com
// @include     http://www.gumtree.pl/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     1.1
// ==/UserScript==

if (window.top !== window.self) {
  return;
}

this.$ = this.jQuery = jQuery.noConflict(true);

if (!String.prototype.hashCode) {
  String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0, l = this.length; i < l; i++) {
      char  = this.charCodeAt(i);
      hash  = ((hash<<5)-hash)+char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}

var storedAds = localStorage.getItem('ads');
var ads = storedAds ? JSON.parse(storedAds) : {};

$('div.adOuterKj, td.ar-items').each(function(){
  var link = $(this).find('a.title-h3, a.adLinkSB');
  var url = link.attr('href');
  if(!url) return;
  if(url.indexOf('?') > -1){
    url = url.substr(0, url.indexOf('?'));
  }
  var img = $(this).find('img');
  $.get(url, function(data){
    var text = $($.parseHTML(data)).find('#preview-local-desc').text().trim();
    var hash = text.hashCode();
    if(ads[hash] == undefined) {
      ads[hash] = url;
    }
    if(ads[hash] != url) {
      img.attr('src', 'http://recenzje.info.pl/wp-content/uploads/2012/09/duplicate-content1.png');
      img.attr('width', 100);
      var a = img.parent().parent().parent();
      if(!a.is('a')) {
        a = $('<a>(Original)</a>');
        a.insertAfter(link);
        link.after(' ');
      }
      a.attr('href', ads[hash]);
      a.attr('title', "Link to original");
    }
    localStorage.setItem('ads', JSON.stringify(ads));
  });
});
