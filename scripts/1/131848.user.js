// ==UserScript==
// @name           UD PK Reporter
// @namespace      Klexur
// @version        1.0
// @description    Automates the task of reporting player kills (PKs) to the Rogues Gallery.
// @updateURL      https://github.com/Klexur/UDScripts/raw/master/UD_PK_Reporter.user.js
// @include        http://*urbandead.com/map.cgi*
// @include        http://iamscott.net/cgi-bin/dumbwit.rb
// @include        http://rg.urbandead.net/reports/add/url#*
// @exclude        http://*urbandead.com/map.cgi?logout
// ==/UserScript==

var durl = document.location.href
if (durl.match(/urbandead.com.*map.cgi/)) addButton();

// Wait for page to load
window.addEventListener('load', function() {
	if (durl.match(/iamscott.net.*cgi-bin.*dumbwit.rb/)) getLink();
	if (durl.match(/rg.urbandead.net.*reports.*add.*url#/)) openReport();
}, true);

function addButton() {
	var input = document.createElement('input');
	input.type = 'submit';
	input.className = 'm';
	input.id = 'PK_Reporter';
	input.value = 'Report PK';
	input.addEventListener(
		'click',
		function(event) {
			event.stopPropagation();
			event.preventDefault();
			var d = new Date();
			var w = window.open('', d);
			w.document.write('<html><body><form name="wF" action="http://iamscott.net/cgi-bin/dumbwit.rb" method="post"><input name="wP" value="PRIVATE" /><input name="wC" value="' + prompt('Enter Dumbwit comment - may be blank.') + '"><input name="wT" value="' + window.document.lastModified + '" /><input name="wZ" value="' + d.getTimezoneOffset() + '" /><input name="wV" value="23" /><textarea name="wS">' + document.body.innerHTML + '</textarea></form>');
			w.document.forms[0].submit();
		},
		false
	);
	
	var form = document.createElement('form');
	form.className = 'a';
	form.method = 'post';
	form.action = 'map.cgi';
	form.appendChild(input);

	var frag = document.createDocumentFragment();
	frag.appendChild(form);
	frag.appendChild(document.createTextNode(' '));		// seems to create the equivalent of &nbsp;

	var firstForm = document.evaluate('//td[@class="gp"]/form', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (!firstForm)
		document.evaluate('//td[@class="gp"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).appendChild(frag);
	else
		firstForm.parentNode.insertBefore(frag, firstForm.nextSibling);
}

function getLink() {
	var a = document.getElementsByTagName('a');
	// Assuming Dumbwit capture is first link
	var link = a[0].href;
	window.location.replace('http://rg.urbandead.net/reports/add/url#' + link);
}

function openReport() {
	var i = durl.indexOf('#');
	if (i == -1) return;
	
	var link = durl.substring(i+1);
	var upinput = document.getElementById('DocumentUrl');
	//upinput.focus();
	upinput.value = link;

	var upload = document.getElementsByName('upload');
	upload[0].click();
}
