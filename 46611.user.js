// MAL Anime Details Bookmarks!
// version 1.1
// 2009-05-22
// Copyright (c) 2009, Bastvera <bastvera@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MAL Anime Details Bookmarks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Anime Details Bookmarks
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/anime.php?id=*
// @include        http://myanimelist.net/anime/*
// @exclude        http://myanimelist.net/anime/*/*/reviews
// @exclude        http://myanimelist.net/anime/*/*/userrecs
// @exclude        http://myanimelist.net/anime/*/*/stats
// @exclude        http://myanimelist.net/anime/*/*/characters
// @exclude        http://myanimelist.net/anime/*/*/pics
// @exclude        http://myanimelist.net/anime/*/*/moreinfo
// @exclude        http://myanimelist.net/anime/*/*/forum
// @description    This script adds bookmarks to various headers on Anime Detail page.
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Get (navi bar)
var AnchorLink = document.getElementById('horiznav_nav');

//Add Two BR
AnchorLink.appendChild(document.createElement('BR')); 
AnchorLink.appendChild(document.createElement('BR')); 

//Quickbar creation
var quickElements = [];
var quickNames = new Array("Staff","Reviews","Recommendations","Opening Theme","Ending Theme", "Recent News", "Recent Forum");
for(var ele in quickNames){
    var quickElement = document.createElement('A');
    quickElement.appendChild(document.createTextNode(quickNames[ele]));
    quickElement.style.fontSize="10px";
    quickElement.href="javascript:;"
    quickElements[ele]=quickElement;
    AnchorLink.appendChild(quickElements[ele]);
	if(!quickNames[ele].match("Forum"))
		AnchorLink.appendChild(document.createTextNode(', '));
}

//Get all H2
var allH2 = document.getElementsByTagName('H2');
var position;
for(var pos in allH2){
	var tempString = String(allH2[pos].innerHTML);
	var finder = tempString.search("Staff");
	if(finder!=-1){
		position = pos;
	}	
}
	
for(ele in quickElements){
    quickElements[ele].addEventListener('click',function () {
        for(var ele in quickNames){
            var finder = this.innerHTML.search(quickNames[ele]);
            if(finder!=-1){
                var sum = (position * 1)  + (ele * 1);
                ScrollToElement(allH2[sum]);
                break;
            }
        }
    },false)
}

function ScrollToElement(SelectedH2){
    var x = 0;
    var y = 0;
    while(SelectedH2 != null){
        x += SelectedH2.offsetLeft;
        y += SelectedH2.offsetTop;
        SelectedH2 = SelectedH2.offsetParent;
    }            		      
    window.scrollTo(x,y);
}