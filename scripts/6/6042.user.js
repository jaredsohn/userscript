var GMSU_meta_6042 = <><![CDATA[
// ==UserScript==
// @name		StudiVZ Announceblocker
// @namespace		http://www.studivz.net/profile.php?ids=ngcgVg
// @description		Removes the annoying announcement box to the left also check out StudiVZ autologin
// @include		http://www.studivz.net/*
// @version		1.5
// @require		http://userscripts.org/scripts/source/51513.user.js
// ==/UserScript==
]]></>;
GMSU.init(6042);



// Written by Philipp Krueger - check out http://www.studivz.net/profile.php?ids=ngcgVg I gather if you're using this, you have an account. :)
// Code partly stolen from studivz neuigkeiten und telegramm remover since it works better there...

// Custom getElementbyClass function
function getElementbyClass(name){
	var all=document.getElementsByTagName("*");
	for (var i=0; i<all.length; i++){
		if (all[i].className==name){
			var stack=all[i];
		}
	}
	return stack;
}

var showDoYouKnow = GM_getValue("showDoYouKnow");
var hideLogoutWarn = GM_getValue("hideLogoutWarn");
var hidePageFooter = GM_getValue("hidePageFooter");
var hideLeftBox = GM_getValue("hideLeftBox");
var hideBuschfunk = GM_getValue("hideBuschfunk");

function disableDoYouKnow(){
	if (GM_getValue("showDoYouKnow")){
		GM_setValue("showDoYouKnow", false);
	}
	else{
		GM_setValue("showDoYouKnow", true);
	}
}

function disableLogoutWarn(){
	if (GM_getValue("hideLogoutWarn")){
		GM_setValue("hideLogoutWarn", false);
	}
	else{
		GM_setValue("hideLogoutWarn", true);
	}
}

function disablePageFooter(){
	if (GM_getValue("hidePageFooter")){
		GM_setValue("hidePageFooter", false);
	}
	else{
		GM_setValue("hidePageFooter", true);
	}
}

function disableLeftBox(){
	if (GM_getValue("hideLeftBox")){
		GM_setValue("hideLeftBox", false);
	}
	else{
		GM_setValue("hideLeftBox", true);
	}
}

function disableBuschfunk(){
	if (GM_getValue("hideBuschfunk")){
		GM_setValue("hideBuschfunk", false);
	}
	else{
		GM_setValue("hideBuschfunk", true);
	}
}

GM_registerMenuCommand('SvzBlocker - "Do you know...?" on/off', disableDoYouKnow)
GM_registerMenuCommand('SvzBlocker - "Logout warning" on/off', disableLogoutWarn)
GM_registerMenuCommand('SvzBlocker - "Page footer" on/off', disablePageFooter)
GM_registerMenuCommand('SvzBlocker - "left oafish box" on/off', disableLeftBox)
GM_registerMenuCommand('SvzBlocker - "Buschfunk" on/off', disableBuschfunk)

var ad = document.getElementById("ad728x90");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("rightAds");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("logo");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("leftSideBox");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("telegram_staticContent");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("news_staticContent");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("showcase_staticContent");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("mod-invitation-invitationbox");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("AdLinkAhaOhoBirthdayCard");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("Grid-Advertising-Top");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("Grid-Advertising-Right");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("wahlzentrale_staticContent");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("poll-container_f15cf685773da31f");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

var ad = document.getElementById("LeftsideBox");
if(ad != null){
	ad.parentNode.removeChild(ad);
}

if (showDoYouKnow != true){
	var ad = document.getElementById("Kds");
	if(ad != null){
		ad.parentNode.removeChild(ad);
	}
	var ad = document.getElementById("startRight");
	if(ad != null){
		ad.parentNode.removeChild(ad);
	}
 
	var main = document.getElementById('startLeft');
	if(main != null){
		main.style.width = 'auto';
		var tags = main.getElementsByTagName('*');
		for each(tag in tags){
			if(parseInt(getComputedStyle(tag, '').width) == 280)
				tag.style.width = '440px';
		}
	}
}

if (hideLogoutWarn == true){
	var ad = document.getElementById("noLogoutOverview");
	if(ad != null){
		ad.parentNode.removeChild(ad);
	}
}

if (hidePageFooter == true){
	var ad = document.getElementById("pageFooter");
	if(ad != null){
		ad.parentNode.removeChild(ad);
	}
}

if (hideLeftBox == true){
	var ad = document.getElementById("LeftsideBox");
	if(ad != null){
		ad.parentNode.removeChild(ad);
	}
}

if (hideBuschfunk == true){
	var ad = document.getElementById("Mod-Feedbox-Snipplet");
	if(ad != null){
		ad.parentNode.removeChild(ad);
	}
}

// In case it should ever be needed again I'm leaving some obsolete code below
// Locate stupid "Neuigkeiten" and "Telegramme" and remove it
// Code below stolen from "studivz neuigkeiten und telegramm remover" since it's vastly superior
// however more people seem to have installed this script and this way they get both...
// find the original script here http://userscripts.org/scripts/show/9463
/*function() {
	var node = document.getElementsByTagName("div");
	for (var i=0; i<node.length; i++) {
		if (node[i].parentNode.innerHTML.match(/Hol Dir jetzt/)) {
			node[i].parentNode.parentNode.parentNode.removeChild(node[i].parentNode.parentNode);
			if(node[i].className=="clearFix"){
				node[i].parentNode.parentNode.parentNode.removeChild(node[i].parentNode.parentNode);
			}
		}
	}
};*/