// ==UserScript==
// @name        ask.fm-Tuner
// @namespace   z0rr3s
// @include     http://ask.fm/*
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

defaultVars = {};
defaultVars['default_public'] = 'false';
defaultVars['use_default_question'] = 'true';
defaultVars['default_question'] = 'Hi there, I am using ask.fm-Tuner.';
defaultVars['use_quick_reply'] = 'true';
defaultVars['use_warn_color'] = 'true';
defaultVars['warn_color'] = '#ffbbbb';
defaultVars['disable_link_tracking'] = 'true';
defaultVars['use_mark_color'] = 'true';
defaultVars['mark_color'] = '#ffffab';

function getOption(key) {
	return GM_getValue(key, defaultVars[key]);
}

// Einstellungsmenü einbinden
if (document.URL.indexOf('/account/settings/') > -1) {
	$('.headline-menu').append('<div class="link-headline-seperator"></div><a href="#" class="link-headline" id="atnOptionsLink">tuner</a>');
	$('body').append(
		'<div style="position: absolute; z-index: 9999; top: 100px; display: none; text-align: center; width: 100%;" id="atnOptionsDialog"><div style="background: #ffffff; width: 50%; border: 20px #999999 solid; text-align: left; margin: auto; padding: 30px; min-height: 300px; position: relative;"><h3 style="margin-top: 0px; font-size: 18pt;">ask.fm-Tuner v' + GM_info.script.version + ' Options</h3>' +
		'<p><strong>Default Question</strong></p><p><input class="atnOption" name="use_default_question" type="checkbox" /> <input type="text" name="default_question" class="atnOption" style="width: 60%;" maxlength="300" /></p>' +
		'<p><strong>Default Publicity</strong></p><p><input class="atnOption" name="default_public" type="checkbox" /> Check if you want to be \'non-anonymous\' by default</p><hr />' +
		'<p><strong>Quick Reply</strong></p><p><input class="atnOption" name="use_quick_reply" type="checkbox" /> Check if you want to have a quick ask-a-question-box on single answer pages.</p><hr />' +
		'<p><strong>Warn if not anonymous</strong><br /><small>Highlights the question box if you are not anonymous.</small></p><p><input class="atnOption" name="use_warn_color" type="checkbox" /> <input class="atnOption" name="warn_color" type="text" placeholder="#FFFFAB" pattern="#[A-Fa-f0-9]+" /><hr />' +
		'<p><strong>Link Tracking Disabler</strong></p><p><input class="atnOption" name="disable_link_tracking" type="checkbox" /> Check to prevent ask.fm\'s Link Tracking</p><p><strong>Mark replaced links with color</strong></p><p><input class="atnOption" name="use_mark_color" type="checkbox" /> <input class="atnOption" name="mark_color" type="text" placeholder="#FFFFAB" pattern="#[A-Fa-f0-9]+" /></p>' +
		'<button id="atnOptionsDialogClose" style="position: absolute; bottom: 20px; right: 20px; background: #999999; color: #ffffff; font-weight: bold; border: 0; padding: 10px;">Close</button></div></div>'
	);

	// Einstellungsmenü anzeigen oder verstecken
	$('#atnOptionsLink').click(function() {
		$('#atnOptionsDialog').css('display', 'block');
	});
	$('#atnOptionsDialogClose').click(function() {
		$('#atnOptionsDialog').css('display', 'none');
	});

	// Einstellungen speichern
	$('input[type=text].atnOption').keyup(function() {
		GM_setValue($(this).attr('name'), $(this).val());
	});
	$('input[type=checkbox].atnOption').click(function() {
		GM_setValue($(this).attr('name'), $(this).attr('checked'));
	});

	// Gespeicherte Einstellungen anzeigen
	$('.atnOption').each(function(key) {
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

// Einzelantwortseiten modifizieren
else if(document.URL.indexOf('/answer/') > -1) {
	if (getOption('use_quick_reply')) {
		var user = document.URL.split('/answer/');
		GM_xmlhttpRequest({
			method: 'GET',
			url: user[0] + '/questions/quick_new',
			onload: function (response) {
				$('.questionBox').after(response.responseText);
				$('.questionPop-text').append('<em>(quick reply)</em>');
				$('#popup-ask-textarea').text(document.URL + ' - ');
				$('#popup-ask-textarea').select();
				$('#question_form').attr('onsubmit', $('#question_form').attr('onsubmit').replace('Forms.Profile.afterQuickSubmit();', 'Forms.Profile.afterSubmit();'));
			}
		});
	}
}

// Stream-Seite modifizieren
else if(document.URL.indexOf('/account/stream') > -1 && getOption('use_default_question') === true) {
	captcha = '';
	captcha_key = '';

	$('.stream-answer').append('<a style="float: right; display: inline-block; margin-top: 20px; margin-right: 20px; padding: 5px;" class="atnQuickQuestion link-silver-medium-ask_friends link-silver-medium-ask_friends-active hintable" hint="' + getOption('default_question').replace(/"/g, '\\"') + '">Quick Default Question</a>');

	$('body').prepend('<div id="atnCaptchaBox" style="position: fixed; z-index: 9999; bottom: 30px; right: 30px; background: #ffffff; width: 400px; border: 8px #999999 solid; text-align: left; padding: 30px; display: none;"><div style="float: left;" id="atnCaptcha"></div> <br /><a class="link-silver-medium-ask_friends link-silver-medium-ask_friends-active" style="float: right" id="atnSaveCaptcha">Save</a></div>');

	$('#atnSaveCaptcha').click(function() {
		$('#atnCaptchaBox').css('display', 'none');
		captcha = $('#captcha').val();
		captcha_key = $('#captcha_key').val();
		btn.click();
	});

	$('.atnQuickQuestion').click(function() {
		if ($('#atnCaptchaBox').css('display') == 'block') {
			$('#captcha').select();
			return;
		} else if (captcha == '' && captcha_key == '' && $(this).text() == '…') {
			return;
		}

		btn = $(this);
		btn.css('background', '#ffffab');
		btn.text('…');

		var user = $(this).parent().parent().find('.link-blue').attr('href');

		GM_xmlhttpRequest({
			method: 'POST',
			data: 
				'authenticity_token=' + encodeURIComponent($('[name="authenticity_token"]').val()) +
				'&question%5Bquestion_text%5D=' + encodeURIComponent(getOption('default_question')) + 
				'&question%5Bforce_anonymous%5D=&question%5Bforce_anonymous%5D=' + ((getOption('default_public') === true) ? '' : 'force_anonymous') + 
				'&authenticity_token=' + encodeURIComponent($('[name="authenticity_token"]').val()) + 
				((captcha != '' && captcha_key != '')
					? '&captcha=' + captcha + '&captcha_key=' + captcha_key
					: ''
				)
			,
			headers: {
				'Accept' : 'text/javascript',
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With' : 'XMLHttpRequest'
			},
			url: user + '/questions/quick_create',
			onload: function (response) {
				if (response.responseText.indexOf('captcha') > 0) {
					var regex = /(<table.*<\/table>)/g;
					regex.exec(response.responseText);
					var captcha = RegExp.$1;
					var captcha = captcha.replace(/\\"/g, '"');
					var captcha = captcha.replace(/\\n/g, "\n");
					$('#atnCaptcha').html(captcha);
					$('#atnCaptchaBox').css('display', 'block');
				} else {
					captcha = '';
					captcha_key = '';
					btn.css('background', '#88ff88');
					btn.text('✓');
					btn.unbind();
				}
			}
		});
	});
}

// Profilseiten modifizieren
else {
	// Warnen, wenn man nicht anonym ist
	if ($('label').hasClass('strikeout') && getOption('use_warn_color')) {
		$('label').parent().parent().parent().css('background', getOption('warn_color'));
		$('label').css('font-weight', 'bold');
	}

	// Zeichenlimit bei Fragefeld auf 300 setzen
	$('#profile-input').attr('maxlength', 300);

	if (getOption('use_default_question') === true) {
		$('#profile-input').text(getOption('default_question'));
	}

	if (getOption('default_public') === true) {
		$('#question_force_anonymous').attr('checked', false);
	}
	$('#profile-input').select();
}

// Link-Tracking deaktivieren
function disableLinkTracking() {
	$('a[target="_blank"]').each(function() {
		if ($(this).attr('href').indexOf('http://link.ask.fm/goto/') > -1) {
			$(this).attr('href', $(this).text());
			if (getOption('use_mark_color') === true) {
				$(this).css({'background-color': getOption('mark_color')});
			}
		}
	});
}

if (getOption('disable_link_tracking')) {
	disableLinkTracking();
	setInterval(disableLinkTracking, 2000);
}