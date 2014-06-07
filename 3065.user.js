// version 0.1
// This is the initial release that adds a Google Maps link to sibycline.com
// real estate listings.  For more information please contact:
// mark DOT mascolino AT gmail DOT com
//
// ==UserScript==
// @name           GMaps for Sibycline.com
// @namespace      http://people.etango.com/~markm/greasemonkey/
// @description    Add Google Maps for the sibcycline.com website
// @include        http://www.sibcycline.com/viewlisting.asp?*
// ==/UserScript==

function xpath(query) {
   return document.evaluate(query, document, null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathForElement(query, theElem) {
   return document.evaluate(query, theElem, null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getGoogleLink(addr, zip) {
    return "http://maps.google.com/maps?q=" + addr + "," + zip;
}

var xPathAppointments = "//a[starts-with(@href, 'http://www.sibcycline.com/sc_appointment.asp')]";
var appointmentElems = xpath(xPathAppointments);
//window.alert("size = " + appointmentElems.snapshotLength);
if (appointmentElems.snapshotLength > 0) {
    var appointmentAnchor = appointmentElems.snapshotItem(0);
    //window.alert(appointmentAnchor.href);
    appointmentLink = appointmentAnchor.href;
    reAppointment = /.*?PADDR=(.*?)&.*?&PZIP=(.*?)&.*/;
    matchAppointment = reAppointment.exec(appointmentLink);
    var addr = matchAppointment[1];
    var zip = matchAppointment[2];

    var xPathMap = "//a[text()='Interactive Map']";
    var mapElems = xpath(xPathMap);
    //window.alert("mapElem size = " + mapElems.snapshotLength);
    if (mapElems.snapshotLength > 0) {
        var mapAnchor = mapElems.snapshotItem(0);
        var googleMapElem = document.createElement("span");
        googleMapElem.innerHTML = "&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + getGoogleLink(addr, zip) + "'>Google Map</a>";
        mapAnchor.parentNode.insertBefore(googleMapElem, mapAnchor.nextSibling);
    } else {
        window.alert("interactive map wasn't found");
    }
} else {
    window.alert("Nothing was found");
}