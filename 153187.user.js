// ==UserScript==
//
// @name          eBay Local Time
// @description   Converts dates and times on eBay to the user's local time. Works on the US, UK and DE sites.
// @author        nice_bow_tie
//
// @homepage      http://userscripts.org/scripts/show/153187
// @updateURL     https://userscripts.org/scripts/source/153187.meta.js
// @downloadURL   https://userscripts.org/scripts/source/153187.user.js
//
// @include       http://*.ebay.*
//
// @grant         GM_getValue
// @grant         GM_setValue
//
// @version       1.4
//
// @history       1.4  Added support for German site (ebay.de)
// @history       1.3  Make 12/24 hour display toggle work in Chrome and Opera
// @history       1.2  Add option to toggle between 24 hour and AM/PM display
// @history       1.1  Convert some additional date-time fields
// @history       1.0  Initial release
//
// ==/UserScript==


(function(){

	//RFC-2822 month names
	var standard_months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var eng_long_months = ["January", "February", "March", "April", "May",
	                       "June", "July", "August", "September", "October",
	                       "November", "December"];

	var eng_weekdays    = ["Sunday", "Monday", "Tuesday", "Wednesday",
	                       "Thursday", "Friday", "Saturday"];

	var site_data = {};

	//=========================================================================
	// site_data contains the data used by the script for each supported site
	//=========================================================================
	//
	// site_data[site].abbr_month_names
	// ------------------------------------------------------------------------
	//    an array of short month names used on the site
	//
	// site_data[site].long_month_names
	// ------------------------------------------------------------------------
	//    an array of long month names used on the site
	//
	// site_data[site].weekday_names
	// ------------------------------------------------------------------------
	//    an array of weekday names used on the site
	//
	// site_data[site].timezones
	// ------------------------------------------------------------------------
	//    an array of timezones used on the site, such as PST or BST
	//    the timezone name is followed by the signed 4-digit offset from UTC,
	//    for example "PST:-0800"
	//
	// site_data[site].timezone_periods
	// ------------------------------------------------------------------------
	//    an object defining valid time periods for each timezone, used to find
	//    the correct timezone when it's not part of the displayed time;
	//    each entry is an array of time periods in the format
	//    YYYYMMDDHHMMSS-YYYYMMDDHHMMSS, which define the times when that
	//    timezone is used
	//
	// site_data[site].locations
	// ------------------------------------------------------------------------
	//    an array of {selector, format} objects that identify the location and
	//    format of the times the script should change:
	//    ---------------------------------------------------------------------
	//    'selector' = a CSS selector string that selects the nodes containing
	//    times in the format described by 'format'
	//    if the time is split across > 1 node (eg. the date in one node and
	//    the time in another), those nodes must be consecutive in the list of
	//    nodes matching the selector
	//    ---------------------------------------------------------------------
	//    'format' = a string describing the format of the date/time text in
	//    the nodes (eg. "m-d-y|h:i:s T")
	//    the following placeholders are used to indicate where in the text
	//    that component should appear:
	//            W     : weekday name
	//            d     : 2-digit day number (01-31)
	//            D     : 1 or 2-digit day number (1-31)
	//            m     : short month name
	//            M     : long month name
	//            n     : 2-digit month number (01-12)
	//            Y     : 4-digit year
	//            y     : 2-digit year
	//            h     : 2-digit hour (00-23)
	//            i     : 2-digit minute (00-59)
	//            s     : 2-digit second (00-59)
	//            T     : timezone
	//    other special characters are:
	//            space : matches one or more whitespace characters
	//            \\    : forces the following character to be a literal
	//            |     : indicates where the text is split across nodes
	//    all other characters in the format string are treated as literals
	//    placeholder chars can be treated as literal by preceding them with \\
	//
	//=========================================================================

	site_data["ebay.com"] = {};

	site_data["ebay.com"].abbr_month_names = standard_months;
	site_data["ebay.com"].long_month_names = eng_long_months;
	site_data["ebay.com"].weekday_names    = eng_weekdays;
	site_data["ebay.com"].timezones        = ["PST:-0800", "PDT:-0700"];

	site_data["ebay.com"].timezone_periods =
	{
		PST: [ "20080101000000-20080309015959",
		       "20081102020000-20090308015959",
		       "20091101020000-20100314015959",
		       "20101107020000-20110313015959",
		       "20111106020000-20120311015959",
		       "20121104020000-20130310015959",
		       "20131103020000-20140309015959",
		       "20141102020000-20150308015959",
		       "20151101020000-20160313015959",
		       "20161106020000-20170312015959",
		       "20171105020000-20180311015959",
		       "20181104020000-20190310015959",
		       "20191103020000-20200308015959"
		     ],

		PDT: [ "20080309030000-20081102005959",
		       "20090308030000-20091101005959",
		       "20100314030000-20101107005959",
		       "20110313030000-20111106005959",
		       "20120311030000-20121104005959",
		       "20130310030000-20131103005959",
		       "20140309030000-20141102005959",
		       "20150308030000-20151101005959",
		       "20160313030000-20161106005959",
		       "20170312030000-20171105005959",
		       "20180311030000-20181104005959",
		       "20190310030000-20191103005959"
		     ]
	};

	site_data["ebay.com"].locations =
	[
		//view item page
		{ selector : "div.lable~div span, .vi-is1-dt-eu>span, .vi-is1-dt>span",
		  format   : "m d, Y|h:i:s T"                },

		//revision summary page / bid history page
		{ selector : ".pagecontainer td:nth-child(-n+2), td>div>span, .titleValueFont",
		  format   : "m-d-y|h:i:s T"                 },

		//purchase history page / bid history page (ending time)
		{ selector : ".pagecontainer td, .titleValueFont",
		  format   : "m-d-y h:i:s T"                 },

		//'last revised' time
		{ selector : ".vi-desc-revHistory div, .vi-cmb>div",
		  format   : "m d, Y h:i:s T"                },

		//item page new design: active listings
		{ selector : ".vi-VR-enddate-sec, .rev-date",
		  format   : "m d, Y h:i:s T"                },

		//item page new design: active listings
		{ selector : ".vi-VR-enddate-no-sec",
		  format   : "m d h:i:s T"                   },

		//item new page design: completed listings
		{ selector : ".vi-ended, .vi-ended .endedDate span",
		  format   : "m d, Y|h:i:s T"                },

		//my ebay
		{ selector : ".my_itl-itR div>span",
		  format   : "n/d/y at h:i:s"                },

		//search results
		{ selector : "span.tme>span, div.timeLeftInfo>span",
		  format   : "m-d h:i"                       },

		//feedback
		{ selector : ".FbOuterYukon td:last-child",
		  format   : "m-d-y h:i"                     },
	];

	site_data["ebay.co.uk"] = {};

	site_data["ebay.co.uk"].abbr_month_names = standard_months;
	site_data["ebay.co.uk"].long_month_names = eng_long_months;
	site_data["ebay.co.uk"].weekday_names    = eng_weekdays;
	site_data["ebay.co.uk"].timezones        = ["GMT:+0000", "BST:+0100"];

	site_data["ebay.co.uk"].timezone_periods =
	{
		GMT: [ "20080101000000-20080330005959",
		       "20081026020000-20090329005959",
		       "20091025020000-20100328005959",
		       "20101031020000-20110327005959",
		       "20111030020000-20120325005959",
		       "20121028020000-20130331005959",
		       "20131027020000-20140330005959",
		       "20141026020000-20150329005959",
		       "20151025020000-20160327005959",
		       "20161030020000-20170326005959",
		       "20171029020000-20180325005959",
		       "20181028020000-20190331005959",
		       "20191027020000-20200329005959"
		     ],

		BST: [ "20080330020000-20081026005959",
		       "20090329020000-20091025005959",
		       "20100328020000-20101031005959",
		       "20110327020000-20111030005959",
		       "20120325020000-20121028005959",
		       "20130331020000-20131027005959",
		       "20140330020000-20141026005959",
		       "20150329020000-20151025005959",
		       "20160327020000-20161030005959",
		       "20170326020000-20171029005959",
		       "20180325020000-20181028005959",
		       "20190331020000-20191027005959"
		     ]
	};

	site_data["ebay.co.uk"].locations =
	[
		//view item page
		{ selector : "div.lable~div span, .vi-is1-dt-eu>span, .vi-is1-dt>span",
		  format   : "d m, Y|h:i:s T"                },

		//revision summary page / bid history page
		{ selector : ".pagecontainer td:nth-child(-n+2), td>div>span, .titleValueFont",
		  format   : "d-m-y|h:i:s T"                 },

		//purchase history page / bid history page (ending time)
		{ selector : ".pagecontainer td, .titleValueFont",
		  format   : "d-m-y h:i:s T"                 },

		//'last revised' time
		{ selector : ".vi-desc-revHistory div, .vi-cmb>div",
		  format   : "d m, Y h:i:s T"                },

		//item page new design: active listings
		{ selector : ".vi-VR-enddate-sec, .rev-date",
		  format   : "d m, Y h:i:s T"                },

		//item page new design: active listings
		{ selector : ".vi-VR-enddate-no-sec",
		  format   : "d m h:i:s T"                   },

		//item new page design: completed listings
		{ selector : ".vi-ended, .vi-ended .endedDate span",
		  format   : "d m, Y|h:i:s T"                },

		//my ebay
		{ selector : ".my_itl-itR div>span",
		  format   : "d/n/y at h:i:s"                },

		//search results
		{ selector : "span.tme>span, div.timeLeftInfo>span",
		  format   : "d-m h:i"                       },

		//feedback
		{ selector : ".FbOuterYukon td:last-child",
		  format   : "d-m-y h:i"                     },
	];

	site_data["ebay.de"] = {};

	site_data["ebay.de"].abbr_month_names = ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
	site_data["ebay.de"].long_month_names = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
	site_data["ebay.de"].weekday_names    = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	site_data["ebay.de"].timezones        = ["MEZ:+0100", "MESZ:+0200"];

	site_data["ebay.de"].timezone_periods =
	{
		MEZ: [ "20080101000000-20080330005959",
		       "20081026020000-20090329005959",
		       "20091025020000-20100328005959",
		       "20101031020000-20110327005959",
		       "20111030020000-20120325005959",
		       "20121028020000-20130331005959",
		       "20131027020000-20140330005959",
		       "20141026020000-20150329005959",
		       "20151025020000-20160327005959",
		       "20161030020000-20170326005959",
		       "20171029020000-20180325005959",
		       "20181028020000-20190331005959",
		       "20191027020000-20200329005959"
		     ],

		MESZ:[ "20080330020000-20081026005959",
		       "20090329020000-20091025005959",
		       "20100328020000-20101031005959",
		       "20110327020000-20111030005959",
		       "20120325020000-20121028005959",
		       "20130331020000-20131027005959",
		       "20140330020000-20141026005959",
		       "20150329020000-20151025005959",
		       "20160327020000-20161030005959",
		       "20170326020000-20171029005959",
		       "20180325020000-20181028005959",
		       "20190331020000-20191027005959"
		     ]
	};

	site_data["ebay.de"].locations =
	[
		//view item page
		{ selector : ".vi-tm-left>span",
		  format   : "d. m. Y|h:i:s T"               },

		//revision summary page / bid history page
		{ selector : ".pagecontainer td:nth-child(-n+2), .contentValueFont>div>span",
		  format   : "d.n.y|h:i:s T"                 },

		//purchase history page / bid history page (ending time)
		{ selector : ".contentValueFont, .titleValueFont",
		  format   : "d.n.y h:i:s T"                 },

		//'last revised' time
		{ selector : ".vi-desc-revHistory div",
		  format   : "d. m. Y h:i:s T"               },

		//item new page design: completed listings
		{ selector : "#bb_tlft, .endedDate>span",
		  format   : "d. m. Y|h:i:s T"               },

		//my ebay
		{ selector : ".my_itl-itR div>span",
		  format   : "d.n.y u\\m h:i:s"              },

		//search results
		{ selector : "span.tme>span, div.timeLeftInfo>span",
		  format   : "d. m. h:i"                     },

		//feedback
		{ selector : ".FbOuterYukon td:last-child",
		  format   : "d.n.y h:i"                     },
    ];

	//=========================================================================

	//get the site data for the current page
	var hostname = window.location.hostname;
	while (hostname && !site_data[hostname])
		hostname = hostname.substr(hostname.indexOf(".")+1 || 9999);
	if (!(site_data = site_data[hostname]))
		return;

	var timezones = [];
	site_data.timezones.forEach(function(tz) {
		timezones = timezones.concat(tz.split(":"));});

	var tz_periods = [];
	timezones.forEach(function(tz)
	{
		if (site_data.timezone_periods && site_data.timezone_periods[tz])
		{
			site_data.timezone_periods[tz].forEach(function(tz_period)
			{
				if (/^\d{14}-\d{14}$/.test(tz_period))
				{
					var a = tz_period.split("-");
					tz_periods.push({start:a[0], end:a[1], tz:tz});
				}
			});
		}
	});

	//regexps that match the format string placeholders
	var regexp_strings =
	{
		W: site_data.weekday_names.join("|"),
		d: "0?[1-9]|[1-2][0-9]|3[0-1]",
		D: "[1-9]|[1-2][0-9]|3[0-1]",
		m: site_data.abbr_month_names.join("|"),
		M: site_data.long_month_names.join("|"),
		n: "0[1-9]|1[012]",
		Y: "20[0-2][0-9]",
		y: "[0-2][0-9]",
		h: "[0-1][0-9]|2[0-3]",
		i: "[0-5][0-9]",
		s: "[0-5][0-9]",
		T: timezones.join("|").replace(/[+-]/g, "\\$&"),
	};

	var use_12_hour_clock;
	if (typeof GM_getValue == "function")
		use_12_hour_clock = GM_getValue("Use12HourClock", false);
	if (typeof use_12_hour_clock != "boolean")
	{
		//GM_getValue failed, so try using localStorage instead
		try
		{
			use_12_hour_clock = (localStorage.getItem("Use12HourClock") == "true");
		}
		catch(e)
		{
			use_12_hour_clock = false;
		}
	}

	(function ProcessPage()
	{
		var found_nodes = [];

		//find and process the nodes matching each location selector
		site_data.locations.forEach(function(location_data)
		{
			var nodes = [];
			var qsa = document.querySelectorAll(location_data.selector.replace(/\s*(,|$)/g, ":not([nbt-processed])$1"));
			for (var i = 0; i < qsa.length; i++)
			{
				found_nodes.push(qsa[i]);
				for (var j = 0; j < qsa[i].childNodes.length; j++)
				{
					var child = qsa[i].childNodes[j];
					if(child.nodeType == 3 && child.data.match(/\S/))
						nodes.push(child);
				}
			}
			var format_array = location_data.format.split("|");
			var node_count = format_array.length;
			while (nodes.length >= node_count)
			{
				if (!ProcessNode(nodes, format_array, node_count))
					nodes.shift();
			}
		});

		found_nodes.forEach(function(n){n.setAttribute("nbt-processed", 1);});
		window.setTimeout(ProcessPage, 2000);
	})();

	//process node_count text nodes from the node_list
	//if successful, remove the matched node(s) and return true
	function ProcessNode(node_list, format_array, node_count)
	{
		var node_data = [];
		for (var i = 0; i < node_count; i++)
		{
			var format_string = format_array[i];

			//create regexp from the format string and match against the text
			var re = "";
			for (var j = 0; j < format_string.length; j++)
			{
				var c = format_string[j];
				var str = regexp_strings[c];
				if (c == "\\" && j < format_string.length-1)
					c = format_string[++j];
				if (!str)
					str = c.replace(/[-.+\\{}?*()|[\]]/, "\\$&")
					       .replace(" ", "\\s+");
				re += "(" + str + ")";
			}
			re = "^([\\s\\S]*?)" + re + "([\\s\\S]*?)$";

			var match_result;
			if (match_result = node_list[i].data.match(re))
			{
				match_result.shift();
				match_result.prefix = match_result.shift();
				match_result.suffix = match_result.pop();
				//match_result array now contains the node text corresponding
				//to each character of the format string (ignoring any \
				//characters); also set node_data[c] to the text
				//corresponding to each placeholder c in the format string
				for (var j = 0, index = 0; j < format_string.length; j++, index++)
				{
					var c = format_string[j];
					if (regexp_strings[c])
						node_data[c] = match_result[index];
					else if (c == "\\")
						j++; //skip next character
				}
				node_data.push(match_result);
			}
			else return;
		}

		//check it's valid
		if (node_data.length != node_count
			|| !(node_data['m'] || node_data['M'] || node_data['n'])
			|| !(node_data['d'] || node_data['D'])
			|| !(node_data['h'])
		)
			return;

		//create array of strings to be used in the Date.parse argument
		var parse_array = [];
		parse_array[0] = node_data['d'] || node_data['D'];
		var month_number =
			site_data.abbr_month_names.indexOf(node_data['m'])+1 ||
			site_data.long_month_names.indexOf(node_data['M'])+1 ||
			node_data['n'];
		parse_array[1] = standard_months[month_number-1];
		var year = node_data['Y'] || ("20" + node_data['y']);
		if (year.length != 4) //if not found, assume it's the current year
			year = new Date().getFullYear() + "";
		parse_array[2] = year;
		parse_array[3] = node_data['h'];
		parse_array[4] = node_data['i'] || "00";
		parse_array[5] = node_data['s'] || "00";

		if (!node_data['T'])
		{
			//no timezone specified, so get it from tz_periods
			var date_str = year;
			date_str += ("0"+month_number).substr(-2);
			date_str += ("0"+parse_array[0]).substr(-2);
			date_str += parse_array[3] + parse_array[4] + parse_array[5];
			tz_periods.some(function(tz_period)
			{
				if (date_str >= tz_period.start && date_str <= tz_period.end)
					return (node_data['T'] = tz_period.tz);
			});

			if (!node_data['T'])
				return;
		}

		var next_tz = timezones[timezones.indexOf(node_data['T'])+1];
		if (!/^[+-]\d{4}$/.test(next_tz))
			return;
		parse_array[6] = next_tz;

		//parse the time using RFC-2822 format
		var ts = Date.parse("0 1 2 3:4:5 6".replace(/\d/g,
						function(i) {return parse_array[i];}));

		if (!isNaN(ts))
		{
			function fmt(n, pad) {return (n<10 && pad) ? "0"+n : ""+n;}

			//convert to local time
			var date = new Date(ts);
			var new_date =
			{
				W: site_data.weekday_names[date.getDay()],
				d: fmt(date.getDate(), true),
				D: fmt(date.getDate(), false),
				m: site_data.abbr_month_names[date.getMonth()],
				M: site_data.long_month_names[date.getMonth()],
				n: fmt(date.getMonth()+1, true),
				Y: fmt(date.getFullYear()),
				y: fmt(date.getFullYear()).substr(2),
				h: fmt(date.getHours(), true),
				i: fmt(date.getMinutes(), true),
				s: fmt(date.getSeconds(), true),
			};

			//save the original date/time for the tooltip
			var tooltip = [];
			for (var i = 0; i < node_count; i++)
				tooltip.push(node_data[i].join(""));
			tooltip = tooltip.join(" ").replace(/\s+/g, " ");

			//update the node data with the new local time values
			var changed = false;
			node_data.forEach(function(node_data, i)
			{
				var am_pm = "";
				var format_str = format_array[i];
				for (var j = 0, index = 0; j < format_str.length; j++, index++)
				{
					var c = format_str[j];
					if (c == "T" || (c == " " && format_str[j+1] == "T"))
						node_data[index] = ""; //remove the timezone
					else if (new_date[c] && new_date[c] != node_data[index])
					{
						node_data[index] = new_date[c];
						changed = true;
						if (c == "h" && use_12_hour_clock)
						{
							//change to 12 hour time
							var hours = +node_data[index];
							am_pm = (hours < 12) ? " AM" : " PM";
							node_data[index] = (hours + 11) % 12 + 1;
						}
					}
					else if (c == "\\")
						j++; //skip next character
				}
				if (am_pm != "")
					node_data.push(am_pm);
			});

			for (var i = 0; i < node_count; i++)
			{
				var node = node_list.shift();

				if (changed)
				{
					//the time has changed, so update the DOM with the new time
					var new_node = document.createElement("span");
					new_node.className = "nbt-localtime";
					new_node.style.fontSize = "inherit";
					var prefix = node_data[i].prefix;
					if (prefix)
						new_node.appendChild(document.createTextNode(prefix));
					var span = document.createElement("span");
					span.title = tooltip;
					span.style.fontSize = "inherit";
					var t = document.createTextNode(node_data[i].join(""));
					span.appendChild(t);
					new_node.appendChild(span);
					var suffix = node_data[i].suffix;
					if (suffix)
						new_node.appendChild(document.createTextNode(suffix));

					if (i == node_count-1)
					{
						var star = document.createElement("b");
						star.style.color = "#00a000";
						star.style.fontSize = "inherit";
						star.style.fontWeight = "normal";
						star.style.cursor = "default";
						star.appendChild(document.createTextNode(" * "));

						var ref_node = new_node.lastChild;
						var index = suffix.search(/\s/);
						if (index == 0)
							ref_node = span;
						else if (index > 0)
							new_node.lastChild.splitText(index);

						new_node.insertBefore(star, ref_node.nextSibling);

						if (window.chrome)
						{
							//workaround for a Chrome (Webkit) bug that causes
							//the star to wrap onto a new line
							if (node.parentNode.className == "endedDate")
							{
								var bugfixer = document.createTextNode(" ");
								node.parentNode.insertBefore(bugfixer, node);
							}
						}
					}

					new_node.addEventListener("dblclick", ToggleTimeDisplay, false);
  					node.parentNode.replaceChild(new_node, node);
				}
			}

			return true;
		}
	}

	function ToggleTimeDisplay()
	{
		var success = false;
		if (typeof GM_setValue == "function")
		{
			GM_setValue("Use12HourClock", !use_12_hour_clock);
			success = (GM_getValue("Use12HourClock") === !use_12_hour_clock);
		}
		if (!success)
		{
			//try saving to localStorage instead
			try
			{
				localStorage.setItem("Use12HourClock", !use_12_hour_clock);
				success = true;
			}
			catch(e){}
		}

		if (success)
			alert("eBay Local Time display has been changed to: " +
				(use_12_hour_clock ? "24 hour clock" : "12 hour clock (AM/PM)") +
				"\n\n(Takes effect from next page load)");
		else
			alert("Error: eBay Local Time display setting could not be changed " +
				"(requires Greasemonkey or a Greasemonkey-compatible userscript manager)");
	}

})()
