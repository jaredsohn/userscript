// ==UserScript==
// @name           Classified
// @namespace      mybook
// @description    Redbook Classifieds browser
// @include        http://classifieds.myredbook.com/*
// @exclude        http://classifieds.myredbook.com/
// @version 1.3
// Added option to use either thumbnails or full images.
// Use right arrow key to goto next page
// Use left arrow key to goto previous page
// ==/UserScript==


// For full image change following variable to true;
var FULL_IMG = true;
var DELAY=2000;
var DEBUG = false;

function debug(str) {
    if(DEBUG) GM_log(str);
}
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

function hasImgNode(link){
    if (link.firstChild.nodeName == "IMG") return true;
    if (link.childNodes[1] && link.childNodes[1].nodeName == "IMG") return true;
    return false;
}
var cnt=0;
function newFunction(_a) {
    var a = _a;
    return function(details) {
        debug ("_LINKS.length " + _LINKS.length)
        if (details.responseText) {	
            var reg;
            var loc = document.location + "";				
            reg = /<img src=\"(uploads\/pix\/.+\.jpg)\" class=/gi;
            if (m = details.responseText.match(reg)) {
                //
                // Go thru the links
                // div will hold the new div below the links parent
                //
                var td;
                var cnt = 0;
                for (var j=0; j<m.length; j++) {
                    s = m[j];
                    if (!s) continue;
                    s = "/" + s.replace(reg,"$1");
                    if(FULL_IMG) s = s.replace("_","");
                    debug("matched img:" + s);
                    //
                    // For the first time create the div to hold the links
                    //
                    if (!td) {
                        var tr = a.parentNode.parentNode;
                        tr.bgColor = "#DDDDDD";
                        var newTr = $n("tr");
                        newTr.style.borderBottomStyle = "solid";
                        newTr.style.borderBottomWidth = "5px";
                        insertAfter(newTr, tr);
                        var td = $n("td", newTr);
                        td.colSpan = 5;
                    }
                    //
                    // Create the link and image and add them
                    //
                    var newA = $n("a",td);
                    var img = $n("img",newA);
                    img.className = "_c";
                    img.src = s;
                    //newA.href = a;
                    $t(" ",td);
                }
            }
        }
        debug ("_LINKS.length " + _LINKS.length)
    };
}

var _LINKS = [];
var _LINK_NUM = 0;
function showImages() {
    debug("ShowImages()");
    //remove side bar - very dependent of the dom layout.
    var tables = document.getElementsByTagName("table");
    for ( var i=0; i<tables.length;i++ ){tables[i].style.width="100%";}
    
    var table = tables[3];
    if (table){
        var tr = table.tBodies[0].rows[0];
        if(tr) tr.removeChild(tr.getElementsByTagName("td")[0]);
    }
    //
    // find all the _LINKS to listings and display the images
    //
    var links = document.getElementsByTagName("a");
    for (var i=0, j=0; i<links.length; i++) {
        var link = links[i];
        //link sample - http://classifieds.myredbook.com/classified.php?adid=54079
        //              http://classifieds.myredbook.com/uploads/pix/1y/f27cw0pychxzfm6v.jpg
        //debug(link.firstChild.nodeName);
        if ( hasImgNode(link)
            && link.href 
            && (link.href.match(/.*classifieds\.myredbook\.com\/.*/)
                || link.href.match(/.*classifieds\.myredbook\.com\/uploads.*/))) {
            debug("Match:" + link.href);
            _LINKS[j++] = link;
        }
    }
    loadLinks();
}

function loadLinks(){
    debug("entering loadlink with i " + _LINK_NUM + ' length:' + _LINKS.length);
    //link sample - http://classifieds.myredbook.com/classified.php?adid=54079
    //              http://classifieds.myredbook.com/uploads/pix/1y/f27cw0pychxzfm6v.jpg
    if(_LINK_NUM >= _LINKS.length) return;
    var link = _LINKS[_LINK_NUM];
    debug('while loop ' + _LINK_NUM);
    GM_xmlhttpRequest({
        method:"GET",
        url: link.href,
        headers:{
            "User-Agent": "monkeyagent",
            "Accept":"text/html,text/monkey,text/xml,text/plain",
        },
        onload: newFunction(link)
    });
    _LINK_NUM++;
    setTimeout(loadLinks, DELAY);
    debug(_LINK_NUM + ' if break');
    return;
}	

function keyHandler(e){
    //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var evtobj=window.event? event : e 
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode;
    var actualkey=String.fromCharCode(unicode);
    //alert(actualkey);
    var loc = document.location + "";
    if(actualkey == "'"){ //right arrow - go next page
        if(loc.match('&offset=(\\d+)')){
            document.location = loc.replace(/&offset=(\d+)/, "&offset=" + (RegExp.$1*1 + 30));
        }else{
            document.location = loc + "&offset=30";            
        }
        return true;
    }else if (actualkey == "%"){ //left arrow go previous page
        history.go(-1);
        return true;        
    }else if (actualkey == "#"){//close window
        //alert("closing window");
        windows.close();
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
