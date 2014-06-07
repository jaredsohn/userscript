// ==UserScript==
// @name CNKI 知网 PDF 下载工具
// @namespace http://rainbowrain.org
// @description cnki
// @include http://*.cnki.net/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version 1.0
/* @reason
   v1.0
   初始版本.
   功能: 将知网搜索结果中默认的 CAJ 格式下载改为 PDF 格式下载
   @end */
// ==/UserScript==

(function() {
	setTimeout(function() {
		$("a").each(function() {
			var href = $(this).attr("href");
			if (href && href.indexOf("download.aspx?filename=") != -1 && href.indexOf("dflag=pdfdown") == -1) {
				var newlink = href + "&dflag=pdfdown";
				$(this).attr("href", newlink);
			}
		});
	}, 2000);
}());

var thisScript = {
   name: "CNKI 知网 PDF 下载工具",
   id: "60852",
   version:"1.0"
};

var updater = new Updater(thisScript);
updater.check();