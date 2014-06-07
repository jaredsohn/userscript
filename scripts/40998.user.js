// ==UserScript==
// @name          MCL Blog Fix
// @namespace     http://Johnny.Bravo/GreaseMonkey
// @description   Fix blog comment order on MCL
// @include       http://mycoffeelounge.net/blogs/*
// @include       http://www.mycoffeelounge.net/blogs/*
// @version       1.1.0
// ==/UserScript==
function $xo(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $eb(newNode, node) {
	return node.parentNode.insertBefore(newNode, node);
}
function $ed(element) {
	element.parentNode.removeChild(element);
}

var trig = '//TABLE[@width="95%" and @cellpadding="2"]/TBODY/TR[1]/TD[1]/B';
var arr=[];
var before=null;

var yester = new Date();
var today = new Date();
yester.setSeconds(0);
yester.setMinutes(0);
yester.setHours(0);
yester.setDate(yester.getDate()-1);
today.setSeconds(0);
today.setMinutes(0);
today.setHours(0);

function getTime(d, s) {
	var a = s.replace(/([^0-9]*)([0-9]+):([0-9]+)\s+([ap]m)([^0-9apm]*)/im, '$2,$3,$4').split(',');
	a[0]=(parseInt(a[0]) % 12);
	a[0]+= ((a[2] == 'pm') ? 12 : 0);
	a[1]=parseInt(a[1]);
	d.setHours(a[0]);
	d.setMinutes(a[1]);
	return d;
}
function getDateTime(s) {
	var m="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";
	var d=new Date();
	var a = s.replace(/([^0-9]*)([0-9]*)\-([A-Z,a-z]*)\-([0-9]*),\s+([0-9]+):([0-9]+)\s+([ap]m)[^0-9apm]*/im, '$5,$6,$7,$2,$3,$4').split(',');
	a[0]=(parseInt(a[0]) % 12);
	a[0]+= ((a[2] == 'pm') ? 12 : 0);
	d.setHours(a[0]);
	d.setMinutes(parseInt(a[1]));
	d.setDate(parseInt(a[3]));
	d.setMonth(m.indexOf(a[4]) / 4);
	d.setFullYear(parseInt(a[5]));
	return d;
}
$xo(trig).forEach(function(e) {
	var td = e.parentNode;
	var tr = td.parentNode;
	var tbody = tr.parentNode;
	var table = tbody.parentNode;
	var paragraph = table.parentNode;
	var lnk = null;
	if(paragraph.nodeName != 'P') {
		paragraph = null;
		lnk = table.previousSibling;
		while(lnk && lnk.nodeName != 'A') lnk=lnk.previosuSibling;
	} else {
		paragraph.style.display='none';
		lnk = paragraph.childNodes[1];
	}
	var x={el: table, p:paragraph, a:lnk};
	var t=e.nextSibling.textContent.split('(')[0];
	if(paragraph) before = paragraph.nextSibling;

	if (t.indexOf('Yesterday at ') > -1) {
		x.time = getTime(yester, t.substr(t.indexOf(' at ')+4));
	}
	else if (t.indexOf('Today at ') > -1){
		x.time = getTime(today, t.substr(t.indexOf(' at ')+4));
	}
	else if (t.indexOf('minutes ago') > 0) {
		x.time = new Date();
		x.time.setMinutes(x.time.getMinutes() - parseInt(t.replace(/[^0-9]*([1-9][0-9]*)[^0-9]*/m, '$1')));
	}
	else {
		x.time = getDateTime(t);
	}
	arr.push(x);
});
arr.sort(function(a, b) {
	return a.time - b.time;
});
arr.forEach(function(x) {
	if(x.a) $eb(x.a, before);
	$eb(x.el, before);
	if(x.p) $ed(x.p);
});
