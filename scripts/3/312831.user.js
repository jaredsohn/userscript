// ==UserScript==
// @name        smotriAutocomplete
// @namespace      http://userscripts.org/scripts/show/312831
// @description smotri.com autocomplete on
// @version  1.0.1
// @author   Max Max
// @license  MIT
// @include  http://http://smotri.com  
// @match    http://http://smotri.com  
// @include  http://http://smotri.com/
// @match    http://http://smotri.com/
// @include  http://http://smotri.com/*
// @match    http://http://smotri.com/*
// @include  http://*.com
// @match    http://*.com 
// @include  http://*.com/
// @match    http://*.com/ 
// @include  http://*.com/*
// @match    http://*.com/* 
// @include  http://*.ru
// @match    http://*.ru 
// @include  http://*.ru/
// @match    http://*.ru/ 
// @include  http://*.ru/*
// @match    http://*.ru/* 
// @include  http://*.su
// @match    http://*.su 
// @include  http://*.su/
// @match    http://*.su/ 
// @include  http://*.su/*
// @match    http://*.su/* 
// @include  http://*.net
// @match    http://*.net 
// @include  http://*.net/
// @match    http://*.net/ 
// @include  http://*.net/*
// @match    http://*.net/* 
// @include  http://*.tv
// @match    http://*.tv 
// @include  http://*.tv/
// @match    http://*.tv/ 
// @include  http://*.tv/*
// @match    http://*.tv/* 
// @include  http://*.open.az
// @match    http://*.open.az 
// @include  http://*.open.az/
// @match    http://*.open.az/ 
// @include  http://*.open.az/*
// @match    http://*.open.az/* 
// @icon     http://img28.imageshack.us/img28/2139/sk5d.png
// ==/UserScript==

if (window.self != window.top) return; if (document.getElementById('UserInbox')) return; if (!document.getElementById('userLogin')) return; if (!document.getElementById('userPassword')) return; if (!document.getElementById('rememberLogin')) return; function setOn(){var a=document.getElementById("userLogin"),c=document.getElementById("userPassword"),b=document.getElementById("rememberLogin");a.autocomplete="on";c.autocomplete="on";click(b);show_note("AUTOCOMPLETE ON!");}function click(b){var a=document.createEvent("MouseEvents");a.initMouseEvent("click",true,true,window,0,1,1,1,1,false,false,false,false,0,null);b.dispatchEvent(a);}function show_note(e){if(!e){return;}var d,b="",a="",c;d=document.getElementById("note");if(d){d.parentNode.removeChild(d);}d=document.createElement("div");c="data:image/gif;base64,R0lGODlhEAAQAJEDAICAgKCgpP///wAAACH5BAEAAAMALAAAAAAQABAAAAIvnI+py70AI3yi2goUEOH2nGxc1QkgInKlqVnBeh5iWcbGto72kF6sJok4hsSiogAAOw==";b="position: absolute;z-index: 6001;top: 0;left: 0;right: 0;background: #fde073;text-align: center;font-weight: bold;color:#666;line-height: 2.5;overflow: hidden;—moz—opacity:0.9; —khtml—opacity: 0.9; -webkit-opacity: 0.9; opacity: 0.9;-webkit-box-shadow: 0 0 5px black; -moz-box-shadow: 0 0 5px black; box-shadow: 0 0 5px black;";a="position: absolute;right: 10px;top: 9px;text-indent: -9999px;background: url("+c+");height: 16px;width: 16px;cursor: pointer;";d.setAttribute("id","note");d.setAttribute("style",b);d.innerHTML=""+e+' <a id="close" style="'+a+'">[закрыть]</a>';document.body.insertBefore(d,document.body.firstChild);close=document.getElementById("close");close.addEventListener("click",function(){d=document.getElementById("note");if(d){d.parentNode.removeChild(d);}},false);}if(document.getElementById("userLogin")){setOn();}