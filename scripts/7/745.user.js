// ==UserScript==
// @name          Google Maps Route Follow
// @namespace     http://libgmail.sourceforge.net/googlemaps.html
// @include       http://maps.google.com/*
// @description	  Follow route of Google Maps directions
// ==/UserScript==

(function() {

    function gstart () {
	if(!_m.map.it) {
	    iti=new Object();
	    iti.x=80;
	    iti.y=80;
	    iti.shadowURL="";
	    itd=new Object();
	    itd.width=80;
	    itd.height=80;
	    itd.pointCoord=new n(41,34);
	    _m.map.it=_m.map.createLocationMarker("http://libgmail.sourceforge.net/spider.png",iti);
	    _m.map._i = 0
	}
	;
	_m.map._stop = 0;
	if (_m.map._i >= _m.map.directions.polyline.numPoints-1) {
	    _m.map._i = 0;
	}
	mv=function(){
	    if (_m.map._stop) {
		return;
	    }
	    i = _m.map._i
	    c=_m.map.directions.polyline.getPoint(i);
	    _m.map.recenterOrPanToLatLng(c);
	    _m.map.setMarkerPosition(_m.map.it,itd,c);
	    if(i<_m.map.directions.polyline.numPoints-1){
		_m.map._i += 1
		    window.setTimeout("mv()",750)
	    }
	    else{
		_m.map.it.hide()
	    }
	}
	;
	_m.map.it.show();
	mv()
    }
    
    function gstop() {
	_m.map._stop = 1;
    }

    document.getElementsByClassName("title")[0].innerHTML += ' <a id="gstart" href="javascript:void(0);">Go</a>  <a id="gstop" href="javascript:void(0);">Stop</a>  ';
    if (document.getElementById('gstart')) {
	document.getElementById('gstart').addEventListener('click', gstart, false);
    } else {
	alert('gstart not found.');
    }
    if (document.getElementById('gstop')) {
	document.getElementById('gstop').addEventListener('click', gstop, false);
    } else {
	alert('gstop not found');
    }
})();
