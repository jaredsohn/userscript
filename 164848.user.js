// ==UserScript==
// @name            Jump to Last Watched AnimeLoads
// @namespace       https://userscripts.org/scripts/review/164848
// @version         0.4
// @description     Scroll to last watched Anime Episode on Anime Loads
// @updateURL       https://userscripts.org/scripts/source/164848.meta.js
// @downloadURL     https://userscripts.org/scripts/source/164848.user.js
// @homepageURL     https://userscripts.org/scripts/show/164848
// @include         http://www.anime-loads.org/media/*
// @require         http://code.jquery.com/jquery-latest.min.js
// @copyright       2012+, Flex
// ==/UserScript==

var lastLabel;
var errMsg;

function findLastLabel() {
    var table, labels, foundFirstWatched, foundLabel;
    table = $("#partlist");
    labels = table.find(".ui-icon", ".watched");
    foundFirstWatched = false;
    foundLabel = null;
    labels.each(function() {
        var label = $(this);
        if(label.children().length == 1 && label.children().first().text().indexOf("angesehen") >= 0) {
            if(label.attr("aria-pressed") == "true") {
                foundFirstWatched = true;
                foundLabel = label;
                return true;
            }
            if (foundLabel == null) {
                foundLabel = label;
                return false;
            }
            if(foundFirstWatched) {
                return false;
            }
        }
    });
    return foundLabel;
}

function scrollToLast() {
    var newLabel = findLastLabel();
    if(newLabel != lastLabel) {
        lastLabel = newLabel;
    }
    if(lastLabel != null) {
        errMsg.css("display", "none");
        $('body').scrollTo(lastLabel);
    } else {
        errMsg.css("display", "inline");  
    }
}

function init() {
    $.fn.scrollTo = function( target, options, callback ){
        var userOptions, userCallback, settings;
        userOptions = options;
        userCallback = callback;
        if(typeof userOptions == 'function' && arguments.length == 2){ userCallback = userOptions; userOptions = target; }
        settings = $.extend({
            scrollTarget  : target,
            offsetTop     : 50,
            duration      : 500,
            easing        : 'swing'
        }, userOptions);
        return this.each(function(){
            var scrollPane, scrollTarget, scrollY;
            scrollPane = $(this);
            scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
            scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop, 10);
            scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration, 10), settings.easing, function(){
                if (typeof callback == 'function') { callback.call(this); }
            });
        });
    };
    var comments, clickMe, buttonText;
    comments = $('a.comments, a.littlelink');
    comments.parent().append("<br/>");
    clickMe = $("<label></label>");
    clickMe.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only');
    clickMe.attr("role", "button");
    comments.parent().append(clickMe);
    buttonText = $("<span></span>");
    buttonText.addClass('ui-button-text');
    buttonText.text("Scroll to last watched");
    buttonText.click(scrollToLast);
    clickMe.append(buttonText);
    errMsg = $("<div></div>");
    errMsg.css("display", "none");
    errMsg.css("color", "#ff0000");
    errMsg.text("Fehler kein Scrollpunkt");
    comments.parent().append(errMsg);
}

$(document).ready(init);