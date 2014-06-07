// ==UserScript==
// @name        titulky.com - odstraneni upozorneni o AdBlocku
// @namespace   monnef.tk
// @description odstraneni upozorneni o AdBlocku
// @include     http://*.titulky.com/*
// @version     1
// @grant       unsafeWindow
// @run-at      document-start
// @author      moen
// ==/UserScript==

if ('loading' != document.readyState) {
  alert("Alert suppressor for titulky.com isn't running at 'loading' state, but at '"+document.readyState+"'! It won't work... Possible reason might be a script engine not supporting \"@run-at\" metablock.");
}

var oldAlert = unsafeWindow.alert; 
unsafeWindow.alert = function(a){
  if(a.toLowerCase().indexOf("adblock") != -1){
    console.log("anti-adblock alert spam detected, suppressing. text was: \""+a+"\".");
  }else{
    // pass other alerts
    oldAlert(a);
  }
};
