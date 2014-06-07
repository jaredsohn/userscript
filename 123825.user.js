// ==UserScript==
// @name          Mint Refresh
// @namespace     http://tylian.net/
// @version       0.1.20
// @description   Auto-refreshes RainbowDash Network's timelines, and enhances some features.
// @include       http://rp.rainbowdash.net/*
// @include       http://rainbowdash.net/*
// @copyright     2011+, Tylian
// ==/UserScript==

//-----------------------------------------------------------------------------
// Settings

var options = {
	'isPaused': false,														// Update the timeline?
	'refreshDelay': 10000,												// Refresh delay
	'highlightMentions': true,										// Should it highlight mentions?
	'highlightColor': 'rgba(27, 89, 224, 0.2)',		// Colour of mention highlights
	'parseBBCode': true,													// Should it parse bbcodes?
	'extraRequests': true,												// Should it send extra requests for more information
	'moderator': false														// Is the user a moderator?
}

// List of auto detected moderators
var moderators = ['mrdragon', 'colfax', 'ceruleanspark', 'purpletinker', 'cabal', 'redenchilada' ,'scribus' ,'communistprime', 'ecmc', 'thelastgherkin', 'minti', 'widget'];

// Script update check
var SUC_script_num = 123825;
var SUC_local_version = '0.1.20';
var SUC_script_name = 'Mint Refresh';

//-----------------------------------------------------------------------------
// Global values

// Some base urls to make parsing easier
var baseUrl = 'http://' + window.location.hostname;

// Fetch the jQuery object.
var $ = unsafeWindow.jQuery;

// Some globals that are used throught the script
var noticeElement = $('#notices_primary > ol');
var scriptTimer = false;

var noticeList = [];
var noticeTime = [];

var favoriteToken = '';

var windowTitle = document.title;
var isWindowFocused = true;
var userMentioned = false;
var newNotices = 0;

var currentUser = '';

var timelineUrl = '';

//-----------------------------------------------------------------------------
// Precompiled lists

// Regex used to parse each bbcode
var bbcodeList = [
	[/\[b\](.*?)\[\/b\]/ig, '<strong>$1</strong>'],
	[/\[i\](.*?)\[\/i\]/ig, '<em>$1</em>'],
	[/\[u\](.*?)\[\/u\]/ig, '<u>$1</u>'],
	[/\[s\](.*?)\[\/s\]/ig, '<span style="text-decoration: line-through;">$1</span>'],
	[/\[c=([#a-zA-Z0-9]+)\](.*?)\[\/c\]/ig, '<span style="color: $1;">$2</span>'],
	[/\[h=([#a-zA-Z0-9]+)\](.*?)\[\/h\]/ig, '<span style="background-color: $1;">$2</span>']
];

// List of bbcode buttons, not counting spoiler one
var bbButtonList = [
	['B', 'Bold', 'font-weight: bold;', '[b]', '[/b]'],
	['I', 'Italic', 'font-style: italic;', '[i]', '[/i]'],
	['U', 'Underline', 'text-decoration: underline;', '[u]', '[/u]'],
	['S', 'Strike-through', 'text-decoration: line-through;', '[s]', '[/s]'],
	['C', 'Colourize text', 'color: blue;', '[c=blue]', '[/c]'],
	['<span style="background-color: yellow">H</span>', 'Highlight Text', '', '[h=yellow]', '[/h]']
];

// Used in the relative date text
var dateLimits =	[
	[0, 60, 0, 'a few seconds ago'],
	[60, 120, 0, 'about a minute ago'],
	[120, 3600, 60, 'about $1 minutes ago'],
	[3600, 7200, 0, 'about an hour ago'],
	[7200, 86400, 3600, 'about $1 hours ago'],
	[86400, 172800, 0, 'about a day ago'],
	[172800, 2592000, 86400, 'about $1 days ago'],
	[2592000, 5184000, 0, 'about a month ago'],
	[5184000, 31536000, 2592000.4, 'about $1 months ago'],
	[31536000, 63072000, 0, 'about a year ago'],
	[63072000, 157680000, 31536000, 'about $1 years ago'],
	[157680000, Number.MAX_VALUE, 0, 'eons ago']
];

//-----------------------------------------------------------------------------
// Entry point of script

// Tampermonkey Vs Greasemonkey hack.
var chrome = typeof TM_addStyle == 'function';

// Start fetching!
initScript()
if(!options.isPaused && !unsafeWindow['RDNDIE']) {
	scriptTimer = setInterval(fetchTimeline, options.refreshDelay);
}

//-----------------------------------------------------------------------------
// Core functions

// Fetches needed variables, sets needed styles, etc. etc.
function initScript() {
	// Load all settings
	loadSettings();

	// Add the initial CSS styles to the page
	updateStyles();

	// Do some variable state init
	noticeElement.children('li.hentry').each(function() {
		id = $(this).attr('id');
		noticeList.push(id.substr(id.lastIndexOf("-") + 1));

		timestamp = $(this).find('.timestamp > abbr').attr('title');
		noticeTime.push(new Date(timestamp).getTime());
	});

	favoriteToken = $('#token-' + noticeList[0]).val();

	// Below stuff only works if the user is logged in.
	if($('#notice_data-text-label').length > 0) {
		currentUser = $('#notice_data-text-label').text().substr(11);
		currentUser = currentUser.substr(0, currentUser.length - 1);

		for(var x = 0; x < moderators.length; x++) {
			if(currentUser.toLowerCase() == moderators[x]) {
				options.moderator = true;
				break;
			}
		}

		// Highlight all initial mentions
		highlightMentions(currentUser);

		// Add spoiler button
		var bbSpoiler = $('<a href="#" class="bbcode-button" style="margin-right: 0.5em" title="ROT13 encode the selected text.">Spoiler</a>').click(function(event) {
			event.preventDefault();
			event.stopPropagation();

			var sel = $('#notice_data-text').getSelection();
			$('#notice_data-text').focus().replaceSelectedText(sel.text.rot13()).setSelection(sel.start, sel.end);

			if (!($('#notice_data-text').val().match(/#spoiler/))) {
					$('#notice_data-text').val($('#notice_data-text').val() + " #spoiler");
			}
		});

		$('#form_notice').append(bbSpoiler);

		// Add the rest of the bccode buttons
		var bbButton;
		for(var i = 0; i < bbButtonList.length; i++) {
			bbButton =	$('<a href="#" class="bbcode-button" style="' + bbButtonList[i][2] + '" title="' + bbButtonList[i][1] + '">' + bbButtonList[i][0] + '</a>').click(makeButtonHandler(bbButtonList[i][3], bbButtonList[i][4]));
			$('#form_notice').append(bbButton);
		}

		// Make sure that when the text box is cleared, the reply ID is cleared too
		var eventHandler = function() { if($(this).val().length == 0) $('#notice_in-reply-to').val(''); };
		$('#notice_data-text').change(eventHandler).keyup(eventHandler);

		// Kill the local version of a notice that's pushed onto the timeline (Thanks @ponydude)
		unsafeWindow.SN.U.belongsOnTimeline = function() {
			forceUpdate();
			return false;
		}
	}

	// Add the initial rot13 buttons
	$('.notice-options').prepend('<a href="#" class="notice_rot13" title="ROT13 this notice">rot13</a>');
	$('.notice_rot13').click(handleROT13);

	// Do some initial parsing/preperation
	parseBBCodes(0, bbcodeList);

	// Cache the URL and fetch the timeline
	var timelineElement = $('link[rel="alternate"][type*="atom"][href*="/api/"]');
	if(timelineElement.length != 0) {
		timelineUrl = timelineElement.attr('href').replace(/\.atom\b/, '.json');
		timelineUrl += window.location.search.length > 1 ? window.location.search + '&' : '?';
	}
}

// Forces an update, pausing resetting the update timer
function forceUpdate() {
	scriptTimer = window.clearInterval(scriptTimer);

	// Delay here to make sure it fetches your notice
	setTimeout(function() {
		fetchTimeline();
		if(!options.isPaused) {
			scriptTimer = setInterval(fetchTimeline, options.refreshDelay);
		}
	}, 600);
}

// Fetches a timeline using the API and displays it
function fetchTimeline() {
	if(timelineUrl.length == 0) return false;
	$.ajax({
		url: timelineUrl + 'since_id=' + noticeList[0],
		dataType: 'json',
		timeout: options.refreshDelay,
		success: function(data, textStatus) {
			$('p.form_response.error').remove();
			
			// Update all the "about x ago" things and exit early if no update
			if(typeof data != 'object' || data.length == 0) {
				var now = Date.now();
				$('.timestamp').each(function(index) {
					$(this).children(':first').text(compareDates(noticeTime[index], now));
				});
				return true;
			}

			// Backup the ID so we can use it below to update only new posts
			var lastId = noticeList[0];

			var elemNotice, foundDuplicate;
			for(var i = data.length - 1; i >= 0; i--) {
				if(data[i].id <= lastId) continue;

				// Check if the notice already exists, if so ignore it.
				foundDuplicate = false;
				for(var x = 0; x < noticeList.length; x++) {
					if(noticeList[x] == data[i].id) {
						foundDuplicate = true;
						break;
					}
				}
				if(foundDuplicate) continue;

				// Fetch the new post using templating
				var elemNotice = $(makeNotice(data[i]));

				// Add event listeners to it
				elemNotice.find('.notice_rot13').click(handleROT13);
				elemNotice.find('.notice_reply').click(function(event) {
					event.preventDefault();
					event.stopPropagation();

					var hrefSplit = $(this).attr('href').split('replyto=');

					var noticeId = hrefSplit[2];
					var username = hrefSplit[1].substring(0, hrefSplit[1].length - 3);

					$('#notice_data-text').val('@' + username + ' ' + $('#notice_data-text').val()).focus()
					var valLength = $('#notice_data-text').val().length;
					$('#notice_data-text').setSelection(valLength, valLength);

					$('#notice_in-reply-to').val(noticeId);
					$(window).scrollTop(0);
				});

				// Add it to the page and animate it.
				elemNotice.prependTo(noticeElement).hide().slideDown('fast');
				
				// Over complicated way of fetching in-context links ftw.
				if(options.extraRequests) {
					$.ajax((function() {
						var retryCount = 10;
						var requestData = {
							noticeId: data[i].id,
							url: baseUrl + '/api/statuses/show/' + data[i].id + '.atom',
							dataType: 'xml',
							timeout: options.refreshDelay,
							success: function(xml) {
								var convLink = $(xml).find('link[rel="ostatus:conversation"]').attr('href');
								if(convLink.length != 0) {
									convLink += '#notice-' + requestData.noticeId;
									$('#notice-' + requestData.noticeId + ' .in-context').html(' <a href="' + convLink + '" class="response">in context</a>');
								} else {
									requestData.error();
								}
							},
							error: function() {
								if(retryCount-- > 0) {
									$.ajax(requestData);
								} 
							},
						};
						return requestData;
					})());
					
					$('.attachment-thumbnail[metatype="youtube"]').each(function() {
						var id = $(this).attr('metadata');
						var $this = $(this);
						$.get('http://gdata.youtube.com/feeds/api/videos/' + id, function(data) {
							var title = data.getElementsByTagName('title')[0].textContent;
							$this.attr('title', title).attr('metatype', 'youtube-done');
						});
					});
				}

				// Add the ID and time to the arrays. Use the current time for normal
				// dashes and the notice time for repeats.
				noticeList.unshift(data[i].id);
				if(data[i].retweeted_status) {
					noticeTime.unshift(new Date(data[i].created_at).getTime());
				} else {
					noticeTime.unshift(Date.now());
				}

				// Update the new notice counter
				if(!isWindowFocused) {
					newNotices++;
					document.title = (userMentioned ? '!! ' : '') + '(' + newNotices + ') ' + windowTitle;
				}
			}

			// Make room for the new message!
			while(noticeElement.children().length > 20) {
				noticeElement.children(':last').remove();
				noticeList.pop();
				noticeTime.pop();
			}

			// Parses bbcodes
			parseBBCodes(lastId, bbcodeList);

			// Update all the "about x ago" things ..
			var now = Date.now();
			$('.timestamp').each(function(index) {
				$(this).children(':first').text(compareDates(noticeTime[index], now));
			});
		},
		error: function(jXHR, textStatus) {
			if($('p.form_response.error').length == 0)
				$('#form_notice').append('<p class="form_response error"></p>');
			$('p.form_response.error').html('The timeline could not be updated. This could be cause of lag or service outages.<br />The error was: ' + textStatus).show();
		}
	});
}

//-----------------------------------------------------------------------------
// Focus / Blur stuffs

$(window).focus(function() {
	isWindowFocused = true;
	userMentioned = false;
	newNotices = 0;

	document.title = windowTitle;
}).blur(function() {
	isWindowFocused = false;
});

//-----------------------------------------------------------------------------
// Helper Functions

function makeButtonHandler(before, after) {
	return function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('#notice_data-text').focus();
		$('#notice_data-text').surroundSelectedText(before, after);
	}
}

function handleROT13(event) {
	event.preventDefault();
	event.stopPropagation();

	// This is totally not confusing. Nope, not at all.
	$(this).toggleClass('rot13-on')
		.parent().parent().find('p.entry-content:first')    // Find this posts contents
		.contents(':not(a)').each(function() {             // Loop through all the children, excluding links
		function filter() {
			// If it's text or has no children, rot13 it
			if(this.nodeType === Node.TEXT_NODE || this.children.length == 0) {
				this.textContent = this.textContent.rot13();
			} else {
				$(this).contents(':not(a)').each(filter);
			}
		}
		return filter;
	}());
}

function parseBBCodes(lastId, bbcodeMap) {
	if(!options.parseBBCode) return true;
	lastId = parseInt(lastId);	// Make sure it's a number

	// TODO: Find a way to not pass the bbcodeMap via param. Limitation of .each() it seems, can't use global variables.
	$('p.entry-content').each(function() {
		var elemId = $(this).attr("id");
		var id = parseInt(elemId.substr(elemId.lastIndexOf("-") + 1));

		// Make sure it's a new notice
		if(id <= lastId)
			return true;

		text = $(this).html();

		// Don't parse bbcode if there isn't anything that actually matches bbcode.
		if(text.indexOf('[') >= text.lastIndexOf(']'))
			return true;

		for(var i = 0; i < bbcodeMap.length; i++) {
			text = text.replace(bbcodeMap[i][0], bbcodeMap[i][1]);
		}

		$(this).html(text);
	});
}

function highlightMentions(user) {
	if(!options.highlightMentions) return true;

	$('.vcard:not(.author)').each(function() {
		if($(this).children().children().text() == user) {
			$(this).parent().parent().parent().filter('li').addClass('notice-highlight');
		}
	});
}

// Function to add/update style ion the page
function updateStyles(styleId) {
	styleId = styleId ? 'mintrefresh_' + styleId : 'mintrefresh_basestyle';

	var styleElem = document.getElementById(styleId);
	if(!styleElem) {
		styleElem = document.createElement('style');
		styleElem.setAttribute('type', 'text/css');
		styleElem.setAttribute('id', styleId);

		document.getElementsByTagName('head')[0].appendChild(styleElem);
	}

	styleElem.textContent =
		'.form_notice .error, .form_notice .success { margin-top: 20px; }' +
		'.notice-options .notice_reply, .notice-options .form_repeat, .notice-options .form_favor, .notice-options .form_disfavor, .notice-options .repeated, .notice-options .notice_delete, .notice-options .notice_rot13 { margin-left: 10px; margin-right: 0; float: left!important; }' +
		'.notice-options { width: 130px!important; }' +
		'.notice-options .notice_rot13 { background-image: url(data:image/gif;base64,R0lGODlhIAAQAJEAAF+UEP///wAAAAAAACH5BAEAAAIALAAAAAAgABAAAAJMFI6ZYurXngy0WqtuzXR2hAHh8ZFBUoonh66a2X6j2tbxxa3O9qS3jOvpcrwX0ZMy3pBDJUsYcpp8IN7UWqVef0PJTgMGRLyQMVlQAAA7); background-position: 0 0;}' +
		'.notice-options .rot13-on { background-position: -16px 0; }' +
		'.bbcode-button {' +
			'background: -moz-linear-gradient(top, #f3f3f3 0%, #d5d5d5 50%, #c4c4c4 51%, #ebebeb 100%);' +
			'background: -webkit-linear-gradient(top, #f3f3f3 0%,#d5d5d5 50%,#c4c4c4 51%,#ebebeb 100%);' +
			'color: #333333;' +
			'text-shadow: 0 1px 0 white;' +
			'text-decoration: none;' +
			'border: 1px solid #aaa;' +
			'border-top-color: #ccc;' +
			'border-left-color: #ccc;' +
			'border-radius: 4px;' +
			'position: relative;' +
			(chrome ? 
				'padding: 4px 8px 5px 8px;' +
				'top: 9px;' :
				'padding: 1px 8px;' +
				'top: 11px;'
			) +
			'margin-right: 1px;' +
		'}'+
		'.bbcode-button:hover {' +
			'background: -moz-linear-gradient(top, #d5e9fb 0%, #cee5fa 50%, #c5dffb 51%, #bed3f6 100%);' +
			'background: -webkit-linear-gradient(top, #d5e9fb 0%,#cee5fa 50%,#aecae8 51%,#bed3f6 100%);' +
		'}' +
		'.notice-highlight {' +
			'background-color: ' + options.highlightColor + ' !important' +
		'}' +
		'.inline-attachment { padding-right: 2px; }' +
		'.inline-attachment img { max-width: 104px; max-height: 79px; }';
}

// Saves all settings
function saveSettings() {
	for(var key in options) {
		GM_setValue(key, options[key]);
	}
}

// Loads all settings
function loadSettings() {
	for(var key in options) {
		GM_getValue(key, options[key]);
	}
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/string/rot13 [rev. #1]
String.prototype.rot13 = function(){
		return this.replace(/[a-zA-Z]/g, function(c){
				return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
		});
};

//-----------------------------------------------------------------------------
// Templating functions

function makeNotice(source) {
	var notice = source;
	if(source.retweeted_status) notice = source.retweeted_status;

	if(notice.attachments) {
		var attachments = '<div class="entry-content thumbnails">';
		var mimeType = '', match = [], attachmentUrl = '', attachmentThumb = '';
		
		var regYoutube = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch.*?\?v=)([^#\&\?]*).*/i
		var regLivestream = /livestream\.com\/([A-Za-z0-9_]+)/i
		
		// Find a not messy way to do this.
		for(var i = 0; i < notice.attachments.length; i++) {
		  attachmentUrl = '', attachmentThumb = ''; attachmentType = 'unknown'; attachmentData = '';
			mimeType = notice.attachments[i].mimetype.split('/');
			switch(mimeType[0]) {
				case 'image':
					attachmentUrl = notice.attachments[i].url;
					attachmentThumb = notice.attachments[i].url;
					attachmentType = 'image';
					break;
					
				case 'text':
				  // YouTube
					match = regYoutube.exec(notice.attachments[i].url);
					if(match != null && match.length >= 1) {
						attachmentUrl = notice.attachments[i].url;
						attachmentThumb = 'http://img.youtube.com/vi/' + match[1] + '/default.jpg';
						attachmentType = 'youtube';
						attachmentData = match[1];
						break;
					}
					
					// Livestream
					match = regLivestream.exec(notice.attachments[i].url);
					if(match != null && match.length >= 1) {
						attachmentUrl = notice.attachments[i].url;
						attachmentThumb = 'http://thumbnail.api.livestream.com/thumbnail?name=' + match[1];
						attachmentType = 'livestream';
						attachmentData = match[1];
						break;
					}
				default: break; // Unknown mime type
			}
			
			if(attachmentUrl.length > 0 && attachmentThumb.length > 0) {
				attachments +=	'<span class="inline-attachment">' +
													'<a class="attachment-thumbnail" href="' + attachmentUrl + '" id="attachment-' + Math.round(Math.random() * 999999999) + '" title="' + attachmentUrl + '" metatype="'+ attachmentType + '" metadata="'+ attachmentData + '">' +
														'<img src="' + attachmentThumb + '">' +
													'</a>' +
												'</span>';
			}
		}

		attachments += '</div>';
	} else {
		var attachments = '';
	}

	var highlightPost = false;
	if(currentUser.length != 0) {
		var re = new RegExp('\\@' + currentUser + '\\b', 'i');
		highlightPost = notice.text.match(re) && options.highlightMentions;
		userMentioned = (highlightPost || userMentioned);
	}

	// Use the current date for normal dashes, and the data's date for redashes
	var noticeDate = source.retweeted_status ? notice.created_at : new Date().toISOString();

	return	'<li class="hentry notice' + (highlightPost ? ' notice-highlight' : '') + '" id="notice-' + notice.id + '">' +
						'<div class="entry-title">' +
							'<span class="vcard author">' +
								'<a href="' + notice.user.statusnet_profile_url + '" class="url" title="' + notice.user.name + ' (' + source.user.screen_name + ')">' +
									'<img src="' + notice.user.profile_image_url + '" class="avatar photo" width="48" height="48" alt="' + source.user.name + '">' +
									'<span class="nickname fn">' + notice.user.screen_name + '</span>' +
								'</a>' +
							'</span>' +
							'<p class="entry-content">' + notice.statusnet_html + '</p>' +
						'</div>' +
						attachments +
						'<div class="entry-content">' +
							'<a rel="bookmark" class="timestamp" href="' + baseUrl + '/notice/' + notice.id + '">' +
								'<abbr class="published" title="' + noticeDate + '">whenever ago</abbr>' +	// The content of this div is set after.
							'</a>' +
							'<span class="source"> from <span class="device">' + notice.source + '</span></span>' +
							'<span class="in-context"></span>' +
							(source.retweeted_status ?
								'<span class="repeat vcard">' +
									'Repeated by ' +
									'<a href="' + source.user.statusnet_profile_url + '" class="url" title="' + source.user.name + ' (' + source.user.screen_name + ')">' +
										'<span class="fn nickname">' + source.user.screen_name + '</span>' +
									'</a>' +
								'</span>' :
							'') +
						'</div>' +
						(currentUser.length != 0 ?
							'<div class="notice-options">' + // 2
								'<a href="#" class="notice_rot13" title="ROT13 this notice">rot13</a>' +
								'<form id="favor-' + notice.id + '" class="form_favor" method="post" action="' + baseUrl + '/main/favor">' +
									'<fieldset><legend>Favour this notice</legend>' +
										'<input name="token-' + notice.id + '" type="hidden" id="token-' + notice.id + '" value="' + favoriteToken + '">' +
										'<input name="notice" type="hidden" id="notice-n' + notice.id + '" value="' + notice.id + '">' +
										'<input type="submit" id="favor-submit-' + notice.id + '" name="favor-submit-' + notice.id + '" class="submit" value="Favor" title="Favour this notice">' +
									'</fieldset>' +
								'</form>' +
								'<a href="http://rainbowdash.net/notice/new?replyto=' + notice.user.screen_name + '&inreplyto=' + notice.id + '" class="notice_reply" title="Reply to this notice">' +
									'Reply <span class="notice_id">' + notice.id + '</span>' +
								'</a>' +
								(currentUser != notice.user.screen_name ?
									'<form id="repeat-' + notice.id + '" class="form_repeat" method="post" action="' + baseUrl + '/main/repeat">' +
										'<fieldset><legend>Repeat this notice?</legend>' +
											'<input name="token-' + notice.id + '" type="hidden" id="token-' + notice.id + '" value="' + favoriteToken + '">' +
											'<input name="notice" type="hidden" id="notice-n' + notice.id + '" value="' + notice.id + '">' +
											'<input type="submit" id="repeat-submit-' + notice.id + '" name="repeat-submit-' + notice.id + '" class="submit" value="Yes" title="Repeat this notice">' +
										'</fieldset>' +
									'</form>' :
								'') +
								(currentUser == notice.user.screen_name || options.moderator ?
									'<a href="' + baseUrl + '/notice/delete/' + source.id + '" class="notice_delete" title="Delete this notice">Delete</a>' :
								'') :
							'</div>' +
						'') +
					 '</li>';
}

function compareDates(one, two) {
	var delta = Math.round(Math.abs(two - one) / 1000);

	for(var i = 0; i < dateLimits.length; i++) {
		if(delta < dateLimits[i][1] && delta >= dateLimits[i][0]) {
			delta = Math.round(delta / dateLimits[i][2]);
			return dateLimits[i][3].replace(/\$1/g, delta);
		}
	}
}

//-----------------------------------------------------------------------------
// Update check utility
// Based upon: http://userscripts.org/scripts/show/20145
try {
	function updateCheck(forced) {
		if (forced || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000) <= Date.now()) { // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
			try {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?' + Date.now(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp) {
						var local_version, remote_version, rt, script_name;

						rt = resp.responseText;
						GM_setValue('SUC_last_update', Date.now()+'');
						remote_version = /version\s*(.*?)\s*$/m.exec(rt)[1];
						if (remote_version != SUC_local_version) {
							if(confirm('There is an update available for the Greasemonkey script "' + SUC_script_name + '".\nWould you like to go to the install page now?')) {
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
							}
						}
						else if (forced)
							alert('No update is available for "'+SUC_script_name+'."');
					}
				});
			}
			catch (err) {
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(SUC_script_name + ' » Manual Update', function() {
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err) { }

//-----------------------------------------------------------------------------
// jQuery Rangy Inputs extension
// TODO: Optimize for use on just Chrome / Firefox
(function(j){function n(e,d){var b=typeof e[d];return"function"===b||!!("object"==b&&e[d])||"unknown"==b}function o(e,d,b){0>d&&(d+=e.value.length);typeof b==i&&(b=d);0>b&&(b+=e.value.length);return{start:d,end:b}}function k(){return"object"==typeof document.body&&document.body?document.body:document.getElementsByTagName("body")[0]}var i="undefined",f,g,l,m;j(document).ready(function(){function e(b,c){return function(){var a=this.jquery?this[0]:this,h=a.nodeName.toLowerCase();if(1==a.nodeType&&("textarea"==
h||"input"==h&&"text"==a.type))if(a=[a].concat(Array.prototype.slice.call(arguments)),a=b.apply(this,a),!c)return a;if(c)return this}}var d=document.createElement("textarea");k().appendChild(d);if(typeof d.selectionStart!=i&&typeof d.selectionEnd!=i)f=function(b){var c=b.selectionStart,a=b.selectionEnd;return{start:c,end:a,length:a-c,text:b.value.slice(c,a)}},g=function(b,c,a){c=o(b,c,a);b.selectionStart=c.start;b.selectionEnd=c.end};else if(n(d,"createTextRange")&&"object"==typeof document.selection&&
document.selection&&n(document.selection,"createRange"))f=function(b){var c=0,a=0,h,d,e;if((e=document.selection.createRange())&&e.parentElement()==b)d=b.value.length,h=b.value.replace(/\r\n/g,"\n"),a=b.createTextRange(),a.moveToBookmark(e.getBookmark()),e=b.createTextRange(),e.collapse(!1),-1<a.compareEndPoints("StartToEnd",e)?c=a=d:(c=-a.moveStart("character",-d),c+=h.slice(0,c).split("\n").length-1,-1<a.compareEndPoints("EndToEnd",e)?a=d:(a=-a.moveEnd("character",-d),a+=h.slice(0,a).split("\n").length-
1));return{start:c,end:a,length:a-c,text:b.value.slice(c,a)}},g=function(b,c,a){var c=o(b,c,a),a=b.createTextRange(),d=c.start-(b.value.slice(0,c.start).split("\r\n").length-1);a.collapse(!0);c.start==c.end?a.move("character",d):(a.moveEnd("character",c.end-(b.value.slice(0,c.end).split("\r\n").length-1)),a.moveStart("character",d));a.select()};else{k().removeChild(d);window.console&&window.console.log&&window.console.log("RangyInputs not supported in your browser. Reason: No means of finding text input caret position");
return}k().removeChild(d);l=function(b,c){var a=f(b),d=b.value;b.value=d.slice(0,a.start)+c+d.slice(a.end);a=a.start+c.length;g(b,a,a)};m=function(b,c,a){typeof a==i&&(a=c);var d=f(b),e=b.value;b.value=e.slice(0,d.start)+c+d.text+a+e.slice(d.end);c=d.start+c.length;g(b,c,c+d.length)};j.fn.extend({getSelection:e(f,!1),setSelection:e(g,!0),replaceSelectedText:e(l,!0),surroundSelectedText:e(m,!0)});j.fn.rangyInputs={getSelection:f,setSelection:g,replaceSelectedText:l,surroundSelectedText:m}})})($);