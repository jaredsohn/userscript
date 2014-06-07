// ==UserScript==
// @name           Bahn2Mail
// @namespace      http://www.bahn.de/bahn2mail
// @include        https://fahrkarten.bahn.de/privatkunde/buchen/*
// ==/UserScript==


var trhook = document.getElementById('content-buchungsdaten1');
if (trhook != null) {

	// enter your hello statement (e.g., "Hello World")
	var hello = "";
	// the target email address
	var tomail = "";
	// your name, used like "Viele Grüße, greetz"
	var greetz = "";
	// subject of your mail
	var subject = "";
	
	var trhin = trhook.parentNode.getElementsByTagName('tr')[1];
	var trre = trhook.parentNode.getElementsByTagName('tr')[3];

	var hintds = trhin.getElementsByTagName('td');
	var hinfrom = hintds[1].innerHTML.split('<br>')[0];
	var hinto = hintds[1].innerHTML.split('<br>')[1];
	var hindate = hintds[2].innerHTML;
	var hindeptime = hintds[3].getElementsByTagName('span')[0].innerHTML;
	
	var retds;
	var refrom;
	var reto;
	var redate;
	var redeptime;
	var bctype ="-";
	var travelclass = "-";
	
	var tariffdetailsTD = trhook.getElementsByTagName('td')[0];
	GM_log(tariffdetailsTD.innerHTML);
	if (tariffdetailsTD.innerHTML.search('BahnCard')>-1) {
		var inner = tariffdetailsTD.innerHTML;
		bctype = inner.split(',')[1].split(' mit ')[1];
		travelclass = inner.split(',')[2];
	}
	
	if (trre != null) {
		var retds = trre.getElementsByTagName('td');
		var refrom = retds[1].innerHTML.split('<br>')[0];
		var reto = retds[1].innerHTML.split('<br>')[1];
		var redate = retds[2].innerHTML;
		var redeptime = retds[3].getElementsByTagName('span')[0].innerHTML;
	}
	
	var message = hello + ",%0D%0A%0D%0ABitte bucht folgende kundenbezogene Bahnreise ("+bctype+","+travelclass+", Bahntix, Nichtraucher, Tischplatz):%0D%0A%09";
	message = message + "Hinfahrt von " + hinfrom + " nach " + hinto + " am " + hindate + " mit Abfahrt um " + hindeptime;
	if (trre != null)
		message = message + "%0D%0A%09Rückfahrt von " + refrom + " nach " + reto + " am " + redate + " mit Abfahrt um " + redeptime;
	message = message + "%0D%0A%0D%0AEine SMS mit dem Buchungscode auf meine Handynummer wäre super.%0D%0A%0D%0AVielen Dank und Viele Grüße%0D%0A" + greetz;
//	GM_log(message);
	
	var link = "mailto:"+tomail+"?Subject="+subject+"&body=" + message;
	
	var a = document.createElement('a');
	a.setAttribute('href', link);
	a.innerHTML = "Send as Mail";
	a.setAttribute('style', 'color:blue;text-decoration:underline');
	trhook.getElementsByTagName('td')[1].appendChild(document.createElement('br'));
	trhook.getElementsByTagName('td')[1].appendChild(document.createElement('br'));
	trhook.getElementsByTagName('td')[1].appendChild(a);
}