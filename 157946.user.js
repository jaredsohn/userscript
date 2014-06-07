// ==UserScript==
// @name           QR4PaketTrackNr
// @namespace      http://lifesuche.de/
// @description    Erzeugt einen QR-Code mit der ShipNr als Inhalt
// @include        http://nolp.dhl.de/nextt-online-public/set_identcodes.do*
// @include        http://wwwapps.ups.com/WebTracking/processInputRequest*
// @include        https://www.myhermes.de/wps/portal/paket/Home/privatkunden/sendungsverfolgung*
// @version        1.07
// @grant          none
// ==/UserScript==

try{
	var Elem=document.getElementsByClassName('mm_sendungsnummer');
	var TrackNr = Elem[0].innerHTML;
	Elem[0].innerHTML=Elem[0].innerHTML+' <img src="http://qrl8.de/qr.php/?s=4&d='+TrackNr+'">';
}
catch(err){
	try{
		var Elem=document.getElementById('trkNum');
	
		var token = Elem.innerHTML.split(/\s+/g);

		Elem.innerHTML=Elem.innerHTML+' <img src="http://qrl8.de/qr.php/?s=4&d='+token[token.length-2]+'">';
	}
	catch(err){
		try{
			var Elem=document.getElementById('shipmentOverview').getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("span")[0];
			var TrackNr = Elem.innerHTML.trim().split(' ');
			Elem.innerHTML=Elem.innerHTML+' <img style="vertical-align: top;" src="http://qrl8.de/qr.php/?s=4&d='+TrackNr[TrackNr.length -1]+'">';
		}
		catch(err){
		}
	}
}
