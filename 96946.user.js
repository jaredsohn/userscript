// ==UserScript==
// @name           Gamer.Ru Extender
// @namespace      http://google.ru
// @description    Extends some features
// @include        http://*gamer.ru*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// ==/UserScript==

(function() {
	if (window.location.hostname.match(/gamer.ru/)) {
		var ajaxComplete = false;
		
		// картинка для аякс-лоадера
		var ajaxPreloader = 'http://awayrealty.ru/img/ajax-big-loader-v1.gif';
		
		$("head").append('<style> #flash_notice {font-size:130% !important; width:300px !important;} <style>');
		
		$("body").append("<div id='gruext_ajaxloader' style='top:30%; width:120px; height:40px; left:50%; position:fixed; z-index:9999; display:none'><img src='"+ajaxPreloader+"' /></div>");
		//$("body").append("<div id='gruext_temporary' style='display:none'> </div>");
		//$("body").append("<div id='gruext_images' style='display:none'> </div>");
		$('.post').ajaxStart(function() {
			$("#gruext_ajaxloader").show();
		});
		$('.post').ajaxStop(function() {
			$("#gruext_ajaxloader").hide();
		});
		$('.post').ajaxComplete(function() {
			ajaxComplete = true;
		});
		$("span.more a:not(.comments)").live("click",function(){
			var postId = $(this).parent().parent().parent().attr("id");
			$(".post[id="+postId+"] .pics").remove();
			$(".post[id="+postId+"] .body").load("http://"+window.location.hostname+$(this).attr("href")+" #"+postId+" .body > *");
			return false;
		});
		
		$("#flash_notice").show(function(){
			$(this).append("<div style='right:10px; top:5px; position:absolute;'><a id='flashClose' style='text-decoration:none; border-bottom:1px dashed #ccc;' href='#'>закрыть</a></div>")
		});
		
		$("#flashClose").bind("click", function(){
			$("#flash_notice").hide();
			return false;
		});
	}
})();