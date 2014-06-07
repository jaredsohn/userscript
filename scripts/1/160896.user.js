// ==UserScript==
// @name        Facebook Link Tracking Disabler
// @namespace   z0rr3s
// @include     htt*://*.facebook.com/*
// @version     2.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

defaultVars = {};
defaultVars['use_mark_color'] = 'true';
defaultVars['mark_color'] = '#ffffab';

// from http://stackoverflow.com/a/4458580
function urldecode(str) {
	return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function getOption(key) {
	return GM_getValue(key, defaultVars[key]);
}

function modifier() {
	// loop over all relevant links
	$("a[href][target='_blank']").each(function(key) {
		var url = $(this).attr('href');
		var offset = url.indexOf('facebook.com/l.php?u=');

		// does this link contain facebook's tracking mechanism?
		if (offset > -1 || $(this).attr('id').indexOf('reactRoot') > -1) {
			// replace url with our old original url
			if (offset > -1) {
				$(this).attr('href', urldecode(url.substring(offset+21, url.indexOf('&h='))));
			}

			// now let's get rid of nasty javascripts
			$(this).attr('id', '');
			$(this).attr('onclick', '');
			$(this).attr('onmousedown', '');

			// mark this link as replaced
			if (getOption('use_mark_color') === true) {
				$(this).css({'background-color': getOption('mark_color')});
			}
		}
	});
}
modifier();

function setup() {
	// add link to option menu
	$('#userNavigation').append('<li role="menuitem"><a class="navSubmenu" id="ltdOptionsLink"><div class="clearfix"><div class="lfloat">Link Tracking Disabler</div></div></a></li>');

	// add options dialog
	$('head').append('<style type="text/css">#ltdOptionsDialog h3 {font-size: 14pt; text-transform: lowercase;} #ltdOptionsDialog input[type=text] {border: 1px #999999 solid; padding: 3px;} #ltdOptionsDialog {margin: 2px 0px 2px 0px;}</style>');
	$('body').append('<div style="position: absolute; z-index: 9999; top: 100px; display: none; text-align: center; width: 100%;" id="ltdOptionsDialog"><div style="background: #ffffff; width: 50%; border: 20px #999999 solid; text-align: left; margin: auto; padding: 30px; min-height: 300px; position: relative;"><h3>Facebook Link Tracking Disabler v' + GM_info.script.version +' Options</h3><p><strong>Mark replaced links with color</strong></p><p><input class="ltdOption" name="use_mark_color" type="checkbox" /><input class="ltdOption" name="mark_color" type="text" placeholder="#FFFFAB" pattern="#[A-Fa-f0-9]+" /></p><button id="ltdOptionsDialogClose" style="position: absolute; bottom: 20px; right: 20px; background: #999999; color: #ffffff; font-weight: bold; border: 0; padding: 10px;">Close</button></div></div>');

	// show and hide dialog when clicking on the correspondent element
	$('#ltdOptionsLink').click(function() {
		$('#ltdOptionsDialog').css('display', 'block');
	});
	$('#ltdOptionsDialogClose').click(function() {
		$('#ltdOptionsDialog').css('display', 'none');
	});

	// save option events
	$('input[type=text].ltdOption').keyup(function() {
		GM_setValue($(this).attr('name'), $(this).val());
	});
	$('input[type=checkbox].ltdOption').click(function() {
		GM_setValue($(this).attr('name'), $(this).attr('checked'));
	});

	// insert saved options into dialog.
	$('.ltdOption').each(function(key) {
		var storedOption = getOption($(this).attr('name'));
		switch ($(this).attr('type')) {
			case 'text':
				$(this).val(storedOption);
				break;

			case 'checkbox':
				$(this).attr('checked', storedOption);
				break;
		}
	});
}
setup();

// continuously replacing facebook's link tracking mechanism
setInterval(modifier, 2000);