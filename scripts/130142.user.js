// ==UserScript==
// @name           LAH
// @namespace      http://littleangelshentai.net/*
// @description    Adds "Goto page number" feature to LAH threads/forums and topic listings
// @include        http://littleangelshentai.net/*
// @include        http://lah.li/*
// @grant          none
// ==/UserScript==

(function() {
	function kppn(e) {
		if (!e) e = window.event;
		if (e.keyCode === 13) {
			e.preventDefault();
			var v = +this.value.replace(/\D/g, '');
			if (v) {
				var ds = this.dataset;
				window.location = ds.pageurl ? ds.pageurl.replace('{page}', v) : ds.url.replace('{start}', (v - 1) * ds.n);
			}
		}
	}
	function inputpn() {
		var v = this.value;
		if (/\D/.test(v)) {
			var el = this;
			setTimeout(function() {
				var p = /\D/g,
					ss = el.selectionStart,
					ssn = v.substring(0, ss).replace(p, '').length,
					se = el.selectionEnd,
					sen;
				if (ss === se) sen = ssn;
				else sen = ss + v.substring(ss, se).replace(p, '').length;

				el.value = v.replace(p, '');
				el.selectionStart = ssn;
				el.selectionEnd = sen;
			}, 0);
		}
	}

	var navs = document.querySelectorAll('.nav, .gensmall'),
		pageP = /\?page=\d+/,
		startP = /&start=(\d+)/,
		gotobox = document.createElement('input'),
		thisbox, i, l, nav, navhtml, link3, cbr, cimg, lastchild, ds;
	gotobox.type = 'text';
	gotobox.className = 'post gensmall';
	gotobox.style.width = '22px';
	gotobox.style.height = '11px';
	gotobox.style.marginTop = '2px';
	gotobox.style.marginLeft = '4px';
	gotobox.title = 'Goto page number';

	for (i = 0, l = navs.length; i < l; i++) {
		nav = navs[i];
		navhtml = nav.innerHTML;
		if (navhtml.indexOf('Goto page') === -1 || navhtml.indexOf('...') === -1) continue;
		cbr = nav.getElementsByTagName('br').length;
		cimg = nav.getElementsByTagName('img').length;
		//if (cbr && cimg) continue; //uncomment this line for clean

		if (cbr && !cimg) { //viewtopic top nav
			lastchild = nav.lastChild;
			if (lastchild.nodeType === 3 && lastchild.textContent.trim() === '') nav.removeChild(lastchild);
			if (nav.lastElementChild.tagName.toLowerCase() === 'br') nav.removeChild(nav.lastElementChild);
		}
		link3 = nav.getElementsByTagName('a')[3];
		thisbox = gotobox.cloneNode(false);
		ds = thisbox.dataset;
		if (link3.search.substring(0, 6) === '?page=') {
			ds.pageurl = link3.href.replace(pageP, '?page={page}');
		} else {
			ds.n = startP.exec(link3.search)[1] / (link3.innerHTML - 1);
			ds.url = link3.href.replace(startP, '&start={start}');
		}
		nav.appendChild(thisbox);
		thisbox.addEventListener('input', inputpn, false);
		thisbox.addEventListener('keypress', kppn, false);
	}
}());
