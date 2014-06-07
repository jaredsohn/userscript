// ==UserScript==
// @name           Import Amazon Listings into MusicBrainz
// @namespace      MBAZN
// @description    Imports an Amazon listing into MusicBrainz
// @include        http://www.amazon.com/*
// @include        http://www.amazon.co.uk/*
// @include        http://www.amazon.ca/*
// @include        http://www.amazon.co.jp/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.fr/*
// @version        0.2.0beta

// @credits        brianfreud
// ==/UserScript==


var AmazonAccessKey = "0WDPQDZC4JM24FMBG882", 
    releaseArtist, releaseTitle, releaseMonth, releaseDay, releaseYear, releaseLabel, releaseUPC, albumInfoURL, discCount;

// Extract ASIN from the current URL
function extractAmazonId(url) {

    if (result = url.match(/\/([A-Z0-9]{10})(?:[\/?]|$|#)/)) return result[0].replace(/\//g,"");

    return null;

}

function ImportAtAmazon(disc, trackTitles) {
    var importAmazon = "http://musicbrainz.org/cdi/enter.html?hasmultipletrackartists=0&artistid="

    if (releaseArtist == "Various Artists") importAmazon += "1";

    else importAmazon += "2";

    importAmazon += "&artistedit=1&artistname=" 

                 + encodeURI(releaseArtist)
                 + "&releasename="
                 + encodeURI(releaseTitle);
    if (discCount > 1) {
        importAmazon += encodeURI(" (disc " + disc + ")");
    }
    importAmazon += "&tracks=" + (trackTitles.length);
    for (var i = 0; i < trackTitles.length; i++) {

        importAmazon += "&track" + i + "=" 

                     + encodeURI(trackTitles[i])
                     + '&trackseq' + i + "=" + (i+1)
                     + '&tracklength' + i + '=%3F%3A%3F%3F'
                     + '&tr' + i + '_artistname=' + encodeURI(releaseArtist)
                     + '&tr' + i + '_mp=0';

    }
    importAmazon += '&submitvalue=Keep+editing'
                 + '&rev_year-0=' + releaseYear
                 + '&rev_month-0=' + releaseMonth
                 + '&rev_day-0=' + releaseDay
                 + '&rev_country-0=239&rev_format-0=1'
                 + '&rev_barcode-0=' + releaseUPC
                 + '&rev_labelname-0=' + releaseLabel
                 + '&attr_type=1&attr_status=100&attr_script=28&attr_language=120'
                 + '&notetext=' + encodeURI(location.href);

    GM_openInTab(importAmazon)
}

// Parse release track data out of returned Amazon XML
function parseTrackData(data) {
    discCount = data.getElementsByTagName('Disc').length;
    for (var i = 0; i < discCount; i++) {
        var tracks = data.getElementsByTagName('Disc')[i].getElementsByTagName('Track'),
            trackTitles = [];
        for (var j = 0; j < tracks.length; j++) {
            trackTitles.push(tracks[j].textContent);
        }
        ImportAtAmazon((i+1), trackTitles);
    }
}

// Parse release data out of returned Amazon XML
function parseReleaseData(data) {
    if (data.getElementsByTagName('Artist').length > 0) {
        releaseArtist = data.getElementsByTagName('Artist')[0].textContent;
    } else if (data.getElementsByTagName('Author').length > 0) {
        releaseArtist = data.getElementsByTagName('Author')[0].textContent;
    } else if (data.getElementsByTagName('Creator').length > 0) {
        releaseArtist = data.getElementsByTagName('Creator')[0].textContent;
    }
    releaseTitle = data.getElementsByTagName('Title')[0].textContent;
    if (data.getElementsByTagName('Publisher').length > 0) {
        releaseLabel = data.getElementsByTagName('Publisher')[0].textContent;
    }
    if (data.getElementsByTagName('ReleaseDate').length > 0) {
        releaseYear = data.getElementsByTagName('ReleaseDate')[0].textContent.split("-")[0];
        releaseMonth = data.getElementsByTagName('ReleaseDate')[0].textContent.split("-")[1];
        releaseDay = data.getElementsByTagName('ReleaseDate')[0].textContent.split("-")[2];
    }
    if (data.getElementsByTagName('UPC').length > 0) {
        releaseUPC = data.getElementsByTagName('UPC')[0].textContent;
    }
    queryAmazon(albumInfoURL + '&ResponseGroup=Tracks', parseTrackData);
}

// Query the Amazon API

function queryAmazon(ASINurl, callback) {

    GM_xmlhttpRequest({

        method: 'GET',

        url: ASINurl,

        headers: {

            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',

        },

        onload: function(responseDetails) {
            var parser = new DOMParser();
            var xmldata = parser.parseFromString(responseDetails.responseText, "application/xml");
            callback(xmldata);

        }

    });

}

// Get album information

function getAlbumInfo(ASIN) {
    albumInfoURL = 'http://ecs.amazonaws.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=' +
                       AmazonAccessKey +
                       '&Operation=ItemLookup&ItemId=' +
                       ASIN;

    queryAmazon(albumInfoURL + '&ResponseGroup=Medium', parseReleaseData);
}

// Start the script
function importAmazon() {

    importLink.innerHTML = "Working...  Please wait.";

    var ASIN = extractAmazonId(location.href);
    GM_setValue("ImportingASIN", ASIN);

    getAlbumInfo(ASIN);

}

var importLink = document.createElement("a");

importLink.innerHTML = "Import into MusicBrainz";

importLink.style.position = "absolute";

importLink.style.top = "123px";

importLink.style.right = "5%";
importLink.style.padding = "2px";
importLink.style.background = "orange";

importLink.style.fontSize = "15px";

document.body.appendChild(importLink);

importLink.addEventListener("click", importAmazon, true);