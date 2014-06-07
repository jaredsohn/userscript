// ==UserScript==
// @name           TianYa Helper
// @namespace      http://www.quchao.com/entry/tianya-helper
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    Show the author's posts only or highlight them at TianYa.cn
// @include        http://cache.tianya.cn/publicforum/content/*
// @include        http://cache.tianya.cn/techforum/content/*
// @include        http://*.tianya.cn/new/publicforum/Content.asp?idWriter=*
// @include        http://*.tianya.cn/new/techforum/Content.asp?idWriter=*
// @version        1.3
// ==/UserScript==
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
// Appreciate to
//  ofk (http://userscripts.org/scripts/show/7623)
// ver 1.0 @ 2008-4-15
//  Initialize release
// ver 1.1 @ 2008-4-16
//  FF2 platform supported with bugfixes
// ver 1.2 @ 2008-4-17
//  Floating Bar added with some bugfixes
// ver 1.3 @ 2008-4-17
//  Fixed the bug of fetching the author's name in techforum
//  Stripped consecutive <br>s.



/*-----------------------------------------------------------------------------
 * Configuration
 *-------------------------------------------------------------------------- */
// Auto show author's only? [true or false] 
var AUTO_ENABLE = false;

// Auto highlight author's? [true or false] 
var AUTO_HIGHLIGHT = false;

// Disable the hotkeys? [true or false] (Note: Ctrl-Y to hide/show; Alt-Y to highlight/restore)
var DISABLE_HOTKEY = false;

// Hightlight style, Sample: font-weight:bold!important;border:1px solid red;
var HIGHLIGHT_STYLE = '';

// Normal style, Sample: font-weight:normal!important;border:0;
var NORMAL_STYLE = '';


/*-----------------------------------------------------------------------------
 * TianyaAuthor
 *-------------------------------------------------------------------------- */
var TianyaAuthor = function () {
	this.name = '';
	this.init();
}

TianyaAuthor.prototype = {
	getValue: function(key) {
		return decodeURI(GM_getValue(key));
	},
	setValue: function(key, value) {
		return GM_setValue(key, encodeURI(value));
	},
	getTitle: function() {
		if (typeof this.getValue('TianYaTitle') == 'undefined') {
			this.setValue('TianYaTitle', document.title);
		}
		return this.getValue('TianYaTitle');
	},
	getAuthor: function() {
		multi = $X('//a[text() = "首页"]')[0];
		if (multi) {
			self = this;
			addr = (location.href.indexOf('publicforum') == -1) ? location.href : multi.href;
			GM_xmlhttpRequest({
				method: 'GET',
				url: addr,
				overrideMimeType: 'text/html; charset=' + document.characterSet,
				onload: function (req) {
					if (req.status == 200) {
						self.setValue('TianYaAuthor', $X('//a[contains(@href, "vwriter")][1]', parseHTML(req.responseText))[0].textContent);
						self.name = self.getValue('TianYaAuthor');
						TianYa.process(self.name);
					}
				},
				onerror: function (req) {
					alert(req.statusText);
				}
			});
		} else {
			this.setValue('TianYaAuthor', $X('//a[contains(@href, "vwriter")][1]')[0].textContent);
			this.name = this.getValue('TianYaAuthor');
		}
	},
	init: function() {
		if (document.title != this.getTitle() || typeof this.getValue('TianYaAuthor') == 'undefined') {
			this.setValue('TianYaTitle', document.title);
			this.getAuthor();
		} else {
			this.name = this.getValue('TianYaAuthor');
		}
	}
}


/*-----------------------------------------------------------------------------
 * TianyaFilter
 *-------------------------------------------------------------------------- */
var TianyaFilter = function () {
	this.floatbar = new FloatBar();
	this.running = false;
	this.hidden = -1;
	this.highlighted = -1;
	this.rebuilt = false;
	this.highlightStyle = HIGHLIGHT_STYLE || 'font-weight:bold!important;border:1px solid red;';
	this.normalStyle = NORMAL_STYLE || 'font-weight:normal!important;border:0;';
}

TianyaFilter.prototype = {
	show: function() {
		GM_addStyle('.TianYaOthers {display:block!important;}');
		this.hidden *= -1;
		$('displayBox').checked = false;
	},
	hide: function() {
		GM_addStyle('.TianYaOthers {display:none!important;}');
		this.hidden *= -1;
		$('displayBox').checked = true;
	},
	highlight: function() {
		GM_addStyle('.TianYaAuthor {' + this.highlightStyle + '}');
		this.highlighted *= -1;
		$('highlightBox').checked = true;
	},
	restore: function() {
		GM_addStyle('.TianYaAuthor {' + this.normalStyle + '}');
		this.highlighted *= -1;
		$('highlightBox').checked = false;
	},
	process: function(author) {
		if (author) {
			newHTML = $X('id("pContentDiv")')[0].innerHTML.replace(/<div class="content" style="">/g, '');
			newHTML = newHTML.replace(/<table( width="100%")? bgcolor="#f5f9fa" border="0" cellspacing="0"( width="100%")?>/g, '</div><div class="content"><table bgcolor="#f5f9fa" border="0" cellspacing="0" width="100%">');
			newHTML = newHTML.replace(/(<br>)?<table( width="100%")? align="center" border="0" cellspacing="0"( width="100%")?>/g, '<div class="content"><table align="center" border="0" bgcolor="#f5f9fa" cellspacing="0" width="100%">');
			$X('id("pContentDiv")')[0].innerHTML = newHTML;
			$X('id("pContentDiv")/div[@class="content"][descendant::a[text() = "' + author + '"]]').forEach(function (node) {
				node.className = 'TianYaAuthor ' + node.className;
			});
			$X('id("pContentDiv")/div[@class="content"][descendant::a[not(text() = "' + author + '")]]').forEach(function (node) {
				node.className = 'TianYaOthers ' + node.className;
			});
			this.rebuilt = true;
		}
	},
	init: function() {
		if (this.running) {
			alert('正在处理中……');
		} else {
			author = new TianyaAuthor();
			this.running = true;
			this.process(author.name);
		}
	}
}


/*-----------------------------------------------------------------------------
 * FloatBar
 *-------------------------------------------------------------------------- */
var FloatBar = function () {
	this.hidden = 1;
	bar = $N('div', {style:'color:#000000;font-family:"Microsoft Yahei", Verdana;font-weight:bold;font-size:12px;margin:0;padding:0.2em;border:0;position:fixed;right:1px;bottom:22px;z-index:999998;visibility:hidden;line-height:1.2em;'}, '<input type="checkbox" id="displayBox" /><label for="displayBox" title="只看楼主">过滤</label><br /><input type="checkbox" id="highlightBox" /><label for="highlightBox" title="高亮楼主">高亮</a>');
	document.body.appendChild(bar);
	this.element = bar;
	this.init();
};

FloatBar.prototype = {
	show: function () {
		this.hidden *= -1;
		bar = this.element;
		bar.style.visibility = 'visible';
	},
	hide: function () {
		this.hidden *= -1;
		bar.style.visibility = 'hidden';
	},
	init: function () {
		$('displayBox').addEventListener('click', function() {
			displayHandle();
		}, false);
		$('highlightBox').addEventListener('click', function() {
			highlightHandle();
		}, false);
		this.show();
	}
};


/*-----------------------------------------------------------------------------
 * Initialization
 *-------------------------------------------------------------------------- */
if (typeof TianYa == 'undefined') {
	var TianYa = new TianyaFilter();
	if (AUTO_ENABLE) {
		init();
		TianYa.hide();
	}
	if (AUTO_HIGHLIGHT) {
		init();
		TianYa.highlight();
	}
	if (!DISABLE_HOTKEY) {
		document.addEventListener('keydown', hotkeyHandle, false); 
	}

	GM_registerMenuCommand('天涯助手 - 只看楼主/恢复', displayHandle);
	GM_registerMenuCommand('天涯助手 - 高亮楼主/恢复', highlightHandle);
	GM_registerMenuCommand('天涯助手 - 隐藏浮栏/恢复', floatbarHandle);
}


/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */
function hotkeyHandle(event) {
	// Ctrl-T
	if (event.ctrlKey && event.keyCode == '89') {
		displayHandle();
	}
	// Alt-Y
	if (event.altKey && event.keyCode == '89') {
		highlightHandle();
	}
}

function floatbarHandle() {
	if (TianYa.floatbar.hidden == 1) {
		TianYa.floatbar.show();
	} else {
		TianYa.floatbar.hide();
	}
}

function displayHandle() {
	init();
	if (TianYa.hidden == 1) {
		TianYa.show();
	} else {
		TianYa.hide();
		if (TianYa.highlighted == 1) {
			TianYa.restore();
		}
	}
}

function highlightHandle() {
	init();
	if (TianYa.highlighted == 1) {
		TianYa.restore();
	} else {
		TianYa.highlight();
		if (TianYa.hidden == 1) {
			TianYa.show();
		}
	}
}

function init() {
	if (!TianYa.rebuilt) {
		TianYa.init();
	} else {
		return false;
	}
}

function $(id) {
	return document.getElementById(id);
}

function debug(msg) {
	var textarea = $N('textarea', {}), body = document.body;
	textarea.value = msg;
	body.insertBefore(textarea, body.firstChild);
}

function $N(name, attr, childs) {
	var result = document.createElement(name);
	for (var i in attr) {
		result.setAttribute(i, attr[i]);
	}
	if (childs) {
		if (typeof childs == 'string') {
			result.innerHTML = childs;
		}
		else {
			for (var i = 0, j = childs.length; i < j; ++i) {
				var child = childs[i];
				result.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
			}
		}
	}
	return result;
}

function $X(exp, context) {
	context = context || document;
	doc = context.ownerDocument || context;
	exp = doc.createExpression(exp, function (prefix) {
		return document.createNSResolver(doc).lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
	});
	result = exp.evaluate(context, 7, null);
	res = [];
	resLen = result.snapshotLength;
	for (i = 0, j = resLen; i < j; ++i) {
		res[res.length] = result.snapshotItem(i);
	}
	return res;
}

function parseHTML(str) {
	res = document.implementation.createDocument(null, 'html', null)
	range = document.createRange();
	range.setStartAfter(document.body);
	res.documentElement.appendChild(
		res.importNode(range.createContextualFragment(
			str.replace(/^([\n\r]|.)*?<html([\n\r]|.)*?>|<\/html([\n\r]|.)*?>([\n\r]|.)*$/ig, '')
		), true)
	);
	return res;
}