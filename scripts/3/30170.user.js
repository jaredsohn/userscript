// ==UserScript==
// @name           toggle checkboxes by rubbing
// @namespace      http://faerie.s297.xrea.com/
// @description    toggle checkboxes by rubbing
// @include        http://*
// @include        https://*
// ==/UserScript==

({
  isCheckable: function(el) {
    return el && typeof(el.checked) != 'undefined';
  },
  mousedown: function(e) {
    if (!this.isCheckable(e.target)) return;
    this.first = e.target;
    this.v = !e.target.checked;
  },
  mouseup: function() {
    this.v = null;
  },
  mouseover: function(e) {
    if (this.v == null) return;
    if (this.first) {
      this.first.checked = this.v;
      this.first = null;
    }
    if (this.isCheckable(e.target)) e.target.checked = this.v;
  },
  install: function() {
    function ael(name, method, self) {
      f = function(e) { return method.apply(self, arguments); }
      document.addEventListener(name, f, false);
    }
    for each (var x in ['mousedown', 'mouseover', 'mouseup']) {
      ael(x, this[x], this);
    }
  }
}).install();