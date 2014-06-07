// ==UserScript==
// @name           BvS Scratchy Winnings
// @namespace      BvS-Raaaak
// @description    Display a report how many tickets you're gained today and overall.
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// @include        http://animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

/*************************************
* JSON javascript object parser
* Creates a global JSON object
* methods:
*	JSON.stringify(value, replacer, space)
*	JSON.parse(text, reviver)
**************************************/

if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()

/***************************************************************
* DOM Storage Wrapper Class
* 
* Public members:
*     ctor({"session"|"local"}[, <namespace>])
*     setItem(<key>, <value>)
*     getItem(<key>, <default value>)
*     removeItem(<key>)
*     keys()
***************************************************************/
function Storage(type, namespace) {
	var object = this;

	if(typeof(type) != "string")
		type = "session";

	switch(type) {
		case "local": {
			object.storage = localStorage;
		} break;

		case "session": {
			object.storage = sessionStorage;
		} break;

		default: {
			object.storage = sessionStorage;
		} break;
	}

	if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
		namespace = "ScriptStorage";

	object.namespace = [namespace, "."].join("");

	object.setItem = function(key, value) {
		try {
			object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
		}
		catch(e) {
		}
	}

	object.getItem = function(key, defaultValue) {
		try {
			var value = object.storage.getItem(escape([object.namespace, key].join("")));
			if(value)
				return JSON.parse(value);
			else
				return defaultValue;
		}
		catch(e) {
			return defaultValue;
		}
	}

	object.removeItem = function(key) {
		try {
			object.storage.removeItem(escape([object.namespace, key].join("")));
		}
		catch(e) {
		}
	}

	object.keys = function() {
		var array = [];
		var i = 0;
		do {
			try {
				var key = unescape(object.storage.key(i++));
				if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
					array.push(key.slice(object.namespace.length));
			}
			catch(e) {
				break;
			}
		} while(true);
		return array;
	}
}

// UI (credits: http://userscripts.org/users/dtkarlsson)
function Window(id, storage) {
	var my = this;
	my.id = id;
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;
	my.element = document.createElement("div");
	my.elementContainer = document.createElement("div");

	// Window dragging events
	my.drag = function(event) {
		if (my.moving) {
			my.elementContainer.style.left = (event.clientX - my.offsetX)+'px';
			my.elementContainer.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	}
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.elementContainer.style.left);
			var y = parseInt(my.elementContainer.style.top);
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.elementContainer.style.opacity = 1;
			my.elementContainer.removeEventListener('mouseup', my.stopDrag, true);
			my.elementContainer.removeEventListener('mousemove', my.drag, true);
		}
	}
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.elementContainer.style.left);
		my.offsetY = event.clientY - parseInt(my.elementContainer.style.top);
		my.moving = true;
		my.elementContainer.style.opacity = 0.75;
		event.preventDefault();
		my.elementContainer.addEventListener('mouseup', my.stopDrag, true);
		my.elementContainer.addEventListener('mousemove', my.drag, true);
	}

	my.elementContainer.id = id;
	my.elementContainer.className = "drag";
	document.body.appendChild(my.elementContainer);
	my.elementContainer.appendChild(my.element);
	my.elementContainer.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.elementContainer.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.elementContainer.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.elementContainer.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.elementContainer.style.top = "6px";
}

function FloatingScratchyWinnings() {
	var my = this;

	my.window = new Window("bvsScratchyWinnings", scratchySettings);

	// style
	GM_addStyle("#bvsScratchyWinnings {border: 2px solid #953704; position: fixed; z-index: 100; color: #000000; background-color: #EDD2A7; padding: 4px; text-align: left; min-width: 240px; min-height: 32px;} #bvsScratchyWinnings, #bvsScratchyWinnings * {font-size: 12px; font-family: arial;} #bvsScratchyWinnings dl {margin: 0; padding: 0;} #bvsScratchyWinnings dt {margin: 0; padding-top: 5px; font-size: 12px;} #bvsScratchyWinnings dd {margin: 0; padding: 0; font-size: 18px;} #bvsScratchyWinnings a {color: #A10000; font-weight: bold;} #bvsScratchyWinnings {cursor: move;} .high { font-weight: bold; color: #FFFF00; text-decoration: blink; } .mhigh { font-weight: bold; color: #00FF00; } .normal { font-weight: bold; } .mlow { font-weight: bold; color: #FF0000; } .low { font-weight: bold; color: #7F0000; text-decoration: line-through; } .special { font-weight: bold; border: 1px dotted white; background-color: #333;}");

	// get player's name
	my.playerName = function() {
		try {
			return document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
		}
		catch (e) {
			return "none";
		}
	}

	// remove whitespace characters
	my.strip = function(str) {
		str = str.replace(/^\s+/g, "");
		str = str.replace(/\s+$/g, "");
		str = str.replace(/\s+/g, " ");
		return str;
	}

	// time calculation
	my.calcTime = function(offset) {
		d = new Date();
		utc = d.getTime() + (d.getTimezoneOffset() * 60000);
		nd = new Date(utc + (3600000*offset));
		return nd;
	}

	// make it a two digit number
	my.twoDigits = function(number) {
		if(number < 10)
			return "0" + number;
		else
			return number;
	}

	// update the layer
	my.update = function() {
		var html = "";
		var d = my.calcTime("-11");
		var date = d.getFullYear() + "/" + my.twoDigits(d.getMonth() + 1) + "/" + my.twoDigits(d.getDate());
		var inc = false;

		var text = document.evaluate("//form[@name='mainform2']/b/font/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(text != null) {
			if(text.snapshotLength > 0) {
				for(var i = 0; i < text.snapshotLength; i++) {
					var txt = text.snapshotItem(i).nodeValue;
					var item = my.strip(txt.replace(/You won:/gi, "").replace(/!/gi, "").replace(/\d+/gi, ""));
					if(item.match(/yoma/i)) {
						item = "Yoma Blood";
					}
					else if(item.match(/super/i)) {
						item = "Super Potion";
					}
					else if(item.match(/billy/i)) {
						item = "Billy Bucket";
					}
					else if(item.match(/golden/i)) {
						item = "Golden Potion";
					}
					else if(item.match(/clay/i)) {
						item = "Claymore";
					}
					else if(item.match(/sho/i)) {
						item = "Sho Nuff Elixir";
					}
					else {
						alert("Error! Item '" + item + "' is not valid.");
						return;
					}
					var count = txt.match(/(\d+)/);
					if(count != null) {
						count = parseInt(count[1]);
					}
					else {
						count = 1;
					}

					var arr = JSON.parse(scratchySettings.getItem(my.playerName(), "{}"));

					var s = date + "-" + item;
					if(parseInt(arr[s]).toString() == "NaN") {
						arr[s] = 0;
					}
					arr[s] += count;

					var sAll = "All-" + item;
					if(parseInt(arr[sAll]).toString() == "NaN") {
						arr[sAll] = 0;
					}
					arr[sAll] += count;

					scratchySettings.setItem(my.playerName(), JSON.stringify(arr));

					inc = true;
				}
			}
			var imgs = "";
			var images = document.evaluate("//form[@name='mainform2']//img[contains(@src, '/billy/layout/scratch')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i = 0; i < images.snapshotLength; i++) {
				var img = images.snapshotItem(i);
				var src = img.src;
				if(src.match(/scratchspot/i)) {
					imgs += "-";
				}
				else if(src.match(/scratch/i)) {
					imgs += "X";
				}
			}
			if(imgs.length == 25 && imgs.replace(/X/gi, "").length == 0) {
				inc = true;
			}
			if(inc == true) {
				var arr = JSON.parse(scratchySettings.getItem(my.playerName(), "{}"));

				var s = date + "-Tickets";
				if(parseInt(arr[s]).toString() == "NaN") {
					arr[s] = 0;
				}
				arr[s]++;

				var sAll = "All-Tickets";
				if(parseInt(arr[sAll]).toString() == "NaN") {
					arr[sAll] = 0;
				}
				arr[sAll]++;

				scratchySettings.setItem(my.playerName(), JSON.stringify(arr));
			}
		}

		var arr = JSON.parse(scratchySettings.getItem(my.playerName(), "{}"));
		var stats = Array("Sho Nuff Elixir", "Claymore", "Golden Potion", "Billy Bucket", "Super Potion", "Yoma Blood");

		html = "<b>Today</b><div><ul style='margin-top:0px;'>";

		var c = parseInt(arr[date + "-Tickets"]);
		var tickets = c.toString() == "NaN" ? 0 : c;
		for(var i in stats) {
			var c = parseInt(arr[date + "-" + stats[i]]);
			var cnt = c.toString() == "NaN" ? 0 : c;
			html = [html, "<li>", stats[i], ": ", cnt, "</li>"].join("");
		}
		html = [html, "<li>Tickets: ", tickets, "</li></ul></div><b>All time</b><div><ul style='margin-top:0px;margin-bottom:0px;'>"].join("");

		var c = parseInt(arr["All-Tickets"]);
		var tickets = c.toString() == "NaN" ? 0 : c;
		for(var i in stats) {
			var c = parseInt(arr["All-" + stats[i]]);
			var cnt = c.toString() == "NaN" ? 0 : c;
			html = [html, "<li>", stats[i], ": ", cnt, " (", (Math.round((cnt / tickets) * 100 * 100) / 100), "%)</li>"].join("");
		}
		html = [html, "<li>Tickets: ", tickets, "</li></ul></div>"].join("");

		my.window.element.innerHTML = html;
	}

	my.update();
}

try {
	var playerName = document.evaluate("//input[contains(@name, 'player')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(playerName != null) {
		var scratchySettings = new Storage("local", "bvsScratchyWinningsWinnings");
		var scratchyWindow = new FloatingScratchyWinnings();
	}
}
catch(e) {
	alert(e);
}
