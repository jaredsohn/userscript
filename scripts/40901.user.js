// ==UserScript==
// @name           Fixed Fixer
// @author         Darkimmortal
// @namespace      fixedbg
// @description    Changes fixed backgrounds and positions from <html>, <body> and 2 levels of children into standard ones, thereby fixing Gecko smooth scrolling lag.
// @include        *
// @exclude http://www.facebook.com/*
// @exclude http://facebook.com/*
// @exclude https://facebook.com/*
// @exclude https://www.facebook.com/*
// ==/UserScript==

// Set to true to disable notification that lag has been fixed.
var DISABLE_NOTIFICATION = true;

// [-----------------------------------------------------------]

var fixed = false;

var debug = function(dbg){
	if(typeof unsafeWindow.console.debug == "function"){
		unsafeWindow.console.debug(dbg);
	}
};	

var getStyle = function(el, styleProp){
	if (el.currentStyle){
		var y = el.currentStyle[styleProp];
	} else if (window.getComputedStyle){
		var z = window.getComputedStyle(el,null);
		var y = z !== null ? z.getPropertyValue(styleProp) : "";
	}
	return y;
};

var check = function(el){
	if(el){
		if(getStyle(el, "background-attachment") == "fixed"){
			fixed = true;
			el.style.background = getStyle(el, "background").replace(/fixed/gi, "scroll");
			el.style.backgroundAttachment = "scroll";
		}
		if(getStyle(el, "position") == "fixed"){
			fixed = true;
			el.style.position = "absolute";
		}
	}
};
if(location.hash != "#undo"){
	var body = document.getElementsByTagName("body")[0];
	check(body);
	check(document.getElementsByTagName("html")[0]);
	var bodyChildren = body.childNodes;
	var j, i, childrenChildren;
	
	/*var allElements, thisElement;
	allElements = document.evaluate('//*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allElements.snapshotLength; i++) {
	    thisElement = allElements.snapshotItem(i);
	    check(thisElement);
	}*/
	
	for(i in bodyChildren){
		if(bodyChildren[i].nodeType == 1){
			childrenChildren = bodyChildren[i].childNodes;
			for(j in childrenChildren){
				if(childrenChildren[j].nodeType == 1){
					check(childrenChildren[j]);
				}
			}
			check(bodyChildren[i]);
		}
	}
}

if(fixed && !DISABLE_NOTIFICATION){
	var noti = document.createElement("div");
	noti.style.MozBorderRadius = "15px";
	noti.style.background = "#333";
	noti.style.border = "2px solid #666";
	noti.style.fontFamily = "\"Trebuchet MS\", sans-serif";
	noti.style.fontSize = "16px";
	noti.style.color = "#fff";
	noti.style.position = "fixed";
	noti.style.bottom = "10px";
	noti.style.right = "10px";
	noti.style.zIndex = "10000";
	noti.style.padding = "8px";
	noti.style.lineHeight = "25px";
	noti.innerHTML = "Scrolling lag fixed successfully; Enjoy :)<br />&mdash;Darkimmortal &bull; <span onclick='location.hash=\"#undo\"; location.reload()' style='color: #A7C6F2; text-decoration: underline; cursor: pointer'>Undo</span>";
	document.getElementsByTagName("body")[0].appendChild(noti);
	
	setTimeout(function(){
		noti.style.display = "none";
	}, 2500);
}

