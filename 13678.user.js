// ==UserScript==
// @name           MyBASH
// @version        1
// @namespace      ReallyBetterBOR
// @description    Bash ajax clientside and adds remover
// @include        http://*bash.org.ru/*
// @author         Oleg Butuzov
// ==/UserScript==

   
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100); 
		}  else { 
			$ = unsafeWindow.jQuery; int();
		}
}

GM_wait();

function int(){
	$('a[@href*=adclick]').each(function(){
		$(this).parent().remove();									 
	});
	$('div.c').css('marginRight', '0px !important');
	
	$('.vote').find('a[@href$=sux]').each(function(){
		
		$(this).click(function(){
			ajaxUrl = $(this).attr('href');
			$('span', $(this).parent()).html(	$('span', $(this).parent()).html() - 1	);
			$('a[@href$=rulez]', $(this).parent()).remove();
			$('a[@href$=sux]', $(this).parent()).remove();
			$.get(ajaxUrl, {},function(text){})
			return false;
		});
		
	});
	
	$('.vote').find('a[@href$=rulez]').each(function(){
													 
		$(this).click(function(){
			ajaxUrl = $(this).attr('href');
			$('span', $(this).parent()).html(	$('span', $(this).parent()).html() - 1 + 2	);
			$('a[@href$=sux]', $(this).parent()).remove();
			$('a[@href$=rulez]', $(this).parent()).remove();
			$.get(ajaxUrl, {},function(text){})
			return false;
		});
		
	});
		
	$('.vote').find('a[@href$=bayan]').each(function(){
		
		$(this).click(function(){
			ajaxUrl = $(this).attr('href');
			$(this).after("<b>[:||||:]</b>");
			$(this).remove();
			$.get(ajaxUrl, {},function(text){})
			return false;
		})
		
	});
	
	
}