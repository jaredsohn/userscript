// ==UserScript==
// @name        Ads Link Bypasser
// @namespace   http://fb.me/kpanel
// @description Bypass Adf.ly,Linkbucks,Cc.cc,Urlcash Links
// @include     *adf.ly/*
// @include     *q.gs/*
// @include     *j.gs/*
// @include     *linkbucks.com/
// @include     *tinybucks.net/
// @include     *cc.cc/*
// @include     *urlcash.com/
// @version     1.1
// Coded By Fakhru
// Thanks to Shahril & Munajaf
// ==/UserScript==

var data = site();
var url = parse();

function main(){
if (url && !verify() && validate()){
redirect();

}
}

function site(){
var site = '';

if ((cari('adf.ly') || cari('q.gs') || cari('j.gs')) && !cari("locked")){
	site = 'adf';
	var path = "/html/head/script[text()[contains(.,\"var zzz = '\")]]";
	var reg = /zzz = \'(.*?)'/;
}else if ((cari('linkbucks') || cari('tinybucks')) && !cari("verify")) {
	site = 'linkbucks';
	 var path = '/html/body/script[text()[contains(.,"Lbjs.TargetUrl")]]';
	 var reg = /Lbjs.TargetUrl = \'(.*?)'/;
}else if (cari('urlcash')) {
	site = 'urlcash';
	var path = '/html/body/script[text()[contains(.,"linkDestUrl")]]';
	var reg = /linkDestUrl = \'(.*?)'/;
}else if(cari('cc.cc')){
	site = 'cc.cc'
	var path = "/html/head/script[text()[contains(.,\"window.open\")]]";
	var reg = /window.open\('http:\/\/www.google.com\/safebrowsing\/diagnostic\?site\=(.*?)\'\)/;
}else if(cari('\/ad\/locked')){
	site = 'adflocked';
	var path = "/html/body//a[@style='color:#FFFFFF;']";
}else if(cari('verify')){
	site = 'linkbucksverify';
}else {
site = "def";
}

if (site != 'def') {
  var sitez = [];
  sitez.push(site,path,reg);
	return sitez;
}else{
	return false;
}
}

function cari(string){
	var cur = window.location.href;
	if(cur.search(string) != -1){
		return true;
	}else {
		return false;
	}

}

function parse(){
	if (site()){
	var script = document.evaluate(data[1], document, null, 9, null).singleNodeValue;
	if (adflocked()){
		return script;
	}
	else if (script != null){
	var url = script.textContent.match(data[2]);
	return url[1];
	}
	}else {
		return false;
	}
}

function adflocked(){
	if (data[0] == 'adflocked') {
		return true;
	}else {
		return false;
	}

}

function verify(){
if (data[0] == 'linkbucksverify'){
	return true;
}else {
	return false;
}
}

function validate(){
		if (url.match(/^https?\:\/\/[^\/\s]+(\/.*)?$/)){
			return true;
}else {
	return false;
}

}

function redirect(){
	if (data[0] == 'linkbucks' ){
        if (navigator.userAgent.indexOf('Firefox') != -1){
window.Lbjs = '';
        }else {
var scriptText = "Lbjs = '';";
var rwscript = document.createElement("script");
rwscript.type = "text/javascript";
rwscript.textContent = scriptText;
document.documentElement.appendChild(rwscript);
rwscript.parentNode.removeChild(rwscript);
        }
}
window.location.replace(url);
}


 main();