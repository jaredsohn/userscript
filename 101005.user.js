// ==UserScript==
// @name          ignore.user.js
// @namespace     http://www.erepublik.com/*
// @include       http://www.erepublik.com/*
// @description	  Ignores the troll
// 
// @include       http://google.com/*
// @include       http://www.google.com/*
// @include       http://maps.google.tld/*
// @exclude       http://gmail.google.com/*
// ==/UserScript==
// Notes:
//   * skripta ignorise novinske komentare ljudi koje navedete

var ignorisani = ["purebg","nick2"];   //PROMENITE IMENA ILI NASTAVITE SPISAK

var comments = document.getElementsByClassName("commentscontent");
var commentsNum = parseInt(comments.length);

for(var i=0; i < commentsNum; i++)
{
    var currEl = comments[i];
    var hrefs = currEl.getElementsByTagName("a");
    for(var counter = 0; counter<parseInt(ignorisani.length);counter++)
    {
        if(hrefs[1].innerHTML.toString() == ignorisani[counter])
            {
                currEl.style.visibility = "hidden";
                currEl.style.height = "0px";
            }
    }
}