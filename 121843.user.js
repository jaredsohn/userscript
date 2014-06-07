// ==UserScript==
// @name           autoSubmit
// @namespace      http://userscripts.org/users/double0z
// @include        http://bbs.maxpda.com/forum.php?mod=viewthread&tid=*
// @include        http://bbs.maxpda.com/thread-*.html
// @include        http://www.hi-pda.com/forum/viewthread.php?tid=*
// @resource jQuery https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// @resource jQueryUI https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js
// @resource jQueryUI-CSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css
// @resource jQueryUI-TimePicker http://trentrichardson.com/examples/timepicker/js/jquery-ui-timepicker-addon.js
// @resource jQueryUI-TimePicker-CSS http://userscripts.org/scripts/source/121840.user.js
// ==/UserScript==

var $;

// Add jQuery
(function() {

	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;
		var GM_JQ = document.createElement('script');
		GM_JQ.type = 'text/javascript';
		GM_JQ.innerHTML = GM_getResourceText('jQuery');
		GM_Head.appendChild(GM_JQ); // add javascript file
		$ = unsafeWindow.$;
	}

})();

// Add jQuery UI
(function() {

	if (typeof $.prototype.jquery != 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;
		var GM_JQ = document.createElement('script');
		GM_JQ.type = 'text/javascript';
		GM_JQ.innerHTML = GM_getResourceText('jQueryUI');
		GM_Head.appendChild(GM_JQ); // add javascript file
		GM_addStyle(GM_getResourceText('jQueryUI-CSS'));// add style
	}

})();

// add TimePicker
(function() {

	if (typeof $.ui != 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement;
		var GM_JQ = document.createElement('script');
		GM_JQ.type = 'text/javascript';
		GM_JQ.innerHTML = GM_getResourceText('jQueryUI-TimePicker');
		GM_Head.appendChild(GM_JQ); // add javascript file
		GM_addStyle(GM_getResourceText('jQueryUI-TimePicker-CSS'));// add style
	}
})();

(function() {
	$("<div></div>").attr('id', 'wraperDialog').attr('title', 'Auto Submit').css('textAlign', 'right').appendTo("body");

	// Now Time
	$('<span>Current Time:</span>').appendTo('#wraperDialog');
	$('<input/>').attr('type', 'text').attr('id', 'currentTime').appendTo('#wraperDialog');
	$('<br/>').appendTo('#wraperDialog');

	// Set Time
	$('<span>Submit Time:</span>').appendTo('#wraperDialog');
	$('<input/>').attr('type', 'text').attr('id', 'submitTime').appendTo('#wraperDialog');
	$('<br/>').appendTo('#wraperDialog');

	// Delay Time
	$('<span>Delay Time:</span>').appendTo('#wraperDialog');
	$('<input/>').attr('type', 'text').attr('id', 'delayTime').appendTo('#wraperDialog');
	$('<br/>').appendTo('#wraperDialog');

	// Remain Time
	$('<span>Remain Time:</span>').appendTo('#wraperDialog');
	$('<input/>').attr('type', 'text').attr('id', 'remainTime').appendTo('#wraperDialog');
	$('<br/>').appendTo('#wraperDialog');

})();


(function() {

	$("#wraperDialog")
			.dialog(
					{
						position : 'right',
						resizable : false,
						draggable : true,
						buttons : [ {
							text : "Submit",
							click : function() {

								// save delay time
								setTimeout(function() {
									GM_setValue('delayTime', $('#delayTime').val());
								}, 0);

								// submit millisecond
								var submitMillisecond = Date.parse($('#submitTime').val());

								// count delay millisecond
								var delayTime = $('#delayTime').val().split(':');
								delayMillisecond = parseInt(delayTime[0]) * 1000 + parseInt(delayTime[1]);

								// currend millisecond
								var currentMillisencond = (new Date()).getTime();

								// remain millisecond
								var remainMillisecond = submitMillisecond - currentMillisencond - delayMillisecond;

								if (remainMillisecond > 0) {
									setTimeout(function() {
										//alert('Submit time has arrived!');
										$('#fastpostsubmit').click();
									}, remainMillisecond);
								} else {
									alert('Submit time has been pass!');
								}

							}
						} ]
					});
	
	function getCurrentTimeString(){
		var currentDate = new Date();
		return currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + " "
		+ currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
	}

	// init submit Time format:00:00:00
	$('#submitTime').datetimepicker({
		showHour : true,
		showMinute : true,
		showSecond : true,
		showMillisec : false,
		timeFormat : 'h:m:s',
		separator : ' ',
		dateFormat : 'yy/m/d'
	});
	// default current time
	var currentDate = new Date();
	$('#submitTime').val(getCurrentTimeString());

	// init delay time
	var delayTime = GM_getValue('delayTime', null);
	if (delayTime == null) {// first time
		delayTime = '00:000';
	}
	$('#delayTime').val(delayTime);

	$('#delayTime').timepicker({
		showHour : false,
		showMinute : false,
		showSecond : true,
		showMillisec : true,
		timeFormat : 'ss:l'

	});

	// Update Current Time
	window.setInterval(function() {
		$('#currentTime').val(getCurrentTimeString());
	}, 1000);

})();