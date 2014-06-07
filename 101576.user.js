// ==UserScript==
// @name           Motorola Surfboard SBG6580 Cable Modem Output Formatter
// @namespace      trparky.motorola.sbg6580.formatter
// @description    This script changes the output of many pages of the Motorola SBG6580 Surfboard Cable Modem.
// @version        2.29
// @include        */RgConnect.asp
// @include        */RgEventLog.asp
// @include        */RgSwInfo.asp
// @include        */RgSecurity.asp
// @include        */RgDhcp.asp
// ==/UserScript==

// Script Home: http://www.toms-world.org/motorolasurfboard.user.js

// NOTE: The Javascript DATE() and STRTOTIME() functions were borrowed from the "Use PHP functions in JavaScript"
// project located at http://phpjs.org.

// Official Change Log can be found at http://bit.ly/MBdGHq.
// Don't process

var version = "2.29";

var SUC_script_num = 101576; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

if (window.addEventListener) {
	window.addEventListener("load", function(e) {
		function date(format, timestamp) {
			var that = this,
			jsdate, f, formatChr = /\\?([a-z])/gi,
			formatChrCb,
			// Keep this here (works, but for code commented-out
			// below for file size reasons)
			//, tal= [],
			_pad = function (n, c) {
				if ((n = n + '').length < c) {
					return new Array((++c) - n.length).join('0') + n;
				}
				return n;
			},
			txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			formatChrCb = function (t, s) {
				return f[t] ? f[t]() : s;
			};
			f = {
				// Day
				d: function () { // Day of month w/leading 0; 01..31
					return _pad(f.j(), 2);
				},
				D: function () { // Shorthand day name; Mon...Sun
					return f.l().slice(0, 3);
				},
				j: function () { // Day of month; 1..31
					return jsdate.getDate();
				},
				l: function () { // Full day name; Monday...Sunday
					return txt_words[f.w()] + 'day';
				},
				N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
					return f.w() || 7;
				},
				S: function () { // Ordinal suffix for day of month; st, nd, rd, th
					var j = f.j();
					return j > 4 || j < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[j % 10] || 'th';
				},
				w: function () { // Day of week; 0[Sun]..6[Sat]
					return jsdate.getDay();
				},
				z: function () { // Day of year; 0..365
					var a = new Date(f.Y(), f.n() - 1, f.j()),
					b = new Date(f.Y(), 0, 1);
					return Math.round((a - b) / 864e5) + 1;
				},

				// Week
				W: function () { // ISO-8601 week number
					var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
					b = new Date(a.getFullYear(), 0, 4);
					return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
				},

				// Month
				F: function () { // Full month name; January...December
					return txt_words[6 + f.n()];
				},
				m: function () { // Month w/leading 0; 01...12
					return _pad(f.n(), 2);
				},
				M: function () { // Shorthand month name; Jan...Dec
					return f.F().slice(0, 3);
				},
				n: function () { // Month; 1...12
					return jsdate.getMonth() + 1;
				},
				t: function () { // Days in month; 28...31
					return (new Date(f.Y(), f.n(), 0)).getDate();
				},

				// Year
				L: function () { // Is leap year?; 0 or 1
					return new Date(f.Y(), 1, 29).getMonth() === 1 | 0;
				},
				o: function () { // ISO-8601 year
					var n = f.n(),
					W = f.W(),
					Y = f.Y();
					return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
				},
				Y: function () { // Full year; e.g. 1980...2010
					return jsdate.getFullYear();
				},
				y: function () { // Last two digits of year; 00...99
					return (f.Y() + "").slice(-2);
				},

				// Time
				a: function () { // am or pm
					return jsdate.getHours() > 11 ? "pm" : "am";
				},
				A: function () { // AM or PM
					return f.a().toUpperCase();
				},
				B: function () { // Swatch Internet time; 000..999
					var H = jsdate.getUTCHours() * 36e2,
					// Hours
					i = jsdate.getUTCMinutes() * 60,
					// Minutes
					s = jsdate.getUTCSeconds(); // Seconds
					return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
				},
				g: function () { // 12-Hours; 1..12
					return f.G() % 12 || 12;
				},
				G: function () { // 24-Hours; 0..23
					return jsdate.getHours();
				},
				h: function () { // 12-Hours w/leading 0; 01..12
					return _pad(f.g(), 2);
				},
				H: function () { // 24-Hours w/leading 0; 00..23
					return _pad(f.G(), 2);
				},
				i: function () { // Minutes w/leading 0; 00..59
					return _pad(jsdate.getMinutes(), 2);
				},
				s: function () { // Seconds w/leading 0; 00..59
					return _pad(jsdate.getSeconds(), 2);
				},
				u: function () { // Microseconds; 000000-999000
					return _pad(jsdate.getMilliseconds() * 1000, 6);
				},

				// Timezone
				e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
					// The following works, but requires inclusion of the very large
					// timezone_abbreviations_list() function.
					/*              return this.date_default_timezone_get();
					*/
					throw 'Not supported (see source code of date() for timezone on how to add support)';
				},
				I: function () { // DST observed?; 0 or 1
					// Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
					// If they are not equal, then DST is observed.
					var a = new Date(f.Y(), 0),
					// Jan 1
					c = Date.UTC(f.Y(), 0),
					// Jan 1 UTC
					b = new Date(f.Y(), 6),
					// Jul 1
					d = Date.UTC(f.Y(), 6); // Jul 1 UTC
					return 0 + ((a - c) !== (b - d));
				},
				O: function () { // Difference to GMT in hour format; e.g. +0200
					var a = jsdate.getTimezoneOffset();
					return (a > 0 ? "-" : "+") + _pad(Math.abs(a / 60 * 100), 4);
				},
				P: function () { // Difference to GMT w/colon; e.g. +02:00
					var O = f.O();
					return (O.substr(0, 3) + ":" + O.substr(3, 2));
				},
				T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
					// The following works, but requires inclusion of the very
					// large timezone_abbreviations_list() function.
					/*              var abbr = '', i = 0, os = 0, default = 0;
					if (!tal.length) {
					tal = that.timezone_abbreviations_list();
					}
					if (that.php_js && that.php_js.default_timezone) {
					default = that.php_js.default_timezone;
					for (abbr in tal) {
					for (i=0; i < tal[abbr].length; i++) {
					if (tal[abbr][i].timezone_id === default) {
					return abbr.toUpperCase();
					}
					}
					}
					}
					for (abbr in tal) {
					for (i = 0; i < tal[abbr].length; i++) {
					os = -jsdate.getTimezoneOffset() * 60;
					if (tal[abbr][i].offset === os) {
					return abbr.toUpperCase();
					}
					}
					}
					*/
					return 'UTC';
				},
				Z: function () { // Timezone offset in seconds (-43200...50400)
					return -jsdate.getTimezoneOffset() * 60;
				},

				// Full Date/Time
				c: function () { // ISO-8601 date.
					return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
				},
				r: function () { // RFC 2822
					return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
				},
				U: function () { // Seconds since UNIX epoch
					return jsdate.getTime() / 1000 | 0;
				}
			};
			this.date = function (format, timestamp) {
				that = this;
				jsdate = ((typeof timestamp === 'undefined') ? new Date() : // Not provided
				(timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
				new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
				);
				return format.replace(formatChr, formatChrCb);
			};
			return this.date(format, timestamp);
		}

		function strtotime(str, now) {
			var i, match, s, strTmp = '',
			parse = '';

			strTmp = str;
			strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
			strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars

			if (strTmp == 'now') return (new Date()).getTime() / 1000; // Return seconds, not milli-seconds
			else if (!isNaN(parse = Date.parse(strTmp))) return (parse / 1000);
			else if (now) now = new Date(now * 1000); // Accept PHP-style seconds
			else now = new Date();

			strTmp = strTmp.toLowerCase();

			var __is = {
				day: {
					'sun': 0,
					'mon': 1,
					'tue': 2,
					'wed': 3,
					'thu': 4,
					'fri': 5,
					'sat': 6
				},
				mon: {
					'jan': 0,
					'feb': 1,
					'mar': 2,
					'apr': 3,
					'may': 4,
					'jun': 5,
					'jul': 6,
					'aug': 7,
					'sep': 8,
					'oct': 9,
					'nov': 10,
					'dec': 11
				}
			};

			var process = function (m) {
				var ago = (m[2] && m[2] == 'ago');
				var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);

				switch (m[0]) {
					case 'last':
					case 'next':
						switch (m[1].substring(0, 3)) {
							case 'yea':
								now.setFullYear(now.getFullYear() + num);
								break;
							case 'mon':
								now.setMonth(now.getMonth() + num);
								break;
							case 'wee':
								now.setDate(now.getDate() + (num * 7));
								break;
							case 'day':
								now.setDate(now.getDate() + num);
								break;
							case 'hou':
								now.setHours(now.getHours() + num);
								break;
							case 'min':
								now.setMinutes(now.getMinutes() + num);
								break;
							case 'sec':
								now.setSeconds(now.getSeconds() + num);
								break;
							default:
								var day;
								if (typeof(day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
									var diff = day - now.getDay();
									if (diff == 0) diff = 7 * num;
									else if (diff > 0) {
										if (m[0] == 'last') diff -= 7;
									}
									else {
										if (m[0] == 'next') diff += 7;
									}
									now.setDate(now.getDate() + diff);
								}
						}
						break;
					default:
						if (/\d+/.test(m[0])) {
						num *= parseInt(m[0], 10);

						switch (m[1].substring(0, 3)) {
							case 'yea':
								now.setFullYear(now.getFullYear() + num);
								break;
							case 'mon':
								now.setMonth(now.getMonth() + num);
								break;
							case 'wee':
								now.setDate(now.getDate() + (num * 7));
								break;
							case 'day':
								now.setDate(now.getDate() + num);
								break;
							case 'hou':
								now.setHours(now.getHours() + num);
								break;
							case 'min':
								now.setMinutes(now.getMinutes() + num);
								break;
							case 'sec':
								now.setSeconds(now.getSeconds() + num);
								break;
						}
					}
					else return false;

					break;
				}
				return true;
			};

			match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
			if (match != null) {
				if (!match[2]) match[2] = '00:00:00';
				else if (!match[3]) match[2] += ':00';

				s = match[1].split(/-/g);

				for (i in __is.mon) {
					if (__is.mon[i] == s[1] - 1) s[1] = i;
				}
				s[0] = parseInt(s[0], 10);

				s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';

				return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
			}

			var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';

			match = strTmp.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
			if (match == null) return false;

			for (i = 0; i < match.length; i++) {
				if (!process(match[i].split(' '))) return false;
			}

			return (now.getTime() / 1000);
		}

		function timeTranslator(text) {
	      		var dateRegEx = /[A-Za-z]{1,3} [A-Za-z]{1,3} [0-9]+ [0-9]+:[0-9]+:[0-9]+ [0-9]+/g;

			return text.replace(dateRegEx, function(oldString) {
				timeStamp = strtotime(oldString);
				timeStamp += ((60 * 60) * 1); // Subtracts four hours from timestamp to correct for wrong timezone

				dateString = date("l, F j, Y, g:i:s A", timeStamp);

				return dateString;
			});
		}

		function isEmpty(input) {
			input = input.replace(/^\s+|\s+$/g, "");
			if (input == "") return true;
			else return false;
		}

		documentLocation = document.location.toString();

		if ( (/RgConnect/i.test(documentLocation)) || (/RgEventLog/i.test(documentLocation)) || (/RgSwInfo/i.test(documentLocation)) || (/RgSecurity/i.test(documentLocation)) || (/RgDhcp/i.test(documentLocation)) ) {
	      		documentBody = document.body.innerHTML;

			document.head = document.head || document.getElementsByTagName('head')[0];
			documentHead = document.head.innerHTML.toString();

			documentHead = documentHead.replace(/(?:<meta content="FrontPage\.Editor\.Document" name="ProgId">|<meta name="ProgId" content="FrontPage\.Editor\.Document">|<meta name="GENERATOR" content="Microsoft FrontPage 5\.0">|<meta content="Microsoft FrontPage 5\.0" name="GENERATOR">)/ig, "");

			document.head.innerHTML = documentHead;
			delete documentHead;

			// If the browser is Google Chrome and the page contains evidence of the Google
			// Chrome Roboform Toolbar extension installed, this code is executed to fix a
			// conflict with this script and the Google Chrome Roboform Toolbar extension.
			if ( (/roboform-adapter/i.test(documentBody)) && (/Chrome/i.test(navigator.userAgent)) ) {
				documentBody = documentBody.replace(/ sourceindex="[0-9]+"/ig, "");
			}

			documentBody = documentBody.replace(/RgConfiguration\.asp/i, "javascript:alert('Function Disabled.\\n\\nThis function is not used for any purpose.');");

	      		// Prints notice about script details at the bottom of the page.
	      		documentBody = documentBody.replace(/All rights reserved\./ig, "All rights reserved.<br />Page modifications powered by Greasemonkey Motorola Surfboard SBG6580 Cable Modem Output Formatter script Version " + version + ".  Written by <a href=\"http://www.google.com/recaptcha/mailhide/d?k=01v85WyzCfHZtnqAiPfXWtAQ==&amp;c=O0X0H-rVCSRdYIcSjLnfHeSA7JUPYmvoSSD3mKdZwzg=\" onclick=\"window.open('http://www.google.com/recaptcha/mailhide/d?k\07501v85WyzCfHZtnqAiPfXWtAQ\75\75\46c\75O0X0H-rVCSRdYIcSjLnfHeSA7JUPYmvoSSD3mKdZwzg\075', '', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=300'); return false;\" title=\"Reveal this e-mail address\">Tom Parkison</a>.  <a href=\"http://bit.ly/MBdGHq\">Script Changelog</a><br />Some source code used in this project has been taken from the \"Use PHP functions in JavaScript\" project located at <a href=\"http://phpjs.org\">http://phpjs.org</a>.");

	      		if (/RgEventLog/i.test(documentLocation)) {
	      			// This code processes the Log Entries page.

	      			documentBody = documentBody.replace(/<td><font color=\"#FFFFFF\"><b>&nbsp;Priority&nbsp;<\/b><\/font><\/td>/i, "");
	      			documentBody = documentBody.replace(/<td>&nbsp;(?:Error|Warning|Critical|Notice) \([0-9]{1,2}\)&nbsp;<\/td>/ig, "");

	      			documentBody = documentBody.replace(/width="750">/ig, 'width="1000">');
	      			documentBody = documentBody.replace(/width="185"/ig, 'width="300"');
	      			documentBody = documentBody.replace(/<td><font color="#FFFFFF">/ig, '<td width="100"><font color="#FFFFFF">');
	      			documentBody = documentBody.replace(/<\/td><td width="450">/ig, '</td><td>');

	      			if (/Time Not Established/i.test(documentBody)) documentBody = documentBody.replace(/event log\./ig, 'event log.<br /><br /><a href="javascript:void(0);" onClick="alert(\'This is caused by log entries that have been added to the log file before the cable modem got the time from the remote CMTS.\');">Why "Time Not Established"?</a>');

				// Parses log entries and gives errors some kind of meaning.

				// Parses and processes log entries that are somewhat alarming and applies a reason in plain English.
	      			documentBody = documentBody.replace(/&nbsp;(Rng Rsp Abort Status - Reinitialize MAC...)/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Connection to remote CMTS lost, connection re-established)</strong>");
				documentBody = documentBody.replace(/&nbsp;((?:SYNC Timing Synchronization failure - Failed to acquire FEC framing;CM-MAC=|SYNC Timing Synchronization failure - Failed to acquire QAM\/QPSK symbol timing;;CM-MAC=|Unicast Ranging Received Abort Response - Re-initializing MAC;CM-MAC=)+(?:[\d:a-z]{17})(?:;CMTS-MAC=)(?:[\d:a-z]{17})(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Connection to remote CMTS lost, connection re-established)</strong>");
	      			documentBody = documentBody.replace(/&nbsp;(No Ranging Response received - T3 time-out)/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Cable modem wasn't able to establish an upstream timeslot, timeout occurred)</strong>");
				documentBody = documentBody.replace(/&nbsp;((?:Received Response to Broadcast Maintenance Request, But no Unicast Maintenance opportunities received - T4 time out;CM-MAC=)+(?:[\d:a-z]{17})(?:;CMTS-MAC=)(?:[\d:a-z]{17})(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Cable modem wasn't able to establish an upstream timeslot for maintence message, timeout occurred)</strong>");
				documentBody = documentBody.replace(/&nbsp;((?:DHCP RENEW sent - No response for IPv4;CM-MAC=)+(?:[\d:a-z]{17})(?:;CMTS-MAC=)(?:[\d:a-z]{17})(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Unable to renew IP address)</strong>");
				documentBody = documentBody.replace(/&nbsp;(Dhcp Renew Failed - Reinitialize MAC\.\.\.)/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Reinitializing Cable Modem Data Access Layer)</strong>");
				documentBody = documentBody.replace(/&nbsp;((?:SYNC Timing Synchronization failure - Failed to receive MAC SYNC frame within time-out period;CM-MAC=)+[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Unable to sync with remote CMTS, possibly caused by noise on the line.)</strong>');
				documentBody = documentBody.replace(/&nbsp;((?:DHCP FAILED - Discover sent, no offer received;CM-MAC=|DHCP FAILED - Request sent, No response;CM-MAC=)+[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: DHCP request was sent to remote CMTS but request wasn't answered within specified time, DHCP request resent)</strong>");
				documentBody = documentBody.replace(/&nbsp;(Dhcp Init Failed - Reinitialize MAC...)/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Unable to obtain IP address from remote CMTS via DHCP)</strong>");
				documentBody = documentBody.replace(/&nbsp;(Lost MDD Timeout;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: The cable modem was expecting a scheduled downstream maintenence message from the cable company, that scheduled message was not received when the modem was expecting it.  This may indicate that there are problems on the downstream signal path.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(MDD message timeout;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: The cable modem was expecting a scheduled downstream maintenence message from the cable company, that scheduled message was not received when the modem was expecting it.  THis may indicate that there are problems on the downstream signal path.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(Missing BP Configuration Setting TLV Type: 17\.(?:8|9);CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: There was missing configuration data that your cable modem was expecting, this may indicate that there is noise on the downstream signal path.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(Started Unicast Maintenance Ranging - No Response received - T3 time-out;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: The cable modem requested multiple times to get permission to send data on the upstream signal path, all attempts to get permission failed.  Your cable modem reset and re-registered with the CMTS.  This may indicate noise on the upstream signal path.)</strong>');
				documentBody = documentBody.replace(/(TLV-11 - unrecognized OID;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17};CM-QOS=1\.1;CM-VER=3\.0;)/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: The cable modem received a config file from your cable company that did not contain vendor information for your particular cable modem.  Nothing To Worry About.)</strong>');

	      			// Parses and processes log entries that are items to not really worry about.  These are errors that most people shouldn't worry about.
				//documentBody = documentBody.replace(/((?:DHCP Renew - lease parameters UTC Time Offset modified;CM-MAC=|DHCP Renew - lease parameters Time Protocol Servers modified;CM-MAC=|DHCP RENEW WARNING - Field invalid in response v4 option;CM-MAC=|DHCP WARNING - Non-critical field invalid in response ;CM-MAC=(?:)?|Lost MDD Timeout;CM-MAC=|MDD message timeout;CM-MAC=|Missing BP Configuration Setting TLV Type: 17\.8;CM-MAC=(?:)?|Missing BP Configuration Setting TLV Type: 17\.9;CM-MAC=(?:)?|Started Unicast Maintenance Ranging - No Response received - T3 time-out;CM-MAC=)[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1 <strong style=\"font-size: 8pt;\">(Explanation: Nothing To Worry About)</strong>');
				documentBody = documentBody.replace(/&nbsp;(DHCP Renew - lease parameters UTC Time Offset modified;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Cable company has sent a command to your modem to change the Time Zone.  Nothing To Worry About.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(DHCP Renew - lease parameters Time Protocol Servers modified;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Cable company has sent a command to your modem to change the servers from which to get updated time from.  Nothing To Worry About.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(DHCP RENEW WARNING - Field invalid in response v4 option;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Invalid information was provided by the cable company while assigning the device an internal management-side IP address, not your WAN IP address.  Nothing To Worry About.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(DHCP WARNING - Non-critical field invalid in response ;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17}(?:;CM-QOS=1\.0;CM-VER=3\.0;|;CM-QOS=1\.1;CM-VER=3\.0;))/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Invalid information was provided by the cable company as part of a DHCP packet to the management side of the cable modem, that invalid piece of information is being ignored.  Nothing To Worry About)</strong>');
				
				// Parses and processes log entries that need further explanation than just a "Nothing To Worry About".
				documentBody = documentBody.replace(/&nbsp;(ToD request sent - No Response received;CM-MAC=[\d:a-z]{17};CMTS-MAC=[\d:a-z]{17};CM-QOS=1.0;CM-VER=3.0;)/ig, '$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Unable to get Time of Day from remote CMTS.)</strong>');
				documentBody = documentBody.replace(/&nbsp;(Resetting the cable modem due to docsDevResetNow)/ig, "$1<br /><strong style=\"font-size: 8pt;\">(Explanation: Cable company technician sent the cable modem a remote reboot command.)</strong>");

				// This runs a routine to translate Time Strings into nicer looking Time Strings.
	      			documentBody = timeTranslator(documentBody);

				if (/Nothing To Worry About/i.test(documentBody)) documentBody = documentBody.replace(/event log\./ig, 'event log.<br /><br /><a href="javascript:void(0);" onClick="alert(\'There are some error messages that this cable modem gives that seem alarming but really are not that bad, hence the reason why I say Nothing To Worry About.\');">Why "Nothing To Worry About"?</a>');

				// Checks to see if we have no log entries.
				if (/<b>&nbsp;Description&nbsp;<\/b><\/font><\/td><\/tr><\/tbody><\/table>/i.test(documentBody)) documentBody = documentBody.replace(/event log\./ig, 'event log.<br /><br />There are no log entries to display.');
	      		}
	      		else if (/RgDhcp/i.test(documentLocation)) {
	      			documentBody = documentBody = documentBody.replace(/\.000\./g, ".0.");
	      			documentBody = documentBody = documentBody.replace(/D:-- H:-- M:-- S:--/g, "(None Specified)");
	      			documentBody = documentBody = documentBody.replace(/\* RESERVED INACTIVE \*/g, "Reserved, Inactive");
	      			documentBody = documentBody = documentBody.replace(/\* RESERVED ACTIVE \*/g, "Reserved, Active");
	      			documentBody = documentBody.replace(/[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}/g, function(MACAddress) { return MACAddress.toUpperCase() });
	      		}
	      		else if (/RgConnect/i.test(documentLocation)) {
	      			// This code processes the Connection Details page.

	      			// Processes downstream SNR values
	      			documentBody = documentBody.replace(/(?:<td>(?: )?)-?0*\d*\.\d dBmV<\/td><td>(-?\d+(?:\.\d)?) dB<\/td>/ig, function(originalString, SNR) {
	      				SNR = parseFloat(SNR);

	      				if (SNR > 28) originalString = originalString.replace(" dB</td>", " dB (Good Signal)</td>");
	      				else originalString = originalString.replace(" dB</td>", " dB (Weak Signal)</td>");

	      				return originalString;
	      			});

	      			// Processes downstream Power values
	      			documentBody = documentBody.replace(/(?:<td>(?: )?)(-?0*\d*\.\d) dBmV<\/td><td>-?\d+(?:\.\d)? dB(?: \((?:Good Signal|Weak Signal)\))?<\/td>/ig, function(originalString, power) {
	      				power = parseFloat(power);

	      				if ((power < 15) && (power > -15)) originalString = originalString.replace(" dBmV</td>", " dBmV (Good Signal)</td>");
	      				else if (power < -15) originalString = originalString.replace(" dBmV</td>", " dBmV (Weak Signal)</td>");
	      				else if (power > 15) originalString = originalString.replace(" dBmV</td>", " dBmV (Signal is too Strong!)</td>");

	      				return originalString;
	      			});

	      			// Processes upstream Power values
	      			documentBody = documentBody.replace(/<td>[0-9]+ Hz<\/td><td>(\d+\.\d) dBmV<\/td>/ig, function(originalString, power) {
	      				power = parseFloat(power);

	      				if (power < 55) originalString = originalString.replace(" dBmV</td>", " dBmV (Good Signal)</td>");
	      				else if (power > 55) originalString = originalString.replace(" dBmV</td>", " dBmV (Too High!)</td>");

	      				return originalString;
	      			});

	      			documentBody = documentBody.replace(/connectivity\./i, "connectivity.<br /><br />What does \"<a href=\"javascript:void(0);\" onCLick=\"alert('`Good Signal` means that your cable modem has acceptable signal strengths for a stable connection.\\n\\nFor the Downstream Channels, the SNR should be greater than 28 dB and the Power Levels should sit between -15 and +15 dBmV.\\n\\nAs for the Upstream Channel, the Power Level should not exceed 55 dBmV.');\">Good Signal</a>\" mean?");

	      			documentBody = documentBody.replace(/BPI\+/i, "Baseline Privacy Interface Plus");
	      			documentBody = documentBody.replace(/BPI/i, "Baseline Privacy Interface");
	      			documentBody = documentBody.replace(/<td width="175"><b><font color="#FFFFFF">Comment/i, "<td width=\"200\"><b><font color=\"#FFFFFF\">Comment");

		      		// These replacements remove extra channel lines that indicate no connections.
		      		documentBody = documentBody.replace(/<tr bgcolor="#E7DAAC"><td>[0-9]+<\/td><td>Not Locked<\/td><td>Unknown<\/td><td>0<\/td><td>0 Hz<\/td><td> 0\.0 dBmV<\/td><td> 0\.0 dB<\/td><td>0<\/td><td>0<\/td><\/tr>/ig, "");
		      		documentBody = documentBody.replace(/<tr bgcolor="#E7DAAC"><td>[0-9]+<\/td><td>Not Locked<\/td><td>Unknown<\/td><td>0<\/td><td>0 Ksym\/sec<\/td><td>0 Hz<\/td><td> 0\.0 dBmV<\/td><\/tr>/ig, "");
		      		documentBody = documentBody.replace(/<tr bgcolor="#E7DAAC"><td><b>Configuration File<\/b><\/td><td><\/td><td><\/td><\/tr>/ig, "");
		      		
		      		documentBody = documentBody.replace(/<td colspan="7"><b>Upstream Bonded Channels<\/b>/ig, "<td colspan=\"8\"><b>Upstream Bonded Channels</b>");
		      		documentBody = documentBody.replace(/<b>Acquire Downstream Channel<\/b><\/td><td><\/td>/ig, "<b>Acquire Downstream Channel</b></td><td>(No Status)</td>");
		      		documentBody = documentBody.replace(/<td>Operational<\/td>/ig, "<td>Online and Operational</td>");
		      		
		      		if (/QAM256/i.test(documentBody)) {
		      			documentBody = documentBody.replace(/<td colspan="9"><b>Downstream Bonded Channels<\/b>/ig, "<td colspan=\"10\"><b>Downstream Bonded Channels</b>");
		      			documentBody = documentBody.replace(/<td>Modulation<\/td>/ig, "<td>Modulation</td><td>Throughput</td>");
		      			documentBody = documentBody.replace(/<td>QAM256<\/td>/ig, "<td>QAM256</td><td>38 Mbps</td>");
		      		}

		      		// Changes Table Header Definitions
		      		documentBody = documentBody.replace(/Correctables/i, "Corrected Blocks");
		      		documentBody = documentBody.replace(/Uncorrectables/i, "Uncorrected Blocks");
		      		documentBody = documentBody.replace(/Lock Status/ig, "Status");
		      		documentBody = documentBody.replace(/US Channel Type/i, "Channel Type");
		      		documentBody = documentBody.replace(/<td>Symbol Rate<\/td>/i, "<td>Symbol Rate</td><td>Data Rate</td>");

		      		// Changes terminology
		      		documentBody = documentBody.replace(/TDMA and ATDMA/ig, "Advanced TDMA");
		      		documentBody = documentBody.replace(/<td>2560 Ksym\/sec<\/td>/ig, "<td>2560 Kilosymbols/second</td><td>15 Megabits/second</td>");
		      		documentBody = documentBody.replace(/<td>5120 Ksym\/sec<\/td>/ig, "<td>5120 Kilosymbols/second</td><td>30 Megabits/second</td>");

				documentBody = timeTranslator(documentBody);

				// Changes frequency Strings to nice frequency Strings based on MHz
      		      		documentBody = documentBody.replace(/([0-9]+) Hz/g, function(originalString, frequency) {
      		      			frequency = parseInt(frequency, 10);
      		            		frequency = frequency / 1000000;

      		            		return frequency + " MHz";
      				});
		      		// Changes frequency Strings to nice frequency Strings based on MHz
	      		}
	      		else if (/RgSwInfo/i.test(documentLocation)) {
	      			// This code processes the Software Info/Status page.

	      			documentBody = documentBody.replace(/([0-9]{1,4}) days ([0-9]{1,3})h:([0-9]{1,2})m:([0-9]{1,2})s/i, function(originalString, days, hours, minutes, seconds) {
	      				days = parseInt(days, 10);
	      				days2 = days;
	      				hours = parseInt(hours, 10);
	      				minutes = parseInt(minutes, 10);
	      				seconds = parseInt(seconds, 10);
	      				weeks = 0;
	      				weeks = Math.floor(days / 7);
	      				days -= (weeks * 7);

	      				returnString = ""; // We initialize it as an empty String.
	      				
					if (weeks != 0) {
		      				if (weeks == 1) returnString += weeks + " week (" + days2 + " days)";
		      				else returnString += weeks + " weeks (" + days2 + " days)";

		      				returnString += ", ";
	      				}

					if (days != 0) {
		      				if (days == 1) returnString += days + " day";
		      				else returnString += days + " days";

		      				returnString += ", ";
	      				}

					if (hours != 0) {
		      				if (hours == 1) returnString += hours + " hour";
		      				else returnString += hours + " hours";

		      				returnString += ", ";
	      				}

					if (minutes != 0) {
		      				if (minutes == 1) returnString += minutes + " minute";
		      				else returnString += minutes + " minutes";

		      				returnString += ", ";
	      				}

					if (!isEmpty(returnString)) returnString += " and ";

	      				if (seconds == 1) returnString += seconds + " second";
	      				else returnString += seconds + " seconds";

	      				return returnString;
	      			});

	      			documentBody = documentBody.replace(/<tr bgcolor="#E7DAAC"><td width="250"><b>Hardware Version<\/b><\/td><td width="250">(\d{1})<\/td><\/tr>/i, function(originalString, versionStringRegex) {
	      				if (versionStringRegex.length == 1) originalString = originalString.replace(versionStringRegex, versionStringRegex + ".0");
	      				delete versionStringRegex;
	      				return originalString;
	      			});

	      			documentBody = documentBody.replace(/<tr bgcolor="#E7DAAC"><td width="250"><b>Cable Modem IP Address<\/b><\/td><td width="250">---.---.---.---<\/td><\/tr>/i, "");
	      			documentBody = documentBody.replace(/Standard Specification Compliant/i, "Cable Modem Connection Standard");
	      			documentBody = documentBody.replace(/<\/td><td width="250">/ig, "</td><td width=\"400\">");
	      			documentBody = documentBody.replace(/[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}:[0-9a-z]{1,2}/, function(cableModemMACAddress) { return cableModemMACAddress.toUpperCase() });
	      		}
	      		else if (/RgSecurity/i.test(documentLocation)) {
	      			// This code processes the Security/Username/Password page.
	      			documentBody = documentBody.replace(/size="15"/ig, "size=\"32\"");
	      		}

	      		document.body.innerHTML = documentBody;

			// Some memory cleanups to delete potentially large memory-intensive variables from RAM.
	      		delete documentBody;
	      		delete documentLocation;
	      	}
	}, false);
}