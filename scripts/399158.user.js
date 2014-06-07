// ==UserScript==
// @name        Twitch Plays Pokemon - Intervals (An Elegant Spamming Tool)
// @namespace   ryan
// @description Adds a interval management system for controlling posting chat commands automatically for you.  Make any interval you want! For example, you can make it post 'anarchy' every 30 seconds.
// @include     http://www.twitch.tv/twitchplayspokemon
// @version     1.0
// @grant       none
// ==/UserScript==

(function(window) {
	"use strict";

	var TwitchChatService = function() {
		var self = this;

		self.chatBox = $("#chat_text_input");
		self.chatSendButton = $("#chat_speak");

		self.post = function(message) {
			var originalChatBoxContent = self.chatBox.val();

			self.chatBox.val(message);
			self.chatSendButton.click();

			//set it back to what it was.
			self.chatBox.val(originalChatBoxContent);
		};

		return self;
	};

	var Interval = function(term, intervalAmountInSeconds) {
		var self = this;

		self.twitch = new TwitchChatService();

		self.term = term;
		self.intervalAmountInMillis = intervalAmountInSeconds * 1000;

		self.intervalId = null;

		//tracking data
		self.startedDate = null;
		self.timesPosted = 0;

		self.updateTimesPostedCallback = null;

		self.init = function() {
			self.start();
		};

		self.start = function() {
			console.log("starting posting '" + term + "' every " + self.intervalAmountInMillis / 1000 + " seconds.");

			self.startedDate = new Date();

			self.intervalId = setInterval(function() {
				console.log("posted '" + self.term + "' " + (++self.timesPosted) + " times");

				if(self.updateTimesPostedCallback) {
					self.updateTimesPostedCallback();
				}

				self.twitch.post(self.term);
			}, self.intervalAmountInMillis);
		};

		self.stop = function() {
			if(self.intervalId) {
				clearInterval(self.intervalId);
				console.log("interval '" + self.term + "' stopped.");
			}
		};

		self.getName = function() {
			return self.term + " every " + self.intervalAmountInMillis / 1000 + " secs";
		};

		self.init();

		return self;
	}

	var App = function() {
		var self = this;

		self.container = null;
		self.collapser = null;
		self.intervalContainer = null;
		self.intervalsList = null;
		self.termTextBox = null;
		self.durationTextBox = null;

		self.intervals = [];

		self.init = function() {
			self.destroyOtherInstance();
			self.injectCSS();
			self.setupInitialControls();
		};

		self.destroyOtherInstance = function() {
			if(window.intervalApp) {
				window.intervalApp.destroy();
				window.intervalApp = null;
			}
		};

		self.destroy = function() {
			self.clearAllIntervals();
			self.container.remove();
			self.collapser.remove();
		};

		self.injectCSS = function() {
			$("head").append($("<style type='text/css'> #chat_speak { width: 149px !important; } .clearButton { font-size: 11px; display: block; color: #ddd; text-decoration: none; } .textbox { box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); background-color: #fff; border: 1px solid #ccc; height: 20px; vertical-align: middle; color: #555; padding: 4px 6px; line-height: 20px; width: 200px; } .my-button:hover { text-decoration: none; } .my-button { padding: 5px 10px; display: block; text-align: center; text-decoration: none; margin-top: 7px; background: -webkit-gradient(linear,left top,left bottom,from(#8266b6),to(#533787)); background: -moz-linear-gradient(top,#8266b6,#533787); background: -o-linear-gradient(top,#8266b6,#533787); background: linear-gradient(top,#8266b6,#533787); background-color: #6a4e9e; color: #fff !important; width: 195px; } .interval-container strong { font-size: 17.5; margin-top: 10px; } .interval-container { border: 1px solid #b9a3e3; position: absolute; z-index: 9999; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 10px; color: #fff; } .intervals { padding: 10px; } #collapser span { width: 18px; height: 18px; overflow: hidden; text-indent: -9999px; display: block; margin: 1px; line-height: 20px; padding: 0; background: url('../images/xarth/button_glyphs.png') no-repeat 0 -18px; } .interval-list { list-style: none; } li { cursor: pointer; } .disabled { color: #aaa; text-decoration: line-through; cursor: pointer !important; } .textbox { display: block; } </style>"));
		};

		self.setupInitialControls = function() {
			var openButton = $("<a>")
				.addClass("dropdown_glyph")
				.attr("id", "collapser")
				.on("click", self.onToggleIntervals)
				.append($("<span>"));

			$(".emoticon-selector-container").after(openButton);

			var intervalContainer = $("<div>")
				.attr("id", "interval-container")
				.addClass("interval-container")
				.addClass("dropmenu")
				.addClass("menu-like")
				.css("display", "none");

			var intervals = $("<div>").addClass("intervals");

			var newIntervalTermTextBox = $("<input>").addClass("textbox").attr("id", "term").attr("placeholder", "term");
			intervals.append(newIntervalTermTextBox);

			var newIntervalDurationTextBox = $("<input>").addClass("textbox").attr("id", "duration").attr("placeholder", "interval in secs");
			intervals.append(newIntervalDurationTextBox);

			var addButton = $("<a>").attr("href", "#").addClass("my-button").html("Add").on("click", self.addInterval);
			intervals.append(addButton);

			var intervalsTitle = $("<strong>").html("Intervals");
			intervals.append(intervalsTitle);

			var clearIntervalLink = $("<a>").attr("href", "#").html("[ Clear All ]").addClass("clearButton").on("click", self.clearAllIntervals);
			intervals.append(clearIntervalLink);

			var intervalsList = $("<ul>").addClass("interval-list");

			intervals.append(intervalsList);

			intervalContainer.append(intervals);

			$("body").append(intervalContainer);

			self.collapser = $("#collapser");
			self.intervalContainer = $(".intervals");
			self.intervalsList = $(".interval-list");
			self.termTextBox = $("#term");
			self.durationTextBox = $("#duration");
			self.container = $("#interval-container");
		};

		self.onToggleIntervals = function() {
			self.container.toggle();
			self.repositionContainer();
		};

		self.repositionContainer = function() {
			var containerHeight = self.container.height();
			var containerWidth = self.container.width();

			self.container.css("left", self.collapser.offset().left - containerWidth + (self.collapser.width() * 2) + 5);
			self.container.css("top", self.collapser.offset().top - containerHeight - 30);
		};

		self.addInterval = function() {
			var term = self.termTextBox.val();
			var duration = self.durationTextBox.val();

			if(term === "" || duration === "") {
				return;
			}

			var interval = new Interval(term, duration);

			interval.updateTimesPostedCallback = function() {
				self.updateTimesPosted(interval);
			};

			self.addIntervalControl(interval);

			self.termTextBox.val("");
			self.durationTextBox.val("");

			self.intervals.push(interval);
			self.repositionContainer();

			return false;
		};

		self.updateTimesPosted = function(interval) {
			var intervalLi = self.intervalsList.find("#" + interval.intervalId);
			intervalLi.find("span").html("( " + interval.timesPosted + " times )");

			self.repositionContainer();
		};

		self.addIntervalControl = function(interval) {
			var intervalName = interval.getName();
			var li = $("<li>").attr("id", interval.intervalId).html(intervalName + " ");

			var timesPosted = $("<span>").addClass("timesPosted");
			li.append(timesPosted);

			li.on("click", function() {
				var $this = $(this);
				if($this.hasClass("disabled")) {
					interval.start();
					$this.attr("id", interval.intervalId);
					$this.removeClass("disabled");
				} else {
					interval.stop();
					$this.addClass("disabled");
				}
			});

			self.intervalsList.append(li);
		};

		self.clearAllIntervals = function() {
			var i, interval;
			for(i = 0; i < self.intervals.length; i++) {
				interval = self.intervals[i];
				interval.stop();
				self.intervalsList.find("#" + interval.intervalId).remove();
			}

			self.intervals = [];

			self.repositionContainer();
		};

		self.init();

		return self;
	};

	window.intervalApp = (new App());
})(window);