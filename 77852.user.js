// ==UserScript==
// @name Permalink on SkyDrive
// @description Adds a permalink on each Skydrive file page
// @include *skydrive.live.com*
// @include *office.live.com*
// @exclude *office.live.com/browse.aspx*
// @require   http://usocheckup.dune.net/77852.js
// @version 0.3
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

var ddLink = window.location.href;
var cleanLink = ddLink.replace(/\^/g, "%5E").replace(/ /g, "%20");
var scraperLink = document.createElement("a");
	scraperLink.setAttribute("href", "http://www.timacheson.com/SkyDrive/DirectLinkRedirect?pageUrl="+cleanLink);
	scraperLink.innerHTML = "Permalink";
	scraperLink.style.color = "red";
var scraperLi = document.createElement("li").appendChild(scraperLink);
insertAfter(scraperLi, document.getElementById("rename").parentNode);