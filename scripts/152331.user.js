// ==UserScript==
// @name       Realt.by parser
// @namespace  http://maxikar.userscripts.org
// @version    0.1
// @description  Realt.by parser
// @match      http://realt.by/*
// @copyright  2012, MaxIkar
// @require http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

(function() {
    var adverts = [
    ];    
    
    loadNewAdverts(adverts);    
    hideOldAdverts(adverts);    
        
    function loadNewAdverts(oldAdverts) {
        //http://realt.by/sale/flats/object/408241/
        var urls = $('table#list a:contains("Подробнее")');        
        var adverts = $.map(urls, $.proxy(function(url) {
            var arr = $(url).attr('href').match(/http:\/\/realt.by\/sale\/flats\/object\/(\d+)\//);
            if (arr.length < 2 || $.inArray(arr[1], oldAdverts) > -1) {
                return null;
            }
            return arr[1];
        }, this));
        if (adverts.length) {
            alert('New alerts:\n' + JSON.stringify(adverts));
        }
    }
    
    function hideOldAdverts(oldAdverts) {
        var urls = $('table#list a:contains("Подробнее")');
        urls.each($.proxy(function(index, url) {
            var url = $(url);
            var arr = url.attr('href').match(/http:\/\/realt.by\/sale\/flats\/object\/(\d+)\//);
            if (arr.length > 1 && $.inArray(arr[1], oldAdverts) > -1) {
               var tr = url.parent().parent().parent();
                tr.children().css('background-color', '#999');
                tr.prev().children().css('background-color', '#999');
            }            
        }, this));
    }
})();
