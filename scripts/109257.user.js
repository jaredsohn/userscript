// ==UserScript==
// @name           GOMtv vod timer and progress bar hider
// @include        http://www.gomtv.net/*/vod/*
// ==/UserScript==


function toggleHidera()	{	
	var hider = document.getElementById('hider');
	if(hider.style.marginLeft == "70px")
		hider.style.marginLeft="170px";
	else hider.style.marginLeft="70px"; 
}

var hider = document.createElement("div");
hider.innerHTML = '<div id="hider" style="background-color: #222;'+
    'color: red;'+
    'height: 13px;'+
    'margin: 0 auto 0 70px;'+
    'overflow: hidden;'+
    'position: relative;'+
    'top: -22px;'+
    'width: 98px;" onClick="toggleHidera();">'+
	'</div>';

document.getElementById('player').appendChild(hider);
document.getElementById('hider').addEventListener('click',toggleHidera,false);

//big bar


function toggleHider()	{	
	var hider = document.getElementById('hiderb');
	if(hiderb.style.marginTop == "0px")
		hiderb.style.marginTop="10px";
	else hiderb.style.marginTop="0px"; 
}

var hiderb = document.createElement("div");
hiderb.innerHTML = '<div id="hiderb" style="background-color: #222;'+
    'color: red;'+
    'height: 10px;'+
    'margin: 0 auto 0 0px;'+
    'overflow: hidden;'+
    'position: relative;'+
    'top: -53px;'+
    'width: 960px;" onClick="toggleHider();">'+
	'</div>';

document.getElementById('player').appendChild(hiderb);
document.getElementById('hiderb').addEventListener('click',toggleHider,false);