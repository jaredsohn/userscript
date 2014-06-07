// Bug Me Not
// version 1.0
// 2005-06-22
// Copyright (c) 2005, Reify
//
// --------------------------------------------------------------------
//
// This user script retrieves website login information
// from BugMeNot.com to help you bypass compulsory registration.
// If you use this, you are subject to the terms listed here:
// http://bugmenot.com/termsofuse.php
//
// To install for Internet Explorer, you need Turnabout:
// http://www.reifysoft.com/turnabout.php
// See instructions for using Turnabout here:
// http://www.reifysoft.com/turnabout.php?p=u
//
// To install for Firefox, you need Greasemonkey:
// http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bug Me Not
// @namespace     http://www.reifysoft.com/?scr=BugMeNot
// @description   Bypass required registration using Bug Me Not
// @include       *
// ==/UserScript==

var allInputs = null;
var retrievals = 0;	// new logins gotten from the current page (i.e. reset on every page load)
var bmnView = "http://bugmenot.com/view.php";
var bmnUri = bmnView + "?url=" + location.href;
var bmnHomeUri = "http://bugmenot.com/";
var DEBUG = false;
var BLUR_TIMEOUT = 150;	// ms between a field losing focus and checking to see if any other of our fields has focus. If this is too low, the menu won't work because it will get display: none and its onclick won't fire.
var bmnWrappers = new Object();

var Style =
{
	menuLink:
	{
		border: "none",
		backgroundColor: "#fff",
		color: "#000",

		display: "block",
		padding: "2px",
		margin: "0",
		width: "12em",

		fontSize: "8pt",
		fontWeight: "normal",
		textDecoration: "none"
	},

	menuLinkHover:
	{
		backgroundColor: "#316AC5",
		color: "#fff"
	},

	menuLinkWrapper:
	{
		textAlign: "left",

		padding: "1px",
		margin: 0
	},

	bmnWrapper:
	{
		display: "none",
		fontFamily: "tahoma, verdana, arial, sans-serif",
		whiteSpace: "nowrap",

		position: "absolute",
		zIndex: 1000,

		padding: "2px",
		border: "1px solid #ACA899",
		backgroundColor: "#fff",

		opacity: "0.9",
		filter: "alpha(opacity=90)"
	}
};

function copyProperties(to, from)
{
	for (var i in from) to[i] = from[i];
}

function main()
{
	processPasswordFields();
}

function getBmnWrapper(pwFieldIndex)
{
	return document.getElementById("reify-bugmenot-bmnWrapper" + pwFieldIndex);
}

function processPasswordFields()
{
	allInputs = document.getElementsByTagName("input");
	var bmnContainer = document.createElement("div");
	bmnContainer.id = "reify-bugmenot-container";

	var bodyEl = document.getElementsByTagName("body")[0];
	if (!bodyEl) return;

	for (var i = 0; i < allInputs.length; i++)
	{
		var pwField = allInputs[i];
		if (!(pwField.type && pwField.type.toLowerCase() == "password"))
			continue;

		var previousTextFieldInd = getPreviousTextField(i);
		if (previousTextFieldInd == -1) { if (DEBUG) GM_log("Couldn't find text field before password input " + i + "."); continue; }

		var usernameField = allInputs[previousTextFieldInd];
		usernameField.usernameInputIndex = previousTextFieldInd;
		usernameField.passwordInputIndex = i;
		Utility.addEventHandler(usernameField, "focus", usernameField_onfocus);
		Utility.addEventHandler(usernameField, "blur", usernameField_onblur);

		Utility.addEventHandler(pwField, "focus", pwField_onfocus);
		Utility.addEventHandler(pwField, "blur", pwField_onblur);
		pwField.usernameInputIndex = previousTextFieldInd;
		pwField.passwordInputIndex = i;

		var menuLinkProperties =
		{
			passwordInputIndex: i,
			usernameInputIndex: previousTextFieldInd,
			onmouseover: menuLink_onmouseover,
			onmouseout: menuLink_onmouseout
		};

		var getLoginLink = menuLink(bmnUri, "Get login from Bug Me Not", "Get a login from Bug Me Not", getLoginLink_onclick, menuLinkProperties, Style.menuLink);
		var getLoginLinkWrapper = menuEntry(getLoginLink, Style.menuLinkWrapper);

		var fullFormLink = menuLink(bmnUri, "More options", "See more options for getting logins from BugMeNot.com (opens a new window)", openMenuLink_onclick, menuLinkProperties, Style.menuLink);
		var fullFormLinkWrapper = menuEntry(fullFormLink, Style.menuLinkWrapper);

		var visitBmnLink = menuLink(bmnHomeUri, "Visit Bug Me Not", "Go to the Bug Me Not home page (opens a new window)", openMenuLink_onclick, menuLinkProperties, Style.menuLink);
		var visitBmnLinkWrapper = menuEntry(visitBmnLink, Style.menuLinkWrapper);

		var bmnWrapper = document.createElement("div");
		bmnWrapper.id = "reify-bugmenot-bmnWrapper" + i;
		bmnWrapper.className = "reify-bugmenot-bmnWrapper";
		bmnWrapper.appendChild(getLoginLinkWrapper);
		bmnWrapper.appendChild(fullFormLinkWrapper);
		bmnWrapper.appendChild(visitBmnLinkWrapper);
		copyProperties(bmnWrapper.style, Style.bmnWrapper);

		bmnContainer.appendChild(bmnWrapper);
	}

	if (bmnContainer.hasChildNodes())
		bodyEl.appendChild(bmnContainer);
}

function menuEntry(linkEl, styleObj)
{
	var p = document.createElement("p");
	copyProperties(p.style, styleObj);
	p.appendChild(linkEl);
	return p;
}

function menuLink(href, text, title, onclick, moreProperties, styleObj)
{
	var newMenuLink = document.createElement("a");
	newMenuLink.href = href;
	newMenuLink.appendChild(document.createTextNode(text));
	newMenuLink.title = title;
	newMenuLink.onclick = onclick;

	copyProperties(newMenuLink, moreProperties);
	copyProperties(newMenuLink.style, styleObj);

	return newMenuLink;
}

function menuLink_onmouseover()
{
	copyProperties(this.style, Style.menuLinkHover);
}

function menuLink_onmouseout()
{
	copyProperties(this.style, Style.menuLink);
}

function getLoginLink_onclick()
{
	if
	(
		(
			allInputs[this.passwordInputIndex].value.length == 0 &&
			allInputs[this.usernameInputIndex].value.length == 0
		) ||
		confirm("Overwrite the current login entry?")
	)
		getLogin(bmnUri, this.usernameInputIndex, this.passwordInputIndex);

	this.onmouseout();
	return false;
}

function openMenuLink_onclick()
{
	window.open(this.href);
	this.onmouseout();
	return false;
}


function usernameField_onfocus()
{
	var target = window.event ? window.event.srcElement : this;

	target.hasFocus = true;
	showHideBmnWrapper(target, allInputs[target.passwordInputIndex], true);
}

function usernameField_onblur()
{
	var target = window.event ? window.event.srcElement : this;

	target.hasFocus = false;
	var fRef = hideIfNoFocus(allInputs[target.usernameInputIndex], allInputs[target.passwordInputIndex]);
	setTimeout(fRef, BLUR_TIMEOUT);	// race condition: wait for other element's onfocus
}

function pwField_onfocus()
{
	var target = window.event ? window.event.srcElement : this;

	target.hasFocus = true;
	showHideBmnWrapper(allInputs[target.usernameInputIndex], target, true);
}

function pwField_onblur()
{
	var target = window.event ? window.event.srcElement : this;

	target.hasFocus = false;
	var fRef = hideIfNoFocus(allInputs[target.usernameInputIndex], allInputs[target.passwordInputIndex]);
	setTimeout(fRef, BLUR_TIMEOUT);	// race condition: wait for other element's onfocus
}

function hideIfNoFocus(usernameField, pwField)
{
	return (function()
	{
		if (!(usernameField.hasFocus || pwField.hasFocus))
			showHideBmnWrapper(usernameField, pwField, false);
	});
}

function showHideBmnWrapper(usernameField, pwField, show)
{
	var bmnWrapper = getBmnWrapper(pwField.passwordInputIndex);

	if (show)
	{
		bmnWrapper.style.display = "block";
		positionBmnWrapper(bmnWrapper, usernameField, pwField);
	}
	else
	{
		bmnWrapper.style.display = "none";

		// Menu links may not get onmouseout event, so they get
		// stuck with the hover style unless we do this.
		var menuLinks = bmnWrapper.getElementsByTagName("div");
		for (var i = 0; i < menuLinks.length; i++)
			copyProperties(menuLinks[i].style, Style.menuLink);
	}
}

function positionBmnWrapper(bmnWrapper, usernameField, pwField)
{
	var pwLeft = Utility.elementLeft(pwField);

	if (pwLeft + pwField.offsetWidth + bmnWrapper.offsetWidth + Utility.scrollLeft() + 10 < Utility.viewportWidth())
	{
		bmnWrapper.style.left = (pwLeft + pwField.offsetWidth + 2) + "px";
		bmnWrapper.style.top = Utility.elementTop(pwField) + "px";
	}
	else
	{
		bmnWrapper.style.left = (Utility.elementLeft(usernameField) - bmnWrapper.offsetWidth - 2) + "px";
		bmnWrapper.style.top = Utility.elementTop(usernameField) + "px";
	}
}

// We have a uri param rather than assuming it's for the current
// page so this function can be modular and potentially used
// for pages other than the current one.
function getLogin(uri, usernameInputIndex, passwordInputIndex)
{
	var usernameField = allInputs[usernameInputIndex];
	var pwField = allInputs[passwordInputIndex];
	waitOrRestoreFields(usernameField, pwField, false);

	var hostUri = location.hostname;
	var firstAttempt = retrievals == 0;
	var submitData = "submit=This+login+didn%27t+work&num=" + retrievals + "&site=" + encodeURI(location.hostname);

	GM_xmlhttpRequest({
		method: firstAttempt ? "get" : "post",
		headers: firstAttempt ? null : {"Content-type": "application/x-www-form-urlencoded"},
		data: firstAttempt ? null : submitData,
		url: firstAttempt ? uri : bmnView,
		onload: function(responseDetails)
		{
			waitOrRestoreFields(usernameField, pwField, true);
			var doc = textToXml(responseDetails.responseText);
			if (!(doc && doc.documentElement))
				return Errors.say(Errors.malformedResponse);

			var accountInfo = doc.documentElement.getElementsByTagName("dd")[0];
			if (!(accountInfo && accountInfo.childNodes.length > 2))
				return Errors.say(Errors.noLoginAvailable);

			usernameField.value = accountInfo.childNodes[0].nodeValue;
			pwField.value = accountInfo.childNodes[2].nodeValue;
			retrievals++;
		},
		onerror: function(responseDetails)
		{
			waitOrRestoreFields(usernameField, pwField, true);
			Errors.say(Errors.xmlHttpFailure);
		}
	});
}

function waitOrRestoreFields(usernameField, pwField, restore)
{
	document.documentElement.style.cursor = restore ? "default" : "progress";
	usernameField.value = restore ? "" : "Loading...";
	usernameField.disabled = !restore;
	pwField.disabled = !restore;
}

function getPreviousTextField(pwFieldIndex)
{
	for (var i = pwFieldIndex; i >= 0 && i < allInputs.length; i--)
		if (allInputs[i].type && allInputs[i].type.toLowerCase() == "text")
			return i;

	return -1;
}

function textToXml(t)
{
	try
	{
		if (window.ActiveXObject)
		{
			var dp = new ActiveXObject("Microsoft.XMLDOM");
			dp.async = false;
			dp.loadXML(t);
			return dp;
		}
		else if (typeof DOMParser != undefined)
		{
			var dp = new DOMParser();
			return dp.parseFromString(t, "text/xml");
		}
		else
		{
			return null;
		}
	}
	catch (e)
	{
		return null;
	}
}

var Errors =
{
	noLoginAvailable: "Sorry, but BugMeNot.com had no login available for this site.\nIf you're feeling helpful, you can click \"More options\" to provide a login for future visitors.",
	malformedResponse: "Sorry, but I couldn't understand the response from BugMeNot.com.\nThe service might be unavailable.",
	xmlHttpFailure: "There was an error in contacting BugMeNot.com.\nThe server may be unavailable or having internal errors.",

	say: function(msg) { alert(msg); return false; }
};


var Utility =
{
	elementTop: function(el) { return Utility.recursiveOffset(el, "offsetTop"); },
	elementLeft: function(el) { return Utility.recursiveOffset(el, "offsetLeft"); },

	recursiveOffset: function(el, prop)
	{
		var dist = 0;
		while (el.offsetParent)
		{
			dist += el[prop];
			el = el.offsetParent;
		}
		return dist;
	},

	viewportWidth: function() { return Utility.detectAndUseAppropriateObj("clientWidth"); },
	viewportHeight: function() { return Utility.detectAndUseAppropriateObj("clientHeight"); },
	scrollLeft: function() { return Utility.detectAndUseAppropriateObj("scrollLeft"); },
	scrollTop: function() { return Utility.detectAndUseAppropriateObj("scrollTop"); },

	// Thanks to PPK of Quirksmode for this detection scheme.
	detectAndUseAppropriateObj: function(prop)
	{
		if (document.documentElement && document.documentElement[prop])
			return document.documentElement[prop];
		else if (document.body && document.body[prop])
			return document.body[prop];
		else
			return -1;
	},

	addEventHandler: function(target, eventName, eventHandler)
	{
		if (target.addEventListener)
			target.addEventListener(eventName, eventHandler, false);
		else if (target.attachEvent)
			target.attachEvent("on" + eventName, eventHandler);
	}
};


main();