// ==UserScript==
// @name          Taxi estimator for google maps
// @namespace     http://jeffpalm.com/gtaxi
// @description   Shows an estimated taxi price for a route in NYC
// @include       http://*maps.google.com/*
// ==/UserScript==

/*
 * Copyright 2007 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
// --------------------------------------------------

function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target;
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

/* * 
 * This script and many more are available free online at The
 * JavaScript Source :: http://javascript.internet.com Created by:
 * Public Domain 
 */
function insertAfter(node, referenceNode) {
  parent = node.parentNode;
  if (referenceNode.nextSibling) {
    parent.insertBefore(node, referenceNode.nextSibling);
  } else {
    parent.appendChild(node);
  }
}
/**
 * JavaScript printf/sprintf functions.
 *
 * This code is unrestricted: you are free to use it however you like.
 * 
 * The functions should work as expected, performing left or right alignment,
 * truncating strings, outputting numbers with a required precision etc.
 *
 * For complex cases, these functions follow the Perl implementations of
 * (s)printf, allowing arguments to be passed out-of-order, and to set the
 * precision or length of the output based on arguments instead of fixed
 * numbers.
 *
 * See http://perldoc.perl.org/functions/sprintf.html for more information.
 *
 * Implemented:
 * - zero and space-padding
 * - right and left-alignment,
 * - base X prefix (binary, octal and hex)
 * - positive number prefix
 * - (minimum) width
 * - precision / truncation / maximum width
 * - out of order arguments
 *
 * Not implemented (yet):
 * - vector flag
 * - size (bytes, words, long-words etc.)
 * 
 * Will not implement:
 * - %n or %p (no pass-by-reference in JavaScript)
 *
 * @version 2007.04.27
 * @author Ash Searle
 */
function sprintf() {
    function pad(str, len, chr, leftJustify) {
	var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
	return leftJustify ? str + padding : padding + str;

    }

    function justify(value, prefix, leftJustify, minWidth, zeroPad) {
	var diff = minWidth - value.length;
	if (diff > 0) {
	    if (leftJustify || !zeroPad) {
		value = pad(value, minWidth, ' ', leftJustify);
	    } else {
		value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
	    }
	}
	return value;
    }

    function formatBaseX(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
	// Note: casts negative numbers to positive ones
	var number = value >>> 0;
	prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
	value = prefix + pad(number.toString(base), precision || 0, '0', false);
	return justify(value, prefix, leftJustify, minWidth, zeroPad);
    }

    function formatString(value, leftJustify, minWidth, precision, zeroPad) {
	if (precision != null) {
	    value = value.slice(0, precision);
	}
	return justify(value, '', leftJustify, minWidth, zeroPad);
    }

    var a = arguments, i = 0, format = a[i++];
    return format.replace(sprintf.regex, function(substring, valueIndex, flags, minWidth, _, precision, type) {
	    if (substring == '%%') return '%';

	    // parse flags
	    var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false;
	    for (var j = 0; flags && j < flags.length; j++) switch (flags.charAt(j)) {
		case ' ': positivePrefix = ' '; break;
		case '+': positivePrefix = '+'; break;
		case '-': leftJustify = true; break;
		case '0': zeroPad = true; break;
		case '#': prefixBaseX = true; break;
	    }

	    // parameters may be null, undefined, empty-string or real valued
	    // we want to ignore null, undefined and empty-string values

	    if (!minWidth) {
		minWidth = 0;
	    } else if (minWidth == '*') {
		minWidth = +a[i++];
	    } else if (minWidth.charAt(0) == '*') {
		minWidth = +a[minWidth.slice(1, -1)];
	    } else {
		minWidth = +minWidth;
	    }

	    // Note: undocumented perl feature:
	    if (minWidth < 0) {
		minWidth = -minWidth;
		leftJustify = true;
	    }

	    if (!isFinite(minWidth)) {
		throw new Error('sprintf: (minimum-)width must be finite');
	    }

	    if (!precision) {
		precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : void(0);
	    } else if (precision == '*') {
		precision = +a[i++];
	    } else if (precision.charAt(0) == '*') {
		precision = +a[precision.slice(1, -1)];
	    } else {
		precision = +precision;
	    }

	    // grab value using valueIndex if required?
	    var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

	    switch (type) {
		case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad);
		case 'c': return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
		case 'b': return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
		case 'o': return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
		case 'x': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
		case 'X': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
		case 'u': return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
		case 'i':
		case 'd': {
			      var number = parseInt(+value);
			      var prefix = number < 0 ? '-' : positivePrefix;
			      value = prefix + pad(String(Math.abs(number)), precision, '0', false);
			      return justify(value, prefix, leftJustify, minWidth, zeroPad);
			  }
		case 'e':
		case 'E':
		case 'f':
		case 'F':
		case 'g':
		case 'G':
		          {
			      var number = +value;
			      var prefix = number < 0 ? '-' : positivePrefix;
			      var method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
			      var textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
			      value = prefix + Math.abs(number)[method](precision);
			      return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
			  }
		default: return substring;
	    }
		    });
}
sprintf.regex = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;

/**
 * Trival printf implementation, probably only useful during page-load.
 * Note: you may as well use "document.write(sprintf(....))" directly
 */
function printf() {
    // delegate the work to sprintf in an IE5 friendly manner:
    var i = 0, a = arguments, args = Array(arguments.length);
    while (i < args.length) args[i] = 'a[' + (i++) + ']';
    document.write(eval('sprintf(' + args + ')'));
}


// --------------------------------------------------
// main
// --------------------------------------------------

function main() {
  addLinkToTop();
}

/**
 * Add a link right next to the "Get reverse directions" link at the
 * top
 */
function addLinkToTop() {
  getDirectionsButton = document.getElementById("d_sub");
  if (!getDirectionsButton) return;
  span = $n("span",getDirectionsButton.parentNode);
  $t(" ",span);
  input = $n("input",span);
  input.className = "btn";
  input.type = "button";
  input.value = "Get Cab Fare";
  input.addEventListener("click",function() {calculateFare(); return false;},true);
}

function calculateFare() {
  //
  // Now, get the distance and time
  //
  distTime = getDistanceAndTime();
  dist = distTime[0];
  mins = distTime[1];
  price = calculatePrice(dist,mins);
  str = sprintf("Estimated cab fare: $%.2f for %.1f mi in %d mins",price,dist,mins);
  alert(str);
}

/**
 * Taken from:
 * http://www.nyc.gov/html/tlc/html/passenger/taxicab_rate.shtml
 */
function calculatePrice(dist,mins) {
  price = 0;
  price += 2.5;               // $2.50 upon entry
  price += .4 * (0.3*mins);   // 60 seconds when not in motion (assume 30%?)
  price += .4 * (5*dist);     // one-fifth of a mile, traveling at 6 miles an hour or more
  if (isNight()) price += .5; // Night surcharge of $.50 after 8:00 PM & before 6:00 AM
  if (isPeak()) price += 1;   // Peak hour Weekday Surcharge of $1.00 Monday - Friday after 4:00 PM & before 8:00 PM
  return price;
}

/**
 * @return whether it's after 8pm or before 6am
 */
function isNight() {
  d = new Date();
  hs = d.getHours();
  return hs<=6 || hs>=(8+12);
}

/**
 * @return whether it's Monday - Friday after 4:00 PM & before 8:00 PM
 */
function isPeak() {
  d = new Date();
  hs = d.getHours();
  if (hs <= (4+12) || hs >= (8+12)) return false;
  today = d.getDay().toLowerCase();
  if (today.equals("sunday") || today.equals("saturday")) return false;
  return true;
}


/**
 * Returns the distance for this trip or -1 if not found.
 */
function getDistanceAndTime() {
  //
  // <td class="timedist ul" align="right" nowrap="nowrap">3.4
  // this sucks, I'll replace with xpath later
  //
  tds = document.getElementsByTagName("td");
  if (!tds || tds.length == 0) return;
  td = 0;
  for (i in tds) {
    if (tds[i].className && tds[i].className.match(/timedist/)) {
      td = tds[i];
      break;
    }
  }
  if (!td) return;
  dist = -1;
  time = -1;
  //
  // 3.4&nbsp;mi&nbsp;(about&nbsp;15 mins)
  //
  if (td.innerHTML) {
    if (res = td.innerHTML.match(/^([^&]+)&/)) {
      dist = res[1];
    }
    if (res = td.innerHTML.match(/\(.*;(\d[^\)]+)\)/)) {
      timeStr = res[1];
      time = convertTimeToMinutes(timeStr);
    }
  }  
  return [dist,time];
}

/**
 * Converts the following regex to minutes
 */
function convertTimeToMinutes(s) {
  if (res = s.match(/(\d+).*hours.*(\d+).*mins/)) {
    return 60*parseInt(res[1]) + parseInt(res[2]);
  } else if (res = s.match(/(\d+).*mins/)) {
    return parseInt(res[1]);
  } else {
    return 0;
  }
}

function getTime() {
    return 0;
}



// --------------------------------------------------
// Main
// --------------------------------------------------
main();

