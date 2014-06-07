// ==UserScript==
// @name           Code Library
// @namespace      http://userscripts.org/users/23652
// @description    A code library for extra functions, and extending use of arrays, objects, and strings
// @copyright      JoeSimmons
// @include         *
// @version        1.0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

(function name() { // anonymous function
})();

// Make sure the page is not in a frame (throw method)
// if(window.self !== window.top) throw "";

// Make sure the page is not in a frame (return method, for anonymous function wrapper)
// if(window.self !== window.top) return;

// exit if not Greasemonkey - JoeSimmons
// if(typeof window.opera !== "undefined" || typeof window.chrome !== "undefined" || typeof GM_info !== "object" || typeof GM_registerMenuCommand !== "function") throw "This script is not running in Greasemonkey.";

// isGM by JoeSimmons
var isGM = (typeof window.opera === "undefined" && typeof window.chrome === "undefined" && typeof GM_info === "object" && typeof GM_registerMenuCommand === "function");

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(el, type) {
	var e;
	if(typeof el === "string") e = document.getElementById(el);
	if(el === null || typeof el === "undefined") return;
		else e = el;
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type || 'click'), true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	e.dispatchEvent(evObj);
}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,type,target".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0, l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// addPrototype by JoeSimmons
function addPrototype(elem, name, func) {

	// filter for bad arguments
	if(elem === null || typeof name !== "string" || typeof func !== "function") {
		return;
	}

	var regex = /\[object ([^\]]+)\]/, p;

	if(regex.test((elem + ""))) {

		p = window[(elem + "").match(regex)[1]];

	}
	
	if(typeof p.prototype !== "undefined") {

		p.prototype[name] = func;

	}

}

addPrototype(e, "realClick", function() { // requires addPrototype()
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		this.dispatchEvent(evObj);
	});

String.prototype.blank = function() {
	return this;
}

if(!String.prototype.trim) String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toInt = function() {
	return parseInt(this.replace(/[^\d]+/g,""));
};

String.prototype.toFloat = function() {
	return parseFloat(this.replace(/[^\d\.]+/g,""));
};

String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
}

String.prototype.escapetags = function() {
	return this.replace(/(<|>)/g, "\\$1");
}

String.prototype.htmlspecialchars = function() {
	return this.replace(/(<|>|&|")/g, function(c) {
		switch(c) {
			case "<":case ">": return "&"+(c=="<"?"lt":"gt")+";";
			case "&": return "&amp;";
			case "\"": return "&quot;";
		}
	});
};

String.prototype.getPref = function(s, splitter) {
	return this.split(s+"=")[1].split((splitter||"&"))[0];
};

// setVar by JoeSimmons
// Syntax: "autoplay=1&hq=0&ads=1".setVar("ads", "0").setVar("hq", "1");
String.prototype.setVar = function(q, v) {
	var regex = new RegExp("([\&\?])?"+q+"=[^\&\#]*", "g");
	return regex.test(this) ? this.replace(regex, "$1"+q+"="+v) : this+"&"+q+"="+v;
}

String.prototype.truncate = function(l, b) {
	var len = l || 45, beg = b || 20, str=this;
	return (str.length<=len)?str:str.substring(0,beg)+"..."+str.substring(beg+(str.length-(len-3)));
};

Array.prototype.inArray = function(value) {
	for(var i=0,l=this.length; i<l; i++) if(this[i]===value) return true;
	return false;
};

function isArray(arr) {
	return arr&&typeof arr==='object'&&typeof arr.length==='number'&&typeof arr.splice==='function'&&!(arr.propertyIsEnumerable('length'));
};

// find by JoeSimmons
String.prototype.find = function(s) {
	return (this.indexOf(s) !== -1);
};

// Debug by JoeSimmons (needs create() function)
function debug(s) {
	var d=document.getElementById("debugT");
	
	if(!d) document.body.insertBefore(d=create("textarea", {id:"debugT",style:"margin: 0 1% 6px 1%; padding: 5px; position: inline; width: 97%; height: 20%; color: #000000; background: #E6F4FF; border:3px double #0099FF; border-top: 0; z-index:99999; overflow: scroll !important;",ondblclick:function(e){e.target.style.display="none";}}, new Array(create("text", "[Debug Window 2.0 - Drag box to read fully - Copyright Joe Simmons \"CC BY-ND 3.0\"]\n\n\n\n" + s))), document.body.firstChild);
		else d.innerHTML+="\n\n--------------------------------------------------\n\n"+s;

	if(d.style.display=="none") d.style.display="";
	
	return true;
}

// showAllProperties by JoeSimmons
function showAllProperties(e) {
	var props = "Element Properties:\n\n",
		pr = e.attributes;
	for(var p in pr) {
		if(p.value !== undefined) props += p.name + " -> " + p.value + "\n";
	}
	return props;
}

// runAfterPageIdle by JoeSimmons. Just supply it a function and it will run when the page stops mutating
function runAfterPageIdle(func, clear) {
	if(clear === true) {
		document.removeEventListener("DOMSubtreeModified", runAfterPageIdle, false);
		document.removeEventListener("DOMNodeInserted", runAfterPageIdle, false);
		document.removeEventListener("DOMNodeRemoved", runAfterPageIdle, false);
		this.f();
	} else if(typeof func === "function") {
		this.f = func;
		to = window.setTimeout(function() {
			runAfterPageIdle(null, true);
		}, 500);
		document.addEventListener("DOMSubtreeModified", runAfterPageIdle, false);
		document.addEventListener("DOMNodeInserted", runAfterPageIdle, false);
		document.addEventListener("DOMNodeRemoved", runAfterPageIdle, false);
	} else if(typeof func === "object") {
		window.clearTimeout(to);
		to = window.setTimeout(function() {
			runAfterPageIdle(null, true);
		}, 500);
	}
}

// getPosition by JoeSimmons
function getPosition(e) {
	var top=0, left=0, bottom=0, right=0;
	do {
		top += e.offsetTop;
		left += e.offsetLeft;
	} while(e=e.offsetParent);
	bottom = window.innerHeight - top;
	right = window.innerWidth - left;
	return {"top" : top, "bottom" : bottom, "left" : left, "right" : right};
}

	// addScript by JoeSimmons
function addScript(s, id) {
	var head = document.getElementsByTagName("head"),
		aS = document.createElement("script");
	if(!head) return;
		else head = head[0];
	aS.setAttribute("type", "text/javascript");
	aS.setAttribute("id", (id || ("a-script-" + Math.floor((Math.random * 1000) + 1))));
	try {aS.innerHTML = s;} catch(e) {aS.innerText = s;}
	head.appendChild(aS);
}

// Define GM_addStyle if it's undefined
var GM_addStyle = (typeof GM_addStyle !== "undefined" ? GM_addStyle : function(css) {
    var head = document.getElementsByTagName('head'), style = document.createElement('style');
    if(head.length !== 0 && (head=head[0])) {
		style.setAttribute("type",  "text/css");
		if(typeof style.innerHTML !== "undefined") style.innerHTML = css;
			else if(style.textContent !== "undefined") style.textContent = css;
			else if(style.innerText !== "undefined") style.innerText = css;
		head.appendChild(style);
		return true;
	} else return false;
});

// msg by JoeSimmons. first arg is the message, second arg is the header
function msg(t, h) {
	
	// Define GM_addStyle if it's not Firefox
	var GM_addStyle = (typeof GM_addStyle !== "undefined" ? GM_addStyle : function(css) {
		var head = document.getElementsByTagName('head'), style = document.createElement('style');
		if(head && (head=head[0])) {
			style.setAttribute("type",  "text/css");
			try {style.innerHTML = css} catch(x) {style.innerText = css}
			head.appendChild(style);
		}
	});
	
	var box = document.createElement("div"),
		text = document.createElement("span"),
		header = document.createElement("div"),
		body = document.body,
		box_id_name = "script_msg";
	
	GM_addStyle("@keyframes blink {\n\t50% {color: #B95C00;}\n}\n\n#" + box_id_name + " .msg-header {\n\tanimation: blink 1s linear infinite normal;\n}");
	
	box.setAttribute("id", box_id_name);
	box.setAttribute("style", "position: fixed; z-index: 99999; top: 30%; left: 20%; width: 40%; height: 40%; padding: 50px; background-color: #E9E9E9; border: 3px double #006195;");
	box.setAttribute("title", "Double-click this box to close it.");
	header.setAttribute("style", "margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #B0B0B0; color: #F07800; font-size: 18px; text-shadow: 2px 2px 4px #C7C7C7; text-align: center;");
	header.setAttribute("class", "msg-header");
	header.appendChild( document.createTextNode((h ? h : "Message Box by JoeSimmons. Double-click to close.")) );
	text.setAttribute("style", "color: #000000; font-size: 13px; font-family: sans-serif, arial; font-weight: normal; text-shadow: 0 0 8px #AEAEAE;");
	text.innerHTML = t.replace(/\n/g, "<br>");
	box.appendChild(header);
	box.appendChild(text);
	box.addEventListener("dblclick", function(e) {
		var b = document.getElementById(box_id_name);
		if(b !== null) b.style.display = "none";
	}, false);
	if(body !== null) document.body.appendChild(box);
	
}

// Array.clean() by JoeSimmons - cleans out undefined array values to make a "packed" array (no empty spots)
Array.prototype.clean = function() {

	var oldArray = this, newArray = new Array();
	
	for(var i=0, len = oldArray.length; i < len; i++) {
		if(typeof oldArray[i] !== "undefined") newArray.push(oldArray[i]);
	}
	
	return newArray;

};

// rand() by JoeSimmons. the first arg is the maximum, second arg is the minimum
function rand(MAX, MIN, bias) {

	var max = (typeof MAX === "number" && MAX > 1 ? MAX : 100000 * Math.random()), // if(first arg not a number || <= 1) then use a random between 1-100,000
		min = (typeof MIN === "number" && MIN < MAX && MIN > 0 ? MIN : 1), // if(second arg missing || not a number || less than 0 || more than max) then use 1
		num = (max * Math.random()), // get a random number between 0 and max
		inc = min > 100 ? min / 100 : 1; // number to increment with if necessary

	// make sure returned number isn't lower than the minimum
	if(inc === 1 && num < min) {
		num = min; // just use min instead of incrementing by 1, same result every time
	} else {
		while(num < min) {
			num += inc; // increment the number by 1% until it's more than minimum
		}
	}

	// make sure returned number isn't higher than the maximum
	if(inc === 1 && num > max) {
		num = max; // just use max instead of decrementing by 1, same result every time
	} else {
		while(num > max) {
			num -= inc; // decrement the number by 1% until it's more than minimum
		}
	}

	// round number now before checking for < 1 || > max
	num = Math.round(num);
	
	// make sure the returned number is at least 1 but not more than max
	num = num < 1 ? 1 : num; // check for less than 1
	num = num > max ? max : num; // check for more than max
	
	return num; // return a rounded number

}

// waitForElemLoad by JoeSimmons
// give it an xpath expression or css selector for arg #1 (e.g., for an ID, use "#something" or for a class, use ".someclass")
// arg #3 is a context node (optional)
function waitForElemLoad(str, func, con) {

	if(typeof str === "undefined" || typeof func === "undefined") return;

	var e, $xp = /^\s*(\.?\/{1,2}\w+)|(id\()/, context = (typeof con === "object" ? con : document);
	window["elemLoadTimer"] = (typeof window["elemLoadTimer"] !== "undefined" ? window["elemLoadTimer"] : 0); // get or initialize the elem load timer

	if($xp.test(str)) e = document.evaluate(str, context, null, 9, null).singleNodeValue;
		else e = context.querySelector(str);

	$t(window["elemLoadTimer"]);

	if(e !== null) {
		func(e);
		return true;
	} else if(window["elemLoadTimer"] < 120) {
		window["elemLoadTimer"]++;
		window.setTimeout(function() {
			waitForElemLoad(str, func, context);
		}, 250);
	} else {
		return false;
	}
}