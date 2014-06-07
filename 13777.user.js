// ==UserScript==
// @name bbs2chreader_mouseover_kai
// @namespace http://b.hatena.ne.jp/tcns
// @include http://127.0.0.1:8823/thread/*/l*
// @version 0.2
// ==/UserScript==
//
// ChangeLog
//   2007-11-11 tcns
//     * Fix: tob2rObject arguments
//     * Fix: @include
//     * Fix: resID
//     * FIx: BeID
//     * Add: cache
//

/// === Utility v1.0.1 === ///
function XMLHttpRequestASync(method, url, func, opts) {
	if (!method || !url || !func) {
		return null;
	}

	var onerror = function () {
		alert('!!!ERROR!!!');
	}

	GM_xmlhttpRequest({
		method: method,
		url: url,
		headers: opts ? opts.headers ? opts.headers : '' : '',
		data: opts ? opts.data ? opts.data : '' : '',
		overrideMimeType: opts ? opts.overrideMimeType ? opts.overrideMimeType : '' : '',
		onreadystatechange: function (res) {
			if (res.readyState == 4 && res.status == 200) {
				func(res);
			}
		},
		onerror: opts ? opts.onerror ? opts.onerror : onerror : onerror
	});
};

var Element = {
	create: function (elem, klass, id, text) {
		if (!klass && !id && !text) {
			return document.createElement(elem);
		}
		var obj = this.create(elem);
		if (klass && klass.length) {
			obj.className = klass;
		}
		if (id && id.length) {
			obj.id = id;
		}
		if (text && text.length) {
			obj.innerHTML = text;
		}
		return obj;
	}/*,
	remove: function (target) {
		document.body.removeChild(target);
	},

	removeById: function (id) {
		this.remove($(id));
	}
*/
};

var bbs2chreader = function () {
	this.cache = [];
};
bbs2chreader.prototype.tob2rObject = function (obj, url) {
	var dt = obj.getElementsByTagName('dt')[0];
	var nodes = dt.childNodes;
	var id = dt.textContent.match(/\d{1,3}/);

	var container = Element.create('dl', 'resContainer', 'res'+id);
	var header = Element.create('dt', 'resHeader'); 
	
	// number
	header.appendChild(Element.create(
		'span',
		'resNumber',
		'',
		id
	));
	header.appendChild(document.createTextNode(' '));

	// name
	var name = dt.getElementsByTagName('b')[0];
	header.appendChild(Element.create(
		'span',
		'resName',
		'',
		name.textContent + (name.nextSibling ? name.nextSibling.textContent : '')
	));

	// mail and date
	header.appendChild(document.createTextNode(' ['));
	header.appendChild(Element.create(
		'span',
		'resMail',
		'',
		nodes[1].href.match(/[^mailto:]\w+/)
	));
	header.appendChild(document.createTextNode('] Date: '));
	header.appendChild(Element.create(
		'span',
		'resDate',
		'',
		nodes[2].textContent.match(/\d.* /)
	));

	// ID
	var elem = Element.create('span', 'resID');
	elem.onmouseover = 'b2rPopup.idPopup.mouseOver(event)';
	elem.onmouseout = 'b2rPopup.mouseOut(event)';
	elem.appendChild(Element.create(
		'span',
		'id_',
		'',
		nodes[2].textContent.match(/ID:\w+/)
	));

	header.appendChild(elem);
	header.appendChild(document.createTextNode(' Be: '));

	// BeID
	elem = Element.create('span', 'resBeID');
	var be_id = nodes[3] ? nodes[3].href.match(/\d+/)[0] : '';
	if (be_id.length > 0) {
		var be_link = Element.create('a');
		be_link.href = 'http://be.2ch.net/test/p.php?i='+be_id+'&u=d:'+url;
		be_link.innerHTML = be_id;
		elem.appendChild(be_link);
	} else {
		elem.style.display = 'none';
	}
	header.appendChild(elem);

	// body
	elem = Element.create('dd', 'resBody', '', dt.nextSibling.innerHTML);
	[header, elem].forEach(function (e) {
		container.appendChild(e);
	});

	return container;
};

bbs2chreader.prototype.entryCache = function (obj, res) {
	this.cache[res] = obj;
}

bbs2chreader.prototype.getCache = function (res) {
	return this.cache[res];
}

var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
var url = document.location.href.match(/http:\/\/[^.]+\.2ch\.net\/.*\//);
var b2r = new bbs2chreader();

/// === kai v0.1 === ///
w.b2rPopup.showPopup = function (event, content, klass, x, y) {
	var target = event.target;
	if (target._popupTimeout) {
		clearTimeout(target._popupTimeout);
	}

	target.__popupTimeout = setTimeout(
		w.b2rPopup._showPopupDelay,
		w.b2rPopup.POPUP_DELAY,
		x,
		y,
		content,
		klass
	);
}

w.b2rPopup.resPopup.mouseOver = function (event) {
	var target = event.target;
	var related = event.relatedTarget;
	var x = event.pageX;
	var y = event.pageY;

	if ((related && related.className == 'popup') ||
		(related.parentNode.className == 'popup' && !target._popupTimeout)) {
			return;
	}

	var start = 0;
	var end = 0;

	if (target.textContent.match(/>>?(\d{1,3})-(\d{1,3})/)) {
		start = Number(RegExp.$1);
		end = Number(RegExp.$2);
	} else if (target.textContent.match(/>>?(\d{1,3})/)) {
		start = Number(RegExp.$1);
	}

	var content = document.createDocumentFragment();

	if (start < end) {
		const POPUP_LIMIT = 20;
		end = end > 1000 ? 1000 : end;
		start = start < 1 ? 1 : end - start > POPUP_LIMIT ? end - POPUP_LIMIT :  start;

		/// XXX: to do...
		for (var i = start, flag = false; i <= end; ++i) {
			if (flag) {
				--i;
				continue;
			}

			res = document.getElementById('res' + i);
			if (!res) {
				flag = !flag;
				XMLHttpRequestASync('GET', url+i, function (res) {
					var doc = Element.create('html', '', '', res.responseText);
					var obj = w.b2r.tob2rObject(doc, url);
					content.appendChild(b2rPopup.resPopup.getCloneNode(obj));
					flag = !flag;
				},
				{
					onerror: function () {
						flag = !flag;
					}
				});
			} else {
				content.appendChild(w.b2rPopup.resPopup.getCloneNode(res));
			}
		}
	} else {
		var res = document.getElementById('res'+ start);
		if (!res) {
			res = b2r.getCache(start);
			if (!res) {
				XMLHttpRequestASync('GET', url+start, function (res) {
					var doc = Element.create('html', '', '', res.responseText);
					b2r.entryCache(b2r.tob2rObject(doc, url), start);
					content.appendChild(w.b2rPopup.resPopup.getCloneNode(b2r.getCache(start)));
					w.b2rPopup.showPopup(event, content, '', x, y);
				}, {
					overrideMimeType: 'text/html;charset=Shift_JIS'
				});
			} else {
				content.appendChild(w.b2rPopup.resPopup.getCloneNode(res));
				w.b2rPopup.showPopup(event, content, '', x, y);
			}
			return;
		} else {
			content.appendChild(w.b2rPopup.resPopup.getCloneNode(res));
		}
	}

	if (content.firstChild) {
		w.b2rPopup.showPopup(event, content, '', x, y);
	}
}
