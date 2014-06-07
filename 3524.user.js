// Kottu sanitizer
// version 0.05
// 2006-02-27
// Copyright (c) 2006, drac (http://lair.fierydragon.org)
// Released under the GPL license
//
// 0.01: initial release, did layout changes and foldouts for stories
// 0.02: added stat bar
// 0.03: added latapata links, added a hide function to block out the irritants
// 0.04: hide function now has a spiffy icon, is toggleable and also handles multiple posts by the same author
// 0.05: Cleanup
// --------------------------------------------------------------------

// todo: making blocking choices persistent. Not sure if Opera supports setvalue/getvalue though.
// some redundant code remains in anticipation of this feature.

// ==UserScript==
// @name            Kottu Cleaner
// @description     Gives Kottu a usability pimp slap
// @include         http://www.kottu.org/*
// @include		  http://kottu.org/*
// ==/UserScript==

var blogLinks = Array();
var bloghref = Array();
var blogEntries = Array();
var blogKey = Array();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalJS(jscript) {
	var head, js;
	head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    js = document.createElement('script');
    js.type = 'text/javascript';
    js.innerHTML = jscript;
    head.appendChild(js);
}

function add_img(parentElem, alternate_image) {
var add_img_src = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMASURBVHjaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+' +
		'x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPhcn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3e' +
		'cvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG5' +
		'1QyOgUkMz7+yMLz9wcLwjUWAgYuDiXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDX' +
		'cmHY2Rn2XVtDFsXPAAGEYcD3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjF' +
		'CxI+y1gnP3S4t3NxHwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PE' +
		'tB2zLBiuzoxi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBi' +
		'OMfAyXDuA9A7X4HR+J2B4Q9QqeTX9Qy/3mwCRul7ho9fP//4+OVd+/aO800AAQQOAwmur/6SjG/mp5cE' +
		'Mxx6y8xw9dt/ht/A6PsD9C2IZn61koFTYBeDja0pg4yQKsP+qxs4Tlw53GiRI8UHEEDgMFis2bVmWfw7' +
		'hpfXtjOceMbA8O09I8PPzwxg/PsL0KC3ixkMNPQZ/jL9ZdCXdGX4y/ibwULXCpxoAQIIbAAzIyMTCzsX' +
		'w5ETbxhUWL4x/AA6+ScQ//oG8cL7z88ZWBl5GPw0c8FhUuw8i0FZTA/E5AAIILABTKou1ff3L/7D+fv5' +
		'n41LTzGw8f5n4BBkYOAWZ2DglwXG4OePDFefHWPo2J0INqBjVyLD3VeXQMwfAAEEj4UHK7N451+SZlt0' +
		'Tb/1/4e33sysXEIMjEysDP/+M3ALb2RUMz3DYqVnw6AqYchw+8V5hmOXjjA8uf+xFyCAGInNzsAA6wBS' +
		'WUDMC8TA0GGYdmLKswqAAAMAnFQdkhuzRSAAAAAASUVORK5CYII=';

var img_src = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMKSURBVHjaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+' +
		'x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPhcn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3e' +
		'cvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG5' +
		'1QyOgUkMz7+yMLz9wcLwjUWAgYuDiXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDX' +
		'cmHY2Rn2XVtDFsXPAAGEYcD3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjF' +
		'CxI+y1gnP3S4t3NxHwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PE' +
		'tB2zLBiuzoxi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBi' +
		'OMfAyXDuA9A7X4HR+J2B4Q9QqeOtaQyKZ6cw/Hp6h+ErM9t7NoZfPZ67frUBBBA4DCS4vvpLMr6Zn14S' +
		'zHDoLTPD1W//GX4Do+8P0LcgWvfidAa9TysYNCNSGNgVtRm+X9olePXw7ubdLqyfAQII7ILztZp/ZMwD' +
		'mFe9tmY4I+nDwAx0+b8//8EG/PnJwBC0Wo3BOzWTgfPuAQaGp0cYGPgFGN6wyDOc23X4PkAAgV3AzMjI' +
		'xMLOxXDkxBsGndBvDNc/cjH8/8PA8PcXxBWCnx4ycEgoMjB4FSGir0GSgfkfowJAAIFjgUnVpfr+/sV/' +
		'OH8//7Nx6SkGNt7/DByCDAzc4kDLZBkYPgtIMXy7sJWBAajpZzkjw3sg/vTyNcNf5v/PAAIIHgsPVmbx' +
		'zr8kzbbomn7r/w9vvZlZuYQYGJlYGf79Zwji2MIYJH6CRUHkFwML0xOGz6//MDx4yfz394//dQABxEhs' +
		'dj4aIVfx9d2zdOa/jPJAm58CdU133/WnDSDAAKjSJtOMc/NjAAAAAElFTkSuQmCC';
	var img_node = document.createElement('img');
	if (alternate_image)	{
		img_node.src = add_img_src;
	}
	else {
		img_node.src = img_src;
	}
	parentElem.removeChild(parentElem.childNodes[0]);
	parentElem.appendChild(img_node);
}

function add_close_button() {
	var allAnchors, thisAnchor;
	allAnchors = document.evaluate("//div[@id='stats']/ul/li/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 	null);
	for (var i = 0; i < allAnchors.snapshotLength; i++) {
		thisAnchor = allAnchors.snapshotItem(i);
		if (thisAnchor.childNodes[0].nodeValue == 'x') {			
			add_img(thisAnchor, false);
		}
	}
}

function add_stats() {
	var containerElem = document.getElementById('container');	
	if (containerElem) {
		newElement = document.createElement('div');
		var elemStr = "<div id='stats'><h4 id='statheader'>On this page</h4><ul>";
		for(var e in blogLinks) {
			elemStr = elemStr +  "<li><a href=\"" + bloghref[e] + "\">" +e + "</a>&nbsp; (" + blogLinks[e] + ") <a href=\"#\" title='hide/show entries by this blogger' onclick=\"if ( " + blogLinks[e] + " == 1) { var hId = document.getElementById( '" + blogEntries[e]  + "'); if (hId.parentNode.style.display == 'none') {  hId.parentNode.style.display = 'block'; add_img(this, false);}  else { hId.parentNode.style.display = 'none'; add_img(this, true);} } else { var h = '" + blogEntries[e] + "'.split(','); 	for (var ii = 0; ii <= h.length + 1; ii++) {  var hId = document.getElementById(h[ii]); if (hId) { if (hId.parentNode.style.display == 'none') { hId.parentNode.style.display = 'block'; add_img(this, false); } else { hId.parentNode.style.display = 'none'; add_img(this, true); } } } } stripe_entries();\">x</a></li>";
		}
		elemStr += "</ul> ";
		elemStr += "</div>";
		newElement.innerHTML = elemStr;
		containerElem.parentNode.insertBefore(newElement, containerElem.nextSibling);
		add_close_button();
	}
}

function add_lp_links() {
	var containerElem = document.getElementById('container');	
	if (containerElem) {
		newElement = document.createElement('div');
		var elemStr = "<div id='lp_links'><h4 id='lpheader'>Latapata Links</h4><ul>";
		var lpItems = document.getElementById('latapata');
		if (lpItems)	{
			elemStr = elemStr + lpItems.childNodes[1].innerHTML;
		}	
		elemStr += "</ul></div>";
		newElement.innerHTML = elemStr;
		containerElem.parentNode.insertBefore(newElement, containerElem.nextSibling);
	}
}

function fixBlogLink(link_element) {
	link_element.className = 'bloglink';
	if (blogLinks[link_element.innerHTML]) {
		blogLinks[link_element.innerHTML]++;
		var entry_str = blogEntries[link_element.innerHTML];
		entry_str = entry_str + "," + link_element.previousSibling.previousSibling.previousSibling.previousSibling.id; // oh dear god, kill me now
		blogEntries[link_element.innerHTML] = entry_str;
	}
	else {
		blogLinks[link_element.innerHTML] = 1;
		bloghref[link_element.innerHTML] = link_element.href;
		blogEntries[link_element.innerHTML] = link_element.previousSibling.previousSibling.previousSibling.previousSibling.id; // gah
	}
}

function stripe_entries() {
	var allDivs, thisDiv;
	allDivs = document.evaluate("//div[@class='post']",   document, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,	null);
	var entry_tracker = 0;
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if (thisDiv.style.display == 'none')	{ continue; }
		else { entry_tracker++; }
		if ((entry_tracker % 2) == 0)	{
			thisDiv.style.backgroundColor = '#f8f5ec';
		}
		else {
			thisDiv.style.backgroundColor = '#fdfdfd';
		}
	}
}

addGlobalStyle('.cmeta, #search, #searchform, #s, #nav{ display: none; margin: 0px; padding: 0px;}');
addGlobalStyle('#sidebar, #flickr-badge, .feedback{ display: none; }');
addGlobalStyle('#stats{ width: 20%; float: right; padding-top: 0px; padding-right: 5px; font-family: Georgia; font-size: 0.8em}');
addGlobalStyle('#stats a { color: #444; font-size: 0.8em;}');
addGlobalStyle('#stats a:hover { color:#FF4500;  text-decoration: none;  border-bottom:1px solid #bbb;}');
addGlobalStyle('#statheader{ font-family: Arial, Verdana, sans-serif; }');
addGlobalStyle('#statheader ul{ margin-top: 0px; padding-top: 0px;}');
addGlobalStyle('#lp_links{ width: 20%; float: right; padding-top: 0px; margin-bottom: 0px; padding-right: 10px; font-family: Georgia; font-size: 0.9em}');
addGlobalStyle('#lp_links a { color: #444; font-weight: bold; font-size: 0.8em;}');
addGlobalStyle('#lp_links a:hover { color:#FF4500;  text-decoration: none;  border-bottom:1px solid #bbb;}');
addGlobalStyle('#lpheader{ font-family: Arial, Verdana, sans-serif; }');
addGlobalStyle('#container{ width: 950px; }'); 
addGlobalStyle('h2 { color: #d2d6c8; }');
addGlobalStyle('#content{ width: 85%; }');
addGlobalStyle('h3{ display: inline; padding-left: 10px; }');
addGlobalStyle('.expander{ font-size: 8px; }');
addGlobalStyle('h3 a{ font-family: Georgia; font-size: 13px; color: #444; margin-bottom: 1px; padding-bottom: 1px; font-weight: bold;  }');
addGlobalStyle('post{ padding-bottom: 0px; margin-bottom: 0px; border: 0px}');
addGlobalStyle('.storycontent{ padding-left: 20px; display: none; font-family: Arial, Verdana, Sans-Serif; font-size: 10px; color: #444; }');
addGlobalStyle('.bloglink{ font-family: Arial, Verdana, Sans-serif; font-size: 10px; color: #798152; }');

addGlobalJS("function add_img(parentElem, alternate_image) {"+
"var add_img_src = 'data:image/png;base64,' +"+
"		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +"+
"		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMASURBVHjaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+' +"+
"		'x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPhcn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3e' +"+
"		'cvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG5' +"+
"		'1QyOgUkMz7+yMLz9wcLwjUWAgYuDiXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDX' +"+
"		'cmHY2Rn2XVtDFsXPAAGEYcD3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjF' +"+
"		'CxI+y1gnP3S4t3NxHwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PE' +"+
"		'tB2zLBiuzoxi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBi' +"+
"		'OMfAyXDuA9A7X4HR+J2B4Q9QqeTX9Qy/3mwCRul7ho9fP//4+OVd+/aO800AAQQOAwmur/6SjG/mp5cE' +"+
"		'Mxx6y8xw9dt/ht/A6PsD9C2IZn61koFTYBeDja0pg4yQKsP+qxs4Tlw53GiRI8UHEEDgMFis2bVmWfw7' +"+
"		'hpfXtjOceMbA8O09I8PPzwxg/PsL0KC3ixkMNPQZ/jL9ZdCXdGX4y/ibwULXCpxoAQIIbAAzIyMTCzsX' +"+
"		'w5ETbxhUWL4x/AA6+ScQ//oG8cL7z88ZWBl5GPw0c8FhUuw8i0FZTA/E5AAIILABTKou1ff3L/7D+fv5' +"+
"		'n41LTzGw8f5n4BBkYOAWZ2DglwXG4OePDFefHWPo2J0INqBjVyLD3VeXQMwfAAEEj4UHK7N451+SZlt0' +"+
"		'Tb/1/4e33sysXEIMjEysDP/+M3ALb2RUMz3DYqVnw6AqYchw+8V5hmOXjjA8uf+xFyCAGInNzsAA6wBS' +"+
"		'WUDMC8TA0GGYdmLKswqAAAMAnFQdkhuzRSAAAAAASUVORK5CYII=';"+
" "+
"var img_src = 'data:image/png;base64,' +"+
"		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +"+
"		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMKSURBVHjaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+' +"+
"		'x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPhcn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3e' +"+
"		'cvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG5' +"+
"		'1QyOgUkMz7+yMLz9wcLwjUWAgYuDiXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDX' +"+
"		'cmHY2Rn2XVtDFsXPAAGEYcD3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjF' +"+
"		'CxI+y1gnP3S4t3NxHwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PE' +"+
"		'tB2zLBiuzoxi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBi' +" +
"		'OMfAyXDuA9A7X4HR+J2B4Q9QqeOtaQyKZ6cw/Hp6h+ErM9t7NoZfPZ67frUBBBA4DCS4vvpLMr6Zn14S' +" +
"		'zHDoLTPD1W//GX4Do+8P0LcgWvfidAa9TysYNCNSGNgVtRm+X9olePXw7ubdLqyfAQII7ILztZp/ZMwD' +"+
"		'mFe9tmY4I+nDwAx0+b8//8EG/PnJwBC0Wo3BOzWTgfPuAQaGp0cYGPgFGN6wyDOc23X4PkAAgV3AzMjI' +"+
"		'xMLOxXDkxBsGndBvDNc/cjH8/8PA8PcXxBWCnx4ycEgoMjB4FSGir0GSgfkfowJAAIFjgUnVpfr+/sV/' +"+
"		'OH8//7Nx6SkGNt7/DByCDAzc4kDLZBkYPgtIMXy7sJWBAajpZzkjw3sg/vTyNcNf5v/PAAIIHgsPVmbx' +"+
"		'zr8kzbbomn7r/w9vvZlZuYQYGJlYGf79Zwji2MIYJH6CRUHkFwML0xOGz6//MDx4yfz394//dQABxEhs' +"+
"		'dj4aIVfx9d2zdOa/jPJAm58CdU133/WnDSDAAKjSJtOMc/NjAAAAAElFTkSuQmCC';"+
"	var img_node = document.createElement('img');"+
"	if (alternate_image)	{"+
"		img_node.src = add_img_src;"+
"	}"+
"	else {"+
"		img_node.src = img_src;"+
"	}"+
"	parentElem.removeChild(parentElem.childNodes[0]);"+
"	parentElem.appendChild(img_node);"+
"}"
);
addGlobalJS('function stripe_entries() {' +
'	var allDivs, thisDiv;' +
'	allDivs = document.evaluate("//div[@class=\'post\']",   document, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,	null);' +
'	var entry_tracker = 0;' +
'	for (var i = 0; i < allDivs.snapshotLength; i++) {' +
'		thisDiv = allDivs.snapshotItem(i);' +
'		if (thisDiv.style.display == \'none\')	{ continue; }' +
'		else { entry_tracker++; }' +
'		if ((entry_tracker % 2) == 0)	{' +
'			thisDiv.style.backgroundColor = \'#f8f5ec\';' +
'		}' +
'		else {' +
'			thisDiv.style.backgroundColor = \'#fdfdfd\';' +
'		}' +
'	}' +
'}'
);

var allDivs, thisDiv;
allDivs = document.evaluate("//div[@class='post']/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.style.display = 'none'; // hide the "by" image
	fixBlogLink(thisDiv.nextSibling.nextSibling);  // fix the blog link, log info
	var extraBR = thisDiv.nextSibling.nextSibling.nextSibling;
	newElement = document.createElement('a'); // force a link to be created
	newElement.innerHTML = "&nbsp;&nbsp;<a class=\"expander\" href='#' id='link " + i + "' onclick=\"var targetDiv; if (this.parentNode.parentNode.childNodes[8] == '[object HTMLDivElement]') {  targetDiv = this.parentNode.parentNode.childNodes[8]; }  else { targetDiv = this.parentNode.parentNode.childNodes[10]; } if (targetDiv.style.display == 'block') {  targetDiv.style.display = 'none'; this.childNodes[0].nodeValue = '+';} else {  targetDiv.style.display = 'block'; this.childNodes[0].nodeValue = '-';} return false;\">+</a>";
	// check if childNode[8] is a div, if it is .. then the entry is within a day. If not, that means it's the start of another day, so use childNodes[10]
	extraBR.parentNode.insertBefore(newElement, extraBR);  // insert anchor into the tree
	extraBR.parentNode.removeChild(extraBR); 
}

stripe_entries();
add_stats();
add_lp_links();