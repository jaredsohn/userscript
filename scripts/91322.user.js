// ==UserScript==
// @name            albertayu773 - direct link
// @namespace       http://d.hatena.ne.jp/Cherenkov/
// @include         http://albertayu773.pixnet.net/album/set/*
// @version         0.0.6
// @date            20110804
// ==/UserScript==

// http://userscripts.org/scripts/show/91322

// v0.0.6: テーマ変更に対応。chrome対応。chromeのpromptは文字数10200までに制限されたのでtextareaに出力するようにした。
// v0.0.5: テーマ変更に対応
// v0.0.4: テーマ変更に対応


function link(doc) {
	setTimeout(function() { 
		[].forEach.call(doc.querySelectorAll('.photo-grid-list .thumb'), function(e) {
			if (e.parentNode.title == '') {
				if (e.getAttribute('original')) {
					//適当なタイトル付加。元のhref+拡張子
					e.parentNode.title = /[^/]+$/.exec(e.parentNode.href)[0].replace(/#after=\d*/, '') + /(?:\.[^.]+)$/.exec(e.getAttribute('original'))[0];
				} else {
					e.parentNode.title = /[^/]+$/.exec(e.parentNode.href)[0].replace(/#after=\d*/, '') + /(?:\.[^.]+)$/.exec(e.src)[0];
				}
			}
			if (e.getAttribute('original')) {
				e.parentNode.href = e.getAttribute('original').replace(/_.\./, '.');
			} else {
				e.parentNode.href = e.src.replace(/_.\./, '.');
			}
			if (e.parentNode.parentNode.style.display == 'none') {
				e.parentNode.parentNode.style.display = 'block';
			}
			setRenameCode();
		});
	}, 500);
}

link(document);
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) { link(evt.target);}, false);

function setRenameCode() {
	var textarea = document.getElementById('__gm_rename_code');
	if (!textarea) {
		var textarea = document.createElement('textarea');
		textarea.id = '__gm_rename_code';
		textarea.title = '画像を保存したフォルダでirbを起動し,この文字列を実行するとファイル名が置換される';
		textarea.setAttribute('style', 'position:fixed; bottom:50px; right:10px; opacity:0.6; width:100px; height:50px');
		textarea.addEventListener('click', function() {
			this.select();
		},false);
		document.body.appendChild(textarea);		
	}
	var r = [];
	[].forEach.call(document.querySelectorAll('.photo-grid-list a.photolink'), function(e) {
		var ex = /([^/]+)$/.exec(e.href.trim())[1];
		var re = e.title;
		r.push([ex, re]);
	});
	var src = JSON.stringify(r) + '.each{|e|File.rename(e[0],e[1])if File.exist?e[0]}';
	textarea.value = src;
}
