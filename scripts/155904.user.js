// ==UserScript==
// @name		TiebaUnicode
// @namespace		TiebaUnicode
// @description		百度贴吧敏感词发表
// @include		http://tieba.baidu.com/p/*
// @include		http://tieba.baidu.com/f?ct=*
// @include		http://tieba.baidu.com/f?kw=*
// @include		http://tieba.baidu.com/f?tp=0&kw=*
// @grant		unsafeWindow
// @updateURL		https://userscripts.org/scripts/source/155904.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155904.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		雨滴在心头
// @version		0.2
// ==/UserScript==
(function(){
	
	function $(e){
		return document.querySelector(e);
	}
	
	function UniCode(str){
		str = str.replace(/<\/?a[^>]*>/gi, "").replace(/&amp;/gi, "&")
		var rp = str.match(/^回复[^\:]*( \:)/);
		if(rp != null) str = str.replace(rp[0], "");
		var temps = new Array();
		var i = 0;
		while (/<[^>]*>|&nbsp;|@\S*/.test(str)) {
			temps[i] = /<[^>]*>|&nbsp;|@\S*/.exec(str);
			str = str.replace(temps[i], "㊣");
			i++;
		}
		var out = "";
		for (var i = 0; i < str.length; i++) {
			out += "&#" + str.charCodeAt(i) + ";";
		}
		for (var i = 0; i < temps.length; i++) {
			var temp = temps[i] + "";
			out = out.replace(/&#12963;/, temp);
		}

		return rp == null ? out : rp[0] + out;
	}
	
	function postByUnicode() {
		var str = unsafeWindow.rich_postor._editor.getHtml();
		unsafeWindow.rich_postor._editor.getHtml = function() {
			return UniCode(UniCode(str));
		}
		unsafeWindow.rich_postor._submit();
	}
	
	
	function LzlUni(e){
		var str = unsafeWindow.SimplePostor.prototype._getHtml;
		unsafeWindow.SimplePostor.prototype._getHtml = function() {
			return UniCode(UniCode(str.call(this)));
		}
		e.target.parentNode.querySelector('.lzl_panel_submit').click();
	}
	if(content.document.URL.toString().indexOf("http://tieba.baidu.com/f?kw=") != 0){
		document.addEventListener('DOMNodeInserted', function(event) {
			if(event.target.getAttribute("class") == "editor_for_container") {
				var unic = document.createElement("span");
				$(".lzl_panel_btn").appendChild(unic);
				unic.setAttribute("class","unic");
				unic.setAttribute("style",'background:url("http://tb2.bdstatic.com/tb/static-pb/img/lzl/login_btn_94180a4b.png") no-repeat scroll left top transparent;color:rgb(255,255,255);cursor:pointer; height:24px;text-align:center; width:51px; display:block; margin-left:-80px;');
				unic.innerHTML="uni";
				unic.onclick = LzlUni;
			}
		},false);
	}
	
	//安装了校长的可以注释掉下面4行
	var button = document.createElement("span");
	$("#edit_parent .pt_submit").insertBefore(button,$(".pt_submit >.subTip").nextSibling);
	button.innerHTML= '&nbsp;<input type="button" value="Unicode" class="subbtn_bg" id="PUnicode">';
	$("#PUnicode").onclick = postByUnicode;

})();