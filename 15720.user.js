// Google Traffic Estimator Extended user script
// version 0.1
// 2007-11-29
// Copyright (c) 2007, Arjan Snaterse
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Traffic Estimator Extended", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Traffic Estimator Extended
// @namespace     http://arjansnaterse.nl/google-traffic-estimator-extended-greasemonkey-script
// @description   Adds links to SERPS of keywords in the Google Traffic Estimator
// @include       https://adwords.google.*/select/*
// ==/UserScript==

const POST_INTERCEPT = "PostIntercept";
var intercept_on;
var is_modified = false;

interceptor_setup();
addLinks();

function getReportTable() {
	var tables = document.getElementsByTagName("table");

	for(var i=0; i<tables.length; i++) {
		if(tables[i].className.toLowerCase() == "report")
			return tables[i];
	}

	return null;
}

function addLinks() {
	var table = getReportTable();
	if(table != null) {
		var rows = table.getElementsByTagName("tr");

		// go through all rows. First row is header, last 3 rows are the footer
		for(var i=1; i<(rows.length-2); i++) {
			// check if node is an ELEMENT_NODE (1) (whitespace is a TEXT_NODE (3)).
			// check if parentNode is container table and not an inner table
			if(rows[i].nodeType == 1 && rows[i].parentNode.parentNode.className.toLowerCase() == "report") { 
				var keyword = rows[i].firstChild.innerHTML;
				keyword = keyword.replace(/^\s+|\s+$/g, ""); // trim keyword
				keywordEncoded = keyword.replace("[", "");
				keywordEncoded = keywordEncoded.replace("]", "");
				keywordEncoded = URLEncode(keywordEncoded);

				var url = "http://www.google.com/search?q=" + keywordEncoded + "&pws=0";

				if(GM_getValue("language") && GM_getValue("language") != "")
					url += "&hl=" + GM_getValue("language");
				if(GM_getValue("country") && GM_getValue("country") != "" && GM_getValue("country") != "*")
					url += "&gl=" + GM_getValue("country");

				var link = document.createElement("a");
				link.setAttribute("href", url);
				link.setAttribute("target", "_blank");
				link.innerHTML = keyword;

				rows[i].firstChild.innerHTML = "";
				rows[i].firstChild.appendChild(link);
			}
		}
	}
}


function getDataAsArray(data, parentEl) {
	if(typeof(data) != "undefined") {
		var obj = this.receive.getElementsByTagName(data);

		var tmpArray = new Array();

		for(var k = 0; k < obj.length; k++) {
			tmpArray[k] = new Array();
			for(var i = 0; i < obj[k].childNodes.length; i++) {
				if(obj[k].childNodes[i].nodeType != 3) {
					tmpArray[k][obj[k].childNodes[i].nodeName] = null;
					for(var j = 0; j < obj[k].childNodes[i].childNodes.length; j++) {
						if(obj[k].childNodes[i].childNodes[j].nodeType == 3 || obj[k].childNodes[i].childNodes[j].nodeType == 4) {
							tmpArray[k][obj[k].childNodes[i].nodeName] = obj[k].childNodes[i].childNodes[j].nodeValue;
						}
					}
				}
			}
		}
		return tmpArray;
	}
}


function interceptor_setup() {
    // nothing to do if no forms on the page
    if (document.forms.length == 0)
        return;

    if (typeof GM_getValue != "undefined") {
        intercept_on = GM_getValue(POST_INTERCEPT, true);
    } else {
        intercept_on = true;
    }

    // override submit handling
    unsafeWindow.HTMLFormElement.prototype.real_submit = unsafeWindow.HTMLFormElement.prototype.submit;
    unsafeWindow.HTMLFormElement.prototype.submit = interceptor;

    window.addEventListener("submit", function(e) {
                                interceptor(e);
                                e.preventDefault();
                            }, false);
}

// interceptor: called in place of form.submit()
// or as a result of submit handler on window (arg: event)
function interceptor(e) {
    var target = e ? e.target : this;
    //GM_log("interceptor: target = <" + target + ">");

    var frm;
    // target could be an INPUT element
    if (target.tagName.toLowerCase() == "input") {
        frm = target.form;
    } else {
        frm = target;
    }
    if (!frm || !frm.tagName || frm.tagName.toLowerCase() != "form") {
        GM_log("interceptor: found <" + frm + (frm.tagName ? "(" + frm.tagName + ")" : "") + "> instead of form; investigate further!!!");
    }

    if (!interceptor_onsubmit(frm))
        return false;

    //alert("interceptor: intercept_on = " + intercept_on);
    if (intercept_on) {
		saveFormSettings(frm);
		frm.submit();
        return true;
    } else {
        frm.real_submit();
    }
}

// if any form defined an onsubmit handler, it was saved earlier.
// call it now
function interceptor_onsubmit(f) {
    var rc = true;
    if (f.real_onsubmit) {
        rc = f.real_onsubmit();
    }
    return rc;
}

function saveFormSettings(frm) {
	for(var i=0; i<frm.elements.length; i++) {
		if(frm.elements[i].name.toLowerCase() == "language") {
			GM_setValue("language", frm.elements[i].value);
			break;
		}
	}

	if(document.getElementById("countrySel")) {
		GM_setValue("country", document.getElementById("countrySel").options[0].value);
	}
}

function URLEncode(plaintext) {
	// The Javascript escape and unescape functions do not correspond
	// with what browsers actually do...
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
	    if (ch == " ") {
		    encoded += "+";				// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
		    encoded += ch;
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	} // for

	return encoded;
}