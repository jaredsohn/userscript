// ==UserScript==
// @name        Wikipedia: Show article titles in the "Languages" section
// @include     http://*.wikipedia.org/*
// @include     http://en.wikipedia.org/*
// @include     http://de.wikipedia.org/*
// @include     http://es.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @include     https://en.wikipedia.org/*
// @include     https://de.wikipedia.org/*
// @include     https://es.wikipedia.org/*
// ==/UserScript==

var links = document.querySelectorAll("#p-lang .interlanguage-link a");

if(links){
    // color to be used later
    var h5 = document.querySelector("#mw-panel.collapsible-nav div.expanded h3");
    var color = h5 ? window.getComputedStyle(h5).color : "gray";
    
    for(var i = 0; i < links.length; i++){
        var link = links[i];
        var newSpan = document.createElement("span");
    
        // style
        link.style.display = "inline-block";
        newSpan.style.color = color;
        newSpan.style.overflow = "hidden";
    
        // text
        var re = / [–—] [^–—]+$/;
        var textFromHref = decodeURIComponent(link.href.match(/[^\/]*$/)[0].replace(/#.*(\.[0-9a-fA-F]{2})/g, function(s){return s.replace(/\./g,"%");})).replace(/_/g, " ");
        var anchor = textFromHref.split("#")[1];
        textFromHref = textFromHref.split("#")[0];
        var textFromTooltip = link.title.replace(re, "");
        newSpan.textContent = " "
                            + ((link.title != "" && !re.test(textFromHref)) ? textFromTooltip : textfromHref)
                            + (anchor ? " → " + anchor : "");
        link.appendChild(newSpan);
    }
}