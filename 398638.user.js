// ==UserScript==
// @name	jfb
// @namespace	http://userscripts.org/scripts/show/398638
// @updateURL	https://userscripts.org/scripts/source/398638.meta.js
// @downloadURL	https://userscripts.org/scripts/source/398638.user.js
// @require     http://code.jquery.com/jquery-1.8.3.js
// @encoding	utf-8
// @match       https://*/*
// @grant       GM_xmlhttpRequest
// @run-at	document-end
// @version	1.1.0
// ==/UserScript==
//https://jf.alipay.com/*
$(function(){
//	var url = window.location.href;
	setInterval(function(){window.location.reload();}, 120000);
//	setInterval(function(){window.location.reload();}, 2000);

	var div = $(".ui-table-ppi");
	if (div.length != 0) {
		var getData = function(){
			var trText = div.find("tr").map(function(){
				var tdText = $(this).find("td").map(function(){
					return $(this).text();
				}).join().get();
				reuturn tdText;
			}).join().get();
			alert(trText);
		};
		
		div.append("<input type='button' value='获取数据' id='btnGetData'/>");
		$("#btnGetData").click(getData);
		
	}
		
	
});
