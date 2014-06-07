// ==UserScript==
// @name           Invelos Online Collection Trailer
// @namespace      muckl.com
// @description    Show movie trailers inside the online collection window. Invelos hosts and develops DVD Profiler.
// @include        http*://*invelos.com/onlinecollections/dvd/*/DVD.aspx?U=*
// @copyright      2010, Muckl (http://userscripts.org/users/Muckl)
// @license        (CC) Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        0.0.1
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.1 (initial release) [2010-09-03]

   DevLog          [...] ...

**/

var container = $A('cellpadding', '3', document, 'table', 1).getElementsByTagName('tbody')[0], 
	row = container.getElementsByTagName('tr')[10].cloneNode(true), 
	table = row.getElementsByTagName('table')[0], 
	span = table.getElementsByTagName('span')[0];

row.id = 'playTrailer';
table.width = '100%';
span.innerHTML = '<a href="#playTrailer" class="f3"><img src="/images/Links/Types/Trailers and Clips.png" border="0" /> Play Trailer</a>';
span.firstChild.addEventListener('click', playTrailer, false);
container.appendChild(row);

function playTrailer(e) {
	var url = document.location.protocol + '//' + document.location.host + '/dvdpro/Trailers/Default.aspx?id=' + document.location.href.split('=')[1] + '&title=' + encodeURIComponent($A('class', 'f1', document, 'span', 1).innerHTML.trim());
	span.parentNode.innerHTML = '<iframe src="' + url + '" width="620" height="474" border="0" style="border: none;" />';
}

// helper functions
function $A(a, v, p, t, x) {
	var o = (p || document).getElementsByTagName(t || '*'), 
		rx = new RegExp(v), 
		r = [], i = -1, e, attr;
	while ((e = o.item(i += 1))) {
		attr = e.getAttributeNode(a);
		if (attr && attr.specified && rx.test(attr.value)) {
			r.push(e);
		}
	}
	return (typeof x === 'number') ? r[x - 1] : r;
}
String.prototype.trim = function (s) {
	var l = '^\\s+', r = '\\s+$', m, rx;
	switch (s) {
		case 'L': m = l; break;
		case 'R': m = r; break;
		default : m = l + '|' + r;
	}
	rx = new RegExp(m, 'g');
	return this.replace(rx, '');
}
