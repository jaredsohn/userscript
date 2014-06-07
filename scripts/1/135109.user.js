// ==UserScript==
// @name           tumblr auto reblog
// @description    This script
// @author         chulian1819
// @include        http*://www.google.*/reader*
// @include        http://*.tumblr.com/*#rebloging_*
// @include        http://*.tumblr.com/close_this*
// @require        http://code.jquery.com/jquery-latest.js
// @version        1.4
// ==/UserScript==

//edit this line for default tags, example:
//var defaultTags="tag1,tag2,tag3";
var defaultTags="";

//try{
	$(document).ready(function () {										
		var hash=window.location.hash;		
		var tags=hash.replace("#rebloging_",""); 
		GM_log("hash "+hash+" tags "+tags);
		if(location.href.match(/assets\.tumblr\.com(.*)/g) ){//inside the button iframe		

		}else if(location.href.match(/tumblr\.com\/dashboard(.*)/g) ){		
			//click reblog
			GM_log("current "+location.href);					
			href= $("a[href*='reblog']").attr("href")+hash;//"#rebloging";		
			href=href.replace(/post/,"close_this");	
			GM_log("to repost go to  "+href);			
			location.href=href;
			
	
		}else if(location.href.match(/tumblr\.com\/reblog/g) ){//on the reblog form		
			GM_log("fill the form "+$("#edit_post").size()+" serialize ") ;
			if($("#edit_post").size()==0){
				GM_log("no form found");
				return;
			}			
			$("#edit_post").unbind();
			$("#edit_post").attr("onclick","");
			$("#edit_post").attr("onsubmit","");
			//unsafeWindow.$("edit_post").sumbit();
			unsafeWindow.is_preview = false;
			$("input[name='redirect_to']").val(  $("input[name='redirect_to']").val()+"closing_reblog"  );
			$("#edit_post input[name='post[tags]']").val(tags);
			GM_log($("#edit_post input[name='post[tags]']").size()+" tags: "+$("#edit_post input[name='post[tags]']").val());			
			GM_log("vars: "+$('#edit_post').serialize());			
			$("#edit_post").submit();
			$("#edit_post")[0].submit();		
	
		} else if(location.pathname.match(/(.*)close_this(.*)/g) ){
			window.open('', '_self', '');window.close();

		}else if(location.href.match(/(.*)\.tumblr\.com(.*)/g) ){//on the image to reblog			
			//CHANGE THE IFRAME OF THE RRREBLOG BBUTTONS to let know the iframe to reblog
			src = $("#tumblr_controls").attr("src")+hash;//"#rebloging";
			GM_log($("#tumblr_controls").size()+" buttons changed to "+src);
			//$("#tumblr_controls").attr("src",src);
			if(src){
				location.href=src;
			}
			GM_log("content of button iframe "+$("#tumblr_controls").contents().find("body").html())
		}
		
	});	
	
	
	$(document).keydown(function (e) {
		element=e.target;
		//GM_log("tag name: "+element.tagName );
		if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;//if cursor on a textarea or input, disable hotkey
		
		tecla=String.fromCharCode(e.which).toLowerCase();
		//GM_log(e.which+" tecla "+tecla)
		//76=l
		if(e.which == 226  || e.which == 76 ) { open_tab(); }
		//79=i
		if(e.which == 73 ) { open_tab(true); }
	});
	/*
}catch(e){
	GM_log("error");
	GM_log(e.description);
}
*/

function open_tab(ask){
	href=$("#current-entry a[class='entry-title-link']").attr("href");
	if(ask){
		tags=prompt("enter tags separated by commas",defaultTags);
		if(tags==null){
			return;
		}
		//href=href+"?tags="+tags;
		//GM_setValue("tags",defaultTags);
	}else{
		tags=defaultTags;
	}
	if(href){	
		
		
		if(navigator.userAgent.match(/fox/g)){
			GM_openInTab(href+"#rebloging_"+tags);
		}else{
			openNewBackgroundTab(href+"#rebloging_"+tags);
		}
	}
}

function openNewBackgroundTab(url){
    var a = document.createElement("a");
    a.href = url;
    var evt = document.createEvent("MouseEvents");    
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}