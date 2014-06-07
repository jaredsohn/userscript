// ==UserScript==
// @name          English To Danish Google Search
// @version       1.7
// @include        http://www.google.*/search?*
// @include        http://www.google*/#*q=*
// ==/UserScript==

function main() {
	var language = isDanish() ? "da" : "en";

	var google = language == "da" ? "http://google.com/" : "http://google.dk/";
	var buttonName = language == "da" ? "Søg på Engelsk" : "Søg på Dansk";
	var parameters = getParameters(window.location.href);

	var fullPath = google + parameters;
	
	var container = document.createElement('span');
	container.innerHTML = " ";
	container.style.lineHeight = "30px";
	
	var dksearchbutton = document.createElement('input');
	dksearchbutton.setAttribute('type', 'button');
	dksearchbutton.setAttribute('value', buttonName);
	dksearchbutton.setAttribute('style', 'margin-left:0.25em;border-left:1px solid #999;');
	dksearchbutton.setAttribute('onclick', "location.href='" + fullPath + "'"); 
	dksearchbutton.setAttribute('class', 'lsb');
	
	container.appendChild(dksearchbutton); //pull container together
	
	var element = document.getElementsByName('btnG');
	var searchbutton = element.length > 1 ? element[0] : element;
	if(searchbutton.parentNode.tagName == "DIV")
	{
		searchbutton.parentNode.style.whiteSpace = "nowrap";
		searchbutton.setAttribute('style', 'white-space:nowrap;border-right:1px solid #999;');
	}
	else if(searchbutton.parentNode.tagName == "SPAN")
	{
		searchbutton.style.border-right = "1px solid #999";
	}
	searchbutton.parentNode.appendChild(container);
}
function getParameters(url) {
	var urlArray = url.split('/');
	return urlArray[urlArray.length - 1];
}
function isDanish() {
	var url = window.location.host;
	if(url.substring(url.length - 3) == ".dk")
		return true;
	else
		return false;
}
//script does not work if hl parameter is used
function hlExists() {
	var parameters = getParameters(window.location.href);
	if(parameters.match(/hl=.{2,5}&/) != null)
	{
		var newParameters = parameters.replace(/hl=.{2,5}&/, "")
		var language = isDanish() ? "http://google.dk/" : "http://google.com/";
		
		//window.location.reload();
		window.location.href = language + newParameters;
		return true;
	}
	else
	{
		return false;
	}
}

main();