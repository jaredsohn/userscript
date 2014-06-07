// ==UserScript==
// @name       Pirate Bay Rotten Tomatoes
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://thepiratebay.se/top/*
// @copyright  2012+, You
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==



$(".detName").each(function() {
    
    var cutoffStrings = ["(", "[", "2012", "2011", "2010", "2013", "2014", "2015", "unrated", "hdtv", "xvid", " -", " dvdrip", " cam", " ts"];
    
    // Replace all "." with spaces
    var movieText = $(this).text().replace(/\./g,' ')
    
    var cutoffpoint = movieText.length;
    for (var i = 0; i < cutoffStrings.length; i++)
    {
         var tempCutoff = movieText.toLowerCase().indexOf(cutoffStrings[i]);
         if ((tempCutoff < cutoffpoint) && (tempCutoff != -1))
             cutoffpoint = tempCutoff;
    }
    var filteredMovieName = movieText.substring(0, cutoffpoint);
    $(this).html($(this).html() + ' <a href="http://www.rottentomatoes.com/search/?search=' + filteredMovieName + '">RT</a>');
});

