// ==UserScript==
// @name           MiniNav
// @version        02.08.12.0935
// @namespace      MNAV
// @description    See your webpage from 10,000 feet! Generates a cool mini-map of the entire current webpage which the user can use to navigate with drag and scroll while it correspondingly tracks the user's position.
// @author         drhouse
// @attribution    Yair Even-Or (http://dropthebit.com/demos/mini_page_nav/miniPageNav.js)
// @include        *//*.*/*
// @run-at         document-idle
// @grant          GM_getValue
// @grant          GM_setValue
// @require        http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @icon           http://aux4.iconpedia.net/uploads/9379009982146022810.png
// ==/UserScript==

// [Autorun Options]

// [Complexity - is the number of elements on any webpage that need to be processed, higher numbers will take more seconds]
var complexity = document.getElementsByTagName('*').length;

//[Complexity Test - uncomment this alert to test # of elements while visiting various pages][examples: 2327 single YouTube video page, 2360 Google results, 3457 YouTube subscriptions, 5888 popurls.com]
//alert('number of elements: '+complexity);

// [Threshold - tweak this, max number of elements (Complexity) on page under which you want MiniNav to run, '4000' autoruns on pages of small and medium size, '10000' autoruns attempted on all pages]
var threshold = 4000;

// [Hotkey 'Ctrl+Spacebar' - http://www.openjs.com/scripts/events/keyboard_shortcuts for available hotkey options]
shortcut.add("Ctrl+Space",function() {
	NavAsync();
});

function toggleNav() {
    if(GM_getValue("toggle_mininav") == 1) {
        alert('AutoMiniNav off');
        GM_setValue("toggle_mininav", "0");
    }
    else {
        alert('AutoMiniNav on');
        GM_setValue("toggle_mininav", "1");
    }
}

function Nav(){
var nav = 'javascript:(function(){var%20script=document.createElement("script");%20script.src="http://dropthebit.com/demos/mini_page_nav/miniPageNav.js";%20document.body.appendChild(script);%20})()';
window.location.href = nav;
}

function NavAsync() {
    setTimeout(function() {
        Nav();
    }, 0);
}

GM_registerMenuCommand("Toggle AutoMiniNav On/Off", toggleNav, "");
var toggle_mininav_value = GM_getValue("toggle_mininav");

if(toggle_mininav_value==1 && window.self === window.top && complexity <= threshold){
	NavAsync();
     return;
 } else {
     return
 }