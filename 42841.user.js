// ==UserScript==
// @name Anti-Error 1.3
// @namespace 11235813[Bande:Küstenpenner]
// @description Laedt Seiten des Highscore- und Spendenseiten so lange neu, bis kein Fehler mehr kommt. Leitet bei falschen Voradressen weiter.
// @include http://*.pennergame.de/*
// @include http://change.pennergame.de/*
// @exclude http://newboard.pennergame.de/
// ==/UserScript==
var DocTitle = document.title;
var url = window.location.href;
var oldPage = url;
var newPage = url;
var reload1 = 0;
var LoadedToken = "Pennergame";
var url1 = url.split('.pennergame.')[0];
var voradresse = url1.split('http://')[1];
var url2 = url.split('.de/')[1];					// eigentliche Voradresse (http://WWW.pennergame.de...)
var ishighscore = url2.split('/')[0];				// http://www.pennergame.de/HIGHSCORE/
var nachhighscore = url2.split('/')[1];
var neueadresse = 'http://highscore.pennergame.de/highscore/'+nachhighscore+'/';		//http://HIGHSCORE.pennergame.de/highscore/..

if (ishighscore == 'highscore' && voradresse == 'www') {		// schaut, ob Link highscorelink ist , aber eine www voradresse hat
	var newPage = neueadresse;
	var reload1 = 1;
}

if (DocTitle.indexOf(LoadedToken) == -1 && reload1 == 0 )		// testtet sonst, ob ein error vorliegt
{
	var reload1 =  1;
	var newPage = url

}
if (reload1 == 1)												//wenn vorher reload1 auf 1 gestezt wurde, wird seite mit neuem Link neu geladen
{
document.location.href=newPage;
}