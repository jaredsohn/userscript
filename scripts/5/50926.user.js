// ==UserScript==
// @name           PartyGuide User Pictures
// @namespace      ch.cimnine.pg.userpics
// @description    Display every user-pic in PG User Lists
// @include        http://*partyguide.ch/*
// ==/UserScript==

/*
 * Settings
 */
var icon_height = null; //maxPicHeight, null = originalImageHeight, default: null
var icon_width = "100px"; //maxPicWidth, null = originalImageWidth, default: "100px"

var goForIt = true; //search for new images to replace (fe. in search), true / false, dafult: true;
var goForItTime = 5; //interval to search for new images, in seconds, default: 5

var debug = false;

/*
 * End Settings
 */

var icon_class = "img_icon_list";
var icon_src = "http://images.partyguide.ch/img/foto.gif";

function replace() {
    if (console && debug)
        console.count("Getting images: ");
    
    // prepare
    var icons = document.getElementsByTagName("img");
    var picicons = new Array();
    
    // find every icon with a picture
    for (i=0;i<icons.length;i++) {
        if (icons[i].getAttribute("class") == icon_class) {
            if (icons[i].src == icon_src) {
                picicons.push (icons[i]);
            }
        }
    }
    
    // replace the src of the icon with the userpic
    for (i=0;i<picicons.length;i++) {
        var piciconparent = picicons[i].parentNode;
        var pipmouseover = piciconparent.getAttribute("onmouseover");
        var url = pipmouseover.substring(pipmouseover.indexOf("http"),pipmouseover.indexOf("jpg")+3);
        picicons[i].src = url;
        picicons[i].style.width = icon_width;
        picicons[i].style.height = icon_height;
        piciconparent.setAttribute("onmouseover", "");
    }
}

if (console)
	console.info("PartyGuide User Pictures - A script by cimnine - http://cimnine.ch - Bring Peace to the World!");

replace();

if (goForIt) {
	if (console && debug)
		console.info("Getting images every " + goForItTime + " seconds.");
	window.setInterval(replace, goForItTime*1000);
}