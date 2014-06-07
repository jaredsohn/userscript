// ==UserScript==
// @name           Gmail Word Count
// @namespace      http://www.kennyocracy.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var gmail = null;
var opacity = 90;
var timeouts = new Array();
var listeners = new Array();


window.addEventListener('load', function() {
  if(unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init)
  }
}, true);


function init(g) {
  gmail = g;
  gmail.registerViewChangeCallback(listenForWcButton);
  listenForWcButton();
}


function getDoc() {
    return gmail.getActiveViewElement().ownerDocument;
}


function newNode(tagName) {
  return getDoc().createElement(tagName);
}


function getNode(id) {
  return getDoc().getElementById(id);
}


function getEmailFrame() {
    var emails = getDoc().getElementsByTagName('iframe');
    var numEmails = emails.length ;
    var lastEmail = emails[emails.length-1];
    if(lastEmail) return lastEmail.contentDocument ;
    else return false;
}


function getLastSpellCheck() {
    var cs = getDoc().evaluate(
                '//form/div/div/table/tbody/tr/td[2]/span[1]',
                getDoc(),
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
    return cs.snapshotItem(cs.snapshotLength-1);
}


function getLastForwardButton() {
    var fwd = getDoc().evaluate(
                '//table/tbody/tr/td/div/span',
                getDoc(),
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
    return fwd.snapshotItem(fwd.snapshotLength-1);
}


function addEventListener(instance, eventName, listener) {
    instance.addEventListener(eventName, listener, false);
    return {
        instance: instance,
        name: eventName,
        listener: listener
    };
}


function removeEventListener(event) {
    var instance = event.instance;
    instance.removeEventListener(event.name, event.listener, false);
}


// Because there are multiple ways to create an e-mail draft, there need to be listeners on all of them.
function buildReplyListenArray() {
	var fwd = getLastForwardButton();
	if(fwd) {
		var replyRow = fwd.parentNode.parentNode.parentNode.cells;
		var numListeners = 0;
		var i;
		for(i = 0; i < 3; i++) {
			if(replyRow[i].innerHTML) {
				listeners[numListeners] = addEventListener(replyRow[i], 'click', function() { setTimeout(placeWcButton, 10); });
				numListeners++;
			}
		}
	}
}


// Because there are multiple ways to create an e-mail draft,
// the listeners need to be removed after the word count button has been placed.
function destroyReplyListenArray() {
	var i;
	var numListeners = listeners.length;
	for(i = 0; i < numListeners; i++) {
		removeEventListener(listeners[i]);
	}
}


function addSendSaveDiscardListeners() {
    var buttons = getDoc().evaluate(
                '//button',
                getDoc(),
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null);
	var temp = '';
	var numButtons = buttons.snapshotLength;
	buttons.snapshotItem(numButtons-4).addEventListener('click', function() { setTimeout(buildReplyListenArray, 10); }, false);
	buttons.snapshotItem(numButtons-7).addEventListener('click', function() { setTimeout(buildReplyListenArray, 10); }, false);
	
	buttons.snapshotItem(numButtons-5).addEventListener('mousedown', wcReset, false);
	buttons.snapshotItem(numButtons-6).addEventListener('mousedown', wcReset, false);
	buttons.snapshotItem(numButtons-8).addEventListener('mousedown', wcReset, false);
	buttons.snapshotItem(numButtons-9).addEventListener('mousedown', wcReset, false);
	
}


function placeWcButton() {
    var lastSpellCheck = getLastSpellCheck();
    if(lastSpellCheck) {
        lastSpellCheck.parentNode.insertBefore(createWcButton(), lastSpellCheck);
		destroyReplyListenArray();
		addSendSaveDiscardListeners();
		return true;
    }
    return false;
}


function listenForWcButton() {
    var view = gmail.getActiveViewType();
    if(view == 'co' || view == 'cv') {
        if(!placeWcButton() && view == 'cv') {
            setTimeout(multiTextareas, 10);
        }
    }
}


function createWcButton() {
    var span = newNode("span");
    span.setAttribute("id", "wcButton");
    span.style.color = "#0000CC";
    span.style.cursor = "pointer";
    span.style.fontWeight = "bold";
    span.style.textDecoration = "underline";
    span.style.marginRight = "1em";
    span.innerHTML = "Word Count";
    span.addEventListener('click', countWords, false);
    return span;
}


function multiTextareas() {
    var textareas = getDoc().getElementsByTagName('textarea');
    var numEmails = Math.round(textareas.length/4);
    if(textareas.length % 4) {
        textareas[numEmails*4].addEventListener('mousedown', function() { setTimeout(placeWcButton, 10); }, false);
		buildReplyListenArray();
	}
    else {
        setTimeout(placeWcButton, 10);
    }
}


function countWords() {
    for(var i = 90; i >=0; i--) {
        clearTimeout(timeouts[i]);
    }
       
    var WHITESPACE_START_RE = /^[^A-Za-z0-9]+/;
    var GMAIL_QUOTE_RE = /\<div class=\"gmail_quote\">[\s\S]*/;
    var HTML_TAG_RE = /(\<[^\>]+\>)|(&nbsp;)/g;
    var WC_SPAN_RE = /\<span.*?id=\"count\"\>.*?\<\/span\>/;
  
    var emailBody = getEmailFrame().body;
    var cleanStr = emailBody.innerHTML.toString().replace(GMAIL_QUOTE_RE, " ").replace(WC_SPAN_RE, " ").replace(HTML_TAG_RE, " ").replace(/[\s]+/g, " ").replace(WHITESPACE_START_RE, "");
  
    if(cleanStr.length) {
		getNode('wcButton').removeEventListener('click', countWords, false);
        var numWords = cleanStr.split(" ").length-1;
        var span = createWcSpan(numWords);
        emailBody.appendChild(span);
        setTimeout(fadeOut, 2000);
    }
}


// Will contain word count text.
function createWcSpan(numWords) {
    var span;
    var frame = getEmailFrame();
    if(frame) {
        span = newNode("span");
        span.setAttribute("id", "count");
        span.style.padding = "0.2em";
        span.style.background = "#000";
        span.style.color = "#FFF";
        span.style.textAlign = "left";
        span.style.fontSize = "1em";
        span.style.position = "fixed";
        span.style.top = "0px";
        span.style.right = "0px";
        span.innerHTML = numWords + " words";
        span.style.opacity = opacity = 90;
        return span;
    }
}


function fadeOut() {
    var speed = 12;
    var maxOpacity = 90;
    var timer = 0;
    for(var i = maxOpacity; i > 0; i--) {
        timeouts[i] = setTimeout(fadeOutHelper, (timer * speed));
        timer++;
    }
    timeouts[i] = setTimeout(wcReset, timer*speed);
	
}


function fadeOutHelper() {
    var wc = 0;
    var frame = getEmailFrame();
    if(frame) {
        wc = frame.getElementById('count');
    }
    if(wc) {
        wc.style.opacity = opacity/100;
        opacity--;
    }
}


function wcReset() {
    var wc = 0;
    var frame = getEmailFrame();
    if(frame) {
        wc = frame.getElementById('count');
    }
    if(wc) {
        wc.parentNode.removeChild(wc);
        getNode('wcButton').addEventListener('click', countWords, false);
    }
}
