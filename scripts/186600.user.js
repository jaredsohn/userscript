// ==UserScript==
// @name       CivClicker Number formatting
// @namespace  http://dhmholley.co.uk/civclicker.html
// @version    0.1
// @description  Formats numbers
// @match      http://dhmholley.co.uk/civclicker.html
// @copyright  2013+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


$(document).ready(function() {
    updateNumbers();
});

function updateNumbers() {
    $('.number').each(function(index, element){
    	// find the deepest child element
        var target = $(element).children();
        
        var number = formatNumber(target.html());
        
        target.html(number);
    });
}


function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}


