// ==UserScript==
// @name 用快播打开百度影音
// @description 用快播打开百度影音
// @include *

// ==/UserScript==
(function(){
	String.prototype.getParameter = function (key) { 
		var re = new RegExp(key + '=([^&]*)(?:&)?'); 
		return this.match(re) && this.match(re)[1]; 
	};

	if(/bdhd\.html/.test(window.location.href)){
		var url = window.location.href;
		var bdhd = url.getParameter("u");
		var width = url.getParameter("w");
		var height = url.getParameter("h");
		document.body.innerHTML = "";
		document.body.innerHTML = 
		//alert(	
			"<object classid=\"clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF\" width=\""+width+"\" height=\""+height+"\" id=\"QvodPlayer\" name=\"QvodPlayer\""
			+ " onError=if(window.confirm(\'请您先安装QvodPlayer软件,然后刷新本页才可以正常播放.\')){window.open(\'http://www.qvod.com/download.htm\')}else{self.location=\'http://www.qvod.com/\'}>"
			+ "<PARAM NAME=\'URL\' VALUE=\'" + bdhd + "'>"
			+ "<PARAM NAME=\'Autoplay\' VALUE=\'1\'>"
			+ "<PARAM NAME=\'width\' VALUE=\'"+width+"\'>"
			+ "<PARAM NAME=\'height\' VALUE=\'"+height+"\'>"
			+ "<embed URL=\'" + bdhd + "\' type=\'application/qvod-plugin\'></embed> "
			+ "</object>"
		//)
	}
})();