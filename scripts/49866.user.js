// ==UserScript==
// @name           Google Classic
// @namespace      google.com*
// @description    Converts Google to Google Classic
// @include        http://www.google.com/*
// @include        http://google.com/*
// ==/UserScript==
if(!window.location.href.match("&btnG")){
	if(document.getElementsByTagName("img").length > 0){
		document.getElementsByTagName("img")[0].src = "http://img42.imageshack.us/img42/2681/logoptd.png";
		document.getElementsByTagName("img")[0].width = "246";
		document.getElementsByTagName("img")[0].height = "73";
	}
	var links = document.getElementById("gbar").getElementsByTagName("a");
	document.getElementById("lgpd").parentNode.appendChild(document.createElement("div"));
	var linkContainer = document.getElementById("lgpd").parentNode.lastChild;
	linkContainer.appendChild(document.createElement("ul"));
	linkContainer = linkContainer.firstChild;
	for(i=0;i<6;i++){
		linkContainer.appendChild(document.createElement("li"));
		linkContainer.lastChild.appendChild(links[0]);
	}
	linkContainer.className = "linkContainer";
	var searchBox;
	var inputs = document.getElementsByTagName("input");
	for(i=0;i<inputs.length;i++){
		if(inputs[i].title=="Google Search"){
			/*inputs[i].style.backgroundImage = "url(http://img132.imageshack.us/img132/9529/oldpaper3.jpg)";
			inputs[i].style.backgroundPosition = "center center";
			inputs[i].style.backgroundAttachment = "fixed";*/
			inputs[i].style.border = "1px none #101e0f";
			searchBox = inputs[i];		inputs[i].parentNode.insertBefore(document.createElement("div"),inputs[i]);
			inputs[i].previousSibling.appendChild(inputs[i]);
			inputs[i].parentNode.id="searchBorder";
			inputs[i].parentNode.style.backgroundImage = "url(http://img32.imageshack.us/img32/9739/inputbottom.png)";
			inputs[i].parentNode.parentNode.previousSibling.innerHTML = "Query:";
		}/*else if(inputs[i].name=="btnI"){
			inputs[i].style.backgroundImage = "url(http://img132.imageshack.us/img132/9529/oldpaper3.jpg)";
			inputs[i].style.backgroundPosition = "center center";
			inputs[i].style.backgroundAttachment = "fixed";
		}*/
	}
	linkContainer.parentNode.appendChild(document.createElement("div"));
	var disclaimer = linkContainer.parentNode.lastChild;
	disclaimer.appendChild(document.createElement("div"));
	disclaimer.firstChild.appendChild(document.createTextNode("Send your query to: Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States"));
	disclaimer.appendChild(document.createElement("div"));
	disclaimer.lastChild.appendChild(document.createTextNode("PLEASE ALLOW 30 DAYS FOR SEARCH RESULTS"));
	disclaimer.id = "disclaimer";
	searchBox.focus();
}