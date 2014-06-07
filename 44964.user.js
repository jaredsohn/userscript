
// ==UserScript==
// @name megaupload banner remover
// @namespace removetabsbanner
// @description blabla
// @include http://www.megaupload.com/*
// ==/UserScript==


function no_banner() {
// get horizontal tabs banner
var banner = document.getElementById("tabs");
var notabs = banner.length;
// alert(notabs);


// find wrapper
var banner_par = banner.parentNode;
// alert(banner_par);

// remove banner from wrapper
banner_par.removeChild(banner_par);

}

//waits till page is loaded
window.addEventListener("load", no_banner, false);
