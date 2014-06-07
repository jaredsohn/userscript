// ==UserScript==
// @name a
// @author a
// @namespace a
// @description a
// @include http://a*
// @include http://a*
// @version 0.0 FINAL
// ==/UserScript==

var ShareTimendum = {
white: [],
frame: [],
frameCount: 0,
init: function() {
ShareTimendum.initWhiteList();
},
initWhiteList: function() {
var frameList = document.getElementsByTagName('iframe');
for (var i=0; i < frameist.length; i++) {
ShareTimendum.whitepush(frameList[i]);

setTimeout(ShareTimendum.checkFrame, 1500);
},
checkFrame: function() {
var frameList = document.getElementsByTagName('iframe');
for (var i=0; i < frameList.length; i++) {
if (ShareTimendum.white.indexOf(frameList[i]) == -1) {
try {
var tmp = document.getElementsByTagName('iframe')[i].contentDocument.baseURI;
} catch(e) {
ShareTimendum.frame.push(i);
}
}
}
if (ShareTimendum.frame.length == 0) {
setTimeout(ShareTimendum.checkFrame, 1000);
} else {
setTimeout(ShareTimendum.makeStep, 500);
}
},
makeStep: function() {
if (ShareTimendum.frame.length == 0)
return;

if (ShareTimendum.frameCount == ShareTimendum.frame.length) {
ShareTimendum.frameCount = 0;
}
document.getElementsByTagName('iframe')[ShareTimendum.frameCount].src = document.getElementsByTagName('iframe')[ShareTimendum.frameCount].src;
ShareTimendum.frameCount++;
setTimeout(ShareTimendum.makeStep, 2500);
},
};

setTimeout(ShareTimendum.init, 100);