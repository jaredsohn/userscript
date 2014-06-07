// ==UserScript==
// @name          buttcoin ticker for yospos
// @author        yospos (yospos@example.com)
// @provided by   yospos
// @description	  shows current buttcoin price in yospos.
// @include       http://forums.somethingawful.com/forumdisplay.php?forumid=219
// ==/UserScript==

function price() {
  if (Math.random() < 0.1) return Math.random().toFixed(2);
  else return Math.round(Math.random()*32);
}
var r = /only \$[0-9.]+ each/;
function butt() {
  var a = Array.prototype.slice.call(document.getElementsByClassName('thread_title'));
  a = a.filter(function(x) { return x.innerHTML.match(r); });
  a.forEach(function(x) {
    x.innerHTML = x.innerHTML.replace(r, 'only $' + price() + ' each');
  });
}
setInterval(butt, 219*2);
