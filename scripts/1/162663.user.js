// ==UserScript==
// @name          hatebu_clean
// @namespace     http://userscripts.org/users/kawaz
// @description   hatebu clean
// @version       1.0.0
// @include       http://b.hatena.ne.jp/entry/*
// ==/UserScript==
(function(){

var queryForEach = function(selector, cb) {
  if(typeof cb == 'function') {
    var elms = Array.prototype.slice.call(document.querySelectorAll(selector));
    elms.forEach(cb);
    return 0 < elms.length;
  }
};

var rm = function(e){e.parentNode.removeChild(e)};

queryForEach("#entry-content", rm);

})();
