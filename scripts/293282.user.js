// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		Chips-finder for CriminalCase Fanpage
// @description	Script searches for authentic links and opens them
// @include 	https://www.facebook.com/CriminalCaseGame*
// @include 	http://www.facebook.com/CriminalCaseGame*
// @version     0.0.1
// ==/UserScript==
// delete keys on new runs

var d = new Date();
var now = Math.floor((parseInt(d.getTime()))/1000);//timestamp now in s
var last = parseInt(GM_getValue("time",0))+36000; //old value +10h
GM_setValue("time",now);
if (last<now){
GM_setValue("keys","");
}

//reload page soon...
var warten = Math.random()*2000+5000 ;
	setTimeout ( function() { 
window.location.href = "https://www.facebook.com/CriminalCaseGame";
},
			warten );
			
function include(arr, obj) {for(var i=0; i<arr.length; i++) {if (arr[i] == obj) return true;}}

var linksOpened = 0;

function searchLinks(linksOpened){// repeat this again and again until reload...
var links = document.getElementsByTagName("a");
var href = "";
var key = "";
var minitimeout = 0;
GM_log("Number of Links: "+links.length);
for (var i=0; i<links.length; i++){
//GM_log(i+". Link: "+links[i]);
ref = links[i].href;
if(ref.split("/")[2] == "apps.facebook.com" ){
//GM_log(i+". Link: "+links[i]);
}
if((ref.split("/")[2] == "apps.facebook.com" && ref.split("/")[3] == "criminalcase") || ref.split("/")[2] == "imabigfanof.criminalcasegame.com"){
//GM_log("Found Criminal CaseLink: "+ref);

var key = ref.split("/")[4];
if(
key.indexOf("Rank_up")>0 //Chips
//||
//key.indexOf("Level_up")>0 //Orange Juice
//||
//key.indexOf("postCaseProgress")>0 //Money
){
GM_log("Found Bonus with key:"+key);
var keystrg = GM_getValue ("keys", "");
var keys = keystrg.split(";");
if(!include(keys,key) && linksOpened<5){
keystrg += key + ";";
GM_setValue ("keys",keystrg);
links[i].click();
linksOpened++;
}
}
}
}
// evtl find Links mit className UFIPagerLink they open more comments...? Great for Chips but other just flood new tabs... reduce new tabs to 5 per page reload...
links = document.getElementsByClassName("UFIPagerLink");
for (var i=0; i<links.length; i++){
links[i].click();
}
if(linksOpened<5){
window.setTimeout ( function() { 
			searchLinks(linksOpened);	
		},
			100 );
}
}
searchLinks(linksOpened);	