// ==UserScript==
// @name		reddit.com - Keyboard Navigation
// @namespace	v1
// @include		http://www.reddit.com/*
// @exclude		http://www.reddit.com/static/*
// ==/UserScript==


function main()
{

// Script start

	$(function() {

		var keyTranslation = {

			// Navigation
			'38' : 'prevthing',	// [Up]
			'40' : 'nextthing',	// [Down]
			'36' : 'firstthing',// [Home]
			'35' : 'lastthing',	// [End]
			'190': 'nextpage',	// [>]
			'188': 'prevpage',	// [<]

			// Manipulation
			'87' : 'upvote',	// [W]
			'107': 'upvote',	// [+]
			'83' : 'downvote',	// [S]
			'109': 'downvote',	// [-]
			'69' : 'expand',	// [E]
			'45' : 'expand',	// [Insert]
			'46' : 'hide',		// [Delete]
			'72' : 'hide',		// [H]
			'65' : 'hide',		// [A]

			// Open a location
			'13' : 'open',		// [Enter]
			'68' : 'open',		// [D]
			'67' : 'comments',	// [C]
			'70' : 'homepage',	// [F]
			'223': 'homepage',	// [¬]
			'192': 'subreddit',	// [@]
			'73' : 'inbox',		// [I]
			'77' : 'inbox',		// [M]
		};

		var dontCaptureElements = {'INPUT':'','TEXTAREA':'','LABEL':'','SELECT':'','OPTION':'','BUTTON':''};

		function openLink( href, newtab )
		{
			if( !href || href == '' ) return;
			if( newtab ) window.open( href );
			else location.href = href;
		}

		function selectThing( thing )
		{
			$('.last-clicked').removeClass('last-clicked');
			thing.addClass('last-clicked');
			$('html,body').stop().animate({scrollTop: thing.offset().top - 80}, 200);
			return false;
		}

		$(document).focus();
		$(document).keydown(
			function(event)
			{
				if( document.activeElement.tagName in dontCaptureElements ) return;

				var	selected = $('.last-clicked'),
					shift = event.shiftKey;

				switch( keyTranslation[event.which] )
				{
					case 'nextthing':
						var nextThing = selected.next().next();
						if( !nextThing[0] ) nextThing = $('.linklisting:last .thing:first');
						return selectThing( nextThing )

					case 'prevthing':
						var prevThing	= selected.prev().prev();
						if( !prevThing[0] ) prevThing = $('.linklisting:last .thing:last');
						return selectThing( prevThing )

					case 'firstthing':	selectThing( $('.linklisting:last .thing:first') );	return;
					case 'lastthing':	selectThing( $('.linklisting:last .thing:last') );	return;

					case 'upvote':		selected.find('.arrow.up').click();			return;
					case 'downvote':	selected.find('.arrow.down').click();		return;
					case 'expand':		selected.find('.expando-button').click();	return;
					case 'hide':		selected.find('.hide-button a').click();	return;

					case 'homepage':	openLink( '/', shift );						return;
					case 'inbox':		openLink( '/message/inbox/', shift );		return;
					case 'subreddit':	openLink( selected.find('a.subreddit').attr('href'), shift ); return;
					case 'comments':	openLink( selected.find('a.comments').attr('href'), shift ); return;
					case 'nextpage':	openLink( $('.nextprev a[rel~=next]').attr('href'), shift ); return;
					case 'prevpage':	openLink( $('.nextprev a[rel~=prev]').attr('href'), shift ); return;

					case 'open':
						var link = selected.find('a.title').attr('href');
						if( event.ctrlKey )
						{
							window.open( selected.find('a.comments').attr('href') );
							window.open( link );
						}
						else openLink( link, shift );
						return;
				}

				if( event.which > 48 && event.which < 58 )
					openLink( $('.tabmenu a').eq( event.which - 49).attr('href') );
			}
		);
	});

// Script end

}

// Add the script into the main page scope
// (this is a bit of a kludge, but ensures the script works equally well on every browser).
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );