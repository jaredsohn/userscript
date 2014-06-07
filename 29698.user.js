// ==UserScript==
// @name           XiaoNei Enhancer
// @namespace      http://www.quchao.com/entry/xiaonei-enhancer
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    Adding some useful functions to XiaoNei.
// @include        http://xiaonei.com/*
// @include        http://*.xiaonei.com/*
// @exclude        http://gg.xiaonei.com/*
// @version        1.1.1
// ==/UserScript==
// ver 1.0 @ 2008-6-27
//  Initialize release
// ver 1.1 @ 2008-7-15
//  AD Blocker enhanced, Always-expanded-sidebar added.
// ver 1.1.1 @ 2008-9-16
//  AD Blocker enhanced, Always-expanded-sidebar removed.

/*-----------------------------------------------------------------------------
 * Configuration
 *-------------------------------------------------------------------------- */
// Whether to enable the auto-save function when composing a blog entry? [true or false] 
var AUTO_SAVE = false;

// Whether to block the advertisements? [true or false] 
var BLOCK_AD = true;

// Array of the author whose feed you wanna filter. One per line.
var BLACK_LIST = [
	'屈　超',
];


/*-----------------------------------------------------------------------------
 * gXiaoNei
 *-------------------------------------------------------------------------- */
var XiaoNei = window.XiaoNei || {};


/*-----------------------------------------------------------------------------
 * Disabling Auto-Save when composing (Due to some hotkey conflict on FF)
 *-------------------------------------------------------------------------- */
XiaoNei.AtSv = function () {
	var nwFn = function () {
			$('auto_save_msg').innerHTML = '&#33258;&#21160;&#20445;&#23384;&#39030;&#20010;&#29699;';
			$('auto_save_msg').style.display = '';
		};
	return {
		init: function () {
			if (false === AUTO_SAVE && $('auto_save_msg')) {
				location.href = ('javascript:void(window.autoSave = ' + nwFn + ');').replace(/%/g, '%25');
			}
		}
	};
}();


/*-----------------------------------------------------------------------------
 * AD Blocker
 *-------------------------------------------------------------------------- */
XiaoNei.Blkr = function () {
	return {
		init: function () {
			if (true === BLOCK_AD) {
				$X('//iframe[starts-with(@src, "http://gg.xiaonei")]').forEach(function (node) {
					node.parentNode.removeChild(node);
				});
				$X('id("feedHome")/div[@class="opi opi-flyer"]').forEach(function (node) {
					node.style.display = 'none';
				});
				$X('//div[@class="blank-bar"]').forEach(function (node) {
					node.style.display = 'none';
				});
				$AD(['banner']);
			}
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Feed Filter
 *-------------------------------------------------------------------------- */
XiaoNei.Fltr = function () {
	return {
		init: function () {
			if ('object' === typeof BLACK_LIST && BLACK_LIST.length && $('feedHome')) {
				for (uid in BLACK_LIST) {
					$X('id("feedHome")/div[descendant::a[contains(text(), "' + BLACK_LIST[uid] + '")]]').forEach(function (node) {
						node.style.display = 'none';
					});
				}
			}
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Initialization
 *-------------------------------------------------------------------------- */
(function () {
	XiaoNei.AtSv.init();
	XiaoNei.Blkr.init();
	XiaoNei.Fltr.init();
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