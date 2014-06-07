// ==UserScript==
// @name       Beam!
// @namespace  twonky
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, Shankar Narayan
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

// dynamic list of supported sites
var supportedSites = [
    'youtube.com', 
    'break.com', 
    'metacafe.com', 
    'vimeo.com', 
    'funnyordie.com', 
  ];

$(document).ready(function(){
    var url = window.location.toString();
    insertBeamButtonToItems(getItemsToBeamOnPage(url));
      
});

function insertBeamButtonToItems(items){
    
    if(items == null){
        return;
    }
    // load the beam script
    loadBeamJSScriptToPage();   
    for(var i in items){
        var node = items[i];
        if(node.length == 2){
            beam = loadBeamButton("pv-twonky-beam pv_bb_overlay pv_bb_small", node[0]);
            node[1].appendChild(beam);
        }
        
    }
    console.log("Beam buttons loading complete...");
}

function loadBeamJSScriptToPage(){
    // load the beam.js script before we add the div element. 
    sc = document.createElement("script");
    sc.setAttribute("type","text/javascript");
    sc.setAttribute("src","http://my.twonky.com/plugins/beambutton/beam.js");
    head = document.head || (document.head = document.getElementsByTagName('head')[0]);
    head.appendChild(sc);
    console.log("Loaded beam.js ...");
    
}

function loadBeamButton(classVal, urlString){
    console.log("loading beam button....");
    dv = document.createElement("div");
    
    dv.setAttribute("class", classVal);
    dv.setAttribute("href", urlString);
    dv.setAttribute("onClick", ";return false;");
      
    return dv;
}

function getItemsToBeamOnPage(url){
    
    var index = getSupportedSiteIndex(url);
    if(index >= 0 && index <= supportedSites.length){
        // got a supported site
        if(index == 0){
            return getItemsOnYouTube();
        }
        else if(index == 1){
            return getItemsOnBreak();
        }
        else if(index == 2){
            return getItemsOnMetacafe();
        }
        else if(index == 3){
            return getItemsOnVimeo();
        }
        else if(index == 4){
            return getItemsOnFunnyOrDie();
        }
         
    }
    else {
        return null;
    }
    
    
}

function getSupportedSiteIndex(url){
    
    HOST = /^(\w+\.)+\w+$/;
    NAME = /^\w+$/;
    
    for (var i in supportedSites) {
        var key = supportedSites[i];
        var escKey = key.replace(".", "\\.");
        var regex;
        
        if (key.match(HOST)) {
            regex = RegExp("^https?:\/\/(\\w+\\.)*"+escKey+"\\/.*", "i");
        } else if (key.match(NAME)) {
            regex = RegExp("^https?:\/\/(\\w+\\.)*"+escKey+"\\.\\w+\\/.*", "i");
        } else {
            regex = RegExp("^.*"+escKey+".*");
        }
        
        supportedSites[i] = regex;
    }
    
    // use the right parser based on page url.
    for (var i in supportedSites) {
        regex = supportedSites[i];
        if (regex.test(url)) {
            //console.log("Found unraveler: " + regex);
            return i;
        }
    }
}

function getElementsByXPath(expression, context){
    var elements = document.evaluate(expression,context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return elements;
    
}

function getItemsOnYouTube(){
    console.log("Parsing youtube content");
    var spanItemsXpath = "//span[contains(@class, 'video-thumb')]";
    var divItemsXpath = "//div[contains(@class, 'feed-item-main') or contains(@class, 'video-list-item')]";
    var HREF_XPATH = "ancestor::*/a/@href[contains(.,'/watch')]";
    var result = [];
    var items = getElementsByXPath(spanItemsXpath, document);
    var divItems = getElementsByXPath(divItemsXpath, document);
    
    for(i=0; i<=items.snapshotLength; i++){
        
        var node = items.snapshotItem(i);
        
        var href = getElementsByXPath(HREF_XPATH, node);
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            var res = ["http://youtube.com"+ hrefText.nodeValue,node];
            result.push(res);       
        }
                   
    }
    
    for(i=0; i<=divItems.snapshotLength; i++){
        var node = divItems.snapshotItem(i);
        var href = getElementsByXPath(HREF_XPATH, node);
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            var res = ["http://youtube.com" + hrefText.nodeValue, node];
            result.push(res);
        }
        
    
    }
    
    
    return result;
}

function getItemsOnBreak(){
    console.log("Parsing break.com content");
    
    var thumbnailXpath = "//div[contains(@class, 'thumb')]";
    var mainPage = "//img[contains(@class, 'brk-content-thumb')]";
    var hrefPath = "ancestor::a/@href";
    var HREF_XPATH = "a/@href";
    var result = [];
    items = getElementsByXPath(thumbnailXpath, document);
    main = getElementsByXPath(mainPage, document);
    for(i = 0; i <= items.snapshotLength; i++){
        var node = items.snapshotItem(i);
        
        var href = getElementsByXPath(HREF_XPATH, node);
        console.log(href);
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            var res = [hrefText.nodeValue,node.parentNode];
            result.push(res);       
        }
    
    }
     for(i = 0; i <= main.snapshotLength; i++){
        var node = main.snapshotItem(i);
        
        var href = getElementsByXPath(hrefPath, node);
        console.log(href);
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            var res = [hrefText.nodeValue,node.parentNode];
            result.push(res);       
        }
    
    }
    
    return result;

}

function getItemsOnVimeo(){
    console.log("Parsing vimeo content");
    var thumbnailXpath = "//img[contains(@class, 'thumbnail')]";
    var HREF_XPATH = "ancestor::a/@href";
    var result = [];
    items = getElementsByXPath(thumbnailXpath, document);
    console.log(items);
    for(i = 0; i <= items.snapshotLength; i++){
        var node = items.snapshotItem(i);
        var href = getElementsByXPath(HREF_XPATH, node);
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            
            var res = ["http://vimeo.com"+ hrefText.nodeValue,node.parentNode];
            result.push(res);       
        }
    
    }
    return result;
    
}

function getItemsOnMetacafe(){
    console.log("Parsing metacafe content");
    var thumbnailXpath = "//a[contains(@class, 'ItemThumb')]";
    var HREF_XPATH = "@href[contains(.,'/watch')]";
    var result = [];
    items = getElementsByXPath(thumbnailXpath, document);
    
    for(i = 0; i <= items.snapshotLength; i++){
        var node = items.snapshotItem(i);
        
        var href = getElementsByXPath(HREF_XPATH, node);
        
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            var res = ["http://metacafe.com"+ hrefText.nodeValue,node.parentNode];
            result.push(res);       
        }
    
    }
    return result;
}

// issue with page overlay on funnordie.
function getItemsOnFunnyOrDie(){
    console.log("Parsing FunnyOrDie videos");
    var thumbnailXpath = "//div[contains(@class, 'thumb')]";
    var HREF_XPATH = "a/@href[contains(.,'/videos')]";
    var result = [];
    items = getElementsByXPath(thumbnailXpath, document);
    
    for(i = 0; i <= items.snapshotLength; i++){
        var node = items.snapshotItem(i);
        
        var href = getElementsByXPath(HREF_XPATH, node);
        console.log(href);
        if(href.snapshotLength == 1){
            var hrefText = href.snapshotItem(0);
            var res = ["http://funnyordie.com"+ hrefText.nodeValue,node.parentNode];
            result.push(res);       
        }
    
    }
    return result;

}



        






