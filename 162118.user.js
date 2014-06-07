// ==UserScript==
// @name		FiMFiction Enhancer
// @namespace	tiger
// @include		http*://fimfiction.net/*
// @include		http*://www.fimfiction.net/*
// @include		http*://mobile.fimfiction.net/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version		0.9.3
// @grant		GM_getValue
// @grant		GM_setValue
// ==/UserScript==

// Version 0.9.3:
// * Added option to turn off automatic loading of more feed items on feed page
// * Fixed script not working on https and mobile
// * Fixed images not expanding on the first comment page on blog posts
// 
// Version 0.9.2:
// * Fixed first image overwriting all subsequent images (.attr() only gave first element's value)
// * Set images to only stretch to 100%, and not beyond the page's width
// 
// Version 0.9.1:
// * Fixed images not expanding on next comment pages (Added hook to XHR for this)
// 
// Version 0.9:
// * Initial release

// Adds a setting on the Settings Page for the user to set
// catnr:	The number of the category the setting will be appended to
// name:	The name of the setting
// defval:	The default value of the setting
// label:	The description of the setting
// type:	The type of the setting (select or checkbox)
// values:	For select, an object with all the available options (key->value)
function AddSetting(catnr, name, defval, label, type, values) {
	var $elem;
	switch (type) {
		case 'checkbox':
			$elem = $('<tr><td class="label">' + label + '</td><td><div><input type="checkbox"' +
				' id="fim-enh-' + name + '"' + (GM_getValue(name, defval) ? ' checked' : '') +
				'></div></td></tr>');
			break;
		case 'select':
			var text = '<tr><td class="label">' + label + '</td><td><div><select id="fim-enh-' + name + '">';
			for (var key in values) {
				text += '<option value="' + key + '"' + (GM_getValue(name, defval) == key ? ' selected' : '') + '>' +
					values[key] + '</option>';
			}
			text += '</select></div></td></tr>';
			$elem = $(text);
			break;
		default: return;
	}
	$('#local_site_settings .section_header').eq(catnr + 1).parent().before($elem);
}

// Removes a parameter segment from a GET URL
// link:	The url to alter
// key:		The key to remove
function RemoveFromLink(link, key) {
	if (!link) return null;
	var querystr = link.slice(link.indexOf('?') + 1);
	var data = querystr.split('&');
	for (var i = 0; i < data.length; i++) {
		if (data[i] == key || data[i].indexOf(key + '=') == 0) {
			data.splice(i, 1);
			return link.slice(0, link.indexOf('?') + 1) + data.join('&');
		}
	}
	return link;
}

// Add a reverse function to jQuery
jQuery.fn.reverse = [].reverse;
$(document).ready(function() {
	// If we are on the settings page, add the available settings
	if (window.location.href.indexOf("local_settings") >= 0) {
		// Wether to hide the mark all read button
		AddSetting(0, 'hidemarkallread', true, 'Hide Mark All Read Button', 'checkbox', { });
		// Default sorting
		AddSetting(0, 'defsort', 'updated', 'Default Sorting', 'select', {
			latest: 'First Posted Date',
			heat: 'Hot',
			updated: 'Update Date',
			top: 'Rating',
			views: 'Views',
			words: 'Word Count',
			comments: 'Comments'
		});
		// Wether to expand the story summary
		AddSetting(0, 'expandsummary', 'story', 'Expand Story Summary', 'select', {
			never: 'Never',
			story: 'On the Story\'s page',
			always: 'Always'
		});
		// Wether to expand chapter lists
		AddSetting(0, 'expandchapters', 'story', 'Expand Chapter List', 'select', {
			never: 'Never',
			story: 'On the Story\'s page',
			always: 'Always'
		});
		// Wether to expand images in comments
		AddSetting(0, 'expandimages', 'smiley', 'Expand Comment Images', 'select', {
			never: 'Never',
			smiley: 'Only Smileys',
			always: 'Always'
		});
		// Wether to stop autoloading on feeds page
		AddSetting(0, 'feedstopautoload', false, 'Don\'t load older feed items automatically', 'checkbox', { });
		
		// Save the settings when you click the save button
		$('#local_site_settings .form_submitter').click(function() {
			GM_setValue('hidemarkallread', $('#fim-enh-hidemarkallread').attr('checked'));
			GM_setValue('defsort', $('#fim-enh-defsort').val());
			GM_setValue('expandsummary', $('#fim-enh-expandsummary').val());
			GM_setValue('expandchapters', $('#fim-enh-expandchapters').val());
			GM_setValue('expandimages', $('#fim-enh-expandimages').val());
			GM_setValue('feedstopautoload', $('#fim-enh-feedstopautoload').attr('checked'));
			
			// Update the page, so all Settings get used immediately
			Update();
		});
	}
		
	function Update() {
		// Get ReadLater-List-Button and update it's link
		var $rl_link1 = $('.user_toolbar .inner .user_drop_down_menu:eq(1) > a');
		$rl_link1.attr('href', RemoveFromLink($rl_link1.attr('href'), 'order') +
			'&order=' + GM_getValue('defsort', 'updated'));
		
		// Also update the button on the bottom of the dropdown list
		var $rl_link2 = $($('.user_toolbar .inner .user_drop_down_menu:eq(1) a').reverse()[0]);
		$rl_link2.attr('href', RemoveFromLink($rl_link2.attr('href'), 'order') +
			'&order=' + GM_getValue('defsort', 'updated'));
		
		// Update the Link to the Favorites
		var $fav_link1 = $('.user_toolbar .inner .user_drop_down_menu:eq(2) > a');
		$fav_link1.attr('href', RemoveFromLink($fav_link1.attr('href'), 'order') +
			'&order=' + GM_getValue('defsort', 'updated'));
		
		// Update the Link to all Favorites
		var $fav_link2 = $('.user_toolbar .inner .user_drop_down_menu:eq(2) a').eq(1);
		$fav_link2.attr('href', RemoveFromLink($fav_link2.attr('href'), 'order') +
			'&order=' + GM_getValue('defsort', 'updated'));
		
		// Hide or Show the Mark-All-Read button under Favorites
		if (GM_getValue('hidemarkallread', true))
			$('.user_toolbar .inner .user_drop_down_menu:eq(2) a').eq(2).hide(); else
			$('.user_toolbar .inner .user_drop_down_menu:eq(2) a').eq(2).show();
	}
	Update();
	
	// These following settings are irrelevant on the settings page, so we don't need to apply them immediately
	
	// Expand a story's summary
	if (GM_getValue('expandsummary', 'story') == 'always' ||
		(GM_getValue('expandsummary', 'story') == 'story' && window.location.pathname.indexOf('/story') == 0)) {
		$('.story .more_button').addClass('description_expanded').hide();
		$('.story .description').addClass('description_full');
	}
	
	// Expand chapter lists
	if (GM_getValue('expandchapters', 'story') == 'always' ||
		(GM_getValue('expandchapters', 'story') == 'story' && window.location.pathname.indexOf('/story') == 0)) {
		$('.story .chapter_expander').hide();
		$('.story .chapter_container_hidden').removeClass('chapter_container_hidden');
	}
	
	// Comment pages work via XHR, so we need to expand images whenever the comment page changes
	// Cache the option, the function is not available in this context
	var expandimages = GM_getValue('expandimages', 'smiley');
	function ExpandImages() {
		// Expand images
		// Only Smileys is not yet supported...
		if (expandimages == 'always') {
			var $link = $('.comment_data .user_image_link');
			$.each($link, function(k, v) {
				var img = $(v).attr('href');
				$(v).hide().after('<img style="max-width: 100%;" src="' + img + '" alt=""/>')
					.parent().css({'padding-bottom': 0, 'max-width': '100%'});
			});
		}
	}
	
	// Execute at least 1 time at the beginning
	ExpandImages();
	
	// Attach the event to the original jQuery object
	unsafeWindow.$(document).ajaxSuccess(function(e, xhr, opt) {
		if (opt.url.indexOf('fetch_comments.php') >= 0) {
			ExpandImages();
		}
	});
	
	if (window.location.href.indexOf('feed') >= 0) {
		// On feeds page, don't load more items automatically it set
		if (GM_getValue('feedstopautoload', false)) {
			unsafeWindow.$(window).unbind('scroll');
			var $btn = $('<a class="styled_button" href="javascript:void(0);">Load Older Feed Items</a>');
			$btn.click(function() {
				unsafeWindow.LoadOlderFeed();
				$('#feed_end_marker').show();
				setTimeout(function() {
					$('#feed_end_marker').hide();
				}, 2000);
			});
			$('#feed_end_marker').hide().after($btn).parent().css('text-align', 'center');
		}
	}
});