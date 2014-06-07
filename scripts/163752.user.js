// ==UserScript==
// @name           (indev) Barefoot Essentials for GOG.com
// @namespace      http://userscripts.org/users/274735
// @description    Improves gog.com and adds wiki integration
// @include        https://secure.gog.com/*
// @include        http://www.gog.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version        1.10.0.4
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @updateURL      https://userscripts.org/scripts/source/163752.meta.js
// @downloadURL    https://userscripts.org/scripts/source/163752.user.js
// ==/UserScript==

// constants
var branch = 'Barefoot_Monkey/Greasemonkey'
var version = '1.10.0.4'
var default_prev_version = '1.9'

var element_search_interval = 1200

var popup_fade_out_ms = 700
var popup_fade_in_ms = 700

var changelog = [
	{
		version: '1.10.1',
		date: '2013-12-13',
		changes: [
			"The experimental \"Always display shelf/list game count \" feature should now be working correctly. This option requires browser features added in Firefox 14, Chrome 26 and Opera 15, and will have no effect on browsers older than that."
		]
	},
	{
		version: '1.10',
		date: '2013-12-11',
		changes: [
			"New feature: Ability to group together giveaway threads on forums."
		]
	},
	{
		version: '1.9',
		date: '2013-10-27',
		changes: [
			"Options added to ignore game updates, private messages and/or forum replies.",
			"(All that this does is prevent the \"ignored\" updates from counting toward the number in the alert displayed next to \"My Account\" on the top bar. You will still be able to see the updates in the dropdown menu.)",
			"(1.9.1) Wiki links in game cards now correctly handle titles containing \"en\" dashes",
			"(1.9.2) Fixed: bug causing wishlists sent to gogwiki to be limited to 50 items",
			"(1.9.3) Fixed: notifications not being correctly hidden on pages with delayed top navigation bar",
			"(1.9.4) New feature: On the game list and shelf pages, always display the counter indicating the total games and the number of games new/updated. This feature is off by default and marked as experimental for now because I haven't yet had an opportunity to test when there are updates."
		]
	},
	{
		version: '1.8.1',
		date: '2013-10-09',
		changes: [
			"Cursors to indicate that avatars are clickable",
			'"Full-size" avatars now have a limit of 420 pixels in height, and their z-index is raised so that they don\'t go underneath the bottom bookend thingy on the forum',
			"Now clicking on an avatar will also shrink any currently-enlarged avatars back to normal size"
		]
	},
	{
		version: '1.8',
		date: '2013-10-08',
		changes: [
			"Click on an avatar in the forum to view it full-size",
			"3 forum quote styles are available to choose between",
			"Blank lines in and around spoilers are now trimmed",
			"Deeply-nested spoilers now have significantly less padding"
		]
	},
	{
		version: '1.7.1',
		date: '2013-08-22',
		changes: [
			"Fixed: wishlist images on the wiki.",
			"Fixed: wiki links appear on game pages again.",
			"Thanks to adambiser for the patch to handle the recent changes to gog.com"
		]
	},
	{
		version: '1.7',
		date: '2013-07-21',
		changes: [
			"Spoilers! Hotkey Ctrl+L",
			"Fixed: promo link on gamecards used to be unclickable during promotions."
		]
	},
	{
		version: '1.6',
		date: '2013-05-23',
		changes: [
			"Restyle of forum quotes is now optional.",
			"Fixed: wrong preview text colour in new/edit post window when using light forum style."
		]
	},
	{
		version: '1.5',
		date: '2013-05-10',
		changes: [
			"Shortcut keys from quick posts are now also supported in regular post/edit windows",
			"Quick-posting a reply to another post now properly causes a forum reply notification. Due to technical limitations, only the first quote in a quick post generates a notification.",
			"Submit quick post button is now disabled during post, and has a new \"disabled\" style.",
			"Varius CSS changes. Some fixes to changes in light theme, quoted text in dark theme is now closer to its regular colour, and the preview in post/reply window has been reorganised.",
		]
	},
	{
		version: '1.4',
		date: '2013-04-07',
		changes: [
			"This changelog now automatically appears once after each update so that you know when new features are available. Don't worry - I'll add an option to disable this in a future version in case you'd rather not have it keep appearing.",
			'Quick reply added.',
			"New shortcut: ctrl+space to jump to quick post.",
			"New shortcuts: ctrl+I, ctrl+B, ctrl+U and ctrl+Y in quick post to add [i], [b], [u] and [url] tags. (Y is for hYperlink - all the more obvious letters conflicted with some-or-other browser hotkey.)",
			"New shortcut: ctrl+enter in quick post to submit your post.",
			'Style change to quotes and bold text in forum posts. This change will become optional once in the next version.',
			'New, improved parser for generating better previews. Now handles quotes and nested tags, and points out missing/incorrect closing tags.',
			"Improvements to changelog.",
		]
	},
	{
		version: '1.3.5',
		date: '2013-04-01',
		changes: [
			'Inline "Quick Post" feature added.',
			'(1.3.5.2) Changed textbox shrinking behaviour on "Quick Post" to avoid the post button having to be clicked twice.',
			'(1.3.5.3) Fixed ajax regression in wiki sync.'
		]
	},
	{
		version: '1.3.4',
		date: '2013-03-30',
		changes: [
			'Compatibility on ViolentMonkey and Scriptish.'
		]
	},
	{
		version: '1.3.3',
		date: '2013-03-26',
		changes: [
			'Fixed wiki link on KKnD2 gamecard.'
		]
	},
	{
		version: '1.3.2',
		date: '2013-03-09',
		changes: [
			'Live preview when writing a forum post.'
		]
	},
	{
		version: '1.3',
		date: '2013-02-27',
		changes: [
			'Brand new UI system added, along with this changelog. This looks better, and also allow some functions to be moved out of the over-long "My Account" menu.',
			'Username links are now coloured appropriately when using the light colour scheme',
			'Wishlist is now sent to GOGWiki in alphabetical order',
			'Default settings for hiding the navigation bar have been changed (I found that the sliding effect gets old)',
			'Navigation bar no longer hides when you move the mouse away while typing in the search box',
			'Wiki links no longer disappear, due to better handling of elements that appear only after pageload (thanks, adambiser)'
		]
	}
]

defaults = [
	{type:'range', def:0.1, min:0, max:1,  step:0.01, name:'nav-hidden-opacity', label:'Nav opacity'},
	{type:'range', def:  0, min:0, max:30, step:1.00, name:'nav-hidden-offset',  label:'Nav offset'},
	{type:'range', def:0.5, min:0, max:5,  step:0.10, name:'nav-fade-out-time',  label:'Seconds for nav to fade out'},
	{type:'range', def:0.5, min:0, max:5,  step:0.10, name:'nav-fade-in-time',   label:'Seconds for nav to fade in'},
	{type:'range', def:0.8, min:0, max:5,  step:0.10, name:'nav-slide-out-time', label:'Seconds for nav to hide'},
	{type:'range', def:  1, min:0, max:5,  step:0.10, name:'nav-slide-in-time',  label:'Seconds for nav to appear'},
	{type:'options', def: 'default', name:'quote-style',  label:'Forum quote style', options: ['default', 'regular gog.com style', 'easy-to-read']},
	{type:'options', def: 'no', name:'ignore-new-updates',  label:'Ignore game updates'},
	{type:'options', def: 'no', name:'ignore-new-messages',  label:'Ignore private messages'},
	{type:'options', def: 'no', name:'ignore-new-replies',  label:'Ignore forum replies'},
	{type:'options', def: 'normal (none)', name:'giveaway-thread-grouping',  label:'Giveaway thread grouping', options: ['normal (none)', 'above other threads', 'above and collapsed', 'below other threads']},
	{type:'options', def: 'no', name:'always-show-shelf-and_list-count',  label:'Always display shelf/list game count (EXPERIMENTAL)'}
]



var last_BE_version = GM_getValue('last_BE_version')
if (last_BE_version === undefined) last_BE_version = default_prev_version


function new_popup() {
	var bg = $('<div>').addClass('BE-popup-bg').hide().fadeIn(popup_fade_in_ms).appendTo(document.body);
	var popup = $('<div>').addClass('BE-popup').appendTo(bg);
	
	popup.onclose = function() {return true}
	bg.click(function(event) {
		if (event.target === this) {
			var popup = $(this).find('.BE-popup')
			var onclose = popup.data('onclose')
			if ((onclose === undefined) || onclose())
				$(this).fadeOut(popup_fade_out_ms, function() {$(this).remove()})
		}
	})
	
	return popup;
}

var settings = {
	get: function(name) {
		return GM_getValue(name);
	},
	set: function(name, value) {
		return GM_setValue(name, value.toString());
	},
	callbacks: [],
	change: function(callback) {
		if (callback === undefined) {
			for (i in this.callbacks) this.callbacks[i]()
		} else this.callbacks.push(callback)
	},
	initialise: function(defaults) {
		defaults.forEach(function(item) {
			var value = GM_getValue(item.name)
			if (value === undefined) GM_setValue(item.name, item.def.toString())
		})
	},
	show: function(defaults) {
		var popup = new_popup();
		
		popup.append(
			$('<h1>').text('Configure Barefoot Essentials')
		)

		defaults.forEach(function(item) {
		
			switch (item.type) {
			case 'options': {
				var select = $('<select>')
				
				if (item.options) {
					for (i in item.options) {
						select.append($('<option>').text(item.options[i]))
					}
				} else select.append(
					$('<option>').attr('value', 'yes').text('Yes'),
					$('<option>').attr('value', 'no').text('No')
				)
				popup.append(
					$('<p>').append(
						$('<label>').text(item.label),
						select
						.val(settings.get(item.name))
						.change((function(item) {
							return function() {
								var newval = $(this).val()
								//if (newval == 'yes' || newval == 'no') {
									settings.set(item.name, newval)
									settings.change()
								//}
							}
						})(item))
					)
				)
			} break;
			default:
				popup.append(
					$('<p>').append(
						$('<label>').text(item.label),
						$('<input>').val(settings.get(item.name))
						.change((function(item) {
							return function() {
								var newval = parseFloat($(this).val())
								if (newval >= item.min && newval <= item.max) {
									settings.set(item.name, newval)
									settings.change()
								}
							}
						})(item))
					)
				)
			}
		})
	}
}

settings.initialise(defaults)


function show_settings() {
	settings.show(defaults)
}

function cmpVersion(a, b) {
    var i, cmp, len, re = /(\.0)+[^\.]*$/;
    a = (a + '').replace(re, '').split('.');
    b = (b + '').replace(re, '').split('.');
    len = Math.min(a.length, b.length);
    for( i = 0; i < len; i++ ) {
        cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
        if( cmp !== 0 ) {
            return cmp;
        }
    }
    return a.length - b.length;
}

function show_changelog() {
	var popup = new_popup();
		
	popup.append(
		$('<h1>').text('Barefoot Essentials Changelog')
	)
	
	var old_versions = $('<div class="older-changes">').hide()

	changelog.forEach(function(entry) {
		var p = $('<p>')
		.text("Version " + entry.version)
		.append($('<small>').text(" - released on " + entry.date))
		
		var list = $('<ul>').addClass('changelog')
		
		entry.changes.forEach(function(change) {
			$('<li>').html(change).appendTo(list)
		})
		
		if (entry.version == version || cmpVersion(last_BE_version, entry.version) < 0) {
			popup.append(p, list)
		} else {
			old_versions.append(p, list)
		}
	})
	if (old_versions.children().length > 0) {
		var older = $('<p>').append($('<a>').html('older changes&hellip;').click(function() { old_versions.slideToggle() }))
		popup.append(older, old_versions)
	}
}




// determine forum skin
var forum_skin = 0;
function detect_forum_skin() {
	var body_bg = $('body').css('background-image');
	if (body_bg.indexOf("gog.com/www/forum_alu/-img/body_bg.") >= 0) forum_skin = 1;
	else forum_skin = 0;
}
	
function rules() {
	var result = ''
	for (var i = 0; i+1 < arguments.length; i += 2) {
		result += arguments[i] + ' {'
		var properties = arguments[i+1]
		for (var j = 0; j + 1 < properties.length; j += 2) {
			result += properties[j] + ": " + properties[j+1] + ";"
		}
		result += '}'
	}
	return result
}

function add_styles() {
	// add stylesheet modifications to the page
	$('<style>').attr("type", "text/css").appendTo($("head"))
	.text(rules(
		'.spot_h:first-child+.BE-fullsize-avatar', [
			'margin-top', '13px',
		],
		'.BE-fullsize-avatar', [
			'box-shadow', '1px 1px 3px 0px #000000',
			'z-index', '101',
			'margin-left', '12px',
			'margin-top', '30px',
			'max-height', '420px',
			'cursor', 'zoom-out',
			'position', 'absolute'
		],
		'.b_p_avatar_h img', [
			'cursor', 'zoom-in',
		],
		'.BE-spoiler', [
			'height', '0',
			'display', 'none'
		],
		'.BE-spoiler.BE-visible', [
			'height', 'auto',
			'display', 'block',
			'border', '1px solid '+((forum_skin==0)?"#676767": "#9a9a9a"),
			'padding', '1em',
			'margin', '1em',
			'background', ((forum_skin==0)?"#585858": "#D7D7D7"),
			'border-radius', '0.5em'
		],
		'.BE-spoiler .BE-spoiler .BE-spoiler.BE-visible', [
			'padding', '1em 5px',
			'margin', '1em 1px'
		],
		'.older-changes', [
			'overflow', 'hidden'
		],
		'button.BE-button::-moz-focus-inner,'+
		'button.submit-quick-post::-moz-focus-inner', [
			'border', 'none'
		],
		'button.BE-button:focus,'+
		'button.submit-quick-post:focus', [
			'color', '#ffffff'
		],
		'button.BE-button:hover,'+
		'button.submit-quick-post:hover', [
			'background', 'linear-gradient(#303030, #393939) repeat scroll 0 0 transparent',
			'background', ((forum_skin==0)?"-webkit-linear-gradient(#303030, #393939)": "-webkit-linear-gradient(#959595, #646464)")+' repeat scroll 0 0 transparent',
			'background', ((forum_skin==0)?"linear-gradient(#303030, #393939)": "linear-gradient(#959595, #646464)")+' repeat scroll 0 0 transparent'
		],
		'button.BE-button:active,'+
		'button.submit-quick-post:active', [
			'background', ((forum_skin==0)?"#4c4c4c": "")
		],
		'button.BE-button:disabled,'+
		'button.submit-quick-post:disabled', [
			'background', 'linear-gradient(#757575, #828282) repeat scroll 0 0 transparent',
			'box-shadow', 'none',
			'color', '#525252'
		],
		'button.BE-button,'+
		'button.submit-quick-post', [
			'background', ((forum_skin==0)?"-webkit-linear-gradient(#393939, #434343)": "-webkit-linear-gradient(#646464, #959595)")+' repeat scroll 0 0 transparent',
			'background', ((forum_skin==0)?"linear-gradient(#393939, #434343)": "linear-gradient(#646464, #959595)")+" repeat scroll 0 0 transparent",
			'border', 'medium none',
			'border-radius', '12px 12px 12px 12px',
			'color', ((forum_skin==0)?"#BEBEBE": "#F0F0F0"),
			'font-family', 'arial, sans-serif',
			'font-size', '11px',
			'font-weight', 'normal',
			'line-height', '25px',
			'cursor', 'pointer',
			'margin', '10px 0',
			'display', 'block',
			'padding', '0 15px',
			'vertical-align', 'middle',
			'transition', 'color 0.3s ease'
		],
		'.big_post_h:hover .BE-quick-reply', [
			'display', 'inline-block'
		],
		'.BE-quick-reply', [
			'background', ((forum_skin==0)?"-webkit-linear-gradient(#656566, rgba(101, 101, 102, 0))": "-webkit-linear-gradient(#E5E5E5, rgba(229, 229, 229, 0))"),
			'background', ((forum_skin==0)?"linear-gradient(#656566, rgba(101, 101, 102, 0))": "linear-gradient(#E5E5E5, rgba(229, 229, 229, 0))"),
			'border-radius', '3px 3px 3px 3px',
			'color', ((forum_skin==0)?"#E0E0E0": "#606060"),
			'display', 'none',
			'height', '23px',
			'margin', '8px 0 0',
			'padding-top', '4px',
			'text-align', 'center',
			'text-shadow', ((forum_skin==0)?"0px 1px 1px #333333": "none"),
			'width', '60px',
			'cursor', 'pointer'
		],
		'.post_text span.bold, .preview b', [
			'font-weight', '800'
		],
		'div.submit', [
			'float', 'right',
			'clear', 'none',
			'overflow', 'visible',
			'padding', '11px 3px 0 0'
		],
		'div.files', [
			'float', 'left',
			'width', '460px',
			'overflow', 'hidden',
			'height', 'auto'
		],
		'.preview .syntax-warning', [
			'background', '#6F3E3E',
			'border-radius', '5px 5px 5px 5px',
			'color', '#DBDBDB',
			'display', 'inline-block',
			'font-size', '11px',
			'font-weight', 'normal',
			'font-style', 'normal',
			'font-family', 'monospace, sans-serif',
			'margin', '0 5px',
			'padding', '0 2px'
		],
		'.preview blockquote', [
			'border-left', '1px solid #929292',
			'padding', '0 0 0 8px',
			'margin', '0'
		],
		'.quick_post textarea:invalid', [
			'box-shadow', 'none',
			'height', '30px'
		],
		'.quick_post > textarea:invalid ~ *', [
			'opacity', '0'
		],
		'.quick_post > *', [
			'transition', 'opacity ease 0.5s'
		],
		'.quick_post', [
			'background', 'url("'+((forum_skin==0)?"/www/forum_carbon/-img/post_bg.851b4700.gif": "/www/forum_alu/-img/post_bg.b7d2258c.gif")+'") repeat-x scroll 0 -161px transparent',
			'border-radius', '5px 5px 5px 5px',
			'margin', '0 auto',
			'min-height', '90px',
			'overflow', 'hidden',
			'padding', '2px 12px',
			'width', '926px'
		],
		'.quick_post h1', [
			'color', ((forum_skin==0)?'#aaa': '#878787'),
			'font-family', '"Lucida Grande",Arial,Verdana,sans-serif',
			'font-size', '10px',
			'font-weight', 'normal',
			'margin', '10px 0 0 58px',
			'clear', 'both'
		],
		'.preview a', [
			  'background', 'url("'+((forum_skin==0)?"/www/forum_carbon/-img/post_un.a8689b98.gif":"http://static.gog.com/www/forum_alu/-img/zig_underl.8b625731.gif")+'") repeat-x scroll center bottom transparent',
			  'color', ((forum_skin==0)?'#DBDBDB':'#4C4C4C')
		],
		'.quick_post .preview', [
			'margin', '0 0 0 168px',
			'padding', '3px',
			'width', '751px',
			'height', 'auto',
			'overflow', 'hidden'
		],
		'.preview', [
			'height', '150px',
			'overflow', 'auto',
			'margin', '0 0 0 143px',
			'padding', '5px',
			'clear', 'both',
			'width', '650px',
			'word-wrap', 'break-word',
			'color', ((forum_skin==0)?'#DBDBDB':'#4C4C4C'),
			'transition', 'height 0.5s ease 0s',
			'font-family', 'Arial',
			'font-size', '12px'
		],
		'.quick_post textarea:focus, .quick_post textarea:hover', [
			'border', '1px solid '+((forum_skin==0)?'#DBDBDB': '#4C4C4C')
		],
		'.quick_post textarea:focus', [
			'height', '150px'
		],
		'.quick_post textarea', [
			'background', 'none repeat scroll 0 0 '+((forum_skin==0)?'#676767': '#D1D1D1'),
			'border', '1px solid '+((forum_skin==0)?'#929292': '#929292'),
			  'color', ((forum_skin==0)?'#DBDBDB':'#4C4C4C'),
			'height', '150px',
			'transition', 'height 0.5s ease 0s',
			'margin', '0 0 5px 168px',
			'padding', '2px',
			'width', '751px',
			'font-family', 'Arial',
			'font-size', '12px'
		],
		'.game_top .wiki_link', [
			  'top', '417px',
			  'position', 'absolute',
			  'right', '23px',
			  'text-align', 'center',
			  'width', '253px'
		],
		'.text_1, .text_1_bad', [
			'height', '180px'
		],
		'.BE-popup small', [
			'color', '#ccc',
			'font-size', 'small'
		],
		'.BE-popup-bg + .BE-popup-bg .BE-popup', [
			'background', 'none repeat scroll 0 0 rgba(0,0,0,0.9)'
		],
		'.BE-popup', [
			'box-shadow', '0 3px 25px 1px black',
			'background', 'none repeat scroll 0 0 rgba(0,0,0,0.6)',
			'border', '12px solid rgba(255, 255, 255, 0.3)',
			'border-radius', '10px 10px 10px 10px',
			'color', '#eee',
			'margin', '30px auto 0',
			'padding', '2em 1em',
			'width', '800px',
			'font-family', "'Trebuchet MS', Arial, Sans-Serif"
		],
		'.BE-popup h1', [
			'border-bottom', ' 1px solid white',
			'border-top', ' 1px solid white',
			'font-size', ' 17pt',
			'font-weight', ' normal',
			'margin-bottom', ' 1em',
			'padding', ' 0.4em 0 0.4em 2em'
		],
		'.BE-popup label', [
			'display', ' block',
			'float', ' left',
			'width', ' 300px',
			'padding-right', ' 1em',
			'text-align', ' right'
		],
		'.BE-popup-bg + .BE-popup-bg', [
			'background', 'transparent'
		],
		'.BE-popup-bg', [
			'position', 'fixed',
			'top', '0',
			'bottom', '0',
			'left', '0',
			'right', '0',
			'background', 'rgba(0, 0, 0, 0.5)',
			'background', '-webkit-linear-gradient(transparent, transparent 20px, rgba(0, 0, 0, 0.5) 60px, rgba(0, 0, 0, 0.5))',
			'background', 'linear-gradient(transparent, transparent 20px, rgba(0, 0, 0, 0.5) 60px, rgba(0, 0, 0, 0.5))',
			'z-index', '1000',
			'color', 'cyan',
			'font-size', '12pt',
			'padding', '2em',
			'overflow-y', 'auto'
		],
		'.BE-popup p', [
			'margin', '0.7em 0'
		],
		'.BE-popup a', [
			'color', '#ffff00',
			'text-decoration', 'none'
		],
		'.BE-popup input, .BE-popup select', [
			'border-radius', '5px 5px 5px 5px',
			'padding', '3px 5px',
			'box-shadow', '-1px -1px 5px 0px black inset',
			'width', '163px'
		],
		'.BE-popup select', [
			'border', 'none',
			'padding-right', '10px',
			'width', '173px'
		],
		'.BE-popup a:hover', [
			'color', '#ffff00',
			'text-decoration', 'underline'
		],
		'.BE-popup ul', [
			'list-style', 'disc',
			'padding-left', '1em'
		],
		'.BE-status', [
			'color', '#40ff40'
		],
		'.BE-status.error', [
			'color', '#ff4040'
		],
		'.b_u_name a', [
			'color', ((forum_skin==0)?"#ffffff": "#4C4C4C")
		],
		'.nav_barefoot_essentials:hover .nav_text', [
			'color', '#F2F2F2',
			'text-shadow', '0 1px rgba(0, 0, 0, 0.35)'
		]
	))
}

function restyle_quotes() {
	var quote_stylesheet = $('<style type="text/css">').text(
		rules(
			'.post_text_c div.quot', [
				'font-style', 'normal'
			],
			'.post_text_c div.quot:not(.gog_color),'
			+'.post_text_c div.quot:not(.gog_color) a,'
			+'.post_text_c div.quot:not(.gog_color) span.bold,'
			+'.preview blockquote,'
			+'.preview blockquote a', [
				'color', ((forum_skin==0)?'#A8A8A8':'#686868')
			]
		)
	)
	.appendTo(document.head)
	
	var on_restyle_change = function() {
		switch (settings.get('quote-style')) {
			case 'easy-to-read': {
				quote_stylesheet.text(rules(
					'.post_text_c div.quot div.quot', [
						'background', 'transparent'
					],
					'.post_text_c div.quot', [
						'font-style', 'normal',
						'padding', '2px 5px 2px 7px',
						'background', ((forum_skin==0)?'rgba(0, 0, 0, 0.1)':'rgba(255, 255, 255, 0.2)')
					],
					'.post_text_c div.quot:not(.gog_color),'
					+'.post_text_c div.quot:not(.gog_color) a,'
					+'.post_text_c div.quot:not(.gog_color) span.bold,'
					+'.preview blockquote,'
					+'.preview blockquote a', [
						'font-size', '12px'
					]
				))
			} break
			case 'default': {
				quote_stylesheet.text(rules(
					'.post_text_c div.quot', [
						'font-style', 'normal'
					],
					'.post_text_c div.quot:not(.gog_color),'
					+'.post_text_c div.quot:not(.gog_color) a,'
					+'.post_text_c div.quot:not(.gog_color) span.bold,'
					+'.preview blockquote,'
					+'.preview blockquote a', [
						'color', ((forum_skin==0)?'#A8A8A8':'#686868')
					]
				))
			} break
			default: quote_stylesheet.text('')
		}
		//if (settings.get('restyle-quotes') == 'yes') quote_stylesheet.appendTo(document.head)
		//else quote_stylesheet.remove()
	}
	settings.change(on_restyle_change)
	on_restyle_change()
}

function post_preview_html(source) {
	var tokenexp = /\[\/?(?:[ibu]|(?:url(?:=[^\n\]]*)?|quote(?:_[0-9]*)?))\]/g
	
	var text_tokens = source.split(tokenexp)
	if (!text_tokens) text_tokens = []
	var tag_tokens = source.match(tokenexp)
	if (!tag_tokens) tag_tokens = []
	
	var text_i = 0, tag_i = 0
	var tag_stack = []
	var preview = ""
	var top_tag = null
	var ignore_first_linebreak = false;
	
	while (true) {
		if (text_i < text_tokens.length) {
		
			var text_token = text_tokens[text_i++]
			.replace(/&/g, '&amp;')
			.replace(/\>/g, '&gt;')
			.replace(/\</g, '&lt;')
			.replace(/\n/g, '<br/>')
			
			preview += ignore_first_linebreak ? text_token.replace(/^<br\/>/, '') : text_token
			
		} else break;
		
		if (tag_i < tag_tokens.length) {
		
			var tag = tag_tokens[tag_i++].match(/^\[(\/?)([^=_\]]*)(?:[=_](.*))?\]/)			
			if (tag[2] === undefined) continue
			
			ignore_first_linebreak = false
			
			if (tag[1] == '/') {
			
				if (!!top_tag) {
					preview += top_tag.closing
					
					if (top_tag.tag == 'quote') ignore_first_linebreak = true
					
					if (tag[2] != top_tag.tag)
					preview += '<span class="syntax-warning">[/'+top_tag.tag+']</span>';
					
					top_tag = tag_stack.pop()
				}
				
			} else {
				tag_stack.push(top_tag)
				switch (tag[2]) {
					case 'i': {
						preview += '<i>'
						top_tag = {
							tag: tag[2],
							closing: '</i>'
						}
					} break;
					case 'b': {
						preview += '<b>'
						top_tag = {
							tag: tag[2],
							closing: '</b>'
						}
					} break;
					case 'u': {
						preview += '<u>'
						top_tag = {
							tag: tag[2],
							closing: '</u>'
						}
					} break;
					case 'quote': {
						preview += '<blockquote>';
						ignore_first_linebreak = true
						top_tag = {
							tag: tag[2],
							closing: '</blockquote>'
						}
					} break;
					case 'url': {
						preview +=  (tag[3] === undefined)? '<a href="">' : ('<a href="'+encodeURI(tag[3])+'">');
						top_tag = {
							tag: tag[2],
							closing: '</a>'
						}
					} break;
					default: top_tag = tag_stack.pop();
				}
			}
		}
	}

	while (!!top_tag) {
		preview += top_tag.closing
		preview += '<span class="syntax-warning">[/'+top_tag.tag+']</span>';
		top_tag = tag_stack.pop()
	}

	return preview
}

function show_preview() {
	$('.preview').html(post_preview_html($('.quick_post textarea, form#f_text>textarea#text').val()))
}

function parse_node(node) {
	switch (node.nodeType) {
		case 3: { // text node
			return node.nodeValue
		}
		case 1: { // element
			
			var result = ""
			var after = ""
			
			if (node.tagName == 'BR') return "\n"
			else if (node.tagName == 'DIV') {
				if (node.classList.contains('post_text_c')) {
				} else return ""
			} else if (node.tagName == 'A') {
				result = "[url="+encodeURI(node.getAttribute('href'))+"]"
				after = "[/url]"
			} else if (node.tagName == 'I') {
				result = "[i]"
				after = "[/i]"
			} else if (node.tagName == 'SPAN') {
				if (node.classList.contains('podkreslenie')) {
					result = "[u]"
					after = "[/u]"
				} else if (node.classList.contains('bold')) {
					result = "[b]"
					after = "[/b]"
				} else return ""
			} else return ""
			
			
			var child = node.firstChild
			while (!!child) {
				result += parse_node(child)
				child = child.nextSibling
			}
			
			return result + after
		}
	}
	return ""
}

function parse_post(post) {
	return parse_node(post.find('.post_text_c')[0])
}

function add_quick_reply() {
	$('.p_button_right_h').each(function() {
		$('<div class="BE-quick-reply">')
		.text('quick reply')
		.appendTo(this)
		.click(function() {
		
			window.scrollTo(0, $('.quick_post').position().top)
			
			var textarea = $('.quick_post textarea').focus()
			
			var quoted = $(this).closest('.big_post_h')
			var quote_nr = quoted.find('.post_nr').text()
			
			var val = textarea.val()
			textarea.val(
				((val.length==0)?"":(val+"\n\n"))
				+ '[quote_'+quote_nr+']'
				+ parse_post(quoted)
				+'[/quote]\n'
			)
			
			show_preview()
		})
	})
}

function submit_quick_post() {
	if (location.pathname == "/forum/ajax/popUp") {
		$('.kontent>.submit>div.gog_btn:first-child').click()
	} else {
		var post_text_e = $('.quick_post textarea')
	
		if (post_text_e.length < 1 || post_text_e.val() == '') return
	
		var post_text = post_text_e.val()
		var reply_to = post_text.match(/\[quote_([0-9]+)\]/)
		var reply_to_pid = (reply_to === null) ? undefined : reply_to[1]
					
		$('.submit-quick-post')[0].disabled = true
					
		// submit the post
		$.ajax({
			type:"POST",
			url:"/forum/ajax",
			timeout:15000,
			data:{
				a:"addPost",
				f:$("#f").val(),
				f_arr:$("#f_arr").val(),
				w:$("#w").val(),
				pid:reply_to_pid,
				text:post_text,
				added_images_ids:"",
				added_images_names:"",
				kap:undefined,
				guest_name:undefined,
				btn:"0"
			}
		})
		.done(function(data, textStatus, jqXHR){
			var response = JSON.parse(data)
			if (response.error) {
				alert("A problem occurred while submitting this Quick Post. Try again using a regular post.")
				console.log(data)
				$('.submit-quick-post')[0].disabled = false
			} else {
				window.location = response.result
			}
		})
		.fail(function(data, textStatus, jqXHR){
			$('.submit-quick-post')[0].disabled = false
			alert("A problem occurred while submitting this Quick Post. Try again using a regular post.")
		})
	}
}

function tag_input_text(input, begin_tag, end_tag) {
	var start = input.selectionStart, end = input.selectionEnd
	input.value = (
		input.value.substring(0, start) 
		+ begin_tag
		+ input.value.substring(start, end)
		+ end_tag
		+ input.value.substring(end)
	)
						
	input.selectionStart = start + begin_tag.length
	input.selectionEnd = end + begin_tag.length
}

function post_keydown_handler(event) {
	if (event.ctrlKey && !event.repeat) {
		switch (event.which) {
			case 66:
			case 98: tag_input_text(this, '[b]', '[/b]'); break
					
			case 85:
			case 117: tag_input_text(this, '[u]', '[/u]'); break
					
			case 73:
			case 105: tag_input_text(this, '[i]', '[/i]'); break
					
			case 76:
			case 108: tag_input_text(this, '\n\n[spoiler]\n\n\n\n', '\n\n\n\n[/spoiler]\n\n'); break
					
			case 81:
			case 113: tag_input_text(this, '[quote]', '[/quote]'); break
					
			case 89:
			case 122: {
				event.stopPropagation();
				var selected_text = this.value.substring(this.selectionStart, this.selectionEnd)
						
				var url = prompt("Enter the URL for the link", selected_text)
				if (!!url) {
					tag_input_text(this, '[url='+encodeURI(url)+']', '[/url]')
				}
				break
			}
					
			case 13: {
				submit_quick_post();
//				event.stopPropagation();
				break
			}
					
			default: return true
		}
				
		show_preview()
				
		return false
	}
}


function add_quick_post() {
	var last_post = $('.spot_h:last')
	if (last_post.length > 0) {
		var new_post = $('<textarea required>')
		var preview = $('<p class="preview">')
		var post_button = $('<button class="submit-quick-post">').text('submit quick post')
		
		$('<div>')
		.addClass('quick_post')
		.append(
			$('<h1>').text('Quick Post'),
			new_post,
			
			$('<div class="submit">')
			.append(
				post_button
			),
			
			$('<h1>').text('Preview'),
			preview
		)
		.insertAfter(last_post)

		// handle shortcut keys in quick post
		new_post.keydown(post_keydown_handler)
		
		// refresh the preview on quic post input
		new_post[0].addEventListener('input', show_preview)
		
		post_button.click(submit_quick_post)
	}
	
	$(document).keydown(function(event) {
		if (event.ctrlKey && !event.repeat && event.which == 32) {
			window.scrollTo(0, $('.quick_post').position().top)
			$('.quick_post textarea').focus()
			return false
		}
	})

}




function convert_currencies() {
	var price_e = $('.ab_top.normal>p:first-child')
	if (price_e.length > 0) {
		var matches = price_e.text().match(/buy for \$([0-9]*\.[0-9])/)
		console.log(matches)
		
		//$('.ab_top').text().match(/\(\$([0-9]*\.[0-9]*)\)/)
		//$('.ab_bot').text().match(/\(\$([0-9]*\.[0-9]*)\)/)
		// .ab_top
		// .bundle__price-old -- front page
		// .bundle__price-new -- front page
		// .price
		// 
		/*
			promo page
				#totalPrice
				#totalSave
				.price
				
			checkout
				.total_count
				.price
				#orderTotal
				
			gamecards
				.ab_top.normal p span
				.ab_top.promo p span:first-child
				.ab_top.promo p span:nth-child(2)
				.ab_bottom
				
			catalogue
			wishlist
				.price
		*/
	}
}


function replace_usernames_with_wiki_links() {
	$('.big_user_info .b_u_name').each(function() {
	    var div = $(this)
	    var name = div.text()
	    div.text("")
	    
	    $("<a>")
	    .text(name)
	    .attr("href", "http://www.gogwiki.com/wiki/Special:GOGUser/"+escape(name))
	    .attr("target", "_blank")
	    .appendTo(div)
	})
 }
 
 function update_notification_display() {
	var forumCount = document.querySelector('#topUserForumCount')
	var msgCount = document.querySelector('#topUserMsgCount')
	var gamesCount = document.querySelector('#topUserGamesCount')
		
	forumCount = forumCount ? parseInt(forumCount.textContent) : 0
	msgCount = msgCount ? parseInt(msgCount.textContent) : 0
	gamesCount = gamesCount ? parseInt(gamesCount.textContent) : 0

	var sum = 0
	if (!isNaN(forumCount) && settings.get('ignore-new-replies') == 'no') sum += forumCount
	if (!isNaN(msgCount) && settings.get('ignore-new-messages') == 'no') sum += msgCount
	if (!isNaN(gamesCount) && settings.get('ignore-new-updates') == 'no') sum += gamesCount

	var topCount_element = document.querySelector('#topUserNotCount')
	if (topCount_element) {
		topCount_element.textContent = sum
		if (sum > 0) {
			$(topCount_element).removeClass('invisible')
		} else {
			$(topCount_element).addClass('invisible')
		}
	}
}


function autohide_nav_bar() {
	$('#topMenuSearchInput')
	.focus(function() {
		$('#mainNav').addClass('searching')
	})
	.blur(function() {
		$('#mainNav').removeClass('searching')
	})
	
 	var update_nav_bar_interval = 1500

	var menustyle_element = $('<style>').attr("type", "text/css").appendTo($("head"))
	

	var reconfigure_menu_style = function() {
		var menustyle_text = "#mainNav {"
		+ "-webkit-transition: opacity " + settings.get('nav-fade-out-time') + "s ease-in, top " + settings.get('nav-slide-out-time') + "s ease;"
		+ "transition: opacity " + settings.get('nav-fade-out-time') + "s ease-in, top " + settings.get('nav-slide-out-time') + "s ease;"
		+ "opacity: 1;"
		+ "top: 0px;"
		+ "}"

		+ "#mainNav.no_messages {"
		+ "opacity: " + settings.get('nav-hidden-opacity') + ";"
		+ "top: -" + settings.get('nav-hidden-offset') + "px;"
		+ "}"

		+ "#mainNav:hover, #mainNav.searching {"
		+ "-webkit-transition: opacity " + settings.get('nav-fade-in-time') + "s ease-out, top " + settings.get('nav-slide-in-time') + "s ease;"
		+ "transition: opacity " + settings.get('nav-fade-in-time') + "s ease-out, top " + settings.get('nav-slide-in-time') + "s ease;"
		+ "opacity: 1;"
		+ "top: 0;"
		+ "}"

		menustyle_element.text(menustyle_text)
	}

	settings.change(reconfigure_menu_style)
	reconfigure_menu_style()
	
	var main_nav = $('#mainNav')
	function update_nav_bar() {
	
		try {
			var hide_nav_bar = true
			if (!$('.nav_cart_in').hasClass('invisible')) hide_nav_bar = false
			if (!$('#topUserNotCount').hasClass('invisible')) hide_nav_bar = false
			
			main_nav.toggleClass('no_messages', hide_nav_bar)
			
			setTimeout(update_nav_bar, update_nav_bar_interval)
		} catch (exception) {
			console.log(exception.message)
		}
	}
	setTimeout(update_nav_bar, update_nav_bar_interval)
}

function add_wiki_link_to_gamecard() {
	if (window.location.pathname.search(/\/(?:..\/)?game\//) >= 0) {
	
		function update_gamecard() {
		
			var container = $(".game_top")
			
			if (container.length>0) {
			
				var title = $('meta[property="og:title"]').attr('content')
					.replace(/[\u2122\u00ae\u2018]/g, '')
					.replace("\u2019", "'")
					.replace("\u2013", "-")
					.replace(/^(.*), The/, 'The $1')
						
			  	var wiki_url = "www.gogwiki.com/wiki/"+escape(title)
					
				$("<a>")
					.text("More info at the community wiki")
					.attr("href", "http://" + wiki_url)
					.attr("target", "_blank")
					.addClass("vdark_un")
					.appendTo(
						 $("<p>").addClass('wiki_link').appendTo(container)
					)
			}
		}
		update_gamecard()
	}
}

function open_wiki_profile() {
	var popup = new_popup()
	popup.append($('<p>').text('Please wait while your wiki page is opened').append('&hellip;'))

	GM_xmlhttpRequest({
		method: "GET",
		url:'https://secure.gog.com/en/account/settings',
		onload:function(response) {

			var match = /<span class="nickname">[\t\n ]*([^ \t\n<]*)/.exec(response.responseText)
			if (match.length > 1) {
				var nickname = match[1]

				window.location = ('http://www.gogwiki.com/wiki/Special:GOGUser/' + nickname)
			} else {
				popup
				.append($('<p>').text('Hmm, for some reason I can\'t figure out your username. Perhaps GOG.com has been changed and this script is out-of-date.'))
			}
		},
		onerror:function() {
			popup
			.append($('<p>').text('There was a network problem while searching for your page. Maybe try again later.'))
			.append($('<p>').text('In the meantime, click anywhere to dismiss this message.'))
		}
	})
}

function sync_collection() {
	var popup = new_popup()
	popup.data('onclose', function() { return false })

	var status_account = $('<span>').addClass('BE-status')
	var status_list = $('<span>').addClass('BE-status')
	var status_wishlist = $('<span>').addClass('BE-status')
	var status_shelf = $('<span>').addClass('BE-status')
	var status_sending= $('<span>').addClass('BE-status')
	var status_purging = $('<span>').addClass('BE-status')

	var data = {
		branch: branch,
		version: version,
		games: [],
		wishlist: []
	}
	var games = {}

	function getgame(id) {
		var game = games[id]
		if (game === undefined) {
			game = {id:id}
			games[id] = game
		}
		return game
	}

	function write_fragment(fragment, element) {
		switch (typeof(fragment)) {
			case 'string': {
				element.append(fragment)
				break;
			}
			case 'object': {
				if (fragment instanceof Array) {
					for (var i = 0; i < fragment.length; i += 1) {
						write_fragment(fragment[i], element)
					}
				} else {
					var link = fragment.link
					var text = fragment.text
					if (link && text) element.append(
						$('<a>').attr('href', link).attr('target', '_blank').text(text)
					)
				}
				break;
			}
		}
	}
	function write(paragraphs) {
		for (var i = 0; i < paragraphs.length; i += 1) {
			var p = $('<p>').appendTo(popup)
			write_fragment(paragraphs[i], p)
		}
	}

	function shelf_url(page, order, timestamp) { return "https://secure.gog.com/en/account/ajax?a=gamesShelfMore&p="+page+"&s="+order+"&q=&t="+timestamp }
	function list_url(page, order, timestamp) { return "https://secure.gog.com/en/account/ajax?a=gamesListMore&p="+page+"&s="+order+"&q=&t="+timestamp }
	function wishlist_url(page, order, timestamp) { return "https://secure.gog.com/en/account/ajax?a=wishlistSearch&p="+page+"&s="+order+"&q=&t="+timestamp }

	var timestamp = (new Date()).getTime()

	semaphore = function(countdown, callback) {
		return {
			countdown:countdown,
			callback:callback,
			release: function() {
				if (--this.countdown == 0) this.callback()
			}
		}
	}
			
	purge_user_page = function() {
		status_purging.text("In Progress")
		GM_xmlhttpRequest({
			url:'http://www.gogwiki.com/wiki/Special:GOGUser/'+escape(data.gogname)+'/purge',
			method:'POST',
			data: $.param(data),
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			onload: function(response) {
				status_purging.text("Done")
			},
			onerror:function() {
				status_purging.text("Error (not serious)").addClass('error')
			}
		})
	}
	send_information = semaphore(4, function() {
		status_sending.text("In Progress")

		for  (var i in games) {
			data.games.push(games[i])
		}

		GM_xmlhttpRequest({
			url:'http://www.gogwiki.com/wiki/Special:GOGSync',
			method:'POST',
			data: $.param(data),
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			onload: function(response) {
				status_sending.text("Done")
				purge_user_page()
				try {
					write(JSON.parse(response.responseText))
				} catch (exception) {
					popup.append($('<p>').append("Oops - it looks like some kind of server error happened. Your data was sent but we cannot tell whether GOGWiki stored it correctly."))
				}
				popup.data('onclose', function() { return true })
			},
			onerror:function() {
				status_sending.text("Error").addClass('error')
				popup.data('onclose', function() { return true })
			}
		})
	})

	function collect_list() {
		status_list.text("In Progress")
		var position = 0

		function read_page(order, page) {
			GM_xmlhttpRequest({
				method: "GET",
				url: list_url(page, order, timestamp),
				onload:function(response) {
					var json = $.parseJSON(response.responseText)

					if (json.count > 0) {
						var html = $(json.html.replace(/src=/g, "alt="))
						html.each(function() {
							var e = $(this)
							var game_id = e.attr('id')
							if (game_id === undefined) return
							game_id = game_id.replace('game_li_', '')
							var game = getgame(game_id)
							game.thumb_url = e.find('img.list_image').attr('alt')
							game.title = e.find('.game-title-link').text().trim().replace(/ ?[\u00AE\u2122]/g, '').replace(/^(.*), The$/, 'The $1')
							game.list_pos = position++
						})

						status_list.text(position + " games counted so far")
						read_page(order, page + 1)
					} else {
						status_list.text("Done")
						send_information.release()
					}
				},
				onerror:function() {
					status_list.text("Error").addClass('error')
					popup.data('onclose', function() { return true })
				}
			})
		}

		GM_xmlhttpRequest({
			method: "GET",
			url:"https://secure.gog.com/en/account/games/list",
			onload:function(response) {
				var html = $(response.responseText.replace(/src=/g, 'alt='))

				var order = html.find('input#account_list_order').val()
				read_page(order, 1)
			},
			onerror:function() {
				status_list.text("Error").addClass('error')
				popup.data('onclose', function() { return true })
			}
		})
	}
			
	function collect_shelf() {
		status_shelf.text("In Progress")
		var position = 0

		function read_page(order, page) {
			GM_xmlhttpRequest({
				method: "GET",
				url: shelf_url(page, order, timestamp),
				onload:function(response) {
					var json = $.parseJSON(response.responseText)

					if (json.count > 0) {
						var html = $(json.html.replace(/src=/g, "alt="))
						html.each(function() {
							var e = $(this)
							var game_id = e.attr('data-gameid')
							if (game_id === undefined) return
							var game = getgame(game_id)

							game.index = e.attr('data-gameindex')
							game.box_url = e.find('img.shelf_game_box').attr('alt')
							game.shelf_pos = position++
						})

						status_shelf.text(position + " games counted so far")
						read_page(order, page + 1)
					} else {
						status_shelf.text("Done")
						send_information.release()
					}
				},
				onerror:function() {
					status_shelf.text("Error").addClass('error')
					popup.data('onclose', function() { return true })
				}
			})
		}

		GM_xmlhttpRequest({
			method: "GET",
			url:"https://secure.gog.com/en/account/games/shelf",
			onload:function(response) {
				var html = $(response.responseText.replace(/src=/g, 'data-src='))

				var order = html.find('input#account_shelf_order').val()
				read_page(order, 1)
			},
			onerror:function() {
				status_shelf.text("Error").addClass('error')
			}
		})
	}
	function get_account_information() {
		status_account.text("In Progress")
		GM_xmlhttpRequest({
			method: "GET",
			url:'https://secure.gog.com/en/account/settings',
			onload:function(response) {
				var html = $(response.responseText.replace(/src=/g, "alt="))

				data.avatar_url = html.find('.avatar').attr('alt')
				data.gogname = html.find('.nickname').text().trim()
				data.days = html.find('.days span').text()
				data.birthday = 0.001 * Date.parse(
					html.find('#accountEditBdaySpan').text() + " " + html.find('#accountEditBmonthSpan').text() + " " + html.find('#accountEditByearSpan').text()
				)

				status_account.text("Done")
				send_information.release()
			},
			onerror:function() {
				status_account.text("Error").addClass('error')
				popup.data('onclose', function() { return true })
			}
		})
	}
	function collect_wishlist() {
		status_wishlist.text("In Progress")
		var position = 0

		function read_page(page) {
			GM_xmlhttpRequest({
				method: "GET",
				url: wishlist_url(page, 'date', timestamp),
				onload:function(response) {
					var json = $.parseJSON(response.responseText)
					position += json.count

					if (json.count > 0) {
						var html = $(json.html.replace(/src=/g, "data-src="))
						html.each(function() {
							var img = $(this).find('.game-item-img')
							var info = $(this).find('.on-wishlist')
							var title = img.attr('alt')
							var wish = {
								thumb_url: img.attr('data-src'),
								sort_title:title.replace(/ ?[\u00AE\u2122]/g, ''),
								title:title.replace(/ ?[\u00AE\u2122]/g, '').replace(/^(.*), The$/, 'The $1'),
								index:info.attr('data-gameindex')
							}
							data.wishlist.push(wish)
						})

						status_wishlist.text(position + " games counted so far")
						read_page(page + 1)
					} else {
						status_wishlist.text("Done")
						send_information.release()
					}
				},
				onerror:function() {
					status_shelf.text("Error").addClass('error')
					popup.data('onclose', function() { return true })
				}
			})
		}

		read_page(1)
	}

	popup.append($('<p>').text('Collecting information to send to your profile on the wiki. Please wait').append('&hellip;'))
	popup.append(
		$('<ul>')
		.append($('<li>').text('Reading account information').append('&hellip; ').append(status_account))
		.append($('<li>').text('Reading games from wishlist').append('&hellip; ').append(status_wishlist))
		.append($('<li>').text('Reading games from shelf').append('&hellip; ').append(status_shelf))
		.append($('<li>').text('Reading games from list').append('&hellip; ').append(status_list))
		.append($('<li>').text('Sending information to www.gogwiki.com').append('&hellip; ').append(status_sending))
		.append($('<li>').text('Refreshing your user page').append('&hellip; ').append(status_purging))
	)
			
	collect_wishlist()
	collect_shelf()
	collect_list()
	get_account_information()
}

function show_welcome() {
	var popup = new_popup();
		
	popup.append(
		$('<h1>').text('Barefoot Essentials'),
		$('<p>').append($('<a>').text('Configure Barefoot Essentials').click(show_settings)),
		$('<p>').append($('<a>').text('View changelog').click(show_changelog)),
		$('<p>').append($('<a>').text('Open your user page in GOGWiki').click(open_wiki_profile)),
		$('<p>').append($('<a>').text('Sync your game collection to GOGWiki').click(sync_collection))
	)
}

function update_account_menu() {

	// preparation
	var accountmenu = null
	if ($('#mainNav .nav_user .nav_link_in .nav_text').text().trim() == "My Account") {
		accountmenu = $('#mainNav .nav_user .nav_dropdown_in')
	} else {
		setTimeout(update_account_menu, element_search_interval)
		return
	}

	//
	// instant "Account" and "Browse Games" dropdowns
	//
	$('.nav_item:not(.nav_search)').mouseover(function() {
		 var item = $(this)
		 var hoverclass = item.attr('data-hoverclass')
		 $('#mainNav').addClass(hoverclass)
		 item.addClass('expanded')
	})

	// ignore notifications specified in options
	update_notification_display()
	settings.change(update_notification_display)


	//
	// direct links to shelf and game list
	//
	if (accountmenu !== null) {

		var updated_count = $('#topUserGamesHolder')
		
		// Add "My Gifts"
		$('<a>')
		  .addClass('nav_row')
		  .attr("href", "https://secure.gog.com/account/gifts")
		  .append(
				$('<span>')
					 .addClass("white_un")
					 .text("My Gifts")
				)
		  .prependTo(accountmenu)

		 // Add "My Wishlist"
		 $('<a>')
			  .addClass('nav_row')
			  .attr("href", "https://secure.gog.com/en/account/wishlist")
			  .append(
					$('<span>')
						 .addClass("white_un")
						 .text("My Wishlist")
					)
			  .prependTo(accountmenu)

		 // Add "My Games"
		 var my_games = $('<a>')
			  .addClass('nav_row')
			  .attr("href", "https://secure.gog.com/en/account/games/list")
			  .append(
					$('<span>')
						 .addClass("white_un")
						 .text("My Games")
					)
			  .prependTo(accountmenu)

		 // Add "My Shelf"
		 var my_shelf = $('<a>')
			  .addClass('nav_row')
			  .attr("href", "https://secure.gog.com/en/account/games/shelf")
			  .append(
					$('<span>')
						 .addClass("white_un")
						 .text("My Shelf")
					)
			  .prependTo(accountmenu)

		 // Remove existing "My Games
		 accountmenu.find(".nav_row[href$='/account/games']").remove()
		 
		 if (updated_count.length > 0) {
			my_games.append(updated_count.clone())
			my_shelf.append(updated_count)
		 }
	}

	if (accountmenu !== null) {
	 $('<a>')
		  .addClass('nav_row')
		  .append(
				$('<span>')
				 .addClass("white_un")
				 .text("Barefoot Essentials")
			)
		  .appendTo(accountmenu)
		  .click(function(event) {
				event.preventDefault()
				show_welcome();
		  })
	}
}

function hide_spoilers() {
	function traverse_to_hide_spoilers(parent) {
	    function toggle_spoiler() {
	        var visible = !$(this).data('visible')
	        $(this).data('visible', visible)
	        if (visible) {
	            $(this).text("hide spoiler")
	            .next("div.BE-spoiler").addClass('BE-visible')
	        } else {
	            $(this).text("show spoiler")
	            .next("div.BE-spoiler").removeClass('BE-visible')
	        }
	    }
	    var openings = []
	    for (var n = parent.firstChild; n !== null; n = n.nextSibling) {
	        if (n.nodeType == 3) {
	            
	            if (/^\s*\[spoiler\]\s*$/.test(n.nodeValue)) {
	                openings.push(n)
	            } else if (/^\s*\[\/spoiler\]\s*$/.test(n.nodeValue)) {
	            	var opening = openings.pop()
	            	if (opening === null) continue
	            	
	                var spoiler_button = $('<button class="BE-button">')
	                .text("show spoiler")
	                .click(toggle_spoiler)
	                .insertBefore(opening)
	                var spoiler_content = $('<div class="BE-spoiler">')
	                .insertAfter(spoiler_button)
	                
	                var next = opening.nextSibling
	                for (nn = opening; nn !== null; nn = next) {
	                    next = nn.nextSibling
	                    parent.removeChild(nn)
	                    if (nn !== opening && nn !== n) spoiler_content.append(nn)
	                    if (nn === n) break
	                }
	                
	                n = spoiler_content.get(0)
	            }
	        } else if (n.nodeType == 1) {
	        	traverse_to_hide_spoilers(n)
	        }
	    }
	}

	$('.post_text_c').each(function() {
	    if (0 <= this.textContent.indexOf('[spoiler]')) {
	        traverse_to_hide_spoilers(this)
	    }
	})
	
	// remove all extra linebreaks around spoilers
	$('.BE-button').each(function() {
		for (var prev = this.previousSibling; prev; prev = this.previousSibling) {
		
			if (prev.nodeType == 1) {
				if (prev.nodeName != 'BR') break
			} else if (prev.nodeType == 3) {
				if (!/^[\s]*$/.test(prev.nodeValue)) break
			} else break
			this.parentElement.removeChild(prev)
		}
	})
	$('.BE-spoiler').each(function() {
	
		// strip after the spoiler
		for (var next = this.nextSibling; next; next = this.nextSibling) {
		
			if (next.nodeType == 1) {
				if (next.nodeName != 'BR') break
			} else if (next.nodeType == 3) {
				if (!/^[\s]*$/.test(next.nodeValue)) break
			} else break
			this.parentElement.removeChild(next)
		}
		
		// strip the front
		for (var next = this.firstChild; next; next = this.firstChild) {
			if (next.nodeType == 1) {
				if (next.nodeName != 'BR') break
			} else if (next.nodeType == 3) {
				if (!/^[\s]*$/.test(next.nodeValue)) break
			} else break
			this.removeChild(next)
		}
		// strip the tail
		for (var next = this.lastChild; next; next = this.lastChild) {
			if (next.nodeType == 1) {
				if (next.nodeName != 'BR') break
			} else if (next.nodeType == 3) {
				if (!/^[\s]*$/.test(next.nodeValue)) break
			} else break
			this.removeChild(next)
		}
	})
}

function provide_full_size_avatars() {
	$('.b_p_avatar_h img').click(function() {
		var img = $(this)
		var src = img.attr('src')

		if (!img.data('BE-zoomed')) {
		
			img.data('BE-zoomed', true)
			
			// clear all fullsize avatars
			$('.BE-fullsize-avatar').data('BE-thumb', null).remove()
			$('.b_p_avatar_h img').data('BE-zoomed', false)
		
			var post = img.closest('.spot_h')
			
			var fullsize = $('<img alt="" class="BE-fullsize-avatar">')
			.attr('src', src.replace(/_t\.jpg$/, '.jpg'))
			.insertBefore(post)
			.one('click', function() {
				$(this).data('BE-thumb').data('BE-zoomed', false)
				$(this).data('BE-thumb', null)
				$(this).remove()
			})
			
			fullsize.data('BE-thumb', img)
			
		}
	})
}

function always_show_shelf_and_list_count() {
	if (settings.get('always-show-shelf-and_list-count') == 'yes') {
		
		switch (location.pathname) {
			case '/account/games/shelf':
			case '/account/games/list':
			case '/account/games':
			case '/account':

			try {
				var observer = new MutationObserver(function(mutations) {
		
					mutations.forEach(function(mutation) {
					
						var target = mutation.target
					
						if (mutation.attributeName == 'class') switch (target.className) {
							case 'middle_btns': {
								if (!(target.childElementCount > 0)) {
							
									// count games
									var num_games = document.querySelectorAll('#shelfGamesList .shelf_game').length
			
									// add hidden games
									var hidden_e = document.querySelector('.shelf_main.bottom .shelf_header .shelf_label .count')
									if (hidden_e) {
										var matches = hidden_e.textContent.match(/\(([0-9]+)\)/)
										if (matches && matches.length > 1) num_games += parseInt(matches[1])
									}
							
									document.querySelector('#tagButtons').innerHTML = '<span class="shelf_btn css3pie new tag-btn">NEW &amp; UPDATED <span class="count">0</span></span><span class="shelf_btn css3pie all active tag-btn">ALL <span class="count">'+num_games+'</span></span>'
								}
							} break;
							case 'list_header': {
								if (!(target.childElementCount > 0)) {
							
									// count games
									var num_games = document.querySelectorAll('#gamesList .game-item, #hiddenGamesList .game-item').length
							
									document.querySelector('#tagButtons').innerHTML = 'My collection <span class="list_btn css3pie new tag-btn">NEW &amp; UPDATED <span class="count">0</span></span><span class="list_btn css3pie all active tag-btn">ALL <span class="count">'+num_games+'</span></span>'
								}
							} break;
						}
					})
			
				})
				observer.observe(document.querySelector('#tagButtons'), {attributes: true})
			} catch (exception) {
				// no action necessary
			}
		}
	}
}

function capture_giveaways() {
	// IN PROGRESS
	var setting = settings.get('giveaway-thread-grouping')
	
	if (setting != 'normal (none)') {
		if (
			/\/forum\/[^/]*$/.test(window.location.pathname)
			||
			/\/forum\/[^/]*\/page[0-9]+$/.test(window.location.pathname)
		) {
			var giveaway_topics = $('<div class="favourite_h">')
	
			var list = $('<div class="list_row_h">')
	
			var giveaway_count = 0

			$('#t_norm').find('a.topic_s_a').each(function() {
				if (/giveaway[^/]*$/.test(this.getAttribute('href'))) {
					var row = $(this).closest('.list_row_odd')
					row.remove().appendTo(list)
					giveaway_count += 1
				}
			})
	
			if (giveaway_count > 0) {
		
				var bar = $('<div class="list_bar_h">')
				.append(
					$('<div class="lista_icon_3">'),
					$('<div class="lista_bar_text">').text("Topics which appear to be giveaways ("+giveaway_count+")")
				)
				.click(function() {
					$(this).siblings('.list_row_h').slideToggle()
				})
				.css('cursor', 'pointer')
			
				giveaway_topics
				.append(bar, list)
				
				switch (setting) {
					case 'below other threads':
						giveaway_topics.insertAfter($('#t_norm'))
						$('#t_norm .list_bottom_bg').remove().appendTo(giveaway_topics)
						break
					case 'above and collapsed':
						giveaway_topics.children('.list_row_h').hide()
						// fallthrough
					case 'above other threads':
						// fallthrough
					default:
						giveaway_topics.insertBefore($('#t_norm'))
				}
			}
		}
	}
}

$(function() {

	always_show_shelf_and_list_count()
	
	detect_forum_skin()

	add_styles()

	add_quick_reply()

	add_quick_post()
	
	capture_giveaways()

	replace_usernames_with_wiki_links()

	provide_full_size_avatars()

	autohide_nav_bar()

	add_wiki_link_to_gamecard()

	//$('#mainNav .nav_user a.nav_link_in[href$="/account"]')
	update_account_menu()

	restyle_quotes()

	//convert_currencies()

	hide_spoilers()

	// add preview to post windows
	if (location.pathname == "/forum/ajax/popUp") (function() {
		var message = document.getElementById('text')
		var preview = $('<p class="preview">').insertAfter($('.kontent>.submit'))
	
		var refresh_preview = function() {
			var text = post_preview_html(message.value)
		
			preview.html(text)
		}
	
		$(message).keydown(post_keydown_handler)
		message.addEventListener('input', refresh_preview)
	
		$('.btn_h>.btn').click(refresh_preview)
	
		refresh_preview()
	})()

})


// check version, and show changelog if new
if (cmpVersion(last_BE_version, version) < 0) {
	show_changelog()
}
GM_setValue('last_BE_version', version)


// ctrl+alt+shift+B 
$(document).keydown(function(event) {
	if (event.altKey && event.ctrlKey && event.shiftKey && !event.repeat && event.which == 66) {
		GM_setValue('last_BE_version', prompt('set last version', default_prev_version))
		return false
	}
})
