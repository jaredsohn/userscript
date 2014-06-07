// ==UserScript==
// @name           Import Jamendo releases into MusicBrainz
// @namespace      MBVA
// @include        http://www.jamendo.com/en/album/*
// @include        http://www.jamendo.com/fr/album/*
// @include        http://www.jamendo.com/de/album/*
// @include        http://www.jamendo.com/it/album/*
// @include        http://www.jamendo.com/pl/album/*
// @include        http://www.jamendo.com/es/album/*
// @include        http://musicbrainz.org/cdi/enter.html*
// @include        http://musicbrainz.org/show/release/*
// @include        http://musicbrainz.org/edit/relationship/addurl.html*
// @version       1.0.0
// @credits        brianfreud for this one, also credit to 
// @credits        outsidecontext's original Jamendo import script
// ==/UserScript==
// Figure out where we are
if (location.href.slice(0, 37) == "http://musicbrainz.org/cdi/enter.html") ImportatMBAddRelease();
else if (location.href.slice(0, 47) == "http://musicbrainz.org/show/release/?releaseid=") ImportatMBAddExtra();
else if (location.href.slice(0, 52) == "http://musicbrainz.org/edit/relationship/addurl.html") ImportatMBAddExtra();
else {
    var importLink = document.createElement("a");
    importLink.innerHTML = "Import into MusicBrainz";
    importLink.style.position = "absolute";
    importLink.style.top = "128px";
    importLink.style.right = "50%";
    importLink.style.fontSize = "17px";
    document.body.appendChild(importLink);
    importLink.addEventListener("click", importJamendo, true);
}

var aName = "";
var rName = "";
var rTrackCount = 0;
var trackInfo = [];

function importJamendo() {
    importLink.innerHTML = "Working...  Please wait.";
    GM_setValue("JamendoURL", location.href);
    jamendoAlbumId = extractJamendoId(location.href);
    getAlbumInfo();
}

function ImportatMBAddRelease() {
    if (GM_getValue("JamendoImportStatus") == 0) {
        addOtherData();
    }
}

function ImportatMBAddExtra() {
    if (GM_getValue("JamendoImportStatus") == 2) {
        document.getElementById('btnYes').click();
        GM_setValue("JamendoImportStatus", 3);
    }
    if (GM_getValue("JamendoImportStatus") == 1) {
        fooLink = "http://musicbrainz.org/edit/relationship/addurl.html?id=" 
            + location.href.slice(47, 53) + "&linktype=34" 
            + "&type=album&name=Jamendo%20Imported %20Release";
        location.href = fooLink + "&url=" + GM_getValue("JamendoURL");
        GM_setValue("JamendoImportStatus", 2);
    }
}

// Get general album information
function getAlbumInfo() {
    var albumInfoURL = 'http://www.jamendo.com/get/album/list/album/data/json/?ids=' 
            + jamendoAlbumId + '&ali=info_common';
    queryJamendo(albumInfoURL,
    function(data) {
        GM_setValue("JamendoData", data);
        var data = eval(data);
        aName = data[0].filename.split(' - ')[0];
        rName = data[0].name;
        getTrackInfo();
    });
}

// Query track information for a Jamendo album
function getTrackInfo() {
    var trackInfoURL = 'http://www.jamendo.com/get/track/list/album/data/json/?ids=' 
            + jamendoAlbumId + '&tri=info_common';
    queryJamendo(trackInfoURL,
    function(data) {
        var data = eval(data);
        rTrackCount = data.length;
        for (var i = 0; i < rTrackCount; i++) {
            trackInfo[i] = [];
            trackInfo[i]["trackName"] = data[i].name;
            trackInfo[i]["trackLength"] = data[i].length;
        }
        ImportAtJamendo(data);
    });
}

// Query the Jamendo API
function queryJamendo(jamendoURL, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: jamendoURL,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        },
        onload: function(responseDetails) {
            callback(responseDetails.responseText);
        }
    });
}

function ImportAtJamendo(data) {
    var importJamendo = "http://musicbrainz.org/cdi/enter.html?hasmultipletrackartists=0&artistid="
    if (aName == "Various Artists") var importJamendo = importJamendo + "1";
    else var importJamendo = importJamendo + "2";
    var importJamendo = importJamendo + "&artistedit=1&artistname=" 
            + encodeURI(aName) + "&releasename=" + encodeURI(rName) 
            + "&tracks=" + (rTrackCount);
    for (i = 0; i < rTrackCount; i++) {
        var importJamendo = importJamendo + "&track" + i + "=" 
            + encodeURI(trackInfo[i]["trackName"]) + "&tracklength" + i 
            + "=" + encodeURI(trackInfo[i]["trackLength"]);
    }
    GM_setValue("JamendoImportStatus", 0);
    location.href = importJamendo;
}

// Extract the Jamendo ID from a Jamendo URI
function extractJamendoId(url) {
    if (result = url.match(/\d+/)) return result[0];
    return null;
}

function addOtherData() {
    var data = eval(GM_getValue("JamendoData"));
    data = data[0];

    jamendoAlbumId = extractJamendoId(GM_getValue("JamendoURL"));

    document.getElementById('id_releasename').value = data.name;
    releaseDate = data.release_date_f.split('/');

    // Set the release event
    document.getElementsByName('rev_year-0')[0].value = releaseDate[2];
    document.getElementsByName('rev_month-0')[0].value = releaseDate[1];
    document.getElementsByName('rev_day-0')[0].value = releaseDate[0];
    document.getElementsByName('rev_country-0')[0].value = 240; // [Worldwide]
    document.getElementsByName('rev_labelname-0')[0].value = 'Jamendo';
    document.getElementsByName('rev_catno-0')[0].value = jamendoAlbumId;
    document.getElementsByName('rev_barcode-0')[0].value = '';
    document.getElementsByName('rev_format-0')[0].value = 12; // Digital Media
    document.getElementsByName('attr_type')[0].value = 1; // Album
    document.getElementsByName('attr_status')[0].value = 100; // Official (might be Promotion in some cases)
    document.getElementsByName('attr_script')[0].value = 28; // Script = Latin
    GM_setValue("JamendoImportStatus", 1);
}