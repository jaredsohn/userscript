// ==UserScript==
// @name           SCPD Lecture Video Link Extractor
// @namespace      icydog
// @description    Finds the WMP stream address and produces an mencoder command for downloading the video.
// @version        1.2
// @icon           http://i.imgur.com/BsgCwgp.png
// @include        http://myvideos.stanford.edu/player/*
// @include        http://myvideosv.stanford.edu/player/*
// @grant          none
// ==/UserScript==
// Originally from: http://hawflakes.unoc.net/?p=28

// /html/body/div/div[13]/div/object/param

var queryParams = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

// Try to get the output file name like YYYY-MM-DD.avi
var output = "output";
if(queryParams && queryParams["lecture"] && queryParams["lecture"].length == 6) {
    var l = queryParams["lecture"];
    output = "20" + l.substr(0,2) + "-" + l.substr(2,2) + "-" + l.substr(4,2);
}

var link = findXPathNode("//*[@id=\"WMPlayer\"]");
var url = link.data.replace(/^http/,"mms");
findXPathNode("//*[@id=\"shadow_under_banner\"]").innerHTML = "mencoder " + url + " -ovc copy -oac copy -o " + output + ".avi";

function findXPathNode(xpath, start,doc) {
	var result = (doc == null ? document : doc).evaluate(xpath,(start == null ? document : start), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
	return (result.snapshotLength > 0 ? result.snapshotItem(0) : null);
}
