// ==UserScript==
// @name        Google Searcher
// @namespace   my
// @include     https://www.google.co.jp/search*
// @require http://code.jquery.com/jquery-1.10.1.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){

	if($('body').hasClass("tbo")){
		
		$('#rso .g').find('a').css({"z-index":"1","position":"relative"});
		
		$('#rso .g').find('.pslicont').css({"position":"relative"});
		
		$('#rso .g').each(function(){
								   
			$(".rc .r",this).next().css({
				"padding-top":$('.r',this).height()+"px"
			})

			$('.rc .r a',this).css({
				"z-index":"0",
				"display":"block",
				"position":"absolute",
				"width":$(".r",this).width(),
				"height":$(this).height()-23,
				"white-space": "nowrap",
				"overflow": "hidden",
				"text-overflow": "ellipsis"
			})
		});
	
		$('.r a',this).hover(
			function () {
				$(this).css("color","red");
			},
			function () {
				$(this).css("color","");
			}
		);
	}
});