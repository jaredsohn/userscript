// ==UserScript==
// @name			Timestamp Converter For Firefox
// @namespace		dazarobbo
// @description		Converts timestamps to local times
// @author			dazarobbo
// @copyright		2012, dazarobbo
// @license			(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version			1.4
// @include			http*://*bungie.net*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_xmlhttpRequest
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			unsafeWindow
// @debug			False
// @browser			Firefox
// ==/UserScript==
"use strict";

/**
 * HTML encodes a given string
 *
 * @param {String} s String to encode
 * @returns {String} Encoded string
 */
String.HTMLEncode = function(s){
	return s.toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
}

/**
 * Returns a HTML encoded string for an object by encoding its
 * toString value
 *
 * @returns {String} HTML encoded string
 */
Object.prototype.HTMLEncode = function(){
	return String.HTMLEncode(this.toString());
}

/**
 * Pads the left side of a string with another string
 *
 * @param {Number} l Length to pad to
 * @param {String} p The padding to use
 * @returns {String} The padded string
 */
String.prototype.PadLeft = function(l, p){
	var s=this;
	while(s.length<l)s=p+s;
	return s;
}

/**
 * Returns the hour in 12-hour time
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Hour", function(){
	if(this.getHours() == 0) return 12;
	else if(this.getHours() >= 13) return this.getHours() - 12;
	return this.getHours();
});

/**
 * Returns the minutes this date object holds
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Minutes", function(){
	return this.getMinutes();
});

/**
 * Returns the number of seconds this date object holds
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Seconds", function(){
	return this.getSeconds();
});

/**
 * Returns the current meridiem
 *
 * @returns {String} "AM" or "PM"
 */
Date.prototype.__defineGetter__("Meridiem", function(){
	return this.getHours() <= 11 ? "AM" : "PM";	
});

/**
 * Returns the current day of the week
 *
 * @returns {String}
 */
Date.prototype.__defineGetter__("Day", function(){
	return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()];
});

/**
 * Returns the current date of the date object
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Date", function(){
	return this.getDate();
});

/**
 * Returns the current month of the year
 *
 * @returns {String}
 */
Date.prototype.__defineGetter__("Month", function(){
	return ["January","February","March","April","May","June","July","August","September","October","November","December"][this.getMonth()];	
});

/**
 * Returns the current year of the date object
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Year", function(){
	return this.getFullYear();
});

/**
 * Returns the previous date of the current date
 *
 * @returns {Date}
 */
Date.prototype.__defineGetter__("Yesterday", function(){
	var d = new Date(this.getTime());
	d.setDate(d.getDate() - 1);
	return d;
});

/**
 * Returns the next date of the current date
 *
 * @returns {Date}
 */
Date.prototype.__defineGetter__("Tomorrow", function(){
	var d = new Date(this.getTime());
	d.setDate(d.getDate() + 1);
	return d;
})

/**
 * Checks whether a given date is the same date (date, month, year) as the current date
 *
 * @returns {Bool} True if yes, otherwise false
 */
Date.prototype.IsSameDay = function(d){
	return this.getDate() == d.getDate() && this.getMonth() == d.getMonth() && this.getFullYear() == d.getFullYear();
}

/**
 * Returns the current date at midnight
 *
 * @returns {Date}
 */
Date.__defineGetter__("Today", function(){
	var d = new Date();
	d.setHours(0, 0, 0, 0);
	return d;
});

/**
 * Returns yesterday's date
 *
 * @returns {Date}
 */
Date.__defineGetter__("Yesterday", function(){
	return Date.Today.Yesterday;
});

/**
 * Returns tomorrow's date
 *
 * @returns {Date}
 */
Date.__defineGetter__("Tomorrow", function(){
	return Date.Today.Yesterday;
});

/**
 * Generates a relative timestamp for this date around the current date
 *
 * @example "in 2 hours", "5 days ago", "in 10 years", etc...
 * @returns {String}
 */
Date.prototype.ToRelativeTimestamp = function(){
	
	var diff = Date.now() - this.getTime();
	
	var isPast = diff > 0;
	
	var seconds = Math.abs(diff) / 1000;
	var minutes = seconds / 60;
	var hours = minutes / 60;
	var days = hours / 24;
	var months = days / 31;
	var years = months / 12;
	
	var str = !isPast ? "in " : "";
	
	if(years >= 1){
		str += Math.floor(years) + " year" + (Math.floor(years) != 1 ? "s" : "");
	}
	else if(months >= 1){
		str += Math.floor(months) + " month" + (Math.floor(months) != 1 ? "s" : "");
	}
	else if(days >= 1){
		str += Math.floor(days) + " day" + (Math.floor(days) != 1 ? "s" : "");
	}
	else if(hours >= 1){
		str += Math.floor(hours) + " hour" + (Math.floor(hours) != 1 ? "s" : "");
	}
	else if(minutes >= 1){
		str += Math.floor(minutes) + " minute" + (Math.floor(minutes) != 1 ? "s" : "");
	}
	else{
		str += Math.floor(seconds) + " second" + (Math.floor(seconds) != 1 ? "s" : "");
	}
	
	return str + (isPast ? " ago" : "");

}

/**
 * Returns the capital letters from the toString method of a date object
 *
 * @example "UTC", "PDT", "GMT", etc...
 * @returns {String}
 */
Date.LocalTimezoneAbbrevation = (function(){
	var paren = new Date().toString().match(/\(.+\)/);
	return paren ? paren[0].match(/([A-Z])/g).join("") : "";
})();

/**
 * Returns the number of minutes the browser is offset from UTC
 *
 * @returns {Number}
 */
Date.LocalOffset = (function(){
	return -new Date().getTimezoneOffset();
})();

/**
 * Creates a new date object given the UTC offset of another time zone
 *
 * @param {Number} utcOffset The offset from UTC in minutes
 * @returns {Date}
 */
Date.AltTZ = function(utcOffset){
	return new Date(Date.now() - (Date.LocalOffset * 60000) + (utcOffset * 60000));
}

/**
 * Returns the placing for a number eg. 1"st", 2"nd", etc...
 *
 * @returns {String}
 */
Number.prototype.__defineGetter__("Placing", function(){
		
		if(this % 100 - this % 10 === 10){
				return "th";
		}
		
		switch(this % 10){
				case 1: return "st";
				case 2: return "nd";
				case 3: return "rd";
				default: return "th";
		}
		
});

/**
 * Returns the signing of this number. 0 is positive
 *
 * @returns {String} "+" if >= 0, otherwise "-"
 */
Number.prototype.__defineGetter__("Sign", function(){
	return this >= 0 ? "+" : "-";
})

/**
 * Returns a JSON encoded string for the given object
 *
 * @param {Object} o Object to encode to a string
 * @returns {String|null} String if successful, otherwise null
 */
JSON.Serialise = function(o){
		try{
				return JSON.stringify(o);
		}
		catch(e){
				return null;
		}
}

/**
 * Returns an object for the given JSON encoded string
 *
 * @param {String} s JSON encoded string
 * @returns {Object|null} Object if successful, otherwise null
 */
JSON.Deserialise = function(s){
		try{
				return JSON.parse(s);
		}
		catch(e){
				return null;
		}
}


/**
 * Object for browser-related manipulation
 *
 * @type {Object}
 */
var Browser = {

		/**
		 * Provides access for setting, getting, and deleting values persistently
		 *
		 * @type {Object}
		 */
		Memory: {
				
				/**
				 * Sets a value in the browser's memory according to a given key
				 *
				 * @param {String} key The key to store the value under
				 * @param {Object} value The value to store
				 * @returns void
				 */
				Set: function(key, value){
						GM_setValue(key, value);
				},
				
				/**
				 * Gets a value from the browser's memory according to a given key
				 *
				 * @param {String} key The key for the value to retrieve
				 * @param {Object} defaultVal The value to return if no value exists
				 * @returns {Object} The stored value if it exists, otherwise the default
				 */
				Get: function(key, defaultVal){
						var v = GM_getValue(key);
						return typeof v != "undefined" ? v : defaultVal;
				},
				
				/**
				 * Deletes a value from the browser's memory according to a given key
				 *
				 * @param {String} key The key of the value to delete
				 * @returns void
				 */
				Delete: function(key){
					GM_deleteValue(key);
				},
				
				/**
				 * Checks whether a value exists for a given key
				 *
				 * @param {String} key Key of the value to check for
				 * @returns {Bool} True if exists, otherwise false
				 */
				Exists: function(key){
					return Browser.Memory.Get(key, undefined) != undefined;
				},
				
				/**
				 * Deletes all values in the browser's memory
				 *
				 * @returns void
				 */
				DeleteAll: function(){
					GM_listValues().forEach(function(key){
						Browser.Memory.Delete(key);
					});
				}
				
		},

		/**
		 * Returns the user agent string for the browser
		 *
		 * @returns {String}
		 */
		get UserAgent(){
			return navigator.userAgent;	
		}
	
};



function ParseDateString(str){
	
	var matches = str.match(/(?:(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4}))(?: (?:(\d{1,2}):(\d{2}) ([AP]M))(?: (P[DS]T))?)?/);
	
	var month = parseInt(matches[1], 10) - 1;
	var day = parseInt(matches[2], 10);
	var year = parseInt(matches[3], 10);
	
	var hour = matches[4] ? parseInt(matches[4], 10) : 0;
	var min = matches[5] ? parseInt(matches[5], 10) : 0;
	var meridiem = matches[6] ? matches[6] : null;
	var tz = matches[7] ? matches[7] : null;
	
	if(meridiem.toUpperCase() == "PM" && hour >= 1 && hour <= 11){
		hour += 12;
	}
	else if(meridiem.toUpperCase() == "AM" && hour == 12){
		hour = 0;
	}
	
	return Date.UTC(year, month, day, hour, min, 0, 0);

}

function AddClock(){

	function ConstructTimestamp(d){
		return d.Day + ", " + d.Date + 
			d.Date.Placing + " " + d.Month + " " +
			d.Year + " " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + ":" +
			d.Seconds.toString().PadLeft(2, "0") + " " + d.Meridiem;
	}
	
	function ConstructTZInfo(){
		
		var minsDiff = Date.LocalOffset - BNGOffset;
		var transition = new Date(BNGTZ.NextTransition * 1000);
		var str = Date.LocalTimezoneAbbrevation + " (UTC";
		str += Date.LocalOffset.Sign + Math.abs(Date.LocalOffset / 60).toFixed(0);
		if(Date.LocalOffset % 60 != 0){
			str += ":" + Date.LocalOffset % 60;
		}
		
		str += ") is ";
		
		if(minsDiff == 0){
			str += "the same offset as";
		}
		else {
			
			if(Math.abs(minsDiff) < 60){
				str += Math.abs(minsDiff) + " min" + (minsDiff != 1 ? "s" : "");
			}
			else{
				str += (Math.abs(minsDiff) / 60).toFixed(0) + "hr" + (Math.abs(minsDiff / 60) != 1 ? "s" : "");
				if(minsDiff % 60 != 0){
					str += " " + minsDiff % 60 + "min" + (minsDiff % 60 != 1 ? "s" : "");
				}
			}
			
			str += " " + (Date.LocalOffset - BNGOffset > 0 ? "ahead of" : "behind");
			
		}
		
		str += " " + BNGOffsetName + " (UTC" + BNGOffset.Sign + Math.abs(BNGOffset / 60).toFixed(0);
		if(BNGOffset % 60 != 0){
			str += ":" + BNGOffset % 60;
		}
		str += ")";
		
		str += ". Bungie observes " + BNGOffsetName + " until ";
		str += transition.Date + transition.Date.Placing + " " + transition.Month + " " + (transition.Year != Date.Today.Year ? transition.Year + " " : "") +
		"at " + transition.Hour + ":" + transition.Minutes.toString().PadLeft(2, "0") + transition.Meridiem;
		
		return str;
		
	}
	
	var overlay = $("<div/>")
		.text(ConstructTZInfo())
		.css({
			position: "absolute",
			backgroundColor: "#000",
			color: "#9D9D9D",
			padding: "5px",
			zIndex: "9000",
			border: "2px solid #183757"
		});

	var clockElem = $("<span>" + ConstructTimestamp(Date.AltTZ(BNGOffset)) + " " + BNGOffsetName + "</span>")
		.css({color:"#7E7E7E", cursor:"default"})
		.hover(
			function(){$(overlay).slideDown(200, "linear");},
			function(){$(overlay).slideUp(200, "linear");}
		)
		
	$("div.pagetop > p").empty().append(clockElem).append($(overlay).hide());

	setInterval(function(){
		var bngDate = Date.AltTZ(BNGOffset);
		clockElem.text(ConstructTimestamp(bngDate) + " " + BNGOffsetName);
	}, 1000);

}

function ConvertPostDates(){

	function ConstructTimestamp(d){
		
		var str = "";
		
		if(d.IsSameDay(Date.Today)) str += "Today";
		else if(d.IsSameDay(Date.Yesterday)) str += "Yesterday";
		else str += d.toDateString();
		
		str += " at " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem;
		str += " (" + d.ToRelativeTimestamp() + ")";
		
		return str;
	
	}

	var postDates = $("#ctl00_mainColPanel .forumpost .post-actions .date").map(function(i, dateElem){
		var d = new Date(ParseDateString(dateElem.textContent) - BNGOffset * 60000);
		dateElem.title = dateElem.textContent;
		dateElem.textContent = ConstructTimestamp(d);
		return $(this).data("date", d);
	}).get();

	if(postDates.length >= 1){
		setInterval(function(){
			for(var i=0; i<postDates.length; i++){
				var d = $(postDates[i]).data("date");
				$(postDates[i]).text(ConstructTimestamp(d));
			}
		}, 1000);
	}

}

function ConvertForumPageLastPostDates(){
	
	function ConstructTimestamp(d){
		return d.Day + ", " + d.Date + d.Date.Placing + " " + d.Month + " " + d.Year + " at " + d.Hour + ":" +
		d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem + " " + Date.LocalTimezoneAbbrevation;
	}
	
	var threadLastPostDates = $("table.grid .list-h p a[id$=hLastPost]").map(function(i, dateElem){
		var d = new Date(ParseDateString(dateElem.textContent) - BNGOffset * 60000);
		dateElem.previousSibling.textContent = " about ";
		dateElem.title = ConstructTimestamp(d);
		dateElem.textContent = d.ToRelativeTimestamp();
		return $(this).data("date", d);
	}).get();

	if(threadLastPostDates.length >= 1){
		setInterval(function(){
			for(var i=0; i<threadLastPostDates.length; i++){
				var d = $(threadLastPostDates[i]).data("date");
				$(threadLastPostDates[i]).text(d.ToRelativeTimestamp());
				$(threadLastPostDates[i]).attr("title", ConstructTimestamp(d));
			}
		}, 1000);
	}

}

function ConvertPostEditDates(){

	function ConstructTimestamp(d){
	
		var str = "";
		
		if(d.IsSameDay(Date.Today)) str += d.ToRelativeTimestamp() + " today";
		else if(d.IsSameDay(Date.Yesterday)) str += d.ToRelativeTimestamp() + " yesterday";
		else str += d.ToRelativeTimestamp() + " on " + d.toDateString();
		
		str += " at " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem;
		
		return str;
	
	}
	
	var postEditDates = $("div.forumpost div.postbody > p").map(function(i, post){

		var elem = null;
		
		post.innerHTML = post.innerHTML.replace(
			/(?:<br(?: ?\/)?>){2}\[Edited on (\d{2}\.\d{2}\.\d{4} \d{1,2}:\d{2} [AP]M [A-Z]{3})(?: by (.+?))?\]$/,
			function(substr, p1, p2, offset, wholeStr){
				var d = new Date(ParseDateString(p1) - BNGOffset * 60000);
				var formatted = $(
					"<span title=\"" + p1 + "\" style=\"color:#6B6C6D;\">" +
						"[Edited <time>" + ConstructTimestamp(d) + "</time>" +
						(p2 ? " by " + "<a target=\"_blank\" href=\"/Community/PeopleFinder.aspx?page=0&search_mode=0&search_criteria=" + p2.HTMLEncode() + "\"" +
						"style=\"color:#6B6C6D;\" title=\"search for " + p2.HTMLEncode() + "\">" + p2.HTMLEncode() + "</a>" : "") + "]" +
					"</span>");
				formatted.find("time:first").data("EditDate", d);
				elem = formatted;
				return "<br><br>";
			}
		);

		if(elem){
			$(post).append(elem);
			return elem.find("time:first");
		}
		
	}).get();

	if(postEditDates.length >= 1){
		setInterval(function(){
			for(var i=0; i<postEditDates.length; i++){
				var d = $(postEditDates[i]).data("EditDate");
				$(postEditDates[i]).text(ConstructTimestamp(d));
			}
		}, 1000);
	}

}

function ConvertPostProfileLastPostDates(){

	function ConstructTimestamp(d){
		return "last post: " + d.toDateString() + " " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem;
	}

	var lastPostDates = $("div.forumpost div.floatingprofile ul.rightside li:last-child").map(function(i, lastPost){
		var match = /^last post: (\d{2}\.\d{2}\.\d{4} \d{1,2}:\d{2} [AP]M [A-Z]{3})$/.exec(lastPost.textContent);
		if(match && match[1]){
			var d = new Date(ParseDateString(match[1]) - BNGOffset * 60000);
			$(lastPost).data("date", d);
			lastPost.title = match[1];
			lastPost.textContent = ConstructTimestamp(d);
		}
	});
	
	if(lastPostDates.length >= 1){
		setInterval(function(){
			for(var i=0; i<lastPostDates.length; i++){
				var d = $(lastPostDates[i]);
				$(lastPostDates[i]).text(ConstructTimestamp(d));
			}
		}, 1000);
	}

}

function ConvertBanHistoryDates(){

	function ConstructTimestamp(d){
	
		if(d.IsSameDay(Date.Yesterday)) return d.ToRelativeTimestamp() + " yesterday at " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem;
		else if(d.IsSameDay(Date.Today)) return d.ToRelativeTimestamp() + " today at " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem;
		else if(d.IsSameDay(Date.Tomorrow)) return "Tomorrow " + d.ToRelativeTimestamp() + " at " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem;
		else return d.toDateString() + " " + d.Hour + ":" + d.Minutes.toString().PadLeft(2, "0") + " " + d.Meridiem + " (" + d.ToRelativeTimestamp() + ")";

	}

	$("div.boxD_outer[id$=BanHistoryPanel] p").map(function(i, msg){
		msg.innerHTML = msg.innerHTML.replace(
			/(\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2} [AP]M)/g,
			function(substr, offset, wholeStr){
				var d = new Date(ParseDateString(substr) - BNGOffset * 60000);
				return "<time style=\"border-bottom:thin dashed #8C8C8C;\"" +
					" title=\"" + substr + "\" data-date=\"" + d.getTime() + "\">" + 
					ConstructTimestamp(d) +
				"</time>";
			}
		);
	});

	var banHistoryDates = $("div.boxD_outer[id$=BanHistoryPanel] p time");

	if(banHistoryDates.length >= 1){
		setInterval(function(){
			for(var i=0; i<banHistoryDates.length; i++){
				var d = new Date($(banHistoryDates[i]).data("date"));
				$(banHistoryDates[i]).text(ConstructTimestamp(d));
			}
		}, 1000);
	}

}

function GetBungieTimeZone(){
	
	var tz = Browser.Memory.Get("BungieTimeZone", null);
	tz = JSON.Deserialise(tz);
	
	if(tz == null || Date.now() > tz.NextTransition * 1000){
		
		GM_xmlhttpRequest({
			method: "GET",
			synchronous: true,
			url: "http://coup-srv-01.heliohost.org/API/Misc/BungieTimezone",
			onload:function(r){
				tz = JSON.Deserialise(r.responseText);
				Browser.Memory.Set("BungieTimeZone", r.responseText);
			}
		});
		
	}
	
	return tz;
	
}


var $ = unsafeWindow.$telerik.$;
var BNGTZ = GetBungieTimeZone();
var BNGOffsetName = BNGTZ.Abbreviation;
var BNGOffset = BNGTZ.Offset;


AddClock();
ConvertPostDates();
ConvertForumPageLastPostDates();
ConvertPostEditDates();
ConvertPostProfileLastPostDates();
ConvertBanHistoryDates();
