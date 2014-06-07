// ==UserScript==
// @name			Wimp.com Video Overlay Modified by but2002
// @namespace		#Cletus
// @description		When clicking on a video link on wimp.com, this will open the video in an overlay rather than redirect.
// @copyright		2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @license			(CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// @require			http://usocheckup.redirectme.net/118131.js
// @require			http://userscripts.org/scripts/source/87345.user.js
//
// @include			http://wimp.com/
// @include			http://*.wimp.com/
// @include			http://wimp.com/archives/*
// @include			http://*.wimp.com/archives/*
// @include			http://wimp.com/search/*
// @include			http://*.wimp.com/search/*
//
// @version			1.1.4
// ==/UserScript==

function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}




// Get all links, setup previous/next arrays, and add listeners.
var links = document.querySelectorAll('a.b');
var prevLinks = document.querySelectorAll('a.b'), prevTmp = [];
var nextLinks = document.querySelectorAll('a.b'), nextTmp = [];
for (var i = 0; i < links.length; i++) {
	prevTmp[i] = prevLinks[i];
	nextTmp[i] = nextLinks[i];
}
prevTmp.unshift(null);
nextTmp.shift();
prevLinks = prevTmp;
nextLinks = nextTmp;
for (var j = 0; j < links.length; j++) {
	links[j].setAttribute('data-wimp-video-overlay-index', j);
	if (getCookie(links[j].href)) {
		links[j].setAttribute('style', 'color: #800080');
		setCookie(links[j].href, 1, 730);
	}
	links[j].addEventListener('click', function (e) {
		e.preventDefault();
		showOverlay(this);
	}, false);
}

// Add theme override so that the video will fit.
devtools.dialog.defineTheme('videooverlay', '#devtools-wrapper .dialog {width: 570px !important;}', 'default');

// Display overlay for url. Redirects to video page if an error occurred.
function showOverlay(link) {
	var url = link.href;
	var description = link.textContent;
	var prevLinkElement = prevLinks[link.getAttribute('data-wimp-video-overlay-index')];
	var nextLinkElement = nextLinks[link.getAttribute('data-wimp-video-overlay-index')];
	link.setAttribute('style', 'color: #800080');
	setCookie(url, 1, 730);
	if (!url) {return false;}
	// Request page to grab the video info.
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(r) {
			var doc = parseHTML(r.responseText);
			var file = null;
			// Final location is on wimp.com, find file.
			if (doc.querySelector('a[href="http://www.wimp.com"][target="_self"]')) {
				file = doc.querySelector('#player + script');
				if (file) {
					file = /"file","(.*?)"/.exec(file.textContent);
					if (file) {
						file = file[1];
					}
				}
			}
			// Final location is on dump.com, find file.
			else if (doc.querySelector('a[title="Home"][href="http://www.dump.com"]')) {
				file = doc.querySelector('div[id*="player"] + p script');
				if (file) {
					file = /file: "(.*?)"/.exec(file.textContent);
					if (file) {
						file = file[1];
					}
				}
			}
			
			// File was found, show overlay.
			if (file) {
				// Setup buttons on the overlay.
				var btns = [];
				if (prevLinkElement) {
					btns.push({
						text: 'Previous',
						callback: function () {elementClick(prevLinkElement);},
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFESURBVHjaxJM9SwNBEIaf9QNMDgkoCGqqgHIExEa4yt8gCGqhjWUkhWnsrNJrF8HiED8KC8UmWIlgZaWCxZ2CgoiIpFCMngkXHYt4hxcvEUnhwLDsMu+zM7OzSkRoxlpo1sIyMEwrZ5iWGKaVa6QTkZ8AT3whIoZpyW+AtloxkMpO69iOfxYGWQHmAJSIoJTyxYuTOpeP1ajuDoi2B5VxDeY3bI5ndQVUM/DEC2M6p/fguNXgQvHn1aWu4N4rIbU8pXNwAw9O46Y70ZBndJ3ntcy2TV8EqMCr817X38ohgJO0kS7eXe+uHtroMaDiQsWlNwKDsdaAx7UgwG8ioCWz+fXO/sT4xMgAL+UP9s+vQssoPRW2zjKjM2GDpCWz+R3DtGTv1p+DoRpPAFrdQfoOGV462vzzJHoQoOdrbQhQ//4bPwcAlbi4VYBivEYAAAAASUVORK5CYII='
					});
				}
				if (nextLinkElement) {
					btns.push({
						text: 'Next',
						callback: function () {elementClick(nextLinkElement);},
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFOSURBVHjaxJM9SMNQFIW//qBIBCcXcdIlCJ3j5C4ObjoUBSdpdbGDW6cOgg46VXCIonRQUHRw0cFRV5cmg3ZRkVIs1ZA0Wsp1aOyfCQgdvHDgwXn3nHMv74VEhF4qTI8VBZjcN4P4LJAAdoFkO3G3pP4pQeKwcTHhiQWOkAXEB5gOZOLBItEfp50FlWe7k3Rq8FhunNNzKpkTM+FRyW4BHt4gXw6exXZhfVZl86JTpLkDxwXLCUbxHfJF2J5vjtOZoPoJtlMPTKD0RRgZgLVjk5rzcfBLYFSB6lCko8n6qvNq1QBQhyPs3ZhYL4WzfHpmlRVpCbiVUm7ririf83RsnMH+MEe3zeZFTTda6/aesgKMAbF2aLoh508imm7IRObyFFA03UDTDUQEEWkk8BQL3e5upZTbuCbu69y9A7+6T00tAynA9msGCP37b/weAIZwmSlIEvp9AAAAAElFTkSuQmCC'
					});
				}
				btns.push({
					text: 'Close',
					callback: function () {devtools.dialog.close('videooverlay');},
					icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADXSURBVHjaYvz//z8DJYCJgUJAsQEsyJydqakgCuYnRjS1cHH32bNxuuC/u6wsAwgjacAnjumFf0ZGDH///mVwkZKCKf4PYoPEQHKEwoBx98aNDP+BCv/8/s3gICoKxiA2SAwkh+41DBcA/ce4d8sWht+/fqFgkBhIDm8gIoNfQE1kRSMwJv4bMDEx/P75k4HNxASMQWyQGEiOkAH/tf/8ATuZ08yM4ejhw2AMYoPEQHLosYDhBW4LCzB9/MQJuJ9BNptBxRnOnEENdeS8QE5CYhz6mQkgwABTp285v4gwGwAAAABJRU5ErkJggg=='
				});
				
				// Show overlay.
				devtools.dialog.open({
					title: 'Video Overlay',
					message: '<input type="text" value="' + url + '" onclick="this.select();" readonly/><hr/>' + description + '<embed width="560" height="440" flashvars="width=560&amp;height=440&amp;autostart=true&amp;fullscreen=true&amp;file=' + file + '" allowfullscreen="true" quality="high" name="mediaplayer" src="/player/player.swf" type="application/x-shockwave-flash" style="width: 560px !important; height: 440px !important;">',
					theme: 'videooverlay',
					buttons: btns
				}, 'videooverlay');
				
				// Video has been displayed correctly.
				return true;
			}
			// File was not found or an unknown error occurred. Redirect.
			window.location.assign(url);
		}
	});
}

// Creates a document that can be queried with DOM methods.
// Made by sizzlemctwizzle (http://userscripts.org/users/27715)
function parseHTML(text) {
	var dt = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01 Transitional//EN', 'http://www.w3.org/TR/html4/loose.dtd'),
		doc = document.implementation.createDocument('', '', dt),
		html = doc.createElement('html'),
		head = doc.createElement('head'),
		body = doc.createElement('body');
	doc.appendChild(html);
	html.appendChild(head);
	body.innerHTML = text;
	html.appendChild(body);
	return doc;
}

// Simulates a click on an element.
// Made by JoeSimmons (http://userscripts.org/users/JoeSimmons)
function elementClick(e, type) {
	if (!e) {return;}
	if (typeof e == 'string') {
		e = document.getElementById(e);
	}
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type||'click'), true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	e.dispatchEvent(evObj);
}

