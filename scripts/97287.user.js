// ==UserScript==
// @name           GOMtv vod time hider
// @include        http://www.gomtv.net/*/vod/*
// ==/UserScript==


function toggleHider()	{	
	var hider = document.getElementById('hider');
	if(hider.style.marginLeft == "122px")
		hider.style.marginLeft="168px";
	else hider.style.marginLeft="122px"; 
}

var hider = document.createElement("div");
hider.innerHTML = '<div id="hider" style="background-color: #222;'+
    'color: red;'+
    'height: 13px;'+
    'margin: 0 auto 0 122px;'+
    'overflow: hidden;'+
    'position: relative;'+
    'top: -22px;'+
    'width: 46px;" onClick="toggleHider();">'+
	'</div>';

document.getElementById('player').appendChild(hider);
document.getElementById('hider').addEventListener('click',toggleHider,false);