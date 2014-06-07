// ==UserScript==
// @name       Kijiji no-moar-click-events-plz
// @namespace  http://eepp.ca/
// @version    0.1
// @description  Disables click events on ads links so they may be opened in new tabs easily
// @match      http://*.kijiji.*
// @copyright  2012+, Philippe Proulx
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// for all search results rows
$('#SNB_Results tr').each(function() {
    // clone row (default cloning removes all event listeners, which is what we want)
    var clone = $(this).clone();
    
    // we still need to remove the 'onclick' attributes of links
    $(clone).find('a').removeAttr('onclick');
    
    // some fancy stuff to highlight row on mouse over (remove if you don't like)
    var bgColor = $(this).css('background-color');
    $(clone).hover(function() {
        $(this).css('background-color', '#eaeaea');
    }, function() {
        $(this).css('background-color', bgColor);
    });
    
    // append the clone to the table
    $('#SNB_Results').append(clone);
    
    // remove the real row
    $(this).remove();
});
