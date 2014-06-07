// ==UserScript==
// @name        TamTay Extractor
// @namespace   google.com
// @description TamTay.VN
// @include     http://photo.tamtay.vn/xem-anh/*
// @version     1
// ==/UserScript==
var body = document.getElementsByTagName('body');
var div = document.createElement("div");
div.setAttribute('style', 'position:fixed;top:0px;right:0px;width:151px; height:35px;border:solid 1px #ccc; background:whitesmoke;z-index:99999;');
div.innerHTML = '<input type="button" value="Get HTML Code" style="width:150px;height:35px;line-height:35px;font-weight:bold;font-size:14px;" onclick="javascript:getImg()" />';
body[0].appendChild(div);
unsafeWindow.getImg = function(){
	var contentDiv = document.getElementById('containerLeft');
	var content = contentDiv.innerHTML;
	var m,urls = '';
	// hide share buttons
	/*
	var shareDivs = document.getElementsByClassName('toolsDetailArticle');
	for(i = 0; i < shareDivs.length; i++){
		shareDivs[i].style.visibility = 'hidden';
	}
	*/
	var regImg = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
	while ( m = regImg.exec( content ) ) {
		urls += '<img src="'+m[1].replace(/&quot;/g, '')+'" />'+"\n";
	}
	alert(urls);
}