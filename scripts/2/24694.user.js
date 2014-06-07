// ==UserScript==
// @name          Google Reader Smaller SideBar
// @namespace     http://grss.steneteg.se
// @description	  This creates a smaller sidebar for Google Reader.
// @author        Peter Steneteg
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// @include       http://reader.google.com/reader/*
// @include       https://reader.google.com/reader/*
// ==/UserScript==

const DEBUG = true;


function debug() {
  if (DEBUG && console) {
    console.log.apply(this, arguments);
  }
}


function addGlobalStyle(css) { 
    var head, style; 
    head = document.getElementsByTagName('head')[0]; 
    if (!head) { return; } 
    style = document.createElement('style'); 
    style.type = 'text/css'; 
    style.innerHTML = css; 
    head.appendChild(style); 
} 
addGlobalStyle('#sub-tree { width: 195px ! important; }');
addGlobalStyle('#nav { width: 200px ! important; }');
addGlobalStyle('#chrome { margin-left: 222px ! important; } '); 
addGlobalStyle('#search { left: 222px ! important; } ');

var as = document.getElementById("add-subs");	
as.innerHTML="+";