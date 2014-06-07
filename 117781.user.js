// ==UserScript==
// @name           9gag Vote page fixer
// @namespace      *9gag.com*
// @include        http://9gag.com/vote/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

/**
* @Author: Stormy http://stormy.org.org/
*
* Parts of this code belong to Tadej Magajna.
* 
*/

// 	Buffer current ids for later
	var gagBuffer = new Array;
	
// 	Set temp counter
	var tmpId = 0;
	
	var i = 0;
	$('.entry-item').each(function(i) 
	{
		tmpId = parseInt($(this).attr('gagid'));
		gagBuffer[i] = parseInt(tmpId);
		i++;
	});
	
	console.log('started');
	
	var postControlBar= $("#searchbar_container");
	
// 	Removes ads. Nope. 9gag needs those. :)
	$('.s-300').remove();
	
	var page = (document.URL).split("/");
	var pageLength = page.length;
	page = page[pageLength-1];
	
	var nextPage = parseInt(page);
	
//	Re-bind like/unlike button events, since jQuery integration seems to break them. :-/
	$('a.love').live('click', function(){
		console.log('trigger love');
		$.get('/vote/like/id/'+$(this).attr('entryid'));
			$(this).addClass('loved');
		});
	
	$('a.loved').live('click', function(){
		console.log('trigger loved');
		$.get('/vote/unlike/id/'+$(this).attr('entryid'));
			$(this).removeClass('loved');
	});
	
	$('a.unlove').live('click', function(){
		console.log('trigger unlove');
		$.get('/vote/dislike/id/'+$(this).attr('entryid'));
			$(this).addClass('unloved');
	});

	$('a.unloved').live('click', function(){
		console.log('trigger unloved');
		$.get('/vote/unlike/id/'+$(this).attr('entryid'));
		$(this).removeClass('unloved');
	});
	
$(document).ready(function(){

	console.log('doc-ready');
	
	var loading = false;

	$(window).scroll(function() 
	{   
		if (!loading && ($(document).height() - $(document).scrollTop() - window.innerHeight) <= 1000)
		{
			loading = true;
			$('#entry-list').append(
				'<div align="center" class="mloader">'+
					'<img src="http://www.photoshopatoms.com/tutorials/creating-an-ajax-style-loading-gif/images/img16.gif" align="center">'+
				'</div>'
			);
			
			++nextPage;

			$.get('/vote/' + nextPage, function(data) {
				
// 				Remove duplicates from results
				var newElements = $(data).find('#block-content #content #entry-list-ul .entry-item');
				
				newElements.each(function(i) 
				{
					tmpId = parseInt($(this).attr('gagid'));
					
// 					If the id is already shown, delete it.
					if (jQuery.inArray(tmpId, gagBuffer) != -1)
					{
						$(data).find('li[gagid='+tmpId+']').remove();
						console.log('deleted gag');
					}
					else // add it to buffer for later.  
					{
						gagBuffer[i] = tmpId;
						
					}
					
					i++;
				});
				
				$('#entry-list-ul').append($(data).find('#block-content #content #entry-list-ul').html());
				
				
				loading = false;
				$('.mloader').remove();
			});
		}
	});
});