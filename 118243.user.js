// ==UserScript==
// @name           smoozeFlickr
// @version        1.0.3
// @namespace      http://userscripts.org/scripts/show/118243
// @description    俺が使いやすいように色々カスタマイズゥズゥ！(Google Chrome only)
// @include        http://www.flickr.com/photos/*
// @run-at         document-end
// ==/UserScript==
( function(){

	var modFunc = function () {

		if (location.pathname.match(/\/photos\/\w+\/\d+\/in\/set-\d+\/lightbox\//)) {

			//==========================//
			// 不要な部品は非表示にする //
			//==========================//
			var targetIDs = [
				'lightbox-nav',		// 画面上部のナビゲーション
			];
			for (var i = 0; i < targetIDs.length; i++){
//				GM_addStyle('#' + targetIDs[i] + ' { display: none !important }');
				GM_addStyle('#' + targetIDs[i] + ' { position: absolute; top: 3em; }');

				var node = document.getElementById(targetIDs[i]);
				if (node != null) {
					node.style.position = 'absolute';
					node.style.top = '3em';

//					node.style.display = 'none !important';
//					//node.parentNode.removeChild(node);
				}
			}

			//============================//
			// イメージをフルスクリーン化 //
			//============================//
			GM_addStyle('#lightbox .bd li.position .img-wrap { top: 5px !important; }');
			GM_addStyle('.img-wrap { margin-top: 0px !important; }');
			GM_addStyle('.img-wrap { height: 100% !important; }');
			GM_addStyle('.img-wrap { width: auto !important; }');
			GM_addStyle('#lightbox .bd li.position .img-wrap img, #lightbox .bd li.position .img-wrap .lightbox-video { width: auto !important; }');

			//====================================================//
			// マウスホイールでページ移動ができるようイベント追加 //
			//====================================================//
			var html = '';
			html += "// マウスホイールイベントを追加(chrome/safari専用)\n";
			html += "document.addEventListener('mousewheel', function(event){\n";
			html += "	var delta = -1 * event.wheelDelta / 120;\n";
			html += "	if (delta < 0) {\n";
			html += "		YUI().use('event-simulate', function(Y) {\n";
			html += "			Y.Event.simulate(document.body, 'keydown', { keyCode: 37, ctrlKey: false });\n";
			html += "			Y.Event.simulate(document.body, 'keyup',   { keyCode: 37, ctrlKey: false });\n";
			html += "		});\n";
			html += "	} else {\n";
			html += "		YUI().use('event-simulate', function(Y) {\n";
			html += "			Y.Event.simulate(document.body, 'keydown', { keyCode: 39, ctrlKey: false });\n";
			html += "			Y.Event.simulate(document.body, 'keyup',   { keyCode: 39, ctrlKey: false });\n";
			html += "		});\n";
			html += "	}\n";
			html += "	if (event.preventDefault) event.preventDefault();\n";
			html += "	event.returnvalue = false;\n";
			html += "}, false);\n";
			//---------------------------------------//
			// 事前に読み込む画像を2枚→20枚に増やす //
			//---------------------------------------//
			html += "function dummyFn(arg) {\n";
			//node_prune_threshold       : 50
			//node_prune_amount          : 10
			//position_preload_limit     : 10
			//position_preload_threshold : 5
			//image_preload_limit        : 2,
			html += "	arg.config.flickr.lightbox.node_prune_amount = 30;\n";			// 10 => 30 (x 3)
			html += "	arg.config.flickr.lightbox.image_preload_limit = 20;\n";		//  2 => 20 (x10)
			html += "	arg.config.flickr.lightbox.position_preload_limit = 50;\n";		// 10 => 50 (x 5)
			html += "	arg.config.flickr.lightbox.position_preload_threshold = 50;\n";	// 10 => 50 (x 5)
//			html += "	arg.config.flickr.lightbox.image_preload_limit = 10;\n";
			html += "}\n";
			html += "function combine_funcs(old_func, new_func) { return function (arg) { new_func(arg); old_func(arg); }; }\n";
			html += "document.addEventListener('load', function(event) {\n";
			html += "	if (YUI.Env.mods.lightbox && !YUI.Env.mods.lightbox.is_dummy_func) {\n";
			html += "		YUI.Env.mods.lightbox.fn = combine_funcs(YUI.Env.mods.lightbox.fn, dummyFn);\n";
			html += "		YUI.Env.mods.lightbox.is_dummy_func = true;\n";
			html += "	}\n";
			html += "}, true);\n";

			var s = document.createElement('script');
			s.innerHTML = html;
			document.body.appendChild(s);

		} else if (location.pathname.match(/\/photos\/(\w+)\/sets\/(\d+)\//)) {

			//====================================================//
			// Sets画面から直接lightboxへ遷移するリンクを作成する //
			//====================================================//
			var user_string = RegExp.$1;
			var sets_id = RegExp.$2;

			var img = document.getElementById('primary_photo_img');
			if (!img.getAttribute('src').match(/\/(\d+)_/)) {
				return;
			}
			var primary_photo_id = RegExp.$1;
			var url = 'http://www.flickr.com/photos/' + user_string + '/' + primary_photo_id + '/in/set-' + sets_id + '/lightbox/';

			var div = document.createElement('div');
			div.setAttribute('style', 'text-align:center;font-size:2em;color:red;margin-top:1em;');
			div.innerHTML = '[GALLERY]';
			div.addEventListener('click', function(event) {
				location.href = url;
			}, true);

			img.parentNode.parentNode.appendChild(div);

		} else if (location.pathname.match(/\/photos\/(\w+)\/sets\//)) {

			//==========================================================//
			// Sets一覧画面から、直接lightboxへ遷移するリンクを作成する //
			//==========================================================//

			var icon_data = 'data:image/gif;base64,'+
				'R0lGODlhDwAQAIIAAEpKSpHB1////1mUrLa2tgAAAAAAAAAAACH5BAEAAAIALAAAAAAPABAAAAhP'+
				'AAEIHEiwIAACCBMqTCiQgMGCDg8CGECxYkWJEgcEsHgxokOOFjF+BElR5ESSA0yiTOnxIUGPC2NG'+
				'dGlQgM2bEm/qpEnQ5kGZDH3yFCggIAA7';

			var elements = document.getElementsByClassName('Sets');
			for (var i = 0; i < elements.length; i++) {

				if (elements[i].getElementsByClassName('fullscreen_icon').length > 0) {
					//既にアイコン追加済みの場合は何もしない
					continue;
				}

				var href = elements[i].getElementsByClassName('setLink')[0].getAttribute('href');
				var src = elements[i].getElementsByClassName('setThumb')[0].getAttribute('src');

				// lightboxのURLを生成
				var user_string = '';
				var sets_id = '';
				if (href.match(/\/photos\/(\w+)\/sets\/(\d+)\//)) {
					user_string = RegExp.$1;
					sets_id = RegExp.$2;
				}

				var primary_photo_id = '';
				if (src.match(/\/(\d+)_/)) {
					primary_photo_id = RegExp.$1;
				}
				var url = 'http://www.flickr.com/photos/' + user_string + '/' + primary_photo_id + '/in/set-' + sets_id + '/lightbox/';

				// アイコンの挿入位置を検出
				var h4 = elements[i].getElementsByTagName('h4')[0];

				var anchor = document.createElement('a');
				anchor.setAttribute('target', '_blank');
				anchor.setAttribute('href', url);
				h4.insertBefore(anchor, h4.lastChild);

				var img = document.createElement('img');
				img.setAttribute('class', 'fullscreen_icon');
				img.src = icon_data;
				img.setAttribute('style', 'margin-right:3px; border:0px;');
				anchor.appendChild(img);
			}

		} else if (location.pathname.match(/\/photos\/(\w+)\/collections\//)) {

			//============================================================//
			// Collection画面から、直接lightboxへ遷移するリンクを作成する //
			//============================================================//

			var icon_data = 'data:image/gif;base64,'+
				'R0lGODlhDwAQAIIAAEpKSpHB1////1mUrLa2tgAAAAAAAAAAACH5BAEAAAIALAAAAAAPABAAAAhP'+
				'AAEIHEiwIAACCBMqTCiQgMGCDg8CGECxYkWJEgcEsHgxokOOFjF+BElR5ESSA0yiTOnxIUGPC2NG'+
				'dGlQgM2bEm/qpEnQ5kGZDH3yFCggIAA7';

			var elements = document.getElementsByClassName('Sets');
			for (var i = 0; i < elements.length; i++) {

				if (elements[i].getElementsByClassName('fullscreen_icon').length > 0) {
					//既にアイコン追加済みの場合は何もしない
					continue;
				}

				var href = elements[i].getElementsByClassName('setLink')[0].getAttribute('href');
				var src = elements[i].getElementsByClassName('setThumb')[0].getAttribute('src');

				// lightboxのURLを生成
				var user_string = '';
				var sets_id = '';
				if (href.match(/\/photos\/(\w+)\/sets\/(\d+)\//)) {
					user_string = RegExp.$1;
					sets_id = RegExp.$2;
				}

				var primary_photo_id = '';
				if (src.match(/\/(\d+)_/)) {
					primary_photo_id = RegExp.$1;
				}
				var url = 'http://www.flickr.com/photos/' + user_string + '/' + primary_photo_id + '/in/set-' + sets_id + '/lightbox/';

				// アイコンの挿入位置を検出
				var h4 = elements[i].getElementsByTagName('h4')[0];

				var anchor = document.createElement('a');
				anchor.setAttribute('target', '_blank');
				anchor.setAttribute('href', url);
				h4.insertBefore(anchor, h4.lastChild);

				var img = document.createElement('img');
				img.setAttribute('class', 'fullscreen_icon');
				img.src = icon_data;
				img.setAttribute('style', 'margin-right:3px; border:0px;');
				anchor.appendChild(img);
			}
		}
	};

	// document-endタイミングで置き換え実行
	modFunc();

	// [Chrome Extension] AutoPatchWork(https://chrome.google.com/extensions/detail/aeolcjbaammbkgaiagooljfdepnjmkfd)を使って
	// 次ページを自動読込した場合も置き換え実行
	addEventListener('AutoPatchWork.pageloaded', function() {
		modFunc();
	}, false);

	// [Chrome/FireFox/Safari Extension] AutoPagerize(http://autopagerize.net/)を使って
	// 次ページを自動読込した場合も置き換え実行
	addEventListener('GM_AutoPagerizeNextPageLoaded', function() {
		modFunc();
	}, false);

}) ();
