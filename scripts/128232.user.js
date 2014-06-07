// ==UserScript==
// @name				Reddit Diabetes BG highlighter
// @description		Highlights numbers in r/diabetes and gives the mg/dL <=> mmol/L conversion in the tooltip
// @version			0.97
// @match 			http://reddit.com/r/diabetes/*
// @match 			http://*.reddit.com/r/diabetes/*
// @match 			https://reddit.com/r/diabetes/*
// @match 			https://*.reddit.com/r/diabetes/*
// @match 			http://reddit.com/r/shittydiabetesadvice/*
// @match 			http://*.reddit.com/r/shittydiabetesadvice/*
// @match 			https://reddit.com/r/shittydiabetesadvice/*
// @match 			https://*.reddit.com/r/shittydiabetesadvice/*
// ==/UserScript==

// the guts of this userscript
function do_bg_replacement() {
    var ignore_suffixes = ["year", "yr", "month", "mo", "week", "day", "hour",
                            "hr", "minute", "second", "gram", "carb", "carbohydrate",
                            "unit", "percent", "time", "lb", "kg", "mg", "mcg", "pack",
                            "packet", "bag", "box", "that", "liter", "litre", "click",
                            "mile", "kilometer", "mi", "km", "ish", "pound", "kilo",
                            "kilogram", "stone", "per", "am", "pm", "o'clock", "oclock",
                            "test", "g", "%", "\\$", "cup", "ounce", "slice", "other",
                            "ft", "yo", "of", "lada", "(or)\\s*(lada)", "pod", "needle",
                            "pen", "night", "buck", "euro", "dollar", "mph", "place",
                            "vial", "u", "yard", "meter", "yd", "injection", 
                          ];
    var ignoreSuffixString = ignore_suffixes[0];
    for (var i = 0; i < ignore_suffixes.length; i++) {
        ignoreSuffixString += "|" + ignore_suffixes[i];
    }
    var ignore_regex = "(?!\\s*(-\\s*\\d*|to\\s*\\d*|\\/\\s*\\d*|or so\\s*)?(\\+)*\\s*(" + ignoreSuffixString + "))";
	var bgregexp = new RegExp("\\b\\d+((\\,|\\.)\\d+)?s?(\\s*(mmol\\/l|mg\\/dl|mmol|mgdl))?(?!\\.\\d+)(?!:\\d+)" + ignore_regex + "\\b", "gi");
	var ignore_words = [/(type|paradigm|minimed|mm|age|day|hour|turned|for)\s*\d+(\.\d+)?/i,  			// Handles Type # as well as pump names
                        /[t]1\.5/i,
						/\$\s*\d+(\.\d+)?/, 				// $ money
						/\d+\.\d+(\.\d+)+/, 				// version numbers "1.2.3"
						/\d+,\d+(,\d+)+/, 				    // version numbers "1,2,3"
						/[v]\d+\.\d*(\.\d+)*/i, 			// "v#.#"
						/(v)\s*\d+\.\d*(\.\d+)*/i, 			// v #.#
						/(version)\s*\d+\.\d*(\.\d+)*/i,    // version #.#
                        /\d*(:)\d+/,                        // Time ##:##
                        /(other)\s*\d+(\.\d+)?\s*(or)?/i,        // other ## or
                        /(catch-)\d+(\.\d+)?/i,             // catch-##
                        /(jan|feb|mar|apr|may|jun|july|aug|sep|oct|nov|dec).{0,8}\d+(\.\d+)?/i,
                        ]
	var conversion_factor = 18;
	var getTitleText = function (str) {
		var numToConvert = str.match(/\b\d+(\.\d+)?/g);
		var mmol = str.match(/(mmol\/l|mmol)/gi);
		var mgdl = str.match(/(mg\/dl|mgdl)/gi);
		
		var num = parseFloat(numToConvert[0]);
		if (mgdl == null && (num < 18 || mmol != null || numToConvert[0].search(/\./) != -1)) {
			return num.toFixed(1) + " mmol/L = " + (num * conversion_factor).toFixed(0) + " mg/dL";
		}
		else {
			return num + " mg/dL = " + (num / conversion_factor).toFixed(1) + " mmol/L";
		}
	};
	
	var doLookbehind = function (str, match) {
		var found = false;
		var toTest = str.concat(match);
		for (var i = 0; i < ignore_words.length; i++) {
			if (toTest.search(ignore_words[i]) != -1)
			{
				found = true;
			}
		}
		return found;
	}
	
	var addSpans = function (node) {
		var newNode = document.createElement("p");
		var doneWork = false;
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].nodeType != 3) {
				newNode.appendChild(node.childNodes[i].cloneNode(true));
			}
			else {
				var txtNode = node.childNodes[i];
				var txt = txtNode.textContent;
				var match, link, lastpos = 0;
				while(match = bgregexp.exec(txt)) {
					if (doLookbehind(txt.substring(lastpos, match.index), match[0])) {
						var newtxtnode = document.createTextNode(txt.substring(lastpos, match.index).concat(match[0]));
						newNode.appendChild(newtxtnode);
					}
                    else if (parseFloat(match[0]) > 800 || parseFloat(match[0]) == 0.0) {
                    	var newtxtnode = document.createTextNode(txt.substring(lastpos, match.index).concat(match[0]));
						newNode.appendChild(newtxtnode);
                    }
					else {
						doneWork = true;
						link = match[0];
						var newtxtnode = document.createTextNode(txt.substring(lastpos, match.index));
						newNode.appendChild(newtxtnode);
						var newlinknode = document.createElement("span");
						newlinknode.className="bg_level";
						var title = document.createAttribute("title");
						title.nodeValue = getTitleText(link);
						newlinknode.attributes.setNamedItem(title);
						newlinknode.appendChild(document.createTextNode(link));
						newNode.appendChild(newlinknode);
					}
					lastpos = bgregexp.lastIndex;
				}
				if (doneWork || lastpos == 0) 
					newNode.appendChild(document.createTextNode(txt.substring(lastpos)));
				
			}
		}
		
		if (doneWork) {
			if (node.parentNode != null)
				node.parentNode.replaceChild(newNode,node);
		}

	};
	
	var nodes = Array();
	
	var commentnodes = document.getElementsByClassName("comment");
	if (commentnodes != null) {
		for (var i = 0; i < commentnodes.length; i++) {
			var mdnodes = commentnodes[i].getElementsByClassName("md");
			if (mdnodes != null) {
				for (var j = 0; j < mdnodes.length; j++) {
					var pnodes = mdnodes[j].getElementsByTagName("p");
					if (pnodes != null) {
						for (var k = 0; k < pnodes.length; k++){
							nodes.push(pnodes[k]);
						}
					}
					
				}
			}
		}
	
	}
	var entrynodes = document.getElementsByClassName("entry");
	if (entrynodes != null) {
		for (var i = 0; i < entrynodes.length; i++) {
			var mdnodes = entrynodes[i].getElementsByClassName("md");
			if (mdnodes != null) {
				for (var j = 0; j < mdnodes.length; j++) {
					var pnodes = mdnodes[j].getElementsByTagName("p");
					if (pnodes != null) {
						for (var k = 0; k < pnodes.length; k++){
							nodes.push(pnodes[k]);
						}
					}
					
				}
			}
		}
	
	}
	if (nodes != null) {
		for (var i = 0; i < nodes.length; i++) {
			addSpans(nodes[i]);
		}
	}
}

var style = document.createElement("style");
style.appendChild(document.createTextNode(".bg_level {color: #357EC7; font-weight: bold; cursor: pointer;}"));
document.getElementsByTagName("body")[0].appendChild(style);
do_bg_replacement();
