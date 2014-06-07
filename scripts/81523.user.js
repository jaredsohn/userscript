// ==UserScript==
// @name           link icons
// @namespace      127.0.0.1
// @author         botnet/aperture
// @contact        o0101000 (aim/yim)
// @include        http://boards.adultswim.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://cherne.net/brian/resources/jquery.hoverIntent.js
// ==/UserScript==
$(document).ready( function() {		
var url;
var linkurl = document.createElement('div');

var conf = {
	over: function(e){
			var top = e.pageY-25;
			var left = e.pageX+5;
			$(linkurl).css({'display':'none','border':'none','position':'absolute', 'top':top, 'left':left});
			$(this).parents('.MessageSubjectCell').append(linkurl);
			
			$.get($(this).parent().find('a').attr('href').replace('/jump-to/first-unread-message', ''),{}, function(data){
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('', '', dt);
			var html = doc.createElement('html');
			html.innerHTML = data;
			doc.appendChild(html);
			url = $(doc).find('.lia-message-body-content').find('a').attr('href');
			$(linkurl).html(url);
			$(linkurl).show();
			});
			},
			timeout: 0,
			out: function(){
			$(linkurl).hide();
			}
		};

$('img[title="Contains a hyperlink"]').each(function(){
		
		$(this).attr('title', '');
		$(this).hoverIntent(conf);
		$(this).click(function(){
			$.get($(this).parent().find('a').attr('href').replace('/jump-to/first-unread-message', ''),{}, function(target){
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('', '', dt);
			var html = doc.createElement('html');
			html.innerHTML = target;
			doc.appendChild(html);
			window.open($(doc).find('.lia-message-body-content').find('a').attr('href'));
		});

});
});
$(document).click(function(){
	$(linkurl).hide();
	});
});
