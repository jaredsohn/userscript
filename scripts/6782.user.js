// ==UserScript==
// @name                NW Sort Safe
// @namespace           
// @description         Sorts the takeweapon and takemisc fields to organize decayable items
// @include             http://www.nexuswar.com/map/*
// @include             http://nexuswar.com/map/*
// ==/UserScript==

var itemarray1 = new Array();
var itemarray2 = new Array();

// takeweapon
var sortweapon = document.getElementsByName("takeweapon");
if (!sortweapon[0]) return;
sortweapon = sortweapon[0].childNodes[5];

for (var i = 0; i < sortweapon.options.length; i++) {
  var temp = sortweapon.options[i];
  qualityswap(temp);
  itemarray1[i] = temp;
}

itemarray1 = itemarray1.sort(sortItems);

for (var i = 0; i < itemarray1.length; i++) {  
  var temp = itemarray1[i];
  qualityrev(temp);
  sortweapon.options[i] = temp;
}

// takemisc
var sortmisc = document.getElementsByName("takemisc");
if (!sortmisc[0]) return;
sortmisc = sortmisc[0].childNodes[5];

for (var i = 0; i < sortmisc.options.length; i++) {
  var temp = sortmisc.options[i];
  qualityswap(temp);
  itemarray2[i] = temp;
}

itemarray2 = itemarray2.sort(sortItems);

for (var i = 0; i < itemarray2.length; i++) {
  var temp = itemarray2[i];
  qualityrev(temp);
  sortmisc.options[i] = temp;
}

// sort function from benstabler's version of jeremy's nw people counter
function sortItems(a, b) {
  var x = a.firstChild.data.toLowerCase();
  var y = b.firstChild.data.toLowerCase();
  return ((x < y) ? -1 : (x > y) ? 1 : 0);
}

// swap
function qualityswap(temp) {
  temp.firstChild.data = temp.firstChild.data.replace(/\(pristine\)/g,'~1~');
  temp.firstChild.data = temp.firstChild.data.replace(/\(good\)/g,'~2~');
  temp.firstChild.data = temp.firstChild.data.replace(/\(average\)/g,'~3~');
  temp.firstChild.data = temp.firstChild.data.replace(/\(worn\)/g,'~4~');
  temp.firstChild.data = temp.firstChild.data.replace(/\(broken\)/g,'~5~');
  temp.firstChild.data = temp.firstChild.data.replace(/\(destroyed\)/g,'~6~');
  return temp;
}

// reverse
function qualityrev(temp) {
  temp.firstChild.data = temp.firstChild.data.replace(/~1~/g,'(pristine)');
  temp.firstChild.data = temp.firstChild.data.replace(/~2~/g,'(good)');
  temp.firstChild.data = temp.firstChild.data.replace(/~3~/g,'(average)');
  temp.firstChild.data = temp.firstChild.data.replace(/~4~/g,'(worn)');
  temp.firstChild.data = temp.firstChild.data.replace(/~5~/g,'(broken)');
  temp.firstChild.data = temp.firstChild.data.replace(/~6~/g,'(destroyed)');
  return temp;
}