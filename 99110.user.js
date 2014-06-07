// ==UserScript==
// @name	Gravity Agile Project Management UI Enhancements
// @author	Cori Schlegel
// @namespace	http://userscripts.org/users/151175
// @icon	https://d1zvd2d754ag59.cloudfront.net/img/logo2.png
// @version	1.2
// @description	For Gravity Project Management (http://gravitydev.com) adds a couple of user-interface enhancements
// @include	https://www.gravitydev.com/*
// ==/UserScript==

//	globals
var i;	//placeholder

/********	Helper Function Library	***********/
function getElementsByClassName(node,classname) {
	if (node.getElementsByClassName) { // use native implementation if available
		return node.getElementsByClassName(classname);
	} else {
		return (function getElementsByClass(searchClass,node) {
			if ( node === null ) {
				node = document;
			}

			var classElements = [],
				els = node.getElementsByTagName("*"),
				elsLen = els.length,
				pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

			for (i = 0, j = 0; i < elsLen; i++) {
				if ( pattern.test(els[i].className) ) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		})(classname, node);
	}
}
function nextSibling(start) {
	var nextSib;
	if (!(nextSib=start.nextSibling)) {
	 return false;
	}
	while (nextSib.nodeType!==1) {
		if (!(nextSib=nextSib.nextSibling)) {
			return false;
		}
	}
	return nextSib;
}

/***********	EventHandler Functions	*********/
function focusStoryTitle() {
	document.getElementById("add-story-title").focus();
}

function toggleIterationBodyVisibility( event ) {
	if( event.target.className === 'iteration-options-button' || event.target.parentNode.className === 'iteration-options-button' )
		{ return; }	//we don't want to handle clicks in these elements
	if(nextSibling(this).style.display === 'block' || nextSibling(this).style.display === null || nextSibling(this).style.display === '' ) {
		nextSibling(this).style.display = 'none';
	} else {
		nextSibling(this).style.display = 'block';
	}
}

/***********	Main Functions	************/
function addIterationHeaderHandlers() {

	var iter_header_elems = getElementsByClassName(document,"iteration-header");

	for (i=0; i<iter_header_elems.length; i++) {
		iter_header_elems[i].addEventListener('click', toggleIterationBodyVisibility,false);
	}

}

function setStoryTitleFocus() {
	var add_story_button = document.getElementById("add-story-button");
	var saveAndAddButton = document.getElementsByName("save-and-add");
	add_story_button.addEventListener( 'click', focusStoryTitle, false);
	if(saveAndAddButton.length>0) {
		saveAndAddButton[0].addEventListener( 'click', focusStoryTitle, false);
	}
}


/********	Main	**********/
///	comment out any of these lines to prevent the user script from
///	adding that feature
///	sort of a poor-man's config for now.
addIterationHeaderHandlers();	//click on an iterations header/titlebar to collapse that iteration in the ui. only collapsed until next page reload.
setStoryTitleFocus();	//places focus in the Story Title field of a new User Story

/*******		future feature?	********/
// function addCollapseAll() {
// 	var toolbar = getElementsByClassName( document, "tbar");
// 	var collapseAllIterationsHtml = "<button id=\"task-board-button\" class=\"blend\">";
// 	collapseAllIterations +="			<img src=\"https://d1zvd2d754ag59.cloudfront.net/img/application_view_tile.png\" width=\"16\" height=\"16\">";
// 	collapseAllIterations +="			CoollaspseAll";
// 	collapseAllIterations +="</button>";
// 	var collapseAllIterations = document.createElement("button");
// //	collapseAllIterations
// 	collapseAllIterations.addEventListener('click', function( event ) {
// 		for( i=0; i<iter_header_elems.length; i++) {
// 			nextSibling(iter_header_elems[i]).style.display = 'none';
// 		}
// 	}, false);
//
// 	toolbar[0].appendChild(collapseAllIterations);
// }