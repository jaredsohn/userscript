// ==UserScript==
// @name           haitourimawari
// @namespace      jp.nmmr.haitourimawari
// @include        http://money.www.infoseek.co.jp/MnStock/*/syutai/
// @include        http://money.www.infoseek.co.jp/MnStock/scrsearch.html
// @version 0.2.0
// ==/UserScript==
(function() {
function indexDPS(table) {
  var thead = table.getElementsByTagName('thead')[0];
  var divs = thead.getElementsByTagName('div');
  for (var i=0;i<divs.length;i++) {
    if (divs[i].innerHTML.match(/^DPS.*/)) {
      return i+3;
    }
  }
  return -1;
}

var search = 'http://money.www.infoseek.co.jp/MnStock/scrsearch.html';

if (search == document.location.href) {
var table = document.evaluate('//table[@class="ruled"]',document,null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var trs = document.evaluate('//tr[@align="center"]', table,null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var indexDPS = indexDPS(table);
GM_log(indexDPS);
if (indexDPS==-1) return;

for (var i=0;i<trs.snapshotLength;i++) {
  var tr = trs.snapshotItem(i);
  var kabuka = tr.getElementsByTagName('td')[5].innerHTML;
  var dpstd = tr.getElementsByTagName('td')[indexDPS];
  var dps = dpstd.innerHTML;
  dpstd.innerHTML=dpstd.innerHTML+'('+Math.floor(dps/kabuka*10000)/100+'％)';
}
} else {
var table = document.evaluate('//table[@class="ruled"]',document,null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var tds = table.getElementsByTagName('td');
var bye = tds[2].innerHTML.replace(/\,/g, '');
var haitou = tds[4].innerHTML.replace(/\,|円/g,'');
table.innerHTML = table.innerHTML+'<tr class="headrow"><th colspan="4">配当利回り</th></tr><tr align="right"><td colspan="4">'+Math.floor(haitou/bye*10000)/100+'％</td></tr>';
}
})()