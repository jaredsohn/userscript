// ==UserScript==
// @name           Portable Freeware
// @namespace      Woems
// @include        http://www.portablefreeware.com/*
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

// Obere Werbung killen
$x("//iframe[@id='google_ads_frame1']/../..")[0].style.display='none';
//$x('/html/body/table[3]/tbody/tr/td/table/tbody/tr[3]')[0].style.display='none';

// Bild anzeigen
var line=$x('/html/body/table[3]/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody')[0];
$x('//a[text()="Screenshot"]').forEach(function (a) {
  var tr=document.createElement('tr');
  var td=document.createElement('td');
  var img=document.createElement('img');
  img.src=a.href;
  td.colSpan=3;
  td.appendChild(img);
  tr.appendChild(td);
  $x('../../../..',a)[0].appendChild(tr);
});
