// ==UserScript==
// @name        VeryCD下载链接
// @namespace   neil.com/verycd
// @include     http://www.verycd.com/topics/*
// @version     1.4
// ==/UserScript==
var btnCount = document.getElementById("addFavModule").parentNode.children.length;

if(btnCount == 1) {
	var veryCDURL = window.location.href;
	var resourceID = veryCDURL.split("/")[4];
	var gdajieURL = "http://www.verycd.gdajie.com/topics/" + resourceID;

	var btnDownload = document.createElement("a");
	btnDownload.setAttribute("href",gdajieURL);
	btnDownload.setAttribute("target","_blank");
	btnDownload.setAttribute("style", "font-size:14pt;");

	var imgDownload = document.createElement("img");
	imgDownload.setAttribute("src","http://dragon2012-my.stor.sinaapp.com/image/donkey.png");
	imgDownload.setAttribute("style", "height: 32px; width: 32px; margin: 0px 5px 0px 10px;");

	btnDownload.appendChild(imgDownload);
	btnDownload.appendChild(document.createTextNode("下载"));

	var divFav = document.getElementById("addFavModule");
	divFav.parentNode.appendChild(btnDownload);
}

function getCurrentStyle (obj, prop) {      
    if (obj.currentStyle) {         
        return obj.currentStyle[prop];      
    }       
    else if (window.getComputedStyle) {         
        propprop = prop.replace (/([A-Z])/g, "-$1");            
        propprop = prop.toLowerCase ();         
        return document.defaultView.getComputedStyle (obj,null)[prop];      
    }       
    return null;    
}    