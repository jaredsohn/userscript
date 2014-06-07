// ==UserScript==
// @name           OzBargain: Hide expired vouchers
// @description    Hides expired vouchers, with a button to toggle
// @namespace      dylandylan1
// @version        1.2
// @downloadURL    http://userscripts.org/scripts/source/152693.user.js
// @updateURL      http://userscripts.org/scripts/source/152693.meta.js

// @include        *://www.ozbargain.com.au/*
// ==/UserScript==


window.addEventListener("load", function(e) {addButton();}, false);
var btnText = "Show Expired Deals"
function addButton(){
	var btnSpot = document.getElementsByClassName('statsbox');
	var btnCode = document.createElement("span");
	btnCode.innerHTML = '<input id="GMBtn" type="button" value="'+btnText+'" /><br><br>';
    btnSpot[0].parentNode.insertBefore(btnCode, btnSpot[0].nextSibling);
	addButtonListener();
}
function addButtonListener(){
	var button = document.getElementById("GMBtn");
	button.addEventListener('click',doGMBtn,true);
}
function doGMBtn(){
	if (cookeh=='SHOW'){
		createCookie('ozb-xp','HIDE','365');
	}else{ 
		createCookie('ozb-xp','SHOW','365');
	}
	location.reload()
}

var expired = document.getElementsByClassName('tagger expired');
for (var i=0; i < expired.length;i++){	
	var node = expired[i].parentNode.parentNode.parentNode;
	node.style.display = 'none';
}

var cookeh = readCookie('ozb-xp');
if (cookeh=='SHOW'){
	btnText = "Hide Expired Deals"
	var expired = document.getElementsByClassName('node-teaser');	
	for (var i=0; i < expired.length;i++){	
		var node = expired[i];
		//node.style.margin = "0 0 3px 0";
		//node.style.border = "2px solid green";
	}
	var expired = document.getElementsByClassName('tagger expired');	
	for (var i=0; i < expired.length;i++){	
		var node = expired[i].parentNode.parentNode.parentNode;
		node.style.display = 'block';
		node.style.opacity = 0.5;
		//node.style.border = "1px solid red";
	}
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
