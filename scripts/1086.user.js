/*
	This is a port of Stuart Langridge's Nice Titles to Greasemonkey.
	
	See http://www.kryogenix.org/code/browser/nicetitle/ for the original
	
	The main differences between this and the original are
	
	1. Removed the browser detection code - we are always in Firefox
	2. Added a 1/2 second delay to the display of the title.  I think it's nicer that way.
	
	Gareth Simpson (http://xurble.org/)
		

*/

// ==UserScript==
// @name            Nice Titles
// @namespace       http://xurble.org/userscripts
// @description     Displays Nice Titles as seen at http://www.kryogenix.org/code/browser/nicetitle/
// @include         *
// ==/UserScript==
(function () {



var XHTMLNS = "http://www.w3.org/1999/xhtml";
var CURRENT_NICE_TITLE;
var evt;
var tmr;

function makeNiceTitles() {
    if (!document.createElement || !document.getElementsByTagName) return;
    // add namespace methods to HTML DOM; this makes the script work in both
    // HTML and XML contexts.
    if(!document.createElementNS)
    {
        document.createElementNS = function(ns,elt) {
            return document.createElement(elt);
        }
    }

    if( !document.links )
    {
        document.links = document.getElementsByTagName("a");
    }
    for (var ti=0;ti<document.links.length;ti++) {
        var lnk = document.links[ti];
        if (lnk.title) {
            lnk.setAttribute("nicetitle",lnk.title);

	          lnk.removeAttribute("title");
		        addEvent(lnk,"mouseover",showNiceTitle);
		        addEvent(lnk,"mouseout",hideNiceTitle);
		        addEvent(lnk,"focus",showNiceTitle);
		        addEvent(lnk,"blur",hideNiceTitle);
        }
    }
    var instags = document.getElementsByTagName("ins");
    if (instags) {
    for (var ti=0;ti<instags.length;ti++) {
        var instag = instags[ti];
        if (instag.dateTime) {
            var strDate = instag.dateTime;
            var dtIns = new Date(strDate.substring(0,4),parseInt(strDate.substring(4,6)-1),strDate.substring(6,8),strDate.substring(9,11),strDate.substring(11,13),strDate.substring(13,15));
            instag.setAttribute("nicetitle","Added on "+dtIns.toString());
            addEvent(instag,"mouseover",showNiceTitle);
            addEvent(instag,"mouseout",hideNiceTitle);
            addEvent(instag,"focus",showNiceTitle);
            addEvent(instag,"blur",hideNiceTitle);
        }
    }
    }
}

function findPosition( oLink ) {
  if( oLink.offsetParent ) {
    for( var posX = 0, posY = 0; oLink.offsetParent; oLink = oLink.offsetParent ) {
      posX += oLink.offsetLeft;
      posY += oLink.offsetTop;
    }
    return [ posX, posY ];
  } else {
    return [ oLink.x, oLink.y ];
  }
}

function clearTimer()
{
	if(tmr != null)
	{
		clearTimeout(tmr);
		tmr = null;
	}
}


// Hmmm stopped working in GM3.3
// Now working as per http://www.diveintogreasemonkey.org/helloworld/code.html
window.showNiceTitle2 = function() {
    if (CURRENT_NICE_TITLE) hideNiceTitle(CURRENT_NICE_TITLE);
    if (!document.getElementsByTagName) return;
    if (window.event && window.event.srcElement) {
        lnk = window.event.srcElement;
    } else if (evt && evt.target) {
        lnk = evt.target;
    }
    if (!lnk) return;
    if (lnk.nodeType == 3) {
        // lnk is a textnode -- ascend parents until we hit a link
        lnk = getParent(lnk,"A");
    }
    if (!lnk) return;
    nicetitle = lnk.getAttribute("nicetitle");
    
    var baseStyle = "background-color:#aaa;position: absolute;z-index:999;padding: 4px;top: 0px;left: 0px;color: white;font-size: 13px;font-family: Verdana, Helvetica, Arial, sans-serif;width: 25em;font-weight: bold;-moz-border-radius: 10px;opacity:.9;"
    var pStyle = "margin: 0; padding: 0 3px 0 0;";
    var destStyle = "font-size:9px;text-align: left;padding:0;";
    
    var d = document.createElementNS(XHTMLNS,"div");
    //d.className = "nicetitle";
    d.setAttribute("style",baseStyle);
    tnt = document.createTextNode(nicetitle);
    pat = document.createElementNS(XHTMLNS,"p");
    pat.setAttribute("style",pStyle);
    pat.className = "titletext";
    pat.appendChild(tnt);
    d.appendChild(pat);
    if (lnk.href) {
        tnd = document.createTextNode(lnk.href);
        pad = document.createElementNS(XHTMLNS,"p");
        //pad.className = "destination";
		    pad.setAttribute("style",destStyle);
        pad.appendChild(tnd);
        d.appendChild(pad);
    }
    
    STD_WIDTH = 300;
    if (lnk.href) {
        h = lnk.href.length;
    } else { h = nicetitle.length; }
    if (nicetitle.length) {
      t = nicetitle.length;
    }
    h_pixels = h*6; t_pixels = t*10;
    
    if (h_pixels > STD_WIDTH) {
        w = h_pixels;
    } else if ((STD_WIDTH>t_pixels) && (t_pixels>h_pixels)) {
        w = t_pixels;
    } else if ((STD_WIDTH>t_pixels) && (h_pixels>t_pixels)) {
        w = h_pixels;
    } else {
        w = STD_WIDTH;
    }
        
    d.style.width = w + 'px';    

    /*
    mx = lnk.offsetLeft;
    my = lnk.offsetTop;
    */
    mpos = findPosition(lnk);
    mx = mpos[0];
    my = mpos[1];
    //xy = getMousePosition(e);
    //mx = xy[0]; my = xy[1];
    
    d.style.left = (mx+15) + 'px';
    d.style.top = (my+35) + 'px';
    if (window.innerWidth && ((mx+w) > window.innerWidth)) {
        d.style.left = (window.innerWidth - w - 25) + "px";
    }
    if (document.body.scrollWidth && ((mx+w) > document.body.scrollWidth)) {
        d.style.left = (document.body.scrollWidth - w - 25) + "px";
    }
    
    document.getElementsByTagName("body")[0].appendChild(d);
    
    CURRENT_NICE_TITLE = d;
}

function showNiceTitle(ex)
{
	evt = ex;
	clearTimer();
	tmr = window.setTimeout("showNiceTitle2()",500);
	
}

function hideNiceTitle(e) {
		clearTimer();
    if (!document.getElementsByTagName) return;
    if (CURRENT_NICE_TITLE) {
        document.getElementsByTagName("body")[0].removeChild(CURRENT_NICE_TITLE);
        CURRENT_NICE_TITLE = null;
    }
    
}

// Add an eventListener to browsers that can do it somehow.
// Originally by the amazing Scott Andrew.
function addEvent(obj, evType, fn){
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, true);
    return true;
  } else if (obj.attachEvent){
	var r = obj.attachEvent("on"+evType, fn);
    return r;
  } else {
	return false;
  }
}

function getParent(el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParent(el.parentNode, pTagName);
}

function getMousePosition(event) {
  x = event.clientX + window.scrollX;
  y = event.clientY + window.scrollY;
  return [x,y];
}


   // Actually do the work
	makeNiceTitles();
	
	

})();

