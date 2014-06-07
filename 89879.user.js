// ==UserScript==
// @name           Bandenkampfticker
// @namespace      PennerGame
// @author         Sammelrogge
// @include        http://muenchen.pennergame.de/gang/fight/
// ==/UserScript==

var doc = document.body.innerHTML;

var team2 = doc.split('height="29">&nbsp;')[1].split('</td>')[0];
var ergebnis = doc.split('height="29">&nbsp;')[1].split('<strong>')[1].split('</strong>')[0];
var team1 = doc.split('<a href="/profil/id:')[1].split('/" ')[0];
var bfid = doc.split('<a href="/gang/fight/view/')[1].split('/">Details</a>')[0];

GM_xmlhttpRequest({
	method: 'POST',
	url: 'http://51956766.de.strato-hosting.eu/DPL/update_liveticker.php',
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	data: encodeURI('team1='+team1+'&ergebnis='+ergebnis+'&team2='+team2+'&bfid='+bfid),
	onload: function(rd){
		setTimeout(function() {location.reload();},600000);
	},
	onerror: function(rd){
		setTimeout(function() {location.reload();},600000);
	}
});