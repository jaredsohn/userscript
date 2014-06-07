// ==UserScript==
// @name           OGame: Buildables
// @namespace      Gilly
// @description    Zeigt an wieviel Einheiten (Schiffe/Def) mit den vorhandenen Res möglich sind zu bauen.
// @include        http://uni*.ogame.de/game/index.php?page=buildings*
// ==/UserScript==

if( window.location.href.charAt("mode=Forschung") > 0 ) exit(0);	// die Forschungsseite nicht bearbeiten

// Resources Vars
var resVorhanden = document.getElementById('resources').getElementsByTagName('font');
var resources = new Array();
// vorhandene Resourcen
resources["vorhanden"] = new Array();
resources["vorhanden"][0] = parseInt( resVorhanden[5].innerHTML.replace(/\./g,"") );
resources["vorhanden"][1] = parseInt( resVorhanden[6].innerHTML.replace(/\./g,"") );
resources["vorhanden"][2] = parseInt( resVorhanden[7].innerHTML.replace(/\./g,"") );

// da die schiffe immer gleichviel kosten hier konstante werte einfuegen
resources["Kleiner Transporter"] = new Array( 2000,2000,0,999999 );
resources["Großer Transporter"] = new Array( 6000,6000,0,999999 );
resources["Leichter Jäger"] = new Array( 3000,1000,0,999999 );
resources["Schwerer Jäger"] = new Array( 6000,4000,0,999999 );
resources["Kreuzer"] = new Array( 20000,7000,2000,999999 );
resources["Schlachtschiff"] = new Array( 45000,15000,0,999999 );
resources["Kolonieschiff"] = new Array( 10000,20000,10000,999999 );
resources["Recycler"] = new Array( 10000,6000,2000,999999 );
resources["Spionagesonde"] = new Array( 0,1000,0,9999999 );
resources["Bomber"] = new Array( 50000,25000,15000,999999 );
resources["Solarsatellit"] = new Array( 0,2000,500,999999 );
resources["Zerstörer"] = new Array( 60000,50000,15000,999999 );
resources["Schlachtkreuzer"] = new Array( 30000,40000,15000,999999 );
resources["Todesstern"] = new Array( 5000000,4000000,100000,999999 );
resources["Raketenwerfer"] = new Array( 2000,0,0,999999 );
resources["Leichtes Lasergeschütz"] = new Array( 1500,500,0,999999 );
resources["Schweres Lasergeschütz"] = new Array( 6000,2000,0,999999 );
resources["Gaußkanone"] = new Array( 20000,15000,2000,999999 );
resources["Ionengeschütz"] = new Array( 2000,6000,0,999999 );
resources["Plasmawerfer"] = new Array( 50000,50000,30000,999999 );
resources["Kleine Schildkuppel"] = new Array( 10000,10000,0,999999 );
resources["Große Schildkuppel"] = new Array( 50000,50000,0,999999 );
resources["Abfangrakete"] = new Array( 8000,0,2000,999999 );
resources["Interplanetarrakete"] = new Array( 12500,2500,10000,999999 );

// berechnen fuer wieviele schiffe die res reichen
for (var berechnen in resources)			// nimm jedes schiff (schoen waere skip des erstens, naja)
	for( var i=0 ; i<3 ; i++)				// nimm jede res (met, kris, deut)
		if( resources[berechnen][i]>0 )		// wenn das schiff zum ueberhaupt diese art von res brauch
			resources[berechnen][3] = Math.min( parseInt(resources["vorhanden"][i]/resources[berechnen][i]), resources[berechnen][3] );
			
// einstiegspunkt zum adden der infos finden und reindamit
for (var berechnen in resources){
	var tmp = document.evaluate( "//input[@alt='"+berechnen+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (tmp) {
		newElement = document.createElement('font');
		linkZeile = "<br>(max. <a href=\"javascript:document.getElementsByName('"+tmp.getAttribute('name')+"')[0].setAttribute('value',"+resources[berechnen][3]+");\">"+resources[berechnen][3]+"</a>)";
		newElement.innerHTML = linkZeile;
		tmp.parentNode.insertBefore(newElement, tmp.nextSibling);
	}
}