// ==UserScript==
// @name          Taiwan Yahoo Stock
// @namespace     
// @author        wctang <wctang@gmail.com>
// @include       http://tw.stock.yahoo.com/*
// @version       0.1
// ==/UserScript==

var unsafewin = unsafeWindow;
var unsafedoc=unsafewin.document;

(function() {

GM_addStyle(".stext { display:none; } ");

var node;



// 投資專區
node = document.evaluate('/html/body/center/table[2]', unsafedoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
node.singleNodeValue.style.display='none';

// 台証證券下單
node = document.evaluate('/html/body/center/center[2]/table[4]/tbody/tr/td/table/tbody/tr/th[12]', unsafedoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
node.singleNodeValue.style.display='none';

// 台股個股與美股連動
node = document.evaluate('/html/body/center/center[2]/table[4]/tbody/tr/td/table/tbody/tr[5]', unsafedoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
node.singleNodeValue.style.display='none';


node = document.evaluate('/html/body/center/center', unsafedoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
//node.singleNodeValue.style.display='none';
node.singleNodeValue.innerHTML='<img src="http://tw.chart.finance.yahoo.com/b?s=^TWII&'+new Date().getTime()+'"></img>'

var ns=[];
var trs = document.evaluate('/html/body/center/center[2]/table[4]/tbody/tr/td/table/tbody/tr[*]', unsafedoc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
while(node=trs.iterateNext()){ ns.push(node); }

for(var idx in ns) {
	var tr=ns[idx];
	if(/^<a href=\"(?:[a-zA-Z0-9\.\_\/]+)\">(\d+)<br>.*<\/a><br>.*/.exec(tr.cells[0].innerHTML)) {
		var code = RegExp.$1;
		tr.cells[0].innerHTML = tr.cells[0].innerHTML.replace(/<br>/g, ' ');
		tr.cells[tr.cells.length-1].innerHTML = '<a href=\"/q/bc?s=%%%\">走勢</a> <a href=\"/q/ta?s=%%%\">技術</a> <a href=\"/q/h?s=%%%\">新聞</a> <a href=\"/d/s/earning_%%%.html\">營收</a> <a href=\"/d/s/credit_%%%.html\">籌碼</a>'.replace(/\%\%\%/g, code);
		
		var yest=parseFloat(tr.cells[8].textContent);
		var now=parseFloat(tr.cells[2].textContent);
		var scale=((now-yest)/yest*100).toFixed(2)+'%';
		//console.log(scale);
		tr.cells[5].innerHTML+=(','+scale);
	}
}




})();
