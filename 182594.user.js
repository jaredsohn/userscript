// ==UserScript==
// @name        vi nCore
// @namespace   https://ncore.cc/
// @description This script adds vi like keybinding to nCore.
// @include     https://ncore.cc/torrents.php*
// @version     1.0
// @grant       none
// @run-at      document-end
// ==/UserScript==

/**
 * vi nCore
 * This script adds vi like keybindings to nCore.
 * h - previous page
 * j - next torrent (down)
 * k - previous torrent (up)
 * l - next page
 * o - open torrent's local info
 * v - view the main picture if one
 * d - download torrent
 */

/**
 * function isInView
 * @author Sam Deering
 * @source http://www.jquery4u.com/dom-modification/jquery-check-element-view/
 */
function isInView(elem) {
    var docViewTop = $(window).scrollTop(),
        docViewBottom = docViewTop + $(window).height(),
        elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).height();
    if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
        return true;
    } else {
        return false;
    }
}

var currentTorrent;
var nextTorrent;

function selectFirstTorrent() {
    if (currentTorrent !== undefined) {
        currentTorrent.removeClass('currently_selected').css({'box-shadow':''});
    }
    currentTorrent = $('.box_torrent').first();
    currentTorrent
     .addClass('currently_selected')
     .css({'box-shadow': '3px 0 0 0 #8B0000 inset'});
}

function nextSelection(direction) {
    if (direction !== 'backward') {
        nextTorrent = currentTorrent.nextAll('.box_torrent').first();
    } else {
        nextTorrent = currentTorrent.prevAll('.box_torrent').first();
    }
    
    if(nextTorrent.is('div') === true) {
        currentTorrent
        .removeClass('currently_selected')
        .css({'box-shadow':''});

        nextTorrent.addClass('currently_selected')
        .css({'box-shadow': '3px 0 0 0 #8B0000 inset'});
        currentTorrent = nextTorrent;
        if (isInView(nextTorrent) === false) {
            nextTorrent[0].scrollIntoView();
        }
    }
}

function openTorrent() {
    if (currentTorrent === undefined) {
        return false;
    }
    currentTorrent.find('nobr').parent().trigger('onclick');
}

function downloadTorrent() {
    var infoDiv = currentTorrent.next().next();
    var itWasClosed = false;
    if (infoDiv.is(':visible') === false) {
        openTorrent();
        itWasClosed = true;
    }
    if (itWasClosed === true) {
        openTorrent();
    }
    var link = infoDiv.find('div.letoltve_txt a').attr('href');
    window.location = link;
}

function toggleInfoPic() {
    var borito = currentTorrent.find('.box_nev2').find(':first-child').first();
    if(borito.attr('id').substring(0, 6) !== 'borito') {
        return false;
    }
    if (borito.is(':visible') === false) {
        currentTorrent.find('.infobar_ico').trigger('mouseover');
    } else {
        currentTorrent.find('.infobar_ico').trigger('mouseout');
    }
    
}

selectFirstTorrent();

$(document).keypress(function(event) {
    var e;
    switch (event.which) {
        case 100: // letter d
            downloadTorrent();
            break;
        case 104: // letter h
            e = $.Event('keydown');
            e.keyCode = 37;
            $(document).trigger(e);
            break;
        case 106: // letter j
            nextSelection('forward');
            break;
        case 107: // letter k
            nextSelection('backward');
            break;
        case 108: // letter l
            e = $.Event('keydown');
            e.keyCode = 39;
            $(document).trigger(e);
            break;
        case 111: // letter o
            openTorrent();
            break;
        case 118: //letter v
            toggleInfoPic();
            break;
    }
});