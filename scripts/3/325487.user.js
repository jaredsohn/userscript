// ==UserScript==
// @name          TopBar color setter
// @namespace     http://userscripts.org
// @description	  New Twitter UI, you can now change the background-color of TopBar. It saves a cookie (nom nom) to store until 2020 your precious color ;)
// @author        EtienneWan
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// @run-at        document-idle
// ==/UserScript==
"use strict"; 
var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = "function readCookie(name){var nameEQ = name + '=';var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;}function set(color){document.querySelector('.global-nav-inner').style.background=color;document.cookie = 'tbcolor='+color+'; expires=Wed, 01 Jan 2020 00:00:00 UTC; path=/'};var svcolor=readCookie('tbcolor');set(svcolor);var elem = document.createElement('li'); elem.role= 'presentation'; elem.innerHTML = '<input type=\"color\" id=\"colortopbar\" value=\"'+svcolor+'\" data-nav=\"color\" class=\"js-nav\" role=\"menuitem\">';var parent=document.querySelector('.dropdown-menu > ul');parent.insertBefore(elem, parent.getElementsByTagName('li')[8]);var el=document.getElementById('colortopbar');if(document.addEventListener){el.addEventListener('change', function(){set(el.value)}, false);}else{el.attachEvent('onchange', function(){set(el.value)});}";
document.getElementsByTagName('head')[0].appendChild(script);