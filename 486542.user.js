// ==UserScript==
// @name      Comic Rocket Async Add Comic
// @namespace  http://torbenbrumm.de/
// @version    1.0
// @description  Allows adding of comics of Comic Rocket (http://www.comic-rocket.com) to 'My Comics' without leaving the current page.
// @match      https://www.comic-rocket.com/*
// @copyright  2014, Torben Brumm
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

/*
 * Constants for background colors of the clicked link.
 * */
var LINK_BACKGROUND_COLOR = '#3d362f';
var LINK_BACKGROUND_COLOR_HOVER = '#484136';

$(function() {
    $('a.comics-item-add').each(
        function() {
            var addLink = $(this);
            var addLinkURL = addLink.attr('href');
            var comicName = addLinkURL.substring(addLinkURL.indexOf('/read/') + 6, addLinkURL.lastIndexOf('/'));

            addLink.click(function(event) {
                event.preventDefault();

                if (!addLink.data("clicked")) {
                    addLink.data("clicked", true);
                    adjustLinkLayoutAfterClick(addLink);
                    addComicToMyComics(comicName);
                }
            });
        }
    );
});

/*
 * Adjusts the layout of the clicked link by changing the background color.
 * */
function adjustLinkLayoutAfterClick(addLink) {
    addLink.css('background-color', LINK_BACKGROUND_COLOR);
    addLink.mouseenter(function() {
        $( this ).css('background-color', LINK_BACKGROUND_COLOR_HOVER);
    }).mouseleave(function() {
        $( this ).css('background-color', LINK_BACKGROUND_COLOR);
    });
}

/*
 * Adds the given comic to 'My Comics'.
 * */
function addComicToMyComics(comicName) {
    $.get("https://www.comic-rocket.com/navbar/" + comicName + "/1/?mark", function() {
        handleAddedComic(comicName);
    });
}

/*
 * Handles the added comic by updating the comic item on the current page.
 * */
function handleAddedComic(comicName) {
    $.get("https://www.comic-rocket.com/", function(data) {
        var originalItem = getComicItemByName(comicName, document);
        var newItem = getComicItemByName(comicName, data);
        if (newItem.size() == 0) {
            // try again until it shows up in 'My Comics'
            handleAddedComic(comicName);
        } else {
        	originalItem.replaceWith(newItem);
        }
    });
}

/*
 * Returns the comic item for the given comic name in the given page.
 * */
function getComicItemByName(comicName, pageDOM) {
    return $(pageDOM).find("div.comics-item").has("a.comics-item-info[href='/explore/" + comicName + "/']");
}
