// ==UserScript==
// @name Crowy Keyboard Navi
// @namespace crowy_keyboard_navi
// @description Crowy Keyboard navi
// @updateURL https://userscripts.org/scripts/source/117322.meta.js
// @run-at document-end
// @include http://www.crowy.net/*
// @version 0.2.2
// ==/UserScript==

(function() {
var source = function() { // source code

var main = function() { // main logic

var Common = {
	jqFind: function(selector) {
		return this.jq.find(selector);
	},
	find: function(selector) {
		var jq = this.jqFind(selector);
		return jq.length == 0 ? null : this.child(jq);
	},
	childs: function() {
		var self = this;
		return this.jqFind(this.childSelecter).map(function() { return self.child($(this)); });
	},
	first: function() {
		return this.find(this.childSelecter + ':first');
	},
	last: function() {
		return this.find(this.childSelecter + ':last');
	},
	prev: function() {
		return this.sibling(this.jq.prev());
	},
	next: function() {
		return this.sibling(this.jq.next());
	},
	sibling: function(jq) {
		var parent = this.parent;
		return jq.is(parent.childSelecter) ? parent.child(jq) : null;
	},
	highlight: function() {
		return this.find(this.childSelecter + '.highlight');
	},
	highlightOrFirst: function() {
		return this.highlight() || this.first();
	},
	setHighlight: function() {
		this.jq.addClass('highlight');
	},
	clearHighlight: function() {
		this.jq.removeClass('highlight');
	},
	isHighlight: function() {
		return this.jq.hasClass('highlight');
	}
};
function ext(base, target) {
	return $.extend({}, base, target);
}

var Tab = (function() {
	function constructor() {
		this.jq = $('.tab:visible:first');
	}
	constructor.prototype = ext(Common, {
		childSelecter: '.column',
		child: function(jq) {
			return new Column(this, jq);
		},
		highlightMessage: function() {
			var column = this.highlight();
			return column && column.highlight();
		},
		scroll: function(column) {
			var left = column.jq.offset().left;
			var windowWidth = $(document).width();
			if (left <= 0 || (left + column.jq.width()) > windowWidth) {
				var scroll = $('.tab-content');
				scroll.scrollLeft(scroll.scrollLeft() + left);
			}
		}
	});
	return constructor;
})();

var Column = (function() {
	function constructor(tab, jqColumn) {
		this.parent = tab;
		this.jq = jqColumn;
	}
	function findNears(messages, targetLocation) {
		if (messages.length == 0) {
			return [];
		}
		var centerIndex = Math.floor(messages.length / 2);
		var message = messages[centerIndex];
		var location = message.location();
		if ((targetLocation.bottom > location.top && targetLocation.top < location.bottom)) {
			var nears = [];
			var i = centerIndex - 1;
			if (i >= 0) {
				nears.push(messages[i]);
			}
			nears.push(message);
			i = centerIndex + 1;
			if (i < messages.length) {
				nears.push(messages[i]);
			}
			return nears;
		} else if (targetLocation.top < location.top) {
			return findNears(messages.slice(0, centerIndex), targetLocation);
		} else {
			return findNears(messages.slice(centerIndex + 1), targetLocation);
		}
	}
	constructor.prototype = ext(Common, {
		childSelecter: '.message',
		child: function(jq) {
			return new Message(this, jq);
		},
		model: function() {
			return TD.controller.columnManager.get(this.jq.get(0).dataset.column);
		},
		refresh: function() {
			this.jqFind('.reloadButton').click();
		},
		scrollContainer: function() {
			return this.jqFind('.column-content');
		},
		messageContainer: function() {
			return this.jqFind('.message-list');
		},
		near: function(targetLocation) {
			var nears = findNears(this.childs(), targetLocation);
			var near = null;
			var nearRange = null;
			for (var i = 0, len = nears.length; i < len; i++) {
				var message = nears[i];
				var location = message.location();
				if ((targetLocation.bottom > location.top && targetLocation.top < location.bottom)) {
					var range = targetLocation.top >= location.top ?  location.bottom - targetLocation.top : targetLocation.bottom - location.top;
					if (near == null || range > nearRange) {
						near = message;
						nearRange = range;
					}
				} else if (near) {
					break;
				}
			}
			return near;
		},
		moveHighlight: function(next, scrollOverflowOnly) {
			var currentMessage = this.highlight();
			var nextMessage = null;
			if (currentMessage) {
				var nextMessage = next.near(currentMessage.location());
			}
			if (nextMessage == null) {
				nextMessage = next.highlightOrFirst();
			}
			this.clearHighlight();
			next.setHighlight();
			this.parent.scroll(next);
			if (currentMessage) {
				currentMessage.clearHighlight();
			}
			if (nextMessage) {
				nextMessage.setHighlight();
				next.scroll(nextMessage, scrollOverflowOnly);
			}
		},
		scroll: function(message, overflowOnly) {
			var scroll = this.scrollContainer();
			var height = scroll.height();
			var center = height * (8 / 20) ;
			var top = message.location().top;
			var scrollMove;
			if (top < 0 || top > height) {
				scrollMove = true;
			} else if (!overflowOnly) {
				scrollMove = top != center;
			}
			if (scrollMove) {
				scroll.scrollTop(scroll.scrollTop() + (top - center));
			}
		}
	});
	return constructor;
})();

var Message = (function() {
	function constructor(column, jqMessage) {
		this.parent = column;
		this.jq = jqMessage;
	}
	constructor.prototype = ext(Common, {
		model: function() {
			return this.parent.model().findChirp(this.jq.get(0).dataset.key);
		},
		location: function() {
			var loc = {};
			loc.top = this.jq.offset().top - this.parent.messageContainer().offset().top - this.parent.scrollContainer().scrollTop();
			loc.bottom = loc.top + this.jq.height();
			return loc;
		},
		moveHighlight: function(next) {
			this.clearHighlight();
			next.setHighlight();
			this.parent.scroll(next);
		}
	});
	return constructor;
})();

function highlightUpDown(up) {
	var tab = new Tab();
	var column = tab.highlightOrFirst();
	if (column == null) {
		return;
	}
	column.setHighlight();
	var current = column.highlightOrFirst();
	var next = current;
	if (current && current.isHighlight()) {
		next = up ? current.prev() : current.next();
	}
	if (next == null) {
		var jqCurrent = current.jq;
		var jqNext = up ? jqCurrent.prev() : jqCurrent.next();
		if (jqNext.is('.gap')) {
			jqNext.click();
		} else if (jqNext.is('.gap-loading')) {
			jqNext.prev().click();
		}
		return;
	}
	current.moveHighlight(next);
}

function highlightFirstLast(first) {
	var tab = new Tab();
	var column = tab.highlightOrFirst();
	if (column == null) {
		return;
	}
	column.setHighlight();
	var current = column.highlightOrFirst();
	var next = first ? column.first() : column.last();
	if (next) {
		current.moveHighlight(next);
	}
}

function highlightLeftRight(left) {
	var tab = new Tab();
	var current = tab.highlightOrFirst();
	var next = current;
	if (current && current.isHighlight()) {
		next = left ? current.prev() : current.next();
	}
	if (next) {
		current.moveHighlight(next, true);
	} else {
		moveTabLeftRight(left);
	}
}

function moveTabLeftRight(left) {
	var current = $('#tabs-navi li.ui-state-active');
	if (current.length == 0) {
		return;
	}
	var next = left ? current.prev() : current.next();
	if (next.length == 0) {
		return;
	}
	next.click();
	var tab = new Tab();
	var column = tab.highlight() || (left ? tab.last() : tab.first());
	if (column) {
		column.moveHighlight(column);
		var message = column.highlight() || column.first();
		if (message) {
			message.moveHighlight(message);
		}
	}
}

function highlightMostLeftRight(left) {
	var tab = new Tab();
	var current = tab.highlightOrFirst();
	var next = current;
	if (current) {
		next = left ? tab.first() : tab.last();
	}
	if (next) {
		current.moveHighlight(next, true);
	}
}

function callTweetCommand(command) {
	var message = new Tab().highlightMessage();
	if (message) {
		message.jq.data(command)();
	}
}

function eraseOldTweet(column) {
	column.messageContainer().children(':gt(10)').remove();
}

var Shortcut = {
	commands: {},
	regist: function(code, command) {
		var codes = $.isArray(code) ? code : [code];
		for (var i = 0, len = codes.length; i < len; i++) {
			this.commands[codes[i]] = command;
		}
	},
	exec: function(code, event) {
		var command = this.commands[code];
		if (command) {
			event.preventDefault();
			command(event);
		}
	}
};
//UP
//K
Shortcut.regist([38,75], function() { highlightUpDown(true); });
//DOWN
//J
Shortcut.regist([40,74], function() { highlightUpDown(false); });
//RIGHT
//L
Shortcut.regist([39,76], function() { highlightLeftRight(false); });
//LEFT
//H
Shortcut.regist([37,72], function() { highlightLeftRight(true); });
//Shift+K
//Ctrl+UP
Shortcut.regist([1075,3038], function() { highlightFirstLast(true); });
//Shift+J
//Ctrl+DOWN
Shortcut.regist([1074,3040], function() { highlightFirstLast(false); });
//Shift+L
//Ctrl+RIGHT
Shortcut.regist([1076,3039], function() { moveTabLeftRight(false); });
//Shift+H
//Ctrl+LEFT
Shortcut.regist([1072,3037], function() { moveTabLeftRight(true); });
//.
Shortcut.regist(190, function() {
	var column = new Tab().highlight();
	if (column) {
		column.refresh();
	}
});
//Shift+.
Shortcut.regist(1190, function() {
	var columns = new Tab().childs();
	for (var i = 0, len = columns.length; i < len; i++) {
		columns[i].refresh();
	}
});
//N
Shortcut.regist(78, function(event) {
	event.preventDefault();
	var column = new Tab().highlight();
	if (column) {
		column.jqFind('.column-input').click();
	}
});
//ESC
Shortcut.regist(27, function(event) {
	var target = $(event.target);
	if (event.target.id == 'search-keyword') {
		$('#searchType-menu > a').focus();
	} else {
		var input = target.parents('.column-input');
		if (input.length == 0) {
			return;
		}
		closeColumnInput(input);
		// for chrome
		$('.column-name > a', input.prev()).focus();
	}
});
//F
Shortcut.regist(70, function() {
	var message = new Tab().highlightMessage();
	if (message) {
		var jq = message.jq;
		var cmd = jq.hasClass('favorited') ? 'unfavorite' : 'favorites';
		jq.data(cmd)();
	}
});
//Q
Shortcut.regist(81, function(event) {
	event.preventDefault();
	callTweetCommand('rt');
});
//R
Shortcut.regist(82, function(event) {
	event.preventDefault();
	callTweetCommand('reply');
});
//M
Shortcut.regist(77, function(event) {
	event.preventDefault();
	callTweetCommand('dm');
});
//T
Shortcut.regist(84, function() { callTweetCommand('retweet'); });
///
Shortcut.regist(191, function(event) {
	event.preventDefault();
	$('#search-keyword').focus();
});
//C
Shortcut.regist(67, function(event) {
	var message = new Tab().highlightMessage();
	if (message) {
		var convers = message.jqFind('.conversation');
		if (convers.length == 1) {
			convers.click();
		}
	}
});
//E
Shortcut.regist(69, function(event) {
	var column = new Tab().highlight();
	if (column) {
		eraseOldTweet(column);
	}
});
//Shift+E
Shortcut.regist(1069, function(event) {
	var columns = new Tab().childs();
	for (var i = 0, len = columns.length; i < len; i++) {
		eraseOldTweet(columns[i]);
	}
});

$(document).keydown(function(event) {
	var code = event.keyCode;
	if (event.shiftKey) { code += 1000; }
	if (event.ctrlKey) { code += 3000; }
	if (event.altKey) { code += 5000; }

	var tagName = event.target.tagName.toLowerCase();
	if (tagName == 'input' || tagName == 'textarea') {
		if (code == 27) { //ESC
			Shortcut.exec(code, event);
		}
		return;
	}
	Shortcut.exec(code, event);
});

}; // /main logic

// load
(function mainloader(tryCount, loaded) {
	if (tryCount < 30 && !(window.jQuery)) {
		setTimeout(function() { mainloader(tryCount + 1, loaded); }, 60);
		return;
	}
	if (!loaded && !(window.jQuery)) {
		setTimeout(function() { mainloader(0, true); }, 60);
		return;
	}
	main();
})(0);

}; // /source code

var cssArry = [
	'.compact .message.highlight,' +
	'.message.highlight { border: solid 2px Gold; padding: 4px 3px 17px 33px; background-origin: border-box;}',

	'.message.highlight > .profile-image { left: 3px; top: 4px; }',
	'.message.highlight > .source { left: 38px; bottom: 1px; }',

	'.compact .message.highlight.new > .user-name,' +
	'.compact .message.highlight.new > .message-text { margin-left: 2px; }',

	'.message.highlight.new > .source { left: 40px; }'
];
var style = document.createElement('style');
style.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(style);
var sheet = style.sheet;
for (var i = 0; i < cssArry.length; i++){
	sheet.insertRule(cssArry[i], sheet.cssRules.length);
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = '(' + source.toString() + ')();';
document.body.appendChild(script);

})();
