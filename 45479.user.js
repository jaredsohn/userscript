// ==UserScript==
// @name           EtherPadAnywhere
// @namespace      http://dttvb.com/etherpadanywhere.html
// @description    Allows you to edit any textarea field in EtherPad.
// @include        *
// ==/UserScript==

var textareas, textarea;

textareas = document.getElementsByTagName('textarea');
textarea = null;

if (!textareas.length) { return; }

for (var i = 0; i < textareas.length; i++) {

	(function(c) {

		c.addEventListener ('focus', function() {
			textarea = c;
		}, false);
		c.addEventListener ('blur', function() {
			textarea = null;
		}, false);

	})(textareas[i]);

}

function cep() {
	if (location.href.substr(0, 20) != 'http://etherpad.com/') {
		return;
	}
	var padID = location.href.substr(20);
	var defaultText = GM_getValue('tmp_' + padID, false);
	if (defaultText === false) {
		return;
	}
	defaultText = unescape(defaultText);
	GM_deleteValue ('tmp_' + padID);
	function tryUntilSuccess() {
		try {
			var tx = (document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('innerdocbody'));
			if (tx.innerHTML == '&nbsp;') {
				throw 'Not Ready!';
			}
			setTimeout (function() {
				tx.innerHTML = defaultText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br />');
			}, 100);
		} catch(e) {
			setTimeout (tryUntilSuccess, 100);
		}
	}
	setTimeout (tryUntilSuccess, 100);
}

cep ();

GM_registerMenuCommand ('Edit with EtherPad', function() {

	var c = textarea;

	if (c == null) {
		alert ('Please select a textarea.');
		return;
	}

	var oldtext = c.value;
	c.value = 'Opening with EtherPad...';

	var tm = setTimeout(function() {
		c.value = oldtext;
	}, 5000);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://etherpad.com/ep/pad/newpad',
		headers: {},
		onload: function(details) {
			c.value = oldtext;
			clearTimeout (tm);
			var rt = details.responseText;
			var m = rt.match(/"padId":"([^"]+)/);
			if (!m) {
				alert ('Error: Not found pad ID.');
				return;
			}
			var padID = m[1];
			GM_setValue ('tmp_' + padID, escape(textarea.value));
			GM_openInTab ('http://etherpad.com/' + padID);
			var btn = document.createElement('input');
			btn.type = 'button';
			btn.value = 'Update from EtherPad';
			btn.style.position = 'relative';
			btn.style.zIndex = '99999999';
			btn.addEventListener ('click', function() {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://etherpad.com/ep/pad/view/' + padID + '/latest?pt=1',
					headers: {},
					onload: function(details2) {
						c.value = details2.responseText;
					}
				});
			}, false);
			if (c.parentNode)
				c.parentNode.insertBefore (btn, c);
			var btn2 = document.createElement('input');
			btn2.type = 'button';
			btn2.value = 'Done';
			btn2.style.position = 'relative';
			btn2.style.zIndex = '99999999';
			btn2.addEventListener ('click', function() {
				if (btn.parentNode) btn.parentNode.removeChild (btn);
				if (btn2.parentNode) btn2.parentNode.removeChild (btn2);
			}, false);
			if (c.parentNode)
				c.parentNode.insertBefore (btn2, c);
		}
	});
});







