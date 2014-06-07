// ==UserScript==
// @name          autolocsol
// @namespace     
// @description   descript
// @version       1.5
// @include       http://www.minigame123.com/*
// @include       http://www.heronow.com/*
// @include       https://www.minigame123.com/*
// @include       https://www.heronow.com/*
// ==/UserScript==

var barat = new Array();
var j = 0;
var baratclass;
var mitcsinal = 1;
var jkesz = -1;

window.addEventListener("load", function(e) {
	run();
}, false);

function run(){
if ( document.getElementById("loading_main") != null) {
	var miele = document.getElementById('loading_main');
	var mit = document.createElement('div');
	mit.setAttribute('id', 'locsol');
	mit.setAttribute('style', 'margin-left:670px; color:#000;');
	mit.innerHTML = '<input id="autolocsol" type="button" value="Locsol" />';
	miele.parentNode.insertBefore(mit,miele);
	addButtonListener();
}
}

function addButtonListener(){
if (document.getElementById("autolocsol") != null) {
  var button = document.getElementById("autolocsol");
  button.addEventListener('click',locsol1,true);
}
}

function locsol1(){
var feedment = "";
if ( document.getElementById("feedlist") != null) {
feedment = document.getElementById("feedlist").innerHTML;
document.getElementById("feedlist").innerHTML = "<p>dolgozom</p>";
}
if (document.getElementById('friendlist').innerHTML=="&nbsp;"){document.getElementById("feedlist").innerHTML = feedment; alert("Nyisd ki a barátlistát!");}
else if (document.getElementById("feedlist").innerHTML == "<p>dolgozom</p>"){
	baratclass = document.getElementById('friendlist').getElementsByClassName('f_td_1');
	for (var i = 0; i<baratclass.length; i++){
		barat[i] = baratclass[i].getAttributeNode("onclick").nodeValue.slice(15,-15);
		document.getElementById("feedlist").innerHTML = feedment;
		mitcsinal = 1;
	}
	mitcsinal = 1;
	setTimeout(locsol2, 1000);
}
else {alert("Valami hiba történt!")};
}

function locsol2(){
if (mitcsinal == 1 && document.getElementById("loading").style.display=="none"){ 
	if (barat[j]!=undefined)
	{
		location.href = "javascript:void(viewIndex("+barat[j]+"));";
		mitcsinal = 3;
	}
	else{mitcsinal = 4;}
}
if (mitcsinal == 2 && document.getElementById("loading").style.display=="none")
{
	var ilist = document.images;ilisth = ilist.length;
	var i = 0
	for(i = 0; i < ilisth; i++) {
    	img=ilist[i];
		if(img.src == "http://imgcache.heronow.com/images/game/speedmagic.gif") { location.href = "javascript:void(speedFriendFarm("+barat[j]+",this));"; jkesz=j; break; }
		if(img.src == "http://imgcache.heronow.com/images/game/helpharvest.gif") { location.href = "javascript:void(harvestFriendFarm("+barat[j]+",this));"; j--; jkesz=j-1; break; }
	}
	if (i==ilisth){jkesz=j;}
	if (j==jkesz){j++;}
	mitcsinal = 1;
}
if (mitcsinal == 3) {mitcsinal = 2;}
if (mitcsinal<3){setTimeout(locsol2, 500);}
}