// ==UserScript==
// @name       Highlight today's starred Teux Deux items
// @namespace  http://www.twitter.com/maziltov
// @version    0.1
// @description  Add an asterisk to the end of your Teux Deux items to highlight them today.
// @match      https://teuxdeux.com/
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.js
// ==/UserScript==

$(function(){
    
    var sortables = $(".ui-sortable");
    var searchString = "*";
    var searchHighlightCSS = { 'font-weight': 'bold'};

    var refreshStarred = function(){
        var starred = $(".present .todo-item-list .todo-short-text:contains('"+searchString+"')");
    	starred.css(searchHighlightCSS);
    };
    
    // Reapply styles after Teux Deux items are reordered
    sortables.on("mouseout", refreshStarred);
    
    // Apply styles on load
    refreshStarred.call();
    
});


