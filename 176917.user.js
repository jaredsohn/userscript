// ==UserScript==
// @name           Favorites Filter (FF.net)
// @namespace      fanfiction
// @include        http://www.fanfiction.net/u/*
// @grant       none
// ==/UserScript==
// Original source code written by Jed Long (http://userscripts.org/scripts/show/124523)
// Editted by lazyass123 

// ~~~~ Description ~~~~ //

/* This script allows a user to filter the favorite stories of a fanfaction user based 
 * on each story's word count, number of reviews, status, and category. 
 * these stories can be further filtered based on last update and original publish date 
 */
 
// ~~~~ How To ~~~~ //

/* To run the script, visit a FF.net user' profile page. To the right of the
 * Favorite Stories" tab will be a "Filter Favorites" tab. Click it to run the
 * filter. To see the filtered results, click on the "Favorite Stories" tab.
 * If none of the stories fit your filter criteria, the original story list will be
 * displayed but FF.net's sort function will not work.
 * To remove the effects of the filter, refresh the page 

 * Below you can alter the default settings that the filter will follow, 
 * each parameter is accompanied with a description of its purpose. 
 * In addition, you can choose to chose to be prompted for a filter criteria
 * at run time by altering the variables in "Prompt Settings". 
 * The "Advance Settings" will allow you to filter based on when a story was
 * first published or last updated.
 */

// ~~~~ Default Settings ~~~~ //

// Default parameters of the filter. These will be used even if the prompt is turned off
var minWordCount = 0; // Minimum number of words in the story (Default=0)
var minReviews = 0; // Minimum number of reviews for the story (Default=0)
var filterComplete = 0; // Status of the story (0-all,1-in progress, 2-complete) (Default=0)
var filterCategory = "Harry Potter"; 
// Single category to limit story select to (must use exact name!) 

// ~~~~~ Prompt Settings ~~~~ //

// Set each to 1 if you wish to be prompted to change the given parameter upon filtering (Default=1)
var promptWordCount = 1;
var promptReviews = 1;
var promptComplete = 1;
var promptCategory = 1;

// ~~~~~ Advance Settings ~~~~~~ //

// If limitUpdate is 1, filtered out stories that have not been updated since the set date 
var limitUpdate = 1; 
var maxLastUpdate = [2013,5,1]; // [yyyy,mm,dd] 

// If limitPublished is 1, filtered out stories that were written before set date 
var limitPublished = 0;
var minLastPublished = [1970,0,0]; //[yyyy/mm/dd] 

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

var aFavoriteOriginal;
var maxUpdateDate = new Date(maxLastUpdate[0], maxLastUpdate[1] - 1, maxLastUpdate[2]);
var minPublishDate = new Date(minLastPublished[0], minLastPublished[1] - 1, minLastPublished[2]);

function iniciar() {
    aFavoriteOriginal = window.fs_array;
    addButtons();
}

function filterFavorites() {
    var aFavoriteFiltered = new Array();
    if (promptWordCount == 1) {
        minWordCount = parseInt(prompt("Minimum word count?", minWordCount));
    }
    if (promptReviews == 1) {
        minReviews = parseInt(prompt("Minimum number of reviews?", minReviews));
    }
    if (promptComplete == 1) {
        filterComplete = parseInt(prompt("In progress or complete? \r\n (0-both, 1-in progress only, 2- complete only:", filterComplete));
    }
    if (promptCategory == 1) {
        filterCategory = prompt("Category Name (Leave blank for all)", filterCategory);
    }

    for (var i = aFavoriteOriginal.length - 1; i >= 0; --i) {
        if (validateCond(aFavoriteOriginal[i])) {
            aFavoriteFiltered.push(aFavoriteOriginal[i]);
        }
    }
    //	alert ('filtrats: '+ aFavoriteFiltered.length);
    window.fs_array = new Array();
    window.fs_array = aFavoriteFiltered;
    window.storylist_draw('fs_inside', window.fs_array, 1, 1, 1);
}

function validateCond(obj) {

    var validat = true;
    if (minWordCount > 0 && obj.wordcount < minWordCount) {
        validat = false;
    }
    if (minReviews > 0 && obj.ratingtimes < minReviews) {
        validat = false;
    }
    if (filterComplete != 0 && obj.statusid != filterComplete) {
        validat = false;
    }
    if (filterCategory != obj.category) {
        validat = false;
    }
    if (limitUpdate == 1 && maxUpdateDate > obj.dateupdate && obj.statusid != 2) {
        validat = false;
    }
    if (limitPublished == 1 && minPublishDate > obj.datesubmit) {
        validat = false;
    }
    return validat;
}

function addButtons() {
    var elem = document.getElementById('l_fs').parentNode;
    var addFiltrarFavoritsButton = document.createElement('a');

    addFiltrarFavoritsButton.href = 'javascript:';
    addFiltrarFavoritsButton.innerHTML = 'Filter Favorites';
    addFiltrarFavoritsButton.setAttribute('title', 'Filter favorite stories by params');
    addFiltrarFavoritsButton.addEventListener('click', filterFavorites, false);

    elem.appendChild(document.createTextNode(''));
    elem.appendChild(addFiltrarFavoritsButton);
}

iniciar();