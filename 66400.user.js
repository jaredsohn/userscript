// ==UserScript==
// @name           Your Profile Cleanup
// @namespace      chrysalides
// @description    Clean up the Profile page
// @include        http://www.geocaching.com/my/*
// ==/UserScript==

var allDivs, thisDiv;
var allText, thisText;
var i;
var tableBegin, tableEnd;
var elem, aelem;
var widgetState = "0011101111111111111111111";
var cookieName = "chryPageWidgetCookie";
var cookieDate = new Date();
var ca = document.cookie.split(";");

for (i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(cookieName) == 0) widgetState = c.substring(cookieName.length + 1);
}

cookieDate.setTime(cookieDate.getTime() + 30 * 24 * 60 * 60 * 1000);
document.cookie = cookieName + "=" + widgetState + "; expires=" + cookieDate.toGMTString() + "; path=/my";

allDivs = document.evaluate(
    "//div[@class='ProfileWidget']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.id = "chry00_profile_widget_" + i;

    tableBegin = document.createElement("TABLE");
    tableBegin.width = "100%";
    tableBegin.appendChild(document.createElement("TR"));
    tableBegin.firstChild.appendChild(document.createElement("TD"));
    tableBegin.firstChild.appendChild(document.createElement("TD"));

    elem = thisDiv.firstChild;
    if (elem.nodeName == "#text") elem = elem.nextSibling;

    aelem = document.createElement("A");
    aelem.href = "javascript:void()";
    aelem.appendChild(document.createTextNode("x"));
    aelem.addEventListener("click", function() { return removeWidget(this.parentNode.parentNode.parentNode.parentNode.parentNode.id); }, false);

    tableBegin.firstChild.lastChild.appendChild(aelem);
    tableBegin.firstChild.lastChild.align = "right";

// error check - make sure it is H3

    if (elem.firstChild.nodeValue.trim() == "Geocache Google Earth Viewer") { // shorten Google Earth title
	elem.firstChild.nodeValue = "Google Earth Viewer";
    } else if (elem.firstChild.nodeValue.trim() == "Field Notes") {
        var widgetBody = elem;
        var replacement;
        var listElement;
        var listAnchor;

        while (widgetBody && (widgetBody.className != "WidgetBody")) widgetBody = widgetBody.nextSibling;
        while (widgetBody.firstChild) widgetBody.removeChild(widgetBody.firstChild);
        replacement = document.createElement("UL");
        listElement = document.createElement("LI");
        listAnchor = document.createElement("A");
        listAnchor.href = "uploadfieldnotes.aspx";
        listAnchor.title = "Upload Field Notes";
        listAnchor.appendChild(document.createTextNode("Upload Field Notes"));
        listElement.appendChild(listAnchor);
        replacement.appendChild(listElement);
        listElement = document.createElement("LI");
        listAnchor = document.createElement("A");
        listAnchor.href = "fieldnotes.aspx";
        listAnchor.title = "Access Your Field Notes";
        listAnchor.appendChild(document.createTextNode("Access Your Field Notes"));
        listElement.appendChild(listAnchor);
        replacement.appendChild(listElement);
        listElement = document.createElement("LI");
        listAnchor = document.createElement("A");
        listAnchor.href = "linktodevice.aspx";
        listAnchor.title = "Link Trimble's Geocache Navigator to Your Account";
        listAnchor.appendChild(document.createTextNode("Link Trimble to Your Account"));
        listElement.appendChild(listAnchor);
        replacement.appendChild(listElement);
        widgetBody.appendChild(replacement);
    }

    tableBegin.firstChild.firstChild.appendChild(document.createTextNode(elem.firstChild.nodeValue));
    elem.insertBefore(tableBegin, elem.firstChild);
    elem.removeChild(elem.childNodes[1]);

    if (widgetState.charAt(i) == '0') {
        thisDiv.style.display = "none";
    }
/*
    case 0: // Stat bar
    case 1: // Your GPS
    case 2: // Search Options
    case 3: // User Routes
    case 4: // Field Notes
    case 5: // Geocaching with Twitter
    case 6: // Premium Features
    case 7: // Account Options
    case 8: // Google Earth
    case 9: // Your Inventory
 */
}

if (i > 0) {
    var aelem = document.createElement("A");

    thisDiv = allDivs.snapshotItem(i - 1);
    aelem.href="javascript:void()";
    aelem.addEventListener("click", resetWidgets, false);
    aelem.appendChild(document.createTextNode("Show All Widgets"));
    thisDiv.parentNode.appendChild(aelem);
}

allText = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (i = 0;i < allText.snapshotLength; i++) {
    thisText = allText.snapshotItem(i);
    thisText.data = thisText.data.replace(/Visit Log/g,"Log");
}


function removeWidget(widgetID) {
    var elem, eleNum;

    eleNum = parseInt(widgetID.substring(widgetID.lastIndexOf('_')+1));
    elem = document.getElementById(widgetID);
    if (elem) elem.style.display = "none";
    widgetState = widgetState.substring(0, eleNum) + "0" + widgetState.substring(eleNum + 1);
    document.cookie = cookieName + "=" + widgetState + "; expires=" + cookieDate.toGMTString() + "; path=/my";
    return false;
}

function resetWidgets() {
    var i;

    for (i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        thisDiv.style.display = "";
    }

    widgetState = "11111111111111111111";
    document.cookie = cookieName + "=" + widgetState + "; expires=" + cookieDate.toGMTString() + "; path=/my";

    return false;
}