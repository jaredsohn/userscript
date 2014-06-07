// ==UserScript==
// @name        YouTube old video Header
// @namespace   YouTube: DosMike1
// @description This userscript for Greasemonkey and Tampermonkey allows you to have the YouTube video title above the video instead below. In my view it's just not good to have the title below...
// @include     *.youtube.com/watch?*
// @version     0.9b
// @icon        http://s.ytimg.com/yts/img/favicon_32-vflWoMFGx.png
// @run-at		document-end
// ==/UserScript==

var OHL = new Object();

OHL.Reposit = function() {
	function removeById(oId){
		document.getElementById(oId) ? document.getElementById(oId).parentNode.removeChild(document.getElementById(oId)) : "";
	}
	function removeByClassName(oName, oIndex){
		document.getElementsByClassName(oName)[oIndex] ? document.getElementsByClassName(oName)[oIndex].parentNode.removeChild(document.getElementsByClassName(oName)[oIndex]) : "";
	}

	document.getElementById("watch7-headline").innerHTML ? vidHL = document.getElementById("watch7-headline").innerHTML : "";
	var subBN = document.getElementById("watch7-subscription-container").innerHTML;
	accPIC = document.getElementsByClassName("yt-user-photo ")[0].innerHTML;
	if (document.getElementById("playlist")) {
	   Plst = document.getElementById("playlist").innerHTML;
	   Plst = '<div id="playlist">' + Plst + '</div>';
	} else { Plst = ""; }
	accNAM = document.getElementsByClassName("yt-uix-sessionlink yt-user-name ")[0].innerHTML;
	accURL = document.getElementsByClassName("yt-uix-sessionlink yt-user-name ")[0].href;
	vidCOU = document.getElementsByClassName("yt-uix-sessionlink yt-user-videos")[0].innerHTML;
	vidURL = document.getElementsByClassName("yt-uix-sessionlink yt-user-videos")[0].href;
	removeById("watch7-headline");
	removeById("watch7-subscription-container");
	removeByClassName("yt-uix-button-context-light yt-uix-button-subscription-container",0);
	removeByClassName("yt-user-photo ",0);
	removeByClassName("yt-uix-sessionlink yt-user-name ",0);
	removeByClassName("yt-uix-sessionlink yt-user-videos",0);
	removeById("playlist");
	newCont = "";
	
	newCont += "<elem id='YTOHL'><div id='watch7-headline' class='clearfix  yt-uix-expander yt-uix-expander-collapsed' style='display: block; width:550px; text-align:left; padding-left:16px; padding-right:72px; color:#000; ";
	newCont += "'>";
		newCont += "<span class='yt-user-photo '>";
			newCont += accPIC;
		newCont += "<\/span>";
		newCont += "<div AUTHORHINT='Reposit the Headline' style='position: relative; left: 64px; height: 55px; margin-bottom: -30px; margin-top: -14px; top: -38px; line-height: 50px; vertical-align: middle;'>"
			newCont += vidHL;
		newCont += "<\/div>";

		newCont  += "<a style='color: #333333; font-weight: bold; margin-left: 10px; display: inline-block; height: 23px;' class='yt-uix-sessionlink yt-user-name ' dir='ltr' href='" + accURL + "'>";
			newCont += accNAM;
		newCont += "<\/a>";

		newCont += "<span style='width:8px;' class='yt-user-separator'> · <\/span>";
		
		newCont += "<a style='color: #666666; font-size: 11px; display: inline-block; height: 23px;' class='yt-uix-sessionlink yt-user-videos ' href='" + vidURL + "'>";
			newCont += vidCOU;
		newCont += "<\/a>";
		
		if (subBN) {
		newCont += "<span style='width:8px;' class='yt-user-separator'> · <\/span>";

		newCont += "<span id='watch7-subscription-container'>";
			newCont += subBN;
		newCont += "<\/span>";
		}
	newCont += "<\/div><\/elem>";
	document.getElementById("player-api") ? document.getElementById("player-api").outerHTML = Plst + newCont + document.getElementById("player-api").outerHTML : "";
	document.getElementById("watch7-user-header").innerHTML = "<div id='watch7-views-info' style='top:12px;'>" + document.getElementById("watch7-views-info").innerHTML + "<\/div>";
	document.getElementById("watch7-secondary-actions").style.paddingTop = "48px";
	document.getElementById("watch-uploader-info").firstElementChild.innerHTML += " by " + accNAM;
	if (document.getElementById("watch7-sidebar")) {
		document.getElementById("watch7-playlist-tray-container") ? "" : document.getElementById("watch7-sidebar").style.marginTop = "-500px";
	}
	
	document.getElementById("watch7-playlist-tray-container") ? document.getElementById("watch7-playlist-tray-container").style.height = "504px" : "" ;
	document.getElementById("watch7-playlist-tray-container") ? document.getElementById("watch7-playlist-tray-container").style.marginTop = "-113px" : "" ;
	document.getElementById("watch7-playlist-tray-positioning") ? document.getElementById("watch7-playlist-tray-positioning").style.marginBottom = "-113px" : "" ;
	
	try {
		document.getElementsByTagName("style")[0].innerHTML += ".yt-uix-expander-collapsed h1 { line-height:50px !important; }"; 
	} catch (e) { }
}

OHL.Update = function() {
	function removeById(oId){
		document.getElementById(oId) ? document.getElementById(oId).parentNode.removeChild(document.getElementById(oId)) : "";
	}
	function removeByClassName(oName, oIndex){
		document.getElementsByClassName(oName)[oIndex] ? document.getElementsByClassName(oName)[oIndex].parentNode.removeChild(document.getElementsByClassName(oName)[oIndex]) : "";
	}
	try {
		if (document.getElementById("watch7-content").firstElementChild.firstElementChild.id == "watch7-headline") { 
			setTimeout(function() { OHL.Reposit(); }, 500)
		}
	} catch (e) { }
	setTimeout(function() { OHL.Update(); }, 1000);
}

setTimeout(function() { OHL.Reposit(); }, 500);
setTimeout(function() { OHL.Update(); }, 5000);