// ==UserScript==
// @name    loadtimeTest2
// ==/UserScript==

var d = new Date().getTime();
console.log("Start time is: "+d);

function onLoadTime() {
	var d2 = new Date().getTime();
	console.log("End time is: "+d2);
        var difference = (d2-d)/1000;
	console.log("Current Loadtime is: "+difference);
}
window.onload = onLoadTime;