// ==UserScript==
// @name           Too long, didn't read.
// @namespace      http://userscript.org
// @description    Too long, didn't read.
// @include        http*://*what.cd/
// @include        http*://*what.cd/index.php
// @include        http*://*what.cd/#*
// @include        http*://*what.cd/index.php#*
// ==/UserScript==

var defaultSetting = "random"; // change this to whatever you like. (recent, random, top)



//don't modify below here unless you know what you're doing
function load_page_then(uri, then) {

	GM_xmlhttpRequest({

		method: "GET",

		url: uri,

		onload: then

	});

}
function capFirst (string) {
	return string[0].toUpperCase() + string.substr(1);
}

var classBox = document.getElementsByClassName("box")[5];
var divBox = document.createElement("div"); // whole post
divBox.className = "box";

var divHead = document.createElement("div"); // title
divHead.className = "head";
divHead.innerHTML = "Too Long; Didn't Read";

var divPad = document.createElement("div"); // content
divPad.className = "pad";

function getRecent() {

	// uncomment if you'd like the "recent", "random", "top" navigation to understrike which one you're on.
	/*if (this.parentNode) {
		var links = this.parentNode.getElementsByTagName("a");
		for (var e = 0; e < links.length-1; e++) {
			links[e].innerHTML = links[e].innerHTML.replace("<u>","");
		}
		this.innerHTML = "<u>"+this.innerHTML+"</u>";
	}*/
	load_page_then("http://www.toolongdidntread.info", function (response) {


		var HTML = response.responseText;

		var readTitle = "<span class=\"size4\"><strong>";
		readTitle += capFirst(HTML.split("<h4>")[1].split("\">")[1].split("</a></h4>")[0]);
		readTitle += "</strong></span>";

		var readAuthor = "by " + HTML.split("<h5>")[1].split("</h5>")[0];
		var readBody = capFirst(HTML.split("<p>")[1].split("</p>")[0]);

		divPad.innerHTML = readTitle + "<br />" + readAuthor + "<br /><br />" + readBody;

	});
}

function getRandom() {

	// uncomment if you'd like the "recent", "random", "top" navigation to understrike which one you're on.
	/*if (this.parentNode) {
		var links = this.parentNode.getElementsByTagName("a");
		for (var e = 0; e < links.length-1; e++) {
			links[e].innerHTML = links[e].innerHTML.replace("<u>","");
		}
		this.innerHTML = "<u>"+this.innerHTML+"</u>";
	}*/
	load_page_then("http://www.toolongdidntread.info/random", function (response) {
		var HTML = response.responseText;


		var readTitle = "<span class=\"size4\"><strong>";
		readTitle += capFirst(HTML.split("<h4>")[3].split("\">")[1].split("</a></h4>")[0]);
		readTitle += "</strong></span>";

		var readAuthor = "by " + HTML.split("<h5>")[2].split("</h5>")[0];
		var readBody = capFirst(HTML.split("<p>")[2].split("</p>")[0]);

		divPad.innerHTML = readTitle + "<br />" + readAuthor + "<br /><br />" + readBody;

	});
}



function getTop() {

	// uncomment if you'd like the "recent", "random", "top" navigation to understrike which one you're on.
	/*if (this.parentNode) {
		var links = this.parentNode.getElementsByTagName("a");
		for (var e = 0; e < links.length-1; e++) {
			links[e].innerHTML = links[e].innerHTML.replace("<u>","");
		}
		this.innerHTML = "<u>"+this.innerHTML+"</u>";
	}*/
	load_page_then("http://www.toolongdidntread.info/top", function (response) {


		var HTML = response.responseText;

		var readTitle = "<span class=\"size4\"><strong>";
		readTitle += capFirst(HTML.split("<h4>")[1].split("\">")[1].split("</a></h4>")[0]);
		readTitle += "</strong></span>";

		var readAuthor = "by " + HTML.split("<h5>")[1].split("</h5>")[0];
		var readBody = capFirst(HTML.split("<p>")[1].split("</p>")[0]);

		divPad.innerHTML = readTitle + "<br />" + readAuthor + "<br /><br />" + readBody;

	});
}

var aRecent = document.createElement("a"); // recent link
aRecent.href = "#switch";
aRecent.innerHTML = "Recent";
aRecent.addEventListener("click",getRecent,false);
divHead.appendChild(document.createTextNode(" - "));
divHead.appendChild(aRecent);

var aRandom = document.createElement("a"); // random link
aRandom.href = "#switch";
aRandom.innerHTML = "Random";
aRandom.addEventListener("click",getRandom,false);
divHead.appendChild(document.createTextNode(" - "));
divHead.appendChild(aRandom);

var aTop = document.createElement("a"); // top link
aTop.href = "#switch";
aTop.innerHTML = "Top";
aTop.addEventListener("click",getTop,false);
divHead.appendChild(document.createTextNode(" - "));
divHead.appendChild(aTop);

var aSubmit = document.createElement("a"); // submit link
aSubmit.href = "http://www.toolongdidntread.info/submit/";
aSubmit.innerHTML = "Submit";
divHead.appendChild(document.createTextNode(" ("));
divHead.appendChild(aSubmit);
divHead.appendChild(document.createTextNode(")"));


divBox.appendChild(divHead);
divBox.appendChild(divPad);
classBox.parentNode.insertBefore(divBox,classBox);

if (defaultSetting == "recent") {
	getRecent();
}
else if (defaultSetting == "random") {
	getRandom();
}
else if (defaultSetting == "top") {
	getTop();
}