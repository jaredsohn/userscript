// ==UserScript==
// @name			Inspic-BUG fix
// @namespace		http://userscripts.org/users/302257
// @description		修正inspic中的錯誤(原因是使用了Firefox不支援的outerHTML，導致無法正確載入JS及CSS檔案)
// @include			http://inspic.com/*
// @include			http://www.inspic.com/*
// @author         SoIN
// @run-at			document-start
// @version        1.0.20111130
// ==/UserScript==


function funcionPrincipal_Load(e){
		var host = 'file:' == document.location.protocol ? '../' : 'http://pic.inspic.com/';

		function LoadJavascript(fileName) {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("script");
					node.type = "text/javascript";
					node.src = host + fileName;
				heads[0].appendChild(node); 
			}
		}

		function LoadStyleSheet(fileName) {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("link");
					node.rel = 'stylesheet';
					node.type = "text/css";
					node.href = host + fileName;
				heads[0].appendChild(node); 
			}
		}

		LoadStyleSheet('css/pic.css');
		LoadJavascript('js/jquery.min.js');
		LoadJavascript('js/pic.js');
};

window.addEventListener('DOMContentLoaded', funcionPrincipal_Load, false);
