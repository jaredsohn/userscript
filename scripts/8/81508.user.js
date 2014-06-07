// ==UserScript==
// @name           corrupt gambling
// @namespace      http://userscripts.org/users/110369
// @description    auto-bets the max on triples at devil dice until the chips aren't available to do so any longer
// @include        http://www.twilightheroes.com/devil-dice.php
// @include        http://www.twilightheroes.com/rest.php
// ==/UserScript==
 
function gfb(n){
	var a=document.getElementsByTagName('input');
	var b=0;
	while (a[b].type!='submit') b++;
	return a[b];}

function gfb(n){
	var a=document.getElementsByTagName('input');
	var b=0;
	n--;
        while (a[b].type!='radio') b++;
	return a[b+n];}

function rfp(){	
	location.href='rest.php';}
	
function dfw(){
	var a=10;//threshold to stop gambling at
	var b=10;//bet to make
	var nfo=localStorage.getItem("cfc");
// In the following line, change the '2' depending on the desired game:
//   1 for devil dice
//   2 for triples
//   3 for high
//   4 for low
//   5 for odd
//   6 for even
//   7 for 1s
//   8 for 2s
//   9 for 3s
// 10 for 4s
// 11 for 5s
// 12 for 6s
	gfb(2).checked=true;
	if (nfo>a){
	       	document.getElementsByName('ddbet')[0].value=b;
		gfb().click();}
	else
		localStorage.setItem('sfg',false);
	GM_log(localStorage.getItem('sfg'));}

function drw(){
	if(document.getElementsByTagName('input').length)	
		dfw();
	else{
		GM_log('stuck here');
		GM_setValue('delayID',setTimeout(rfp,50));}}

function bfa(){
	var a=100000;//threshold to stop gambling at
	var b=100000;//bet to make
	var r=localStorage.getItem('sfg');
	var nfo=localStorage.getItem("cfc");
	if (r&&nfo>a) return true;
	localStorage.setItem('sfg',false);
	return false;}

if(/rest/.exec(location.href)){
    if (bfa())
 	location.href='http://www.twilightheroes.com/devil-dice.php';}
else{
	localStorage.setItem('sfg',true);
	GM_xmlhttpRequest({
	  method: "GET",
	  url: 	"http://www.twilightheroes.com/nav.php",
	  headers: {"User-Agent": navigator.userAgent },
	  onload: function(r) {
	    var rsp = r.responseText;
	    if (!r.responseXML) 
		r.responseXML=new DOMParser().parseFromString(rsp,"text/xml");
	    var pat = /Chips:<\/strong>(.*?)</;   
	    var cfv = pat(rsp);
	    var tfa = cfv[1].split(',');
	    var nfo = tfa.join('');
	    localStorage.setItem("cfc", nfo);
	    GM_log(nfo);
	    drw();}});}