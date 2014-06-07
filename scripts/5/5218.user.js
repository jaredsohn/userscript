// ==UserScript==
// @name        Woot - Add Froogle Search.
// @namespace   http://www.eagadtech.net/
// @description Adds link to Froogle Search for the active woot.
// @include     http://woot.com/*
// @include     http://*.woot.com/*
// ==/UserScript==

var googleicon        = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAiklEQVQY02MUjfmmFxPFgAuIxnz7jwNcU9BngSjae%2FbDxJUPj1z%2BxMDAYKPLlx8u72wswMDAwASRnrjyIQMDw%2BoW3XfbbfPD5SFchOGCHof2nHmPaTgTpmuEPA8LeR6GsKHSNrp8E1c%2B3Hv2A8QKG10%2BiDjUaRD7Qmsuw51GlMcYnXcE4AqSyRn3Abz4culPbiCuAAAAAElFTkSuQmCC";
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

function addIcons(node) {
	var anchor, container, background_left, background_middle, background_right;

	// add container
	container = document.createElement("div");
	container.className = "wfs_container";
	node.parentNode.insertBefore(container, node.nextSibling);

	// add background
	background_left = document.createElement("div");
	background_left.className = "wfs_backgroundimage_left";
	container.appendChild(background_left);

	background_middle = document.createElement("div");
	background_middle.className = "wfs_backgroundimage_middle";
	container.appendChild(background_middle);

	background_right = document.createElement("div");
	background_right.className = "wfs_backgroundimage_right";
	container.appendChild(background_right);

	temp = node.innerHTML.replace(/ /g, "+");

	//add google cache link
	anchor = document.createElement("a");
	anchor.href = "http://froogle.google.com/froogle?q=" + temp;
	anchor.target = "NewFrame";
	anchor.title = "Froogle Search";
	anchor.className = "wfs_googleicon";
	background_middle.appendChild(anchor);
	
	// add a space so it wraps nicely
	node.parentNode.insertBefore(document.createTextNode(" "), node.nextSibling);
}

addGlobalStyle("a.wfs_googleicon { padding-left: 15px; background: center no-repeat; }");
addGlobalStyle("a.wfs_googleicon { background-image: url(" + googleicon + "); }");
addGlobalStyle("a.wfs_googleicon:hover { opacity: 0.5; }");

addGlobalStyle("div.wfs_container { margin-left: 1em; display:inline; white-space:nowrap; }");
addGlobalStyle("div.wfs_backgroundimage_left, div.wfs_backgroundimage_middle, div.wfs_backgroundimage_right { display: inline; background-repeat: no-repeat; background-position: center; }");
addGlobalStyle("div.wfs_backgroundimage_left { padding-left: 3px; background-image:url(" +  background_left + "); }");
addGlobalStyle("div.wfs_backgroundimage_middle { background-image:url(" +  background_middle + "); background-repeat: repeat-x; }");
addGlobalStyle("div.wfs_backgroundimage_right { padding-left: 3px; background-image:url(" +  background_right + "); }");


var xpath  = "//div[@class='saleTag']/h3";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

if(result.snapshotLength == 1) addIcons ( result.snapshotItem ( i ) );
else 
{
	for ( var i = 0; i < result.snapshotLength; i++ )
	{
		addIcons ( result.snapshotItem ( i ), true, i );
	}
}



