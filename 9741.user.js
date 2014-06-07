// ==UserScript==
// @name          Microformats for Dopplr
// @version       0.2
// @author        Yoan Blanc
// @namespace     http://yoan.dosimple.ch/
// @description   Simple script that add some nice microformat to dopplr
// @include       http://www.dopplr.com/traveller/*
// @include       http://dopplr.com/traveller/*
// ==/UserScript==

//Author contact info: Yoan Blanc <yoan.blanc@gmail.com>

//Copyright (C) 2007. Yoan Blanc.
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

var dopplrMicroformat = (function(){ return {
	init: function() {
		if(!document.location.href.match(/\/fellows$/)) {
		  this.trips();
		}
		this.fellows();
	},
	trips : function() {
		var trips = document.evaluate(
			"//ul[@class='locations']/li",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		d = new Date();
		for(var i=0; i<trips.snapshotLength; i++) {
			var event = trips.snapshotItem(i);
			if(!event.className.match(/\bvevent\b/)) {
				event.className += " vevent";
				
				var location = event.getElementsByTagName("A")[0];
				
				// Summary + location
				location.className += " location summary";
				// prevent the bad dopplr stylesheet collision
				location.setAttribute("style", "float:none");
				
				// Dates
				var dates = event.getElementsByTagName("SPAN");
				var dtstart = dates[1];
				var dtend = dates[2];
				
				// Start
				var dtstart = this.parseDateString(dates[1].firstChild.data, d);
				
				dates[1].innerHTML = '<abbr class="dtstart" title="' + this.formatDate(dtstart) + '">' +
					dates[1].innerHTML +
					'</abbr>';
				
				// End (mandatory);
				try {
					var dtend = this.parseDateString(dates[2].firstChild.data, d);
					
					dates[2].innerHTML = '<abbr class="dtend" title="' + this.formatDate(dtend, false) + '">' +
					dates[2].innerHTML +
					'</abbr>';
				} catch (e) {
					if(e.name !== "Error") {
						throw e;
					}
				}
				
				// Description
				if(event.className.match(/\bopen\b/)) {
					var description = event.getElementsByTagName("FORM")[0].getElementsByTagName("UL")[0];
					description.className += " description";
				}
			}
		}
	},
	fellows: function() {
		var fellows = document.evaluate(
			"//a[@class='traveller_icon']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		for(var i=0; i<fellows.snapshotLength; i++) {
			var fellow = fellows.snapshotItem(i);
			fellow.parentNode.className += " vcard";
			fellow.className += " url";
			fellow.getElementsByTagName("img")[0].className += " photo fn";
		}
	},
	// turns -2 into -02
	formatTwoDigits : function(iValue) {
		return Math.abs(iValue) < 10
			? (iValue >= 0
				? "0" + iValue
				: "-0" + Math.abs(iValue))
			: iValue;
	},
	// gives you a nice YYYYMMDDT080000+ZZ:ZZ
	formatDate : function(oDate, start) {
		var sIso = 
			"" +
			oDate.getFullYear() +
			this.formatTwoDigits(oDate.getMonth() + 1) +
			this.formatTwoDigits(oDate.getDate()) +
			"T";
		// abritrary hours
		sIso += (start)
			? "080000"
			: "200000";
		
		var iTz = oDate.getTimezoneOffset() / 60;
		sTz = this.formatTwoDigits(iTz);
		sTz = (iTz > 0) ? "+" + sTz : sTz;
		sIso += sTz + ":00";
		
		return sIso;
	},
	// thanks to Simon Willison for this
	// @see http://simonwillison.net/2003/Oct/6/betterDateInput/
	monthNames : "January February March April May June July August September October November December".split(" "),
	parseMonth : function(month) {
		var matches = this.monthNames.filter(function(item) { 
			return new RegExp("^" + month, "i").test(item);
		});
		if (matches.length == 0) {
			throw new Error("Invalid month string");
		}
		if (matches.length > 1) {
			throw new Error("Ambiguous month");
		}
		
		// return monthNames.indexOf(matches[0]);
		for(var i = 0; i < this.monthNames.length; i++) {
			if(this.monthNames[i] == matches[0]) {
				return i;
			}
		}
		
		return -1;
	},
	dateParsePatterns : [
		// 4th
		{   re: /^(\d{1,2})(st|nd|rd|th)?$/i, 
        handler: function(bits, d) {
            d.setDate(parseInt(bits[1], 10));
            return d;
        }
    	},
    	// Jun 4th
		{   re: /^(\w+) (\d{1,2})(?:st|nd|rd|th)?$/i, 
        handler: function(bits, d, obj) {
            d.setDate(parseInt(bits[2], 10));
            var month = obj.parseMonth(bits[1]);
            // increase the year if going back into the months' list.
            if(month < d.getMonth()) {
            	d.setFullYear(d.getFullYear() + 1);
            }
            d.setMonth(month);
            return d;
        }
    	}
	],
	parseDateString : function (s, d) {
		var d = d !== undefined ? d : new Date();
		for (var i = 0; i < this.dateParsePatterns.length; i++) {
			var re = this.dateParsePatterns[i].re;
			var handler = this.dateParsePatterns[i].handler;
			var bits = re.exec(s);
			if (bits) {
				return handler(bits, d, this);
			}
		}
		throw new Error("Invalid date string");
	}
}})();

dopplrMicroformat.init();

/*
2007-06-10	Yoan Blanc <yoan.blanc@gmail.com>

  * Changelog: Avoid the fellows page to be microformatted.

2007-06-09	Yoan Blanc <yoan.blanc@gmail.com>

  * Changelog: Initial creation.
*/

