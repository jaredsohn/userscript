// ==UserScript==
// @name            Grooveshark Formatted Title
// @namespace       #Cletus
// @description     Allows formatting of the title in Grooveshark.
// @copyright       2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @license         Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon            http://www.gravatar.com/avatar.php?gravatar_id=6875e83aa6c563790cb2da914aaba8b3&r=PG&s=48&default=identicon
//
// @grant           none
//
// @include         http://grooveshark.com/*
//
// @version         1.0.0
// ==/UserScript==

// Start wrapper.
(function wrapper(window, injectNeeded, undefined) {
	'use strict';

	// Script injection if needed.
	if (injectNeeded) {
		var script = document.createElement('script');
		script.textContent = '(' + wrapper + ')(window, false)';
		document.body.appendChild(script);
		document.body.removeChild(script);
		return;
	}

	// Script-wide variables.
	//-----------------------
	var title,
		$,
		jQuery,
		format,
		defaultFormat = '"%csName%" by %csArtistName% [%csTimeElapsed% / %csTimeTotal%]',

		lightbox,
		lightboxInner,

		SCRIPT_NAME = 'Grooveshark Formatted Title',
		MESSAGES = {
			OBJECTS_NOT_LOADED: 'Needed objects haven\'t loaded yet.',
			TIMEOUT_SCRIPT_LOAD: 'Script took too long to load. Refresh to try again.'
		};

	// Quick manipulation of script-wide variables.
	//---------------------------------------------
	// Prefix all messages with script name.
	for (var message in MESSAGES) {
		if (MESSAGES.hasOwnProperty(message)) {
			MESSAGES[message] = '[' + SCRIPT_NAME + ']: ' + MESSAGES[message];
		}
	}

	// Only enable script if we have the right variables.
	//---------------------------------------------------
	(function init(time) {
		var	frequency = 50,
			objectsLoaded = (
				window.Grooveshark !== undefined &&
				window.jQuery !== undefined
			);

		if (
			!objectsLoaded
		) {
			if (time >= 60000) {
				console.error(MESSAGES.TIMEOUT_SCRIPT_LOAD);
				return;
			}
			if (time >= 10000) {
				frequency = 1000;

				if (!objectsLoaded) {
					console.warn(MESSAGES.OBJECTS_NOT_LOADED);
				}
			}
			setTimeout(init, frequency, time + frequency);
			return;
		}
		setup();
	})(0);


	// Start of functions.
	//--------------------
	/**
	 * Runs initial setup of DOM and variables.
	 */
	function setup() {
		$ = jQuery = window.jQuery;

		title = $('title');
		lightbox = $('#lightbox');
		lightboxInner = $('#lightbox-inner');

		createUI();

		/**
		 * Sets updated title every ~100ms.
		 */
		(function runTimer() {
			setTimeout(function () {
				setTitle();
				runTimer();
			}, 50);
		})();
	}

	/**
	 * Sets the title of the page to the current song data using tokenized format.
	 */
	function setTitle() {
		format = format || getSetting('grooveshark-formatted-title-format', defaultFormat);
		var tokens = getTokens('values', true);
		if (tokens && title.length) {
			title.text(tokenize(format, tokens));
		}
	}

	/**
	 * Gets all tokens and returns in a tokenizer-friendly object.
	 * @param  {string}  type                        Which type of data should be returned. Possible values: `values` The values returned from the callbacks. `samples` Sample values for preview. `descriptions` The friendly description of what the token is.
	 * @param  {boolean} [tokenizerFriendly = false] Whether returned object should be friendly for the tokenizer function.
	 * @return {object}                              The tokens object. If tokenizerFriendly is `false`, `{category: {token: 'replacement'}}`. If tokenizerFriendly is `true`, `{token: 'replacement'}`.
	 */
	function getTokens(type, tokenizerFriendly) {
		var currentSong = window.Grooveshark.getCurrentSongStatus().song,
			previousSong = window.Grooveshark.getPreviousSong(),
			nextSong = window.Grooveshark.getNextSong(),
			tokens = {
				currentSong: {
					categoryTitle: 'Current Song',
					csName: {
						sample: 'Current Song Name',
						description: 'The current song name.',
						callback: function () {
							if (!currentSong) {return '--';}
							return currentSong.songName;
						}
					},
					csArtistName: {
						sample: 'Current Song Artist Name',
						description: 'The current song artist name.',
						callback: function () {
							if (!currentSong) {return '--';}
							return currentSong.artistName;
						}
					},
					csAlbumName: {
						sample: 'Current Song Album Name',
						description: 'The current song album name.',
						callback: function () {
							if (!currentSong) {return '--';}
							return currentSong.albumName;
						}
					},
					csTimeElapsed: {
						sample: formatTime(9),
						description: 'The current time elapsed in the song.',
						callback: function () {
							if (!currentSong) {return formatTime(0);}
							return formatTime(currentSong.position / 1000);
						}
					},
					csTimeTotal: {
						sample: formatTime(307),
						description: 'The total time for the song.',
						callback: function () {
							if (!currentSong) {return formatTime(0);}
							return formatTime(currentSong.calculatedDuration / 1000);
						}
					}
				},
				previousSong: {
					categoryTitle: 'Previous Song',
					psName: {
						sample: 'Previous Song',
						description: 'The previous song name.',
						callback: function () {
							if (!previousSong) {return '--';}
							return previousSong.songName;
						}
					},
					psArtistName: {
						sample: 'Previous Song Artist Name',
						description: 'The previous song artist name.',
						callback: function () {
							if (!previousSong) {return '--';}
							return previousSong.artistName;
						}
					},
					psAlbumName: {
						sample: 'Previous Song Album Name',
						description: 'The previous song album name.',
						callback: function () {
							if (!previousSong) {return '--';}
							return previousSong.albumName;
						}
					}
				},
				nextSong: {
					categoryTitle: 'Next Song',
					nsName: {
						sample: 'Next Song Name',
						description: 'The next song name.',
						callback: function () {
							if (!nextSong) {return '--';}
							return nextSong.songName;
						}
					},
					nsArtistName: {
						sample: 'Next Song Artist Name',
						description: 'The next song artist name.',
						callback: function () {
							if (!nextSong) {return '--';}
							return nextSong.artistName;
						}
					},
					nsAlbumName: {
						sample: 'Next Song Album Name',
						description: 'The next song album name.',
						callback: function () {
							if (!nextSong) {return '--';}
							return nextSong.albumName;
						}
					}
				}
			},
			category,
			token,
			friendlyTokens = {};
	
		for (category in tokens) {
			for (token in tokens[category]) {
				// Skip the title.
				if (token === 'categoryTitle') {
					continue;
				}
				// Change token values based on type.
				if (type === 'values' && tokens[category][token].callback) {
					tokens[category][token] = tokens[category][token].callback();
				}
				else if (type === 'samples' && tokens[category][token].sample) {
					tokens[category][token] = tokens[category][token].sample;
				}
				else if (type === 'descriptions' && tokens[category][token].description) {
					tokens[category][token] = tokens[category][token].description;
				}
				if (tokenizerFriendly) {
					friendlyTokens[token] = tokens[category][token];
				}
			}
		}
		return tokenizerFriendly ? friendlyTokens : tokens;
	}

	/**
	 * Creates UI.
	 */
	function createUI() {
		var menuItem = $('<a id="format-title" class="btn" style="line-height: 24px;"><i>T</i></a>'),
			popupItem = $([
				'<div id="create-playlist">',
				'	<div id="lightbox-header">',
				'		<h2 class="title" data-translate-text="POPUP_PLAYLIST_METADATA_CREATE_NEW">Format Title</h2>',
				'	</div>',
				'	<div id="lightbox-content">',
				'		<div class="lightbox-content-block">',
				'			<div class="field availableTokens">',
				'				<label><span>Available Tokens:</span></label>',
				'				<div class="tokenCategories"></div>',
				'			</div>',
				'			<div class="field">',
				'				<label for="format-title-format"><span data-translate-text="NAME">Format:</span></label>',
				'				<input id="format-title-format" style="width: 550px;" name="format-title-format" type="text">',
				'			</div>',
				'			<div class="field">',
				'				<label for="format-title-preview"><span data-translate-text="NAME">Preview:</span></label>',
				'				<input id="format-title-preview" style="width: 550px;" name="format-title-preview" type="text" disabled>',
				'			</div>',
				'		</div>',
				'	</div>',
				'	<div id="lightbox-footer">',
				'		<div id="lightbox-footer-right" class="right">',
				'			<a class="btn btn-large default-button">Use Default</a>',
				'			<a class="btn btn-large btn-primary submit save-button">Save Format</a>',
				'		</div>',
				'		<div id="lightbox-footer-left" class="left">',
				'			<a class="btn btn-large close cancel-button">Cancel</a>',
				'		</div>',
				'	</div>',
				'</div>'
			].join('')),
			availableTokens = getTokens('descriptions'),
			category,
			token;
		
		// Add all available tokens to the menu.
		for (category in availableTokens) {
			// Create category if needed.
			if (!popupItem.find('.availableTokens .tokenCategory.' + category).length) {
				popupItem.find('.availableTokens').append('<div class="tokenContainer ' + category + '"></div>');
				popupItem.find('.availableTokens .tokenCategories').append(
					'<span class="tokenCategory ' + category + '" data-category="' + category + '" title="Switch to the &quot;' + availableTokens[category].categoryTitle + '&quot; category.">' + availableTokens[category].categoryTitle + '</span>'
				);
			}
			for (token in availableTokens[category]) {
				if (token === 'categoryTitle') {
					continue;
				}
				// Add token.
				popupItem.find('.availableTokens .tokenContainer.' + category).append(
					'<span class="token" title="' + availableTokens[category][token] + '">%' + token + '%</span>'
				);
			}
		}

		// Add UI button.
		$('#account-buttons .btn-group').append(menuItem);

		// Handle open and closing of menu.
		menuItem.click(showLightbox);
		$('#lightbox-close').click(hideLightbox);

		function showLightbox() {
			// Populate lightbox.
			lightboxInner.append(popupItem);
			// Show lightbox.
			lightbox.removeClass('hide-lb')
				.parent().removeClass('hide-lb')
				.next().removeClass('hide-lb');
			$('#lightbox-close').removeClass('hide');

			// Lightbox specific bindings.
			// Close button.
			$('#lightbox-footer-left a.cancel-button').click(hideLightbox);
			// Show current format and preview.
			lightboxInner.find('#format-title-format').val(format);
			lightboxInner.find('#format-title-preview').val(tokenize(lightboxInner.find('#format-title-format').val(), getTokens('samples', true)));
			// Update preview.
			lightboxInner.find('#format-title-format').on('click keyup', function () {
				lightboxInner.find('#format-title-preview').val(tokenize($(this).val(), getTokens('samples', true)));
			});
			// Save format.
			$('#lightbox-footer-right a.save-button').click(function () {
				format = lightboxInner.find('#format-title-format').val();
				setSetting('grooveshark-formatted-title-format', format);
				hideLightbox();
			});
			// Reset format to default.
			$('#lightbox-footer-right a.default-button').click(function () {
				lightboxInner.find('#format-title-format').val(defaultFormat);
				lightboxInner.find('#format-title-format').trigger('click');
			});
			// Handle token categories.
			popupItem.find('.tokenCategory').click(function () {
				// Get category.
				var category = $(this).attr('data-category');
				// Change active.
				popupItem.find('.tokenCategory.active').removeClass('active');
				$(this).addClass('active');
				// Show correct tokens.
				popupItem.find('.availableTokens .tokenContainer').hide();
				popupItem.find('.availableTokens .tokenContainer.' + category).show();
			});

			// Set initial token category state.
			popupItem.find('.tokenCategory.currentSong').click();
		}

		function hideLightbox() {
			lightbox.addClass('hide-lb')
				.parent().addClass('hide-lb')
				.next().addClass('hide-lb');
			lightboxInner.empty();
			$('#lightbox-close').addClass('hide');
		}

		// Add the style.
		addStyle([
			'.tokenCategories {'+
			'	margin-bottom: 4px;'+
			'}'+
			'.tokenCategory {'+
			'	border-radius: 5px;'+
			'	cursor: pointer;'+
			'	padding: 3px;'+
			'	background: rgba(0, 0, 0, 0.1);'+
			'	margin-right: 5px;'+
			'}'+
			'.tokenCategory:hover, .tokenCategory.active {'+
			'	background: rgba(0, 0, 0, 0.2);'+
			'}'+
			'.tokenContainer .token {'+
			'	background: rgba(0, 0, 0, 0.05);'+
			'	border: 1px solid rgba(0, 0, 0, 0.05);'+
			'	border-radius: 5px;'+
			'	margin-right: 5px;'+
			'	padding: 3px;'+
			'}'+
			'.tokenContainer .token:hover {'+
			'	border: 1px solid rgba(0, 0, 0, 0.2);'+
			'}'
		].join(''));
	}

	/**
	 * Replaces a set of tokens with their replacement value.
	 * @param   {string} format  The "to-be-tokenized" string. Note: tokens should be wrapped in `%`.
	 * @param   {object} options Pass as token->replacement object, e.g. `{'token': 'replacement'}`
	 * @return  {string}         The formatted string. Only the tokens found in the format will be replaced.
	 * @example                  `tokenize('This is %foo%.', {'foo': 'bar'})` would return `This is bar.`
	 */
	function tokenize(format, options) {
		for (var token in options) {
			format = format.replace('%' + token + '%', options[token]);
		}
		return format;
	}

	/**
	 * Formats seconds to a standard mm:ss string.
	 * @param  {number} seconds The number of seconds to convert. Decimals will be rounded down.
	 * @return {string}         The formatted time.
	 */
	function formatTime(seconds) {
		var s = Math.floor(seconds),
			m;
		m = Math.floor(s / 60) + '';
		s = (s % 60) + '';
		if (m.length < 2) {
			m = '0' + m;
		}
		if (s.length < 2) {
			s = '0' + s;
		}
		return m + ':' + s;
	}

	// Generic functions.
	//-------------------
	/**
	 * Adds a stylesheet to the document.
	 * @param {string} text The styles to be added.
	 */
	function addStyle(text) {
		var style = document.createElement('style');
		style.textContent = text;
		document.querySelector('head').appendChild(style);
	}

	/**
	 * Gets a storage value.
	 * @param  {string} aKey     The key you want to get.
	 * @param  {mixed}  aDefault The default value to return if there isn't anything in storage.
	 * @return {mixed}           The value in storage or `aDefault` if there isn't anything in storage.
	 */
	function getSetting(aKey, aDefault) {
		var val = localStorage.getItem(aKey);
		if (val === null && typeof aDefault !== 'undefined') {
			return aDefault;
		}
		return val;
	}

	/**
	 * Sets a storage value.
	 * @param {string} aKey The key you want to set.
	 * @param {mixed}  aVal The value you want to store.
	 */
	function setSetting(aKey, aVal) {
		localStorage.setItem(aKey, aVal);
	}

	/**
	 * Deletes a storage key.
	 * @param {string} aKey The key you want to set.
	 */
	function deleteSetting(aKey) {
		localStorage.removeItem(aKey);
	}

// End wrapper.
})(this.unsafeWindow || window, window.chrome ? true : false);
