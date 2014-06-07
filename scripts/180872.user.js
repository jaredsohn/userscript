// ==UserScript==
// @id             edX 6.00.1x calendar localtime
// @name           edX 6.00.1x calendar localtime
// @version        1.1
// @namespace      
// @author         stranac
// @description    Converts the due dates to local time
// @include        https://courses.edx.org/courses/MITx/6.00.1x/3T2013/2013_Spring_Calendar/
// @include        https://courses.edx.org/courses/MITx/6.00.1x/3T2013/courseware/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/180872.user.js
// ==/UserScript==

var month_names = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
};

// javascript being a broken language makes this function work with
// with any of the possible matches
function format_date(match, month, day, hour, minute, thingy) {
	// get current year
	var year = new Date().getFullYear();
	if (month_names.hasOwnProperty(month)) {
		month = month_names[month];
	}

	if (thingy == 'PM') {
		hour += 12;
	}

	var d = new Date(Date.UTC(year, month-1, day, hour, minute))
	// get rid of the timezone info (GMT +/-... name_of_zone)
	return d.toString().split(' GMT')[0];
}

var DATE_CAL = /\w+, (\d{1,2})\/(\d{1,2}),? (\d{2}):(\d{2})((A|P)M)? UTC/g;
var DATE_CW = /(\w+) (\d{1,2}), \d{4} at (\d{2}):(\d{2}) UTC/g;

var new_body = document.body.innerHTML.replace(DATE_CAL, format_date);
new_body = new_body.replace(DATE_CW, format_date)
document.body.innerHTML = new_body;