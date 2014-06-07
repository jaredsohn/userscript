// ==UserScript==
// @name          Cell Mate
// @namespace     http://diseasehf.us/
// @description   HackForums mod to make all forum/thread cells clickable for entry to forum or latest post.
// @include       http://*hackforums.net*
// @version       1.0.4
// ==/UserScript==

var row_a = Array.prototype.slice.call(document.getElementsByClassName('trow1')),
  row_b   = Array.prototype.slice.call(document.getElementsByClassName('trow2')),
  rows    = row_a.concat(row_b);

function make_clickable (me, i) {
  me.onclick = function () {
    window.location.href = this.getElementsByTagName('a')[i].href;
  }

  me.style.cursor = 'pointer';

  me.onmouseover = function () {
    me.style.backgroundColor = '#072948';
  }

  me.onmouseout = function () {
    me.style.backgroundColor = '#333';
  }
}

for (var i = 0, len = rows.length; i < len; i++) {
  switch (true) {
    case /forumdisplay\.php\?fid=\d+/i.test(window.location):
      if (rows[i].getElementsByTagName('a').length > 0 && rows[i].getElementsByTagName('a')[0].href.match (/showthread|forumdisplay/) && rows[i].style.textAlign !== 'right') {
        var j = (rows[i].getElementsByTagName('a')[0].href.match(/action=newpost/)) ? 1 : 0;
        make_clickable(rows[i], j);
      }

      break;

    case /$|index.php#*$/i.test(window.location):
      if (rows[i].vAlign == 'top' && rows[i].getElementsByTagName('a').length > 0 && rows[i].getElementsByTagName('a')[0].href.match (/forumdisplay\.php\?fid=\d+$/)) {
        make_clickable(rows[i], 0);
      }
      break;
  }
}