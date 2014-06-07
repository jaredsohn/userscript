// ==UserScript==
// @name           NWS radar loop
// @namespace      http://www.userscripts.org
// @include        http://radar.weather.gov/radar.php?*
// @include        http://radar.weather.gov/ridge/radar.php?*
// ==/UserScript==

// The purpose of this script is to enlarge the radar display, extend the pause between repeats of the radar loop, and set AutoRefresh On.

function do_platypus_script() {

bod = document.evaluate('/html/body', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
bod.className="nav1024";
hdr = document.evaluate('/html/body/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
hdr.className="header1024";
tabl = document.evaluate('//*[@id="datetime"]/table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
tabl.width="740";

obj = document.evaluate('//*[@id="FlAniS"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

// Method 1 - make changes in object tag

obj.data="./flanis.swf?pause=2000&zoom_scale=10&rate=15,5,100&image_window_size=800,760"
obj.width="780";
obj.height="820";

// Method 2 - changes in 1st param tag seem to have no effect

//match_re0 = /flanis\.swf/;
//replace_string0="flanis.swf?pause=2000&zoom_scale=10";
//obj.innerHTML = obj.innerHTML.replace(match_re0, replace_string0);

// Method 3 - make changes in 4th param tag

// Pause seems to need both Method1 and Method 3.  Perhaps one set is used initially and another for Refresh.
obj.innerHTML = obj.innerHTML.replace(/pause\=500/, "pause=2000");

obj.innerHTML = obj.innerHTML.replace(/autorefresh\/off/, "autorefresh/on");

obj.innerHTML = obj.innerHTML.replace(/auto_refresh \= 3/, "auto_refresh = 5");

obj.innerHTML = obj.innerHTML.replace(/frame_label_width \= 180/, "frame_label_width = 190");

obj.innerHTML = obj.innerHTML.replace(/Legend\/on/, "Legend/off");

}; // Ends do_platypus_script



window.addEventListener("load", function() { do_platypus_script() }, false);

