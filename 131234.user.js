// ==UserScript==
// @name           Codeforces solved problems hider
// @namespace      http://userscripts.org/users/445152
// @description    Adds a "Hide solved" button to the Codeforces problem archive
// @include        http://codeforces.*/problemset*
// ==/UserScript==

var cl      = document.getElementsByClassName('closed')[0];
var parent  = cl.parentNode;
var chk     = document.createElement('a');
var txt     = document.createTextNode('Hide solved');

var hide    = function() {
  var items = document.getElementsByClassName('accepted-problem');
  var n = items.length;
  for( var i = 0; i < n; ++i ) {
    var item = items[0];
    item.parentNode.removeChild(item);
  }
};

chk.appendChild(txt);
chk.href = "#";
chk.id = "hide_solved";
chk.addEventListener("click", hide, false, true);

parent.insertBefore(chk, cl);