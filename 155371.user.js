// ==UserScript==
// @name        Google+ Community User Tagger
// @namespace   com.googleplus.communities.tagger
// @description Adds the ability to custom tag a user on a google plus community
// @include     http://plus.google.com/communities/*
// @include     https://plus.google.com/communities/*
// @version     1.3
// @grant none
// ==/UserScript==

if(typeof(Storage)!=="undefined"){
	var globalnamehash = {'test':'test'};
	if(localStorage.gplusCommunityNameHash && JSON.parse(localStorage.gplusCommunityNameHash)){
		globalnamehash=JSON.parse(localStorage.gplusCommunityNameHash);
	}else{
		localStorage.gplusCommunityNameHash = JSON.stringify(globalnamehash);
	}
}

function lookUp(oid)
{
	return globalnamehash[oid];
}

function addNewNickname(oid,nickname)
{
	globalnamehash[oid]=nickname;
	localStorage.gplusCommunityNameHash = JSON.stringify(globalnamehash);
}

function createButton(oid, node)
{
	var button = document.createElement('a');
	button.addEventListener('click', function(){promptNickname(oid)}, false);
	button.setAttribute('title','Enter nickname');
	button.appendChild(document.createTextNode(" #"));
	node.parentNode.insertBefore(button, node.nextSibling);
}

function promptNickname(oid){
	addNewNickname(oid, window.prompt("What is the user's nickname?",""));
}

nametags = document.getElementsByClassName('Sg Ob Tc');
for(var i=0; i< nametags.length; i++){
	oid = nametags[i].getAttribute("oid");
	if(lookUp(oid) != undefined && lookUp(oid) != ''){
		nametags[i].innerHTML = nametags[i].innerHTML + " ("+lookUp(oid)+")";
	}
	createButton(oid, nametags[i]);
}
nametags = document.getElementsByClassName('Sg Ob qm');
for(var i=0; i< nametags.length; i++){
	oid = nametags[i].getAttribute("oid");
	if(lookUp(oid) != undefined && lookUp(oid) != ''){
		nametags[i].innerHTML = nametags[i].innerHTML + " ("+lookUp(oid)+")";
	}
	createButton(oid, nametags[i]);
}
