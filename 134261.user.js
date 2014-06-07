// ==UserScript==
// @name           AutoDownloader JP
// @description    規約同意ページ等を飛ばしてファイルを自動ダウンロード (対応サイト: Firestorage, 宅ふぁいる便, FilePost, GigaFile便, おくりん坊, データ便)
// @author         mirka
// @include        http://firestorage.jp/download/*
// @include        http://firestorage.jp/index.cgi*
// @include        http://xfs.jp/*
// @include        https://www.filesend.to/filedn/*
// @include        http://*.gigafile.nu/?*
// @include        http://file-post.net/ja/fp*/d*
// @include        https://okurin.bitpark.co.jp/download.php?*
// @include        https://www.datadeliver.net/receiver/file_box.do?*
// @include        https://www.takufile.com/receive/*
// @namespace      http://jaguchi.com
// @version        1.1.5
// ==/UserScript==

(function() {
	var interval_msec = 1500; /* interval for downloading multiple files */
	
	// Utility: Download an array of href strings using a hidden iframe
	function downloadLinkArray(dl_link_arr) {
		var dl_iframe = document.createElement("iframe");
		var delay_msec = 0;
		
		dl_iframe.style.cssText = "display: none;";
		document.body.appendChild(dl_iframe);
		
		for (var i = 0; i < dl_link_arr.length;
			 	i++, delay_msec += interval_msec) {
			setTimeout(function (i) {
					dl_iframe.src = dl_link_arr[i];
				}, delay_msec, i);
		}
	}
	
	
	// Firestorage.jp
		// Redirect shortened urls (xfs.jp)
		function redirectXfs() {
			var dl_link_regex = /http:\/\/firestorage\.jp\/download\/.+/;

			for (var i = 0; i < document.links.length; i++) {
				if (document.links[i].href.match(dl_link_regex)) {
					window.location = document.links[i].href;
				}
			}
		}
		
	function dlFirestorage() {
		var dl_link = document.getElementById("downloadlink");
		
		if (dl_link) {
			window.location = dl_link.href;
			return;
		}
		
		for (var i = 0; i < document.links.length; i++) {
			if (document.links[i].textContent == "ダウンロードページを表示する") {
				window.location = document.links[i].href;
			}
		}
	}
	
	// 宅ふぁいる便
	function dlTakuFileBin() {
		var dl_btns;
		var dl_link_arr = [];
				
		if (window.location.pathname == "/filedn/infoindex.phtml") {
			document.forms.r_box.submit(); /* agree to terms */
		
		} else if (window.location.pathname == "/filedn/index.phtml") {
			// Make an array of all download urls
			dl_btns = document.getElementsByClassName("downloadBtn");
			for (var i = 0; i < dl_btns.length; i++) {
				if (dl_btns[i].tagName == "TD") {
					dl_link_arr.push(dl_btns[i].lastChild.href);
				}
			}
			downloadLinkArray(dl_link_arr);
		}
	}

	// 宅ふぁいる便ビジネスプラス
	function dlTakuFileBinPlus() {
		var doc_imgs;
		var dl_link_arr = [];

		if (window.location.pathname == "/receive/index.phtml") {
			document.forms.r_box.submit(); /* agree to terms */

		} else if (window.location.pathname == "/receive/download.phtml") {
			doc_imgs = document.images;
			for (var i = 0; i < doc_imgs.length; i++) {
				if (/btn_download.jpg/.test(doc_imgs[i].src)) {
					dl_link_arr.push(doc_imgs[i].parentNode.href);
				}
			}
			downloadLinkArray(dl_link_arr);
		}
	}
	
	// FilePost
	function dlFilePost() {
		var fs = document.forms;
		var delay_msec = 0;
		
		for (var i = 0; i < fs.length; i++) {
			if (fs[i].lastElementChild.alt == "ダウンロード") {
				setTimeout(function (i) { fs[i].submit(); }, delay_msec, i);
				delay_msec += interval_msec;
			}
		}
	}
	
	// GigaFile便
	function dlGigaFile() {
		window.location = "javascript:start_download();void(0)";
	}
	
	// おくりん坊
	function dlOkurin() {
		var fs = document.forms;
		var delay_msec = 0;

		for (var i = 0; i < fs.length; i++) {
			if (/form\d+/.test(fs[i].name)) {
				setTimeout(function (i) { fs[i].submit(); }, delay_msec, i);
				delay_msec += interval_msec;
			}
		}
	}
	
	// データ便
	function dlDataDeliver() {
		var dl_link_p_arr;
		var this_dl_link_a;
		var dl_link_arr = [];
		
		if (document.getElementsByClassName("kiyaku_bg")[0]) { /* terms page */
			document.getElementById("agree").checked = true;
			document.forms[0].submit();
		} else {
			// Make an array of all download urls
			dl_link_p_arr = document.getElementsByTagName("P");
			for (var i = 0; i < dl_link_p_arr.length; i++) {
				if (dl_link_p_arr[i].lastChild.nodeName = "A") {
					this_dl_link_a = dl_link_p_arr[i].lastChild;
					if (/\/receiver\/download\.do.+/.test(this_dl_link_a.href)) {
						dl_link_arr.push(this_dl_link_a.href);
					}
				}
			}
			downloadLinkArray(dl_link_arr);
		}
	}
	
	
	/* --- Detect site --- */
	if (/gigafile/.test(window.location.hostname)) { // GigaFile便
		dlGigaFile();
		
	} else {
		switch (window.location.hostname) {
			case "firestorage.jp": // Firestorage.jp
				dlFirestorage();
				break;
			case "xfs.jp": // Firestorage.jp (短縮URL)
				redirectXfs();
				break;
			case "www.filesend.to": // 宅ふぁいる便
				dlTakuFileBin();
				break;
			case "www.takufile.com": // 宅ふぁいる便ビジネスプラス
				dlTakuFileBinPlus();
				break;
			case "file-post.net": // FilePost
				dlFilePost();
				break;
			case "okurin.bitpark.co.jp": // おくりん坊
				dlOkurin();
				break;
			case "www.datadeliver.net": // データ便
				dlDataDeliver();
				break;
		}
	}

})();
