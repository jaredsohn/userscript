// ==UserScript==
// @name	    hatena print
// @namespace      hatena print
// @include	 http://d.hatena.ne.jp/*
// ==/UserScript==

var bodyElement = document.getElementsByTagName("body")[0];

var begin = document.createElement("div");
var button = document.createElement("button");
var buttonText = document.createTextNode("print");
button.style.position = "fixed";
button.style.top = "0";
button.style.right = "0";

button.appendChild(buttonText);
begin.appendChild(button);
bodyElement.appendChild(button);

button.addEventListener('click', function() {

	var htmlElement = document.getElementsByTagName("html")[0];

	var daysList = new Object();
	var days = document.getElementById("days");
	var divNodes = days.getElementsByTagName("div");
	var bodyBox = document.createElement("body");

	for (var i = 0; i < divNodes.length; i++) {
		if(divNodes[i].className != "day") { continue; }
		daysList = divNodes[i].cloneNode(true);
		bodyBox.appendChild(daysList);
	}
	GM_addStyle(<><![CDATA[
	
		body {
			width: auto;
			text-align: left;
			margin: 0;
			padding: 0;
		}
		.day { page-break-after: always; } /* 記事ごとに印刷する場合 */
		.ad { display: none; }
	
	]]></>);

	htmlElement.appendChild(bodyBox);
	bodyElement.parentNode.removeChild(bodyElement);
	
}, false);