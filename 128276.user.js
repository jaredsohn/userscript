// ==UserScript==
// @name           showPic
// @namespace      mim
// @description    显示被遮挡的图片。
// @include        http://*.tuchong.com/*
// @include        http://tuchong.com/*
// @include        http://*.flickr.com/photos/*
// ==/UserScript==

var $;

if(typeof unsafeWindow.jQuery != 'undefined'){
    $ = jQuery = unsafeWindow.jQuery;
}else{
    var script = document.createElement('script');
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
    script.type = 'text/javascript';
    script.sync = true;
    document.getElementsByTagName('head')[0].appendChild(script);
    
}


// for tuchong.com
var runFunc = function(){
	$ = jQuery = unsafeWindow.jQuery;
	
	if(location.href.search("tuchong.com")>=0){

		var imgs = $("#photo .wrapper li a");
		if(imgs){
		       imgs.each(function(i,e){
			      $(e).css("height","70%");
			});
		}
	}
	if(location.href.search("flickr.com")>=0){
		var divs = $("#allsizes-photo .spaceball");
		if(divs){
			divs.each(function(i,e){
				$(e).remove();
			});
		}
		if($("#photo-drag-proxy")){
			$("#photo-drag-proxy").remove();
		}
	}
}
setTimeout( runFunc,1000);
