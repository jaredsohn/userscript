// ==UserScript==
// @name           XContest to XC Planner linker
// @namespace      http://www.fsv-bodenlos.com/xcplanner
// @description    Opens an xcontest flight in XC planner (Only works with German and English XContest)
// @version        0.9.6
// @date           2012-07-19
// @author         Stefan Aufischer
// @include        http://www.xcontest.org/*austria/fluge/fluginformationen:*
// @include        http://www.xcontest.org/*world/*/flights/detail*:*
// @include        http://www.xcontest.org/*world/*/fluge/detail*:*
// ==/UserScript==

// Version History:
// * 0.9.6: Corrected include for world-flights with only "detail" instead of "details" in URL, e.g. http://www.xcontest.org/world/en/flights/detail:Targa/18.7.2012/08:02
// * 0.9.5: Using http://www.fsv-bodenlos.com/xcpr.php for redirecting to xcplanner.appspot.com.
// *        Added version check
// * 0.9.4: Switching to the new version of xc planner at xcplanner.appspot.com
// * 0.9.3: Additional include for ".../world/*/fluge/..."-flights, e.g.: http://www.xcontest.org/world/de/fluge/details/:Bernd/23.4.2011/10:30
// * 0.9.2: Corrected @includes, added favicon image
// * 0.9.1: Now also works with flights from past years, added FAI and free flight links
// * 0.9: Initial Version

// ====================================================================================================================

// id: fd-ob0, fd-ob1, ..., fd-ob5
// type: "latitude" or "longitude"
// format: "decimal" or "text"

var userScriptVersion = "0.9.6";

function newVersionAvailable(remoteVersion, localVersion) {
    var remoteVersionLevels = remoteVersion.split('.');
    var localVersionLevels = userScriptVersion.split('.');
    for (var i = 0; i < 3; i++) {
        if (parseInt(remoteVersionLevels[i]) > parseInt(localVersionLevels[i])) {
            return true;
        }
    }
    return false;
}

function getTurnpointCoord(id, type, format) {
    var elem = document.evaluate("//*[@id='" + id + "']//*[@class='" + type + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if ("decimal" == format) {
        return elem.title;
    } else {
        return elem.innerText;
    }
}

function getTurnpointDecimal(id) {
    return getTurnpointCoord(id, "latitude", "decimal") + "," + getTurnpointCoord(id, "longitude", "decimal")
}

function getTurnpointText(id) {
    return getTurnpointCoord(id, "latitude", "text") + "," + getTurnpointCoord(id, "longitude", "text")
}

function getActualFlightType() {
    // ----- flight type
    // Check if there is an element of class "disc-vp" (route type "free flight" in xcontest) inside the flight-info area
    // Note: other css classes would be "disc-pt" (flat triangle)
    var isFreeFlight = document.evaluate("//div[@id='flight-info']//*[@class='disc-vp']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue != null;
    // If it is a free flight, the flight type is "xc5" (Free flight via 3 turnpoints), otherwise it must be "xc3c" (Flat or FAI triangle)
    var flightType;
    isFreeFlight ? flightType = "xc5" : flightType = "xc3c";
    return flightType;
}

// ====================================================================================================================
// Construct the parts of the URL to call 

function getXCPlannerUrl(flightType) {
    // ----- XC Planner base URL: Change this to "http://xcplanner.appspot.com" or some other xcplanner site if you want
    var xcplannerURL = "http://www.fsv-bodenlos.com/xcpr.php";

    // ----- location
    var location = getTurnpointDecimal("fd-start");

    var start = getTurnpointDecimal("fd-start");
    var landing = getTurnpointDecimal("fd-ob4");

    // ----- turn points
    var turnpoints = [];
    if (flightType == "xc5") {
        turnpoints.push(getTurnpointDecimal("fd-ob0"));
        turnpoints.push(getTurnpointDecimal("fd-ob1"));
        turnpoints.push(getTurnpointDecimal("fd-ob2"));
        turnpoints.push(getTurnpointDecimal("fd-ob3"));
        turnpoints.push(getTurnpointDecimal("fd-ob4"));
    } else { // "xc3c"
        turnpoints.push(getTurnpointDecimal("fd-ob1"));
        turnpoints.push(getTurnpointDecimal("fd-ob2"));
        turnpoints.push(getTurnpointDecimal("fd-ob3"));
        //    turnpoints.push(getTurnpointDecimal("fd-ob4"));
    }
    var turnpointsStr = "[[" + turnpoints.join("],[") + "]]";

    // ----- complete URL
    return xcplannerURL +
            "?location=" + encodeURIComponent(location) +
            "&flightType=" + flightType +
            "&start=" + encodeURIComponent("[" + start + "]") +
            "&turnpoints=" + encodeURIComponent(turnpointsStr);
}

var actualflightType = getActualFlightType();
var destURLs = new Object();
destURLs.xc3c = getXCPlannerUrl("xc3c");
if (actualflightType = "xc5") {
    destURLs.xc5 = getXCPlannerUrl("xc5");
}


// ====================================================================================================================
// Build the UI and add it

// ----- <tr [class="odd"]> ... </tr>
var elemTr = document.createElement("tr");
// assign the right css style class ("odd" or nothing) to the new row
var elemFlightInfoTableLastTr = document.evaluate("//div[@id='flight-info']//table[1]//tr[last()]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (elemFlightInfoTableLastTr.className != 'odd') {
    elemTr.className = "odd";
}
elemFlightInfoTableLastTr.parentNode.appendChild(elemTr); // append new tr after last tr

// ----- <th>XC Planner:</th>
var elemTh = document.createElement("th");

var elemIco = document.createElement("img");
elemIco.src = "http://www.fsv-bodenlos.com/favicon.ico";
elemIco.title = "Installed version: " + userScriptVersion;
elemTh.appendChild(elemIco);

elemTh.style.whiteSpace = "nowrap";
elemTh.appendChild(document.createTextNode("XC Planner:"));
elemTr.appendChild(elemTh);

// ----- <td colspan="3"> ... </td>
var elemTd = document.createElement("td");
elemTd.colSpan = "3";
elemTr.appendChild(elemTd);

// ----- <a href="..."> ... </a>
var isFirst = true;
for (var flightType in destURLs) {
    if (!isFirst) {
        elemTd.appendChild(document.createTextNode(", "));
    } else {
        isFirst = false;
    }
    var elemLink = document.createElement("a");
    elemLink.href = destURLs[flightType];
    var flightTypeName;
    flightType == "xc5" ? flightTypeName = "free flight" : flightTypeName = "FAI";
    elemLink.title = "Open this flight as '" + flightTypeName + "' in OÖ. FSV Bodenlos XC Planner";
    elemLink.target = "_blank";
    elemLink.appendChild(document.createTextNode(flightTypeName));
    elemTd.appendChild(elemLink);
}

GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/show/97955",
    onload: function(response) {
        var remoteVersionMatches = response.responseText.match(/\b([0-9]+\.[0-9]+\.[0-9]+)\b/);
        if (remoteVersionMatches) {
            var remoteVersion = remoteVersionMatches[0];

            if (newVersionAvailable(remoteVersion, userScriptVersion)) {
                elemTd.appendChild(document.createElement("br"));
                var elemButton = document.createElement("input");
                elemButton.type = "button";
                elemButton.onclick = "window.open('http://userscripts.org/scripts/source/97955.user.js')";
                elemButton.title = 'There is a newer version of FSV Bodenlos XC Planner!\n\nYour version: ' + userScriptVersion + '.\nNew version: ' + remoteVersion + '.\n\nInstall the new version at "http://userscripts.org/scripts/show/97955"';
                elemButton.value = "Install new version!";
                elemTd.appendChild(elemButton);
            }
        }
    }
});



