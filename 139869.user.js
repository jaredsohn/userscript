// ==UserScript==
// @name Gmail + Google+ + Google* with Segoe UI (Font used in Windows 7/8/Metro/Hotmail)
// @description Change the default font in GMail from Arial to Segoe UI
// @namespace http://www.greasespot.net/
// @include https://mail.google.com/*
// @include https://apis.google.com/*
// @include https://plus.google.com/*
// @include http://plus.google.com/*
// @include http://mail.google.com/*
// @include http://talkgadget.google.com/*
// @include https://talkgadget.google.com/*
// @include https://www.google.com/*
// @include http://www.google.com/*
// @include https://*.google.com/*
// @include http://*.google.com/*
// @updateURL      https://userscripts.org/scripts/source/139869.meta.js
// @downloadURL    https://userscripts.org/scripts/source/139869.user.js
// @version         1.1
// ==/UserScript==


var css =  " * {font-family:\"Segoe UI\",\"Segoe UI\" !important;}" + 
           ".iY {background: none repeat scroll 0% 0% rgba(243, 243, 243, 0.85) !important}" +
           ".iY {background: none repeat scroll 0% 0% rgba(243, 243, 243, 0.85) !important}" +
           ".xY {padding-top: 10px !important; padding-bottom: 10px !important;}" +
           ".TC {padding-top: 10px !important; padding-bottom: 10px !important;}" +
           ".xY {font-size: 90.5% !important;}" +
           ".nM {font-size: 90% !important;}" +
           ".yo {font-size: 90% !important;}" +
           ".py {font-size: 90% !important;}" +
           ".v .fY {margin-right: 32px !important;}" +
           ".v .fY {background: none repeat scroll 0% 0% rgba(205, 205, 205, 0.2) !important;}" +
           ".v .fZ {background: none repeat scroll 0% 0% rgba(205, 205, 205, 0.4) !important;}" +
           ".v .f1 {background: none repeat scroll 0% 0% rgba(205, 205, 205, 0.0) !important;}" +
           ".r4 {background-color: rgba(255, 255, 255, 0.0) !important;}" +
           ".mq {padding: 5px 0px !important}" +
           ".mq {margin-top: 0px !important}" +
           ".mq {margin-bottom: 0px !important}" +
           ".alO {background-color: rgba(255, 255, 255, 0.0) !important;}"+
           ".xY.a-f-e {padding-top: 0px !important; padding-bottom: 0px !important;}" +
           ".bOa {font-size: 90% !important;}";
GM_addStyle(css);
