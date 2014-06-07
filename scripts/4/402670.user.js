// ==UserScript==
// @name	IP.Board Post Loss Prevention
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.0.6
// ==/UserScript==

var i = 0;

// Classes constructor

function ClassHandler() {
	var self = this;

	this.classList = function(elem) {
		return elem.className.trim().split(/[\b\s]/);
	};

	this.hasClass = function(elem, className) {
		var classes = self.classList(elem),
		has = false,
		i = 0;

		for (i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				has = true;
				break;
			}
		}

		return (has);
	};

	this.addClass = function(elem, className) {
		var classes;

		if (!self.hasClass(elem, className)) {
			classes = self.classList(elem);
			classes.push(className);
			elem.className = classes.join(' ').trim();
		}

		return self;
	};

	this.removeClass = function(elem, className) {
		var classes = self.classList(elem),
		i = 0;

		for (i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				classes.splice(i, 1);
			}
		}

		elem.className = classes.join(' ').trim();

		return self;
	};

	this.toggleClass = function(elem, className) {
		var classes;

		if (self.hasClass(elem, className)) {
			self.removeClass(elem, className);
		} else {
			classes = self.classList(elem);
			classes.push(className);
			elem.className = classes.join(' ').trim();
		}

		return self;
	};
}

// Initialize

var Classes = new ClassHandler();

// End Classes constructor

if (document.body.id === 'ipboard_body') {
	window.onbeforeunload = function() {
		var confirmationMessage = "You have an unsaved post.";
		
		if (document.getElementsByClassName('cke_contents') && typeof(document.getElementsByClassName('cke_contents')) != 'undefined') {
			for (i = 0; i < document.getElementsByClassName('cke_contents').length; i++) {
				if (typeof(document.getElementsByClassName('cke_contents')[i].getElementsByTagName('iframe')[0]) != 'undefined' && document.getElementsByClassName('cke_contents')[i].getElementsByTagName('iframe')[0].contentWindow.document.body.textContent.length) {
					return confirmationMessage;
				} else if (typeof(document.getElementsByClassName('cke_contents')[i].getElementsByTagName('textarea')[0]) != 'undefined' && document.getElementsByClassName('cke_contents')[i].getElementsByTagName('textarea')[0].value.length) {
					return confirmationMessage;
				}
			}
		}
	};

	var listener = function(event) {
		if (event.target.className && Classes.hasClass(event.target, 'input_submit')) {
			window.onbeforeunload = null;
		}
	};

	document.addEventListener('click', listener, false);
}