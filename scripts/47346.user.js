// ==UserScript==
// @name           Sicom Shoutbox Enhancement
// @namespace      http://www.sicomonline.com/forum/index.php?action=shoutbox
// @include        http://www.sicomonline.com/forum/index.php?action=shoutbox
// @description    Adds quoting functionality to sicom forum's shoutbox.
// ==/UserScript==

var TEMPLATE_QUOTE = '%s -> ';
var TEMPLATE_CALL  = '%s!! ';

var sbm = document.getElementById('shoutbox_message');
var gtt = document.createElement('div');

var sm = [];

(function() {
	for (var i = 0; i < unsafeWindow.smileys.length; i ++) {
		for (var j = 0; j < unsafeWindow.smileys[i].length; j ++) {
			sm.push (unsafeWindow.smileys[i][j]);
		}
	}
	var sbs = document.getElementById('shoutbox_smileys').getElementsByTagName('img');
	for (var i = 0; i < sbs.length; i ++) {
		var m = sbs[i].src.match(/[^\/]+$/);
		var n = sbs[i].getAttribute('onclick');
		if (m && n) {
			n = n.match(/'\s*(.*?)\',/);
			if (n) {
				var d = [n[1], m[0], sbs[i].title];
				sm.push (d);
			}
		}
	}
})();
function rp_img(x) {
	var d = '';
	var m;
	if (m = x.src.match(/[^\/]+$/)) {
		for (var i = 0; i < sm.length; i ++) {
			if (sm[i][1] == m[0]) {
				x.parentNode.replaceChild (document.createTextNode(sm[i][0]), x);
				break;
			}
		}
	}
}
function rp_a(x) {
	x.parentNode.replaceChild (document.createTextNode(x.href), x);
}
window.addEventListener ('dblclick', function(e) {

	var t = e.target;
	var c = t;
	while (c && c.nodeName) {

		if (c.nodeName == 'TD' && c.className == 'smalltext') {
			if (c.style.textAlign == 'left') {
				gtt.innerHTML = c.innerHTML;
				var x = gtt.getElementsByTagName('img');
				for (var i = 0; i < x.length; i ++) rp_img(x[i]);
				var x = gtt.getElementsByTagName('a');
				for (var i = 0; i < x.length; i ++) rp_a(x[i]);
				sbm.value = TEMPLATE_QUOTE.replace('%s', gtt.textContent);
				sbm.selectionEnd = sbm.selectionStart = sbm.value.length;
				sbm.focus ();
			} else if (c.style.textAlign == 'right') {
				sbm.value = TEMPLATE_CALL.replace('%s', c.getElementsByTagName('a')[0].textContent);
				sbm.selectionEnd = sbm.selectionStart = sbm.value.length;
				sbm.focus ();
			}
			return false;
		}

		c = c.parentNode;
	}

}, false);

var oo = unsafeWindow.Shoutbox_SentMsg;
var tt = document.title;
var ii = 0;
unsafeWindow.Shoutbox_SentMsg = function() {
	sbm.value = sbm.value;
	oo.apply (this, arguments);
};

var ctn = document.getElementById('shoutbox_banned');
function sbResize() {
	ctn.style.maxHeight = '';
	ctn.style.height = (window.innerHeight - (ctn.parentNode.parentNode.parentNode.offsetHeight - ctn.offsetHeight + 15)) + 'px';
}
document.body.style.overflow = 'hidden';
sbResize ();
window.addEventListener ('resize', sbResize, false);