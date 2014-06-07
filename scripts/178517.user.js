// ==UserScript==
// @name		HF Scripts - HF CDN Fix
// @namespace 		xerotic/hfcdnfix
// @description 	Fixes the current CDN issues with HF.
// @include  		*hackforums.net/*
// @include  		*hackforums.net/*
// @version  		1.0.0
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(new RegExp("x.hack","g"),"hack");var link=window.document.createElement("link");link.rel="stylesheet";link.type="text/css";link.href="http://hackforums.net/cache/themes/theme3/global.css";document.getElementsByTagName("HEAD")[0].appendChild(link);var link=window.document.createElement("link");link.rel="stylesheet";link.type="text/css";link.href="http://hackforums.net/cache/themes/theme3/tabbed.css";document.getElementsByTagName("HEAD")[0].appendChild(link);var jslink=window.document.createElement("script");jslink.type="text/javascript";jslink.src="http://hackforums.net/jscripts/prototype.js?ver=1603";document.getElementsByTagName("HEAD")[0].appendChild(jslink);var jslink=window.document.createElement("script");jslink.type="text/javascript";jslink.src="http://hackforums.net/jscripts/general.js?ver=1603";document.getElementsByTagName("HEAD")[0].appendChild(jslink);var jslink=window.document.createElement("script");jslink.type="text/javascript";jslink.src="http://hackforums.net/jscripts/popup_menu.js?ver=1600";document.getElementsByTagName("HEAD")[0].appendChild(jslink);var jslink=window.document.createElement("script");jslink.type="text/javascript";jslink.src="http://hackforums.net/jscripts/tabcontent.js";document.getElementsByTagName("HEAD")[0].appendChild(jslink)