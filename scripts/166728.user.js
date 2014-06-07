// ==UserScript==
// @name       		Lazy Explosm
// @author			Janca
// @namespace  		com.janca.explosm
// @version    		0.2
// @description  	Gives you the ability to use your keyboard for actions on http://www.explosm.net/comics
// @match      		http://*explosm.net/comics*
// @copyright  		Fuck copyright
// ==/UserScript==

var prevRel = "prev";
var nextRel = "next";
var newestRel = "last";
var oldestRel = "first";
var randomHref = "/comics/random/";

function key_event(event) {
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent(('click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
    
    //window.alert(event.keyCode);
    
    switch(event.keyCode) {
        case 44:
            window.scrollTo(0, window.pageYOffset + 25);
            break;
            
        case 46:
            window.scrollTo(0, window.pageYOffset - 25);
            break;
            
        case 106: //j
            getRelElement(prevRel).dispatchEvent(mouseEvent);
            break;
            
        case 107: //k
            getRelElement(nextRel).dispatchEvent(mouseEvent);
            break; 
            
        case 110:
            getRelElement(newestRel).dispatchEvent(mouseEvent);
            break;
            
        case 111:
            getRelElement(oldestRel).dispatchEvent(mouseEvent);
            break;
            
        case 114: //r
            window.location.href="http://www.explosm.net/comics/random/";
            break;
            
    }
}

function getRelElement(name) {
    for(i = 0; i < pageElements.length; i++) {
        if(pageElements[i].hasAttribute("rel") && pageElements[i].rel == name) {
            return pageElements[i];
        }
    }
    return null;
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj == obj.offsetParent);
        return [curtop];
    }
}

function locateComic() {
    imgElements = document.getElementsByTagName("img");
    for(i = 0; i < imgElements.length; i++) {
        if(imgElements[i].src.indexOf("/db/files/") != -1) {
            window.scrollTo(0,findPos(imgElements[i]) - 20);
        }
    }
}


var pageElements = document.getElementsByTagName("a");
document.addEventListener("keypress", key_event, true);
locateComic();