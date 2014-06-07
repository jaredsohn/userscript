// ==UserScript==
// @name           yahoo japan auction expand torihiki navi
// @namespace      causeless
// @include        http://page*.auctions.yahoo.co.jp/jp/show/contact?*
// @version        v0.0.2
// ==/UserScript==

var log;

try {
	log = this.unsafeWindow.console.log;  //firebug
} catch(e) {
	log = function(){};
}



function showContact(a) {
	var ptr = a.parentNode.parentNode;
	log(ptr, a);

	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.setAttribute('colspan', '4');

	var iframe = document.createElement('iframe');
	iframe.addEventListener('load', function(e){
		var t = this.contentWindow.document.querySelector('table[bgcolor="#ffffff"]>tbody>tr+tr+tr tr + tr small');
		this.parentNode.innerHTML = t.innerHTML;
		e.stopPropagation();
		e.preventDefault();
		return false;
	}, false);

	iframe.setAttribute('style', 'width:100%; border:none;');
	iframe.setAttribute('src', a.getAttribute('href'));
	log(iframe.src == a.href);
	td.appendChild(iframe);

	tr.appendChild(td);
	ptr.parentNode.insertBefore(tr, ptr.nextSibling);
}



var alist = document.querySelectorAll('tr>td>a[onclick][href*="/show/contact_detail?"]');
var trlist = [];
var i;
for (i = 0; i < alist.length; i++) {
	var a = alist[i];
	var ptr = a.parentNode.parentNode;
	a.removeAttribute('onclick');
	a.removeAttribute('target', null);
	if (ptr.getAttribute('bgcolor') != '#ffffcc') {
		showContact(a);
	} else {
		a.addEventListener('click', function(e){
			showContact(this);
			e.stopPropagation();
			e.preventDefault();
			return false;
		}, false);
	}
}


