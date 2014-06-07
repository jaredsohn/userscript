// ==UserScript==
// @name        Fakku Autopilot
// @namespace   autopilot
// @description Read manga without pressing keys
// @include     http://www.fakku.net/manga/*/read*
// @include     http://www.fakku.net/doujinshi/*/read*
// @require     https://raw.github.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js
// @version     1
// ==/UserScript==

// [ Begin of module ]
(function ($, undefined) {


AutoPilot = {
   /* Tuneable hotkeys! */
   hotkeyToggleAutoPilot: "p",
   hotkeyIncreaseScrollInterval: "i",
   hotkeyDecreaseScrollInterval: "shift+i",
   hotkeyIncreaseScrollQuantum: "q",
   hotkeyDecreaseScrollQuantum: "shift+q",

   /* Default values */
   defaultScrollInterval: 5000,
   defaultScrollQuantum: 500,


   /* Method for switching to next page. Can be overrided for other web sites. */
   nextPage: function() {
      var nextButton = $(".next:first > a");
      
      // nextButton.click() may not work, so work around it
      var clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', true, true);
      nextButton[0].dispatchEvent(clickEvent);
   },


   /* scrollInterval and scrollQuantum are stored in HTML5 Local Storage */
   get scrollInterval() {
      var storedValue = localStorage.getItem("AutoPilot.scrollInterval");
      if (storedValue !== null) {
         return JSON.parse(storedValue);
      } else {
         return this.defaultScrollInterval;
      }
   },
   set scrollInterval(newValue) {
      localStorage.setItem("AutoPilot.scrollInterval", JSON.stringify(newValue));
   },

   get scrollQuantum() {
      var storedValue = localStorage.getItem("AutoPilot.scrollQuantum");
      if (storedValue !== null) {
         return JSON.parse(storedValue);
      } else {
         return this.defaultScrollQuantum;
      }
   },
   set scrollQuantum(newValue) {
      localStorage.setItem("AutoPilot.scrollQuantum", JSON.stringify(newValue));
   },

   
   /* Soft animated scroll rather than rough scroll */
   animatedScrollY: function(amount, time, _leapTime) {
      if (time === undefined)
         time = 1000;

      var step = 5;
      if (step < amount) {
         window.scrollBy(0, step);
         amount -= step;

         if (_leapTime === undefined) {
            // amount / step --> nº of steps required
            // time / leapTime --> nº of steps required
            var leapTime = time * step / amount;
         } else {
            var leapTime = _leapTime;
         }

         var outer = this;
         window.setTimeout(function () {
            outer.animatedScrollY(amount, time, leapTime);
         }, leapTime);
      } else {
         window.scrollBy(0, amount);
         amount = 0;
      }
   },


   pilotIntervalEvent: null,

   /* Timing scroll */
   toggleAutoPilot: function() {
      if (this.pilotIntervalEvent === null) {
         this.fireOSD("AutoPilot ON");

         var outer = this;
         this.pilotIntervalEvent = window.setInterval(function() {
            outer.scrollDownOrPassPage();
         }, this.scrollInterval);
      } else {
         this.fireOSD("AutoPilot OFF");
         window.clearInterval(this.pilotIntervalEvent);
         this.pilotIntervalEvent = null;
      }
   },

   scrollDownOrPassPage: function() {
      if (!this.scrollIsAtBottom()) {
         this.animatedScrollY(this.scrollQuantum);
      } else {
         this.nextPage();
      }
   },

   scrollIsAtBottom: function() {
      return (window.scrollY == $(document).height() - $(window).height());
   },


   /* Neat OSD */
   fireOSD: function(text, time) {
      if (time === undefined)
         time = 5000;

      var osd = $('<div/>', {
         'class': 'autopilot-osd',
          'text': text,
      });
      osd.css({
         'position': 'fixed',
         'left': 10,
         'top': 40,
         'background': 'limegreen',
         'padding': 5,
         'font-weight': 'bold',
         'font-size': 20,
         'display': 'none',
      });
      $('body').append(osd);

      // Show the OSD
      osd.fadeIn(500, function() {
         // Keep it for a while on screen
         window.setTimeout(function() {
            // Hide the OSD
            osd.fadeOut(500, function() {
               // Remove it from the DOM once completely hidden
               osd.remove();
            });
         }, time);
      });
   },


   /* Scroll quantum and scroll interval adjust handlers */
   increaseScrollQuantum: function(amount) {
      if (amount === undefined)
         amount = 100;

      var newValue = this.scrollQuantum + amount;
      // Refuse newValue < 100px
      if (newValue < 100)
         newValue = this.scrollQuantum;
      this.scrollQuantum = newValue;
      this.fireOSD("Scroll quantum: " + newValue);
   },

   decreaseScrollQuantum: function(amount) {
      if (amount === undefined)
         amount = 100;

      this.increaseScrollQuantum(-amount);
   },

   increaseScrollInterval: function(amount) {
      if (amount === undefined)
         amount = 1000;

      var newValue = this.scrollInterval + amount;
      // Refuse newValue < 1s
      if (newValue < 1000)
         newValue = this.scrollInterval;
      this.scrollInterval = newValue;
      this.fireOSD("Scroll interval: " + (newValue / 1000) + "s");
   },

   decreaseScrollInterval: function(amount) {
      if (amount === undefined)
         amount = 1000;

      this.increaseScrollInterval(-amount);
   },
};


// Register event handlers
$(document).bind("keydown", AutoPilot.hotkeyToggleAutoPilot, function() {
   AutoPilot.toggleAutoPilot();
});
$(document).bind("keydown", AutoPilot.hotkeyIncreaseScrollQuantum, function() {
   AutoPilot.increaseScrollQuantum();
});
$(document).bind("keydown", AutoPilot.hotkeyDecreaseScrollQuantum, function() {
   AutoPilot.decreaseScrollQuantum();
});
$(document).bind("keydown", AutoPilot.hotkeyIncreaseScrollInterval, function() {
   AutoPilot.increaseScrollInterval();
});
$(document).bind("keydown", AutoPilot.hotkeyDecreaseScrollInterval, function() {
   AutoPilot.decreaseScrollInterval();
});


}) (jQuery); // [ End of module ]
