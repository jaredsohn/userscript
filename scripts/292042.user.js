// ==UserScript==
// @name       Facebook completely without right bar
// @version    1.0
// @author     Mario Stief
// @description  kills the ad bar and resizes the other content
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

var zGbl_DOM_ChangeTimer = '';
var bGbl_ChangeEventListenerInstalled   = false;
window.addEventListener ("load", MainAction, false);

function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    var cssHideElements = ["#rightCol", ".ego_column", ".ego_column", ".egoOrganicColumn", ".rhcFooterWrap", ".escapeHatchMinimal", "._4__g", "#pageFooter"];
    var leftCol = document.getElementById("leftCol").offsetWidth;
    var contentArea = document.getElementById("contentArea").offsetWidth;
    contentArea = document.body.offsetWidth - leftCol - 205;
    
    if (leftCol == 0) {
        var leftMessageSize = document.getElementById("contentCol").firstChild.firstChild.firstChild.firstChild.firstChild.offsetWidth;
        var contentSize = (document.body.offsetWidth - leftMessageSize - 208);
        document.getElementById("contentCol").firstChild.firstChild.firstChild.firstChild.children[1].style.width = contentSize + "px";
        document.getElementById("contentCol").firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children[3].children[3].style.width = contentSize + "px";
        document.getElementById("contentCol").firstChild.firstChild.firstChild.firstChild.children[1].firstChild.children[3].children[3].firstChild.children[1].style.width = contentSize + "px";
    }
    
    var additionalPrefs = "#mainContainer {" +
    	    "width: " + (document.body.offsetWidth - 205) + "px; " +
        "} " +
        ".hasLeftCol .homeWiderContent div#contentArea {" +
        	"width: " + (contentArea-45) + "px; " +
        "} " +
        "._4rw .hasRightCol #contentArea, ._4rw #contentArea {" +
        	"width: " + (document.body.offsetWidth - 205) + "px; " +
        "} " +
        "#globalContainer, .fbx #globalContainer, .sidebarMode #globalContainer {" +
        	"width: " + (leftCol + contentArea) + "px; " + 
        "} " +
        ".fbChatSidebar {" +
        	"display: block; " +
        "} ";
    
    var css = cssHideElements.join(", ") + " {display: none;} " + additionalPrefs;
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.body.appendChild(style);
}

function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer  = setTimeout (function() { MainAction (); }, 222);
}