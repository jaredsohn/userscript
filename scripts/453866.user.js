// ==UserScript==
// @name Bandcamp Downloader
// @author Tommy Smith
// @description Download songs from Bandcamp free of charge!
// @version 1.2
// @include http*://*.bandcamp.com
// @include http*://*.bandcamp.com/
// @include http*://bandcamp.com/album/*
// @include http*://*.bandcamp.com/album/*
// @include http*://bandcamp.com/track/*
// @include http*://*.bandcamp.com/track/*
// @include http*://disasterpeace.com/album/*
// @include http*://*.disasterpeace.com/album/*
// @include http*://disasterpeace.com/track/*
// @include http*://*.disasterpeace.com/track/*
// @exclude http*://*.facebook.com/*
// ==/UserScript==

// create the button to trigger Bandcamp Downloader
var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = function(){/*
function step() {
document.getElementById("bandcampdownloaderbutton").href="javascript:";
document.getElementById("bandcampdownloaderbutton").style.color="gray";
for (track in TralbumData.trackinfo) {
for (enc in TralbumData.trackinfo[track]["file"]) {
if (!document.getElementsByClassName("dl_link")[track]) {
if (!document.getElementById("track_table")) {
window.location=TralbumData.trackinfo[track]["file"][enc];
break;
}
} else {
document.getElementsByClassName("dl_link")[track].innerHTML += "-<a href='"+TralbumData.trackinfo[track]["file"][enc]+"'>"+enc+"</a>";
if (document.getElementsByClassName("dl_link")[track].innerHTML[0] == "-") {
document.getElementsByClassName("dl_link")[track].innerHTML = document.getElementsByClassName("dl_link")[track].innerHTML.substring(1);
}
}
}
}
}*/}.toString().slice(14,-3)
document.getElementsByTagName('body')[0].appendChild(script);

// Tidy it up and make it look all nice, since this must be done after the tracks load

if (!document.getElementsByClassName("ft compound-button")[0]) {
console.log("A rare error has occured - \"Buy Now\" button was not found. Please try again later or contact the script owner (Tommy Smith)");
} else {
document.getElementsByClassName("ft compound-button")[0].innerHTML="<a href='javascript:step();' id='bandcampdownloaderbutton'>Use Bandcamp Downloader</a> or "+document.getElementsByClassName("ft compound-button")[0].innerHTML;
}