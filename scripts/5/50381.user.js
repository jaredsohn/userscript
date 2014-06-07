// ==UserScript==

// @name           Facebook Remover

// @namespace      http://www.duels.com

// @description    Removes the facebook box on avatar page.

// @include        http://www.duels.com/avatars

// @include        http://www.duels.com/avatars/
// @include        http://duels.com/avatars

// @include        http://duels.com/avatars/

// ==/UserScript==


var badfacebook;
badfacebook=document.getElementById('fb_features').parentNode.parentNode;

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

Dom.remove(badfacebook);