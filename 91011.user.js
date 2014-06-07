// ==UserScript==
// @name           offical.fm downloader
// @namespace      com.falott.officalfmdownloader
// @description    Lets you download all tracks from official.fm
// @include        http://*official.fm/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// Contact         greasemonkey@falott.com
// ==/UserScript==

GM_log("started");

// medium playlist

var tr = $("LI.tracks.medium.tracklist");

tr.each(function() {
    var t = $(this).find("div.info");
    var links = t.find("div.links ul");
    if(links.find("a.download").size()==0) {
        var trackId = $(this).attr("id");
        trackId = trackId.substr(6,trackId.length-1);
        var trackTitle = t.find("DIV.title A").text();
        var trackArtist = t.find("span.artist a").text();
        links.eq(1).prepend('<li><span class="submit"><a href="'+makeDownload(trackId,trackArtist+" - "+trackTitle)+'" style="background-position:0 -323px">download</a></span></li>');
    }
});

// small playlist

tr = $(".pane.tracklist LI.tracklist");
tr.each(function() {
    if($(this).find("a.download").size()==0) {
        var trackId = $(this).attr("id");
        trackId = trackId.substr(6,trackId.length-1);
        var trackName = $(this).find("SPAN.title A").attr("title");
        $(this).children("div:eq(1)").prepend('<div class="download"><a style="background-color:#0A759E;color:#FFFFFF;font-size:10px;padding:1px 2px 0;" href="'+makeDownload(trackId,trackName)+'">download</a></div>');
    }
});

function makeDownload(trackId,trackName) {
    var url = "http://cdn.official.fm/downloads/mp3s/";
    var trackFolder = Math.floor(trackId/1000);
    url += trackFolder+"/"
    +trackId+"/"+urlready(trackName)+".mp3";
    return url;
}

function urlready(str) {
    return str.replace(/\s/g,"_");
}