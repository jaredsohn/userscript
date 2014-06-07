// ==UserScript==
// @name        digg - add mirrors
// @namespace   http://www.praytothemachine.com/evil/code/gm
// @description Adds links to DuggMirror (http://dugmirror.com/), DuggBack (http://www.duggback.com), Coral (http://www.coralcdn.org/), and the Google Cache (http://www.google.com/) to every link in the articles and comments
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==

// Big ups to Valentin Laube ( http://userscripts.org/scripts/show/921 )
// I stole most of it from him.

// DuggMirror link added by LouCypher (http://userscripts.org/people/12)
// DuggBack link added by coollettuce (http://openmindeddesign.com)

var duggmirroricon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB%2FHNKOAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfWBRMAKCQ2oIuYAAAAB3RJTUUH1gUTACoSHi2f8wAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAADBQTFRFAAAAmZmZqKio1tbW2NjY29vb3d3d3t7e4uLi5eXl6enp7e3t9fX19vb2%2Bvr6%2F%2F%2F%2FWS1fFAAAAAF0Uk5TAEDm2GYAAABESURBVHjaY2BQUlJkYGDQ%2F%2F8xAUienpjAIKS%2Fs1CJQU5%2FuqEjg5ygoKAhg2x5iYsjg9Lvle2CDEy%2FZpSKMTD9bA8RAwC9gRArqhXXPwAAAABJRU5ErkJggg%3D%3D";
var duggbackicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABPUlEQVR42j2PsU7CYBgA7//5i61NpUaUgg4OMrRGSePiI7CYuPkUjhDewsTVTRMd7dDd3ZDUxaExxsmEoAJOBpB+Dkanu/FOXRsj3yKgFPwRfh1QSmEg0d8iOM0mWycnUK0yA2bAchhSPz6m8DzmIhiUYi2O2T09pVyr8Xh+jlOpsN/pYAcBb3nObDLBiAivd3eU63WqcYwXhgStFgvg4eKC0fMzXqmEujRGZiIstGYlitg+OmI6GpEnCdPBAEdrbEj0X7DjeWyEIV/DIcqyWN/ZwbVt9O8aGhH8MOTw7IxGu81TmvKRZRx0u7R6PbTrIiJolMKPIuwg4ClNmQ4GjPt93rOM1b098H0KEdSVMVK4LmZzk/HLC0vzORowvo/VaPCZ57iLRaJujLmdi1AUBapU+m8SEQoRtNZYcP8DP4x3gFrOVxsAAAAASUVORK5CYII";
var coralcacheicon  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAgUlEQVQY042O0QnCQBQEZy0sFiEkVVxa8GxAuLOLgD3cVRKwAytYf05JkGgGFt7H8nZkG10UgBNwZE0F7j77JiIJGPlNFhGzgwOQd%2FQytrEJdjtbrs%2FORAqRZBvZBrQxby2nv5iHniqokquUgM%2FH8Hadh57HNG05rlMgFXDL0vE%2FL%2BEXVN83HSenAAAAAElFTkSuQmCC";
var googleicon      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAiklEQVQY02MUjfmmFxPFgAuIxnz7jwNcU9BngSjae%2FbDxJUPj1z%2BxMDAYKPLlx8u72wswMDAwASRnrjyIQMDw%2BoW3XfbbfPD5SFchOGCHof2nHmPaTgTpmuEPA8LeR6GsKHSNrp8E1c%2B3Hv2A8QKG10%2BiDjUaRD7Qmsuw51GlMcYnXcE4AqSyRn3Abz4culPbiCuAAAAAElFTkSuQmCC";
var background_left   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAOCAYAAADqtqZhAAAAZklEQVQI153OuwmAMBhF4ZOk%2BBuFgJbqCu7gBI6UWZzAEawcRC0VhNikCFj4wNpbna%2B7CqAbmxpw6o5BRKwGnIjYsqjQQJtlOcYYNECapAAXnv2GP%2FyLfttWYoxowIUQ9nmZUN%2BjJzhhGYq8ft%2BLAAAAAElFTkSuQmCC";
var background_middle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAOCAYAAADuQ3ZcAAAAHElEQVQI12NYdMzpP5O6mgYDEwMDAznEzVs3GADbhgXE7HIXAgAAAABJRU5ErkJggg%3D%3D";
var background_right  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAOCAYAAADqtqZhAAAAdklEQVQI153OIQ6DQBQA0elfsaYkJFtZegU8aoOr6wl6Fs6CqyonQOIQXAGQJWmymC82raAC3XHPDXVXPuuuzAEOj%2F76UdU34CU7X7DWpkAlxhicOwHcBCA5JgAIu%2F5GWMOGGCPL8gJoZJpHfjuVqGoD%2BHvRDl9lDiMntdjqogAAAABJRU5ErkJggg%3D%3D";

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addIcons(node, isComment, idx) {
	var anchor, container, background_left, background_middle, background_right;

	// add container
	container = document.createElement("div");
	container.className = "sam_container";
	node.parentNode.insertBefore(container, node.nextSibling);

	// add background
	background_left = document.createElement("div");
	background_left.className = "sam_backgroundimage_left";
	container.appendChild(background_left);

	background_middle = document.createElement("div");
	background_middle.className = "sam_backgroundimage_middle";
	container.appendChild(background_middle);

	background_right = document.createElement("div");
	background_right.className = "sam_backgroundimage_right";
	container.appendChild(background_right);

	//add duggmirror cache link
	anchor = document.createElement("a");
	anchor.target = "_blank";
	anchor.href = idx == null ? location.href : document.getElementById("diggs" + idx).href;
	anchor.href = anchor.href.replace(/digg\.com/, "duggmirror.com");
	anchor.title = "DuggMirror";
	anchor.className = "sam_duggmirroricon";
	background_middle.appendChild(anchor);

	//add duggback cache link
	anchor = document.createElement("a");
	anchor.target = "_blank";
	anchor.href = idx == null ? location.href : document.getElementById("diggs" + idx).href;
	anchor.href = anchor.href.replace(/digg\.com/, "duggback.com");
	anchor.title = "DuggBack";
	anchor.className = "sam_duggbackicon";
	background_middle.appendChild(anchor);

	//add coral cache link
	anchor = document.createElement("a");
	anchor.target = "_blank";
	anchor.href = node.href;
	anchor.host += ".nyud.net:8080";
	anchor.title = "Coral - The NYU Distribution Network";
	anchor.className = "sam_coralcacheicon";
	background_middle.appendChild(anchor);

	//add google cache link
	anchor = document.createElement("a");
	anchor.target = "_blank";
	anchor.href = "http://www.google.com/search?q=cache:" + node.href;
	anchor.title = "Google Cache";
	anchor.className = "sam_googleicon";
	background_middle.appendChild(anchor);

	// add a space so it wraps nicely
	node.parentNode.insertBefore(document.createTextNode(" "), node.nextSibling);
}

addGlobalStyle("a.sam_coralcacheicon, a.sam_duggmirroricon, a.sam_duggbackicon, a.sam_googleicon { padding-left: 15px; background: center no-repeat; }");
addGlobalStyle("a.sam_coralcacheicon { background-image: url(" + coralcacheicon + "); }");
addGlobalStyle("a.sam_duggmirroricon  { background-image: url(" + duggmirroricon + "); }");
addGlobalStyle("a.sam_duggbackicon  { background-image: url(" + duggbackicon + "); }");
addGlobalStyle("a.sam_googleicon     { background-image: url(" + googleicon + "); }");
addGlobalStyle("a.sam_coralcacheicon:hover, a.sam_duggmirroricon:hover, a.sam_duggbackicon:hover, a.sam_googleicon:hover { opacity: 0.5; }");

addGlobalStyle("div.sam_container { margin-left: 1em; display:inline; white-space:nowrap; }");
addGlobalStyle("div.sam_backgroundimage_left, div.sam_backgroundimage_middle, div.sam_backgroundimage_right { display: inline; background-repeat: no-repeat; background-position: center; }");
addGlobalStyle("div.sam_backgroundimage_left { padding-bottom: 0px; padding-left: 3px; background-image:url(" +  background_left + "); }");
addGlobalStyle("div.sam_backgroundimage_middle { padding-bottom: 0px; background-image:url(" +  background_middle + "); background-repeat: repeat-x; }");
addGlobalStyle("div.sam_backgroundimage_right { padding-bottom: 0px; padding-left: 3px; background-image:url(" +  background_right + "); }");


var xpath  = "//div[@class='news-body']/h3/a[@href][1]";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

if(result.snapshotLength == 1) addIcons ( result.snapshotItem ( i ), true, null );
else 
{
	for ( var i = 0; i < result.snapshotLength; i++ )
	{
		addIcons ( result.snapshotItem ( i ), true, i );
	}
}

