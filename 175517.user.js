// ==UserScript==
// @name        New Hawtness
// @description	Bungie.next in New Hawtness style
// @namespace   dazarobbo
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @resource	CSS_BASE	http://halo.bungie.net/base_css/base.css?ver=2.0.4569.16656
// @resource	CSS_IMAGES	http://halo.bungie.net/base_css/images.css?ver=2.0.4569.16656
// @resource	CSS_CONTENT	http://halo.bungie.net/base_css/content.css?ver=2.0.4569.16656
// @resource	CSS_BASE_FORUM	http://halo.bungie.net/base_css/forums.css
// @match     	*://www.bungie.net/NewHawtness/*
// @run-at		document-start
// @version     0.1
// ==/UserScript==
"use strict";

/**
 * Index:
 *
 * 		- Object
 * 		- Array
 *		- Boolean
 *		- Date
 *		- Debug
 *		- Function
 *		- Number
 *		- JSON
 *		- String
 *
 */



/**
 * Object
 */

/**
 * Returns a deep copy of object o
 *
 * @see http://stackoverflow.com/a/728694/570787
 * @param {Object} o The object to copy
 * @returns {Object} Copied object
 */
Object.DeepCopy = function(o){

	var c;

	if(o===null||typeof(o)!="object"){
		return o;
	}
	
	if(o instanceof Date){
		c=new Date();
		c.setTime(o.getTime());
		return c;
	}
	
	if(o instanceof Array){
		c=[];
		for(var i=0,l=o.length;i<l;++i){
			c[i]=Object.DeepCopy(o[i]);
		}
		return c;
	}
	
	if(o instanceof Object){
		c={};
		for(var a in o){
			if(o.hasOwnProperty(a))c[a]=Object.DeepCopy(o[a]);
		}
		return c;
	}
	
	Debug.Assert(false, "Object.DeepCopy, o cannot be handled");

};

/**
 * Returns a deep copy of object o using JSON operations
 *
 * @param {Object} o The object to copy
 * @returns {Object} Copied object
 */
Object.JSONDeepCopy = function(o){
	return JSON.parse(JSON.stringify(o));
};

/**
 * Finds the number of properties an object has
 *
 * @param {Object} o The object to check
 * @returns {Number} The number of properties it has
 */
Object.Size = function(o){
	return Object.keys(o).length;
};



/**
 * Array
 */

/**
 * Returns a new array with duplicate values removed
 *
 * @param {Array} a Array to traverse
 * @returns {Array} Array without duplicates
 */
Array.Distinct = function(a){

	Debug.Assert(Array.isArray(a), "Array.Distinct, a is not an array");
	
	var h={};
	var r=[];
	for(var i=0,l=a.length;i<l;++i){
		if(!h.hasOwnProperty(a[i])){
			h[a[i]]=true;
			r.push(a[i]);
		}
	}
	return r;

};

/**
 * Filters the values in array a by the values in array b
 * Array a is modified by reference
 *
 * @param {Array} a Array to have values removed
 * @param {Array} b Array containing values to check for in array a
 */
Array.Filter = function(a, b){

	Debug.Assert(Array.isArray(a), "Array.Filter, a is not an array");
	Debug.Assert(Array.isArray(b), "Array.Filter, b is not an array");
	
	for(var i=0,l=b.length;i<l;++i){
		a.DeleteAll(a[i]);
	}

};

/**
 * Clears array a and copies all elements from array b to a
 *
 * @param {Array} a The array to be modified
 * @param {Array} b The source array
 * @returns void
 */
Array.Set = function(a, b){

	Debug.Assert(Array.isArray(a), "Array.Set, a is not an array");
	Debug.Assert(Array.isArray(b), "Array.Set, b is not an array");
	
	a.Clear();
	for(var i=0,l=b.length;i<l;++i){
		a[i]=b[i];
	}

};

/**
 * Adds elements to the end of the current array. Multiple elements can be passed.
 *
 * @param {Object} o Object to add
 * @returns void
 */
Array.prototype.Add = function(){

	Debug.Assert(arguments.length !== 0, "Array.prototype.Add, at least one parameter must be given");
	
	for(var i=0,l=arguments.length;i<l;++i){
		this.push(arguments[i]);
	}

};

/**
 * Adds the elements within the given arrays to the current array. Multiple arrays can be passed.
 *
 * @param {Array} a Array containing elements to add
 * @returns void
 */
Array.prototype.AddArray = function(){
	
	Debug.Assert(arguments.length !== 0, "Array.prototype.AddArray, at least one array must be given");
	
	for(var i=0,l=arguments.length;i<l;++i){
		for(var j=0,k=arguments[i].length;j<k;++j){
			this.push(arguments[i][j]);
		}
	}
	
};

/**
 * Returns the last element in the current array
 *
 * @returns {Object} The last element
 */
Array.prototype.__defineGetter__("Back", function(){
	return this[this.length-1];
});

/**
 * Removes all values in the array
 *
 * @returns void
 */
Array.prototype.Clear = function(){
	this.length=0;
};

/**
 * Check a given object o exists in the array
 *
 * @param {Object} o The object to check for
 * @returns {Bool} True if exists, otherwise false
 */
Array.prototype.Contains = function(o){
	
	Debug.Assert(arguments.length === 1, "Array.prototype.Contains, incorrect number of parameters given");
	
	for(var i=0,l=this.length;i<l;++i){
		if(this[i]===o)return true;
	}
	return false;

};

/**
 * Checks a predicate is true for a given function f
 *
 * @param {Function} f The predicate to apply to each element
 * @returns {Bool} True if the predicate is satisfied, otherwise false
 */
Array.prototype.ContainsPredicate = function(f){

	Debug.Assert(typeof(f) === "function", "Array.prototype.ContainsPredicate, f is not a function");
	
	for(var i=0,l=this.length;i<l;++i){
		if(f.apply(v)){
			return true;
		}
	}
	return false;

};

/**
 * Returns the number of elements in the array
 *
 * @returns {Number} Number of elements
 */
Array.prototype.__defineGetter__("Count", function(){
	return this.length;	
});

/**
 * Deletes the first occurrence of object o in the array
 *
 * @param {Object} o The object to search for and remove
 * @returns {Bool} True if found and removed, otherwise false
 */
Array.prototype.Delete = function(o){

	Debug.Assert(arguments.length === 1, "Array.prototype.Delete, incorrect number of parameters given");

	for(var i=0,l=this.length;i<l;++i){
		if(this[i]===o){
			this.splice(i,1);
			return true;
		}
	}
	return false;

};

/**
 * Removes all occurrences of object o in the array
 *
 * @param {Object} o The object to search for and remove
 * @returns {Boolean} True if a removal occurred, otherwise false
 */
Array.prototype.DeleteAll = function(o){

	Debug.Assert(arguments.length === 1, "Array.prototype.DeleteAll, incorrect number of parameters given");
	
	var removed = false;
	for(var i=0,l=this.length;i<l;++i){
		if(this[i]===o){
			this.splice(i,1);
			removed = true;
		}
	}
	return removed;

};

/**
 * Removes the first element in the array and returns it
 *
 * @returns {Object} First element in the array, otherwise undefined
 */
Array.prototype.Dequeue = function(){
	
	if(this.length===0){
		return undefined;
	}
	
	return this.shift();
	
};

/**
 * Removes duplicate values from the current array
 *
 * @returns void
 */
Array.prototype.Distinct = function(){
	Array.Set(this,Array.Distinct(this));
};

/**
 * Adds an object to the end of the array
 *
 * @param {Object} o The object to add
 */
Array.prototype.Enqueue = function(o){
	
	Debug.Assert(arguments.length === 1, "Array.prototype.Enqueue, required parameter missing");
	
	this.push(o);

};

/**
 * Filters the current array by values in array a
 *
 * @param {Array} a The array containing values to filter by
 * @returns void
 */
Array.prototype.Filter = function(a){
	
	Debug.Assert(Array.isArray(a), "Array.prototype.Filter, a is not an array");
	
	Array.Filter(this,a);

};

/**
 * Returns the front of the current array (the 0th element)
 *
 * @returns {Object} The 0th element
 */
Array.prototype.__defineGetter__("Front", function(){
	return this[0];	
});

/**
 * Returns the last index of the array
 *
 * @returns {Number}
 */
Array.prototype.__defineGetter__("LastIndex", function(){
	return this.length - 1;	
});

/**
 * Returns a random element from the array
 *
 * @returns {Object} A random element
 */
Array.prototype.__defineGetter__("RandomElement", function(){
	return this[Math.floor(Math.random() * this.length)];
});

/**
 * Removes the last element and returns it
 *
 * @returns {Object} The last element in the array, otherwise undefined
 */
Array.prototype.PopBack = function(){

	if(this.length === 0){
		return undefined;
	}
	
	return this.pop();

};

/**
 * Removes the first element in the array and returns it
 *
 * @returns {Object} First element in the array, otherwise undefined
 */
Array.prototype.PopFront = function(){
	
	if(this.length === 0){
		return undefined;
	}

	return this.shift();

};

/**
 * Returns a shallow copy of the current array
 *
 * @returns {Array} Shallow copy of current array
 */
Array.prototype.ShallowCopy = function(){
	return this.slice(0);
};

/**
 * Randomises the array
 *
 * @see http://stackoverflow.com/a/962890/570787
 */
Array.prototype.Shuffle = function(){

	var tmp;
	var current;
	var top = this.length;
	
	if(top > 0){
		while(--top){
			current = Math.floor(Math.random() * (top + 1));
			temp = this[current];
			this[current] = this[top];
			this[top] = temp;
		}
	}

};



/**
 * Boolean
 */

/**
 * Parses a given object to a boolean value
 *
 * @returns {Bool} True if the value evaluates to "true", "yes", "1" or by its own value, otherwise false
 */
Boolean.Parse = function(o){
	switch(o.toString().toLowerCase()){
		case "true":
		case "yes":
		case "1":
			return true;
		case "false":
		case "no":
		case "0":
		case null:
			return false;
		default:
			return o ? true : false;
	}
};



/**
 * Date
 */

/**
 * Returns the capital letters inside the parentheses of a [date].toString() call
 *
 * @returns {String} Timezone abbrevation if found, otherwise null
 */
Date.__defineGetter__("LocalTimezoneAbbreviation", function(){
	return (function(){
		var p = new Date().toString().match(/\(.+\)/);
		return p ? p[0].match(/([A-Z])/g).join("") : "";
	})();
});

/**
 * Returns the number of minutes in difference from UTC
 *
 * @returns {Number}
 */
Date.__defineGetter__("LocalOffset", function(){
	return (function(){
		return -new Date().getTimezoneOffset();	
	})();
});

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
 * Determines if a given year is a leap year
 *
 * @param {Number} year Year to check
 */
Date.IsLeapYear = function(year){
	return new Date(year, 1, 29).getMonth() === 1;
};

/**
 * Creates a new date object given the UTC offset of another time zone
 *
 * @param {Number} utcOffset The offset from UTC in minutes
 * @returns {Date}
 */
Date.AltTZ = function(utcOffset){
	return new Date(Date.now() - (Date.LocalOffset * 60000) + (utcOffset * 60000));
};

/**
 * Returns the hour in 12-hour time
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Hour", function(){
	if(this.getHours() === 0) return 12;
	else if(this.getHours() >= 13) return this.getHours() - 12;
	return this.getHours();
});

/**
 * Returns the minutes this date object holds
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Minute", function(){
	return this.getMinutes();
});

/**
 * Returns the number of seconds this date object holds
 *
 * @returns {Number}
 */
Date.prototype.__defineGetter__("Second", function(){
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
});

/**
 * Checks whether a given date is the same date (date, month, year) as the current date
 *
 * @returns {Bool} True if yes, otherwise false
 */
Date.prototype.IsSameDay = function(d){
	return this.getDate() == d.getDate() && this.getMonth() == d.getMonth() && this.getFullYear() == d.getFullYear();
};

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

};





/**
 * Debug
 */

/**
 * Container for debugging tools
 *
 * @type {Object}
 */
var Debug = {};

/**
 * Flag for enabling debugging
 *
 * @type {Boolean}
 */
Debug.Enabled = true;

/**
 * Asserts a given condition is true
 *
 * @param {Boolean} result Condition to evaluate
 * @param {String} msg Message to show in the exception thrown if the assertion fails
 */
Debug.Assert = function(result, msg){
	if(Debug.Enabled && result === false){
		throw new Error("Assertion failed: " + msg);
	}
};



/**
 * Function
 */

/**
 * Checks that a function exists
 *
 * @param {Function} f the function to check exists
 * @returns {Bool} True if exists, otherwise false
 */
Function.Exists = function(f){
	return f !== undefined && typeof(f) === "function";
};



/**
 * Number
 */

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
});

/**
 * Determines if the number if even
 *
 * @returns {Boolean} True if even, otherwise false
 */
Number.prototype.__defineGetter__("Even", function(){
	return this % 2 === 0;
});

/**
 * Determines if the number is odd
 *
 * @returns {Boolean} True if odd, otherwise false
 */
Number.prototype.__defineGetter__("Odd", function(){
	return this % 2 === 1;
});

/**
 * Returns the RGB values for the number
 *
 * @returns {Object} Object containing R, G, and B properties
 */
Number.prototype.ToRGB = function(){

	Debug.Assert(n % 1 === 0, "Number.prototype.ToRGB, n not an integer");
	
	return{
		get R(){return (this&0xff0000)>>16;},
		get G(){return (this&0x00ff00)>>8;},
		get B(){return (this&0x0000ff);}
	};

};



/**
 * JSON
 */

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
};

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
};



/**
 * String
 */

/**
 * Empty string
 *
 * @type {String}
 */
String.Empty = "";

/**
 * HTML encodes a given string
 *
 * @param {String} s String to encode
 * @returns {String} Encoded string
 */
String.HTMLEncode = function(s){
	return s.toString().replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
};

/**
 * HTML decodes a given string
 * Only handles a limited set of mappings
 * 
 * @param {String} s String to decode
 * @returns {String} Decoded string
 */
String.HTMLDecode = function(s){
	return s.toString().replace(/&#39;/g,"'").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,"\"").replace(/&amp;/g,"&");
};

/**
 * Checks whether a string is null or empty
 *
 * @param {String} s The string to check
 * @returns {Bool} True if null or empty, otherwise false
 */
String.IsNullOrEmpty = function(s){
	return s === null || s.length === 0;
};

/**
 * Checks whether a string is null or contains only whitespace
 *
 * @param {String} s The string to check
 * @returns {Bool} True if null or whitespace, otherwise false
 */
String.IsNullOrWhitespace = function(s){
	return s === null || /^\s*$/g.test(s);
};

/**
 * Checks if a substring (s) exists within the current string
 *
 * @param {String} s Substring to look for
 * @returns {Bool} True if exists, otherwise false
 */
String.prototype.Contains = function(s){
	return this.indexOf(s) !== -1;
};

/**
 * Returns the length of the string
 *
 * @returns {Number}
 */
String.prototype.__defineGetter__("Length", function(){
	return this.length;
});

/**
 * Pads the left side of the current string until length (l) with padding (p)
 *
 * @param {Number} l Length to pad to
 * @param {String} p Padding to use
 * @returns {String} Newly padded string
 */
String.prototype.PadLeft = function(l, p){
	var s=this;
	while(s.length<l)s=p+s;
	return s;
};

/**
 * Pads the right side of the current string until length (l) with padding (p)
 *
 * @param {Number} l Length to pad to
 * @param {String} p Padding to use
 * @returns {String} Newly padded string
 */
String.prototype.PadRight = function(l, p){
	var s=this;
	while(s.length<l)s+=p;
	return s;
};

/**
 * Removes whitespace from both sides of a string
 *
 * @returns {String}
 */
String.prototype.Trim = function(){
	return this.TrimLeft().TrimRight();
};

/**
 * Removes whitespace from the left side of a string
 *
 * @returns {String}
 */
String.prototype.TrimLeft = function(){
	return this.replace(/^\s+/,"");		
};

/**
 * Removes whitespace from the right side of a string
 *
 * @returns {String}
 */
String.prototype.TrimRight = function(){
	return this.replace(/\s+$/,"");
};

/**
 * Determines if the string ends with parameter s
 *
 * @param {String} s
 * @returns {Boolean} True if exists, otherwise false
 */
String.prototype.EndsWith = function(s){
	return this.indexOf(s, this.length - s.length) !== -1;
};

/**
 * Determines if the string starts with parameter s
 *
 * @param {String} s
 * @returns {Boolean} True if exists, otherwise false
 */
String.prototype.StartsWith = function(s){
	return this.lastIndexOf(s, 0) === 0;
};

/**
 * Removes all values of s in the string
 *
 * @param {String} s String to be removed
 * @returns {String}
 */
String.prototype.Remove = function(s){
	return this.replace(s, "");
};

/**
 * Generates an array of unicode values for each character in the string
 *
 * @returns {Array} Array of integers
 */
String.prototype.ToUnicodeArray = function(){
	var arr = [];
	for(var i=0,l=this.length;i<l;++i){
		arr.push(this.charCodeAt(i));
	}
	return arr;
};

/**
 * Parses the string and returns an integer
 *
 * @returns {Number} Parsed number
 */
String.prototype.ToInt = function(){
	return parseInt(this,10);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


location.Query = (function(){
	
	var o = {};
	var qs = location.search.substring(1);
	var r = /([^&=]+)=([^&]*)/g;
	var m;
	
	while((m = r.exec(qs))){
		o[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	
	return Object.freeze(o);
	
})();


var Bnet = {
	
	Config:{
		BaseUrl: location.protocol + "//" + location.host + "/NewHawtness/"
	},
	
	Compatibility:{
	
		ReparseCss: function(s){
			return s.replace(
				/(?:url\()(.+)(?:\))/gi,
				function(m, p1){
					return "url('http://halo.bungie.net" + p1.replace(/'/g, "") + "')";
				}
			);
		}
		
	},
	
	Formatting: {
		
		BBCodes: {
			quoteRegex: /\[quote\]([\s\S]+?)\[\/quote\]/gi,
			boldRegex: /\[b\]([\s\S]+?)\[\/b\]/gi,
			underlineRegex: /\[u\]([\s\S]+?)\[\/u\]/gi,
			italicsRegex: /\[i\]([\s\S]+?)\[\/i\]/gi,
			spoilerRegex: /\[spoiler\]([\s\S]+?)\[\/spoiler\]/gi,
			urlRegex: /\[url\](\/[^\s'"<>\[]*?)\[\/url\]/gi,
			namedUrlRegex: /\[url\=(\/[^\s'"<>\[]*?)\]([\s\S]+?)\[\/url\]/gi,
			externalUrlRegex: /\[url\](https?:\/\/[^\s'"<>\[]+?)\[\/url\]/gi,
			externalNamedUrlRegex: /\[url\=(https?:\/\/[^\s'"<>\[]+?)\]([\s\S]+?)\[\/url\]/gi,
			googleUrlRegex: /\[google\]([\s\S]+?)\[\/google]/gi,
			newlineRegex: /\r?\n/gi
		},
		
		TextToBBCode: function(s){
		
			//Stolen!: http://www.bungie.net/Scripts/base/bnet.base.min.js
			s = s.replace(Bnet.Formatting.BBCodes.newlineRegex, "<br/>");
			s = s.replace(/\[quote\]/gi, "<span class='IBBquotedtable'>");
			s = s.replace(/\[\/quote\]/gi, "</span>");
			s = s.replace(Bnet.Formatting.BBCodes.boldRegex, "<b>$1</b>");
			s = s.replace(Bnet.Formatting.BBCodes.underlineRegex, "<u>$1</u>");
			s = s.replace(Bnet.Formatting.BBCodes.italicsRegex, "<i>$1</i>");
			s = s.replace(Bnet.Formatting.BBCodes.spoilerRegex, '<div class="spoiler">$1</div>');
			s = s.replace(Bnet.Formatting.BBCodes.spoilerRegex, "$1");
			//if (c) s = bungieNetPlatform.tagHelper.injectSpans(s); //?
			s = s.replace(Bnet.Formatting.BBCodes.urlRegex, '<a href="/$1">$1</a>');
			s = s.replace(Bnet.Formatting.BBCodes.namedUrlRegex, '<a href="/$1">$2</a>');
			s = s.replace(Bnet.Formatting.BBCodes.externalUrlRegex, '<a href="$1" rel="nofollow" class="externalLink">$1</a>');
			s = s.replace(Bnet.Formatting.BBCodes.externalNamedUrlRegex, '<a href="$1" rel="nofollow" class="externalLink">$2</a>');
			s = s.replace(Bnet.Formatting.BBCodes.googleUrlRegex, '<a href="http://www.google.com/#q=$1" rel="noreferrer" rel="nofollow" class="externalLink">$1</a>');
			
			return s;
			
		},
		
		FriendlyUrl: function(s){
			return String.HTMLDecode(s).replace(/[^a-z0-9 ]/gi, "").replace(/ /gi,"-");
		}
		
	},
	
	Forums:{
		Destiny: "destiny",
		Bungie: "bungie",
		Community: "community",
		Gaming: "gaming",
		Support: "support",
		OffTopic: "offtopic",
		AllTopics: ""
	},
	
	Dom:{
		//Hooks into the page
	
		ContentContainer: null, //id:sContent
		RelatedTagsTable: null
	},

	Pagination: {
		ToJquery: function(currentPage, lastPage, urlCallback){
			
			currentPage = parseInt(currentPage, 10);
			lastPage = parseInt(lastPage, 10);

			return $("<div>").attr("class", "pagination_container").append(
			
				$("<div>").attr("class", "first_previous_arrows").append(
					$("<a>")
					.attr({"class":"prevendimg", href: urlCallback(1)})
					.css({"float":"left", height:"20px"})
					.append(
						$("<img>").attr("src", "http://halo.bungie.net/images/spacer.gif")
					),
					$("<a>")
					.attr({"class":"previmg", href:urlCallback(currentPage != 1 ? currentPage - 1 : 1)})
					.css({"float":"left", height:"20px", margin:"0 0 0 3px"})
					.append(
						$("<img>").attr("src", "http://halo.bungie.net/images/spacer.gif")
					)
				),
				
				$("<div>").attr("class", "last_next_arrows").append(
					$("<a>")
					.attr({"class":"nextendimg", href:urlCallback(currentPage != lastPage ? currentPage + 1 : lastPage)})
					.css({"float":"right", height:"20px"})
					.append(
						$("<img>").attr("src", "http://halo.bungie.net/images/spacer.gif")
					),
					$("<a>")
					.attr({"class":"nextimg", href:urlCallback(lastPage)})
					.css({"float":"right", height:"20px",  margin:"0 3px 0 0"})
					.append(
						$("<img>").attr("src", "http://halo.bungie.net/images/spacer.gif")
					)
				),
				
				$("<div>").attr({"class":"list-j", align:"center"}).append(
					$("<ul>").attr("class", "pagination").append(
						$("<li>").attr("class", "chunk").text("Pages:"),
						(function(){

							var elems = [];
							
							for(var offset=-4; offset<0; ++offset){
								if(currentPage + offset <= 0) continue;
								elems.push($("<li>").append(
									$("<a>").attr({"class":"page", "href":urlCallback(currentPage + offset)}).text(currentPage + offset)
								));
							}
							
							elems.push($("<li>").attr("class", "selected").text(currentPage));
							
							for(var offset=1; offset<4; ++offset){
								if(currentPage + offset > lastPage) continue;
								elems.push($("<li>").append(
									$("<a>").attr({"class":"page", href:urlCallback(currentPage + offset)}).text(currentPage + offset)
								));
							}
							
							elems.push(
								$("<li>").attr("class", "chunk").text("..."),
								$("<li>").attr("class", "chunk").text("of " + lastPage)
							);
						
							return elems;
						
						})()
					)
				)
			
			);
	
		}
	},
	
	Init: function(){
		
		//MUST stop the page (the page's javascript) from redirecting to 404
		window.stop();
		document.title = "New Hawtness is loading...";
		document.body = document.createElement("body");

		GM_addStyle(Bnet.Compatibility.ReparseCss(GM_getResourceText("CSS_BASE")));
		GM_addStyle(Bnet.Compatibility.ReparseCss(GM_getResourceText("CSS_IMAGES")));
		GM_addStyle(Bnet.Compatibility.ReparseCss(GM_getResourceText("CSS_CONTENT")));
		GM_addStyle(Bnet.Compatibility.ReparseCss(GM_getResourceText("CSS_BASE_FORUM")));

		//Create the page
		$(document.body).parent().css("backgroundColor", "black");
		$(document.body).css({backgroundColor:"black", "height":"2011px"}).append(
			$("<div>").append(
				$("<div>").attr("class", "main").append(
					$("<div>").attr("class", "sContent-head").append(
						$("<div>").attr("class", "navWrapper").append(
							$("<div>").attr("class", "nav").append(
								$("<div>").attr("class", "pagetop").append(
									$("<div>").attr("class", "search"),
									$("<p>").append(
										$("<em>").text("Bungie Network: "),
										$("<a>").attr("href", "javascript:void(0);").text("bungie.net"),
										" | ",
										$("<a>").attr("href", "javascript:void(0);").text("bungiestore.com"),
										" | ",
										$("<a>").attr("href", "javascript:void(0);").text("careers!")
									),
									$("<div>").attr("class", "clear"),
									$("<a>").attr({class:"top_logo_bungie", href:"javascript:void(0);"}),
									$("<ul>").attr("class", "utilityNav").append(
										$("<li>").attr("class", "signedOut").text("Sign-in offline")
									),
									$("<ul>").attr("class", "mainNav").append(
										$("<li>").append(
											$("<a>").attr({class:"Projects",href:"javascript:void(0);"}).append(
												$("<span>"),
												$("<em>").text("Projects")
											)
										),
										$("<li>").append(
											$("<a>").attr({class:"Stats",href:"javascript:void(0);"}).append(
												$("<span>"),
												$("<em>").text("Stats")
											)
										),							
										$("<li>").append(
											$("<a>").attr({"class":"Community",href:"javascript:void(0);"}).append(
												$("<span>"),
												$("<em>").text("Community")
											),
											$("<ul>").attr({"class":"flyOut",style:""}).append(
												(function(){
													
													var arr = [];
													
													for(var name in Bnet.Forums){
														arr.push(
															$("<li>").append(
																$("<h4>").append(
																	$("<a>").text(name).attr({
																		"class":"nav-icons community",
																		href:Bnet.Config.BaseUrl + "forum/" + Bnet.Forums[name] + (Bnet.Forums[name] ? "/" : "") + "1"
																	})
																)
															)
														)
													}
													
													return arr;
													
												})
											)
										),
										$("<li>").append(
											$("<a>").attr({class:"About Us",href:"javascript:void(0);"}).append(
												$("<span>"),
												$("<em>").text("About Us")
											)
										),	
										$("<li>").append(
											$("<a>").attr({class:"Account",href:"javascript:void(0);"}).append(
												$("<span>"),
												$("<em>").text("Account")
											)
										),	
										$("<li>").append(
											$("<div>").attr("class", "imgAvatar").append(
												$("<img>").attr({
													width:"51px",
													height:"51px",
													border:"0px",
													src:"http://halo.bungie.net/images/base_struct_images/top_nav/icon_avatar_placeholder.gif"
												})
											)
										)
									)
								)
							)
						)
					),
					$("<div>").attr("class", "bgRepeat").append((function(){
						Bnet.Dom.ContentContainer = $("<div>").attr("class", "sContent");
						return Bnet.Dom.ContentContainer;
					}))
				)
			)
		);
		
	},
	
	Server: function(){
		
		//Tags		->		/tags
		//forum		->		/forum/[tags]/[page]
		//Topic		->		/forum/topic/[id]/[page][/title]?
		//Profile	->		/account/[id][/username]

		if(/\/forum\/?[a-z,]*\/\d+$/i.test(location.pathname)){
			Bnet.PageHandlers.Forum();
		}
		else if(/\/forum\/topic\/\d+\/\d+(\/[a-z0-9_-]*)?$/i.test(location.pathname)){
			Bnet.PageHandlers.Topic();
		}
		else if(/\/account\/\d+(\/[a-z0-9_-]*)?$/i.test(location.pathname)){
			Bnet.PageHandlers.Account();
		}
		else{
			Bnet.PageHandlers.Error();
		}

	},
	
	PageHandlers: {
		
		Forum: function(){
		
			function Callback(data, txt, xhr){
				
				var obj = JSON.parse(data);
				var topics = [];
				var relatedTags = [];
				
				if(!obj || obj.ErrorCode !== 1){
					Bnet.PageHandlers.Error(obj.ErrorStatus + "(" + obj.ErrorCode + ")" + ": " + obj.Message);
					return;
				}

				obj.Response.results.forEach(function(t){
					relatedTags = relatedTags.concat(t.tags);
					topics.push(new Bnet.ForumTopicEntry(
						t,
						obj.Response.authors.filter(function(a){ return t.authorMembershipId == a.membershipId; })[0],
						obj.Response.authors.filter(function(a){ return t.latestReplyAuthorId == a.membershipId; })[0]
					));
				});
				
				topics.forEach(function(t, i){
					topicElem.append(t.ToJquery({tags:params.Tags}).attr("class", i.Even ? "even" : "odd"));
				});
				
				Array.Distinct(relatedTags)
					.map(function(t){ return t.toLowerCase().Remove("#"); })
					.filter(function(t){ return !params.Tags.Normalised.Contains(t); })
					.sort(function(a, b){ return a < b ? -1 : a === b ? 0 : 1; })
					.forEach(function(t, i){
						relatedTagsTable.append(
							$("<tr>").attr("class", i.Even ? "even" : "odd").append(
								$("<td>").append(
									$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").append(
										$("<a>").css({color:"#9d9d9d", fontSize:"0.9em"})
										.attr("href", Bnet.Config.BaseUrl + "forum/" + params.Tags.Normalised.concat([t]).slice(-4) + "/1")
										.text("#" + t)
									)
								)
							)
						);
					});
				
			}
			
			function UrlFormatter(page){
				
				var s = Bnet.Config.BaseUrl + "forum/";
				
				if(params.Tags.Normalised.length === 0){
					s += page;
				}
				else{
					s += params.Tags.Normalised.join(",") + "/" + page;
				}
				
				return s;
				
			}
			
			var params = (function(){

				var m = location.pathname.match(/\/forum\/?([a-z,]*)\/(\d+)$/i);
				var tags = m[1].split(/\s*,\s*/).filter(function(t){ return t.length > 0; }).map(function(t){ return decodeURIComponent(t); });
				
				return {
					Tags: {
						TagString: m[1],
						AllTags: tags.length > 0 ? tags : [],
						Normalised: tags.length > 0 ? Array.Distinct(tags.map(function(t){ return t.toLowerCase().Remove("#"); })) : []
					},
					Page: m[2].ToInt()
				};
			
			})();

			var relatedTagsTable = $("<table>").attr("class", "pinned_topic_grid");
			var topicElem = $("<table>").attr("class", "grid").css("margin", "0px");
			
			document.title = "Bungie.net: " + (params.Tags.Normalised.length > 0
				? params.Tags.Normalised.map(function(t){ return "#" + t; }).join(", ")
				: "All Topics");
			
			$(Bnet.Dom.ContentContainer).append(
				$("<div>").attr("class", "forum_cols").append(
					$("<div>").attr("class", "block-a").css({width: "902px", overflow: "hidden", marginBottom: "0px"}).append(
						$("<h2>").append(
							(function(){
							
								if(params.Tags.Normalised.length === 0){
									return "All Topics";
								}
								else{
									return params.Tags.Normalised.map(function(t, i, arr){									
										return $("<a>").css({color: "#fefefe", fontSize: "inherit"}).text("#" + t)
										.attr("href", Bnet.Config.BaseUrl + "forum/" + arr.slice(0, i + 1).slice(-4) + "/1")[0].outerHTML;
									}).join(" &gt; ");
								}
							
							})
						)
					),
					$("<div>").attr("class", "col forum_main_col").append(
						$("<div>").attr("class", "block-a").append(
							$("<span>").append(Bnet.Pagination.ToJquery(params.Page, params.Page + 1, UrlFormatter)),
							topicElem,
							$("<span>").append(Bnet.Pagination.ToJquery(params.Page, params.Page + 1, UrlFormatter))
						)
					),
					$("<div>").attr("class", "colLast forum_sidebar_col").append(
						$("<div>").attr("class", "boxB").css({width: "276px", marginLeft: "5px"}).append(
							$("<ul>").append(
								$("<li>").append(
									$("<h3>").css("paddingTop", "7px").text("Related Tags")
								)
							),
							relatedTagsTable
						)
					)
				)
			);

			if(Number.isNaN(params.Page) || params.Page <= 0){
				Bnet.PageHandlers.Error();
				return;
			}
			
			$.ajax({
				url: "http://www.bungie.net/Platform/Forum/GetTopicsPaged/" + (params.Page - 1) + "/25/0/1/1/0/?tagstring=" + encodeURIComponent(params.Tags.Normalised.join(",")),
				timeout: 5000,
				dataType: "text",
				success: Callback,
				error: function(xhr, txt, err){
					DoError("XHR Error: " + txt);
				}
			});
		
		},
		
		Topic: function(){
		
			function UrlFormatter(page){
				return Bnet.Config.BaseUrl + "forum/topic/" + params.PostId + "/" + page + "/" + Bnet.Formatting.FriendlyUrl(this.Subject);
			}
		
			function Callback(data, txt, xhr){
				
				var obj = JSON.parse(data);
				var posts = [];
					
				if(!obj || obj.ErrorCode !== 1){
					Bnet.PageHandlers.Error(obj.ErrorStatus + "(" + obj.ErrorCode + ")" + ": " + obj.Message);
					return;
				}
				
				obj.Response.results.forEach(function(p){
					posts.push(new Bnet.Post(
						p,
						obj.Response.authors.filter(function(a){ return p.authorMembershipId == a.membershipId; })[0],
						params.PostId == p.postId,
						[]
						//It would be good to include the editor author object here too for timestamps
					));
				});
				
				paginationTop.append(Bnet.Pagination.ToJquery(params.Page, obj.Response.availablePages, UrlFormatter.bind(posts[0])));
				paginationBottom.append(Bnet.Pagination.ToJquery(params.Page, obj.Response.availablePages, UrlFormatter.bind(posts[0])));
				
				posts.slice(params.Page === 1 ? 0 : 1).forEach(function(p, i){
					postsContainer.append(
						p.ToJquery().attr("class", i.Even ? "even" : "odd")
					);
				});
				
				//Topic tags (those attatched to the OP's post)
				posts[0].Tags
					.map(function(t){ return t.toLowerCase().Remove("#"); })
					.forEach(function(t, i){
						topicTagsTable.append(
							$("<tr>").attr("class", i.Even ? "even" : "odd").append(
								$("<td>").append(
									$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").append(
										$("<a>").css({color:"#9d9d9d", fontSize:"0.9em"})
										.attr("href", Bnet.Config.BaseUrl + "forum/" + t + "/1")
										.text("#" + t)
									)
								)
							)
						)
					});
					
				//Details
				detailsTable.append(
					$("<tr>").append($("<td>").append(
						$("<div>").text("Created by: ").attr("class", "list-h").css("padding", "2px 0 -2px 4px").append(
							$("<a>").attr("href", Bnet.Config.BaseUrl + "account/" + posts[0].Author.MId + "/" + Bnet.Formatting.FriendlyUrl(posts[0].Author.DisplayName)).text(
								posts[0].Author.DisplayName
							)
						)
					)),
					$("<tr>").append($("<td>").append(
						$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").text(
							"Posted: " + posts[0].Created.ToRelativeTimestamp()
						)
					)),
					$("<tr>").append($("<td>").append(
						$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").text(
							"Edited: " + (posts[0].LastEdited.getTime() == posts[0].Created.getTime() ? "never" : posts[0].LastEdited.ToRelativeTimestamp()) +
							" (" + posts[0].EditCount + " time" + (posts[0].EditCount != 1 ? "s" : "") + ")"
						)
					)),
					$("<tr>").append($("<td>").append(
						$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").text(
							"Locked: " + (posts[0].Locked ? "Yes" : "No")
						)
					)),
					$("<tr>").append($("<td>").append(
						$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").text(
							"Rating: " + posts[0].Rating + "% (" + posts[0].VoteCount + " vote" + (posts[0].VoteCount != 1 ? "s" : "") + ")"
						)
					)),
					$("<tr>").append($("<td>").append(
						$("<div>").attr("class", "list-h").css("padding", "2px 0 -2px 4px").text(
							"Replies: " + posts[0].ReplyCount
						)
					))
				);
				
				contentTitle.append(
					$("<a>").attr("href", Bnet.Config.BaseUrl + "forum/topic/" + params.PostId + "/" + params.Page + "/" + Bnet.Formatting.FriendlyUrl(posts[0].Subject))
					.css({fontSize:"inherit", color:"#fefefe"}).html(posts[0].Subject)
				);
				document.title = "Bungie.net: " + String.HTMLDecode(posts[0].Subject);
				
			}
			
			var params = (function(){
			
				var m = location.pathname.match(/\/forum\/topic\/(\d+)\/(\d+)/i);
				
				return {
					PostId: m[1].ToInt(),
					Page: m[2].ToInt()
				};
				
			})();
			
			var postsContainer = $("<div>");
			var contentTitle = $("<h2>");
			var paginationTop = $("<span>");
			var paginationBottom = $("<span>");
			var topicTagsTable = $("<table>").attr("class", "pinned_topic_grid");
			var detailsTable = $("<table>").attr("class", "pinned_topic_grid");
			
			//GetPostsThreadedPaged(postId, page, numberOfFirstLevelOnPage, numberOfInitialReplies, bool?, bool?)
			//GetPostsThreadedPaged(5285760, 0, 25, 25, true, true)		//Page 1 of topic
			//GetPostsThreadedPaged(5285760, 1, 25, 25, true, true)		//Page 2 of topic (from scrolling down)
			//use the replyCount (not the topicReplyCount!) for paging!

			$(Bnet.Dom.ContentContainer).append(
				$("<div>").attr("class", "forum_cols_posts").append(
					$("<div>").attr("class", "block-a").css({width:"902px", overflow:"hidden", marginBottom:"0px"}).append(
						contentTitle
					),
					$("<div>").attr("class", "col forum_main_col_posts").append(
						$("<div>").attr("class", "block-a").append(
							paginationTop,
							postsContainer,
							paginationBottom
						)
					),
					$("<div>").attr("class", "colLast forum_sidebar_col_posts").append(
						$("<div>").attr("class", "boxB").css({width: "218px", marginLeft: "5px"}).append(
							$("<ul>").append(
								$("<li>").append(
									$("<h3>").css("paddingTop", "7px").text("Details")
								)
							),
							detailsTable
						)
					),
					$("<div>").attr("class", "colLast forum_sidebar_col_posts").append(
						$("<div>").attr("class", "boxB").css({width: "218px", marginLeft: "5px"}).append(
							$("<ul>").append(
								$("<li>").append(
									$("<h3>").css("paddingTop", "7px").text("Topic Tags")
								)
							),
							topicTagsTable
						)
					)
				)
			);
				
			$.ajax({
																																				//oldest first
				url: "http://www.bungie.net/Platform/Forum/GetPostsThreadedPaged/" + params.PostId + "/" + (params.Page - 1) + "/25/25/true/true/1/",
				//url: "http://www.bungie.net/Platform/Forum/GetPostsThreadedPaged/" + params.PostId + "/" + (params.Page - 1) + "/25/25/true/true/",
				timeout: 5000,
				dataType: "text",
				success: Callback,
				error: function(xhr, txt, err){
					Bnet.PageHandlers.Error("XHR Error: " + txt + ", HTTP: " + xhr.status);
				}
			});
		
		},
		
		Account: function(){
		
		},
		
		Error: function(s){
			$(Bnet.Dom.ContentContainer).text(s ? s : "Please check the URL as is not valid for the New Hawtness script");
		}
		
	},
	
	//
	
	User: function(u){
		
		this._User = u;
		
		this.DisplayName = u.displayName;
		this.MId = u.membershipId.ToInt();
		this.Title = u.userTitleDisplay;
		this.Avatar = u.profilePicturePath;
		
	},
	
	ForumTopicEntry: function(t, author, lastAuthor){
		
		this._Topic = t;
		this._Author = author;
		this._LastAuthor = lastAuthor; //Nullable
		
		this.PostId = t.postId.ToInt();
		this.TopicReplyCount = t.topicReplyCount; //Total replies to thread and subthreads
		this.ReplyCount = t.replyCount; //Total replies to single thread
		this.Subject = t.subject;
		this.Created = new Date(t.creationDate);
		this.LastReply = t.lastReplyDate ? new Date(t.lastReplyDate) : null;
		this.Tags = t.tags.map(function(tag){ return tag.toLowerCase().Remove("#"); });
		this.Flags = t.flags;
		
		this.Author = new Bnet.User(author);
		this.LastAuthor = lastAuthor ? new Bnet.User(lastAuthor) : null;
		
	},
	
	Post: function(p, a, op, replyPosts){
	
		this._Post = p;
		this._Author = a;
		
		this.IsOp = op;
		this.ReplyPosts = replyPosts ? replyPosts : [];
		this.PostId = p.postId.ToInt();
		this.Media = p.urlLinkOrImage;
		this.Author = new Bnet.User(a);
		this.Body = p.body;
		this.Subject = p.subject;
		this.Created = new Date(p.creationDate);
		this.Edited = p.lastModified ? new Date(p.lastModified) : null;
		this.Tags = p.tags;
		this.Locked = p.lockedForReplies;
		this.Rating = p.rating;
		this.EditCount = p.editCount;
		this.LastEdited = p.lastModified ? new Date(p.lastModified) : null;
		this.VoteCount = p.ratingCount;
		this.ReplyCount = p.replyCount;
	
	}
	
};


Object.defineProperties(Bnet.ForumTopicEntry.prototype, {

	Icon: {
		get: function(){
		
			/*
			//Response also has a flags property which I think is used for the icon
			//Globals.ForumFlagsEnum = {
				//None: 0,
				//BungieStaffPost: 1,
				//ForumNinjaPost: 2
			//};
			*/
			
			var thirtyMinsAgo = new Date();
			thirtyMinsAgo.setMinutes(-30);
			var examine = this.LastReply ? this.LastReply : this.Created;
			
			if(this.Flags == 1) return "IBBBungieStaffIcon";
			else if(examine >= thirtyMinsAgo){
				if(this.TopicReplyCount > 50) return "IBBActiveTopicIcon";
				return "IBBNewTopicsIcon";
			}
			else{
				return "IBBNoNewTopicsIcon";
			}
			
		}
	},
	
	LastPage: {
		get: function(){
			return Math.floor(this.ReplyCount / 25) + 1;
		}
	},
	
	ToJquery: {
		value: function(args){
		
			var self = this;

			return $("<tr>").append(
				$("<td>").css("width", "32px").append(
					$("<div>").attr("class", "list-h").append(
						$("<a>").attr("href", Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/1/" + Bnet.Formatting.FriendlyUrl(self.Subject)).append(
							$("<img>").attr({
								class: self.Icon,
								width: "26px",
								height: "26px",
								alt: self.Icon,
								src: "http://halo.bungie.net/images/spacer.gif"
							})
						)
					)
				)
			).append(
				$("<td>").append(
					$("<div>").attr("class", "list-h").append(
						$("<h5>").append(
							$("<a>").html(self.Subject).attr("href", Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/1/" + Bnet.Formatting.FriendlyUrl(self.Subject))
						)
						.append(" | ")
						.append(
							$("<span>").text(self.TopicReplyCount + " repl" + (self.TopicReplyCount !== 1 ? "ies" : "y"))
						)
					).append(
						$("<p>").append(
							"by "
						).append(
							$("<a>")
							.attr("href", Bnet.Config.BaseUrl + "account/" + self.Author.MId + "/" + Bnet.Formatting.FriendlyUrl(self.Author.DisplayName))
							.text(self.Author.DisplayName)
						).append(
							" on " + (self.Created.getMonth() + 1).toString().PadLeft(2, "0") +
							"." + self.Created.Date.toString().PadLeft(2, "0") +
							"." + self.Created.Year
						).append((function(){
							
							if(self.ReplyCount <= 0 || self.LastAuthor === null){
								return "";
							}
						
							$(this).append(
								" | last reply by "
							)
							
							.append(
								$("<a>")
								.attr("href", Bnet.Config.BaseUrl + "account/" + self.LastAuthor.MId + "/" + Bnet.Formatting.FriendlyUrl(self.LastAuthor.DisplayName))
								.text(self.LastAuthor.DisplayName)
							).append(
								" on "
							)
							
							.append(
								$("<a>")
								.attr("href", Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/" + self.LastPage + "/" + Bnet.Formatting.FriendlyUrl(self.Subject))
								.text(
									(self.LastReply.getMonth() + 1).toString().PadLeft(2, "0") +
									"." + self.LastReply.Date.toString().PadLeft(2, "0") + 
									"." + self.LastReply.Year +
									" " + self.LastReply.Hour + ":" + self.LastReply.Minute.toString().PadLeft(2, "0") +
									" " + self.LastReply.Meridiem
								)
							);
							
							$(this).append((function(){
			
								if(self.ReplyCount < 25){
									return "";
								}
								
								//If topic has more than 25 posts, it has 2 pages, so always include these two
								$(this).append(
									" [Pages: "
								).append(
									$("<a>").text("1").attr({
										className:"IBBnavLink",
										href: Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/1/" + Bnet.Formatting.FriendlyUrl(self.Subject)
									})
								).append(" ").append(
									$("<a>").text("2").attr({
										className:"IBBnavLink",
										href: Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/2/" + Bnet.Formatting.FriendlyUrl(self.Subject)
									})
								);

								//If more than 4 pages, include the separator
								if(self.LastPage > 4){
									$(this).append(" ..");
								}
								
								if(self.ReplyCount >= 50){
									
									$(this).append(" ").append(
										$("<a>").text(self.LastPage !== 3 ? self.LastPage - 1 : 3).attr({
											className:"IBBnavLink",
											href: Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/" + (self.LastPage !== 3 ? self.LastPage - 1 : 3) + "/" + Bnet.Formatting.FriendlyUrl(self.Subject)
										})
									);
									
								}
							
								if(self.ReplyCount >= 75){
									$(this).append(
										" "
									).append(
										$("<a>").text(self.LastPage).attr({
											className:"IBBnavLink",
											href: Bnet.Config.BaseUrl + "forum/topic/" + self.PostId + "/" + self.LastPage + "/" + Bnet.Formatting.FriendlyUrl(self.Subject)
										})
									);
								}
							
								$(this).append("]");

							}));

						}))
							
					).append(

						$("<div>")
						.css({fontSize:"0.88em", margin:"2px 0 -2px 0", paddingLeft:"11px"})
						.append(
							
							self.Tags
								.map(function(t){ return t.toLowerCase().Remove("#"); })
								.filter(function(t){ return !args.tags.Normalised.Contains(t); })
								.map(function(t){
									return $("<a>")
										.attr("href", Bnet.Config.BaseUrl + "forum/" + encodeURIComponent(t) + "/1")
										.css({fontSize: "1em", color: "#9d9d9d"})
										.text("#" + t)
										[0].outerHTML;
								})
								.join(", ")
								
						)	
					)
				)
			);
		
		}
	}

});

Object.defineProperties(Bnet.Post.prototype, {
	
	HasImage:{
		get: function(){ return /^https?:\/\/[\s\S]+?\.(jpe?g|gif|bmp|png|tif|)$/i.test(this.Media); }
	},
	
	HasYouTubeVideo:{
		get: function(){ return /^https?:\/\/(www\.youtube\.com|youtu\.be)\/((watch\?v=)?[a-z0-9_-]+)$/i.test(this.Media); }
	},
	
	HasUrl:{
		get: function(){ return /^https?:\/\/[\s\S]+$/i.test(this.Media); }
	},
	
	GetYouTubeVideoId:{
		value: function(){
			var m = this.Media.match(/^https?:\/\/(?:www\.youtube\.com|youtu\.be)\/(?:(?:watch\?v=)?([a-z0-9_-]+))$/i);
			return m ? m[1] : null;
		}
	},
	
	ToJquery: {
		value: function(){
		
			function ReplyLoader(e){
			
				function Callback(data, txt, xhr){
				
					var obj = JSON.parse(data);
					var posts = [];

					if(!obj || obj.ErrorCode !== 1){
						Bnet.PageHandlers.Error(obj.ErrorStatus + "(" + obj.ErrorCode + ")" + ": " + obj.Message);
						return;
					}
					
					obj.Response.results.filter(function(p){ return p.actualParentPostId == e.data.PostId; }).forEach(function(p){
						posts.push(new Bnet.Post(
							p,
							obj.Response.authors.filter(function(a){ return p.authorMembershipId == a.membershipId; })[0],
							e.data.PostId == p.postId,
							[]
							//It would be good to include the editor author object here too for timestamps
						));
					});
					
					posts/*.slice(1)*/.forEach(function(p){
						p.Body = "[quote][b]Posted by:[/b] " + e.data.Author.DisplayName + "\n" + e.data.Body + "[/quote]\n" + p.Body;
						elem.parent().append(p.ToJquery().css("opacity", 0).fadeTo(200, 1));
					});
					
					elem.remove();
					
				}
			
				//alert(e.data.PostId);
				var elem = $(this);
				$(this).css("color", "grey").text("loading posts...").unbind("click");
				
				//This will need a fix to support multiple pages of responses
				$.ajax({
					url: "http://www.bungie.net/Platform/Forum/GetPostsThreadedPaged/" + e.data.PostId + "/0/25/25/true/false/1/",
					timeout: 5000,
					dataType: "text",
					success: Callback,
					error: function(xhr, txt, err){
						Bnet.PageHandlers.Error("XHR Error: " + txt + ", HTTP: " + xhr.status);
						return;
					}
				});
				
			}
		
			var self = this;
		
			return $("<div>").attr("class", "forum_item").append(
				$("<div>").attr("class", "forum_item_outer_shell").append(
					$("<div>").append(
						$("<span>").append(
							$("<a>").attr("name", self.PostId),
							$("<div>").attr("class", "forumpost").append(
								$("<div>").attr("class", "clear"),
								$("<div>").attr("class", "forumavatar").append(
									$("<a>").attr("href", Bnet.Config.BaseUrl + "account/" + self.Author.MId + "/" + Bnet.Formatting.FriendlyUrl(self.Author.DisplayName)).append(
										$("<img>").css({height:"90px", width:"90px", borderWidth:"0px"}).attr("src", self.Author.Avatar)
									)
								),
								$("<div>").attr("class", "postbody").append(
									$("<ul>").attr("class", "author_header_block").css("backgroundColor", "#103349").append(
										$("<li>").attr("class", "login").append(
											$("<a>")
												.attr("href", Bnet.Config.BaseUrl + "account/" + self.Author.MId + "/" + Bnet.Formatting.FriendlyUrl(self.Author.DisplayName))
												.text(self.Author.DisplayName)
										),
										$("<li>")
											.attr("class", "title")
											.css("marginLeft", "3px")
											.text(" | " + self.Author.Title),
										$("<li>").attr("class", "author_header_links").append(
											$("<a>").attr("class", "expanded_arrows_collapsed").attr("href", "javascript:void(0);").append(
												$("<img>").attr({width:"21px", height:"20px", src:"http://halo.bungie.net/images/spacer.gif"})
											)
										),
										$("<li>").attr("class", "author_header_links").text(" | more "),
										$("<li>").attr("class", "author_header_links").append(
											$("<a>").attr("href", "#").text("groups")
										),
										$("<li>").attr("class", "author_header_links").text("|")
									),
									$("<div>").attr("class", "floatingprofile").text("Sorry, this does not exist"),
									$("<p>").html((function(){
										
										var str = "";
			
										if(self.HasYouTubeVideo){
											str = $("<iframe>").attr({
												width: "100%",
												height: "280px",
												src: "http://www.youtube.com/embed/" + self.GetYouTubeVideoId() + "?rel=0",
												frameborder: "0"
											})[0].outerHTML;
											str += "<br><br>";
										}
										else if(self.HasImage){
											str = $("<a>").attr({href:self.Media, target:"_blank"}).append(
												$("<img>")
													.attr("src", self.Media)
													.css({maxWidth:"75%", maxHeight:"200px"})
											)[0].outerHTML;
											str += "<br><br>";
										}
										else if(self.HasUrl){
											str = $("<a>").attr("href", self.Media)[0].outerHTML;
											str += "<br><br>";
										}
										
										str += Bnet.Formatting.TextToBBCode(self.Body);
										
										if(self.Edited != self.Created){
											str += "<br><br>[Edited on " +
											(self.Edited.getMonth() + 1).toString().PadLeft(2, "0") +
											"." + self.Edited.Date.toString().PadLeft(2, "0") +
											"." + self.Edited.Year + " " +
											self.Edited.Hour + ":" +
											self.Edited.Minute.toString().PadLeft(2, "0") +
											" " + self.Edited.Meridiem +
											" " + Date.LocalTimezoneAbbreviation + "]"
										}
									
										return str;
							
									}))
								),
								$("<div>").attr("class", "post-actions").append(
									$("<ul>").append(
										$("<li>").attr("class", "date").html((function(){
										
											var str = (self.Created.getMonth() + 1).toString().PadLeft(2, "0") +
												"." + self.Created.Date.toString().PadLeft(2, "0") +
												"." + self.Created.Year +
												" " +
												self.Created.Hour + ":" + self.Created.Minute.toString().PadLeft(2, "0") +
												" " + self.Created.Meridiem + " " + Date.LocalTimezoneAbbreviation;
													
											return str;
											
										})),
										$("<li>").append(
											$("<a>").attr({class:"forum_post_reply_button", href:"#"})
										)
									)
								),
								
								//Child post container
								$("<div>").css({clear:"both" /*marginLeft:"55px"*/}).append((function(){
									if(!self.IsOp && self.ReplyCount > 0){
										return $("<a>").attr("href", "javascript:void(0);").css({fontStyle:"italic",marginLeft:"110px"}).click(self, ReplyLoader)
										.text("show " + Math.max(self.ReplyCount, self.ReplyPosts.length) + " repl" + (Math.max(self.ReplyCount, self.ReplyPosts.length) !== 1 ? "ies" : "y"));
									}
								}))
								
							)
						)
					)
				)
			);
		
		}
	}
	
});



Bnet.Init();
Bnet.Server();

