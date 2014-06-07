// DGWeb Core user script
// version 1.0.0.0
// 2008−09−20
// Copyright (c) 2008, Shamim Rezaie
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DGWeb.Core", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Core
// @namespace     http://dgweb.rezaie.info
// @description   The core package of DGWeb
// @include       *
// ==/UserScript==



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////  style-sheets  ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 
"#DGWeb_Tooltip_TooltipContainer {							" + 
"	position		: absolute;								" +
"	z-index			: 99;									" +
"	width			: auto;									" +
"	height			: auto;									" +
"	overflow		: visible;								" +
"	visibility		: hidden;								" +
"	background-color: #ffffcc;								" +
"	border			: 0.1em solid #000000;					" +
"	padding			: 0.2em;								" +
"}															" +
"#DGWEB_Powered_Span {										" +
"	font-family	:	Arial, Helvetica, geneva, sans-serif;	" +
"	font-size	: x-small;									" +
"}															" +
"#DGWeb_Tooltip_Table {										" +
"	width			: auto;									" +
"	height			: auto;									" +
"	color			: #006600;								" +
"	border			: 0.1em solid #000000;					" +
"	padding			: 0.5em;								" +
"	font-family		: arial, helvetica, geneva, sans-serif;	" +
"	font-size		: small;								" +
"}															" +
"DGWebDate.DGweb_date {										" +
"	background-color: #cccccc;								" +
"	border			: solid;								" +
"	-moz-border-radius: 5px;								" +
"	border-color	: #c5d5ff;								" +
"	border-width	: thin;									" +
"	padding			: 0;									" +
"	margin			: 0;									" +
"}															" +
"span.DGweb_span {											" +
"	cursor	:help;											" +
"	border	:none;											" +
"	padding	: 0;											" +
"	margin	: 0;											" +
"}															" +
".DGWeb_image {												" +
"	padding	: 0;											" +
"	margin	: 0;											" +
"}															";

head.appendChild(style);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////  dgweb.js  /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (typeof unsafeWindow.DGWeb == "undefined") {
	unsafeWindow.DGWeb = {};
}

if (typeof unsafeWindow.DGWeb.namespace == "undefined") {
	unsafeWindow.DGWeb.namespace = function(a) {
		var o=null, i, d;

		    d=a.split(".");
		    o=unsafeWindow.DGWeb;

		    for (i=0; i<d.length; i=i+1) {
		        o[d[i]]=o[d[i]] || {};
		        o=o[d[i]];
		    }
		return o;
	}
}

if (typeof unsafeWindow.DGWeb.convertFunctions == "undefined") {
	unsafeWindow.DGWeb.convertFunctions = {};
}

unsafeWindow.DGWeb.RegisterConvertor = function(name, func) {
	if (unsafeWindow.DGWeb.convertFunctions[name] == null) {
		unsafeWindow.DGWeb.convertFunctions[name] = func;
	}
}

if (typeof unsafeWindow.DGWeb.Show == "undefined") { // website owners might have defined custom Show function
	unsafeWindow.DGWeb.Show = function(selectedText) {
		selectedText = selectedText.replace(/^\s+|\s+$/g, "");

		var dateArray = unsafeWindow.DGWeb.DateParser.ParseAnyDate(selectedText);
		var result = "";
		if (dateArray != null) {
			result = '<table id="DGWeb_Tooltip_Table" dir="' + unsafeWindow.DGWeb.Lang.DIRECTION + '">';
			for (var func in unsafeWindow.DGWeb.convertFunctions) {
				result += '<tr><td>' + eval("unsafeWindow.DGWeb.Lang."+func+".NAME") + '</td><td>' + unsafeWindow.DGWeb.convertFunctions[func](dateArray[0], dateArray[1]) + '</td></tr>';
			}
			result += '</table>';
			result += '<span id="DGWEB_Powered_Span">' + unsafeWindow.DGWeb.Lang.POWERED + '</span>';
			//result = DGWeb.convert(dateArray[0], dateArray[1]);
		} else {
			result = unsafeWindow.DGWeb.Lang.INVALID_DATE;
		}

		unsafeWindow.DGWeb.Tooltip.pmaTooltip(result);
	
		return false;
	}
}

if (typeof unsafeWindow.DGWeb.ParsePage == "undefined") {
	page_has_ParsePage = false;
	unsafeWindow.DGWeb.ParsePage = function() {
		for (var i = 0; i < unsafeWindow.DGWeb.DateParser.dateFormats.length; i++) {
			if (unsafeWindow.DGWeb.DateParser.parseFunctions[unsafeWindow.DGWeb.DateParser.dateFormats[i]] == null) {
				unsafeWindow.DGWeb.DateParser.createParser(unsafeWindow.DGWeb.DateParser.dateFormats[i]);
			}
		}

		var trackRegexArr = new Array();


		for (var el in unsafeWindow.DGWeb.DateParser.parseRegexes) {
			//trackRegexArr[el] = new RegExp(String(unsafeWindow.DGWeb.DateParser.parseRegexes[el]).replace(/^\/\^|\$\/i$/g, ""), "ig");
			trackRegexArr[el] = new RegExp("\\b" + String(unsafeWindow.DGWeb.DateParser.parseRegexes[el]).replace(/^\/\^|\$\/i$/g, "") + "\\b", "ig");
		}

		var allowedParents = ["a", "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body",
							"caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", "fieldset",
							"font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe", "ins", "kdb", "li",
							"nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", "s", "strong",
							"sub", "sup", "td", "th", "tt", "u", "var"];

		var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
		//" and contains(translate(., 'HTTP', 'http'), 'http')" + 
		"]";


		for (var e in trackRegexArr) {
			var trackRegex = trackRegexArr[e];
			var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
				if (trackRegex.test(cand.nodeValue)) {
					var span = document.createElement("span");
					var source = cand.nodeValue;

					cand.parentNode.replaceChild(span, cand);

					trackRegex.lastIndex = 0;
					for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source));) {
						span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

						var DGWebSpan = document.createElement("span");	// events on custom tags don't work on opera, so we need this span as a container
						var DGWebDate = document.createElement("DGWebDate");	// a custom tag should be used in order to prevent recursive detection
						var img = document.createElement("img");

						img.setAttribute("src", "data:image/gif,GIF89a%10%00%10%00%E6j%00%FF%A3d%EF%F3%F9%FF%A4e%DE%E7%F3%5C%8A%C6%"+
									"FF%A0%60V%87%C7%FF%A4d%FF%7F%3D%DE%E7%F2%7D%A5%DCY%8A%C8%9B%BD%EB%EE%F3%F9%7D%A1%D0%89%AE%D9%9"+
									"3%B4%DF%A4%C1%E4%FF%99XT%86%C4U%86%C6%84%AC%E0%FF%A2b%FF%90M%90%B5%E6%8C%B0%DB%E6%ED%F6%FF%BDy"+
									"_%8D%C8%FF%B9q%FF%BBu%FF%B0a%FF%9E%5D%80%A9%DD%F0%F4%FA%FF%ABZ%ED%F2%F8%FF%8BGt%9D%D5%A8%C6%EF"+
									"j%97%D1%95%B8%E3%FF%B8mx%A3%D8%8F%B4%E5_%8C%C6z%A4%D9%AB%C6%E5%9D%BD%E1%9A%BB%E6%96%BA%E9%9F%C"+
									"0%ED%FF%95T%5E%8E%CBc%92%CE%5E%8B%C5%F1%F6%FA%FF%7D%3Bd%93%CE%FF%94R%9D%BE%EBh%96%D1%A4%C1%E7%"+
									"FF%98W~%A8%DD%F2%F6%FA%FF%A7T%9A%BC%EBu%A1%D7%FF%9AZ%FF%B3h%FF%A1a%DB%E4%F1o%9B%D4%8C%B2%E4_%8"+
									"F%CB%94%B7%E7%D2%E1%F7%FF%96T%5B%8A%C9%87%AE%E1%EB%F1%F7%EA%F0%F7%93%B7%E7%FF%9F_%FF%84B%89%B0"+
									"%DE%83%AB%DC%98%BA%E9%8C%B1%E3%9E%BF%EC%FF%9D%5C%8F%B5%E1%E2%EA%F4%91%B4%DD%96%B8%DF%9F%BE%E6%"+
									"AC%C8%F1%88%AF%E2%96%B6%E2%82%AA%DFR%84%C3%D8%E2%F0%F4%F7%FB%A1%BF%E7%FF%FF%FF%FF%FF%FF%00%00%"+
									"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0"+
									"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%0"+
									"4%01%00%00j%00%2C%00%00%00%00%10%00%10%00%00%07%AD%80j%82%83%84%85%82Ma3%3CC2S%18Jb%15!%0Ac%82"+
									"'g%98%99%9A%98%2B%82Zg%02%00%05%20%12N%17%25U%08gI%82%0Cg%07%1B%1E%1D*F%1F%23B9g(%82X%A0%00%16"+
									"GT%5BE%3F4%3Bg%3A%82Lgih%CD%CF%CE%2FQK%82%2CA%D0%D8%11%09%0B%82Y8%D8%CE%CE0f%14%82P%22%E0%CF_f"+
									"%13%82d%01%E9%CE%5Ef%1C%82%40%F0%E1%D8%19f%04%82.%0Dh%7C%A0%01%13%23%05%17%2BW%1E%98i!%88%08%0"+
									"9)%1A%BA%0C%40b%A6%A2%C5%1B%82%20%98%E8a%A3%C6%13%03eB%8At%60%A8%24%A1%40%00%3B");
						img.setAttribute("class", "DGWeb_image");

						DGWebDate.setAttribute("class", "DGWeb_date");

						DGWebSpan.setAttribute("onmouseover", "DGWeb.Show('" + match[0] + "'); return false;");
						DGWebSpan.setAttribute("onmouseout", "DGWeb.Tooltip.swapTooltip('default'); return false;");
						DGWebSpan.setAttribute("class", "DGWeb_span");

						DGWebDate.appendChild(document.createTextNode(match[0]));
						DGWebDate.appendChild(document.createTextNode(" "));
						DGWebDate.appendChild(img);

						DGWebSpan.appendChild(DGWebDate);
						span.appendChild(DGWebSpan);

						lastLastIndex = trackRegex.lastIndex;
					}

					span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
					span.normalize();
				}
			}
		}

		document.body.innerHTML = document.body.innerHTML;	// seems to be crazy, but IE needs it
	}
} else {
	page_has_ParsePage = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  dgweb-formats.js  /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

unsafeWindow.DGWeb.namespace("DateParser");

if (typeof unsafeWindow.DGWeb.DateParser.dateFormats == "undefined") {
	unsafeWindow.DGWeb.DateParser.dateFormats = new Array('Y-m-d', 'y-m-d', 'M d, Y', 'M d, y', 'M d,Y', 'M d Y', 'M d,y', 'Y-M-d', 'y-M-d', 'd-M-Y', 'd-M-y',
								'd M Y', 'd M y', 'M Y', 'M d', 'd M', 'M');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////  dateparser.js  //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

unsafeWindow.DGWeb.namespace("DateParser");

unsafeWindow.DGWeb.DateParser.monthNames =
   ["january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
	"jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"];

unsafeWindow.DGWeb.DateParser.monthNumbers = {
    jan:0,
    feb:1,
    mar:2,
    apr:3,
    may:4,
    jun:5,
    jul:6,
    aug:7,
    sep:8,
    oct:9,
    nov:10,
    dec:11,
	1:0,
    2:1,
    3:2,
    4:3,
    5:4,
    6:5,
    7:6,
    8:7,
    9:8,
    10:9,
    11:10,
    12:11};

unsafeWindow.DGWeb.DateParser.y2kYear = 50;


unsafeWindow.DGWeb.DateParser.parseFunctions = {count:0};
unsafeWindow.DGWeb.DateParser.parseRegexes = [];

unsafeWindow.DGWeb.DateParser.parseDate = function(input, format) {
    if (unsafeWindow.DGWeb.DateParser.parseFunctions[format] == null) {
        unsafeWindow.DGWeb.DateParser.createParser(format);
    }
    var func = unsafeWindow.DGWeb.DateParser.parseFunctions[format];
    return unsafeWindow.DGWeb.DateParser[func](input);
}

if (typeof unsafeWindow.DGWeb.DateParser.ParseAnyDate == "undefined") {
	unsafeWindow.DGWeb.DateParser.ParseAnyDate = function(input) {
		var d = null;

		for (var j=0; j<unsafeWindow.DGWeb.DateParser.dateFormats.length; j++) {
			d=unsafeWindow.DGWeb.DateParser.parseDate(input,unsafeWindow.DGWeb.DateParser.dateFormats[j]);
		    if (d != null) {
				return new Array(d, unsafeWindow.DGWeb.DateParser.dateFormats[j]);
			}
		}
		return null;
	}
}


unsafeWindow.DGWeb.DateParser.createParser = function(format) {
    var funcName = "parse" + unsafeWindow.DGWeb.DateParser.parseFunctions.count++;
    var regexNum = unsafeWindow.DGWeb.DateParser.parseRegexes.length;
    var currentGroup = 1;
    unsafeWindow.DGWeb.DateParser.parseFunctions[format] = funcName;

    var code = "unsafeWindow.DGWeb.DateParser." + funcName + " = function(input){\n"
        + "var y = -1, m = -1, d = -1;\n"
        + "var d = new Date();\n"
        + "y = d.getFullYear();\n"
        + "m = d.getMonth();\n"
        //+ "d = d.getDate();\n"
		+ "d = 1;\n"
		//+ "var tempRegExp = new RegExp(String(unsafeWindow.DGWeb.DateParser.parseRegexes[" + regexNum + "]).replace(/^\\/\\^|\\$\\/i$/g, ''), 'i');\n"
		+ "var tempRegExp = new RegExp(String(unsafeWindow.DGWeb.DateParser.parseRegexes[" + regexNum + "]).replace(/^\\/|\\/i$/g, ''), 'i');\n"
        //+ "var results = input.match(unsafeWindow.DGWeb.DateParser.parseRegexes[" + regexNum + "]);\n"
        + "var results = input.match(tempRegExp);\n"
        + "if (results && results.length > 0) {"
    var regex = "";

    var special = false;
    var ch = '';
    for (var i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch == "\\") {
            special = true;
        }
        else if (special) {
            special = false;
			regex += ch.replace(/('|\\)/g, "\\$1"); //regex += String.escape(ch);
        }
        else {
            obj = unsafeWindow.DGWeb.DateParser.formatCodeToRegex(ch, currentGroup);
            currentGroup += obj.g;
            regex += obj.s;
            if (obj.g && obj.c) {
                code += obj.c;
            }
        }
    }

    code += "if (y > 0 && m >= 0 && d > 0)\n"
        + "{return new Date(y, m, d);}\n"
        + "else if (y > 0 && m >= 0)\n"
        + "{return new Date(y, m);}\n"
        + "else if (y > 0)\n"
        + "{return new Date(y);}\n"
        + "}return null;}";

    unsafeWindow.DGWeb.DateParser.parseRegexes[regexNum] = new RegExp("^" + regex + "$", "i");
    eval(code);
}


unsafeWindow.DGWeb.DateParser.formatCodeToRegex = function(character, currentGroup) {
    switch (character) {
    case "d":
        return {g:1,
            c:"d = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{1,2})"};
    case "M":
        return {g:1,
            c:"m = parseInt(unsafeWindow.DGWeb.DateParser.monthNumbers[results[" + currentGroup + "].substring(0, 3).toLowerCase()], 10);\n",
            s:"(" + unsafeWindow.DGWeb.DateParser.monthNames.join("|") + ")"};
    case "m":
        return {g:1,
            c:"m = parseInt(results[" + currentGroup + "], 10) - 1;\n",
            s:"(\\d{1,2})"};
    case "Y":
        return {g:1,
            c:"y = parseInt(results[" + currentGroup + "], 10);\n",
            s:"(\\d{4})"};
    case "y":
        return {g:1,
            c:"var ty = parseInt(results[" + currentGroup + "], 10);\n"
                + "y = ty > unsafeWindow.DGWeb.DateParser.y2kYear ? 1900 + ty : 2000 + ty;\n",
            s:"(\\d{1,2})"};
	case " ":
        return {g:0,
            c:null,
            s:" +"};
    default:
        return {g:0,
            c:null,
			s:character.replace(/('|\\)/g, "\\$1")}; //s:String.escape(character)
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////  tooltip.js  ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Displays the Tooltips (hints), if we have some
 * 2005-01-20 added by Michael Keck (mkkeck)
 */

if (typeof unsafeWindow.DGWeb.Tooltip == "undefined") { // site owners might define custom tooltip
	unsafeWindow.DGWeb.namespace("Tooltip");

	unsafeWindow.DGWeb.Tooltip.ttXpos = 0;
	unsafeWindow.DGWeb.Tooltip.ttYpos = 0;

	unsafeWindow.DGWeb.Tooltip.ttXadd = 10;
	unsafeWindow.DGWeb.Tooltip.ttYadd = -10;

	unsafeWindow.DGWeb.Tooltip.ttDisplay = 0;
	unsafeWindow.DGWeb.Tooltip.ttHoldIt = 0;


	unsafeWindow.DGWeb.Tooltip.myTooltipContainer = null;

	// mouse-event
	unsafeWindow.document.onmousemove = function(e){
		/**
		 * register mouse moves
		 *
		 * @param    event    e
		 */
		if (typeof(event) != 'undefined') {
			unsafeWindow.DGWeb.Tooltip.ttXpos = event.x;
			unsafeWindow.DGWeb.Tooltip.ttYpos = event.y;
		}
		else {
			unsafeWindow.DGWeb.Tooltip.ttXpos = e.pageX;
			unsafeWindow.DGWeb.Tooltip.ttYpos = e.pageY;
		}
	}

	unsafeWindow.DGWeb.Tooltip.textTooltip = function(theText) {
	    unsafeWindow.DGWeb.Tooltip.myTooltipContainer.innerHTML = "";             // we should empty it first
	    unsafeWindow.DGWeb.Tooltip.myTooltipContainer.innerHTML = theText;
	}

	unsafeWindow.DGWeb.Tooltip.ttTimerID = 0;

	unsafeWindow.DGWeb.Tooltip.swapTooltip = function(stat) {
		if (unsafeWindow.DGWeb.Tooltip.ttHoldIt!=1) {
		    if (stat!='default') {
		        if (stat=='true')
		            unsafeWindow.DGWeb.Tooltip.showTooltip(true);
		        else if (stat=='false')
		            unsafeWindow.DGWeb.Tooltip.showTooltip(false);
		    } else {
		        if (unsafeWindow.DGWeb.Tooltip.ttDisplay)
		            unsafeWindow.DGWeb.Tooltip.ttTimerID = setTimeout("DGWeb.Tooltip.showTooltip(false);",500);
		        else
		            unsafeWindow.DGWeb.Tooltip.showTooltip(true);
		    }
		} else {
		    if (unsafeWindow.DGWeb.Tooltip.ttTimerID) {
		       clearTimeout(unsafeWindow.DGWeb.Tooltip.ttTimerID);
		       unsafeWindow.DGWeb.Tooltip.ttTimerID = 0;
		    }
		    unsafeWindow.DGWeb.Tooltip.showTooltip(true);
		}
	}

	unsafeWindow.DGWeb.Tooltip.showTooltip = function(stat) {
		if (stat==false) {
			unsafeWindow.DGWeb.Tooltip.myTooltipContainer.style.visibility = "hidden";
		    unsafeWindow.DGWeb.Tooltip.ttDisplay = 0;
		} else {
			unsafeWindow.DGWeb.Tooltip.myTooltipContainer.style.visibility = "visible";
			unsafeWindow.DGWeb.Tooltip.ttDisplay = 1;
		}
	}

	unsafeWindow.DGWeb.Tooltip.holdTooltip = function() {
		unsafeWindow.DGWeb.Tooltip.ttHoldIt = 1;
		unsafeWindow.DGWeb.Tooltip.swapTooltip('true');
		unsafeWindow.DGWeb.Tooltip.ttHoldIt = 0;
	}

	unsafeWindow.DGWeb.Tooltip.moveTooltip = function(posX, posY) {
	    unsafeWindow.DGWeb.Tooltip.myTooltipContainer.style.left	=	posX + "px";
	    unsafeWindow.DGWeb.Tooltip.myTooltipContainer.style.top  =	posY + "px";
	}

	unsafeWindow.DGWeb.Tooltip.pmaTooltip = function( theText ) {
		// reference to TooltipContainer
		if ( null == unsafeWindow.DGWeb.Tooltip.myTooltipContainer ) {
			unsafeWindow.DGWeb.Tooltip.myTooltipContainer = document.getElementById('DGWeb_Tooltip_TooltipContainer');

		    if ( typeof( unsafeWindow.DGWeb.Tooltip.myTooltipContainer ) == 'undefined' ) {
		        return;
		    }
		}

		var plusX=0, plusY=0, docX=0, docY=0;
		var divHeight = unsafeWindow.DGWeb.Tooltip.myTooltipContainer.clientHeight;
		var divWidth  = unsafeWindow.DGWeb.Tooltip.myTooltipContainer.clientWidth;
		if (navigator.appName.indexOf("Explorer")!=-1) {
		    if (document.documentElement && document.documentElement.scrollTop) {
		        plusX = document.documentElement.scrollLeft;
		        plusY = document.documentElement.scrollTop;
		        docX = document.documentElement.offsetWidth + plusX;
		        docY = document.documentElement.offsetHeight + plusY;
		    } else {
		        plusX = document.body.scrollLeft;
		        plusY = document.body.scrollTop;
		        docX = document.body.offsetWidth + plusX;
		        docY = document.body.offsetHeight + plusY;
		    }
		} else {
		    docX = document.body.clientWidth;
		    docY = document.body.clientHeight;
		}

		unsafeWindow.DGWeb.Tooltip.ttXpos = unsafeWindow.DGWeb.Tooltip.ttXpos + plusX;
		unsafeWindow.DGWeb.Tooltip.ttYpos = unsafeWindow.DGWeb.Tooltip.ttYpos + plusY;

		if ((unsafeWindow.DGWeb.Tooltip.ttXpos + divWidth) > docX)
		    unsafeWindow.DGWeb.Tooltip.ttXpos = unsafeWindow.DGWeb.Tooltip.ttXpos - (divWidth + (unsafeWindow.DGWeb.Tooltip.ttXadd * 2));
		if ((unsafeWindow.DGWeb.Tooltip.ttYpos + divHeight) > docY)
		    unsafeWindow.DGWeb.Tooltip.ttYpos = unsafeWindow.DGWeb.Tooltip.ttYpos - (divHeight + (unsafeWindow.DGWeb.Tooltip.ttYadd * 2));

		unsafeWindow.DGWeb.Tooltip.textTooltip(theText);
		unsafeWindow.DGWeb.Tooltip.moveTooltip((unsafeWindow.DGWeb.Tooltip.ttXpos + unsafeWindow.DGWeb.Tooltip.ttXadd), (unsafeWindow.DGWeb.Tooltip.ttYpos + unsafeWindow.DGWeb.Tooltip.ttYadd));
		unsafeWindow.DGWeb.Tooltip.holdTooltip();
	}

	document.body.innerHTML += '<div id="DGWeb_Tooltip_TooltipContainer" onmouseover="DGWeb.Tooltip.holdTooltip();" onmouseout="DGWeb.Tooltip.swapTooltip(\'default\');"></div>';
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  dgweb-setup.js  //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (! page_has_ParsePage) {
	unsafeWindow.DGWeb.ParsePage();
}
