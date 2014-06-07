// ==UserScript==
// @name           turn off bloops
// @namespace      ffffff
// @description    ffffff
// @include        http*://www.icanhazchat.com/*

// @include        http*://icanhazchat.com/*
// @version        0.1
// ==/UserScript==

init();

function init(){
	button = document.createElement('span');
	button.setAttribute('style', 'cursor:pointer;margin-left:10px;text-decoration:underline;font-weight:bold;color: #000000');
	button.innerHTML = "<br>Run Commands<br>";
	document.getElementById("lblDynamicFootLink").appendChild(button);
	button.addEventListener("click",run ,true);
}

function run(){
	document.getElementById("txtMsg").value = "/set pmbeep=0";
	document.getElementById("btn").click();
	pausecomp(1200);
	document.getElementById("txtMsg").value = "/set whisperbeep=0";
	document.getElementById("btn").click();
	pausecomp(1200);
	document.getElementById("txtMsg").value = "/set youtube=0";
	document.getElementById("btn").click();
	pausecomp(2000);
	document.getElementById("txtMsg").value = "/modme";
	document.getElementById("btn").click();
	
}

function pausecomp(millis){
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); }
	while(curDate-date < millis);
} 
