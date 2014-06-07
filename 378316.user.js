// ==UserScript==
// @id             ESBS@eight04
// @name           Elsword Skiill Build Saver
// @version        1.0
// @namespace      eight04.blogspot.com
// @author         eight
// @description    
// @include        http://kaedebosi.web.fc2.com/elsword/*
// @run-at         document-end
// @require				 https://github.com/niklasvh/html2canvas/releases/download/0.4.1/html2canvas.js
// ==/UserScript==

/*
var s = document.createElement("script");
var init = function ESBS (e){
	alert(html2canvas);
}
s.addEventListener("load",init,false);
s.setAttribute("src","https://github.com/niklasvh/html2canvas/releases/download/0.4.1/html2canvas.js");
var d = document.getElementsByTagName("head")[0];
d.appendChild(s);
*/

var b = document.querySelector("#LVTb td");
var button = document.createElement("button");
button.innerHTML = "存成圖片";
button.onclick = function () {
	var j = document.querySelector("#job_main");
	var e = document.querySelector("#job_main > table")

	var oHeight=j.style.height;
	j.style.height = "";
	
	html2canvas(e, {
		onrendered: function (canvas){
			j.style.height = oHeight;
			var s = canvas.toDataURL();
			window.open(s);
		},
		background: "#fff"
	});
}
b.appendChild(button);

