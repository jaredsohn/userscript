// ==UserScript==
// @name       FollowShows Auto redirecter
// @namespace  http://followshows.com/
// @version    1.1
// @description  Redirects automatically to my favorite torrent site
// @match      http://followshows.com/queue*
// @copyright  2012+, Koen T'Sas
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
var serie;
var episode;
var cssStyle = { "position" : "absolute", "right" : "160px" };
var addLinks = function() {
        
        var unedited = $(this).children("a[href][title]").attr("href");
        unedited = unedited.substring(6);
        
        serie = unedited.substring(0, unedited.search("/"));
        while(serie.search("_") != -1)
        {
            serie = serie.replace("_",' ');
        }

        episode = unedited.substring(unedited.search("/") + 1);
        episode = episode.substring(episode.search("/") + 1);
        
        $(this).children(".watch-episode-button").before('<a class="LinkToKat" target="_blank" href="http://kickass.to/usearch/' + serie + " " + episode + '/?field=seeders&sorder=desc">Search kat.ph</a>');
        //test
        $(this).children(".LinkToKat").css(cssStyle);
        $(this).children(".LinkToKat").addClass("btn btn-default btn-small watch-episode-button");
};
$(function() {        
    $(".episode-queue-small").each(addLinks);
});
$(document).ready(function(){
    var cssStyleRefresh = { "position" : "relative", "top" : "-107px", "left" : "30px" };
    
    $("#more-container").append('<button class="btn btn-small refreshKat" href="#">Refresh</button>');
    
    $(document).on("click", ".refreshKat", function(){
        $(".LinkToKat").remove();
        $(".episode-queue-small").each(addLinks);
    });
});