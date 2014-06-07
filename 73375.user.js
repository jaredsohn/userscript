// ==UserScript==
// @name           AYI? [Extended]
// @namespace      http://benpesso.com/gm
// @description    Extends the functionality of the application on Facebook.
// @version        2.0.3
// @date           2011-01-01
// @creator        Ben Pesso
// @include        http://apps.facebook.com/areyouinterested/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


(function() {

ayie = {
	setup: function() {
		//console.log('Initializing...');
		
		ayie.addStyles();
		ayie.addMenu();
		ayie.enableShortcuts();
		ayie.modifyPagination();
	},
	getUrlVars: function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}		return vars;
	},
	addStyles: function() {
		//console.log('Adding Styles...');
		var style = $('head').append('<style media="screen" type="text/css">@import url("http://userscripts.googlecode.com/hg/ayie/ayie.css");</style>');
	},
	addMenu: function() {
		var list = $('<ul id="ayie_actions"></ul>');
		
		// Process Page Button
		var process_button = $('<li><a id="process_page" href="#" title="Process the current page">Process Page [`]</a></li>');
		$('a', process_button).click(function() {
			ayie.processPage();
			return false;
		}).parent().appendTo(list);
		
		// Shortcuts Toggle Button
		var shortcuts_toggle_button = $('<li><a id="toggle_shortcuts" class="disable" href="#" title="Disable AYIE shortcut keys">Disable AYIE shortcut keys</a></li>');
		$('a', shortcuts_toggle_button).click(function() {
			if ($(this).hasClass('disable')) {
				ayie.disableShortcuts();
				$(this).removeClass('disable').addClass('enable').html('Enable AYIE shortcut keys');
			} else 
			if ($(this).hasClass('enable')) {
				ayie.enableShortcuts();
				$(this).removeClass('enable').addClass('disable').html('Disable AYIE shortcut keys');
			}
			return false;
		}).parent().appendTo(list);
		
		$('#app17091798008_header_v2').empty().append(list);
	},
	enableShortcuts: function() {
		$(document).bind('keydown', function(event) {
			// ` = 192
			// P = 80
			//alert(event.keyCode);
			if (event.keyCode == '192') {
				ayie.processPage();
			}
		});
	},
	disableShortcuts: function() {
		$(document).unbind('keypress');
	},
	modifyPagination: function() {
		$('#app17091798008_frame_old #app17091798008_body_container table .pagination_links').wrap('<div class="pagination-wrapper"></div>');
		
		var show_me_dropdown = $('#app17091798008_like_state');
		if(show_me_dropdown.length) {
			var show_me_table = $(show_me_dropdown).parents('table:first');
			var show_me = $('<div class="show-me" />');
			$(show_me).append('<b>Show me: </b>').append(show_me_dropdown);
			$(show_me_table).remove();
			$('.pagination-wrapper:first').prepend(show_me);
		} else {
			$('#app17091798008_frame_old div#app17091798008_body_container table tbody tr td table:first').remove();
		}
	},
	processPage: function() {
		// Add header to 'Your Likes' sidebar
		if (!$('#app17091798008_sidebar .ma_sidebar h2').length) {
			$('#app17091798008_sidebar .ma_sidebar').prepend('<h2>Your Likes</h2>');
		}
		
		// Process images
		ayie.processListItems();
	},
	processListItems: function() {
		//console.log('Attepting to detect and process list items in page.');
		var action = ayie.getUrlVars()['action'];
		var actions = ['who_viewed_me', 'like_state', 'inbox'];
		if($.inArray(action, actions) >= 0) {
			//console.log('Detected action: ' + action);
			$('#app17091798008_listing.user-list .item-result').each(function() {
				var item_id = $(this).attr('id');
				var url = $('#' + item_id + ' div.pic img').attr('src');
				if (url.substr(url.lastIndexOf('.')+1) == 'jpg') {
					$(this).children().not('.actions').css('opacity', '0.2');
					$('#' + item_id + ' div.pic a:first-child, #' + item_id + ' span.vanity-name a, #' + item_id + ' div.actions li.profile a').each(function() {
						var content = $(this).html();
						$(this).replaceWith('<a href="#">' + content + '</a>');
					});
				} else {
					var profile_url = 'http://facebook.com/profile.php?id=' + url.substr(url.lastIndexOf('/')+1);
					// Replace URL for profile image, vanity links and action link.
					$('#' + item_id + ' div.pic a:first-child, #' + item_id + ' span.vanity-name a, #' + item_id + ' div.actions li.profile a').each(function() {
						var content = $(this).html();
						$(this).replaceWith('<a href="' + profile_url + '" target="_blank">' + content + '</a>');
					});
					$('span.vanity-name a:last', this).html('<span style="color: #000000 !important;">Facebook Profile</span>');
				}
			});
			$('#app17091798008_listing.user-list').addClass('processed');
		} else if ($('#app17091798008_browse-panel-image img').length) {
				$('#app17091798008_browse-panel-image img').each(function() {
					var content = $(this).html();
					var url = $(this).attr('src');
					var profile_url = 'http://facebook.com/profile.php?id=' + url.substr(url.lastIndexOf('/')+1);
					$(this).wrap('<a href="' + profile_url + '" target="_blank">' + content + '</a>');
				});
		}
		//console.log('Completed page processing!');
	}
};

$(document).ready(function () {
		// more code using $ as alias to jQuery
		//alert($); // check if the dollar (jquery) function works
		//window.setTimeout(ayie.wait, 200);
		ayie.setup();
	});

})();