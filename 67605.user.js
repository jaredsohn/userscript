// ==UserScript==
// @name		Tehill
// @version		0.01
// @description	Show some text
// @author		Toshka
// @namespace	ToshkaSpace
// @include		http://ww*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you 
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty. 
// Use on your own responsibility.
// ===============================================================================

// Add 'missing' trim to the String class
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');
var BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';
var TUMBLR_URL = 'http://illrs3.tumblr.com/api/read/json?num=1';

function ShowText(){
    GM_xmlhttpRequest({
        method: 'GET',
        url: TUMBLR_URL,
        onload: function (data) {
            eval(data.responseText);
            $('#menu').append('<div style="background-color:#E9F5FA; width:100%;height:75px;"><span style="color:#7F7F7F;padding:7px;float:left;"><b>'+tumblr_api_read.posts[0]["date"]+':</b> ' + tumblr_api_read.posts[0]["regular-body"].replace('<p>', '').replace('</p>', ' ')+'</span></div>');
        }
    });
};



function Main(e) {
    

    var subURL = currURL.substr(BASE_URL.length);
    LOCALE = subURL.substring(0, 2);
    BASE_URL += LOCALE;
    if (currURL == BASE_URL){ShowText();}
    
};

window.addEventListener('load', function(){var checker=setInterval(function(){
    if(typeof ($ = jQuery.noConflict()) != "undefined") {
        clearInterval(checker);
        Main();
    }
},100);}, false);


// =============================================================================================================
//  Version     Date            Change Log
//  0.01        30 Jan 2010         - Get data from tumblr api