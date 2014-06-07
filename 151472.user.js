// ==UserScript==
// @id             taobao.com-45b7c6fc-b165-4117-ade9-24df8f7c3e95@scriptish
// @name           淘宝点击商品小图打开大图链接
// @version        0.3
// @namespace      
// @author         idragonet
// @description    看到商品原始图片真实链接地址(方便图片另存为)
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @include        http://detail.tmall.com/item.htm*
// @include        http://item.taobao.com/item.htm*
// @run-at         window-load
// ==/UserScript==

  
$("img[src$='x40.jpg']").each(function(){  
	  var href=this.src.replace("_40x40.jpg",""); 
	  $(this).parent().attr('href',href);
	  $(this).parent().click(function(){
				window.open(href,'_blank');      
			});
	    
});  
	
