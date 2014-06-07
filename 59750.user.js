// ==UserScript==
// @name           NDselector
// @namespace      http://userscripts.org/users/107047
// @description    Selector paginas Noticiero Digital,Aporrea
// @include        *.noticierodigital.com/forum/* 
// @include	       *.aporrealos.com/*
// @include        http://noticierodigital.com/*
// @include	       http://aporrealos.com/*
// @include        http://foro.revolucionaldia.org/*
// @include	       *.foro.revolucionaldia.org/*
// @exclude	       http://webcache.*
// ==/UserScript==
var c = 'class';
d = document;
h = d.getElementsByTagName('span');
var a = [];
for (i = 0, k = 0; i < h.length; i++) {
	if (h[i].getAttribute(c) == 'nav') a[k++] = h[i];
}
n = a.length;
s = (a[n - 1].innerHTML.length < a[n - 2].innerHTML.length) ? 1 : 2;
e = a[n - s];
g = a[n + s - 3];
e.id = '1';
up = e.lastChild.innerHTML;
pa = e.firstChild.nextSibling.innerHTML;
if (up > 10) {
	b = g.getElementsByTagName('a');
	m = b.length;
	pa < 3 ? (i1 = m - 3, i2 = m - 2) : (i1 = 1, i2 = 2);

	function start(nod) {
		return (nod + '').match(/&start=\d+/)[0].match(/\d+/)[0]
	};
	pp = start(b[i2]) - start(b[i1]);
	fa = a[n - 1].parentNode.parentNode.parentNode.insertRow(-1).insertCell(0);
	fa.setAttribute("colSpan", "3");
	fa.valign = 'top';
	fa.align = 'right';
	fa.nowrap = 'nowrap';
	spa = d.createElement('span');
	spa.setAttribute(c, "gensmall");
	fa.appendChild(spa);
	nb = d.createElement('b');
	spa.appendChild(nb);
	IrP = d.createTextNode('Ir a p\u00E1gina      ');
	nb.appendChild(IrP);
	nsel = d.createElement('select');
	nsel.setAttribute(c, "gensmall");
	nsel.name = 'generar_pagina';		
	nsel.setAttribute("onchange", "if(this.options[this.selectedIndex].value != -1){ window.location = this.options[this.selectedIndex].value; }");
	nb.appendChild(nsel);
	bas = g.getElementsByTagName('a')[0].getAttribute('href').replace(/&start.*$/, '');
	for (i = 1; i <= up; i++) {
		opt = d.createElement('option');
		tn = d.createTextNode(i);
		opt.appendChild(tn);
		opt.value = bas + "&start=" + escape((i - 1) * pp);
		if (i == pa) {
			opt.setAttribute("selected", "selected")
		}
		nsel.appendChild(opt);
	}
}
