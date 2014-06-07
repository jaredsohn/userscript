// ==UserScript==
// @name           DSEditFavVillages
// @namespace      de.staemme.limone
// @ version       1.0
// @ author        LimonE
// @description    Dörfer die in den Favoriten gespeichert sind, lassen sich umbennen.
// @include        http://*.die-staemme.de/targets.php?*mode=bookmark
// ==/UserScript==

var icon = 	'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfW'+
		'BhQXGSbd7RqaAAAAB3RJTUUH1gYUFyMyN5/z7gAAAAlwSFlzAAALEgAACxIB0t1+/AAAAwBQTFRF'+
		'fxEKcW1gcW5gc25jdHBidnFkeHRnlhgGsDEJtz8LvUsBs0gev1kAo0AwtUokvlMjr2YlhVdOklJC'+
		'n2RbgHpqp3RxtXdtvndpzUsDx1YMwWcBwWgExG8DymECz3sE1n0D13Qp5X8F2IUbzYUo7pEP7ZMc'+
		'94w016Zs8LR7npuPo5CHppyLq6ecq6icq6mfrKmdrKmfq6mgrKqhsqGgx6aixbmozb654bmB57GV'+
		'7LWTw8G0xMG2xcK1zcS0zcq/18i61ci+2sq/08/D1c7B3cTE3sTE2s3N19TH2tXL2tbM29jN39vO'+
		'2tHQ393R5N7S9NrA5+Xc6OXd6Obd6Obe6+jf9O3f+ezc8u/l9+vj9/f0+vn1/fr5/fv7/Pz8/fz8'+
		'/f39AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArTu6uwAAAEV0Uk5T////////////////////////'+
		'//////////////////////////////////////////////////////////////////8Asu6xOAAA'+
		'AIBJREFUeNpj8A4ODvAzFeBmcGEIjI+PjVSXlmB3BTHj/JV5OIS0QcwocxkuXi0REDNMSYpTzJYV'+
		'xNSQk+VzdGZhCIqLUJWXFA91AjKjLVUU+e19bRiBTAs1BWEHdysmhqAYE0FRMw8vOxaG4Dg3Y5+Q'+
		'kHBPNgZrQyM9A30dXU1mALsfGXuUUOVWAAAAAElFTkSuQmCC';
	
var bstyle = 	'line-height:1.5em; font-size:8pt; margin-left: 5px; margin-right: 5px;';

function startView() {
	var nodes = document.getElementsByTagName('td');
	for (var i = 0; i < nodes.length; i++) {
		var current = nodes[i].firstChild;
		if (current.tagName == 'A') {
			if (/mode=bookmark&action=del_bookmark&id=\d+/.test(current.href)) {
				var ID = current.href.match(/id=(\d.+)/)[1];
				var next = nodes[i+1];
				var name = next.firstChild.nodeValue;
				if (GM_getValue('dorf' + ID) != undefined) {
					var textField = document.createTextNode(GM_getValue('dorf' + ID,300));
					next.replaceChild(textField, next.firstChild);
				}
				next.appendChild(createIcon(ID, name));
				next.appendChild(createButton(ID));
				showIcon(ID);
			}
		}
	}
};

function createIcon(id, name) {
	var link = document.createElement('a');
	link.setAttribute('href', 'javascript:function nothing() { return; }');
	link.setAttribute('style', 'margin-left: 5px;');
	var img = document.createElement('img');
	img.setAttribute('src', icon);
	img.setAttribute('alt', name);
	img.setAttribute('id', 'i'+id);
	link.appendChild(img);
	return link;
};

function createButton(id) {
	var button = document.createElement('button');
	button.setAttribute('id', 'b'+id);
	button.setAttribute('type', 'button');
	button.setAttribute('style', bstyle);
	var text = document.createTextNode('Ok');
	button.appendChild(text);
	return button;
};

function showIcon(id) {
	document.getElementById('i' + id).setAttribute('style', ' ');
	document.getElementById('b' + id).setAttribute('style', 'display:none; '+bstyle);
};

function showButton(id) {
	document.getElementById('i' + id).setAttribute('style', 'display:none;');
	document.getElementById('b' + id).setAttribute('style', bstyle);
};

function showEdit(id, name) {
	var where = document.getElementById('i' + id).parentNode.parentNode; 
	var input = document.createElement('input');
	if (GM_getValue('dorf' + id) != undefined) { name = GM_getValue('dorf' + id,300) }
	input.setAttribute('type', 'text');
	input.setAttribute('value', name);
	where.replaceChild(input, where.firstChild);
	showButton(id);
};

function showText(id) {
	var where = document.getElementById('i' + id).parentNode.parentNode;
	var newname = where.firstChild.value;
	var text = document.createTextNode(newname);
	GM_setValue('dorf' + id, newname);
	where.replaceChild(text, where.firstChild);
	showIcon(id);
};

window.onload = startView();

document.addEventListener('click', function(event) {
	var et = event.target;
	if (et.nodeName =='IMG') {
		var ID = et.getAttribute('id').slice(1);
		var name = et.getAttribute('alt');
		showEdit(ID, name);
	}
	if (et.nodeName == 'BUTTON') {
		var ID = et.getAttribute('id').slice(1);
		showText(ID);
	}
}, true);