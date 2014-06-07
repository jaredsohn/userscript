// Under Gnu License V3.
// ==UserScript==
// @name           OmertaNoWhereRankScript
// @namespace      By Buterrip <3
// @description    System for Baranfranca, autoplayer *.*
// @include        http://barafranca.com.pt/*
// @include        http://www.barafranca.com.pt/*
// @include  	   http://deathmatch.barafranca.com/*
// @include  	   http://*dm.barafranca.com/*
// @include        http://www.deathmatch.barafranca.com/*
// ==/UserScript==
var db=document.body;
if(db.innerHTML.indexOf('Chegaste ao teu limite de cliques')!=-1) {
	setTimeout(function() { window.location.reload(); }, 30000);
} else if(db.innerHTML.indexOf('504 Gateway Time-out')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('502 Bad Gateway')!=-1) {
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('503 Service Unavailable')!=-1){
	setTimeout(function() { window.location.reload(); }, 20000);
} else if(db.innerHTML.indexOf('Foste libertado da')!=-1){
	setTimeout(function() { window.location.reload(); }, 3000);
} else if(db.innerHTML.indexOf('Downtime. We\'ll be back shortly. Hopefully. ') !=-1){
	setTimeout(function() { window.location.reload(); }, 300000);
} else { // freedom!

var game=top.frames[2];
var dbgame=game.document.body;
var buybullets=0;// Se 1 compra
var precobalas=400; //preco das balas
var quantidade=2000; //quantidade minima
var fianca=1; //Se 1 paga, dependendo do valor de baixo tmb
var fianca1=300; //valor maximo da fiança
var forprofit=0;//traficar por dinheiro ou rank? 0=rank 1=dinheiro.
var narcs=2;//just change it
var alc=7;//just change it

if(dbgame.innerHTML.indexOf('aos teus contactos')!=-1) {
window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
}
if(dbgame.innerHTML.indexOf('cadeia!')!=-1) {
window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
}
if(game.document.location.pathname == '/iminjail.php') {
var pagar=game.document.getElementsByTagName('input')[0].value.replace(/\D/g,"");
var pagar1=new String(pagar);
	if(fianca==1 && pagar1<=fianca1){
		window.setTimeout(function() { game.document.getElementsByTagName('input')[0].click(); } ,3000);
		window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
	}
	if(fianca!=1 || pagar1>fianca1){
		window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
	}
	else {
		window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
	}		
}

if(buybullets==1) {
if(game.document.location.pathname + game.document.location.search == '/bullets2.php') {
var captcha = game.document.getElementById('imgcode');
if(!captcha){
var amount = game.document.getElementById('lbfAmount').value;
var preco = game.document.getElementsByTagName('td')[2].innerHTML;
var preco2=preco.charAt(59)+preco.charAt(60)+preco.charAt(61);
var preco3=new String(preco2);
var amount1=new String(amount);

if(preco3<=precobalas && amount1>=quantidade){
game.document.getElementsByTagName('input')[1].click();
}
else{
window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
}
}
}
}

if(game.document.location.pathname + game.document.location.search == '/information.php') {

var ocupado=0;
var crimes = game.document.getElementsByTagName('td')[28].innerHTML;
var cars = game.document.getElementsByTagName('td')[30].innerHTML;
var booze = game.document.getElementsByTagName('td')[50].innerHTML;
var narcs = game.document.getElementsByTagName('td')[52].innerHTML;
var balas = game.document.getElementsByTagName('td')[40].innerHTML;
var travell = game.document.getElementsByTagName('td')[38].innerHTML;
if (crimes.indexOf("Agora")!=-1 && ocupado==0) {
window.setTimeout(function() { game.document.location.pathname='/BeO/webroot/index.php?module=Crimes';} ,3000);
var ocupado=1;
}
if (cars.indexOf("Agora")!=-1 && ocupado==0) {

var ocupado=2;
window.setTimeout(function() { game.document.location.pathname='/BeO/webroot/index.php?module=Cars'; } ,3000);
}

if (booze.indexOf("Agora")!=-1 && ocupado==0) {
GM_setValue("alc", "1");
var ocupado=3;
window.setTimeout(function() { game.document.location.pathname='/smuggling.php'; } ,3000);
}
if (narcs.indexOf("Agora")!=-1 && ocupado==0) {
GM_setValue("narcs2", "1");
var ocupado=4;
window.setTimeout(function() { game.document.location.pathname='/smuggling.php'; } ,3000);
}
if(buybullets==1) {
if (balas.indexOf("Agora")!=-1 && ocupado==0) {
var ocupado=5;
window.setTimeout(function() { game.document.location.pathname='/bullets2.php'; } ,3000);
}
}
}
if (forprofit==0) {
if(game.document.location.pathname + game.document.location.search == '/smuggling.php') {
var captcha = game.document.getElementById('imgcode');
if(!captcha){
if(GM_getValue("alc")=="1"){
window.setTimeout(function() { game.document.getElementsByTagName('input')[5].value=alc;} ,3000);
window.setTimeout(function() { game.document.getElementsByTagName('input')[18].click();} ,4000);
window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,6000);
GM_setValue("alc", "0");
}
if(GM_getValue("narcs2")=="1"){
window.setTimeout(function() { game.document.getElementsByTagName('input')[14].value=narcs;} ,3000);
window.setTimeout(function() { game.document.getElementsByTagName('input')[18].click();} ,4000);
window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,6000);
GM_setValue("narcs2", "0");
}
}
}
}
if (forprofit==1){

}

if(game.document.location.pathname + game.document.location.search == '/BeO/webroot/index.php?module=Crimes') {
var captcha = game.document.getElementById('imgcode');
if(!captcha){
window.setTimeout(function() { game.document.getElementById('submitAction').click(); } ,3000);
}
if(captcha){
window.setTimeout(function() { game.document.location.pathname='/logout.php'; } ,3000);
}
}
if(game.document.location.pathname + game.document.location.search == '/BeO/webroot/index.php?module=Cars') {
var captcha = game.document.getElementById('imgcode');
if(!captcha){
window.setTimeout(function() { game.document.getElementById('submitAction').click(); } ,3000);
}
}

if(game.document.location.pathname + game.document.location.search == '/BeO/webroot/index.php?module=Crimes&action=docrime') {

window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
}

if(game.document.location.pathname + game.document.location.search == '/BeO/webroot/index.php?module=Cars&action=docar') {

window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,3000);
}
else {
window.setTimeout(function() { game.document.location.pathname='/information.php'; } ,4125);
}
}

