// ==UserScript==
// @name Ikariam Link Embassy
// @author 	Phate & Qwertinho
// @version	1.00
// @description	In GF_toolbar you have embassy links.
// @include http://*.ikariam.com/*
// @exclude [url]http://board[/url].*.ikariam.com/*
// @require	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require	http://www.betawarriors.com/bin/gm/57756user.js
//
// @history	1.00 first release.
// ==/UserScript==


ScriptUpdater.check(107853,'1.00');

$(window).ready(function()
{
	var html=''
	$('#embassyMenu li:not(:has(a[href*=embassyLeaveAlly]))').each(function(){html = html +'<li>'+ $(this).html() +'</li>'});
	if (html!='')	localStorage.setItem('Ikariam_Link',html)
	if($('body:first').attr('id')=='embassy') 
	{
		var title = $('#mainview tbody:first td.desc:first').attr('title')
		if (title) localStorage.setItem('titleIkariam_Link',title)
	}
	
	var link = localStorage.getItem('Ikariam_Link')
	if ($('#GF_toolbar').length > 0 && link) 
	{
		title = localStorage.getItem('titleIkariam_Link')
		if (!title) title = 'Embassy'
		$('#GF_toolbar ul:first li:first').before('<li><a title="'+ title +'" href=#><span class="textlabel">'+ title +'<span></a></li>');
		$('#GF_toolbar a[title='+ title +']').click(function()
		{
			if ($('#linkEmbassy').length > 0) $('#linkEmbassy').remove()
			else 	
			{
				$('#GF_toolbar').append('<ul id="linkEmbassy">'+ link +'</ul>')
				var maxWidth = 0;
				$('#linkEmbassy li')
					.each(function(){if ($(this).width() > maxWidth) maxWidth = $(this).width()})
					.css({'background':'#429fd8','display':'list-item','width': maxWidth +'px'})
				$('#linkEmbassy li:last').css({'padding-bottom':'5px'})
			}
		});
		
	}
});
