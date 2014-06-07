// ==UserScript==
// @name           imageExpander
// @namespace      127.0.0.1
// @author         aperture/botnet
// @contact        o0101000 (aim/yim)
// @include        http://boards.adultswim.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cherne.net/brian/resources/jquery.hoverIntent.js
// ==/UserScript==


$('.lia-message-body-content').find('a[href$=".jpg"],a[href$=".png"],a[href$=".gif"]').each(function(){
	var expando = document.createElement('a');
	if($(this).parents('div').attr('class') == 'lia-message-body-content'){
	
	$(expando).html('<font style="font-size:8px;color:#ccc">[+]</font>');
	$(expando).insertAfter($(this));
	$(expando).css('cursor', 'pointer');
	var show = document.createElement('div');
	$(expando).toggle(function(){
		$(expando).html('<font style="font-size:12px;color:#ccc">[-]</font>');
		$(show).css('display', 'none');
		$(this).append(show);
		$(show).html('<img src=' + $(this).parent().find('a').attr('href').replace('?action=view&current=', '') +' border=0 height=400');
		$(show).show(2000);
		
	}, function(){
		$(show).css('display', 'none');
		$(expando).html('<font style="font-size:8px;color:#ccc">[+]</font>');

		});
	}
});

