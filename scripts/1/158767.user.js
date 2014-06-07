// ==UserScript==
// @name			iRacing Auto Join
// @version			1.10
// @copyright		2012 - 2013, Paul Ilbrink
// @namespace		http://www.paulilbrink.nl/userscripts
// @description		This script add's an auto join checkbox after registering for a session. Once the timer ends and the green Join, Watch or Spot button comes available it's automatically clicked
// @match			http://members.iracing.com/membersite/member/*
// @exclude			http://members.iracing.com/membersite/member/EventResult*
// @exclude			http://members.iracing.com/membersite/member/JoinedRace.do
// @credits			http://userscripts.org/scripts/show/74072
// @credits			http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey
// ==/UserScript==

var script = document.createElement("script");
script.textContent = "(" + PI_iRacingAutoJoin.toString() + ")();";
document.body.appendChild(script);

function PI_iRacingAutoJoin() {

	var PI_debug = true;

	var PI_AJ_id = 'piAutoJoin';
	var PI_AJ_checkbox;
	var PI_AJ_clicked = false;

	function PI_log(msg, forceLog) {
		forceLog = forceLog || false;
		if ((PI_debug || forceLog) && typeof console !== 'undefined')
			console.log(msg);
	}

	if (typeof GM_addStyle !== 'function') {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.head.appendChild(style);
		};
	}

	// no race panel sessionstatus, so abort
	if ($('#racingpanel_sessionstatus').length === 0) {
		PI_log('No race panel found, aborting AutoJoin');
		return;
	}

	function PI_AJ_addEventListeners() {
		$(document).on('DOMSubtreeModified', '#racingpanel_sessionstatus', function(e) {
			console.log('DOMSubtreeModified', e);
			PI_AJ_handleButton();
		});
		$(document).on('change', '#' + PI_AJ_id, function() {
			$.cookie(PI_AJ_id, this.checked, {
				path: '/membersite',
				expires: 2
			});
			PI_log('cookie val update, it now is: ' + $.cookie(PI_AJ_id));
		});
	}

	function PI_AJ_removeListeners() {
		$(document).off('DOMSubtreeModified', '#racingpanel_sessionstatus');
		$(document).off('change', '#' + PI_AJ_id);
	}

	function PI_AJ_getButton() {
		var button, jqButton = $('#racingpanel_sessionstatus > div > div.racingpanel_button,#racingpanel_sessionstatus > div > a.racepanel_btn').first();

		if (jqButton.length) {
			button = {};

			button.text = jqButton.text();
			button.object = jqButton;

			// color
			var bgPattern = /cpb_(green|red|black)\.gif/;
			var bgImg = jqButton.css('background-image');
			if (bgImg === 'none')
				bgImg = jqButton.find('.racepanel_btn').css('background-image');
			if (bgPattern.test(bgImg))
				button.color = bgPattern.exec(bgImg)[1];
		}

		return button;
	}

	function PI_AJ_handleButton() {
		var button = PI_AJ_getButton();
		if (button) {
			switch (button.color) {
				case 'green':
					PI_AJ_click(button);
					break;
				default:
					if (/(Registration (Rejected|Closed)|Connected)/.test(button.text)) {
						PI_log('cleaning up from handleButton');
						PI_AJ_cleanUp();
						return;
					}
					PI_AJ_addCheckbox(button);
					break;
			}
		}
	}

	function PI_AJ_click(button) {
		PI_log('clicking... cookie value is: ' + $.cookie(PI_AJ_id));
		PI_log($.cookie(PI_AJ_id));
		PI_log('this was the cookie val from id: ' + PI_AJ_id);
		PI_log('and the button stuff that triggered the click is: ');
		PI_log(button);
		var clickNow = $.cookie(PI_AJ_id) === 'true' && !PI_AJ_clicked && button.color === 'green' &&
				/Join|Watch|Spot/.test(button.text);
		if (clickNow) {
			PI_AJ_clicked = true;
			$(button.object).find('div').text('Auto clicking in progress');
		} else if (/Test Car on Track/.test(button.text)) {
			PI_log('green button test car on track detected, abort cleanup');
			PI_log(button);
            //alert('Oh oh, test car on track failure detected');
			return false;
		}
		PI_log('cleaning up from click()');
		PI_AJ_cleanUp();

		if (clickNow)
			$(button.object).click();

	}

	function PI_AJ_cleanUp() {
		$.cookie(PI_AJ_id, null, {
			path: '/membersite'
		});
		PI_AJ_removeListeners();
		$(PI_AJ_checkbox).remove();
	}


	function PI_AJ_addCheckbox(button) {
		if (!PI_AJ_checkbox) {
			PI_log('PI_AJ_addCheckbox');
			PI_log('actualy creating and adding it');
			PI_AJ_checkbox = document.createElement('input');
			PI_AJ_checkbox.setAttribute('type', 'checkbox');
			PI_AJ_checkbox.setAttribute('id', PI_AJ_id);

			$(button.object).append(PI_AJ_checkbox);

			if ($.cookie(PI_AJ_id))
				PI_AJ_checkbox.setAttribute('checked', 'checked');
		} else {
			var buttonVerify = $('#racingpanel_session #piAutoJoin');
			PI_log('button verify length: ' + buttonVerify.length);
		}
	}

	// why not doc ready?
	$(window).load(function() {
		GM_addStyle('#racingpanel_countdown_timer{right:20px}#' + PI_AJ_id + '{position:absolute;right:0px;top:4px}');
		PI_AJ_addEventListeners();
		PI_AJ_handleButton();
	});
}