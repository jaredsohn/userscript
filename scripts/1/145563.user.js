// ==UserScript==
// @name        /r/Starcraft hide custom tags
// @namespace   http://www.andydremeaux.com
// @description automatically hide chosen tags 
// @include     http://www.reddit.com/r/starcraft*
// @include     http://reddit.com/r/starcraft*
// @grant		GM_registerMenuCommand
// @grant		GM_setValue
// @grant		GM_getValue
// @version     2.0
// ==/UserScript==

GM_registerMenuCommand("Choose /r/Starcraft Hidden Tags", popupCustomize, "d");
GM_registerMenuCommand("Black Out /r/Starcraft Spoilers", spoilerCustomize, "b");
GM_registerMenuCommand("Hide /r/Starcraft Tag Visuals", tagCustomize, "h");

function popupCustomize() {
   var list = prompt("Enter tags seperated by commas", subs.replace(/,/g, ", "));
   GM_setValue("subs", list);
   location.reload(true);
}

function spoilerCustomize() {
   var c = confirm("Do you want to cover spoilers with a black bar?");
   GM_setValue("hide_spoilers", c);
   location.reload(true);
}

function tagCustomize() {
   var c = confirm("Do you want to hide the tag visuals?");
   GM_setValue("hide_tags", c);
   location.reload(true);
}

var subs = GM_getValue("subs", "Fluff, Shoutout");
subs = subs.replace(/\s/g, '');
var links = subs.split(",");

var hide_spoilers = GM_getValue("hide_spoilers", true);
var hide_tags = GM_getValue("hide_tags", false);

//correct for square brackets
for (var i = 0; i < links.length; i++) {
	if (links[i].charAt(0) == "[") links[i] = links[i].substr(1);
	if (links[i].charAt(links[i].length-1) == "]") links[i] = links[i].substr(0,links[i].length-1);
	links[i] = "[" + links[i].toLowerCase() + "]";
}


var arr = document.getElementsByClassName("linkflairlabel");
var div;
for (var i = 0; i < arr.length; i++) {
	var match = false;
	for (var j = 0; j < links.length; j++) {
		if (arr[i].innerHTML.toLowerCase().indexOf(links[j]) != -1) {
			match = true;
			break;
		}
	}

	if (match) {
		div = arr[i].parentNode.parentNode;
		div = div.getElementsByClassName("hide-button")[0];
		if (div) div = div.getElementsByTagName("a")[0];
		if (div) eventFire(div, 'click');
	} else if (hide_spoilers && arr[i].innerHTML.indexOf("[Spoiler]") != -1) {
		div = arr[i].parentNode.getElementsByClassName("title")[0];
		applySpoilerStyle(div);
	}
	if (hide_tags) arr[i].style.display = "none";
}



function applySpoilerStyle(head) {
	head.style.color = "#000";
	head.style.backgroundColor = "#000";
	head.style.textShadow = "none";
	head.onmouseover = function() { 
	  this.style.color = "#FFF";
	}
	head.onmouseout = function() { 
	  this.style.color = "#000";
	}
	
}

function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}