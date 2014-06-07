// ==UserScript==
// @author		kamira
// @name        fix for can't use js
// @namespace   e-sim
// @version		1
// @include		http://e-sim.org/*
// @description    for can't use
// ==/UserScript==


function importScript(url){
    var tag = document.createElement("script");
    tag.type="text/javascript";
    tag.src = url;
    document.body.appendChild(tag);
}
function importCss(url){
    var tag = document.createElement("link");
    tag.type="text/css";
    tag.rel="stylesheet";
    tag.href = url;
    document.body.appendChild(tag);
}
window.onload = function(){
    // imports go here
    importScript("http://kamira.myweb.hinet.net/eworld/js/jquery.blockUI.js"); // example
    importScript("http://kamira.myweb.hinet.net/eworld/js/jquery.form.js"); // example
    importScript("http://kamira.myweb.hinet.net/eworld/js/jquery.topbar.js"); // example
    importScript("http://kamira.myweb.hinet.net/eworld/js/jquery.validate.js"); // example
    importScript("http://kamira.myweb.hinet.net/eworld/js/script.js"); // example
    importCss("http://kamira.myweb.hinet.net/eworld/css/style.css"); // example
};

