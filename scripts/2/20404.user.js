// ==UserScript==
// @name           Display Digg Subcategories
// @namespace      digg
// @description    Add Subcategory Bar in the new digg.com redesign
// @include        http://digg.com/*
// @include        http://www.digg.com/*
//
// ==/UserScript==
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var currentClass = getElementsByClass("h-drop current",document);
if (currentClass != null) {
	currentClass = currentClass[0];
	var categoryName = currentClass.getElementsByTagName("strong")[0];

	var subCategories = getElementsByClass("submenu-drop catdropm",currentClass)[0];
	var links = subCategories.getElementsByTagName("a");
	
	var hSec = document.getElementById("h-sec");

	var curStyle = document.styleSheets[document.styleSheets.length - 1];
	curStyle.insertRule("#h-tri { background:#90B557 url(/img/menu-secondary.gif) no-repeat scroll 100% 100%; color: #ffffff; clear:both; float:left; width:100%; z-index:1200000; }",curStyle.cssRules.length);
	curStyle.insertRule("#h-sec { background:#90B557 none no-repeat scroll 100%; color: #ffffff; clear:both; float:left; width:100%; z-index:1200000; }",curStyle.cssRules.length);
//curStyle.insertRule("#h-tri { background:#B2D281 none repeat scroll 0%; float:left; font-size:105%; position:relative; width:100%; }",curStyle.cssRules.length);
curStyle.insertRule(" #h-tri div { float:right; padding-top:4px; width:314px; }",curStyle.cssRules.length);
curStyle.insertRule(" #h-tri ul { background:transparent url(/img/menu-secondary.gif) no-repeat scroll 0pt 100%; min-height:28px; padding-left:8px;}",curStyle.cssRules.length);
curStyle.insertRule(" #h-sec ul { background:transparent none no-repeat scroll 0pt 100%; min-height:28px; padding-left:8px;}",curStyle.cssRules.length);

curStyle.insertRule(" #h-tri.menu-single { background:#B2D281 url(/img/menu-primary.gif) no-repeat scroll 100%; }",curStyle.cssRules.length);
curStyle.insertRule("#h-tri.menu-single ul { background:transparent url(/img/menu-primary.gif) no-repeat scroll 0pt 100%; }",curStyle.cssRules.length);
	
curStyle.insertRule("#h-tri li a.current strong, #h-tri li a:hover strong, #h-tri li a:focus strong, #h-tri div a.current strong, #h-tri div a:hover strong, #h-tri div a:focus strong, #h-sec li.current strong, #h-sec li a:hover strong, #h-sec li a:focus strong, #h-sec div a.current strong, #h-sec div a:hover strong, #h-sec div a:focus strong { background:transparent url(/img/menu-current.gif) no-repeat scroll 100% 0pt; color:#3B5D14; cursor:pointer; display:block; }",curStyle.cssRules.length);
curStyle.insertRule("#h-tri li a strong, #h-tri div a strong, #h-sec li a strong, #h-sec div a strong { display:block; float:left; height:13px; padding:5px 8px; white-space:nowrap; }",curStyle.cssRules.length);
curStyle.insertRule("#h-tri li a strong, #h-tri div a strong { color: #ffffff; }",curStyle.cssRules.length);

	var subCatDiv = document.createElement("div");
	var subcatUL = document.createElement("ul");
	subCatDiv.id='h-tri';
	for (var i = 0; i < links.length; i++) {
		var tmpLink = links[i].cloneNode(true);
		tmpLink.innerHTML = "<strong style='font-size: 11px'>"+tmpLink.innerHTML+"</strong>";
		var tmpLI = document.createElement("li");
		tmpLI.className = "all";
			tmpLI.appendChild(tmpLink);
			subcatUL.appendChild(tmpLI);
		}
	subCatDiv.appendChild(subcatUL);
	document.getElementById("h").appendChild(subCatDiv);
}
