// ==UserScript==
// @name         Foreign Policy Remove Featured Today Box
// @namespace    fpRemoveFeaturedToday
// @include      http://www.foreignpolicy.com/*
// @include      https://www.foreignpolicy.com/*
// @match        http://www.foreignpolicy.com/*
// @match        https://www.foreignpolicy.com/*
// @datecreated  2010-03-15
// @lastupdated  2010-03-15
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the 'Featured Today' Box on the Foreign Policy website.
// ==/UserScript==

(function(d){
  var ft=d.getElementById("fp-featured-today");
  if(ft){
    ft.parentNode.removeChild(ft);
    var mightLike=d.getElementById('might-like');
    mightLike.parentNode.removeChild(mightLike);
  }
})(document);