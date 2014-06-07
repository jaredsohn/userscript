// ==UserScript==
// @name           Emrah_Ky-Friend
// @namespace      Emrah_Ky-Friendd
// @description    Sadece Bana Aittir,
// @author         http://www.facebook.com/emrhcsm
// @include        htt*://www.facebook.com/*
// @version    1.0
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*

// ==/UserScript==
function acceptAway(){
	var acceptButtons = document.getElementsByClassName('uiButtonConfirm');
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
holder.style.background = "#CCFF00";
holder.style.border = "1px solid #000000";
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
// ==============