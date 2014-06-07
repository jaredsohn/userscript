// ==UserScript==
// @name           PronAnchorOnHover
// @namespace      http://xinjia.name
// @description   play <a> sound onMmouseOver for studing cantonese
// @include    http://kumkee.spaces.live.com/blog/cns%211349FCFE7656C73D%21205.entry*
// @include    http://input.foruto.com/ccc/jyt*
// @require	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//alert('hello');
$(function(){
	//alert($("a[href$='.wav']").attr('href'));
	//a = $("a[href$='.wav']");
	//a.after('<embed autostart="false" width="0" height="0" enablejavascript="true" src="'+ a.attr('href') +'">');
	$("a[href$='\\.wav']").hover(
		function(){
			sound = '<embed hidden=true src='+ $(this).attr('href') +'>';
		//alert($(this).next().length);
			if($(this).next('embed').length > 0) {$(this).next('embed').remove();}
			$(this).after(sound);
		},
		function(){}
	);
	$("a[href$='\\.mp3']").hover(
		function(){
			sound = '<embed hidden=true src='+ $(this).attr('href') +'>';
		//alert($(this).next().length);
			if($(this).next('embed').length > 0) {$(this).next('embed').remove();}
			$(this).after(sound);
		},
		function(){}
	);
});