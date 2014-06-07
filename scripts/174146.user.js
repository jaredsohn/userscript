// ==UserScript==
// @name        rutor.org names to filenames
// @namespace   bayarookie
// @include     http://*.rutor.org/torrent/*
// @include     http://rutor.org/torrent/*
// @version     1
// ==/UserScript==

function create_h2(s) {
  s = s.replace(/[:\\\/?]/g, ".");
  s = s.replace(/[']/g, "`");
  s = s.trim();
  var e_h2 = document.createElement("h2");
  var t_h2 = document.createTextNode(s);
  e_h2.appendChild(t_h2);
  e_h1.insertBefore(e_h2, null);
}

var e_h1 = document.getElementsByTagName('h1')[0];
var s_h1 = e_h1.firstChild.data;
s_h1 = s_h1.replace(/(50\/50)/g, "50на50");
var pos1 = s_h1.indexOf("/");
if (pos1 > 0) {
  var sub1 = s_h1.slice(0, pos1 - 1);
  var pos2 = s_h1.indexOf("(");
  var sub2 = s_h1.slice(pos1 + 1, pos2);
  var s_h2 = sub2 + "(" + sub1 + ")";
  if (pos2 > 0) {
    var pos3 = s_h1.indexOf(")");
    var sub3 = s_h1.slice(pos2 + 1, pos3);
    s_h2 = s_h2 + " " + sub3;
    if (pos3 > 0) {
      s_h2 = s_h2 + s_h1.slice(pos3 + 1);
      s_h2 = s_h2.replace("| ", "");
      s_h2 = s_h2.replace("| ", "");
    }
  }
  create_h2(s_h2);
}
if (s_h1.indexOf("VA") == 0 || s_h1.indexOf("V.A.") == 0 || s_h1.indexOf("Сборник") == 0 || s_h1.indexOf("Various Artists") == 0) {
  s_h1 = s_h1.replace(/[:\\\/?]/g, ".");
  var pos1 = s_h1.indexOf("(");
  if (pos1 > 0) {
    s_h2 = "VA - ";
    var pos2 = s_h1.indexOf(")");
    var sub1 = s_h1.slice(pos1 + 1, pos2);
    var d = new Date();
    if (sub1 == d.getFullYear()) {
      var m = d.getMonth() + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      var c = d.getDate();
      if (c.toString().length == 1) {
        c = "0" + c;
      }
      sub1 = sub1 + "." + m + "." + c;
    } else if (sub1.indexOf(".") > 0) {
      var pdt1 = sub1.indexOf(".");
      var sdt1 = sub1.slice(0, pdt1);
      var pdt2 = sub1.indexOf(".", pdt1 + 1);
      var sdt2 = sub1.slice(pdt1 + 1, pdt2);
      sub1 = sub1.slice(pdt2 + 1) + "." + sdt2 + "." + sdt1;
    }
    if (s_h1.indexOf("VA") == 0) {i = 5}
    else if (s_h1.indexOf("V.A.") == 0) {i = 7}
    else if (s_h1.indexOf("Various") == 0) {i = 18}
    else {i = 10}
    s_h2 = s_h2 + sub1 + " - " + s_h1.slice(i, pos1);
    create_h2(s_h2);
  }
}
if (s_h1.indexOf("PC |") > 0) {
  s_h2 = s_h1.replace(/(PC \| )/g, "");
  create_h2(s_h2);
}
