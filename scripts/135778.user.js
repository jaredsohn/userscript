// ==UserScript==
// @name          GitHub Calculate Total Hours
// @namespace     github-calculate-total-hours
// @description   GitHub Calculate Total Hours
// @version       0.1
// @include       https://github.com/*/issues?* 
// @author        Luciano Sother >> http://github.com/sother
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// modified by Luciano Sother
// original: http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
	function callMain() {
	    var script = document.createElement("script");
	    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery);";
	    document.body.appendChild(script);
	}
	if (typeof jQuery == 'undefined') { 
		var script = document.createElement("script");
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener('load', callMain, false);
		document.body.appendChild(script);
	} else {
		callMain();
	}
}

function main($) {
	var asigneesHours = {}; 
	var issues$ = $('.issue');

	if (issues$.length == 0) {
		return;
	}

	function safeParseFloat(textToParse, valueForNaN) {
		var floatValue = parseFloat(textToParse);
		return isNaN(floatValue) ? valueForNaN : floatValue;
	}

	function getIssueHoursFromText(text) {
		var myregexp = /\[(\d*(?:\.?\d*)?)h?\]/;
		var match = myregexp.exec(text);
		var hoursText = (match != null) ? match[1] : "0";
		return safeParseFloat(hoursText, 0);
	}

	function getAssigneeNameFromIssue(issue$) {
		return (issue$.find('a.assignee-bit').attr('href') || '/not assigned').substr(1);
	}

	function buildHoursByAssigneeReport() {
		var totalsHtml = '';
		var totalHours = 0;
		var separator = '';
		$.each(asigneesHours, function(key, value) {
			totalsHtml += separator + key + ": " + value + "h";
			totalHours += value;
			separator = '<br/>';
		});
		return totalsHtml + separator + "Total: " + totalHours + "h";
	}

	issues$.each(function(index, element) {
		var issue$ = $(element);
		var issueTitle = issue$.find('a.js-navigation-open').text();
		var issueHours = getIssueHoursFromText(issueTitle);
		var assigneeName = getAssigneeNameFromIssue(issue$);
		asigneesHours[assigneeName] = (asigneesHours[assigneeName] || 0) + issueHours;
	});

	$('.actions').after('<div class="actions">' + buildHoursByAssigneeReport() + '</div>')
}

// load jQuery and execute the main function
addJQuery(main);