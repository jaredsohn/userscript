// ==UserScript==
// @name           UD PK Reporter Private
// @namespace      Klexur
// @version        1.2
// @description    (Hides HP, AP, and Inventory.) Automates the task of reporting player kills (PKs) to the Rogues Gallery.
// @updateURL      https://github.com/Klexur/UDScripts/raw/master/UD_PK_Reporter_Private.user.js
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
	input.id = 'PK_Reporter_Private';
	input.value = 'Report PK';
	input.addEventListener(
		'click',
		function(event) {
			event.stopPropagation();
			event.preventDefault();
			var pre_body = document.body.innerHTML;
			var barrista = document.getElementById('barrista');
			if (barrista) hideBarrista();
			else hideDefault();
			hideInventory();
			getDumbwit();
			// return info
			document.body.innerHTML = pre_body;
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

function hideBarrista() {
	// get info
	var AP = document.getElementById('barristaaptext');
	var AP_bar = document.getElementById('barristaapbar');
	var CharName = document.evaluate('//a[@class="barristaCharName"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var AP_time = CharName.snapshotItem(0).nextSibling;
	var HP = document.getElementById('barristahptext');
	var HP_bar = document.getElementById('barristahpbar');

	// hide info
	AP.innerHTML = 'XXAP'
	AP_bar.parentNode.removeChild(AP_bar);
	AP_time.innerHTML = AP_time.innerHTML.replace(/[0-9]+/, 'XXXX');
	HP.innerHTML = 'XXHP'
	HP_bar.parentNode.removeChild(HP_bar);
}

function hideDefault() {
	// get info
	var points = document.evaluate('//td[@class="cp"]//div[@class="gt"]//b', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var font = document.evaluate('//td[@class="cp"]//div[@class="gt"]//font', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i=0;

	if (points.snapshotLength > 0 && points.snapshotItem(1).innerHTML == 'dead') i=1;
	// hide info
	points.snapshotItem(1+i).innerHTML = 'XX'; // HP
	points.snapshotItem(3+i).innerHTML = 'XX'; // AP
	if (font.snapshotLength > 0) {
		// remove AP recovery time
		font.snapshotItem(0).parentNode.removeChild(font.snapshotItem(0));
	}
}

function hideInventory() {
	var forms = document.evaluate('//td[@class="gp"]//form[@class="a"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j=0; j<forms.snapshotLength; j++) {
		forms.snapshotItem(j).parentNode.removeChild(forms.snapshotItem(j));
	}
}

function getDumbwit() {
	var d = new Date();
	var w = window.open('', d);
	w.document.write('<html><body><form name="wF" action="http://iamscott.net/cgi-bin/dumbwit.rb" method="post"><input name="wP" value="PRIVATE" /><input name="wC" value="' + prompt('Enter Dumbwit comment - may be blank.') + '"><input name="wT" value="' + window.document.lastModified + '" /><input name="wZ" value="' + d.getTimezoneOffset() + '" /><input name="wV" value="23" /><textarea name="wS">' + document.body.innerHTML + '</textarea></form>');
	w.document.forms[0].submit();
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
