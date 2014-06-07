// ==UserScript==
// @name           GitHub: Editor Theme
// @namespace      https://github.com/skratchdot/github-editor-theme.user.js
// @description    Add a "theme" dropdown when editing files in the Github UI.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @grant          none
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-editor-theme.user.js/raw/master/github-editor-theme.user.js
// @updateURL      https://github.com/skratchdot/github-editor-theme.user.js/raw/master/github-editor-theme.user.js
// @version        1.1
// ==/UserScript==
/*global jQuery, ace, CodeEditor */
/*jslint browser: true, plusplus: true */

(function () {
	'use strict';

		// config variables
	var $actions,
		brightThemes = {
			"ace/theme/chrome" : "Chrome",
			"ace/theme/clouds" : "Clouds",
			"ace/theme/crimson_editor" : "Crimson Editor",
			"ace/theme/dawn" : "Dawn",
			"ace/theme/dreamweaver" : "Dreamweaver",
			"ace/theme/eclipse" : "Eclipse",
			"ace/theme/github" : "GitHub",
			"ace/theme/solarized_light" : "Solarized Light",
			"ace/theme/textmate" : "TextMate",
			"ace/theme/tomorrow" : "Tomorrow",
			"ace/theme/xcode" : "XCode"
		},
		darkThemes = {
			"ace/theme/ambiance" : "Ambiance",
			"ace/theme/clouds_midnight" : "Clouds Midnight",
			"ace/theme/cobalt" : "Cobalt",
			"ace/theme/idle_fingers" : "idleFingers",
			"ace/theme/kr_theme" : "krTheme",
			"ace/theme/merbivore" : "Merbivore",
			"ace/theme/merbivore_soft" : "Merbivore Soft",
			"ace/theme/mono_industrial" : "Mono Industrial",
			"ace/theme/monokai" : "Monokai",
			"ace/theme/pastel_on_dark" : "Pastel on dark",
			"ace/theme/solarized_dark" : "Solarized Dark",
			"ace/theme/twilight" : "Twilight",
			"ace/theme/tomorrow_night" : "Tomorrow Night",
			"ace/theme/tomorrow_night_blue" : "Tomorrow Night Blue",
			"ace/theme/tomorrow_night_bright" : "Tomorrow Night Bright",
			"ace/theme/tomorrow_night_eighties" : "Tomorrow Night 80s",
			"ace/theme/vibrant_ink" : "Vibrant Ink"
		},
		defaultTheme = 'ace/theme/twilight',
		localStorageKey = 'SKRATCHDOT_EDITOR_THEME',
		selectId = 'skratchdot-editor-theme',
		setTimeoutCount = 0,
		setTimeoutCountMax = 50,
		setTimeoutDelay = 100,
		// functions
		createSelect,
		createSelectHelper,
		initEditorTheme,
		getEditorTheme,
		setEditorTheme,
		init;

	createSelect = function (selectedTheme) {
		var select = '<select id="' + selectId + '">';
		select += createSelectHelper(selectedTheme, brightThemes, 'Bright');
		select += createSelectHelper(selectedTheme, darkThemes, 'Dark');
		select += '\n</select>';
		return select;
	};

	createSelectHelper = function (selectedTheme, themes, label) {
		var theme, str = '\n<optgroup label="' + label + '">';
		for (theme in themes) {
			if (themes.hasOwnProperty(theme)) {
				str += '\n<option value="' +
					theme +
					'"' +
					(theme === selectedTheme ? ' selected="selected">' : '>') +
					themes[theme] +
					'</option>';
			}
		}
		str += '\n</optgroup>';
		return str;
	};

	getEditorTheme = function () {
		var theme;
		if (window.localStorage) {
			theme = window.localStorage.getItem(localStorageKey);
		}
		if (typeof theme !== 'string' ||
				'undefined' === typeof ace ||
				!ace.config.modules.hasOwnProperty(theme)) {
			theme = defaultTheme;
			setEditorTheme(theme);
		}
		return theme;
	};

	setEditorTheme = function (theme) {
		if (window.localStorage) {
			window.localStorage.setItem(localStorageKey, theme);
		}
		if ('undefined' !== typeof CodeEditor) {
			CodeEditor.ace.setTheme(theme);
		}
	};

	initEditorTheme = function () {
		var theme, $select;
		setTimeoutCount += 1;
		if (jQuery('#ace-editor').hasClass('ace_editor')) {
			theme = getEditorTheme();
			$actions.prepend('<li>' + createSelect(theme) + '</li>');
			$select = jQuery('#' + selectId);
			$select.change(function () {
				setEditorTheme(jQuery(this).val());
			});
			$select.change();
			setTimeoutCount = setTimeoutCountMax;
		}
		if (setTimeoutCount < setTimeoutCountMax) {
			setTimeout(initEditorTheme, setTimeoutDelay);
		}
	};

	init = function () {
		$actions = jQuery('body.page-edit-blob #files .js-blob-edit-form .file .meta ul.actions');

		// only do something when we are editing blobs
		if ($actions.length) {
			try {
				setTimeout(initEditorTheme, setTimeoutDelay);
			} catch (e) {}

		}
	};

	jQuery(document).ready(init);
}());