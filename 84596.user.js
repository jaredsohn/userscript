// ==UserScript==
// @name          Facebook GM Framework
// @namespace     sizzlemctwizzle
// @description	  A small library to make Facebook scripting easier
// @exclude       *
// ==/UserScript==

// This script calls your function "fbPageChanged" when the Facebook page changes

// Get the actual Facebook url
function realUrl() {
    return /^#!\/.*/.test(window.location.hash) ? 
           'http://'+window.location.host+window.location.hash.split('#!')[1] : 
           window.location.href;
}

// Reproduce Greasemonkey @include and @exclude
// both includes or excludes can be a string or an array of strings
// Obviously remove this function if you know how to write RegExp yourself
function GM_testUrl(includes, excludes) {
     var regTest = function(url) { 
       return new RegExp(url.replace(/(\/|\?|\.|\^|\,|\+)/g, "\\\$1").replace(/\*/g, ".*")).test(realUrl()); 
     }
     if (typeof excludes != "undefined") {
        if (typeof excludes == "string") excludes = [excludes];
        for (exclude in excludes) if (regTest(excludes[exclude])) return false;
     }
     if (typeof includes == "string") includes = [includes];
     for (include in includes) if (regTest(includes[include])) return true;
     return false;
}
        
// Watch for page changes
function process() {
    document.getElementById('content').removeEventListener('DOMNodeInserted', process, false);
    if (!document.getElementById(fbPageChangeMarker.id)) setTimeout(fbPageChanged, 0);
    createMarker();
    (document.getElementById('contentArea')||document.getElementById('content')).appendChild(fbPageChangeMarker);
    document.getElementById('content').addEventListener("DOMNodeInserted", process, false);
}

// Create a marker to see if the page has changed
var fbPageChangeMarker;
function createMarker() {
  fbPageChangeMarker = document.createElement('div');
  var str = '', 
      len = 5;
  ++len;
  while(--len) 
    str += String.fromCharCode(Math.floor(Math.random() * 75) + 48);
  str = 'fbPageChangeMarker_' + str;
  fbPageChangeMarker.id = str;
}

// Wait for the page to load before we start listening   
var checker=setInterval(function(){
    if(document.getElementById('contentArea')||document.getElementById('content')) {
        clearInterval(checker);
        process();
    }
}, 100);