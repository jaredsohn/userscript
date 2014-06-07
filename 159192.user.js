// ==UserScript==
// @name QQ share limitation break
// @include http://fenxiang.qq.com/*
// ==/UserScript==

(function () {

	function download(dl_url, dl_cookie) {
		//alert(dl_url + "|" + dl_cookie);
		$.cookie("FTN5K", dl_cookie, {path: "/", domain:"qq.com"});
		//document.cookie = "FTN5K=" + dl_cookie + "; Domain=qq.com; Path=/";
		$.ajax({
			type: "GET", 
			url: dl_url, 
			cache: false, 
			xhrFields: {withCredentials: true}
		});
	}

	function set_download_link(object, name, hash) {
		object.removeAttribute("onclick");
		object.setAttribute("filesize", "1");
		$.ajax({
			type: "POST",
			url: API_URL.handler_url + "/getComUrl",
			cache: false,
			data: {"filename": name, "filehash": hash},
			timeout:5000,
			dataType: "json",
			success:function(data) {
				if(data&&data.ret==0){
					//$.cookie('FTN5K',data.data.com_cookie,{paSth:"/",domain:"qq.com"});
					//alert(data.data.com_url);
					//object.href = data.data.com_url;
					object.setAttribute("download_url", data.data.com_url);
					object.setAttribute("download_cookie", data.data.com_cookie);
					object.addEventListener("click", 
						function (event) {
							download(
								event.target.getAttribute("download_url"), 
								event.target.getAttribute("download_cookie"));
						}, 
						false);
				}
			},
			error:function() {
			}
		 });
	}

	function init() {
		var v1, v2;
		v1 = document.evaluate(
			"//a[@class='share_fileneme']", 
			document, 
			null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
			null);
		//alert(v1.snapshotLength);
		for (var i = 0; i < v1.snapshotLength; ++i) {
			v2 = v1.snapshotItem(i);
			var name = v2.getAttribute("title");
			var hash = v2.getAttribute("filehash");
			set_download_link(v2, name, hash);
		}
	}

	document.addEventListener("DOMContentLoaded", init, false);
})();