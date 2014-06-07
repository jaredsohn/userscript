// ==UserScript==
// @name rosi图片翻页
// @description rosi图片翻页
// @version 1.0.0
// @include http://rosi.mn/*
// @updateURL https://userscripts.org/scripts/source/486309.meta.js
// @downloadURL https://userscripts.org/scripts/source/486309.user.js
// ==/UserScript==

(function(){
	//获取所有图片地址,并生成隐藏img
	var i = 0;
	$("#thumb-group-1 > div > a").each(function(){
		$("#album-face").append('<img id="img_' + i + '" src="' + $(this).attr("href") + '" style="display:none" />');
		i++;
	});
	
	var j = 0;
	$("#album-face > img").click(function(){
		$("#album-face > img").attr("style","display:none");
		$("#img_" + j).attr("style","");
		var width = $("#img_" + j).width();
		$("#album").attr("style","width:" + width + "px");
		if(j < i){
			j++;
		} else {
			alert("已经是最后一页");
		}
	});
	
	//调试用
	function Log(msg){
		console.log(msg);
	}
})();