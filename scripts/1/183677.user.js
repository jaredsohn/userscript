// ==UserScript==
// @name Time from last click to page load
// @author Zbigniew Tomczak
// @namespace http://localhost/
// @version 2
// @grant none
// ==/UserScript==
 
all : {
if (!window.localStorage) {
console.log(" no local storage");
break all;
}
if (window.localStorage.timeFromLastClick) {
t = new Date().getTime() - window.localStorage.timeFromLastClick;
//console.log(t + " ms (time spend from last click to page load)");
document.body.innerHTML +=
'<div title="Time spend from last click to page load (client time/browser time)" '
+'style="position:absolute;width:135px;'
+'height:30px;border-width:1px;'
+'border-style:solid;border-color:grey;'
+'border-radius: 0 0 5px 5px;padding-left:5px;'
+'z-index:100;top:55px;left:1000px;font-size:10px;">'
+'From click to page load:<br/>'+t+' ms.</div>';
delete window.localStorage.timeFromLastClick;
}
 
if (document.onclick) {
var oldOnClick = document.onclick;
}
document.onclick = function() {
if (oldOnClick) {
oldOnClick();
}
window.localStorage.timeFromLastClick;
if (window.localStorage.timeFromLastClick) {
window.localStorage.timeFromLastClick = new Date().getTime();
} else {
window.localStorage.timeFromLastClick = new Date().getTime();
}
};
}