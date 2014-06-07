// ==UserScript==
// @name          Microformats for MX3
// @version       0.1
// @author        Yoan Blanc
// @namespace     http://yoan.dosimple.ch/
// @description   Simple script that add some nice microformat to mx3
// @include       http://www.mx3.ch/artist/*
// @include       http://mx3.ch/artist/*
// @include       http://www.mx3.ch/
// @include       http://mx3.ch/
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

var mx3Microformat = (function(){ return {
    init: function() {
      this.gigs();
    },
    gigs: function(){
    	var oGigs = document.evaluate(
	      "//ul/li[contains(@class, 'concert-list')]",
	      document,
	      null,
	      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	      null);
	   
      for(var i=0; i<oGigs.snapshotLength; i++) {
      	var oGig = oGigs.snapshotItem(i);
      	
      	oGig.className += " vevent";
      	
      	var aDates = oGig.getElementsByTagName("h4");
      	var aParas = oGig.getElementsByTagName("p");
      	var aLinks = oGig.getElementsByTagName("a");
      	
      	if(aDates[0]) {
      		aDates[0].className += " summary";
      	}
      	if(aParas[1]) {
      		var oDate = aParas[1];
      		var dStart = this.parseDateString(oDate.firstChild.nodeValue);
      		oDate.innerHTML = '<abbr class="dtstart" title="' +
      			this.formatDate(dStart) + 
      			'">' +
      			oDate.innerHTML +
      			'</abbr>';
      	}
      	if(aParas[3]) {
      		aParas[3].className += " location";
      	}
      	if(var i=0;oLink; oLink=aLinks[i]; i++) {
      		if(oLink.target) {
      			aLinks[1].className += " url";
      		}
      	}
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
    dateParsePatterns : [
        // Fullday YY/DD/YYYY - HH:mm
        {
        	re: /^\s*\w+\s+(\d{2})\/(\d{2})\/(\d{4})\s+-\s+(\d{2}):(\d{2})\s*$/,
        	handler: function(bits, d, obj) {
        		d.setDate(parseInt(bits[1], 10));
        		d.setMonth(parseInt(bits[2], 10));
        		d.setFullYear(parseInt(bits[3], 10));
        		d.setHours(parseInt(bits[4], 10));
        		d.setMinutes(parseInt(bits[5], 10));
        		d.setSeconds(0);
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

mx3Microformat.init();

/*
2007-07-05    Yoan Blanc <yoan.blanc@gmail.com>
  * Changelog: Initial creation.
*/