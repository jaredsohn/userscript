// ==UserScript==
// @name			圈人无忧
// @version			0.0.1
// @namespace		ChanxiAtFirefox
// @include			http://tieba.baidu.com/*
// @include			http://tieba.baidu.com.cn/*
// @author			anran
// ==/UserScript==


document.body.onload=function(){
	$(".tb-editor-editarea-wrapper .tb-editor-editarea").bind('keydown', function(event) {
		e = event ? event:(window.event ? window.event : null);
		var currKey=0;  
		currKey=e.keyCode||e.which||e.charCode;
		if(currKey==32){//按住ctrl键时候转换
			for(var i = 0; i < $(".tb-editor-editarea-wrapper .tb-editor-editarea .at").length; i++){
				if($(".tb-editor-editarea-wrapper .tb-editor-editarea .at").get(i).innerHTML=="@"){
						$(".tb-editor-editarea-wrapper .tb-editor-editarea .at").eq(i).replaceWith($("<span class='edit_font_normal'>@</span>"))
				}
			
			}
		

		}
	});
}