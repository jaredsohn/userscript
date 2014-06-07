// ==UserScript==
// @name        MixUpload Downloader by Manix
// @namespace   MixUpload Downloader
// @description Add Download link on http://mixupload.org
// @include     http://mixupload.org/*
// @grant       none
// @version     0.2
// ==/UserScript==

//show all numbers of dovnloads
var brdo = document.getElementsByClassName('track-rate');
for (i=0; i < brdo.length ;i++){
	var deo_brdo = brdo[i];
	var deo_tr = deo_brdo.getElementsByTagName('tr');
	deo_tr[1].removeAttribute('style');
}

//add download link
var md_naslovi =  document.getElementsByClassName('track-title');
var md_jacina =  document.getElementsByClassName('track-volume');
for (i=0; i < md_naslovi.length ;i++){
	var id_pesme_ceo = md_naslovi[i].getAttribute('rel');
	id_pesme = id_pesme_ceo.replace('-0','');
	id_pesme = id_pesme.replace('-1','');
	md_jacina[i].style.backgroundImage = "none";
	md_jacina[i].style.margin = "41px 0 0 4px";
	md_jacina[i].innerHTML = '<a href="http://www.mixupload.org/download/' + id_pesme + '" title="Download" onclick="window.location.href =\'http://www.mixupload.org/download/' + id_pesme + '\'" style="color:#00AA00; text-decoration:none; font-size:12px; font-family:Verdana, Geneva, sans-serif; margin-top:5px">DL</a>';
}
