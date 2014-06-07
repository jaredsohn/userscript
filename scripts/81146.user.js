// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
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
// select "Block object in VNExpress.net", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Block object in VNExpress.net
// @namespace     sang
// @description   to disable advertisement in vnexpress.net site
// @include       http://vnexpress.net/*
// @exclude       http://google.com
// ==/UserScript==

document.getElementById('header').style.display='none';
document.getElementById('linksiteEH').style.display='none';

// content center
var center = document.getElementById('content');
var children = center.children;

for(var i=0;i<children.length;i++){
    var item = children.item(i);
    if(item.className.match('content-center')){
        for(var j=0;j<item.children.length;j++){
            if(item.children.item(j).className.match('content')){
                var center_obj = item.children.item(j);
                center_obj.children.item(1).style.display = 'none';
            }
        }
    }
    if(item.className.match('content-right fl')){
       item.style.display = 'none';
    }
}

// hide footer promo
document.getElementById('FooterBanner').style.display = 'none';
