// ==UserScript==
// @name           TimezoneMonkey
// @namespace      *
// @description    Converts ISO datetime formats with Timezone to other Timezones (rev0.1). Lots of bugs and limitations, this just a first test to judge interest in this .......
// @include        https://*
// @include        http://
// ==/UserScript==

//
// by Fio Cattaneo   (fiorenzo1963@gmail.com)
//

//
// limitations:
// * text following time is not displayed .... yuck!
// * few timezones supported
// * needs to fetch local timezone from browser
// * only HH:MM TZ supported, needs to support YYYY-MM-DD HH:MM TZ and the ISO date format.
// * does not handle DST
// * many many more 
//

// This is a test page for Timezone Monkey. PLEASE DO NOT EDIT THIS SECTION.

// The current script parses a timestamp HH:MM TZ and converts into the local time. If you move the mouse over the link you'll see the original timestamp and utc conversion.

//
// * 23 59 PST  -- 23:59 PST
// * 13 49 PST  -- 13:49 PST
// * 23 22 SAST -- 23:22 SAST
// * 23 22 CET -- 23:22 CET
// * 23 59 NO TZ -- 23:59
// * 00 00 UTC -- 00:00 UTC
// * 01 00 UTC -- 01:00 UTC
// * 23 00 PST -- 23:00 PST
// * 23 24 CET -- 23:24 CET
// * 12 00 UTC -- 12:00 UTC
// * 12 45 PST -- 12:45 PST
// * 23 45 PST -- 23:45 PST
// * 05 00 JST -- 05:00 JST
// * 13 45 JST -- 13:45 JST
// * 05 00 NO TZ -- 05:00
//

//
// this code is very very dumb for now .....
// needs to be generalized from any timezone to any timezone
// should find out if there is a generic TZ database for JS.
// lots of people commented that Date() is buggy and doesn't work consistently from browser to browser.
// need to handle DST
//
// lots of TZ info at: http://home.tiscali.nl/~t876506/TZworld.html
//
function tz_to_utc_offset(tz)
{
	if (tz == "JST") return 9;
	if (tz == "UTC") return 0;
	if (tz == "GMT") return 0;
	if (tz == "CET") return 1;
	if (tz == "SAST") return 1;
	if (tz == "EET") return 2;
	if (tz == "MSK") return 3;
	if (tz == "ARG") return -3;
	if (tz == "PST") return -8;
	if (tz == "MST") return -7;
	if (tz == "CST") return -6;
	if (tz == "EST") return -5;
	// yeeek !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	return 0;
}

function utc_offset_to_tz(utc_off)
{
	switch (utc_off) {
	case -12: return "UTC-12";
	case -11: return "UTC-11";
	case -10: return "UTC-10";
	case -9: return "UTC-9";
	case -8: return "PST";
	case -7: return "MST";
	case -6: return "CST";
	case -5: return "EST";
	case -4: return "UTC-4";
	case -3: return "ARG";
	case -2: return "UTC-2";
	case -1: return "UTC-1";
	case 0: return "UTC";
	case 1: return "CET";
	case 2: return "EET";
	case 3: return "MSK";
	case 4: return "UTC+4";
	case 5: return "UTC+5";
	case 6: return "UTC+6";
	case 7: return "UTC+7";
	case 8: return "UTC+8";
	case 9: return "JST";
	case 10: return "UTC+10";
	case 11: return "UTC+11";
	case 12: return "UTC+12";
	default: return "UTC"; /* yuck !!!!!!!!!! */
	}
}

local_tz_offset = -8;
local_tz_name = utc_offset_to_tz(local_tz_offset);

function nf(x)
{
	if (x < 10) { return '0' + x; } else { return '' + x; }
}

function getTextNodes(oNode, aText)
{
	for (var i = 0; i < oNode.childNodes.length; i++) {
		var oChild = oNode.childNodes.item(i);
		switch(oChild.nodeType) {
		case 1:
			getTextNodes(oChild, aText);
			break;
		case 3:
			aText.push(oChild);
			break;
		}
	}
}

function time_convert(hh, mmstr, tzstr)
{
	var ret = '';
	if (hh >= 24) {
		ret = nf(hh - 24) + ":" + mmstr + " " + tzstr + " (+1day)";
	} else if (hh < 0) {
		ret = nf(hh + 24) + ':' + mmstr + ' ' + tzstr + ' (-1day)';
	} else
		ret = hh + ':' + mmstr + ' ' + tzstr;
	return ret;
}

var textnodes = [];
getTextNodes(document, textnodes);
var tz_id = 0;
for (var i = 0; i < textnodes.length; i++) {
	var elem = textnodes[i];
	var str = elem.nodeValue;
	var found = 0;
	var s_before = '';
	var hh = '';
	var mm = '';
	var tz = 'UTC';
	var s_after = '';
	var s = null;

	//
	// code to handle time HH:MM XXX[X], where XXX[X] is a timezone
	//
	s = str.match(/(.*)\s+(\d\d):(\d\d)\s+(\S\S\S\S)\s+(.*)/);
	if (s == null)
		s = str.match(/(.*)\s+(\d\d):(\d\d)\s+(\S\S\S)\s+(.*)/);
	if (s != null) {
		s_before = s[1];
		hh = s[2];
		mm = s[3];
		tz = s[4];
		s_after = s[5];
		found = 1;
		elem.nodeValue = str + " (match tz)";
	}
	if (s == null) {
		s = str.match(/(.*)\s+(\d\d):(\d\d)\s+(.*)/);
		if (s != null) {
			s_before = s[1];
			hh = s[2];
			mm = s[3];
			s_after = s[4];
			elem.nodeValue = str + " (match notz)";
			found = 1;
		}
	}

	if (s_before == null)
		s_before = '';
	if (s_after == null)
		s_after = '';

	if (found) {
		var datetimenode;
		var s_afternode;
		var utc_offset;
		var hh_original_tz;
		var hh_utc;
		var hh_local_tz;
		elem.nodeValue = s_before;
		datetimenode = document.createElement('a');
		datetimenode.href = '#';
		hh_original_tz = parseInt(hh);
		utc_offset = tz_to_utc_offset(tz);
		hh_utc = parseInt(hh) - utc_offset;
		hh_local_tz = hh_utc + local_tz_offset;
		//
		// put original TZ here plus the UTC equivalent
		//
		datetimenode.title = ' ' + hh + ':' + mm + ' ' + tz +
					'    ' +
					time_convert(hh_utc, mm, "UTC");
		//
		// put localized time here
		//
		// datetimenode.innerHTML = ' ' + local_tz_name;
		// datetimenode.innerHTML = ' ** ' +
		// 			'hh_original_tz=' + hh_original_tz +
		// 			',utc_offset=' + utc_offset +
		// 			',hh_utc=' + hh_utc + day_offset(hh_utc) +
		// 			',hh_local_tz=' + hh_local_tz + day_offset(hh_local_tz) +
		// 			' ** ';
		datetimenode.innerHTML = " " + time_convert(hh_local_tz, mm, local_tz_name) + " ";
		datetimenode.tz_id = 'tz_id' + (++tz_id);
		elem.parentNode.insertBefore(datetimenode, elem.nextSibling);
	}
}
