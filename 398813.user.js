// ==UserScript==
// @name       Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1

// @description  enter something useful
// @match      http://pan.baidu.com/*
// @copyright  2012+, You
// ==/UserScript==

function Unzip(spath,subpath,bdstoken){
  this.spath = spath;
  this.subpath = subpath;
  this.bdstoken = bdstoken;
  this.start = 0;
  if(rootDir) {
    unzipNum++
    this.list();
  }
}

function addAnimations() {
            var style = document.createElement('style');
            style.type = 'text/css';
    style.innerHTML = ".unzip-dialog {-webkit-animation-duration:0.002s;-webkit-animation-name:nodeInserted;}\
						@-webkit-keyframes nodeInserted {from {clip:rect(1px, auto, auto, auto);}to {clip:rect(0px, auto, auto, auto);}}";
    document.getElementsByTagName('head')[0].appendChild(style);
}
//var doc = document;
function animationsHandler(event) {
    if (event.animationName == "nodeInserted") {
        alert("aaaaaaaa");
        console.log("Another node has been inserted! ", event, event.target);
    }	
}
addAnimations();
document.addEventListener("webkitAnimationStart", animationsHandler, false);
