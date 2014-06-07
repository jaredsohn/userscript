// ==UserScript==
// @name           RenRenZX
// @namespace      liyangdal[=_AT_=]hotmail.com
// @author         liyang
// @include        http://renren.com/*
// @include        http://*.renren.com/*
// @include        https://renren.com/*
// @include        https://*.renren.com/*
// @description    RenRen.com term theme
// @version        0.0.3
// ==/UserScript==

removeAd();
applyTermStyle();

function removeAd(){
    
    var ids = ["ad1000000060","ad1000000065", "ad1000000067","homeBirthdayPart"];
    for(i in ids){
        removeElementById(ids[i]);
    }
}

function applyTermStyle(){
	document.body.style.background = "#000000";
	document.body.style.color = "#00FF00"
}

function removeElementById(id)
{
	var e = document.getElementById(id);
	e && e.parentNode.removeChild(e);
	return true;
}

function removeElement(e)
{
    e&&e.parentNode.removeChild(e);
    return true;
}