// ==UserScript==
// @name           Reddit++
// @namespace      RPP
// @description    Odd things to make reddit better
// @include        http://www.reddit.com/
// @include        http://*.reddit.com/
// @include        http://*.reddit.com/r/*
// @include        http://*.reddit.com/user/*
// @include        http://www.reddit.com/r/*
// @include        http://www.reddit.com/user/*
// ==/UserScript==

//==============================================================================
//                             Add Random Link
//==============================================================================

var tabs = document.getElementsByClassName("tabmenu");

var theli = document.createElement("li");
var thea = document.createElement("a");
var thetext = document.createTextNode("Random Subreddit");

thea.setAttribute("href", "http://www.reddit.com/r/random/")
thea.appendChild(thetext);

theli.appendChild(thea);
tabs[0].appendChild(theli);


//==============================================================================
//                             Decorate Links
//==============================================================================


var domains = document.getElementsByClassName("domain");

//var s = domains[0].childNodes[1].innerHTML;
//alert(s)
//alert(s.substring(0, 4))

onoff = 0;

for (var i=0; i < domains.length; i++) {
    if (onoff == 0) {
        if (domains[0].childNodes[1].innerHTML.substring(0, 4) == "self") 
            domains[i].style.backgroundColor = "#B4EEB4";   // REDDIT LINK
        else
            domains[i].style.backgroundColor = "#89CFF0";   // EXTERNAL LINK
        onoff = 1;
    }
    else {
        if (domains[i].childNodes[1].innerHTML.substring(0, 4) == "self") 
            domains[i].style.backgroundColor = "#9BCD9B";   // REDDIT LINK
        else
            domains[i].style.backgroundColor = "#B0E0E6";   // EXTERNAL LINK
        onoff = 0;
    }
    domains[i].style.color = "#000000";
    domains[i].style.fontWeight = "bold";
}

var table = document.getElementById("siteTable").childNodes;
var sep = document.getElementsByClassName("clearleft");

for (var i = 0; i < sep.length; i++) {
    sep[i].style.visibility = "hidden";
}

for (var i = 0; i < table.length; i++) {
    table[i].style.border = "dotted black 1px";
    table[i].style.padding = "0.2%";
    if (onoff == 0) {
        table[i].style.backgroundColor = "#f0ffff";
        onoff = 1;
    }
    else {
        table[i].style.backgroundColor = "#f5fffa";
        onoff = 0;
    }
}
