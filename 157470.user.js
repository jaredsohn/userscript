// ==UserScript==
// @name          Google Reader - Mark Selected Items as Read
// @version       1.1.1
// @namespace     http://twitter.com/rodiontsev
// @description   This script adds the button "Mark selected as read" and a checkbox for an each item
// @author        Dmitry Rodiontsev
// @include       htt*://www.google.tld/reader/view/*
// ==/UserScript==

/*
Version history

1.0 on 10/01/2009:
    - Initial version
1.1 on 11/01/2011:
    - Add support for a new look
1.1.1 on 11/22/2011:
    - Vertical alignment of checkboxes
*/


var buttonText = "Mark selected as read";
var buttonId = "mark-selected-as-read";
var articles = new Array();

document.addEventListener("DOMNodeInserted", function(event){nodeInserted(event);}, true);

function nodeInserted(event) {
    var entries = document.getElementById("entries");
    if (entries && matchClass(entries, "list")) {
        var button = document.getElementById(buttonId);
        if (!button) {
            articles = new Array();
            appendButton();
        }
        
        var element = event.target;
        if (element. className && element.className.match(/entry\s+entry-\d+/) != null) {
            articles.push(element);
            
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "mark-selected-as-read-checkbox-class";
            checkbox.style.marginRight = "9px";
            checkbox.style.verticalAlign = "middle";
            checkbox.addEventListener("click", function(event) {event.stopPropagation();}, true);
            var entrySecondary = element.getElementsByClassName("entry-secondary")[0];
            entrySecondary.insertBefore(checkbox, entrySecondary.firstChild);
        }
    }
}

function appendButton() {
    var viewerTopControlsId = "viewer-top-controls";
    var markAllAsReadId = "mark-all-as-read-split-button";

    var divVewerTopControls = document.getElementById(viewerTopControlsId);
    var btnMarkAllAsRead = document.getElementById(markAllAsReadId);

    if ((divVewerTopControls != null) && (btnMarkAllAsRead != null)) {
        var button = document.createElement("div");
        button.setAttribute("role", "button");
        button.className = "goog-inline-block jfk-button jfk-button-standard viewer-buttons goog-button-float-left";
        button.id = buttonId;
        button.innerHTML = "<div class=\"goog-inline-block goog-flat-menu-button-caption\">" + buttonText + "</div>";
        button.addEventListener("click", markSelectedAsRead, false);
        button.addEventListener("mouseover", function(event) {switchClass(button, "jfk-button-hover", "");}, false);
        button.addEventListener("mouseout", function(event) {switchClass(button, "", "jfk-button-hover");}, false);
        divVewerTopControls.insertBefore(button, btnMarkAllAsRead);
    }
}

function matchClass (element, sClassName) {
    return (sClassName
         && element.className
         && element.className.length
         && element.className.match(new RegExp("(^|\\s+)(" + sClassName +")($|\\s+)")));
}

function switchClass(element, sClassName, sInstead) {
	if (matchClass(element, sClassName)) {
		setClass(element, sInstead, sClassName);
	}else{
		setClass(element, sClassName, sInstead);
	}
}

function setClass(element, sClassName, sInstead) {
	if (element && element.className != null) {
		sClassName = (sClassName.length) ? sClassName.replace(/(^\s+|\s+$)/, "") : "";
		if(element.className.length) {
			var sOld = sClassName;
			if (sInstead && sInstead.length) {
				sInstead = sInstead.replace(/\s+(\S)/g, "|$1");
				if (sOld) {
					sOld += "|";
				}
				sOld += sInstead;
			}
			element.className = element.className.replace(new RegExp("(^|\\s+)(" + sOld +")($|\\s+)", "g"), "$1");
		}
		element.className += (element.className.length && sClassName ? " " : "") + sClassName;
	}
}

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");
   event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
   node.dispatchEvent(event);
}

function simulateKeypress(node, keyCode) {
    var event = node.ownerDocument.createEvent("KeyboardEvent");
    event.initKeyEvent("keypress", true, true, null, false, false, false, false, keyCode, 0);
    node.dispatchEvent(event);
}

function simulateRead(node) {
    simulateKeypress(node, 77); //"m" button - mark entry as read.
}

function simulateCollapse(node) {
    simulateKeypress(node, 79); //"o" button - expand/collapse entry.
}

function getArticleIcon(article) {
    var divs = article.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        if (matchClass(div, "entry-icons")) return div;
    }
    return null;
}

function markSelectedAsRead() {
    var container = document.getElementById("entries");
    container.style.display = "none";
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var checkbox = article.getElementsByTagName("input")[0];
        if (checkbox.checked) {
            if (!(matchClass(article, "read"))) {
                var articleIcon = getArticleIcon(article);
                simulateClick(articleIcon);
                if (!(matchClass(article, "read"))) {
                    simulateRead(articleIcon);
                }
                if (matchClass(article, "expanded")) {
                    simulateCollapse(articleIcon);
                }
            }
            checkbox.checked = false;
        }
    }
    container.style.display = "block";
}
