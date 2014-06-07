// ==UserScript==
// @name       TorrentLeech IMDB
// @namespace  MurifoX
// @version    0.1
// @description  Adds a link to IMDB in torrentleech's torrent list movies only.
// @include       http://www.torrentleech.org/*
// @include       http://torrentleech.org/*
// @copyright  2012+, Murillo Parreira
// ==/UserScript==

function getNome(input) { // rename with a meaningful name 
    var match = input.match(/(^.*)\s\d\d\d\d\s/);

  if (match) { // check if the input string matched the pattern
    return match[1]; // get the capturing group
  }
}

function contains(a, obj) {
  var i = a.length;
  while (i--) {
   if (a[i] === obj) {
     return true;
   }
  }
  return false;
}

var cats = new Array('1','8','9','10','11','12','13','14','15','29');
var theTable = document.getElementById('torrenttable');
for( var z = 0; z < theTable.tBodies.length; z++ ) {
  for( var x = 0; x < theTable.tBodies[z].rows.length; x++ ) {
    var c = theTable.tBodies[z].rows[x].cells[0].getElementsByTagName('a')[0].getAttribute('href');
    c = c.substring(c.lastIndexOf("/") + 1, c.length);
    var n = theTable.tBodies[z].rows[x].cells[1].innerText;
    n = getNome(n);
    var a = document.createElement('a');
    a.textContent = "Link IMDB";
    a.target = "_blank";
    a.href = "http://www.imdb.com/find?q=" + n + "&s=all";
    if (contains(cats, c)) {
      var y = document.createElement('td');
      y.appendChild(a);
      theTable.tBodies[z].rows[x].appendChild(y);
    }
  }
}
