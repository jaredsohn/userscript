// ==UserScript==
// @name           drlogin f 4 kastrolis
// @namespace      ;)
// @author         jang (xlvxjang)
// @version        0.2
// @description    Attīra logošanās lapu draugiem.lv no nevajdzīgiem elementiem. Speciāli priekš kastrolis. 
// @include        http://www.draugiem.lv/*
// ==/UserScript==

(
  function() 
	{
	$ = unsafeWindow.jQuery;

	$('#loginLogo').each(function(){
		$(this).remove();
		$('#loginFooter').remove();		
		$('#loginBox').removeAttr('id');
		$('#loginBody').attr('width','100%');
		$('#loginBody').css('margin-top', '100px');
		$('#loginBody').removeAttr('id');
		$('#loginTable').attr('width','100%');		
		$('#loginForm').removeAttr('class');
		$('#loginForm').removeAttr('id');		
		$('.button').removeAttr('class');
		$('input[name^="remember_me"]').each(function(){ $(this).parent().remove(); });
		$('.color3').remove();
		$("label").remove();		
		$('div[class^="formItem formItemInput"]').attr('class','');
		$('input[type^="text"]').each(function(){ 			
			$(this).parent().append($('input[type^="password"]')); 
			$(this).parent().append($('button[type^="submit"]'));						
		});
		$('div[class^="formItemBorder radius3"]:eq(1)').remove();
		$('div[class^="formItemBorder radius3"]').removeAttr('class');	
	});

	}
()
);