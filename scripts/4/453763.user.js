// ==UserScript==
// @name           Gazelle: Highlight bitrates
// @namespace      pankkake
// @description    Highlight some bitrates
// @include        http://what.cd/*
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @include        https://mutracker.org/*
// ==/UserScript==

(function()
{
    var preferredBitrates   = /FLAC/;   // Highlight whatever you want from the above list, separated by |s, in between /s.
    var highlightStyle = "font-weight: bold !important";

    var classes = ['group_torrent', 'torrent'];

    for (var i = 0; i < classes.length; i++) {
        var links = document.getElementsByClassName(classes[i]);

        Array.forEach(links, function (el) {
            if (el.innerHTML.search(preferredBitrates) > -1)
            {
                var cols = el.getElementsByTagName('td');
                Array.forEach(cols, function (el) {
                    el.setAttribute('style', highlightStyle);
                });
            }
        });
    }
})();
