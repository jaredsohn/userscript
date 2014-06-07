// ==UserScript==
// @name Sky Scraper on SkyDrive
// @description Adds a SkyScraper permalink on each Skydrive file page
// @include *skydrive.live.com*
// @require   http://usocheckup.dune.net/77852.js
// @version 0.1
// ==/UserScript==

// Start the insertAfter function
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastchild == targetElement) {
		parent.appendChild(newElement);
		} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}
// End insertAfter function.


var api = "http://www.timacheson.com/SkyDrive/DirectLinkRedirect?pageUrl=";
var ddLink = window.location.href;

var cleanLink = ddLink.replace(/\^/g, "%5E");
var scraperLink = document.createElement("a");
	scraperLink.setAttribute("href", api+cleanLink);
	scraperLink.innerHTML = "SkyScraper";
	scraperLink.style.color = "red";
var scraperLi = document.createElement("li");
scraperLi.appendChild(scraperLink);

var shareEl = document.getElementById("embed");
var parentShare = shareEl.parentNode;
insertAfter(scraperLi, parentShare);
