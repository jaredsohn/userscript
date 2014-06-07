// ==UserScript==
// @name           FB ACCEPT REQUESTS
// @namespace      http://192.168.56.101
// @description    Facebook Accept Requests
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// ==/UserScript==
//
function acceptAway(){
	var acceptButtons = document.getElementsByClassName('selected');
    for(var i = 0; i < acceptButtons.length; i++){
		//var applyButton = acceptButtons[i].parentNode;
		console.log(" << click me!", acceptButtons[i]);
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		acceptButtons[i].dispatchEvent(evt);
	}
}
//
var holder = document.createElement('div');
holder.setAttribute('id','awesomeAcceptButtonHolder');
holder.style.width = "120px";
holder.style.height = "25px";
holder.style.left = "100px";
holder.style.top = "100px";
holder.style.padding = "10px";
holder.style.position = "fixed";
holder.style.background = "#FF00FF";
holder.style.border = "1px solid #00FF00";
holder.style.textAlign = "center";
//
var acceptAllButton = document.createElement("button");
acceptAllButton.setAttribute('id', 'awesomeAcceptButton');
acceptAllButton.style.width = "120px";
acceptAllButton.style.height = "25px";
acceptAllButton.innerHTML = "Accept All Requests";
acceptAllButton.addEventListener('click',function(){acceptAway();},false);
//
holder.appendChild(acceptAllButton);
//
document.body.appendChild(holder);