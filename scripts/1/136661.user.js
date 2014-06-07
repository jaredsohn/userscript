// ==UserScript==
// @name        Mass Effect Forum Manifester
// @namespace   creakazoidbsn
// @description Utility script for BioWare Mass Effect 3 forums enabling quick-access to the multiplayer manifests of all forum users.
// @include     http://social.bioware.com/forum/*
// @require     http://userscripts.org/scripts/source/56489.user.js
// @resource	manifestStyle https://dl.dropbox.com/u/51901387/bsnhoverstyle.css
// @version     1.4d
// ==/UserScript==

var SEARCH_STRING = ">Multiplayer Manifest<";
var URL_BASE = "http://social.bioware.com";
var PORTRAIT_ID = "sidebar_portrait_wrapper";
var ATTR_HOVER_TITLE = "data-hovertitle";
var CLASS_HOVER = "hoverable";
var TOKEN = "href=\"";
var TOKEN_PC = "3_pc";
var TOKEN_XBOX = "3_xbox";
var TOKEN_PS = "3_ps3";
var PLATFORM_PC = "PC";
var PLATFORM_XBOX = "Xbox";
var PLATFORM_PS = "PS3";

var cache = {};

GM_addStyle(GM_getResourceText("manifestStyle"));
linkifyPortrait();

if(document.location.href.indexOf("/topic/") !== -1)
	processAll();

function processAll(){
	var userElements = document.getElementsByClassName("avatar");

	if (userElements != null) {
		var tempElement;
		var tempEntry;

		for (var i = 0; i < userElements.length; i++) {
			tempElement = userElements[i].firstChild;
			tempEntry = cache[tempElement.href];

			if (!tempEntry){
				cache[tempElement.href] = new Entry(tempElement.href, tempElement);
			}
			else{
				tempEntry.elements.push(tempElement);
			}
		}

		for (var key in cache) {
			getUserInfo(cache[key]);
		}
	}
}

function linkifyPortrait(){
	var div = document.getElementById(PORTRAIT_ID);
	
	if(div){
		var link = div.getElementsByTagName("a")[0];		
		var entry = new Entry(link.href, link);
		getUserInfo(entry, false);
	}
}

function Entry(userPage, element) {
    this.userPage = userPage;
    this.elements = [element];
}

Entry.prototype.element = function(){
	return this.elements[0];
}

function getUserInfo(entry, showHover) {
	var doHover = typeof showHover === "undefined" ? true : showHover;
	
    GM_xmlhttpRequest({
        method: "GET",
        url: entry.userPage,
        onload: function (response) {
            var manifests = findManifestURLs(response.responseText, entry.elements);
			
			if(manifests.length > 1){
				var count = manifests.length;
				
				manifests.forEach(function(manifest){
					loadManifest(manifest, function(){
						count--;
						
						if(count === 0)
							displayLinks(manifests, manifest.elements, doHover);
					});
				});
			}
			else if(manifests.length === 1)
				displayLinks(manifests, manifests[0].elements, doHover);
			else
				displayLinks([], entry.elements, doHover);
        }
    });
}

function findManifestURLs(page, elements) {
    var start = 0;
    var substrate = page;
    var matches = [];

    matches = page.match(/href="([^"]*)(?=">Multiplayer)/g);

    if(matches) {
        for (var i = 0; i < matches.length; i++) {
            matches[i] = new ManifestInstance(URL_BASE + matches[i].substring(TOKEN.length, matches[i].length));
			matches[i].elements = elements;
        }
    }
	else
		matches = [];

    return matches;
}

function displayLinks(manifests, elements, doHover) {	
    if (manifests && manifests.length > 0) {
		var high = null;
		
        manifests.forEach(function(manifest){
			if(!high || manifest.count >= high.count)
				high = manifest;
        });
		
		elements.forEach(function(element){
			element.href = high.url;
			element.setAttribute(ATTR_HOVER_TITLE, "View Multiplayer Manifest (" + high.platform + ")");
		});	
    } 
	else{
		elements.forEach(function(element){
			element.setAttribute(ATTR_HOVER_TITLE, "Private Profile" );
		});
	}
	
	elements.forEach(function(element){
		if(doHover){
			element.className += " " + CLASS_HOVER;
			element.parentElement.style.overflow = "visible";
			element.firstChild.title = "";
		}
		else
			element.firstChild.title = element.getAttribute(ATTR_HOVER_TITLE);
	});
}

function ManifestInstance(url, callback){
	this.url = url;
	this.platform = getPlatform(url);
	this.count = 0;
	this.elements = [];
	
	if(callback)
		loadManifest(this, callback);
}

function getPlatform(url){
	if(url.indexOf(TOKEN_PC) !== -1)
		return PLATFORM_PC;
	else if(url.indexOf(TOKEN_XBOX) !== -1)
		return PLATFORM_XBOX;
	else
		return PLATFORM_PS;
}

/* function loadManifest(manifest, callback) {
	HttpRequest.open({
		"method":"get",
		"url":manifest.url,
		"onsuccess":function(params)
		{
			var doc = params.response.xml;
			manifest.count = doc.getElementsByClassName("card").length;
			
			if(callback)
				callback(manifest);
		}
	}).send();
} */

function loadManifest(manifest, callback) {
    GM_xmlhttpRequest({
        method: "GET",
        url: manifest.url,
        onload: function (response) {
			var cards = response.responseText.match("card");
			
			if(cards)
				manifest.count = cards.length;
			if(callback)
				callback(manifest);
			
        }
    });
}