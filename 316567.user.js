// ==UserScript==
// @name       TripDatabase.com Download All
// @namespace  http://crebp.net.au
// @version    1.0
// @description  Script to automatically save all results in a TripDatabase search to an RIS file.
// @include    http://www.tripdatabase.com/search?*
// @include    http://tripdatabase.com/search?*
// @grant      none
// @require    http://medialize.github.io/URI.js/src/URI.min.js
// @copyright  2014+, Matt Carter <m@ttcarter.com>
// @downloadURL https://raw2.github.com/CREBP/GreaseMonkey/master/TripDatabase.com%20Download%20All.js
// @updateURL https://raw2.github.com/CREBP/GreaseMonkey/master/TripDatabase.com%20Download%20All.js
// ==/UserScript==

$(function() {
    $('<a class="btn"><i class="icon icon-download" style="font-size: 13px"></i> Download All</a>')
        .appendTo($('#results .results-meta'))
                .before(' ')
        .on('click', function() {
            var myURI = URI(window.location)
                .addSearch('max', '999999')
                .path('/search/ris');
            window.location.replace(myURI.toString());
        });
});
