// ==UserScript==
// @name          Make Yahoo Weather respect metric units
// @namespace     http://www.tobez.org/download/greasemonkey/
// @include       http://weather.yahoo.com/forecast/*_c.html*
// ==/UserScript==

/**
 ** $Id: yahoo-weather-respect-metric.user.js,v 1.4 2006/02/07 17:54:12 tobez Exp $
 **
 ** yahoo-weather-respect-metric.user.js $Revision: 1.4 $
 **
 ** ----------------------------------------------------------------------------
 ** "THE BEER-WARE LICENSE" (Revision 42)
 ** <tobez@tobez.org> wrote this file.  As long as you retain this notice you
 ** can do whatever you want with this stuff. If we meet some day, and you think
 ** this stuff is worth it, you can buy me a beer in return.   Anton Berezin
 ** ----------------------------------------------------------------------------
 **
 ** Although Yahoo Weather has a metric mode, it
 ** is, unfortunately, incomplete.  The textual forecast still
 ** uses things like "29F" and "15 to 25 mph".  Since this is not
 ** very useful for the rest of us, :-) I wrote this script,
 ** which fixes the problem.  It even tries to do something
 ** sensible when encountering things like "in the upper 30s".
 **
 ** A reasonably good URL to test this script would be:
 **  http://weather.yahoo.com/forecast/DAXX0009_c.html
 ** 
 ** This is a greasemonkey script, intended for use with the Firefox extension
 ** Greasemonkey.
 ** More info about Greasemonkey: http://greasemonkey.mozdev.org/
 **
 ** More info about my Greasemonkey scripts:
 **    http://www.tobez.org/download/greasemonkey/
 **
 **/

(function() 
{
	function replace_things(e)
	{
		var t = e.data;
		while (1) {
			var m = t.match(/\b([-\d]+)F\b/);
			if (!m || !m.length)
				break;
			var nt = t.replace(/\b([-\d]+)F\b/, Math.round((parseInt(m[1])-32)/9.0*5.0) + "C");
			if (nt == t)  // if I fucked up, prevent looping
				break;
			t = nt;
		}
		while (1) {
			var m = t.match(/\b(\d+)\s+to\s+(\d+)\s*mph\b/);
			if (!m || !m.length)
				break;
			var nt = t.replace(/\b(\d+)\s+to\s+(\d+)\s*mph\b/, 
							   Math.round(parseInt(m[1])*1.609344) +
							   " to " +
							   Math.round(parseInt(m[2])*1.609344) +
							   " kph");
			if (nt == t)  // if I fucked up, prevent looping
				break;
			t = nt;
		}
		while (1) {
			var m = t.match(/\bin\s+the\s+(low|low to mid|mid|mid to upper|upper)\s+(-?\d*0)s\b/);
			if (!m || !m.length)
				break;
			var correction;
			if (m[1] == "low")
				correction = 2;
			else if (m[1] == "low to mid")
				correction = 3;
			else if (m[1] == "mid")
				correction = 5;
			else if (m[1] == "mid to upper")
				correction = 7;
			else if (m[1] == "upper")
				correction = 8;
			var sign = parseInt(m[2]) < 0 ? -1 : +1;
			var nt = t.replace(/\bin\s+the\s+(low|low to mid|mid|mid to upper|upper)\s+(-?\d*0)s\b/,
				"around " +
				Math.round((parseInt(m[2])-32+sign*correction)/9.0*5.0) +
				"C");
			if (nt == t)  // if I fucked up, prevent looping
				break;
			t = nt;
		}
		if (t != e.data)
			e.data = t;
	}

	function text_walk(e)
	{
		var children = e.childNodes;
		for(var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.nodeType == 3) {  /* Node.TEXT_NODE */
				replace_things(child);
			} else {
				text_walk(child);
			}
		}
	}
	
	function do_the_deed() {
        var bodies = document.getElementsByTagName("body");
		if (bodies && bodies.length)
			text_walk(bodies[0]);
	}
	
	do_the_deed();
})();
