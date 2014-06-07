// ==UserScript==
// @name Pd Msgframe Uni Switcher - keepTab version
// @namespace Taki
// @description Allows you to quickly switch between Orion, Artemis and Pegasus (if you're premium)
// @include http*://*.pardus.at/game.php
// @include http*://*.pardus.at/msgframe.php
// @include http*://forum.pardus.at/*
// @include http*://chat.pardus.at/*
// @include http*://*.pardus.at/main.php
// @include http*://*.pardus.at/logout.php
// ==/UserScript==

// Version 4.6

// use this at best as temporary solution until Faz does a more awesome version of this.
// thanks Simir for improving it :)
// sph's improvement (v2.0)
// bugfix of sph's improvs: v2.1
// nice and clean 3.0 sph
// again improv to sphs tuning :) v3.1
// premium-check no longer in the for-loop :blush: v3.2
// auto-forward to last visited page if it was forum or chat (thanks to sph, faz and ratchetfreak! ... finally I did it myself though :D) v4.0b
// lots of code-improvement v4.1b
// bugfixes, added message forward v4.2b
// lots of fixes and improvements. also now working for others on install! v4.3
// further streamlining v4.5
// fixed bug that auto-forward didn't work from docking-screen. (docking screen now counts as main.php for programming purposes)v4.6

// TODO: find correct, not necessarily first image in msgframe (low priority)


//initializing important variables
var prot = location.protocol + "//"; //Get protocol, as users either connect via un- or secure login.
if(prot!="http://"&&prot!="https://") prot="http://"; //default value... on error? remove?
var univ = ''; //remove?
var univ = location.hostname.split('.')[0]; //get universe
if(univ == '') exit; //remove?
	var _universes = [ //Pardus server names and other info here.
	{id: "orion", title: "Orion", shortname: "O", premium: false},
	{id: "artemis", title: "Artemis", shortname: "A", premium: false},
	{id: "pegasus", title: "Pegasus", shortname: "P", premium: true}
	];
var _counterverses = new Array();
for (i=0;i<_universes.length;i++){
	_counterverses[i] = _universes[i].id;
}

if(GM_getValue("parentuniverse",0)==0)GM_setValue("parentuniverse",univ); //will run only once on first execution of script

//declaring functions
function checkSwitch(){ //used in main
	getCounterverse();
	for(i=0;i<_counterverses.length;i++){
		if (_counterverses[i]==GM_getValue("parentuniverse",univ))return false; //univ will make it match = false;
	}
	return true; //current and previous universe are different
}

function getCounterverse(){ //used in function checkSwitch
	for(i = 0; i < _counterverses.length;i++){
		if(_counterverses[i] == univ) {
			_counterverses = _counterverses.splice(i,1);
			break;
		}
	}
}

function checkMain() {
var check = window.parent.frames[2].location.pathname.slice(1,3);
	try{
		// doesn't exec if it's 'me' (message_private or messages_alliance) or 'ma' (main, handled seperately!!) or 'lo' (logout, main)
		if(check!="me"&&check!="ma"&&check!="lo") GM_setValue("switchto",0);
		else if(check=="me") GM_setValue("switchto",window.parent.frames[2].location.pathname);
	}
	catch(err){ // forum and chat cause this. just let them ^_^.
	}
}
// should not work on:
// http*://*.pardus.at/main.php // handled seperately!
// http*://*.pardus.at/logout.php
// http*://forum.pardus.at/*
// http*://chat.pardus.at/*
// http*://*.pardus.at/messages_*.php
// also not(
// http*://*.pardus.at/game.php NOT // not in main... shouldn't influence
// http*://*.pardus.at/msgframe.php NOT // not in main... shouldn't influence
// )
// but
// http*://*.pardus.at/overview_*.php
// http*://*.pardus.at/news.php
// http*://*.pardus.at/diplomacy.php
// http*://*.pardus.at/*alliance*.php
// http*://*.pardus.at/acs_log.php
// http*://*.pardus.at/faction_*.php
// http*://*.pardus.at/statistics.php
// http*://*.pardus.at/options.php

//main code
if(location.pathname.search(/msgframe.php/) != -1){
	var isPremium = !(document.body.innerHTML.indexOf('Premium')>-1); //checking for premium-account

	var links = document.getElementsByTagName('img');
	if(links.length<1) exit; //bail out
	var linkNode = links[0];
	
	var foundCur = false; //flag to store if we found our current universe already
	
	for(i = 0; i <_universes.length;i++){
		if(_universes[i].id == univ){ //found our current universe
			foundCur = true;
			continue; //do nothing in this iteration
		}
		if(!isPremium && _universes[i].premium) continue; //don't add premium universes

		var hp = document.createElement('A');
		hp.setAttribute('target','_main');
		hp.setAttribute('href',prot+"www.pardus.at/index.php?section=account_play&universe="+_universes[i].title);
		hp.addEventListener('click',checkMain,true) //doesn't work in forum or chat, workaround?
		if(!foundCur){ //insert in front
			hp.appendChild(document.createTextNode(_universes[i].shortname+' '));
			linkNode.parentNode.insertBefore(hp, linkNode);
		} 
	    else{ //insert back
			hp.appendChild(document.createTextNode(' '+_universes[i].shortname));
			linkNode.parentNode.insertBefore(hp, linkNode.nextSibling);
			linkNode = linkNode.nextSibling;
	   }
	}
}
else if((location.href.search(/main.php/) != -1)||(location.href.search(/logout.php/) != -1)){ //main
	if (GM_getValue("switchto",0)!=0 && checkSwitch()==true){ //the core of the switch
		GM_setValue("parentuniverse",univ);
		if (GM_getValue("switchto").slice(1,3)=="me"){ //var = /messages_(alliance|private).php, this tries to extract the 'me' part
			location.href = prot+univ+".pardus.at"+GM_getValue("switchto");
		}
		else{
			location.href = prot+GM_getValue("switchto")+".pardus.at";
		}
	}
	else{
		GM_setValue("switchto",0);
	}

}
else if(location.hostname.search(/forum/) != -1) GM_setValue("switchto","forum");
else if(location.hostname.search(/chat/) != -1) GM_setValue("switchto","chat");//gets called twice
else{
}