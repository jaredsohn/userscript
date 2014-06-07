// ==UserScript==

// @name          Wikipedia Article Mode (automatic)
// @namespace      tag:leskets@web.de,2007-10-23:UserScripts
// @description   Toggle between article-mode and normal mode by moving the mouse to the left border or into the article, respectively. Force normal mode by the keyboard shortcut Ctrl+Alt+F.

// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// @include       https://secure.wikimedia.org/wikipedia/*/wiki/*
// @include       http://www.scholarpedia.org/*
// @include       http://www.wikiweise.de/*
// @include       http://www.conservapedia.com/*
// @include       http://www.wikinfo.org/*
// @include       http://athpedia.de/*
// @include       http://www.kathpedia.com/*
// @include       http://en.citizendium.org/*
// @include       http://www.esowatch.com/*
// @include       http://plato.stanford.edu/*
// @include       http://*.wikisource.org/*
// @include       http://*.metapedia.org/*
// @include       http://*.anarchopedia.org/*
// @include       http://creationwiki.org/*
// @include       http://evolutionwiki.org/*
// @include       http://www.sourcewatch.org/*
// @include       http://www.powerbase.info/*
// @include       http://www.lobbypedia.de/*
// @include       http://rationalwiki.org/*
//
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// @version       1.4
// ==/UserScript==
// improvements in 1.4:
//  - added @grant
//  - support overlay for mediawikis
// improvements over version 1.2:
//  - added: https://*.wikipedia.org/*
// improvements over version 1.1:
//  - support Chrome (Thanks to Ashok Koyi for sending me a patch)
//  - The search box is only enabled when clicking the top area.
//    This avoids some issues, because disabling the search box does 
//    not recover the previous state accurately.

/* Modifications to this script is permitted provided this comment is retained in its entirety.

 * Copyright: Gautham Pai

 * Author: Gautham Pai

 * http://buzypi.in/

 */
/*
  Original name of the script: Wikipedia Article Mode
  modified by Thomas Leske 2010
*/

// add the missing GM_*-functions for the browser Chrome:
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

// var enableSearchBoxSwitching = true;

var fullscreenShown = true;
var stickyFullscreen = false;

var host = window.location.host;
var contentID = (host == 'www.wikiweise.de')
    ? "div-maincontent"
    : ((host == 'www.britannica.com') 
       ? "bps-content-panel-body"
       : "content");

if (host == 'www.wikiweise.de') {
    inner = document.getElementById("div-maincontent-inner-default");
    inner.setAttribute("style", "max-width: none;")
}

var content = document.getElementById(contentID);

var usecss = !(host == 'www.wikiweise.de' || host == 'en.citizendium.org' || host == 'www.britannica.com' || host == 'plato.stanford.edu' || host == 'www.conservapedia.com' || host == 'www.wikinfo.org' || host == 'athpedia.de' || host == "www.kathpedia.com" || host == "www.encyclopaediagermanica.com" || host.substring(2,host.length) == '.metapedia.org' || host.substring(3,host.length) == '.anarchopedia.org' || host == 'creationwiki.org' || host == 'www.powerbase.info' || host == 'www.lobbypedia.de')

function setDisplayStyle(element_ID, displayStyle) {
  var element = document.getElementById(element_ID);
  if (element) {
      if (!element.style || !element.style.display) {
	  var style = document.createAttribute("style");
	  style.nodeValue = "display: none;";
	  element.setAttributeNode(style);
      }
      element.style.display = displayStyle;
  }
}

function getBorderSize() {
    return GM_getValue("borderSize", '0');
}

var savedAttributeNode;

function adjustBorders() {
    var style = document.createAttribute("style");
    var borderSize = getBorderSize();
    style.nodeValue = "margin-left:" + borderSize + "em; margin-right:" + borderSize + "em";
    content.setAttributeNode(style);
}

function switchTo(fullScreen){
	var displayStyle = (fullScreen)
	    ? '' 
	    : 'none';

	if (content) {
	    if (fullScreen && !usecss) {
		if (savedAttributeNode) {
		    content.setAttributeNode(savedAttributeNode);
		} else {
		    content.removeAttribute("style");
		}
	    } else {
		savedAttributeNode = content.getAttributeNode("style");
		adjustBorders();
	    }
	}

    if (!usecss) {
	  var IDs = [
		   // Wikipedia (should use css):
		   "mw-panel", "mw-head", "footer", 
		   "mw-head-base", "mw-page-base", 
		   // 'www.scholarpedia.org':
		   "column-one",
		   // 'www.wikiweise.de':
		   "div-header-image", "div-footer", "div-sidemenu-frame",
		   "div-logininfo", "div-toolbar",
		   // 'en.citizendium.org'
	      "topcorners", "p-cactions", "p-personal", "p-search", "siteNotice",
		   // 'www.newworldencyclopedia.org' 
		   "p-logo",
		   // 'www.britannica.com'
		   "bps-header-search", "bps-header", "bps-footer2",
		   "bps-sidebar",  "bps-sidebar-content-container", "bps-footer-bottom2",
		   "bps-browse-dialog",
		   // 'plato.stanford.edu'
		   "navmenu", "pagetopleft", "pagetopright",
		   ];

	  for (var id_num = 0; id_num < IDs.length; id_num++) {
	      setDisplayStyle(IDs[id_num], displayStyle);
	  }
        }
	fullscreenShown = fullScreen;
}

function switchToFullScreen() {
   switchTo(true);
}

function switchToArticleMode() {
   switchTo(false);
}

function toggleStickyFullscreen() {
    if (!stickyFullscreen && !fullscreenShown) {
        switchToFullScreen();
    }
    stickyFullscreen = !stickyFullscreen;
}


function keyPressEvent(event) {
    var kcode = (event.keyCode) 
	? event.keyCode 
	: event.which;
    var ctrlKeyPressed = event.ctrlKey;
    var altKeyPressed  = event.altKey;
    var key = String.fromCharCode(kcode);

    if (ctrlKeyPressed && altKeyPressed && (key == 'f' || key == 'F')) {
	toggleStickyFullscreen();
    } else if (!ctrlKeyPressed && altKeyPressed && (key == "+" || key == "-")) {
	if (fullscreenShown) {
	    stickyFullscreen = false;
	    showArticleOnly(true);
	} else if (content) {
	    var borderSize = parseInt(getBorderSize());
	    if (key == "+") {
		borderSize = borderSize + 1;
	    } else if (borderSize != 0) {
		borderSize = borderSize - 1;
	    }
	    GM_setValue("borderSize", borderSize);
	    adjustBorders();
	}
    }
} 

document.addEventListener("keypress", keyPressEvent, true);

function deselect(element) {
          var temptext = element.value;
          element.value = "";
          element.value = temptext;
}

function showArticleOnly(enableSearchBoxSwitching) {
    if (fullscreenShown && !stickyFullscreen) {
        switchToArticleMode();
	if (enableSearchBoxSwitching) {	    
	    var searchbox = document.getElementById('searchInput');
	    if (searchbox) {
	      deselect(searchbox);
	      searchbox.blur();
	    }
	}
    }
}

function getPageX(event) {
    if (!event) {
	event = window.event;
    }
    return event.pageX ? event.pageX : event.clientX;
}

function getPageY(event) {
    if (!event) {
	event = window.event;
    }
    return event.pageY ? event.pageY : event.clientY;
}

showArticleOnly(false);

function showArticleWaitingToSwitchBack (enableSearchBoxSwitching) {
    var enableSearchBoxSwitching_tmp = enableSearchBoxSwitching;
    if (!fullscreenShown) {
        switchToFullScreen();

	if (content) {
            var handleMouseOverArticle = function (event) {
               showArticleOnly(true);
	    }
	    content.addEventListener("mouseover", handleMouseOverArticle, true);
	}
	if (enableSearchBoxSwitching) {
	    var searchbox = document.getElementById('searchInput');
	    if (searchbox) {
		searchbox.focus();
		searchbox.select();
	    }
	}
    }
}

var inner_border =  20;

function handleMove (event) {
  if (getPageX(event) < inner_border) {
      showArticleWaitingToSwitchBack (false);
  }
}

function handleClick (event) {
  if (getPageY(event) < inner_border) {
      showArticleWaitingToSwitchBack (true);
  }
}

document.addEventListener("mousemove", handleMove, true);
document.addEventListener("mouseup", handleClick, true);

if (usecss) {
GM_addStyle("\
#footer, #mw-head-base, #mw-page-base {\
    display: none !important;\
}\
\
#mw-head:hover {\
    overflow: visible !important;\
    height: auto !important;\
    opacity: 0.95;\
}\
\
#mw-head {\
    top: 0 !important;\
    left: 0 !important;\
    overflow: hidden !important;\
    position: fixed !important;\
    right: 0 !important;\
    height: 20px !important;\
    z-index: 10000;\
    opacity: 0;\
    background-color: menu !important;\
}\
\
#mw-panel:hover {\
    overflow: auto !important;\
    opacity: 0.95;\
    width:auto !important;\
}\
\
#mw-panel {\
    top: 0 !important;\
    bottom: 0 !important;\
    overflow: hidden !important;\
    position: fixed !important;\
    left: 0 !important;\
    width:20px !important;\
    z-index: 21000;\
    opacity: 0;\
    background-color: menu !important;\
}\
")
}

GM_addStyle("\
#toc:hover {\
    overflow: scroll !important;\
    opacity: 0.95;\
    width: auto !important;\
    left: auto !important;\
    max-height: 100% !important;\
}\
\
#toc {\
    top: 0 !important;\
    overflow: hidden !important;\
    position: fixed !important;\
    width: 20px !important;\
    left: 99% !important;\
    right: 0 !important;\
    z-index: 20000;\
    opacity: 0;\
    background-color: menu !important;\
}\
")
