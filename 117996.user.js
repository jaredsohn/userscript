// ==UserScript==
// @name          GPSGATE
// @namespace     
// @description   Banginiams
// @include       maps.lt/*
// @require       http://localhost:12175/javascript/GpsGate.js
// ==/UserScript==
	function CallbackMessage(gps)
	{
    if(gps.status.permitted == false)
    {
      alert('Request not permitted by user');
    }
    else
    {
      //var resultTag = document.getElementById('position');
      alert('longitude:' + gps.trackPoint.position.longitude + ' latitude:' + gps.trackPoint.position.latitude);

      //var d = new Date(gps.trackPoint.utc);

      //resultTag = document.getElementById('time');
      //resultTag.innerHTML = d.toLocaleString();
    }
	}
	
alert('Monkey sez... "Hello World!"');
document.write('<input value="GPS info" type="button" onclick=\'JavaScript:GpsGate.Client.getGpsInfo(CallbackMessage)\' id=button1 name=button1>')


