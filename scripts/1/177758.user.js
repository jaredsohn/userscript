// ==UserScript==
// @name        Xunlei Kuaichuan Display Full Filename
// @namespace   qixinglu.com
// @description 迅雷快传上的下载链接显完整文件名
// @grant       none
// @include     http://kuai.xunlei.com/d/*
// @include     http://kuai.xunlei.com/s/*
// ==/UserScript==

function proxy(callback) {
	var script = document.createElement('script');
	script.textContent = 'try{(' + callback.toString() + ')();}catch(e){}';
	document.body.appendChild(script);
};
proxy(function () {

	var addStyle = function (cssText) {
		var head = document.querySelector('head');
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.textContent = cssText;
		head.appendChild(style);
	};

	var fullName = function () {
		// 从 title 标签复制完整文件名
		var nodes = document.querySelectorAll('.c_2 a.file_name');
		var i, node;
		for (i = 0; i < nodes.length; i += 1) {
			node = nodes[i];
			node.textContent = node.title;
		}
	};

	var swapSizePriviewInfo = function () {
		// 交换「文件大小」和「云预览」信息位置
		var nodes = document.querySelectorAll('.c4');
		var i, node;
		for (i = 0; i < nodes.length; i += 1) {
			node = nodes[i];
			if (node.classList.length === 1) {
				node.parentNode.appendChild(node);
			}
		}
	};

	var filesCSS = '.adv_area, .file_right, .advl, .hot_list {' + '    display: none !important;' + '}' + '.file_left, .file_src, .file_src li {' + '    width: 100% !important;' + '    height: 100% !important;' + '}' + '.c_2, .c_2 a{' + '    width: auto !important;' + '}' + '.c4.status {' + '    width: 100px !important;' + '}' + '.c4 {' + '    float: right !important;' + '}' + 'a.general_btn, a.high_btn' + '{' + 'display: none; ' + '}' + '.download_w_new' + '{' + 'position:fixed !important;z-index: 99999 !important;top: 80px !important;' + '}';


	var folderCSS = '.file_left, .downLoad_area {' + '    width: 100% !important;' + '}' + '.file_w, .file_list {' + '    height: 100% !important;' + '}';



	if (location.href.indexOf('http://kuai.xunlei.com/s/') === 0) {
		addStyle(folderCSS);
	} else {
		var injectStyle = function (cssstr) {
			var s = document.createElement("style");
			//s.id = "verglas_css";
			s.type = "text/css";
			s.textContent = cssstr;
			document.head.appendChild(s);
		};
		var cssstring = "#listdownlinks1{width: 100%; height: auto; border: 1px solid #333; padding: 4px; overflow: hidden; outline: none; resize: none; z-index:16777271;}";
		injectStyle(cssstring);
		var resize = function () {
			this.style.height = "auto";
			this.style.height = this.scrollHeight + this.offsetHeight - this.clientHeight + "px";
			setTimeout(function () {
				jQuery('#listdownlinks1, #listdownlinks2, #listdownlinks3').css('height', '40px');
			}, 5000);
		};
		var events = "oninput" in window ? "input click" : "keyup keydown click";
		jQuery('#listdownlinks1, #listdownlinks2, #listdownlinks3').select().live(events, resize);
		jQuery('#listdownlinks1, #listdownlinks2, #listdownlinks3').live('focusout', function () {
			jQuery(this).css('height', '40px');
		});


		var urls = '';
		jQuery('a.file_name').each(function () {
			var _selft = jQuery(this);
			_selft.html(_selft.attr('title'));
			if (_selft.parent().prev('.c_1').find('input').length) {
				urls += _selft.attr('href') + '\n';
			}
		});

		if (urls) {
			jQuery('<textarea id="listdownlinks1">' + urls + '</textarea>').prependTo('body');
		};


		addStyle(filesCSS);
		fullName();
		swapSizePriviewInfo();
	}

});