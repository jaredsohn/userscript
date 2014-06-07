// ==UserScript==
// @name	  Facebook poke frame mover
// @namespace	  http://www.bofh.cz/
// @description	  Move Facebook poke frame into position that is more visible
// @include	  http://www.facebook.com/*
// @include	  http://www.new.facebook.com/*
// ==/UserScript==
// Author: Jan Sembera <fis@bofh.cz>
// Version: 1.2

// Move the pokebox 

function move_poker() {
  var sidebar = document.getElementById('home_sidebar');
  var children = sidebar.childNodes;
  var x;

  for (x=0; x<children.length; x++) {
    if (children[x].className.match(/pokes/)) {
      sidebar.insertBefore(children[x], document.getElementById('pymk_hp_box').nextSibling)
    }
  }
}

function move_poker_conditional(ev) {
  if (ev.target.getElementsByClassName) {
    p = ev.target.getElementsByClassName('pokes');
    if (p && p.item(0).parentNode == document.getElementById('home_sidebar')) {
      move_poker();
    }
  }
}

if (location.href.match('\/home\.php')) {
  move_poker();
  document.addEventListener("DOMNodeInserted", move_poker_conditional, false);
}

