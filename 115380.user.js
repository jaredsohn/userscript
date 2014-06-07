// ==UserScript==
// @name           Stanford db-class auto resender
// @description    When one tries to resend the answer too quickly, this script counts down and automatically resends answers when the time-limit elapses.
// @namespace      http://sepczuk.com
// @include        http://www.db-class.org/course/quiz/immediate_feedback_engine*
// @downloadURL     https://userscripts.org/scripts/source/115380.user.js
// @updateURL       https://userscripts.org/scripts/source/115380.meta.js
// ==/UserScript==
(function(){
try{
	// support Opera & Firefox
	var $ = (typeof unsafeWindow !== "undefined")?unsafeWindow.jQuery:jQuery;

	var secondsToWait = +$('.error_message').text().match(/wait for (\d+) sec/)[1];
	var inter = setInterval(
		function(){
			--secondsToWait;
			if (secondsToWait <= 0) {
				$('.error_message').text('Resubmitting...');
				clearInterval(inter);
				$('[name=get_feedback]').click()
			} else {
				$('.error_message').text('Counting... ' + secondsToWait);
			}
		}, 1000);
}catch(e){}
})();