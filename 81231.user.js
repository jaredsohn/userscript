// ==UserScript==
// @name           previews
// @namespace      127.0.0.1
// @author         botnet/aperture
// @contact        o0101000 (aim/yim)
// @include        http://boards.adultswim.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cherne.net/brian/resources/jquery.hoverIntent.js
// ==/UserScript==

		
$(document).ready( function() {		

var css = "position:fixed; "
        + "z-index:9999; "
        + "display: none;"
        + "color: #ccc;"
        + "background:#000; "
        + "left: " + (window.innerWidth/3) + "px;" 
        + "top: " + (window.innerHeight/4) + "px;"
        + "max-width: " + (window.innerWidth/2) + "px;"
        + "max-height: " + (window.innerHeight-window.innerHeight/4-50) + "px;"
        + "border: 1px #808080 solid; "
        + "margin: 0; "
        + "padding: 5px; "
        + "overflow: hidden;";
var display = document.createElement('div');
			  display.setAttribute('id', 'content');
			  display.setAttribute("style", css);
			  document.body.appendChild(display);        
var init = $(document).find('.MessageStatusIcon');
var dispConfig = {
	over: function(){
		var thread = 'http://boards.adultswim.com' + $(this).parent().next().find('.page-link').attr('href').replace('/jump-to/first-unread-message', '');
		$.get(thread, {}, function(page){
			var post3 = [];
			var post1 = page.split('<div class="lia-message-body-content">');
			var post2 = post1[1].split("</div>");
			post3 = post2[0].split("<div style");
			$('#content').html(post3[0]);
			$('#content').fadeIn(500);
		});
	},
	timeout: 0,
	out: function(){
		display.style.display = 'none';
	}
};
$(init).hoverIntent(dispConfig);

$(document).click(function(){
	display.style.display = 'none';
	});
	

});







