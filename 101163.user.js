// ==UserScript==
// @name           Boxxysphere script
// @namespace      *
// @include        http://unichan2.org/*
// @include        http://chan.catiewayne.com/*
// ==/UserScript==


var ku_boardspath = window.wrappedJSObject.ku_boardspath;
if (typeof ku_boardspath != 'string') return;



//// Settings ////

settings = {
	defaults: {
		enableQuoteBox: false,
		enableQuoteBoxOP: false,
		enableNestedQuoteBoxes: false,
		enableFastQuotePopups: true,
		enableLoadMoreButton: true,
		warnOnTripInWrongField: true,
		enableClock: true,
		showSeconds: false,
	},
	
	load: function() {
		for (var s in this.defaults) {
			if (this.defaults.hasOwnProperty(s)) {
				this[s] = GM_getValue(s, this.defaults[s]);
			}
		}
	},
	
	save: function() {
		for (var s in this.defaults) {
			if (this.defaults.hasOwnProperty(s)) {
				(this[s] != this.defaults[s]) ? GM_setValue(s, this[s]) : GM_deleteValue(s);
			}
		}
	}
};
settings.load();




var settingsMenu = new function() {
	var menu, container, arrow, inputs = [];
	
	function init() {
		var adminbar = doElements('div', function(div) {
			if (div.className === 'adminbar') return div;
		});
		if (!adminbar) return;
		
		container = document.createElement('span');
		container.style.position = 'relative';
		container.innerHTML = '&nbsp;[<a href=#><small>&#9660;</small></a>]';
		arrow = container.getElementsByTagName('small');
		
		var a = container.getElementsByTagName('a')[0];
		a.addEventListener('click', function(e) {
			e.preventDefault();
			toggle();
		}, true);
		
		adminbar.appendChild(container);
	}
	
	function toggle() {
		if (!menu) {
			var shadow = '0px 0px 2px 2px #579';
			GM_addStyle(
				'#bs_settings_menu { z-index:10000; position:absolute; right:0px; width:17em!important; border-radius:1em; border:1px solid #66A; box-shadow:' + shadow + '; -moz-box-shadow:' + shadow + '; -webkit-box-shadow:' + shadow + '; padding:.5em; margin-top:10px; width:auto; text-align:left; background:#FCFCFC; background:-moz-linear-gradient(top,#FCFCFC,#D0D0D0); background:-webkit-gradient(linear,left top,left bottom,from(#FCFCFC),to(#D0D0D0)); color:#333!important; border-radius:.7em; -moz-border-radius:.7em; -webkit-border-radius:.7em; }' +
				'#bs_settings_menu ul { list-style-type:none; padding:0; margin:0.5em 0 1em 0; }' +
				'#bs_settings_menu input { position:relative; top:.15em; margin:.3em .6em .3em .1em; }' +
				'#bs_settings_menu label { color:#336!important; }' +
			'');
			
			menu = document.createElement('div');
			menu.id = 'bs_settings_menu';
			menu.innerHTML = (
				'<center><b>Boxxysphere script settings</b></center>' +
				'<ul>' +
				'<li><label><input type=checkbox name=bs_setting_enableLoadMoreButton>Show "Load more" button</label>' +
					((document.location.host == 'unichan2.org') ? ' (doesn\'t work on Uni)' : '') +
				'<li><label><input type=checkbox name=bs_setting_enableQuoteBox>Show inline quote boxes</label>' +
				'<li>&nbsp;&mdash;&ensp;<label><input type=checkbox name=bs_setting_enableQuoteBoxOP>Even when quoting OP</label>' +
				'<li>&nbsp;&mdash;&ensp;<label><input type=checkbox name=bs_setting_enableNestedQuoteBoxes>Nest them (can get slow!)</label>' +
				'<li><label><input type=checkbox name=bs_setting_enableFastQuotePopups>Fast quote popups</label>' +
				'<li><label><input type=checkbox name=bs_setting_warnOnTripInWrongField>Highlight tripcode in wrong field</label>' +
				'<li><label><input type=checkbox name=bs_setting_enableClock>Show chan clock</label>' +
				'<li>&nbsp;&mdash;&ensp;<label><input type=checkbox name=bs_setting_showSeconds>Show seconds</label>' +
				'</ul>' +
				'Note: Most changes don\'t take effect until the next page load.' +
			'');
			
			syncSettings(0);
			
			container.appendChild(menu);
			arrow.innerHTML = '&#9650;';
		} else {
			var display = menu.style.display == 'none';
			arrow.innerHTML = display ? '&#9650;' : '&#9660;';
			menu.style.display = display ? '' : 'none';
		}
	}
	
	function syncSettings(mode) {
		forEach(menu.getElementsByTagName('input'), function(input) {
			var n = input.name.match(/^bs_setting_(.*)/);
			if (!n) return;
			n = n[1];
			if (mode == 0) {
				inputs[n] = input;
				input.checked = settings[n];
				input.addEventListener('change', function(e) {
					syncSettings(1);
				}, false);
			} else {
				settings[n] = input.checked ? true : false;
			}
		});
		inputs['showSeconds'].disabled = inputs['enableClock'].checked ? '' : 'disabled';
		inputs['enableQuoteBoxOP'].disabled = inputs['enableQuoteBox'].checked ? '' : 'disabled';
		inputs['enableNestedQuoteBoxes'].disabled = inputs['enableQuoteBox'].checked ? '' : 'disabled';
		if (mode) settings.save();
	}
	
	init();
}




//// Load more posts button ////

if (settings.enableLoadMoreButton) (function loadMore() {
	if (document.location.host == 'unichan2.org') return;
	
	var m = document.location.href.match(/\/(\w+)\/res\/(\d+)/);
	if (!m) return;
	
	var path = ku_boardspath + '/read.php?b=' + m[1] + '&t=' + m[2] + '&p=%d-2000000000&single';
	var lastTime = 0;
	
	var latest = latestPost();
	if (latest === false) return;
	
	var el = latest[0];
	if (latest[2] == 'y') {
		do {
			el = el.nextSibling;
			if (!el) return false;
		} while (el.tagName != 'BLOCKQUOTE');
	} else {
		do {
			el = el.parentNode;
			if (!el) return false;
		} while (el.tagName != 'TABLE');
	}
	
	var loadContainer = document.createElement('div');
	loadContainer.style.paddingTop = '1.5em';
	
	var button = document.createElement('button');
	button.innerHTML = 'Load more';
	button.addEventListener('click', onClick, true);
	loadContainer.appendChild(button);
	
	var status = document.createElement('span');
	status.style.paddingLeft = '2em';
	loadContainer.appendChild(status);
	
	el.parentNode.insertBefore(loadContainer, el.nextSibling);
	
	
	function onClick(e) {
		e.preventDefault();
		
		if (typeof navigator.onLine != 'undefined' && !navigator.onLine) {
			setStatus('Your browser is in "Work Offline" mode.', true, true);
			return;
		}
		
		var now = new Date().getTime();
		if (lastTime && Math.abs(now - lastTime) < 8 * 1000) return;
		lastTime = now;
		
		var latest = latestPost()[1];
		
		setStatus('Loading...', false, false);
		
		var req = new XMLHttpRequest();
		req.open('GET', path.replace('%d', latest + 1), true);
		req.onreadystatechange = function() {
			if (req.readyState != 4) return;
			if (req.status == 0 || req.status >= 400) {
				setStatus("Couldn't connect to server.", true, true);
			} else {
				var res = req.responseText;
				if (res.indexOf('<blockquote>') === -1) {
					setStatus("No new posts.", true, true);
					return;
				}
				var wrapper = document.createElement('div');
				wrapper.innerHTML = res;
				loadContainer.parentNode.insertBefore(wrapper, loadContainer);
				
				if (settings.enableQuoteBox) addQuoteBoxes(wrapper);
				safecall('addpreviewevents();'); // ? would IE's attachEvent allow duplicate handlers?
				
				if (0) {
					safecall('highlight("' + latest + '");');
				} else {
					location.href = '#' + latest;
				}
				
				setStatus("", true, false);
			}
		};
		req.send();
	}
	
	var resetTimeout;
	function setStatus(text, buttonEnable, autoReset) {
		status.innerHTML = text;
		buttonEnable ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'disabled');
		
		if (autoReset) {
			if (resetTimeout) clearTimeout(resetTimeout);
			resetTimeout = setTimeout(function() {
				setStatus("", true, false)
				resetTimeout = 0;
			}, 2000);
		}
	}
	
	function latestPost() {
		var latest = false;
		doElements('span', function(span) {
			var m;
			if (span.id && (m = span.id.match(/^dnb-\w+-(\d+)-([yn])/))) {
				latest = [span, Number(m[1]), m[2]];
			}
		});
		return latest;
	}	
})();




//// Post preview button ////
(function() {
	var previewRow, previewBox;
	var message = doElements('textarea', function(t) { if (t.name == 'message') return t; });
	if (!message) return;
	
	var e = message;
	do { e = e.parentNode; } while (e && e.tagName != 'TD'); if (!e) return;
	do { e = e.previousSibling; } while (e && e.tagName != 'TD'); if (!e) return;
	
	var a = document.createElement('a');
	a.addEventListener('click', doPreview, 1);
	a.href = '#';
	a.innerHTML = 'Preview';
	a.style.fontSize = '.9em';
	a.style.opacity = '.7';
	a.style.textDecoration = 'none';
	a.style.borderBottom = '1px dotted';
	var div = document.createElement('div');
	div.style.paddingTop = '.4em';
	div.appendChild(a);
	e.appendChild(div);
	
	
	function doPreview(e) {
		e.preventDefault();
		
		var req = new XMLHttpRequest();
		req.open('GET', ku_boardspath + '/expand.php?board=' + doElements('input', function(i) { if (i.name == 'board') return i; }).value + '&preview&parentid&message=' + escape(message.value), true);
		req.onreadystatechange = function() {
			if (req.readyState != 4) return;
			if (req.status == 0 || req.status >= 400) {
				showPreview("<i>Couldn't connect to server.</i>");
			} else {
				var wrapper = document.createElement('wrapper');
				wrapper.innerHTML = req.responseText;
				showPreview(wrapper.getElementsByTagName('div')[0].innerHTML);
			}
		};
		req.send();
	}
	
	function showPreview(p) {
		if (!previewBox) {
			var td;
			previewRow = document.createElement('tr');
			previewRow.appendChild(document.createElement('td'));
			previewRow.appendChild(td = document.createElement('td'));
			td.innerHTML = '<table align=left cellspacing=0><tr><td class=reply style="padding:.75em!important"><td style="padding-left:.4em;vertical-align:top;opacity:.7;"></table>';
			previewBox = td.getElementsByTagName('td')[0];
			
			var a = document.createElement('a');
			a.href = '#';
			a.innerHTML = '&times';
			a.style.fontWeight = 'bold';
			a.style.textDecoration = 'none';
			a.title = 'Close preview';
			a.addEventListener('click', function(e) {
				e.preventDefault();
				previewRow.style.display = 'none';
			}, 1);
			td.getElementsByTagName('td')[1].appendChild(a);
			
			var e = message;
			do { e = e.parentNode; } while (e && e.tagName != 'TR');
			e.parentNode.insertBefore(previewRow, e);
		}
		
		previewBox.innerHTML = p;
		previewRow.style.display = '';
		safecall('addpreviewevents();');
	}
})();




//// Warn on trip in wrong field ////
if (settings.warnOnTripInWrongField) (function() {
	GM_addStyle('.trip-warning { background:red; color:black; border:2px solid orange; }');
	
	doElements('input', function(input) {
		if (input.name == 'em' || input.name == 'subject') {
			var evts = ['change', 'keypress', 'keyup', 'mouseout'];
			for (e in evts) input.addEventListener(evts[e], check, 1);
			input.addEventListener('paste', function(e) {
				setTimeout(function() { check(e); }, 50);
			}, 1);
		}
	});
	
	function check(e) {
		e.target.className = (e.target.value.indexOf('#') >= 0) ? 'trip-warning' : '';
	}
})();




//// Quote boxes ////

if (settings.enableQuoteBox && document.location.href.match(/\/res\/\d/)) {
	GM_addStyle('.inline-quote { margin-top:0.2em; margin-bottom:0.4em; margin-left:2em; } .inline-quote td.reply { border:1px dotted #5AA!important; padding:0.5em!important; }');
	
	addQuoteBoxes(document);
}

function addQuoteBoxes(within) {
	forEach(within.getElementsByTagName('a'), function(link) {
		if (typeof link.className == 'string' && link.className.substring(0, 4) == 'ref|' && !link.getAttribute('noquote')) {
			var ainfo = link.className.split('|');
			
			if (!settings.enableQuoteBoxOP && ainfo[2] == ainfo[3]) {
				//link.innerHTML += ' (OP)';
			} else {
				var content = getPostHTML(ainfo[1], ainfo[2], ainfo[3]);
				if (content !== false) {
					var div = document.createElement('div');
					div.className = 'inline-quote';
					div.innerHTML = content;
					fixQuoteElements(div);
					link.parentNode.insertBefore(div, link.nextSibling);
				}
			}
		}
	});
}




//// Fast quote popups ////

if (settings.enableFastQuotePopups) {
	unsafeWindow.addreflinkpreview = function(e) {
		var e_out = this['href'] ? this : e['srcElement'];
		ainfo = e_out.className.split('|');
		
		var j = document.createElement('div');
		j.setAttribute('id', 'preview' + e_out.className);
		j.setAttribute('class', 'reflinkpreview');
		j.style.left = ((e.pageX ? e.pageX : e.clientX) + 50) + 'px';
		e_out.parentNode.insertBefore(j, e_out);
		
		var res = getPostHTML(ainfo[1], ainfo[2], ainfo[3]);
		if (res !== false) {
			j.innerHTML = res;
			fixQuoteElements(j);
		} else {
			var req = new XMLHttpRequest();
			req.open('GET', ku_boardspath + '/read.php?b=' + ainfo[1] + '&t=' + ainfo[2] + '&p=' + ainfo[3] + '&single', true);
			req.onreadystatechange = function() {
				if (req.readyState != 4) return;
				if (req.status == 0 || req.status >= 400) {
					j.innerHTML = "<table><tr><td class=reply>Couldn't connect to server.</table>";
				} else {
					var res = req.responseText;
					if (res.indexOf('<blockquote>') === -1) res = "<table><tr><td class=reply>No such post.</table>";
					j.innerHTML = res;
					fixQuoteElements(j);
					
					var marker = 'dnb-' + ainfo[1] + '-' + ainfo[3] + '-' + (ainfo[2] == ainfo[3] ? 'y' : 'n');
					postCache[marker] = res;
				}
			};
			req.send();
		}
	};	
}




//// Clock ////

var timeOffset;

if (settings.enableClock) {
	GM_addStyle('#server_clock { z-index:1000; position:fixed; right:0; bottom:0; padding:0.7em; }');
	
	var prefix = document.location.host.replace('/^www\.', '');
	
	timeOffset = GM_getValue(prefix + '_timeOffset', 0);
	var timeSyncTime = GM_getValue(prefix + '_timeSyncTime', 0);
	
	if (Math.abs((new Date().getTime() / 1000) - timeSyncTime) > 600) {
		timeOffset = calcTimeOffset();
		if (timeOffset !== false) {
			GM_setValue(prefix + '_timeOffset', timeOffset);
			GM_setValue(prefix + '_timeSyncTime', Math.round(new Date().getTime() / 1000));
		}
	}
	
	if (typeof timeOffset == 'number') {
		var div = document.createElement('div');
		div.id = 'server_clock';
		document.body.appendChild(div);
		
		updateClock();
		setInterval(updateClock, 1000);
	}
}


function updateClock() {
	var t = new Date(new Date().getTime() + timeOffset * 1000);
	function pad(n) { return n < 10 ? '0' + n : n; }
	document.getElementById('server_clock').innerHTML = (
		pad(t.getHours()) + ':' +
		pad(t.getMinutes()) +
		(settings.showSeconds ? ':' + pad(t.getSeconds()) : '')
	);
}


function calcTimeOffset() {
	var spans = document.getElementsByTagName('span');
	var newestThumb = 0;
	var m, board;
	
	for (var i = 0; i < spans.length; i++) {
		var id = spans[i].id;
		if (!id) continue;
		
		if (!board && (m = id.match(/^dnb-(.+?)-\d+-[yn]/))) {
			board = m[1];
		} else if (m = id.match(/^thumb(\d+)$/)) {
			var thumb = Number(m[1]);
			if (thumb > newestThumb) newestThumb = thumb;
		}
	}
	
	if (!newestThumb || !board) return false;
	
	var span = document.getElementById('thumb' + newestThumb);
	var src = span.getElementsByTagName('img')[0].src;
	if (!(m = src.match(/thumb\/(\d{10})\d*s/))) return false;
	var time1 = Number(m[1]);
	
	var p = getPostHTML(board, 0, newestThumb);
	if (p === false) p = getPostHTML(board, newestThumb, newestThumb);
	if (p === false) return false;
	
	m = p.match(/(\d\d)\/(\d\d)\/(\d\d)\(...\)(\d\d):(\d\d)/);
	if (!m) return false;
	var time2 = new Date(
		2000 + Number(m[1]), // year
		Number(m[2]) - 1, // month
		Number(m[3]), // day
		Number(m[4]), // hour
		Number(m[5]), // minute
		0
	).getTime() / 1000;
	
	var timeOffset = Math.round((time2 - time1) / 1800) * 1800;
	
	return timeOffset;
}





//// Misc ////

GM_addStyle('td.reply { position:static!important; }');

function safecall(c) {
	if (typeof c == 'function') c = '(' + c + ')()';
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = c;
	
	document.body.appendChild(script);
	document.body.removeChild(script);
}

function getPostHTML(board, thread, post) {
	var marker = 'dnb-' + board + '-' + post + '-' + (thread == post ? 'y' : 'n');
	if (typeof postCache == 'undefined') postCache = [];
	if (postCache[marker]) return postCache[marker];
	el = document.getElementById(marker);
	if (!el) return false;
	
	var p;
	if (thread != post) {
		while (!(el.tagName == 'TD' && el.className == 'reply')) {
			el = el.parentNode;
			if (!el) return false;
		}
		p = '<table><tr><td class=reply>' + el.innerHTML + '</table>';
	} else {
		while (!(el.tagName == 'SPAN' && el.className == 'filesize')) {
			if (el.previousSibling) el = el.previousSibling;
			else if (!(el = el.parentNode)) return false;
		}
		var h = outerHTML(el);
		do {
			el = el.nextSibling;
			if (!el) return false;
			h += outerHTML(el);
		} while (el.tagName != 'BLOCKQUOTE');
		p = '<table><tr><td class=reply style="width:600px!important">' + h + '</table>';
	}
	
	postCache[marker] = p;
	
	//return 'board:' + board + '; thread:' + thread + '; post:' + post;
	return p;
}

function outerHTML(el) {
	var h = el.outerHTML;
	if (h) return h;
	var div = document.createElement('div');
	div.appendChild(el.cloneNode(true));
	h = div.innerHTML;
	div = null;
	return h;
}

function fixQuoteElements(el) {
	var children = [];
	var tmp = el.getElementsByTagName('*'); // can't use directly as we are removing nodes as we go through
	for (var i = 0; i < tmp.length; i++) {
		children[i] = tmp[i];
	}
	for (var i = 0; i < children.length; i++) {
		var node = children[i];
		if (node.name) node.removeAttribute('name');
		if (node.id) node.removeAttribute('id');
		if (typeof node.className == 'string') {
			switch (node.className) {
			case 'inline-quote': case 'extrabtns': case 'doubledash':
				node.parentNode.removeChild(node);
				break;
			default:
				if (!settings.enableNestedQuoteBoxes && node.className.substring(0, 4) == 'ref|') {
					node.setAttribute('noquote', '1');
				}
			}
		}
	}
}

function forEach(items, func) {
	for (var i = 0, result; i < items.length; i++) {
		if ((result = func(items[i]))) return result;
	}
}

function doElements(tagName, func) {
	return forEach(document.getElementsByTagName(tagName), func);
}
