// ==UserScript==
// @name        Advanced Timecard slips
// @namespace   http://userscripts.org/users/martinboy
// @description Automatically Insert a date to the sleep title 
// @downloadURL http://userscripts.org/scripts/source/151812.user.js
// @updateURL   http://userscripts.org/scripts/source/151812.meta.js
// @version     1.0.0
// @include     https://timecard.ra/*
// @include     http://timecard.ra/*
// @require     https://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js
// @require     http://script.aculo.us/scriptaculous.js
// @require     http://script.aculo.us/effects.js
// @require     http://hacks.bluesmoon.info/strftime/strftime.js
// ==/UserScript==

var AdvancedTimecard = Class.create();
AdvancedTimecard.prototype = {
    initialize: function () {
        //showSlips();
        $$('.timeSlipIcon').each(function(element){
            //remove onclick inline action for the purpose of modify the standart one
            element.onclick = null;
            Event.observe(element, 'click', this.addTimeSlip.bind(this))
        }.bind(this));
    },
    
    addTimeSlip: function (event) {
        var type = 101;
        jQuery.ajax({
            url: "/pccreateslip?typecode=" + type + "&mode=" + displayMode + "&projectid=" + selectedProject,
            cache: false,
            success: function (html) {
                html = this.modifyNewSlipHtml(html);
            
                if (jQuery('.noSlips').length) {
                    jQuery('.placeholder').html(jQuery(html).css("height", "461px").fadeIn(250));
                    jQuery("input:text:visible:first").focus();
                } else {
                    scrollToRight(125);
                    jQuery('.placeholder').prepend(jQuery(html).animate({
                        height: ['461px', 'swing']
                    }, 494, function () {
                        jQuery("input:text:visible:first").focus();
                    }));
                }
                formatSlips();
            }.bind(this),
            complete: statusCodeCheck
        });
    },
    modifyNewSlipHtml: function (html) {
        var d1=new Date();
        html = html.replace("value=\"New Slip\"", "value=\"" + d1.strftime('%Y-%m-%d') + "\"");
        return html;
    }
}
document.observe('dom:loaded', function () { new AdvancedTimecard();});