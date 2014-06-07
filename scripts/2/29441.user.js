
// Greasemonkey Flash fullscreen blockade
// version 1.0 ALFA
// 2008-07-01
// Copyright (c) 2008, Ivan Markovic
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
// select "Flash fullscreen blockade", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flash fullscreen blockade
// @namespace     http://security-net.biz/gm-flash-fsblok/gm-flash-fsblok.user.js
// @description   Greasemonkey Flash fullscreen blockade
// @include       *
// ==/UserScript==


// Find object flash
flash_obj = document.getElementsByTagName("object"); 
for (i = 0; i < flash_obj.length; i++) { 
    js_content = flash_obj[i].innerHTML;
    if(js_content.indexOf('allowFullScreen') != -1) {
        js_content = js_content.replace(/allowFullScreen/i, "allowFullScreen_disabled");
        flash_obj[i].innerHTML = js_content;
    }
}

// Find embed flash
flash = document.getElementsByTagName("embed"); 
for (i = 0; i < flash.length; i++) { 
    status = flash[i].getAttribute("allowFullScreen"); 
    if(status == 'true') {
        flash[i].setAttribute("allowFullScreen", 'false');
    }
}

// Find JS flash
flash_js = document.getElementsByTagName("script"); 
for (i = 0; i < flash_js.length; i++) { 
    js_content = flash_js[i].innerHTML;
    if(js_content.indexOf('allowFullScreen') != -1) {
        js_content = js_content.replace(/allowFullScreen/i, "allowFullScreen_disabled");
        flash_js[i].innerHTML = js_content;
    }
}

