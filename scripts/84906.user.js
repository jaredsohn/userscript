// ==UserScript==
// @name           OmertaNoWhereBuster
// @namespace      By Buterrip <3
// @description    System for Baranfranca Busters *.*
// @include        http://*barafranca*/*
// ==/UserScript==
var db=document.body;
var game=top.frames[2];
var dbgame=game.document.body;
if(db.innerHTML.indexOf('Chegaste ao teu limite de cliques')!=-1) {
	setTimeout(function() { window.location.reload(); }, 30000);
} else if(db.innerHTML.indexOf('504 Gateway Time-out')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('502 Bad Gateway')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('503 Service Unavailable')!=-1){
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('Downtime. We\'ll be back shortly. Hopefully. ') !=-1){
	setTimeout(function() { window.location.reload(); }, 300000);
} else if(db.innerHTML.indexOf('aos teus contactos') !=-1){
	setTimeout(function() { game.document.location.pathname='/jail.php'; } ,4044);
} else if(db.innerHTML.indexOf('cadeia!') !=-1){
	setTimeout(function() { game.document.location.pathname='/jail.php'; } ,4044);
} else {
	if(game.document.location.pathname + game.document.location.search == '/iminjail.php') {
		setTimeout(function() { game.document.location.pathname='/jail.php'; } ,17000);
	}
	if(game.document.location.pathname == '/jail.php') {
		var captcha = game.document.getElementById('imgcode');
		if(!captcha){
			setTimeout(function() { game.document.getElementsByTagName('input')[0].click(); } ,444);
			//setTimeout(function() { window.location.reload(); }, 2500);		
		}
	}
	else {
		setTimeout(function() { game.document.location.pathname='/jail.php'; } ,300000);
	}
	
}
