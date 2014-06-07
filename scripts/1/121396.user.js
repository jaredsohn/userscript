// ==UserScript==
// @name           less image
// @namespace      http://userscripts.org/users/242503
// @description    replace all large images to text links and viewable while hover
// @include        http://*
// @include        https://*
// @exclude        http://gamemastertips.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://userscripts.org/scripts/source/45988.user.js
// @author         qip
// @version        0.3
// ==/UserScript==
// Changelog:
// 0.1 init release
// 0.2 show all imgs won't fire multiple mouse events to prevent NoScript's clearclick
// 0.2b typo
// 0.3 fix big, clean log

$.fn.hasAttr = function (name) {
	var attr = $(this).attr(name);
	return typeof attr !== 'undefined' && attr !== false;
};

var config = {
	init: function () {
		USP.theScriptName = 'Less Image';
		USP.init({
			theName: 'ENABLE',
			theText: 'Enable',
			theDefault: true
		}, {
			theName: 'REPLACE',
			theText: 'Replace (note Alt + I can toggle it temporarily, Alt + Shift + I can toggle it globally)',
			theDefault: true
		}, {
			theName: 'HOLDIMG',
			theText: 'Keep Image',
			theDefault: false
		}, {
			theName: 'maxX',
			theText: 'maxX:',
			theDefault: 250
		}, {
			theName: 'minX',
			theText: 'minX:',
			theDefault: 50
		}, {
			theName: 'maxY',
			theText: 'maxY:',
			theDefault: 150
		}, {
			theName: 'minY',
			theText: 'minY:',
			theDefault: 50
		});
		GM_registerMenuCommand(USP.theScriptName, USP.invoke);
	},
	maxX: GM_getValue('maxX') || 250,
	minX: GM_getValue('minX') || 50,
	maxY: GM_getValue('maxY') || 150,
	minY: GM_getValue('minY') || 50,
	ENABLE: GM_getValue('ENABLE') || true,
	REPLACE: GM_getValue('REPLACE') || true,
	HOLDIMG: GM_getValue('HOLDIMG') || false
};

var lessImg = {
	insertFinished: false,

	isLarge: function (img) {
		var xu = img.width > config.maxX,
			xl = img.width < config.minX,
			yu = img.height > config.maxY,
			yl = img.height < config.minY;
		if (xl || yl) return false;
		else if (xu || yu) return true;
		return false;
	},

	fullDecodeURI: function (src) {
		for (var i = 0; i < 4; i++) {
			if (src.indexOf('%') != -1) {
				try {
					src = decodeURIComponent(src);
				}
				catch (e) {
					break;
				}
			}
			else break;
		}
		return src;
	},

	bindView: function () {
		$(this).removeAttr('id');
		$(this).mouseover(function () {
			var $img = $(this).parent().next('img.replaced');
			lessImg.showImg($img);
			$img.removeClass('replaced');
			if (!config.HOLDIMG) $img.mouseout(lessImg.hideImgs);
		});
	},
	
	bindKey: function (e) {
		if (e.altKey && e.which == 73) { // <a-i>
			e.preventDefault();
			config.REPLACE = !config.REPLACE;
			if (e.shiftKey) GM_setValue('REPLACE', config.REPLACE);
			if (config.REPLACE) lessImg.hideImgs();
			else lessImg.showImgs();
		}
	},

	hideImg: function () {
		var $img = $(this);
		$img.addClass('replaced');
		if (lessImg.isLarge(this)) {
			var $p = $img.parent();
			if ($p.hasAttr('style')) $p.attr('styleb', $p.attr('style')).removeAttr('style');
			if ($img.hasAttr('style')) $img.attr('styleb', $img.attr('style'));
			$img.attr('style', 'display: none; height: 0px; width: 0px;');
			var alt = '';
			if (this.alt != '') alt = '<span class="replace-text"> (' + this.alt + ')</span>';
			var src = lessImg.fullDecodeURI(this.src);
			var tmp = src.split('/'),
				host = tmp[2],
				file = tmp[tmp.length - 1];
			src = '<span class="replace-filename">' + file + '</span><span class="replace-text">@</span><span class="replace-hostname">' + host + '</span>';
			var linka = '<a href="' + this.src + '"><span class="replace-imglink">[</span></a>',
				linkb = '<a href="' + this.src + '"><span class="replace-imglink">]</span></a>';
			$img.before('<div id="replace-alltext">' + linka + '<span id="replace-bindtext">' + src + alt + '</span>' + linkb + '</div>');
		}
	},

	showImg: function ($img) {
		var $p = $img.parent();
		if ($p.hasAttr('styleb')) $p.attr('style', $p.attr('styleb')).removeAttr('styleb');
		if ($img.hasAttr('styleb')) $img.attr('style', $img.attr('styleb')).removeAttr('styleb');
		else $img.removeAttr('style');
		$img.prev('div#replace-alltext').remove();
	},

	hideImgs: function () {
		if (config.REPLACE) $('img:not(.replaced)').each(lessImg.hideImg);
		$('span#replace-bindtext').each(lessImg.bindView);
	},

	showImgs: function () {
		$('div#replace-alltext>span').each(function () {lessImg.showImg($(this).parent().next('img.replaced'));});
	},

	addDOMWatch: function () {
		if (!lessImg.REPLACE) return;
		var that = lessImg;
		this.insertFinished = false;
		window.setTimeout(function () {
			if (!that.insertFinished) return;
			that.insertFinished = false;
			//console.log('inserted: ' + e.relatedNode.children[0].tagName + ', id: ' + e.relatedNode.children[0].id + ', class: ' + e.relatedNode.children[0].className);
			that.hideImgs();
		}, 120);
		window.setTimeout(function () {
			that.insertFinished = true;
		}, 100);
	},

	init: function () {
		lessImg.hideImgs();
		window.addEventListener('DOMNodeInserted', lessImg.addDOMWatch, false);
		$(document).keydown(lessImg.bindKey);
	}
}

if (config.ENABLE) window.addEventListener('load', lessImg.init, false);
config.init();

GM_addStyle('\
span#replace-alltext {display: block; background: #CEE5F5; padding: 0.5em; border: 1px solid #AACBE2;}\
span.replace-filename {color: #36C;}\
span.replace-hostname {color: #39C; font-family: monospace;}\
span.replace-text {color: #666;}\
span.replace-imglink {color: #333; font-weight: bold; padding: 0px 5px 0px 5px;}');