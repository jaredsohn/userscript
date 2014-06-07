// ==UserScript==
// @name btzoa DirectDownloader
// @description Adds a button that lets you download file from btzoa forum list.
// ==/UserScript==
(function(){
	var arr = $(".list_subject>a");
	for(var i=0;i<arr.length;i++){
		var block = arr[i];
		var urlstr = block.href;
		var p = parseUrl(urlstr);
		if(("id" in p) && ("page" in p)){
			var button = document.createElement('button');
			button.setAttribute('onclick', "javascript:file_download('/bbs/dl.php?bo_table=" + p["b_id"]+ "&wr_id="+p["id"]+"&no=', '');");
			button.appendChild(document.createTextNode("다운로드"));
			var parentElement = block.parentNode;
			parentElement.insertBefore(button, block);
		}
	}

	function parseUrl(str){
		var arr = new Object();
		var ele = str.split("&");
		for(var i=0;i<ele.length;i++){
			var kv = ele[i].split("=");
			arr[kv[0]] = kv[1];
		}
		return arr;
	}
})();
// 