// ==UserScript==
// @name           plucury's douban commentcounter
// @namespace      plucury.com.douban.commentcounter
// @include        http://www.douban.com/group/topic/*
// @author		   plucury
// ==/UserScript==

 if(typeof unsafeWindow.jQuery != "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery
 }

 $(document).ready(function(){
	var index=0
	 if($("div[@class=paginator]").length>0){
			var index=($("div[@class=paginator]").find("span[@class=thispage]").html()-1)*100;
			
	 }
            $("table[@class=wr]").each(function(i){
				if(i!=0){
					var title = $(this).find("span").find("h4").html();
					$(this).find("span").find("h4").html('<table width=\'100%\'><tr><td align=left>'+title+'</td><td align=right width=45>'+(index+i)+'楼</td></tr></table>');
				}
            });
            
        });