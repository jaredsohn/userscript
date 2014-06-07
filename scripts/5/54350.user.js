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
// @include        http://musicbrainz.org/edit/relationship/addcc.html*
// @version        1.1.1
// @credits        brianfreud for this one, also credit to 
// @credits        outsidecontext's original Jamendo import script
// @credits        MeinDummy: CC license import
// ==/UserScript==
// Figure out where we are
if (location.href.slice(0, 37) == "http://musicbrainz.org/cdi/enter.html") ImportatMBAddRelease();
else if (location.href.slice(0, 47) == "http://musicbrainz.org/show/release/?releaseid=") ImportatMBAddExtra();
else if (location.href.slice(0, 52) == "http://musicbrainz.org/edit/relationship/addurl.html") ImportatMBAddExtra();
else if (location.href.slice(0, 65) == "http://musicbrainz.org/show/release/relationships.html?releaseid=") ImportatMBAddCC();
else if (location.href.slice(0, 54) == "http://musicbrainz.org/edit/relationship/addcc.html?id") ImportatMBEnterCC();
else {
    var importLink = document.createElement("a");
    importLink.innerHTML = "Import into MusicBrainz";
    importLink.style.position = "absolute";
    importLink.style.top = "0%";
    importLink.style.left = "0%";
    importLink.style.fontSize = "14px";
    importLink.style.background = "yellow";
    document.body.appendChild(importLink);
    importLink.addEventListener("click", importJamendo, true);
}

var aName = "";
var rName = "";
var id = 0;
var rTrackCount = 0;
var trackInfo = [];

function importJamendo() {
    importLink.innerHTML = "Working...  Please wait.";
    GM_setValue("JamendoURL", (location.href.slice(0, 22) + location.href.slice(25, 32)+ location.href.slice(32, 99).match(/\d+/)));
    jamendoAlbumId = extractJamendoId(location.href);
    getAlbumInfo();
}

function ImportatMBAddRelease() {
    if (GM_getValue("JamendoImportStatus") == 0) {
        addOtherData();
    }
}

function ImportatMBEnterCC() {
    if (GM_getValue("JamendoImportStatus") == 5) {
		setCClicense();
		document.getElementById('btnYes').click();
        GM_setValue("JamendoImportStatus", 6);
    }
}
function ImportatMBAddCC() {
    if (GM_getValue("JamendoImportStatus") == 3) {
        //GM_setValue("JamendoImportStatus", 4);
        fooLink = "http://musicbrainz.org/edit/relationship/addcc.html?id=" 
            + location.href.slice(65, 72) 
            + "&type=album&name=Jamendo%20Imported%20Release";
        location.href = fooLink + "&url=" + GM_getValue("JamendoURL");
        GM_setValue("JamendoImportStatus", 5);
    }
}

function ImportatMBAddExtra() {
    if (GM_getValue("JamendoImportStatus") == 2) {
        document.getElementById('btnYes').click();
        GM_setValue("JamendoImportStatus", 3);
    }
    if (GM_getValue("JamendoImportStatus") == 1) {
        fooLink = "http://musicbrainz.org/edit/relationship/addurl.html?id=" 
            + location.href.slice(47, 54) + "&linktype=34" 
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
		GM_setValue("licenseId", data[0].license_id); // Set release license = track 1 license
        rTrackCount = data.length;
        for (var i = 0; i < rTrackCount; i++) {
            trackInfo[i] = [];
            trackInfo[i]["trackName"] = data[i].name;
            trackInfo[i]["trackLength"] = data[i].length;
            trackInfo[i]["trackNumber"] = data[i].track_no - 1;
            trackInfo[i]["trackLicense"] = data[i].license_id;
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
	importJamendo += '&notetext=' + GM_getValue("JamendoURL") // encodeURI(location.href);
    var importJamendo = importJamendo + "&artistedit=1&artistname=" 
            + encodeURI(aName) + "&releasename=" + encodeURI(rName) 
            + "&tracks=" + (rTrackCount);
    for (i = 0; i < rTrackCount; i++) {
        var importJamendo = importJamendo + "&track" + encodeURI(trackInfo[i]["trackNumber"]) + "=" 
            + encodeURI(trackInfo[i]["trackName"]) + "&tracklength" + encodeURI(trackInfo[i]["trackNumber"]) 
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
    document.getElementsByName('attr_type')[0].value = 1; // Album (might also be single, EP, live or other)
    document.getElementsByName('attr_language')[0].value = 120; // English (might also be another language)
    document.getElementsByName('attr_status')[0].value = 100; // Official (might be Promotion in some cases)
    document.getElementsByName('attr_script')[0].value = 28; // Script = Latin
    GM_setValue("JamendoImportStatus", 1);
}

function setCClicense() {

    var license = GM_getValue("licenseId");

    // Set the CC license type
	if ((license == 6) || (license == 12) || (license == 23) || (license == 41) || (license == 63) || (license == 64) || (license == 68) || (license == 91) || (license == 92) || (license == 104) || (license == 105) || (license == 109) || (license == 114) || (license == 115) || (license == 116) || (license == 117) || (license == 118) || (license == 123) || (license == 124) || (license == 125))
    document.getElementsByName('license')[0].value = "255||Creative commons attribution license";
	else if ((license == 5) || (license == 13) || (license == 18) || (license == 46) || (license == 74) || (license == 75) || (license == 87) || (license == 99) || (license == 147) || (license == 152) || (license == 156))
    document.getElementsByName('license')[0].value = "256||Creative Commons Attribution No Derivatives (by-nd) license";
	else if ((license == 8) || (license == 9) || (license == 16) || (license == 69) || (license == 76) || (license == 94) || (license == 98) || (license == 175) || (license == 176) || (license == 180) || (license == 182) || (license == 190))
    document.getElementsByName('license')[0].value = "257||Creative Commons Attribution Non-commercial (by-nc) license";
	else if ((license == 15) || (license == 26) || (license == 32) || (license == 34) || (license == 39) || (license == 42) || (license == 43) || (license == 45) || (license == 48) || (license == 49) || (license == 67) || (license == 72) || (license == 78) || (license == 81) || (license == 86) || (license == 100) || (license == 112) || (license == 113) || (license == 199) || (license == 206))
    document.getElementsByName('license')[0].value = "258||Creative Commons Attribution Non-commercial No Derivatives (by-nc-nd) license";
	else if ((license == 1) || (license == 7) || (license == 10) || (license == 17) || (license == 19) || (license == 20) || (license == 25) || (license == 33) || (license == 35) || (license == 36) || (license == 37) || (license == 40) || (license == 59) || (license == 62) || (license == 65) || (license == 70) || (license == 73) || (license == 77) || (license == 82) || (license == 84) || (license == 101) || (license == 108) || (license == 111) || (license == 211) || (license == 213) || (license == 214) || (license == 215) || (license == 218) || (license == 219) || (license == 221) || (license == 222))
    document.getElementsByName('license')[0].value = "259||Creative Commons Attribution Non-commercial Share Alike (by-nc-sa) license";
	else if ((license == 4) || (license == 11) || (license == 14) || (license == 22) || (license == 24) || (license == 28) || (license == 29) || (license == 38) || (license == 44) || (license == 47) || (license == 66) || (license == 80) || (license == 85) || (license == 89) || (license == 93) || (license == 95) || (license == 96) || (license == 97) || (license == 106) || (license == 158) || (license == 159) || (license == 161) || (license == 162) || (license == 163) || (license == 166) || (license == 168) || (license == 169))
    document.getElementsByName('license')[0].value = "260||Creative Commons Attribution Share Alike (by-sa) license";
	else if (license == 61)
    document.getElementsByName('license')[0].value = "374||Creative Commons Noncommercial Sampling Plus licenses";
	else if (license == 0) // not available at Jamendo
    document.getElementsByName('license')[0].value = "371||The linked music has been placed into the Public Domain";
	else if (license == -1) // not available at Jamendo
    document.getElementsByName('license')[0].value = "372||Creative Commons Sampling License";
	else if (license == 60)
    document.getElementsByName('license')[0].value = "373||Creative Commons Sampling Plus license";
	else;
}