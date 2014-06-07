// ==UserScript==
// @name           del.icio.us Navigator
// @namespace      del.icio.us_Navigator
// @description    Make del.icio.us page more accessible
// @include        http://delicious.com/*
// ==/UserScript==

/*
 * Help
 * -----
 * 
 * j - Goto next link
 * k - Goto prev link
 *
 * n - Goto next tag
 * m - Goto prev tag
 *
 * s - Open search dialog
 *
 * esc - Reset j/k, n/m positions to top
 * esc(inside search box) - Close search dialog
 */

//All global variables go in this.
var globals = {};

function getTaggedLinks() {
	var links = document.getElementsByTagName("a");
	var taggedLinks = [];
	for (var i = 0; i < links.length; i++) {
		if (links[i].className === "taggedlink") {
			taggedLinks[taggedLinks.length] = links[i];
		}
	}
	return taggedLinks;
}

function getTags() {
	//If user is logged in tags are in "ruser-tags", else in "user-tags"
    var tagContainer = document.getElementById("ruser-tags") || document.getElementById("user-tags");
	if (tagContainer) {
		var tags = tagContainer.getElementsByTagName("a");
		return tags;
	}
	return [];
}

function preProcess() {
    globals.taggedLinks = getTaggedLinks();
    globals.currentLink = -1;
    
    globals.tags = getTags();
    globals.currentTag = -1;
    
    //GM_log("No of taggedLinks: "+globals.taggedLinks.length);
    //GM_log("No of tags: "+globals.tags.length);
    
    //Create a map of tag names. tagName -> tag Link
    var map = {};
    for(var i=0;i<globals.tags.length;i++) {
		//GM_log(globals.tags[i].title);
    	map[globals.tags[i].title] = globals.tags[i];
    }
    
	globals.tagMap = map;
}

function isInputTarget(e) {
	var target = e.target || e.srcElement;
	if (target && target.nodeName) {
		var targetNodeName = target.nodeName.toLowerCase();
		if (targetNodeName == "textarea" || targetNodeName == "select" ||
			(targetNodeName == "input" && target.type &&
				(target.type.toLowerCase() == "text" ||
					 target.type.toLowerCase() == "password"))
						 )  {
			return true;
		}
	}
	return false;
}

function keyPressEvent(event){
	if(isInputTarget(event)) {
		return;
	}

	//If a key was pressed with these keys, ignore it
	if (event.altKey || event.ctrlKey || event.metaKey) {
		return false;
	}

    var keyNum = event.charCode ? event.charCode : event.keyCode;
	//var letter = String.fromCharCode(keyNum).toLowerCase();
    switch (keyNum) {
        case 27: //Escape
            reset();
            break;
        case 106: // j
            selectNextLink();
            break;
        case 107: // k
            selectPrevLink();
            break;
        case 110: // n
            selectNextTag();
            break;
        case 109: // m
            selectPrevTag();
            break;
		case 115: // s
			TagSuggest.init();
			break;
            
        default:
    }
}

function reset() {
    if (globals.currentLink != -1) {
        globals.taggedLinks[globals.currentLink].blur();
        clearBorder(globals.taggedLinks[globals.currentLink]);
        globals.currentLink = -1;
    }
    
    if (globals.currentTag != -1) {
        globals.tags[globals.currentTag].blur();
		clearBorder(globals.tags[globals.currentTag]);
        globals.currentTag = -1;
    }
}

function selectNextLink() {
    if (globals.currentLink < globals.taggedLinks.length - 1) {	    
        globals.currentLink++;
        globals.taggedLinks[globals.currentLink].focus();
        setBorder(globals.taggedLinks[globals.currentLink]);
        if(globals.currentLink != 0) {
	        clearBorder(globals.taggedLinks[globals.currentLink - 1]);
	    }
    }
}

function selectPrevLink() {
    if (globals.currentLink > 0) {
	    clearBorder(globals.taggedLinks[globals.currentLink]);
        globals.currentLink--;
        globals.taggedLinks[globals.currentLink].focus();
        setBorder(globals.taggedLinks[globals.currentLink]);
    }
}

function selectNextTag() {
    if (globals.currentTag < globals.tags.length - 1) {    	
        globals.currentTag++;
        globals.tags[globals.currentTag].focus();
        setBorder(globals.tags[globals.currentTag].firstChild);
        if(globals.currentTag != 0) {
	        clearBorder(globals.tags[globals.currentTag - 1].firstChild);
	    }
    }
}

function selectPrevTag() {
    if (globals.currentTag > 0) {
	    clearBorder(globals.tags[globals.currentTag].firstChild);
        globals.currentTag--;
        globals.tags[globals.currentTag].focus();
        setBorder(globals.tags[globals.currentTag].firstChild);
    }
}

function setBorder(element) {
	if(element && element.style) {
		element.style.backgroundColor="#efefef";
	}
}

function clearBorder(element) {
	if(element && element.style) {
		element.style.backgroundColor="#fff";
	}
}

/*	TagSuggest Start	*/
// Show a text box and show matching tags when text is typed.
// Tag matching is by mathcing typed text with beginning of each tag.
function TagSuggest() {}
	
TagSuggest.init = function() {	
	globals.tagSearch.style.display="inline";
	Util.centerElement(globals.tagSearch);
	globals.tagSearchInput.focus();
}

TagSuggest.showTags = function(event) {
	var keyNum = event.charCode ? event.charCode : event.keyCode;
	if(keyNum == 27) { //Esc
		TagSuggest.reset();
		return;
	}
	
	if(keyNum != 8 && keyNum != 46) {//Backspace and Delete
		//Ignore other control keys
		if (keyNum < 32 || (keyNum >= 33 && keyNum < 46) || (keyNum >= 112 && keyNum <= 123)) {
			return;
		}
	}
	
	//Clear previous matches.
	globals.tagListDisplay.innerHTML = "";
	
	var text = globals.tagSearchInput.value;
	if(text.trim() == "") {
		globals.tagListDisplay.style.visibility = "hidden";
		return;
	}
	
	var showList = [];
	
	for(prop in globals.tagMap) {
		var regex = new RegExp("^" + text, "i");
		if(prop.match(regex)) {
			showList[showList.length] = prop; 
		}
	}

	if(showList.length == 0) {
		globals.tagListDisplay.style.visibility = "hidden";
		return;
	}
	
	//Show new mathces.
	for(var i=0; i<showList.length; i++) {
		var ele = document.createElement("div");
		ele.innerHTML = showList[i];
		globals.tagListDisplay.appendChild(ele);
	}
	
	TagSuggest.styleTagList();
	
	globals.tagPos = -1;
}

TagSuggest.styleTagList = function() {
	var pos = Util.getPosition(globals.tagSearchInput);

	//Use this if element style is fixed
	//globals.tagListDisplay.style.left = pos.left + "px"; 
	//globals.tagListDisplay.style.top = pos.top + globals.tagSearchInput.offsetHeight + "px";
	
	//Use this if element style is absolute 
	globals.tagListDisplay.style.left = globals.tagSearch.offsetWidth - globals.tagSearchInput.offsetWidth -6 + "px";
	globals.tagListDisplay.style.top = globals.tagSearchInput.offsetHeight + 3 + "px";

	globals.tagListDisplay.style.width = globals.tagSearchInput.offsetWidth + "px";
	globals.tagListDisplay.style.visibility = "visible";

	//For each tag element, add mouse over/down listeners
	var childNodes = globals.tagListDisplay.childNodes;
	for(var i=0; i<childNodes.length; i++) {
		childNodes[i].addEventListener('mouseover', TagSuggest.mouseover, true);
		childNodes[i].addEventListener('mousedown', TagSuggest.mousedown, true);
	}
}

TagSuggest.reset = function() {
	globals.tagSearch.style.display="none";
	globals.tagSearchInput.blur();
	globals.tagSearchInput.value="";
}

TagSuggest.navigateList = function(event) {
	var keyNum = event.charCode ? event.charCode : event.keyCode;
	
	switch(keyNum) {
		case 38: //Up arrow
			TagSuggest.previousSuggestion();
			break;
		case 40: //Down arrow
			TagSuggest.nextSuggestion();
			break;
		case 13: //Enter
			TagSuggest.hideSuggestions();
			break;
	}
}

TagSuggest.previousSuggestion = function() {
	var childNodes = globals.tagListDisplay.childNodes;
	if (globals.tagPos > 0) {
		TagSuggest.highlightNode(childNodes[--globals.tagPos]);
	}	
}

TagSuggest.nextSuggestion = function() {
	var childNodes = globals.tagListDisplay.childNodes;
	if (globals.tagPos < childNodes.length - 1) {
		TagSuggest.highlightNode(childNodes[++globals.tagPos]);
	}
}

TagSuggest.hideSuggestions = function() {
	var value = globals.tagListDisplay.childNodes[globals.tagPos].innerHTML;
	TagSuggest.openTag(value);
}

TagSuggest.openTag = function(tagName) {
	globals.tagSearchInput.value = tagName; 
	globals.tagListDisplay.innerHTML = "";
	globals.tagListDisplay.style.visibility = "hidden";
	location.href = globals.tagMap[tagName];
}

TagSuggest.highlightNode = function(node) {
	var childNodes = globals.tagListDisplay.childNodes;
	for(var i=0; i<childNodes.length; i++) {
		if(childNodes[i] == node) {
			childNodes[i].style.backgroundColor = "#0045c3";
			childNodes[i].style.color = "#fff";
		} else {
			childNodes[i].style.backgroundColor = "";
			childNodes[i].style.color = "";
		}
	}
}

TagSuggest.mouseover = function(event) {
	var target = event.target;
	TagSuggest.highlightNode(target);
}

TagSuggest.mousedown = function(event) {
	var target = event.target;
	TagSuggest.openTag(target.innerHTML);
}
/*	TagSuggest End	*/

/*	Util Start	*/
function Util() {};

Util.getPosition = function (ele) {
	var top = 0;
	var left = 0;
	do {
		if (ele.offsetParent) {
			top += ele.offsetTop;
			left += ele.offsetLeft;
		}
	} while(ele = ele.offsetParent)	
	return {"top" : top, "left": left};
}

Util.centerElement = function(ele) {
	
	var viewportwidth = window.innerWidth;
    var viewportheight = window.innerHeight;
    
    var eleHeight = ele.offsetHeight;
    var eleWidth = ele.offsetWidth;

    //Position element 1/10th distance from top and half from left
    var topPos = (viewportheight - eleHeight)/10;
    var leftPos = (viewportwidth - eleWidth)/2;
    
    ele.style.top = topPos + "px"; 
    ele.style.left = leftPos + "px";
}

Util.printObj = function(obj) {
	var msg = "";
	for(var prop in obj) {
		msg += prop + " : " + obj[prop] + "<br>"; 
	}
	document.getElementById("log").innerHTML = msg;
}

Util.log = function(msg) {
	document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + msg;
}
/*	Util End	*/

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function init() {
	//Insert the search element in the doc. It is absolutely positioned.
	var searchEle = document.createElement("div");
	searchEle.innerHTML =
		'<div id="tagSearch" style="' +
		'       background-color: #3274d0;' +
		'       color: #fff;' +
		'       display: none;' +
		'       padding: .3em 0.5em;' +
		'       position: absolute;' +
		'		z-index: 11000;' +
		'       ">' +
		'       Search for Tag: <input id="tagSearchInput" type="text" size=15/>' +
		'       <div id="tagListDisplay" style="' +
		'               border: 1px solid #000;' +
		'               background-color: #fff;' +
		'				color: #000;' +
		'               position: absolute;' +
		'               text-align: left;' +
		'               visibility: hidden;' +
		'               ">              ' +
		'       </div>' +
		'</div>';
	
	document.body.insertBefore(searchEle, document.body.firstChild);

	globals.tagSearch = document.getElementById("tagSearch");
	globals.tagListDisplay = document.getElementById("tagListDisplay");
	globals.tagSearchInput = document.getElementById("tagSearchInput");
	globals.tagPos = -1;

	//Add listners for text box. "showTags" for showing matching tags
	//and "navigateList" for keyboard navigation.
	var tagSearchInput = document.getElementById("tagSearchInput");
	tagSearchInput.addEventListener('keyup', TagSuggest.showTags, true);
	tagSearchInput.addEventListener('keypress', TagSuggest.navigateList, true);

	preProcess();
}


//Add Listeners
document.addEventListener('keypress', keyPressEvent, true);
document.addEventListener('load', init, true);
