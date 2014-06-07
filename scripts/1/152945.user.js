// ==UserScript==
// @name           Disable Google "unsupported browser" Reminder
// @description    Disable the annoying Google "unsupported browser" reminder
// @version	   0.2
// @include        http*://google.com/*
// @include        http*://docs.google.com/*
// @include        http*://mail.google.com/*
// @include        http*://drive.google.com/*
// ==/UserScript==

function toggle_visibility_drive () {
    // google drive 
    var is_visible = document.getElementsByClassName("actionstatusbox-container")[0].style.display != "none";
    document.getElementsByClassName('actionstatusbox-container')[0].style.display = is_visible ? "none":"block";
    
}

function toggle_visibility () {
    // google general
    var is_visible = document.getElementsByClassName("docs-butterbar-container")[0].style.display != "none";
    document.getElementsByClassName('docs-butterbar-container')[0].style.display = is_visible ? "none":"block"; 

}

var url = window.location.href;

if(url.indexOf("drive.google.com") > -1){
    toggle_visibility_drive();
} else {
    toggle_visibility();
}

