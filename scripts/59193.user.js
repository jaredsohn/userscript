// ==UserScript==
// @name           OEIS Tweaks
// @namespace      http://userscripts.org/crg4
// @description    Edit button and other tweaks for Sloane's On-Line Encyclopedia of Integer Sequences.
// @include        http://*.research.att.com/~njas/sequences/*
// ==/UserScript==

var yourName = 'Charles R Greathouse IV';
var yourEmail = '';

var seq = getSequence();

function newForm(text, url) {
	var f = document.createElement('form');
	f.setAttribute('method', 'POST');
	f.setAttribute('action', url);
	f.setAttribute('id', 'crg4-'+text);
	var t = document.createTextNode(text);
	var a = document.createElement('a');
	a.appendChild(t);
	a.addEventListener('click', function() {document.getElementById('crg4-'+text).submit();}, false);
	f.appendChild(a);
	var i = document.createElement('input');
	i.setAttribute('type', 'hidden');
	i.setAttribute('name', 'Aold');
	i.setAttribute('value', seq);
	f.appendChild(i);
	return f;
}

function getSequence(){
	var reg = new RegExp('research.att.com/~njas/sequences/(A\\d\\d\\d\\d\\d\\d)');
	if (reg.test(location.href))
		return RegExp.lastParen;
	return '';
}

function editLinks() {
	var prefix = window.location.href;
	prefix = prefix.substring(0, prefix.indexOf('research.att.com/~njas/sequences/'));	// 'http://www.' or 'http://www2.'
	var docBody = document.getElementsByTagName('body')[0];
	var d = document.createElement('div');
	d.id = 'crg4-div';
	GM_addStyle('#crg4-div a {color: #14B; padding: 1em}\n#crg4-div a:hover {cursor: pointer}');
	d.setAttribute ('style', 'position: fixed; top: 0; right: 0;');
	var edt = newForm('[E]', prefix + 'research.att.com/~njas/sequences/submitC');
	//var add = newForm('[A]', prefix + 'research.att.com/~njas/sequences/submitA');
	d.appendChild(edt);
	//d.appendChild(add);
	docBody.appendChild(d);
}

function prefill () {
	var inp = document.getElementsByTagName('input');
	if (inp === null)
		return;
	for (var i = 0; i < inp.length; i++) {
		//alert('Trying to prefill input #' + i + ', "' + inp[i].getAttribute('name') + '"');
		var nm = inp[i].getAttribute('name');
		if (nm == 'sender' && inp[i].value === '')
			inp[i].value = yourName;
		else if (nm == 'address' && inp[i].value === '')
			inp[i].value = yourEmail;
	}
}

if (seq != '')
	editLinks();
if (location.href.indexOf('research.att.com/~njas/sequences/submit') >= 0)
	prefill();
