// ==UserScript==
// @name        All Friends Owned
// @namespace   Liboicl
// @include     http://store.steampowered.com/app/*
// @version     1.5
// @grant		none
// @description	Shows all of your friends that own a game on the Steam Store, as opposed to only 6.
// ==/UserScript==

var debug = 0;

HTMLCollection.prototype.last = HTMLCollection.prototype.last || function(count) {
    count = count || 1;
    var length = this.length;
    if (count <= length) {
        return this[length - count];
    } else {
        return null;
    }
};

var friends=new Array();
var count, tmp;
var x=0, listed=6;

// Get the number of friends that own the game
tmp=document.getElementsByClassName("share")[0].lastChild.href;
var id=parseInt(tmp.substr(tmp.lastIndexOf('/')+1));
count=parseInt(document.getElementsByClassName("friend_blocks_twoxtwo").last().parentNode.getElementsByTagName("a")[0].innerHTML);
if(debug>=3) alert("The games id is "+id);
if(debug>=3) alert("You have "+count+" friends that own this game");

function getFriends(element){
	var name;
	tmp=element.getElementsByClassName("friend_blocks_twoxtwo").last().getElementsByClassName("friend_block_holder");
	for(var i=0;i<tmp.length;i++){
		name=tmp[i].getElementsByClassName("friend_name")[0].innerHTML.trim();
		if(friends.indexOf(name)==-1){
			friends.push(name);
			friends.push(tmp[i].outerHTML);
		}
	}
	doWhile();
}

function requestPage(){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",location.href,false);
	xmlhttp.send();
	var request = document.implementation.createHTMLDocument("response");
	request.documentElement.innerHTML = xmlhttp.responseText;
	
	getFriends(request.documentElement);
}

function doWhile(){
	x++;
	if(debug>=1) document.title=(friends.length/2)+"/"+count+ "  "+x;
	if(debug>=3) alert(friends.length/2+" friends found");
	if((friends.length/2)>listed)
		putFriends();
	if((friends.length/2)<count && x<count*1.7){
		requestPage();
	}else{
		putFriends();
		document.getElementsByClassName("friend_blocks_twoxtwo").last().innerHTML+="<div style=\"clear: left;\"><div style=\"clear: left;\">";
		if(debug>=2) alert("Search finished");
	}
}

function putFriends(){
	for(var i=13+((listed-6)*2);i<friends.length;i+=2){
		document.getElementsByClassName("friend_blocks_twoxtwo").last().innerHTML+=friends[i];
		listed++;
		if((listed-6)%2==0)
			document.getElementsByClassName("friend_blocks_twoxtwo").last().innerHTML+="<div style=\"clear: left;\">";	
	}
}

if(count>6){
	if(debug>=2) alert("Search started");
	var clear=document.getElementsByClassName("friend_blocks_twoxtwo").last().lastElementChild;
	document.getElementsByClassName("friend_blocks_twoxtwo").last().removeChild(clear);
	getFriends(document);
}