// ==UserScript==
// @name       Comic Rocket Jump To Bookmark
// @namespace  http://torbenbrumm.de/
// @version    1.2
// @description  Adds another link to the 'My Comics' page of Comic Rocket (http://www.comic-rocket.com) which allows to start reading at the bookmarked page instead of the one after that. Also works on all other pages where the same kind of info box is used.
// @match      https://www.comic-rocket.com/*
// @copyright  2014, Torben Brumm
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

/*
 * Constants for background colors of the new link.
 * */
var LINK_BACKGROUND_COLOR = '#3d362f';
var LINK_BACKGROUND_COLOR_HOVER = '#484136';

/*
 * Main part that is executed on page load.
 * */
$(function() {
    $('div.comics-item').each(function() {
        insertLinkForComicItemIfNeeded(this);
    });
    monitorForAddedComicItems();
});

/*
 * Monitors the DOM for added comic items and inserts the links for them if needed.
 * */
function monitorForAddedComicItems() {
    var observer = new MutationObserver(function(mutations, observer) {
        if (mutations[0].addedNodes[0] && mutations[0].addedNodes[0].className=="comics-item") {
            insertLinkForComicItemIfNeeded($(mutations[0].addedNodes[0]));
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

/*
 * Inserts the link for the given comic item if needed.
 * */
function insertLinkForComicItemIfNeeded(comicItemDOM) {
    var comicItem = $(comicItemDOM);

    // only add for my comics with unread pages
    if (isMyComicAndHasUnreadPages(comicItem)) {

        var originalLink = comicItem.find('a.comics-item-read');

        // adjust css so 2 links fit
        originalLink.css({'width':'50%', 'display':'inline-flex'});

        // clone the link
        var clonedLink = originalLink.clone();

        // adjust layout of new link
        clonedLink.css('background-color', LINK_BACKGROUND_COLOR);
        clonedLink.mouseenter(function() {
            $( this ).css('background-color', LINK_BACKGROUND_COLOR_HOVER);
        }).mouseleave(function() {
            $( this ).css('background-color', LINK_BACKGROUND_COLOR);
        });

        // adjust URL of cloned link
        clonedLink.attr('href', getCloneLinkURLFromOriginalLinkURL(originalLink.attr('href')));

        // insert new link into DOM
        originalLink.before(clonedLink);
    }
}

/*
 * Checks if the given comic item is on the list of "My Comics" and has unread pages.
 * */
function isMyComicAndHasUnreadPages(comicItem) {
	var progressLabel = comicItem.find('div.progress-label');
    var progressString = progressLabel.text();
    var currentPage = progressString.substring(0, progressString.indexOf('/'));
    var totalPages = progressString.substring(progressString.indexOf('/') + 1);
    return currentPage != totalPages && parseInt(currentPage) > 0;
}

/*
 * Transforms the original link URL into the cloned link URL.
 * */
function getCloneLinkURLFromOriginalLinkURL(originalLink) {
    var urlWithoutPageNumberAndMark = originalLink.substring(0, originalLink.lastIndexOf('/') + 1);
    var pageNumberString = originalLink.substring(originalLink.lastIndexOf('/') + 1, originalLink.lastIndexOf('?'));
    var pageNumber = parseInt(pageNumberString);
    return urlWithoutPageNumberAndMark + (pageNumber - 1) + '?mark';
}
