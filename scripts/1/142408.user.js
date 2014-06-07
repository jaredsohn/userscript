// ==UserScript==
// @name           Ikariam Embassy Tool (mobile version)
// @namespace      ikariam.embassy.tool.(mobile version)
// @description    Gives information about what and when of your alliance members
// @author         SHAB_RO
// @version		   2.0
// @require        http://mahdavi66.persiangig.com/Scripts/JS/jquery-1.3.2.min.js
// @include		   http://m*.ikariam.*/*
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==

/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());


/*
 * Loosely based on Ikariam-all-in-one Embassy Tool
 * (http://userscripts.org/scripts/show/35189)
 * 
 * 
 * Changes in v.1.0rc1-01
 * - Bugfix: avoid clash with CAT indicator script.
 *
 * Changes in v.1.0rc1
 * - Rewritten using jQuery & JSON.
 * - Added inline artwork from http://dryicons.com
 *
 * Changes in v. 0.99a
 * - Fiddled with the scores display. Useless padding removed.
 * - Added duration for shipping resources from selected town to members towns.
 *
 * Changes in v. 0.99
 * - Replaced remote images with game images from the server
 * - Moved options and reset button to the Ikariam options page
 * - Added option to display last online as number of days (the date is still available as a tooltip).
 *
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter: not needed anymore
 */

const DISPLAY_DATE = 'DisplayDate';
const INFO_DISPLAY_TEXT = 'DisplayInfoAsText';
const VAR_DISPLAY_TEXT = 'DisplayVariationsAsText';
const DEBUG = false;

var host;
var domain;
var server;

const CACHE_KEY = 'EmbassyToolCache';
const CACHE_TYPE_RESET = "Reset";
const CACHE_TYPE_LAST = "Last";

var locale = 'en';

/*
 * Words dictionary
 */
const NEW_ALERT = 'NEW_ALERT';
const NEW_TOTAL = 'NEW_TOTAL';
const ABANDON   = 'ABANDON';
const TOTAL_ABD = 'TOTAL_ABD';
const CONFIRM   = 'CONFIRM';
 
const lang = {
	en: {
		NEW_ALERT: 'New Members',
		NEW_TOTAL: 'Total new members',
		ABANDON: 'Abandon',
		TOTAL_ABD: 'Total abandon',
		CONFIRM: 'Are you sure you want to reset recorded points?'
	},
	
	it: {
		NEW_ALERT: 'Nuovi membri',
		NEW_TOTAL: 'Totale nuovi membri',
		ABANDON: 'Abbandoni',
		TOTAL_ABD: 'Totale abbandoni',
		CONFIRM: 'Sei sicuro di cancellare i punteggi salvati?'
	},
	
	co: {
		NEW_ALERT: 'חברים חדשים',
		NEW_TOTAL: 'סך הכל חברים חדשים',
		ABANDON: 'עזבו',
		TOTAL_ABD: 'סך הכל עזבו',
		CONFIRM: 'האם אתה בטוח שבירצונך לאפס?'
	},
	
	il: {
		NEW_ALERT: 'חברים חדשים',
		NEW_TOTAL: 'סך הכל חברים חדשים',
		ABANDON: 'עזבו',
		TOTAL_ABD: 'סך הכל עזבו',
		CONFIRM: 'האם אתה בטוח שבירצונך לאפס?'
	}
}

function log(m) {
	if (DEBUG) {
		GM_log(m);
	}
}

function message(id) {
	return lang[locale][id];
}

function dispatch() {
	var page = $("body").attr("id");
	if (page == "options") {
		options();
		return;
	}

	if($("#embassy").length || $("#alliance").length) {
		embassyTool();
	}
}

function makeCacheKey(cacheType) {
	var cacheKey = CACHE_KEY + "." + cacheType + "." + top.location.host;
	log("Made a cache key: " + cacheKey);
	return cacheKey;
}

function readCache(cacheType) {
	var result = {};
	var json = GM_getValue(makeCacheKey(cacheType));
	log(cacheType + ":" + json);
	if (json) {
		result = JSON.parse(json);
	}
	return result;
}

function writeCache(cacheType, cache, isDirty) {
	log("Writing " + cacheType + "..." + (isDirty?"dirty":"clean"));
	if (!isDirty) {
		return;
	}
	var json = JSON.stringify(cache);
	log("json: " + json);
	GM_setValue(makeCacheKey(cacheType), json);
}

function embassyTool() {
	host = top.location.host.split(".");
	domain = host[host.length -1];
	server = host[0];

	if (domain in lang) {
		locale = domain;
	}

	GM_addStyle(
		"#container #mainview table.table01 td { padding: 4px; } " +
		"#container #mainview table.table01 td.nopad { padding: 0; } " +
		"#mainview .cityInfo ul li ul li { padding: 4px; width: 240px; } " +
		"#mainview .aioeDistance { float: right; clear: none; }");
	
	processMembers();
}

function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

function scoreImage(value) {
	var up = 'http://s1.picofile.com/file/7469936769/UP.png';
	var down = 'http://s1.picofile.com/file/7469936876/down.png';
	var spacer = 'http://s3.picofile.com/file/7469955692/noqte.png';

	return '<img title="' + value + '" alt="' + value + '" src="' + 
	(value > 0 ? up :
	(value < 0 ? down : spacer))
	+ '" />';
}

function scoresFormat(cell, value) {
	var score = cell.text();
	if (value == undefined) {
		value = "NEW";
	}
	
	if (GM_getValue(VAR_DISPLAY_TEXT, true)) {
		cell.html("<table class='nopad' border='0' cellspacing='0' cellpadding='0' width='280'><tbody>" +
				"<tr><td width='60%' align='right' class='nopad'>" + score + "</td><td align='right' class='nopad'>(" + value + ")</td></tr></tbody></table>");
	} else {
		cell.html('<div style="float:right;">' + score + '&nbsp;' + scoreImage(value) + '</div>');
	}
}

function processMembers(membersTable, cachedMembersReset, cachedMembersLast) {

	var cachedMembersReset = readCache(CACHE_TYPE_RESET);
	var cachedMembersLast = readCache(CACHE_TYPE_LAST);
	var membersTable = $("#memberList");

	var currentMembers = {};
	var newCacheMembersReset = {};
	var isResetDirty = false;
	var isLastDirty = false;
	
	var myLocation = extractLocation($("#changeCityForm div[class*=coords]").text());

	// check for new entries
	var totalNew = 0;
	var msg = message(NEW_ALERT) + "\n";

	$("tbody tr", membersTable).each(
		function() {
			setOnlineStatus(this);
			var pointsCell = $("td:eq(4)", this);
			var memberName = $("td:eq(1)", this).html().replace(/<.*?>/g, "");
			var memberPoints = parseInt(pointsCell.html().replace(/(,|\.)/g, ""));
			
			// add distance from selected town to members town
			$("li li > a", $("td:eq(2)", this)).each(
					function() {
						$(this).before($('<div class="aioeDistance">' + getDistance(myLocation, extractLocation(this.text)) + '</div>'));
					});

			var pointsAtLastReset = cachedMembersReset[memberName];
			if (typeof(pointsAtLastReset) === 'undefined') {
				pointsAtLastReset = memberPoints;
				isResetDirty = true;
			}
			newCacheMembersReset[memberName] = pointsAtLastReset;
			
			currentMembers[memberName] = memberPoints;
			
			var pointsWhenLastSeen = cachedMembersLast[memberName];
			if (typeof(pointsWhenLastSeen) === 'undefined') {
				scoresFormat(pointsCell);
				msg += memberName + "\n";
				totalNew++;
				isLastDirty = true;
			} else {
				scoresFormat(pointsCell, memberPoints - pointsAtLastReset);
				isLastDirty |= (memberPoints != pointsWhenLastSeen);
			}
		}
	);

	if (totalNew > 0) alert(msg + message(NEW_TOTAL) + ": " + totalNew);
	
	//And now, let's check for those who left the alliance!
	var msg = message(ABANDON) + "\n";
	var totalAbandons = 0;
	for (var memberName in cachedMembersLast) {
		// If a cached member is not in the current member list...
		if (typeof(currentMembers[memberName]) == 'undefined') {
			totalAbandons++;
			msg += memberName + "\n";
			isLastDirty = true;
			isResetDirty = true;
			var trOut = document.createElement("TR");
			trOut.style.backgroundColor = "#F00";
			var tdOut = document.createElement("TD");
			tdOut.setAttribute('colspan','7');
			tdOut.style.color = "#FFF";
			tdOut.innerHTML = "<b>" + memberName + "</b> Points: <b>" + cachedMembersLast[memberName] + "</b>";
			trOut.appendChild(tdOut);
			membersTable.append(trOut);
		}
	}
	if(totalAbandons > 0) alert(msg + message(TOTAL_ABD) + ": " + totalAbandons);
	
	writeCache(CACHE_TYPE_LAST, currentMembers, isLastDirty);
	writeCache(CACHE_TYPE_RESET, newCacheMembersReset, isResetDirty);	
}

function setOnlineStatus(tRow) {
	var firstCell = $("td:first", tRow);
	var status = firstCell.attr("class");
	if(status == 'online') {
		template('online', firstCell, null);
	} else
	if(status == 'vacation') {
		template('vacation', firstCell, lastOnline);
	} else
	if(status == 'offline') {
		var nowDateStr = $("#servertime").html().split(" ")[0].replace(/^\s+|\s+$/g, '');
		var nowDate = convertIkariamDate(nowDateStr);
		var inactiveDate = new Date();
		// accounts generally go inactive after seven days
		inactiveDate.setDate(nowDate.getDate() - 7);
		
		var lastOnline = firstCell.attr("title").split(":")[1].replace(/^\s+|\s+$/g, '');
		var lastDate = convertIkariamDate(lastOnline);
		
		if (!GM_getValue(DISPLAY_DATE, true)) {
			var days = Math.ceil((nowDate - lastDate)/86400000);
			lastOnline = (days == 0) ? "today" : (days == 1) ? "yesterday" : days + " days";
		}
		
		if( lastDate < inactiveDate ) {
			template('inactive', firstCell, lastOnline);
		} else {
			template('offline', firstCell, lastOnline);
		}
	}
}

function makeCell(tpl, status, image, lastOnline, message, fontColour) {

	return (tpl > 0) ?
			"<div style='width: 8em'>" +
			(status =='online' ? "" : "<span style='float: left; padding-left: 2px;'>"+lastOnline + "</span>") +
			"<span style='float: right'><img src='" + image + "'></span></div>"
			:
			(status =='online' ? "" : "<span style='float: left'>("+lastOnline + ")</span>") +
			"<b><font color='" + fontColour + "'><span style='float: right'>" + message + "</span></font></b>";
}

function template(status, cellElement, lastOnline) {
	var tpl = GM_getValue(INFO_DISPLAY_TEXT, true) ? 0:1;
	var images = {
		'online': 'http://m1.ir.ikariam.com/skin/rtl/layout/bulb-on.png',
		'offline': 'http://m1.ir.ikariam.com/skin/rtl/layout/bulb-off.png',
		'inactive': 'http://s3.picofile.com/file/7469964301/tavajo.png',
		'vacation': 'http://m1.ir.ikariam.com/skin/rtl/layout/icon-palm.png'
	};
	var fontColours = { 'online': '#008800', 'offline': '#F00000', 'inactive': '#708090' };
	
	cellElement.html(makeCell(tpl, status, images[status], lastOnline, status.toUpperCase(), fontColours[status]));
	cellElement.css("background-image", "none")
}

function Location(xCoord, yCoord) {
	this.X = xCoord;
	this.Y = yCoord;
	this.toString = function() { return "[" + this.X + ":" + this.Y + "]"; } 
}

function extractLocation(html) {
	var rgx = /.*\[(\d+):(\d+)\].*/;
	var x = html.replace(rgx, "$1");
	var y = html.replace(rgx, "$2");
	return new Location(x, y);
}

function fmt(n, unit) {
	return (n>0 ? n + unit : "");
}

function getDistance(p1, p2) {
	// compute duration to ship goods from p1 to p2
	if (p1.X == p2.X && p1.Y == p2.Y) {
		return "10m";
	}
	
	var distance = Math.ceil(1200*Math.sqrt(Math.pow(Math.abs(p1.X-p2.X), 2) + Math.pow(Math.abs(p1.Y-p2.Y), 2)));
	var days = Math.floor(distance/86400); distance = distance - days*86400;
	var hours = Math.floor(distance/3600); distance = distance - hours*3600;
	var minutes = (days > 0) ? 0 : Math.floor(distance/60);
	var seconds = (days + hours > 0) ? 0 : distance - minutes*60;
	return fmt(days, 'D') + fmt(hours, 'h') + fmt(minutes, 'm') + fmt(seconds, 's');
}

function options() {
	var allElements = document.getElementsByTagName('form');
	for(var i = 0; i < allElements.length; i++) {
	    var thisElement = allElements[i];
		if (thisElement.elements[0].value == 'Options') {
			var div = document.createElement('div');
			div.setAttribute("id", "AIOEmbassyOptions");
			div.innerHTML = <>
				<div>
					<h3>Ikariam Embassy Tools Options</h3>
					<table cellpadding="0" cellspacing="0">
						<tr><td align="center">
							How should I display the information?<br />
							<input id="aioeInfoDisplayText" type="radio" name="aioeInfoDisplayMode" value="Text" />Text <input id="aioeInfoDisplayImages" type="radio" name="aioeInfoDisplayMode" value="Images" />Images<br />
						</td></tr>
						<tr><td align="center">
							How should I display the dates?<br />
							<input id="aioeDisplayDate" type="radio" name="aioeDisplayMode" value="Dates" />Dates <input id="aioeDisplayDurations" type="radio" name="aioeDisplayMode" value="Durations" />Durations<br />
						</td></tr>
						<tr><td align="center">
							How should I display the variations?<br />
							<input id="aioeVarDisplayText" type="radio" name="aioeVarDisplayMode" value="Text" />Text <input id="aioeVarDisplayImages" type="radio" name="aioeVarDisplayMode" value="Images" />Images<br />
						</td></tr>
						<tr><td align="center">
							<div class="centerButton"><input id="aioeReset" class="button" value="Reset!" type="button" /></div>
						</td></tr>
					</table>
				</div>
			</>;
			
			thisElement.insertBefore(div, document.getElementById('options_debug'));
			
			if (GM_getValue(INFO_DISPLAY_TEXT, true)) {
				document.getElementById("aioeInfoDisplayText").checked = true;
			} else {
				document.getElementById("aioeInfoDisplayImages").checked = true;
			}
			
			document.getElementById("aioeInfoDisplayText").addEventListener('change',
				function() {
					GM_setValue(INFO_DISPLAY_TEXT, true);
				}, true);
			document.getElementById("aioeInfoDisplayImages").addEventListener('change',
				function() {
					GM_setValue(INFO_DISPLAY_TEXT, false);
				}, true);

			if (GM_getValue(DISPLAY_DATE, true)) {
				document.getElementById("aioeDisplayDate").checked = true;
			} else {
				document.getElementById("aioeDisplayDurations").checked = true;
			}
			
			document.getElementById("aioeDisplayDate").addEventListener('change',
				function() {
					GM_setValue(DISPLAY_DATE, true);
				}, true);
			document.getElementById("aioeDisplayDurations").addEventListener('change',
				function() {
					GM_setValue(DISPLAY_DATE, false);
				}, true);
				
			if (GM_getValue(VAR_DISPLAY_TEXT, true)) {
				document.getElementById("aioeVarDisplayText").checked = true;
			} else {
				document.getElementById("aioeVarDisplayImages").checked = true;
			}
			
			document.getElementById("aioeVarDisplayText").addEventListener('change',
				function() {
					GM_setValue(VAR_DISPLAY_TEXT, true);
				}, true);
			document.getElementById("aioeVarDisplayImages").addEventListener('change',
				function() {
					GM_setValue(VAR_DISPLAY_TEXT, false);
				}, true);

			document.getElementById("aioeReset").addEventListener('click',
		    		function() {
						if (confirm(message(CONFIRM))) {
							writeCache(CACHE_TYPE_LAST, {}, true);
							writeCache(CACHE_TYPE_RESET, {}, true);
						}
		    		}, true);			
			return;
		}
	}
}

$(function(){ dispatch(); });