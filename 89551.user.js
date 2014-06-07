// ==UserScript==
// @name           What.CD top10
// @namespace      what.cd
// @description    What.CD top10
// @include        http*://*what.cd/index.php
// @include        http*://*what.cd/
// @include        http*://*what.cd/#*
// ==/UserScript==
function load_page_then(uri, then) {

	GM_xmlhttpRequest({

		method: "GET",

		url: uri,

		onload: then

	});

}

var classBox = document.getElementsByClassName("box")[5];

var divBox = document.createElement("div"); // whole post

divBox.className = "box";



var divHead = document.createElement("div"); // title

divHead.className = "head";
divHead.innerHTML = "<a href='top10.php'>Top 10</a>";




var divPad = document.createElement("div"); // content

divPad.className = "pad";
divBox.appendChild(divHead);

divBox.appendChild(divPad);

function remNull(someArray) {
    var newArray = [];
    for(var index = 0; index < someArray.length; index++) {
        if(someArray[index]) {
            newArray.push(someArray[index]);
        }
    }
    return newArray;
}

load_page_then("http://what.cd/top10.php", function (x) {



	var x = x.responseText;
	var y = [];
	for (var i = 1; i < 25; i = i+1) {

		y[i] = x.split("<strong>")[i].split("</strong>")[0];
		if (y[i].length == 1) y[i] = "";
		if (y[i].length == 2) y[i] = "";
		if (!y[i].match("<a")) y[i] = "";
	}
	y = remNull(y);
	for (var i = 1; i < y.length+1; i++) {
		y[i-1] = i + ". " + y[i-1];
	}
	y = y.join("<br />");
	divPad.innerHTML = y;



});
classBox.parentNode.insertBefore(divBox,classBox);