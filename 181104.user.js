// ==UserScript==
// @name        Google News, Translate and Maps
// @namespace   http://www.google.com
// @description Add Translate, News and Maps to the Search Page's menu bar
// @include     https://www.google.com/
// @version     1.1
// @grant       none
// ==/UserScript==

// version 1.1 fixes the class name changes that prevented version 1 from working
var debug = false;
try {
    var maps = document.getElementById("gb8").getAttribute("href");
    var news = document.getElementById("gb5").getAttribute("href");
    var translate = document.getElementById("gb51").getAttribute("href");
    if(debug) window.alert( "M,N,T = \n" + maps + "\n" + news + "\n" + translate);
}
catch(err) {
    alert("Error: Unable to find maps, news or translate.\n" + err);
}

// find insert location
try {
    var insLoc = document.getElementById("gb");
    if(debug) window.alert("insLoc = \n" + insLoc.innerHTML);
}
catch(err) {
    alert("Error: Unable to find insertion location.\n" + err);
}


try {
    if(insLoc.parentElement.id != "mngb") alert("Error: bannerLoc parent element is not 'nmgb'.");
    var insLoc = insLoc.childNodes[0].childNodes[0].childNodes[0].childNodes[2];
    var clsDiv = insLoc.className;
    var clsAnc = insLoc.childNodes[0].className;
    if(debug) alert("Class Names: Div = " + clsDiv + " & Anchor = " + clsAnc);
}
catch(err) {
    alert("Error: Unable to find insert location.\n" + err);
}


/*
// find menu locations
var clsDiv = "gb_f gb_g";
var clsAnc = "gb_c";

try {
    var menuLoc = insLoc.getElementsByClassName(clsDiv);
    if(menuLoc.length == 0) window.alert("Error: menuLoc is undefined/has zero length.");
    if(debug) for(var i = 0; i < menuLoc.length; i++) alert("MenuLoc[" + i + "] = \n" + menuLoc[i].innerHTML);

}
catch(err) {
    alert("Error: Unable to find menu location.\n" + err);
}
*/

// translate
try {
    var addNode = document.createElement("div");
    addNode.setAttribute("class", clsDiv);
    addNode.setAttribute("id", "SW_TRANSLATE_DIV");
    insLoc.parentElement.insertBefore(addNode, insLoc);
    var addAnchorSubNode = document.createElement("a");
    addAnchorSubNode.setAttribute("href", translate);
    addAnchorSubNode.setAttribute("class", clsAnc);
    addAnchorSubNode.setAttribute("id", "SW_TRANSLATE_ANCHOR");
    var addTNode = addNode.appendChild(addAnchorSubNode);
    addAnchorSubNode.innerHTML = "Translate";
}
catch(err) {
    alert("Error: Unable to insert Translate location.\n" + err);
}

// Maps
try {
    var addNode = document.createElement("div");
    addNode.setAttribute("class", clsDiv);
    addNode.setAttribute("id", "SW_MAPS_DIV");
    insLoc.parentElement.insertBefore(addNode, insLoc);
    var addAnchorSubNode = document.createElement("a");
    addAnchorSubNode.setAttribute("href", maps);
    addAnchorSubNode.setAttribute("class", clsAnc);
    addAnchorSubNode.setAttribute("id", "SW_MAPS_ANCHOR");
    var addTNode = addNode.appendChild(addAnchorSubNode);
    addAnchorSubNode.innerHTML = "Maps";
}
catch(err) {
    alert("Error: Unable to insert Maps location.\n" + err);
}


// News
try {
    var addNode = document.createElement("div");
    addNode.setAttribute("class", clsDiv);
    addNode.setAttribute("id", "SW_NEWS_DIV");
    insLoc.parentElement.insertBefore(addNode, insLoc);
    var addAnchorSubNode = document.createElement("a");
    addAnchorSubNode.setAttribute("href", news);
    addAnchorSubNode.setAttribute("class", clsAnc);
    addAnchorSubNode.setAttribute("id", "SW_NEWS_ANCHOR");
    var addTNode = addNode.appendChild(addAnchorSubNode);
    addAnchorSubNode.innerHTML = "News";
}
catch(err) {
    alert("Error: Unable to insert News location.\n" + err);
}

/*
*/
