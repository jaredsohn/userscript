// ==UserScript==
// @name           test
// @namespace      tt
// @include        http://vod.xunlei.com/nplay*
// @include        http://vod.xunlei.com/iplay*
// ==/UserScript==
if (window.location.href.indexOf("vod\.xunlei\.com\/nplay\.html") !== -1 || window.location.href.indexOf("vod\.xunlei\.com\/iplay\.html") !== -1) {
	if (window.location.href.indexOf("vod\.xunlei\.com\/iplay\.html") !== -1) {
		var name = "play_tit";
	}
	else {
		var name = "yb_bfinner"
	};
	var elem = document.getElementsByClassName(name)[0];
	//console.log(elem);
	if (window.location.href.indexOf("vod\.xunlei\.com\/iplay\.html") !== -1) {

		elem.style.height = "700px";
		elem.style.width = "100%";
	}
	var data = elem.innerHTML;

	var ss = '<div id = "ctpfc"><object type="application/x-shockwave-flash" id="PlayerCtrl11" name="PlayerCtrl11" data="http://xunlei.com/ctpfc" width="975px" height="600px"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="quality" value="high"><param name="bgcolor" value="#000000"><param name="flashvars" value="flashVer=3.0.101.01&amp;platform=webpage&amp;defStatLevel=2&amp;isMacWebPage=false&amp;isZXThunder=undefined"></object></div>';
	elem.innerHTML = ss + data;

}