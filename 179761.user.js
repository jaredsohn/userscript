// ==UserScript==
// @name           Youtube Header Fixed
// @namespace      YouTube
// @description    make Youtube Header to Fix, follow the user scrolls
// @include        htt*://*.youtube.com/*
// @grant		   none
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @require	   	   http://codeorigin.jquery.com/jquery-2.0.3.min.js
// @version        0.3.2
// @encoding       UTF-8
// ==/UserScript==


var width = $(window).width() + 'px';
        	                
$(document.body).find('#yt-masthead-container').attr('style','width: '+ width +' !important;position: fixed;z-index: 999;box-shadow: 1px 15px 25px #C0C0C0;');
$(document.body).find('#page-container').css('padding-top','60px');	
$(document.body).find('#masthead-expanded').attr('style','position: fixed;z-index: 1000;margin-top: 50px;width: '+ width +';box-shadow: 1px 15px 25px #C0C0C0;');
$(document.body).find('#upload-button-menu').attr('style','position:fixed;').hide();
$(document.body).find('#sb-container').attr('style','position:fixed;');