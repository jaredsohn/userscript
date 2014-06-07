// ==UserScript==
// @name           auto sound horn
// @namespace      apps.facebook.com/mousehunt/
// @description    sounds the mousehunt horn every 5 to 15 minutes
// @include        apps.facebook.com/mousehunt/
// ==/UserScript==


function soundthehorn() {
	var time to sound it=Math.round(Math.random()*900000+300000);
	setTimeout(soundthehorn() {document.location="http://apps.facebook.com/mousehunt.soundthehorn.php"}, time to sound)
}
