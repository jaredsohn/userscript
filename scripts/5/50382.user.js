// ==UserScript==

// @name           Top Bar Remover
// @namespace      http://www.duels.com

// @description    Removes the Top Bar on all pages except forums.

// @include        http://www.duels.com*
// @include        http://duels.com*

// @exclude        http://www.duels.com/forums*
// @exclude        http://duels.com/forums*

// ==/UserScript==


var badtopbar;
badtopbar=document.getElementById('top_bar')

var Dom = {
  get: function(el) {
  if (typeof el === 'string') {
     return document.getElementById(el);
  } else {
     return el;
  }
  },
  add: function(el, dest) {
    var el = this.get(el);
    var dest = this.get(dest);
    dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.get(el);
    el.parentNode.removeChild(el);
  }
 };

Dom.remove(badtopbar);