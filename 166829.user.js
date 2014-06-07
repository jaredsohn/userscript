// ==UserScript==
// @name        CSDN免积分下载
// @description 免积分下载
// @version     0.1.6
//
// @grant       none
//
// @include     http://download.csdn.net/detail/*
// @include     http://download.csdn.net/download/*
//
// @require     http://www.csdn.net/js/jquery-1.4.2.min.js
//
// @run-at      document-end
// ==/UserScript==
$(document).ready(function() {
	$('.res_info .info').after('<a href="javascript:void(0);"><h1>获取免积分下载地址</h1></a>').next().click(function() {
		if (this.href.length === 19) {
			var $this = $(this);
			$.ajax({
				url : '//download.csdn.net/index.php/rest/source/getsourceinfo/' + location.pathname.match(/\d+$/)[0],
				dataType : 'json',
				
				beforeSend : function() {
					$this.html('<h1>正在获取免积分下载地址</h1>').removeAttr('href');
				},
				success : function(data) {
					if (data == null) {
						this.error();
					} else {
						$this.attr({href:data.url,title:'文件名:'+data.originfile+'\nMD5:'+data.md5}).html('<h1>免积分下载</h1>');
					}
				},
				error : function() {
					$this.html('<h1>免积分下载地址获取失败</h1>').removeAttr('href');
				}
			});
		}
	});
});