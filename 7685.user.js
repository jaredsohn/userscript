// ==UserScript==
// @name          LevLiba - Display Flash
// @namespace     Nadav Kavalerchik
// @description	  Enables Flash Objects on LevLiba Site by MA.TA.CH (v0.1)
// @include	      http://science.cet.ac.il/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------

var obj = document.getElementById("DivFlash");

if (obj && document.location.pathname == "/science/matter/activity1.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 280;
    newObj.width = 480;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/volume1.swf";
    newObj.data = "images/volume1.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/matter/activity2.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 280;
    newObj.width = 480;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/dissolve.swf";
    newObj.data = "images/dissolve.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/matter/activity8.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 280;
    newObj.width = 680;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/Solid-Liquid-Gas.swf";
    newObj.data = "images/Solid-Liquid-Gas.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/matter/activity10.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 317;
    newObj.width = 680;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/dead-sea2.swf";
    newObj.data = "images/dead-sea2.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
if (obj && document.location.pathname == "/science/matter/activity5.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 317;
    newObj.width = 680;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/separate.swf";
    newObj.data = "images/separate.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/matter/activity3.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 280;
    newObj.width = 690;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/water.swf";
    newObj.data = "images/water.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
if (obj && document.location.pathname == "/science/matter/activity6.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 285;
    newObj.width = 680;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/attributes.swf";
    newObj.data = "images/attributes.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/matter/activity4.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 290;
    newObj.width = 680;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/solid-liquid.swf";
    newObj.data = "images/solid-liquid.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/matter/activity7.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 290;
    newObj.width = 680;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "images/oil3.swf";
    newObj.data = "images/oil3.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport1.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 210;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_human/system.swf";
    newObj.data = "/science/transportation/images_human/system.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport2.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 370;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_human/Game7.swf";
    newObj.data = "/science/transportation/images_human/Game7.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
if (obj && document.location.pathname == "/science/transportation/transport5.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 385;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_human/inheart.swf";
    newObj.data = "/science/transportation/images_human/inheart.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport3.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 385;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_human/heart.swf";
    newObj.data = "/science/transportation/images_human/heart.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}
if (obj && document.location.pathname == "/science/transportation/transport4.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 565;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_human/BloodToOrgans12.swf";
    newObj.data = "/science/transportation/images_human/BloodToOrgans12.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport10.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 565;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_plants/transpocell.swf";
    newObj.data = "/science/transportation/images_plants/transpocell.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport9.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 565;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_plants/cellwater.swf";
    newObj.data = "/science/transportation/images_plants/cellwater.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport8.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 565;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_plants/roots.swf";
    newObj.data = "/science/transportation/images_plants/roots.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport7.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 565;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_plants/pionit11.swf";
    newObj.data = "/science/transportation/images_plants/pionit11.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}

if (obj && document.location.pathname == "/science/transportation/transport6.asp" ) {
    //var url = document.evaluate("param[@name='url']", obj, null, 6, null).snapshotItem(0).value;

    var div = obj.parentNode.parentNode;
    // Remove Ofek's Original Flash Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");
    newObj.type = "application/x-shockwave-flash";
    newObj.height = 386;
    newObj.width = 565;
    newObj.quality = "high";
    newObj.wmode = "transparent";
    newObj.allowScriptAccess = "sameDomain";
    newObj.movie = "/science/transportation/images_plants/sysplants.swf";
    newObj.data = "/science/transportation/images_plants/sysplants.swf";
    //newObj.data = url;

    newDiv.appendChild(newObj);
}


