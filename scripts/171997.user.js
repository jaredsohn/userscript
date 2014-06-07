// ==UserScript==
// @name 			Reittiopas VR Fix
// @namespace		http://viiksipojat.fi/userscripts/
// @description		Switch to a red icon for trains in Reittiopas
// @icon 			http://viiksipojat.fi/userscripts/pict_juna-fixed.gif
// @include			http://*.reittiopas.fi/*
// @resource 		pict_juna http://viiksipojat.fi/userscripts/pict_juna-fixed.gif
// @resource 		train_icon http://viiksipojat.fi/userscripts/train_icon-fixed.gif
// @resource 		train_bar http://viiksipojat.fi/userscripts/train_bar-fixed.gif
// @resource 		circle_train http://viiksipojat.fi/userscripts/circle_train-fixed.png
// @version 		1.1
// ==/UserScript==
// TODO:
// - recolor the half-transparent lines too
//   sample url http://www.reittiopas.fi/wms/?LAYERS=hsl_tripplanner%3Ashapes&CQL_FILTER=code%20%3D'3001R%201'%3Bline_id%20%3D%20'3001R%201'&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&FORMAT=image%2Fpng&SRS=EPSG%3A2392&BBOX=2552802,6672610,2588446,6708254&WIDTH=268&HEIGHT=268
// - recolor route map too
//   sample url http://linjakartta.reittiopas.fi/fi/wms/index.php?WIDTH=256&SRS=EPSG%3A2392&LAYERS=hsl_linesearch%3Ashapes&CQL_FILTER=transport_type_id%20%3D12%20or%20transport_type_id%20%3D13&HEIGHT=256&STYLES=&FORMAT=image%2Fpng&TILED=false&TILESORIGIN=2513024.3%2C6647329.1&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&BBOX=2550400,6672000,2553600,6675200

// fix icons
var pooped_20 = [
		"http://www.reittiopas.fi/images/resultSummary/pict_juna.gif", 
		"http://linjakartta.reittiopas.fi/img/train.png"
	],
    pooped_24 = [
    	"http://aikataulut.reittiopas.fi/images/ytv/train_icon.jpg"
    ];
var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++) {
	if (pooped_20.indexOf(imgs[i].src) != -1) {
		imgs[i].src = GM_getResourceURL("pict_juna");
	}
	else if (pooped_24.indexOf(imgs[i].src) != -1) {
		imgs[i].src = GM_getResourceURL("train_icon");
	}
}


// fix .stop_list_bar_train
GM_addStyle(".stop_list_bar_train { background: url("+GM_getResourceURL("train_bar")+") top center repeat-y; } ")


// fix map
// creatively adapted from: 
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// http://stackoverflow.com/questions/13277212/mutation-observer-for-creating-new-elements
var pooped_color = "#2dbe2c";
var proper_color = "#cc0000";
var pooped_url   = "./images/mapIcons/circle_train.png";

var target = document.querySelector("#mapPanelContainer");
var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; ++i) {
        // look through all added nodes of this mutation
        for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
            if (mutations[i].addedNodes[j].tagName == "polyline" &&
            		mutations[i].addedNodes[j].getAttribute("stroke") == pooped_color) {
                mutations[i].addedNodes[j].setAttribute("stroke", proper_color);
            }
            else if (mutations[i].addedNodes[j].tagName == "image" &&
            	    	mutations[i].addedNodes[j].getAttribute("href") == pooped_url) {
				mutations[i].addedNodes[j].setAttribute("stroke", proper_color);
				mutations[i].addedNodes[j].setAttribute("href", GM_getResourceURL("circle_train"));	
            }
        }
    }
});
var config = { childList: true, subtree: true };
observer.observe(target, config);