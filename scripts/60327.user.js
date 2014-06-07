// ==UserScript==
// @name           Tasks Count in Gmail
// @description    Shows count of tasks in Gmail
// @namespace      http://userscripts.org/scripts/show/60327
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var tasksLink = null;
var timer = null;
var timeout = null;
var attemptCount = 0;
var interval = 480000;
var step = 60000;
var minInterval = 60000;
var maxInterval = 480000;

function checkTasksCount() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://mail.google.com/tasks/android',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var tasksNumber = responseDetails.responseText.match(/class="W L R"/g).length;
			
			if (tasksNumber > 0)
				tasksLink.innerHTML = '<strong>Tasks (' + tasksNumber + ')</strong>';
			else
				tasksLink.innerHTML = 'Tasks';
		}
	});
	if (interval < maxInterval) {
		interval += step;
	}

	timeout = setTimeout(checkTasksCount, interval);
}

function initCount() {
	attemptCount += 1;
	if (attemptCount > 10) { // To stop the timers on "dumb" pages
		clearInterval(timer);
		return;
	}

	tasksLink = document.getElementById(':qt');
	if (!tasksLink) {
		return;
	} else {
		checkTasksCount();
		clearInterval(timer);
	}
}

window.addEventListener('load', function(e) {
	timer = setInterval(initCount, 3000);
}, false);
