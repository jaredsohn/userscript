// ==UserScript==
// @name         度娘彩字免费试用
// @namespace    http://jixun.org/
// @version      0.1.0.4
// @description  * 有 10 字限制
// @include      http://tieba.baidu.com/*
// @copyright    2013+, Jixun.Moe
// @run-at       document-end

/// MD5 Lib.
// @require      https://userscripts.org/scripts/source/185242.user.js

// ==/UserScript==

if (typeof unsafeWindow == 'undefined')
	var unsafeWindow = window;

// 初始化
var _ = unsafeWindow,
	$ = _.$;

function log (a) {
	console.log ('%c[度娘彩字(v0.1 Fix 4)]: %c%s', 'color:#999', 'color:blue', a);
}

function formatText(fId, contents) {
	fId++;
	var ret = '',
		charCode, dc;
	for (var i = 0; i < contents.length; i++) {
		charCode = contents.charCodeAt(i);
		if (charCode != 32 && charCode != 8203 && charCode != 65279) {
			dc = md5('baidu_dazz' + charCode.toString(16));
			ret += '<img class="BDE_Image" src="http://61.135.185.139///tb///fonts///104000' + fId + (fId == 1 ? Math.ceil(Math.random() * 8) : '')
            	+  '/' + dc.substr(0, 4) + dc.substr(-4)
				+  '.jpg" unselectable="on" pic_type="1" onload="EditorUI.resizeImage(this, 560)"/>';
		}
	}
	return ret;
}

function createOption(optList) {
	var $base = $('<select>'),
		$l = localStorage.lastColor || 0,
		$opt;
	optList.forEach(function (e, i) {
		$opt = $('<option>');
		$base.append((i == $l ? $opt.attr('selected', 'select') : 0), $opt.val(i).text(e));
	});
	return $base;
}

log ('等待网页加载...');
setTimeout(function () {
	var target = $('#ueditor_replace'),
		$opt = createOption('彩虹文字|田字体|贴吧喵喵|可爱字体|贴吧灯泡'.split('|'));
	$('.poster_signature').after($('<div>').append('彩字方案: ').append($opt));

	$('.poster_submit:first').after($('<a href="#" class="ui_btn_m ui_btn"><span>转换彩字</span></a>').click(function (e) {
		log ('开始转换');
		target.html(formatText(localStorage.lastColor = parseInt($opt.val()), target.text()));
		e.preventDefault();
		log ('转换完毕');
	}).css({
		marginLeft: 10
	}));

	log ('就绪.');
}, 3000);