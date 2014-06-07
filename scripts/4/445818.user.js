// Author: Jango
// Script to filter unwanted categories while browsing on HBrowse.com for hentai
// To add/remove categories, just edit the filteredCategories code below

// ==UserScript==
// @name        HBrowse filter
// @namespace   hbrowse
// @include     http://www.hbrowse.com/browse/*
// @description Filter hentai categories on HBrowse.com.
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==
$(document) .ready(function () {
    //console.log('jquery Working in HBrowse script');
});
var filteredCategories = [
    'anime',
    'futanari',
    'video_game',
    'gender_bender',
    'visual_novel'
];

function filterRows() {
    var $list = $('.browseCategories');
    //console.log('Inside filter rows');
    //console.log($list);
    if ($list.length > 0) {
        $list.each(function (index) {
            var elem = $list.get(index);
            for (var i in filteredCategories) {
                removeRowsWithCategory(elem, filteredCategories[i]);
            }
        });
    } 
    else {
        //console.log('browseCategories Not found');
    }
}
function removeRowsWithCategory(elem, category) {
    // Pretty print in Firefox script editor can damage the below line
    var links = $(elem) .find('a:contains(\'' + category + '\')');
    if (links.length) {
        //console.log(links, links.length);
        var row = links.parent() .parent();
        //console.log(row.text())
        var row_minus_1 = $(row) .prev();
        var row_minus_2 = $(row_minus_1) .prev()
        var row_next = $(row) .next();
        //console.log(row_minus_1.text());
        $(row) .remove();
        $(row_minus_1) .remove();
        $(row_minus_2) .remove();
        $(row_next) .remove();
    }
}

filterRows();
