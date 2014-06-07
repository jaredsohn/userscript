// EOD Space
// version 0.1 BETA!
// 2012-03-10
// Copyright (c) 2012, sevenever
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Next Please", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          EOD Space
// @namespace     http://www.sevenever.com/greasemonkeyscripts
// @description   Add an extra space page to the end of document.
// @include       *
// @version       0.1
// ==/UserScript==

if(window==top){
    var space = null;
    addEODSpace = function() {
        if(!space && document.body.scrollHeight/window.innerHeight>4) {
            space = document.createElement("DIV");
            space.id = "EODSpace.space";
            space.style.height = window.innerHeight + "px";
            space.style.backgroundColor = "#DA96F2";
            space.style.display = "block";
            space.style.fontSize = 100 + "px";
            space.style.textAlign="center"
            space.innerHTML = "End Of Document Space";
            document.body.parentNode.appendChild(space);
            removeEventListener("scroll", addEODSpace);
            
            window.addEventListener("resize", resizeEODSpace, false);
        }

    }

    resizeEODSpace = function() {
        space.style.height = window.innerHeight + "px";
    }
    
    window.addEventListener("scroll", addEODSpace, false);
}