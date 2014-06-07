// ==UserScript==
// @name        lowbird_watchlist
// @namespace   lowbird_watchlist
// @include     http://www.lowbird.com/*
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @version     1.1
// @grant       all
// ==/UserScript==

var boxWidth = 600;
var boxHeight = 200;
var wBox;

$(document).ready(function() {
        var watchlistLink = document.createElement("a");        
        var watchlistText = document.createTextNode("watchlist");        
        var addLink = document.createElement("a");
        var addText = document.createTextNode("add");
        
        watchlistLink.appendChild(watchlistText);
        watchlistLink.href = "#";
        
        addLink.appendChild(addText);
        addLink.href = "#";
        
        $("div.menuItems").append(" / ");
        $("div.menuItems").append(watchlistLink);
        $("div.menuItems").append(" / ");
        $("div.menuItems").append(addLink);                
        
        $(addLink).click(function() {
            localStorage.setItem(localStorage.length, location.href);
            $(this).hide();
            return false;
        });    
        
        wBox = createWatchlistBox(watchlistLink);
        
        $(watchlistLink).click(function() {
            fill();
            $(wBox).toggle();
            return false;
        });
});

function createWatchlistBox(watchlistLink) {
    var watchlistBox = document.createElement("div");
    var left = $(watchlistLink).position().left + $(watchlistLink).width() - boxWidth;
    
    $("div.menuItems").append(watchlistBox);
    
    watchlistBox.setAttribute("style", "background: #555; border: solid #777 1px; width: " + boxWidth + "px; height: " + boxHeight + "px; display: none; position: absolute; left: " + left + "px; z-index: 10; overflow: auto");
        
    return watchlistBox;
}

function deleteEntry() {
    localStorage.removeItem(this.id.substring(4));
    fill();
    return false;
}

function fill() {
    
    var _links = new Array();
    
    $(wBox).empty();
    
    for(var i in localStorage) {
        _links.push({key: i, value: localStorage[i]});
    }
    
    _links = sortByKey(_links, "key");
        
    for(var i=localStorage.length-1; i >= 0; i--) {
        var link = document.createElement("a");
        var text = document.createTextNode(i + ") " + _links[i].value);
                        
        var delLink = document.createElement("a");
        var delText = document.createTextNode("[x]");
        
        var br = document.createElement("br");
                
        link.appendChild(text);
        link.href = _links[i].value;
        
        delLink.appendChild(delText);
        delLink.href = "#";
        delLink.id = "key_" + localStorage.key(i);
        delLink.addEventListener("click", deleteEntry, false);
    
        wBox.appendChild(link);
        wBox.appendChild(delLink);
        wBox.appendChild(br);
    }
    
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}