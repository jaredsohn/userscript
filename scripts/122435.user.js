// ==UserScript==

// @name NSFL Marker

// @description Marks NSFL links

// @namespace http://userscripts.org/users/429085

// @include http://www.reddit.com/*

// @include http://reddit.com/*

// ==/UserScript==



document.getElementsByClass = function(class){

    var itemsfound = new Array;

    var elements = document.getElementsByTagName('*');

    for(var i=0;i<elements.length;i++){

        if(elements[i].className == class){

        itemsfound.push(elements[i]);

        }

    }

    return itemsfound;

}



var nsfw = document.getElementsByClass("rounded nsfw-stamp stamp");

var nsflRegEx = /.*nsfl.*/i;



for(i = 0; i < nsfw.length; i++)

{

    if(nsflRegEx.test(nsfw[i].parentNode.innerHTML))

    {

        nsfw[i].innerHTML = "<acronym style=\"color: black\" title=\"Disgusting content: Not Safe For Life\">NSFL</acronym>";

    }

}