/*
    Google+ Automatic Fuu Extension => Reply posts in one click.
    Copyright (C) 2012 Jackson Tan - DOM Listener Method
    Copyright (C) 2012 Jingqin Lynn - Beginning Auto Fuu Script
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             GooglePlusAutoFuu
// @name 		Google+ Automatic Fuu Extension
// @version        0.6.9
// @namespace	AutoFuu
// @author         Jackson Tan
// @description		Add a Fuu button below each post to help you send a comment with Fuu expression automatically.
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

var css_RemoveBar = ".GA.RF {\ndisplay: none !important;}\n}";
GM_addStyle (css_RemoveBar);

function hotkey() 
{ 
var a=window.event.keyCode; 
if((a==113)&&(event.ctrlKey)) 
{ 
	document.getElementById("fuuShare").click();
	return false;
} 
}// end hotkey 

document.onkeydown = hotkey;

function doClick(target) {
	var e;
	e = document.createEvent("MouseEvents");
	e.initEvent("mousedown", true, true);
	target.dispatchEvent(e);
	e = document.createEvent("MouseEvents");
	e.initEvent("click", true, true);
	target.dispatchEvent(e);
	e = document.createEvent("MouseEvents");
	e.initEvent("mouseup", true, true);
	target.dispatchEvent(e);
	return target;
};

function doKeypress(target) {
	var e = document.createEvent("KeyboardEvent");
	e.initEvent("keypress", true, true, window, 0, 0, 0, 0, 0, "e".charCodeAt(0));
	target.dispatchEvent(e);
	return target;
};

function fuu(ed, post) {
	document.body.scrollIntoView(ed);
	if(ed.children[0].tagName == "DIV") return false;
	//Google+ creates an iframe for input on some browsers including Firefox.
	var frame = ed.querySelector("iframe");
	if(frame) {
		//The content in the frame is changing, and DOMNodeInserted won't work.
		//Use setInterval as workaround.
		var it = setInterval(function() {
			if(frame.contentDocument.body.classList.contains("editable")) {
				clearInterval(it);
				fuu(frame.contentDocument.body, post);
			}
		}, 100);
		return true;
	}
	var fuuText = localStorage.getItem("fuu") || "Fuu...";
	var fuuType = localStorage.getItem("fuu_type") || "text";
	if(fuuType == "html") {
		ed.innerHTML = fuuText;
	} else {
		ed.textContent = fuuText;
	}

	//"Input" something to enable the submit button.
	doKeypress(ed);
	var submit = post.querySelector(".a-f-e.c-b.c-b-fa");
	if(submit.getAttribute("aria-disabled") != "true") {
		doClick(submit);
	}
	else {
		//Webkit don't support DOMAttrModified.
		//Use setInterval as workaround.
		//Todo: use DOMAttrModified on supported browsers such as Firefox.
		var it = setInterval(function() {
			if(submit.getAttribute("aria-disabled") != "true") {
				clearInterval(it);
				doClick(submit);
			};
		}, 100);
	}
	return true;
}

function fuuShare(ed, post) {
	var fuuTextShare = localStorage.getItem("fuuShare") || "Automatically shared post.";
	var fuuTypeShare = localStorage.getItem("fuu_type_share") || "text";
	if(fuuTypeShare == "html") {
		ed.innerHTML = fuuTextShare;
	} else {
		ed.textContent = fuuTextShare;
	}

	//"Input" something to enable the submit button.
	doKeypress(ed);
	var submit = document.querySelector('div[class="a-f-e c-b c-b-fa g-J-yc g-J-yc-q"]');
	if(submit.getAttribute("aria-disabled") != "true") {
		doClick(submit);
	}
	else {
		//Webkit don't support DOMAttrModified.
		//Use setInterval as workaround.
		//Todo: use DOMAttrModified on supported browsers such as Firefox.
		var it = setInterval(function() {
			if(submit.getAttribute("aria-disabled") != "true") {
				clearInterval(it);
				doClick(submit);
			};
		}, 100);
	}
	return true;
}

//Find all toolbars in the node and append Fuu buttons.
function processPosts(node) {
	if(!node || !node.querySelector) return;
	var r = document.evaluate('descendant-or-self::div[@class="BE"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < r.snapshotLength; i++) {
		var bar = r.snapshotItem(i);
		if(bar.hasAttribute("data-ext-fuu")) return;
		var button = document.createElement("span");
		button.textContent = "Fuu...";
		button.setAttribute("role", "button");
		button.setAttribute("class", "kp wk Fuu");
		button.setAttribute("id", "FuuComment");
		bar.appendChild(button);
		button.addEventListener("click", onFuuClick);
		button.addEventListener("contextmenu", changeFuuText);
		bar.setAttribute("data-ext-fuu", "buttonInserted");
	}
	delete r;
}

var buttonShare = document.createElement("span");
var barShare = document.querySelector('div[class="xSV8Af"]');
buttonShare.textContent = "Auto Post";
buttonShare.setAttribute("role", "button");
buttonShare.setAttribute("class", "kp wk Fuu");
buttonShare.setAttribute("id", "fuuShare");
barShare.appendChild(buttonShare);
buttonShare.addEventListener("click", fuuShareClick);
buttonShare.addEventListener("contextmenu", changeFuuTextShare);

//First process of the toolbars
processPosts(document.body);

//Handle newly added posts
document.body.addEventListener('DOMNodeInserted', function(e) {
	if(!e) e = event;
	processPosts(e.target);
}, false);

function onFuuClick() {
	if(this.fuued) {
		if(confirm("It seems that you have already commented on this post. Continue anyway?")) {
			this.fuued = false;
		} else {
			return;
		}
	}
	//Get the post of the toolbar (this).
	var post = this.parentElement.parentElement.parentElement;
	var that = this;
	doClick(post.querySelector(".Qj.LB"));
	var ed = post.querySelector(".editable");
	if (ed) {
		this.fuued = fuu(ed, post);
	}
	else {
		//The box into which the editor will be appended
		var box = post.querySelector(".i-u-g-U-Lb");
		var onNodeInserted = function(e) {
			if(!e) e = event;
			if(that.fuued || !e.target.querySelector) return;
			var ed = e.target.querySelector(".editable");
			if(!ed) {
				ed = e.target.parentElement;
				if(!ed.classList.contains("editable")) return;
			}
			if(fuu(ed, post)) {
				that.fuued = true;
				//For performance, remove the listener once succeeded.
				box.removeEventListener("DOMNodeInserted", onNodeInserted, false);
			}
		}
		box.addEventListener("DOMNodeInserted", onNodeInserted, false);
	}
}

function fuuShareClick() {
	var post = this.parentElement.parentElement.parentElement;
	var that = this;
	doClick(post.querySelector(".g-as"));
	var ed = post.querySelector(".editable");
	if (ed) {
		this.fuued = fuuShare(ed, post);
	}
	else {
		//The box into which the editor will be appended
		var box = post.querySelector(".i-u-g-U-Lb");
		var onNodeInserted = function(e) {
			if(!e) e = event;
			if(that.fuued || !e.target.querySelector) return;
			var ed = e.target.querySelector(".editable");
			if(!ed) {
				ed = e.target.parentElement;
				if(!ed.classList.contains("editable")) return;
			}
			if(fuuShare(ed, post)) {
				that.fuued = true;
				//For performance, remove the listener once succeeded.
				box.removeEventListener("DOMNodeInserted", onNodeInserted, false);
			}
		}
		box.addEventListener("DOMNodeInserted", onNodeInserted, false);
	}
}

//Use localStorage to store the text.
//Todo: Support HTML.
function changeFuuText(e) {
	if(!e) e = event;
	e.preventDefault();
	var fuu = localStorage.getItem("fuu") || "Fuu...";
	var fuuType = localStorage.getItem("fuu_type") || "text";
	var fuuTypeDisp = {
		"text": "text",
		"html": "HTML code"
	};
	var result = null;
	do {
		result = window.prompt("Please enter the content you wish to send: \n PS: Leave the TextBox blank to switch between text mode and HTML code mode.", fuu);
		if(result == null) return;
		if(result.length > 0) break;
		fuuType = (fuuType == "text") ? "html" : "text";
	} while(true);

	localStorage.setItem("fuu", result);
	localStorage.setItem("fuu_type", fuuType);
};

function changeFuuTextShare(e) {
	if(!e) e = event;
	e.preventDefault();
	var fuuShare = localStorage.getItem("fuuShare") || "Automatically shared post.";
	var fuuTypeShare = localStorage.getItem("fuu_type_share") || "text";
	var fuuTypeDisp = {
		"text": "text",
		"html": "HTML code"
	};
	var result = null;
	do {
		result = window.prompt("Please enter the content of your post to share: \n PS: Leave the TextBox blank to switch between text mode and HTML code mode.", fuuShare);
		if(result == null) return;
		if(result.length > 0) break;
		fuuTypeShare = (fuuTypeShare == "text") ? "html" : "text";
	} while(true);

	localStorage.setItem("fuuShare", result);
	localStorage.setItem("fuu_type_share", fuuTypeShare);
};