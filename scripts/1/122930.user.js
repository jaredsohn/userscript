// ==UserScript==
// @name       Douban.FM Cleaner
// @namespace  lastr2d2
// @version    3.1
// @description  Keep the page simple. (douban.fm)
// @include    http://douban.fm/*
// @author     Wayne Wang(lastr2d2(at)gmail.com) 
// ==/UserScript==
(function(){var e=function(){};e.prototype.addGlobalCSSRules=function(e){var t,n;t=document.getElementsByTagName("head")[0];if(!t)return;n=document.createElement("style");n.type="text/css";n.innerHTML=e;t.appendChild(n)};e.prototype.Main=function(){var e,t;e=["#fm-footer","#fm-sharing","#user_info","#fm-section-app-entry","iframe","#fm-rotate-ad",".chl_section",".fm-user-login i",".fm-user-login a:not(.lnk-login)"];t=e.join()+"{display:none !important;}";t+=".fm-user-login{width:auto !important;}";this.addGlobalCSSRules(t)};var t=new e;t.Main()})()
