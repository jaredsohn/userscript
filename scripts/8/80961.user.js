// ==UserScript==
// @name           Fix Di.fm Timezone
// @namespace      http://www.modeemi.fi/~flux/
// @description    Converts the times in Di.fm calendar into your local time zone
// @include        http://www.di.fm/calendar/*
// @include        http://di.fm/calendar/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

/* from http://www.idealog.us/2006/06/javascript_to_p.html */
function
getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
} 


function interpTime(year, mon, day, hour, min, ampm) {
  // works, but the time zone of EST is a bit hand-waving.. (iow: guesswork, probably not correct, etc)
  var hour24;
  if (ampm == "am") {
    hour24 = hour % 12;
  } else if (ampm == "pm") {
    hour24 = 12 + hour % 12;
  } else {
    hour24 = hour;
  }
  return new Date(Date.UTC(year, mon - 1, day, hour24, min) + 4 * 3600 * 1000);

  // this apparently gives wrong results?! (compared to timeanddate.com) 
  // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "August", "Sep", "Oct", "Nov", "Dec"];
  //  return new Date(Date.parse(months[mon - 1] + " " + day + " " + year + " " + hour + ":" + min + " " + ampm + " EST"));
}

function forall(f, array) {
  var ok = 1;
  for (var c = 0; ok && c < array.length; ++c) {
    ok = ok && f(array[c]);
  }
  return ok;
}

var rangeRe = /([0-9]+):([0-9]+)(?:\s(am|pm))?\s?(?:\s[a-zA-Z][a-z][a-z])?-\s([0-9]+):([0-9]+)(?:\s(am|pm))?(?:\s[a-zA-Z][a-z][a-z])?/;

function parseRange(year, mon, day, str) {
  var parts = rangeRe.exec(str);
  if (parts && forall(function(el) { return (el !== null); }, parts)) {
    var t1 = interpTime(year, mon, day, parts[1], parts[2], parts[3]);
    //var t1 = interpTime(year, mon, day, parts[1], parts[2], parts[3] ? parts[3] : parts[6]);
    var t2 = interpTime(year, mon, day, parts[4], parts[5], parts[6]);
    if (t2 < t1) {
      t2.setDate(t2.getDate() + 1);
    }
    return [t1, t2];
  } else {
    return null;
  }
}

// returns the date at the beginning of the week
function atBOW(date)
{
  while (date.getDay() != 0) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}

function findTableIdx(tag, el)
{
  var parent = el.parentNode;
  if (parent) {
    if (parent.tagName == tag) {
      var found = null;
      var siblings = parent.childNodes;
      for (var c = 0; found === null && c < siblings.length; ++c) {
	if (siblings[c] === el) {
	  found = c;
	}
      }
      return found;
    } else {
      return findTableIdx(tag, parent);
    }
  }
}

function findTDIndex(el)
{
  return findTableIdx("TR", el);
}

function findTRIndex(el)
{
  return findTableIdx("TBODY", el)
}

function padString(str, length, char, location)
{
  var str = "" + str;
  while (str.length < length) {
    if (location <= 0) {
      str = char + str;
    } else {
      str = str + char;
    }
  }
  return str;
}

function pad2(str)
{
  return padString(str, 2, '0', 0);
}

function timeToString(d) {
  return pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds());
}

function dateToString(d) {
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()) + " "
    + timeToString(d);
}

function convertElementTime(year, month, day, textEl)
{
  var range = parseRange(year, month, day, textEl.textContent);
  if (range) {
    textEl.textContent = textEl.textContent.replace(rangeRe, dateToString(range[0]) + " - " + timeToString(range[1]));
  }
}

function replaceTimes() {
  var day = getQueryVariable("day");
  var month = getQueryVariable("month");
  var year = getQueryVariable("year");
  if (day !== null && month !== null && year !== null) {
    var isDay = getQueryVariable("type") == "day";
    var isWeek = getQueryVariable("type") == "week";
    var is2Week = getQueryVariable("type") == "2week";
    if (isWeek || is2Week) {
      var date = atBOW(new Date(year, month - 1, day));
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
    }
    // $("table:last>tbody>tr>td:even").each(function (idx, el) {
    $("*").each(function (idx, el) {
	var children = el.childNodes;
	var dayOffset = null;
	var searchedTd = 0;
	// doesn't handle text fields separated with <br>
	for (var c = 0; c < children.length; ++c) {
	  var n = children[c];
	  // process only text nodes
	  if (n && n.nodeType == 3) {
	    if ((isWeek || is2Week) && !searchedTd && dayOffset === null) {
	      searchedTd = 1;
	      var td = findTDIndex(el);
	      if (td) {
		dayOffset = td / 2;
	      }
	      if (is2Week) {
		var tr = findTRIndex(el);
		if (tr && dayOffset) {
		  console.log("td = ", td, "tr = ", tr);
		  dayOffset += (tr - 2) / 2 * 7;
		}
	      }
	    }
	    if (isDay) {
	      convertElementTime(year, month, day, n);
	    } else if (dayOffset !== null) {
	      convertElementTime(year, month, day + dayOffset, n);
	    }
	  }
	}
      });
  }
}

function letsJQuery() {
  replaceTimes();
}
