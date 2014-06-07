// uploaded.to ads remover and download helper
// written by Julio Matus
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This script removes most uploaded.to's annoying ads, and helps to automate downloads
//
// ==UserScript==
// @name          uploaded.to ads remover and download helper
// @namespace     http://www.rikijpn.co.cc/
// @description   This script removes most uploaded.to's annoying ads, and helps to automate downloads. Go to http://www.rikijpn.co.cc/en/auto_window_opener.php to automate it even more...
// @include       http://www.uploaded.to/*
// @include       http://uploaded.to/*
// @include       http://ul.to/*
// ==/UserScript==


function checkForHomePage(){
    if (document.URL == "http://uploaded.to/register")
	window.close();
}
function removeImages(){
    var allImages = document.getElementsByTagName('img');
    for (var i = 0 ; i <allImages.length ; i++){
	allImages[i].style.display = "none";
    }
}

window.removeAnnoyingAd = function(){
    //var annoyingAdd = document.getElementById('desc_webmoney').nextElementSibling;
    //annoyingAdd.style.display = "none";
    //check for the ad in an id in a div tag
    divTags = document.getElementsByTagName('div');
    sponsorAdsRegexp = /sponsorads*/;
    for(var i=0;i<divTags.length ; i++){
	if (sponsorAdsRegexp.test(divTags[i].id)) break;
    }
    divTags[i].style.display = "none";
}

function removeExtraTables(){
    tableTags = document.getElementsByTagName('table');
    for(var i = 7; i< tableTags.length ; i++){
	tableTags[i].style.display = "none";
    }
}
window.waitForDownloadButton = function(){
    if(document.getElementById('download_submit').value != "Free Download")
	return setTimeout('waitForDownloadButton()', 1 * 1000);
    //    start_download();
    alert('uploaded.to wants you to type now');
}
function showAllInRecapthaArea(){
//     var recaptchaArea = document.getElementById('recaptcha_area');
//     for (var i = 0; i < recaptchaArea.children.length ; i ++){
// 	recaptchaArea.children[i].style.display = "";
//     }
    //only to do on a download page
    if(document.getElementById('recaptcha_image')){
	var imgToShow;
	document.getElementById('recaptcha_image').children[0].style.display = ""; //id in div tag
	var idsToShow = new Array('recaptcha_reload', 'recaptcha_switch_audio', 'recaptcha_switch_img', 'recaptcha_whatsthis');
	for (var i = 0; i < idsToShow.length ; i ++){
	    imgToShow = document.getElementById(idsToShow[i]);
	    imgToShow.style.display = "";
	}
    }
}
checkForHomePage(); //this annoying site automatically opens a new window for its home page, close it...
document.getElementsByTagName('html')[0].onclick = "";
removeExtraTables();
removeImages();
showAllInRecapthaArea();
setTimeout('removeAnnoyingAd()', 4 * 1000);
setTimeout('waitForDownloadButton()', 4 * 1000);


