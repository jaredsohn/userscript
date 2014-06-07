// ==UserScript==
// @name        KG - less page jumps while images load
// @namespace   KG
// @include     http*://*karagarga.net/details.php?*
// @exclude	http*://forum.karagarga.net/*
// @grant	none
// @version     1.1
// ==/UserScript==

if (!window.frameElement) {

        var d = document.getElementsByTagName("article")[0];
        d.style.width='650px';
        d.style.height='650px';
        d.style.overflow='auto';
        d.setAttribute("onclick", "javascript:this.style.width=''; this.style.height=''; this.style.overflow='';"); 

} // end iframe check