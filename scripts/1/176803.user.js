// ==UserScript==
// @name          Torrentz - torrage and zoink.it buttons
// @include       http://torrentz.*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant         none

// ==/UserScript==

var links = $(".results dl dt a");

links.each(function (index) {

    var x = $(this);
    var hash = x.attr("href").substring(1).toUpperCase();
    var txt = x.text();
    //http://torcache.net/torrent/BA514D45B146A72C057F6F127DA33635FCEBAA1B.torrent?title=[kat.ph]reginald.d.hunter.live.2011.dvdrip.xvid.haggis


    newlink = $("<a>");
    newlink.attr("href", "//torcache.net/torrent/" + hash + ".torrent?title=" + txt);
    newlink.html("<img src='http://torcache.net/favicon.ico' />");
    x.parent().prepend(" ");
    x.parent().prepend(newlink);

    newlink = $("<a>");
    newlink.attr("href", "http://zoink.it/torrent/" + hash + ".torrent");
    newlink.html("<img src='http://zoink.it/favicon.ico' />");
    x.parent().prepend(" ");
    x.parent().prepend(newlink);

    var newlink = $("<a>");
    newlink.attr("href", "http://torrage.com/torrent/" + hash + ".torrent");
    newlink.html("<img src='http://torrage.com/favicon.png' />");
    x.parent().prepend(" ");
    x.parent().prepend(newlink);

});