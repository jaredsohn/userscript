// ==UserScript==
// @name          Google Maps Add Waypoint
// @namespace     http://mkgray.com:8000/userscripts/
// @include       http://maps.google.com/*
// @description	  Add waypoints to existing maps
// ==/UserScript==

(function() {
	var waypointNum = 0;
    function gm_addWaypoint(ev){
	tentry = ev.target;
	if(ev.which == 13){
	    doAddWaypoint(tentry.value);
	    tentry.value = "";
	    return false;
	}
	return true;
    }

    function doAddWaypoint(str){
	xhr = new XMLHttpRequest();
	str = str.replace(/ /g, "+");
	xhr.open("GET", "http://maps.google.com/maps?q="+str+"&output=js", false);
	xhr.send(null);

	lxml = xhr.responseText.substring(xhr.responseText.indexOf("parent._load(")+14, xhr.responseText.indexOf("window.document")-3)
	    lxd = wa(lxml);
	ov = _m.vpage.xml.getElementsByTagName("overlay");
	ls = lxd.getElementsByTagName("location");
	ls[0].setAttribute("id", "pt"+(waypointNum++));
	ov[0].appendChild(ls[0]);
	_m.loadVPage(_m.vpage.xml);
   }
    
    titleBar = document.getElementsByClassName("title")[0];
    tn = document.createTextNode("Add waypoint: ");
    inp = document.createElement("input");
    inp.setAttribute("id", "waypoint");
    titleBar.appendChild(tn);
    titleBar.appendChild(inp);
    document.getElementById('waypoint').addEventListener("keypress",gm_addWaypoint, false);

})();
