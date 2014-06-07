// ==UserScript==
// @name           Stanford db-class auto countdown, retake quiz
// @description    When one tries to reteke the quiz too quickly, this script counts down and automatically refreshes the page when the time-limit elapses.
// @namespace      http://sepczuk.com
// @include        http://www.db-class.org/course/quiz/attempt*
// @include        http://www.ml-class.org/course/quiz/attempt*
// @downloadURL     https://userscripts.org/scripts/source/115430.user.js
// @updateURL       https://userscripts.org/scripts/source/115430.meta.js
// ==/UserScript==
(function(){
function pluralSadder(num) {
	return num==1?'':'s';
}

function secToMMSS(seconds) {
	var sec = seconds%60,
	    min = (seconds-sec)/60;
	return ((min>0)?(min + ' minute' + pluralSadder(min)):'') + ' ' + sec + ' second' + pluralSadder(sec);
}

try{
	// support Opera & Firefox
	var $ = (typeof unsafeWindow !== "undefined")?unsafeWindow.jQuery:jQuery;
	var waitMsg = $('.warning_message p').text();
	
	if (waitMsg.indexOf('before you can take the assignment again')===-1) return;
	
	var secondsToWait = (+(waitMsg.match(/(\d+)\s+minute/)||[,0])[1])*60 + 
	                    (+(waitMsg.match(/(\d+)\s+second/)||[,0])[1]);
	
	var inter = setInterval(
		function(){
			--secondsToWait;
			if (secondsToWait <= 0) {
				$('.warning_message p').text('Refreshimg...');
				clearInterval(inter);
				window.location.reload();
			} else {
				$('.warning_message p').text('You must wait ' + secToMMSS(secondsToWait) + ' before you can take the assignment again.');
			}
		}, 1000);
}catch(e){}
})();