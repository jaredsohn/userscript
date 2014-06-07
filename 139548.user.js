// ==UserScript==
// @name           Reddit - Links and comments in tab (for dual view)
// @namespace      http://userscripts.org/users/421568
//
// @description	   Creates a new tab and opens all links in that tab. (For browsing Reddit in dual view.) Also hides sidebar for comment pages. Supports RES. For Chrome & Firefox. 
//
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
//
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//
// @version		   0.0.4
// ==/UserScript==

var redditTab;

function openTab(url)
{
	if (!redditTab)
		redditTab = window.open( url, "redditTab" );
	else
		redditTab.location = url;
	
	return false;
}

function updateLinks()
{
	$('a.thumbnail, a.title').click(function(e)
	{
		return openTab($(this).attr('href'));
	});
	
	
	$('a.comments').click(function(e)
	{
		return openTab($(this).attr('href') + '#nosidebar');
	});
	
    //For images inserted by RES
	$('a.expando-button, a#viewImagesButton').click(function (event)
	{
		var resLink = $('a img.RESImage').parent();
		resLink.mousedown(function(e)
		{
			$(document).data('isClick', true);
            setTimeout(function() {$(document).data('isClick', false);},200);
		});
		
		resLink.mouseup(function(e)
		{
			if ($(document).data('isClick'))
				return openTab($(this).attr('href'));
		});
        
		resLink.click(function(e)
		{
			return false;
		});
        		
	});
	
}


$(function ()
{
	
	updateLinks();
	
	if (location.hash == '#nosidebar')
	{
		
		$('#header\-bottom\-right, .side, .footer-parent').hide();
		$('.infobar').hide();
		$('.usertext-edit, .usertext-edit textarea').css( 'width','450px' );
		$('.panestack\-title, .menuarea').css( 'margin','0 10px' );
		
	}
	//auto-paging
	//progressIndicator is used by RES, neverendingreddit
	if($("#progressIndicator").length!=0 )
	{
		document.body.addEventListener('DOMNodeInserted', function(event)
		{
			if ((event.target.tagName === 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') !== -1))
			{
				updateLinks();
			}
		}, true);
	}
});