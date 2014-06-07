// ==UserScript==
// @name           iTunes AppTrackr Loading Page Integration
// @description    Changes the iTunes loading page into a optional launch page that can either forward you to AppTrackr or the iTunes Store
// @include        http://ax.itunes.apple.com/WebObjects/*
// @include        http://itunes.apple.com/*
// ==/UserScript==
function main() { 

document.body.setAttribute("onload", "");  

document.body.innerHTML= document.body.innerHTML.replace("We are unable to find iTunes on your computer.","Brought To You By Donator/Hack B4 Bed");
document.body.innerHTML= document.body.innerHTML.replace("I have iTunes","Itunes");
document.body.innerHTML= document.body.innerHTML.replace("Download iTunes","AppTrackr");

var iTunesURLID = /Software\?id=\d*/i;
var iTunesFoundID = iTunesURLID.exec(document.body.innerHTML);
if (iTunesFoundID != null) {
  var appTrackrID = iTunesFoundID+'';
  var appTrackrURL = "http://apptrackr.org/?act=viewapp&appid="+appTrackrID.substr(12)+"\" class=\"";
	document.body.innerHTML= document.body.innerHTML.replace(/http:\/\/www\.apple\.com\/itunes\/affiliates\/download\/\?itmsUrl=itms/i,appTrackrURL);
}
document.getElementById('userOverridePanel').style.display='block';
}

main();