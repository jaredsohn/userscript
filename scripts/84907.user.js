// ==UserScript==
// @name           OmertaNoWhereBooster
// @namespace      By Buterrip <3
// @description    For boost up capos :)
// @include  	   http://*barafranca*/*
// ==/UserScript==
var game=top.frames[2];
var booze=50;//your booze units
var coca=16;//your narcs units
var db=document.body;
if(db.innerHTML.indexOf('Chegaste ao teu limite de cliques')!=-1) {
	setTimeout(function() { window.location.reload(); }, 30000);
} else if(db.innerHTML.indexOf('504 Gateway Time-out')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('502 Bad Gateway')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('503 Service Unavailable')!=-1){
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('click')!=-1){
	setTimeout(function() { window.location.reload(); }, 30000);
} else if(db.innerHTML.indexOf('Downtime. We\'ll be back shortly. Hopefully. ') !=-1){
	setTimeout(function() { window.location.reload(); }, 300000);
} else {
if(game.document.location.pathname == '/smuggling.php') {
game.document.getElementsByTagName('input')[12].value=coca;//coca
game.document.getElementsByTagName('input')[6].value=booze;//rum
window.setTimeout(function() { game.document.getElementsByTagName('input')[18].click(); } ,1444);
}
else {
window.setTimeout(function() { game.document.location.pathname='/smuggling.php'; } ,2044);
}
}
