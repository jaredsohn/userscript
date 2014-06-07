// MAL Search Filter!
// version 1.2
// 2010-06-14
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
// select "MAL Search Filter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Search Filter
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/anime.php?*
// @include        http://myanimelist.net/manga.php?*
// @exclude        http://myanimelist.net/anime.php?id=*
// @exclude        http://myanimelist.net/manga.php?id=*
// @description    This script hides search results that you already have on your list
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Anchor for checkbox
var	allElements = document.evaluate(
    "//td[@class='normal_header'][@colspan='2']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
var AnchorLink = allElements.snapshotItem(0);

if(AnchorLink!=null){

    //Element Placing
    var newElement;
    newElement = document.createElement('BR');
    AnchorLink.appendChild(newElement);
	
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    AnchorLink.appendChild(checkbox);
		
    newElement = document.createElement('label');
    newElement.setAttribute('for','firstName');
    newElement.appendChild(document.createTextNode('Hide Search Results that you have on your list.'));
    AnchorLink.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";
	
    //Anime list entries search
    allElements = document.evaluate(
        "//a[@class='Lightbox_AddEdit button_edit']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
	
    //Get or Set status of checkbox
    var checkboxmem = GM_getValue('checkboxmem'); //Get chceckbox status
    if(checkboxmem==null){
        checkboxmem=false;
        GM_setValue('checkboxmem', checkboxmem);
        checkbox.checked=checkboxmem;
    }
    else{
        checkbox.checked=checkboxmem;
        if(checkbox.checked==true)
            HideDivs();
    }
		
    //Listener
    checkbox.addEventListener('change',function () {
		
        if(checkbox.checked==true){
            HideDivs();
        }
		
        if(checkbox.checked==false){
            for (var i = 0; i < allElements.snapshotLength; i++){
                var EditLink = allElements.snapshotItem(i);
                EditLink.parentNode.parentNode.removeAttribute('style');
            }
        }
	
        GM_setValue('checkboxmem', checkbox.checked);
	
    },false)
}

function HideDivs(){
    for (var i = 0; i < allElements.snapshotLength; i++){
        var EditLink = allElements.snapshotItem(i);
        EditLink.parentNode.parentNode.style.display="none";
    }
}