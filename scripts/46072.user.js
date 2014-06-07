// ==UserScript==
// @name          Replace debug link
// @namespace     http://userscripts.org/users/86223
// @description   replaces debug link of all coder pages
// @include       http:/*.gb.com/*
// ==/UserScript==

var links;

links = document.getElementsByTagName('A');

for (var i = 0; i < links.length; i++) {

    var link = links[i];

    try
    {
        if (link.attributes.getNamedItem("href") == undefined)
            continue;

        if (link.attributes.getNamedItem("href").nodeValue.indexOf("http://ui.gb.com/Pages/Maintenance/Attach.aspx")>=0)
        {  
            link.attributes.getNamedItem("href").nodeValue = link.attributes.getNamedItem("href").nodeValue.replace("http://ui.gb.com/Pages/Maintenance/Attach.aspx","http://localhost:13580/"); 
        }
    }
    catch(error)
    {
    }        
}

