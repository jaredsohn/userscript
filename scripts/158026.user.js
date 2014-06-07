// ==UserScript==
// @name           Avanturist.org.DOGRAYB_PATCH
// @description    Avanturist.org forum dograyb PATCH
// @version        0.4.11
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// @include        http://glav.su*
// @include        http://www.glav.su*
// @include        https://glav.su*
// @include        https://www.glav.su*
// ==/UserScript==

var i,j;
var w;
var e;
var m;

e=document.styleSheets;
for (i=0; i<e.length; i++) {
	w=e[i].cssRules;
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='a.buttonBlue') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.quote a') {
			w[j].style.color='#777777';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.button-blue a') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.button a.blue') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='a.blueButton') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='a.redButton') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.button a.blueHuge') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.h1-block .h1-header') {
			w[j].style.backgroundColor='#999999';
			break;
		};
	};
	for (j=0; j<w.length; j++) {
		if (w[j].selectorText=='.userBlock') {
			w[j].style.width='auto';
			w[j].style.height='auto';
			w[j].style.paddingRight='4px';
			break;
		};
	};
};

e=document.getElementsByClassName('table-cell userbar-cell');
for (i=0; i<e.length; i++) {
	e[i].style.textAlign='left';
};

e=document.getElementsByTagName('a');
m='<b>\u0412\u0447\u0435\u0440\u0430</b>';//'<b>Вчера</b>';
for (i=0; i<e.length; i++) {
	w=e[i].innerHTML;
	if (w.indexOf(m)>0) {
		w=w.replace('<b>','');
		w=w.replace('</b>','');
		e[i].innerHTML=w;
	};
};

e=document.getElementsByClassName('userBlock');
for (i=0; i<e.length; i++) {
	w=e[i].getElementsByTagName('img');
	for (j=0; j<w.length; j++) {
		w[j].width='16';
		w[j].height='16';
	};
	w=e[i].getElementsByClassName('tableCell');
	for (j=0; j<w.length; j++) {
		w[j].style.height='';
	};
	w=e[i].getElementsByClassName('table');
	for (j=0; j<w.length; j++) {
		w[j].style.height='';
	};
};

e=document.getElementsByTagName('img');
for (i=0; i<e.length; i++) {
	if (e[i].src=='http://www.avanturist.org/images/img_avatar64.png') {
		e[i].outerHTML='';
	};
}