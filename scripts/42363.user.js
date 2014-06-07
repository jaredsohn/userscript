// ==UserScript==
// @name        LDR with showing Item URL
// @namespace   http://d.hatena.ne.jp/Koumei_S/
// @include     http://reader.livedoor.com/reader/*
// @include     http://fastladder.com/reader/*
// @description shows Item URL on LDR and Fastladder
// @version     0.1
// ==/UserScript==

// based on http://d.hatena.ne.jp/tnx/20060716/1152998347
// based on http://tokyoenvious.xrea.jp/b/web/livedoor_reader_meets_hatebu.html

// based on http://la.ma.la/misc/userjs/ldr_with_livedoor_clip_count_images.user.js

(function(){
	const MAX_URL_LETTERS = 60;//表示するURLの最大文字数
	
	var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
	var description = "\u30ea\u30f3\u30af\u306e\u8868\u793a";
	w.entry_widgets.add('ldc_counter', function(feed, item){
		var link = item.link.replace(/#/g,'%23');
		var linkname = link;
		//URLの最大文字数を超える場合、省略する
		if(linkname.length >= MAX_URL_LETTERS) linkname = linkname.replace(/^((?:https?|ftp):\/\/[^\/]+\/).*(.{15})$/i , '$1' + '...' + '$2');
		//PDFを赤文字で表示
		linkname = linkname.replace(/(\.pdf)$/i , '<span style="color:#FF0000;font-weight:bold;">' + '$1' + '</span>');
		//ホストを太字で表示(Google Chrome風)
		linkname = linkname.replace(/^((?:https?|ftp):\/\/)([^\/]+)\//i, '$1' + '<span style="font-weight:900;">' + '$2' + '</span>/');
		return [
			'<a href="', link, '"><span style="color:#666666;">' , linkname , '</span></a>'
		].join('');
	}, description);
})();