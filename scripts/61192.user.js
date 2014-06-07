// ==UserScript==
// @name           Stack Overflow: Auto Notify on New Interesting Questions
// @namespace      http://stackoverflow.com/
// @include        http://stackoverflow.com/
// @include        http://stackoverflow.com/?*
// @include        http://stackoverflow.com/questions
// @include        http://stackoverflow.com/questions?*
// @include        http://stackoverflow.com/unanswered
// @include        http://stackoverflow.com/unanswered?*
// @include        http://stackoverflow.com/questions/tagged/*
// @include        http://meta.stackoverflow.com/
// @include        http://meta.stackoverflow.com/?*
// @include        http://meta.stackoverflow.com/questions
// @include        http://meta.stackoverflow.com/questions?*
// @include        http://meta.stackoverflow.com/unanswered
// @include        http://meta.stackoverflow.com/unanswered?*
// @include        http://meta.stackoverflow.com/questions/tagged/*
// @include        http://serverfault.com/
// @include        http://serverfault.com/?*
// @include        http://serverfault.com/questions
// @include        http://serverfault.com/questions?*
// @include        http://serverfault.com/unanswered
// @include        http://serverfault.com/unanswered?*
// @include        http://serverfault.com/questions/tagged/*
// @include        http://superuser.com/
// @include        http://superuser.com/?*
// @include        http://superuser.com/questions
// @include        http://superuser.com/questions?*
// @include        http://superuser.com/unanswered
// @include        http://superuser.com/unanswered?*
// @include        http://superuser.com/questions/tagged/*
// ==/UserScript==

var host = window.location.hostname;
var currentTimeoutId = 0;
var pageTime = new Date();

function stopTimer() {
    if(currentTimeoutId != 0) {
        clearTimeout(currentTimeoutId);
	    currentTimeoutId = 0;
	}
}

function startTimer() {
    if(currentTimeoutId != 0) {
        stopTimer();
	}
	
	var refresh = parseInt(GM_getValue(host + '-performRefresh', 0));
	if (refresh) {
		var pollSpeed = parseInt(GM_getValue(host + '-refreshInterval', 15));
		var currentTime = new Date();
		
		var timeLeft = (pollSpeed * 1000) - (currentTime.getTime() - pageTime.getTime());
		
		timeLeft = timeLeft < 0 ? 0 : timeLeft;
		
		currentTimeoutId = setTimeout(function() { document.location.reload(); } , timeLeft);
	}
}

GM_registerMenuCommand("Set Refresh Interval", function () {
	stopTimer();
	var pollSpeed = GM_getValue(host + '-refreshInterval', 15);
	pollSpeed = parseInt(prompt("Refresh Interval (seconds)", pollSpeed));
	GM_setValue(host + '-refreshInterval', pollSpeed);
	startTimer();
});

GM_registerMenuCommand("Enable Refresh", function () {
	GM_setValue(host + '-performRefresh', 1);
	startTimer();
});

GM_registerMenuCommand("Disable Refresh", function () {
	stopTimer();
	GM_setValue(host + '-performRefresh', 0);
});

startTimer();

function waitForJQuery() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitForJQuery, 100); }
    else { $ = unsafeWindow.jQuery; onJQueryLoaded(); }
}

function PlaySound(sound) {
  var soundElement = document.getElementById('soundSpan');
  soundElement.innerHTML = '<embed id="NewQuestion" src="' + sound + '" autostart="true" loop="false" volume="100" hidden="true" />'
}

var sound = document.createElement('span');
sound.setAttribute('id', 'soundSpan');
var body = document.getElementsByTagName('body')[0];
body.appendChild(sound);

waitForJQuery();

function onJQueryLoaded() {
	var last = parseInt(GM_getValue(host + '-lastQuestionNumber', 0));
	
    var tags = new Array();
	$('#interestingTags .post-tag').each(function() { tags[tags.length] = this.innerHTML; });
	
	var questions = new Array();
	$('.question-summary').each(function() {
	    var success = false;
		$('#' + this.id + ' .post-tag').each(function() {
		    if($.inArray(this.innerHTML, tags) != -1) {
		        success = true;
		        return false;
		    }
		});
		if(success) {
		    questions[questions.length] = parseInt(this.id.match(/\d+/g));
		}
	});
	
	var largest = last;
	for(var i = 0; i < questions.length; i++) {
	    if(questions[i] > largest) {
	        largest = questions[i];
	    }
	}
	
	if(largest > last) { PlaySound('http://files.lanlordz.net/Crew/otac0n/NewQuestion-' + host + '.wav') }
	
	GM_setValue(host + '-lastQuestionNumber', largest);
}