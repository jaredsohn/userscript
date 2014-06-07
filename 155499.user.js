// ==UserScript==
// @name			Tieba Lanzi
// @version			1.0
// @namespace		http://userscripts.org/scripts/show/153071
// @include			http://tieba.baidu.com/*
// @author			Fate Suzumiya
// @grant			GM_addStyle
// @grant			unsafeWindow
// @updateURL   https://userscripts.org/scripts/source/153071.meta.js
// @downloadURL https://userscripts.org/scripts/source/153071.user.js
// ==/UserScript==
(function(){
	GM_addStyle('.lzlz{background:#EEE;color:#3366CC;border-radius: 3px;height:24px;text-align:center; width:51px; display:block; margin-left:-140px; margin-top: -24px;pointer-events:auto;}');
	
	function $(elements){
		return document.querySelector(elements);
	}
	
	function UniCode(str){
		str = str.replace(/<\/?a[^>]*>/gi, "");
		var temps = new Array();
		var i = 0;
		while (/<[^>]*>|&nbsp;|@\S*/.test(str)) {
			temps[i] = /<[^>]*>|&nbsp;|@\S*/.exec(str);
			str = str.replace(temps[i], "⑨");
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
		
		return out;
	}
	
	function postByUnicode() {
		var str = unsafeWindow.rich_postor._editor.getHtml();
		unsafeWindow.rich_postor._editor.getHtml = function() {
			var STR = UniCode(str);
			var a='<a href="http://';
			var b='/" target="_blank" style="color:red">';
			var d="< /a>";
			var LZ=a+UniCode(STR)+b+UniCode(STR)+d;
			return LZ;
		}
		unsafeWindow.rich_postor._submit();
	}
	
	
	function LzlUni(e){
		var str = unsafeWindow.SimplePostor.prototype._getHtml;
		unsafeWindow.SimplePostor.prototype._getHtml = function() {
			var STR = UniCode(str.call(this));
			var a='<a href="http://';
			var b='/" target="_blank" style="color:red">';
			var d="< /a>";
			var LZ=a+UniCode(STR)+b+UniCode(STR)+d;
			return LZ;
		}
		e.target.parentNode.querySelector('.lzl_panel_submit').click();
	}
	
	document.addEventListener('DOMNodeInserted', function(event) {
		if(event.target.getAttribute("class") == "editor_for_container") {
			var unic = document.createElement("span");
			document.querySelector(".lzl_panel_btn").appendChild(unic);
			unic.setAttribute("class","lzlz");
			unic.innerHTML="Blues";
			unic.onclick = LzlUni;
		}
	},false);
	
	//启用了校长之怒的Unicode发表功能可以注释掉下面4行
	var button = document.createElement("span");
	$("#edit_parent .pt_submit").insertBefore(button,$(".pt_submit >.subTip").nextSibling);
	button.innerHTML= '&nbsp;<input type="button" value="Blues" class="subbtn_bg" id="PUnicode">';
	$("#PUnicode").onclick = postByUnicode;
})();
