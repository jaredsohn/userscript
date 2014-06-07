// ==UserScript==
// @name           IET MyCommunity Event Helper
// @namespace      inge.org.uk/userscripts
// @description    Helps fill in the new event form in IET MyCommunity by allowing you to paste in iCalendar data.
// @include        http://mycommunity.theiet.org/communities/events/edit-item/*
// @include        http://mycommunity.theiet.org/events/edit-item/*
// @license        MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright      2011-12, James Inge (http://geo.inge.org.uk/)
// ==/UserScript==

(function(){
	var target = document.getElementById("module_1-3");
	var icalField = document.createElement("div");
	icalField.id = "ics_div";
	icalField.innerHTML = "<label for='ics_paste'>Enter iCal data:</label><br/><textarea id='ics_paste' title='Paste iCal data here'></textarea> <button onclick='ics_fill();'>Fill</button>";
	target.parentNode.insertBefore(icalField, target);
	
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.innerHTML = "var tests=[],ics='';function ics_fill() {\
		function newDate( dt ) {\
			var d = new Date();\
			if(dt[7]!='') {\
				d.setUTCFullYear(dt[1]);\
				d.setUTCMonth(dt[2]-1);\
				d.setUTCDate(dt[3]);\
				d.setUTCHours(dt[4]);\
				d.setUTCMinutes(dt[5]);\
				d.setUTCSeconds(dt[6]);\
			} else {\
				d.setFullYear(dt[1]);\
				d.setMonth(dt[2]-1);\
				d.setDate(dt[3]);\
				d.setHours(dt[4]);\
				d.setMinutes(dt[5]);\
				d.setSeconds(dt[6]);\
			}\
			return d;\
		}\
		function setTime( dt, id ) {\
			document.getElementById(id).value = [dt.getAMPMHour(),':',dt.getPaddedMinutes(),dt.getAMPM().toLowerCase()].join('');\
		}\
		function setDate( dt, id ) {\
			document.getElementById(id).value = dt.toFormattedString();\
		}\
		ics = document.getElementById('ics_paste').value.replace(/\\n\\s/g,'').replace(/\\\\,/g,',').replace(/\\\\;/g,';');\
		tests = [\
			[/^\\s*SUMMARY:\\s*(.*)$/m, 'textField_event_name'],\
			[/^\\s*DESCRIPTION:\\s*(.*)$/m, 'textarea_event_description'],\
			[/^\\s*LOCATION:\\s*(.*)$/m, 'textField_event_venue'],\
			[/^\\s*URL:\\s*(.*)$/m, 'link_event_link']\
		];\
		for( var a = tests.length - 1; a>=0; a-- ) {\
			var r = tests[a][0].exec(ics);\
			if(r && r.length == 2) {\
				document.getElementById(tests[a][1]).value = r[1];\
			}\
		}\
		document.forms['events_item_form'].multipleChoice_event_privacy[1].click();\
		var d = /^\\s*DTSTART.*:\\s*(\\d\\d\\d\\d)(\\d\\d)(\\d\\d)T(\\d\\d)(\\d\\d)(\\d\\d)([Zz]?)/m.exec(ics);\
		if( d && d.length == 8 ) {\
			var day = newDate(d);\
			setDate(day, 'dateTime_event_start_date');\
			setTime(day, 'dateTime_event_start_time');\
			d = /^\\s*DTEND.*:\\s*(\\d\\d\\d\\d)(\\d\\d)(\\d\\d)T(\\d\\d)(\\d\\d)(\\d\\d)([Zz]?)/m.exec(ics);\
			if( d && d.length == 8 ) {\
				day = newDate(d);\
				setDate(day, 'dateTime_event_end_date');\
				setTime(day, 'dateTime_event_end_time');\
			}\
		} else {\
			var d1 = /^\\s*DTSTART.*:\\s*(\\d\\d\\d\\d)(\\d\\d)(\\d\\d)/m.exec(ics);\
			var d2 = /^\\s*DTEND.*:\\s*(\\d\\d\\d\\d)(\\d\\d)(\\d\\d)/m.exec(ics);\
			if( d1 && d2 && d1.length == 4 && d2.length == 4 ) {\
				d1.push(0,0,0,'');\
				var day1 = newDate(d1);\
				d2.push(0,0,0,'');\
				var day2 = newDate(d2);\
				setDate(day1, 'dateTime_event_start_date');\
				if(day1.toDateString() == day2.toDateString()) {\
					document.getElementById('dateTime_event_end_date').value = document.getElementById('dateTime_event_start_date').value;\
				} else {\
					day2.setTime( day2.getTime() - 86400000);\
					setDate(day2,'dateTime_event_end_date');\
				}\
				if(!document.getElementById('checkboxes_event_no_time').checked) document.getElementById('checkboxes_event_no_time').click();\
			}\
		}\
	}";
	var c = document.createElement("style");
	c.type = "text/css";
	c.innerHTML = "\
		#ics_div { border: solid 1px #C6C4C4; padding: 6px 12px; }\
		#ics_div textarea {border: solid 1px #ccc; box-shadow: 0 0 1em #ddd; width: 30em; }\
	";

	document.documentElement.firstChild.appendChild(c);
	document.documentElement.firstChild.appendChild(s);
	document.documentElement.firstChild.removeChild(s);
})();
