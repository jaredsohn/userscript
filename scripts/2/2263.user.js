// eBay Auction Enhancer Greasemonkey script
// version 0.2
// 2005-12-03
// 
// Copyright 2005, Richard Gibson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// Changelog:
// 0.1 (2005-09-06)
// 	original release
// 0.2 (2005-12-03)
//      Joshua Kersey updated to compensate for times greater than 24 hours. They are now properly formatted and separated by colons.
//      http://www.beyond-earth.net
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------
// 
// ==UserScript==
// @name           eBay Auction Enhancer
// @namespace      http://userscripts.org/people/336
// @description    Adds a countdown and in-place bidding to eBay auctions. Countdown is most accurate with LiveHTTPHeaders extension with request time information.
// @include        http*://*.ebay.*
// ==/UserScript==

// cannot yet do auction.co.kr or MercadoLibre/MercadoLivre

(function() {
	// constants
	const DOM_LOAD_TIME = (new Date()).valueOf();
	const MS_PER_HOUR = 3600000;
	const PLUS_MINUS = "\u00B1";
	const UPGRADE_STR = "Install LiveHTTPHeaders extension version 0.10 or higher (with request time information) to see accuracy";
	const UPGRADE_URI = "http://mozdev.org/bugs/attachment.cgi?id=3364"; //"http://livehttpheaders.mozdev.org/installation.html";
	const BAD_DATE_STR = "Unable to determine accuracy (probably from a bad or missing Date header)";
	const SPACE = "(?:\\s|&(?:(?:nb|en|em|thin)sp|#(?:160|8194|8195|8201|x0*(?:a0|200(?:2|3|9))));)+";
	const XPATH_END_TIME_NODES = "//span[contains(concat(' ',normalize-space(@class),' '),' help ')"
			+ " or contains(concat(' ',normalize-space(@class),' '),' nowrap ')]";
	var SPACE_RE = new RegExp(SPACE, "ig");
	var END_TIME_RE = new RegExp(
			"(\\d{2,}" + "(.)" + "(?:\\d?\\d|[^0-9\\s]+)" + "\\2" + "\\d{2,}"				// ymd/dmy
			+ "|(?:\d?\d|[^0-9\\s]+)" + "(.)" + "\\d{2}" + "\\3" + "\\d{2,})"				//  | mdy
			+ SPACE + "([^0-9\\s]?\\d{2}[^0-9\\s]\\d{2}[^0-9\\s]\\d{2}[^0-9\\s]?"		// hh:mm:ss
			+ "(" + SPACE + "[AaPp][Mm])?"															// am/pm
			+ "(" + SPACE + "\\S+)?)"																	// time zone
			);
	var BID_RE = /^https?:\/\/(offer(\.[^\/.]+)*\.ebay\..+\/ws\/eBayISAPI\.dll|[^\/]+\.ebay\..+\/viSubmit(Bid|Bin)?)/i;
	var l10n = [
		{ re: /^(cgi\d*|www)\.ebay\.com$/i,
			// USA, New Zealand: mmm-dd-yy hh:mm:ss PST|PDT
			date: function (strDate) {
				var match = /^([a-z]{3,})\W+(\d?\d)\W+(\d{2,})/i.exec(strDate);
				return (match ? [match[2], match[1], getFullYear(match[3])].join(" ") : strDate);
			},
			time: function (strTimeWithZone) { return strTimeWithZone.replace("PST", "GMT-8")
					.replace("PDT", "GMT-7"); }
		},
		{ re: /^(cgi\d*|www)\.ebay\.(com\.au|be|ca|fr|in|ie|it|nl|es|co\.uk)$/i,
			// Australia, Belgium, Canada, France, Ireland, Italy, Netherlands, Spain, UK:
			// 	dd-mmm-yy hh:mm:ss AEST|AEDT|CEST|CEDT|CET|EST|EDT|Paris|BST|H.Esp
			// India: dd-mmm-yyyy hh:mm:ss IST
			date: function (strDate) {
				var match = /^(\d?\d)\W+(\w{3,}\.?)\W+(\d{2,})/i.exec(strDate);
				if (!match) return strDate;
				var retVal = [match[1], match[2], getFullYear(match[3])].join(" ");
				var date = Date.parse(retVal);
				// check for Summer Time by EU rules (excluding the duplicated hour before 1 am)
				if (date >= (getLastSunday(parseInt(getFullYear(match[3]),10), 2 /* March */)
								+ MS_PER_HOUR)
						&& date < getLastSunday(parseInt(getFullYear(match[3]),10), 9 /* October */)) {
					this.zones.Paris = this.zones["H.Esp"] = "+2";
				}
				return retVal;
			},
			time: function (strTimeWithZone) {
				var t = strTimeWithZone, tz = this.zones;
				for (var z in tz) t = t.replace(z, "GMT" + tz[z]);
				return t;
			},
			zones: {UTC: "", AEST: "+10", AEDT: "+11", CEST: "+2", CEDT: "+2", CET: "+1", Paris: "+1",
					IST: "+5:30", BST: "+1", WET: "", "H.Esp": "+1"}
		},
		{ re: /^(cgi\d*|www)\.ebay\.(at|de|ch)$/i,
			// Austria, Germany, Switzerland: dd.mm.yy hh:mm:ss MEZ|MESZ
			date: function (strDate) {
				var match = /^(\d?\d)\W+(\d?\d)\W+(\d{2,})/i.exec(strDate);
				return (match ? (new Date(getFullYear(match[3]), match[2] - 1, match[1])).toDateString()
						: strDate);
			},
			time: function (strTimeWithZone) { return strTimeWithZone.replace("MESZ", "GMT+2")
					.replace("MEZ", "GMT+1"); }
		},
		{ re: /((^(cgi\d*|www)\.ebay\.(pl|se))|tw\.ebay\.com)$/i,
			// Poland, Sweden: yyyy-mm-dd hh:mm:ss CEST|CEDT
			// Taiwan: yyyy.mm.dd hh:mm:ss, TW
			date: function (strDate) {
				var match = /^(\d{2,})\W+(\d?\d)\W+(\d?\d)/i.exec(strDate);
				return (match ? (new Date(getFullYear(match[1]), match[2] - 1, match[3])).toDateString()
						: strDate);
			},
			time: function (strTimeWithZone) { return strTimeWithZone.replace("CEST", "GMT+2")
					.replace("CEDT", "GMT+2").replace("CET", "GMT+1").replace(/,\s+TW\s*$/i, " GMT+8"); }
		},
		{ re: /^(cgi\d*|www)\.ebay\.(com\.(my|sg)|ph)$/i,
			// Malaysia, Philippines, Singapore: dd-mm-yyyy hh:mm:ss AM|PM MYT|PHT|SGT
			date: function (strDate) {
				var match = /^(\d?\d)\W+(\d?\d)\W+(\d{2,})/i.exec(strDate);
				return (match ? (new Date(getFullYear(match[3]), match[2] - 1, match[1])).toDateString()
						: strDate);
			},
			time: function (strTimeWithZone) {
				return strTimeWithZone.replace(/(\d?\d)(\W+\d\d\W+\d\d)\s+(am|pm)\s+(MYT|PHT|SGT)/i,
						function (s, hh, mmss, ap, tz) {
							return (parseInt(hh,10) + (/am/i.test(ap) ? 0 : 12)) + mmss + " GMT"
									+ this.zones[tz.toUpperCase()];
						});
			},
			zones: {MYT: "+8", PHT: "+8", SGT: "+8"}
		},
		{ re: /^(cgi\d*|www)\.ebay\.com\.hk$/i,
			// Hong Kong: yyyy-mm-dd hh:mm:ss AM|PM HKT
			date: function (strDate) {
				var match = /^(\d{2,})\W+(\d?\d)\W+(\d?\d)/i.exec(strDate);
				return (match ? (new Date(getFullYear(match[1]), match[2] - 1, match[3])).toDateString()
						: strDate);
			},
			time: function (strTimeWithZone) {
				return strTimeWithZone.replace(/(\d?\d)(\W+\d\d\W+\d\d)\s+(am|pm)\s+HKT/i,
						function (s, hh, mmss, ap) {
							return (parseInt(hh,10) + (/am/i.test(ap) ? 0 : 12)) + mmss + " GMT+8";
						});
			}
		},
		{ re: /^(cgi\d*|www)\.ebay\.com\.cn$/i,
			// China: yyyy-mm-dd hh?mm?ss?
			date: function (strDate) {
				var match = /^(\d{2,})\W+(\d?\d)\W+(\d?\d)/i.exec(strDate);
				return (match ? (new Date(getFullYear(match[1]), match[2] - 1, match[3])).toDateString()
						: strDate);
			},
			time: function (strTimeWithZone) {
				var match = /(\d\d)[^0-9]+(\d\d)[^0-9]+(\d\d)/.exec(strTimeWithZone);
				return (match ? [match[1], match[2], match[3]].join(":") + " GMT+8" : strTimeWithZone);
			}
		}
	];
	
	// global variables
	var topTableCountdown = null;
	
	// utility functions
	function getFullYear (strYY) {
		if (("" + strYY).length >= 4 || ("" + strYY).length != 2) return strYY;
		var yyyy = parseInt((new Date()).getFullYear());
		return (Math.abs(yyyy - ("" + yyyy).replace(/..$/, strYY)) < 50
			? ("" + yyyy).replace(/..$/, strYY)
			: ("" + (yyyy + ((yyyy % 100 < 50) ? -100 : 100))).replace(/..$/, strYY)
		);
	};
	
	function getLastSunday (intYear, intMonth) {
		// first day of next month    Sun Mon Tue Wed Thu Fri Sat
		// getDay()                   0   1   2   3   4   5   6
		// days to subtract           7   1   2   3   4   5   6
		// ((getDay() + 6) % 7) + 1   7   1   2   3   4   5   6
		var firstDayOfNextMonth = new Date(intYear, intMonth + 1, 1);
		return firstDayOfNextMonth.valueOf()
				- MS_PER_HOUR * 24 * (((firstDayOfNextMonth.getDay() + 6) % 7) + 1);
	};
	
	function msToHMS (intMS) {
		if (isNaN(intMS)) return intMS;
		var s = Math.abs(Math.round(parseInt(intMS,10)/1000));
		var hms = ("0" + Math.floor(s/(3600*24))).replace(/^0*(\d{2})/, "$1") + ":";
		s = s % (3600 * 24)
		hms += ("0" + Math.floor(s/3600)).replace(/^0*(\d{2})/, "$1") + ":";
		s = s % 3600;
		hms += ("0" + Math.floor(s/60)).slice(-2) + ":";
		s = s % 60;
		return (intMS < 0 ? "-" : "") + hms + ("0" + s).slice(-2);
	};
	
	function createElement (strType) {
		try {
			return document.__proto__.createElement.call(document, strType);
		}
		catch (ex) {
			try {
				return document.wrappedJSObject.__proto__.createElement.call(document, strType);
			} catch (ex) {}
		}
		throw new Error("Unable to create element");
	};
	
	function isAncestorOf (elAncestor, elTest, blnMatchOnEqual) {
		try {
			if (elTest.isSameNode(elAncestor)) return (blnMatchOnEqual ? true : false);
			while (!elTest.isSameNode(elAncestor)) elTest = elTest.parentNode;
			return true;
		}
		catch (ex) {
			return false;
		}
	};
	
	function iframeOnLoad () {
		try {
			var doc = this.contentDocument, html, head, body, element;
			
			// get the basic elements, creating a basic page if necessary
			html = doc.documentElement || (doc.documentElement = (doc.getElementsByTagName("html")[0]
					|| doc.appendChild(doc.createElement("html"))));
			head = doc.getElementsByTagName("head")[0] || html.appendChild(doc.createElement("head")
					).appendChild(doc.createElement("title")).parentNode;
			body = doc.body || (doc.body = html.appendChild(doc.createElement("body")));
			
			// add the styling
			for (var sel in {margin: 0, border: 0, padding: 0}) html.style[sel] = body.style[sel] = 0;
			body.className = "ebay";
			for (var i = 0; i < document.styleSheets.length; i++) {
				element = document.styleSheets[i].ownerNode;
				if (element) head.appendChild(element.cloneNode(true));
			}
		} catch (ex) {}
	};
	
	// "real work" functions
	function initAuctionPage (objHeaders) {
		// calculate time offset
		var h = objHeaders || window.headers, timeOffset = 3000, accuracy = null,
				upgradeLiveHTTPHeaders = true;
		h = (typeof h == "object" && h);
		if (h && h.isFromCache) {
			return location.reload();
		}
		try {
			upgradeLiveHTTPHeaders = !(("responseStartTime" in h) && ("requestTime" in h));
			if (isNaN(Date.parse(h.responseHeaders.Date))) throw new Error();
			// server time is given by the Date header
			// local time is in between request time and response time (assume halfway between)
			// 	or fall back on 3 seconds before page processing
			if (h.responseStartTime > 0 && h.requestTime > 0) {	// works for all variable types
				timeOffset = Date.parse(h.responseHeaders.Date)
						- Math.round(h.responseStartTime/2 + h.requestTime/2);
				// Date header has only 1 second resolution
				accuracy = h.responseStartTime/2 - h.requestTime/2 + 1000;
			}
			else {
				timeOffset += Date.parse(h.responseHeaders.Date) - DOM_LOAD_TIME;
			}
		}
		catch (ex) {	// no headers object
			// try to get the relevant data using XMLHttpRequest, if we haven't already
			if (arguments.length == 0) {
				try {
					h = {responseHeaders: {}, requestTime: (new Date()).valueOf()};
					GM_xmlhttpRequest({
						method: "GET",
						url: location.href.toString().substring(0,
								location.href.toString().indexOf(location.pathname))
								+ "/aw-cgi/eBayISAPI.dll?TimeShow",
						onreadystatechange: function (result) {
							if (result.readyState == 3 && result.responseText)	{
								// request sent & (some) data received
								h.responseStartTime = h.responseStartTime || (new Date()).valueOf();
							}
							else if (result.readyState == 4)	{	// request complete
								try {
									h.responseHeaders.Date = /Date:\s*(.*?)$/m.exec(
											result.responseHeaders)[1];
								} catch (ex) {}
								initAuctionPage(h);
							}
						}
					});
					return;
				} catch (ex) {}	// no GM_xmlhttpRequest
			}
		}
		
		// find the auction end time element
		var endTimeNode = null, endTimeREMatch = null;
		try {
			var result = document.evaluate(XPATH_END_TIME_NODES, document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; endTimeNode = result.snapshotItem(i); i++) {
				if (endTimeREMatch = END_TIME_RE.exec((endTimeNode.textContent	// thanks DOM3
						|| endTimeNode.innerHTML || endTimeNode.nodeValue).replace(SPACE_RE, " "))) {
					while (endTimeNode && endTimeNode.nodeType != Node.ELEMENT_NODE
							&& endTimeNode.nodeType != Node.DOCUMENT_NODE) {
						endTimeNode = endTimeNode.parentNode;
					}
					break;
				}
			}
		} catch (ex) {}
		
		// create the countdown and prep in-place bidding
		if (endTimeREMatch) {
			topTableCountdown = endTimeNode.parentNode.insertBefore(createElement("strong"),
					endTimeNode.parentNode.firstChild);
			topTableCountdown.style.display = "block";
			topTableCountdown.style.fontSize = "larger !important";
			startCountdown(createCountdown(topTableCountdown, accuracy, upgradeLiveHTTPHeaders),
					timeOffset, endTimeREMatch[1], endTimeREMatch[4]);
		}
		activateInPlaceBidding();
	};
	
	function createCountdown (elContainer, intAccuracyMS, blnUpgrade) {
		// empty the container and add a class for user stylesheets
		while (elContainer.firstChild) elContainer.removeChild(elContainer.lastChild);
		elContainer.className = "ePreyCountdownContainer";
		
		// create the countdown element
		elContainer.txtCountdown = elContainer.appendChild(createElement("a"));
		elContainer.txtCountdown.className = "ePreyCountdown";
		elContainer.txtCountdown = elContainer.txtCountdown.appendChild(document.createTextNode(""));
		
		// create the accuracy element
		var elAcc = elContainer.appendChild(createElement("span"));
		elAcc.className = "ePreyAccuracyContainer";
		elAcc.style.fontSize = "smaller";
		elAcc.appendChild(document.createTextNode(" " + PLUS_MINUS + " "));
		elAcc = elAcc.appendChild(createElement("a"));
		elAcc.className = "ePreyAccuracy";
		elAcc.appendChild(document.createTextNode((intAccuracyMS ? msToHMS(intAccuracyMS)
				: "??:??:??")));
		if (blnUpgrade) {
			elAcc.appendChild(document.createTextNode(" *"));
			elAcc.setAttribute("title", UPGRADE_STR);
			elAcc.setAttribute("href", UPGRADE_URI);
			elAcc.setAttribute("target", "_blank");
		}
		else if (!intAccuracyMS) {
			elAcc.setAttribute("title", BAD_DATE_STR);
		}
		
		// return the container
		return elContainer;
	};
	
	function startCountdown (elContainer, intTimeOffsetMS, strEndDate, strEndTimeWithZone) {
		var endTime = strEndTimeWithZone.replace(/^[^0-9\s]?\d{2}[^0-9\s](\d{2})[^0-9\s](\d{2}).*$/,
				function(f,m,s){return Math.floor((new Date()).valueOf() / MS_PER_HOUR) * MS_PER_HOUR
				+ m * 60000 + s * 1000;});
		var localized = false;
		var temp;
		
		// try to localize the update function
		try {
			for (var i = 0; i < l10n.length; i++) {
				var local = l10n[i];
				if (local.re.test(location.hostname)) {
					temp = Date.parse(local.date(strEndDate) + " " + local.time(strEndTimeWithZone))
							- intTimeOffsetMS;
					if (localized = !isNaN(temp)) endTime = temp;
					break;
				}
			}
		} catch (ex) {}
		
		// attach the update function
		window.setInterval(function(){
			var rem = endTime - (new Date()).valueOf();
			if (!localized) rem = ((rem % MS_PER_HOUR) + MS_PER_HOUR) % MS_PER_HOUR;
			elContainer.txtCountdown.nodeValue =
					msToHMS(rem).replace((localized ? "??:" : /^-?\d+:/), "??:");
			elContainer.style.color = (rem < 0 ? "black" : "rgb("
					+ Math.min(255, Math.round(255 * Math.exp(-rem/(MS_PER_HOUR)))) + ",0,0)");
		}, 100);
	};
	
	function activateInPlaceBidding () {
		var form, elements, element, inPlace;
		
		// create "in-place" submit links
		for (var i = document.forms.length - 1; i >= 0; i--) {
			form = document.forms[i];
			elements = form.elements;
			
			// only work with bid submission forms
			if (BID_RE.test(form.action)) {
				for (var listener, j = elements.length - 1; j >= 0; j--) {
					element = elements[j];
					if (/^input:(submit|image)$/i.test(element.nodeName + ":" + element.type)) {
						inPlace = element.parentNode.insertBefore(createElement("span"),
								element.nextSibling);
						inPlace.className = "ePreyInPlace";
						inPlace.appendChild(document.createTextNode(" "));
						inPlace = inPlace.appendChild(createElement("a"));
						inPlace.appendChild(document.createTextNode("(in place)"));
						inPlace.style.fontSize = "smaller";
						inPlace.setAttribute("href", "#");
						inPlace.setAttribute("title", element.value.replace(/\s*\W*\s*$/,
								" (in place). Does not leave this page, but may break the back button."));
						listener = bidInPlaceWrapper(element);
						inPlace.addEventListener("click", listener, true);
						inPlace.addEventListener("DOMActivate", listener, true);
					}
				}
			}
		}
	};
	
	function bidInPlaceWrapper (elTarget) {
		return function(evt){return bidInPlace(evt, elTarget);};
	}
	
	function bidInPlace (evt, elTarget) {
		var form = elTarget.form, box = form, width, height, frame = createElement("iframe"),
				src = form.action, get = [], temp;
		
		frame.addEventListener("load", iframeOnLoad, true);
		
		// bubble up from subordinate elements and determine what size the frame should be
			// normal case
		if (/^t(head|foot|body)$/i.test(box.parentNode.nodeName)) box = box.parentNode;
		if (box.parentNode.nodeName.toLowerCase() == "table") box = box.parentNode;
		width = box.offsetWidth || 0;
		height = box.offsetHeight || 0;
		for (var i = box.childNodes.length - 1; i >= 0; i--) {
			width = Math.max(width,
					(box.childNodes[i].offsetLeft + box.childNodes[i].offsetWidth) || 0);
			height = Math.max(height,
					(box.childNodes[i].offsetTop + box.childNodes[i].offsetHeight) || 0);
		}
			// top table (limit height to just show form elements, with 20px reserved for a scrollbar)
		if (isAncestorOf(box, topTableCountdown)) {
			height = 0;
			for (var inputs = form.elements, i = 0; i < inputs.length; i++) {
				temp = [inputs[i].offsetParent, inputs[i].offsetTop + inputs[i].offsetHeight];
				while (isAncestorOf(box, temp[0])) {
					temp[1] += temp[0].offsetTop;
					temp[0] = temp[0].offsetParent;
				}
				height = Math.max(height, temp[1] + 20);
			}
		}
		
		// submit the form
		if (form.method == "get") {	// determine the src corresponding to the submission
			if (src.slice(-1) != "?") src += "?";
			for (var inputs = form.elements, i = 0; i < inputs.length; i++) {
				if (inputs[i].nodeName.toLowerCase() != "input"
						|| !/^(submit|reset|image)$/i.test(inputs[i].type)
						|| inputs[i].isSameNode(elTarget)) {
					get.push(encodeURIComponent(inputs[i].name) + "="
							+ encodeURIComponent(inputs[i].value));
				}
			}
			try {
				frame.contentWindow.location.replace(src + get.join("&"));
			}
			catch (ex) {
				frame.src = src + get.join("&");
			}
		}
		else {	// fake it by cloning the form
			frame.className = "postSubmit";
			frame.addEventListener("load", function(){
				if (/(^|\s)postSubmit(\s|$)/.test(this.className)) {
					this.className = this.className.replace(/(^|\s)postSubmit(\s|$)/g, "$1$2");
					var newForm = this.contentDocument.body.appendChild(form.cloneNode(true));
					
					// make sure all elements are represented
					for (var inputs = form.elements, i = 0; i < inputs.length; i++) {
						if (!isAncestorOf(form, inputs[i])) {
							newForm.appendChild(inputs[i].cloneNode(true));
						}
					}
					
					// submit
					newForm.appendChild(elTarget.cloneNode(true)).click();
				}
			}, false);
			try {
				frame.contentWindow.location.reload();
			}
			catch (ex) {
				frame.src = "about:blank";
			}
		}
		
		// style and place the frame
		temp = {position: "absolute", backgroundColor: "white",
				width: Math.max(width, 100) + "px", height: Math.max(height, 50) + "px",
				margin: 0, border: 0, padding: 0};
		for (var sel in temp) try { frame.style[sel] = temp[sel]; } catch (ex) {}
		box.parentNode.insertBefore(frame, box);
		
		// cancel the event
		evt.preventDefault();
		evt.stopPropagation();
		return false;
	};
	
	// activate based on the page location
	//if (/\/aw-cgi\/eBayISAPI\.dll\?TimeShow/i.test(location.href)) {}
	if (/^https?:\/\/[^\/]+\.ebay\..+\/(viItem\?|.*ViewItem)/i.test(location.href)) {
		window.addEventListener("load", function(){initAuctionPage();}, true);
	}
})();

