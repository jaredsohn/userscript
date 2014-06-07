// ==UserScript==
// @name           Gmail Auto BCC
// @version        1.3
// @namespace      GmailAutoBCC
// @author         Dmitry Koterov
// @description    Adds BCC header when you press to Send button. Right-click to configure BCC address.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
var DOC = null;

function findSendButtons() {
	var bs = DOC.getElementsByTagName('B');
	var buttons = [];
	for (var i = bs.length - 1; i >= 0; i--) {
		var e = bs[i].parentNode;
		var role = e.getAttribute('role');
		if (role == 'button' && e.parentNode.parentNode.getAttribute('role') == "navigation") {
			buttons.push(e);
		}
	}
	return buttons;
}

function findBcc() {
	var elts = DOC.getElementsByTagName('textarea');
	var found = null;
	for (var i = 0; i < elts.length; i++) {
		var e = elts[i];
		if (e.name == 'bcc') {
			found = e;
			// find the LAST bcc, because "To:" field also has name="bcc"
		}
	}
	return found;
}

function main() {
	// It is a very, very strange method to check if we already added
	// events to button or not. But it is the only method which works.
	// I tried to set DOC.LOADED flag, but nothing works fine.
	if (DOC.getElementById('gab_attached')) return;
	var sendButtons = findSendButtons();
	for (var i = 0; i < sendButtons.length; i++) {
		var sendButton = sendButtons[i];
		var div = sendButton.ownerDocument.createElement('span');
		div.id = 'gab_attached';
		div.style.display = 'none';
		sendButton.parentNode.insertBefore(div, sendButton);
		addButtonEvents(sendButton, null); 
	}
}

function addButtonEvents(sendButton, k) {
	sendButton.addEventListener("mousedown", function(e) { 
		var bcc = findBcc();
		var email = getBccEmail();
		if (email) {
			// Remove email on each click (because it must be added once).
			bcc.value = bcc.value.replace(new RegExp(regexpEscape(email) + '(, *)?', 'g'), '');
		}
		if (e.button == 2) {
			e.stopPropagation();
			e.preventDefault();
			e.cancelBubble = true;
			e.returnValue = false;
			setTimeout(function() {
				var email = promptEmail();
				if (email === "") {
					setBccEmail(email);
					alert("Auto-BCC is turned off.");
				} else if (email !== null) {
					setBccEmail(email);
					alert("E-mail " + email + " assigned as auto-BCC for this mailbox.");
				}
			}, 10);
		} else if (e.button == 0) {
			if (email) {
				bcc.value = email + ", " + bcc.value;
			}
		}
	}, false);
}

function getBccEmail() {
	var email = getCookie("gab_email");
	return email? email : "";
}

function setBccEmail(email) {
	setCookie("gab_email", email, DOC.location.pathname, new Date('2025-01-01'));
}

function promptEmail() {
	var msg = "What E-mail to set as auto-BCC?";
	var p = msg;
	var s = getBccEmail();
	while (1) {
		s = prompt(p, s);
		if (s === null) return null;
		s = s.replace(/\s+/, '');
		if (s === "") return "";
		if (s.match(/^\S+@\S+\.\S+$/i)) {
			return s;
		}
		p = "Invalid E-mail format! " + msg;
	}
}

function regexpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function setCookie(name, value, path, expires, domain, secure) {
  var curCookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "; path=/") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
  var prefix = name + "=";
  var cookieStartIndex = document.cookie.indexOf(prefix);
  if(cookieStartIndex == -1) return null;
  var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
  if(cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
  return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

if (!window.top || top.location.href == window.location.href) {
	setInterval(function() {
		DOC = document;
		if (DOC && DOC.readyState === "complete") {
			main();
		}
	}, 1000);
}
