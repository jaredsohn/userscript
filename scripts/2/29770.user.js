// ==UserScript==
// @name           My Red Book
// @namespace      myredbook
// @include        http://forum.myredbook.com/forum/*
// @version        1.4
// @description  preview images on  myredbook.com forums. Inspiration from craigslist image review script.
// Updated - No Images appear after the link
// Image links go to the posting instead of the images them selves.
// Use right arrow key to goto next page
// Use left arrow key to goto previous page
// ==/UserScript==

var DEBUG = false;
var CROSS_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADlQTFRF9dHQ9c%2FNzY6M6omFzIiG7qmn8b27zZKQy4SC%2B%2Bvr8LWz6YB8yXBsy398zpWTubiw53Jsr09KubiwvyfdVwAAABN0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FALJ93AgAAABeSURBVHjaTI5LFsAgCANRa7X%2BMNz%2FsDXaRVkMyYJ5iP1GzAAGUgxjrL25Sno84J%2FEorjEObmgvFHcpdwrsxjqnBWfrYVaQzu2HhvQYt%2B23KGKno%2BNt5u0KT8gXwEGAI7%2BCF1IF5YoAAAAAElFTkSuQmCC';
var PLUS_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRQTFRF%2B%2Fz45%2BzQ8vTm2ueh5u6%2FwMul6u7VuMaM8fPjubiwnKx0ubiwNJApsQAAAAx0Uk5T%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8AEt%2FOzgAAADVJREFUeNpMy7kNACAQxMDjZ7399wtHRDay5LAN2JGIBxh1wMWeZe4Eq60sEh0p%2FkuSfQQYAFJDAk7RnqvNAAAAAElFTkSuQmCC';
var _inFocusLink = "#";
/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
    var e = document.createElement(tag);
    if (on) on.appendChild(e);
    return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
    var e = document.createTextNode(text);
    if (on) on.appendChild(e);
    return e;
}

function insertAfter(newNode,target) {
    var parent   = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild) parent.insertBefore(newNode, refChild);
    else parent.appendChild(newNode);
}

function block(event){
    if(confirm("Block images for " + event.target.id + " ?")==true){
        GM_setValue(event.target.id, "removed");
        alert("Blocked - you won't see those images from next time");
    }

}

function unblock(event){
    if(confirm("Unblock images for " + event.target.id + " ?")==true){
        GM_setValue(event.target.id, "");
    }
    alert("Refresh page to see images");
}

function addImgButton(node, func, src, title, providerId){
    img = $n("img", node);
    img.id = providerId;
    img.src = src;
    img.style.border = 0;
    img.style.cursor = "pointer";
    img.title = title;
    img.addEventListener("click", func, true);
}

var cnt=0;
function newFunction(_a) {
    var a = _a;
    return function(details) {
        if (details.responseText) {

            if (m = details.responseText.match(/img src=\"([^\"]+)\"/gi)) {

                //
                // Go thru the links
                // td will hold the new td below the links parent
                //
                var td;
                var cnt = 0;
                for (var j=0; j<m.length; j++) {
                    s = m[j];
                    if (!s) continue;
                    if(s.match("\"/images/")|| s.match(/.*\/dcforum2\/Images\/.*/)) continue;
                    // basically a hack, but I thought this would return  an array
                    s = s.replace(/img src=/g,"");
                    s = s.replace(/\"/g,"");
                    //
                    // For the first time create the td to hold the links
                    //
                    if (!td) {
                        var tr = a.parentNode.parentNode;                        
                        tr.bgColor = "#EEEEEE";
                        var newTr = $n("tr");
                        insertAfter(newTr, tr);
                        var td = $n("td", newTr);
                        td.addEventListener('mouseover', function(event) {_inFocusLink = a;}, false);                        
                        td.colSpan = 5;
                        //add link for removing the provider
                        var icons = tr.getElementsByTagName("img");
                        var heartIcon = icons[1];
                        if(heartIcon){
                            var providerId = heartIcon.previousSibling.nodeValue;
                            if(GM_getValue(providerId)){
                                addImgButton(heartIcon.parentNode, unblock, PLUS_IMG, "Unblock images from this provider", providerId);
                                tr.bgColor = "#ffdddd";
                                return;
                            }
                            addImgButton(heartIcon.parentNode, block, CROSS_IMG, "Block images for this provider", providerId);
                        }
                    }
                    //
                    // Add images to td. Clicking on image will go to ad.
                    //
                    var newA = $n("a",td);
                    var img = $n("img",newA);
                    //img.className = CLASS;
                    img.src = s;
                    newA.href = a;
                    //newA.addEventListener('focus', function(event){alert(a);_inFocusLink = a;}, true); 
                    
                    $t(" ",td);
                }
            }
        }
    };
}

function showImages() {
    //
    // find all the links to listings and display the images
    //
    links = document.getElementsByTagName("a");
    for (i=0; i<links.length; i++) {
        link = links[i];
        if (link.firstChild.nodeName == "IMG" && link.href) {
            GM_xmlhttpRequest({
                method:"GET",
                url: link.href,
                headers:{
                    "User-Agent": "monkeyagent",
                    "Accept":"text/html,text/monkey,text/xml,text/plain",
                },
                onload: newFunction(link)
            });
        }
    }
}

function keyHandler(e){
    //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var evtobj=window.event? event : e 
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode;
    var actualkey=String.fromCharCode(unicode);
    //alert(actualkey);
    var loc = document.location + "";
    if(actualkey == "'"){ //right arrow - go next page
        if(loc.match('&mm=(\\d)')){
            document.location = loc.replace(/&mm=(\d+)/, "&mm=" + (RegExp.$1*1 + 1));
        }else{
            document.location = loc + "&mm=2";            
        }
        return true;
    }else if (actualkey == "%"){ //left arrow - go back
        history.go(-1);
        return true; 
    }else if (actualkey =="0"){ //0 "clicks" the link"
        document.location = _inFocusLink;
        return true;
    }
    return false;
}
    
function main() {
    //register key handler
    document.addEventListener("keypress", keyHandler, true);    
    showImages();
}

try {main();} catch (e) { if (DEBUG) alert(e); }
