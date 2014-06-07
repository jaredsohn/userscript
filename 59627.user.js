// ==UserScript==
// @name           OGame: Resourcen im Flug
// @namespace      Gilly
// @description    Summiert Resourcen die Unterwegs sind und zeigt diese unter dem Planeten Resourcen an.
// @include        http://*.ogame.*/game/index.php?page=overview*
// @include        http://*.ogame.*/game/index.php?page=micropayment*
// @include        http://*.ogame.*/game/index.php?page=messages*
// @include        http://*.ogame.*/game/index.php?page=flotten*
// @include        http://*.ogame.*/game/index.php?page=buildings*
// @include        http://*.ogame.*/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?page=b_building*
// ==/UserScript==

//akt uni (teil der saveVar - damit ist multi-account/uni betrieb moeglich)
var uni = window.location.host; //.split(".")[0].match(/[^0-9]*(.*)/)[1];

// dummy daten (met,kris,deut,...)
var resImFlug = new Array(0,0,0,"Res Unterwegs");

if( document.URL.indexOf("overview")>0 ){
	// daten beschaffung und addieren
	addiereResAusFlugmeldungen("flight ownattack"); // eher selten wann schickt man zum attacken res mit
	addiereResAusFlugmeldungen("return ownattack"); // der normalfall
	addiereResAusFlugmeldungen("flight ownharvest"); // beim saven aufs tf (hinweg)
	addiereResAusFlugmeldungen("return ownharvest"); // tf abbaun (oder return vom save)
	addiereResAusFlugmeldungen("holding ownhold"); // hinweg halten
	addiereResAusFlugmeldungen("return ownhold"); // rückweg halten
	addiereResAusFlugmeldungen("flight owndeploy"); // stationieren hinweg
	addiereResAusFlugmeldungen("return owndeploy"); // stationieren abbrechen
	addiereResAusFlugmeldungen("flight owntransport"); // transportieren hinweg
	addiereResAusFlugmeldungen("return owntransport"); // transportieren abbrechen
	GM_setValue(uni+"resImFlug",resImFlug.join());
}else{
	// befinden uns nicht auf "page=overview", also nur gespeicherte Daten laden
	resImFlug[0] = GM_getValue(uni+"resImFlug","0").split(",")[0];
	resImFlug[1] = GM_getValue(uni+"resImFlug","0").split(",")[1];
	resImFlug[2] = GM_getValue(uni+"resImFlug","0").split(",")[2];
}
	
// darstellung Res in der Luft
var resTable = document.getElementById('resources');
for(i=0;i<1;i++){
	var tempZeile = resTable.insertRow(-1);
	tempZeile.setAttribute("class","header");
	for(j=0;j<4;j++){
		var tempTd = tempZeile.insertCell (-1);
		tempTd.setAttribute("class","header");
		tempTd.setAttribute("with","90");
		tempTd.setAttribute("align","center");
		tempTd.innerHTML = punkte(resImFlug[(i*4)+j]);
	}
	var tempTd = tempZeile.insertCell (-1);
	tempTd.setAttribute("class","header");
	tempTd.setAttribute("with","90");
	tempTd.setAttribute("align","center");
	tempTd.innerHTML = ""; // hier könnte man versuchen ein pupup mit details also wieviel auf welchen weg unterwegs sind einzubaun
}

// in zahlen die punkte wieder einfuegen (erhöht lesbarkeit)
function punkte(wert){
	wert += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(wert) )
		wert = wert.replace (rgx, '$1' + '.' + '$2');
		return wert;
}

function addiereResAusFlugmeldungen(flugtyp){
	var parsedRes = parseResAusFlugmeldungen(flugtyp);
	resImFlug[0] += parsedRes[0];
	resImFlug[1] += parsedRes[1];
	resImFlug[2] += parsedRes[2];
	//alert("parsedRes - M: "+parsedRes[0]+" K: "+parsedRes[1]+" D: "+parsedRes[2]);
}

// parst die flug meldungen mit class=PARAMETER und addiert die res und return sie
function parseResAusFlugmeldungen(flugtyp){
	var returnRes = new Array(0,0,0);
	var all, one;
	all = document.evaluate( "//span[@class='"+flugtyp+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < all.snapshotLength; i++) {
	    one = all.snapshotItem(i);
		met = parseInt( one.innerHTML.replace(/.*Metall:(.*)Kristall:(.*)Deuterium:(.*)\">.*/,"$1").replace(/\./g,"") );
		if( !isNaN(met) ) returnRes[0]+=met;
		kris = parseInt( one.innerHTML.replace(/.*Metall:(.*)Kristall:(.*)Deuterium:(.*)\">.*/,"$2").replace(/\./g,"") );
		if( !isNaN(kris) ) returnRes[1]+=kris;
		deut = parseInt( one.innerHTML.replace(/.*Metall:(.*)Kristall:(.*)Deuterium:(.*)\">.*/,"$3").replace(/\./g,"") );
		if( !isNaN(deut) ) returnRes[2]+=deut;
	}
	return returnRes;
}