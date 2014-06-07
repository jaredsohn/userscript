// ==UserScript==
// @name           Demoty++
// @include        http://demotywatory.pl/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	}
	else	{
		$ = unsafeWindow.jQuery; letsJQuery();
	}
}
GM_wait();
//code
function letsJQuery(){
	
			var demoty = [];
			var jqdemoty = $('.demotivator');
			
			//navbar creation
			var navLinks = [];
			var navTitles = [];
			$('#mmenu').find('#menu').children().each(function(i){
				navLinks[i] = $(this).find('a').attr('href');
				navTitles[i] = $(this).find('a').attr('title');
			});
			var navbar = $('<div id="navbar" style="position: fixed; left: 50px; top: 200px; font-size: 30px;" class="navbar"></div>');
			for(i in navLinks){
				navbar.append('<a href="'+navLinks[i]+'">'+navTitles[i]+'</a><br/>');
			}
			//navbar.attr('style', 'position: fixed; left: 50px; top: 200px; font-size: 30px;')
			
			//paginator
			alert(document.location.substring(0,25));
			
			//removing top bar
			var demotsearch = $('#demotsearch');
                        demotsearch.remove();
			demotsearch.css({
				position: 'absolute',
				left: 0,
                                width: 100,
				top: 270
			});
			$('#main_container').prevAll().add($('h2')).add(jqdemoty.eq(0).prevAll()).remove();
			
			//removing ads
			jqdemoty.find('.center').each(function(){
				$(this).parent().remove();
			});
                        $('embed').remove();		
						
			//infobar show/hide
			var infoIsVisible = true;
			var infobtn = $('<input id="infobtn" type="button" value="Ukryj info" />');
			infobtn.click(function(){
				if(infoIsVisible == true){
					infobar.slideUp('slow');
					infoIsVisible = false;
					infobtn.attr('value', 'Pokaz info');
				}else{
					infobar.slideDown('slow');
					infoIsVisible = true;
					infobtn.attr('value', 'Ukryj info');
				}
			});
			
			navbar.append('<br/><br/>');
			demotsearch.appendTo(navbar);
			infobtn.appendTo(navbar);
			navbar.prependTo($('#main_container'));
	
}