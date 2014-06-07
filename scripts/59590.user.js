// ==UserScript==

// @name           BUGMENOT Auto-Registration Plus!

// @namespace      Juampi_Mix

// @namespace      English_Translated_by..h3l0-(aka... Paulk) 

// @description    Checks for login info in BugMeNot Database, saving the need to Register on most Websites. Click on the Username Field, select the 'Check for Usernames & Passwords' AJAX-TOOLTIP. Finally select the Password Field & the Password gets Auto-Filled.

// @include        http://*

// @include        https://*

// @exclude        *bugmenot.com*

// @exclude        http://www.rememberthemilk.com/*

// @exclude        http://www.facebook.com/*

// @exclude        http://brightkite.com/*

// @exclude        https://www.google.com/*

// @exclude        http://www.stumbleupon.com/*

// @exclude        http://twitter.com/*

// @exclude        http://login.live.com/*

// @exclude        http://www.bebo.com/*

// @exclude        https://secure.bebo.com/*

// @exclude        https://cisco.netacad.net/*

// @exclude        https://cisco.com/*

// @exclude        https://www.getdropbox.com/*

// @exclude        http://www.box.net/*

// @exclude        https://www.mesh.com/*

// @exclude        https://lastpass.com/*

// @exclude        https://www.xmarks.com/*

// @exclude        http://aws.amazon.com/*

// @exclude        http://fireeagle.yahoo.net/*

// @exclude        http://www.yahoo.com/*

// @exclude        http://www.yahoo.co.uk/*

// @exclude        http://userscripts.org/*    

// @version        3.1

// @url            http://userscripts.org/scripts/source/59590.user.js

// ==/UserScript==

var retrievals = 0;
var BLUR_TIMEOUT = 750;
//phoneRegex = /(?:http://)(.*)/.*?/;
//doma= location.href.match( phoneRegex );
myString = location.href;
domainnameRE = new RegExp("(?:http://)(.*?)/.*?", "i");
domainname = myString.match(domainnameRE)
domainname = domainname[1];
//alert (domainname);
var allInputs = null;
var bmnView = "";
var bmnUri = bmnView + "/" + domainname;
var bmnHomeUri = "/";
var DEBUG = false;
var bmnWrappers = new Object();
var Style = {
	menuLink: {
		border: "none",
		backgroundColor: "cornflowerblue", 
		colour: "black",
		display: "Block",
		padding: "2px",
		margin: "0px",
		width: "15em",
		fontSize: "8pt",
		fontWeight: "normal",
		textDecoration: "none"
	},
	menuLinkHover: {
		backgroundColor: "aqua",
		color: "black"
	},
	menuLinkWrapper: {
		textAlign: "left",
		padding: "1px",
		margin: 0
	},
	bmnWrapper: {
		display: "none",
		fontFamily: "tahoma, verdana, arial, sans-serif",
		whiteSpace: "nowrap",
		position: "absolute",
		zIndex: 1000,
		padding: "2px",
		border: "1px solid navy",
		backgroundColor: "midnightblue",
		opacity: "0.9",
		filter: "alpha(opacity=90)"
	}
};

function copyProperties(to, from) {
	for (var i in from) {
		to[i] = from[i];
	}
}

function main() {
	processPasswordFields();
}

function getBmnWrapper(pwFieldIndex) {
	return document.getElementById("reify-bugmenot-bmnWrapper" +
		pwFieldIndex);
}

function processPasswordFields() {
	var allInputs = document.getElementsByTagName("input");
	//allInputslength = allInputs.length;
	var bmnContainer = document.createElement("div");
	 bmnContainer.id = "reify-bugmenot-container";
	var bodyEl = document.getElementsByTagName("body")[0];
	if (!bodyEl) return;
	for (var i = 0; i < allInputs.length; i++) {
		var pwField = allInputs[i];
		//GM_log (allInputs[i].type.toLowerCase());
		if (!(pwField.type && pwField.type.toLowerCase() == "password")) {
			continue;
		}
		var previousTextFieldInd = getPreviousTextField(i,allInputs);
		if (previousTextFieldInd == -1) {
			if (DEBUG) {
			GM_log("Could not find Text Field before Password " +
			   i + ".");
			continue;
			}
		}
		var usernameField = allInputs[previousTextFieldInd];
		usernameField.setAttribute('usernameInputIndex',
					   previousTextFieldInd);
		usernameField.setAttribute('passwordInputIndex', i);
		Utility.addEventHandler(usernameField, "focus",
					usernameField_onfocus);
		Utility.addEventHandler(usernameField, "blur",
					usernameField_onblur);
		Utility.addEventHandler(pwField, "focus", pwField_onfocus);
		Utility.addEventHandler(pwField, "blur", pwField_onblur);
		pwField.setAttribute('usernameInputIndex', previousTextFieldInd);
		pwField.setAttribute('passwordInputIndex', i);
		var getLoginLink = menuLink(bmnUri, "Check for Usernames & Passwords",
			"In the BugMeNot Database",
			getLoginLink_onclick, Style.menuLink, previousTextFieldInd,
			i, menuLink_onmouseover, menuLink_onmouseout);
		var getLoginLinkWrapper = menuEntry(getLoginLink,
			Style.menuLinkWrapper);
		var fullFormLink = menuLink(bmnUri, "More Options",
			"View a complete list of User Info at BugMeNot.com " +
			"(New Window) ", openMenuLink_onclick,
			Style.menuLink, previousTextFieldInd, i,
			menuLink_onmouseover, menuLink_onmouseout);
		var fullFormLinkWrapper = menuEntry(fullFormLink,
			Style.menuLinkWrapper);
		var visitBmnLink = menuLink(bmnHomeUri, "Visit BugMeNot.com",
			"Go to the BugMeNot Homepage (New Window)",
			openMenuLink_onclick, Style.menuLink, previousTextFieldInd,
			i, menuLink_onmouseover, menuLink_onmouseout);
		var visitBmnLinkWrapper = menuEntry(visitBmnLink,
			Style.menuLinkWrapper);
		var bmnWrapper = document.createElement("div");
		bmnWrapper.id = "reify-bugmenot-bmnWrapper" + i;
		bmnWrapper.className = "reify-bugmenot-bmnWrapper";
		bmnWrapper.appendChild(getLoginLinkWrapper);
		bmnWrapper.appendChild(fullFormLinkWrapper);
		bmnWrapper.appendChild(visitBmnLinkWrapper);
		copyProperties(bmnWrapper.style, Style.bmnWrapper);
		bmnContainer.appendChild(bmnWrapper);
	}
	if (bmnContainer.hasChildNodes()) {
		bodyEl.appendChild(bmnContainer);
	}
}

function menuEntry(linkEl, styleObj) {
	var p = document.createElement("p");
	copyProperties(p.style, styleObj);	
	p.appendChild(linkEl); 
	return p;
}

function menuLink(href, text, title, onclick, styleObj,
	usernameInputIndex, passwordInputIndex, onmouseover, onmouseout) {
	var newMenuLink = document.createElement("a");
	newMenuLink.href = href;
	newMenuLink.appendChild(document.createTextNode(text));
	newMenuLink.title = title;
	newMenuLink.setAttribute('usernameInputIndex', usernameInputIndex);
	newMenuLink.setAttribute('passwordInputIndex', passwordInputIndex);
	Utility.addEventHandler(newMenuLink, "click", onclick);
	Utility.addEventHandler(newMenuLink, "mouseover", onmouseover);
	Utility.addEventHandler(newMenuLink, "mouseout", onmouseout);
	copyProperties(newMenuLink.style, styleObj);
	return newMenuLink;
}

function menuLink_onmouseover(event) {
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	copyProperties(target.style, Style.menuLinkHover);
}

function menuLink_onmouseout(event) {
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	copyProperties(target.style, Style.menuLink);
}

function getLoginLink_onclick(event) {
	var allInputs = document.getElementsByTagName("input");
{
		getLogin(bmnUri, this.getAttribute('usernameInputIndex'),
			this.getAttribute('passwordInputIndex'));
	}
	menuLink_onmouseout({currentTarget: this});
	event.preventDefault && event.preventDefault( );
	return false;
}

function openMenuLink_onclick(event) {
	if (typeof GM_openInTab != 'undefined') {
		GM_openInTab(this.href);
	} else {
		window.open(this.href);
	}
	menuLink_onmouseout({currentTarget: this});
	event.preventDefault && event.preventDefault( );
	return false;
}

function usernameField_onfocus(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', true);
	showHideBmnWrapper(target, allInputs[target.
getAttribute('passwordInputIndex')], true);
}

function usernameField_onblur(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event || this;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', false);
	var fRef = hideIfNoFocus(allInputs[target.
getAttribute('usernameInputIndex')],
		allInputs[target.getAttribute('passwordInputIndex')]);
	setTimeout(fRef, BLUR_TIMEOUT);
}

function pwField_onfocus(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', true);
	showHideBmnWrapper(allInputs[target.getAttribute('usernameInputIndex')],
			target, true);
}

function pwField_onblur(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', false);
	var fRef = hideIfNoFocus(allInputs[target.
getAttribute('usernameInputIndex')],
		allInputs[target.getAttribute('passwordInputIndex')]);
	setTimeout(fRef, BLUR_TIMEOUT);

}

function hideIfNoFocus(usernameField, pwField) {
	return (function( ) {
		var bUsernameFocus = usernameField.getAttribute('hasFocus');
		if (typeof bUsernameFocus == 'string') {
			bUsernameFocus = (bUsernameFocus && bUsernameFocus != 'false');
		}
		var bPasswordFocus = pwField.getAttribute('hasFocus');
		if (typeof bPasswordFocus == 'string') {
			bPasswordFocus = (bPasswordFocus && bPasswordFocus != 'false');
		}
		if ((!bUsernameFocus) && (!bPasswordFocus)) {
			showHideBmnWrapper(usernameField, pwField, false);
		}
	});
}

function showHideBmnWrapper(usernameField, pwField, show) {
	var bmnWrapper = getBmnWrapper(pwField.
getAttribute('passwordInputIndex'));
	if (show) {
		bmnWrapper.style.display = "block";
		positionBmnWrapper(bmnWrapper, usernameField, pwField);
	} else {
		//GM_log('hiding bugmenot wrapper');
		bmnWrapper.style.display = "none";
		var menuLinks = bmnWrapper.getElementsByTagName("div");
		for (var i = 0; i < menuLinks.length; i++) {
			copyProperties(menuLinks[i].style, Style.menuLink);
		}
	}
}

function positionBmnWrapper(bmnWrapper, usernameField, pwField) {
	var pwLeft = Utility.elementLeft(pwField);
	if (pwLeft + pwField.offsetWidth + bmnWrapper.offsetWidth +
		Utility.scrollLeft( ) + 10 < Utility.viewportWidth( )) {
		bmnWrapper.style.left = (pwLeft + pwField.offsetWidth + 2) + "px";
		bmnWrapper.style.top = Utility.elementTop(pwField) + "px";
	} else {
		bmnWrapper.style.left = (Utility.elementLeft(usernameField) -
			bmnWrapper.offsetWidth - 2) + "px";
		bmnWrapper.style.top = Utility.elementTop(usernameField) + "px";
	}
}

function getLogin(uri, usernameInputIndex, passwordInputIndex) {
	var allInputs = document.getElementsByTagName("input");
	var usernameField = allInputs[usernameInputIndex];
	var pwField = allInputs[passwordInputIndex];
	waitOrRestoreFields(usernameField, pwField, false);
	var hostUri = location.hostname;
	var firstAttempt = retrievals == 0;
	var submitData = "submit=This+login+didn%27t+work&num=" + retrievals +
		"&site=" + encodeURI(location.hostname);
	GM_xmlhttpRequest({
		method: firstAttempt ? "get" : "post",
		headers: firstAttempt ? null :
			{"Content-type": "application/x-www-form-urlencoded"},
		data: firstAttempt ? null : submitData,
		url: firstAttempt ? uri : bmnView,
		onload: function(responseDetails) {
if (responseDetails.status == 200) {
			waitOrRestoreFields(usernameField, pwField, true); 
			decoded = decodeit(responseDetails.responseText);
			var doc = textToXml(decoded);
			 if (!(doc && doc.documentElement)) {
			  return Errors.say(Errors.malformedResponse);
			 }
			var accountInfo = doc.documentElement.getElementsByTagName("td")[0];
			if (!(accountInfo)) {
			return Errors.say(Errors.noLoginAvailable);
			}
			usernameField.value = accountInfo.childNodes[0].nodeValue;
			var pwsField = doc.documentElement.getElementsByTagName("td")[1];		
			pwField.value = pwsField.childNodes[0].nodeValue;
			retrievals++;
		}else{
			return Errors.say(Errors.xmlHttpFailure);
			}
		},
		onerror: function(responseDetails) {
			waitOrRestoreFields(usernameField, pwField, true);
			Errors.say(Errors.xmlHttpFailure);
		}
	});
}

function waitOrRestoreFields(usernameField, pwField, restore) {
	document.documentElement.style.cursor = restore ? "default" : "progress";
	usernameField.value = restore ? "" : "User Browsing...";
	//usernameField.disabled = !restore;
	//pwField.disabled = !restore;
}

function getPreviousTextField(pwFieldIndex,allInputs) {
	//var allInputs = document.getElementsByTagName("input");
	for (var i = pwFieldIndex; i >= 0 && i <allInputs.length; i--)
		if (allInputs[i].type && allInputs[i].type.toLowerCase( ) == "text")
			return i;
	return -1;
}

function decodeit(codedtext){ 
var regexkey = /var key = (.*?)\;/;
var match = regexkey.exec(codedtext);
if (match != null) {
var key = parseInt(match[1]);
} else {
	alert ("decryption key can not find the site change\nBugMeNot  ");
}
var codedtext = codedtext.replace(/<script>d\('(.*?)'\)\;<\/script>/gi, aaa);
//alert (codedtext);
return codedtext;
function aaa(str, strInput, offset, s){
	return d(strInput);
}

function decoder(data){
	var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1,o2,o3,h1,h2,h3,h4,bits,i=0,enc='';do{h1=b64.indexOf(data.charAt(i++));
		h2=b64.indexOf(data.charAt(i++));
		h3=b64.indexOf(data.charAt(i++));
		h4=b64.indexOf(data.charAt(i++));
		bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>16&0xff;o2=bits>>8&0xff;o3=bits&0xff;
		if(h3==64)enc+=String.fromCharCode(o1);
		else if(h4==64)enc+=String.fromCharCode(o1,o2);
			else enc+=String.fromCharCode(o1,o2,o3)}while(i<data.length);
			return enc;
			}

function d(strInput){
	strInput=decoder(strInput);
	var strOutput="";
	var intOffset=(key+112)/12;
	for(i=4;i<strInput.length;i++){
		thisLetter=strInput.charAt(i);
		thisCharCode=strInput.charCodeAt(i);
		newCharCode=thisCharCode-intOffset;
		strOutput+=String.fromCharCode(newCharCode)
		}
		return strOutput;
		}
}

function textToXml(t) {
	try {
		if (typeof DOMParser != undefined) {
			//t = toString(t);
			//var dp = new DOMParser( );
			//return dp.parseFromString(t, "text/xml");
var parser = new DOMParser();
//var t = t.replace(/<\?xml.*?\?>/g, ""); // strip <?xml ?> tag
//t = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<rando>" + t + "</rando>";
//t = t.replace(/&(?!\w*;)/g, "&");
//alert(t);
//alert(parser.parseFromString(t, "application/xml"));
return  parser.parseFromString(t, "application/xml");
		}
		else {
			return null;
		}
	}
	catch (e) {
		return null;
	}
}

var Errors = {
	noLoginAvailable: "Unfortunately, no Users for this Site exist. \n" +
		" If you want to contribute, please Register as a New User & click on \"More " +
		"options\" to share your Account info with other Grease'MONKIES' & 'BugMeNot Bookmarklet' Users that visit this Site.",
	malformedResponse: "Sorry, invalid Username & Password. \n " +
		"The BugMeNot Service may not be available.",
	siteBlocked: "Sorry, invalid Username & Password. \n" +
		"The BugMeNot Service may not be available.",		
	xmlHttpFailure: "There was an error connecting to BugMeNot. \n" +
		"Errors can occur for a number of reasons, When: \n" +
		" \n" +
                "Login details are incorrect, also BugMeNot actively Blocks a few High Level Sites, mainly for Security Reasons, Examples; Google, Microsoft, Cisco & Government Sites etc.\n" +
                " \n" +
                "SOLUTION: If the User info provided by BugMeNot isnt Valid. \n" +
                "Someone might have changed the Password. Click on 'More Options' to see \n" +
                "if someone added another User to this Site. \n" +
                " \n" +
                "You can also get this message if the Site has been blocked in the Database. \n" +
                "To find out, click on 'More Options' and check this Site \n" +
                "doesn't appear with the text: SITE BLOCKED. \n" +
                " \n" +
                "Another reason why this error may occur is because \n" +
                "no one has shared User Details for this Site yet. \n" +
                " \n" +
                "SOLUTION \n" +
                "Unfortunately the only solution is to Register \n" +
                "an Account for this Site.\n" +
                " \n" +
                "RECOMMENDATION \n" +
                "So nobody else has to Register a New Account. \n" +
                "You SHOULD/COULD share your newly Registered Temporary Details with BugMeNot. \n" +
                "Once you've create your New Account, click on 'More Options' & Add the User Details \n" +
                "to the BugMeNot Database. ",
	say: function(msg) { alert(msg); return false; }
};

var Utility = {
	elementTop: function(el) {
		return Utility.recursiveOffset(el, "offsetTop");
	},
	elementLeft: function(el) {
		return Utility.recursiveOffset(el, "offsetLeft");
	},
	recursiveOffset: function(el, prop) {
		var dist = 0;
		while (el.offsetParent)
		{
			dist += el[prop];
			el = el.offsetParent;
		}
		return dist;
	},
	viewportWidth: function( ) {
		return Utility.detectAndUseAppropriateObj("clientWidth");
	},
	viewportHeight: function( ) {
		return Utility.detectAndUseAppropriateObj("clientHeight");
	},
	scrollLeft: function( ) {
		return Utility.detectAndUseAppropriateObj("scrollLeft");
	},
	scrollTop: function( ) {
		return Utility.detectAndUseAppropriateObj("scrollTop");
	},
	detectAndUseAppropriateObj: function(prop) {
		if (document.documentElement && document.documentElement[prop]) {
			return document.documentElement[prop];
		}
		else if (document.body && document.body[prop]) {
			return document.body[prop];
		} else {
			return -1;
		}
	},
	addEventHandler: function(target, eventName, eventHandler) {
		if (target.addEventListener) {
			target.addEventListener(eventName, eventHandler, false);
		} else if (target.attachEvent) {
			target.attachEvent("on" + eventName, eventHandler);
		}
	}
};
main( );
