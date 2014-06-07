// ==UserScript==
// @name           TweetAnywhere
// @namespace      http://dt.in.th/
// @description    Allows you to tweet anywhere by pressing ctrl twice on keyboard.
// @include        *
// ==/UserScript==

var lt = 0;

var kwf = {};

kwf['snipr'] = kwf['`'] = function(cb) {

	cb ('[...]');

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://snipr.com/site/snip?r=simple&link=' + encodeURIComponent(location.href),
		onload: function(res) {
			cb (res.responseText);
		}
	});
	
};

kwf['arrow'] = kwf['a'] = function(cb) {

	cb ('[...]');

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://tinyarro.ws/api-create.php?url=' + encodeURIComponent(location.href),
		onload: function(res) {
			var d = document.createElement('span');
			d.innerHTML = res.responseText.substr(7);
			cb ('www.' + d.textContent);
		}
	});

}

kwf['url'] = kwf['q'] = function(cb) {

	cb (location.href);

};

kwf['title'] = kwf['1'] = function(cb) {

	cb (document.title);

};

var showMain = function() {

	var limit = document.createElement('div');
	limit.style.background = 'black';
	limit.style.color = 'white';
	limit.style.height = '40px';
	limit.style.width = '150px';
	limit.style.right = '40%';
	limit.style.top = '10%';
	limit.style.font = '16pt Verdana, sans-serif';
	limit.style.lineHeight = '40px';
	limit.style.position = 'fixed';
	limit.style.textAlign = 'center';
	limit.style.zIndex = '9999999';
	limit.style.marginTop = '-38px';
	limit.style.MozBorderRadius = '15px 15px 0 0';

	var tn = document.createTextNode('!!');
	limit.appendChild (tn);

	var inp = document.createElement('textarea');
	inp.style.border = '4px solid black';
	inp.style.position = 'fixed';
	inp.style.top = '10%';
	inp.style.left = '15%';
	inp.style.width = '60%';
	inp.style.height = '4em';
	inp.style.font = '14pt Verdana, sans-serif';
	inp.style.background = 'rgba(20,20,20,0.9)';
	inp.style.zIndex = '9999999';
	inp.style.display = 'none';
	inp.style.color = '#fff';

	function upda() {
		setTimeout (function() {
			tn.data = (140 - inp.value.length) + ' [' + (140 - encodeURIComponent(inp.value).replace(/%../g, 'x').length) + ']';
		}, 1);
	}

	inp.addEventListener ('keydown', upda, false);
	inp.addEventListener ('mouseup', upda, false);

	function startCallingThat(n, fn) {

		var sa = inp.selectionStart - n.length;
		var ln = n.length;

		function cb(q) {
			var sb = inp.selectionStart;
			var iv = inp.value;
			inp.value = iv.substr(0, sa) + q + iv.substr(sa + ln);
			inp.selectionEnd = inp.selectionStart = sb + q.length - ln;
			ln = q.length;
			upda ();
		}
		setTimeout (function() {
			fn (cb);
		}, 0);

	}

	inp.addEventListener ('keydown', function(e) {

		if (e.keyCode == 27) {
			inp.style.display = 'none';
			limit.style.display = inp.style.display;
			replies.style.display = inp.style.display;
			e.stopPropagation ();
			e.preventDefault ();
			return;
		}
		if (e.keyCode == 13) {
			inp.style.color = '#aaa';
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://twitter.com/statuses/update.json',
				data: 'status=' + encodeURIComponent(inp.value),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(res) {
					inp.style.display = 'none';
					limit.style.display = inp.style.display;
					replies.style.display = inp.style.display;
					inp.style.color = '#fff';
				}
			});
			e.stopPropagation ();
			e.preventDefault ();
			return;
		}

		if (e.keyCode == 9) {
			var bfs = inp.value.substr(0, inp.selectionStart);
			for (var i in kwf) {
				if (bfs.substr(bfs.length - i.length) == i) {
					startCallingThat (i, kwf[i]);
					e.stopPropagation ();
					e.preventDefault ();
					return;
				}
			}
		}

	}, false);
	document.body.appendChild (inp);
	document.body.appendChild (limit);

	function main() {
		inp.style.display = inp.style.display == 'none' ? 'inline' : 'none';
		limit.style.display = inp.style.display;
		replies.style.display = inp.style.display;
		if (inp.style.display != 'none') {
			var sel = window.getSelection();
			var ss = sel.toString();
			inp.focus ();
			if (ss != '') {
				inp.value += ss + ' ';
				inp.selectionEnd = inp.value.length;
			}
			upda ();
		}
	}

	showMain = main;

	var replies = document.createElement('div');
	replies.style.top = '35%';
	replies.style.position = 'fixed';
	replies.style.left = '20%';
	replies.style.width = '40%';
	replies.style.zIndex = '9999999';

	function showReplies(a) {
		var d = 0;
		a.forEach (function(b) {
			var q = document.createElement('div');
			q.innerHTML = '<b>@' + b.user.screen_name + '</b> ' + b.text;
			q.style.font = '9pt/1.5em Verdana, Tahoma, sans-serif';
			q.style.background = 'rgba(255,255,255,0.85)';
			q.style.color = '#000';
			q.style.margin = '0 0 2px';
			q.style.padding = '4px';
			setTimeout (function() {
				replies.appendChild (q);
			}, 100 * d++);
		});
	}

	function dpz(jsn) {
		showReplies (jsn);
	}

	var lastTime = parseInt(GM_getValue('last_cache', 0));
	if (new Date().getTime() - lastTime > 180000) {
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://twitter.com/statuses/replies.json',
			data: 'status=' + encodeURIComponent(inp.value),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			onload: function(res) {
				var jsn = eval(res.responseText);
				GM_setValue('cache_data', '' + escape(uneval(jsn)));
				GM_setValue('last_cache', new Date().getTime() + '');
				dpz (jsn);
			}
		});
	} else {
		var jsn = eval(unescape(GM_getValue('cache_data', '[]')));
		dpz (jsn);
	}

	document.body.appendChild (replies);

	return main();

}

window.addEventListener ('keydown', function(e) {

	if (e.keyCode != 17) return lt = 0;
	if (new Date().getTime() - lt > 400) {
		lt = new Date().getTime();
		return;
	}
	lt = 0;

	showMain ();

}, false);