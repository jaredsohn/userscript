// ==UserScript==
// @name grexporter
// @author ttph1oc
// @grant none
// @description 导出所有 Google Reader 中的文章
// @version 1.2
// @namespace grexporter
// @updateURL https://userscripts.org/scripts/source/170731.meta.js
// @downloadURL https://userscripts.org/scripts/source/170731.user.js
// @include	https://www.google.com/reader*
// @include	http://www.google.com/reader*
// ==/UserScript==
;(onload = function() {
	document.getElementById('logo-section').innerHTML = ' <span id="grexporter" style="cursor:pointer;font-weight:bold;">导出所有文章</span>';
	document.getElementById('grexporter').onclick = function() {
		var txt = '<style>html,body{overflow:auto;}</style>';
		var links = document.getElementsByClassName('link');
		for (var i = links.length - 1; i >= 0; i--) {
			var link = links[i];
			var href = link.href;
			if (href && href.indexOf('reader/view/feed') > -1) {
				var export_href = location.protocol + '//www.google.com/reader/api/0/stream/contents/feed/' + href.replace(location.protocol + '//www.google.com/reader/view/feed/', '') + '?n=99999999';
				var new_txt = '<a href=' + export_href + '>下载 ' + link.childNodes[1].innerHTML + ' 中的文章</a>';
				new_txt = '<p>' + new_txt + '</p>';
				txt += new_txt;
			}
		};
		document.body.innerHTML = txt;
	};
})();