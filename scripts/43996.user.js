// ==UserScript==
// @name           Google Reader Unread Count in Gmail
// @namespace      http://userscripts.org/users/65373
// @description    Shows google reader unread count in Gmail nav bar.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==


var readerLink = null;
var timer = null;
var attemptCount = 0;
var interval = 10000;
var step = 10000;
var minInterval = 60000;
var maxInterval = 60000;
var timeout = null;
function checkUnreadCount() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.google.com/reader/api/0/unread-count?all=true&output=xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom.getElementsByTagName('string');
			var unread = false;
			for (var i = 0; i < entries.length; i++) {
				if (entries[i].textContent.indexOf('reading-list') > -1) {
					var count = entries[i].nextSibling.textContent;
					readerLink.innerHTML = '<strong>Reader (' + count + ')</strong>';
					unread = true;
					break;
				}
			}
			if (!unread) {
				readerLink.innerHTML = 'Reader';
			}
		}
	});
	if (interval < maxInterval) {
		interval += step;
	}

	timeout = setTimeout(checkUnreadCount, interval);
}

function initCount() {
	attemptCount += 1;
	if (attemptCount > 10) { // To stop the timers on "dumb" pages
		clearInterval(timer);
		return;
	}

	var gbar = document.getElementById('gbar');
	if (!gbar) {
		return;
	} else {
		var links = gbar.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			if (links[i].innerHTML.indexOf('Reader') > -1) {
				readerLink = links[i];
				break;
			}
		}
		readerLink.addEventListener('click', function(e) {
			interval = minInterval;
			clearTimeout(timeout);
			setTimeout(checkUnreadCount, interval);
		}, false);
		checkUnreadCount();
		clearInterval(timer);
	}
}




//3 key to refresh
function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return false;
  }

  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }

  var k = event.keyCode;

  if (k in SIMPLE_ACTIONS) {
    SIMPLE_ACTIONS[k]();
    return true;
  }

  return false;
}


// Constants
const SIMPLE_ACTIONS = {
    // "3": Sort on unread feed, show only unread items
    51: function() {
         // Init Orig Feed the first time
         checkUnreadCount()
    },
};


window.addEventListener('load', function(e) {
	timer = setInterval(initCount, 3000);
}, false);
window.addEventListener('keydown', keyHandler, false);
