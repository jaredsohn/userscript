// ==UserScript==
// @name          search for scripts
// @description   search in usearscripts.org with google
// @namespace     http://userscripts.org/scripts/show/33062
// @include       http://*
// @include       https://*
// ==/UserScript==
//------------------------------------------------------------------------//
//------------------------------------------------------------------------//
//add keyshortcut 
GM_registerMenuCommand( "function", settings, "k", "control alt", "h");

function settings() {

var href = window.location.href;
var p=0;			//for number of "."
var f= new Array(); 
var q=2; 
var t=1; 
var a=0; 
var y;
var o;
var m=4;
var stringa; //= new Array();
var re = /(?:[a-z0-9-]+\.)+[a-z]{2,4}/;

href=href.match(re); //extract the url part 
href=href.toString();

//get the places and nunbers of the "."

for (var i=0;i<href.length;i++){
 		if (href[i]=="."){
 				f[p]=i;
				p++ ;		
	        } 
 }

//check for top level domain consisting of two "parts"
//y=--p;

//o=f[p]-f[y];
//if(o<m){
//p=y;
//}
// place the sites host to "var stringa"
if (p==t){
stringa=href.substring(a,f[0]);

 }
	else if  (p==q){
	stringa=href.substring(++f[0],f[1]);

	}
 		else {
 		stringa=href.substring(++f[1],f[2]);

		}
// open new tab and search for "var stringa"
GM_openInTab("http://www.google.com/search?btnG=Google+Search&q=site:userscripts.org+inurl:scripts+inurl:show+"+ stringa);
}
//
