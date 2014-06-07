// ==UserScript==
// @name           asanusta tumblr auto reblog
// @description    otomatik olarak sizin tumblr için rebloged için yeni bir sekmede bir google reader bir tumblr rss öğe basın açılır
// @author         asanusta
// @include        http*://www.google.com/reader*
// @include        http://*.tumblr.com/*#rebloging_*
// @require        http://code.jquery.com/jquery-latest.js
// @version        1.9.2012
// ==/UserScript==

//edit this line for default tags
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
			$("#edit_post input[name='post[tags]']").val(tags);
			GM_log($("#edit_post input[name='post[tags]']").size()+" tags: "+$("#edit_post input[name='post[tags]']").val());			
			GM_log("vars: "+$('#edit_post').serialize());			
			$("#edit_post").submit();
			$("#edit_post")[0].submit();			
		}else{//on the image to reblog			
			//CHANGE THE IFRAME OF THE RRREBLOG BBUTTONS to let know the iframe to reblog
			src = $("#tumblr_controls").attr("src")+hash;//"#rebloging";
			GM_log($("#tumblr_controls").size()+" buttons changed to "+src);
			$("#tumblr_controls").attr("src",src);
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
		GM_openInTab(href+"#rebloging_"+tags);
	}
}