// ==UserScript==
// @name        Show PTO in Days
// @namespace   com.barrelny.convertHoursToDays
// @description Convert hours to days for BETTER usability.
// @include     https://app.kinhr.com/*
// @version     1
// @grant       none
// ==/UserScript==
var htd = function(){
    var self = this;
    
    // get this option from db
    this.found = false;
    this.hoursPerDay = 8;
    this.init = function () {
        if (typeof($) == 'undefined') return;
        self.$targets = $('.js-hours-total');
        if (!self.$targets.length) return;
        clearInterval(window.htdTimer);
        self.$targets.each(self.setDays);
    }
    this.setDays = function () {
        var $el = $(this),
           $parent = $el.parent(),
           parentText = $parent.text(),
           hours = self.getHours(parentText),
           $markup = $('<span class="js-days-total"/>');
        $markup.html(' (' + hours / self.hoursPerDay.toFixed(2) + ' days)');
        $markup.appendTo($parent);
    }
    this.getHours = function (str) {
        return parseFloat(str.split(':').pop());
    }
    this.init();
}
window.htdTimer = window.setInterval(htd, 100);