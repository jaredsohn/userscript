// ==UserScript==
// @name        digg - add mirrors
// @description Adds a link from any Digg page to its Urladex stock. -<edited from (http://userscripts.org/scripts/show/1807) By Zede>-
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==

// edited from (http://userscripts.org/scripts/show/1807) By Zede

var duggmirroricon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB%2FHNKOAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfWBRMAKCQ2oIuYAAAAB3RJTUUH1gUTACoSHi2f8wAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAADBQTFRFAAAAmZmZqKio1tbW2NjY29vb3d3d3t7e4uLi5eXl6enp7e3t9fX19vb2%2Bvr6%2F%2F%2F%2FWS1fFAAAAAF0Uk5TAEDm2GYAAABESURBVHjaY2BQUlJkYGDQ%2F%2F8xAUienpjAIKS%2Fs1CJQU5%2FuqEjg5ygoKAhg2x5iYsjg9Lvle2CDEy%2FZpSKMTD9bA8RAwC9gRArqhXXPwAAAABJRU5ErkJggg%3D%3D";
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

	//add Dex link
	anchor = document.createElement("a");
	anchor.href = node.href;
	anchor.host = "urladex.com/url/" + anchor.host;
	anchor.title = "Urladex";
	anchor.className = "sam_googleicon";
	background_middle.appendChild(anchor);

	// add a space so it wraps nicely
	node.parentNode.insertBefore(document.createTextNode(" "), node.nextSibling);
}

addGlobalStyle("a.sam_coralcacheicon, a.sam_duggmirroricon, a.sam_googleicon { padding-left: 15px; background: center no-repeat; }");
addGlobalStyle("a.sam_coralcacheicon { background-image: url(" + coralcacheicon + "); }");
addGlobalStyle("a.sam_duggmirroricon  { background-image: url(" + duggmirroricon + "); }");
addGlobalStyle("a.sam_googleicon     { background-image: url(" + googleicon + "); }");
addGlobalStyle("a.sam_coralcacheicon:hover, a.sam_duggmirroricon:hover, a.sam_googleicon:hover { opacity: 0.5; }");

addGlobalStyle("div.sam_container { margin-left: 1em; display:inline; white-space:nowrap; }");
addGlobalStyle("div.sam_backgroundimage_left, div.sam_backgroundimage_middle, div.sam_backgroundimage_right { display: inline; background-repeat: no-repeat; background-position: center; }");
addGlobalStyle("div.sam_backgroundimage_left { padding-left: 3px; background-image:url(" +  background_left + "); }");
addGlobalStyle("div.sam_backgroundimage_middle { background-image:url(" +  background_middle + "); background-repeat: repeat-x; }");
addGlobalStyle("div.sam_backgroundimage_right { padding-left: 3px; background-image:url(" +  background_right + "); }");


var xpath  = "//div[@class='news-body']/h3/a[@href]";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

if(result.snapshotLength == 1) addIcons ( result.snapshotItem ( i ), true, null );
else 
{
	for ( var i = 0; i < result.snapshotLength; i++ )
	{
		addIcons ( result.snapshotItem ( i ), true, i );
	}
}
