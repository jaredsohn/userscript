// ==UserScript==
// @name           Time on Page
// @namespace      http://www.dp.cx/userscripts
// @include        *
// ==/UserScript==

var windowStatusText = 'on page';
var sortable = [];
var wordMap = {
	'seconds' : 1,
	'minutes' : 60,
	'hours' : 3600,
	'days' : 86400
};
for (var word in wordMap)
	sortable.push([word, wordMap[word]])
sortable.sort(function(a, b) {return b[1] - a[1]})
var pageLoaded = (new Date()).getTime();

window.setTimeout(setWindowStatus, 1000);

function humanTime(secs, secsMap) {
	var out_string = '';
	for (var timer in secsMap) {
		if (parseInt(secs) == secs && secs > secsMap[timer][1]) {
			var res_for_timer = parseInt(secs / secsMap[timer][1]);
			var word = secsMap[timer][0];
			if (res_for_timer == 1) { word = word.replace(/s$/, ''); }
			out_string += '' + res_for_timer + ' ' + word + ' ';
			secs -= (res_for_timer * secsMap[timer][1]);
		}
	}
	return out_string;
}

function setWindowStatus() {
	var i_windowStatusText = windowStatusText;
	var currentPageTime = (new Date()).getTime();
	var totalPageLoaded = Math.ceil((currentPageTime - pageLoaded) / 1000);
	if (totalPageLoaded > 1)
		unsafeWindow.status = '' + humanTime(totalPageLoaded, sortable) + i_windowStatusText;
	setTimeout(setWindowStatus, 1000);
}
