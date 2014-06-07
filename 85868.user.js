// ==UserScript==
// @name           DOC Campsite Mapper
// @namespace      http://damiengabrielson.com
// @description    Adds a Google Map to doc.govt.nz campsite pages using the NZTM2000 grid reference.
// @version        1.1
// @include        http://www.doc.govt.nz/parks-and-recreation/places-to-stay/conservation-campsites-by-region/*
// ==/UserScript==
var secret = "Grid reference: NZTM2000, ";
var element;
var mapImage;
var mapLat;
var mapLong;
if (!GM_xmlhttpRequest) {
    alert("Please install or upgrade to the latest version of Greasemonkey.");
    exit;
}

// retrieve all appropriate <p>s in document
var allParagraphs = document.evaluate(
    '//div[@class="item-detail"]//p',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i=0; i < allParagraphs.snapshotLength; i++) {
    element = allParagraphs.snapshotItem(i);
    if (element.innerHTML) {
        var innerHTML = element.innerHTML.trim();
        if (innerHTML.length > secret.length && innerHTML.substring(0, secret.length) == secret) {
            var coordinates = parseNZTM(innerHTML);
            parseConversion(buildConversionUrl(coordinates[0], coordinates[1]));
            break;
    }
    }
}

function parseNZTM(html) {
    var coordinates = html.substring(secret.length, html.length).split("-");

    if (coordinates[0].substring(0, 1).toUpperCase() == "N") {
        return new Array(coordinates[0].substring(1, coordinates[0].length), coordinates[1].substring(1, coordinates[1].length));
    }
    else {
        return new Array(coordinates[1].substring(1, coordinates[1].length), coordinates[0].substring(1, coordinates[0].length));
    }
}

function parseConversion(url) {
    getDocument(url, function(doc) {
        mapLat = doc.evaluate('.//table[@class="concord_table"]//tr[3]//td[5]//text()', doc, null, XPathResult.STRING_TYPE, null).stringValue;
        mapLong = doc.evaluate('.//table[@class="concord_table"]//tr[3]//td[6]//text()', doc, null, XPathResult.STRING_TYPE, null).stringValue;
        var coordP = document.createElement('p');
        coordP.setAttribute('id', 'coordinates');
        coordP.innerHTML = "Latitude: " + mapLat + " Longitude: " + mapLong;
        element.parentNode.appendChild(coordP);

        var iframe = document.createElement('iframe');
        iframe.setAttribute('src',buildMapUrl());
        iframe.setAttribute('width','565');
        iframe.setAttribute('height','424');
        iframe.setAttribute('frameborder','0');
        iframe.setAttribute('scrolling','no');
        iframe.setAttribute('marginheight','0');
        iframe.setAttribute('marginwidth','0');

        insertAfter(element.parentNode, iframe);
    });
}

function insertAfter(referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getDocument(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html",
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}

function buildConversionUrl(northing, easting) {
    return "http://www.linz.govt.nz/geodetic/conversion-coordinates/online-conversion-service/converter/index.aspx?"
        + "C01=" + northing + "&"
        + "C11=" + easting + "&"
        + "do_results=Convert+coordinates&"
        + "ID=+&"
        + "OD=+&"
        + "IC=H&"
        + "OC=H&"
        + "IO=NE&"
        + "OO=NE&"
        + "IH=-&"
        + "OH=-&"
        + "IF=T&"
        + "OF=H&"
        + "IS=NZTM&"
        + "OS=WGS84&"
        + "OP=+&"
        + "CI=Y&"
        + "MODE=&"
        + "ADVANCED=0&"
        + "PN=N&"
        + "NEXT=&"
        + "NPoint=1&";
}

function buildMapUrl() {
    return 'http://maps.google.com/maps?'
        + '&q=' + mapLat + ',' + mapLong
        + '&t=h&output=embed';
}