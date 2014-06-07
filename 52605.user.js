// ==UserScript==
// @name          private stuff
// @description	  For internal site
// @author        nibbo
// @require       http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {

    $('table.reportframe tr.odd td:first-child, table.reportframe tr.even td:first-child').click( function () {
        $('#idSearchString').val($(this).text());
        $('#onetIDGoSearch').click();
});

})();