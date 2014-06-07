// Myspace Garbage Remover
// version 0.4
// 2007-05-20
// Copyright (c) 2006,2007 Neil Despres
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MySpace Garbage Remover
// @namespace     http://www.mynameisneil.com/
// @description   Removes everything from 'get mobile alerts' to 'make myspace my homepage'
// @include       http://home.myspace.com/index.cfm*
// ==/UserScript==



//there are a couple elements all named 'home_additionalLinks'
//thanks to Donald of http://www.trunetworks.com/ for suggesting this method of looping!
//i just can't get it to work! if you have any suggestions, please let me know!
//var haL = document.getElementById('home_additionalLinks');
//while (haL != -1) {
//haL.parentNode.removeChild(home_additionalLinks);
//}


//removes URL box (why would you not know it by now?)
var urlbox = document.getElementById('home_userURLInfo');
if (urlbox) {
    urlbox.parentNode.removeChild(urlbox);
}


//there are a bunch of links all called home_additionalLinks (myspace mobile, mobile alerts, helio, profile editor)
//i'm removing it a bunch of times.. if anyone knows how to loop this, contact me!
var helio = document.getElementById('home_additionalLinks');
if (helio) {
    helio.parentNode.removeChild(helio);
}

var helio = document.getElementById('home_additionalLinks');
if (helio) {
    helio.parentNode.removeChild(helio);
}

var helio = document.getElementById('home_additionalLinks');
if (helio) {
    helio.parentNode.removeChild(helio);
}

var helio = document.getElementById('home_additionalLinks');
if (helio) {
    helio.parentNode.removeChild(helio);
}

var helio = document.getElementById('home_additionalLinks');
if (helio) {
    helio.parentNode.removeChild(helio);
}

//removes link set myspace as your home page (AS IF! i'll stick with about:blank, thanks tom.)
var homepage = document.getElementById('home_setHomePage');
if (homepage) {
    homepage.parentNode.removeChild(homepage);
}

//removes that annoying school box.
var schools = document.getElementById('home_schools');
if (schools) {
    schools.parentNode.removeChild(schools);
}

//removes footer
var footer = document.getElementById('footer');
if (footer) {
    footer.parentNode.removeChild(footer);
}//removes box to search address book
var addr2 = document.getElementById('home_coolNewVideos');
if (addr2) {
    addr2.parentNode.removeChild(addr);
}


//removes tom's announcements (rarely informative, and poorly placed!)
var tom = document.getElementById('home_announcements');
if (tom) {
    tom.parentNode.removeChild(home_announcements);
}

var tom2 = document.getElementById('ctl00_Main_ctl00_CMS_Tom_Announcement');
if (tom2) {
    tom2.parentNode.removeChild(ctl00_Main_ctl00_CMS_Tom_Announcement);
}

//removes "sponsored links", google ads!
var gads = document.getElementById('ctl00_Main_ctl00_ProfileHome_gads');
if (gads) {
    gads.parentNode.removeChild(gads);
}

//removes books/chat rooms/filmmakers greybox
var greybox = document.getElementById('home_greybox');
if (greybox) {
    greybox.parentNode.removeChild(greybox);
}

//i know i have another script which removes cool new people but i guess it doesn't work anymore?
var kEwLnEwP33Pz = document.getElementById('ctl00_Main_ctl00_CoolNew1_divCoolNewPeople');
if (kEwLnEwP33Pz) {
    kEwLnEwP33Pz.parentNode.removeChild(kEwLnEwP33Pz);
}
//do boxes need to be empty before you can erase them?
var addr = document.getElementById('addressBook_image');
if (addr) {
    addr.parentNode.removeChild(addr);
}



var hal = document.getElementById('home_additionalLinks');
if (hal) {
    hal.parentNode.removeChild(hal);
}