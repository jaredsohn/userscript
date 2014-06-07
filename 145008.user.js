// ==UserScript==
// @name Bugu CNTV ActiveX patch
// @namespace http://code.google.com/p/np-activex
// @description Patcher for Bugu CNTV ActiveX controls
// @match *://*.cntv.cn/*live*
// @run-at document-start
// ==/UserScript==


var code = " delete navigator.appName; navigator.appName='Microsoft Internet Explorer'; delete navigator.appVersion; navigator.appVersion = '5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)'; delete navigator.userAgent; navigator.userAgent = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)'; function __bugupatch() { if (typeof cntv != 'undefined') { cntv.player.util.getPlayerCore = function(orig) { return function() { var ret = orig(); if (arguments.callee.caller.toString().indexOf('GetPlayerControl') != -1) { return { GetVersion: ret.GetVersion, GetPlayerControl: ret.GetPlayerControl() }; } else { return ret; }; } }(cntv.player.util.getPlayerCore); console.log('buguplayer patched'); window.removeEventListener('beforeload', __bugupatch, true); } } window.addEventListener('beforeload', __bugupatch, true);";

var scr = document.createElement("script");
scr.innerHTML = code;
document.documentElement.appendChild(scr);