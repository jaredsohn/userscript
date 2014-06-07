// ==UserScript==
// @name           View Trope Source
// @namespace      http://tvtropes.org/pmwiki/pmwiki.php/Main/Fleb
// @description    Adds view-source link to tropes
// @include        http://tvtropes.org/pmwiki/pmwiki.php/*
// @include        http://tvtropes.org/
// @exclude        http://tvtropes.org/pmwiki/pmwiki.php/*?action=edit
// ==/UserScript==

function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }

var url = window.location.href.split('/');
var wikiBase = "http://tvtropes.org/pmwiki/pmwiki.php/";
var interfix = "/";
var sourceSuffix = "?action=source";
var sourceLabel = "view source";

var namespace = "Main";
var article = "HomePage";
if (window.location.href != "http://tvtropes.org/") {
	namespace = url[5];
	article = url[6].split('?')[0];
	}
if (namespace == "MAin") // fix nigh-viral namespace typo
	namespace = capitalize(namespace);


var sourcelink = document.createElement('a');
sourcelink.href = wikiBase+namespace+interfix+article+sourceSuffix;
sourcelink.textContent = sourceLabel;
// don't need this; there's a <br/> tag in place already
//sourcelink.style.paddingLeft = "3em";

// make it look nice
var innerlink = sourcelink;
sourcelink = document.createElement('div');
sourcelink.className = "buttonframe";
var sButtonInt = document.createElement('div');
sButtonInt.className="buttoninterior";

sButtonInt.appendChild(innerlink);
sourcelink.appendChild(sButtonInt);

// table cell wrapper:
var tdCell = document.createElement('td');

var loc;
///// location choices:
//// highly prominent, by-itself location:
// loc = document.getElementById("wikicmds").getElementsByTagName('center')[0];
//// Shoehorn with watchlist-related things:
// loc = (document.getElementById('watchmsg'));
//// Squeeze into highly populated toolbar:
loc = document.getElementById("wikicmds").getElementsByClassName('buttonframe')[0].parentNode.parentNode.appendChild(tdCell);

loc.appendChild(sourcelink);

