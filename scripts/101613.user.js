// ==UserScript==
// @name		  ZenDesk Helper
// @namespace	 
// @version	   2.2.20
// @description   Makes ZenDesk a little more user-friendly.
// @include	   http://*.zendesk.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// ==/UserScript==

// Written by Kevin Lanni

jQuery(function($) {
	// Increased scope of userscript,
	// so limit highlights to "rules" views only
	if (location.pathname.match(/^\/rules.*/)) {
		var my;
		
		// Bold tickets you own
		$('.assignee').each(function(index) {
			my = $(this);
			my.parent('tr').css({
				'font-weight': function() {
					switch (my.text()) {
						// This should now auto-detect your name :)
						case $('#top-right-name').text():
							return 'bold';
							break;
						default:
							return 'normal';
							break;
					}
				}
			});
		});
		
		// Change ticket background based on status
		$('.organization').each(function(index) {
			my = $(this);
			my.css({
				'color': function() {
					switch (my.text()) {
						// Change this to whichever client you are
						// working with, or add additional cases.
						// String should match Org string from ZD
						// CASE SENSITIVE
						case 'Millennial Media':
							// Return #HEX color value
							return '#FF0000';
							break;
						default:
							// Default to black
							return 'black';
							break;
					}
				}
			});
		});
		
		$('.status').each(function(index) {
			my = $(this);
			my.parent('tr').css({
				'background-color': function() {
					switch (my.text()) {
						case 'Open':
						case 'open':
							return '#FFFFBB';
							break;
						case 'New':
						case 'new':
							return '#FFBBBB';
							break;
						default:
							return 'white';
							break;
					}
				}
			});
		});
		
		$('.updated_by_type').each(function(index) {
			my = $(this);
			my.css({
				'color': function() {
					switch (my.text()) {
						case 'User':
						case 'user':
							return '#ff6600';
							break;
						case 'Agent':
						case 'agent':
							return '#0099cc';
							break;
						default:
							return 'black';
							break;
					}
				}
			});
		});
		
		// Hide the text "fade out" image (looks ugly with the custom background-color)
		$('.faded_truncation').hide();
	}
	
	// Hyperlink the view title
	$('h2:first').html('<a href="'+location.href+'">'+$('h2:first').text()+'</a>');
	
	$('<iframe/>',{
		id: '_hidden'
	}).appendTo('body');
	
	$('a[target="_new"]').each(function(i) {
		$(this).css('color','red')
		.click(function(e) {
			e.preventDefault();
			$('iframe#_hidden').prop('src',$(this).prop('href'));
			// $(this).closest().load($(this).prop('href'));
		});
	});
	
//	$('a[target="_new"]:first').click();
	
	// Hacky way of making the right sidebar more readable
	$('.side-box-content').css('background-color','white');
	
	// Copy "My Views" to a new dropdown, for ease of access
	var views = $('.tab_views').not('#user-views'),
		viewsDrop = $('#views-drop'),
		myViews = views.clone(true, true).prop('id','user-views'),
		myViewsDrop = viewsDrop.clone(true, true).prop('id','user-drop');
	myViews.text('My Views').addClass('main clazz').css({
		'color':	'white',
		'font-weight':	'bold',
		'padding':	'7px 15px 10px 15px',
		'text-transform':	'uppercase'
	}).insertAfter(views);
	myViewsDrop.appendTo(myViews).html('').css('text-transform','none');
	views.children('ul').children('li').each(function(i) {
		var si = views.children('ul').children('li[class="drop-header"]').index();
		if (i > si) {
			$(this).clone(true, true).appendTo(myViewsDrop);
		}
	});
	myViews.live('hover', function() {
		myViewsDrop.show();
	}, function() {
		myViewsDrop.hide();
	});
	
	// Bind your macros to keys 1-0 (limit 10)
	var macros = $('#_macro_list').find('ul'),
		si = macros.children('li[class="drop-header"]').index(),
		key = {
			10: 48, // 0
			1: 49,
			2: 50,
			3: 51,
			4: 52,
			5: 53,
			6: 54,
			7: 55,
			8: 56,
			9: 57
		},
		yek = {};
	
	// Bind key combo for macros
	$(document).bind('keydown', function(e) {
		if (e.ctrlKey && e.shiftKey) {
			// Send keycode to runMacro function for reverse lookup
			runMacro(e.keyCode);
		}
	});

	macros.find('li').each(function(i) {
		var my = $(this);
		// Iterate over first 10 custom macros
		if (i > si && i < 10) {
			// Get the offset
			var s = i-si;
			// Create reverse lookup array so we can relocate this element to activate it later
			yek[key[s]] = s;
		}
	});
	
	function runMacro(keyCode) {
		// Do nothing if the keyCode isn't in the reverse lookup array
		if (yek[keyCode]) {
			// Log action and active macro
			console.warn('Activated macro: ',macros.find('li').eq(yek[keyCode]+si+1).click().text());
		}
	}
});

console.log('ZenDesk Helper loaded');