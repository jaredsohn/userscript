// ==UserScript==
// @name           Better Blogg Esse 2010.08.19
// @namespace      http://www.zencodez.net
// @description    Better Blogg Esse
// @include        http://publishme.se/*/entries/article/*
// ==/UserScript==

/* ==Description==
 * Bättre editor - text storlek och färgval
 */
unsafeWindow.onload = function() {
	var settings = unsafeWindow.tinyMCE.settings;
	// remove tinymce
	unsafeWindow.$('id_htmleditor').set('value', 'False'); // mootools
	unsafeWindow.tinyMCE.execCommand('mceRemoveControl', false, 'id_body');
	
	// reconfig
	settings.theme_advanced_buttons1 = "fontsizeselect," + settings.theme_advanced_buttons1;
	settings.theme_advanced_buttons2 = "forecolor,backcolor," + settings.theme_advanced_buttons2;
	// init tinymce
	unsafeWindow.tinyMCE.init(settings);
};