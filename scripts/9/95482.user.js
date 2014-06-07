// ==UserScript==
// @name           4and4
// @namespace      fourchan
// @description    Adds more threads at bottom -- use along with 4banners script to streamline
// @include        http*://boards.4chan.org/*/
// @include        http*://boards.4chan.org/*/??
// @exclude        https://boards.4chan.org/res/*
// ==/UserScript==

    function getNxtPg(lnkToNxtPg) {
		//get Raw HTML
        var req = new XMLHttpRequest();
        req.open("GET", lnkToNxtPg, false);
        req.send(null);
        return req.responseText;
    }
	
	
(function () {
//where are we?
var nextPageNum = location.href.substring(location.href.length-1);
var RawHTML;
var MaxPages = 5;
if (nextPageNum=="/"){nextPageNum=1;} else{nextPageNum++;}
for (i=nextPageNum;i<nextPageNum+MaxPages;i++)
{
	RawHTML="";
	//get raw
	RawHTML = getNxtPg(i);		
	//Parse for just threads
	RawHTML = RawHTML.substring(RawHTML.indexOf('<div class="board"'), RawHTML.indexOf('<div class="mobile"')-19);
	//add MaxPages # of times
	document.getElementById("delform").innerHTML+=RawHTML;
}
})();