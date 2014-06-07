// ==UserScript==
// @name           IGN Boards (XenForo) - Me gusta
// @namespace      http://vestitools.pbworks.com/
// @description    Posts with many likes become especially visible and are marked next to the scrollbar
// @include        http://www.ign.com/boards/threads/*
// @version        1.0.0
// ==/UserScript==

/*
This script will highlight messages with a high number of likes by making them orangish.
Messages with high likes are also indicated next to the scrollbar with boxes you can click
to scroll so they're in view.  This will hopefully help you in finding quality posts,
especially in large threads.

Only messages with more than the median number of likes are highlighted (with some exceptions).
Messages above this threshold are colored with intensity relative to the maximum number of likes.

See the config object at the bottom of the source for some options you can change.

Tested on Firefox 9.0.1 and Chrome 16.0.912.63 m.

Limitations:
Only intended for the default theme - might look a tad assy on classic.  Might look a tad assy anyway.
Only highlighting posts with more than the median number of likes makes it resistant to spammers,
  but a smarter script might devalue a user's likes based on how many they've given out.
Obviously depends on people using the like feature appropriately to be accurate.
If post dimensions or offsets change after indicators are created, indicators may not be accurate.
Any new posts or changes in like counts after the page loads are not recognized.
Assumes your scroll buttons are 18 pixels high (Windows 7 default).
Doesn't play particularly nicely with the header.
Seems to make Chrome chug while scrolling sometimes.
Resizing the window might make things look funky.
*/

if(window.top != window.self) return; //don't run in iframes


/*
Responsible for creating the style element which will be appended to the head.
Call add*Style until satisfied, then call getStyle
*/
var StyleBuilder = function(config) {
	this._css = "";
	this.config = config;
};

StyleBuilder.prototype = {
	//make left and right borders pop out from their parent element
	_highlightStatic: '.message[data-@prefix-relpop]:not([data-@prefix-relpop="0"]) {\
    left: -2px;\
    position: relative;\
    width: 100%;\
	}',
	
	_highlightTemplate: '.message[data-@prefix-relpop="@relpop"] {\
	background-image: -webkit-linear-gradient(top, rgba(@color, @opacity), rgba(255,255,255, 0) 20px),\
	-webkit-linear-gradient(bottom, rgba(@color, @opacity), rgba(255,255,255, 0) 20px);\
	background-image: -moz-linear-gradient(top, rgba(@color, @opacity), rgba(255,255,255, 0) 20px),\
	-moz-linear-gradient(bottom, rgba(@color, @opacity), rgba(255,255,255, 0) 20px);\
	background-image: linear-gradient(to bottom, rgba(@color, @opacity), rgba(255,255,255, 0) 20px),\
	linear-gradient(to top, rgba(@color, @opacity), rgba(255,255,255, 0) 20px);\
	border-left: 2px solid rgba(255,215,84, @opacity);\
    border-right: 2px solid rgba(255,215,84, @opacity);\
	}',
	
	_indicatorStatic: 'body > a[data-@prefix-relpop] {\
	position: fixed;\
	right: 0;\
	width: 40px;\
	min-height: 10px;\
	z-index: 1001;\
	display: none;\
	margin: @scrollButtonHeightpx 0;\
	border: 1px dotted rgba(0,0,0, 0.25);\
	border-width: 1px 0;\
	color: white;\
	text-align: center;\
	font-size: 11px;\
	text-shadow: 0px 0px 1px rgba(0,0,0, 0.5);\
	overflow: hidden;\
	}\
	body > a[data-@prefix-relpop]:hover,\
	body > a[data-@prefix-relpop]:focus {\
	box-shadow: 3px 0 7px white inset;\
	}',
	
	_indicatorTemplate: 'body > a[data-@prefix-relpop="@relpop"] {\
	background-color: rgba(@color, @opacity);\
	display: block;\
	}',
	
	getOpacity: function(relpop) {
		var opacityRange = this.config.maximumOpacity - this.config.minimumOpacity;
		var relpopRange = this.config.maximumRelpop - this.config.thresholdRelpop;
		var opacityStep = opacityRange/relpopRange;
		return this.config.minimumOpacity + ((relpop - this.config.thresholdRelpop) * opacityStep);
	},
	
	addHighlightStyle: function() {
		this._css += this._highlightStatic;
		this.addTemplate(this._highlightTemplate);
	},
	
	addIndicatorStyle: function() {
		this._css += this._indicatorStatic;
		this.addTemplate(this._indicatorTemplate);
	},
	
	addTemplate: function(template, func) {
		for(var i = this.config.thresholdRelpop; i <= this.config.maximumRelpop; i++) {
			//relpop _can_ be below the threshold, but messages with that relpop should not change
			this._css += template.replace(/@relpop/g, i).replace(/@opacity/g, this.getOpacity(i));
		}
	},
	
	getStyle: function() {
		var style = document.createElement("style");
		style.textContent = this._css.replace(/@prefix/g, this.config.dataPrefix)
							.replace(/@color/g, this.config.color)
							.replace(/@scrollButtonHeight/g, this.config.scrollButtonHeight);
		return style;
	}
};

/*
Calculates relative popularity of each message, calls Message.setRelativePopularity for each one.
messages should be an array (or something array-like) of DOM elements representing messages.
*/
var RelpopCalculator = function(config, messages) {
	this.config = config;
	this._messages = [];
	
	for(var i = 0, len = messages.length; i < len; i++) {
		this._messages.push(new Message(config, messages[i]));
	}
	
	this.thresholdLikes = 0;
	this.maximumLikes = 0;
};

RelpopCalculator.prototype = {
	calculateRelativePopularity: function() {
		this._updateStatistics();
		//check this, because otherwise it's not worth doing
		if(this.maximumLikes != this.thresholdLikes) {
			this._updateRelativePopularity();
		}
	},
	
	/*
	Figures out this.thresholdLikes and this.maximumLikes.
	*/
	_updateStatistics: function() {
		this._messages.sort(function(a, b){
			return a.likes - b.likes;
		});
		
		this.maximumLikes = this._messages[this._messages.length - 1].likes;
		if(this.maximumLikes < this.config.maximumRelpop) {
			//fudge this so you don't get a post with 1 like with a relpop of 5
			this.maximumLikes = this.config.maximumRelpop;
		}
		
		//threshold defined by the median
		var index = Math.floor(this._messages.length / 2);
		if(this._messages.length - index > this.config.maximumHighlighted) {
			//but cap the number of highlighted posts
			index = this.config.maximumHighlighted;
		}
		this.thresholdLikes = this._messages[index].likes;
	},
	
	/*
	Call setRelativePopularity for each message with the proper relpop number.
	*/
	_updateRelativePopularity: function() {
		this.forEachMessage((function(message) {
			message.setRelativePopularity(this.getPop(message.likes));
		}).bind(this));
	},
	
	/*
	Given a number of likes, return its relative popularity.
	Defined by a linear equation.
	*/
	getPop: function(likes) {
		if(likes <= this.thresholdLikes) {
			return 0;
		}
		var likesRange = this.maximumLikes - this.thresholdLikes;
		if(likesRange == 0) {
			//just in case
			return 0;
		}
		var slope = (this.config.maximumRelpop - this.config.thresholdRelpop) / 
					(likesRange);
		var pop = slope * (likes - this.thresholdLikes) + this.config.thresholdRelpop;
		return Math.round(pop);
	},
	
	forEachMessage: function(func) {
		return this._messages.forEach(func);
	},
	
	//for debugging
	likesToString: function() {
		var str = "";
		this.forEachMessage(function(e) {
			str += e.likes + ", ";
		});
		return str;
	}
	
};


/*
Holds a reference to a message element, total number of likes for this message,
a permalink to this message, and the element's offset, in pixels, from the top of the page.
*/
var Message = function(config, el) {
	this.config = config;
	this.el = el;
	this.likes = 0;
	this.relpop = 0; //RelpopCalculator responsible for this
	this.offset = 0;
	this.postNumber = 1; //#1, #2, #3...
	this.author = "";
	var loc = window.location;
	this.permalink = loc.protocol + "//" + loc.hostname + loc.pathname + loc.search + "#";
	this._likesSummary = null;
	this.updateLikes();
	this.updateOffset();
	this.updatePermalink();
	this.updateAuthor();
};

Message.prototype = {

	/*
	Find out how many likes this message has and update this.likes accordingly 
	*/
	updateLikes: function() {
		if(!this._likesSummary) {
			this._likesSummary = this.el.getElementsByClassName("likesSummary")[0];
		}
		if(!this._likesSummary) {
			//if a message has no likes, .likesSummary won't exist
			this.likes = 0;
		}
		else {
			//if _you_ like it, indicated in text node
			var fc = this._likesSummary.firstElementChild.firstChild;
			if(fc && fc.nodeType == 3 && fc.nodeValue.indexOf("You") != -1) {
				this.likes++;
			}
			//element can contain a few specific usernames
			this.likes += this._likesSummary.getElementsByClassName("username").length;
			//the rest are accounted for with the text "X others" within .OverlayTrigger
			var others = this._likesSummary.getElementsByClassName("OverlayTrigger");
			if(others.length > 0) {
				var result;
				if((result = /\d+/.exec(others[0].textContent)) != null) {
					this.likes += +result;
				}
			}
		}
	},
	
	/*
	Find out how many pixels the top of this message is offset from the top of the page,
	and update this.offset accordingly.
	*/
	updateOffset: function() {
		var currentElement = this.el, currentOffset = 0;
		if (currentElement.offsetParent) {
			do {
				currentOffset += currentElement.offsetTop;
			} while (currentElement = currentElement.offsetParent);
		}
		this.offset = currentOffset;
	},
	
	updatePermalink: function() {
		var links = this.el.getElementsByClassName("hashPermalink");
		if(links.length > 0 && links[0].href.indexOf("#") != -1) {
			this.permalink = links[0].href;
			this.postNumber = +links[0].textContent.substring(1);
		}
	},
	
	updateAuthor: function() {
		this.author = this.el.dataset.author;
	},
	
	/*
	Sets this.relpop.
	Sets the data-relpop attribute on this.el to this.relpop.
	*/
	setRelativePopularity: function(pop) {
		this.relpop = pop;
		//this.el.dataset.relpop = pop wasn't working for some reason
		this.el.setAttribute("data-" + this.config.dataPrefix + "-relpop", this.relpop);
	}
	
};

/*
Responsible for inserting Indicators into the document according to the Messages present in
the given RelpopCalculator, and making them scroll properly when clicked.
*/
var IndicatorController = function(config, calc) {
	this.config = config;
	this.calc = calc;
	this._indicators = [];
	this._messages = this.calc._messages.slice(0); //get a copy
};

IndicatorController.prototype = {
	
	forEachMessage: RelpopCalculator.prototype.forEachMessage,
	
	/*
	Insert an Indicator into the document for each message in this.calc.
	*/
	insertIndicators: function() {
		//make sure you append in the same order as the messages exist on the page
		this._messages.sort(function(a, b) {
			return a.postNumber - b.postNumber;
		});
		this.forEachMessage((function(message) {
			var indic = new Indicator(this.config, message);
			this._indicators.push(indic);
			document.body.appendChild(indic.getElement());
		}).bind(this));
	},
	
	/*
	Call this when the document is clicked to scroll to Message that an Indicator represents.
	*/
	onClick: function(e) {
		if(e.which != 1 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
			return;
		}
		if(e.target.tagName == "A" && e.target.parentNode == document.body
				&& e.target.hasAttribute("data-" + this.config.dataPrefix + "-relpop")) {
			var indic = null;
			for(var i = 0, len = this._indicators.length; i < len; i++) {
				indic = this._indicators[i];
				if(indic.el == e.target) {
					break;
				}
			}
			if(indic) {
				e.preventDefault();
				window.scrollTo(0, indic._message.offset);
			}
		}
	}
};

/*
Provides a DOM element to represent the given Message next to the scrollbar.
*/
var Indicator = function(config, message) {
	this.config = config;
	this._message = message;
	this.el = null;
};

Indicator.prototype = {
	getElement: function() {
		if(!this.el) {
			this.el = document.createElement("a");
			Message.prototype.setRelativePopularity.call(this, this._message.relpop);
			this.el.textContent = this._message.likes;
			this.el.href = this._message.permalink; //for when permalinks work again
			this.el.title = "Message #" + this._message.postNumber + " by " + this._message.author;
			var totalHeight = document.body.scrollHeight;
			//scrollButtonHeight is obviously not consistent between OSes/themes, but better than nothing
			var buttonReduction = (this.config.scrollButtonHeight * 2 * 100) / window.innerHeight;
			this.el.style.top = (this._message.offset / totalHeight) * (100 - buttonReduction) + "%";
			this.el.style.height = (this._message.el.offsetHeight / totalHeight) * (100 - buttonReduction) + "%";
		}
		return this.el;
	}
};

(function(){
	var config = {
		/*
		The string to prefix data-* attributes with ("data-prefix-name").
		Intended to avoid collisions.
		*/
		dataPrefix: "gamerx1011",
		color: "255,215,84", //The color of highlights and indicators.
		minimumRelpop: 0, //must be >= 0
		thresholdRelpop: 1, //point at which messages are highlighted and indicated
		maximumRelpop: 5, //highest measure of relative popularity
		maximumHighlighted: 20, //maximum number of posts to highlight
		minimumOpacity: 0.3, //opacity of threshold relpop messages and indicators
		maximumOpacity: 1,
		scrollButtonHeight: 18 //height of scroll buttons on right of screen
	};

	var builder = new StyleBuilder(config);
	builder.addHighlightStyle();
	builder.addIndicatorStyle();
	document.head.appendChild(builder.getStyle());
	
	var calc = new RelpopCalculator(config, document.getElementById("messageList").getElementsByClassName("message"));
	calc.calculateRelativePopularity();
	
	var controller = new IndicatorController(config, calc);
	controller.insertIndicators();
	//permalinks _just_ got fixed minutes before I was going to upload this
	//document.addEventListener("click", controller.onClick.bind(controller));
})();