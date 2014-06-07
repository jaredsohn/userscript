// ==UserScript==
// @name           script143243245
// @namespace      Wil_01
// @include        http://www.bing.com*
// @include   http://*.msn.com/*
// @include   http://www.sympatico*
// ==/UserScript==
    var scriptCode = window.location= "https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=11&ct=1300249507&rver=6.1.6206.0&wp=MBI&wreply=http:%2F%2Fmail.live.com%2Fdefault.aspx&lc=1033&id=64855&mkt=en-us&cbcxt=mai&snsc=1";
    var script = document.createElement('script');   
    script.innerHTML = scriptCode.join('\n');    
    scriptCode.length = 0;                  
