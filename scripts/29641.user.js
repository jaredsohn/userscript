// ==UserScript==
// @name           TianYa Helper Lite
// @namespace      http://www.quchao.com/entry/tianya-helper-lite
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    Show the author's posts only or highlight them at TianYa.cn [Lite Version]
// @include        http://*.tianya.cn/*
// @include        http://*.otianya.cn/*
// @version        1.0
// ==/UserScript==
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
// ver 1.0 @ 2008-7-5
//  Initialize release


/*-----------------------------------------------------------------------------
 * Configuration
 *-------------------------------------------------------------------------- */
// Whether to show the floating bar by default? [1 or -1] 
var SHOW_CTRLR = GM_getValue('TianYaLiteCtrlr') || 1;

// Whether to block the advertisements? [true or false] 
var BLOCK_AD = true;


/*-----------------------------------------------------------------------------
 * gTianya
 *-------------------------------------------------------------------------- */
var Tianya = window.Tianya || {};


/*-----------------------------------------------------------------------------
 * Tianya AD Blocker
 *-------------------------------------------------------------------------- */
Tianya.Blkr = function () {
	return {
		init: function () {
			if (true === BLOCK_AD) {
				if (Tianya.Hlpr.code()) {
					$X('//table[descendant::td[@id="__ty_vip_from_td"]]')[0].style.display = 'none';
					$X('//table[@width="644"]')[0].style.display = 'none';
				} else {
					$AD(['firstbanner', 'firstwordad', 'tianyaSense1', 'responsebanner', 'responsewordad', 'responserightad']);
				}
			}
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Tianya Helper Lite
 *-------------------------------------------------------------------------- */
Tianya.Hlpr = function () {
	var code = 0, //0: Original; 1: Filter; -1: Highlight.
		purl, chkF, chkH;
	return {
		init: function () {
			var url = window.location;
			chkF = $('chkFltrLite');
			chkH = $('chkHiltLite');
			chkF.addEventListener('click', function () {
				Tianya.Hlpr.swch(1);
			}, false);
			chkH.addEventListener('click', function () {
				Tianya.Hlpr.swch();
			}, false);
			if (true === Tianya.Ctrlr.done() && -1 !== url.hostname.indexOf('otianya')) {
				purl = (url.search.match(/url=([^&]*)/))[1];
				if (-1 !== url.search.indexOf('type=2')) {
					code = -1;
					chkH.checked = true;
				} else {
					code = 1;
					chkF.checked = true;
				}
			} else {
				purl = url.href;
			}
			GM_registerMenuCommand('天涯助手 Lite - 只看楼主/恢复', function () {
				Tianya.Hlpr.swch(1);
			});
			GM_registerMenuCommand('天涯助手 Lite - 高亮楼主/恢复', function () {
				Tianya.Hlpr.swch();
			});
		},
		code: function () {
			return code;
		},
		swch: function () {
			var type = (arguments.length) ? 1 : -1;
			var loc = (type === code) ? purl : 'http://otianya.cn/tianya.php?type=' + ((-1 === type) ? 2 : 1) + '&url=' + purl;
			if (type * -1 === code) {
				var chk = (1 === type) ? chkF : chkH;
				chk.checked = false;
			}
			code = type;
			window.location = loc;
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Tianya Control Bar
 *-------------------------------------------------------------------------- */
Tianya.Ctrlr = function () {
	var vsbl = parseInt(SHOW_CTRLR),
		done = false;
	return {
		done: false,
		init: function () {
			if (false === done) {
				document.body.appendChild($N('div', {id: 'divCtrlrLite', style:'color:#000000;font-family:"Microsoft Yahei", Verdana;font-weight:bold;font-size:12px;margin:0;padding:0.2em;border:0;position:fixed;right:1px;bottom:22px;z-index:999998;line-height:1.2em;visibility:hidden;'}, '<input type="checkbox" id="chkFltrLite" /><label for="chkFltrLite">&#21482;&#30475;&#27004;&#20027;</label><br /><input type="checkbox" id="chkHiltLite" /><label for="chkHiltLite">&#39640;&#20142;&#27004;&#20027;</a>'));
				if (1 === vsbl) {
					$('divCtrlrLite').style.visibility = 'visible';
				}
				GM_registerMenuCommand('天涯助手 Lite - 隐藏浮栏/恢复', function () {
					Tianya.Ctrlr.swch();
				});
				done = true;
			} else {
				alert('Initialized already!');
			}
		},
		done: function () {
			return done;
		},
		swch: function () {
			if (true === done) {
				$('divCtrlrLite').style.visibility = (1 === vsbl) ? 'hidden' : 'visible';
				vsbl *= -1;
				GM_setValue('TianYaLiteCtrlr', vsbl);
			} else {
				alert('Initialization Failed!');
			}
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Initialization
 *-------------------------------------------------------------------------- */
(function () {
	if ($('__ty_vip_message_div_1')) {
		Tianya.Ctrlr.init();
		Tianya.Hlpr.init();
		Tianya.Blkr.init();
	}
})();


/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */
function $(id) {
	return document.getElementById(id);
}

function $AD(arr) {
	if (arr.length) {
		for (var i in arr) {
			var tmpObj = $(arr[i]);
			if (tmpObj) {
				tmpObj.style.display = 'none';
			}
		}
	}
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