// Comics Alt Text
// version 0.6
// 9 Mar 2008
// Copyright (c) 2005-7, Adam Vandenberg
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name		Comics Alt Text
// @namespace	http://adamv.com/greases/
// @description 	Handily shows the "hover text" for some comics on the page itself.
// @include	http://achewood.com/*
// @include	http://*.achewood.com/*
// @include	http://qwantz.com/*
// @include	http://*.qwantz.com/*
// @include	http://asofterworld.com/*
// @include	http://*.asofterworld.com/*
// @include http://drmcninja.com/*
// @include http://*.wondermark.com/*
// @include http://wondermark.com/*
// @include http://www.xkcd.com/*
// @include http://xkcd.com/*
// @include http://www.webcomicsnation.com/justinpie/wonderella/*
// ==/UserScript==

function foreach(stuff, f){ for(var i=0; i < stuff.length; i++) if (f(stuff[i])) return; }
function foreach_dict(stuff, f){ for(var name in stuff) if ( f(name, stuff[name]) ) return; }

Function.prototype.delayed = function(){
	var the_function = this;
	var the_args = arguments;
	return function(){
		the_function.apply(null, the_args);
	}
}

String.prototype.endsWith = function(pattern) {
  var d = this.length - pattern.length;
  return d >= 0 && this.lastIndexOf(pattern) === d;
}


function addCSS(){ 
	for(var i=0;i<arguments.length;i++) GM_addStyle(arguments[i]);
}

function selectNodes(xpath, elem){
	var results = document.evaluate(
		xpath, elem || document, null,
		XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)

	var nodes = new Array();
	var result = null;
	while(result = results.iterateNext()) nodes.push(result);
	
	return nodes;
}

function doIt(){
	var cssStyles = {
		"quiet": "span.alt-text, a span.alt-text  { color: #CCC; font-size: 8pt; font-family: Tahoma, Helvetica, Arial; text-decoration: none;}",
		"tooltip": "span.alt-text, a span.alt-text  { background-color: #FFFFE1; color: black; font-size: 8pt; font-family: Tahoma, Helvetica, Arial; text-decoration: none; border: 1px solid #CCC; padding: 3px 5px;}"
	};
	
	var tComic = {
		"achewood": ["http://m.assetbar.com/achewood/autaux"],
		"asofterworld": ["http://www.asofterworld.com/clean/"],
		"drmcninja": ["/issue"],
		"qwantz": ["http://www.qwantz.com/comics/"],
		"wonderella": ["http://www.webcomicsnation.com/memberimages/", function(url){return url.endsWith('.png');}],
		"wondermark": ["/comics/"],
		"xkcd": ["http://imgs.xkcd.com/comics/"],
	}
	
	var whichSite;
	for(var key in tComic){
		if (location.href.indexOf(key) > -1){
			whichSite = key;
			break;
		}
	}
	
	if (whichSite == null) 
		return;
		
	var cssPref = GM_getValue("cssStyle", "quiet", "none");
	if (cssPref != null)
	{
		cssToAdd = cssStyles[cssPref];
		if (cssToAdd != null)
			addCSS(cssToAdd);
	}
	
	// '//img[starts-with(@src,
	var comic_def = tComic[whichSite];
	var xpath_expression = '//img[starts-with(@src, "'+comic_def[0]+'")]'
	var matching_images = selectNodes(xpath_expression);
	
	var comic = null;
	
	if (matching_images.length == 0)
		return;
	else if ((comic_def[1] == null) || (matching_images.length == 1))
		comic = matching_images[0];
	else {
		foreach(matching_images, function(image){
			if (comic_def[1](image.src)){
				comic = image;
				return true;				
			}
		})
	}

	if (!comic) return;
	
	var the_alt = comic.title;
	if (!the_alt) the_alt = comic.alt;
	if (the_alt){
		div = document.createElement("div");
		
		span = document.createElement("span");
		span.className ="alt-text";
		span.innerHTML = the_alt;
		
		div.appendChild(span);
		
		comic.parentNode.insertBefore(div, comic.nextSibling);
	}
}

doIt();

function setStyle(newStyle){
	GM_setValue("cssStyle", newStyle);
	window.alert("New style applied; reload page to update.");
}

GM_registerMenuCommand("Style: Quiet", setStyle.delayed("quiet"));
GM_registerMenuCommand("Style: Tooltipish", function(){setStyle("tooltip");});
GM_registerMenuCommand("Style: None", function(){setStyle("none");});

