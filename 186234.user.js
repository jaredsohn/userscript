// ==UserScript==
// @name        Spoilered IMDb Episodes
// @namespace   http://github.com/lpsamuelm/
// @description Hides episode list on IMDb pages by default and adds spoiler buttons. You don't want to accidentally see if a character leaves a show halfway through.
// @include     *.imdb.com/name/*
// @include     *.imdb.com/title/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1.2.2
// @grant       none
// ==/UserScript==

// Dedicated to @freddefripp.

// CSS for button states
var epButtonCss = ".epButton, .allEpButton { \n\
    display: inline-block; \n\
    float: right; \n\
    height: 14px; \n\
    padding: 2px; \n\
    border-radius: 2px; \n\
    background-color: #FFFFFF; \n\
    font-size: 0.8em; \n\
    cursor: pointer; \n\
    \n\
    -webkit-touch-callout: none; \n\
    -webkit-user-select: none; \n\
    -khtml-user-select: none; \n\
    -moz-user-select: none; \n\
    -ms-user-select: none; \n\
    user-select: none; \n\
}\n";
var ebPressedCss = ".ebPressed { \n\
    background-color: rgb(246, 246, 245); \n\
}\n";
var charEpCss = ".charEpText { \n\
    display: inline; \n\
}\n";
var allEpConCss = "#allEpContainer { \n\
    display: inline-block; \n\
    float: right; \n\
    overflow: hidden; \n\
}\n";

var cssArr = [epButtonCss, ebPressedCss, charEpCss, allEpConCss]

var filmselector = '#filmography .filmo-category-section .filmo-row';
var charselector = '.cast_list tbody tr .character';

var fadeNHide = function($peekaboo) {
    $peekaboo.fadeTo(400, 0, function(){
        $peekaboo.css('visibility', 'hidden'); // For browsers that don't do opacity
    });
}
var fadeNShow = function($peekaboo) {
    $peekaboo.css('visibility', 'visible'); // Same here
    $peekaboo.fadeTo(400, 1);
}

$(document).ready(function() {
    $('html > head').append('<style type="text/css">' + cssArr.join('') + '</style>')
    var $tvEntries      = $(filmselector + ' .filmo-episodes').parent();
    var $charEntries    = $(charselector);
    var $epButton       = $("<div></div>", {"class": "epButton", "text": "EPISODES",});
    var $allEpButton    = $("<div></div>", {"class": "allEpButton", "text": "ALL EPISODES",});
    var seriesNotMovie  = ($('#title-overview-widget #title-overview-widget-layout tbody tr #overview-top .infobar').text().toLowerCase().match('tv series') || $('#sidebar .nobr').text().toLowerCase().match('tv series'))
    var epCountRe       = /\([0-9]+\sepisode[^)]+\)/

    if (window.location.pathname.match('/name/')) { // Actor pages
        // Lets the button take up space and resize show entries
        $tvEntries.css("overflow", "hidden");
        
        // Adds toggle to every TV series entry
        $tvEntries.find('.filmo-episodes:first-of-type').before($epButton)
        
        if (!($('#jumpto').length)) { // Adds #jumpto div needed for .allEpsButton on actor pages
            $('#filmography').before($('<div></div>', {'id': 'jumpto'}));
        }
        $('#jumpto').css({'overflow': 'hidden'});
        $('#jumpto').append($allEpButton);
    
        $($tvEntries).children('.filmo-episodes').hide() // Starts spoilered
        $('.epButton').click(function() { // Shows and hides the episode list
            var $epDiv = $(this).parent().children('.filmo-episodes'); // All single-episode divs in the current filmo-row
            if ($epDiv.is(':visible') && !($epDiv.is(':animated'))) {
                $epDiv.hide(400);
                $(this).toggleClass('ebPressed');
            }
            else if (!($epDiv.is(':animated'))) {
                $epDiv.show(400);
                $(this).toggleClass('ebPressed');
            }
            var allChecked = false;
            if ($('.epButton.ebPressed').length == $('.epButton').length) {
            	allChecked = true;
            }
            if (allChecked) {$('.allEpButton').addClass('ebPressed')} else {$('.allEpButton').removeClass('ebPressed')} // Checks allEpButton if every epButton is checked
        })
        $('.allEpButton').click(function() {
            if (!($('.filmo-episodes:animated').length)) {
                if ($('.epButton').length > 50) { // Too many simultaneous animations cause lag.
                    var fadeHide = function($o) {
                        $o.hide();
                    }
                    var fadeShow = function($o) {
                        $o.show();
                    }
                }
                else {
                    var fadeHide = function($o) {
                        $o.hide(400);
                    }
                    var fadeShow = function($o) {
                        $o.show(400);
                    }
                }
                if (!($(this).hasClass('ebPressed'))) {
                    $('.epButton').not('.ebPressed').addClass('ebPressed');
                    fadeShow($('.filmo-episodes'));
                    $('.allEpButton').addClass('ebPressed');
                }
                else {
                    $('.epButton.ebPressed').removeClass('ebPressed');
                    fadeHide($('.filmo-episodes'));
                    $('.allEpButton').removeClass('ebPressed');
                }
            }
        });
    }
    else if (window.location.pathname.match('/title/') && seriesNotMovie) { // TV show pages
        // Only for TV series, not movies
        var $nameAndEps = $charEntries.children('div:first-of-type');
        $nameAndEps.css({'display': 'inline', 'overflow': 'hidden',}); // Puts episode button next to episodes, not under

        $charEntries.append($epButton);
        $charEntries.parent().parent().find('.castlist_label').css({'padding-right': '6px', 'padding-bottom': '8px'});
        $charEntries.parent().parent().find('.castlist_label').append($allEpButton);
        
        $nameAndEps.each(function() {
            var curEpText = $(this).text().match(epCountRe);
            if (curEpText) { // Puts number of episodes text in its own hideable div
                curEpText = curEpText[0]
                $(this).text($(this).text().replace(epCountRe, ''));
                $(this).append($("<div></div>", {'text': curEpText, 'class': 'charEpText'}));
                $(this).children('.charEpText').css({'visibility': 'hidden', 'opacity': '0'});
            }
        });
        
        $('.epButton').click(function() {
            var $textDiv = $(this).parent().find('.charEpText');
            if ($textDiv.css('visibility') == 'visible' && !($textDiv.is(':animated'))) {
                fadeNHide($textDiv);
                $(this).toggleClass('ebPressed');
            }
            else if (!($textDiv.is(':animated'))) {
                fadeNShow($textDiv);
                $(this).toggleClass('ebPressed');
            }
            var allChecked = true;
            $('.epButton').each(function() { // Toggles .allEpButton if all are selected
                if (!($(this).hasClass('ebPressed'))) {
                    allChecked = false;
                    return false;
                }
            });
            if (allChecked) {$('.allEpButton').addClass('ebPressed')} else {$('.allEpButton').removeClass('ebPressed')}
        });
        $('.allEpButton').click(function() {
            if (!($charEntries.find('.charEpText:animated').length)) {
                if ($('.epButton').length > 20) {
                    var fadeNShowTemp = function($o) {$o.css({'visibility': 'visible', 'opacity': '1'})}
                    var fadeNHideTemp = function($o) {$o.css({'visibility': 'hidden', 'opacity': '0'})}
                    }
                else {
                    var fadeNShowTemp = fadeNShow; // So apparently JS doesn't like duplicate
                    var fadeNHideTemp = fadeNHide; // function names. I don't know, scope, man.
                }
                // Unlike in the actor pages, these animations are very cheap (processing-wise).
                // No checking for number of divs is needed.
                if (!($(this).hasClass('ebPressed'))) { // Shows all episode number divs
                    $('.epButton').not('.ebPressed').addClass('ebPressed');
                    fadeNShowTemp($('.charEpText'));
                    $('.allEpButton').addClass('ebPressed');
                }
                else { // Hides all episode number divs
                    $('.epButton.ebPressed').removeClass('ebPressed');
                    fadeNHideTemp($('.charEpText'));
                    $('.allEpButton').removeClass('ebPressed');
                }
            }
        });
    }
});
