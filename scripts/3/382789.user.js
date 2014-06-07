// ==UserScript==
//Author: Hemant Aggarwal
//Written: 12/02/2014
//Last modified: 12/02/2014
//The script hides the Sponsored Stories on Facebook.
// @name		Hides Facebook's Sponsored Ads
// @description	Hides the sponsored stories on Facebook whatsover
// @include	http://*.facebook.com/*
// @exclude	http://*.facebook.com/login.php
// @include	https://*.facebook.com/*
// @exclude	https://*.facebook.com/login.php
// @version     2.3
// ==/UserScript==

//Find and hide Sponsored Ads

function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}

var target = document.querySelector('body');
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (document.getElementById("pagelet_side_ads")) {
            document.getElementById("pagelet_side_ads").style.display = 'table';
            document.getElementById("pagelet_side_ads").style.display = 'none';
        }
        
        if (document.querySelectorAll(".ego_column")) {
            if (typeOf(document.querySelectorAll(".ego_column"))=='object') {
                for (var i=0;i<document.querySelectorAll(".ego_column").length;i++) {
                    if(document.querySelectorAll(".ego_column")[i].querySelector("span.adsCategoryTitleLink")) {
                        //console.log('many');
                        document.querySelectorAll(".ego_column")[i].style.display="none";
                    }
                }
            } else {
                if(document.querySelector(".ego_column").querySelector("span.adsCategoryTitleLink")) {
                    //console.log('one');
                    document.querySelector(".ego_column").style.display="none";
                }
            }
        }
        
        if (document.querySelector("._5jmm._5pat._5uch")) {
            if (typeOf(document.querySelectorAll("._5jmm._5pat._5uch"))=='object') {
                for (var i=0;i<document.querySelectorAll("._5jmm._5pat._5uch").length;i++) {
                    if(document.querySelectorAll("._5jmm._5pat._5uch")[i].querySelector("a.uiStreamSponsoredLink")) {
                        document.querySelectorAll("._5jmm._5pat._5uch")[i].style.display="none";
                        //console.log('sponsoredPostHidden');
                    }
                }
            }
        }
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });