// ==UserScript==
// @name           fnpdf
// @namespace      fnpdf
// @description    print or email pdf
// @include        *
// ==/UserScript==

// iframes = document.getElementsByTagName('iframe');
// while (iframes.length){
// iframes[0].parentNode.removeChild(iframes[0]);
// }
var $;
var ratio = 5;
(function(){
 if (typeof unsafeWindow.jQuery == 'undefined') {
 var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
 GM_JQ = document.createElement('script');

 GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
 GM_JQ.type = 'text/javascript';
 GM_JQ.async = true;

 GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
 }
 GM_wait();
 })();
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else{
		// unsafeWindow.jQuery().ready(function($) {}
		call();
	}
}
function main(percent){
	if(unsafeWindow.jQuery){
		$ = unsafeWindow.jQuery.noConflict(true);
	}
	console.log(window);
	els = [];
	tags_empty = [];
	$("#fnpdf").remove();
	// $("body iframe,body script,body noscript,body style,body link").remove();
	$("iframe,script,noscript,style,link").remove();
	density($("body")[0],percent);
	console.log(els);
	if($("body").css("overflow") != "hidden"){
		$("body").css("overflow","hidden");
	}
	if(!$("#fnpdf_mask").length){
		$("<div id='fnpdf_mask'></div>").appendTo("body");
		$("#fnpdf_mask").css({'background-color':'#000000',
				'height':$("body").height(),
				'width':$("body").width(),
				'z-index':'10000','position':
				'absolute',
				'left':'0',
				'top':'0',
				'opacity':0.8});
	}
	$("<div id='fnpdf'></div>").appendTo("body");
	$("#fnpdf").append('<div id="top_fnpdf" style="height:30px;"><a id="print_fnpdf" href="#">打印pdf</a><a href="#">email</a><a href="#">关闭</a></div><div id="body_fnpdf" style="padding:0 30px;"></div>');
	window.height_fnpdf = window.innerHeight-80;
	window.left_fnpdf = ($("body").width()-900)/2 > 0 ? ($("body").width()-900)/2 : 0;
	$("#fnpdf").css({'background-color':'#ffffff',
			'height':height_fnpdf,
			'width':'900px',
			'z-index':'10001',
			'position':'absolute',
			'text-align':'left',
			'overflow-x':'hidden',
			'overflow-y':'auto',
			'left':left_fnpdf,
			'top':'40px'});
	for(var i in els){
		$(els[i]).clone().appendTo($("#body_fnpdf"));
	}
	clean($("#body_fnpdf")[0]);
	//event bind
	window.addEventListener('resize', fnpdf_resize, true); 
	eventbind();
	$("#print_fnpdf").click(fnpdf_print); 
}
//event bind
function eventbind(){
	$("#body_fnpdf").find('*').mouseover(function(event){
			$(this).css({'background-color':'yellow','border':'2px solid red'});
			event.stopPropagation();
			});
	$("#body_fnpdf a").bind("click", function(){return false;});
	$("#body_fnpdf").find('*').mouseout(function(event){
			$(this).css({'background-color':'#ffffff','border':'none'});
			event.stopPropagation();
			});
	$("#body_fnpdf").find('*').click(function(event){
			$(this).remove();
			clean($("#body_fnpdf")[0]);
			event.stopPropagation();
			});
}
function density(el,percent){
	for(el = el.firstElementChild; el!=null; el = el.nextElementSibling){
		if(el.innerHTML.length && el.textContent.length ){
			rate = el.textContent.length/el.innerHTML.length; 
			if( rate > percent && rate < 1 && el.childElementCount){
				els.push(el);
				console.log(el,el.textContent.length,el.innerHTML.length,el.textContent.length/el.innerHTML.length);
			}
			else{
				density(el);
			}
		}
	}
}
//clean empty tags
function clean(el){
	tags_empty = [];
	clean_tags(el);
	console.log(tags_empty);
	for(var i in tags_empty){
		$(tags_empty[i]).remove();
	}
	content = $(el).html();
	content = content.replace(/(<[a-z0-9]+)[\s]+[^>]+>/gi,'$1>');
	content = content.replace(/<!--[^-->]+-->/gi,'');
	content = content.replace(/\s+/gi,'');
	$(el).html(content);
	eventbind();
}
function clean_tags(el){
	for(el = el.firstElementChild; el!=null; el = el.nextElementSibling){
		if( el.textContent.length == 0 || el.textContent.match(/^[\s]+$/) ){
			tags_empty.push(el);
		}
		else{
			clean_tags(el);
		}
	}
}
// hotkey
function call(){
	document.addEventListener('keydown', function(e){
			if(e.ctrlKey && e.keyCode==77){
			main(ratio/10);
			console.log(ratio);
			}
			else if(e.ctrlKey && e.keyCode==37){
			ratio <= 0 ? main(0) : main((--ratio)/10);
			console.log(ratio);
			}
			else if(e.ctrlKey && e.keyCode==39){
			ratio >= 9 ? main(9) : main((++ratio)/10);
			console.log(ratio);
			}
			}, false); 
}
// resize event
function fnpdf_resize(){
	console.log(window.innerHeight,window.innerWidth);
	$("#fnpdf_mask").css({'background-color':'#000000',
			'height':$("body").height(),
			'width':$("body").width(),
			});
	var tmp_left = ($("body").width()-900)/2 > 0 ? ($("body").width()-900)/2 : 0;
	var tmp_top  = (window.innerHeight-height_fnpdf)/2 > 0 ? (window.innerHeight-height_fnpdf)/2 : 0;
	$("#fnpdf").css({'background-color':'#ffffff',
			'left':tmp_left,
			'top':tmp_top,
			});
}
function fnpdf_print(){
	/*	content = encodeURIComponent($("#body_fnpdf").html());
		$.getJSON("http://www.fnsoxt.com/fnpdf/generate.php?content="+content+"&format=json&jsoncallback=?",
		function(data){
		console.log(data);
		});*/
	iframepost("http://www.fnsoxt.com/fnpdf/generate.php");
}
function iframepost(target){
	$("#iframe_fnpdf").remove();
	$("<iframe/>", { "id": "iframe_fnpdf", "height":"0", "width":"0" }).css("display","none").appendTo("body"); 
	$("#iframe_fnpdf").load(function(){
			if(!window.frameonloaded){
			window.frameonloaded = 1;
			dform = $("<form/>",{ "name": "form_fnpdf", "method": "post", "action": target, }
				).append($("<textarea/>",{"name":"content"}).val($("#body_fnpdf").html()));
			$("#iframe_fnpdf").contents().find("body").append(dform);
			$("#iframe_fnpdf").contents().find("form").submit();
			}
			alert("print posted!");
			});
}