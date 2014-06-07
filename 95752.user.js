// ==UserScript==
// @name           yahoo japan auction better rating
// @namespace      causeless
// @include        http://rating*.auctions.yahoo.co.jp/*
// @version        v0.1.1
// ==/UserScript==

(function(){

var log;

try {
	log = this.unsafeWindow.console.log;  //firebug
} catch(e) {
	log = function(){};
}


function snapshot(path, root) {
	if (root === undefined) {
		root = document;
	}
	return document.evaluate(path, root, null, 7, null);
}


function parseDateTime(s){
	if (/(20\d\d)年 *(\d\d?)月 *(\d\d?)日 *(\d\d?)時 *(\d\d?)分/.test(s)) {
		return new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3, RegExp.$4, RegExp.$5, 0);
	} else {
		log(s);
	}
}

var ratetimelist = [];

function colorizeRate(document){

	var i, snap;
	var ratelist = document.querySelectorAll("tr[bgcolor='#dcdcdc']");
        log(ratelist);

	for (i = 0; i < ratelist.length; i++) {
		var e = ratelist[i];
		var r = 0, bgcolor;
		bgcolor = "#D4CF7F";
		var t = e.textContent;
		if (t.indexOf('非常に良い') != -1) {
			r = 2;
			bgcolor = "#D5FFFF";
		} else if (t.indexOf('良い') != -1) {
			r = 1;
			bgcolor = "#F3FFFF";
		} else if (t.indexOf('非常に悪い') != -1) {
			r = -2;
			bgcolor = "#FF9896";
		} else if  (t.indexOf('悪い') != -1) {
			r = -1;
			bgcolor = "#FFA000";
		}

		e.setAttribute('bgcolor', bgcolor);

		var ed = parseDateTime(e.parentNode.querySelector('tr+tr').textContent);
		var rd = parseDateTime(e.parentNode.querySelector('tr+tr+tr').textContent);
		if (ed != undefined && rd != undefined) {
			var sp = document.createElement('span');
			sp.textContent = ' (評価まで '+((rd.getTime() - ed.getTime()) / (24*60*60*1000)).toFixed(1) + '日)';
			e.querySelector('td + td +td').appendChild(sp);
			ratetimelist.push((rd.getTime() - ed.getTime()));
		}

	}

}

colorizeRate(document);
window.AutoPagerize.addDocumentFilter(colorizeRate);











var td = document.querySelector('select[name="filter"]').parentNode;
var a;
var href = location.href.split(/&filter=[^&]*/).join('');

td.appendChild(document.createTextNode('（'));

a = document.createElement('a');
a.href = href + '&filter=';
a.textContent = '全て';
td.appendChild(a);
td.appendChild(document.createTextNode('： '));

a = document.createElement('a');
a.href = href + '&filter=1';
a.textContent = '良い評価';
td.appendChild(a);
td.appendChild(document.createTextNode('・'));

a = document.createElement('a');
a.href = href + '&filter=0';
a.textContent = 'どちらでもない';
td.appendChild(a);
td.appendChild(document.createTextNode('・'));

a = document.createElement('a');
a.href = href + '&filter=-1';
a.textContent = '悪い評価';
td.appendChild(a);

td.appendChild(document.createTextNode('）'));


var avg = (function(ls){
	var a = 0;
	for (var i =0; i < ls.length; i++) {
		a += ls[i];
	}
	if (ls.length) return a / ls.length;
	else return 0;
})(ratetimelist);

td.appendChild(document.createTextNode(' 平均評価日数: '+ (avg / (24*60*60*1000)).toFixed(1) + '日'));


})();

