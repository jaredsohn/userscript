// ScriptLance Tools
// version 0.1.1
// 2009-11-23
// Copyright (c) 2009, Josh Merritt
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Link Tree", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ScriptLance Tools
// @namespace     http://www.simplesolutionweb.com
// @description   Adds functionality to scriptlance.com: Hide project
// @include       http://www.scriptlance.com*
// @include       https://www.scriptlance.com*
// ==/UserScript==

window.setTimeout(function() {

var hiddenprojects = GM_getValue("hiddenprojects", "").split(",");
var maxHiddenProjects = 500;

//alert(hiddenprojects.join(","));

var tags = document.getElementsByTagName("tr");

for (var i = 0; i < tags.length; i ++) {
	if (tags[i].childNodes.length) {

		for (var j = 0; j < tags[i].childNodes.length; j ++) {
			var d = tags[i].childNodes[j];
			if (tags[i].childNodes[j].childNodes[0] && tags[i].childNodes[j].childNodes[0].nodeName == "A") {
				var anchorNode = tags[i].childNodes[j].childNodes[0];
				var href = tags[i].childNodes[j].childNodes[0].href;
				var p = -1;
				if ((p = href.indexOf("/projects/")) != -1) {
					var id = href.substr(p + 10);
					var id = id.substr(0, id.indexOf(".shtml"));
					
					if (projectHidden(id)) {
						hideProject(tags[i]); 
						hideProject(tags[i + 1]); 
					} else {
						var hideD = document.createElement('a');
						hideD.innerHTML = "HIDE";
						hideD.href = "#";
						setStyleAttributes(hideD, "font-size:75%;padding-left:8px;color:#307de8;")
						hideD.id = "hide" + id;
						hideD.addEventListener('click',  function (e) {

							hiddenprojects[hiddenprojects.length] = this.id.substr(4);

							while (hiddenprojects.length > maxHiddenProjects) {
								hiddenprojects.shift();
							}

							GM_setValue("hiddenprojects", hiddenprojects.join(","));

							hideProject(this.parentNode.parentNode);
							hideProject(getNextSibling(this.parentNode.parentNode));

							e.cancelBubble = true;
							e.preventDefault();
						}, true);

						tags[i].childNodes[j].appendChild(hideD);
					}
				}
			}
		}

	}
}

function getNextSibling(startBrother) {
	endBrother = startBrother.nextSibling;
	while (endBrother && endBrother.nodeName != startBrother.nodeName) {
		endBrother = endBrother.nextSibling;
	}
	if (!endBrother) {
		return false;
	}
	return endBrother;
} 

function projectHidden(id) {
	for (var i = 0; i < hiddenprojects.length; i ++) {
		if (hiddenprojects[i] == id) return true;
	}
	return false;
}

function hideProject(d) {
	if (!d) return;
	for (var i = 0; i < d.childNodes.length; i++) {
		if (d.childNodes[i].childNodes) { hideProject(d.childNodes[i]); }
	}
	if (d.style) { d.style.display = "none"; }
};


function setStyleAttributes(d, attr) {
	attr = attr.split(";");
	for (var i = 0; i < attr.length; i++) {
		if (attr[i] != "") {
			var t = attr[i].split(":");
			var varName = t[0].split("-");
			for (var j = 1; j < varName.length; j++) {
				var f = varName[j].charAt(0).toUpperCase();
				varName[j] = f + varName[j].substr(1, varName[j].length - 1);
			}
			varName = varName.join("");
			if (varName == "float") {
				d.style.cssFloat = t[1];
				d.style.styleFloat = t[1];
			} else {
				d.style[varName] = t[1];
			}
		}
	}
};

function debugObject(n, ob) {
	if (typeof(ob) == "object") {
		var txt = Array();
		for (var i in ob) {
			txt[txt.length] = i + "=" + ob[i];
		}
		GM_log(n + " (" + typeof(ob) + " [" + ob.length + "]): " + ob + " = " + txt.join("   "));
	}
	GM_log(n + " (" + typeof(ob) + " [" + ob.length + "]): " + ob);
}

}, 50);