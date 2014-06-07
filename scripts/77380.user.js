// ==UserScript==
// @name           View on backgrndr.com
// @namespace      http://www.backgrndr.com/viewonbackgrndr/
// @description    View the current photo on backgrndr.com
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// ==/UserScript==

var photoPagePattern = /^.*\/photos\/[\w@-]+\/(\d+)\//;

var photoId = location.pathname.split('/')[3];
var descId = 'description_div' + photoId;

function checkPhotoPage(){
    var isPhotoPage = false;
    
    if (photoPagePattern.exec(window.location.href)){
        isPhotoPage = true;
    }
    return isPhotoPage;
}


function addLink(){
    var listElements = document.evaluate(
        "//li[@class='Stats']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
                 
    if (listElements.snapshotLength > 0){
            var firstItem = listElements.snapshotItem(0);
            var parent = firstItem.parentNode;
        
        // Add View on backgrndr Link
        addListLink('View on backgrndr.com','http://www.backgrndr.com/',parent, firstItem);

        var descDiv = document.getElementById(descId);
        // This is only added if is your photo and there isn't a backgrndr.com link in description
        if((descDiv != null) && (descDiv.title != "") && descDiv.innerHTML.indexOf('http://www.backgrndr.com/') == -1){
            elem = addListLink('Add backgrndr Link to Description','#',parent, firstItem);
            elem.addEventListener("click",addBackgrndrLink2Desc,false);
        }
    }
}


function addListLink(linkText, url, parent, firstItem){
    
    var newListItem = document.createElement('li');
    newListItem.setAttribute('class', 'Stats');
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('class', 'Plain');
    var text = document.createTextNode(linkText);
    link.appendChild(text);
    newListItem.appendChild(link);
    parent.insertBefore(newListItem, firstItem);
    
    return newListItem;
}

function addBackgrndrLink2Desc() {

    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var desc = document.getElementById(descId);
    desc.dispatchEvent(evt);
    
    var editArea = document.getElementsByName("content")[0];
    
    if (editArea != null) {
        var backgrndrUrl = 'http://www.backgrndr.com/?id=' + photoId;
        
        var viewLink = 'Best <a href="' + backgrndrUrl + '">viewed on backgrndr</a>';                       
        
        editArea.value += "\n\n" + viewLink;        
        editArea.scrollTop = editArea.scrollHeight;
    }
}

window.addEventListener("load", 
    function () {
        if (checkPhotoPage()){
            addLink();
        }
    }, false
);