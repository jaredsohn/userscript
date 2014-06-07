// ==UserScript==
// @name		Reddit auto links opener
// @author		Tadej Magajna
// @namespace		*reddit.com*
// @include		http://www.reddit.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// ==/UserScript==

var links=new Array();
var olds=new Array();
var status = false;

$(document).ready(function(){
	$('.thing .entry .title .title').mouseover(function() {
		if (status == true && jQuery.inArray($(this).attr('href'), links) == -1 && jQuery.inArray($(this).attr('href'), olds) == -1)
		{
			links[links.length] = $(this).attr('href');
			$(this).animate({marginLeft: "30px"}, 1500);
		}
	});

	$(window).keydown(function(event) {
		if (event.which == 83)
			status = true;	
		return true;
	});

	$(window).keyup(function(event) {
		if (event.which == 83)
		{
			if (status == true && links.length > 0)
				for (i=0; i<links.length; i++)
					window.open(links[i]);
			status = false;
			jQuery.merge(olds, links);
			links=new Array();
			$(window).stop();	
		}
		return true;
	});
});