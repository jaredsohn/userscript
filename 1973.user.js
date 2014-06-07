// ==UserScript==
// @name           KoL Mall price highlighter
// @namespace      http://ssssmemyself.tripod.com/
// @description    Highlights prices on your "manage prices" page. Red means that someone's selling the item for less than you, and blue means that the cheapest price is higher than the minimum price. Darker colors indicate bigger differences.
// @include        http://*.kingdomofloathing.com/manageprices.php
// ==/UserScript==
(function(){
  var t = document.getElementsByTagName('table');
  var r = t[t.length - 1].tBodies[0].rows;
  for (var i = 1; i < r.length; i++) {
    var d1 = parseInt(r[i].cells[4].childNodes[0].value, 10) - parseInt(r[i].cells[6].innerHTML.replace(/,/g,''), 10);
    var d2 = parseInt(r[i].cells[6].innerHTML.replace(/,/g,''), 10) - parseInt(r[i].cells[3].innerHTML.replace(/,/g,''), 10);
    var c1 = 255 - Math.min(Math.round(20 * Math.log(10 * Math.max(d1, 0) + 1)), 255);
    r[i].cells[4].childNodes[0].style.backgroundColor = "rgb(255," + c1 + "," + c1 + ")";
    var c2 = 255 - Math.min(Math.round(20 * Math.log(10 * Math.max(d2, 0) + 1)), 255);
    r[i].cells[6].innerHTML = '<span style="background-color:rgb(' + c2 + ',' + c2 + ',255)">' + r[i].cells[6].innerHTML + '</span>';
  }
})();