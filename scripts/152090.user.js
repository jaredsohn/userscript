// ==UserScript==
// @name       Fixed CSW Ignore Function
// @namespace  http://www.houseofslack.com/
// @version    0.1
// @description  This script deletes the divs for the users in the specified ignore list on ConsimWorld.
// @match      http://talk.consimworld.com/*
// @copyright  2012+, Joshua Buergel
// @grant       none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var ignoreList = [
	'Hooplehead 1',
	'Hooplehead 2',
	'etc'
];
    
var mainTableRows = $('.ml > table > tbody > tr > td > table > tbody > tr');
mainTableRows.each(function() {
    var authorDiv = $(this).find('.mlAuthorName');
    if (authorDiv.length > 0) {
        var authorName = authorDiv.find('.size3').html();
        if (ignoreList.indexOf(authorName) > -1) {
            $(this).hide();
            // see if the user has a second line
            var secondLine = $(this).next().find('.mlSecondLine');
            if (secondLine.length > 0) {
                secondLine.html('THIS USER HAS BEEN TERMINATED.');
                $(this).next().next().hide();
            } else {
                // no second line, replace their message instead
                // note that we replace the entire div here - we want to get rid of their avatar (if any)
                // it's a little shouty, but oh well.  I don't want to dick around with the style much here
                $(this).next().html('<span class="mlSecondLine">THIS USER HAS BEEN TERMINATED.</span>');
            }
        }
    }
});
