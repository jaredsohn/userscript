// ==UserScript==
// @name       Comic Rocket Jump To Next Comic
// @namespace  http://torbenbrumm.de/
// @version    1.0
// @description  Allows to read all unread comics of Comic Rocket (http://www.comic-rocket.com) without the need to come back to the "My Comics" page. Clicking "Next" on the last page of a comic redirects to the first unread page of the first comic of "My Comics".
// @match      https://www.comic-rocket.com/navbar/*
// @copyright  2014, Torben Brumm
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

var URL_MYCOMICS = "https://www.comic-rocket.com";

$(function() {
    var nextLink = $('a[rel="next"]');
    var linkUrl = nextLink.attr('href');
    var nextPageNumber = parseInt(linkUrl.substring(linkUrl.lastIndexOf('/') + 1));
    
    if (nextPageNumber > getMaxPageNumber()) {
        nextLink.click(function(event) {
            event.preventDefault();
            loadNextUnreadComicPage();
        });
    }
})

/*
 * Returns the maximum page number the current comic has.
 * */
function getMaxPageNumber() {
    var lastPageLink = $('a[title="Last page"]');;
    if (lastPageLink != null && lastPageLink.text() != null) {
        return parseInt(lastPageLink.text().replace(/,/g, ''));
    }
    return 0;
}  

/*
 * Loads the next unread comic page of the first comic in the list of "My Comics". If all comics are read, loads the "My Comics" page.
 * */
function loadNextUnreadComicPage() {
    $.get(URL_MYCOMICS, function( data ) {
        var comicItem = $('div.comics-item', data).first();
        if (isMyComicAndHasUnreadPages(comicItem)) {
            top.location.href =  comicItem.find('a.comics-item-read').attr('href');
        } else {
            top.location.href =  URL_MYCOMICS;
        }
    })
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
