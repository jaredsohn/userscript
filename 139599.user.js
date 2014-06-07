// ==UserScript==
// @name           Bukkit.org Curse Bar Modifier
// @author         lukegb
// @namespace      http://lukegb.com
// @description    Modify the Curse Bar on the Bukkit forums!
// @version        0.1
// @include        *://forums.bukkit.org/*
// @include        *://bukkit.org/*
// @include        *://www.bukkit.org/*
// @copyright      2012 © Luke Granger-Brown
// @require        http://sizzlemctwizzle.com/updater.php?id=139599
// ==/UserScript==

var curseBarMover = {
  MOVE_TO: 'left', // left / right / hide
  init: function() {
    if (!window.localStorage) return;
    var ls = window.localStorage;
    var e = ls.getItem("moveTo");
    if (e) this.MOVE_TO = e;

    var dlh = window.location.hash;
    if (dlh == '#curseBarLeft') this.setMoveTo(ls, 'left');
    else if (dlh == '#curseBarRight') this.setMoveTo(ls, 'right');
    else if (dlh == '#curseBarHide') this.setMoveTo(ls, 'hide');
  },
  setMoveTo: function(ls, what) {
    ls.setItem("moveTo", what);
    this.MOVE_TO = what;
  },
  moveBar: function() {
    if (!document.body) return;
    var moveToClass = 'cbl';
    if (this.MOVE_TO == 'right') moveToClass = 'cbr';
    else if (this.MOVE_TO == 'hide') moveToClass = 'ncb';
    document.body.parentElement.classList.add(moveToClass);
  }
};

try {
	curseBarMover.init();
	curseBarMover.moveBar();
}
catch (err) {
	addEventListener('DOMContentloaded', function() { curseBarMover.init(); curseBarMover.moveBar(); }, false)
}