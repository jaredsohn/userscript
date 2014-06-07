// ==UserScript==
// @name       Couch Futon Alphabetical Database Sort
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Alphabetically sort the list of databases in Futon
// @match      http://*:5984/_utils/*
// @include       http://*:5984/_utils/*
// @copyright  2013, TAV
// ==/UserScript==

(function($) {
    $(document).ajaxSuccess(function(event, xhr, settings) { 
        if (settings.url === '../_all_dbs') {
            var dbs = JSON.parse(xhr.responseText);
            xhr.responseText = JSON.stringify(dbs.sort());
        }
    });
})(jQuery);