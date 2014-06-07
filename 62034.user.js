// ==UserScript==
// @name           IKEAShoppingChart
// @namespace      WakoondIkeaSC
// @description    IKEA Shipping Details for Shopping Cart
// @include        http://www.ikea.com/webapp/wcs/stores/*
// ==/UserScript==

/* ************************* JSON ***************************** */
/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

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

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
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
/* ************************* end of JSON ***************************** */

var imageDataUp = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%0B%1A%08%3A%01%ED%2C%DE%FA%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01'IDAT8%CB%AD%D4%CFJBQ%10%06%F0%9F!%FD!%11%A1%16%81%95E%09A%D9%DAj%A1%AB%EA%B1%7C%AC%96%B6%EB%1D%DA%14D%BB%A0%85%0B3%F0%B6%19%E1d%F7%9A%A2%03%87%3B%F7%9C%E1%3B%DF%CC%9CoJ%18%A3dEVBf%85VN%FC%3E%1E1%C4%E6%02%18%93%F8%0E%BA%82a%86%DE%92%E4z%C8%CAS7%E5%D9~%ACu%8C%F0%16%2B%8F%E9%AF%94%8B%D2%3C%8Dtj%F8%8C%B2%E4%01nN%03%16Y%03%F7%A8%E3%1D%AF%F36%A5%C8%8E%D1%0E%FF%00%0F%B3%82%D7f%9Cm%E3%0A%CDdo%14L%DBq%BE%10%60%0B%B78I%F6%3Ep%88%3B%5C%CE%9B%F2n4%A2%8B%9B%00HY%9F%A3%9A%88%E29.*%04l%06%B3k%5C%60'9%AB%C6%AA%C7%7F%960%2F%04%3C%8B%AE%1Ea%2B%F6%C69%E5i%C5%F7%05O%B3j%D8%88%A2%EF%05%83%EFDM%D3Mk%C7%2B%98Y%C3J%E2%D7%E6xV%95%FF%BA%3CXP%C3%83%22%86%C3d%EAL%A4%94%A7%EF%2C%3A%BC%81%AF%24%BEP%CB%FD%24h%11%FB%A3%E5N%8C%A0e%E6%E1%EA'%F6%0F%11%D76%B7d%E5%F0%87%00%00%00%00IEND%AEB%60%82";
var imageDataDown = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%0B%1A%08%3A%10%87%9C%FE%08%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01'IDAT8%CB%AD%D4%BFN%02A%10%C7%F1%0F%04%91B%8D%B5%D1G%B076%F0f%F2V%1A%1B%B1%F0_%AB%16%1A1%88%C1%C4%86%C4B%0C%9A%98%B3%993%E7%C9%1D%10%F8%25%9B%BD%DB%9D%F9%EE%EC%EE%ECT%90X%A2j%D1wp%8A1%1As%F8%A7%F6M%B4%D2%C1%04%ED%05%03k%07'%A9eV%12%AB%B4%B0%8A%CF0%AAL%004%C2%A7%13m%9C%DFr%23%03%3C%983%BAN%F6%98%AA%B9%C9%B59a%FF%EC%F3%C0%F7%02%C7%04%DF%18%E1%AD%CC%3E%0F%EC%E12%1C%B3%AAD%5B%89%FE5%EC%FAEi%93%EA%1EG%F1%BDW%B0%F8%07np%8E%BBi%C0%87LD%B0%83ul%C4%FF%10%B78%89%CB%E8N%03%0E%A3U%E2%DC%F6%B1%9B%01%3E%E3%2C%60%97e%2F%25%AF%EB%00ng_%00%1Eq%1C%5B%9E%A8j%C1%F8(%22xA%3Dw%24%17%13.mj%84%A9%9Ep%85%AD%80%F7f-%0Ee%C0ClF%FE%F5g%05%8E%0B%E6%BB1W%C7%17%06%25Ug%E2%5B%CEkP%02%C9%17%8B%3F%C0f%94%A0E%EA%E1o%02%2F%B5bW-W%C9%0F%C5pJ%FFa9%24y%00%00%00%00IEND%AEB%60%82";
var imageDataGrp = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%0B%1A%09%03%1C%81lU%AE%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00%E3IDAT8%CB%AD%94%DD%0D%C20%0C%84%3F%A7%85%82%60%12%1EY%00F%EBh%B0%00%E3%94B)%E5%C5%91%2C%2B%A5-%E4%A4(%91%E5%BB%F8'%B1%00%03%19Q%EA~%01%AE%40%0Bl%16%F0%A3%FF%098G%E3%00%D4%7F%06V%AB%CEP%9A%9B%98H_4%23%01%BAD%A4%00%04%DDm%9A%5B%25%09%B0%D3%15%F1R%7B%A1%E2%95%E7%87D%24%07%23%D8%E8%B2x%02%BD%8A%3F%3C9%25x3)%FE%DCe%8F%B797%AE%BEbvq%BE%C9%08%83!%14%C0%DE%D4%D6%A2%F2bc%11%F6%23%1D_%25%BA%5E%18%FF%A4%A0%181qv%7F%C1%7DI%0DI%D5g%A4%96%93%5D%F6%C4%60%1A0%D9%FDr%86%E0%3B%C7%B3%F1%B5%94%B9%EF%D2%FFe%8Fn%E6xk%BD%E0%D8%C8Z%03%C7%2F%BF%09%CF%8F%CF!%DB%3C%94%DC%13%3B%90%17%C3%07%EF%8A2A%02%DAgK%00%00%00%00IEND%AEB%60%82";

var ikeaShoppingTableInitRows = 2;
var ikeaShoppingTableEndRows = 3;

var group_menu_element = null;

var wakoondIkeaSC_generated = 0;
var wakoondIkeaSC_inited = 0;

function swapNodes(node1, node2) {
  var nextSibling = node1.nextSibling;
  var parentNode = node1.parentNode;
  node2.parentNode.replaceChild(node1, node2);
  parentNode.insertBefore(node2, nextSibling);  
}

function saveStuff(table) {
    var myJSON = { "products" : [] };
    var rowsCount = table.rows.length;

    for (var i = 0; i < rowsCount; i++) {
        var row = table.rows[i];
        if (row.getAttribute('id') == null)
            continue;
        if (row.getAttribute('id').match('^tr_') == 'tr_') {
            var productId = row.getAttribute('id').substring(3);
            var group = row.style.backgroundColor;
            if (group == null) {
                group = ""
            } else {
                group = group.substring(5);
            }
            myJSON.products[myJSON.products.length] = { 'productId' : productId, 'order' : (i - ikeaShoppingTableInitRows), 'group' :  group};
        }
    }
 
    var strJSON = JSON.stringify(myJSON);
    
    var now = new Date();
	now.setTime(now.getTime()+(365*24*60*60*1000));
	var expires = "; expires="+now.toGMTString();
    document.cookie = 'wakoondIkeaSCOrder='+strJSON+expires+"; path=/";    
}

function restoreStuff(table) {
	var strJSON = null;

    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1, c.length);
		if (c.indexOf('wakoondIkeaSCOrder=') == 0) {
            strJSON = c.substring(19);
            break;
        }
	}
        
    if (strJSON == null)
        return;

    var myJSON = JSON.parse(strJSON);
    var rowsCount = table.rows.length;

    for (var i = 0; i < myJSON.products.length; i++) {
        var productId = myJSON.products[i].productId;
        var order = myJSON.products[i].order;
        var group = myJSON.products[i].group;
        var productRow = null;
        for (var j = 0; j < rowsCount; j++) {
            var row = table.rows[j];
            if (row.getAttribute('id') == null)
                continue;
            if (row.getAttribute('id').substring(3) == productId) {
                productRow = row;
                break;
            }
        }
        if (productRow == null)
            continue;
        
        swapNodes(productRow, table.rows[order + ikeaShoppingTableInitRows]);
        if (group != '')
            productRow.style.backgroundColor = 'light' + group;
    }
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function findPos(oElement) {
 if( typeof( oElement.offsetParent ) != 'undefined' ) {
    for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent ) {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
    return [ posX, posY ];
  } else {
    return [ oElement.x, oElement.y ];
  }
}

var genDiv = document.getElementById('wakoondIkeaSC.genDiv');
var shoppingList = document.getElementById('shoppingList');

if (genDiv == null) {
    genDiv = document.createElement('div');
    genDiv.setAttribute('id', 'wakoondIkeaSC.genDiv');
    genDiv.setAttribute('style', 'background-color: black; color: white; width: 155px; height: 190px; text-align: center; position: fixed; right: 0px; top: 0px;');
    var initLink = document.createElement('a');
    initLink.setAttribute('id', 'wakoondIkeaSC.initLink');
    initLink.setAttribute('style', 'color: white; font-weight: bold; text-decoration: underline; cursor: pointer');
    initLink.innerHTML='Initialize';
    genDiv.appendChild(initLink);
    genDiv.appendChild(document.createElement('br'));
    var genLink = document.createElement('a');
    genLink.setAttribute('id', 'wakoondIkeaSC.genLink');
    genLink.setAttribute('style', 'color: white; font-weight: bold; text-decoration: underline; cursor: pointer');
    genLink.innerHTML='Generate Details';
    genDiv.appendChild(genLink);
    genDiv.appendChild(document.createElement('br'));
    var printLink = document.createElement('a');
    printLink.setAttribute('id', 'wakoondIkeaSC.printLink');
    printLink.setAttribute('style', 'color: white; font-weight: bold; text-decoration: underline; cursor: pointer');
    printLink.innerHTML='Print';
    genDiv.appendChild(printLink);
    genDiv.appendChild(document.createElement('br'));
    genDiv.appendChild(document.createElement('br'));
    var grpOrderLink = document.createElement('a');
    grpOrderLink.setAttribute('id', 'wakoondIkeaSC.grpOrderLink');
    grpOrderLink.setAttribute('style', 'color: white; font-weight: bold; text-decoration: underline; cursor: pointer');
    grpOrderLink.innerHTML='Order by Groups';
    genDiv.appendChild(grpOrderLink);
    genDiv.appendChild(document.createElement('br'));
    genDiv.appendChild(document.createElement('br'));

    var grpName_table =  document.createElement('table');
    grpName_table.setAttribute('border', '0');
    grpName_table.setAttribute('cellpadding', '0');
    grpName_table.setAttribute('cellspacing', '2');
    grpName_table.setAttribute('style', 'width: 100%');
    genDiv.appendChild(grpName_table);

    var strJSON = null;
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1, c.length);
		if (c.indexOf('wakoondIkeaSCGroupNames=') == 0) {
            strJSON = c.substring(24);
            break;
        }
	}
     
    var myJSON = null;
    if (strJSON != null) {
        myJSON = JSON.parse(strJSON);
    }

    var grpName_tr_coral = document.createElement('tr');
    grpName_table.appendChild(grpName_tr_coral);
    var grpName_td_coral = document.createElement('td');
    grpName_td_coral.setAttribute('style', 'width: 15px; height: 15px; background-color: coral; font-size: 2pt');
    grpName_tr_coral.appendChild(grpName_td_coral);
    var grpName_td_coralName = document.createElement('td');
    grpName_tr_coral.appendChild(grpName_td_coralName);
    var grpName_td_coralInput = document.createElement('input');
    grpName_td_coralInput.setAttribute('maxlength', '15');
    grpName_td_coralInput.setAttribute('id', 'wakoondIkeaSC.grpName.coral');
    grpName_td_coralInput.setAttribute('style', 'font-size: 7pt; border: none');
    if (myJSON != null)
        grpName_td_coralInput.value = myJSON.groupNames.coral;
    grpName_td_coralName.appendChild(grpName_td_coralInput);

    var grpName_tr_green = document.createElement('tr');
    grpName_table.appendChild(grpName_tr_green);
    var grpName_td_green = document.createElement('td');
    grpName_td_green.setAttribute('style', 'width: 15px; height: 15px; background-color: green; font-size: 2pt');
    grpName_tr_green.appendChild(grpName_td_green);
    var grpName_td_greenName = document.createElement('td');
    grpName_tr_green.appendChild(grpName_td_greenName);
    var grpName_td_greenInput = document.createElement('input');
    grpName_td_greenInput.setAttribute('maxlength', '15');
    grpName_td_greenInput.setAttribute('id', 'wakoondIkeaSC.grpName.green');
    grpName_td_greenInput.setAttribute('style', 'font-size: 7pt; border: none');
    if (myJSON != null)
        grpName_td_greenInput.value = myJSON.groupNames.green;
    grpName_td_greenName.appendChild(grpName_td_greenInput);

    var grpName_tr_blue = document.createElement('tr');
    grpName_table.appendChild(grpName_tr_blue);
    var grpName_td_blue = document.createElement('td');
    grpName_td_blue.setAttribute('style', 'width: 15px; height: 15px; background-color: blue; font-size: 2pt');
    grpName_tr_blue.appendChild(grpName_td_blue);
    var grpName_td_blueName = document.createElement('td');
    grpName_tr_blue.appendChild(grpName_td_blueName);
    var grpName_td_blueInput = document.createElement('input');
    grpName_td_blueInput.setAttribute('maxlength', '15');
    grpName_td_blueInput.setAttribute('id', 'wakoondIkeaSC.grpName.blue');
    grpName_td_blueInput.setAttribute('style', 'font-size: 7pt; border: none');
    if (myJSON != null)
        grpName_td_blueInput.value = myJSON.groupNames.blue;
    grpName_td_blueName.appendChild(grpName_td_blueInput);

    var grpName_tr_yellow = document.createElement('tr');
    grpName_table.appendChild(grpName_tr_yellow);
    var grpName_td_yellow = document.createElement('td');
    grpName_td_yellow.setAttribute('style', 'width: 15px; height: 15px; background-color: yellow; font-size: 2pt');
    grpName_tr_yellow.appendChild(grpName_td_yellow);
    var grpName_td_yellowName = document.createElement('td');
    grpName_tr_yellow.appendChild(grpName_td_yellowName);
    var grpName_td_yellowInput = document.createElement('input');
    grpName_td_yellowInput.setAttribute('maxlength', '15');
    grpName_td_yellowInput.setAttribute('id', 'wakoondIkeaSC.grpName.yellow');
    grpName_td_yellowInput.setAttribute('style', 'font-size: 7pt; border: none');
    if (myJSON != null)
        grpName_td_yellowInput.value = myJSON.groupNames.yellow;
    grpName_td_yellowName.appendChild(grpName_td_yellowInput);

    var grpName_tr_salmon = document.createElement('tr');
    grpName_table.appendChild(grpName_tr_salmon);
    var grpName_td_salmon = document.createElement('td');
    grpName_td_salmon.setAttribute('style', 'width: 15px; height: 15px; background-color: salmon; font-size: 2pt');
    grpName_tr_salmon.appendChild(grpName_td_salmon);
    var grpName_td_salmonName = document.createElement('td');
    grpName_tr_salmon.appendChild(grpName_td_salmonName);
    var grpName_td_salmonInput = document.createElement('input');
    grpName_td_salmonInput.setAttribute('maxlength', '15');
    grpName_td_salmonInput.setAttribute('id', 'wakoondIkeaSC.grpName.salmon');
    grpName_td_salmonInput.setAttribute('style', 'font-size: 7pt; border: none');
    if (myJSON != null)
        grpName_td_salmonInput.value = myJSON.groupNames.salmon;
    grpName_td_salmonName.appendChild(grpName_td_salmonInput);

    var grpNameSaveLink = document.createElement('a');
    grpNameSaveLink.setAttribute('id', 'wakoondIkeaSC.grpNameSaveLink');
    grpNameSaveLink.setAttribute('style', 'color: white; font-weight: bold; text-decoration: underline; cursor: pointer');
    grpNameSaveLink.innerHTML='Save Group Names';
    genDiv.appendChild(grpNameSaveLink);

    shoppingList.appendChild(genDiv);

}


document.addEventListener('click', function(event) {
   if (event.target.getAttribute('id') == null) {
        if (group_menu_element != null) {
            group_menu_element.parentNode.removeChild(group_menu_element);
            group_menu_element = null;
        }
        return;
    }

    if (event.target.getAttribute('id').match('^' + 'wakoondIkeaSC.group.') == 'wakoondIkeaSC.group.') {
        var ikeaTable = document.getElementById('tblShoppingList');
        var newGroup = event.target.getAttribute('id').substring(20);
        var tmp = newGroup.indexOf('.');
        var productId = newGroup.substring(tmp + 1);
        newGroup = newGroup.substring(0, tmp);

        var affectedRow = document.getElementById('tr_' + productId);
        if (affectedRow != null) {
            affectedRow.style.backgroundColor = 'light' + newGroup;
            saveStuff(ikeaTable);
        }
    }


    if (group_menu_element != null) {
        group_menu_element.parentNode.removeChild(group_menu_element);
        group_menu_element = null;
    }

    if (event.target.getAttribute('id') == 'wakoondIkeaSC.genLink') {
        if (wakoondIkeaSC_generated == 1)
            return;
        wakoondIkeaSC_generated = 1;
        var allCells = document.getElementsByTagName('td');
        for (var i = 0; i < allCells.length; i++) {
            var cell = allCells[i];
            if (cell.getAttribute('class') != 'colInStock') {
                continue;
            }
            var productRow = cell.parentNode;
            var productId = productRow.getAttribute('id').substring(3);
            
            var gmtable = document.createElement('table');
            gmtable.setAttribute('border', '0');
            gmtable.setAttribute('cellpadding', '0');
            gmtable.setAttribute('cellspacing', '2');

            var gmt_row_bo = document.createElement('tr');
            gmtable.appendChild(gmt_row_bo);
            var gmt_td_bo = document.createElement('td');
            gmt_td_bo.innerHTML = "BO:";
            gmt_row_bo.appendChild(gmt_td_bo);
            var gmt_td_bo_cnt = document.createElement('td');
            gmt_td_bo_cnt.innerHTML = "0";
            gmt_td_bo_cnt.setAttribute('id', 'gmt_budaors_cnt_' + productId);
            gmt_td_bo_cnt.setAttribute('style', 'font-size: 8pt; font-weight: bold; font-family: monospace');
            gmt_row_bo.appendChild(gmt_td_bo_cnt);
            var gmt_td_bo_place = document.createElement('td');
            gmt_td_bo_place.innerHTML = "--";
            gmt_td_bo_place.setAttribute('id', 'gmt_budaors_place_' + productId);
            gmt_td_bo_place.setAttribute('style', 'font-size: 7pt; font-family: monospace; vertical-align: middle;');
            gmt_row_bo.appendChild(gmt_td_bo_place);

            var gmt_row_bp = document.createElement('tr');
            gmtable.appendChild(gmt_row_bp);
            var gmt_td_bp = document.createElement('td');
            gmt_td_bp.innerHTML = "BP:";
            gmt_row_bp.appendChild(gmt_td_bp);
            var gmt_td_bp_cnt = document.createElement('td');
            gmt_td_bp_cnt.innerHTML = "0";
            gmt_td_bp_cnt.setAttribute('id', 'gmt_budapest_cnt_' + productId);
            gmt_td_bp_cnt.setAttribute('style', 'font-size: 8pt; font-weight: bold; font-family: monospace');
            gmt_row_bp.appendChild(gmt_td_bp_cnt);
            var gmt_td_bp_place = document.createElement('td');
            gmt_td_bp_place.innerHTML = "--";
            gmt_td_bp_place.setAttribute('id', 'gmt_budapest_place_' + productId);
            gmt_td_bp_place.setAttribute('style', 'font-size: 7pt; font-family: monospace; vertical-align: middle;');
            gmt_row_bp.appendChild(gmt_td_bp_place);

            cell.appendChild(gmtable);

            var shopLinks = new Array();
            shopLinks[0] = 'http://www.ikea.com/hu/hu/catalog/availability/' + productId + '/budaors';
            shopLinks[1] = 'http://www.ikea.com/hu/hu/catalog/availability/' + productId + '/budapest';

            for (var s = 0; s < shopLinks.length; s++) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: shopLinks[s],
                    onload: function(response) {
                        if (response.status != 200) {
                            return;
                        }
                        
                        var count = 0;
                        var count2 = 0;
                        var re = new RegExp('[0-9]\+ db\.');
                        var idx = response.responseText.search(re);
                        if (idx > 0) {
                            var endIdx = response.responseText.indexOf(' ', idx);
                            count = response.responseText.substr(idx, endIdx - idx);
                            var remainingText = response.responseText.substr(endIdx);
                            idx = remainingText.search(re);
                            if (idx > 0) {
                                var endIdx = remainingText.indexOf(' ', idx);
                                count2 = remainingText.substr(idx, endIdx - idx);
                            }
                        }

                        var hely = "";
                        var sor = "";
                        var placePattern = '<div class="sc_com_locationNo sc_find_it_location_number">';
                        var placePatternLen = placePattern.length;
                        idx = response.responseText.indexOf(placePattern);
                        while (idx > 0) {
                            idx = idx + placePatternLen;
                            endIdx = response.responseText.indexOf('<', idx);
                            sor = response.responseText.substr(idx, endIdx - idx);
                            idx = response.responseText.indexOf(placePattern, endIdx);
                            if (idx > 0) {
                                idx = idx + placePatternLen;
                                endIdx = response.responseText.indexOf('<', idx);
                                var oszt = response.responseText.substr(idx, endIdx - idx);
                                if (hely.length > 0) 
                                    hely = hely + "<br>";
                                hely = hely + sor + "/" + oszt;
                            }
                            idx = response.responseText.indexOf(placePattern, endIdx);
                        }

                        var pcsPattern = '<div class="sc_com_packageInfoSPR">';
                        var pcsPatternLen = pcsPattern.length;
                        idx = response.responseText.indexOf(pcsPattern);
                        if (idx > 0) {
                            idx = idx + pcsPatternLen;
                            endIdx = response.responseText.indexOf('<', idx);
                            var pieces = response.responseText.substr(idx, endIdx - idx);
                            pieces = trim(pieces);
                            var piecesExp = new RegExp("[0-9]+", "g");
                            pieces = piecesExp.exec(pieces);
                            if (hely.length > 0) 
                                hely = hely + "<br>";
                            hely = hely + "<b>" + pieces + "csom.</b>"; 
                        } else {
                            var pieces = 0;
                            if (hely.length > 0)
                                pieces = 1;
                            idx = -4;
                            while ( (idx = hely.indexOf("<br>", idx + 4)) > 0 ) {
                                pieces = pieces + 1;
                            }
                            if (pieces > 0) {
                                if (hely.length > 0)
                                    hely = hely + "<br>";
                                hely = hely + "<b>" + pieces + " csom.</b>"; 
                            }
                        }

                        var urlParts = response.finalUrl.split('/');
                        var productId = urlParts[urlParts.length - 2];
                        var shopId = urlParts[urlParts.length - 1];
                        var cntCell = document.getElementById('gmt_' + shopId + '_cnt_' + productId);
                        cntCell.innerHTML = count + '(' + count2 + ')'
                        var cntStyle = cntCell.getAttribute('style');
                        if (count * 1 < 3) {
                            cntCell.setAttribute('style', cntStyle + '; color: red');
                        } else if (count < 6) {
                            cntCell.setAttribute('style', cntStyle + '; color: orange');
                        } else {
                            cntCell.setAttribute('style', cntStyle + '; color: darkgreen');
                        }
                        var placeCell = document.getElementById('gmt_' + shopId + '_place_' + productId);
                        placeCell.innerHTML = hely;
                    }
                });
            }
        }
    } else if (event.target.getAttribute('id') == 'wakoondIkeaSC.initLink') {
        if (wakoondIkeaSC_inited == 1)
            return;
        wakoondIkeaSC_inited = 1;
        var ikeaTable = document.getElementById('tblShoppingList');
        restoreStuff(ikeaTable);
        var allCells = document.getElementsByTagName('td');
        for (var i = 0; i < allCells.length; i++) {
            var cell = allCells[i];
            if (cell.getAttribute('class') != 'colQty') {
                continue;
            }

            var productRow = cell.parentNode;
            var productId = productRow.getAttribute('id').substring(3);
            
            var gmmngtable = document.createElement('table');
            gmmngtable.setAttribute('border', '0');
            gmmngtable.setAttribute('cellpadding', '0');
            gmmngtable.setAttribute('cellspacing', '2');
            gmmngtable.setAttribute('style', 'width: 100%');

            var gmmngt_row = document.createElement('tr');
            gmmngtable.appendChild(gmmngt_row);
            var gmmngt_td_up = document.createElement('td');
            var gmmngt_img_up = document.createElement('img');
            gmmngt_img_up.src = imageDataUp;
            gmmngt_img_up.setAttribute('style', 'width: 15px; height: 15px; cursor: pointer;');
            gmmngt_img_up.setAttribute('id', 'wakoondIkeaSC.goUp.' + productId);
            gmmngt_td_up.appendChild(gmmngt_img_up);
            gmmngt_row.appendChild(gmmngt_td_up);
            var gmmngt_td_down = document.createElement('td');
            var gmmngt_img_down = document.createElement('img');
            gmmngt_img_down.src = imageDataDown;
            gmmngt_img_down.setAttribute('style', 'width: 15px; height: 15px; cursor: pointer;');
            gmmngt_img_down.setAttribute('id', 'wakoondIkeaSC.goDown.' + productId);
            gmmngt_td_down.appendChild(gmmngt_img_down);
            gmmngt_row.appendChild(gmmngt_td_down);
            var gmmngt_td_grp = document.createElement('td');
            var gmmngt_img_grp = document.createElement('img');
            gmmngt_img_grp.src = imageDataGrp;
            gmmngt_img_grp.setAttribute('style', 'width: 15px; height: 15px; cursor: pointer;');
            gmmngt_img_grp.setAttribute('id', 'wakoondIkeaSC.chGrp.' + productId);
            gmmngt_td_grp.appendChild(gmmngt_img_grp);
            gmmngt_row.appendChild(gmmngt_td_grp);

            cell.appendChild(gmmngtable);
        } 
    } else if (event.target.getAttribute('id').match('^' + 'wakoondIkeaSC.goUp.') == 'wakoondIkeaSC.goUp.') {
        var productId = event.target.getAttribute('id').substring(19);
        var ikeaTable = document.getElementById('tblShoppingList');
        var affectedRow = -1;
        var ikeaRowsCount = ikeaTable.rows.length;

        for (var i = 0; i < ikeaRowsCount; i++) {
            var ikeaRow = ikeaTable.rows[i];
            if (ikeaRow.getAttribute('id') == null)
                continue;

            if (ikeaRow.getAttribute('id').substring(3) == productId) {
                affectedRow = i;
                break;
            }
        }
        if (affectedRow <= ikeaShoppingTableInitRows + 1)
            return;

        var row1 = ikeaTable.rows[affectedRow];
        var row2 = ikeaTable.rows[affectedRow - 1];
        swapNodes(row1, row2); 

        saveStuff(ikeaTable);
    } else if (event.target.getAttribute('id').match('^' + 'wakoondIkeaSC.goDown.') == 'wakoondIkeaSC.goDown.') {
        var productId = event.target.getAttribute('id').substring(21);
        var ikeaTable = document.getElementById('tblShoppingList');
        var affectedRow = -1;
        var ikeaRowsCount = ikeaTable.rows.length;

        for (var i = 0; i < ikeaRowsCount; i++) {
            var ikeaRow = ikeaTable.rows[i];
            if (ikeaRow.getAttribute('id') == null)
                continue;

            if (ikeaRow.getAttribute('id').substring(3) == productId) {
                affectedRow = i;
                break;
            }
        }
        if (affectedRow >= ikeaRowsCount - ikeaShoppingTableEndRows)
            return;

        var row1 = ikeaTable.rows[affectedRow];
        var row2 = ikeaTable.rows[affectedRow + 1];
        swapNodes(row1, row2); 

        saveStuff(ikeaTable);
    } else if (event.target.getAttribute('id') == 'wakoondIkeaSC.grpOrderLink') {
        var ikeaTable = document.getElementById('tblShoppingList');
        var ikeaRowsCount = ikeaTable.rows.length;
        var groups = new Array();
        groups[0] = '';
        groups[1] = 'coral';
        groups[2] = 'green';
        groups[3] = 'blue';
        groups[4] = 'yellow';
        groups[5] = 'salmon';

        var nextRow = ikeaShoppingTableInitRows;
        for (var i = 0; i < groups.length; i++) {
            var orderStart = nextRow;
            for (var j = orderStart; j < ikeaRowsCount - ikeaShoppingTableEndRows + 1; j++) {
                var group = ikeaTable.rows[j].style.backgroundColor;
                if (group.indexOf('light') > -1) {
                    group = group.substring(5);
                }
                if (group == groups[i]) {
                    if (nextRow != j) {
                        swapNodes(ikeaTable.rows[j], ikeaTable.rows[nextRow]);
                    }
                    nextRow += 1;
                }
            }

        }
        saveStuff(ikeaTable);
    } else if (event.target.getAttribute('id').match('^' + 'wakoondIkeaSC.chGrp.') == 'wakoondIkeaSC.chGrp.') {
        var productId = event.target.getAttribute('id').substring(20);
        var ikeaAllContent = document.getElementById('allContent');

        var grpmenu_div = document.createElement('div');
        grpmenu_div.setAttribute('style', 'border: solid 1px black; background-color: lightgrey; width: 60px; position: absolute');
        [posLeft, posTop] = findPos(event.target);
        grpmenu_div.style.left = posLeft + 'px';
        grpmenu_div.style.top = posTop + 'px';
        ikeaAllContent.appendChild(grpmenu_div);
        group_menu_element = grpmenu_div;

        var grpmenu_table = document.createElement('table');
        grpmenu_table.setAttribute('border', '0');
        grpmenu_table.setAttribute('cellpadding', '0');
        grpmenu_table.setAttribute('cellspacing', '2');
        grpmenu_table.setAttribute('style', 'width: 100%');
        grpmenu_div.appendChild(grpmenu_table);

        var grpmenu_tr_coral = document.createElement('tr');
        grpmenu_table.appendChild(grpmenu_tr_coral);
        var grpmenu_td_coral = document.createElement('td');
        grpmenu_td_coral.setAttribute('style', 'width: 100%; height: 15px; background-color: coral; font-size: 2pt; cursor: pointer');
        grpmenu_td_coral.setAttribute('id', 'wakoondIkeaSC.group.coral.' + productId);
        grpmenu_td_coral.innerHTML = '&nbsp;'
        grpmenu_tr_coral.appendChild(grpmenu_td_coral);

        var grpmenu_tr_green = document.createElement('tr');
        grpmenu_table.appendChild(grpmenu_tr_green);
        var grpmenu_td_green = document.createElement('td');
        grpmenu_td_green.setAttribute('style', 'width: 100%; height: 15px; background-color: green; font-size: 2pt; cursor: pointer');
        grpmenu_td_green.setAttribute('id', 'wakoondIkeaSC.group.green.' + productId);
        grpmenu_td_green.innerHTML = '&nbsp;'
        grpmenu_tr_green.appendChild(grpmenu_td_green);

        var grpmenu_tr_blue = document.createElement('tr');
        grpmenu_table.appendChild(grpmenu_tr_blue);
        var grpmenu_td_blue = document.createElement('td');
        grpmenu_td_blue.setAttribute('style', 'width: 100%; height: 15px; background-color: blue; font-size: 2pt; cursor: pointer');
        grpmenu_td_blue.setAttribute('id', 'wakoondIkeaSC.group.blue.' + productId);
        grpmenu_td_blue.innerHTML = '&nbsp;'
        grpmenu_tr_blue.appendChild(grpmenu_td_blue);

        var grpmenu_tr_yellow = document.createElement('tr');
        grpmenu_table.appendChild(grpmenu_tr_yellow);
        var grpmenu_td_yellow = document.createElement('td');
        grpmenu_td_yellow.setAttribute('style', 'width: 100%; height: 15px; background-color: yellow; font-size: 2pt; cursor: pointer');
        grpmenu_td_yellow.setAttribute('id', 'wakoondIkeaSC.group.yellow.' + productId);
        grpmenu_td_yellow.innerHTML = '&nbsp;'
        grpmenu_tr_yellow.appendChild(grpmenu_td_yellow);

        var grpmenu_tr_salmon = document.createElement('tr');
        grpmenu_table.appendChild(grpmenu_tr_salmon);
        var grpmenu_td_salmon = document.createElement('td');
        grpmenu_td_salmon.setAttribute('style', 'width: 100%; height: 15px; background-color: salmon; font-size: 2pt; cursor: pointer');
        grpmenu_td_salmon.setAttribute('id', 'wakoondIkeaSC.group.salmon.' + productId);
        grpmenu_td_salmon.innerHTML = '&nbsp;'
        grpmenu_tr_salmon.appendChild(grpmenu_td_salmon);
    } else if (event.target.getAttribute('id') == 'wakoondIkeaSC.grpNameSaveLink') {
        var coralName = document.getElementById('wakoondIkeaSC.grpName.coral').value;
        var greenName = document.getElementById('wakoondIkeaSC.grpName.green').value;
        var blueName = document.getElementById('wakoondIkeaSC.grpName.blue').value;
        var yellowName = document.getElementById('wakoondIkeaSC.grpName.yellow').value;
        var salmonName = document.getElementById('wakoondIkeaSC.grpName.salmon').value;
        var myJSON = { "groupNames" : {
            'coral' : coralName,
            'green' : greenName,
            'blue'  : blueName,
            'yellow' : yellowName,
            'salmon' : salmonName
        } };
        var strJSON = JSON.stringify(myJSON);
        var now = new Date();
        now.setTime(now.getTime()+(365*24*60*60*1000));
        var expires = "; expires="+now.toGMTString();
        document.cookie = 'wakoondIkeaSCGroupNames='+strJSON+expires+"; path=/";    
        alert('Save: Done');
    } else if (event.target.getAttribute('id') == 'wakoondIkeaSC.printLink') {
        var prn = window.open('about:blank');

        prn.document.write('<html><head>');
        prn.document.write('<style>');
        prn.document.write('a:link, a:visited, a:active, a:hover { color: black; text-decoration: none }');
        prn.document.write('.prodName { display: block; font-weight: bold; }');
        prn.document.write('.prodDesc { display: block; padding-bottom: 0.27em; }');
        prn.document.write('.prodPrice { display: block; font-weight: bold; }');
        prn.document.write('.prodInfo { display: block; }');
        prn.document.write('img { display: none; }');
        prn.document.write('td { vertical-align: top; }');
        prn.document.write('</style>');
        prn.document.write('</head></body>');
        prn.document.write('<h1>Bevásárló Lista</h1>');
        prn.document.write('<table id="tblShoppingList">');
        prn.document.write(document.getElementById('tblShoppingList').innerHTML);
        prn.document.write('</table>');
        prn.document.write('</body></html>');
        prn.document.close();

        var ikeaTable = prn.document.getElementById('tblShoppingList');
        ikeaTable.border = 1;
        var allAnc = prn.document.getElementsByTagName('a');
        for (var i = 0; i < allAnc.length; i++) {
            var anc = allAnc[i];
            if (anc.innerHTML == "Frissít") {
                anc.parentNode.removeChild(anc);
            }
            if (anc.innerHTML == "Törlés") {
                anc.parentNode.removeChild(anc);
            }
            if (anc.innerHTML == "Raktárkészlet") {
                anc.parentNode.removeChild(anc);
            }
        }
        ikeaTable.deleteRow(1);
        ikeaTable.deleteRow(ikeaTable.rows.length - 1);

        var allCells = prn.document.getElementsByTagName('td');
        for (var i = 0; i < allCells.length; i++) {
            var cell = allCells[i];
            if (cell.getAttribute('class') != 'colQty') {
                continue;
            }
            var qty = cell.getElementsByTagName('input')[0];
            cell.innerHTML = qty.value + 'db';
        }

        var allCells = prn.document.getElementsByTagName('td');
        for (var i = 0; i < allCells.length; i++) {
            var cell = allCells[i];
            cell.style.color = 'black';
            cell.style.fontFamily = 'arial';
            cell.style.fontSize = '10pt';
        }

        var lastGroup = '';
        var coralName = document.getElementById('wakoondIkeaSC.grpName.coral').value;
        var greenName = document.getElementById('wakoondIkeaSC.grpName.green').value;
        var blueName = document.getElementById('wakoondIkeaSC.grpName.blue').value;
        var yellowName = document.getElementById('wakoondIkeaSC.grpName.yellow').value;
        var salmonName = document.getElementById('wakoondIkeaSC.grpName.salmon').value;
        var allRows = prn.document.getElementsByTagName('tr');
        var ikeaTableRowCnt = 2;
        for (var i = 0; i < allRows.length; i++) {
            var row = allRows[i];
            var rowId = row.getAttribute('id');
            if (rowId == null)
                continue;
            if (rowId.match('^tr_') != 'tr_')
                continue;
            var group = row.style.backgroundColor;
            if (group.indexOf('light') > -1) {
                group = group.substring(5);
            }
            if (group != lastGroup) {
                var grpRow = ikeaTable.insertRow(ikeaTableRowCnt);
                var grpCell = grpRow.insertCell(0);
                grpCell.setAttribute('colspan', '4');
                var groupName = '';
                if (group == 'coral')
                    groupName = coralName;
                else if (group == 'green')
                    groupName = greenName;
                else if (group == 'blue')
                    groupName = blueName;
                else if (group == 'yellow')
                    groupName = yellowName;
                else if (group == 'salmon')
                    groupName = salmonName;
                grpCell.innerHTML = '<h3>' + groupName + '</h3>'
                lastGroup = group;
                ikeaTableRowCnt += 1;
                i += 1;
            }
            row.style.backgroundColor = 'white';
            ikeaTableRowCnt += 1;
        }
    }
}, true);

