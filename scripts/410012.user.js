// ==UserScript==
// @name       Geocaching Link @ Wikipedia
// @namespace  http://www.daniel-puscher.de/
// @version    0.1
// @description  Fügt zu Wikipedia-Einträgen mit Koordinaten einen Link zur Geocaching Karte hinzu (rechts oben)
// @match      http://tools.wmflabs.org/geohack/geohack.php?*
// @match      http://*.wikipedia.org/*
// @copyright  2014+, Daniel Puscher
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function($){
    if(document.location.href.match(/^http:\/\/tools\.wmflabs.org\/geohack\/geohack\.php/)){   
        var lat = $(".geo .latitude:first").text();
        var lon = $(".geo .longitude:first").text();
        
        var li = $("<li/>");
        var a = $("<a/>");
        a.attr("href", "http://www.geocaching.com/map/#?ll="+lat+","+lon+"&z=17");
        a.attr("class", "external text");
        a.html("<b>Geocaching.com</b> - Karte");
        
        li.append(a);
        
        $("#mw-content-text ul:first").prepend(li);
    }
    else if(document.location.href.match(/\.wikipedia\.org/)){
        if($(".geo.microformat").length > 0 && $("#coordinates").length > 0){
            var lat = $(".geo.microformat .latitude:first").text();
        	var lon = $(".geo.microformat .longitude:first").text();

            var sep = $('<span/>');
            sep.attr("class", "noprint coordinates-separator");
            sep.text(" | ");

            var img = '<img title="Auf Geocaching.com Karte anzeigen" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AUHDggbtD2v0wAAAntJREFUOMttk21ojlEYx3/Xue/nZaOJeIZE7MXMMK0hK75MYmpFjRr5QimlfJKaevJFvs0nKdFCIYoUZbMmmuUlrfZhymbr8brFSDztvp9zLh+eZ+zGVaerc3X6nf+5rv+R/iei1kL5MqX9rMeJk5abVwy7mh0o6bWP96DWpUWE/4VZWaVs3hHjdLtH3zPDju0xVtc41OUPZNqfuomuUezPEMy/EDP0BrY1Os5e8HjYK2xqcFRUwtSFn+8PS+bMcwZabvHhfD94UYhfWQHXLufY0hTjzahwrM1n4Xxlb6uDEOoe7pPs0Fcduz4oycUlYBUE1Ckigo/CyGvoemD4NDzJ2Liwan2ceCykZafDfg+Ip4pl0ZE6QAnHs0x0j5LaswKsYgA6ewwIpJZCTbXy6mVAEALJaVqdAsLYtUE+dAxgvwf5HgC8fSckigDNr8oyZW+Lg+xfHXNKaneVAkx0joCAD6Qry5V1tUEeEI2eQk5PFZJLZqHYMJv55iEYX27fQYYHRHuP/5Crd2fgbAQz6U5FkZ+Bjo0xAMYzeQWaSKgPYl88Ua2tF/6YJg2gqulE3IBvIqwga/EBqKgW4nHMvVti6xsgF0bNYoRDF0c41/mxUFEa18zhztGKAiCXw7YegNKFkMuB5+VzQYkq1C4uRmIe6pSrh8vZvWEOk4ErAFC0sQmshU/vMTcu4VoPKvNKfSbJAdQvnUF5aYLetmpKijyCcMpIv0fkwBik/zmm7xGm75EAt+nY2ASwfEGS5rWzKSnyolaO7FTRrc3kNjUij7thbqoKugCYOdMn8yUg5gnhtEH5qML0r6oOkkX5J0EZLg+wgWN/w1ycRs3yC6KXAn0PRzbrAAAAAElFTkSuQmCC" />';

            var a = $("<a/>");
        	a.attr("href", "http://www.geocaching.com/map/#?ll="+lat+","+lon+"&z=17");
        	a.attr("class", "noprint");
        	a.html(img);
			
            $("#coordinates").append(sep);
            $("#coordinates").append(a);
        }
    }
})(jQuery);