// ==UserScript==
// @name        post to tumblr
// @namespace   post to tumblr
// @include     *
// @require 	http://code.jquery.com/jquery-latest.min.js 
// @exclude     http*://www.google.com/*
// @version    3
// ==/UserScript==

var tags ="pussy,vagina,slit,labia majora,naked,shaved";
$(function() {
	if(location.href.match(/tumblr\.com\/share\/quote/g)){
		tumblr_submit();
	}else{
		setTimeout(start,5000);
		//start();
	}
});

function start(){
	base="http://www.tumblr.com/share/quote?quote=Original"	
	console.log(window.location.hostname);
	console.dir(window.location);
	//$("#quote_form").submit();
	//$("img").bind("dblclick", function(e){
	$("img").mousedown( function(e){		
		if(e.which!=3){//if no right click
			return;
		}
		if(!e.ctrlKey){//if no ctrl hold
			return;
		}
		console.log("right click started");
		src= $(this).attr("src");
		//if(!src.match(/\//)){
		//}else 
		if(!src.match(/^http/)){
			src= "http://"+location.hostname+location.pathname+src;
		}
		prefix = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url="; 
		suffix = "&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image/*";		
		src=prefix+src+suffix;		
		if(e.shiftKey){//if shift key is to do custom tags
			t=prompt("enter tags separated by commas",tags);
			if(t===false){
				return;
			}else{
				tags=t;
			}
		}		
		source=escape("<a href='"+location.href+"'><img src='"+src+"' </a>");
		console.log(source);
		url= base+"&tags="+tags+"&source="+source;
		console.log(src);
		console.log(	$(location).attr('href'));
		GM_openInTab(url);
	});

}
function tumblr_submit(){	
	$("#quote_form").unbind();
	$("#quote_form").attr("onclick","");
	$("#quote_form").attr("onsubmit","");	
	//$("#quote_form_post_tags").val(tags);
	t= $("#quote_form").serialize();
	console.log(t);
	$("#quote_form").submit();
	
}